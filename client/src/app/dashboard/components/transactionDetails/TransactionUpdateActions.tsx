// frontend/app/dashboard/transactions/[transactionId]/components/TransactionUpdateActions.tsx
import React from 'react';
import { Button } from "@/components/ui/button"; // Adjust path
import { PaymentDetails, TransferDetails } from '../../../../types/transaction'; // Adjust path

interface TransactionUpdateActionsProps {
    transaction: PaymentDetails | TransferDetails;
    canCancel: boolean;
    isSubmitting: boolean;
    showAwaitingVerificationView: boolean; // Needed to hide confirm button
    submissionError: string | null;
    onConfirmPayment: () => void;
    onOpenCancelModal: () => void;
    onSwitchToDetailsTab: () => void;
}

const TransactionUpdateActions: React.FC<TransactionUpdateActionsProps> = ({
    transaction,
    canCancel,
    isSubmitting,
    showAwaitingVerificationView,
    submissionError,
    onConfirmPayment,
    onOpenCancelModal,
    onSwitchToDetailsTab,
}) => {
    const isPayment = transaction.type === 'payment';
    const isPendingPayment = isPayment && transaction.status === 'pending';

    return (
        <>
            {/* Action: Confirm Payment (Only for PENDING payments, not in 'awaiting' view) */}
            {isPendingPayment && !showAwaitingVerificationView && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-semibold mb-2 text-neutral-900 dark:text-white">Have you sent the payment?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                        Please find the bank details in the <button onClick={onSwitchToDetailsTab} className="text-primary hover:underline font-medium">Details tab</button>. Once you've completed the bank transfer, click the button below to let us know.
                    </p>
                    {submissionError && <p className="mb-4 text-sm text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-700/40">{submissionError}</p>}
                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                         <button
                            onClick={onOpenCancelModal}
                            disabled={isSubmitting}
                            className="order-2 sm:order-1 px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary rounded-full transition-all duration-75 ease-linear"
                         >
                             Cancel Payment
                         </button>
                         <button
                            onClick={onConfirmPayment}
                            disabled={isSubmitting}
                            className="order-1 sm:order-2 px-4 py-2 w-full sm:w-auto bg-primary text-neutral-900 hover:bg-primaryhover rounded-full transition-all duration-75 ease-linear"
                         >
                            {isSubmitting ? 'Processing...' : "Yes, I've Paid"}
                         </button>
                    </div>
                </div>
            )}

            {/* Action: General Cancel Button (If cancelable and NOT the pending payment case handled above) */}
            {canCancel && !isPendingPayment && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    {submissionError && <p className="text-sm text-red-600 dark:text-red-400 mr-4 self-center">{submissionError}</p>}
                    <button
                        onClick={onOpenCancelModal}
                        disabled={isSubmitting}
                        className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-all duration-75 ease-linear"
                    >
                        {isSubmitting ? 'Cancelling...' : `Cancel ${isPayment ? 'Payment' : 'Transfer'}`}
                    </button>
                </div>
            )}

            {/* Display general submission error if it occurred but wasn't shown elsewhere */}
            {submissionError && !canCancel && !isPendingPayment && (
                 <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-right">{submissionError}</p>
            )}
        </>
    );
};

export default TransactionUpdateActions;