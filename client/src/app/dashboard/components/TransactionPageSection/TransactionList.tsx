// // components/dashboard/transactions/TransactionList.tsx
// import React from 'react';
// import Link from 'next/link';
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction } from "@/types/transaction"; // Adjust path

// interface TransactionListProps {
//     inProgressTransactions: Transaction[];
//     groupedProcessedTransactions: { [date: string]: Transaction[] };
//     filtersAreActive: boolean;
//     onClearFiltersClick: () => void;
//     hasAnyTransactions: boolean; // True if allTransactions > 0
//     showEmptyState: boolean; // True if filteredTransactions === 0
// }

// const TransactionList: React.FC<TransactionListProps> = ({
//     inProgressTransactions,
//     groupedProcessedTransactions,
//     filtersAreActive,
//     onClearFiltersClick,
//     hasAnyTransactions,
//     showEmptyState
// }) => {

//     return (
//         <div className="space-y-4">
//             {/* In Progress Section */}
//             {inProgressTransactions.length > 0 && (
//                 <div className="InProcess-Transaction-Lists">
//                     <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b border-gray-200 dark:border-primarybox"> In progress </h3>
//                     <div className="space-y-2">
//                         {inProgressTransactions.map((tx) => {
//                             const isAdd = tx.type === "Add Money";
//                             const icon = isAdd ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                             const desc = isAdd ? "Waiting for your money" : "Sending money";
//                             const amount = isAdd ? tx.amountToAdd ?? 0 : tx.sendAmount ?? 0;
//                             const currency = isAdd ? tx.balanceCurrency?.code : tx.sendCurrency?.code;
//                             const prefix = isAdd ? "+ " : "- ";
//                             const name = isAdd ? `To your ${currency} balance` : tx.name || "Recipient";
//                             return (
//                                 <Link href={`/dashboard/transactions/${tx._id}`} key={tx._id} className="block">
//                                     <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                         <div className="flex items-center gap-4">
//                                             <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                                             <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                                 <div className=" text-wrap">
//                                                     <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"> {name} </h3>
//                                                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {desc} <span className="italic">({tx.status})</span> </p>
//                                                 </div>
//                                                 <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}>
//                                                     {prefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             );
//                         })}
//                     </div>
//                 </div>
//             )}

//             {/* Processed Sections (Grouped by Date) */}
//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-4">
//                     {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
//                         <div key={date} className="Transaction-Lists">
//                             <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b border-gray-200 dark:border-primarybox"> {date} </h3>
//                             <div className="space-y-2">
//                                 {transactionsForDate.map((tx) => {
//                                     const isAdd = tx.type === "Add Money";
//                                     const icon = isAdd ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                                     let desc = isAdd ? "Added" : `Sent to ${tx.name || "Recipient"}`;
//                                     let amountClass = isAdd ? "text-green-600 dark:text-green-500" : "text-neutral-900 dark:text-white";
//                                     const amount = isAdd ? tx.amountToAdd ?? 0 : tx.sendAmount ?? 0;
//                                     const currency = isAdd ? tx.balanceCurrency?.code : tx.sendCurrency?.code;
//                                     const prefix = isAdd ? "+ " : "- ";
//                                     const name = isAdd ? `Added to ${currency} balance` : tx.name || "Recipient";

//                                     if (tx.status === "canceled") { desc = "Cancelled"; amountClass = "text-red-600 dark:text-red-400 line-through"; }
//                                     else if (tx.status === "failed") { desc = "Failed"; amountClass = "text-red-600 dark:text-red-400 line-through"; }

//                                     return (
//                                         <Link href={`/dashboard/transactions/${tx._id}`} key={tx._id} className="block">
//                                             <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                                 <div className="flex items-center gap-4">
//                                                     <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                                                     <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                                         <div className=" text-wrap">
//                                                             <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"> {name} </h3>
//                                                             <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {desc} </p>
//                                                         </div>
//                                                         <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                                                             {prefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </Link>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//              {/* Empty State */}
//              {showEmptyState && (
//                 <div className="text-center flex flex-col items-center text-lg px-4 text-gray-500 dark:text-gray-300 py-12 dark:bg-white/5 rounded-lg mt-6">
//                     {!hasAnyTransactions
//                         ? "You haven't made any transactions yet."
//                         : "No transactions match your current filter or search criteria."}
//                     {filtersAreActive && hasAnyTransactions && (
//                         <button
//                             onClick={onClearFiltersClick}
//                             className="mt-4 px-6 cursor-pointer py-3 w-auto bg-primary text-mainheading rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                         >
//                             Clear Filters
//                         </button>
//                     )}
//                 </div>
//              )}
//         </div>
//     );
// };

// export default TransactionList;


// frontend/src/app/dashboard/components/TransactionPageSection/TransactionList.tsx
import React from 'react';
import Link from 'next/link';
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
import { Transaction } from "@/types/transaction"; // Adjust path if needed

// Interface defines props accepted by the component
interface TransactionListProps {
    // Data for rendering: Pre-grouped transactions
    inProgressTransactions: Transaction[];
    groupedProcessedTransactions: { [date: string]: Transaction[] }; // Key is formatted date string

    // State for managing filter UI elements
    filtersAreActive: boolean;
    onClearFiltersClick: () => void;

    // State for determining empty state message
    hasAnyTransactions: boolean;
    showEmptyState: boolean;

