// frontend/app/dashboard/components/InsufficientBalanceModal.tsx
"use client";
import React from "react";
import Image from "next/image"; // Import Image component
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface InsufficientBalanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMoney: () => void; // Action to navigate to add money
    currencyCode: string; // To display the currency
}

const InsufficientBalanceModal: React.FC<InsufficientBalanceModalProps> = ({
    isOpen,
    onClose,
    onAddMoney,
    currencyCode,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 w-full h-full bg-black/60 z-50 flex items-center justify-center p-4" // Added padding for smaller screens
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // Close on overlay click
                >
                    <motion.div
                        className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md relative text-center" // Adjusted padding and max-width
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 15 } }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200 ease-in-out"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <IoClose size={24} />
                        </button>

                        {/* Image (Optional - replace with your actual image path) */}
                        <div className="flex justify-center mb-5">
                            {/* Use your actual image path here */}
                            {/* Example using a placeholder - replace src */}
                             <Image
                                 src="/assets/images/exclamation-mark-small.png" // <<<--- Replace with your actual image path!
                                 alt="Warning"
                                 width={80} // Adjust size as needed
                                 height={80} // Adjust size as needed
                                 onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} // Hide if image fails
                             />
                             {/* Fallback Icon if image fails or not provided */}
                             {/* <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" />
                                </svg>
                             </div> */}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                            Sorry, you can't send money from this balance
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 font-normal mb-6 sm:mb-8 text-sm sm:text-base">
                            If you want to send {currencyCode} from your balance, you'll need to add money first.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col justify-center gap-3">
                            <button
                                className="bg-lime-500 hover:bg-lime-600 text-white font-medium rounded-lg px-6 py-3 text-center w-full transition-colors duration-200 ease-in-out"
                                onClick={onAddMoney}
                            >
                                Add money
                            </button>
                            <button
                                className="bg-white text-gray-700 font-medium rounded-lg px-6 py-3 text-center border border-gray-300 hover:bg-gray-50 w-full transition-colors duration-200 ease-in-out"
                                onClick={onClose}
                            >
                                Got it
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InsufficientBalanceModal;