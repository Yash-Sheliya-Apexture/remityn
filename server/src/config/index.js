// import dotenv from 'dotenv';
// dotenv.config(); // Load environment variables from .env file

// import databaseConfig from './database.config.js';
// import authConfig from './auth.config.js';

// export default {
//     database: databaseConfig,
//     auth: authConfig,
//     port: process.env.PORT || 5000, // Default port if not in .env
// };


// import dotenv from 'dotenv';
// dotenv.config();

// import databaseConfig from './database.config.js';
// import authConfig from './auth.config.js';

// const emailConfig = {
//     smtpHost: process.env.SMTP_HOST,
//     smtpPort: process.env.SMTP_PORT,
//     smtpUser: process.env.SMTP_USER,
//     smtpPass: process.env.SMTP_PASS,
//     emailUser: process.env.EMAIL_USER, // Your email address for "From" field
//     adminEmail: process.env.ADMIN_EMAIL, // Admin email for notifications (optional)
//     clientURL: process.env.CLIENT_URL || 'http://localhost:3000', // Frontend URL
// };

// const  cloudinaryConfig= {
//     cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//     apiKey: process.env.CLOUDINARY_API_KEY,
//     apiSecret: process.env.CLOUDINARY_API_SECRET,
//     uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'wise_clone_kyc', // Optional: specific folder
// };
// export default {
//     database: databaseConfig,
//     auth: authConfig,
//     port: process.env.PORT || 5000,
//     email: emailConfig, // Add email config
//     cloudinary:cloudinaryConfig,
// };


// // config/index.js
// import dotenv from 'dotenv';
// dotenv.config();

// import databaseConfig from './database.config.js';
// import authConfig from './auth.config.js';

// const emailConfig = {
//     smtpHost: process.env.SMTP_HOST,
//     smtpPort: process.env.SMTP_PORT,
//     smtpUser: process.env.SMTP_USER,
//     smtpPass: process.env.SMTP_PASS,
//     emailUser: process.env.EMAIL_USER,
//     adminEmail: process.env.ADMIN_EMAIL,
//     clientURL: process.env.CLIENT_URL || 'http://localhost:3000',
//     emailFromName: process.env.EMAIL_FROM_NAME || 'Wise Clone', // Added default name
// };

// const  cloudinaryConfig= {
//     cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//     apiKey: process.env.CLOUDINARY_API_KEY,
//     apiSecret: process.env.CLOUDINARY_API_SECRET,
//     uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'wise_clone_kyc', // Optional: specific folder
// };
// // --- Add Google Auth Config ---
// const googleAuthConfig = {
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
// };
// // -----------------------------

// export default {
//     database: databaseConfig,
//     auth: authConfig,
//     port: process.env.PORT || 5000,
//     email: emailConfig,
//     cloudinary:cloudinaryConfig, // Make sure this is correctly defined/imported
//     googleAuth: googleAuthConfig, // <-- Add Google config
//     clientUrl: process.env.CLIENT_URL || 'http://localhost:3000', // Add clientUrl directly for easier access
// };


// // config/index.js
// import dotenv from 'dotenv';

// // Attempt to load .env file and capture the result
// const envConfigResult = dotenv.config();

// // Check if there was an error loading the .env file
// if (envConfigResult.error) {
//     console.warn('[Config] Warning: Error loading .env file. Using default configurations where applicable.');
//     console.warn(`[Config] .env error details: ${envConfigResult.error.message}`);
// } else {
//     // Check if the .env file was parsed but is empty or has no relevant variables
//     if (envConfigResult.parsed && Object.keys(envConfigResult.parsed).length === 0) {
//         console.warn('[Config] Warning: .env file loaded but it appears to be empty or contains no key-value pairs. Using default configurations where applicable.');
//     } else {
//         console.log('[Config] .env file loaded successfully.');
//     }
//     // For specific debugging, you can log the MONGO_URI value here
//     // console.log(`[Config] MONGO_URI from process.env after dotenv.config(): ${process.env.MONGO_URI}`);
// }


// import databaseConfig from './database.config.js';
// import authConfig from './auth.config.js';

// const emailConfig = {
//     smtpHost: process.env.SMTP_HOST,
//     smtpPort: process.env.SMTP_PORT,
//     smtpUser: process.env.SMTP_USER,
//     smtpPass: process.env.SMTP_PASS,
//     emailUser: process.env.EMAIL_USER,
//     adminEmail: process.env.ADMIN_EMAIL,
//     clientURL: process.env.CLIENT_URL || 'http://localhost:3000',
//     emailFromName: process.env.EMAIL_FROM_NAME || 'Wise Clone',
// };

// const cloudinaryConfig = {
//     cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//     apiKey: process.env.CLOUDINARY_API_KEY,
//     apiSecret: process.env.CLOUDINARY_API_SECRET,
//     uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'wise_clone_kyc',
// };

// const googleAuthConfig = {
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
// };

// export default {
//     database: databaseConfig, // This will use the MONGO_URI resolved in database.config.js
//     auth: authConfig,
//     port: process.env.PORT || 5000,
//     email: emailConfig,
//     cloudinary: cloudinaryConfig,
//     googleAuth: googleAuthConfig,
//     clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
// };


// config/index.js
import dotenv from 'dotenv';

// Load environment variables from .env file. This should be one of the first things your app does.
const envConfigResult = dotenv.config();

// Logging for .env loading status
if (envConfigResult.error) {
    console.warn('[Config] Warning: Error loading .env file. Application will use defaults or environment-set variables.');
    console.warn(`[Config] .env error details: ${envConfigResult.error.message}`);
} else {
    if (envConfigResult.parsed && Object.keys(envConfigResult.parsed).length > 0) {
        console.log('[Config] .env file loaded successfully.');
    } else if (envConfigResult.parsed) { // .env file was found but might be empty
        console.warn('[Config] Warning: .env file loaded but it appears to be empty or contains no recognized key-value pairs.');
    } else { // No .env file found, but no error from dotenv (e.g., if it's optional)
        console.log('[Config] No .env file found. Application will use defaults or environment-set variables.');
    }
}

// Import other configuration modules AFTER dotenv.config() has run,
// so they have access to process.env variables.
import databaseConfig from './database.config.js'; // Assumes database.config.js is in the same 'config' folder
import authConfig from './auth.config.js';     // Assumes auth.config.js is in the same 'config' folder

const emailConfig = {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    emailUser: process.env.EMAIL_USER,
    adminEmail: process.env.ADMIN_EMAIL,
    clientURL: process.env.CLIENT_URL || 'http://localhost:3000',
    emailFromName: process.env.EMAIL_FROM_NAME || 'Wise Clone',
};

const cloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'wise_clone_kyc',
};

const googleAuthConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
};

// Consolidate all configurations
const config = {
    nodeEnv: process.env.NODE_ENV || 'development', // Default to 'development' if not set
    port: process.env.PORT || 5000,
    database: databaseConfig, // Contains the resolved mongoUrl
    auth: authConfig,
    email: emailConfig,
    cloudinary: cloudinaryConfig,
    googleAuth: googleAuthConfig,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000', // Direct access for convenience
};

// Log the final, effective MongoDB URL that the application will attempt to use.
// This is very helpful for debugging connection issues.
console.log(`[Config] Final effective MongoDB URL for connection: ${config.database.mongoUrl}`);

export default config;