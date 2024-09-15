// src/components/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { loginUser, user } = useContext(AuthContext); // Access user state here
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            console.log('User is now logged in, navigating to dashboard');
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]); // Run this effect when user changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // Attempt to log in and get the default route
            await loginUser(email, password);
            setLoading(false);
            // No need to call navigate here, useEffect will handle it
        } catch (err) {
            setLoading(false);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
