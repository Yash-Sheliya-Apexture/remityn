import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import databaseConfig from './database.config.js';
import authConfig from './auth.config.js';

export default {
    database: databaseConfig,
    auth: authConfig,
    port: process.env.PORT || 5000, // Default port if not in .env
};