    // --- MODIFIED: Make currencyCode from parent REQUIRED when needed ---
    // This code is available on BalanceDetailPage and represents the balance being viewed
    currencyCode?: string; // Make this potentially available
    balanceId?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({
    inProgressTransactions,
    groupedProcessedTransactions,
    filtersAreActive,
    onClearFiltersClick,
    hasAnyTransactions,
    showEmptyState,
    currencyCode: pageCurrencyCode, // Rename prop to avoid clash with tx variable
    // Destructure other props if needed
}) => {

    const hasInProgress = inProgressTransactions.length > 0;
    const hasProcessed = Object.keys(groupedProcessedTransactions).length > 0;

    const emptyStateMessage = !hasAnyTransactions
        ? "You haven't made any transactions yet."
        : "No transactions match your current filter or search criteria.";

    return (
        <div className="space-y-4">
            {/* In Progress Section */}
            {hasInProgress && (
                <div className="InProcess-Transaction-Lists">
                    <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b border-gray-200 dark:border-primarybox"> In progress </h3>
                    <div className="space-y-2">
                        {inProgressTransactions.map((tx) => {
                            const isAdd = tx.type === "Add Money";
                            const icon = isAdd ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
                            const desc = isAdd ? "Waiting for your money" : "Sending money";
                            const amount = isAdd ? tx.amountToAdd ?? 0 : tx.sendAmount ?? 0;

                            // --- REFINED FIX for Missing Currency ---
                            let transactionCurrencyCode: string | undefined;
                            if (isAdd) {
                                // Prioritize code from the transaction data itself
                                transactionCurrencyCode = tx.balanceCurrency?.code
                                    // If missing, use the currency code of the balance page we are on
                                    ?? pageCurrencyCode;
                            } else {
                                // For sends, use the send currency code
                                transactionCurrencyCode = tx.sendCurrency?.code;
                            }
                            const currency = transactionCurrencyCode ?? ''; // Final fallback to empty string

                            const prefix = isAdd ? "+ " : "- ";
                             // Use the determined currency code in the name string
                            const name = isAdd
                                ? `To your ${currency || '???'} balance` // Still keep '???' if even pageCurrencyCode is missing
                                : tx.name || "Recipient";
                            // --- END REFINED FIX ---

                            const statusText = tx.status ? `(${tx.status})` : '';
                            const transactionDetailUrl = `/dashboard/transactions/${tx._id}`;

                            return (
                                <Link href={transactionDetailUrl} key={tx._id} className="block">
                                    <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0"> {icon} </div>
                                            <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4">
                                                <div className="text-wrap flex-grow">
                                                    <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg truncate"> {name} </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {desc} <span className="italic">{statusText}</span> </p>
                                                </div>
                                                <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap text-right sm:text-left`}>
                                                    {prefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
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
            {hasProcessed && (
                <div className="space-y-4">
                    {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
                        <div key={date} className="Transaction-Lists">
                            <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b border-gray-200 dark:border-primarybox"> {date} </h3>
                            <div className="space-y-2">
                                {transactionsForDate.map((tx) => {
                                    const isAdd = tx.type === "Add Money";
                                    const icon = isAdd ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
                                    let desc = "Processed";
                                    let amountClass = "text-neutral-900 dark:text-white";
                                    const amount = isAdd ? tx.amountToAdd ?? 0 : tx.sendAmount ?? 0;

                                    // --- REFINED FIX for Missing Currency ---
                                    let transactionCurrencyCode: string | undefined;
                                    if (isAdd) {
                                        transactionCurrencyCode = tx.balanceCurrency?.code ?? pageCurrencyCode;
                                    } else {
                                        transactionCurrencyCode = tx.sendCurrency?.code;
                                    }
                                    const currency = transactionCurrencyCode ?? '';
                                    // --- END REFINED FIX ---

                                    const prefix = isAdd ? "+ " : "- ";
                                    // --- REFINED FIX for Missing Currency ---
                                    const name = isAdd
                                        ? `Added to ${currency || '???'} balance`
                                        : tx.name || "Recipient";
                                    // --- END REFINED FIX ---

                                    if (tx.status === "completed") {
                                        desc = isAdd ? "Added" : `Sent to ${tx.name || "Recipient"}`;
                                        amountClass = isAdd ? "text-green-600 dark:text-green-500" : "text-neutral-900 dark:text-white";
                                    } else if (tx.status === "canceled") { /* ... */ desc = "Cancelled"; amountClass = "text-red-600 dark:text-red-400 line-through"; }
                                    else if (tx.status === "failed") { /* ... */ desc = "Failed"; amountClass = "text-red-600 dark:text-red-400 line-through"; }
                                    else { desc = tx.status ? tx.status.charAt(0).toUpperCase() + tx.status.slice(1) : "Processed"; }

                                    const transactionDetailUrl = `/dashboard/transactions/${tx._id}`;

                                    return (
                                        <Link href={transactionDetailUrl} key={tx._id} className="block">
                                            <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0"> {icon} </div>
                                                    <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4">
                                                        <div className=" text-wrap flex-grow">
                                                            <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg truncate"> {name} </h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {desc} </p>
                                                        </div>
                                                        <div className={`font-medium ${amountClass} whitespace-nowrap text-right sm:text-left`}>
                                                            {prefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
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

             {/* Empty State */}
             {showEmptyState && !hasInProgress && !hasProcessed && (
                <div className="text-center flex flex-col items-center text-lg px-4 text-gray-700 dark:text-gray-300 py-5 rounded-lg mt-6 border border-dashed">
                    <p>{emptyStateMessage}</p>
                    {filtersAreActive && hasAnyTransactions && (
                        <button
                            onClick={onClearFiltersClick}
                            className="mt-4 px-6 cursor-pointer py-3 w-auto bg-primary text-mainheading dark:text-primary text-sm rounded-full hover:bg-primaryhover transition-colors duration-300 ease-in-out"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
             )}
        </div>
    );
};

export default TransactionList;