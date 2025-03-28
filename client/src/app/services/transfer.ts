// frontend/src/services/transfer.ts
import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Adjust path

axios.defaults.baseURL = apiConfig.baseUrl;

// Define interfaces if needed (e.g., SendSummary, TransferDetails)

const calculateSendSummary = async (data: {
    sourceAccountId: string;
    recipientId: string;
    amount: number;
    isSendingAmount: boolean;
}, token: string | null): Promise<any> => { // Use specific type instead of any
    const response = await axios.post('/transfers/calculate-summary', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const executeTransfer = async (transferData: any, token: string | null): Promise<any> => { // Use specific type
     const response = await axios.post('/transfers/execute', transferData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

 const getTransferDetails = async (transferId: string, token: string | null): Promise<any> => { // Use specific type
     const response = await axios.get(`/transfers/${transferId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

 const getUserTransfers = async (token: string | null): Promise<any[]> => { // Use specific type array
     const response = await axios.get('/transfers', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};


export default {
    calculateSendSummary,
    executeTransfer,
    getTransferDetails,
    getUserTransfers,
};