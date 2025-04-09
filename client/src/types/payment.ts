// src/types/index.ts (or src/types/payments.ts)

export interface User {
    fullName?: string;
    email?: string;
}

export interface Currency {
    code?: string;
}

// Define the specific status union type
export type PaymentStatus = 'all' | 'pending' | 'in progress' | 'completed' | 'canceled';

// Define the canonical Payment type
export interface Payment {
    _id: string;
    user?: User; // Keep optional as it might not always be populated fully
    amountToAdd: string; // Keep as string as fetched from API in page.tsx
    payInCurrency?: Currency; // Optional
    // Use a more specific type for status if possible, otherwise string is okay
    // but we know the potential values, so let's try to be more specific, excluding 'all' here.
    status: 'pending' | 'in progress' | 'completed' | 'canceled' | string; // Allow string for flexibility if API returns other values
    createdAt: string; // Essential for sorting/filtering in page.tsx
    referenceCode?: string; // Used in Modal and Table
}

// You might want other shared types here as well