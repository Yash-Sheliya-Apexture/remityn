// import authService from '../services/auth.service.js';

// const register = async (req, res, next) => { // Add 'next' for error handling
//     try {
//         const { fullName, email, password } = req.body;
//         const newUser = await authService.registerUser(fullName, email, password);
//         res.status(201).json({ message: 'User registered successfully', user: newUser }); // 201 Created status for successful registration
//     } catch (error) {
//         next(error); // Pass errors to error handling middleware
//     }
// };

// const login = async (req, res, next) => { // Add 'next' for error handling
//     try {
//         const { email, password } = req.body;
//         const { user, token } = await authService.loginUser(email, password);
//         res.json({ message: 'Login successful', user, token }); // 200 OK status for successful login
//     } catch (error) {
//         next(error); // Pass errors to error handling middleware
//     }
// };


// const forgotPassword = async (req, res, next) => {
//     try {
//         const { email } = req.body;
//         await authService.requestPasswordReset(email);
//         res.json({ message: 'Password reset email sent successfully' });
//     } catch (error) {
//         next(error);
//     }
// };

// const resetPassword = async (req, res, next) => {
//     try {
//         const { token, password } = req.body;
//         await authService.resetPassword(token, password);
//         res.json({ message: 'Password reset successfully' });
//     } catch (error) {
//         next(error);
//     }
// };


// export default {
//     register,
//     login,
//     forgotPassword,
//     resetPassword, 
// };


import authService from '../services/auth.service.js';

const register = async (req, res, next) => { // Add 'next' for error handling
    try {
        const { fullName, email, password } = req.body;
        const newUser = await authService.registerUser(fullName, email, password);
        res.status(201).json({ message: 'User registered successfully', user: newUserPayload }); // Send user payload
    } catch (error) {
        next(error); // Pass errors to error handling middleware
    }
};

// --- Updated login controller ---
const login = async (req, res, next) => { // Add 'next'
    try {
        const { email, password } = req.body;
        // Call the service, which now correctly returns { user: userPayload, token: '...' }
        const result = await authService.loginUser(email, password);

        // --- FIX: Send the structured response ---
        res.status(200).json({
             message: 'Login successful',
             user: result.user, // Pass the user object from the service result
             token: result.token // Pass the token from the service result
        });
    } catch (error) {
        // Handle specific errors from the service (e.g., invalid credentials)
         if (error.message === 'Invalid credentials') {
            return res.status(401).json({ message: 'Invalid email or password.' }); // 401 Unauthorized
        }
        if (error.message.includes('Authentication process failed') || error.message.includes('Login failed due to a server error')) {
             // Log internal errors but send a generic message
             console.error("Internal login error:", error);
             return res.status(500).json({ message: 'An internal server error occurred during login.' });
        }
        // Pass other unexpected errors to the generic error handler
        next(error);
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
