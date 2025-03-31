// frontend/src/services/admin/transfer.ts
import axios from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path if necessary

axios.defaults.baseURL = apiConfig.baseUrl;


const getAdminTransfers = async (token: string, filters?: { status?: string }) => {
    try {
        const params = filters || {}; // Use filters if provided, else empty object
        const response = await axios.get('/admin/transfers', {
            headers: { Authorization: `Bearer ${token}` },
            params: params, // Pass filters as query parameters
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching admin transfers:", error);
        throw error.response?.data?.message || 'Failed to fetch transfers.';
    }
};

const getAdminTransferById = async (transferId: string, token: string) => {
    try {
        const response = await axios.get(`/admin/transfers/${transferId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching admin transfer by ID ${transferId}:`, error);
        throw error.response?.data?.message || 'Failed to fetch transfer details.';
    }
};

const updateAdminTransferStatus = async (transferId: string, newStatus: string, failureReason: string | null, token: string) => {
    try {
        const payload = { status: newStatus };
        if (failureReason) {
            payload['failureReason'] = failureReason; // Include failure reason if provided
        }
        const response = await axios.put(`/admin/transfers/${transferId}/status`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating transfer status for ${transferId} to ${newStatus}:`, error);
        throw error.response?.data?.message || 'Failed to update transfer status.';
    }
};

export default {
    getAdminTransfers,
    getAdminTransferById,
    updateAdminTransferStatus,
};