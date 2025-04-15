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


// import authService from '../services/auth.service.js';

// const register = async (req, res, next) => { // Add 'next' for error handling
//     try {
//         const { fullName, email, password } = req.body;
//         const newUser = await authService.registerUser(fullName, email, password);
//         res.status(201).json({ message: 'User registered successfully', user: newUserPayload }); // Send user payload
//     } catch (error) {
//         next(error); // Pass errors to error handling middleware
//     }
// };

// // --- Updated login controller ---
// const login = async (req, res, next) => { // Add 'next'
//     try {
//         const { email, password } = req.body;
//         // Call the service, which now correctly returns { user: userPayload, token: '...' }
//         const result = await authService.loginUser(email, password);

//         // --- FIX: Send the structured response ---
//         res.status(200).json({
//              message: 'Login successful',
//              user: result.user, // Pass the user object from the service result
//              token: result.token // Pass the token from the service result
//         });
//     } catch (error) {
//         // Handle specific errors from the service (e.g., invalid credentials)
//          if (error.message === 'Invalid credentials') {
//             return res.status(401).json({ message: 'Invalid email or password.' }); // 401 Unauthorized
//         }
//         if (error.message.includes('Authentication process failed') || error.message.includes('Login failed due to a server error')) {
//              // Log internal errors but send a generic message
//              console.error("Internal login error:", error);
//              return res.status(500).json({ message: 'An internal server error occurred during login.' });
//         }
//         // Pass other unexpected errors to the generic error handler
//         next(error);
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



// backend/src/controllers/auth.controller.js
import authService from '../services/auth.service.js';

const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
        // 'newUser' now correctly holds the payload returned by the service
        const newUser = await authService.registerUser(fullName, email, password);

        // --- FIX: Use the correct variable 'newUser' ---
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser // Use the variable holding the service result
        });
    } catch (error) {
        // Handle specific errors like 'Email already exists'
        if (error.message === 'Email already exists.') {
             // Send a user-friendly conflict status code
            return res.status(409).json({ message: error.message });
        }
        // Pass other errors to the global error handler
        next(error);
    }
};

// --- Updated login controller ---
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Call the service, which returns { user: userPayload, token: '...' }
        const result = await authService.loginUser(email, password);

        // Send the structured response (This part was already correct)
        res.status(200).json({
             message: 'Login successful',
             user: result.user, // Pass the user object from the service result
             token: result.token // Pass the token from the service result
        });
    } catch (error) {
        // Handle specific errors from the service (e.g., invalid credentials)
         if (error.message === 'Invalid credentials') {
             // Return 401 Unauthorized for invalid credentials
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        // Log internal errors but send a generic message
        if (error.message.includes('Authentication process failed') || error.message.includes('Login failed')) {
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
        // Send a consistent success message regardless of email existence (security)
        res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    } catch (error) {
        // Log internal errors, but avoid revealing specific issues to the user
        console.error("Forgot password error:", error);
        res.status(500).json({ message: "Failed to process password reset request. Please try again later." });
        // Or potentially still send the success message above for maximum security obfuscation
        // next(error); // Only if you want the global handler to manage it differently
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;
        await authService.resetPassword(token, password);
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
         // Handle specific errors from the service
        if (error.message === 'Invalid or expired password reset token.') {
            return res.status(400).json({ message: error.message }); // Bad Request
        }
        if (error.message.includes('validation issues')) {
            return res.status(400).json({ message: error.message }); // Bad Request
        }
        // Log internal errors
        console.error("Reset password error:", error);
        res.status(500).json({ message: 'Password reset failed. Please try again or request a new link.' });
        // next(error); // If you prefer global handling
    }
};


export default {
    register,
    login,
    forgotPassword,
    resetPassword,
};