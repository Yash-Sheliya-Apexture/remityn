// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation"; // Correct import for Next.js 13+
// import { IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../hooks/useAuth";
// import axios from "axios";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//   };
//   balance: number;
//   accountNumber?: string; // Assuming account number is optional or might not be always present
//   createdAt: string;
//   __v: number;
// }

// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>(); // Use useParams hook
//   const router = useRouter();
//   const { balanceId } = params;
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(
//     null
//   ); // Use interface for type safety
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchBalanceDetail = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/accounts/${balanceId}`, {
//           // Assuming your backend endpoint is /api/accounts/:balanceId
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBalanceDetail(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load balance details"
//         );
//         setIsLoading(false);
//         console.error("Error fetching balance detail:", err);
//         if (err.response?.status === 404) {
//           router.push("/dashboard"); // Redirect to dashboard if balance not found
//         }
//       }
//     };

//     if (balanceId) {
//       fetchBalanceDetail();
//     } else {
//       setIsLoading(false);
//       setError("Balance ID is missing.");
//     }
//   }, [balanceId, token, router]);

//   if (isLoading) {
//     return <div>Loading balance details...</div>;
//   }

//   if (error || !balanceDetail) {
//     return (
//       <div className="text-red-500">
//         Error: {error || "Balance details not found."}
//       </div>
//     );
//   }

//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(balanceDetail.balance).toFixed(2); // Format balance to 2 decimal places

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-2"
//       >
//         <IoIosArrowBack size={20} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-lightgray rounded-2xl p-6 shadow-md">
//         <div className="flex items-center gap-4 mb-4">
//           <Image
//             src={`/assets/icon/${currencyCode.toLowerCase()}.svg`}
//             alt={`${currencyCode} flag`}
//             width={50}
//             height={50}
//             onError={() =>
//               console.error(`Error loading image for ${currencyCode}`)
//             }
//           />
//           <h2 className="text-2xl font-semibold">{currencyCode} balance</h2>
//         </div>

//         <div className="text-4xl font-bold mb-4">
//           {formattedBalance} {currencyCode}
//         </div>

//         {balanceDetail.accountNumber && ( // Conditionally render account number if available
//           <div className="flex items-center gap-2 mb-6">
//             <span className="bg-gray-300 p-1 rounded-md">🏦</span>
//             <span className="text-sm text-gray-700">
//               {balanceDetail.accountNumber}
//             </span>
//             <span className="ml-2 text-green-500 cursor-pointer hover:underline">
//               Copy
//             </span>{" "}
//             {/* Implement copy functionality if needed */}
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex justify-around space-x-4 mt-8">
//           <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//             {" "}
//             {/* Link to Add Money page */}
//             <button className="action-button bg-green-500 hover:bg-green-700 text-white">
//               Add
//             </button>
//           </Link>
//           <Link
//             href={`/dashboard/balances/${balanceId}/send/select-recipient`}
//             passHref
//           >
//             <button className="action-button bg-blue-500 hover:bg-blue-700 text-white">
//               {" "}
//               {/* Changed color */}
//               Send
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Transactions Section (Placeholder) */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Transactions</h3>
//         <p className="text-gray-600">
//           No transactions to display yet. (Placeholder)
//         </p>
//         {/*  Transaction list component would go here */}
//       </div>

//       {/* Options Section (Placeholder) */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Options</h3>
//         <p className="text-gray-600">
//           Account options will be displayed here. (Placeholder)
//         </p>
//         {/* Account options components would go here */}
//       </div>
//     </div>
//   );
// };

// export default BalanceDetailPage;







// // frontend/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios";
// import { format, parseISO } from "date-fns";

// // Icons
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth";
// import paymentService from "../../../services/payment";
// import transferService from "../../../services/transfer";
// import apiConfig from "../../../config/apiConfig";

// // Components and Types
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path as needed
// import { Transaction } from "@/types/transaction"; // Ensure this type includes sourceAccountId and correct currency object shapes


// // Axios default URL
// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//     flagImage?: string;
//     currencyName?: string;
//   };
//   balance: number;
//   accountNumber?: string;
//   createdAt: string;
//   __v: number;
// }

// // --- Utility Function ---
// function parseDateString(dateString: string | undefined): Date | null {
//   if (!dateString) return null;
//   // Try dd-MM-yyyy first (likely from filter component)
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//     const year = parseInt(parts[2], 10);
//     if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//       return new Date(year, month, day);
//     }
//   }
//   // Fallback to ISO parsing (likely from backend data)
//   try {
//     return parseISO(dateString);
//   } catch {
//     console.error("Failed to parse date string:", dateString);
//     return null;
//   }
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth();

//   // --- State ---
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(
//     null
//   );
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//   const [balanceSpecificTransactions, setBalanceSpecificTransactions] =
//     useState<Transaction[]>([]);
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>(
//     []
//   );
//   const [isLoading, setIsLoading] = useState(true); // Loading for balance detail
//   const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Separate loading for transactions
//   const [error, setError] = useState<string | null>(null);

//   // --- Data Fetching ---
//   const fetchData = useCallback(async () => {
//     if (!balanceId || !token) {
//       setError("Missing balance ID or authentication token.");
//       setIsLoading(false);
//       setIsTransactionsLoading(false);
//       return;
//     }
//     setIsLoading(true);
//     setIsTransactionsLoading(true);
//     setError(null);
//     setBalanceDetail(null); // Reset on new fetch
//     setAllTransactions([]); // Reset on new fetch

//     try {
//       // Fetch balance detail first
//       const balanceResponse = await axios.get(`/accounts/${balanceId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBalanceDetail(balanceResponse.data);
//       setIsLoading(false); // Balance detail loaded or failed

//       // Fetch transactions only if balance detail was successful
//       try {
//         const [paymentsResponse, transfersResponse] = await Promise.all([
//           paymentService.getUserPayments(token),
//           transferService.getUserTransfers(token),
//         ]);

//         const mappedPayments: Transaction[] = paymentsResponse.map(
//           (payment): Transaction => ({
//             _id: payment._id,
//             type: "Add Money",
//             amountToAdd: payment.amountToAdd,
//             amountToPay: payment.amountToPay,
//             balanceCurrency: payment.balanceCurrency,
//             payInCurrency: payment.payInCurrency,
//             account: payment.account, // Include the account reference
//             createdAt: payment.createdAt,
//             updatedAt: payment.updatedAt,
//             status: payment.status,
//           })
//         );

//         const mappedTransfers: Transaction[] = transfersResponse.map(
//           (transfer): Transaction => ({
//             _id: transfer._id,
//             type: "Send Money",
//             name:
//               typeof transfer.recipient === "object" &&
//               transfer.recipient !== null
//                 ? transfer.recipient.accountHolderName
//                 : "Recipient Name Unavailable",
//             sendAmount: transfer.sendAmount,
//             receiveAmount: transfer.receiveAmount,
//             sendCurrency: transfer.sendCurrency,
//             receiveCurrency: transfer.receiveCurrency,
//             createdAt: transfer.createdAt,
//             updatedAt: transfer.updatedAt,
//             status: transfer.status,
//             recipient: transfer.recipient,
//             sourceAccountId:
//               typeof transfer.sourceAccount === "string"
//                 ? transfer.sourceAccount
//                 : transfer.sourceAccount?._id, // Extract ID if populated
//           })
//         );

//         const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//         setAllTransactions(combinedTransactions);
//       } catch (transErr: any) {
//         console.error("Error fetching transaction data:", transErr);
//         // Keep balance detail even if transactions fail, but show error
//         setError(
//           (prevError) =>
//             prevError || `Failed to load transactions: ${transErr.message}`
//         );
//       } finally {
//         setIsTransactionsLoading(false);
//       }
//     } catch (err: any) {
//       const message =
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to load balance details";
//       setError(message);
//       console.error("Error fetching balance detail:", err);
//       setIsLoading(false); // Stop main loading on error
//       setIsTransactionsLoading(false); // Also stop transaction loading
//       if (err.response?.status === 401) {
//         router.push("/auth/login");
//       }
//       // Optional: Handle 404 redirect for balance not found
//       // if (err.response?.status === 404) router.push("/dashboard");
//     }
//   }, [balanceId, token, router]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- Filter Transactions Specific to this Balance ---
//   useEffect(() => {
//     if (!balanceId || allTransactions.length === 0) {
//       setBalanceSpecificTransactions([]);
//       setDisplayTransactions([]);
//       return;
//     }

//     // console.log(`%cBalanceDetailPage: Filtering for balanceId: [${balanceId}]`, 'color: blue; font-weight: bold;');

//     const filtered = allTransactions.filter((transaction) => {
//       if (transaction.type === "Add Money") {
//         // Compare the account ID associated with the payment to the current balance/account ID
//         const paymentAccountId = transaction.account?._id || transaction.account; // Handle populated object or string ID
//         // console.log(`  Checking Payment Tx ${transaction._id}: accountId [${paymentAccountId}] vs page balanceId [${balanceId}]`);
//         return paymentAccountId === balanceId;
//       } else if (transaction.type === "Send Money") {
//         // Compare the source account ID of the transfer to the current balance/account ID
//         const transferSourceId = transaction.sourceAccountId;
//         // console.log(`  Checking Transfer Tx ${transaction._id}: sourceAccountId [${transferSourceId}] vs page balanceId [${balanceId}]`);
//         return transferSourceId === balanceId;
//       }
//       return false; // Ignore transactions of unknown types
//     });

//     // console.log(`%cBalanceDetailPage: Filtering Complete. Found ${filtered.length} specific transactions.`, 'color: green;');
//     setBalanceSpecificTransactions(filtered);
//     setDisplayTransactions(filtered); // Initialize display list with filtered results
//   }, [allTransactions, balanceId]);


//   // --- Callbacks for TransactionActions ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//     // Update the displayed list based on search results from TransactionActions
//     setDisplayTransactions(searchResults);
//   }, []);

//   const handleFiltersApply = useCallback(
//     (filters: {
//       selectedRecipients: (string | number)[];
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       selectedBalance?: string[];
//       fromDate?: string;
//       toDate?: string;
//     }) => {
//       // Apply filters *only* to the transactions already specific to this balance
//       let tempFiltered = [...balanceSpecificTransactions];

//       // Apply Direction Filter
//       if (filters.selectedDirection && filters.selectedDirection !== "all") {
//         tempFiltered = tempFiltered.filter(
//           (transaction) =>
//             (filters.selectedDirection === "add" &&
//               transaction.type === "Add Money") ||
//             (filters.selectedDirection === "send" &&
//               transaction.type === "Send Money")
//         );
//       }

//       // Apply Status Filter
//       if (filters.selectedStatus) {
//         tempFiltered = tempFiltered.filter((transaction) => {
//           if (filters.selectedStatus === "Completed") return transaction.status === "completed";
//           if (filters.selectedStatus === "Cancelled") return transaction.status === "canceled";
//           if (filters.selectedStatus === "In Process") return transaction.status === "in progress" || transaction.status === "pending";
//           if (filters.selectedStatus === "Failed") return transaction.status === "failed";
//           return true;
//         });
//       }

//       // Apply Date Filter
//       const fromDateObj = parseDateString(filters.fromDate);
//       const toDateObj = parseDateString(filters.toDate);
//       if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of day
//       if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of day

//       if (fromDateObj || toDateObj) {
//         tempFiltered = tempFiltered.filter((transaction) => {
//           const transactionDateStr = transaction.updatedAt || transaction.createdAt;
//           if (!transactionDateStr) return false; // Cannot filter without a date
//           try {
//             const transactionDateObj = parseISO(transactionDateStr);
//             let include = true;
//             if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//             if (toDateObj && transactionDateObj > toDateObj) include = false;
//             return include;
//           } catch (e) {
//             console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//             return false; // Exclude if date parsing fails
//           }
//         });
//       }

//       // Update the list that gets rendered
//       setDisplayTransactions(tempFiltered);
//     },
//     [balanceSpecificTransactions] // Re-run filter logic if the base list changes
//   );


//   // --- Memoized Transaction Grouping for Display ---
//   const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//       // Calculations are based on the currently visible transactions (`displayTransactions`)
//       const inProgress = displayTransactions.filter(
//         (tx) => tx.status === "in progress" || tx.status === "pending"
//       );

//       const processed = displayTransactions.filter(
//         (tx) =>
//           tx.status === "completed" ||
//           tx.status === "canceled" ||
//           tx.status === "failed"
//       );

//       const sortedProcessed = [...processed].sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         if (!dateA || !dateB) return 0;
//         // Sort descending (newest first)
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//       });

//       // Group by formatted date string
//       const grouped = sortedProcessed.reduce(
//         (groups: { [date: string]: Transaction[] }, tx) => {
//           const groupDate = tx.updatedAt || tx.createdAt;
//           if (!groupDate) return groups; // Skip if no date
//           try {
//              const dateKey = format(parseISO(groupDate), "MMMM d, yyyy");
//              if (!groups[dateKey]) groups[dateKey] = [];
//              groups[dateKey].push(tx);
//           } catch (e) {
//              console.error("Error formatting date for grouping:", groupDate, e);
//           }
//           return groups;
//         }, {}
//       );

//       return {
//         inProgressTransactions: inProgress,
//         groupedProcessedTransactions: grouped,
//       };
//     }, [displayTransactions]); // Re-calculate only when the displayed transactions change


//   // --- Render Logic ---

//   // Initial loading state (before balance detail is fetched)
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//         Loading balance details...
//       </div>
//     );
//   }

//   // Error state if balance detail failed to load
//   if (error && !balanceDetail) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
//           <IoIosArrowBack size={20} /> Back
//         </button>
//         <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md text-center">
//           Error: {error}
//         </div>
//       </div>
//     );
//   }

//   // If loading finished but balanceDetail is somehow still null
//   if (!balanceDetail) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//         Balance details could not be loaded or found.
//       </div>
//     );
//   }

//   // --- Main Render (Balance Detail Loaded) ---
//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(balanceDetail.balance).toFixed(2);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
//         <IoIosArrowBack size={20} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-lightgray rounded-2xl p-6 shadow-md mb-8">
//         <div className="flex items-center gap-4 mb-4">
//           <Image
//             src={balanceDetail.currency.flagImage || `/assets/icon/${currencyCode.toLowerCase()}.svg`}
//             alt={`${currencyCode} flag`}
//             width={50}
//             height={50}
//             onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} // Fallback image
//           />
//           <h2 className="text-2xl font-semibold">{currencyCode} balance</h2>
//         </div>
//         <div className="text-4xl font-bold mb-4">
//           {formattedBalance} {currencyCode}
//         </div>
//         {/* Optional: Account Details (like number) could go here */}
//         <div className="flex justify-center sm:justify-start space-x-4 mt-8">
//           <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//             <button className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition duration-150 ease-in-out">
//               <LuPlus size={20} /> Add
//             </button>
//           </Link>
//           <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} passHref>
//             <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition duration-150 ease-in-out">
//               <GoArrowUp size={20} /> Send
//             </button>
//           </Link>
//           {/* Add other actions here (Convert, Details, etc.) */}
//         </div>
//       </div>

//       {/* Transactions Section */}
//       <div className="mt-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <h3 className="text-xl font-semibold">Transactions for {currencyCode}</h3>
//           {/* Render TransactionActions only if there are base transactions to filter/search */}
//           {balanceSpecificTransactions.length > 0 && (
//              <TransactionActions
//                 transactions={balanceSpecificTransactions} // Pass the balance-specific list as the base
//                 onTransactionsChange={handleSearchChange} // Update display on search
//                 onFiltersApply={handleFiltersApply}       // Update display on filter
//              />
//           )}
//         </div>

//         {/* Transaction Loading/Empty/List States */}
//         {isTransactionsLoading && (
//           <div className="text-center py-6 text-gray-500">Loading transactions...</div>
//         )}

//         {!isTransactionsLoading && error && !balanceDetail && ( // Show transaction-specific error if balance detail also failed
//              <div className="text-center py-6 text-red-500">Error loading transactions.</div>
//         )}

//         {!isTransactionsLoading && !error && displayTransactions.length === 0 && balanceSpecificTransactions.length > 0 && (
//           <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg mt-6">
//             No transactions match your current filter or search criteria.
//           </div>
//         )}

//         {!isTransactionsLoading && !error && balanceSpecificTransactions.length === 0 && (
//           <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg mt-6">
//             No transactions found for this balance yet.
//           </div>
//         )}

//         {/* Render Transaction List if data is available and not loading/errored */}
//         {!isTransactionsLoading && !error && displayTransactions.length > 0 && (
//           <div className="space-y-10">
//             {/* In Progress Transactions */}
//             {inProgressTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">
//                   In progress
//                 </h2>
//                 <div className="space-y-2">
//                   {inProgressTransactions.map((transaction) => {
//                     // Determine display values
//                     const isAddMoney = transaction.type === "Add Money";
//                     const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
//                     const description = isAddMoney ? "Waiting for your money" : "Sending your money";
//                     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                     const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//                     const amountPrefix = isAddMoney ? "+ " : "- ";
//                     const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                     return (
//                       <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
//                         <div className="hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
//                           <div className="flex items-center gap-4">
//                             <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200">{icon}</div>
//                             <div className="flex justify-between w-full items-center">
//                               <div>
//                                 <h3 className="font-medium text-gray-800">{name}</h3>
//                                 <p className="text-sm text-gray-500">{description}</p>
//                               </div>
//                               <div className={`font-medium text-gray-800 whitespace-nowrap`}>
//                                 {amountPrefix}
//                                 {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                 {" "} {displayCurrencyCode}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Processed Transactions (Grouped by Date) */}
//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">
//                           {date}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                              // Determine display values
//                              const isAddMoney = transaction.type === "Add Money";
//                              const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
//                              let description = isAddMoney ? "Added by you" : "Sent by you";
//                              let amountClass = isAddMoney ? "text-green-600" : "text-gray-800";
//                              const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                              const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//                              const amountPrefix = isAddMoney ? "+ " : "- ";
//                              const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                              if (transaction.status === "canceled") {
//                                description = "Cancelled";
//                                amountClass = "text-red-500 line-through";
//                              } else if (transaction.status === "failed") {
//                                description = "Failed";
//                                amountClass = "text-red-500";
//                              }

//                             return (
//                               <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
//                                 <div className="hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
//                                   <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200">{icon}</div>
//                                     <div className="flex justify-between w-full items-center">
//                                       <div>
//                                         <h3 className="font-medium text-gray-800">{name}</h3>
//                                         <p className="text-sm text-gray-500">{description}</p>
//                                       </div>
//                                       <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                                         {amountPrefix}
//                                         {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                         {" "} {displayCurrencyCode}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </Link>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BalanceDetailPage;


// // frontend/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios";
// import { format, parseISO } from "date-fns";

// // Icons
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth";
// import paymentService from "../../../services/payment";
// import transferService from "../../../services/transfer";
// import apiConfig from "../../../config/apiConfig";

// // Components and Types
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions";
// import { Transaction } from "@/types/transaction";
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Import the modal

// // Axios default URL
// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//     flagImage?: string;
//     currencyName?: string;
//   };
//   balance: number;
//   accountNumber?: string;
//   createdAt: string;
//   __v: number;
// }

// // --- Utility Function ---
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     // Try dd-MM-yyyy first (likely from filter component)
//     const parts = dateString.split("-");
//     if (parts.length === 3) {
//       const day = parseInt(parts[0], 10);
//       const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//       const year = parseInt(parts[2], 10);
//       if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//         return new Date(year, month, day);
//       }
//     }
//     // Fallback to ISO parsing (likely from backend data)
//     try {
//       return parseISO(dateString);
//     } catch {
//       console.error("Failed to parse date string:", dateString);
//       return null;
//     }
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth();

//   // --- State ---
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//   const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]);
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // --- Data Fetching ---
//   const fetchData = useCallback(async () => {
//     // ... (fetchData logic remains the same)
//     if (!balanceId || !token) {
//         setError("Missing balance ID or authentication token.");
//         setIsLoading(false);
//         setIsTransactionsLoading(false);
//         return;
//       }
//       setIsLoading(true);
//       setIsTransactionsLoading(true);
//       setError(null);
//       setBalanceDetail(null); // Reset on new fetch
//       setAllTransactions([]); // Reset on new fetch

//       try {
//         // Fetch balance detail first
//         const balanceResponse = await axios.get(`/accounts/${balanceId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBalanceDetail(balanceResponse.data);
//         setIsLoading(false); // Balance detail loaded or failed

//         // Fetch transactions only if balance detail was successful
//         try {
//           const [paymentsResponse, transfersResponse] = await Promise.all([
//             paymentService.getUserPayments(token),
//             transferService.getUserTransfers(token),
//           ]);

//           const mappedPayments: Transaction[] = paymentsResponse.map(
//             (payment): Transaction => ({
//               _id: payment._id,
//               type: "Add Money",
//               amountToAdd: payment.amountToAdd,
//               amountToPay: payment.amountToPay,
//               balanceCurrency: payment.balanceCurrency,
//               payInCurrency: payment.payInCurrency,
//               account: payment.account, // Include the account reference
//               createdAt: payment.createdAt,
//               updatedAt: payment.updatedAt,
//               status: payment.status,
//             })
//           );

//           const mappedTransfers: Transaction[] = transfersResponse.map(
//             (transfer): Transaction => ({
//               _id: transfer._id,
//               type: "Send Money",
//               name:
//                 typeof transfer.recipient === "object" &&
//                 transfer.recipient !== null
//                   ? transfer.recipient.accountHolderName
//                   : "Recipient Name Unavailable",
//               sendAmount: transfer.sendAmount,
//               receiveAmount: transfer.receiveAmount,
//               sendCurrency: transfer.sendCurrency,
//               receiveCurrency: transfer.receiveCurrency,
//               createdAt: transfer.createdAt,
//               updatedAt: transfer.updatedAt,
//               status: transfer.status,
//               recipient: transfer.recipient,
//               sourceAccountId:
//                 typeof transfer.sourceAccount === "string"
//                   ? transfer.sourceAccount
//                   : transfer.sourceAccount?._id, // Extract ID if populated
//             })
//           );

//           const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//           setAllTransactions(combinedTransactions);
//         } catch (transErr: any) {
//           console.error("Error fetching transaction data:", transErr);
//           // Keep balance detail even if transactions fail, but show error
//           setError(
//             (prevError) =>
//               prevError || `Failed to load transactions: ${transErr.message}`
//           );
//         } finally {
//           setIsTransactionsLoading(false);
//         }
//       } catch (err: any) {
//         const message =
//           err.response?.data?.message ||
//           err.message ||
//           "Failed to load balance details";
//         setError(message);
//         console.error("Error fetching balance detail:", err);
//         setIsLoading(false); // Stop main loading on error
//         setIsTransactionsLoading(false); // Also stop transaction loading
//         if (err.response?.status === 401) {
//           router.push("/auth/login");
//         }
//       }
//   }, [balanceId, token, router]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- Filter Transactions Specific to this Balance ---
//   useEffect(() => {
//     // ... (filtering logic remains the same)
//     if (!balanceId || allTransactions.length === 0) {
//         setBalanceSpecificTransactions([]);
//         setDisplayTransactions([]);
//         return;
//       }

//       const filtered = allTransactions.filter((transaction) => {
//         if (transaction.type === "Add Money") {
//           const paymentAccountId = transaction.account?._id || transaction.account;
//           return paymentAccountId === balanceId;
//         } else if (transaction.type === "Send Money") {
//           const transferSourceId = transaction.sourceAccountId;
//           return transferSourceId === balanceId;
//         }
//         return false;
//       });

//       setBalanceSpecificTransactions(filtered);
//       setDisplayTransactions(filtered); // Initialize display list with filtered results
//   }, [allTransactions, balanceId]);


//   // --- Callbacks for TransactionActions ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//     // ... (handleSearchChange logic remains the same)
//     setDisplayTransactions(searchResults);
//   }, []);

//   const handleFiltersApply = useCallback((filters: { /* ... filter types ... */ }) => {
//     // ... (handleFiltersApply logic remains the same)
//     let tempFiltered = [...balanceSpecificTransactions];

//       // Apply Direction Filter
//       if (filters.selectedDirection && filters.selectedDirection !== "all") {
//         tempFiltered = tempFiltered.filter(
//           (transaction) =>
//             (filters.selectedDirection === "add" &&
//               transaction.type === "Add Money") ||
//             (filters.selectedDirection === "send" &&
//               transaction.type === "Send Money")
//         );
//       }

//       // Apply Status Filter
//       if (filters.selectedStatus) {
//         tempFiltered = tempFiltered.filter((transaction) => {
//           if (filters.selectedStatus === "Completed") return transaction.status === "completed";
//           if (filters.selectedStatus === "Cancelled") return transaction.status === "canceled";
//           if (filters.selectedStatus === "In Process") return transaction.status === "in progress" || transaction.status === "pending";
//           if (filters.selectedStatus === "Failed") return transaction.status === "failed";
//           return true;
//         });
//       }

//       // Apply Date Filter
//       const fromDateObj = parseDateString(filters.fromDate);
//       const toDateObj = parseDateString(filters.toDate);
//       if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of day
//       if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of day

//       if (fromDateObj || toDateObj) {
//         tempFiltered = tempFiltered.filter((transaction) => {
//           const transactionDateStr = transaction.updatedAt || transaction.createdAt;
//           if (!transactionDateStr) return false;
//           try {
//             const transactionDateObj = parseISO(transactionDateStr);
//             let include = true;
//             if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//             if (toDateObj && transactionDateObj > toDateObj) include = false;
//             return include;
//           } catch (e) {
//             console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//             return false;
//           }
//         });
//       }

//       setDisplayTransactions(tempFiltered);
//   }, [balanceSpecificTransactions]);


//   // --- Memoized Transaction Grouping for Display ---
//   const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//     // ... (useMemo logic remains the same)
//     const inProgress = displayTransactions.filter(
//         (tx) => tx.status === "in progress" || tx.status === "pending"
//       );

//       const processed = displayTransactions.filter(
//         (tx) =>
//           tx.status === "completed" ||
//           tx.status === "canceled" ||
//           tx.status === "failed"
//       );

//       const sortedProcessed = [...processed].sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         if (!dateA || !dateB) return 0;
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//       });

//       const grouped = sortedProcessed.reduce(
//         (groups: { [date: string]: Transaction[] }, tx) => {
//           const groupDate = tx.updatedAt || tx.createdAt;
//           if (!groupDate) return groups;
//           try {
//              const dateKey = format(parseISO(groupDate), "MMMM d, yyyy");
//              if (!groups[dateKey]) groups[dateKey] = [];
//              groups[dateKey].push(tx);
//           } catch (e) {
//              console.error("Error formatting date for grouping:", groupDate, e);
//           }
//           return groups;
//         }, {}
//       );

//       return {
//         inProgressTransactions: inProgress,
//         groupedProcessedTransactions: grouped,
//       };
//   }, [displayTransactions]);


//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => {
//     setIsInsufficientBalanceModalOpen(true);
//   };

//   const handleCloseInsufficientBalanceModal = () => {
//     setIsInsufficientBalanceModalOpen(false);
//   };

//   const handleAddMoneyFromModal = () => {
//     setIsInsufficientBalanceModalOpen(false);
//     router.push(`/dashboard/balances/${balanceId}/add-money`);
//   };

//   // --- Render Logic ---

//   // Initial loading state (before balance detail is fetched)
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//         Loading balance details...
//       </div>
//     );
//   }

//   // Error state if balance detail failed to load
//   if (error && !balanceDetail) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
//           <IoIosArrowBack size={20} /> Back
//         </button>
//         <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md text-center">
//           Error: {error}
//         </div>
//         {/* Optionally show transaction loading error here too if applicable */}
//         {isTransactionsLoading && <div className="text-center py-6 text-gray-500">Loading transactions...</div>}
//         {!isTransactionsLoading && error && <div className="text-center py-6 text-red-500">Error loading transactions.</div>}

//       </div>
//     );
//   }

//   // If loading finished but balanceDetail is somehow still null (should be caught by above, but good failsafe)
//   if (!balanceDetail) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//         Balance details could not be loaded or found.
//          {/* Optionally show transaction loading error here too if applicable */}
//          {isTransactionsLoading && <div className="text-center py-6 text-gray-500">Loading transactions...</div>}
//          {!isTransactionsLoading && error && <div className="text-center py-6 text-red-500">Error loading transactions.</div>}
//       </div>
//     );
//   }

//   // --- Main Render (Balance Detail IS Loaded) ---
//   // <<<--- MOVE declarations here --->>>
//   const currencyCode = balanceDetail.currency.code;
//   const currentBalance = balanceDetail.balance;
//   const formattedBalance = parseFloat(currentBalance.toString()).toFixed(2);
//   const canSendMoney = currentBalance > 0;

//   const handleSendClick = () => {
//     if (canSendMoney) {
//       router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//     } else {
//       handleOpenInsufficientBalanceModal(); // Open modal if balance is zero
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
//         <IoIosArrowBack size={20} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-lightgray rounded-2xl p-6 shadow-md mb-8">
//         <div className="flex items-center gap-4 mb-4">
//           <Image
//             src={balanceDetail.currency.flagImage || `/assets/icon/${currencyCode.toLowerCase()}.svg`}
//             alt={`${currencyCode} flag`}
//             width={50}
//             height={50}
//             onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} // Fallback image
//           />
//           <h2 className="text-2xl font-semibold">{currencyCode} balance</h2>
//         </div>
//         <div className="text-4xl font-bold mb-4">
//           {formattedBalance} {currencyCode}
//         </div>
//         {/* Action Buttons */}
//         <div className="flex justify-center sm:justify-start space-x-4 mt-8">
//           {/* Add Money Button */}
//           <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//             <button className="flex items-center cursor-pointer justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition duration-150 ease-in-out">
//               <LuPlus size={20} /> Add
//             </button>
//           </Link>
//           {/* Send Money Button */}
//           <button
//               onClick={handleSendClick}
//               className={`flex items-center cursor-pointer justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md font-medium transition duration-150 ease-in-out ${
//                   !canSendMoney
//                       ? 'opacity-50 bg-blue-400 hover:bg-blue-400'
//                       : 'hover:bg-blue-700'
//               }`}
//               title={!canSendMoney ? "Cannot send from zero balance" : "Send money"}
//           >
//             <GoArrowUp size={20} /> Send
//           </button>
//           {/* Add other actions here */}
//         </div>
//       </div>

//       {/* Transactions Section */}
//       <div className="mt-8">
//          {/* ... (Transaction Section Header and TransactionActions component) ... */}
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <h3 className="text-xl font-semibold">Transactions for {currencyCode}</h3>
//           {balanceSpecificTransactions.length > 0 && (
//              <TransactionActions
//                 transactions={balanceSpecificTransactions}
//                 onTransactionsChange={handleSearchChange}
//                 onFiltersApply={handleFiltersApply}
//              />
//           )}
//         </div>

//         {/* Transaction Loading/Empty/List States */}
//         {/* Note: Separate transaction loading/error handling */}
//         {isTransactionsLoading && (
//           <div className="text-center py-6 text-gray-500">Loading transactions...</div>
//         )}

//         {!isTransactionsLoading && error && balanceDetail && ( // Show transaction-specific error only if balance detail loaded ok
//              <div className="text-center py-6 text-red-500">Error loading transactions: {error}</div>
//         )}

//         {!isTransactionsLoading && !error && displayTransactions.length === 0 && balanceSpecificTransactions.length > 0 && (
//           <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg mt-6">
//             No transactions match your current filter or search criteria.
//           </div>
//         )}

//         {!isTransactionsLoading && !error && balanceSpecificTransactions.length === 0 && (
//           <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg mt-6">
//             No transactions found for this balance yet.
//           </div>
//         )}

//         {/* Render Transaction List if data is available */}
//         {/* ... (Rest of the transaction list rendering logic using inProgressTransactions and groupedProcessedTransactions) ... */}
//         {!isTransactionsLoading && !error && displayTransactions.length > 0 && (
//             <div className="space-y-10">
//                 {/* In Progress Transactions */}
//                 {inProgressTransactions.length > 0 && (
//                   <div>
//                     <h2 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">
//                       In progress
//                     </h2>
//                     <div className="space-y-2">
//                       {inProgressTransactions.map((transaction) => {
//                         const isAddMoney = transaction.type === "Add Money";
//                         const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
//                         const description = isAddMoney ? "Waiting for your money" : "Sending your money";
//                         const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                         const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//                         const amountPrefix = isAddMoney ? "+ " : "- ";
//                         const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                         return (
//                           <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
//                             <div className="hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
//                               <div className="flex items-center gap-4">
//                                 <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200">{icon}</div>
//                                 <div className="flex justify-between w-full items-center">
//                                   <div>
//                                     <h3 className="font-medium text-gray-800">{name}</h3>
//                                     <p className="text-sm text-gray-500">{description}</p>
//                                   </div>
//                                   <div className={`font-medium text-gray-800 whitespace-nowrap`}>
//                                     {amountPrefix}
//                                     {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                     {" "} {displayCurrencyCode}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </Link>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Processed Transactions (Grouped by Date) */}
//                 {Object.entries(groupedProcessedTransactions).length > 0 && (
//                   <div>
//                     <div className="space-y-10">
//                       {Object.entries(groupedProcessedTransactions).map(
//                         ([date, transactionsForDate]) => (
//                           <div key={date}>
//                             <h3 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">
//                               {date}
//                             </h3>
//                             <div className="space-y-2">
//                               {transactionsForDate.map((transaction) => {
//                                  const isAddMoney = transaction.type === "Add Money";
//                                  const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
//                                  let description = isAddMoney ? "Added by you" : "Sent by you";
//                                  let amountClass = isAddMoney ? "text-green-600" : "text-gray-800";
//                                  const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                  const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//                                  const amountPrefix = isAddMoney ? "+ " : "- ";
//                                  const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                                  if (transaction.status === "canceled") {
//                                    description = "Cancelled";
//                                    amountClass = "text-red-500 line-through";
//                                  } else if (transaction.status === "failed") {
//                                    description = "Failed";
//                                    amountClass = "text-red-500";
//                                  }

//                                 return (
//                                   <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
//                                     <div className="hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
//                                       <div className="flex items-center gap-4">
//                                         <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200">{icon}</div>
//                                         <div className="flex justify-between w-full items-center">
//                                           <div>
//                                             <h3 className="font-medium text-gray-800">{name}</h3>
//                                             <p className="text-sm text-gray-500">{description}</p>
//                                           </div>
//                                           <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                                             {amountPrefix}
//                                             {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                             {" "} {displayCurrencyCode}
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </Link>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}
//             </div>
//         )}

//       </div>

//       {/* Render the Insufficient Balance Modal */}
//       {/* <<<--- Ensure modal is only rendered when balanceDetail is loaded --->>> */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode} // Now currencyCode is guaranteed to be defined here
//       />
//     </div>
//   );
// };

// export default BalanceDetailPage;


// // frontend/app/dashboard/balances/[balanceId]/page.tsx

// "use client"; // Required for hooks and client-side interactivity

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios"; // Keep for direct balance fetch
// import { format, parseISO } from "date-fns"; // Keep for potential use, though grouping uses toLocaleDateString

// // Icons
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu"; // Add Money
// import { GoArrowUp } from "react-icons/go"; // Send Money
// import { MdErrorOutline } from "react-icons/md"; // Needs Attention badge

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import apiConfig from "../../../config/apiConfig"; // Adjust path

// // Components and Types
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path

// // Configure Axios Base URL (Optional: Services might handle this)
// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// // Interface for the detailed balance data fetched directly
// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//     flagImage?: string;
//     currencyName?: string;
//   };
//   balance: number;
//   accountNumber?: string;
//   createdAt: string;
//   __v?: number;
// }

// // --- Utility Function ---
// // More robust date parsing, prioritizing ISO format
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         // Attempt ISO parsing first (most common from backend)
//         const isoDate = parseISO(dateString);
//         // Check if the parsed date is valid
//         if (!isNaN(isoDate.getTime())) {
//             return isoDate;
//         }
//     } catch {
//         // Ignore ISO parsing errors and try other formats if needed
//     }

//     // Fallback for dd-MM-yyyy if you expect it from filters
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//             // Use local time based on user's system
//             return new Date(year, month, day);
//         }
//     }

//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth();

//   // --- State ---
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // All user transactions
//   const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]); // Filtered for this balance
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // Filtered/Searched list for UI display
//   const [isLoading, setIsLoading] = useState(true); // Loading balance detail
//   const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Loading transactions
//   const [error, setError] = useState<string | null>(null);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // --- Data Fetching ---
//    const fetchData = useCallback(async () => {
//        if (!balanceId || !token) {
//            setError("Missing balance ID or authentication token.");
//            setIsLoading(false); setIsTransactionsLoading(false); return;
//        }
//        // Reset states on new fetch
//        setIsLoading(true); setIsTransactionsLoading(true); setError(null);
//        setBalanceDetail(null); setAllTransactions([]); setBalanceSpecificTransactions([]); setDisplayTransactions([]);

//        try {
//            // Fetch Balance Details using direct Axios call
//            const balanceResponse = await axios.get(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
//            setBalanceDetail(balanceResponse.data);
//            setIsLoading(false); // Balance details loaded

//            // Fetch Transactions using Services (Parallel)
//            try {
//                const [paymentsResponse, transfersResponse] = await Promise.all([
//                    paymentService.getUserPayments(token),
//                    transferService.getUserTransfers(token),
//                ]);

//                 // Map Payments (Add Money) - Ensure 'type' is added and status normalized
//                 const mappedPayments: Transaction[] = paymentsResponse.map(payment => ({
//                     ...payment, // Spread existing payment data
//                     type: "Add Money", // Explicitly set type
//                     status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
//                     // Ensure nested objects like currency/account are handled if needed elsewhere
//                 }));

//                 // Map Transfers (Send Money) - Ensure 'type' is added and status normalized
//                 const mappedTransfers: Transaction[] = transfersResponse.map(transfer => ({
//                     ...transfer, // Spread existing transfer data
//                     type: "Send Money", // Explicitly set type
//                     status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
//                     name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                           ? transfer.recipient.accountHolderName ?? 'Recipient'
//                           : 'Recipient', // Example: Extract name
//                     sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                       ? transfer.sourceAccount
//                                       : transfer.sourceAccount?._id, // Extract source ID
//                 }));

//                const combined = [...mappedPayments, ...mappedTransfers];
//                // Sort combined transactions by date (newest first)
//                combined.sort((a, b) => {
//                    const dateA = a.updatedAt || a.createdAt;
//                    const dateB = b.updatedAt || b.createdAt;
//                    if (!dateA && !dateB) return 0;
//                    if (!dateA) return 1;
//                    if (!dateB) return -1;
//                    try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
//                    catch { return 0; }
//                });
//                setAllTransactions(combined);

//            } catch (transErr: any) {
//                console.error("Transaction fetch error:", transErr);
//                setError(transErr.response?.data?.message || transErr.message || "Failed to load transactions.");
//                // Don't stop balance display if transactions fail, but show error
//            } finally {
//                setIsTransactionsLoading(false); // Transactions loading finished (success or fail)
//            }

//        } catch (err: any) {
//            console.error("Balance fetch error:", err);
//            setError(err.response?.data?.message || err.message || "Failed to load balance details.");
//            setIsLoading(false); // Stop all loading if balance fetch fails
//            setIsTransactionsLoading(false);
//        }
//    }, [balanceId, token]); // Dependencies for fetchData

//   useEffect(() => { fetchData(); }, [fetchData]); // Fetch data on mount or when dependencies change

//   // --- Filter Transactions Specific to this Balance ---
//   useEffect(() => {
//     if (!balanceId || allTransactions.length === 0) {
//       setBalanceSpecificTransactions([]);
//       setDisplayTransactions([]);
//       return;
//     }
//     // Filter all transactions to get only those relevant to this balanceId
//     const filtered = allTransactions.filter((transaction) => {
//       if (transaction.type === "Add Money") {
//          // Payment is relevant if its associated account ID matches the current balance ID
//          const paymentAccountId = typeof transaction.account === 'string' ? transaction.account : transaction.account?._id;
//          return paymentAccountId === balanceId;
//       } else if (transaction.type === "Send Money") {
//          // Transfer is relevant if its source account ID matches the current balance ID
//          return transaction.sourceAccountId === balanceId;
//       }
//       return false;
//     });
//     setBalanceSpecificTransactions(filtered);
//     setDisplayTransactions(filtered); // Initialize display list with balance-specific transactions
//   }, [allTransactions, balanceId]); // Run when all transactions are loaded or balanceId changes

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//     const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//         // This callback receives the results AFTER TransactionActions has filtered
//         // the `balanceSpecificTransactions` list based on the search term.
//         // We just need to update the `displayTransactions` state with these results.
//         setDisplayTransactions(searchResults);
//     }, []); // No dependencies needed here as it only sets state

//     const handleFiltersApply = useCallback((filters: {
//         selectedDirection?: string;
//         selectedStatus?: string | null; // Status filter value (e.g., 'completed', 'pending')
//         fromDate?: string; // Date string format depends on your DatePicker
//         toDate?: string;   // Date string format depends on your DatePicker
//         // Add other potential filter types if TransactionActions supports them
//     }) => {
//         console.log(`BalanceDetailPage: Applying filters:`, filters);
//         let tempFiltered = [...balanceSpecificTransactions]; // Always start filtering from the balance-specific list

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized to lowercase
//                 if (!txStatus) return false;

//                 // Map UI filter names to potential backend statuses
//                 if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                 if (statusFilter === 'completed') return txStatus === 'completed';
//                 if (statusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled';
//                 if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                 if (statusFilter === 'failed') return txStatus === 'failed';
//                 // Add more mappings if needed
//                 return false; // Default to excluding if status doesn't match known filters
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);

