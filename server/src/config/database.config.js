// export default {
//     mongoUrl: process.env.MONGO_URI || 'mongodb+srv://yashmorenainfotech6:vDl2PO8fAYoVCd6A@cluster0.ibpvm.mongodb.net/wise?retryWrites=true&w=majority&appName=Cluster0', // Replace with your MongoDB URI or connection string - IMPORTANT!
// };

// config/database.config.js

// IMPORTANT: dotenv.config() should have been called in config/index.js BEFORE this file is imported.
// This ensures process.env variables are populated.

// Base components for constructing a default MongoDB URI.
// These can be overridden by setting corresponding environment variables.
const defaultMongoUser = process.env.MONGO_USER || 'yashmorenainfotech6';
// SECURITY WARNING: It's best to avoid hardcoding credentials.
// Prefer setting MONGO_PASS as an environment variable.
// The value below is used as a fallback if MONGO_PASS is not set.
const defaultMongoPass = process.env.MONGO_PASS || 'vDl2PO8fAYoVCd6A';
const defaultMongoCluster = process.env.MONGO_CLUSTER_URL || 'cluster0.ibpvm.mongodb.net';
const defaultMongoOptions = process.env.MONGO_OPTIONS || 'retryWrites=true&w=majority&appName=Cluster0';

let determinedDbName;
const nodeEnv = process.env.NODE_ENV; // This should be set by dotenv.config() in index.js

if (nodeEnv === 'production') {
    // For production environment
    determinedDbName = process.env.MONGO_DB_NAME_PROD || 'remityn';
} else {
    // For development or any other environment (e.g., staging, test)
    determinedDbName = process.env.MONGO_DB_NAME_DEV || 'wise';
}

// Construct the default MongoDB URI if MONGO_URI is not explicitly set in .env
// URL-encode user and password in case they contain special characters.
const defaultConstructedMongoUri = `mongodb+srv://${encodeURIComponent(defaultMongoUser)}:${encodeURIComponent(defaultMongoPass)}@${defaultMongoCluster}/${determinedDbName}?${defaultMongoOptions}`;

// Use the MONGO_URI from .env if it's explicitly set, otherwise use the dynamically constructed default.
const mongoUrlToUse = process.env.MONGO_URI || defaultConstructedMongoUri;

// Logging for verification (runs when this module is imported and evaluated)
// This provides insight into which URI is being selected.
if (process.env.MONGO_URI) {
    let currentDbNameInUri = 'N/A (could not parse from MONGO_URI)';
    try {
        // Attempt to parse DB name from a full URI for logging
        const url = new URL(process.env.MONGO_URI);
        if (url.pathname && url.pathname.length > 1) {
            // Get part after first '/' and before '?' (if any)
            currentDbNameInUri = url.pathname.substring(1).split('?')[0];
        }
    } catch (e) {
        // Silently ignore if URI isn't a standard URL format (e.g., older connection strings)
        // console.warn(`[DB Config] Could not parse DB name from MONGO_URI for logging: ${e.message}`);
    }
    console.log(`[DB Config] Using explicit MONGO_URI from environment. (NODE_ENV: ${nodeEnv || 'not set'}). Effective DB in URI: ${currentDbNameInUri}`);
} else {
    console.log(`[DB Config] MONGO_URI not found in environment. Using constructed default URI. (NODE_ENV: ${nodeEnv || 'not set'}). Effective DB: ${determinedDbName}`);
}

// Sanity check for common placeholder values in the final URI
if (mongoUrlToUse.includes('YOUR_USER') ||
    mongoUrlToUse.includes('YOUR_PASSWORD') ||
    mongoUrlToUse.toLowerCase().includes('placeholder_cluster') ||
    mongoUrlToUse.toLowerCase().includes('placeholder_db')) {
    console.error("[DB Config] CRITICAL: MongoDB URI appears to contain placeholder values. Please check your .env file and database configuration.");
    // Optionally, throw an error to prevent the application from starting with an invalid configuration:
    // throw new Error("MongoDB URI contains placeholder values. Application startup halted.");
}


export default {
    mongoUrl: mongoUrlToUse,
};