// // frontend/app/dashboard/transactions/[transactionId]/components/CancelTransferModal.tsx
// "use client";
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";
// import { Button } from "@/components/ui/button"; // Assuming you use Shadcn Button

// interface CancelTransferModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     // Use generic transactionId and add transactionType
//     transactionId: string;
//     transactionType: 'payment' | 'transfer'; // Specify the type
//     onConfirmCancel: () => void;
//     isSubmitting?: boolean; // Add loading state prop
// }

// const CancelTransferModal: React.FC<CancelTransferModalProps> = ({
//     isOpen,
//     onClose,
//     transactionId,      // Use generic ID
//     transactionType,    // Use the type
//     onConfirmCancel,
//     isSubmitting,       // Use loading state
// }) => {
//     const typeText = transactionType === 'payment' ? 'Payment' : 'Transfer';

//     return (
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center" // Added padding and inset-0
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose} // Close on backdrop click
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl sm:p-8 p-4 w-full sm:max-w-lg relative" // Added dark mode, padding adjustments, shadow
//               initial={{ y: -30, opacity: 0, scale: 0.95 }}
//               animate={{
//                 y: 0,
//                 opacity: 1,
//                 scale: 1,
//                 transition: { type: "spring", stiffness: 100, damping: 15 },
//               }}
//               exit={{ y: -30, opacity: 0, scale: 0.95 }}
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//             >
//               <div className="w-full inline-flex justify-end absolute top-2 right-2">
//                 <button
//                   className="p-3 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                   onClick={onClose}
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-white"
//                   />
//                 </button>
//               </div>

//               {/* Updated Title */}
//               <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
//                 Cancel {typeText}
//               </h3>
//               {/* Optional: Display ID */}
//               <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                 ID: {transactionId}
//               </p>

//               <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                 Are you sure you want to cancel this {transactionType}?
//                 {transactionType === "payment" &&
//                   " We'll attempt to stop the payment process."}
//                 {transactionType === "transfer" &&
//                   " We'll refund any funds debited back to the source account. If we encounter issues, we'll contact you."}
//                 This action cannot be undone.
//               </p>

//               <div className="flex flex-col justify-center gap-4 mt-8">
//                 {/* Updated Confirm Button */}
//                 <button

//                   className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={onConfirmCancel}
//                   disabled={isSubmitting} // Disable when submitting
//                 >
//                   {isSubmitting
//                     ? `Cancelling ${typeText}...`
//                     : `Yes, Cancel ${typeText}`}
//                 </button>
//                 {/* Updated Close Button */}
//                 <button
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={onClose}
//                   disabled={isSubmitting} // Also disable close during submission? Optional.
//                 >
//                   No, Keep {typeText}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
// };

// export default CancelTransferModal;

// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";
// import { Button } from "@/components/ui/button"; // Assuming you use Shadcn Button

// interface CancelTransferModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     // Use generic transactionId and add transactionType
//     transactionId: string;
//     transactionType: 'payment' | 'transfer'; // Specify the type
//     onConfirmCancel: () => void;
//     isSubmitting?: boolean; // Add loading state prop
// }

// const CancelTransferModal: React.FC<CancelTransferModalProps> = ({
//     isOpen,
//     onClose,
//     transactionId,      // Use generic ID
//     transactionType,    // Use the type
//     onConfirmCancel,
//     isSubmitting,       // Use loading state
// }) => {
//     const typeText = transactionType === 'payment' ? 'Payment' : 'Transfer';
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 640);
//         handleResize(); // Set initial value
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const mobileVariants = {
//         initial: { y: 50, opacity: 0 },
//         animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//         exit: { y: 50, opacity: 0 },
//     };

//     const desktopVariants = {
//       initial: { y: -30, opacity: 0, scale: 0.95 },
//       animate: {
//         y: 0,
//         opacity: 1,
//         scale: 1,
//         transition: { type: "spring", stiffness: 100, damping: 15 },
//       },
//       exit: { y: -30, opacity: 0, scale: 0.95 },
//     };

//     const modalVariants = isMobile ? mobileVariants : desktopVariants;

//     return (
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center" // Added padding and inset-0
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose} // Close on backdrop click
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-lg relative" // Added dark mode, padding adjustments, shadow
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//             >
//               <div className="absolute top-2 right-2">
//                 <button
//                   className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                   onClick={onClose}
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-primary"
//                   />
//                 </button>
//               </div>

//               {/* Updated Title */}
//               <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
//                 Cancel {typeText}
//               </h3>
//               {/* Optional: Display ID */}
//               <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                 ID: {transactionId}
//               </p>

