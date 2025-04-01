// frontend/app/dashboard/transactions/[transactionId]/components/CancelTransferModal.tsx
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button"; // Assuming you use Shadcn Button

interface CancelTransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    // Use generic transactionId and add transactionType
    transactionId: string;
    transactionType: 'payment' | 'transfer'; // Specify the type
    onConfirmCancel: () => void;
    isSubmitting?: boolean; // Add loading state prop
}

const CancelTransferModal: React.FC<CancelTransferModalProps> = ({
    isOpen,
    onClose,
    transactionId,      // Use generic ID
    transactionType,    // Use the type
    onConfirmCancel,
    isSubmitting,       // Use loading state
}) => {
    const typeText = transactionType === 'payment' ? 'Payment' : 'Transfer';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" // Added padding and inset-0
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // Close on backdrop click
                >
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-lg relative shadow-xl" // Added dark mode, padding adjustments, shadow
                        initial={{ y: -30, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }}
                        exit={{ y: -30, opacity: 0, scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        <button
                            className="absolute top-3 right-3 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 ease-in-out"
                            onClick={onClose}
                            aria-label="Close modal" // Accessibility
                        >
                            <IoClose size={24} />
                        </button>

                        {/* Updated Title */}
                        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-2 mb-4 sm:mb-6 text-center sm:text-left">
                            Cancel {typeText}
                        </h3>
                         {/* Optional: Display ID */}
                         <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center sm:text-left">
                            ID: {transactionId}
                         </p>

                        <p className="text-gray-600 dark:text-gray-300 font-medium mb-6">
                            Are you sure you want to cancel this {transactionType}?
                            {transactionType === 'payment' && ' We\'ll attempt to stop the payment process.'}
                            {transactionType === 'transfer' && ' We\'ll refund any funds debited back to the source account. If we encounter issues, we\'ll contact you.'}
                             This action cannot be undone.
                        </p>

                        <div className="flex flex-col sm:flex-row-reverse justify-center sm:justify-start gap-3 mt-6 sm:mt-8">
                            {/* Updated Confirm Button */}
                            <Button
                                variant="destructive" // Use destructive variant for cancel actions
                                className="w-full sm:w-auto"
                                onClick={onConfirmCancel}
                                disabled={isSubmitting} // Disable when submitting
                            >
                                {isSubmitting ? `Cancelling ${typeText}...` : `Yes, Cancel ${typeText}`}
                            </Button>
                             {/* Updated Close Button */}
                            <Button
                                variant="outline" // Use outline variant
                                className="w-full sm:w-auto"
                                onClick={onClose}
                                disabled={isSubmitting} // Also disable close during submission? Optional.
                            >
                                No, Keep {typeText}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CancelTransferModal;