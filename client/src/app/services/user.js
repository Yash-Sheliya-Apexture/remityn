// frontend/src/services/user.js
import axios from 'axios';
import apiConfig from '../config/apiConfig';

axios.defaults.baseURL = apiConfig.baseUrl;

const getAllUsers = async () => {
    try {
        const response = await axios.get('/users'); // Relative path
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error fetching users';
    }
};

const getUserById = async (userId) => {
    try {
        const response = await axios.get(`/users/${userId}`); // Relative path with parameter
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error fetching user';
    }
};

export default {
    getAllUsers,
    getUserById,
};