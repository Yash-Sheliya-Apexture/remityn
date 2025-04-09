// src/types/payment.ts

export interface User {
    fullName?: string; // Optional as it might not always be populated
    email?: string;    // Optional
}

export interface Currency {
    code?: string;     // Optional
}

export interface Payment {
    _id: string;
    user?: User;        // User can be optional
    amountToAdd: string | number; // Amount might be string or number from API
    payInCurrency?: Currency; // Optional
    status: string;
    createdAt: string;    // Required as per the original definition in AdminPaymentsPage
    referenceCode?: string; // Optional, but used in the modal/table
    // Add any other relevant properties your Payment object might have
}

// Define a type for API error responses if known (Optional but good practice)
export interface ApiErrorResponse {
    message: string;
    // Add other potential error properties
}