//         // Set time to cover the entire day for comparisons
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected day
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected day

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 // Prefer updatedAt, fallback to createdAt for the transaction date
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false; // Cannot filter if date is missing

//                 try {
//                     const transactionDateObj = new Date(transactionDateStr); // Assumes ISO 8601 format from backend
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string for filtering:", transactionDateStr);
//                          return false; // Exclude if date is invalid
//                     }
//                     // Apply date range filtering
//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                     if (toDateObj && transactionDateObj > toDateObj) include = false;
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date during filtering:", transactionDateStr, e);
//                     return false; // Exclude on parsing error
//                 }
//             });
//         }

//         // Update the state that controls the UI display
//         setDisplayTransactions(tempFiltered);

//     }, [balanceSpecificTransactions]); // Recalculate filters if the base list changes


//   // --- Memoized Transaction Grouping for Display ---
//   // Groups transactions from the `displayTransactions` state (which reflects search/filters)
//   const { pendingAttentionTransactions, inProgressTransactions, groupedProcessedTransactions, hasProcessedTransactions } = useMemo(() => {
//       // 1. Needs Attention: 'Add Money' transactions with status 'pending'
//       const pendingAttention = displayTransactions.filter(
//           (tx) => tx.type === "Add Money" && tx.status === "pending" // Status already normalized
//       );

