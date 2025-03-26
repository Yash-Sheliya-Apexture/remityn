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
  accountType: string;
  ifscCode: string;
  email?: string; // Optional email
  bankName: string;
  address: string;
  nickname?: string; // Optional nickname
}


export const sampleRecipients: Recipient[] = [
  {
    id: '1',
    accountHolderName: "Nirav Ramani",
    accountNumber: "XXXX XXXX XXXX 6009",
    countryCode: 'INR',
    accountType: "Savings",
    ifscCode: "ICIC0001234",
    bankName: "ICICI Bank",
    address: "123 Main Street, Mumbai, India"
  },
  {
    id: '2',
    accountHolderName: "kartavya pareshbhai patel",
    accountNumber: "XXXX XXXX XXXX 1234",
    countryCode: 'INR',
    accountType: "Savings",
    ifscCode: "HDFC0005678",
    email: "kartavya.patel@example.com",
    bankName: "HDFC Bank",
    address: "456 Park Avenue, Ahmedabad, India",
  },
  {
    id: '3',
    accountHolderName: "John Doe",
    accountNumber: "XXXX XXXX XXXX 5678",
    countryCode: 'INR',
    accountType: "Current",
    ifscCode: "SBIN0009012",
    bankName: "State Bank of India",
    address: "789 Church Road, Bangalore, India"
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
    currency: "GBP",
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
    currency: "AUD",
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
    currency: "GBP",
    date: "2024-07-22T15:00:00Z",
    processedDate: "2024-07-23T15:00:00Z",
    status: "cancelled",
    recipientId: '1'
  },
  {
    id: "8",
    type: "Send Money",
    name: getRecipientNameById('1'),
    amount: 200,
    currency: "USD",
    date: "2024-07-20T10:00:00Z", // Transaction on 2024-07-20
    processedDate: "2024-07-21T10:00:00Z",
    status: "completed",
    recipientId: '1'
  },
];