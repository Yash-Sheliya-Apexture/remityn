// // pages/transactions.tsx
// import React from "react";
// import { AiOutlineDownload } from "react-icons/ai";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { LuSettings2 } from "react-icons/lu";
// import { LiaDownloadSolid } from "react-icons/lia";

// interface Transaction {
//   id: string;
//   type: "Add Money" | "Send Money";
//   name?: string;
//   description: string;
//   date?: string;
//   amount: number;
//   currency: string;
// }

// const defaultTransactions: Transaction[] = [
//   {
//     id: "1",
//     type: "Add Money",
//     description: "Waiting for your money", // Example of in process "Add Money"
//     amount: 2210,
//     currency: "EUR",
//   },
//   {
//     id: "2",
//     type: "Add Money",
//     description: "Added by you", // Example of in complete "Add Money"
//     amount: 2210,
//     currency: "USD",
//   },
// ];

// const Transactions: React.FC = () => {
//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>
//             {/* Search, Filters, Download */}
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="w-full border border-gray-300 rounded-full py-1 px-3"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <button className="bg-primary text-secondary font-medium py-1 px-4 rounded-full flex items-center">
//                   <LuSettings2 size={20} className="sm:mr-2 " />
//                   <span className="sm:block hidden">Filters</span>
//                 </button>
//                 <button className="bg-primary text-secondary font-medium py-1 px-4 rounded-full flex items-center">
//                   <LiaDownloadSolid size={20} className="sm:mr-2 " />
//                   <span className="sm:block hidden">Download</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//             {/* Transcation history */}
//           <div className="space-y-6">
//             <div>
//               {/* Dates of History */}
//               <h2 className="font-medium text-gray-500 mb-6">In progress</h2>
//               <div className="space-y-8">
//                 {defaultTransactions.map((transaction) => (
//                   <div key={transaction.id} className="">
//                     <div className="flex items-center gap-4">
//                       <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                         {transaction.type === "Add Money" ? (
//                           <LuPlus size={24} className="text-main" />
//                         ) : (
//                           <GoArrowUp size={24} className="text-main" />
//                         )}
//                       </div>
//                       <div className="flex justify-between w-full">
//                         <div>
//                           <h3 className="font-medium text-main">
//                             {transaction.type === "Add Money"
//                               ? `To your ${transaction.currency} balance` // Dynamic Currency Display
//                               : transaction.name}
//                           </h3>
//                           <p className="text-sm text-gray-500">
//                             {transaction.description}
//                           </p>
//                         </div>
//                         <div
//                           className={`font-medium ${
//                             transaction.type === "Add Money" &&
//                             transaction.description === "Added by you"
//                               ? "text-green-600" // Apply green color for completed Add Money
//                               : "text-main"
//                           }`}
//                         >
//                           {transaction.type === "Add Money" ? "+ " : "- "}
//                           {transaction.amount.toLocaleString(undefined, {
//                             minimumFractionDigits: 0,
//                             maximumFractionDigits: 2,
//                           })}{" "}
//                           {transaction.currency}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Add more transaction sections here if needed (e.g., Completed) */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Transactions;








// // PageSection/TransactionsPage.tsx
// import React from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { LuSettings2 } from "react-icons/lu";
// import { LiaDownloadSolid } from "react-icons/lia";

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

// const TransactionsPage: React.FC = () => {
//   // Filter in-process transactions
//   const inProcessTransactions = defaultTransactions.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   // Filter processed transactions
//   const processedTransactions = defaultTransactions.filter(
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
//         const date = new Date(transaction.processedDate).toLocaleDateString(undefined, {
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
            
//             {/* Search, Filters, Download */}
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="w-full border border-gray-300 rounded-full py-1 px-3"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <button className="bg-primary text-secondary font-medium py-1 px-4 rounded-full flex items-center">
//                   <LuSettings2 size={20} className="sm:mr-2 " />
//                   <span className="sm:block hidden">Filters</span>
//                 </button>
//                 <button className="bg-primary text-secondary font-medium py-1 px-4 rounded-full flex items-center">
//                   <LiaDownloadSolid size={20} className="sm:mr-2 " />
//                   <span className="sm:block hidden">Download</span>
//                 </button>
//               </div>
//             </div>
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
// import React from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { LuSettings2 } from "react-icons/lu";
// import { LiaDownloadSolid } from "react-icons/lia";
// import { Transaction, defaultTransactions } from "../../../../data/transactions"; // Import from data file


// const TransactionsPage: React.FC = () => {
//   // Filter in-process transactions
//   const inProcessTransactions = defaultTransactions.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   // Filter processed transactions
//   const processedTransactions = defaultTransactions.filter(
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
//         const date = new Date(transaction.processedDate).toLocaleDateString(undefined, {
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

//             {/* Search, Filters, Download */}
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="w-full border border-gray-300 rounded-full py-1 px-3"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <button className="bg-primary text-secondary font-medium py-1 px-4 rounded-full flex items-center">
//                   <LuSettings2 size={20} className="sm:mr-2 " />
//                   <span className="sm:block hidden">Filters</span>
//                 </button>
//                 <button className="bg-primary text-secondary font-medium py-1 px-4 rounded-full flex items-center">
//                   <LiaDownloadSolid size={20} className="sm:mr-2 " />
//                   <span className="sm:block hidden">Download</span>
//                 </button>
//               </div>
//             </div>
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









