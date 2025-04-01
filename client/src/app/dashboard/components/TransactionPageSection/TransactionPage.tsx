// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react"; // Import useCallback
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions"; // Import from data file
// import TransactionActions from "./TransactionActions"; // Import TransactionActions component

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions); // State for filtered transactions

//   // Use useCallback to memoize handleTransactionsChange
//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions);
//   }, []); // Empty dependency array because handleTransactionsChange doesn't depend on any variables from the component scope

//   // Determine which transaction list to use for filtering in-process and processed: filteredTransactions or defaultTransactions (if no filter applied in Search component)
//   const transactionsToFilter = filteredTransactions;


//   // Filter in-process transactions
//   const inProcessTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   // Filter processed transactions
//   const processedTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "processed"
//   );

//   // Sort processed transactions by processedDate in descending order (latest date first)
//   const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//     if (!a.processedDate || !b.processedDate) return 0;
//     return new Date(b.processedDate).getTime() - new Date(a.processedDate).getTime();
//   });

//   // Group processed transactions by processedDate
//   const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//     sortedProcessedTransactions.reduce(
//       (groups: { [date: string]: Transaction[] }, transaction) => {
//         if (!transaction.processedDate) {
//           return groups;
//         }
//         const date = new Date(transaction.processedDate).toLocaleDateString('en-US', {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         if (!groups[date]) {
//           groups[date] = [];
//         }
//         groups[date].push(transaction);
//         return groups;
//       },
//       {}
//     );

//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             {/* Transaction Actions Component (Search, Filters, Download) */}
//             <TransactionActions
//               transactions={defaultTransactions} // Pass defaultTransactions to TransactionActions
//               onTransactionsChange={handleTransactionsChange} // Pass callback to TransactionActions
//             />
//           </div>

//           <div className="space-y-10">
//             {/* In Progress Transactions Section */}
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-500 mb-6 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray-300 after:mt-1">In progress</h2>
//                 <div className="space-y-8">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description; // Initialize with existing or undefined
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Transaction History Section (Processed Transactions) */}
//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-500 mb-6 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray-300 after:mt-1">{date}</h3>
//                         <div className="space-y-8">
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description; // Initialize with existing or undefined
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                             }
//                             return (
//                               <div key={transaction.id} className="">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${
//                                         transaction.type === "Add Money"
//                                           ? "text-green-600"
//                                           : "text-main"
//                                       }`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* If no transactions of either type */}
//             {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;








// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions";
// import TransactionActions from "./TransactionActions";

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions);
//   const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);

//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions);
//   }, []);

//   const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[] }) => {
//     setAppliedRecipientFilters(filters.selectedRecipients);
//   }, []);

//   // Filter transactions based on applied recipient filters
//   const filteredByRecipient = appliedRecipientFilters.length > 0
//     ? defaultTransactions.filter(transaction =>
//         transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
//       )
//     : defaultTransactions;


//   // Determine which transaction list to use for further filtering (in-process and processed):
//   const transactionsToFilter = filteredByRecipient;


//   const inProcessTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   const processedTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "processed"
//   );

//   const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//     if (!a.processedDate || !b.processedDate) return 0;
//     return new Date(b.processedDate).getTime() - new Date(a.processedDate).getTime();
//   });

//   const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//     sortedProcessedTransactions.reduce(
//       (groups: { [date: string]: Transaction[] }, transaction) => {
//         if (!transaction.processedDate) {
//           return groups;
//         }
//         const date = new Date(transaction.processedDate).toLocaleDateString('en-US', {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         if (!groups[date]) {
//           groups[date] = [];
//         }
//         groups[date].push(transaction);
//         return groups;
//       },
//       {}
//     );

//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             {/* Transaction Actions Component (Search, Filters, Download) */}
//             <TransactionActions
//               transactions={defaultTransactions}
//               onTransactionsChange={handleTransactionsChange}
//               onFiltersApply={handleFiltersApply}
//             />
//           </div>

//           <div className="space-y-10">
//             {/* In Progress Transactions Section */}
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-500 mb-6 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray-300 after:mt-1">In progress</h2>
//                 <div className="space-y-8">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description;
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Transaction History Section (Processed Transactions) */}
//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-500 mb-6 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray-300 after:mt-1">{date}</h3>
//                         <div className="space-y-8">
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description;
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                             }
//                             return (
//                               <div key={transaction.id} className="">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${
//                                         transaction.type === "Add Money"
//                                           ? "text-green-600"
//                                           : "text-main"
//                                       }`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* If no transactions of either type */}
//             {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;













// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions";
// import TransactionActions from "./TransactionActions";

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions); // Initialize with defaultTransactions
//   const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);

//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions); // Update filteredTransactions state
//   }, []);

//   const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[] }) => {
//     setAppliedRecipientFilters(filters.selectedRecipients);
//   }, []);

//   // Filter transactions based on applied recipient filters and already filtered transactions from search
//   const filteredByRecipientAndSearch = appliedRecipientFilters.length > 0
//     ? filteredTransactions.filter(transaction => // Use filteredTransactions here
//         transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
//       )
//     : filteredTransactions; // Use filteredTransactions here


//   // Determine which transaction list to use for further filtering (in-process and completed):
//   const transactionsToFilter = filteredByRecipientAndSearch;


//   const inProcessTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   const completedTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "completed"
//   );

//   const sortedCompletedTransactions = [...completedTransactions].sort((a, b) => {
//     if (!a.processedDate || !b.processedDate) return 0;
//     return new Date(b.processedDate).getTime() - new Date(a.processedDate).getTime();
//   });

//   const groupedCompletedTransactions: { [date: string]: Transaction[] } =
//     sortedCompletedTransactions.reduce(
//       (groups: { [date: string]: Transaction[] }, transaction) => {
//         if (!transaction.processedDate) {
//           return groups;
//         }
//         const date = new Date(transaction.processedDate).toLocaleDateString('en-US', {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         if (!groups[date]) {
//           groups[date] = [];
//         }
//         groups[date].push(transaction);
//         return groups;
//       },
//       {}
//     );

