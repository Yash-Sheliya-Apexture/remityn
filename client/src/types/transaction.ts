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


// // frontend/src/types/transaction.ts

// // Re-export Currency type if needed elsewhere
// export interface Currency {
//   _id: string;
//   code: string;
//   currencyName?: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number;
// }

// // Define Recipient structure used within Transaction
// interface TransactionRecipient {
//   _id: string;
//   accountHolderName: string;
// }

// // Define Account structure used within Transaction
// interface TransactionAccount {
//   _id: string;
//   // Add other fields if you need them from the account within a transaction context
// }

// // ***** MODIFIED LINE *****
// export type TransactionStatus = "pending" | "completed" | "canceled" | "in progress" | "failed" | "processing" | "unknown"; // Added 'unknown'

// export interface Transaction {
//   _id: string;
//   type: "Add Money" | "Send Money";
//   status: TransactionStatus; // Use the specific type alias
//   createdAt?: string;
//   updatedAt?: string;

//   // Fields primarily for Add Money (Payment)
//   amountToAdd?: number; // Amount deposited into balance
//   balanceCurrency?: Currency; // The balance being added to
//   amountToPay?: number; // Amount paid by user (might differ due to fees)
//   payInCurrency?: Currency; // Currency user paid with
//   account?: TransactionAccount | string; // Account associated with the payment/balance

//   // Fields primarily for Send Money (Transfer)
//   name?: string; // Recipient name (derived)
//   sendAmount?: number; // Amount sent from source
//   sendCurrency?: Currency; // Currency sent
//   receiveAmount?: number; // Amount received by recipient
//   receiveCurrency?: Currency; // Currency received
//   recipient?: TransactionRecipient | string; // Recipient details or ID
//   sourceAccountId?: string; // ID of the source Account/Balance for transfers

//   // Optional generic description (maybe useful sometimes)
//   description?: string;
// }


// // Interface for route parameters, ensuring compatibility with useParams constraint
// export interface TransactionDetailsPageParams extends Record<string, string | string[] | undefined> {
//   transactionId: string;
// }

// // Define the structure for Payment details
// export interface PaymentDetails {
//   _id: string;
//   type: 'payment'; // Discriminator property
//   user: { _id: string; email?: string; fullName?: string };
//   balanceCurrency: { _id: string; code: string; flagImage?: string }; // Currency being added to
//   payInCurrency: { _id: string; code: string; flagImage?: string }; // Currency user pays with
//   amountToAdd: number; // Amount credited to balance
//   amountToPay: number; // Amount user needs to send
//   exchangeRate: number;
//   wiseFee: number; // Fee charged by Wise
//   bankTransferFee: number; // Any specific fee for the bank transfer method
//   referenceCode?: string; // Reference for the bank transfer
//   paymentMethod: string; // e.g., 'bank_transfer', 'card'
//   status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled' | string; // Robust status handling
//   bankDetails?: { // Details of the bank account to pay into (e.g., Wise's account)
//       payeeName?: string;
//       iban?: string;
//       bicSwift?: string;
//       bankAddress?: string;
//   };
//   createdAt: string; // ISO Date string
//   updatedAt: string; // ISO Date string
//   note?: string; // User-added note
//   failureReason?: string; // Reason if status is 'failed'
// }

// // Define the structure for Transfer details
// export interface TransferDetails {
//   _id: string;
//   type: 'transfer'; // Discriminator property
//   user: { _id: string; email?: string; fullName?: string };
//   sourceAccount: { _id: string; currency: { _id: string; code: string; flagImage?: string } }; // Account money is sent FROM
//   recipient: { // Details of the recipient
//       _id: string; // Recipient ID in the system
//       accountHolderName: string;
//       nickname?: string;
//       currency: { _id: string; code: string; flagImage?: string }; // Currency recipient receives
//       accountNumber: string; // Essential for display/verification
//       bankName: string; // Essential for display/verification
//   };
//   sendAmount: number; // Amount debited from source account
//   receiveAmount: number; // Amount recipient gets after conversion/fees
//   sendCurrency: { _id: string; code: string; flagImage?: string };
//   receiveCurrency: { _id: string; code: string; flagImage?: string };
//   exchangeRate: number;
//   fees: number; // Total fees for the transfer
//   reason?: string; // Purpose of the transfer
//   reference?: string; // Reference for the recipient
//   status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled' | string; // Robust status handling
//   failureReason?: string; // Reason if status is 'failed'
//   createdAt: string; // ISO Date string
//   updatedAt: string; // ISO Date string
//   note?: string; // User-added note
// }

