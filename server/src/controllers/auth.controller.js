import authService from '../services/auth.service.js';

const register = async (req, res, next) => { // Add 'next' for error handling
    try {
        const { fullName, email, password } = req.body;
        const newUser = await authService.registerUser(fullName, email, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser }); // 201 Created status for successful registration
    } catch (error) {
        next(error); // Pass errors to error handling middleware
    }
};

const login = async (req, res, next) => { // Add 'next' for error handling
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser(email, password);
        res.json({ message: 'Login successful', user, token }); // 200 OK status for successful login
    } catch (error) {
        next(error); // Pass errors to error handling middleware
    }
};


const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        await authService.requestPasswordReset(email);
        res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;
        await authService.resetPassword(token, password);
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        next(error);
    }
};


export default {
    register,
    login,
    forgotPassword,
    resetPassword, 
};