//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             {/* Transaction Actions Component (Search, Filters, Download) */}
//             <TransactionActions
//               transactions={defaultTransactions}
//               onTransactionsChange={handleTransactionsChange}
//               onFiltersApply={handleFiltersApply}
//             />
//           </div>

//           <div className="space-y-10">
//             {/* In Progress Transactions Section */}
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">In progress</h2>
//                 <div className="">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description;
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}  
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Transaction History Section (Processed Transactions) */}
//             {Object.entries(groupedCompletedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedCompletedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">{date}</h3>
//                         <div className="space-y-8">
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description;
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                             }
//                             return (
//                               <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${
//                                         transaction.type === "Add Money"
//                                           ? "text-green-600"
//                                           : "text-main"
//                                       }`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* If no transactions of either type */}
//             {inProcessTransactions.length === 0 && Object.entries(groupedCompletedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;







// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions";
// import TransactionActions from "./TransactionActions";

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions);
//   const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//   const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//   const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null); // New state for status filter

//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions);
//   }, []);

//   const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null }) => {
//     setAppliedRecipientFilters(filters.selectedRecipients);
//     setAppliedDirectionFilter(filters.selectedDirection || 'all');
//     setAppliedStatusFilter(filters.selectedStatus || null); // Set status filter
//   }, []);

//   const filteredByRecipientAndSearch = appliedRecipientFilters.length > 0
//     ? filteredTransactions.filter(transaction =>
//         transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
//       )
//     : filteredTransactions;


//   const transactionsToFilter = filteredByRecipientAndSearch;

//   const filteredByDirection = transactionsToFilter.filter(transaction => {
//     if (appliedDirectionFilter === 'all') {
//       return true;
//     } else if (appliedDirectionFilter === 'add') {
//       return transaction.type === 'Add Money';
//     } else if (appliedDirectionFilter === 'send') {
//       return transaction.type === 'Send Money';
//     }
//     return true;
//   });

//   const filteredByStatus = filteredByDirection.filter(transaction => {
//     if (appliedStatusFilter === null || appliedStatusFilter === undefined) {
//       return true; // No status filter applied, include all
//     } else if (appliedStatusFilter === 'Completed') {
//       return transaction.status === 'completed';
//     } else if (appliedStatusFilter === 'Cancelled') {
//       return transaction.status === 'cancelled';
//     } else if (appliedStatusFilter === 'In Process') {
//       return transaction.status === 'inProcess';
//     }
//     return true;
//   });


//   const inProcessTransactions = filteredByStatus.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   const completedTransactions = filteredByStatus.filter(
//     (transaction) => transaction.status === "completed"
//   );

//   const cancelledTransactions = filteredByStatus.filter(
//     (transaction) => transaction.status === "cancelled"
//   );

//   const processedTransactions = [...completedTransactions, ...cancelledTransactions];

//   const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//     let dateA = a.processedDate || a.date; // Use processedDate if available, otherwise date for sorting
//     let dateB = b.processedDate || b.date;
//     if (!dateA || !dateB) return 0;
//     return new Date(dateB).getTime() - new Date(dateA).getTime();
//   });


//   const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//   sortedProcessedTransactions.reduce(
//     (groups: { [date: string]: Transaction[] }, transaction) => {
//       const groupDate = transaction.processedDate || transaction.date; // Use processedDate if available, otherwise date for grouping
//       if (!groupDate) {
//         return groups;
//       }
//       const date = new Date(groupDate).toLocaleDateString('en-US', {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//       if (!groups[date]) {
//         groups[date] = [];
//       }
//       groups[date].push(transaction);
//       return groups;
//     },
//     {}
//   );


//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             <TransactionActions
//               transactions={defaultTransactions}
//               onTransactionsChange={handleTransactionsChange}
//               onFiltersApply={handleFiltersApply}
//             />
//           </div>

//           <div className="space-y-10">
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">In progress</h2>
//                 <div className="space-y-2">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description;
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                                 </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">{date}</h3>
//                         <div>
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description;
//                             let amountClass = "text-main";
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                               amountClass = "text-green-600";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                               amountClass = "text-main";
//                             }
//                             if (transaction.status === "cancelled") {
//                               description = "Cancelled";
//                               amountClass = "text-red-500 line-through"; // Indicate cancelled status visually
//                             }

//                             return (
//                               <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${amountClass}`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;











// // Latest Code Without Date Picker
// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions";
// import TransactionActions from "./TransactionActions";

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions);
//   const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//   const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//   const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//   const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]); // Updated to string[]

//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions);
//   }, []);

//   const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[] }) => {
//     setAppliedRecipientFilters(filters.selectedRecipients);
//     setAppliedDirectionFilter(filters.selectedDirection || 'all');
//     setAppliedStatusFilter(filters.selectedStatus || null);
//     setAppliedBalanceFilter(filters.selectedBalance || []); // Set balance filter, default to empty array
//   }, []);

//   const filteredByRecipientAndSearch = appliedRecipientFilters.length > 0
//     ? filteredTransactions.filter(transaction =>
//         transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
//       )
//     : filteredTransactions;


//   const transactionsToFilter = filteredByRecipientAndSearch;

//   const filteredByDirection = transactionsToFilter.filter(transaction => {
//     if (appliedDirectionFilter === 'all') {
//       return true;
//     } else if (appliedDirectionFilter === 'add') {
//       return transaction.type === 'Add Money';
//     } else if (appliedDirectionFilter === 'send') {
//       return transaction.type === 'Send Money';
//     }
//     return true;
//   });

//   const filteredByStatus = filteredByDirection.filter(transaction => {
//     if (appliedStatusFilter === null || appliedStatusFilter === undefined) {
//       return true; // No status filter applied, include all
//     } else if (appliedStatusFilter === 'Completed') {
//       return transaction.status === 'completed';
//     } else if (appliedStatusFilter === 'Cancelled') {
//       return transaction.status === 'cancelled';
//     } else if (appliedStatusFilter === 'In Process') {
//       return transaction.status === 'inProcess';
//     }
//     return true;
//   });

