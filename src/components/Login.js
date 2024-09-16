// src/components/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './styles/Login.css';
import { ReactComponent as Logo } from '../assets/logo.svg'; 
import { FaEnvelope, FaLock } from 'react-icons/fa';
import ThemeSwitcher from './ThemeSwitcher';

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
        <div className="login-container">
            
            <div className="login-card">
            <ThemeSwitcher style={{
                position: 'absolute',
                top: 0,
                right: 0,
                margin: '1rem',
            }} />
                <Logo className="login-logo" /> {/* Render SVG logo */}
                <h2 className="login-title">Welcome Back</h2>
                {error && <p className="login-error">{error}</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-input-wrapper">
                    <FaEnvelope className="login-icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <div className="login-input-wrapper">
                        <FaLock className="login-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="login-button">
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
