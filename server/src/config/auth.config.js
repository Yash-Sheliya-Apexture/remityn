export default {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-jwt-key', // Replace with a strong, secure secret in production - IMPORTANT!
    jwtExpiration: '1h', // Token expiration time - adjust as needed
};