//       // 2. In Progress: 'Add Money'/'in progress' OR 'Send Money'/'pending'/'processing'
//       const inProgress = displayTransactions.filter(
//           (tx) => (tx.type === "Add Money" && tx.status === "in progress") ||
//                    (tx.type === "Send Money" && (tx.status === "pending" || tx.status === "processing"))
//       );

//       // 3. Processed: Completed, Canceled, Failed transactions
//       const processed = displayTransactions.filter(
//           (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
//       );

//       // Sort processed transactions by date (newest first)
//       const sortedProcessed = [...processed].sort((a, b) => {
//           const dateA = a.updatedAt || a.createdAt;
//           const dateB = b.updatedAt || b.createdAt;
//           if (!dateA && !dateB) return 0;
//           if (!dateA) return 1; // Put items without date at the end
//           if (!dateB) return -1;
//           try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
//           catch { return 0; } // Avoid crashing on invalid dates
//       });

//       // Group sorted processed transactions by date string (e.g., "July 20, 2023")
//       const grouped = sortedProcessed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
//           const groupDateStr = tx.updatedAt || tx.createdAt;
//           if (!groupDateStr) {
//               const unknownDateKey = 'Unknown Date';
//               groups[unknownDateKey] = [...(groups[unknownDateKey] || []), tx];
//               return groups;
//           }
//           try {
//               // Use a consistent format for grouping keys
//               const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', { // Example locale
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//               });
//               groups[dateKey] = [...(groups[dateKey] || []), tx];
//           } catch (e) {
//               console.error("Error formatting date for grouping:", groupDateStr, e);
//               const errorKey = 'Date Error';
//               groups[errorKey] = [...(groups[errorKey] || []), tx];
//           }
//           return groups;
//       }, {});

