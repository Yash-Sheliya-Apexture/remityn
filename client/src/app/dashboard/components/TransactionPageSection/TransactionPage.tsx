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



// "use client"; // Essential for using hooks
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions"; // Adjust path if needed

// // Hooks & Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// import { Transaction } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";

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
//       <section className="Transaction-Page pb-8 md:pb-10">
//         {/* Removed extra div wrapper here */}
//         <div className="container mx-auto">
//           {" "}
//           {/* Added container and padding */}
//           {/* Header and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Transactions
//             </h1>
//             {/* Render Actions only when accounts are loaded (needed for Filter/Search) */}
//             {!loadingAccounts && userAccounts.length > 0 && (
//               <TransactionActions
//                 transactions={allTransactions} // Pass full list for Search/Filter base
//                 userAccounts={userAccounts} // Pass accounts for filter options
//                 onTransactionsChange={handleTransactionsChange} // Callback for search results
//                 onFiltersApply={handleFiltersApply} // Callback for filter application
//               />
//             )}
//             {/* Show skeleton/placeholder while accounts load */}
//             {loadingAccounts && (
//               <div className="flex items-center gap-4 animate-pulse">
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//               </div>
//             )}
//             {/* Optional: Handle case where accounts loaded but are empty */}
//             {!loadingAccounts && userAccounts.length === 0 && !error && (
//               <p className="text-sm text-gray-500">
//                 Create an account to start making transactions.
//               </p>
//             )}
//           </div>
//           {/* Loading State */}
//           {isLoading && (
//             <div className="space-y-2">
//               {Array(8)
//                 .fill(0)
//                 .map((_, index) => (
//                   <div key={index} className="block">
//                     <div className="block p-2 sm:p-4 rounded-2xl">
//                       <div className="flex items-center gap-4">
//                         {/* Icon Skeleton */}
//                         <div className="relative flex-shrink-0">
//                           <div className="flex items-center justify-center">
//                             <Skeleton className="h-12 w-12 rounded-full" />
//                           </div>
//                         </div>
//                         {/* Text and Button Skeletons */}
//                         <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                           <div className="flex-grow">
//                             <Skeleton className="h-4 w-40 mb-2" />
//                             <Skeleton className="h-3 w-32" />
//                           </div>
//                           <div className="shrink-0">
//                             <Skeleton className="h-5 w-20 rounded-full" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//           {/* Error State */}
//           {!isLoading && error && (
//             <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
//               <strong>Error:</strong> {error}
//             </div>
//           )}
//           {/* Transaction List & Empty States (only when not loading and no error) */}
//           {!isLoading && !error && (
//             <div className="space-y-4">
//               {/* In Progress Section */}
//               {inProgressTransactions.length > 0 && (
//                 <div>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                     In progress
//                   </h3>
//                   <div className="space-y-2">
//                     {inProgressTransactions.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? (
//                         <LuPlus
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       ) : (
//                         <GoArrowUp
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       );
//                       const description = isAddMoney
//                         ? "Waiting for your money"
//                         : "Sending money";
//                       const amount = isAddMoney
//                         ? transaction.amountToAdd ?? 0
//                         : transaction.sendAmount ?? 0;
//                       // Display currency: For Add use balance currency, for Send use send currency
//                       const displayCurrencyCode = isAddMoney
//                         ? typeof transaction.balanceCurrency === "object" &&
//                           transaction.balanceCurrency?.code
//                           ? transaction.balanceCurrency.code
//                           : ""
//                         : typeof transaction.sendCurrency === "object" &&
//                           transaction.sendCurrency?.code
//                         ? transaction.sendCurrency.code
//                         : "";
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       // Name: For Add show target balance, for Send show recipient name
//                       const name = isAddMoney
//                         ? `To your ${displayCurrencyCode} balance`
//                         : transaction.name || "Recipient";

//                       return (
//                         <Link
//                           href={`/dashboard/transactions/${transaction._id}`}
//                           key={transaction._id}
//                           className="block"
//                         >
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center gap-4">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                                 {icon}
//                               </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className=" text-wrap">
//                                   <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                     {name}
//                                   </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                     {description}{" "}
//                                     <span className="italic">
//                                       ({transaction.status})
//                                     </span>
//                                   </p>
//                                 </div>
//                                 <div
//                                   className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                                 >
//                                   {amountPrefix}
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}{" "}
//                                   {displayCurrencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Processed Sections (Grouped by Date) */}
//               {Object.entries(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-4">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                           {date}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             const isAddMoney = transaction.type === "Add Money";
//                             const icon = isAddMoney ? (
//                               <LuPlus
//                                 size={22}
//                                 className="text-neutral-900 dark:text-white"
//                               />
//                             ) : (
//                               <GoArrowUp
//                                 size={22}
//                                 className="text-neutral-900 dark:text-white"
//                               />
//                             );
//                             let description = isAddMoney
//                               ? "Added by you"
//                               : `To ${transaction.name || "Recipient"}`;
//                             let amountClass = isAddMoney
//                               ? "text-green-600 dark:text-green-500"
//                               : "text-neutral-900  dark:text-white";
//                             const amount = isAddMoney
//                               ? transaction.amountToAdd ?? 0
//                               : transaction.sendAmount ?? 0;
//                             const displayCurrencyCode = isAddMoney
//                               ? typeof transaction.balanceCurrency ===
//                                   "object" && transaction.balanceCurrency?.code
//                                 ? transaction.balanceCurrency.code
//                                 : ""
//                               : typeof transaction.sendCurrency === "object" &&
//                                 transaction.sendCurrency?.code
//                               ? transaction.sendCurrency.code
//                               : "";
//                             const amountPrefix = isAddMoney ? "+ " : "- ";
//                             // Clarify name for Add Money
//                             const name = isAddMoney
//                               ? `Added to ${displayCurrencyCode} balance`
//                               : transaction.name || "Recipient";

//                             // Adjust appearance based on final status
//                             if (
//                               transaction.status === "canceled" ||
//                               transaction.status === "cancelled"
//                             ) {
//                               description = "Cancelled";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "failed") {
//                               description = "Failed";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "completed") {
//                               description = isAddMoney
//                                 ? "Added"
//                                 : `Sent to ${transaction.name || "Recipient"}`;
//                             }

//                             return (
//                               <Link
//                                 href={`/dashboard/transactions/${transaction._id}`}
//                                 key={transaction._id}
//                                 className="block"
//                               >
//                                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                   <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                                       {icon}
//                                     </div>
//                                     <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                       <div className=" text-wrap">
//                                         <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                           {name}
//                                         </h3>
//                                         <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                           {description}
//                                         </p>
//                                       </div>
//                                       <div
//                                         className={`font-medium ${amountClass} whitespace-nowrap`}
//                                       >
//                                         {amountPrefix}
//                                         {amount.toLocaleString(undefined, {
//                                           minimumFractionDigits: 2,
//                                           maximumFractionDigits: 2,
//                                         })}{" "}
//                                         {displayCurrencyCode}
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
//               )}

//               {/* Empty State (No transactions match filters or none exist at all) */}
//               {filteredTransactions.length === 0 && (
//                 <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 py-12 dark:bg-white/5 rounded-lg mt-6">
//                   {allTransactions.length === 0
//                     ? "You haven't made any transactions yet."
//                     : "No transactions match your current filter or search criteria."}
//                   {/* Optional: Add a button to clear filters if filters are active */}
//                   {(appliedRecipientFilters.length > 0 ||
//                     appliedDirectionFilter !== "all" ||
//                     appliedStatusFilter ||
//                     appliedBalanceFilter.length > 0 ||
//                     appliedFromDateFilter ||
//                     appliedToDateFilter) &&
//                     allTransactions.length > 0 && (
//                       <div className="flex justify-center ">
//                         <button
//                           onClick={() =>
//                             handleFiltersApply({
//                               selectedRecipients: [],
//                               selectedDirection: "all",
//                               selectedStatus: null,
//                               selectedBalance: [],
//                               fromDate: undefined,
//                               toDate: undefined,
//                             })
//                           }
//                           className="mt-4 px-6 cursor-pointer py-3 w-38 bg-primary text-mainheading rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                         >
//                           Clear Filters
//                         </button>
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     );
// };

// export default TransactionsPage;




// "use client"; // Essential for using hooks
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions"; // Adjust path if needed

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// import { Transaction } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";

// // Define a type for potential API errors that might have a response structure
// // Adjust this based on the actual structure of errors from your services (e.g., Axios)
// interface ApiError extends Error {
//     response?: {
//         data?: {
//             message?: string;
//             // other potential properties from error response body
//         };
//         status?: number;
//         // other potential response properties
//     };
// }


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

//         } catch (err: unknown) { // <-- FIX: Changed 'any' to 'unknown' for better type safety
//             console.error("Data fetch error in TransactionsPage:", err);

//             let errorMessage = "Failed to fetch data. Please try again."; // Default message

//             // Check if it's a standard Error object
//             if (err instanceof Error) {
//                 errorMessage = err.message; // Use the standard error message first

//                 // Check if it resembles our defined ApiError structure (or a typical Axios error)
//                 // You might need to adjust these checks based on your actual error structure
//                 const apiError = err as ApiError; // Use type assertion carefully
//                 if (apiError.response?.data?.message) {
//                     errorMessage = apiError.response.data.message; // Use the more specific backend message
//                 }
//             } else if (typeof err === 'string') {
//                 // Handle cases where a string might be thrown (less common)
//                 errorMessage = err;
//             }
//             // If err is not an Error object (e.g., null, undefined, primitive), the default message remains

//             setError(errorMessage);
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
//       <section className="Transaction-Page pb-8 md:pb-10">
//         {/* Removed extra div wrapper here */}
//         <div className="container mx-auto">
//           {" "}
//           {/* Added container and padding */}
//           {/* Header and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Transactions
//             </h1>
//             {/* Render Actions only when accounts are loaded (needed for Filter/Search) */}
//             {!loadingAccounts && userAccounts.length > 0 && (
//               <TransactionActions
//                 transactions={allTransactions} // Pass full list for Search/Filter base
//                 userAccounts={userAccounts} // Pass accounts for filter options
//                 onTransactionsChange={handleTransactionsChange} // Callback for search results
//                 onFiltersApply={handleFiltersApply} // Callback for filter application
//               />
//             )}
//             {/* Show skeleton/placeholder while accounts load */}
//             {loadingAccounts && (
//               <div className="flex items-center gap-4 animate-pulse">
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//               </div>
//             )}
//             {/* Optional: Handle case where accounts loaded but are empty */}
//             {!loadingAccounts && userAccounts.length === 0 && !error && (
//               <p className="text-sm text-gray-500">
//                 Create an account to start making transactions.
//               </p>
//             )}
//           </div>
//           {/* Loading State */}
//           {isLoading && (
//             <div className="space-y-2">
//               {Array(8)
//                 .fill(0)
//                 .map((_, index) => (
//                   <div key={index} className="block">
//                     <div className="block p-2 sm:p-4 rounded-2xl">
//                       <div className="flex items-center gap-4">
//                         {/* Icon Skeleton */}
//                         <div className="relative flex-shrink-0">
//                           <div className="flex items-center justify-center">
//                             <Skeleton className="h-12 w-12 rounded-full" />
//                           </div>
//                         </div>
//                         {/* Text and Button Skeletons */}
//                         <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                           <div className="flex-grow">
//                             <Skeleton className="h-4 w-40 mb-2" />
//                             <Skeleton className="h-3 w-32" />
//                           </div>
//                           <div className="shrink-0">
//                             <Skeleton className="h-5 w-20 rounded-full" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//           {/* Error State */}
//           {!isLoading && error && (
//             <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
//               <strong>Error:</strong> {error}
//             </div>
//           )}
//           {/* Transaction List & Empty States (only when not loading and no error) */}
//           {!isLoading && !error && (
//             <div className="space-y-4">
//               {/* In Progress Section */}
//               {inProgressTransactions.length > 0 && (
//                 <div>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                     In progress
//                   </h3>
//                   <div className="space-y-2">
//                     {inProgressTransactions.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? (
//                         <LuPlus
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       ) : (
//                         <GoArrowUp
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       );
//                       const description = isAddMoney
//                         ? "Waiting for your money"
//                         : "Sending money";
//                       const amount = isAddMoney
//                         ? transaction.amountToAdd ?? 0
//                         : transaction.sendAmount ?? 0;
//                       // Display currency: For Add use balance currency, for Send use send currency
//                       const displayCurrencyCode = isAddMoney
//                         ? typeof transaction.balanceCurrency === "object" &&
//                           transaction.balanceCurrency?.code
//                           ? transaction.balanceCurrency.code
//                           : ""
//                         : typeof transaction.sendCurrency === "object" &&
//                           transaction.sendCurrency?.code
//                         ? transaction.sendCurrency.code
//                         : "";
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       // Name: For Add show target balance, for Send show recipient name
//                       const name = isAddMoney
//                         ? `To your ${displayCurrencyCode} balance`
//                         : transaction.name || "Recipient";

