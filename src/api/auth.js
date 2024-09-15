// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/accounts';  // Change this to your Django server URL

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, { email, password });
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const refreshToken = async (refreshToken) => {
    try {
        const response = await axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken });
        return response;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};
