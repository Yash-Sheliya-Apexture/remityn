// // components/Transactions.tsx
// import Link from "next/link";
// import React from "react";
// import { AiOutlineDownload } from "react-icons/ai";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// interface Transaction {
//   id: string;
//   type: "deposit" | "withdrawal";
//   description: string;
//   date: string;
//   amount: number;
//   currency: string;
//   name?: string;
// }

// // Make 'transactions' prop optional by adding a question mark '?'
// interface TransactionsProps {
//   transactions?: Transaction[];
// }

// const defaultTransactions: Transaction[] = [
//   {
//     id: "1",
//     type: "deposit",
//     description: "To your EUR balance",
//     date: "",
//     amount: 2210,
//     currency: "EUR",
//   },
//   {
//     id: "2",
//     type: "deposit",
//     description: "To your EUR balance",
//     date: "",
//     amount: 2210,
//     currency: "EUR",
//   },
//   {
//     id: "3",
//     type: "withdrawal",
//     description: "Withdrawal to Charbel Fares Tannous",
//     date: "Feb 24",
//     amount: 10,
//     currency: "USD",
//     name: "Charbel Fares Tannous",
//   },
// ];

// const Transactions: React.FC<TransactionsProps> = ({
//   transactions = defaultTransactions,
// }) => {
//   return (
//     <div className="Transactions py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-main">Transactions</h1>
//           <Link href="#" className="text-sm text-green-600 underline">
//             See all
//           </Link>
//         </div>
//         <div className="space-y-3">
//           {transactions.map((transaction) => (
//             <div key={transaction.id}>
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                   {transaction.type === "deposit" ? (
//                     <LuPlus size={28} className="text-main" />
//                   ) : (
//                     <GoArrowUp size={28} className="text-main" />
//                   )}
//                 </div>
//                 <div className="flex justify-between w-full">
//                   <div>
//                     <h3 className="font-medium text-main">
//                       {transaction.type === "deposit"
//                         ? "To your EUR balance"
//                         : transaction.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {transaction.type === "deposit"
//                         ? "Waiting for your money"
//                         : transaction.date}
//                     </p>
//                   </div>
//                   <div className="font-medium text-main">
//                     {transaction.type === "deposit" ? "" : "- "}{" "}
//                     {transaction.amount.toLocaleString(undefined, {
//                       minimumFractionDigits: 0,
//                       maximumFractionDigits: 2,
//                     })}{" "}
//                     {transaction.currency}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transactions;

// // components/Transactions.tsx
// import Link from "next/link";
// import React from "react";
// import { AiOutlineDownload } from "react-icons/ai";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// interface Transaction {
//   id: string;
//   type: "Add Money" | "Send Money"; // Updated type
//   name?: string; // Optional name, relevant for "Send Money"
//   description: string;
//   date?: string; // Date is optional now based on description logic
//   amount: number;
//   currency: string;
// }

// interface TransactionsProps {
//   transactions?: Transaction[];
// }

// const defaultTransactions: Transaction[] = [
//   {
//     id: "1",
//     type: "Add Money", // Updated type
//     description: "Waiting for your money", // Updated description for Add Money in process
//     amount: 2210,
//     currency: "EUR",
//   },
//   {
//     id: "2",
//     type: "Add Money", // Updated type
//     description: "Waiting for your money", // Updated description for Add Money in process
//     amount: 2210,
//     currency: "EUR",
//   },
//   {
//     id: "3",
//     type: "Send Money", // Updated type
//     name: "Charbel Fares Tannous", // Beneficiary name for Send Money
//     description: "Sent by you", // Updated description for Send Money
//     date: "Feb 24", // Date for sent transaction
//     amount: 10,
//     currency: "USD",
//   },
// ];

// const Transactions: React.FC<TransactionsProps> = ({
//   transactions = defaultTransactions,
// }) => {
//   return (
//     <div className="Transactions py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-main">Transactions</h1>
//           <Link href="#" className="text-sm text-green-600 underline">
//             See all
//           </Link>
//         </div>
//         <div className="space-y-3">
//           {transactions.map((transaction) => (
//             <div key={transaction.id}>
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                   {transaction.type === "Add Money" ? (
//                     <LuPlus size={28} className="text-main" />
//                   ) : (
//                     <GoArrowUp size={28} className="text-main" />
//                   )}
//                 </div>
//                 <div className="flex justify-between w-full">
//                   <div>
//                     <h3 className="font-medium text-main">
//                       {transaction.type === "Add Money"
//                         ? "To your EUR balance"
//                         : transaction.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {transaction.type === "Add Money"
//                         ? transaction.description // "Waiting for your money"
//                         : transaction.description // "Sent by you"
//                       }
//                     </p>
//                   </div>
//                   <div className="font-medium text-main">
//                     {transaction.type === "Add Money" ? "+ " : "- "}{" "} {/* Added + sign for Add Money */}
//                     {transaction.amount.toLocaleString(undefined, {
//                       minimumFractionDigits: 0,
//                       maximumFractionDigits: 2,
//                     })}{" "}
//                     {transaction.currency}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transactions;

// // components/MainDashBoardSection/TransactionsSection.tsx
// import Link from "next/link";
// import React from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// interface Transaction {
//   id: string;
//   type: "Add Money" | "Send Money";
//   name?: string;
//   description: string;
//   date?: string;
//   amount: number;
//   currency: string;
// }

// interface TransactionsProps {
//   transactions?: Transaction[];
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
//   {
//     id: "3",
//     type: "Send Money",
//     name: "Charbel Fares Tannous",
//     description: "Sent by you",
//     date: "Feb 24",
//     amount: 10,
//     currency: "USD",
//   },
// ];

// const TransactionsSection: React.FC<TransactionsProps> = ({
//   transactions = defaultTransactions,
// }) => {
//   return (
//     <div className="Transactions py-12">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-main">Transactions</h1>
//           <Link href="#" className="text-secondary font-medium underline cursor-pointer">
//             See all
//           </Link>
//         </div>
//         <div className="space-y-8">
//           {transactions.map((transaction) => (
//             <div key={transaction.id}>

//               {/* Transaction History */}
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                   {transaction.type === "Add Money" ? (
//                     <LuPlus size={28} className="text-main" />
//                   ) : (
//                     <GoArrowUp size={28} className="text-main" />
//                   )}
//                 </div>
//                 <div className="flex justify-between w-full">
//                   <div>
//                     <h3 className="font-medium text-main">
//                       {transaction.type === "Add Money"
//                         ? `To your ${transaction.currency} balance` // Dynamic Currency Display
//                         : transaction.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {transaction.description}
//                     </p>
//                   </div>
//                   <div className={`font-medium ${
//                       transaction.type === "Add Money" && transaction.description === "Added by you"
//                         ? "text-green-600" // Apply green color for completed Add Money
//                         : "text-main"
//                     }`}>
//                     {transaction.type === "Add Money" ? "+ " : "- "}
//                     {transaction.amount.toLocaleString(undefined, {
//                       minimumFractionDigits: 0,
//                       maximumFractionDigits: 2,
//                     })}{" "}
//                     {transaction.currency}
//                   </div>
//                 </div>
//               </div>

//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionsSection;

// // components/TransactionsSection.tsx
// import React from "react";
// import Link from "next/link";
// import { defaultTransactions, Transaction } from "../../transactions/PageSection/TransactionPage";
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
//             href="/transactions"
//             className="text-secondary font-medium underline cursor-pointer"
//           >
//             See all
//           </Link>
//         </div>

//         {/* Latest 3 Transaction History */}
//         <div className="space-y-8">
//           {latestTransactions.map((transaction) => {
//             let description = transaction.description;
//             if (transaction.type === "Add Money") {
//               description = transaction.status === "processed" ? "Added by you" : "Waiting for your money";
//             } else if (transaction.type === "Send Money") {
//               description = transaction.status === "processed" ? "Sent by you" : "Sending your money";
//             }
//             return (
//               <div key={transaction.id} className="">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
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
//                       className={`font-medium ${transaction.type === "Add Money" && transaction.status === "processed" ? "text-green-600" : "text-main"}`}
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













// components/TransactionsSection.tsx
import React from "react";
import Link from "next/link";
import { Transaction, defaultTransactions } from "../../../data/transactions"; // Import from data file
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";

const TransactionsSection: React.FC = () => {
  // Sort all transactions by date in descending order
  const sortedTransactions = [...defaultTransactions].sort((a, b) => {
    const dateA = a.processedDate ? new Date(a.processedDate) : new Date(a.date || "");
    const dateB = b.processedDate ? new Date(b.processedDate) : new Date(b.date || "");
    return dateB.getTime() - dateA.getTime();
  });

  // Get the latest 3 transactions
  const latestTransactions = sortedTransactions.slice(0, 3);

  return (
    <section className="Transactions py-12">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-main">Transactions</h1>
          <Link
            href="/transactions"
            className="text-secondary font-medium underline cursor-pointer"
          >
            See all
          </Link>
        </div>

        {/* Latest 3 Transaction History */}
        <div className="space-y-8">
          {latestTransactions.map((transaction) => {
            let description = transaction.description;
            if (transaction.type === "Add Money") {
              description = transaction.status === "processed" ? "Added by you" : "Waiting for your money";
            } else if (transaction.type === "Send Money") {
              description = transaction.status === "processed" ? "Sent by you" : "Sending your money";
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
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                    <div
                      className={`font-medium ${transaction.type === "Add Money" && transaction.status === "processed" ? "text-green-600" : "text-main"}`}
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
    </section>
  );
};
export default TransactionsSection;