//                       return (
//                         <Link
//                           href={`/dashboard/transactions/${transaction._id}`}
//                           key={transaction._id}
//                           className="block"
//                         >
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center gap-4">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                                 {icon}
//                               </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className=" text-wrap">
//                                   <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                     {name}
//                                   </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                     {description}{" "}
//                                     <span className="italic">
//                                       ({transaction.status})
//                                     </span>
//                                   </p>
//                                 </div>
//                                 <div
//                                   className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                                 >
//                                   {amountPrefix}
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}{" "}
//                                   {displayCurrencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Processed Sections (Grouped by Date) */}
//               {Object.entries(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-4">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                           {date}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             const isAddMoney = transaction.type === "Add Money";
//                             const icon = isAddMoney ? (
//                               <LuPlus
//                                 size={22}
//                                 className="text-neutral-900 dark:text-white"
//                               />
//                             ) : (
//                               <GoArrowUp
//                                 size={22}
//                                 className="text-neutral-900 dark:text-white"
//                               />
//                             );
//                             let description = isAddMoney
//                               ? "Added by you"
//                               : `To ${transaction.name || "Recipient"}`;
//                             let amountClass = isAddMoney
//                               ? "text-green-600 dark:text-green-500"
//                               : "text-neutral-900  dark:text-white";
//                             const amount = isAddMoney
//                               ? transaction.amountToAdd ?? 0
//                               : transaction.sendAmount ?? 0;
//                             const displayCurrencyCode = isAddMoney
//                               ? typeof transaction.balanceCurrency ===
//                                   "object" && transaction.balanceCurrency?.code
//                                 ? transaction.balanceCurrency.code
//                                 : ""
//                               : typeof transaction.sendCurrency === "object" &&
//                                 transaction.sendCurrency?.code
//                               ? transaction.sendCurrency.code
//                               : "";
//                             const amountPrefix = isAddMoney ? "+ " : "- ";
//                             // Clarify name for Add Money
//                             const name = isAddMoney
//                               ? `Added to ${displayCurrencyCode} balance`
//                               : transaction.name || "Recipient";

//                             // Adjust appearance based on final status
//                             if (
//                               transaction.status === "canceled" ||
//                               transaction.status === "cancelled"
//                             ) {
//                               description = "Cancelled";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "failed") {
//                               description = "Failed";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "completed") {
//                               description = isAddMoney
//                                 ? "Added"
//                                 : `Sent to ${transaction.name || "Recipient"}`;
//                             }

//                             return (
//                               <Link
//                                 href={`/dashboard/transactions/${transaction._id}`}
//                                 key={transaction._id}
//                                 className="block"
//                               >
//                                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                   <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                                       {icon}
//                                     </div>
//                                     <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                       <div className=" text-wrap">
//                                         <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                           {name}
//                                         </h3>
//                                         <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                           {description}
//                                         </p>
//                                       </div>
//                                       <div
//                                         className={`font-medium ${amountClass} whitespace-nowrap`}
//                                       >
//                                         {amountPrefix}
//                                         {amount.toLocaleString(undefined, {
//                                           minimumFractionDigits: 2,
//                                           maximumFractionDigits: 2,
//                                         })}{" "}
//                                         {displayCurrencyCode}
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
//               )}

//               {/* Empty State (No transactions match filters or none exist at all) */}
//               {filteredTransactions.length === 0 && (
//                 <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 py-12 dark:bg-white/5 rounded-lg mt-6">
//                   {allTransactions.length === 0
//                     ? "You haven't made any transactions yet."
//                     : "No transactions match your current filter or search criteria."}
//                   {/* Optional: Add a button to clear filters if filters are active */}
//                   {(appliedRecipientFilters.length > 0 ||
//                     appliedDirectionFilter !== "all" ||
//                     appliedStatusFilter ||
//                     appliedBalanceFilter.length > 0 ||
//                     appliedFromDateFilter ||
//                     appliedToDateFilter) &&
//                     allTransactions.length > 0 && (
//                       <div className="flex justify-center ">
//                         <button
//                           onClick={() =>
//                             handleFiltersApply({
//                               selectedRecipients: [],
//                               selectedDirection: "all",
//                               selectedStatus: null,
//                               selectedBalance: [],
//                               fromDate: undefined,
//                               toDate: undefined,
//                             })
//                           }
//                           className="mt-4 px-6 cursor-pointer py-3 w-38 bg-primary text-mainheading rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                         >
//                           Clear Filters
//                         </button>
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     );
// };

// export default TransactionsPage;



// "use client"; // Essential for using hooks
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions"; // Adjust path if needed

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// // ***** FIX 1: Import TransactionStatus *****
// import { Transaction, TransactionStatus } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";

// // Define a type for potential API errors
// interface ApiError extends Error {
//     response?: {
//         data?: {
//             message?: string;
//         };
//         status?: number;
//     };
// }

// // Helper function to parse date strings
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     // Try dd-MM-yyyy first
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//              return new Date(year, month, day); // Use local time
//         }
//     }
//      // Fallback for ISO-like strings
//      try {
//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) {
//             return date;
//         }
//      } catch (e) {
//          console.warn("Could not parse date string with new Date():", dateString, e);
//      }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // ***** FIX 3: Define specific filter type *****
// interface AppliedFilters {
//     selectedRecipients: (string | number)[];
//     selectedDirection?: string;
//     selectedStatus?: string | null;
//     selectedBalance?: string[];
//     fromDate?: string;
//     toDate?: string;
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
//                 balanceCurrency: payment.balanceCurrency,
//                 payInCurrency: payment.payInCurrency,
//                 account: payment.account,
//                 createdAt: payment.createdAt,
//                 updatedAt: payment.updatedAt,
//                 // ***** FIX 1: Cast status to TransactionStatus *****
//                 // Assumes 'unknown' is a valid TransactionStatus or should be handled differently
//                 status: (payment.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//             }));

//             // Process Transfers (Send Money)
//             const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
//                 _id: transfer._id,
//                 type: "Send Money",
//                 name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                       ? transfer.recipient.accountHolderName ?? 'Recipient'
//                       : 'Recipient',
//                 sendAmount: transfer.sendAmount,
//                 receiveAmount: transfer.receiveAmount,
//                 sendCurrency: transfer.sendCurrency,
//                 receiveCurrency: transfer.receiveCurrency,
//                 createdAt: transfer.createdAt,
//                 updatedAt: transfer.updatedAt,
//                  // ***** FIX 1: Cast status to TransactionStatus *****
//                  // Assumes 'unknown' is a valid TransactionStatus or should be handled differently
//                 status: (transfer.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                 recipient: transfer.recipient,
//                 sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                 ? transfer.sourceAccount
//                                 : transfer.sourceAccount?._id,
//             }));

//             const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//             setAllTransactions(combinedTransactions);
//             setFilteredTransactions(combinedTransactions);
//             setLoadingTransactions(false);

//             setUserAccounts(accountsData);
//             setLoadingAccounts(false);

//         } catch (err: unknown) {
//             console.error("Data fetch error in TransactionsPage:", err);
//             let errorMessage = "Failed to fetch data. Please try again.";
//             if (err instanceof Error) {
//                 errorMessage = err.message;
//                 const apiError = err as ApiError;
//                 if (apiError.response?.data?.message) {
//                     errorMessage = apiError.response.data.message;
//                 }
//             } else if (typeof err === 'string') {
//                 errorMessage = err;
//             }
//             setError(errorMessage);
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     // --- Callback from Search Component ---
//     const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
//          console.log("Applying search results:", searchResults.length);
//          setFilteredTransactions(searchResults);
//     }, []);

//     // --- Callback from Filter Component ---
//     // Function signature now implicitly matches AppliedFilters type
//     const handleFiltersApply = useCallback((filters: AppliedFilters) => {
//         console.log("Applying filters:", filters);

//         setAppliedRecipientFilters(filters.selectedRecipients || []);
//         setAppliedDirectionFilter(filters.selectedDirection || 'all');
//         setAppliedStatusFilter(filters.selectedStatus || null);
//         setAppliedBalanceFilter(filters.selectedBalance || []);
//         setAppliedFromDateFilter(filters.fromDate);
//         setAppliedToDateFilter(filters.toDate);

//         let tempFiltered = [...allTransactions];

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
//                 const txStatus = tx.status; // Already normalized or casted to TransactionStatus

//                 if (lowerCaseStatusFilter === 'completed') return txStatus === 'completed';
//                 // ***** FIX 2: Remove redundant 'cancelled' check *****
//                 if (lowerCaseStatusFilter === 'cancelled') return txStatus === 'canceled';
//                 if (lowerCaseStatusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                 if (lowerCaseStatusFilter === 'failed') return txStatus === 'failed';
//                 return false;
//             });
//         }

//         // Apply Balance (Currency) Filter
//         const balanceFilters = filters.selectedBalance;
//         if (balanceFilters && balanceFilters.length > 0) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 let currencyCodeToCheck: string | undefined;
//                 if (tx.type === 'Add Money') {
//                     currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null
//                         ? tx.balanceCurrency.code
//                         : undefined;
//                 } else if (tx.type === 'Send Money') {
//                     currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null
//                         ? tx.sendCurrency.code
//                         : undefined;
//                 }
//                 return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
//             });
//         }

//         // Apply Recipient Filter
//         const recipientFilters = filters.selectedRecipients;
//         if (recipientFilters && recipientFilters.length > 0) {
//              const recipientFilterIds = recipientFilters.map(String);
//              tempFiltered = tempFiltered.filter(tx => {
//                 if (tx.type !== "Send Money") {
//                     return true;
//                 }
//                 const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id)
//                                     ? String(tx.recipient._id)
//                                     : (typeof tx.recipient === 'string' ? tx.recipient : null);
//                 return recipientId ? recipientFilterIds.includes(recipientId) : false;
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999);

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false;
//                 try {
//                     const transactionDateObj = new Date(transactionDateStr);
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string:", transactionDateStr);
//                          return false;
//                     }
//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                     if (toDateObj && transactionDateObj > toDateObj) include = false;
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false;
//                 }
//             });
//         }

//         setFilteredTransactions(tempFiltered);

//     }, [allTransactions]);

//      // --- Transaction Grouping Logic (Optimized with useMemo) ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         const inProgress = filteredTransactions.filter(
//             (tx) => tx.status === "in progress" || tx.status === "pending"
//         );

//         // ***** FIX 2: Remove redundant 'cancelled' check *****
//         const processed = filteredTransactions.filter(
//             (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "failed"
//         );

//         const sortedProcessed = [...processed].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             if (!dateA && !dateB) return 0;
//             if (!dateA) return 1;
//             if (!dateB) return -1;
//             try {
//                return new Date(dateB).getTime() - new Date(dateA).getTime();
//             } catch (e) {
//                 console.error("Error comparing dates during sort:", dateA, dateB, e);
//                 return 0;
//             }
//         });

