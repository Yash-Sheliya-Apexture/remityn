// // components/TransactionsSection.tsx
// import React from "react";
// import Link from "next/link";
// import { Transaction, defaultTransactions } from "../../../data/transactions"; // Import from data file
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// const TransactionsSection: React.FC = () => {
//   // Sort all transactions by date in descending order
//   const sortedTransactions = [...defaultTransactions].sort((a, b) => {
//     const dateA = a.processedDate ? new Date(a.processedDate) : new Date(a.date || "");
//     const dateB = b.processedDate ? new Date(b.processedDate) : new Date(b.date || "");
//     return dateB.getTime() - dateA.getTime();
//   });

//   // Get the latest 3 transactions
//   const latestTransactions = sortedTransactions.slice(0, 3);

//   return (
//     <section className="Transactions py-12">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-main">Transactions</h1>
//           <Link
//             href="dashboard/transactions"
//             className="text-secondary font-medium underline cursor-pointer"
//           >
//             See all
//           </Link>
//         </div>

//         {/* Latest 3 Transaction History */}
//         <div className="space-y-2">
//           {latestTransactions.map((transaction) => {
//             let description = transaction.description;
//             if (transaction.type === "Add Money") {
//               description = transaction.status === "completed" ? "Added by you" : "Waiting for your money";
//             } else if (transaction.type === "Send Money") {
//               description = transaction.status === "completed" ? "Sent by you" : "Sending your money";
//             }
//             return (
//               <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                     {transaction.type === "Add Money" ? (
//                       <LuPlus size={24} className="text-main" />
//                     ) : (
//                       <GoArrowUp size={24} className="text-main" />
//                     )}
//                   </div>
//                   <div className="flex justify-between w-full">
//                     <div>
//                       <h3 className="font-medium text-main">
//                         {transaction.type === "Add Money"
//                           ? `To your ${transaction.currency} balance`
//                           : transaction.name}
//                       </h3>
//                       <p className="text-sm text-gray-500">{description}</p>
//                     </div>
//                     <div
//                       className={`font-medium ${transaction.type === "Add Money" && transaction.status === "completed" ? "text-green-600" : "text-main"}`}
//                     >
//                       {transaction.type === "Add Money" ? "+ " : "- "}
//                       {transaction.amount.toLocaleString(undefined, {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 2,
//                       })}{" "}
//                       {transaction.currency}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default TransactionsSection;


// // components/MainDashBoardSection/TransactionsSection.tsx
// "use client"; // Required for hooks like useState, useEffect, useAuth

// import React, { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// import { useAuth } from "../../../hooks/useAuth"; // Adjust path if needed
// import paymentService from "../../../services/payment"; // Adjust path if needed
// import transferService from "../../../services/transfer"; // Adjust path if needed
// import { Transaction } from "@/types/transaction"; // Adjust path if needed

// const TransactionsSection: React.FC = () => {
//   const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   const fetchAndProcessTransactions = useCallback(async () => {
//     if (!token) {
//       setError("Not authenticated.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setLatestTransactions([]); // Clear previous data

//     try {
//       // Fetch both payments and transfers concurrently
//       const [paymentsData, transfersData] = await Promise.all([
//         paymentService.getUserPayments(token),
//         transferService.getUserTransfers(token),
//       ]);

//       // Map payments to the common Transaction structure
//       const mappedPayments: Transaction[] = paymentsData.map((payment) => ({
//         _id: payment._id,
//         type: "Add Money",
//         amountToAdd: payment.amountToAdd, // Amount relevant for display
//         balanceCurrency: payment.balanceCurrency, // For currency code
//         createdAt: payment.createdAt,
//         updatedAt: payment.updatedAt,
//         status: payment.status,
//         // Add other fields from Transaction type if needed, initialized appropriately
//         payInCurrency: payment.payInCurrency,
//         account: payment.account,
//         amountToPay: payment.amountToPay, // Keep if needed elsewhere, but amountToAdd is primary for display
//       }));

