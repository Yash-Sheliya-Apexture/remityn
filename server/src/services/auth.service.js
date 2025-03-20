import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const registerUser = async (fullName, email, password) => {
    try {
        // Check if user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already exists.'); // User-friendly error message
        }

        // Hash the password before saving to database
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds - adjust for security/performance trade-off
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();
        return newUser; // Return the newly created user object (without password if you configure model to exclude it on toJSON)
    } catch (error) {
        // Log the error for debugging and monitoring
        console.error("Error in registerUser service:", error);
        if (error.message === 'Email already exists.') { // Re-throw specific user-friendly error
            throw error;
        }
        throw new Error('Registration failed.'); // Generic error for other issues
    }
};

const loginUser = async (email, password) => {
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials'); // Generic error message for security - don't reveal if email exists or not
        }

        // Compare provided password with hashed password from database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid credentials'); // Generic error message
        }

        // Generate JWT token upon successful login
        const token = jwt.sign({ userId: user._id, role: user.role }, config.auth.jwtSecret, {
            expiresIn: config.auth.jwtExpiration, // Token expiration time from config
        });

        return { user: { _id: user._id, email: user.email, fullName: user.fullName, role: user.role }, token }; // Return user info (excluding password) and token
    } catch (error) {
        // Log the error for debugging
        console.error("Error in loginUser service:", error);
        throw new Error('Login failed.'); // Generic error for login failures
    }
};

export default {
    registerUser,
    loginUser,
};