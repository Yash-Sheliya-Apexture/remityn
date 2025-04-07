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

// "use client"; // Essential for using hooks

// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';

// // Icons
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// // Components
// import TransactionActions from "./TransactionActions"; // Adjust path if needed

// // Hooks & Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// import { Transaction } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path

// // Helper function to parse date strings (assuming "dd-MM-yyyy" format from filter)
// // Consider making this more robust or using a library if formats vary widely
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;

//     // Try dd-MM-yyyy first (adjust if filter format differs)
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//              // Use local time based on user's system if dates are local
//              return new Date(year, month, day);
//              // Or use UTC if dates should be timezone-agnostic:
//              // return new Date(Date.UTC(year, month, day));
//         }
//     }

//      // Fallback for ISO-like strings (e.g., from date pickers that output YYYY-MM-DD)
//      try {
//         const date = new Date(dateString);
//         // Check if the parsed date is valid
//         if (!isNaN(date.getTime())) {
//             return date;
//         }
//      } catch (e) {
//          console.warn("Could not parse date string with new Date():", dateString, e);
//      }

//     console.warn("Could not parse date string:", dateString);
//     return null;
// }


// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);

//     // State to hold the currently applied filters
//     const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//     const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//     const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//     const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
//     const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
//     const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);
//     // Optional: Add state for search query if search needs to be combined with filters more tightly
//     // const [searchQuery, setSearchQuery] = useState<string>('');

//     // Loading and Error states
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Authentication context
//     const { token } = useAuth();

//     // --- Data Fetching ---
//     const fetchData = useCallback(async () => {
//         if (!token) {
//             setError("Authentication token is missing. Please log in.");
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//             return;
//         }

//         setLoadingTransactions(true);
//         setLoadingAccounts(true);
//         setError(null);
//         // Reset data states to prevent stale data flashing
//         setAllTransactions([]);
//         setFilteredTransactions([]);
//         setUserAccounts([]);

//         try {
//             const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//                 accountService.getUserAccounts(token)
//             ]);

//             // Process Payments (Add Money)
//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({
//                 _id: payment._id,
//                 type: "Add Money",
//                 amountToAdd: payment.amountToAdd,
//                 amountToPay: payment.amountToPay,
//                 balanceCurrency: payment.balanceCurrency, // Assuming this is populated object with 'code'
//                 payInCurrency: payment.payInCurrency,     // Assuming this is populated object with 'code'
//                 account: payment.account,                 // Account ID or object
//                 createdAt: payment.createdAt,
//                 updatedAt: payment.updatedAt,
//                 status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
//                 // Add other relevant fields if needed
//             }));

//             // Process Transfers (Send Money)
//             const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
//                 _id: transfer._id,
//                 type: "Send Money",
//                 // Safely access recipient name
//                 name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                       ? transfer.recipient.accountHolderName ?? 'Recipient' // Use nullish coalescing
//                       : 'Recipient', // Default if recipient is just an ID or null/undefined
//                 sendAmount: transfer.sendAmount,
//                 receiveAmount: transfer.receiveAmount,
//                 sendCurrency: transfer.sendCurrency, // Assuming this is populated object with 'code'
//                 receiveCurrency: transfer.receiveCurrency, // Assuming this is populated object with 'code'
//                 createdAt: transfer.createdAt,
//                 updatedAt: transfer.updatedAt,
//                 status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
//                 recipient: transfer.recipient, // Keep full recipient reference (ID or object)
//                 // Safely access source account ID
//                 sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                 ? transfer.sourceAccount
//                                 : transfer.sourceAccount?._id, // Use optional chaining if sourceAccount can be object
//             }));

//             const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//             setAllTransactions(combinedTransactions);
//             setFilteredTransactions(combinedTransactions); // Initialize filtered list
//             setLoadingTransactions(false);

//             setUserAccounts(accountsData);
//             setLoadingAccounts(false);

//         } catch (err: any) {
//             console.error("Data fetch error in TransactionsPage:", err);
//             // Provide more specific error messages if possible from err.response?.data
//             setError(err.response?.data?.message || err.message || "Failed to fetch data. Please try again.");
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//         }
//     }, [token]); // Dependency: token

//     // Effect to fetch data on mount or when token changes
//     useEffect(() => {
//         fetchData();
//     }, [fetchData]); // fetchData includes token in its dependency array