//         const grouped = sortedProcessed.reduce(
//             (groups: { [date: string]: Transaction[] }, tx) => {
//                 const groupDateStr = tx.updatedAt || tx.createdAt;
//                 if (!groupDateStr) {
//                     const unknownDateKey = 'Unknown Date';
//                     if (!groups[unknownDateKey]) groups[unknownDateKey] = [];
//                     groups[unknownDateKey].push(tx);
//                     return groups;
//                 }
//                 try {
//                     const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', {
//                         year: "numeric", month: "long", day: "numeric",
//                     });
//                     if (!groups[dateKey]) groups[dateKey] = [];
//                     groups[dateKey].push(tx);
//                 } catch (e) {
//                     console.error("Error formatting date for grouping:", groupDateStr, e);
//                     const errorKey = 'Date Error';
//                     if (!groups[errorKey]) groups[errorKey] = [];
//                     groups[errorKey].push(tx);
//                 }
//                 return groups;
//             }, {}
//         );

//         return { inProgressTransactions: inProgress, groupedProcessedTransactions: grouped };
//     }, [filteredTransactions]);


//     // --- Render Logic ---
//     const isLoading = loadingTransactions || loadingAccounts;

//     return (
//       <section className="Transaction-Page pb-8 md:pb-10">
//         <div className="container mx-auto">
//           {/* Header and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Transactions
//             </h1>
//             {!loadingAccounts && userAccounts.length > 0 && (
//               <TransactionActions
//                 transactions={allTransactions}
//                 userAccounts={userAccounts}
//                 onTransactionsChange={handleTransactionsChange}
//                 // ***** FIX 3: Pass the correctly typed handler *****
//                 onFiltersApply={handleFiltersApply}
//               />
//             )}
//             {loadingAccounts && (
//               <div className="flex items-center gap-4 animate-pulse">
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//               </div>
//             )}
//             {!loadingAccounts && userAccounts.length === 0 && !error && (
//               <p className="text-sm text-gray-500">
//                 Create an account to start making transactions.
//               </p>
//             )}
//           </div>

//           {/* Loading State */}
//           {isLoading && (
//              <div className="space-y-2">
//               {Array(8).fill(0).map((_, index) => (
//                   <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                       <div className="flex items-center gap-4">
//                           <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
//                           <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                               <div className="flex-grow">
//                                   <Skeleton className="h-4 w-40 mb-2" />
//                                   <Skeleton className="h-3 w-32" />
//                               </div>
//                               <div className="shrink-0">
//                                   <Skeleton className="h-5 w-20 rounded-full" />
//                               </div>
//                           </div>
//                       </div>
//                   </div>
//               ))}
//             </div>
//           )}

//           {/* Error State */}
//           {!isLoading && error && (
//             <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
//               <strong>Error:</strong> {error}
//             </div>
//           )}

//           {/* Transaction List & Empty States */}
//           {!isLoading && !error && (
//             <div className="space-y-4">
//               {/* In Progress Section */}
//               {inProgressTransactions.length > 0 && (
//                 <div>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                     In progress
//                   </h3>
//                   <div className="space-y-2">
//                     {inProgressTransactions.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                       const description = isAddMoney ? "Waiting for your money" : "Sending money";
//                       const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                       const displayCurrencyCode = isAddMoney
//                         ? typeof transaction.balanceCurrency === "object" && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : ""
//                         : typeof transaction.sendCurrency === "object" && transaction.sendCurrency?.code ? transaction.sendCurrency.code : "";
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : transaction.name || "Recipient";

//                       return (
//                         <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center gap-4">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className=" text-wrap">
//                                   <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"> {name} </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description}{" "} <span className="italic"> ({transaction.status}) </span> </p>
//                                 </div>
//                                 <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}>
//                                   {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Processed Sections (Grouped by Date) */}
//               {Object.entries(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-4">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                           {date}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             const isAddMoney = transaction.type === "Add Money";
//                             const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                             let description = isAddMoney ? "Added by you" : `To ${transaction.name || "Recipient"}`;
//                             let amountClass = isAddMoney ? "text-green-600 dark:text-green-500" : "text-neutral-900  dark:text-white";
//                             const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                             const displayCurrencyCode = isAddMoney
//                               ? typeof transaction.balanceCurrency === "object" && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : ""
//                               : typeof transaction.sendCurrency === "object" && transaction.sendCurrency?.code ? transaction.sendCurrency.code : "";
//                             const amountPrefix = isAddMoney ? "+ " : "- ";
//                             const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : transaction.name || "Recipient";

//                             // ***** FIX 2: Remove redundant 'cancelled' check *****
//                             if (transaction.status === "canceled") {
//                               description = "Cancelled";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "failed") {
//                               description = "Failed";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "completed") {
//                               description = isAddMoney ? "Added" : `Sent to ${transaction.name || "Recipient"}`;
//                             }

//                             return (
//                               <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                   <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                                     <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                       <div className=" text-wrap">
//                                         <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"> {name} </h3>
//                                         <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description} </p>
//                                       </div>
//                                       <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                                         {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode}
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
//               )}

//               {/* Empty State */}
//               {filteredTransactions.length === 0 && (
//                 <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 py-12 dark:bg-white/5 rounded-lg mt-6">
//                   {allTransactions.length === 0
//                     ? "You haven't made any transactions yet."
//                     : "No transactions match your current filter or search criteria."}
//                   {(appliedRecipientFilters.length > 0 ||
//                     appliedDirectionFilter !== "all" ||
//                     appliedStatusFilter ||
//                     appliedBalanceFilter.length > 0 ||
//                     appliedFromDateFilter ||
//                     appliedToDateFilter) &&
//                     allTransactions.length > 0 && (
//                       <div className="flex justify-center ">
//                         <button
//                           onClick={() =>
//                             handleFiltersApply({ // Ensure this object matches AppliedFilters
//                               selectedRecipients: [],
//                               selectedDirection: "all",
//                               selectedStatus: null,
//                               selectedBalance: [],
//                               fromDate: undefined,
//                               toDate: undefined,
//                             })
//                           }
//                           className="mt-4 px-6 cursor-pointer py-3 w-38 bg-primary text-mainheading rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                         >
//                           Clear Filters
//                         </button>
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     );
// };

// export default TransactionsPage;




// "use client"; // Essential for using hooks
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions"; // Adjust path if needed

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// import { Transaction, TransactionStatus } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";

// // Define a type for potential API errors
// interface ApiError extends Error {
//     response?: {
//         data?: {
//             message?: string;
//         };
//         status?: number;
//     };
// }

// // Helper function to parse date strings
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     // Try dd-MM-yyyy first
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//              return new Date(year, month, day); // Use local time
//         }
//     }
//      // Fallback for ISO-like strings
//      try {
//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) {
//             return date;
//         }
//      } catch (e) {
//          console.warn("Could not parse date string with new Date():", dateString, e);
//      }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // Define specific filter type
// interface AppliedFilters {
//     selectedRecipients: (string | number)[];
//     selectedDirection?: string;
//     selectedStatus?: string | null;
//     selectedBalance?: string[];
//     fromDate?: string;
//     toDate?: string;
// }

// const TransactionsPageSkeleton: React.FC = () => {
//   return (
//       <section className="Transaction-Page pb-8 md:pb-10">
//           <div className="container mx-auto">
//               {/* Skeleton for Header and Actions */}
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//                   {/* Skeleton for H1 Title */}
//                   <Skeleton className="h-8 w-64 rounded-md" />
//                   {/* Skeleton for Actions (Search, Filters) */}
//                   <div className="flex items-center gap-4 w-full md:w-auto justify-end">
//                       <Skeleton className="h-10 w-full sm:w-64 rounded-full" /> {/* Search */}
//                       <Skeleton className="h-10 w-32 rounded-full" /> {/* Filter Button */}
//                   </div>
//               </div>

//               {/* Skeleton for Transaction List */}
//               <div className="space-y-2">
//                   {Array(8).fill(0).map((_, index) => (
//                       <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                           <div className="flex items-center gap-4">
//                               <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
//                               <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                                   <div className="flex-grow">
//                                       <Skeleton className="h-4 w-40 mb-2" />
//                                       <Skeleton className="h-3 w-32" />
//                                   </div>
//                                   <div className="shrink-0">
//                                       <Skeleton className="h-5 w-20 rounded-full" />
//                                   </div>
//                               </div>
//                           </div>
//                       </div>
//                   ))}
//               </div>
//           </div>
//       </section>
//   );
// };


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
//                 balanceCurrency: payment.balanceCurrency,
//                 payInCurrency: payment.payInCurrency,
//                 account: payment.account,
//                 createdAt: payment.createdAt,
//                 updatedAt: payment.updatedAt,
//                 status: (payment.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//             }));

//             // Process Transfers (Send Money)
//             const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
//                 _id: transfer._id,
//                 type: "Send Money",
//                 name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                       ? transfer.recipient.accountHolderName ?? 'Recipient'
//                       : 'Recipient',
//                 sendAmount: transfer.sendAmount,
//                 receiveAmount: transfer.receiveAmount,
//                 sendCurrency: transfer.sendCurrency,
//                 receiveCurrency: transfer.receiveCurrency,
//                 createdAt: transfer.createdAt,
//                 updatedAt: transfer.updatedAt,
//                 status: (transfer.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                 recipient: transfer.recipient,
//                 sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                 ? transfer.sourceAccount
//                                 : transfer.sourceAccount?._id,
//             }));

//             const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//             setAllTransactions(combinedTransactions);
//             setFilteredTransactions(combinedTransactions);
//             setLoadingTransactions(false);

//             setUserAccounts(accountsData);
//             setLoadingAccounts(false);

//         } catch (err: unknown) {
//             console.error("Data fetch error in TransactionsPage:", err);
//             let errorMessage = "Failed to fetch data. Please try again.";
//             if (err instanceof Error) {
//                 errorMessage = err.message;
//                 const apiError = err as ApiError;
//                 if (apiError.response?.data?.message) {
//                     errorMessage = apiError.response.data.message;
//                 }
//             } else if (typeof err === 'string') {
//                 errorMessage = err;
//             }
//             setError(errorMessage);
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     // --- Callback from Search Component ---
//     const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
//          console.log("Applying search results:", searchResults.length);
//          // When search changes, it resets the filter application base
//          // Re-apply current filters to the new search results
//          applyFilters(searchResults, {
//             selectedRecipients: appliedRecipientFilters,
//             selectedDirection: appliedDirectionFilter,
//             selectedStatus: appliedStatusFilter,
//             selectedBalance: appliedBalanceFilter,
//             fromDate: appliedFromDateFilter,
//             toDate: appliedToDateFilter
//          });
//     }, [
//         // Include all applied filter states here so the callback updates correctly
//         appliedRecipientFilters,
//         appliedDirectionFilter,
//         appliedStatusFilter,
//         appliedBalanceFilter,
//         appliedFromDateFilter,
//         appliedToDateFilter
//     ]); // Dependencies on filter states ensure the re-application uses current filter values


//     // --- Centralized Filter Application Logic ---
//     // This function applies filters to a given transaction list
//     const applyFilters = (transactionsToFilter: Transaction[], filters: AppliedFilters) => {
//         let tempFiltered = [...transactionsToFilter];

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
//                 const txStatus = tx.status; // Already normalized or casted

//                 if (lowerCaseStatusFilter === 'completed') return txStatus === 'completed';
//                 if (lowerCaseStatusFilter === 'cancelled') return txStatus === 'canceled';
//                 if (lowerCaseStatusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                 if (lowerCaseStatusFilter === 'failed') return txStatus === 'failed';
//                 return false;
//             });
//         }

