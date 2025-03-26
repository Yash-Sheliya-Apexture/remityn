// frontend/src/services/exchangeRate.js
import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Assuming you have this config

axios.defaults.baseURL = apiConfig.baseUrl;

const getExchangeRatesForCurrencies = async () => {
    try {
        const response = await axios.get('/exchange-rates'); // Backend endpoint for ALL rates

        // Extract the rates from the nested structure: response.data.rates.rates
        const ratesData = response.data.rates?.rates;
        console.log(ratesData) // Keep this console.log for now

        if (ratesData) {
            return { rates: response.data.rates }; // Return the whole rates object
        } else {
            throw new Error('No exchange rates data received from the server in the expected format.');
        }

    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        throw error.response?.data?.message || 'Failed to fetch exchange rates.';
    }
};

export default {
    getExchangeRatesForCurrencies,
};