//     // --- Callback from Search Component ---
//     // This function is called when the search component provides results.
//     // Currently, it REPLACES the filtered list. This means subsequent filter applications
//     // will start from the full list again. If you want search AND filters to apply
//     // simultaneously, the filtering logic needs to incorporate the search query.
//     const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
//          console.log("Applying search results:", searchResults.length);
//          setFilteredTransactions(searchResults);
//          // To apply filters *on top of* search results, you'd need to:
//          // 1. Store the search query in state.
//          // 2. Modify handleFiltersApply to filter *these* searchResults instead of allTransactions,
//          //    OR modify handleFiltersApply to *also* filter by the stored search query.
//     }, []);

//     // --- Callback from Filter Component ---
//     const handleFiltersApply = useCallback((filters: {
//         selectedRecipients: (string | number)[],
//         selectedDirection?: string,
//         selectedStatus?: string | null,
//         selectedBalance?: string[], // Currency codes
//         fromDate?: string,          // Date string "dd-MM-yyyy" (or format from picker)
//         toDate?: string            // Date string "dd-MM-yyyy" (or format from picker)
//     }) => {
//         console.log("Applying filters:", filters);

//         // 1. Update state tracking the applied filters
//         setAppliedRecipientFilters(filters.selectedRecipients || []);
//         setAppliedDirectionFilter(filters.selectedDirection || 'all');
//         setAppliedStatusFilter(filters.selectedStatus || null);
//         setAppliedBalanceFilter(filters.selectedBalance || []);
//         setAppliedFromDateFilter(filters.fromDate);
//         setAppliedToDateFilter(filters.toDate);
//         // Optional: If search is integrated, update search query state here too if passed

//         // 2. Start with the full list of transactions
//         let tempFiltered = [...allTransactions];

//         // --- Apply Filters Sequentially ---

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus;
//         if (statusFilter) {
//             const lowerCaseStatusFilter = statusFilter.toLowerCase();
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized to lowercase in mapping
//                 if (!txStatus) return false; // Should not happen if normalized

//                 // Map UI filter names to backend statuses (ensure these match your backend)
//                 if (lowerCaseStatusFilter === 'completed') return txStatus === 'completed';
//                 if (lowerCaseStatusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled'; // Allow both spellings
//                 if (lowerCaseStatusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                 if (lowerCaseStatusFilter === 'failed') return txStatus === 'failed';
//                 return false; // Unknown filter status
//             });
//         }

//         // Apply Balance (Currency) Filter
//         const balanceFilters = filters.selectedBalance;
//         if (balanceFilters && balanceFilters.length > 0) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 let currencyCodeToCheck: string | undefined;
//                 if (tx.type === 'Add Money') {
//                     // Check balanceCurrency if it exists and has a code
//                     currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null
//                         ? tx.balanceCurrency.code
//                         : undefined;
//                 } else if (tx.type === 'Send Money') {
//                     // Check sendCurrency if it exists and has a code
//                     currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null
//                         ? tx.sendCurrency.code
//                         : undefined;
//                 }
//                 // Ensure code exists and is included in the selected filters
//                 return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
//             });
//         }

//         // Apply Recipient Filter
//         const recipientFilters = filters.selectedRecipients;
//         if (recipientFilters && recipientFilters.length > 0) {
//              const recipientFilterIds = recipientFilters.map(String); // Ensure comparison as strings
//              tempFiltered = tempFiltered.filter(tx => {
//                 // Only apply to 'Send Money' transactions
//                 if (tx.type !== "Send Money") {
//                     return true; // Keep 'Add Money' transactions
//                 }
//                 // Check if the transaction's recipient ID matches any selected filter ID
//                 const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id)
//                                     ? String(tx.recipient._id)
//                                     : (typeof tx.recipient === 'string' ? tx.recipient : null); // Handle recipient being just an ID string

//                 return recipientId ? recipientFilterIds.includes(recipientId) : false; // Exclude if no valid recipient ID
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);

//         // Set time to ensure full day coverage
//         // Use UTC methods if dates are UTC, otherwise local time methods
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected day (local)
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected day (local)

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 // Prefer updatedAt, fallback to createdAt
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false; // Cannot filter without a date

//                 try {
//                     const transactionDateObj = new Date(transactionDateStr); // Assumes backend sends ISO 8601 format
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string:", transactionDateStr);
//                          return false; // Exclude if date is invalid
//                     }

//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) {
//                         include = false;
//                     }
//                     if (toDateObj && transactionDateObj > toDateObj) {
//                         include = false;
//                     }
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false; // Exclude on parsing error
//                 }
//             });
//         }

//         // 3. Update the state holding the transactions to be displayed
//         setFilteredTransactions(tempFiltered);

