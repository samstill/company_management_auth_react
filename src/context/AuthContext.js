// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { login, refreshToken } from '../api/auth';
import rolesConfig from '../config/roles';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? JSON.parse(storedTokens) : null;
    });
    const [user, setUser] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? JSON.parse(storedTokens).user : null;
    });
    const [userRole, setUserRole] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? JSON.parse(storedTokens).role : null;
    });

    // src/context/AuthContext.js
    const setSession = (tokens) => {
        const user = tokens.user ? tokens.user : { /* Default or mock user if not present */ };
        const role = tokens.role || 'guest'; // Replace 'guest' with a default role if needed
        setAuthTokens(tokens);
        setUser(user);
        setUserRole(role);
        localStorage.setItem('authTokens', JSON.stringify(tokens));
        console.log('AuthContext - setSession: User set to', user); // Debugging line
    };


    // src/context/AuthContext.js
    const loginUser = async (email, password) => {
        try {
            const response = await login(email, password);
            console.log('Backend response:', response.data); // Log the full response data
            if (response.status === 200) {
                // Ensure we pass the expected structure to setSession
                const sessionData = {
                    user: response.data.user || {}, // Safely access user
                    role: response.data.role,       // Safely access role
                    token: response.data.token      // Include the token if needed
                };
                setSession(sessionData);
                console.log('Login successful. User role:', sessionData.role);
                return rolesConfig[sessionData.role]?.allowedRoutes[0] || '/dashboard';
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };
    

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        setUserRole(null);
        localStorage.removeItem('authTokens');
    };

    const refreshAuthToken = async () => {
        try {
            const response = await refreshToken(authTokens.refresh);
            if (response.status === 200) {
                setSession(response.data);
            } else {
                logoutUser();
            }
        } catch (error) {
            logoutUser();
        }
    };

    useEffect(() => {
        if (authTokens) {
            const interval = setInterval(() => {
                refreshAuthToken();
            }, 120 * 60 * 1000); // Refresh token every 120 minutes
            return () => clearInterval(interval);
        }
    }, [authTokens]);

    return (
        <AuthContext.Provider value={{ user, userRole, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
