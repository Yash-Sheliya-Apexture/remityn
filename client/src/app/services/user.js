// // frontend/src/services/user.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const getAllUsers = async () => {
//     try {
//         const response = await axios.get('/users'); // Relative path
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Error fetching users';
//     }
// };

// const getUserById = async (userId) => {
//     try {
//         const response = await axios.get(`/users/${userId}`); // Relative path with parameter
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Error fetching user';
//     }
// };

// export default {
//     getAllUsers,
//     getUserById,
// };


// // frontend/src/services/user.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const getAllUsers = async () => {
//     try {
//         const response = await axios.get('/users'); // Relative path
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Error fetching users';
//     }
// };

// const getUserById = async (userId) => {
//     try {
//         const response = await axios.get(`/users/${userId}`); // Relative path with parameter
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Error fetching user';
//     }
// };

// export default {
//     getAllUsers,
//     getUserById,
// };


// frontend/src/services/user.js
import axios from 'axios';
import apiConfig from '../config/apiConfig';

// It's generally better practice to create a dedicated Axios instance
// instead of modifying the global default, especially in larger apps.
const apiClient = axios.create({
    baseURL: apiConfig.baseUrl,
    // You might add default headers or other config here later
});

const getAllUsers = async () => {
    try {
        // Use the specific apiClient instance
        const response = await apiClient.get('/users');
        return response.data;
    } catch (error) {
        // Enhance error handling slightly
        const errorMessage = error.response?.data?.message || error.message || 'Error fetching users';
        console.error("Error in getAllUsers:", errorMessage, error); // Log the error
        throw new Error(errorMessage); // Throw a standard Error object
    }
};

const getUserById = async (userId) => {
    // Basic validation
    if (!userId) {
        throw new Error('User ID is required.');
    }
    try {
        // Use the specific apiClient instance
        const response = await apiClient.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error fetching user';
        console.error(`Error in getUserById for ID ${userId}:`, errorMessage, error); // Log the error
        throw new Error(errorMessage); // Throw a standard Error object
    }
};

// Assign the methods to a named object
const userService = {
    getAllUsers,
    getUserById,
};

// Export the named object as the default
export default userService;