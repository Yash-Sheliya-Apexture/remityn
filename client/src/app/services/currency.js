// frontend/src/services/currency.js
import axios from 'axios';
import apiConfig from '../config/apiConfig';

axios.defaults.baseURL = apiConfig.baseUrl;

const getAllCurrencies = async () => {
    try {
        const response = await axios.get('/currencies');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error fetching currencies';
    }
};

export default {
    getAllCurrencies,
};