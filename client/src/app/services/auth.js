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


import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Correct import path using alias

// This sets the base for all requests. We assume it's 'http://localhost:5000/api'
axios.defaults.baseURL = apiConfig.baseUrl;

const register = async (userData) => {
    try {
        // CORRECTED: Path should start from '/auth', not '/api/auth'
        const response = await axios.post('/auth/register', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Registration failed' };
    }
};

const verifyOtp = async (verificationData) => {
    try {
        // CORRECTED: Path should start from '/auth', not '/api/auth'
        const response = await axios.post('/auth/verify-otp', verificationData, {
             headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        throw error.response?.data || { message: 'OTP verification failed.' };
    }
};

const resendOtp = async (emailData) => {
    try {
        // CORRECTED: Path should start from '/auth', not '/api/auth'
        const response = await axios.post('/auth/resend-otp', emailData, {
             headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to resend OTP.' };
    }
};

const login = async (credentials) => {
    try {
        // CORRECTED: Path should start from '/auth', not '/api/auth'
        const response = await axios.post('/auth/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Login failed' };
    }
};

const forgotPassword = async (emailData) => {
    try {
        // CORRECTED: Path should start from '/auth', not '/api/auth'
        const response = await axios.post('/auth/forgot-password', emailData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error)        {
        throw error.response?.data || { message: 'Failed to request password reset' };
    }
};

const resetPassword = async (resetData) => {
    try {
        // CORRECTED: Path should start from '/auth', not '/api/auth'
        const response = await axios.post('/auth/reset-password', resetData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Password reset failed' };
    }
};

const authService = {
    register,
    verifyOtp,
    resendOtp,
    login,
    forgotPassword,
    resetPassword,
};

export default authService;