//     }, [allTransactions]); // Dependency: Re-run filter logic if the base list changes

//      // --- Transaction Grouping Logic (Optimized with useMemo) ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         const inProgress = filteredTransactions.filter(
//             (tx) => tx.status === "in progress" || tx.status === "pending"
//         );

//         const processed = filteredTransactions.filter(
//             (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
//         );

//         // Sort processed transactions by date (newest first)
//         const sortedProcessed = [...processed].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             // Handle cases where dates might be missing or invalid
//             if (!dateA && !dateB) return 0;
//             if (!dateA) return 1; // Put items without date at the end
//             if (!dateB) return -1; // Put items without date at the end
//             try {
//                // Compare timestamps for accuracy
//                return new Date(dateB).getTime() - new Date(dateA).getTime();
//             } catch (e) {
//                 console.error("Error comparing dates during sort:", dateA, dateB, e);
//                 return 0; // Maintain original order if comparison fails
//             }
//         });

//         // Group sorted processed transactions by date string
//         const grouped = sortedProcessed.reduce(
//             (groups: { [date: string]: Transaction[] }, tx) => {
//                 const groupDateStr = tx.updatedAt || tx.createdAt;
//                 if (!groupDateStr) {
//                     // Handle transactions without a date (group them under 'Unknown Date'?)
//                     const unknownDateKey = 'Unknown Date';
//                     if (!groups[unknownDateKey]) groups[unknownDateKey] = [];
//                     groups[unknownDateKey].push(tx);
//                     return groups;
//                 }
//                 try {
//                     // Use a consistent locale and format for grouping keys
//                     const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', { // Example: 'en-GB' for dd/mm/yyyy
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                     });
//                     if (!groups[dateKey]) groups[dateKey] = [];
//                     groups[dateKey].push(tx);
//                 } catch (e) {
//                     console.error("Error formatting date for grouping:", groupDateStr, e);
//                     // Optionally group errors under a specific key
//                     const errorKey = 'Date Error';
//                     if (!groups[errorKey]) groups[errorKey] = [];
//                     groups[errorKey].push(tx);
//                 }
//                 return groups;
//             }, {}
//         );

//         // Optionally sort the date keys if needed (e.g., newest date group first)
//         // const sortedGroupKeys = Object.keys(grouped).sort((a, b) => { /* complex date key sorting logic */ });

//         return { inProgressTransactions: inProgress, groupedProcessedTransactions: grouped };
//     }, [filteredTransactions]); // Recalculate only when filteredTransactions changes


//     // --- Render Logic ---
//     const isLoading = loadingTransactions || loadingAccounts;

//     return (
//         <section className="Transaction-Page py-8 md:py-10">
//              {/* Removed extra div wrapper here */}
//             <div className="container mx-auto px-4"> {/* Added container and padding */}
//                 {/* Header and Actions */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//                     <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Transactions</h1>
//                     {/* Render Actions only when accounts are loaded (needed for Filter/Search) */}
//                     {!loadingAccounts && userAccounts.length > 0 && (
//                          <TransactionActions
//                             transactions={allTransactions} // Pass full list for Search/Filter base
//                             userAccounts={userAccounts} // Pass accounts for filter options
//                             onTransactionsChange={handleTransactionsChange} // Callback for search results
//                             onFiltersApply={handleFiltersApply} // Callback for filter application
//                         />
//                     )}
//                     {/* Show skeleton/placeholder while accounts load */}
//                     {loadingAccounts && (
//                         <div className="flex items-center gap-4 animate-pulse">
//                             <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                             <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                         </div>
//                     )}
//                     {/* Optional: Handle case where accounts loaded but are empty */}
//                     {!loadingAccounts && userAccounts.length === 0 && !error && (
//                          <p className="text-sm text-gray-500">Create an account to start making transactions.</p>
//                     )}
//                 </div>

//                 {/* Loading State */}
//                 {isLoading && (
//                     <div className="text-center py-10 text-gray-500 dark:text-gray-400">Loading transactions...</div>
//                 )}

//                 {/* Error State */}
//                 {!isLoading && error && (
//                     <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
//                         <strong>Error:</strong> {error}
//                     </div>
//                 )}