//         // Apply Balance (Currency) Filter
//         const balanceFilters = filters.selectedBalance;
//         if (balanceFilters && balanceFilters.length > 0) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 let currencyCodeToCheck: string | undefined;
//                 if (tx.type === 'Add Money') {
//                     currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null
//                         ? tx.balanceCurrency.code
//                         : undefined;
//                 } else if (tx.type === 'Send Money') {
//                     currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null
//                         ? tx.sendCurrency.code
//                         : undefined;
//                 }
//                 return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
//             });
//         }

//         // Apply Recipient Filter
//         const recipientFilters = filters.selectedRecipients;
//         if (recipientFilters && recipientFilters.length > 0) {
//              const recipientFilterIds = recipientFilters.map(String);
//              tempFiltered = tempFiltered.filter(tx => {
//                 if (tx.type !== "Send Money") {
//                     // Keep non-send transactions if recipient filter is active
//                     // Or filter them out if you only want sends matching recipients
//                     // Current logic: Keep non-sends
//                     return true;
//                 }
//                 const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id)
//                                     ? String(tx.recipient._id)
//                                     : (typeof tx.recipient === 'string' ? tx.recipient : null);
//                 return recipientId ? recipientFilterIds.includes(recipientId) : false;
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999);

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false;
//                 try {
//                     const transactionDateObj = new Date(transactionDateStr);
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string:", transactionDateStr);
//                          return false;
//                     }
//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                     if (toDateObj && transactionDateObj > toDateObj) include = false;
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false;
//                 }
//             });
//         }

//         setFilteredTransactions(tempFiltered);
//     };


//     // --- Callback from Filter Component ---
//     const handleFiltersApply = useCallback((filters: AppliedFilters) => {
//         console.log("Applying filters:", filters);

//         // Update the state holding the applied filters
//         setAppliedRecipientFilters(filters.selectedRecipients || []);
//         setAppliedDirectionFilter(filters.selectedDirection || 'all');
//         setAppliedStatusFilter(filters.selectedStatus || null);
//         setAppliedBalanceFilter(filters.selectedBalance || []);
//         setAppliedFromDateFilter(filters.fromDate);
//         setAppliedToDateFilter(filters.toDate);

//         // Apply these filters to the *complete* set of transactions
//         applyFilters(allTransactions, filters);

//     }, [allTransactions]); // Depends on allTransactions

//      // --- Transaction Grouping Logic (Optimized with useMemo) ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         // Filter for 'in progress' or 'pending' statuses
//         const inProgressUnsorted = filteredTransactions.filter(
//             (tx) => tx.status === "in progress" || tx.status === "pending"
//         );

//         // **** SORT "IN PROGRESS" TRANSACTIONS BY LATEST DATE ****
//         const sortedInProgress = [...inProgressUnsorted].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             // Handle cases where dates might be missing
//             if (!dateA && !dateB) return 0; // Keep original order if both dates missing
//             if (!dateA) return 1; // Put items without dates last
//             if (!dateB) return -1; // Put items without dates last
//             try {
//                // Sort descending (latest first)
//                return new Date(dateB).getTime() - new Date(dateA).getTime();
//             } catch (e) {
//                 console.error("Error comparing dates during sort (In Progress):", dateA, dateB, e);
//                 return 0; // Avoid crash on invalid date format
//             }
//         });
//         // **** END OF SORTING ****

//         // Filter for processed statuses
//         const processed = filteredTransactions.filter(
//             (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "failed"
//         );

//         // Sort processed transactions by latest date (existing logic)
//         const sortedProcessed = [...processed].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             if (!dateA && !dateB) return 0;
//             if (!dateA) return 1;
//             if (!dateB) return -1;
//             try {
//                return new Date(dateB).getTime() - new Date(dateA).getTime();
//             } catch (e) {
//                 console.error("Error comparing dates during sort (Processed):", dateA, dateB, e);
//                 return 0;
//             }
//         });

//         // Group sorted processed transactions by date (existing logic)
//         const grouped = sortedProcessed.reduce(
//             (groups: { [date: string]: Transaction[] }, tx) => {
//                 const groupDateStr = tx.updatedAt || tx.createdAt;
//                 if (!groupDateStr) {
//                     const unknownDateKey = 'Unknown Date';
//                     if (!groups[unknownDateKey]) groups[unknownDateKey] = [];
//                     groups[unknownDateKey].push(tx);
//                     return groups;
//                 }
//                 try {
//                     const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', {
//                         year: "numeric", month: "long", day: "numeric",
//                     });
//                     if (!groups[dateKey]) groups[dateKey] = [];
//                     groups[dateKey].push(tx);
//                 } catch (e) {
//                     console.error("Error formatting date for grouping:", groupDateStr, e);
//                     const errorKey = 'Date Error';
//                     if (!groups[errorKey]) groups[errorKey] = [];
//                     groups[errorKey].push(tx);
//                 }
//                 return groups;
//             }, {}
//         );

//         // Return the sorted in-progress list and the grouped processed list
//         return { inProgressTransactions: sortedInProgress, groupedProcessedTransactions: grouped };
//     }, [filteredTransactions]); // Dependency remains on filteredTransactions


//     // --- Render Logic ---
//     const isLoading = loadingTransactions || loadingAccounts;
//     // *** RENDER SKELETON IF LOADING ***
//     if (isLoading) {
//       return <TransactionsPageSkeleton />;
//   }

//     return (
//       <section className="Transaction-Wrapper pb-8 md:pb-10">
//         <div className="Transaction-Page">
//           {/* Header and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Transactions
//             </h1>
//             {/* Conditional rendering for actions based on accounts loading is now implicit */}
//             {!loadingAccounts && userAccounts.length > 0 && (
//               <TransactionActions
//                 transactions={allTransactions}
//                 userAccounts={userAccounts}
//                 onTransactionsChange={handleTransactionsChange}
//                 onFiltersApply={handleFiltersApply}
//               />
//             )}
//             {/* Skeleton for actions during only account loading phase (less likely now with combined check) */}
//             {/* {loadingAccounts && !loadingTransactions && (...) } */} {/* This case is less common with the combined isLoading check */}
//             {!loadingAccounts && userAccounts.length === 0 && !error && (
//               <p className="text-sm text-gray-500">
//                 Create an account to start making transactions.
//               </p>
//             )}
//           </div>

//           {/* Error State */}
//           {!isLoading && error && (
//             <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
//               <strong>Error:</strong> {error}
//             </div>
//           )}

//           {/* Transaction List & Empty States */}
//           {!isLoading && !error && (
//             <div className="space-y-4">
//               {/* In Progress Section (Now Sorted by Latest Date) */}
//               {inProgressTransactions.length > 0 && (
//                 <div className="InProcess-Transaction-Lists">
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b border-gray-200 dark:border-primarybox">
//                     In progress
//                   </h3>
//                   <div className="space-y-2">
//                     {/* Renders the already sorted inProgressTransactions */}
//                     {inProgressTransactions.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                       const description = isAddMoney ? "Waiting for your money" : "Sending money";
//                       const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                       const displayCurrencyCode = isAddMoney
//                         ? typeof transaction.balanceCurrency === "object" && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : ""
//                         : typeof transaction.sendCurrency === "object" && transaction.sendCurrency?.code ? transaction.sendCurrency.code : "";
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : transaction.name || "Recipient";

//                       return (
//                         <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center gap-4">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className=" text-wrap">
//                                   <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"> {name} </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description}{" "} <span className="italic"> ({transaction.status}) </span> </p>
//                                 </div>
//                                 <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}>
//                                   {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Processed Sections (Grouped by Date) */}
//               {Object.entries(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-4">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date} className="Transaction-Lists">
//                         <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b border-gray-200 dark:border-primarybox">
//                           {date}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             const isAddMoney = transaction.type === "Add Money";
//                             const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                             let description = isAddMoney ? "Added by you" : `To ${transaction.name || "Recipient"}`;
//                             let amountClass = isAddMoney ? "text-green-600 dark:text-green-500" : "text-neutral-900  dark:text-white";
//                             const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                             const displayCurrencyCode = isAddMoney
//                               ? typeof transaction.balanceCurrency === "object" && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : ""
//                               : typeof transaction.sendCurrency === "object" && transaction.sendCurrency?.code ? transaction.sendCurrency.code : "";
//                             const amountPrefix = isAddMoney ? "+ " : "- ";
//                             const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : transaction.name || "Recipient";

//                             if (transaction.status === "canceled") {
//                               description = "Cancelled";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "failed") {
//                               description = "Failed";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "completed") {
//                               // Keep specific descriptions for completed
//                                description = isAddMoney ? "Added" : `Sent to ${transaction.name || "Recipient"}`;
//                             }

//                             return (
//                               <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                   <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                                     <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                       <div className=" text-wrap">
//                                         <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"> {name} </h3>
//                                         <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description} </p>
//                                       </div>
//                                       <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                                         {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode}
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
//               )}

//               {/* Empty State */}
//               {filteredTransactions.length === 0 && (
//                 <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 py-12 dark:bg-white/5 rounded-lg mt-6">
//                   {allTransactions.length === 0
//                     ? "You haven't made any transactions yet."
//                     : "No transactions match your current filter or search criteria."}
//                   {(appliedRecipientFilters.length > 0 ||
//                     appliedDirectionFilter !== "all" ||
//                     appliedStatusFilter ||
//                     appliedBalanceFilter.length > 0 ||
//                     appliedFromDateFilter ||
//                     appliedToDateFilter) &&
//                     allTransactions.length > 0 && (
//                       <div className="flex justify-center ">
//                         <button
//                           onClick={() =>
//                             // Reset filters and re-apply with defaults to show all again
//                             handleFiltersApply({
//                               selectedRecipients: [],
//                               selectedDirection: "all",
//                               selectedStatus: null,
//                               selectedBalance: [],
//                               fromDate: undefined,
//                               toDate: undefined,
//                             })
//                           }
//                           className="mt-4 px-6 cursor-pointer py-3 w-38 bg-primary text-mainheading rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                         >
//                           Clear Filters
//                         </button>
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     );
// };

// export default TransactionsPage;



// // app/dashboard/transactions/page.tsx
// "use client";

// import React, { useState, useCallback, useEffect, useMemo } from "react";

// // New/Updated Sub Components
// import TransactionPageHeader from "./TransactionPageHeader"; // Adjust path
// import TransactionList from "./TransactionList";       // Adjust path
// import FilterModal, { FilterSettings } from "./FilterModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";                       // Adjust path

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// import { Transaction, TransactionStatus } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path
// import { parseISO } from "date-fns"; // Use consistent date parsing

// // Define a type for potential API errors
// interface ApiError extends Error {
//     response?: { data?: { message?: string; }; status?: number; };
// }

// type AppliedFilters = FilterSettings; // Use the type exported by FilterModal

// // --- Helper Function ---
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         const isoDate = parseISO(dateString); if (!isNaN(isoDate.getTime())) return isoDate;
//     } catch { /* Ignore */ }
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//              const date = new Date(Date.UTC(year, month, day));
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) return date;
//         }
//     }
//     try { const genericDate = new Date(dateString); if (!isNaN(genericDate.getTime())) return genericDate; } catch { /* Ignore */ }
//     console.warn("Could not parse date string:", dateString); return null;
// }

// // --- Skeleton Loading Component ---
// const TransactionsPageSkeleton: React.FC = () => (
//     <section className="Transaction-Page pb-8 md:pb-10 animate-pulse">
//         <div className="container mx-auto">
//              {/* Header Skeleton */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 mb-6 border-b border-gray-200 dark:border-gray-700">
//                  <Skeleton className="h-8 w-48 rounded-md" />
//                  <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
//                      <Skeleton className="h-10 w-full sm:w-64 rounded-full" />
//                      <Skeleton className="h-10 w-32 rounded-full" />
//                  </div>
//             </div>
//             {/* List Skeleton */}
//             <div className="space-y-6">
//                 <div> <Skeleton className="h-6 w-3/4 mb-3 rounded" /> <Skeleton className="h-20 w-full rounded-lg" /> </div>
//                 <div> <Skeleton className="h-6 w-1/2 mb-3 rounded" /> <Skeleton className="h-20 w-full rounded-lg" /> <Skeleton className="h-20 w-full rounded-lg mt-2" /> </div>
//             </div>
//         </div>
//     </section>
// );

// // --- Main Transactions Page Component ---
// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // Master list from API
//     const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // List after search/filters
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);

//     // Loading and Error states
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Auth
//     const { token } = useAuth();

//     // --- Filter Modal State ---
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);

//     // --- Applied Filters State ---
//     const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
//         selectedRecipients: [], selectedDirection: 'all', selectedStatus: null,
//         selectedBalance: [], fromDate: undefined, toDate: undefined,
//     });

//     // --- Data Fetching ---
//     const fetchData = useCallback(async () => {
//         if (!token) { setError("Authentication required."); setLoadingTransactions(false); setLoadingAccounts(false); return; }
//         setLoadingTransactions(true); setLoadingAccounts(true); setError(null);
//         setAllTransactions([]); setDisplayTransactions([]); setUserAccounts([]); // Reset state
//         try {
//             // NOTE: Assuming paymentService/transferService return types defined previously
//             const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//                 accountService.getUserAccounts(token)
//             ]);

//             // Process Payments
//             const mappedPayments: Transaction[] = paymentsData.map(p => ({
//                 _id: p._id, type: "Add Money", amountToAdd: p.amountToAdd, amountToPay: p.amountToPay,
//                 // Ensure currency objects are handled correctly, potentially accessing nested 'code' if needed
//                 balanceCurrency: p.balanceCurrency, // Assuming p.balanceCurrency is Currency type or similar
//                 payInCurrency: p.payInCurrency, // Assuming p.payInCurrency is Currency type or similar
//                 account: p.account, // Assuming p.account is TransactionAccount | string or similar
//                 createdAt: p.createdAt, updatedAt: p.updatedAt, status: (p.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                 name: `From ${p.payInCurrency?.code || 'source'}`, // Deriving name
//                 // Fill in missing fields for Transaction type
//                 sendAmount: undefined, receiveAmount: undefined, sendCurrency: undefined, receiveCurrency: undefined,
//                 recipient: undefined, sourceAccountId: undefined,
//             }));
//             // Process Transfers
//             const mappedTransfers: Transaction[] = transfersData.map(t => ({
//                 _id: t._id, type: "Send Money",
//                 // Safely access recipient name
//                 name: (typeof t.recipient === 'object' && t.recipient !== null) ? t.recipient.accountHolderName ?? 'Recipient' : 'Recipient',
//                 sendAmount: t.sendAmount, receiveAmount: t.receiveAmount,
//                 sendCurrency: t.sendCurrency, // Assuming t.sendCurrency is Currency type or similar
//                 receiveCurrency: t.receiveCurrency, // Assuming t.receiveCurrency is Currency type or similar
//                 createdAt: t.createdAt, updatedAt: t.updatedAt, status: (t.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                 recipient: t.recipient, // Keep as RecipientDetails | string
//                 // Safely access source account ID
//                 sourceAccountId: typeof t.sourceAccount === 'string' ? t.sourceAccount : t.sourceAccount?._id,
//                  // Fill in missing fields for Transaction type
//                  amountToAdd: undefined, amountToPay: undefined, balanceCurrency: undefined, payInCurrency: undefined, account: undefined,
//             }));

//             const combined = [...mappedPayments, ...mappedTransfers].sort((a, b) => {
//                  const dA = a.updatedAt || a.createdAt; const dB = b.updatedAt || b.createdAt;
//                  if (!dA && !dB) return 0; if (!dA) return 1; if (!dB) return -1;
//                  try { return new Date(dB).getTime() - new Date(dA).getTime(); } catch { return 0; }
//             });

//             setAllTransactions(combined);
//             setDisplayTransactions(combined); // Initially show all sorted
//             setUserAccounts(accountsData);
//         } catch (err: unknown) {
//             console.error("Data fetch error:", err);
//             let errorMessage = "Failed to fetch transaction data.";
//             const apiError = err as ApiError; if (apiError.response?.data?.message) errorMessage = apiError.response.data.message; else if (err instanceof Error) errorMessage = err.message;
//             setError(errorMessage);
//         } finally {
//             setLoadingTransactions(false); setLoadingAccounts(false);
//         }
//     }, [token]);

//     useEffect(() => { fetchData(); }, [fetchData]);

//      // --- Centralized Filter Application Logic ---
//      const runFilters = useCallback((transactionsToFilter: Transaction[], filters: AppliedFilters) => {
//         let tempFiltered = [...transactionsToFilter];

//         // Apply Direction Filter
//         if (filters.selectedDirection !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                  (filters.selectedDirection === 'add' && tx.type === 'Add Money') ||
//                  (filters.selectedDirection === 'send' && tx.type === 'Send Money')
//              );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//              tempFiltered = tempFiltered.filter(tx => {
//                   const txStatus = tx.status?.toLowerCase() as TransactionStatus | undefined;
//                   if (!txStatus) return false;
//                   if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                   if (statusFilter === 'in process') return txStatus === 'pending' || txStatus === 'processing' || txStatus === 'in progress';
//                   if (statusFilter === 'completed') return txStatus === 'completed';
//                   if (statusFilter === 'cancelled') return txStatus === 'canceled';
//                   if (statusFilter === 'failed') return txStatus === 'failed';
//                   if (statusFilter === 'pending') return txStatus === 'pending';
//                   if (statusFilter === 'processing') return txStatus === 'processing';
//                   return false;
//               });
//         }

//         // Apply Balance (Currency) Filter
//         if (filters.selectedBalance.length > 0) {
//             const balanceCodes = new Set(filters.selectedBalance);
//             tempFiltered = tempFiltered.filter(tx => {
//                 // Safe navigation for currency codes
//                 if (tx.type === 'Add Money') return tx.balanceCurrency?.code && balanceCodes.has(tx.balanceCurrency.code);
//                 if (tx.type === 'Send Money') return tx.sendCurrency?.code && balanceCodes.has(tx.sendCurrency.code);
//                 return false;
//             });
//         }

//         // Apply Recipient Filter
//         if (filters.selectedRecipients.length > 0) {
//             const recipientIds = new Set(filters.selectedRecipients.map(String)); // Keep this

//             tempFiltered = tempFiltered.filter(tx => {
//                 // --- START FIX ---
//                 if (tx.type !== 'Send Money' || !tx.recipient) {
//                     return false; // Only filter 'Send Money' transactions that have a recipient defined
//                 }
//                 // Check if recipient is an object (populated) or just an ID string
//                 const currentRecipientId = typeof tx.recipient === 'object'
//                     ? tx.recipient._id // If object, get the _id
//                     : tx.recipient;   // If string, use the string directly
//                 // Check if the Set contains the extracted ID
//                 return recipientIds.has(String(currentRecipientId));
//                 // --- END FIX ---
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);
//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;
//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch { return false; }
//             });
//         }

//         // Sort results
//         tempFiltered.sort((a, b) => {
//             const dA = a.updatedAt || a.createdAt; const dB = b.updatedAt || b.createdAt;
//             if (!dA && !dB) return 0; if (!dA) return 1; if (!dB) return -1;
//             try { return new Date(dB).getTime() - new Date(dA).getTime(); } catch { return 0; }
//         });

//         setDisplayTransactions(tempFiltered); // Update state

//     }, []); // No dependencies needed if it only uses its arguments

//     // --- Effect to run filters when base data or filters change ---
//     useEffect(() => {
//         runFilters(allTransactions, appliedFilters);
//     }, [allTransactions, appliedFilters, runFilters]);

//     // --- Callback from Search Component ---
//     const handleTransactionsChangeFromSearch = useCallback((searchResults: Transaction[]) => {
//         // Search provides a subset of `allTransactions`. Apply current filters to this subset.
//         runFilters(searchResults, appliedFilters);
//     }, [runFilters, appliedFilters]);

//     // --- Filter Modal Control ---
//     const openFilterPopup = () => setIsFilterOpen(true);
//     const closeFilterPopup = () => setIsFilterOpen(false);

//     // --- Resize detection for modal animation ---
//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 640); handleResize();
//         window.addEventListener("resize", handleResize); return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // --- Apply and Clear Filter Handlers (Called by FilterModal) ---
//     const handleApplyFiltersFromModal = useCallback((filtersFromModal: AppliedFilters) => {
//         setAppliedFilters(filtersFromModal); // Update state, useEffect will trigger runFilters
//         closeFilterPopup();
//     }, []);

//     const handleClearAllFilters = useCallback(() => {
//         const clearedFilters: AppliedFilters = {
//             selectedRecipients: [], selectedDirection: "all", selectedStatus: null,
//             selectedBalance: [], fromDate: undefined, toDate: undefined,
//         };
//         setAppliedFilters(clearedFilters); // Update state, useEffect will trigger runFilters
//         if (isFilterOpen) closeFilterPopup(); // Close modal if open
//     }, [isFilterOpen]);


//     // --- Transaction Grouping Logic (using displayTransactions) ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         // Group the currently displayed transactions
//         const inProgress = displayTransactions.filter(tx => tx.status === "in progress" || tx.status === "pending" || tx.status === "processing");
//         const processed = displayTransactions.filter(tx => tx.status === "completed" || tx.status === "canceled" || tx.status === "failed");

//         // Sorting already happened in runFilters
//         const grouped = processed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
//             const dateStr = tx.updatedAt || tx.createdAt;
//             let dateKey = 'Unknown Date';
//             if (dateStr) { try { dateKey = new Date(dateStr).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" }); } catch { dateKey = 'Invalid Date'; } }
//             if (!groups[dateKey]) groups[dateKey] = [];
//             groups[dateKey].push(tx); return groups;
//         }, {});

//         return { inProgressTransactions: inProgress, groupedProcessedTransactions: grouped };
//     }, [displayTransactions]); // Depends only on the displayed list


//     // --- Render Logic ---
//     const isLoading = loadingTransactions || loadingAccounts;
//     const hasAnyTransactions = allTransactions.length > 0;
//     const showEmptyState = !isLoading && !error && displayTransactions.length === 0;
//     const filtersAreActive = useMemo(() => // Check if filters are active
//         appliedFilters.selectedRecipients.length > 0 ||
//         appliedFilters.selectedDirection !== "all" ||
//         appliedFilters.selectedStatus !== null ||
//         appliedFilters.selectedBalance.length > 0 ||
//         !!appliedFilters.fromDate || !!appliedFilters.toDate,
//         [appliedFilters]
//     );


//     if (isLoading) return <TransactionsPageSkeleton />;

//     return (
//       <> {/* Fragment to hold page and modal */}
//         <section className="Transaction-Wrapper pb-8 md:pb-10">
//           <div className="Transaction-Page container mx-auto">

//             {/* Use TransactionPageHeader which includes TransactionActions */}
//             <TransactionPageHeader
//                 title="Transactions"
//                 isLoadingAccounts={loadingAccounts}
//                 userAccounts={userAccounts}
//                 allTransactions={allTransactions} // Pass full list for search
//                 onTransactionsChange={handleTransactionsChangeFromSearch} // Handler for search
//                 onFilterButtonClick={openFilterPopup} // Handler to open filter modal
//                 error={error}
//             />

//             {/* Error State */}
//             {!isLoading && error && (
//               <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30 max-w-2xl mx-auto">
//                 <strong>Error:</strong> {error}
//               </div>
//             )}

//             {/* Transaction List Area (Use SHARED component) */}
//             {!isLoading && !error && (
//                 <TransactionList
//                     inProgressTransactions={inProgressTransactions}
//                     groupedProcessedTransactions={groupedProcessedTransactions}
//                     filtersAreActive={filtersAreActive}
//                     onClearFiltersClick={handleClearAllFilters} // Pass clear handler
//                     hasAnyTransactions={hasAnyTransactions}
//                     showEmptyState={showEmptyState}
//                 />
//             )}

