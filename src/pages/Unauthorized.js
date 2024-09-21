// src/components/Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => (
    <div>
        <h1>Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
        <Link to="/login">Go to Login</Link>
    </div>
);

export default Unauthorized;
