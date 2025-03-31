// frontend/app/dashboard/transactions/[transactionId]/components/CancelTransferModal.tsx
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface CancelTransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    transferNumber: string;
    onConfirmCancel: () => void; // Changed prop name to onConfirmCancel to be more specific
}

const CancelTransferModal: React.FC<CancelTransferModalProps> = ({
    isOpen,
    onClose,
    transferNumber,
    onConfirmCancel, // Changed prop name here as well
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-2xl p-10 w-full max-w-lg relative"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }}
                        exit={{ y: -50, opacity: 0 }}
                    >
                        <button
                            className="absolute top-4 right-4 p-3 hover:bg-secondary/80 rounded-full transition-colors duration-300 ease-in-out"
                            onClick={onClose}
                        >
                            <IoClose size={28} className="text-primary " />
                        </button>
                        <h3 className="text-3xl font-semibold text-main my-6">Cancel transfer #{transferNumber}</h3> {/* Display transfer number */}
                        <p className="text-gray font-medium mb-6">
                            We'll refund any payments you have made back to the same account. If we
                            can't process your refund, we'll get in touch about what to do next.
                        </p>
                        <div className="flex flex-col justify-center gap-4 mt-8">
                            <button
                                className="bg-green-500 text-white font-medium rounded-full px-6 py-3 text-center w-full hover:bg-green-600 transition-colors" // Changed to green to match image
                                onClick={onConfirmCancel} // Call the confirm cancel function
                            >
                                Cancel transfer {/* Changed button text */}
                            </button>
                            <button
                                className="bg-white text-main font-medium rounded-full px-6 py-3 text-center border border-gray w-full"
                                onClick={onClose}
                            >
                                Close {/* Changed button text */}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CancelTransferModal;