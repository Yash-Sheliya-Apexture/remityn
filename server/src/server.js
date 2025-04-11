// import express from 'express';
// import cors from 'cors';
// import config from './config/index.js';
// import connectDB from './utils/database.js';
// import userRoutes from './routes/user.routes.js';
// import errorHandler from './middleware/error.middleware.js';
// import authRoutes from './routes/auth.routes.js';
// import authMiddleware from './middleware/auth.middleware.js';
// import adminUserRoutes from './routes/admin/user.admin.routes.js';
// import accountRoutes from './routes/account.routes.js'; // Import account routes
// import currencyRoutes from './routes/currency.routes.js'; // Import currency routes
// import adminCurrencyRoutes from './routes/admin/currency.admin.routes.js'; // Import admin currency routes
// import adminPaymentRoutes from './routes/admin/payment.admin.routes.js'; // Import admin payment routes
// import paymentRoutes from './routes/payment.routes.js'; // Import payment routes
// import exchangeRateRoutes from './routes/exchangeRate.routes.js';
// import exchangeRateService from './services/exchangeRate.service.js';
// import recipientRoutes from './routes/recipient.routes.js'; // Import recipient routes
// import transferRoutes from './routes/transfer.routes.js'; // Import transfer routes
// import adminTransferRoutes from './routes/admin/transfer.admin.routes.js'; // <-- Import Admin transfer routes
// import cron from 'node-cron';
// import dotenv from 'dotenv';
// import helmet from 'helmet';
// import compression from 'compression';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';
// import path from 'path'; // Import path module
// import { fileURLToPath } from 'url'; // Import fileURLToPath from 'url'
// import { dirname } from 'path';      // Import dirname from 'path'

// dotenv.config(); // Load environment variables from .env file

// const app = express();

// // Security Middleware Section
// // Helmet helps secure Express apps by setting various HTTP headers.
// app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin-allow-popups" })); // Recommended security header to prevent clickjacking and related attacks

// // Compression middleware to compress response bodies for better performance.
// app.use(compression());

// // Logging middleware (Morgan) - only in development for logging HTTP requests.
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev')); // 'dev' format is concise and colorful for development
// }

