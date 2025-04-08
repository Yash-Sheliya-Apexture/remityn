// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Correct import path using alias

// axios.defaults.baseURL = apiConfig.baseUrl;

// const register = async (userData) => {
//     try {
//         const response = await axios.post('/auth/register', userData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Registration failed';
//     }
// };

// const login = async (credentials) => {
//     try {
//         const response = await axios.post('/auth/login', credentials, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Login failed';
//     }
// };



// const forgotPassword = async (emailData) => {
//     try {
//         const response = await axios.post('/auth/forgot-password', emailData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to request password reset';
//     }
// };

// const resetPassword = async (resetData) => {
//     try {
//         const response = await axios.post('/auth/reset-password', resetData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Password reset failed';
//     }
// };


// export default {
//     register,
//     login,
//     forgotPassword, // Add forgotPassword API call
//     resetPassword,   // Add resetPassword API call
// };


// // frontend/src/services/auth.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Correct import path using alias

// axios.defaults.baseURL = apiConfig.baseUrl;

// const register = async (userData) => {
//     try {
//         const response = await axios.post('/auth/register', userData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || 'Registration failed'; // Return full error data for better handling in components
//     }
// };

// const login = async (credentials) => {
//     try {
//         const response = await axios.post('/auth/login', credentials, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || 'Login failed'; // Return full error data
//     }
// };



// const forgotPassword = async (emailData) => {
//     try {
//         const response = await axios.post('/auth/forgot-password', emailData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to request password reset';
//     }
// };

// const resetPassword = async (resetData) => {
//     try {
//         const response = await axios.post('/auth/reset-password', resetData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Password reset failed';
//     }
// };


// export default {
//     register,
//     login,
//     forgotPassword, // Add forgotPassword API call
//     resetPassword,   // Add resetPassword API call
// };



// frontend/src/services/auth.js
import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Assuming this alias is correctly configured in your build tool (e.g., Webpack, Vite)

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
        // Throw the specific error data from the backend if available, otherwise a generic message
        throw error.response?.data || { message: 'Registration failed', error: error.message };
    }
};

const login = async (credentials) => {
    try {
        const response = await axios.post('/auth/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Contains token, user info, etc.
    } catch (error) {
        // Throw the specific error data from the backend if available
        throw error.response?.data || { message: 'Login failed', error: error.message };
    }
};

const forgotPassword = async (emailData) => {
    try {
        const response = await axios.post('/auth/forgot-password', emailData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Usually just a success message
    } catch (error) {
         // Prefer backend message, fallback to generic
        throw error.response?.data || { message: 'Failed to request password reset', error: error.message };
    }
};

const resetPassword = async (resetData) => {
    try {
        const response = await axios.post('/auth/reset-password', resetData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Usually just a success message
    } catch (error) {
        // Prefer backend message, fallback to generic
        throw error.response?.data || { message: 'Password reset failed', error: error.message };
    }
};

// --- Fix Start ---
// Create a named constant for the service object
const authService = {
    register,
    login,
    forgotPassword,
    resetPassword,
};

// Export the named constant as the default export
export default authService;
// --- Fix End ---