// // Union type for any transaction
// export type TransactionDetails = PaymentDetails | TransferDetails;

// // Define timeline step structure
// export type TimelineStatus = 'completed' | 'active' | 'pending' | 'failed' | 'cancelled';
// export interface TimelineStep {
//   id: string;
//   label: string;
//   status: TimelineStatus;
//   date?: string; // Formatted display date
//   info?: string | null; // Additional context for the step
//   showCancelAction?: boolean; // Flag for inline cancel button (e.g., "I've not paid")
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

export type TransactionStatus = "pending" | "completed" | "canceled" | "in progress" | "failed" | "processing" | "unknown"; // Added 'unknown'

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


// Interface for route parameters, ensuring compatibility with useParams constraint
export interface TransactionDetailsPageParams extends Record<string, string | string[] | undefined> {
  transactionId: string;
}

// Define the structure for Payment details
export interface PaymentDetails {
  _id: string;
  type: 'payment'; // Discriminator property
  user: { _id: string; email?: string; fullName?: string };
  balanceCurrency: { _id: string; code: string; flagImage?: string }; // Currency being added to
  payInCurrency: { _id: string; code: string; flagImage?: string }; // Currency user pays with
  amountToAdd: number; // Amount credited to balance
  amountToPay: number; // Amount user needs to send
  exchangeRate: number;
  wiseFee: number; // Fee charged by Wise
  bankTransferFee: number; // Any specific fee for the bank transfer method
  referenceCode?: string; // Reference for the bank transfer
  paymentMethod: string; // e.g., 'bank_transfer', 'card'
  status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled' | string; // Robust status handling
  bankDetails?: { // Details of the bank account to pay into (e.g., Wise's account)
      payeeName?: string;
      iban?: string;
      bicSwift?: string;
      bankAddress?: string;
  };
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  completedAt?: string | null; // <<< FIXED: Added completedAt (optional, can be null)
  note?: string; // User-added note
  failureReason?: string | null; // <<< FIXED: Allowed null for failureReason
}

// Define the structure for Transfer details
export interface TransferDetails {
  _id: string;
  type: 'transfer'; // Discriminator property
  user: { _id: string; email?: string; fullName?: string };
  sourceAccount: { _id: string; currency: { _id: string; code: string; flagImage?: string } }; // Account money is sent FROM
  recipient: { // Details of the recipient
      _id: string; // Recipient ID in the system
      accountHolderName: string;
      nickname?: string;
      currency: { _id: string; code: string; flagImage?: string }; // Currency recipient receives
      accountNumber: string; // Essential for display/verification
      bankName: string; // Essential for display/verification
  };
  sendAmount: number; // Amount debited from source account
  receiveAmount: number; // Amount recipient gets after conversion/fees
  sendCurrency: { _id: string; code: string; flagImage?: string };
  receiveCurrency: { _id: string; code: string; flagImage?: string };
  exchangeRate: number;
  fees?: number;
  reason?: string; // Purpose of the transfer
  reference?: string; // Reference for the recipient
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled' | string; // Robust status handling
  failureReason?: string | null; // Reason if status is 'failed' or 'canceled' (Allow null)
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  completedAt?: string | null; // <<< ADDED: Completion timestamp for transfers
  note?: string; // User-added note
}

// Union type for any transaction
export type TransactionDetails = PaymentDetails | TransferDetails;

// Define timeline step structure
export type TimelineStatus = 'completed' | 'active' | 'pending' | 'failed' | 'cancelled';
export interface TimelineStep {
  id: string;
  label: string;
  status: TimelineStatus;
  date?: string; // Formatted display date
  info?: string | null; // Additional context for the step
  showCancelAction?: boolean; // Flag for inline cancel button (e.g., "I've not paid")
}

// // frontend/src/types/transaction.ts

// // Base Currency structure
// export interface Currency {
//   _id: string;
//   code: string;
//   currencyName?: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number; // Optional, from backend Currency model
//   // Add other potential fields if needed from backend Currency model
// }