//               <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                 Are you sure you want to cancel this {transactionType}?
//                 {transactionType === "payment" &&
//                   " We'll attempt to stop the payment process."}
//                 {transactionType === "transfer" &&
//                   " We'll refund any funds debited back to the source account. If we encounter issues, we'll contact you."}
//                 This action cannot be undone.
//               </p>

//               <div className="flex flex-col justify-center gap-4 mt-8">
//                 {/* Updated Confirm Button */}
//                 <button

//                   className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={onConfirmCancel}
//                   disabled={isSubmitting} // Disable when submitting
//                 >
//                   {isSubmitting
//                     ? `Cancelling ${typeText}...`
//                     : `Yes, Cancel ${typeText}`}
//                 </button>
//                 {/* Updated Close Button */}
//                 <button
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={onClose}
//                   disabled={isSubmitting} // Also disable close during submission? Optional.
//                 >
//                   No, Keep {typeText}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
// };

// export default CancelTransferModal;

// frontend/app/dashboard/components/CancelTransferModal.tsx

"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Hash } from "lucide-react";
import { FiAlertCircle } from "react-icons/fi";

interface CancelTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string;
  transactionType: "payment" | "transfer";
  onConfirmCancel: () => void;
  isSubmitting?: boolean;
  error?: string | null; // Add optional error prop
}

const CancelTransferModal: React.FC<CancelTransferModalProps> = ({
  isOpen,
  onClose,
  transactionId,
  transactionType,
  onConfirmCancel,
  isSubmitting,
  error, // Use the error prop
}) => {
  const typeText = transactionType === "payment" ? "Payment" : "Transfer";
  const [isMobile, setIsMobile] = useState(false);

  // --- Body Scroll Lock ---
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup function to ensure the class is removed when the component unmounts
    // or if the modal was closed by other means.
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640); // Using sm breakpoint

    // Check on mount and add listener
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    // Cleanup listener on unmount
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const mobileVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
    exit: { y: 50, opacity: 0 },
  };

  const desktopVariants = {
    initial: { y: -30, opacity: 0, scale: 0.95 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { y: -30, opacity: 0, scale: 0.95 },
  };
  const modalVariants = isMobile ? mobileVariants : desktopVariants;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-white/15 z-80 flex sm:items-center items-end justify-center" // Added padding and inset-0
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isSubmitting ? undefined : onClose} // Prevent close on backdrop click if submitting
          aria-modal="true" // Added for accessibility
          role="dialog" // Added for accessibility
          aria-labelledby="cancel-modal-title" // Added for accessibility
        >
          <motion.div
            className="bg-background sm:rounded-3xl rounded-t-3xl sm:p-6 p-4 space-y-4 w-full sm:max-w-lg relative text-center" // Added shadow
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-2 right-2">
              <button
                className="p-2.5 bg-primarybox hover:bg-secondarybox text-primary rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
                onClick={onClose}
                disabled={isSubmitting} // Disable close button while submitting?
                aria-label="Close cancellation modal" // Added aria-label
              >
                <IoClose size={28} />
              </button>
            </div>

            <div className="lg:size-16 size-14 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0 mx-auto">
              <FiAlertCircle className="text-red-500 lg:size-8 size-6 flex-shrink-0" />
            </div>

            <h3
              id="cancel-modal-title"
              className="sm:text-3xl text-2xl font-semibold text-mainheadingWhite"
            >
              Cancel {typeText}
            </h3>

            <p className="text-mainheadingWhite font-medium flex items-center justify-center">
              <Hash className="size-5 text-primary" />
              ID: {transactionId}
            </p>

            <p className="text-secondheadingWhite">
              Are you sure you want to cancel this {transactionType}?
              {transactionType === "payment" &&
                " We'll attempt to stop the payment process."}
              {transactionType === "transfer" &&
                " We'll refund any funds debited back to the source account. If we encounter issues, we'll contact you."}
              This action cannot be undone.
            </p>

            {/* --- START: Error Display Area --- */}
            {error && (
              <div className="my-4 p-3 bg-red-900/30 border border-red-700/50 text-red-300 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            {/* --- END: Error Display Area --- */}

            <div className="flex flex-col justify-center gap-3 mt-7">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                onClick={onConfirmCancel}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? `Cancelling ${typeText}...`
                  : `Yes, Cancel ${typeText}`}
              </button>

              <button
                className="text-primary bg-primarybox hover:bg-secondarybox font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                onClick={onClose}
                disabled={isSubmitting}
              >
                No, Keep {typeText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CancelTransferModal;