//       // Map transfers to the common Transaction structure
//       const mappedTransfers: Transaction[] = transfersData.map((transfer) => ({
//         _id: transfer._id,
//         type: "Send Money",
//         name:
//           typeof transfer.recipient === "object" && transfer.recipient !== null
//             ? transfer.recipient.accountHolderName
//             : "Recipient", // Use recipient name
//         sendAmount: transfer.sendAmount, // Amount relevant for display
//         sendCurrency: transfer.sendCurrency, // For currency code
//         createdAt: transfer.createdAt,
//         updatedAt: transfer.updatedAt,
//         status: transfer.status,
//         recipient: transfer.recipient, // Keep recipient details if needed
//         sourceAccountId: typeof transfer.sourceAccount === 'string' ? transfer.sourceAccount : transfer.sourceAccount?._id,
//         // Add other fields from Transaction type if needed
//         receiveAmount: transfer.receiveAmount,
//         receiveCurrency: transfer.receiveCurrency,
//       }));

//       // Combine both types of transactions
//       const allTransactions = [...mappedPayments, ...mappedTransfers];

//       // Sort all transactions by date (use updatedAt falling back to createdAt)
//       const sortedTransactions = allTransactions.sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         // Handle potentially missing dates
//         if (!dateA && !dateB) return 0;
//         if (!dateA) return 1; // Put transactions without date last
//         if (!dateB) return -1; // Put transactions without date last
//         // Sort descending (newest first)
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//       });

//       // Get the latest 3 transactions
//       setLatestTransactions(sortedTransactions.slice(0, 3));

//     } catch (err: any) {
//       console.error("Failed to fetch transactions:", err);
//       setError(err.message || "Could not load recent transactions.");
//     } finally {
//       setLoading(false);
//     }
//   }, [token]); // Dependency: run when token changes

//   useEffect(() => {
//     fetchAndProcessTransactions();
//   }, [fetchAndProcessTransactions]); // Run fetch logic

//   // --- Render Helper ---
//   const renderTransactionRow = (transaction: Transaction) => {
//     const isAddMoney = transaction.type === "Add Money";
//     const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
//     const name = isAddMoney ? `To your ${transaction.balanceCurrency?.code ?? ''} balance` : (transaction.name || "Recipient");

//     let description = transaction.status; // Default description to status
//     if (isAddMoney) {
//         description = transaction.status === "completed" ? "Added by you" :
//                       transaction.status === 'pending' || transaction.status === 'in progress' ? "Waiting for your money" :
//                       transaction.status === 'canceled' ? "Cancelled" :
//                       transaction.status === 'failed' ? "Failed" : "Processing";
//     } else { // Send Money
//          description = transaction.status === "completed" ? "Sent by you" :
//                        transaction.status === 'pending' || transaction.status === 'in progress' || transaction.status === 'processing' ? "Sending your money" :
//                        transaction.status === 'canceled' ? "Cancelled" :
//                        transaction.status === 'failed' ? "Failed" : "Processing";
//     }

//     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//     const currencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//     const amountPrefix = isAddMoney ? "+ " : "- ";
//     let amountClass = "text-main"; // Default for Send Money or pending Add Money
//     if (isAddMoney && transaction.status === "completed") {
//         amountClass = "text-green-600";
//     } else if (transaction.status === "canceled") {
//         amountClass = "text-red-500 line-through";
//     } else if (transaction.status === "failed") {
//          amountClass = "text-red-500";
//     }


//     return (
//         // Link to the specific transaction detail page
//        <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
//           <div className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                 {icon}
//               </div>
//               <div className="flex justify-between w-full items-center"> {/* Use items-center */}
//                 <div>
//                   <h3 className="font-medium text-main">{name}</h3>
//                   <p className="text-sm text-gray-500">{description}</p>
//                 </div>
//                 <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                   {amountPrefix}
//                   {amount.toLocaleString(undefined, {
//                     minimumFractionDigits: 2, // Show 2 decimal places
//                     maximumFractionDigits: 2,
//                   })}
//                   {" "}
//                   {currencyCode}
//                 </div>
//               </div>
//             </div>
//           </div>
//        </Link>
//     );
//   };