//       return {
//           pendingAttentionTransactions: pendingAttention,
//           inProgressTransactions: inProgress,
//           groupedProcessedTransactions: grouped || {}, // Ensure it's always an object
//           hasProcessedTransactions: processed.length > 0,
//       };
//   }, [displayTransactions]); // Recalculate only when the transactions to display change


//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); };
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => {
//     router.push(`/dashboard/balances/${balanceId}/add-money`); // Navigate to Add Money page
//   };

//    // --- Send Click Handler ---
//     const handleSendClick = () => {
//         if (canSendMoney) {
//             // Navigate to the first step of the send flow
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             // Open the insufficient balance modal
//             handleOpenInsufficientBalanceModal();
//         }
//     };

//   // --- Render Logic ---

//   // Initial Loading State for Balance Detail
//   if (isLoading) return (
//     <div className="container mx-auto px-4 py-8 animate-pulse">
//         <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-4 mb-4">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <Skeleton className="h-6 w-32" />
//             </div>
//             <Skeleton className="h-10 w-48 mb-6" />
//             <div className="flex justify-start space-x-3">
//                 <Skeleton className="h-10 w-24 rounded-md" />
//                 <Skeleton className="h-10 w-24 rounded-md" />
//             </div>
//         </div>
//          <Skeleton className="h-8 w-40 mb-6" /> {/* Transactions title */}
//          <Skeleton className="h-40 w-full rounded-lg" /> {/* Placeholder for transactions */}
//     </div>
//   );

//   // Balance Loading Error State
//   if (error && !balanceDetail) return (
//     <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//              <p className="font-semibold">Error Loading Balance</p>
//              <p className="text-sm mt-1">{error}</p>
//         </div>
//         <Button onClick={() => router.back()} variant="outline" className="mt-6">
//             Go Back
//         </Button>
//     </div>
//    );

//   // Balance Not Found State
//   if (!isLoading && !balanceDetail) return (
//     <div className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
//         <p>Balance details not found or you may not have access.</p>
//         <Button onClick={() => router.push('/dashboard')} variant="outline" className="mt-4">
//              Go to Dashboard
//         </Button>
//     </div>
//    );

//   // --- Balance Detail is Loaded, Continue Rendering ---
//   const currencyCode = balanceDetail.currency.code;
//   const currentBalance = balanceDetail.balance;
//   const formattedBalance = parseFloat(currentBalance.toString()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Format with commas
//   const canSendMoney = currentBalance > 0;
//   const hasAnyTransactionsToDisplay = pendingAttentionTransactions.length > 0 || inProgressTransactions.length > 0 || hasProcessedTransactions;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm transition-colors">
//         <IoIosArrowBack size={18} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
//          {/* Card Content: Flag, Title, Amount, Buttons */}
//           <div className="flex items-center gap-4 mb-4">
//                 {balanceDetail.currency.flagImage ? (
//                     <Image src={balanceDetail.currency.flagImage} alt={`${currencyCode} flag`} width={40} height={40} className="rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} />
//                  ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">{currencyCode.slice(0, 2)}</div>
//                  )}
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{currencyCode} Balance</h2>
//             </div>
//             <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//                 {formattedBalance} <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">{currencyCode}</span>
//             </div>
//             <div className="flex justify-start space-x-3">
//                 <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//                     <Button className="bg-green-600 hover:bg-green-700 text-white">
//                         <LuPlus size={18} className="mr-2"/> Add
//                     </Button>
//                 </Link>
//                 <Button onClick={handleSendClick} className={`bg-blue-600 text-white ${!canSendMoney ? 'opacity-50 bg-blue-400 hover:bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`} title={!canSendMoney ? "Add funds to send money" : "Send money"}>
//                     <GoArrowUp size={18} className="mr-2" /> Send
//                 </Button>
//             </div>
//       </div>

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
//             {/* Render Actions if there are transactions to filter/search */}
//             {/* Pass balanceSpecificTransactions as the base list for actions */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions}
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   // Add userAccounts prop if filter component needs it
//                />
//             )}
//             {/* Loading skeleton for actions */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse">
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                  </div>
//               )}
//         </div>

//         {/* Transaction Loading State */}
//         {isTransactionsLoading && (
//           <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading transactions...</div>
//         )}

//         {/* Transaction Error State */}
//         {!isTransactionsLoading && error && balanceDetail && (
//              <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//                  <strong>Error:</strong> {error.replace('Failed to load transactions: ','')}
//              </div>
//         )}

//         {/* Transaction List Area */}
//         {!isTransactionsLoading && !error && (
//             <div className="space-y-8">

//                  {/* --- Needs Your Attention Section --- */}
//                  {pendingAttentionTransactions.length > 0 && (
//                      <div>
//                          <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">Needs your attention</h2>
//                          <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                              {pendingAttentionTransactions.map((transaction) => {
//                                  const amount = transaction.amountToAdd ?? 0;
//                                  const name = `To your ${currencyCode} balance`;
//                                  return (
//                                      <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                           <a className="block hover:bg-orange-50 dark:hover:bg-orange-900/20 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                              <div className="flex items-center gap-4">
//                                                  {/* Icon with Badge */}
//                                                  <div className="relative flex-shrink-0">
//                                                       <div className="p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center border border-yellow-200 dark:border-yellow-700/40">
//                                                          <LuPlus size={22} className="text-yellow-700 dark:text-yellow-300" />
//                                                      </div>
//                                                       <MdErrorOutline size={18} className="absolute -bottom-1 -right-1 text-orange-500 dark:text-orange-400 bg-white dark:bg-gray-900 rounded-full p-0.5 shadow-sm" />
//                                                  </div>
//                                                  {/* Details */}
//                                                  <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                                                      <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                          <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                          <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-medium">Waiting for you to pay</p>
//                                                      </div>
//                                                      <div className={`font-medium text-green-600 dark:text-green-400 text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                          + {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencyCode}
//                                                      </div>
//                                                  </div>
//                                              </div>
//                                          </a>
//                                      </Link>
//                                  );
//                              })}
//                          </div>
//                      </div>
//                  )}

//                 {/* --- In Progress Transactions Section --- */}
//                 {inProgressTransactions.length > 0 && (
//                   <div>
//                     <h2 className="font-medium text-gray-600 dark:text-gray-400 mb-3 text-sm uppercase tracking-wider">In progress</h2>
//                      <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                       {inProgressTransactions.map((transaction) => {
//                            const isAddMoney = transaction.type === "Add Money";
//                            const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                            let description = isAddMoney ? "We received your funds" : (transaction.status === 'pending' ? "Sending your money" : "Processing transfer");
//                            const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                            const txCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                            const amountPrefix = isAddMoney ? "+ " : "- ";
//                            const name = isAddMoney ? `To your ${txCurrencyCode} balance` : (transaction.name || "Recipient");

//                            return (
//                                  <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                      <a className="block hover:bg-gray-100 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                          <div className="flex items-center gap-4">
//                                              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700/40">
//                                                  {icon}
//                                              </div>
//                                              <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                  <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                      <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                      <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-medium">{description}</p>
//                                                  </div>
//                                                  <div className={`font-medium text-sm md:text-base whitespace-nowrap sm:ml-4 ${isAddMoney ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>
//                                                      {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {txCurrencyCode}
//                                                  </div>
//                                              </div>
//                                          </div>
//                                      </a>
//                                  </Link>
//                              );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* --- Processed Transactions (Grouped by Date) Section --- */}
//                 {/* Fix: Check groupedProcessedTransactions exists before accessing keys */}
//                 {hasProcessedTransactions && groupedProcessedTransactions && Object.keys(groupedProcessedTransactions).length > 0 && (
//                   <div className="space-y-6">
//                     {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
//                         <div key={date}>
//                              <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-3 text-sm uppercase tracking-wider">{date}</h3>
//                              <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                                 {transactionsForDate.map((transaction) => {
//                                     const isAddMoney = transaction.type === "Add Money";
//                                     const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                                     let description = isAddMoney ? "Added" : `Sent to ${transaction.name || 'Recipient'}`;
//                                     let amountClass = isAddMoney ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-100";
//                                     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                     const displayCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                                     const amountPrefix = isAddMoney ? "+ " : "- ";
//                                     const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                                     if (transaction.status === "canceled" || transaction.status === "cancelled") { description = "Cancelled"; amountClass = "text-red-500 dark:text-red-400 line-through"; }
//                                     else if (transaction.status === "failed") { description = "Failed"; amountClass = "text-red-500 dark:text-red-400"; }

//                                      return (
//                                          <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                              <a className="block hover:bg-gray-100 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                                  <div className="flex items-center gap-4">
//                                                      <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600/50">
//                                                          {icon}
//                                                      </div>
//                                                      <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                          <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                              <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
//                                                          </div>
//                                                          <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                              {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrencyCode}
//                                                          </div>
//                                                      </div>
//                                                  </div>
//                                              </a>
//                                          </Link>
//                                      );
//                                 })}
//                             </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* --- Empty State for Transactions --- */}
//                 {!hasAnyTransactionsToDisplay && (
//                   <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800/50 rounded-lg mt-6 border border-gray-200 dark:border-gray-700/50">
//                     {balanceSpecificTransactions.length === 0 // Check if the base list for this balance was empty
//                        ? `No transactions found for this ${currencyCode} balance yet.`
//                        : "No transactions match your current filter or search criteria." // Filters/search yielded empty
//                     }
//                   </div>
//                 )}
//             </div>
//         )}
//       </div> {/* End Transactions Section Div */}

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div> // End Main Container Div
//   );
// };

// export default BalanceDetailPage;




// frontend/app/dashboard/balances/[balanceId]/page.tsx

"use client"; // Required for hooks and client-side interactivity

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios"; // Keep for direct balance fetch
import { format, parseISO } from "date-fns"; // Keep for potential use, though grouping uses toLocaleDateString

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { LuPlus } from "react-icons/lu"; // Add Money
import { GoArrowUp } from "react-icons/go"; // Send Money
import { MdErrorOutline } from "react-icons/md"; // Needs Attention badge

// Hooks and Services
import { useAuth } from "../../../hooks/useAuth"; // Adjust path
import paymentService from "../../../services/payment"; // Adjust path
import transferService from "../../../services/transfer"; // Adjust path
import apiConfig from "../../../config/apiConfig"; // Adjust path

// Components and Types
import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
import { Transaction } from "@/types/transaction"; // Adjust path
import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path

// Configure Axios Base URL (Optional: Services might handle this)
axios.defaults.baseURL = apiConfig.baseUrl;

// --- Interfaces ---
interface BalanceDetailPageParams {
  balanceId: string;
}

// Interface for the detailed balance data fetched directly
interface BalanceDetail {
  _id: string;
  user: string;
  currency: {
    _id: string;
    code: string;
    flagImage?: string;
    currencyName?: string;
  };
  balance: number;
  accountNumber?: string;
  createdAt: string;
  __v?: number;
}

// --- Utility Function ---
// More robust date parsing, prioritizing ISO format
function parseDateString(dateString: string | undefined): Date | null {
    if (!dateString) return null;
    try {
        // Attempt ISO parsing first (most common from backend)
        const isoDate = parseISO(dateString);
        // Check if the parsed date is valid
        if (!isNaN(isoDate.getTime())) {
            return isoDate;
        }
    } catch {
        // Ignore ISO parsing errors and try other formats if needed
    }

    // Fallback for dd-MM-yyyy if you expect it from filters
    const parts = dateString.split('-');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            // Use local time based on user's system
            return new Date(year, month, day);
        }
    }

    console.warn("Could not parse date string:", dateString);
    return null;
}

