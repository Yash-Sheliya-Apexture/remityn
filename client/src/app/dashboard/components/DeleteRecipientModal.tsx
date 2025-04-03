// // frontend/src/app/dashboard/components/DeleteRecipientModal.tsx
// "use client";
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// interface DeleteRecipientModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     recipientName: string;
//     onConfirmDelete: () => void;
// }

// const DeleteRecipientModal: React.FC<DeleteRecipientModalProps> = ({
//     isOpen,
//     onClose,
//     recipientName,
//     onConfirmDelete,
// }) => {
//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                 >
//                     <motion.div
//                         className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl p-10 w-full max-w-lg relative"
//                         initial={{ y: -50, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }}
//                         exit={{ y: -50, opacity: 0 }}
//                     >
//                         <button
//                             className="absolute top-4 right-4 p-3 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-colors duration-300 ease-in-out cursor-pointer"
//                             onClick={onClose}
//                         >
//                             <IoClose size={28} className="text-neutral-900 dark:text-white" />
//                         </button>
//                         <h3 className="text-3xl font-semibold text-mainheading dark:text-white my-6">Delete recipient ?</h3>
//                         <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                             You'll have to add {recipientName} again as a recipient to send money to them.
//                         </p>
//                         <div className="flex flex-col justify-center gap-4 mt-8">
//                             <button
//                                 className="bg-primary text-neutral-900 hover:bg-primary/50 font-medium rounded-full px-6 py-3 text-center w-full cursor-pointer transition-colors duration-500 ease-in-out"
//                                 onClick={onConfirmDelete}
//                             >
//                                 Delete
//                             </button>
//                             <button
//                                 className="bg-white text-neutral-900 hover:bg-lightgray font-medium rounded-full px-6 py-3 text-center border border-gray w-full cursor-pointer transition-colors duration-500 ease-in-out"
//                                 onClick={onClose}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default DeleteRecipientModal;




// frontend/src/app/dashboard/components/DeleteRecipientModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface DeleteRecipientModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipientName: string;
    onConfirmDelete: () => void;
}

const DeleteRecipientModal: React.FC<DeleteRecipientModalProps> = ({
    isOpen,
    onClose,
    recipientName,
    onConfirmDelete,
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobileScreen = () => {
            setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (768px as an example)
        };

        checkMobileScreen(); // Initial check on mount

        window.addEventListener('resize', checkMobileScreen); // Add listener for resize

        return () => {
            window.removeEventListener('resize', checkMobileScreen); // Cleanup listener on unmount
        };
    }, []);

    const mobileVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
        exit: { y: 50, opacity: 0 },
    };

    const desktopVariants = {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
        exit: { y: -50, opacity: 0 },
    };

    const modalVariants = isMobile ? mobileVariants : desktopVariants;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl p-10 w-full sm:max-w-lg relative"
                        variants={modalVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <button
                            className="absolute top-4 right-4 p-3 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-colors duration-300 ease-in-out cursor-pointer"
                            onClick={onClose}
                        >
                            <IoClose size={28} className="text-neutral-900 dark:text-white" />
                        </button>
                        <h3 className="text-3xl font-semibold text-mainheading dark:text-white my-6">Delete recipient ?</h3>
                        <p className="text-gray dark:text-gray-300 font-medium mb-6">
                            You'll have to add {recipientName} again as a recipient to send money to them.
                        </p>
                        <div className="flex flex-col justify-center gap-4 mt-8">
                            <button
                                className="bg-primary text-neutral-900 hover:bg-primary/50 font-medium rounded-full px-6 py-3 text-center w-full cursor-pointer transition-colors duration-500 ease-in-out"
                                onClick={onConfirmDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-white text-neutral-900 hover:bg-lightgray font-medium rounded-full px-6 py-3 text-center border border-gray w-full cursor-pointer transition-colors duration-500 ease-in-out"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteRecipientModal;