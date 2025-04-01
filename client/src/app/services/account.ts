// src/services/account.ts
// (Adjust path based on your project structure, e.g., frontend/src/services/account.ts)

import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Adjust path to your apiConfig file
import { Account } from '@/types/account'; // Adjust path to your Account type definition

// Set the base URL for account-related requests
// You might have already set this globally when setting up axios,
// but setting it here ensures it's configured for this service.
axios.defaults.baseURL = apiConfig.baseUrl;

/**
 * Fetches the accounts associated with the authenticated user.
 * Requires a valid authentication token.
 *
 * @param token - The JWT authentication token for the user.
 * @returns A promise that resolves to an array of Account objects.
 * @throws Throws an error if the request fails or the token is invalid.
 */
const getUserAccounts = async (token: string): Promise<Account[]> => {
    if (!token) {
        throw new Error('Authentication token is required to fetch accounts.');
    }
    try {
        // Make a GET request to the /api/accounts endpoint (adjust if your endpoint is different)
        // Expecting the response data to be an array of Account objects
        const response = await axios.get<Account[]>('/accounts', {
            headers: {
                // Include the Authorization header with the Bearer token
                Authorization: `Bearer ${token}`,
            },
        });
        // Return the data part of the response, which should be the array of accounts
        return response.data;
    } catch (error: any) {
        // Log the detailed error for debugging
        console.error("API Error fetching user accounts:", error.response?.data || error.message);

        // Throw a more specific error message for the frontend to handle
        throw new Error(error.response?.data?.message || 'Failed to fetch user accounts. Please try again.');
    }
};

// Export the service functions
const accountService = {
    getUserAccounts,
    // Add other account-related API functions here later (e.g., getAccountById, createAccount - though createAccount is already done via CurrencySelectorModal)
};

export default accountService;