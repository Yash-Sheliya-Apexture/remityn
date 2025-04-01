// frontend/src/services/payment.ts
import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Adjust path

axios.defaults.baseURL = apiConfig.baseUrl;

// Define interfaces for request/response data (optional, but recommended for type safety)
// Example interfaces (adjust based on your backend API contracts)
interface CalculatePaymentSummaryPayload {
    balanceCurrencyCode: string;
    payInCurrencyCode: string;
    amountToAdd: number;
}

interface InitiatePaymentPayload {
    paymentSummary: any; // Define based on what your backend expects
}

interface PaymentDetailsResponse {
    // Define properties based on your backend's payment details response
    _id: string;
    // ... other properties
}

interface PaymentSummaryResponse {
    // Define properties based on your backend's payment summary response
    amountToPay: number;
    exchangeRate: number;
    wiseFee: number;
    bankTransferFee: number;
    balanceCurrencyCode: string;
    payInCurrencyCode: string;
    amountToAdd: number;
    userId: string;
    // ... other properties
}

const calculatePaymentSummary = async (data: CalculatePaymentSummaryPayload, token: string | null): Promise<PaymentSummaryResponse> => {
    const response = await axios.post('/payments/add-money/calculate-summary', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const initiatePaymentAndSave = async (paymentSummary: InitiatePaymentPayload, token: string | null): Promise<PaymentDetailsResponse> => {
    const response = await axios.post('/payments/add-money/initiate', paymentSummary, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const getPaymentDetails = async (paymentId: string, token: string | null): Promise<PaymentDetailsResponse> => {
    const response = await axios.get(`/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const getUserPayments = async (token: string | null): Promise<PaymentDetailsResponse[]> => {
    const response = await axios.get('/payments', { // Assuming '/payments' endpoint fetches user's payments
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const cancelPayment = async (paymentId: string, token: string | null): Promise<PaymentDetailsResponse> => {
    const response = await axios.post(`/payments/${paymentId}/cancel`, {}, { // Assuming empty body for cancel request
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};


export default {
    calculatePaymentSummary,
    initiatePaymentAndSave,
    getPaymentDetails,
    getUserPayments,
    cancelPayment,
};