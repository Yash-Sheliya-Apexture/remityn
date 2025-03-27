// backend/src/config/ifsc.config.js
export default {
    rapidApiKey: process.env.RAPIDAPI_IFSC_API_KEY || 'c4a7125b51msh158ec7980aa840bp182510jsn6d442234533e', // Make sure this matches your env variable name
    // No need to configure rapidApiHost here, it's in the request URL and headers now.
};