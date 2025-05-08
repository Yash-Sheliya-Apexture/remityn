// frontend/src/services/admin/stats.admin.ts
import axios, { AxiosError } from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path if needed


export interface PopularCorridorStat {
    sendCurrencyCode: string;
    receiveCurrencyCode: string;
    count: number;
    percentage: number;
    // Optional: if you add names/flags from backend
    // sendCurrencyName?: string;
    // receiveCurrencyName?: string;
}

// Define the expected structure for individual dashboard stats
export interface AdminDashboardStats {
    totalUsers: number;
    growthPercentageThisWeek: number;
    todaysAddMoneyCount: number;         // <-- ADD THIS
    addMoneyChangePercentage: number;   // <-- ADD THIS
    todaysSendMoneyCount: number;         // <-- ADD THIS
    sendMoneyChangePercentage: number;    // <-- ADD THIS
    completedTransfersThisMonth: number;  // <-- ADD THIS
    completedTransfersChangeCount: number;// <-- ADD THIS
    popularCorridors: PopularCorridorStat[]; // <-- ADD THIS
    // --- ADDED/UPDATED KYC fields ---
    kycNotStartedCount: number; // Added
    kycPendingCount: number;
    kycVerifiedCount: number;
    kycRejectedCount: number; // Added
    kycSkippedCount: number;
    // --- END ADDED/UPDATED ---
}

// Define the structure for the API response that wraps the stats data
interface AdminDashboardStatsApiResponse {
    success: boolean;
    data: AdminDashboardStats;
    message?: string; // Optional message from backend
}

// Interface for potential API error responses (if backend sends structured errors)
interface ApiErrorData {
    message?: string;
    // Add other potential error fields if your backend sends them
}


// --- NEW: Interface for Chart Data Point ---
export interface ChartDataPoint {
    date: string; // Format 'YYYY-MM-DD'
    volume: number;
}

// --- NEW: Interface for Chart API Response ---
export interface ChartDataResponse {
    success: boolean;
    data: ChartDataPoint[];
    message?: string; // Optional error message
}

// --- Axios Client Setup (reuse or create new if specific config needed) ---
// This assumes you have a shared apiClient or can create one here.
// If you already have user.admin.ts with apiClient, you might want to centralize it.
const apiClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Important for session cookies or future auth mechanisms
});

// --- Authorization Token Interceptor (same as in user.admin.ts) ---
apiClient.interceptors.request.use(config => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    console.error("[Admin Stats API Interceptor] Request error:", error);
    return Promise.reject(error);
});

// --- Helper to Extract Error Message (can be shared) ---
const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorData>;
        if (axiosError.response) {
            console.error("Admin Stats API Error Response:", {
                status: axiosError.response.status,
                data: axiosError.response.data,
                url: axiosError.config?.url,
            });
            return axiosError.response.data?.message || axiosError.message || `Request failed with status ${axiosError.response.status}`;
        } else if (axiosError.request) {
            return 'Network error: Could not connect to the server.';
        } else {
            return `Request setup failed: ${axiosError.message}`;
        }
    } else if (error instanceof Error) {
        return error.message;
    }
    return 'An unknown error occurred.';
};


// --- Admin Stats Service Functions ---

/**
 * Fetches overview statistics for the admin dashboard.
 * @returns {Promise<AdminDashboardStats>} A promise resolving to the stats object.
 * @throws {Error} If the request fails or data is invalid.
 */
const getAdminDashboardOverviewStats = async (): Promise<AdminDashboardStats> => {
    try {
        console.log('[Admin Stats Service] Fetching dashboard overview stats...');
        const response = await apiClient.get<AdminDashboardStatsApiResponse>(`/admin/stats/overview`);

        if (response.data && response.data.success && response.data.data) {
            console.log('[Admin Stats Service] Stats fetched successfully:', response.data.data);
            return response.data.data;
        } else {
            console.error('[Admin Stats Service] Invalid stats response format:', response.data);
            throw new Error(response.data?.message || 'Invalid data received for dashboard stats.');
        }
    } catch (error: unknown) {
        const message = getErrorMessage(error);
        console.error(`[Admin Stats Service] Error fetching dashboard overview stats: ${message}`, error);
        throw new Error(message);
    }
};

// --- NEW: Function to fetch Chart Data ---
type ChartType = 'payments' | 'transfers';
type ChartRange = 'month' | 'year';

const getAdminChartData = async (type: ChartType, range: ChartRange): Promise<ChartDataPoint[]> => {
    try {
        console.log(`Fetching chart data - Type: ${type}, Range: ${range}`); // Log frontend call
        const response = await apiClient.get<ChartDataResponse>(`/admin/stats/chart-data`, {
            params: { type, range }
        });
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
            console.log(`Received ${response.data.data.length} data points for ${type}/${range}`);
            return response.data.data;
        }
        // Throw error if success is false or data is not an array
        throw new Error(response.data?.message || `Invalid data received for ${type} chart.`);
    } catch (error: unknown) {
        console.error(`Error fetching chart data for ${type}/${range}:`, error);
        // Re-throw the processed error message
        throw new Error(getErrorMessage(error));
    }
};
// --- END NEW ---

const statsAdminService = {
    getAdminDashboardOverviewStats,
    getAdminChartData, // <-- Export new function
};

export default statsAdminService;
export type { ChartType, ChartRange }; // Export new types