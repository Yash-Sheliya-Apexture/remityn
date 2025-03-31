// frontend/src/services/admin/currency.ts
import axios from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path if necessary

axios.defaults.baseURL = apiConfig.baseUrl;

const getAllCurrenciesAdmin = async (token: string) => {
    try {
        const response = await axios.get('/admin/currencies', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching admin currencies:", error);
        throw error.response?.data?.message || 'Failed to fetch currencies.';
    }
};

const getCurrencyByIdAdmin = async (currencyId: string, token: string) => {
    try {
        const response = await axios.get(`/admin/currencies/${currencyId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching admin currency by ID ${currencyId}:`, error);
        throw error.response?.data?.message || 'Failed to fetch currency details.';
    }
};

const createCurrencyAdmin = async (currencyData: any, token: string) => {
    try {
        const response = await axios.post('/admin/currencies', currencyData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating admin currency:", error);
        throw error.response?.data?.message || 'Failed to create currency.';
    }
};

const updateCurrencyAdmin = async (currencyId: string, currencyData: any, token: string) => {
    try {
        const response = await axios.put(`/admin/currencies/${currencyId}`, currencyData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating admin currency by ID ${currencyId}:`, error);
        throw error.response?.data?.message || 'Failed to update currency.';
    }
};

const deleteCurrencyAdmin = async (currencyId: string, token: string) => {
    try {
        const response = await axios.delete(`/admin/currencies/${currencyId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Or perhaps return response.status === 204 for delete success
    } catch (error) {
        console.error(`Error deleting admin currency by ID ${currencyId}:`, error);
        throw error.response?.data?.message || 'Failed to delete currency.';
    }
};

export default {
    getAllCurrenciesAdmin,
    getCurrencyByIdAdmin,
    createCurrencyAdmin,
    updateCurrencyAdmin,
    deleteCurrencyAdmin,
};