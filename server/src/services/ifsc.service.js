// backend/src/services/ifsc.service.js
import axios from 'axios';
import config from '../config/index.js';

const getBankDetailsByIFSC = async (ifscCode) => {
    try {
        const response = await axios.get(`https://ifsc-code-verification-api1.p.rapidapi.com/ifsc/${ifscCode}`, { // Updated API endpoint URL
            headers: {
                'X-RapidAPI-Key': config.ifscApi.rapidApiKey,
                'X-RapidAPI-Host': 'ifsc-code-verification-api1.p.rapidapi.com', // Correct Host from image
                'useQueryString': true, // If required by the API
            },
        });

        if (response.status !== 200) {
            throw new Error(`IFSC API request failed with status ${response.status}`);
        }

        const data = response.data;

        if (data.BANK === "NA" || !data.BANK) { // Keep the error check
            throw new Error('Invalid IFSC code or bank details not found.');
        }


        return {
            bankName: data.BANK,
            branch: data.BRANCH,
            address: `${data.ADDRESS}, ${data.CITY}, ${data.DISTRICT}, ${data.STATE}`,
            city: data.CITY,
            district: data.DISTRICT,
            state: data.STATE,
        };

    } catch (error) {
        console.error('Error fetching bank details from IFSC API:', error);
        if (error.response && error.response.status === 404) {
            throw new Error('Invalid IFSC code.');
        }
        throw new Error('Failed to fetch bank details. Please try again.');
    }
};

export default {
    getBankDetailsByIFSC,
};