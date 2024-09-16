// src/components/AdminDashboard.js
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const AdminDashboard = () => {
    return (
        <div>
       
            <ThemeSwitcher style={{
                position: 'absolute',
                top: 0,
                right: 0,
                margin: '1rem',
            }} />
            <h2>Admin Dashboard</h2>
            <p>Welcome, Admin!</p>
        </div>
    );
};

export default AdminDashboard;