//                 {/* Transaction List & Empty States (only when not loading and no error) */}
//                 {!isLoading && !error && (
//                     <div className="space-y-10">
//                         {/* In Progress Section */}
//                         {inProgressTransactions.length > 0 && (
//                             <div>
//                                  <h2 className="font-medium text-gray-600 dark:text-gray-400 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-gray-700 after:mt-1">In progress</h2>
//                                 <div className="space-y-2">
//                                     {inProgressTransactions.map((transaction) => {
//                                         const isAddMoney = transaction.type === "Add Money";
//                                         const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                                         const description = isAddMoney ? "Waiting for your money" : "Sending money";
//                                         const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                         // Display currency: For Add use balance currency, for Send use send currency
//                                         const displayCurrencyCode = isAddMoney
//                                             ? (typeof transaction.balanceCurrency === 'object' && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : '')
//                                             : (typeof transaction.sendCurrency === 'object' && transaction.sendCurrency?.code ? transaction.sendCurrency.code : '');
//                                         const amountPrefix = isAddMoney ? "+ " : "- ";
//                                         // Name: For Add show target balance, for Send show recipient name
//                                         const name = isAddMoney
//                                             ? `To your ${displayCurrencyCode} balance`
//                                             : (transaction.name || "Recipient");

//                                         return (
//                                             <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                                  <a className="block hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
//                                                     <div className="flex items-center gap-4">
//                                                         <div className="p-3 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm">{icon}</div>
//                                                         <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                                             <div>
//                                                                 <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base">{name}</h3>
//                                                                 <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description} <span className="italic">({transaction.status})</span></p>
//                                                             </div>
//                                                             <div className={`font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base whitespace-nowrap text-right sm:text-left`}>
//                                                                 {amountPrefix}
//                                                                 {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                                                 {" "} {displayCurrencyCode}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </Link>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Processed Sections (Grouped by Date) */}
//                         {Object.entries(groupedProcessedTransactions).length > 0 && (
//                             <div className="space-y-10">
//                                 {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
//                                     <div key={date}>
//                                          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-gray-700 after:mt-1">{date}</h3>
//                                         <div className="space-y-2">
//                                             {transactionsForDate.map((transaction) => {
//                                                 const isAddMoney = transaction.type === "Add Money";
//                                                 const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                                                 let description = isAddMoney ? "Added by you" : `To ${transaction.name || 'Recipient'}`;
//                                                 let amountClass = isAddMoney ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-100";
//                                                 const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                                 const displayCurrencyCode = isAddMoney
//                                                     ? (typeof transaction.balanceCurrency === 'object' && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : '')
//                                                     : (typeof transaction.sendCurrency === 'object' && transaction.sendCurrency?.code ? transaction.sendCurrency.code : '');
//                                                 const amountPrefix = isAddMoney ? "+ " : "- ";
//                                                 // Clarify name for Add Money
//                                                 const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                                                 // Adjust appearance based on final status
//                                                 if (transaction.status === "canceled" || transaction.status === "cancelled") {
//                                                     description = "Cancelled";
//                                                     amountClass = "text-red-500 dark:text-red-400 line-through";
//                                                 } else if (transaction.status === "failed") {
//                                                     description = "Failed";
//                                                     amountClass = "text-red-500 dark:text-red-400";
//                                                 } else if (transaction.status === "completed") {
//                                                      description = isAddMoney ? "Added" : `Sent to ${transaction.name || 'Recipient'}`;
//                                                 }

//                                                 return (
//                                                     <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                                          <a className="block hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
//                                                             <div className="flex items-center gap-4">
//                                                                 <div className="p-3 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm">{icon}</div>
//                                                                 <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                                                     <div>
//                                                                         <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base">{name}</h3>
//                                                                         <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
//                                                                     </div>
//                                                                     <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap text-right sm:text-left`}>
//                                                                         {amountPrefix}
//                                                                         {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                                                         {" "} {displayCurrencyCode}
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </a>
//                                                     </Link>
//                                                 );
//                                             })}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         {/* Empty State (No transactions match filters or none exist at all) */}
//                         {filteredTransactions.length === 0 && (
//                             <div className="text-center text-gray-500 dark:text-gray-400 py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg mt-6 border border-gray-200 dark:border-gray-700/50">
//                                 {allTransactions.length === 0
//                                     ? "You haven't made any transactions yet."
//                                     : "No transactions match your current filter or search criteria."
//                                 }
//                                 {/* Optional: Add a button to clear filters if filters are active */}
//                                 { (appliedRecipientFilters.length > 0 || appliedDirectionFilter !== 'all' || appliedStatusFilter || appliedBalanceFilter.length > 0 || appliedFromDateFilter || appliedToDateFilter) && allTransactions.length > 0 && (
//                                     <button
//                                         onClick={() => handleFiltersApply({ selectedRecipients: [], selectedDirection: 'all', selectedStatus: null, selectedBalance: [], fromDate: undefined, toDate: undefined })}
//                                         className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
//                                     >
//                                         Clear Filters
//                                     </button>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div> {/* End Container */}
//         </section>
//     );
// };