// // Define Recipient structure used within TransferDetails
// interface TransferRecipient {
//   _id: string; // Recipient's ID in your system
//   accountHolderName: string;
//   nickname?: string;
//   currency: Currency; // Populated Currency object
//   accountNumber: string; // Displayed account number
//   bankName: string; // Displayed bank name
//   // Add other relevant fields from Recipient model if populated and needed
// }

// // Define Account structure used within TransactionDetails
// interface TransactionAccount {
//   _id: string;
//   currency: string | Currency; // Can be ID or populated Currency object
//   // Avoid including balance here for security/simplicity unless absolutely necessary
// }

// // Define allowed transaction statuses consistently
// export type TransactionStatus =
//     | "pending"      // Initial state for Payments & Transfers
//     | "in progress"  // Payment: User confirmed transfer, backend verifying
//     | "processing"   // Transfer: Funds debited, payout underway
//     | "completed"    // Payment: Funds added; Transfer: Sent to recipient bank
//     | "canceled"     // User or admin cancelled
//     | "failed"       // Process failed (payment or transfer)
//     | string;        // Allow string for robustness against potential unknown statuses

// // --- Payment Details Interface (Type: 'payment') ---
// export interface PaymentDetails {
//   _id: string;
//   type: 'payment'; // Discriminator
//   user: { _id: string; email?: string; fullName?: string };
//   account: TransactionAccount; // Account being funded (populated with currency ID at least)
//   balanceCurrency: Currency; // Populated Currency object (the currency being added)
//   payInCurrency: Currency; // Populated Currency object (the currency paid by user)
//   amountToAdd: number; // Amount credited to balance in balanceCurrency
//   amountToPay: number; // Amount user should pay in payInCurrency
//   exchangeRate: number;
//   wiseFee: number;
//   bankTransferFee: number;
//   referenceCode?: string; // Unique code for user's bank transfer
//   paymentMethod: string; // e.g., 'bank_transfer'
//   status: TransactionStatus; // Use the specific type alias
//   bankDetails?: { // Bank details where user needs to send money
//       payeeName?: string;
//       iban?: string;
//       bicSwift?: string;
//       bankAddress?: string;
//   };
//   createdAt: string; // ISO Date string
//   updatedAt: string; // ISO Date string
//   completedAt?: string | null; // ISO Date string when status became 'completed'
//   failureReason?: string | null; // Reason if status is 'failed' or 'canceled'
//   note?: string; // Optional user note added via frontend
// }

// // --- Transfer Details Interface (Type: 'transfer') ---
// export interface TransferDetails {
//   _id: string;
//   type: 'transfer'; // Discriminator
//   user: { _id: string; email?: string; fullName?: string };
//   sourceAccount: TransactionAccount; // Account money sent FROM (populated)
//   recipient: TransferRecipient; // Populated recipient details
//   sendAmount: number; // Amount debited from source in sendCurrency
//   receiveAmount: number; // Amount recipient receives in receiveCurrency
//   sendCurrency: Currency; // Populated Currency object
//   receiveCurrency: Currency; // Populated Currency object
//   exchangeRate: number;
//   fees?: number; // Total transfer fees (optional, might be 0)
//   reason?: string; // User-provided reason
//   reference?: string; // User-provided reference for recipient
//   status: TransactionStatus; // Use the specific type alias
//   failureReason?: string | null; // Reason if status is 'failed' or 'canceled'
//   createdAt: string; // ISO Date string
//   updatedAt: string; // ISO Date string
//   note?: string; // Optional user note added via frontend
// }

// // Union type representing either a Payment or a Transfer detail structure
// export type TransactionDetails = PaymentDetails | TransferDetails;

// // Interface for route parameters in Next.js dynamic routes
// export interface TransactionDetailsPageParams extends Record<string, string | string[] | undefined> {
//   transactionId: string;
// }

// // Define timeline step structure for UI display
// export type TimelineStatus = 'completed' | 'active' | 'pending' | 'failed' | 'cancelled';
// export interface TimelineStep {
//   id: string; // Unique identifier for the step (e.g., 'setup', 'funded')
//   label: string; // Text displayed for the step
//   status: TimelineStatus; // Current visual status of the step
//   date?: string; // Formatted display date when step reached this status (optional)
//   info?: string | null; // Additional contextual information for the step (optional)
//   showCancelAction?: boolean; // Flag to show inline cancel button (controlled by page logic)
// }