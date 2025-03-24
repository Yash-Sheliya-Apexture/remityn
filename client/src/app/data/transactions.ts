// // data/transactions.ts
// export interface Transaction {
//   id: string;
//   type: "Add Money" | "Send Money";
//   name?: string;
//   description?: string; // Description is now optional in the interface
//   date?: string; // Date of transaction initiation
//   processedDate?: string; // Date when transaction was processed/completed
//   amount: number;
//   currency: string;
//   status: "inProcess" | "processed"; // Transaction status
// }

// export const defaultTransactions: Transaction[] = [
//   {
//     id: "1",
//     type: "Add Money",
//     amount: 2210,
//     currency: "EUR",
//     date: "2025-03-20T10:00:00Z", // Example date in ISO format
//     status: "inProcess",
//   },
//   {
//     id: "2",
//     type: "Add Money",
//     amount: 2210,
//     currency: "USD",
//     date: "2024-07-19T14:30:00Z", // Example date of initiation
//     processedDate: "2024-07-21T14:30:00Z", // Example date of processing
//     status: "processed",
//   },
//   {
//     id: "3",
//     type: "Send Money",
//     name: "John Doe",
//     amount: 50,
//     currency: "USD",
//     date: "2024-07-21T09:00:00Z", // Example date of initiation
//     processedDate: "2024-07-22T09:00:00Z", // Example date of processing
//     status: "processed",
//   },
//   {
//     id: "4",
//     type: "Send Money",
//     name: "Jane Smith",
//     amount: 25,
//     currency: "EUR",
//     date: "2024-07-18T18:00:00Z", // Example date of initiation
//     processedDate: "2024-07-19T18:00:00Z", // Example date of processing
//     status: "processed",
//   },
//   {
//     id: "5",
//     type: "Send Money",
//     name: "Pending Recipient",
//     amount: 100,
//     currency: "USD",
//     date: "2024-07-22T12:00:00Z", // Example date of initiation
//     status: "inProcess",
//   },
// ];





// // data/transactions.ts
// export interface Transaction {
//   id: string;
//   type: "Add Money" | "Send Money";
//   name?: string;
//   description?: string;
//   date?: string;
//   processedDate?: string;
//   amount: number;
//   currency: string;
//   status: "inProcess" | "completed";
//   recipientId?: string | number;
// }

// export interface Recipient { // Export Recipient interface here
//   id: string | number;
//   accountHolderName: string;
//   accountNumber?: string;
//   countryCode?: string;
// }


// export const sampleRecipients: Recipient[] = [ // Use Recipient interface for sampleRecipients
//   {
//     id: '1',
//     accountHolderName: "Nirav Ramani",
//     accountNumber: "XXXX XXXX XXXX 6009",
//     countryCode: 'IN'
//   },
//   {
//     id: '2',
//     accountHolderName: "kartavya pareshbhai patel",
//     accountNumber: "XXXX XXXX XXXX 1234",
//     countryCode: 'IN'
//   },
//   {
//     id: '3',
//     accountHolderName: "John Doe",
//     accountNumber: "XXXX XXXX XXXX 5678",
//     countryCode: 'IN'
//   },
// ];


// // Helper function to find recipient name by ID
// export const getRecipientNameById = (id: string | number) => {
//   const recipient = sampleRecipients.find(rec => rec.id === id);
//   return recipient ? recipient.accountHolderName : "Unknown Recipient";
// };


