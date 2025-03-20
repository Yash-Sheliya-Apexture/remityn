import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Correct import path using alias

axios.defaults.baseURL = apiConfig.baseUrl;

const register = async (userData) => {
    try {
        const response = await axios.post('/auth/register', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Registration failed';
    }
};

const login = async (credentials) => {
    try {
        const response = await axios.post('/auth/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Login failed';
    }
};

export default {
    register,
    login,
};