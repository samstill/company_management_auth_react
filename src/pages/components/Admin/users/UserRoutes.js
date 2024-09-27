import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './Users';
import UserProfile from './UserProfile';



const UserRoutes = () => {
    return (
        <Routes>
    
            <Route index element={<Users />} />
            <Route path="/profile/:id" element={<UserProfile />} />

        </Routes>
    );
};

export default UserRoutes;
