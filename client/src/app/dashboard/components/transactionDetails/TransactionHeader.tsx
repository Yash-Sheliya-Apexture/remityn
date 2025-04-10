// frontend/app/dashboard/transactions/[transactionId]/components/TransactionHeader.tsx
import React from 'react';
import { cn } from "@/lib/utils"; // Adjust path
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
import { PaymentDetails, TransferDetails } from '../../../../types/transaction'; // Adjust path

interface TransactionHeaderProps {
    transaction: PaymentDetails | TransferDetails;
    statusText: string;
    statusColorClass: string;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
    transaction,
    statusText,
    statusColorClass,
}) => {
    const isPayment = transaction.type === 'payment';

    const headerIcon = isPayment ? <LuPlus size={24} className="text-neutral-900 dark:text-white"/> : <GoArrowUp size={24} className="text-neutral-900 dark:text-white"/>;
    const headerTitle = isPayment
        ? `To your ${(transaction as PaymentDetails).balanceCurrency?.code ?? 'Balance'}`
        : (transaction as TransferDetails).recipient?.accountHolderName || "Outgoing Transfer";
    const headerAmountRaw = isPayment ? (transaction as PaymentDetails).amountToAdd : (transaction as TransferDetails).sendAmount;
    const headerCurrencyCode = isPayment ? (transaction as PaymentDetails).balanceCurrency?.code : (transaction as TransferDetails).sendCurrency?.code;
    const headerAmount = `${headerAmountRaw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'} ${headerCurrencyCode ?? ''}`;
    const headerAmountSign = isPayment ? "+" : "-";

    return (
        <div className="sm:p-6 p-4 flex items-start gap-4 border-b dark:border-border">
            {/* Icon container */}
            <div className={cn(
                "p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center shrink-0",
                isPayment ? 'text-green-600' : 'text-blue-600' // Example coloring
            )}>
                {headerIcon}
            </div>

            {/* Text content container */}
            <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4">
                {/* Left side: Title and Status */}
                <div className="text-wrap mr-2">
                    <h2 className="font-medium leading-tight text-neutral-900 dark:text-white sm:text-lg break-words">
                        {headerTitle}
                    </h2>
                    <p className={cn("text-sm mt-0.5", statusColorClass)}>
                        {statusText}
                    </p>
                </div>
                {/* Right side: Amount */}
                <div className={cn(
                    "font-medium text-lg sm:text-xl whitespace-nowrap text-right sm:text-left",
                    isPayment ? 'text-green-600 dark:text-green-500' : 'text-neutral-900 dark:text-white'
                )}>
                    {headerAmountSign} {headerAmount}
                </div>
            </div>
        </div>
    );
};

export default TransactionHeader;