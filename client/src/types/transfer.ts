// frontend/src/types/transfer.ts
export interface Transfer {
    _id: string;
    user: {
        _id: string;
        fullName: string;
        email: string;
    };
    sourceAccount: any; // Define more specific type if needed
    recipient: {
        _id: string;
        accountHolderName: string;
        accountNumber?: string;
    };
    sendAmount: number;
    receiveAmount: number;
    sendCurrency: { code: string };
    receiveCurrency: { code: string };
    exchangeRate: number;
    fees: number; // Or number, depending if fees are always returned
    reason?: string;
    reference?: string;
    status: string;
    createdAt: string; // Date strings
    updatedAt: string;
    failureReason?: string; // Optional failure reason
    // ... other fields if any
}