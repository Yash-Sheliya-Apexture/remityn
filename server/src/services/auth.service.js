// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import config from '../config/index.js';
// import nodemailer from 'nodemailer';

// const registerUser = async (fullName, email, password) => {
//     try {
//         // Check if user with this email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             throw new Error('Email already exists.'); // User-friendly error message
//         }

//         // Hash the password before saving to database
//         const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds - adjust for security/performance trade-off
//         const newUser = new User({ fullName, email, password: hashedPassword });
//         await newUser.save();
//         return newUser; // Return the newly created user object (without password if you configure model to exclude it on toJSON)
//     } catch (error) {
//         // Log the error for debugging and monitoring
//         console.error("Error in registerUser service:", error);
//         if (error.message === 'Email already exists.') { // Re-throw specific user-friendly error
//             throw error;
//         }
//         throw new Error('Registration failed.'); // Generic error for other issues
//     }
// };

// const loginUser = async (email, password) => {
//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             throw new Error('Invalid credentials'); // Generic error message for security - don't reveal if email exists or not
//         }

//         // Compare provided password with hashed password from database
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             throw new Error('Invalid credentials'); // Generic error message
//         }

//         // Generate JWT token upon successful login
//         const token = jwt.sign({ userId: user._id, role: user.role }, config.auth.jwtSecret, {
//             expiresIn: config.auth.jwtExpiration, // Token expiration time from config
//         });

//         return { user: { _id: user._id, email: user.email, fullName: user.fullName, role: user.role }, token }; // Return user info (excluding password) and token
//     } catch (error) {
//         // Log the error for debugging
//         console.error("Error in loginUser service:", error);
//         throw new Error('Login failed.'); // Generic error for login failures
//     }
// };



// const requestPasswordReset = async (email) => {
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             throw new Error('User with this email not found.'); // Don't reveal if email exists for security in production
//         }

//         // Generate a simpler reset token string (less cryptographically secure than crypto.randomBytes)
//         const resetToken = Date.now().toString(36) + Math.random().toString(36).substring(2);

//         // Hash the token using bcrypt before saving
//         const hashedResetToken = bcrypt.hashSync(resetToken, 10); // Synchronous hashing for simplicity

//         user.resetPasswordToken = hashedResetToken; // Store the bcrypt hashed token
//         user.resetPasswordExpires = Date.now() + 300000; // Token expires in 5 minutes
//         await user.save({ validateBeforeSave: false }); // Skip validation for these fields

//         const resetUrl = `${config.email.clientURL}/auth/reset-password/${resetToken}`; // Send the UNHASHED token in the URL

//         // Send email using nodemailer (same as before)
//         const transporter = nodemailer.createTransport({
//             host: config.email.smtpHost,
//             port: config.email.smtpPort,
//             secure: false,
//             auth: {
//                 user: config.email.smtpUser,
//                 pass: config.email.smtpPass,
//             },
//         });

//         const mailOptions = {
//             from: config.email.emailUser,
//             to: email,
//             subject: 'Password Reset Request',
//             html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
//                    <p>Please click on the following link, or paste this into your browser to complete the process:</p>
//                    <a href="${resetUrl}">${resetUrl}</a>
//                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
//         };

//         await transporter.sendMail(mailOptions);

//     } catch (error) {
//         console.error('Password reset request error:', error);
//         if (error.message === 'User with this email not found.') {
//             throw error;
//         }
//         throw new Error('Failed to send password reset email.');
//     }
// };

// const resetPassword = async (token, password) => {
//     try {
//         // No need to hash the token here again, compare directly with the stored bcrypt hash
//         const user = await User.findOne({
//             resetPasswordToken: { $ne: null }, // Ensure resetPasswordToken is not null
//             resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
//         });


//         if (!user || !bcrypt.compareSync(token, user.resetPasswordToken) ) { // Compare provided token with the stored bcrypt hash
//             throw new Error('Invalid or expired password reset token.');
//         }


//         const hashedPassword = await bcrypt.hashSync(password, 10); // Hash the new password
//         user.password = hashedPassword;
//         user.resetPasswordToken = undefined; // Clear reset token fields
//         user.resetPasswordExpires = undefined;
//         await user.save();

//     } catch (error) {
//         console.error('Password reset error:', error);
//         if (error.message === 'Invalid or expired password reset token.') {
//             throw error;
//         }
//         throw new Error('Password reset failed.');
//     }
// };


// export default {
//     registerUser,
//     loginUser,
//     requestPasswordReset,
//     resetPassword,
// };



import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import nodemailer from 'nodemailer';

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
        throw new Error('Registration failed. Please check your input and try again.'); // More generic error for security
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
        throw new Error('Login failed. Please check your credentials.'); // More generic error for security
    }
};



const requestPasswordReset = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            // Intentionally do not reveal if email exists for security.
            return; // Just return success silently to prevent email enumeration
            // throw new Error('User with this email not found.'); // Don't reveal if email exists for security in production
        }

        // Generate a simpler reset token string (less cryptographically secure than crypto.randomBytes)
        const resetToken = Date.now().toString(36) + Math.random().toString(36).substring(2);

        // Hash the token using bcrypt before saving
        const hashedResetToken = bcrypt.hashSync(resetToken, 10); // Synchronous hashing for simplicity

        user.resetPasswordToken = hashedResetToken; // Store the bcrypt hashed token
        user.resetPasswordExpires = Date.now() + 300000; // Token expires in 5 minutes
        await user.save({ validateBeforeSave: false }); // Skip validation for these fields

        const resetUrl = `${config.email.clientURL}/auth/reset-password/${resetToken}`; // Send the UNHASHED token in the URL

        // Send email using nodemailer (same as before)
        const transporter = nodemailer.createTransport({
            host: config.email.smtpHost,
            port: config.email.smtpPort,
            secure: false,
            auth: {
                user: config.email.smtpUser,
                pass: config.email.smtpPass,
            },
        });

        const mailOptions = {
            from: config.email.emailUser,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                   <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                   <a href="${resetUrl}">${resetUrl}</a>
                   <p>This link will expire in 5 minutes.</p>
                   <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`, // Added expiry notice
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error('Password reset request error:', error);
        // Do not reveal if email exists or not - silent fail for security
        // if (error.message === 'User with this email not found.') {
        //     throw error;
        // }
        throw new Error('Failed to send password reset email. Please try again later.'); // More generic error
    }
};

const resetPassword = async (token, password) => {
    try {
        // No need to hash the token here again, compare directly with the stored bcrypt hash
        const user = await User.findOne({
            resetPasswordToken: { $ne: null }, // Ensure resetPasswordToken is not null
            resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
        });


        if (!user || !bcrypt.compareSync(token, user.resetPasswordToken) ) { // Compare provided token with the stored bcrypt hash
            throw new Error('Invalid or expired password reset token.');
        }


        const hashedPassword = await bcrypt.hashSync(password, 10); // Hash the new password
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Clear reset token fields
        user.resetPasswordExpires = undefined;
        await user.save();

    } catch (error) {
        console.error('Password reset error:', error);
        if (error.message === 'Invalid or expired password reset token.') {
            throw error;
        }
        throw new Error('Password reset failed. Please try again.'); // More generic error
    }
};


export default {
    registerUser,
    loginUser,
    requestPasswordReset,
    resetPassword,
};