// --- Component ---
const BalanceDetailPage = () => {
  const params = useParams<BalanceDetailPageParams>();
  const router = useRouter();
  const { balanceId } = params;
  const { token } = useAuth();

  // --- State ---
  const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // All user transactions
  const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]); // Filtered for this balance
  const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // Filtered/Searched list for UI display
  const [isLoading, setIsLoading] = useState(true); // Loading balance detail
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Loading transactions
  const [error, setError] = useState<string | null>(null);
  const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

  // --- Data Fetching ---
   const fetchData = useCallback(async () => {
       if (!balanceId || !token) {
           setError("Missing balance ID or authentication token.");
           setIsLoading(false); setIsTransactionsLoading(false); return;
       }
       // Reset states on new fetch
       setIsLoading(true); setIsTransactionsLoading(true); setError(null);
       setBalanceDetail(null); setAllTransactions([]); setBalanceSpecificTransactions([]); setDisplayTransactions([]);

       try {
           // Fetch Balance Details using direct Axios call
           const balanceResponse = await axios.get(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
           setBalanceDetail(balanceResponse.data);
           setIsLoading(false); // Balance details loaded

           // Fetch Transactions using Services (Parallel)
           try {
               const [paymentsResponse, transfersResponse] = await Promise.all([
                   paymentService.getUserPayments(token),
                   transferService.getUserTransfers(token),
               ]);

                // Map Payments (Add Money) - Ensure 'type' is added and status normalized
                const mappedPayments: Transaction[] = paymentsResponse.map(payment => ({
                    ...payment, // Spread existing payment data
                    type: "Add Money", // Explicitly set type
                    status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
                    // Ensure nested objects like currency/account are handled if needed elsewhere
                }));

                // Map Transfers (Send Money) - Ensure 'type' is added and status normalized
                const mappedTransfers: Transaction[] = transfersResponse.map(transfer => ({
                    ...transfer, // Spread existing transfer data
                    type: "Send Money", // Explicitly set type
                    status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
                    name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
                          ? transfer.recipient.accountHolderName ?? 'Recipient'
                          : 'Recipient', // Example: Extract name
                    sourceAccountId: typeof transfer.sourceAccount === 'string'
                                      ? transfer.sourceAccount
                                      : transfer.sourceAccount?._id, // Extract source ID
                }));

               const combined = [...mappedPayments, ...mappedTransfers];
               // Sort combined transactions by date (newest first)
               combined.sort((a, b) => {
                   const dateA = a.updatedAt || a.createdAt;
                   const dateB = b.updatedAt || b.createdAt;
                   if (!dateA && !dateB) return 0;
                   if (!dateA) return 1;
                   if (!dateB) return -1;
                   try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
                   catch { return 0; }
               });
               setAllTransactions(combined);

           } catch (transErr: any) {
               console.error("Transaction fetch error:", transErr);
               setError(transErr.response?.data?.message || transErr.message || "Failed to load transactions.");
               // Don't stop balance display if transactions fail, but show error
           } finally {
               setIsTransactionsLoading(false); // Transactions loading finished (success or fail)
           }

       } catch (err: any) {
           console.error("Balance fetch error:", err);
           setError(err.response?.data?.message || err.message || "Failed to load balance details.");
           setIsLoading(false); // Stop all loading if balance fetch fails
           setIsTransactionsLoading(false);
       }
   }, [balanceId, token]); // Dependencies for fetchData

  useEffect(() => { fetchData(); }, [fetchData]); // Fetch data on mount or when dependencies change

  // --- Filter Transactions Specific to this Balance ---
  useEffect(() => {
    if (!balanceId || allTransactions.length === 0) {
      setBalanceSpecificTransactions([]);
      setDisplayTransactions([]);
      return;
    }
    // Filter all transactions to get only those relevant to this balanceId
    const filtered = allTransactions.filter((transaction) => {
      if (transaction.type === "Add Money") {
         // Payment is relevant if its associated account ID matches the current balance ID
         const paymentAccountId = typeof transaction.account === 'string' ? transaction.account : transaction.account?._id;
         return paymentAccountId === balanceId;
      } else if (transaction.type === "Send Money") {
         // Transfer is relevant if its source account ID matches the current balance ID
         return transaction.sourceAccountId === balanceId;
      }
      return false;
    });
    setBalanceSpecificTransactions(filtered);
    setDisplayTransactions(filtered); // Initialize display list with balance-specific transactions
  }, [allTransactions, balanceId]); // Run when all transactions are loaded or balanceId changes

  // --- Callbacks for TransactionActions (Search/Filter) ---
    const handleSearchChange = useCallback((searchResults: Transaction[]) => {
        // This callback receives the results AFTER TransactionActions has filtered
        // the `balanceSpecificTransactions` list based on the search term.
        // We just need to update the `displayTransactions` state with these results.
        setDisplayTransactions(searchResults);
    }, []); // No dependencies needed here as it only sets state

    const handleFiltersApply = useCallback((filters: {
        selectedDirection?: string;
        selectedStatus?: string | null; // Status filter value (e.g., 'completed', 'pending')
        fromDate?: string; // Date string format depends on your DatePicker
        toDate?: string;   // Date string format depends on your DatePicker
        // Add other potential filter types if TransactionActions supports them
    }) => {
        console.log(`BalanceDetailPage: Applying filters:`, filters);
        let tempFiltered = [...balanceSpecificTransactions]; // Always start filtering from the balance-specific list

        // Apply Direction Filter
        const direction = filters.selectedDirection;
        if (direction && direction !== 'all') {
            tempFiltered = tempFiltered.filter(tx =>
                (direction === 'add' && tx.type === 'Add Money') ||
                (direction === 'send' && tx.type === 'Send Money')
            );
        }

        // Apply Status Filter
        const statusFilter = filters.selectedStatus?.toLowerCase();
        if (statusFilter) {
            tempFiltered = tempFiltered.filter(tx => {
                const txStatus = tx.status; // Already normalized to lowercase
                if (!txStatus) return false;

                // Map UI filter names to potential backend statuses
                if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
                if (statusFilter === 'completed') return txStatus === 'completed';
                if (statusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled';
                if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
                if (statusFilter === 'failed') return txStatus === 'failed';
                // Add more mappings if needed
                return false; // Default to excluding if status doesn't match known filters
            });
        }

        // Apply Date Filter
        const fromDateObj = parseDateString(filters.fromDate);
        const toDateObj = parseDateString(filters.toDate);

        // Set time to cover the entire day for comparisons
        if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected day
        if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected day

        if (fromDateObj || toDateObj) {
            tempFiltered = tempFiltered.filter(tx => {
                // Prefer updatedAt, fallback to createdAt for the transaction date
                const transactionDateStr = tx.updatedAt || tx.createdAt;
                if (!transactionDateStr) return false; // Cannot filter if date is missing

                try {
                    const transactionDateObj = new Date(transactionDateStr); // Assumes ISO 8601 format from backend
                    if (isNaN(transactionDateObj.getTime())) {
                         console.warn("Invalid transaction date string for filtering:", transactionDateStr);
                         return false; // Exclude if date is invalid
                    }
                    // Apply date range filtering
                    let include = true;
                    if (fromDateObj && transactionDateObj < fromDateObj) include = false;
                    if (toDateObj && transactionDateObj > toDateObj) include = false;
                    return include;
                } catch (e) {
                    console.error("Error parsing transaction date during filtering:", transactionDateStr, e);
                    return false; // Exclude on parsing error
                }
            });
        }

        // Update the state that controls the UI display
        setDisplayTransactions(tempFiltered);

    }, [balanceSpecificTransactions]); // Recalculate filters if the base list changes


  // --- Memoized Transaction Grouping for Display ---
  // Groups transactions from the `displayTransactions` state (which reflects search/filters)
  const { pendingAttentionTransactions, inProgressTransactions, groupedProcessedTransactions, hasProcessedTransactions } = useMemo(() => {
      // 1. Needs Attention: 'Add Money' transactions with status 'pending'
      const pendingAttention = displayTransactions.filter(
          (tx) => tx.type === "Add Money" && tx.status === "pending" // Status already normalized
      );

      // 2. In Progress: 'Add Money'/'in progress' OR 'Send Money'/'pending'/'processing'
      const inProgress = displayTransactions.filter(
          (tx) => (tx.type === "Add Money" && tx.status === "in progress") ||
                   (tx.type === "Send Money" && (tx.status === "pending" || tx.status === "processing"))
      );

      // 3. Processed: Completed, Canceled, Failed transactions
      const processed = displayTransactions.filter(
          (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
      );

      // Sort processed transactions by date (newest first)
      const sortedProcessed = [...processed].sort((a, b) => {
          const dateA = a.updatedAt || a.createdAt;
          const dateB = b.updatedAt || b.createdAt;
          if (!dateA && !dateB) return 0;
          if (!dateA) return 1; // Put items without date at the end
          if (!dateB) return -1;
          try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
          catch { return 0; } // Avoid crashing on invalid dates
      });

      // Group sorted processed transactions by date string (e.g., "July 20, 2023")
      const grouped = sortedProcessed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
          const groupDateStr = tx.updatedAt || tx.createdAt;
          if (!groupDateStr) {
              const unknownDateKey = 'Unknown Date';
              groups[unknownDateKey] = [...(groups[unknownDateKey] || []), tx];
              return groups;
          }
          try {
              // Use a consistent format for grouping keys
              const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', { // Example locale
                  year: "numeric",
                  month: "long",
                  day: "numeric",
              });
              groups[dateKey] = [...(groups[dateKey] || []), tx];
          } catch (e) {
              console.error("Error formatting date for grouping:", groupDateStr, e);
              const errorKey = 'Date Error';
              groups[errorKey] = [...(groups[errorKey] || []), tx];
          }
          return groups;
      }, {});

      return {
          pendingAttentionTransactions: pendingAttention,
          inProgressTransactions: inProgress,
          groupedProcessedTransactions: grouped || {}, // Ensure it's always an object
          hasProcessedTransactions: processed.length > 0,
      };
  }, [displayTransactions]); // Recalculate only when the transactions to display change


  // --- Modal Handlers ---
  const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); };
  const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
  const handleAddMoneyFromModal = () => {
    router.push(`/dashboard/balances/${balanceId}/add-money`); // Navigate to Add Money page
  };

   // --- Send Click Handler ---
    const handleSendClick = () => {
        if (canSendMoney) {
            // Navigate to the first step of the send flow
            router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
        } else {
            // Open the insufficient balance modal
            handleOpenInsufficientBalanceModal();
        }
    };

  // --- Render Logic ---

  // Initial Loading State for Balance Detail
  if (isLoading) return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
        <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-10 w-48 mb-6" />
            <div className="flex justify-start space-x-3">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-24 rounded-md" />
            </div>
        </div>
         <Skeleton className="h-8 w-40 mb-6" /> {/* Transactions title */}
         <Skeleton className="h-40 w-full rounded-lg" /> {/* Placeholder for transactions */}
    </div>
  );

  // Balance Loading Error State
  if (error && !balanceDetail) return (
    <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
             <p className="font-semibold">Error Loading Balance</p>
             <p className="text-sm mt-1">{error}</p>
        </div>
        <Button onClick={() => router.back()} variant="outline" className="mt-6">
            Go Back
        </Button>
    </div>
   );

  // Balance Not Found State
  if (!isLoading && !balanceDetail) return (
    <div className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
        <p>Balance details not found or you may not have access.</p>
        <Button onClick={() => router.push('/dashboard')} variant="outline" className="mt-4">
             Go to Dashboard
        </Button>
    </div>
   );

  // --- Balance Detail is Loaded, Continue Rendering ---
  const currencyCode = balanceDetail.currency.code;
  const currentBalance = balanceDetail.balance;
  const formattedBalance = parseFloat(currentBalance.toString()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Format with commas
  const canSendMoney = currentBalance > 0;
  const hasAnyTransactionsToDisplay = pendingAttentionTransactions.length > 0 || inProgressTransactions.length > 0 || hasProcessedTransactions;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button onClick={() => router.back()} className="mb-4 flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm transition-colors">
        <IoIosArrowBack size={18} /> Back
      </button>

      {/* Balance Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
         {/* Card Content: Flag, Title, Amount, Buttons */}
          <div className="flex items-center gap-4 mb-4">
                {balanceDetail.currency.flagImage ? (
                    <Image src={balanceDetail.currency.flagImage} alt={`${currencyCode} flag`} width={40} height={40} className="rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} />
                 ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">{currencyCode.slice(0, 2)}</div>
                 )}
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{currencyCode} Balance</h2>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {formattedBalance} <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">{currencyCode}</span>
            </div>
            <div className="flex justify-start space-x-3">
                <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <LuPlus size={18} className="mr-2"/> Add
                    </Button>
                </Link>
                <Button onClick={handleSendClick} className={`bg-blue-600 text-white ${!canSendMoney ? 'opacity-50 bg-blue-400 hover:bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`} title={!canSendMoney ? "Add funds to send money" : "Send money"}>
                    <GoArrowUp size={18} className="mr-2" /> Send
                </Button>
            </div>
      </div>

      {/* --- Transactions Section --- */}
      <div className="mt-10">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
            {/* Render Actions if there are transactions to filter/search */}
            {/* Pass balanceSpecificTransactions as the base list for actions */}
            {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
               <TransactionActions
                  transactions={balanceSpecificTransactions}
                  onTransactionsChange={handleSearchChange}
                  onFiltersApply={handleFiltersApply}
                  // Add userAccounts prop if filter component needs it
               />
            )}
            {/* Loading skeleton for actions */}
            {isTransactionsLoading && (
                 <div className="flex items-center gap-2 animate-pulse">
                     <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
                     <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
                 </div>
              )}
        </div>

        {/* Transaction Loading State */}
        {isTransactionsLoading && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading transactions...</div>
        )}

        {/* Transaction Error State */}
        {!isTransactionsLoading && error && balanceDetail && (
             <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
                 <strong>Error:</strong> {error.replace('Failed to load transactions: ','')}
             </div>
        )}

        {/* Transaction List Area */}
        {!isTransactionsLoading && !error && (
            <div className="space-y-4">

                 {/* --- Needs Your Attention Section --- */}
                 {pendingAttentionTransactions.length > 0 && (
                     <div>
                         <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">Needs your attention</h2>
                         <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                             {pendingAttentionTransactions.map((transaction) => {
                                 const amount = transaction.amountToAdd ?? 0;
                                 const name = `To your ${currencyCode} balance`;
                                 return (
                                     <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
                                          <a className="block hover:bg-orange-50 dark:hover:bg-orange-900/20 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
                                             <div className="flex items-center gap-4">
                                                 {/* Icon with Badge */}
                                                 <div className="relative flex-shrink-0">
                                                      <div className="p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center border border-yellow-200 dark:border-yellow-700/40">
                                                         <LuPlus size={22} className="text-yellow-700 dark:text-yellow-300" />
                                                     </div>
                                                      <MdErrorOutline size={18} className="absolute -bottom-1 -right-1 text-orange-500 dark:text-orange-400 bg-white dark:bg-gray-900 rounded-full p-0.5 shadow-sm" />
                                                 </div>
                                                 {/* Details */}
                                                 <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                                     <div className="mb-1 sm:mb-0 flex-1 min-w-0">
                                                         <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
                                                         <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-medium">Waiting for you to pay</p>
                                                     </div>
                                                     <div className={`font-medium text-green-600 dark:text-green-400 text-sm md:text-base whitespace-nowrap sm:ml-4`}>
                                                         + {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencyCode}
                                                     </div>
                                                 </div>
                                             </div>
                                         </a>
                                     </Link>
                                 );
                             })}
                         </div>
                     </div>
                 )}

                {/* --- In Progress Transactions Section --- */}
                {inProgressTransactions.length > 0 && (
                  <div>
                    <h2 className="font-medium text-gray-600 dark:text-gray-400 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-gray-700 after:mt-1">In progress</h2>
                     <div className="space-y-2">
                      {inProgressTransactions.map((transaction) => {
                           const isAddMoney = transaction.type === "Add Money";
                           const icon = isAddMoney ? <LuPlus size={22} className="`text-blue-600 dark:text-blue-400`" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
                           let description = isAddMoney ? "We received your funds" : (transaction.status === 'pending' ? "Sending your money" : "Processing transfer");
                           const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
                           const txCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
                           const amountPrefix = isAddMoney ? "+ " : "- ";
                           const name = isAddMoney ? `To your ${txCurrencyCode} balance` : (transaction.name || "Recipient");

                           return (
                                 <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
                                     <a className="block hover:bg-gray-100 dark:hover:bg-gray-700/50 p-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
                                         <div className="flex items-center gap-4">
                                             <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700/40">
                                                 {icon}
                                             </div>
                                             <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                                 <div className="mb-1 sm:mb-0 flex-1 min-w-0">
                                                     <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
                                                     <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-medium">{description}</p>
                                                 </div>
                                                 <div className={`font-medium text-sm md:text-base whitespace-nowrap sm:ml-4 ${isAddMoney ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>
                                                     {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {txCurrencyCode}
                                                 </div>
                                             </div>
                                         </div>
                                     </a>
                                 </Link>
                             );
                      })}
                    </div>
                  </div>
                )}

                {/* --- Processed Transactions (Grouped by Date) Section --- */}
                {/* Fix: Check groupedProcessedTransactions exists before accessing keys */}
                {hasProcessedTransactions && groupedProcessedTransactions && Object.keys(groupedProcessedTransactions).length > 0 && (
                  <div className="space-y-6">
                    {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
                        <div key={date}>
                             <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-3 text-sm uppercase tracking-wider">{date}</h3>
                             <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                {transactionsForDate.map((transaction) => {
                                    const isAddMoney = transaction.type === "Add Money";
                                    const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
                                    let description = isAddMoney ? "Added" : `Sent to ${transaction.name || 'Recipient'}`;
                                    let amountClass = isAddMoney ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-100";
                                    const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
                                    const displayCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
                                    const amountPrefix = isAddMoney ? "+ " : "- ";
                                    const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

                                    if (transaction.status === "canceled" || transaction.status === "cancelled") { description = "Cancelled"; amountClass = "text-red-500 dark:text-red-400 line-through"; }
                                    else if (transaction.status === "failed") { description = "Failed"; amountClass = "text-red-500 dark:text-red-400"; }

                                     return (
                                         <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
                                             <a className="block hover:bg-gray-100 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
                                                 <div className="flex items-center gap-4">
                                                     <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600/50">
                                                         {icon}
                                                     </div>
                                                     <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                                         <div className="mb-1 sm:mb-0 flex-1 min-w-0">
                                                             <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
                                                             <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
                                                         </div>
                                                         <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap sm:ml-4`}>
                                                             {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrencyCode}
                                                         </div>
                                                     </div>
                                                 </div>
                                             </a>
                                         </Link>
                                     );
                                })}
                            </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* --- Empty State for Transactions --- */}
                {!hasAnyTransactionsToDisplay && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800/50 rounded-lg mt-6 border border-gray-200 dark:border-gray-700/50">
                    {balanceSpecificTransactions.length === 0 // Check if the base list for this balance was empty
                       ? `No transactions found for this ${currencyCode} balance yet.`
                       : "No transactions match your current filter or search criteria." // Filters/search yielded empty
                    }
                  </div>
                )}
            </div>
        )}
      </div> {/* End Transactions Section Div */}

      {/* Insufficient Balance Modal */}
      <InsufficientBalanceModal
          isOpen={isInsufficientBalanceModalOpen}
          onClose={handleCloseInsufficientBalanceModal}
          onAddMoney={handleAddMoneyFromModal}
          currencyCode={currencyCode}
      />
    </div> // End Main Container Div
  );
};

export default BalanceDetailPage;