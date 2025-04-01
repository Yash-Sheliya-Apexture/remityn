// // frontend/src/services/transfer.ts
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Define interfaces if needed (e.g., SendSummary, TransferDetails)

// const calculateSendSummary = async (data: {
//     sourceAccountId: string;
//     recipientId: string;
//     amount: number;
//     isSendingAmount: boolean;
// }, token: string | null): Promise<any> => { // Use specific type instead of any
//     const response = await axios.post('/transfers/calculate-summary', data, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const executeTransfer = async (transferData: any, token: string | null): Promise<any> => { // Use specific type
//      const response = await axios.post('/transfers/execute', transferData, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  const getTransferDetails = async (transferId: string, token: string | null): Promise<any> => { // Use specific type
//      const response = await axios.get(`/transfers/${transferId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  const getUserTransfers = async (token: string | null): Promise<any[]> => { // Use specific type array
//      const response = await axios.get('/transfers', {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };


// export default {
//     calculateSendSummary,
//     executeTransfer,
//     getTransferDetails,
//     getUserTransfers,
// };




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
        // Ensure token is passed in headers for protected routes
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
    });
    return response.data;
};
const cancelTransfer = async (transferId: string, token: string | null): Promise<any> => { // Return type might be void or specific confirmation
    if (!transferId || !token) {
        throw new Error("Transfer ID and authentication token are required.");
    }
    try {
        // --- Adjust HTTP method (POST or DELETE) and endpoint as per your backend ---
        // Example using POST:
        const response = await axios.post(`/transfers/${transferId}/cancel`, {}, { // Empty body if no data needed
            headers: { Authorization: `Bearer ${token}` },
        });
        // Example using DELETE:
        // const response = await axios.delete(`/transfers/${transferId}`, {
        //    headers: { Authorization: `Bearer ${token}` },
        // });

        console.log(`Cancellation response for ${transferId}:`, response.data);
        return response.data; // Return backend confirmation if any
    } catch (error: any) {
        console.error(`API Error cancelling transfer ${transferId}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to cancel transfer. Please try again.');
    }
};

export default {
    calculateSendSummary,
    executeTransfer,
    getTransferDetails,
    getUserTransfers,
    cancelTransfer,
};