//   const filteredByBalance = filteredByStatus.filter(transaction => {
//     if (appliedBalanceFilter.length === 0) { // Check if the array is empty
//       return true; // No balance filter applied, include all
//     } else {
//       return appliedBalanceFilter.includes(transaction.currency); // Check if transaction currency is in the selected array
//     }
//   });


//   const inProcessTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   const completedTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "completed"
//   );

//   const cancelledTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "cancelled"
//   );

//   const processedTransactions = [...completedTransactions, ...cancelledTransactions];

//   const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//     let dateA = a.processedDate || a.date; // Use processedDate if available, otherwise date for sorting
//     let dateB = b.processedDate || b.date;
//     if (!dateA || !dateB) return 0;
//     return new Date(dateB).getTime() - new Date(dateA).getTime();
//   });


//   const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//   sortedProcessedTransactions.reduce(
//     (groups: { [date: string]: Transaction[] }, transaction) => {
//       const groupDate = transaction.processedDate || transaction.date; // Use processedDate if available, otherwise date for grouping
//       if (!groupDate) {
//         return groups;
//       }
//       const date = new Date(groupDate).toLocaleDateString('en-US', {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//       if (!groups[date]) {
//         groups[date] = [];
//       }
//       groups[date].push(transaction);
//       return groups;
//     },
//     {}
//   );


//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             <TransactionActions
//               transactions={defaultTransactions}
//               onTransactionsChange={handleTransactionsChange}
//               onFiltersApply={handleFiltersApply}
//             />
//           </div>

//           <div className="space-y-10">
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">In progress</h2>
//                 <div className="space-y-2">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description;
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                                 </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">{date}</h3>
//                         <div>
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description;
//                             let amountClass = "text-main";
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                               amountClass = "text-green-600";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                               amountClass = "text-main";
//                             }
//                             if (transaction.status === "cancelled") {
//                               description = "Cancelled";
//                               amountClass = "text-red-500 line-through"; // Indicate cancelled status visually
//                             }

//                             return (
//                               <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${amountClass}`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;






// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions";
// import TransactionActions from "./TransactionActions";

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions);
//   const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//   const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//   const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//   const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
//   const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
//   const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);

//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions);
//   }, []);

//   const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[], fromDate?: string, toDate?: string }) => {
//     setAppliedRecipientFilters(filters.selectedRecipients);
//     setAppliedDirectionFilter(filters.selectedDirection || 'all');
//     setAppliedStatusFilter(filters.selectedStatus || null);
//     setAppliedBalanceFilter(filters.selectedBalance || []);
//     setAppliedFromDateFilter(filters.fromDate);
//     setAppliedToDateFilter(filters.toDate);
//   }, []);

//   const filteredByRecipientAndSearch = appliedRecipientFilters.length > 0
//     ? filteredTransactions.filter(transaction =>
//       transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
//     )
//     : filteredTransactions;


//   const transactionsToFilter = filteredByRecipientAndSearch;

//   const filteredByDirection = transactionsToFilter.filter(transaction => {
//     if (appliedDirectionFilter === 'all') {
//       return true;
//     } else if (appliedDirectionFilter === 'add') {
//       return transaction.type === 'Add Money';
//     } else if (appliedDirectionFilter === 'send') {
//       return transaction.type === 'Send Money';
//     }
//     return true;
//   });

//   const filteredByStatus = filteredByDirection.filter(transaction => {
//     if (appliedStatusFilter === null || appliedStatusFilter === undefined) {
//       return true; // No status filter applied, include all
//     } else if (appliedStatusFilter === 'Completed') {
//       return transaction.status === 'completed';
//     } else if (appliedStatusFilter === 'Cancelled') {
//       return transaction.status === 'cancelled';
//     } else if (appliedStatusFilter === 'In Process') {
//       return transaction.status === 'inProcess';
//     }
//     return true;
//   });

//   const filteredByDate = filteredByStatus.filter(transaction => {
//     if (!appliedFromDateFilter && !appliedToDateFilter) {
//       return true; // No date filter applied
//     }

//     let transactionDate = transaction.processedDate || transaction.date;
//     if (!transactionDate) return false;

//     const transactionDateObj = new Date(transactionDate);
//     transactionDateObj.setHours(0, 0, 0, 0); // Set time to 00:00:00

//     let fromDateObj: Date | null = appliedFromDateFilter ? parseDateString(appliedFromDateFilter) : null;
//     if (fromDateObj) {
//       fromDateObj.setHours(0, 0, 0, 0); // Set time to 00:00:00
//     }
//     let toDateObj: Date | null = appliedToDateFilter ? parseDateString(appliedToDateFilter) : null;
//     if (toDateObj) {
//       toDateObj.setHours(23, 59, 59, 999); // Set time to 23:59:59 to include the whole To Date
//     }


//     if (fromDateObj && toDateObj) {
//       return transactionDateObj >= fromDateObj && transactionDateObj <= toDateObj;
//     } else if (fromDateObj) {
//       return transactionDateObj >= fromDateObj;
//     } else if (toDateObj) {
//       return transactionDateObj <= toDateObj;
//     }
//     return true;
//   });

//   function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//       const day = parseInt(parts[0], 10);
//       const month = parseInt(parts[1], 10) - 1;
//       const year = parseInt(parts[2], 10);
//       const date = new Date(year, month, day);
//       return date;
//     }
//     return null;
//   }


//   const filteredByBalance = filteredByDate.filter(transaction => {
//     if (appliedBalanceFilter.length === 0) { // Check if the array is empty
//       return true; // No balance filter applied, include all
//     } else {
//       return appliedBalanceFilter.includes(transaction.currency); // Check if transaction currency is in the selected array
//     }
//   });


//   const inProcessTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   const completedTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "completed"
//   );

//   const cancelledTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "cancelled"
//   );

//   const processedTransactions = [...completedTransactions, ...cancelledTransactions];

//   const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//     let dateA = a.processedDate || a.date; // Use processedDate if available, otherwise date for sorting
//     let dateB = b.processedDate || b.date;
//     if (!dateA || !dateB) return 0;
//     return new Date(dateB).getTime() - new Date(dateA).getTime();
//   });


