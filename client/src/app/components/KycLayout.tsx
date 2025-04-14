// // frontend/src/app/kyc/components/KycLayout.tsx
// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import KycHeader from './KycHeader';
// import KycStepper from './KycStepper'; // Corrected import path

// interface KycLayoutProps {
//     children: React.ReactNode;
// }

// const pageVariants = {
//     initial: {
//         opacity: 0,
//         y: 20,
//     },
//     in: {
//         opacity: 1,
//         y: 0,
//     },
//     out: {
//         opacity: 0,
//         y: -20,
//     },
// };

// const pageTransition = {
//     type: 'tween', // Smoother transition
//     ease: 'anticipate', // Or 'easeInOut'
//     duration: 0.4,
// };

// const KycLayout: React.FC<KycLayoutProps> = ({ children }) => {
//     return (
//         <div className="flex flex-col min-h-screen bg-background dark:bg-background">
//             <KycHeader />
//             <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
//                 {/* Stepper Section */}
//                 <div className="mb-8 md:mb-12 max-w-2xl mx-auto">
//                     <KycStepper />
//                 </div>

//                 {/* Animated Page Content */}
//                 <motion.div
//                     key={React.useId()} // Use a changing key based on route or step if needed for re-animation
//                     initial="initial"
//                     animate="in"
//                     exit="out"
//                     variants={pageVariants}
//                     transition={pageTransition}
//                     className="w-full" // Ensure motion div takes full width
//                 >
//                     {children}
//                 </motion.div>
//             </main>
//         </div>
//     );
// };

// export default KycLayout;


// frontend/src/app/kyc/components/KycLayout.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { motion, AnimatePresence } from 'framer-motion';
import KycHeader from './KycHeader'; // Assuming path is correct
import KycStepper from './KycStepper'; // Assuming path is correct
import { useKyc } from '../contexts/KycContext'; // Import useKyc

interface KycLayoutProps {
    children: React.ReactNode;
}

// Animation variants for page transitions
const pageVariants = {
    initial: {
        opacity: 0,
        y: 20, // Start slightly below
        scale: 0.98,
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1], // Custom cubic bezier for smooth ease-in-out
        },
    },
    out: {
        opacity: 0,
        y: -20, // Exit slightly above
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1], // Faster ease-out
        },
    },
};

const KycLayoutComponent: React.FC<KycLayoutProps> = ({ children }) => {
    const pathname = usePathname(); // Get the current path
    const { currentUiStepId } = useKyc(); // Get the logical step/status

    // Determine if the stepper should be visible
    // Show stepper only for actual form steps, not for start, pending, rejected, complete, error
    const showStepper = ['personal', 'details', 'identity', 'upload', 'review'].includes(currentUiStepId);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/10 dark:from-background dark:to-black/20">
            <KycHeader />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
                {/* Stepper Section - Conditionally Rendered */}
                {showStepper && (
                    <div className="w-full max-w-3xl mb-8 md:mb-12 px-4">
                        <KycStepper />
                    </div>
                )}

                {/* Animated Page Content */}
                {/* AnimatePresence handles enter/exit animations when the key changes */}
                {/* Keying by pathname ensures animation triggers on route change */}
                <AnimatePresence mode="wait"> {/* 'wait' ensures exit animation finishes before enter starts */}
                    <motion.div
                        key={pathname} // Use pathname as key for route transitions
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        className="w-full flex justify-center" // Ensure motion div takes width and centers content
                    >
                        {/* Children (the actual page component) are rendered here */}
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
            {/* Optional Footer can be added here */}
        </div>
    );
};

export default KycLayoutComponent;