//           </div> {/* End Transaction-Page container */}
//         </section> {/* End Transaction-Wrapper section */}

//         {/* --- FILTER MODAL (Use SHARED component) --- */}
//         <FilterModal
//             isOpen={isFilterOpen}
//             onClose={closeFilterPopup}
//             onApply={handleApplyFiltersFromModal}
//             onClearAll={handleClearAllFilters}
//             initialFilters={appliedFilters}
//             userAccounts={userAccounts} // Pass accounts (Balance filter IS used here)
//             isMobile={isMobile}
//             // hideBalanceFilter={false} // Default is false, no need to set explicitly
//         />
//       </> // End Fragment
//     );
// };

// export default TransactionsPage;



// // frontend/src/app/dashboard/transactions/page.tsx
// "use client";

// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import { parseISO } from "date-fns";

// // New/Updated Sub Components (assuming these are within 'transactions' or a shared 'components' folder)
// import TransactionPageHeader from "./TransactionPageHeader"; // Check path relative to this file
// import TransactionList from "./TransactionList";       // Check path for SHARED component
// import FilterModal, { FilterSettings } from "./FilterModal"; // Check path for SHARED component
// import { Skeleton } from "@/components/ui/skeleton";

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path as needed
// import paymentService from "../../../services/payment"; // Adjust path as needed
// import transferService from "../../../services/transfer"; // Adjust path as needed
// import accountService from "../../../services/account"; // Adjust path as needed

// // Types
// import { Transaction, TransactionStatus } from "@/types/transaction";
// import { Account } from "@/types/account";

// // Define a type for potential API errors
// interface ApiError extends Error {
//     response?: { data?: { message?: string; }; status?: number; };
// }

// type AppliedFilters = FilterSettings; // Use the type exported by FilterModal

// // --- Helper Function ---
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         const isoDate = parseISO(dateString); if (!isNaN(isoDate.getTime())) return isoDate;
//     } catch { /* Ignore */ }
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//              const date = new Date(Date.UTC(year, month, day));
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) return date;
//         }
//     }
//     try { const genericDate = new Date(dateString); if (!isNaN(genericDate.getTime())) return genericDate; } catch { /* Ignore */ }
//     console.warn("Could not parse date string:", dateString); return null;
// }

// // --- Skeleton Loading Component ---
// const TransactionsPageSkeleton: React.FC = () => (
//     <section className="Transaction-Page pb-8 md:pb-10 animate-pulse">
//         <div className="container mx-auto">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 mb-6 border-b border-gray-200 dark:border-gray-700">
//                  <Skeleton className="h-8 w-48 rounded-md" />
//                  <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
//                      <Skeleton className="h-10 w-full sm:w-64 rounded-full" />
//                      <Skeleton className="h-10 w-32 rounded-full" />
//                  </div>
//             </div>
//             <div className="space-y-6">
//                 <div> <Skeleton className="h-6 w-3/4 mb-3 rounded" /> <Skeleton className="h-20 w-full rounded-lg" /> </div>
//                 <div> <Skeleton className="h-6 w-1/2 mb-3 rounded" /> <Skeleton className="h-20 w-full rounded-lg" /> <Skeleton className="h-20 w-full rounded-lg mt-2" /> </div>
//             </div>
//         </div>
//     </section>
// );

// // --- Main Transactions Page Component ---
// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//     const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);
//     const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
//         selectedRecipients: [], selectedDirection: 'all', selectedStatus: null,
//         selectedBalance: [], fromDate: undefined, toDate: undefined,
//     });

//     // --- Data Fetching ---
//     const fetchData = useCallback(async () => {
//         if (!token) { setError("Authentication required."); setLoadingTransactions(false); setLoadingAccounts(false); return; }
//         setLoadingTransactions(true); setLoadingAccounts(true); setError(null);
//         setAllTransactions([]); setDisplayTransactions([]); setUserAccounts([]);
//         try {
//             const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//                 accountService.getUserAccounts(token)
//             ]);

//             const mappedPayments: Transaction[] = paymentsData.map(p => ({
//                 _id: p._id, type: "Add Money", amountToAdd: p.amountToAdd, amountToPay: p.amountToPay,
//                 balanceCurrency: p.balanceCurrency, payInCurrency: p.payInCurrency,
//                 account: p.account, createdAt: p.createdAt, updatedAt: p.updatedAt,
//                 status: (p.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                 name: `From ${p.payInCurrency?.code || 'source'}`,
//                 sendAmount: undefined, receiveAmount: undefined, sendCurrency: undefined, receiveCurrency: undefined,
//                 recipient: undefined, sourceAccountId: undefined,
//             }));

//             const mappedTransfers: Transaction[] = transfersData.map(t => ({
//                 _id: t._id, type: "Send Money",
//                 name: (typeof t.recipient === 'object' && t.recipient !== null) ? t.recipient.accountHolderName ?? 'Recipient' : 'Recipient',
//                 sendAmount: t.sendAmount, receiveAmount: t.receiveAmount,
//                 sendCurrency: t.sendCurrency, receiveCurrency: t.receiveCurrency,
//                 createdAt: t.createdAt, updatedAt: t.updatedAt,
//                 status: (t.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                 recipient: t.recipient,
//                 sourceAccountId: typeof t.sourceAccount === 'string' ? t.sourceAccount : t.sourceAccount?._id,
//                  amountToAdd: undefined, amountToPay: undefined, balanceCurrency: undefined, payInCurrency: undefined, account: undefined,
//             }));

//             const combined = [...mappedPayments, ...mappedTransfers].sort((a, b) => {
//                  const dA = a.updatedAt || a.createdAt; const dB = b.updatedAt || b.createdAt;
//                  if (!dA && !dB) return 0; if (!dA) return 1; if (!dB) return -1;
//                  try { return new Date(dB).getTime() - new Date(dA).getTime(); } catch { return 0; }
//             });

//             setAllTransactions(combined);
//             // setDisplayTransactions(combined); // Let useEffect handle initial display based on filters
//             setUserAccounts(accountsData);
//         } catch (err: unknown) {
//             console.error("Data fetch error:", err);
//             let errorMessage = "Failed to fetch transaction data.";
//             const apiError = err as ApiError; if (apiError.response?.data?.message) errorMessage = apiError.response.data.message; else if (err instanceof Error) errorMessage = err.message;
//             setError(errorMessage);
//         } finally {
//             setLoadingTransactions(false); setLoadingAccounts(false);
//         }
//     }, [token]);

//     useEffect(() => { fetchData(); }, [fetchData]);

//      // --- Centralized Filter Application Logic ---
//      const runFilters = useCallback((transactionsToFilter: Transaction[], filters: AppliedFilters): Transaction[] => {
//         let tempFiltered = [...transactionsToFilter];

//         // Direction Filter
//         if (filters.selectedDirection !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                  (filters.selectedDirection === 'add' && tx.type === 'Add Money') ||
//                  (filters.selectedDirection === 'send' && tx.type === 'Send Money')
//              );
//         }
//         // Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//              tempFiltered = tempFiltered.filter(tx => {
//                   const txStatus = tx.status?.toLowerCase() as TransactionStatus | undefined;
//                   if (!txStatus) return false;
//                   if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                   if (statusFilter === 'in process') return ['pending', 'processing', 'in progress'].includes(txStatus);
//                   if (statusFilter === 'completed') return txStatus === 'completed';
//                   if (statusFilter === 'cancelled' || statusFilter === 'canceled') return ['canceled', 'cancelled'].includes(txStatus);
//                   if (statusFilter === 'failed') return txStatus === 'failed';
//                   if (statusFilter === 'pending') return txStatus === 'pending';
//                   if (statusFilter === 'processing') return txStatus === 'processing';
//                   return false;
//               });
//         }
//         // Balance (Currency) Filter
//         if (filters.selectedBalance.length > 0) {
//             const balanceCodes = new Set(filters.selectedBalance);
//             tempFiltered = tempFiltered.filter(tx => {
//                 if (tx.type === 'Add Money') return tx.balanceCurrency?.code && balanceCodes.has(tx.balanceCurrency.code);
//                 if (tx.type === 'Send Money') return tx.sendCurrency?.code && balanceCodes.has(tx.sendCurrency.code);
//                 return false;
//             });
//         }
//         // Recipient Filter
//         if (filters.selectedRecipients.length > 0) {
//             const recipientIds = new Set(filters.selectedRecipients.map(String));
//             tempFiltered = tempFiltered.filter(tx => {
//                 if (tx.type !== 'Send Money' || !tx.recipient) return false;
//                 const currentRecipientId = typeof tx.recipient === 'object' && tx.recipient !== null
//                     ? tx.recipient._id : typeof tx.recipient === 'string' ? tx.recipient : null;
//                  return currentRecipientId !== null && recipientIds.has(String(currentRecipientId));
//             });
//         }
//         // Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);
//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;
//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch { return false; }
//             });
//         }
//         // Sort results
//         tempFiltered.sort((a, b) => {
//             const dA = a.updatedAt || a.createdAt; const dB = b.updatedAt || b.createdAt;
//             if (!dA && !dB) return 0; if (!dA) return 1; if (!dB) return -1;
//             try { return new Date(dB).getTime() - new Date(dA).getTime(); } catch { return 0; }
//         });

//         return tempFiltered; // Return the filtered list

//     }, []); // No dependencies needed

//     // --- Effect to run filters when base data or filters change ---
//     useEffect(() => {
//         // Apply filters to the full transaction list whenever it changes or filters change
//         const filtered = runFilters(allTransactions, appliedFilters);
//         setDisplayTransactions(filtered);
//     }, [allTransactions, appliedFilters, runFilters]);

//     // --- Callback from Search Component ---
//     const handleTransactionsChangeFromSearch = useCallback((searchResults: Transaction[]) => {
//         // Search provides a subset of `allTransactions`. Apply current filters to THIS subset.
//         const filteredFromSearch = runFilters(searchResults, appliedFilters);
//         setDisplayTransactions(filteredFromSearch); // Update display list
//     }, [runFilters, appliedFilters]);

//     // --- Filter Modal Control ---
//     const openFilterPopup = () => setIsFilterOpen(true);
//     const closeFilterPopup = () => setIsFilterOpen(false);

//     // --- Resize detection for modal animation ---
//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 640); handleResize();
//         window.addEventListener("resize", handleResize); return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // --- Apply and Clear Filter Handlers ---
//     const handleApplyFiltersFromModal = useCallback((filtersFromModal: AppliedFilters) => {
//         setAppliedFilters(filtersFromModal); // Update state, useEffect will trigger re-filtering
//         closeFilterPopup();
//     }, []);

//     const handleClearAllFilters = useCallback(() => {
//         const clearedFilters: AppliedFilters = {
//             selectedRecipients: [], selectedDirection: "all", selectedStatus: null,
//             selectedBalance: [], fromDate: undefined, toDate: undefined,
//         };
//         setAppliedFilters(clearedFilters); // Update state, useEffect will trigger re-filtering
//         if (isFilterOpen) closeFilterPopup();
//     }, [isFilterOpen]);


//     // --- Transaction Grouping Logic (using displayTransactions) ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         const inProgress = displayTransactions.filter(tx => ['pending', 'processing', 'in progress'].includes(tx.status?.toLowerCase() ?? ''));
//         const processed = displayTransactions.filter(tx => ['completed', 'canceled', 'cancelled', 'failed'].includes(tx.status?.toLowerCase() ?? ''));

//         const grouped = processed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
//             const dateStr = tx.updatedAt || tx.createdAt;
//             let dateKey = 'Unknown Date';
//             if (dateStr) { try { dateKey = new Date(dateStr).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" }); } catch { dateKey = 'Invalid Date'; } }
//             if (!groups[dateKey]) groups[dateKey] = [];
//             groups[dateKey].push(tx); return groups;
//         }, {});

