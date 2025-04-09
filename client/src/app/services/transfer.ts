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




// // frontend/src/services/transfer.ts
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path

// // Import the defined interfaces
// import {
//     SendSummaryRequest,
//     SendSummaryResponse,
//     ExecuteTransferRequest,
//     TransferDetails, // Assuming execute also returns full details, adjust if needed
//     CancelTransferResponse,
//     TransferListItem, // Use this or TransferDetails for getUserTransfers
// } from '../../types/transfer'; // Adjust path if interfaces are in a separate file

// axios.defaults.baseURL = apiConfig.baseUrl;

// const calculateSendSummary = async (
//     data: SendSummaryRequest,
//     token: string | null
// ): Promise<SendSummaryResponse> => { // Use specific type
//     const response = await axios.post<SendSummaryResponse>('/transfers/calculate-summary', data, { // Add response type generic
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const executeTransfer = async (
//     transferData: ExecuteTransferRequest,
//     token: string | null
// ): Promise<TransferDetails> => { // Use specific type (e.g., TransferDetails or a specific ExecuteResponse)
//      const response = await axios.post<TransferDetails>('/transfers/execute', transferData, { // Add response type generic
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  const getTransferDetails = async (
//      transferId: string,
//      token: string | null
// ): Promise<TransferDetails> => { // Use specific type
//      const response = await axios.get<TransferDetails>(`/transfers/${transferId}`, { // Add response type generic
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  // Choose TransferListItem[] or TransferDetails[] based on what your API actually returns
//  const getUserTransfers = async (
//      token: string | null
//  ): Promise<TransferListItem[]> => { // Use specific type array (e.g., TransferListItem[] or TransferDetails[])
//      const response = await axios.get<TransferListItem[]>('/transfers', { // Add response type generic
//         // Headers object will always be present if token is not null
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });
//     return response.data;
// };

// const cancelTransfer = async (
//     transferId: string,
//     token: string | null
// ): Promise<CancelTransferResponse> => { // Use specific return type
//     if (!transferId || !token) {
//         // Consider returning a rejected Promise or throwing a specific error type
//         throw new Error("Transfer ID and authentication token are required.");
//     }
//     try {
//         // --- Adjust HTTP method (POST or DELETE) and endpoint as per your backend ---
//         // Example using POST:
//         const response = await axios.post<CancelTransferResponse>(`/transfers/${transferId}/cancel`, {}, { // Empty body, add response type generic
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         // Example using DELETE:
//         // const response = await axios.delete<CancelTransferResponse>(`/transfers/${transferId}`, {
//         //    headers: { Authorization: `Bearer ${token}` },
//         // });

//         console.log(`Cancellation response for ${transferId}:`, response.data);
//         return response.data; // Return backend confirmation
//     } catch (error: unknown) { // Use unknown instead of any for better type safety in catch
//         // Type guard to check if it's an Axios error
//         if (axios.isAxiosError(error) && error.response) {
//             console.error(`API Error cancelling transfer ${transferId}:`, error.response.data);
//              // Use the error message from the backend if available
//             throw new Error(error.response.data?.message || 'Failed to cancel transfer. Please try again.');
//         } else if (error instanceof Error) {
//              console.error(`Error cancelling transfer ${transferId}:`, error.message);
//             throw new Error(`Failed to cancel transfer: ${error.message}`);
//         } else {
//             console.error(`Unknown error cancelling transfer ${transferId}:`, error);
//             throw new Error('An unknown error occurred while cancelling the transfer.');
//         }
//     }
// };

// // Fix the anonymous default export warning
// const transferService = {
//     calculateSendSummary,
//     executeTransfer,
//     getTransferDetails,
//     getUserTransfers,
//     cancelTransfer,
// };

// export default transferService;