//   return (
//     <section className="Transactions py-10"> {/* Adjusted padding */}
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-6"> {/* Adjusted margin */}
//           <h1 className="text-2xl font-semibold text-main">Recent Transactions</h1> {/* Adjusted size */}
//           <Link
//             href="/dashboard/transactions" // Corrected path assuming it's directly under dashboard
//             className="text-secondary font-medium underline cursor-pointer hover:text-secondary/80"
//           >
//             See all
//           </Link>
//         </div>

//         {/* Transaction History */}
//         <div className="space-y-2">
//           {loading && <p className="text-center text-gray-500 py-4">Loading transactions...</p>}
//           {!loading && error && <p className="text-center text-red-500 py-4">Error: {error}</p>}
//           {!loading && !error && latestTransactions.length === 0 && (
//             <p className="text-center text-gray-500 py-4">No recent transactions found.</p>
//           )}
//           {!loading && !error && latestTransactions.length > 0 && (
//             latestTransactions.map(renderTransactionRow)
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsSection;





// components/MainDashBoardSection/TransactionsSection.tsx
"use client"; // Required for hooks like useState, useEffect, useAuth

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";

import { useAuth } from "../../../hooks/useAuth"; // Adjust path if needed
import paymentService from "../../../services/payment"; // Adjust path if needed
import transferService from "../../../services/transfer"; // Adjust path if needed
import { Transaction } from "@/types/transaction"; // Adjust path if needed

