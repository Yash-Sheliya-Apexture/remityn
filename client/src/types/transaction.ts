// // frontend/src/types/transaction.ts
// export interface Transaction {
//     _id: string;
//     type: "Add Money" | "Send Money";
//     name?: string;
//     description?: string;
//     createdAt?: string;
//     updatedAt?: string;
//     sendAmount?: number;
//     receiveAmount?: number;
//     amountToAdd?: number;
//     amountToPay?: number;
//     sendCurrency?: { code: string };
//     receiveCurrency?: { code: string };
//     balanceCurrency?: { code: string };
//     payInCurrency?: { code: string };
//     status: "pending" | "completed" | "canceled" | "in progress";
//     recipient?: { accountHolderName: string; _id: string } | string; // Recipient can be object or ID string
// }


// frontend/src/types/transaction.ts

export interface Transaction {
    _id: string;
    type: "Add Money" | "Send Money";
    name?: string; // Usually for Send Money recipient
    description?: string; // Optional generic description
    createdAt?: string;
    updatedAt?: string;

    // Add Money (Payment) specific fields
    amountToAdd?: number;
    amountToPay?: number;
    balanceCurrency?: { _id: string, code: string }; // Ensure _id is available
    payInCurrency?: { _id: string, code: string };
    account?: { _id: string } | string; // <-- ADD THIS: Reference to Account (can be object or string ID)

    // Send Money (Transfer) specific fields
    sendAmount?: number;
    receiveAmount?: number;
    sendCurrency?: { _id: string, code: string };
    receiveCurrency?: { _id: string, code: string };
    recipient?: { accountHolderName: string; _id: string } | string;
    sourceAccountId?: string; // ID of the source Account for transfers

    // Common fields
    status: "pending" | "completed" | "canceled" | "in progress" | "failed" | "processing"; // Added processing/failed
}