// PageSection/TransactionsPage.tsx
"use client"
import React, { useState, useCallback } from "react"; // Import useCallback
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
import { Transaction, defaultTransactions } from "../../../data/transactions"; // Import from data file
import TransactionActions from "./TransactionActions"; // Import TransactionActions component

const TransactionsPage: React.FC = () => {
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions); // State for filtered transactions

  // Use useCallback to memoize handleTransactionsChange
  const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
    setFilteredTransactions(newTransactions);
  }, []); // Empty dependency array because handleTransactionsChange doesn't depend on any variables from the component scope

  // Determine which transaction list to use for filtering in-process and processed: filteredTransactions or defaultTransactions (if no filter applied in Search component)
  const transactionsToFilter = filteredTransactions;


  // Filter in-process transactions
  const inProcessTransactions = transactionsToFilter.filter(
    (transaction) => transaction.status === "inProcess"
  );

  // Filter processed transactions
  const processedTransactions = transactionsToFilter.filter(
    (transaction) => transaction.status === "processed"
  );

  // Sort processed transactions by processedDate in descending order (latest date first)
  const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
    if (!a.processedDate || !b.processedDate) return 0;
    return new Date(b.processedDate).getTime() - new Date(a.processedDate).getTime();
  });

  // Group processed transactions by processedDate
  const groupedProcessedTransactions: { [date: string]: Transaction[] } =
    sortedProcessedTransactions.reduce(
      (groups: { [date: string]: Transaction[] }, transaction) => {
        if (!transaction.processedDate) {
          return groups;
        }
        const date = new Date(transaction.processedDate).toLocaleDateString('en-US', {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
      },
      {}
    );

  return (
    <section className="py-12">
      <div className="">
        <div className="container mx-auto">
          <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
            <h1 className="text-3xl font-semibold text-main">Transactions</h1>

            {/* Transaction Actions Component (Search, Filters, Download) */}
            <TransactionActions
              transactions={defaultTransactions} // Pass defaultTransactions to TransactionActions
              onTransactionsChange={handleTransactionsChange} // Pass callback to TransactionActions
            />
          </div>

          <div className="space-y-10">
            {/* In Progress Transactions Section */}
            {inProcessTransactions.length > 0 && (
              <div>
                <h2 className="font-medium text-gray-500 mb-6 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray-300 after:mt-1">In progress</h2>
                <div className="space-y-8">
                  {inProcessTransactions.map((transaction) => {
                    let description = transaction.description; // Initialize with existing or undefined
                    if (transaction.type === "Add Money") {
                      description = "Waiting for your money";
                    } else if (transaction.type === "Send Money") {
                      description = "Sending your money";
                    }
                    return (
                      <div key={transaction.id} className="">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
                            {transaction.type === "Add Money" ? (
                              <LuPlus size={24} className="text-main" />
                            ) : (
                              <GoArrowUp size={24} className="text-main" />
                            )}
                          </div>
                          <div className="flex justify-between w-full">
                            <div>
                              <h3 className="font-medium text-main">
                                {transaction.type === "Add Money"
                                  ? `To your ${transaction.currency} balance`
                                  : transaction.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {description}
                              </p>
                            </div>
                            <div className={`font-medium text-main`}>
                              {transaction.type === "Add Money" ? "+ " : "- "}
                              {transaction.amount.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              })}{" "}
                              {transaction.currency}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Transaction History Section (Processed Transactions) */}
            {Object.entries(groupedProcessedTransactions).length > 0 && (
              <div>
                <div className="space-y-10">
                  {Object.entries(groupedProcessedTransactions).map(
                    ([date, transactionsForDate]) => (
                      <div key={date}>
                        <h3 className="font-medium text-gray-500 mb-6 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray-300 after:mt-1">{date}</h3>
                        <div className="space-y-8">
                          {transactionsForDate.map((transaction) => {
                            let description = transaction.description; // Initialize with existing or undefined
                            if (transaction.type === "Add Money") {
                              description = "Added by you";
                            } else if (transaction.type === "Send Money") {
                              description = "Sent by you";
                            }
                            return (
                              <div key={transaction.id} className="">
                                <div className="flex items-center gap-4">
                                  <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
                                    {transaction.type === "Add Money" ? (
                                      <LuPlus size={24} className="text-main" />
                                    ) : (
                                      <GoArrowUp size={24} className="text-main" />
                                    )}
                                  </div>
                                  <div className="flex justify-between w-full">
                                    <div>
                                      <h3 className="font-medium text-main">
                                        {transaction.type === "Add Money"
                                          ? `To your ${transaction.currency} balance`
                                          : transaction.name}
                                      </h3>
                                      <p className="text-sm text-gray-500">
                                        {description}
                                      </p>
                                    </div>
                                    <div
                                      className={`font-medium ${
                                        transaction.type === "Add Money"
                                          ? "text-green-600"
                                          : "text-main"
                                      }`}
                                    >
                                      {transaction.type === "Add Money" ? "+ " : "- "}
                                      {transaction.amount.toLocaleString(undefined, {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 2,
                                      })}{" "}
                                      {transaction.currency}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* If no transactions of either type */}
            {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
              <div className="text-center text-gray-500 py-8">
                You don't have any transactions.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionsPage;