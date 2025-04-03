// // frontend/src/services/currency.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const getAllCurrencies = async () => {
//     try {
//         const response = await axios.get('/currencies');
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Error fetching currencies';
//     }
// };

// export default {
//     getAllCurrencies,
// };


// frontend/src/services/currency.js
import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Adjust path if needed

axios.defaults.baseURL = apiConfig.baseUrl;

// --- MODIFIED ---
// Function now correctly uses the includeRates flag to modify the URL
const getAllCurrencies = async (includeRates = false) => {
    try {
        // Construct the URL conditionally based on the flag
        const url = includeRates ? '/currencies?rates=true' : '/currencies';
        console.log(`Fetching currencies from: ${url}`); // Add log for debugging
        const response = await axios.get(url);
        console.log('Received currencies data:', response.data); // Add log
        return response.data; // Assuming response.data is the array of currencies
    } catch (error: any) { // Add type annotation for error
        console.error('Error fetching currencies:', error.response?.data || error.message); // Log error details
        // Re-throw a more specific error message if possible
        throw new Error(error.response?.data?.message || 'Error fetching currencies');
    }
};
// --- END MODIFIED ---

export default {
    getAllCurrencies,
};