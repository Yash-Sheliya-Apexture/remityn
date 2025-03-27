// import dotenv from 'dotenv';
// dotenv.config(); // Load environment variables from .env file

// import databaseConfig from './database.config.js';
// import authConfig from './auth.config.js';

// export default {
//     database: databaseConfig,
//     auth: authConfig,
//     port: process.env.PORT || 5000, // Default port if not in .env
// };


import dotenv from 'dotenv';
dotenv.config();

import databaseConfig from './database.config.js';
import authConfig from './auth.config.js';

const emailConfig = {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    emailUser: process.env.EMAIL_USER, // Your email address for "From" field
    adminEmail: process.env.ADMIN_EMAIL, // Admin email for notifications (optional)
    clientURL: process.env.CLIENT_URL || 'http://localhost:3000', // Frontend URL
};


export default {
    database: databaseConfig,
    auth: authConfig,
    port: process.env.PORT || 5000,
    email: emailConfig, // Add email config
};