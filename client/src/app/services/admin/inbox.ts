// frontend/src/services/admin/inbox.ts
import axios, { AxiosError } from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path

// --- Interfaces ---

interface UserSnippet {
    _id: string;
    fullName?: string | null;
    email?: string | null;
}

export interface AdminInboxMessage {
    _id: string;
    userId: UserSnippet; // Nested user info
    sender: string;       // <-- Ensure this exists
    subject: string;
    body: string;
    isRead: boolean;
    sentAt: string; // ISO Date string
    readAt?: string | null; // ISO Date string or null
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
}

export interface AdminInboxListResponse {
    messages: AdminInboxMessage[];
    currentPage: number;
    totalPages: number;
    totalMessages: number;
}

export interface AdminUpdatePayload {
    subject: string;
    body: string;
}

export interface AdminUpdateResponse { // Response when updating
    message: string;
    data: AdminInboxMessage; // The updated message object
}

export interface AdminDeleteResponse {
    success: boolean;
    message: string;
}

interface ApiErrorData {
    message?: string;
    errors?: any[];
}

// --- Axios Client ---
const apiClient = axios.create({
    // ... (keep existing setup)
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(config => {
    // ... (keep existing interceptor)
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    console.error("[Admin Inbox API Interceptor] Request error:", error);
    return Promise.reject(error);
});

// --- Error Helper ---
const getErrorMessage = (error: unknown): string => {
    // ... (keep existing helper)
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorData>;
        if (axiosError.response) {
            // console.error("Admin Inbox API Error Response:", { /* ... logging */ });
            return axiosError.response.data?.message || axiosError.message || `Request failed with status ${axiosError.response.status}`;
        } else if (axiosError.request) {
            //  console.error("Admin Inbox API No Response Error:", axiosError.request);
            return 'Network error: Could not connect to the server.';
        } else {
            //  console.error("Admin Inbox API Request Setup Error:", axiosError.message);
            return `Request setup failed: ${axiosError.message}`;
        }
    } else if (error instanceof Error) {
        //  console.error("Non-API Error (Admin Inbox Service):", error);
        return error.message;
    } else {
        //  console.error("Unknown Error Type (Admin Inbox Service):", error);
        return 'An unknown error occurred.';
    }
};


// --- Service Functions ---

/**
 * Fetches all inbox messages across users for the admin panel.
 */
const getAllMessagesAdmin = async (
    // ... (keep existing params)
    page = 1,
    limit = 15,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    userId?: string | null,
    readStatus?: boolean | null
): Promise<AdminInboxListResponse> => {
    // ... (keep existing implementation)
    try {
        const params: Record<string, any> = { page, limit, sortBy, sortOrder };
        if (userId) params.userId = userId;
        if (readStatus !== null && readStatus !== undefined) params.read = readStatus; // 'read' is the query param name

        // console.log('[Admin Inbox Service] Fetching all messages with params:', params);
        const response = await apiClient.get<AdminInboxListResponse>('/admin/inbox', { params });
        // console.log('[Admin Inbox Service] Messages fetched:', response.data);

        if (!response.data || !Array.isArray(response.data.messages)) {
            console.error("[Admin Inbox Service] Received invalid message list data structure:", response.data);
            throw new Error("Invalid data received from server for message list.");
        }
        return response.data;
    } catch (error: unknown) {
        console.error(`[Admin Inbox Service] Error fetching all messages:`, error);
        const message = getErrorMessage(error);
        throw new Error(message);
    }
};

/**
 * Admin updates a specific inbox message (subject/body) by its ID.
 */
const updateMessageAdmin = async (
    messageId: string,
    payload: AdminUpdatePayload
): Promise<AdminUpdateResponse> => {
    if (!messageId) {
        throw new Error("Message ID is required for update.");
    }
    if (!payload || !payload.subject || !payload.body) {
        throw new Error("Subject and body are required for update.");
    }

    try {
        console.log(`[Admin Inbox Service] Updating message ${messageId}...`);
        const response = await apiClient.put<AdminUpdateResponse>(`/admin/inbox/${messageId}`, payload);
        console.log(`[Admin Inbox Service] Message ${messageId} updated successfully.`);
        return response.data;
    } catch (error: unknown) {
        console.error(`[Admin Inbox Service] Error updating message ${messageId}:`, error);
        const message = getErrorMessage(error);
        throw new Error(message);
    }
};


/**
 * Admin deletes a specific inbox message by its ID.
 */
const deleteMessageAdmin = async (messageId: string): Promise<AdminDeleteResponse> => {
    // ... (keep existing implementation)
    if (!messageId) {
        throw new Error("Message ID is required.");
    }
    try {
        // console.log(`[Admin Inbox Service] Deleting message ${messageId}...`);
        const response = await apiClient.delete<AdminDeleteResponse>(`/admin/inbox/${messageId}`);
        // console.log(`[Admin Inbox Service] Message ${messageId} deleted successfully.`);
        return response.data;
    } catch (error: unknown) {
        console.error(`[Admin Inbox Service] Error deleting message ${messageId}:`, error);
        const message = getErrorMessage(error);
        throw new Error(message);
    }
};


// --- Export Service Object ---
const inboxAdminService = {
    getAllMessagesAdmin,
    updateMessageAdmin, // <-- ADD NEW
    deleteMessageAdmin,
};

export default inboxAdminService;