//   const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//     sortedProcessedTransactions.reduce(
//       (groups: { [date: string]: Transaction[] }, transaction) => {
//         const groupDate = transaction.processedDate || transaction.date; // Use processedDate if available, otherwise date for grouping
//         if (!groupDate) {
//           return groups;
//         }
//         const date = new Date(groupDate).toLocaleDateString('en-US', {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         if (!groups[date]) {
//           groups[date] = [];
//         }
//         groups[date].push(transaction);
//         return groups;
//       },
//       {}
//     );


//   return (
//     <section className="Transaction-Page py-10">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             <TransactionActions
//               transactions={defaultTransactions}
//               onTransactionsChange={handleTransactionsChange}
//               onFiltersApply={handleFiltersApply}
//             />
//           </div>

//           <div className="space-y-10">
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">In progress</h2>
//                 <div className="space-y-2">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description;
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">{date}</h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description;
//                             let amountClass = "text-main";
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                               amountClass = "text-green-600";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                               amountClass = "text-main";
//                             }
//                             if (transaction.status === "cancelled") {
//                               description = "Cancelled";
//                               amountClass = "text-red-500 line-through"; // Indicate cancelled status visually
//                             }

//                             return (
//                               <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${amountClass}`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;


// // frontend/src/PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback, useEffect } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions";
// import { useAuth } from "../../../hooks/useAuth";
// import paymentService from "../../../services/payment";
// import transferService from "../../../services/transfer";
// import { Transaction } from "@/types/transaction"; // Import Transaction interface from types file
// import Link from 'next/link'; // Import Link from next/link

// const TransactionsPage: React.FC = () => {
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // State for all transactions
//     const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//     const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//     const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//     const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
//     const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
//     const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();

