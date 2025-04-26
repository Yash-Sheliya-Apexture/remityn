// frontend/src/app/dashboard/transactions/TransactionPageHeader.tsx
import React from 'react';
// Use the SHARED TransactionActions component
import TransactionActions from "./TransactionActions"; // Adjust path if needed
import { Transaction } from "@/types/transaction"; // Adjust path if needed
import { Account } from "@/types/account"; // Adjust path if needed
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

interface TransactionPageHeaderProps {
    title: string;
    isLoadingAccounts: boolean;
    userAccounts: Account[];
    allTransactions: Transaction[]; // Pass ALL transactions for base search list
    onTransactionsChange: (transactions: Transaction[]) => void; // Pass search handler down
    onFilterButtonClick: () => void; // Pass filter button handler down
    error: string | null; // To decide on showing messages
}

const TransactionPageHeader: React.FC<TransactionPageHeaderProps> = ({
    title,
    isLoadingAccounts,
    userAccounts,
    allTransactions,
    onTransactionsChange,
    onFilterButtonClick,
    error
}) => {
    // Show actions if not loading accounts and there are accounts OR transactions
    // This prevents actions disappearing if accounts load slightly after transactions
    const showActions = !isLoadingAccounts && (userAccounts.length > 0 || allTransactions.length > 0);
    const showCreateAccountMessage = !isLoadingAccounts && userAccounts.length === 0 && !error && allTransactions.length === 0;

    return (
        // Sticky header styling
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background border-b border-gray-200 dark:border-primarybox mb-6">
            {/* Title */}
            <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white flex-shrink-0">
                {title}
            </h1>

            {/* Actions Area */}
            <div className="w-full md:w-auto">
                {isLoadingAccounts && ( // Skeleton for actions while accounts load
                    <div className="flex items-center gap-4 w-full md:w-auto md:justify-end animate-pulse">
                        <Skeleton className="h-10 w-full sm:w-64 rounded-full" />
                        <Skeleton className="h-10 w-32 rounded-full" />
                    </div>
                )}
                {showActions && (
                    <TransactionActions
                        transactions={allTransactions} // Pass the full list for search base
                        onTransactionsChange={onTransactionsChange} // Handle search results
                        onFilterButtonClick={onFilterButtonClick} // Handle filter open click
                    />
                )}
                {showCreateAccountMessage && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-right mt-2 md:mt-0">
                        Create an account balance to start making transactions.
                    </p>
                )}
                 {/* Ensure consistent height even if no actions/message */}
                 {!isLoadingAccounts && !showActions && !showCreateAccountMessage && (
                    <div className="h-10"></div>
                 )}
            </div>
        </div>
    );
};

export default TransactionPageHeader;