//         // Sort groups by date
//         const sortedDateKeys = Object.keys(grouped).sort((a, b) => {
//              if (a === 'Unknown Date' || a === 'Invalid Date') return 1;
//              if (b === 'Unknown Date' || b === 'Invalid Date') return -1;
//              try { return new Date(b).getTime() - new Date(a).getTime(); }
//              catch { return 0; }
//         });
//         const sortedGroupedTransactions: { [date: string]: Transaction[] } = {};
//         sortedDateKeys.forEach(key => { sortedGroupedTransactions[key] = grouped[key]; });

//         // Sort in-progress separately (already sorted by runFilters, but good to be explicit)
//         inProgress.sort((a, b) => {
//              const dA = a.updatedAt || a.createdAt; const dB = b.updatedAt || b.createdAt;
//              if (!dA && !dB) return 0; if (!dA) return 1; if (!dB) return -1;
//              try { return new Date(dB).getTime() - new Date(dA).getTime(); } catch { return 0; }
//         });


//         return { inProgressTransactions: inProgress, groupedProcessedTransactions: sortedGroupedTransactions };
//     }, [displayTransactions]);


//     // --- Render Logic ---
//     const isLoading = loadingTransactions || loadingAccounts;
//     const hasAnyTransactions = allTransactions.length > 0; // Base check on unfiltered data
//     const showEmptyState = !isLoading && !error && displayTransactions.length === 0; // Check filtered data for empty state
//     const filtersAreActive = useMemo(() =>
//         appliedFilters.selectedRecipients.length > 0 ||
//         appliedFilters.selectedDirection !== "all" ||
//         appliedFilters.selectedStatus !== null ||
//         appliedFilters.selectedBalance.length > 0 ||
//         !!appliedFilters.fromDate || !!appliedFilters.toDate,
//         [appliedFilters]
//     );


//     if (isLoading) return <TransactionsPageSkeleton />;

//     return (
//       <>
//         <section className="Transaction-Wrapper pb-8 md:pb-10">
//           <div className="Transaction-Page container mx-auto">

//             <TransactionPageHeader
//                 title="Transactions"
//                 isLoadingAccounts={loadingAccounts}
//                 userAccounts={userAccounts}
//                 allTransactions={allTransactions} // Pass full list for search
//                 onTransactionsChange={handleTransactionsChangeFromSearch}
//                 onFilterButtonClick={openFilterPopup}
//                 error={error}
//             />

//             {!isLoading && error && (
//               <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30 max-w-2xl mx-auto">
//                 <strong>Error:</strong> {error}
//               </div>
//             )}

//             {!isLoading && !error && (
//                 <TransactionList
//                     inProgressTransactions={inProgressTransactions}
//                     groupedProcessedTransactions={groupedProcessedTransactions}
//                     filtersAreActive={filtersAreActive}
//                     onClearFiltersClick={handleClearAllFilters}
//                     hasAnyTransactions={hasAnyTransactions} // Use unfiltered check for "no transactions ever" message
//                     showEmptyState={showEmptyState} // Use filtered check for "no results" message
//                     // currencyCode is not strictly needed here as transactions page shows multiple currencies
//                 />
//             )}

//           </div>
//         </section>

//         <FilterModal
//             isOpen={isFilterOpen}
//             onClose={closeFilterPopup}
//             onApply={handleApplyFiltersFromModal}
//             onClearAll={handleClearAllFilters}
//             initialFilters={appliedFilters}
//             userAccounts={userAccounts} // Pass accounts for Balance filter
//             isMobile={isMobile}
//             hideBalanceFilter={false} // Show balance filter on this page
//         />
//       </>
//     );
// };

// export default TransactionsPage;

// frontend/src/app/dashboard/transactions/page.tsx
"use client";

import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { parseISO } from "date-fns";

// Components (adjust paths as needed, assuming shared components)
import TransactionPageHeader from "./TransactionPageHeader"; // Specific header for this page
import TransactionList from "./TransactionList"; // SHARED component
import FilterModal, { FilterSettings } from "./FilterModal"; // SHARED component
import { Skeleton } from "@/components/ui/skeleton";

// Hooks & Services
import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
import paymentService, { PaymentDetailsResponse } from "../../../services/payment"; // Adjust path
import transferService, { TransferDetailsResponse } from "../../../services/transfer"; // Adjust path
import accountService from "../../../services/account"; // Adjust path

// Types
import { Transaction, TransactionStatus, Currency } from "@/types/transaction"; // Ensure Currency is imported
import { Account } from "@/types/account";

// Define a type for potential API errors
interface ApiError extends Error {
    response?: { data?: { message?: string; }; status?: number; };
}

type AppliedFilters = FilterSettings; // Use the type exported by FilterModal

// --- Helper Function ---
function parseDateString(dateString: string | undefined): Date | null {
    if (!dateString) return null;
    try {
        const isoDate = parseISO(dateString); if (!isNaN(isoDate.getTime())) return isoDate;
    } catch { /* Ignore */ }
    const parts = dateString.split('-');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
             const date = new Date(Date.UTC(year, month, day));
             if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) return date;
        }
    }
    try { const genericDate = new Date(dateString); if (!isNaN(genericDate.getTime())) return genericDate; } catch { /* Ignore */ }
    console.warn("Could not parse date string:", dateString); return null;
}