// export const defaultTransactions: Transaction[] = [
//   {
//     id: "1",
//     type: "Add Money",
//     amount: 2210,
//     currency: "EUR",
//     date: "2025-03-20T10:00:00Z",
//     status: "inProcess",
//   },
//   {
//     id: "2",
//     type: "Add Money",
//     amount: 2210,
//     currency: "USD",
//     date: "2024-07-19T14:30:00Z",
//     processedDate: "2024-07-21T14:30:00Z",
//     status: "completed",
//   },
//   {
//     id: "3",
//     type: "Send Money",
//     name: getRecipientNameById('1'),
//     amount: 50,
//     currency: "USD",
//     date: "2024-07-21T09:00:00Z",
//     processedDate: "2024-07-22T09:00:00Z",
//     status: "completed",
//     recipientId: '1'
//   },
//   {
//     id: "4",
//     type: "Send Money",
//     name: getRecipientNameById('3'),
//     amount: 25,
//     currency: "EUR",
//     date: "2024-07-18T18:00:00Z",
//     processedDate: "2024-07-19T18:00:00Z",
//     status: "completed",
//     recipientId: '3'
//   },
//   {
//     id: "5",
//     type: "Send Money",
//     name: getRecipientNameById('2'),
//     amount: 100,
//     currency: "USD",
//     date: "2024-07-22T12:00:00Z",
//     status: "inProcess",
//     recipientId: '2'
//   },
// ];







// data/transactions.ts
export interface Transaction {
  id: string;
  type: "Add Money" | "Send Money";
  name?: string;
  description?: string;
  date?: string;
  processedDate?: string;
  amount: number;
  currency: string;
  status: "inProcess" | "completed" | "cancelled";
  recipientId?: string | number;
}

export interface Recipient {
  id: string | number;
  accountHolderName: string;
  accountNumber?: string;
  countryCode?: string;
}


export const sampleRecipients: Recipient[] = [
  {
    id: '1',
    accountHolderName: "Nirav Ramani",
    accountNumber: "XXXX XXXX XXXX 6009",
    countryCode: 'IN'
  },
  {
    id: '2',
    accountHolderName: "kartavya pareshbhai patel",
    accountNumber: "XXXX XXXX XXXX 1234",
    countryCode: 'IN'
  },
  {
    id: '3',
    accountHolderName: "John Doe",
    accountNumber: "XXXX XXXX XXXX 5678",
    countryCode: 'IN'
  },
];


export const getRecipientNameById = (id: string | number) => {
  const recipient = sampleRecipients.find(rec => rec.id === id);
  return recipient ? recipient.accountHolderName : "Unknown Recipient";
};


export const defaultTransactions: Transaction[] = [
  {
    id: "1",
    type: "Add Money",
    amount: 2210,
    currency: "EUR",
    date: "2025-03-20T10:00:00Z",
    status: "inProcess",
  },
  {
    id: "2",
    type: "Add Money",
    amount: 2210,
    currency: "USD",
    date: "2024-07-19T14:30:00Z",
    processedDate: "2024-07-21T14:30:00Z",
    status: "completed",
  },
  {
    id: "3",
    type: "Send Money",
    name: getRecipientNameById('1'),
    amount: 50,
    currency: "USD",
    date: "2024-07-21T09:00:00Z",
    processedDate: "2024-07-22T09:00:00Z",
    status: "completed",
    recipientId: '1'
  },
  {
    id: "4",
    type: "Send Money",
    name: getRecipientNameById('3'),
    amount: 25,
    currency: "EUR",
    date: "2024-07-18T18:00:00Z",
    processedDate: "2024-07-19T18:00:00Z",
    status: "completed",
    recipientId: '3'
  },
  {
    id: "5",
    type: "Send Money",
    name: getRecipientNameById('2'),
    amount: 100,
    currency: "USD",
    date: "2024-07-22T12:00:00Z",
    status: "inProcess",
    recipientId: '2'
  },
  {
    id: "6",
    type: "Send Money",
    name: getRecipientNameById('2'),
    amount: 1000,
    currency: "USD",
    date: "2024-07-21T14:30:00Z",
    processedDate: "2024-07-22T14:30:00Z",
    status: "cancelled",
    recipientId: '2'
  },
  {
    id: "7",
    type: "Send Money",
    name: getRecipientNameById('1'),
    amount: 75,
    currency: "USD",
    date: "2024-07-22T15:00:00Z",
    processedDate: "2024-07-23T15:00:00Z",
    status: "cancelled",
    recipientId: '1'
  },
];
