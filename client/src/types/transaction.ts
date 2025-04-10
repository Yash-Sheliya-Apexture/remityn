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


// // frontend/src/types/transaction.ts

// export interface Currency {
//     _id: string; // Typically the MongoDB ObjectId as a string
//     code: string; // e.g., "USD", "EUR", "INR"
//     currencyName?: string; // e.g., "US Dollar", "Euro" (Optional)
//     flagImage?: string; // URL or path to the flag image (Optional)
//     // Add the adjustment percentage here!
//     rateAdjustmentPercentage?: number; // Optional, as it might not apply to all currencies or setups
//     // Add any other relevant currency properties
//   }
  
// export interface Transaction {
//     _id: string;
//     type: "Add Money" | "Send Money";
//     name?: string; // Usually for Send Money recipient
//     description?: string; // Optional generic description
//     createdAt?: string;
//     updatedAt?: string;

//     // Add Money (Payment) specific fields
//     amountToAdd?: number;
//     amountToPay?: number;
//     balanceCurrency?: { _id: string, code: string }; // Ensure _id is available
//     payInCurrency?: { _id: string, code: string };
//     account?: { _id: string } | string; // <-- ADD THIS: Reference to Account (can be object or string ID)

//     // Send Money (Transfer) specific fields
//     sendAmount?: number;
//     receiveAmount?: number;
//     sendCurrency?: { _id: string, code: string };
//     receiveCurrency?: { _id: string, code: string };
//     recipient?: { accountHolderName: string; _id: string } | string;
//     sourceAccountId?: string; // ID of the source Account for transfers

//     // Common fields
//     status: "pending" | "completed" | "canceled" | "in progress" | "failed" | "processing"; // Added processing/failed
// }



// frontend/src/types/transaction.ts

// Re-export Currency type if needed elsewhere
export interface Currency {
  _id: string;
  code: string;
  currencyName?: string;
  flagImage?: string;
  rateAdjustmentPercentage?: number;
}

// Define Recipient structure used within Transaction
interface TransactionRecipient {
  _id: string;
  accountHolderName: string;
}

// Define Account structure used within Transaction
interface TransactionAccount {
  _id: string;
  // Add other fields if you need them from the account within a transaction context
}

export type TransactionStatus = "pending" | "completed" | "canceled" | "in progress" | "failed" | "processing";

export interface Transaction {
  _id: string;
  type: "Add Money" | "Send Money";
  status: TransactionStatus; // Use the specific type alias
  createdAt?: string;
  updatedAt?: string;

  // Fields primarily for Add Money (Payment)
  amountToAdd?: number; // Amount deposited into balance
  balanceCurrency?: Currency; // The balance being added to
  amountToPay?: number; // Amount paid by user (might differ due to fees)
  payInCurrency?: Currency; // Currency user paid with
  account?: TransactionAccount | string; // Account associated with the payment/balance

  // Fields primarily for Send Money (Transfer)
  name?: string; // Recipient name (derived)
  sendAmount?: number; // Amount sent from source
  sendCurrency?: Currency; // Currency sent
  receiveAmount?: number; // Amount received by recipient
  receiveCurrency?: Currency; // Currency received
  recipient?: TransactionRecipient | string; // Recipient details or ID
  sourceAccountId?: string; // ID of the source Account/Balance for transfers

  // Optional generic description (maybe useful sometimes)
  description?: string;
}