// --- Skeleton Loading Component ---
const TransactionsPageSkeleton: React.FC = () => (
    <section className="Transaction-Page pb-8 md:pb-10 animate-pulse">
        <div className="container mx-auto px-4"> {/* Added padding */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 mb-6 border-b border-gray-200 dark:border-gray-700 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background"> {/* Mimic sticky header */}
                 <Skeleton className="h-8 w-48 rounded-md" />
                 <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
                     <Skeleton className="h-10 w-full sm:w-64 rounded-full" />
                     <Skeleton className="h-10 w-32 rounded-full" />
                 </div>
            </div>
            <div className="space-y-6 mt-6"> {/* Added margin top */}
                {/* Mimic grouped list */}
                <div> <Skeleton className="h-6 w-32 mb-3 rounded" /> <Skeleton className="h-20 w-full rounded-lg" /> </div>
                <div> <Skeleton className="h-6 w-40 mb-3 rounded" /> <Skeleton className="h-20 w-full rounded-lg" /> <Skeleton className="h-20 w-full rounded-lg mt-2" /> </div>
                 <div> <Skeleton className="h-6 w-36 mb-3 rounded" /> <Skeleton className="h-20 w-full rounded-lg" /> </div>
            </div>
        </div>
    </section>
);

// --- Main Transactions Page Component ---
const TransactionsPage: React.FC = () => {
    // --- State Declarations ---
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
    const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
    const [userAccounts, setUserAccounts] = useState<Account[]>([]);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [loadingAccounts, setLoadingAccounts] = useState(true); // Keep separate loading for accounts
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
        selectedRecipients: [], selectedDirection: 'all', selectedStatus: null,
        selectedBalance: [], fromDate: undefined, toDate: undefined,
    });

    // Ref to prevent setting state on unmounted component
    const isMounted = useRef(true);
    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);


    // --- Data Fetching ---
    const fetchData = useCallback(async () => {
        if (!token) {
            if (isMounted.current) {
                setError("Authentication required.");
                setLoadingTransactions(false);
                setLoadingAccounts(false);
            }
            return;
        }

        // Reset states before fetching
        if (isMounted.current) {
            setLoadingTransactions(true);
            setLoadingAccounts(true);
            setError(null);
            // Resetting arrays might cause brief flicker, consider conditional reset or skeleton handling
            // setAllTransactions([]);
            // setDisplayTransactions([]);
            // setUserAccounts([]);
        }

        try {
            // Fetch all data concurrently
            const [paymentsResult, transfersResult, accountsResult] = await Promise.allSettled([
                paymentService.getUserPayments(token),
                transferService.getUserTransfers(token),
                accountService.getUserAccounts(token)
            ]);

            let combined: Transaction[] = [];
            let fetchedAccounts: Account[] = [];
            let fetchError: string | null = null;

            // Process Payments
            if (paymentsResult.status === 'fulfilled') {
                 const mappedPayments: Transaction[] = paymentsResult.value
                     .map((p: PaymentDetailsResponse): Transaction | null => {
                         if (!p._id || !p.status || p.amountToAdd === undefined) return null; // Basic validation
                         const balCurrency = p.balanceCurrency as Currency | undefined;
                         const payInCurr = p.payInCurrency as Currency | undefined;
                         const accountObj = typeof p.accountId === 'string' ? { _id: p.accountId } : p.account;

                         return {
                             _id: p._id, type: "Add Money", amountToAdd: p.amountToAdd, amountToPay: p.amountToPay,
                             balanceCurrency: balCurrency, payInCurrency: payInCurr,
                             account: accountObj, createdAt: p.createdAt, updatedAt: p.updatedAt,
                             status: (p.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
                             // Add Money specific fields initialized to undefined for type consistency
                             name: undefined, sendAmount: undefined, sendCurrency: undefined, receiveAmount: undefined,
                             receiveCurrency: undefined, recipient: undefined, sourceAccountId: undefined,
                         };
                     })
                     .filter((tx): tx is Transaction => tx !== null); // Filter out invalid entries
                 combined = [...combined, ...mappedPayments];
             } else {
                 console.error("Payments fetch failed:", paymentsResult.reason);
                 fetchError = "Failed to load payment history.";
             }

            // Process Transfers
            if (transfersResult.status === 'fulfilled') {
                 const mappedTransfers: Transaction[] = transfersResult.value
                     .map((t: TransferDetailsResponse): Transaction | null => {
                          if (!t._id || !t.status || t.sendAmount === undefined) return null; // Basic validation
                         const sendCurr = t.sendCurrency as Currency | undefined;
                         const receiveCurr = t.receiveCurrency as Currency | undefined;
                          const sourceAccId = typeof t.sourceAccount === 'string' ? t.sourceAccount : t.sourceAccount?._id;

                         return {
                             _id: t._id, type: "Send Money",
                             name: (typeof t.recipient === 'object' && t.recipient !== null) ? t.recipient.accountHolderName ?? 'Recipient' : 'Recipient',
                             sendAmount: t.sendAmount, receiveAmount: t.receiveAmount,
                             sendCurrency: sendCurr, receiveCurrency: receiveCurr,
                             createdAt: t.createdAt, updatedAt: t.updatedAt,
                             status: (t.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
                             recipient: t.recipient, sourceAccountId: sourceAccId,
                             // Send Money specific fields initialized to undefined
                              amountToAdd: undefined, amountToPay: undefined, balanceCurrency: undefined, payInCurrency: undefined, account: undefined,
                         };
                     })
                      .filter((tx): tx is Transaction => tx !== null);
                  combined = [...combined, ...mappedTransfers];
             } else {
                 console.error("Transfers fetch failed:", transfersResult.reason);
                 if (!fetchError) fetchError = "Failed to load transfer history.";
             }

            // Process Accounts
            if (accountsResult.status === 'fulfilled') {
                fetchedAccounts = accountsResult.value;
            } else {
                 console.error("Accounts fetch failed:", accountsResult.reason);
                 // Don't necessarily set the main error, maybe just log or handle separately
                 // if (!fetchError) fetchError = "Failed to load account details.";
             }

            // Sort combined transactions
            combined.sort((a, b) => {
                 const dA = a.updatedAt || a.createdAt; const dB = b.updatedAt || b.createdAt;
                 if (!dA && !dB) return 0; if (!dA) return 1; if (!dB) return -1;
                 try { return new Date(dB).getTime() - new Date(dA).getTime(); } catch { return 0; }
            });

            // Update state only if component is still mounted
            if (isMounted.current) {
                setAllTransactions(combined);
                setUserAccounts(fetchedAccounts);
                setError(fetchError); // Set error if any fetch failed
            }

        } catch (err: unknown) { // Catch any unexpected errors during Promise.all or mapping
            console.error("Unexpected data fetch error:", err);
            let errorMessage = "Failed to fetch transaction data.";
            const apiError = err as ApiError; if (apiError.response?.data?.message) errorMessage = apiError.response.data.message; else if (err instanceof Error) errorMessage = err.message;
             if (isMounted.current) {
                setError(errorMessage);
             }
        } finally {
            // Ensure loading states are turned off if mounted
             if (isMounted.current) {
                setLoadingTransactions(false);
                setLoadingAccounts(false);
             }
        }
    }, [token]); // useCallback depends only on token

    // Effect to run fetch data
    useEffect(() => {
        fetchData();
    }, [fetchData]); // Runs when fetchData (i.e., token) changes


     // --- Centralized Filter Application Logic ---
     // (Using useCallback to ensure stable function reference unless dependencies change - none here)
     const runFilters = useCallback((transactionsToFilter: Transaction[], filters: AppliedFilters): Transaction[] => {
        let tempFiltered = [...transactionsToFilter];

        // Direction Filter
        if (filters.selectedDirection !== 'all') {
            tempFiltered = tempFiltered.filter(tx =>
                 (filters.selectedDirection === 'add' && tx.type === 'Add Money') ||
                 (filters.selectedDirection === 'send' && tx.type === 'Send Money')
             );
        }
        // Status Filter
        const statusFilter = filters.selectedStatus?.toLowerCase();
        if (statusFilter) {
             tempFiltered = tempFiltered.filter(tx => {
                  const txStatus = tx.status?.toLowerCase() as TransactionStatus | undefined;
                  if (!txStatus) return false;
                  // Expanded status mapping based on BalanceDetailPage logic
                  if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
                  if (statusFilter === 'in process') return ['pending', 'processing', 'in progress'].includes(txStatus);
                  if (statusFilter === 'completed') return txStatus === 'completed';
                  if (statusFilter === 'cancelled' || statusFilter === 'canceled') return ['canceled', 'cancelled'].includes(txStatus);
                  if (statusFilter === 'failed') return txStatus === 'failed';
                   // Allow filtering by specific statuses if needed, though covered by 'in process' etc.
                   if (statusFilter === 'pending') return txStatus === 'pending';
                   if (statusFilter === 'processing') return txStatus === 'processing';
                  return false;
              });
        }
        // Balance (Currency) Filter - Crucial for this page
        if (filters.selectedBalance.length > 0) {
            const balanceCodes = new Set(filters.selectedBalance);
            tempFiltered = tempFiltered.filter(tx => {
                // Check the relevant currency based on transaction type
                const currencyToCheck = tx.type === 'Add Money' ? tx.balanceCurrency?.code : tx.sendCurrency?.code;
                return currencyToCheck && balanceCodes.has(currencyToCheck);
            });
        }
        // Recipient Filter
        if (filters.selectedRecipients.length > 0) {
            const recipientIds = new Set(filters.selectedRecipients.map(String));
            tempFiltered = tempFiltered.filter(tx => {
                if (tx.type !== 'Send Money' || !tx.recipient) return false;
                // Handle recipient being string (ID) or object with _id
                const currentRecipientId = typeof tx.recipient === 'object' && tx.recipient !== null
                    ? tx.recipient._id : typeof tx.recipient === 'string' ? tx.recipient : null;
                 return currentRecipientId !== null && recipientIds.has(String(currentRecipientId));
            });
        }
        // Date Filter
        const fromDateObj = parseDateString(filters.fromDate);
        const toDateObj = parseDateString(filters.toDate);
        if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
        if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);
        if (fromDateObj || toDateObj) {
            tempFiltered = tempFiltered.filter(tx => {
                 const transactionDateStr = tx.updatedAt || tx.createdAt;
                 if (!transactionDateStr) return false;
                 try {
                     const transactionDateObj = new Date(transactionDateStr);
                     if (isNaN(transactionDateObj.getTime())) return false; // Invalid date
                     let include = true;
                     if (fromDateObj && transactionDateObj < fromDateObj) include = false;
                     if (toDateObj && transactionDateObj > toDateObj) include = false;
                     return include;
                 } catch { return false; } // Catch potential date parsing errors
            });
        }
        // Sort results (already sorted by fetch, but re-sort after filtering if needed or desired)
        // Keeping the sort here ensures consistency if filtering logic changes order
        tempFiltered.sort((a, b) => {
            const dA = a.updatedAt || a.createdAt; const dB = b.updatedAt || b.createdAt;
            if (!dA && !dB) return 0; if (!dA) return 1; if (!dB) return -1;
            try { return new Date(dB).getTime() - new Date(dA).getTime(); } catch { return 0; }
        });

        return tempFiltered; // Return the filtered list

    }, []); // No dependencies, it's a pure function based on inputs

    // --- Effect to run filters when base data or filters change ---
    useEffect(() => {
        // This effect is responsible ONLY for updating the displayed list based on filters
        const filtered = runFilters(allTransactions, appliedFilters);
         if (isMounted.current) { // Check mount status before setting state
             setDisplayTransactions(filtered);
         }
    }, [allTransactions, appliedFilters, runFilters]); // Re-run when base data or filters change

    // --- Callback from Search Component ---
    // Search operates on the `allTransactions` list and returns a subset.
    // We then apply the *current* filters to *that subset*.
    const handleTransactionsChangeFromSearch = useCallback((searchResults: Transaction[]) => {
        const filteredFromSearch = runFilters(searchResults, appliedFilters);
         if (isMounted.current) {
            setDisplayTransactions(filteredFromSearch); // Update display list
         }
    }, [runFilters, appliedFilters]); // Depends on filter function and current filters

    // --- Filter Modal Control ---
    const openFilterPopup = () => setIsFilterOpen(true);
    const closeFilterPopup = () => setIsFilterOpen(false);

    // --- Resize detection for modal animation ---
    useEffect(() => {
        const handleResize = () => { if (isMounted.current) setIsMobile(window.innerWidth < 640); };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Runs once on mount

    // --- Apply and Clear Filter Handlers ---
    const handleApplyFiltersFromModal = useCallback((filtersFromModal: AppliedFilters) => {
        setAppliedFilters(filtersFromModal); // Update state, the useEffect above will trigger re-filtering
        closeFilterPopup();
    }, []); // No dependencies needed

    const handleClearAllFilters = useCallback(() => {
        const clearedFilters: AppliedFilters = {
            selectedRecipients: [], selectedDirection: "all", selectedStatus: null,
            selectedBalance: [], fromDate: undefined, toDate: undefined,
        };
        setAppliedFilters(clearedFilters); // Update state, useEffect will trigger re-filtering
        if (isFilterOpen) closeFilterPopup(); // Close modal if open
    }, [isFilterOpen]); // Depends on whether modal is open for closing logic


    // --- Transaction Grouping Logic (using displayTransactions) ---
    const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
        // Filter displayed transactions into groups
        const inProgress = displayTransactions.filter(tx => ['pending', 'processing', 'in progress'].includes(tx.status?.toLowerCase() ?? ''));
        const processed = displayTransactions.filter(tx => ['completed', 'canceled', 'cancelled', 'failed'].includes(tx.status?.toLowerCase() ?? ''));

        // Group processed transactions by date
        const grouped = processed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
            const dateStr = tx.updatedAt || tx.createdAt;
            let dateKey = 'Unknown Date'; // Fallback key
            if (dateStr) {
                try {
                    // Use a consistent, sortable date format if needed, or locale string for display
                    dateKey = new Date(dateStr).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" });
                } catch { dateKey = 'Invalid Date'; } // Handle invalid date strings
            }
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(tx); return groups;
        }, {});

        // Sort the date groups (keys) chronologically (most recent first)
        const sortedDateKeys = Object.keys(grouped).sort((a, b) => {
             if (a === 'Unknown Date' || a === 'Invalid Date') return 1; // Put unknown/invalid dates last
             if (b === 'Unknown Date' || b === 'Invalid Date') return -1;
             try {
                 // Compare the dates represented by the keys
                 return new Date(b).getTime() - new Date(a).getTime();
             }
             catch { return 0; } // Fallback for safety
        });

        // Create the final sorted grouped object
        const sortedGroupedTransactions: { [date: string]: Transaction[] } = {};
        sortedDateKeys.forEach(key => { sortedGroupedTransactions[key] = grouped[key]; });

        // Sort in-progress separately (already sorted by runFilters, but good practice)
        inProgress.sort((a, b) => {
             const dA = a.updatedAt || a.createdAt; const dB = b.updatedAt || b.createdAt;
             if (!dA && !dB) return 0; if (!dA) return 1; if (!dB) return -1;
             try { return new Date(dB).getTime() - new Date(dA).getTime(); } catch { return 0; }
        });

        return { inProgressTransactions: inProgress, groupedProcessedTransactions: sortedGroupedTransactions };
    }, [displayTransactions]); // Recalculate only when the displayed list changes


    // --- Render Logic ---
    const isLoading = loadingTransactions || loadingAccounts; // Combined loading state
    const hasAnyTransactions = allTransactions.length > 0; // Base check on *unfiltered* data
    const showEmptyState = !isLoading && !error && displayTransactions.length === 0; // Check *filtered* data for empty state message
    // Determine if any filters are *actually* active
    const filtersAreActive = useMemo(() =>
        appliedFilters.selectedRecipients.length > 0 ||
        appliedFilters.selectedDirection !== "all" ||
        appliedFilters.selectedStatus !== null ||
        appliedFilters.selectedBalance.length > 0 || // Include balance filter check
        !!appliedFilters.fromDate || !!appliedFilters.toDate,
        [appliedFilters]
    );


    if (isLoading && !hasAnyTransactions) { // Show skeleton only on initial load when no data exists yet
        return <TransactionsPageSkeleton />;
    }

    return (
      <>
        <section className="Transaction-Wrapper pb-8 md:pb-10">
          {/* Use container for padding */}
          <div className="Transaction-Page container mx-auto px-4">

            {/* Use the specific header for this page */}
            <TransactionPageHeader
                title="Transactions"
                // Pass loading state specifically for accounts if needed by header
                isLoadingAccounts={loadingAccounts}
                userAccounts={userAccounts} // Pass accounts for potential header logic
                allTransactions={allTransactions} // Pass full list for search in TransactionActions
                onTransactionsChange={handleTransactionsChangeFromSearch} // Pass search handler
                onFilterButtonClick={openFilterPopup} // Pass filter open handler
                error={error} // Pass error for potential display in header
            />

            {/* Display error message prominently if it exists */}
            {!isLoading && error && (
              <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30 max-w-2xl mx-auto mt-6">
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Render the list only if not loading initial data OR if there's no error */}
            {/* This prevents showing an empty list briefly before loading finishes */}
            {!error && (
                <TransactionList
                    inProgressTransactions={inProgressTransactions}
                    groupedProcessedTransactions={groupedProcessedTransactions}
                    filtersAreActive={filtersAreActive}
                    onClearFiltersClick={handleClearAllFilters}
                    hasAnyTransactions={hasAnyTransactions} // Use unfiltered check for "no transactions ever" message
                    showEmptyState={showEmptyState} // Use filtered check for "no results" message
                    // currencyCode is NOT passed here, as the list handles multiple currencies
                    // balanceId is also NOT relevant here
                />
            )}

          </div>
        </section>

        {/* Render the Filter Modal */}
        {/* Ensure FilterModal has defensive checks for userAccounts (added previously) */}
        <FilterModal
            isOpen={isFilterOpen}
            onClose={closeFilterPopup}
            onApply={handleApplyFiltersFromModal}
            onClearAll={handleClearAllFilters}
            initialFilters={appliedFilters} // Pre-fill with current filters
            userAccounts={userAccounts} // Pass accounts for Balance filter option
            isMobile={isMobile}
            hideBalanceFilter={false} // IMPORTANT: Show balance filter on this page
        />
      </>
    );
};

export default TransactionsPage;