const TransactionsSection: React.FC = () => {
  const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchAndProcessTransactions = useCallback(async () => {
    if (!token) {
      setError("Not authenticated.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setLatestTransactions([]); // Clear previous data

    try {
      // Fetch both payments and transfers concurrently
      const [paymentsData, transfersData] = await Promise.all([
        paymentService.getUserPayments(token),
        transferService.getUserTransfers(token),
      ]);

      // Map payments to the common Transaction structure
      const mappedPayments: Transaction[] = paymentsData.map((payment) => ({
        _id: payment._id,
        type: "Add Money",
        amountToAdd: payment.amountToAdd, // Amount relevant for display
        balanceCurrency: payment.balanceCurrency, // For currency code
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
        status: payment.status,
        // Add other fields from Transaction type if needed, initialized appropriately
        payInCurrency: payment.payInCurrency,
        account: payment.account,
        amountToPay: payment.amountToPay, // Keep if needed elsewhere, but amountToAdd is primary for display
      }));

      // Map transfers to the common Transaction structure
      const mappedTransfers: Transaction[] = transfersData.map((transfer) => ({
        _id: transfer._id,
        type: "Send Money",
        name:
          typeof transfer.recipient === "object" && transfer.recipient !== null
            ? transfer.recipient.accountHolderName
            : "Recipient", // Use recipient name
        sendAmount: transfer.sendAmount, // Amount relevant for display
        sendCurrency: transfer.sendCurrency, // For currency code
        createdAt: transfer.createdAt,
        updatedAt: transfer.updatedAt,
        status: transfer.status,
        recipient: transfer.recipient, // Keep recipient details if needed
        sourceAccountId: typeof transfer.sourceAccount === 'string' ? transfer.sourceAccount : transfer.sourceAccount?._id,
        // Add other fields from Transaction type if needed
        receiveAmount: transfer.receiveAmount,
        receiveCurrency: transfer.receiveCurrency,
      }));

      // Combine both types of transactions
      const allTransactions = [...mappedPayments, ...mappedTransfers];

      // Sort all transactions by date (use updatedAt falling back to createdAt)
      const sortedTransactions = allTransactions.sort((a, b) => {
        const dateA = a.updatedAt || a.createdAt;
        const dateB = b.updatedAt || b.createdAt;
        // Handle potentially missing dates
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1; // Put transactions without date last
        if (!dateB) return -1; // Put transactions without date last
        // Sort descending (newest first)
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });

      // Get the latest 3 transactions
      setLatestTransactions(sortedTransactions.slice(0, 3));

    } catch (err: any) {
      console.error("Failed to fetch transactions:", err);
      setError(err.message || "Could not load recent transactions.");
    } finally {
      setLoading(false);
    }
  }, [token]); // Dependency: run when token changes

  useEffect(() => {
    fetchAndProcessTransactions();
  }, [fetchAndProcessTransactions]); // Run fetch logic

  // --- Render Helper ---
  const renderTransactionRow = (transaction: Transaction) => {
    const isAddMoney = transaction.type === "Add Money";
    const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
    const name = isAddMoney ? `To your ${transaction.balanceCurrency?.code ?? ''} balance` : (transaction.name || "Recipient");

    let description = transaction.status; // Default description to status
    if (isAddMoney) {
        description = transaction.status === "completed" ? "Added by you" :
                      transaction.status === 'pending' || transaction.status === 'in progress' ? "Waiting for your money" :
                      transaction.status === 'canceled' ? "Cancelled" :
                      transaction.status === 'failed' ? "Failed" : "Processing";
    } else { // Send Money
         description = transaction.status === "completed" ? "Sent by you" :
                       transaction.status === 'pending' || transaction.status === 'in progress' || transaction.status === 'processing' ? "Sending your money" :
                       transaction.status === 'canceled' ? "Cancelled" :
                       transaction.status === 'failed' ? "Failed" : "Processing";
    }

    const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
    const currencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
    const amountPrefix = isAddMoney ? "+ " : "- ";
    let amountClass = "text-main"; // Default for Send Money or pending Add Money
    if (isAddMoney && transaction.status === "completed") {
        amountClass = "text-green-600";
    } else if (transaction.status === "canceled") {
        amountClass = "text-red-500 line-through";
    } else if (transaction.status === "failed") {
         amountClass = "text-red-500";
    }


    return (
      // Link to the specific transaction detail page
      <div key={transaction._id}>
        <Link href={`/dashboard/transactions/${transaction._id}`}>
          <div className="hover:bg-lightgray p-2 sm:p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-lightborder rounded-full flex items-center justify-center border border-lightborder">
                {icon}
              </div>
              <div className="flex justify-between w-full items-center">
                {" "}
                {/* Use items-center */}
                <div>
                  <h3 className="font-medium text-main">{name}</h3>
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
                <div className={`font-medium ${amountClass} whitespace-nowrap`}>
                  {amountPrefix}
                  {amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2, // Show 2 decimal places
                    maximumFractionDigits: 2,
                  })}{" "}
                  {currencyCode}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <section className="Transactions py-10"> {/* Adjusted padding */}
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6"> {/* Adjusted margin */}
          <h1 className="text-2xl font-semibold text-main">Recent Transactions</h1> {/* Adjusted size */}
          <Link
            href="/dashboard/transactions" // Corrected path assuming it's directly under dashboard
            className="text-secondary font-medium underline cursor-pointer hover:text-secondary/80"
          >
            See all
          </Link>
        </div>

        {/* Transaction History */}
        <div className="space-y-2">
          {loading && <p className="text-center text-gray-500 py-4">Loading transactions...</p>}
          {!loading && error && <p className="text-center text-red-500 py-4">Error: {error}</p>}
          {!loading && !error && latestTransactions.length === 0 && (
            <p className="text-center text-gray-500 py-4">No recent transactions found.</p>
          )}
          {!loading && !error && latestTransactions.length > 0 && (
            latestTransactions.map(renderTransactionRow)
          )}
        </div>
      </div>
    </section>
  );
};

export default TransactionsSection;