// export default TransactionsPage;



"use client"; // Essential for using hooks
import React, { useState, useCallback, useEffect, useMemo } from "react";
import Link from 'next/link';
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
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
// Consider making this more robust or using a library if formats vary widely
function parseDateString(dateString: string | undefined): Date | null {
    if (!dateString) return null;

    // Try dd-MM-yyyy first (adjust if filter format differs)
    const parts = dateString.split('-');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
             // Use local time based on user's system if dates are local
             return new Date(year, month, day);
             // Or use UTC if dates should be timezone-agnostic:
             // return new Date(Date.UTC(year, month, day));
        }
    }

     // Fallback for ISO-like strings (e.g., from date pickers that output YYYY-MM-DD)
     try {
        const date = new Date(dateString);
        // Check if the parsed date is valid
        if (!isNaN(date.getTime())) {
            return date;
        }
     } catch (e) {
         console.warn("Could not parse date string with new Date():", dateString, e);
     }

    console.warn("Could not parse date string:", dateString);
    return null;
}


const TransactionsPage: React.FC = () => {
    // --- State Declarations ---
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [userAccounts, setUserAccounts] = useState<Account[]>([]);

    // State to hold the currently applied filters
    const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
    const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
    const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
    const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
    const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
    const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);
    // Optional: Add state for search query if search needs to be combined with filters more tightly
    // const [searchQuery, setSearchQuery] = useState<string>('');

    // Loading and Error states
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [loadingAccounts, setLoadingAccounts] = useState(true);
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

        setLoadingTransactions(true);
        setLoadingAccounts(true);
        setError(null);
        // Reset data states to prevent stale data flashing
        setAllTransactions([]);
        setFilteredTransactions([]);
        setUserAccounts([]);

        try {
            const [paymentsData, transfersData, accountsData] = await Promise.all([
                paymentService.getUserPayments(token),
                transferService.getUserTransfers(token),
                accountService.getUserAccounts(token)
            ]);

            // Process Payments (Add Money)
            const mappedPayments: Transaction[] = paymentsData.map(payment => ({
                _id: payment._id,
                type: "Add Money",
                amountToAdd: payment.amountToAdd,
                amountToPay: payment.amountToPay,
                balanceCurrency: payment.balanceCurrency, // Assuming this is populated object with 'code'
                payInCurrency: payment.payInCurrency,     // Assuming this is populated object with 'code'
                account: payment.account,                 // Account ID or object
                createdAt: payment.createdAt,
                updatedAt: payment.updatedAt,
                status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
                // Add other relevant fields if needed
            }));

            // Process Transfers (Send Money)
            const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
                _id: transfer._id,
                type: "Send Money",
                // Safely access recipient name
                name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
                      ? transfer.recipient.accountHolderName ?? 'Recipient' // Use nullish coalescing
                      : 'Recipient', // Default if recipient is just an ID or null/undefined
                sendAmount: transfer.sendAmount,
                receiveAmount: transfer.receiveAmount,
                sendCurrency: transfer.sendCurrency, // Assuming this is populated object with 'code'
                receiveCurrency: transfer.receiveCurrency, // Assuming this is populated object with 'code'
                createdAt: transfer.createdAt,
                updatedAt: transfer.updatedAt,
                status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
                recipient: transfer.recipient, // Keep full recipient reference (ID or object)
                // Safely access source account ID
                sourceAccountId: typeof transfer.sourceAccount === 'string'
                                ? transfer.sourceAccount
                                : transfer.sourceAccount?._id, // Use optional chaining if sourceAccount can be object
            }));

            const combinedTransactions = [...mappedPayments, ...mappedTransfers];
            setAllTransactions(combinedTransactions);
            setFilteredTransactions(combinedTransactions); // Initialize filtered list
            setLoadingTransactions(false);

            setUserAccounts(accountsData);
            setLoadingAccounts(false);

        } catch (err: any) {
            console.error("Data fetch error in TransactionsPage:", err);
            // Provide more specific error messages if possible from err.response?.data
            setError(err.response?.data?.message || err.message || "Failed to fetch data. Please try again.");
            setLoadingTransactions(false);
            setLoadingAccounts(false);
        }
    }, [token]); // Dependency: token

    // Effect to fetch data on mount or when token changes
    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData includes token in its dependency array

    // --- Callback from Search Component ---
    // This function is called when the search component provides results.
    // Currently, it REPLACES the filtered list. This means subsequent filter applications
    // will start from the full list again. If you want search AND filters to apply
    // simultaneously, the filtering logic needs to incorporate the search query.
    const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
         console.log("Applying search results:", searchResults.length);
         setFilteredTransactions(searchResults);
         // To apply filters *on top of* search results, you'd need to:
         // 1. Store the search query in state.
         // 2. Modify handleFiltersApply to filter *these* searchResults instead of allTransactions,
         //    OR modify handleFiltersApply to *also* filter by the stored search query.
    }, []);

    // --- Callback from Filter Component ---
    const handleFiltersApply = useCallback((filters: {
        selectedRecipients: (string | number)[],
        selectedDirection?: string,
        selectedStatus?: string | null,
        selectedBalance?: string[], // Currency codes
        fromDate?: string,          // Date string "dd-MM-yyyy" (or format from picker)
        toDate?: string            // Date string "dd-MM-yyyy" (or format from picker)
    }) => {
        console.log("Applying filters:", filters);

        // 1. Update state tracking the applied filters
        setAppliedRecipientFilters(filters.selectedRecipients || []);
        setAppliedDirectionFilter(filters.selectedDirection || 'all');
        setAppliedStatusFilter(filters.selectedStatus || null);
        setAppliedBalanceFilter(filters.selectedBalance || []);
        setAppliedFromDateFilter(filters.fromDate);
        setAppliedToDateFilter(filters.toDate);
        // Optional: If search is integrated, update search query state here too if passed

        // 2. Start with the full list of transactions
        let tempFiltered = [...allTransactions];

        // --- Apply Filters Sequentially ---

        // Apply Direction Filter
        const direction = filters.selectedDirection;
        if (direction && direction !== 'all') {
            tempFiltered = tempFiltered.filter(tx =>
                (direction === 'add' && tx.type === 'Add Money') ||
                (direction === 'send' && tx.type === 'Send Money')
            );
        }

        // Apply Status Filter
        const statusFilter = filters.selectedStatus;
        if (statusFilter) {
            const lowerCaseStatusFilter = statusFilter.toLowerCase();
            tempFiltered = tempFiltered.filter(tx => {
                const txStatus = tx.status; // Already normalized to lowercase in mapping
                if (!txStatus) return false; // Should not happen if normalized

                // Map UI filter names to backend statuses (ensure these match your backend)
                if (lowerCaseStatusFilter === 'completed') return txStatus === 'completed';
                if (lowerCaseStatusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled'; // Allow both spellings
                if (lowerCaseStatusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
                if (lowerCaseStatusFilter === 'failed') return txStatus === 'failed';
                return false; // Unknown filter status
            });
        }

        // Apply Balance (Currency) Filter
        const balanceFilters = filters.selectedBalance;
        if (balanceFilters && balanceFilters.length > 0) {
            tempFiltered = tempFiltered.filter(tx => {
                let currencyCodeToCheck: string | undefined;
                if (tx.type === 'Add Money') {
                    // Check balanceCurrency if it exists and has a code
                    currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null
                        ? tx.balanceCurrency.code
                        : undefined;
                } else if (tx.type === 'Send Money') {
                    // Check sendCurrency if it exists and has a code
                    currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null
                        ? tx.sendCurrency.code
                        : undefined;
                }
                // Ensure code exists and is included in the selected filters
                return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
            });
        }

        // Apply Recipient Filter
        const recipientFilters = filters.selectedRecipients;
        if (recipientFilters && recipientFilters.length > 0) {
             const recipientFilterIds = recipientFilters.map(String); // Ensure comparison as strings
             tempFiltered = tempFiltered.filter(tx => {
                // Only apply to 'Send Money' transactions
                if (tx.type !== "Send Money") {
                    return true; // Keep 'Add Money' transactions
                }
                // Check if the transaction's recipient ID matches any selected filter ID
                const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id)
                                    ? String(tx.recipient._id)
                                    : (typeof tx.recipient === 'string' ? tx.recipient : null); // Handle recipient being just an ID string

                return recipientId ? recipientFilterIds.includes(recipientId) : false; // Exclude if no valid recipient ID
            });
        }

        // Apply Date Filter
        const fromDateObj = parseDateString(filters.fromDate);
        const toDateObj = parseDateString(filters.toDate);

        // Set time to ensure full day coverage
        // Use UTC methods if dates are UTC, otherwise local time methods
        if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected day (local)
        if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected day (local)

        if (fromDateObj || toDateObj) {
            tempFiltered = tempFiltered.filter(tx => {
                // Prefer updatedAt, fallback to createdAt
                const transactionDateStr = tx.updatedAt || tx.createdAt;
                if (!transactionDateStr) return false; // Cannot filter without a date

                try {
                    const transactionDateObj = new Date(transactionDateStr); // Assumes backend sends ISO 8601 format
                    if (isNaN(transactionDateObj.getTime())) {
                         console.warn("Invalid transaction date string:", transactionDateStr);
                         return false; // Exclude if date is invalid
                    }

                    let include = true;
                    if (fromDateObj && transactionDateObj < fromDateObj) {
                        include = false;
                    }
                    if (toDateObj && transactionDateObj > toDateObj) {
                        include = false;
                    }
                    return include;
                } catch (e) {
                    console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
                    return false; // Exclude on parsing error
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
            (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
        );

        // Sort processed transactions by date (newest first)
        const sortedProcessed = [...processed].sort((a, b) => {
            const dateA = a.updatedAt || a.createdAt;
            const dateB = b.updatedAt || b.createdAt;
            // Handle cases where dates might be missing or invalid
            if (!dateA && !dateB) return 0;
            if (!dateA) return 1; // Put items without date at the end
            if (!dateB) return -1; // Put items without date at the end
            try {
               // Compare timestamps for accuracy
               return new Date(dateB).getTime() - new Date(dateA).getTime();
            } catch (e) {
                console.error("Error comparing dates during sort:", dateA, dateB, e);
                return 0; // Maintain original order if comparison fails
            }
        });

        // Group sorted processed transactions by date string
        const grouped = sortedProcessed.reduce(
            (groups: { [date: string]: Transaction[] }, tx) => {
                const groupDateStr = tx.updatedAt || tx.createdAt;
                if (!groupDateStr) {
                    // Handle transactions without a date (group them under 'Unknown Date'?)
                    const unknownDateKey = 'Unknown Date';
                    if (!groups[unknownDateKey]) groups[unknownDateKey] = [];
                    groups[unknownDateKey].push(tx);
                    return groups;
                }
                try {
                    // Use a consistent locale and format for grouping keys
                    const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', { // Example: 'en-GB' for dd/mm/yyyy
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });
                    if (!groups[dateKey]) groups[dateKey] = [];
                    groups[dateKey].push(tx);
                } catch (e) {
                    console.error("Error formatting date for grouping:", groupDateStr, e);
                    // Optionally group errors under a specific key
                    const errorKey = 'Date Error';
                    if (!groups[errorKey]) groups[errorKey] = [];
                    groups[errorKey].push(tx);
                }
                return groups;
            }, {}
        );

        // Optionally sort the date keys if needed (e.g., newest date group first)
        // const sortedGroupKeys = Object.keys(grouped).sort((a, b) => { /* complex date key sorting logic */ });

        return { inProgressTransactions: inProgress, groupedProcessedTransactions: grouped };
    }, [filteredTransactions]); // Recalculate only when filteredTransactions changes


    // --- Render Logic ---
    const isLoading = loadingTransactions || loadingAccounts;

    return (
        <section className="Transaction-Page pb-8 md:pb-10">
             {/* Removed extra div wrapper here */}
            <div className="container mx-auto"> {/* Added container and padding */}
                {/* Header and Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 sticky top-0 z-10 mb-6 bg-white dark:bg-background">
                    <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Transactions</h1>
                    {/* Render Actions only when accounts are loaded (needed for Filter/Search) */}
                    {!loadingAccounts && userAccounts.length > 0 && (
                         <TransactionActions
                            transactions={allTransactions} // Pass full list for Search/Filter base
                            userAccounts={userAccounts} // Pass accounts for filter options
                            onTransactionsChange={handleTransactionsChange} // Callback for search results
                            onFiltersApply={handleFiltersApply} // Callback for filter application
                        />
                    )}
                    {/* Show skeleton/placeholder while accounts load */}
                    {loadingAccounts && (
                        <div className="flex items-center gap-4 animate-pulse">
                            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        </div>
                    )}
                    {/* Optional: Handle case where accounts loaded but are empty */}
                    {!loadingAccounts && userAccounts.length === 0 && !error && (
                         <p className="text-sm text-gray-500">Create an account to start making transactions.</p>
                    )}
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">Loading transactions...</div>
                )}

                {/* Error State */}
                {!isLoading && error && (
                    <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Transaction List & Empty States (only when not loading and no error) */}
                {!isLoading && !error && (
                    <div className="space-y-4">
                        {/* In Progress Section */}
                        {inProgressTransactions.length > 0 && (
                            <div>
                                 <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">In progress</h3>
                                <div className="space-y-2">
                                    {inProgressTransactions.map((transaction) => {
                                        const isAddMoney = transaction.type === "Add Money";
                                        const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
                                        const description = isAddMoney ? "Waiting for your money" : "Sending money";
                                        const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
                                        // Display currency: For Add use balance currency, for Send use send currency
                                        const displayCurrencyCode = isAddMoney
                                            ? (typeof transaction.balanceCurrency === 'object' && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : '')
                                            : (typeof transaction.sendCurrency === 'object' && transaction.sendCurrency?.code ? transaction.sendCurrency.code : '');
                                        const amountPrefix = isAddMoney ? "+ " : "- ";
                                        // Name: For Add show target balance, for Send show recipient name
                                        const name = isAddMoney
                                            ? `To your ${displayCurrencyCode} balance`
                                            : (transaction.name || "Recipient");

                                        return (
                                            <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
                                                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">{icon}</div>
                                                        <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
                                                            <div className=" text-wrap">
                                                                <h3 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">{name}</h3>
                                                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">{description} <span className="italic">({transaction.status})</span></p>
                                                            </div>
                                                            <div className={`font-medium text-neutral-900 dark:text-white text-sm md:text-base whitespace-nowrap text-right sm:text-left`}>
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
                            <div className="space-y-4">
                                {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
                                    <div key={date}>
                                         <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">{date}</h3>
                                        <div className="space-y-2">
                                            {transactionsForDate.map((transaction) => {
                                                const isAddMoney = transaction.type === "Add Money";
                                                const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
                                                let description = isAddMoney ? "Added by you" : `To ${transaction.name || 'Recipient'}`;
                                                let amountClass = isAddMoney ? "text-green-600 dark:text-green-500" : "text-neutral-900  dark:text-white";
                                                const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
                                                const displayCurrencyCode = isAddMoney
                                                    ? (typeof transaction.balanceCurrency === 'object' && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : '')
                                                    : (typeof transaction.sendCurrency === 'object' && transaction.sendCurrency?.code ? transaction.sendCurrency.code : '');
                                                const amountPrefix = isAddMoney ? "+ " : "- ";
                                                // Clarify name for Add Money
                                                const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

                                                // Adjust appearance based on final status
                                                if (transaction.status === "canceled" || transaction.status === "cancelled") {
                                                    description = "Cancelled";
                                                    amountClass = "text-red-600 line-through";
                                                } else if (transaction.status === "failed") {
                                                    description = "Failed";
                                                    amountClass = "text-red-600 line-through";
                                                } else if (transaction.status === "completed") {
                                                     description = isAddMoney ? "Added" : `Sent to ${transaction.name || 'Recipient'}`;
                                                }

                                                return (
                                                    <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
                                                         <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                                                            <div className="flex items-center gap-4">
                                                                <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">{icon}</div>
                                                                <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
                                                                    <div className=" text-wrap">
                                                                        <h3 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">{name}</h3>
                                                                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">{description}</p>
                                                                    </div>
                                                                    <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap text-right sm:text-left`}>
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

                        {/* Empty State (No transactions match filters or none exist at all) */}
                        {filteredTransactions.length === 0 && (
                            <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 py-12 dark:bg-white/5 rounded-lg mt-6">
                                {allTransactions.length === 0
                                    ? "You haven't made any transactions yet."
                                    : "No transactions match your current filter or search criteria."
                                }
                                {/* Optional: Add a button to clear filters if filters are active */}
                                { (appliedRecipientFilters.length > 0 || appliedDirectionFilter !== 'all' || appliedStatusFilter || appliedBalanceFilter.length > 0 || appliedFromDateFilter || appliedToDateFilter) && allTransactions.length > 0 && (
                                    <div className="flex justify-center ">
                                    <button
                                        onClick={() => handleFiltersApply({ selectedRecipients: [], selectedDirection: 'all', selectedStatus: null, selectedBalance: [], fromDate: undefined, toDate: undefined })}
                                        className="mt-4 px-6 cursor-pointer py-3 w-38 bg-primary text-mainheading rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
                                    >
                                        Clear Filters
                                    </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TransactionsPage;