// // CORS Configuration - Cross-Origin Resource Sharing setup.
// const allowedOrigins = [
//     'http://localhost:3000', // Your frontend development URL - adjust if needed
//     // Add your production frontend URL here to allow access from your domain
// ];

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) { // Allow requests with no origin (like mobile apps or curl) and from allowed origins
//             callback(null, true); // Origin is allowed
//         } else {
//             callback(new Error('Not allowed by CORS')); // Origin is not in the allowed list
//         }
//         // Security note: Be very specific with allowedOrigins in production. Avoid '*' if possible.
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers in requests
//     credentials: true, // Allow sending cookies from the frontend
// }));

// // Cookie parser middleware to parse cookies in requests.
// app.use(cookieParser());

// // Body parser middleware to parse JSON request bodies.
// // Limit payload size to prevent potential Denial-of-Service (DoS) attacks.
// app.use(express.json({ limit: '10kb' })); // Limit JSON payload to 10kb
// app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded request bodies

// // Cache control middleware - for development to prevent caching of API responses.
// // Adjust or remove in production based on your caching strategy.
// app.use((req, res, next) => {
//     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
//     res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
//     res.setHeader('Expires', '0'); // Proxies.
//     next();
// });


// // Database Connection
// connectDB(); // Establish MongoDB connection

// // Health Check Endpoint - useful for monitoring and load balancers.
// app.get('/health', (req, res) => {
//     res.status(200).send('OK'); // Respond with 200 OK status
// });

// // API Welcome Endpoint - optional, for root path access.
// app.get('/', (req, res) => {
//     res.send('Welcome to the API server!'); // Simple welcome message
// });

// // --- START OF FIX ---
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// // --- END OF FIX ---

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // API Routes - Mounting route handlers for different resources.
// app.use('/api/auth', authRoutes); // Authentication routes (register, login) - no protection needed on these endpoints
// app.use('/api/dashboard/users', authMiddleware.protect, userRoutes); // User routes under /dashboard - protected by authentication middleware
// app.use('/api/admin/users', authMiddleware.protect, authMiddleware.admin, adminUserRoutes); // Admin user routes under /admin - protected by auth and admin role middleware
// app.use('/api/admin/currencies', adminCurrencyRoutes); // Mount admin currency routes under /api/admin/currencies
// app.use('/api/admin/payments', adminPaymentRoutes); // Mount admin payment routes under /api/admin/payments - already protected in route file
// app.use('/api/accounts', accountRoutes); // Mount account routes under /api/accounts
// app.use('/api/currencies', currencyRoutes); // Mount currency routes
// app.use('/api/payments', paymentRoutes); // Mount payment routes under /api/payments
// app.use('/api/exchange-rates', exchangeRateRoutes); // Mount exchange rate routes
// app.use('/api/recipients', recipientRoutes); // Mount recipient routes
// app.use('/api/transfers', authMiddleware.protect, transferRoutes); // Mount and protect transfer routes
// app.use('/api/admin/transfers', authMiddleware.protect, authMiddleware.admin, adminTransferRoutes); // Mount admin transfer routes

// // Schedule cron job to update exchange rates every 12 hours (adjust time as needed)
// // Runs at 00:00 and 12:00 every day
// cron.schedule('0 0,12 * * *', async () => {
//     console.log('Running exchange rate update cron job...');
//     const updateSuccessful = await exchangeRateService.updateExchangeRates();
//     if (updateSuccessful) {
//         console.log('Exchange rate update cron job completed successfully.');
//     } else {
//         console.error('Exchange rate update cron job failed.');
//     }
// });

// // Initial exchange rate update when server starts (optional - useful to have data immediately)
// exchangeRateService.updateExchangeRates().then(success => {
//     if (success) {
//         console.log('Initial exchange rates loaded on server start.');
//     } else {
//         console.error('Initial exchange rate load failed on server start.');
//     }
// });


// // Error Handling Middleware - must be defined after all routes.
// // This middleware will catch any errors thrown in route handlers or middleware above.
// app.use(errorHandler);

// // Server Startup
// const PORT = config.port; // Get port from config (environment variables or default)

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`); // Log server start message
// });



// server.js
import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import connectDB from './utils/database.js';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middleware/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import authMiddleware from './middleware/auth.middleware.js';
import adminUserRoutes from './routes/admin/user.admin.routes.js';
import accountRoutes from './routes/account.routes.js'; // Import account routes
import currencyRoutes from './routes/currency.routes.js'; // Import currency routes
import adminCurrencyRoutes from './routes/admin/currency.admin.routes.js'; // Import admin currency routes
import adminPaymentRoutes from './routes/admin/payment.admin.routes.js'; // Import admin payment routes
import paymentRoutes from './routes/payment.routes.js'; // Import payment routes
import exchangeRateRoutes from './routes/exchangeRate.routes.js';
import exchangeRateService from './services/exchangeRate.service.js';
import recipientRoutes from './routes/recipient.routes.js'; // Import recipient routes
import transferRoutes from './routes/transfer.routes.js'; // Import transfer routes
import adminTransferRoutes from './routes/admin/transfer.admin.routes.js'; // <-- Import Admin transfer routes
import cron from 'node-cron';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path'; // Import path module
import { fileURLToPath } from 'url'; // Import fileURLToPath from 'url'
import { dirname } from 'path';      // Import dirname from 'path'
import rateLimit from 'express-rate-limit'; // Import rate limiter

dotenv.config(); // Load environment variables from .env file

const app = express();

// Security Middleware Section
// Helmet helps secure Express apps by setting various HTTP headers.
app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin-allow-popups" })); // Recommended security header to prevent clickjacking and related attacks
app.use(helmet.hidePoweredBy()); // Hide the X-Powered-By header
app.use(helmet.xssFilter()); // Enable XSS filter
app.use(helmet.noSniff()); // Prevent MIME type sniffing
app.use(helmet.ieNoOpen()); //  Sets X-Download-Options for IE8+
app.use(helmet.frameguard({ action: 'deny' })); // Prevent clickjacking by denying iframe embedding
app.use(helmet.contentSecurityPolicy({ // Helps prevent cross-site scripting attacks
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // or use a nonce/hash
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "ws:"], // If you use websockets
    },
}));


// Rate Limiting - Apply to authentication routes to prevent brute-force attacks
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to authentication routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);
app.use('/api/auth/reset-password', authLimiter);


// Compression middleware to compress response bodies for better performance.
app.use(compression());

// Logging middleware (Morgan) - only in development for logging HTTP requests.
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // 'dev' format is concise and colorful for development
}

// CORS Configuration - Cross-Origin Resource Sharing setup.
const allowedOrigins = [
    'http://localhost:3000',
    'https://wise-lime.vercel.app' // Your frontend development URL - adjust if needed
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

// --- START OF FIX ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// --- END OF FIX ---

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes - Mounting route handlers for different resources.
app.use('/api/auth', authRoutes); // Authentication routes (register, login) - no protection needed on these endpoints
app.use('/api/dashboard/users', authMiddleware.protect, userRoutes); // User routes under /dashboard - protected by authentication middleware
app.use('/api/admin/users', authMiddleware.protect, authMiddleware.admin, adminUserRoutes); // Admin user routes under /admin - protected by auth and admin role middleware
app.use('/api/admin/currencies', authMiddleware.protect, authMiddleware.admin, adminCurrencyRoutes); // Mount admin currency routes under /api/admin/currencies - protected by auth and admin role middleware
app.use('/api/admin/payments', authMiddleware.protect, authMiddleware.admin, adminPaymentRoutes); // Mount admin payment routes under /api/admin/payments - protected by auth and admin role middleware
app.use('/api/accounts', authMiddleware.protect, accountRoutes); // Mount account routes under /api/accounts - protected routes
app.use('/api/currencies', currencyRoutes); // Mount currency routes - public routes
app.use('/api/payments', authMiddleware.protect, paymentRoutes); // Mount payment routes under /api/payments - protected routes
app.use('/api/exchange-rates', exchangeRateRoutes); // Mount exchange rate routes - public routes, added currencyRoutes as middleware just as example, remove if not needed
app.use('/api/recipients', authMiddleware.protect, recipientRoutes); // Mount recipient routes - protected routes
app.use('/api/transfers', authMiddleware.protect, transferRoutes); // Mount and protect transfer routes
app.use('/api/admin/transfers', authMiddleware.protect, authMiddleware.admin, adminTransferRoutes); // Mount admin transfer routes - protected and admin only

// Schedule cron job to update exchange rates every 12 hours (adjust time as needed)
// Runs at 00:00 and 12:00 every day
cron.schedule('0 0,12 * * *', async () => {
    console.log('Running exchange rate update cron job...');
    const updateSuccessful = await exchangeRateService.updateExchangeRates();
    if (updateSuccessful) {
        console.log('Exchange rate update cron job completed successfully.');
    } else {
        console.error('Exchange rate update cron job failed.');
    }
});

// Initial exchange rate update when server starts (optional - useful to have data immediately)
exchangeRateService.updateExchangeRates().then(success => {
    if (success) {
        console.log('Initial exchange rates loaded on server start.');
    } else {
        console.error('Initial exchange rate load failed on server start.');
    }
});


// Error Handling Middleware - must be defined after all routes.
// This middleware will catch any errors thrown in route handlers or middleware above.
app.use(errorHandler);

// Server Startup
const PORT = config.port; // Get port from config (environment variables or default)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log server start message
});
