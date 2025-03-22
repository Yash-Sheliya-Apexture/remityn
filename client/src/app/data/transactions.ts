// data/transactions.ts
export interface Transaction {
  id: string;
  type: "Add Money" | "Send Money";
  name?: string;
  description?: string; // Description is now optional in the interface
  date?: string; // Date of transaction initiation
  processedDate?: string; // Date when transaction was processed/completed
  amount: number;
  currency: string;
  status: "inProcess" | "processed"; // Transaction status
}

export const defaultTransactions: Transaction[] = [
  {
    id: "1",
    type: "Add Money",
    amount: 2210,
    currency: "EUR",
    date: "2025-03-20T10:00:00Z", // Example date in ISO format
    status: "inProcess",
  },
  {
    id: "2",
    type: "Add Money",
    amount: 2210,
    currency: "USD",
    date: "2024-07-19T14:30:00Z", // Example date of initiation
    processedDate: "2024-07-21T14:30:00Z", // Example date of processing
    status: "processed",
  },
  {
    id: "3",
    type: "Send Money",
    name: "John Doe",
    amount: 50,
    currency: "USD",
    date: "2024-07-21T09:00:00Z", // Example date of initiation
    processedDate: "2024-07-22T09:00:00Z", // Example date of processing
    status: "processed",
  },
  {
    id: "4",
    type: "Send Money",
    name: "Jane Smith",
    amount: 25,
    currency: "EUR",
    date: "2024-07-18T18:00:00Z", // Example date of initiation
    processedDate: "2024-07-19T18:00:00Z", // Example date of processing
    status: "processed",
  },
  {
    id: "5",
    type: "Send Money",
    name: "Pending Recipient",
    amount: 100,
    currency: "USD",
    date: "2024-07-22T12:00:00Z", // Example date of initiation
    status: "inProcess",
  },
];