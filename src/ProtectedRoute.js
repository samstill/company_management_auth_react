// src/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import rolesConfig from './config/roles';

const ProtectedRoute = ({ requiredRole }) => {
    const { user, userRole } = useContext(AuthContext);

    // If the user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If the user does not have the required role, redirect to dashboard
    if (userRole && rolesConfig[userRole] && !rolesConfig[userRole].allowedRoutes.includes(requiredRole)) {
        return <Navigate to="/dashboard" />;
    }
    // <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute>} />


    // Render the child component
    return <Outlet />;
};

export default ProtectedRoute;
