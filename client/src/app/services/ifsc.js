// frontend/src/services/ifsc.js
import axios from 'axios';
import apiConfig from '../config/apiConfig';

axios.defaults.baseURL = apiConfig.baseUrl;

const getBankDetailsByIFSC = async (ifscCode) => {
    try {
        const response = await axios.get(`/ifsc/${ifscCode}`); // Call backend IFSC endpoint
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch bank details for IFSC code.';
    }
};

export default {
    getBankDetailsByIFSC,
};