//     const fetchTransactions = useCallback(async () => {
//         if (!token) {
//             setError("Authentication token is missing.");
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         try {
//             const paymentsData = await paymentService.getUserPayments(token);
//             const transfersData = await transferService.getUserTransfers(token);

//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({
//                 _id: payment._id,
//                 type: "Add Money",
//                 amountToAdd: payment.amountToAdd,
//                 amountToPay: payment.amountToPay,
//                 balanceCurrency: payment.balanceCurrency,
//                 payInCurrency: payment.payInCurrency,
//                 createdAt: payment.createdAt,
//                 updatedAt: payment.updatedAt,
//                 status: payment.status,
//             }));

//             const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
//                 _id: transfer._id,
//                 type: "Send Money",
//                 name: (typeof transfer.recipient === 'object' && transfer.recipient !== null) ? transfer.recipient.accountHolderName : 'Recipient Name Unavailable',
//                 sendAmount: transfer.sendAmount,
//                 receiveAmount: transfer.receiveAmount,
//                 sendCurrency: transfer.sendCurrency,
//                 receiveCurrency: transfer.receiveCurrency,
//                 createdAt: transfer.createdAt,
//                 updatedAt: transfer.updatedAt,
//                 status: transfer.status,
//                 recipient: transfer.recipient
//             }));

//             const allTransactionsData = [...mappedPayments, ...mappedTransfers];
//             setAllTransactions(allTransactionsData); // Set all transactions state
//             setFilteredTransactions(allTransactionsData); // Initially show all transactions
//         } catch (err: any) {
//             setError(err.message || "Failed to fetch transactions.");
//             console.error("Transaction fetch error:", err);
//         } finally {
//             setLoading(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchTransactions();
//     }, [fetchTransactions]);

//     const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//         setFilteredTransactions(newTransactions);
//     }, []);

//     const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[], fromDate?: string, toDate?: string }) => {
//         setAppliedRecipientFilters(filters.selectedRecipients);
//         setAppliedDirectionFilter(filters.selectedDirection || 'all');
//         setAppliedStatusFilter(filters.selectedStatus || null);
//         setAppliedBalanceFilter(filters.selectedBalance || []);
//         setAppliedFromDateFilter(filters.fromDate);
//         setAppliedToDateFilter(filters.toDate);

//         // Apply filters to allTransactions to get filteredTransactions
//         let tempFilteredTransactions = [...allTransactions]; // Start with all transactions

//         // Direction Filter
//         tempFilteredTransactions = tempFilteredTransactions.filter(transaction => {
//             if (filters.selectedDirection === 'all') return true;
//             if (filters.selectedDirection === 'add') return transaction.type === 'Add Money';
//             if (filters.selectedDirection === 'send') return transaction.type === 'Send Money';
//             return true;
//         });

//         // Status Filter
//         tempFilteredTransactions = tempFilteredTransactions.filter(transaction => {
//             if (!filters.selectedStatus) return true;
//             if (filters.selectedStatus === 'Completed') return transaction.status === 'completed';
//             if (filters.selectedStatus === 'Cancelled') return transaction.status === 'canceled';
//             if (filters.selectedStatus === 'In Process') return transaction.status === 'in progress' || transaction.status === 'pending';
//             return true;
//         });

//         // Balance Filter
//         tempFilteredTransactions = tempFilteredTransactions.filter(transaction => {
//             if (filters.selectedBalance?.length === 0) return true;
//             if (transaction.type === 'Add Money' && transaction.balanceCurrency?.code) {
//                 return filters.selectedBalance?.includes(transaction.balanceCurrency.code);
//             } else if (transaction.type === 'Send Money' && transaction.sendCurrency?.code) {
//                 return filters.selectedBalance?.includes(transaction.sendCurrency.code);
//             }
//             return false;
//         });

//         // Recipient Filter - Assuming recipient filtering is only for "Send Money" transactions
//         if (filters.selectedRecipients && filters.selectedRecipients.length > 0) {
//             tempFilteredTransactions = tempFilteredTransactions.filter(transaction => {
//                 if (transaction.type === "Send Money" && typeof transaction.recipient === 'object' && transaction.recipient !== null) {
//                     return filters.selectedRecipients.includes(transaction.recipient._id);
//                 }
//                 return transaction.type !== "Send Money"; // Include "Add Money" transactions
//             });
//         }


//         // Date Filter
//         tempFilteredTransactions = tempFilteredTransactions.filter(transaction => {
//             if (!filters.fromDate && !filters.toDate) return true;

//             let transactionDate = transaction.updatedAt || transaction.createdAt;
//             if (!transactionDate) return false;
//             const transactionDateObj = new Date(transactionDate);

//             let fromDateObj: Date | null = filters.fromDate ? parseDateString(filters.fromDate) : null;
//             let toDateObj: Date | null = filters.toDate ? parseDateString(filters.toDate) : null;

//             if (fromDateObj && toDateObj) return transactionDateObj >= fromDateObj && transactionDateObj <= toDateObj;
//             if (fromDateObj) return transactionDateObj >= fromDateObj;
//             if (toDateObj) return transactionDateObj <= toDateObj;
//             return true;
//         });


//         setFilteredTransactions(tempFilteredTransactions); // Update filtered transactions with applied filters
//     }, [allTransactions]); // Dependency array -  allTransactions (crucial to refilter when allTransactions changes)


//     function parseDateString(dateString: string | undefined): Date | null {
//         if (!dateString) return null;
//         const parts = dateString.split('-');
//         if (parts.length === 3) {
//             const day = parseInt(parts[0], 10);
//             const month = parseInt(parts[1], 10) - 1;
//             const year = parseInt(parts[2], 10);
//             const date = new Date(year, month, day);
//             return date;
//         }
//         return null;
//     }


//     const inProcessTransactions = filteredTransactions.filter(
//         (transaction) => transaction.status === "in progress" || transaction.status === "pending"
//     );

//     const completedTransactions = filteredTransactions.filter(
//         (transaction) => transaction.status === "completed"
//     );

//     const cancelledTransactions = filteredTransactions.filter(
//         (transaction) => transaction.status === "canceled"
//     );

//     const processedTransactions = [...completedTransactions, ...cancelledTransactions];

//     const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//         let dateA = a.updatedAt || a.createdAt;
//         let dateB = b.updatedAt || b.createdAt;
//         if (!dateA || !dateB) return 0;
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//     });


//     const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//         sortedProcessedTransactions.reduce(
//             (groups: { [date: string]: Transaction[] }, transaction) => {
//                 const groupDate = transaction.updatedAt || transaction.createdAt;
//                 if (!groupDate) {
//                     return groups;
//                 }
//                 const date = new Date(groupDate).toLocaleDateString('en-US', {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                 });
//                 if (!groups[date]) {
//                     groups[date] = [];
//                 }
//                 groups[date].push(transaction);
//                 return groups;
//             },
//             {}
//         );


//     if (loading) {
//         return <div>Loading transactions...</div>;
//     }

//     if (error) {
//         return <div className="text-red-500">Error: {error}</div>;
//     }


//     return (
//         <section className="Transaction-Page py-10">
//             <div className="">
//                 <div className="container mx-auto">
//                     <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-4 mb-8">
//                         <h1 className="text-3xl font-semibold text-main">Transactions</h1>
//                         <TransactionActions
//                             transactions={allTransactions} // Pass allTransactions here for Search to work on full dataset
//                             onTransactionsChange={handleTransactionsChange}
//                             onFiltersApply={handleFiltersApply}
//                         />
//                     </div>

//                     <div className="space-y-10">
//                         {inProcessTransactions.length > 0 && (
//                             <div>
//                                 <h2 className="font-medium text-gray mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">In progress</h2>
//                                 <div className="space-y-2">
//                                     {inProcessTransactions.map((transaction) => {
//                                         let description = transaction.description;
//                                         let amount = 0;
//                                         let currencyCode = '';
//                                         if (transaction.type === "Add Money") {
//                                             description = "Waiting for your money";
//                                             amount = transaction.amountToAdd || 0;
//                                             currencyCode = transaction.balanceCurrency?.code || '';
//                                         } else if (transaction.type === "Send Money") {
//                                             description = "Sending your money";
//                                             amount = transaction.sendAmount || 0;
//                                             currencyCode = transaction.sendCurrency?.code || '';
//                                         }
//                                         return (
//                                             <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} > {/* Use Link component */}
//                                                 <div className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer"> {/* Add cursor-pointer for visual feedback */}
//                                                     <div className="flex items-center gap-4">
//                                                         <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                                                             {transaction.type === "Add Money" ? (
//                                                                 <LuPlus size={24} className="text-main" />
//                                                             ) : (
//                                                                 <GoArrowUp size={24} className="text-main" />
//                                                             )}
//                                                         </div>
//                                                         <div className="flex justify-between w-full">
//                                                             <div>
//                                                                 <h3 className="font-medium text-main">
//                                                                     {transaction.type === "Add Money"
//                                                                         ? `To your ${currencyCode} balance`
//                                                                         : transaction.name}
//                                                                 </h3>
//                                                                 <p className="text-sm text-gray-500">
//                                                                     {description}
//                                                                 </p>
//                                                             </div>
//                                                             <div className={`font-medium text-main`}>
//                                                                 {transaction.type === "Add Money" ? "+ " : "- "}
//                                                                 {amount.toLocaleString(undefined, {
//                                                                     minimumFractionDigits: 0,
//                                                                     maximumFractionDigits: 2,
//                                                                 })}{" "}
//                                                                 {currencyCode}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </Link>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         )}

//                         {Object.entries(groupedProcessedTransactions).length > 0 && (
//                             <div>
//                                 <div className="space-y-10">
//                                     {Object.entries(groupedProcessedTransactions).map(
//                                         ([date, transactionsForDate]) => (
//                                             <div key={date}>
//                                                 <h3 className="font-medium text-gray mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">{date}</h3>
//                                                 <div className="space-y-2">
//                                                     {transactionsForDate.map((transaction) => {
//                                                         let description = transaction.description;
//                                                         let amountClass = "text-main";
//                                                         let amount = 0;
//                                                         let currencyCode = '';
//                                                         if (transaction.type === "Add Money") {
//                                                             description = "Added by you";
//                                                             amountClass = "text-green-600";
//                                                             amount = transaction.amountToAdd || 0;
//                                                             currencyCode = transaction.balanceCurrency?.code || '';
//                                                         } else if (transaction.type === "Send Money") {
//                                                             description = "Sent by you";
//                                                             amountClass = "text-main";
//                                                             amount = transaction.sendAmount || 0;
//                                                             currencyCode = transaction.sendCurrency?.code || '';
//                                                         }
//                                                         if (transaction.status === "canceled") {
//                                                             description = "Cancelled";
//                                                             amountClass = "text-red-500 line-through";
//                                                         }

//                                                         return (
//                                                             <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} > {/* Use Link component */}
//                                                                 <div className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer"> {/* Add cursor-pointer for visual feedback */}
//                                                                     <div className="flex items-center gap-4">
//                                                                         <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
//                                                                             {transaction.type === "Add Money" ? (
//                                                                                 <LuPlus size={24} className="text-main" />
//                                                                             ) : (
//                                                                                 <GoArrowUp size={24} className="text-main" />
//                                                                             )}
//                                                                         </div>
//                                                                         <div className="flex justify-between w-full">
//                                                                             <div>
//                                                                                 <h3 className="font-medium text-main">
//                                                                                     {transaction.type === "Add Money"
//                                                                                         ? `To your ${currencyCode} balance`
//                                                                                         : transaction.name}
//                                                                                 </h3>
//                                                                                 <p className="text-sm text-gray-500">
//                                                                                     {description}
//                                                                                 </p>
//                                                                             </div>
//                                                                             <div
//                                                                                 className={`font-medium ${amountClass}`}
//                                                                             >
//                                                                                 {transaction.type === "Add Money" ? "+ " : "- "}
//                                                                                 {amount.toLocaleString(undefined, {
//                                                                                     minimumFractionDigits: 0,
//                                                                                     maximumFractionDigits: 2,
//                                                                                 })}{" "}
//                                                                                 {currencyCode}
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </Link>
//                                                         );
//                                                     })}
//                                                 </div>
//                                             </div>
//                                         )
//                                     )}
//                                 </div>
//                             </div>
//                         )}

//                         {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && !loading && !error && (
//                             <div className="text-center text-gray-500 py-8">
//                                 You don't have any transactions.
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TransactionsPage;


// frontend/src/PageSection/TransactionsPage.tsx
// Make sure this path is correct based on where you place this file.
// It seems like it should maybe be in 'frontend/app/dashboard/transactions/components/...' or similar.
// Adjust imports based on your actual file structure.

"use client"; // Essential for using hooks

import React, { useState, useCallback, useEffect, useMemo } from "react";
import Link from 'next/link';

// Icons
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";

// Components
import TransactionActions from "./TransactionActions"; // Adjust path if needed

// Hooks & Services
import { useAuth } from "../../../hooks/useAuth"; // Adjust path
import paymentService from "../../../services/payment"; // Adjust path
import transferService from "../../../services/transfer"; // Adjust path
import accountService from "../../../services/account"; // Adjust path

// Types
import { Transaction } from "@/types/transaction"; // Adjust path
import { Account } from "@/types/account"; // Adjust path

// Helper function to parse date strings (assuming "dd-MM-yyyy" format from filter)
function parseDateString(dateString: string | undefined): Date | null {
    if (!dateString) return null;
    // Try dd-MM-yyyy first
    const parts = dateString.split('-');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
             // Create date in UTC to avoid timezone issues if dates are meant to be timezone-agnostic
             // return new Date(Date.UTC(year, month, day));
             // Or keep it in local time if that's intended:
             return new Date(year, month, day);
        }
    }
     // Fallback for ISO strings (though filter uses dd-MM-yyyy)
     try {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return date;
        }
     } catch (e) {}

    console.warn("Could not parse date string:", dateString);
    return null;
}


