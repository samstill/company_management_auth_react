// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<RequireNoAuth><Login /></RequireNoAuth>} />
                    <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

// Redirect to /dashboard if logged in, otherwise show login
const RequireNoAuth = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log('RequireNoAuth - User:', user); // Debugging line
    return user ? <Navigate to="/dashboard" replace /> : children;
};

// Redirect to /login if not logged in, otherwise show dashboard
const RequireAuth = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log('RequireAuth - User:', user); // Debugging line
    return user ? children : <Navigate to="/login" replace />;
};


export default App;
