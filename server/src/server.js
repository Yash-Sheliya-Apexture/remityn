// import express from 'express';
// import cors from 'cors';
// import config from './config/index.js';
// import connectDB from './utils/database.js';
// import userRoutes from './routes/user.routes.js';
// import errorHandler from './middleware/error.middleware.js';
// import authRoutes from './routes/auth.routes.js';
// import authMiddleware from './middleware/auth.middleware.js'; // Import auth middleware
// import adminUserRoutes from './routes/admin/user.admin.routes.js'; // Example admin user routes
// import dotenv from 'dotenv';
// import helmet from 'helmet';
// import compression from 'compression';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';

// dotenv.config(); // Load environment variables

// const app = express();

// // Security middleware
// app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin-allow-popups" })); // Recommended security header

// // Compression middleware
// app.use(compression());

// // Logging middleware (for development)
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

// // CORS configuration - adjust allowedOrigins based on your frontend URL
// const allowedOrigins = [
//     'http://localhost:3000', // Your frontend development URL, adjust if different
//     // Add your production frontend URL here if you have one
// ];

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
// }));

// // Cookie parser middleware
// app.use(cookieParser());

// // Body parser middleware with size limit
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true })); // For URL-encoded bodies

// // Cache control middleware - for development, adjust for production if needed
// app.use((req, res, next) => {
//     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', '0');
//     next();
// });


// // Connect to MongoDB
// connectDB();

// // Health check endpoint
// app.get('/health', (req, res) => {
//     res.status(200).send('OK');
// });

// // API welcome endpoint - optional, but good practice
// app.get('/', (req, res) => {
//     res.send('Welcome to the API server!');
// });


// // Routes
// app.use('/api/auth', authRoutes); // Mount auth routes under /api/auth
// app.use('/api/dashboard/users', authMiddleware.protect, userRoutes); // Example dashboard user routes (adjust as needed)
// app.use('/api/admin/users', adminUserRoutes); // Mount admin user routes under /api/admin/users

// // Error handling middleware (must be after routes)
// app.use(errorHandler);

// const PORT = config.port;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import connectDB from './utils/database.js';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middleware/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import authMiddleware from './middleware/auth.middleware.js';
import adminUserRoutes from './routes/admin/user.admin.routes.js';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// import rateLimit from 'express-rate-limit'; // Import rate limiting middleware if you decide to use it

dotenv.config(); // Load environment variables from .env file

const app = express();

// Security Middleware Section
// Helmet helps secure Express apps by setting various HTTP headers.
app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin-allow-popups" })); // Recommended security header to prevent clickjacking and related attacks

// Compression middleware to compress response bodies for better performance.
app.use(compression());

// Logging middleware (Morgan) - only in development for logging HTTP requests.
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // 'dev' format is concise and colorful for development
}

// CORS Configuration - Cross-Origin Resource Sharing setup.
const allowedOrigins = [
    'http://localhost:3000', // Your frontend development URL - adjust if needed
    // Add your production frontend URL here to allow access from your domain
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) { // Allow requests with no origin (like mobile apps or curl) and from allowed origins
            callback(null, true); // Origin is allowed
        } else {
            callback(new Error('Not allowed by CORS')); // Origin is not in the allowed list
        }
        // Security note: Be very specific with allowedOrigins in production. Avoid '*' if possible.
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers in requests
    credentials: true, // Allow sending cookies from the frontend
}));

// Cookie parser middleware to parse cookies in requests.
app.use(cookieParser());

// Body parser middleware to parse JSON request bodies.
// Limit payload size to prevent potential Denial-of-Service (DoS) attacks.
app.use(express.json({ limit: '10kb' })); // Limit JSON payload to 10kb
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded request bodies

// Cache control middleware - for development to prevent caching of API responses.
// Adjust or remove in production based on your caching strategy.
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
    res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
    res.setHeader('Expires', '0'); // Proxies.
    next();
});


// Database Connection
connectDB(); // Establish MongoDB connection

// Health Check Endpoint - useful for monitoring and load balancers.
app.get('/health', (req, res) => {
    res.status(200).send('OK'); // Respond with 200 OK status
});

// API Welcome Endpoint - optional, for root path access.
app.get('/', (req, res) => {
    res.send('Welcome to the API server!'); // Simple welcome message
});

// API Routes - Mounting route handlers for different resources.
app.use('/api/auth', authRoutes); // Authentication routes (register, login) - no protection needed on these endpoints
app.use('/api/dashboard/users', authMiddleware.protect, userRoutes); // User routes under /dashboard - protected by authentication middleware
app.use('/api/admin/users', authMiddleware.protect, authMiddleware.admin, adminUserRoutes); // Admin user routes under /admin - protected by auth and admin role middleware

// Error Handling Middleware - must be defined after all routes.
// This middleware will catch any errors thrown in route handlers or middleware above.
app.use(errorHandler);

// Server Startup
const PORT = config.port; // Get port from config (environment variables or default)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log server start message
});