const TransactionsPage: React.FC = () => {
    // --- State Declarations ---
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [userAccounts, setUserAccounts] = useState<Account[]>([]);

    // State to hold the currently applied filters (from the Filter component)
    // !! Ensure ALL these state declarations are present and correctly spelled !!
    const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
    const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
    const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
    const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
    const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
    const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);

    // Loading and Error states
    const [loadingTransactions, setLoadingTransactions] = useState(true); // Start loading initially
    const [loadingAccounts, setLoadingAccounts] = useState(true); // Start loading initially
    const [error, setError] = useState<string | null>(null);

    // Authentication context
    const { token } = useAuth();

    // --- Data Fetching ---
    const fetchData = useCallback(async () => {
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            setLoadingTransactions(false);
            setLoadingAccounts(false);
            return;
        }

        // Reset states before fetching
        setLoadingTransactions(true);
        setLoadingAccounts(true);
        setError(null);
        setAllTransactions([]);
        setFilteredTransactions([]);
        setUserAccounts([]);

        try {
            // Fetch transactions and accounts in parallel
            const [paymentsData, transfersData, accountsData] = await Promise.all([
                paymentService.getUserPayments(token),
                transferService.getUserTransfers(token),
                accountService.getUserAccounts(token)
            ]);

            // Process Transactions
            const mappedPayments: Transaction[] = paymentsData.map(payment => ({
                _id: payment._id,
                type: "Add Money",
                amountToAdd: payment.amountToAdd,
                amountToPay: payment.amountToPay,
                balanceCurrency: payment.balanceCurrency,
                payInCurrency: payment.payInCurrency,
                account: payment.account, // Keep account reference
                createdAt: payment.createdAt,
                updatedAt: payment.updatedAt,
                status: payment.status,
            }));

            const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
                _id: transfer._id,
                type: "Send Money",
                // Safely access recipient name
                name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
                      ? transfer.recipient.accountHolderName ?? 'Recipient' // Use nullish coalescing
                      : 'Recipient', // Default if recipient is just an ID or null
                sendAmount: transfer.sendAmount,
                receiveAmount: transfer.receiveAmount,
                sendCurrency: transfer.sendCurrency,
                receiveCurrency: transfer.receiveCurrency,
                createdAt: transfer.createdAt,
                updatedAt: transfer.updatedAt,
                status: transfer.status,
                recipient: transfer.recipient, // Keep recipient reference
                // Safely access source account ID
                sourceAccountId: typeof transfer.sourceAccount === 'string'
                                ? transfer.sourceAccount
                                : transfer.sourceAccount?._id, // Use optional chaining
            }));

            const combinedTransactions = [...mappedPayments, ...mappedTransfers];
            setAllTransactions(combinedTransactions);
            setFilteredTransactions(combinedTransactions); // Initialize filtered list with all
            setLoadingTransactions(false);

            // Process Accounts
            setUserAccounts(accountsData);
            setLoadingAccounts(false);

        } catch (err: any) {
            console.error("Data fetch error in TransactionsPage:", err);
            setError(err.message || "Failed to fetch data. Please try again.");
            setLoadingTransactions(false);
            setLoadingAccounts(false);
        }
    }, [token]); // Dependency: token

    // Effect to fetch data on mount or when token changes
    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData callback already depends on token


    // --- Callback from Search Component ---
    // This updates the list based *only* on search results. Filters need re-application.
    // Consider if Search should just provide a query and filtering happens here.
    // For now, keeping it as provided, but `handleFiltersApply` is the main filter logic.
    const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
         console.log("Search results received:", searchResults.length);
        // This sets the list based on search. If filters are also active, they might be lost.
        // A more integrated approach would combine search query and filters.
        // Let's assume for now search is separate, or filter overrides.
        setFilteredTransactions(searchResults);
         // To integrate: You would need to re-apply the *current* filters
         // (stored in applied... states) to these searchResults here.
    }, []); // No dependencies needed if it just sets state


    // --- Callback from Filter Component ---
    const handleFiltersApply = useCallback((filters: {
        selectedRecipients: (string | number)[],
        selectedDirection?: string,
        selectedStatus?: string | null,
        selectedBalance?: string[],
        fromDate?: string,
        toDate?: string
    }) => {
        console.log("Applying filters:", filters);

        // 1. Update the state variables tracking applied filters
        // !! Ensure these setters are defined via useState above !!
        setAppliedRecipientFilters(filters.selectedRecipients);
        setAppliedDirectionFilter(filters.selectedDirection || 'all');
        setAppliedStatusFilter(filters.selectedStatus || null);
        setAppliedBalanceFilter(filters.selectedBalance || []);
        setAppliedFromDateFilter(filters.fromDate);
        setAppliedToDateFilter(filters.toDate);

        // 2. Apply the filters to the *original* full list of transactions
        let tempFiltered = [...allTransactions];

        // Apply Direction Filter
        if (filters.selectedDirection && filters.selectedDirection !== 'all') {
            tempFiltered = tempFiltered.filter(tx =>
                (filters.selectedDirection === 'add' && tx.type === 'Add Money') ||
                (filters.selectedDirection === 'send' && tx.type === 'Send Money')
            );
        }

        // Apply Status Filter
        if (filters.selectedStatus) {
            tempFiltered = tempFiltered.filter(tx => {
                const status = tx.status?.toLowerCase(); // Normalize status
                if (filters.selectedStatus === 'Completed') return status === 'completed';
                if (filters.selectedStatus === 'Cancelled') return status === 'canceled'; // Ensure backend uses 'canceled'
                if (filters.selectedStatus === 'In Process') return status === 'in progress' || status === 'pending';
                if (filters.selectedStatus === 'Failed') return status === 'failed';
                return false; // If status doesn't match any category
            });
        }

        // Apply Balance Filter (checks relevant currency code)
        if (filters.selectedBalance && filters.selectedBalance.length > 0) {
            tempFiltered = tempFiltered.filter(tx => {
                let currencyCodeToCheck: string | undefined;
                if (tx.type === 'Add Money') {
                    currencyCodeToCheck = tx.balanceCurrency?.code;
                } else if (tx.type === 'Send Money') {
                    currencyCodeToCheck = tx.sendCurrency?.code;
                }
                return currencyCodeToCheck ? filters.selectedBalance?.includes(currencyCodeToCheck) : false;
            });
        }

        // Apply Recipient Filter
        if (filters.selectedRecipients && filters.selectedRecipients.length > 0) {
             tempFiltered = tempFiltered.filter(tx => {
                // Only filter 'Send Money' transactions that have a valid recipient ID
                if (tx.type === "Send Money" && typeof tx.recipient === 'object' && tx.recipient?._id) {
                     // Convert both to string for reliable comparison if mixing numbers/strings
                    return filters.selectedRecipients.map(String).includes(String(tx.recipient._id));
                }
                // Decide whether to include 'Add Money' or 'Send Money' without recipients
                // Option 1: Include them (return true)
                 return tx.type !== "Send Money" || !tx.recipient?._id;
                 // Option 2: Exclude them (return false if you only want sends to selected recipients)
                 // return false;
            });
        }


        // Apply Date Filter
        const fromDateObj = parseDateString(filters.fromDate);
        const toDateObj = parseDateString(filters.toDate);
        if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of day (local time)
        if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of day (local time)

        if (fromDateObj || toDateObj) {
            tempFiltered = tempFiltered.filter(tx => {
                const transactionDateStr = tx.updatedAt || tx.createdAt;
                if (!transactionDateStr) return false; // Cannot filter without a date
                try {
                    // Use new Date() for ISO strings from backend
                    const transactionDateObj = new Date(transactionDateStr);
                    if (isNaN(transactionDateObj.getTime())) return false; // Invalid date from backend

                    let include = true;
                    if (fromDateObj && transactionDateObj < fromDateObj) include = false;
                    if (toDateObj && transactionDateObj > toDateObj) include = false;
                    return include;
                } catch (e) {
                    console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
                    return false; // Exclude if date parsing fails
                }
            });
        }

        // 3. Update the state holding the transactions to be displayed
        setFilteredTransactions(tempFiltered);

    }, [allTransactions]); // Dependency: Re-run filter logic if the base list changes

    // --- Transaction Grouping Logic (Optimized with useMemo) ---
    const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
        const inProgress = filteredTransactions.filter(
            (tx) => tx.status === "in progress" || tx.status === "pending"
        );

        const processed = filteredTransactions.filter(
            (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "failed"
        );

        // Sort processed transactions by date (newest first)
        const sortedProcessed = [...processed].sort((a, b) => {
            const dateA = a.updatedAt || a.createdAt;
            const dateB = b.updatedAt || b.createdAt;
            if (!dateA || !dateB) return 0;
            try {
               return new Date(dateB).getTime() - new Date(dateA).getTime();
            } catch (e) { return 0; } // Handle potential invalid date strings
        });

        // Group sorted processed transactions by date string
        const grouped = sortedProcessed.reduce(
            (groups: { [date: string]: Transaction[] }, tx) => {
                const groupDate = tx.updatedAt || tx.createdAt;
                if (!groupDate) return groups;
                try {
                    // Use a consistent locale for date formatting
                    const dateKey = new Date(groupDate).toLocaleDateString('en-US', { // Example: 'en-GB' for dd/mm/yyyy
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });
                    if (!groups[dateKey]) groups[dateKey] = [];
                    groups[dateKey].push(tx);
                } catch (e) {
                    console.error("Error formatting date for grouping:", groupDate, e);
                }
                return groups;
            }, {}
        );

        return { inProgressTransactions: inProgress, groupedProcessedTransactions: grouped };
    }, [filteredTransactions]); // Recalculate only when filteredTransactions changes


    // --- Render Logic ---
    const isLoading = loadingTransactions || loadingAccounts;

    return (
        <section className="Transaction-Page py-8 md:py-10">
            <div className=""> {/* Consider removing this extra div if not needed for styling */}
                <div className="container mx-auto px-4"> {/* Add horizontal padding */}
                    {/* Header and Actions */}
                    <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-4 mb-8">
                        <h1 className="text-3xl font-semibold text-gray-800">Transactions</h1>
                        {/* Render Actions only when accounts are loaded (needed for Filter) */}
                        {!loadingAccounts && userAccounts && (
                             <TransactionActions
                                transactions={allTransactions} // Pass full list for Search potential
                                userAccounts={userAccounts} // Pass user accounts for Filter
                                onTransactionsChange={handleTransactionsChange} // For Search results (if implemented that way)
                                onFiltersApply={handleFiltersApply} // For Filter results
                            />
                        )}
                        {/* Optional: Show skeleton/placeholder while accounts load */}
                        {loadingAccounts && (
                            <div className="flex items-center gap-4 animate-pulse">
                                <div className="h-10 w-32 bg-gray-300 rounded-full"></div>
                                <div className="h-10 w-32 bg-gray-300 rounded-full"></div>
                            </div>
                        )}
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-10 text-gray-500">Loading transactions...</div>
                    )}

                    {/* Error State */}
                    {!isLoading && error && (
                        <div className="text-center py-10 text-red-600 bg-red-50 p-4 rounded-md">Error: {error}</div>
                    )}

                    {/* Transaction List & Empty States (only when not loading and no error) */}
                    {!isLoading && !error && (
                        <div className="space-y-10">
                            {/* In Progress Section */}
                            {inProgressTransactions.length > 0 && (
                                <div>
                                     <h2 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">In progress</h2>
                                    <div className="space-y-2">
                                        {inProgressTransactions.map((transaction) => {
                                            const isAddMoney = transaction.type === "Add Money";
                                            const icon = isAddMoney ? <LuPlus size={22} className="text-main" /> : <GoArrowUp size={22} className="text-main" />;
                                            const description = isAddMoney ? "Waiting for your money" : "Sending your money";
                                            const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
                                            const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
                                            const amountPrefix = isAddMoney ? "+ " : "- ";
                                            const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

                                            return (
                                                <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref>
                                                     <div className="block hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">{icon}</div>
                                                            <div className="flex-grow flex justify-between items-center">
                                                                <div>
                                                                    <h3 className="font-medium text-gray-800 text-sm md:text-base">{name}</h3>
                                                                    <p className="text-xs md:text-sm text-gray-500">{description}</p>
                                                                </div>
                                                                <div className={`font-medium text-gray-800 text-sm md:text-base whitespace-nowrap`}>
                                                                    {amountPrefix}
                                                                    {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                    {" "} {displayCurrencyCode}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Processed Sections (Grouped by Date) */}
                            {Object.entries(groupedProcessedTransactions).length > 0 && (
                                <div className="space-y-10">
                                    {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
                                        <div key={date}>
                                             <h3 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">{date}</h3>
                                            <div className="space-y-2">
                                                {transactionsForDate.map((transaction) => {
                                                    const isAddMoney = transaction.type === "Add Money";
                                                    const icon = isAddMoney ? <LuPlus size={22} className="text-main" /> : <GoArrowUp size={22} className="text-main" />;
                                                    let description = isAddMoney ? "Added by you" : `To ${transaction.name || 'Recipient'}`;
                                                    let amountClass = isAddMoney ? "text-green-600" : "text-gray-800";
                                                    const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
                                                    const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
                                                    const amountPrefix = isAddMoney ? "+ " : "- ";
                                                    const name = isAddMoney ? `From your bank/card` : (transaction.name || "Recipient"); // Updated name for clarity

                                                    if (transaction.status === "canceled") {
                                                        description = "Cancelled";
                                                        amountClass = "text-red-500 line-through";
                                                    } else if (transaction.status === "failed") {
                                                        description = "Failed";
                                                        amountClass = "text-red-500";
                                                    }

                                                    return (
                                                        <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref>
                                                             <div className="block hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">{icon}</div>
                                                                    <div className="flex-grow flex justify-between items-center">
                                                                        <div>
                                                                            <h3 className="font-medium text-gray-800 text-sm md:text-base">{name}</h3>
                                                                            <p className="text-xs md:text-sm text-gray-500">{description}</p>
                                                                        </div>
                                                                        <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap`}>
                                                                            {amountPrefix}
                                                                            {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                            {" "} {displayCurrencyCode}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Empty State (No transactions match or none exist) */}
                            {filteredTransactions.length === 0 && (
                                <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg mt-6">
                                    {allTransactions.length === 0
                                        ? "You haven't made any transactions yet."
                                        : "No transactions match your current filter or search criteria."
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </div> {/* End Container */}
            </div>
        </section>
    );
};

export default TransactionsPage;