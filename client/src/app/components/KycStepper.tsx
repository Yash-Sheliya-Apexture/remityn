// // src/app/kyc/components/KycStepper.tsx
// 'use client';

// import React from 'react';
// import { useKyc } from '../contexts/KycContext'; // Import the hook
// import { Check, Circle } from 'lucide-react'; // Example icons

// // Define the steps and their labels, matching the order in KycContext
// const steps = [
//     { id: 'personal', label: 'Personal' },
//     { id: 'details', label: 'Details' },
//     { id: 'identity', label: 'Identity' },
//     { id: 'upload', label: 'Upload' },
//     { id: 'review', label: 'Review' }, // Optional review step
// ] as const; // Use 'as const' for type safety on id

// type StepId = typeof steps[number]['id'];

// export default function KycStepper() {
//     const { currentStep } = useKyc();

//     // Determine the index of the current step
//     const currentStepIndex = steps.findIndex(step => step.id === currentStep);

//     // Don't show stepper on non-form pages like start, pending, rejected
//     if (!steps.some(step => step.id === currentStep)) {
//         return null;
//     }

//     return (
//         <nav aria-label="Progress">
//             <ol
//                 role="list"
//                 className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8"
//             >
//                 {steps.map((step, stepIdx) => {
//                     const isCompleted = currentStepIndex > stepIdx;
//                     const isCurrent = currentStepIndex === stepIdx;

//                     return (
//                         <li key={step.label} className="relative flex-1 w-full sm:w-auto">
//                             {/* Connecting line (except for the first item) */}
//                             {stepIdx > 0 && (
//                                 <div
//                                     className={`absolute left-0 top-6 h-0.5 w-full bg-gray-300 dark:bg-gray-600 hidden sm:block ${
//                                         isCompleted || isCurrent ? 'sm:bg-primary' : ''
//                                     }`}
//                                     aria-hidden="true"
//                                 />
//                             )}
//                             {/* Vertical line for mobile */}
//                             {stepIdx < steps.length - 1 && (
//                                <div
//                                    className={`absolute left-4 top-8 -ml-px mt-1 h-[calc(100%-2rem)] w-0.5 bg-gray-300 dark:bg-gray-600 sm:hidden ${
//                                        isCompleted ? 'bg-primary' : ''
//                                    }`}
//                                    aria-hidden="true"
//                                />
//                             )}


//                             <div className="relative flex items-center space-x-3">
//                                 {/* Step Indicator Circle/Icon */}
//                                 <div
//                                     className={`flex h-8 w-8 items-center justify-center rounded-full ${
//                                         isCompleted
//                                             ? 'bg-primary text-white'
//                                             : isCurrent
//                                             ? 'border-2 border-primary bg-white dark:bg-secondary text-primary'
//                                             : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-secondary text-gray-500 dark:text-gray-400'
//                                     }`}
//                                 >
//                                     {isCompleted ? (
//                                         <Check className="h-5 w-5" aria-hidden="true" />
//                                     ) : isCurrent ? (
//                                          <span className="h-2.5 w-2.5 bg-primary rounded-full" aria-hidden="true" />
//                                     ) : (
//                                          <span className="h-2.5 w-2.5 bg-gray-300 dark:bg-gray-600 rounded-full" aria-hidden="true" />
//                                         // Or use <Circle className="h-5 w-5" />
//                                     )}
//                                 </div>

//                                 {/* Step Label */}
//                                 <span
//                                     className={`text-sm font-medium ${
//                                         isCurrent
//                                             ? 'text-primary dark:text-blue-400'
//                                             : isCompleted
//                                             ? 'text-gray-900 dark:text-gray-100'
//                                             : 'text-gray-500 dark:text-gray-400'
//                                     }`}
//                                 >
//                                     {step.label}
//                                 </span>
//                             </div>
//                         </li>
//                     );
//                 })}
//             </ol>
//         </nav>
//     );
// }


// // frontend/src/app/kyc/components/KycStepper.tsx
// 'use client';

// import React from 'react';
// import { useKyc } from '../contexts/KycContext';
// import { Check, CircleDot, Circle } from 'lucide-react'; // Using CircleDot for current step

// // Define the steps and their IDs matching KycStepId and formStepOrder in KycContext
// const steps: { id: 'personal' | 'details' | 'identity' | 'upload' | 'review'; label: string }[] = [
//     { id: 'personal', label: 'Personal' },
//     { id: 'details', label: 'Details' },
//     { id: 'identity', label: 'Identity' },
//     { id: 'upload', label: 'Upload' },
//     { id: 'review', label: 'Review' },
// ];

// export default function KycStepper() {
//     const { currentStepId } = useKyc(); // Get the current logical step ID

//     // Find the index of the current step in our defined order
//     const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

//     // If the currentStepId isn't one of the form steps, don't render the stepper
//     if (currentStepIndex === -1) {
//         return null;
//     }

//     return (
//         <nav aria-label="Progress">
//             <ol role="list" className="flex items-center">
//                 {steps.map((step, stepIdx) => {
//                     const isCompleted = currentStepIndex > stepIdx;
//                     const isCurrent = currentStepIndex === stepIdx;
//                     const isUpcoming = currentStepIndex < stepIdx;

//                     return (
//                         <li key={step.id} className={`relative flex-1 ${stepIdx < steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
//                             {/* Completed Step */}
//                             {isCompleted ? (
//                                 <>
//                                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                                         <div className="h-0.5 w-full bg-primary" /> {/* Completed line */}
//                                     </div>
//                                     <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:bg-primary/90">
//                                         <Check className="h-5 w-5 text-white" aria-hidden="true" />
//                                         <span className="sr-only">{step.label} - Completed</span>
//                                     </div>
//                                      <div className="absolute left-0 top-10 w-max text-center">
//                                         <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{step.label}</span>
//                                     </div>
//                                 </>
//                             ) : isCurrent ? (
//                                 <>
//                                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                                         <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" /> {/* Line before current */}
//                                     </div>
//                                     <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white dark:bg-secondary">
//                                          <CircleDot className="h-5 w-5 text-primary" aria-hidden="true" />
//                                         <span className="sr-only">{step.label} - Current</span>
//                                     </div>
//                                      <div className="absolute left-0 top-10 w-max text-center">
//                                         <span className="text-xs font-medium text-primary">{step.label}</span>
//                                     </div>
//                                 </>
//                             ) : ( // Upcoming Step
//                                 <>
//                                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                                         <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" /> {/* Upcoming line */}
//                                     </div>
//                                     <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-secondary hover:border-gray-400 dark:hover:border-gray-500">
//                                          <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//                                         <span className="sr-only">{step.label} - Upcoming</span>
//                                     </div>
//                                      <div className="absolute left-0 top-10 w-max text-center">
//                                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{step.label}</span>
//                                      </div>
//                                 </>
//                             )}
//                         </li>
//                     );
//                 })}
//             </ol>
//         </nav>
//     );
// }


// // frontend/src/app/kyc/components/KycStepper.tsx
// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { useKyc } from '../contexts/KycContext'; // Adjust path
// import { Check, CircleDot, Circle } from 'lucide-react'; // Lucide icons
// import { cn } from "@/lib/utils"; // For conditional classes

// // Define the steps and their IDs matching KycStepId and formStepOrder in KycContext
// const steps: { id: 'personal' | 'details' | 'identity' | 'upload' | 'review'; label: string }[] = [
//     { id: 'personal', label: 'Personal' },
//     { id: 'details', label: 'Details' },
//     { id: 'identity', label: 'Identity' },
//     { id: 'upload', label: 'Upload' },
//     { id: 'review', label: 'Review' },
// ];

// export default function KycStepper() {
//     const { currentUiStepId } = useKyc(); // Get the current logical step ID from context

//     // Find the index of the current step in our defined order
//     const currentStepIndex = steps.findIndex(step => step.id === currentUiStepId);

//     // Stepper is only relevant for form steps, handled by layout now
//     // if (currentStepIndex === -1) {
//     //     return null; // Don't render if not a form step
//     // }

//     return (
//         <nav aria-label="KYC Progress">
//             <ol role="list" className="flex items-center justify-between">
//                 {steps.map((step, stepIdx) => {
//                     const isCompleted = currentStepIndex > stepIdx;
//                     const isCurrent = currentStepIndex === stepIdx;
//                     // const isUpcoming = currentStepIndex < stepIdx; // Not explicitly needed for styling

//                     const status = isCompleted ? 'complete' : isCurrent ? 'current' : 'upcoming';

//                     return (
//                         <li key={step.id} className={cn(
//                             "relative flex-1",
//                             // Add padding to the right for all but the last item to make space for the line
//                             stepIdx < steps.length - 1 ? 'pr-10 md:pr-16' : ''
//                         )}>
//                             {/* Connecting Line (except for the first item) */}
//                             {stepIdx > 0 && (
//                                 <div
//                                     className="absolute left-[-50%] top-4 -z-10 hidden h-0.5 w-full md:block"
//                                     aria-hidden="true"
//                                 >
//                                     <motion.div
//                                          className={cn(
//                                             "h-full rounded-full",
//                                             status === 'complete' || status === 'current' ? 'bg-primary' : 'bg-border'
//                                         )}
//                                         // Animate line completion
//                                         initial={{ scaleX: 0 }}
//                                         animate={{ scaleX: (status === 'complete' || status === 'current') ? 1 : 0 }}
//                                         transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
//                                         style={{ transformOrigin: 'left' }}
//                                     />
//                                 </div>
//                             )}

//                             {/* Step Marker (Icon + Text) */}
//                             <div className="flex flex-col items-center text-center gap-2">
//                                 <motion.div
//                                     className={cn(
//                                         "relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300",
//                                         status === 'complete' ? 'border-primary bg-primary' :
//                                         status === 'current' ? 'border-primary bg-background dark:bg-secondary' :
//                                         'border-border bg-background dark:bg-secondary'
//                                     )}
//                                     // Animate scale/pop effect on status change
//                                     initial={{ scale: 0.8, opacity: 0.8 }}
//                                     animate={{ scale: 1, opacity: 1 }}
//                                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                                 >
//                                     {status === 'complete' && <Check className="h-5 w-5 text-primary-foreground" aria-hidden="true" />}
//                                     {status === 'current' && <CircleDot className="h-5 w-5 text-primary animate-pulse" aria-hidden="true" />}
//                                     {status === 'upcoming' && <Circle className="h-5 w-5 text-muted-foreground/50" aria-hidden="true" />}
//                                     <span className="sr-only">{step.label} - {status}</span>
//                                 </motion.div>

//                                 {/* Label */}
//                                 <span className={cn(
//                                     "text-xs font-medium transition-colors duration-300",
//                                      status === 'complete' ? 'text-primary' :
//                                      status === 'current' ? 'text-primary font-semibold' :
//                                      'text-muted-foreground'
//                                 )}>
//                                     {step.label}
//                                 </span>
//                             </div>
//                         </li>
//                     );
//                 })}
//             </ol>
//         </nav>
//     );
// }


// frontend/src/app/kyc/components/KycStepper.tsx
// (No changes needed)
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useKyc, formStepOrder } from '../contexts/KycContext'; // Correct relative path
import { Check, CircleDot, Circle } from 'lucide-react'; // Lucide icons
import { cn } from "@/lib/utils"; // For conditional classes

// Define the steps and their IDs matching KycStepId and formStepOrder in KycContext
const steps: { id: typeof formStepOrder[number]; label: string }[] = [
    { id: 'personal', label: 'Personal' },
    { id: 'details', label: 'Details' },
    { id: 'identity', label: 'Identity' },
    { id: 'upload', label: 'Upload' },
    { id: 'review', label: 'Review' },
];

export default function KycStepper() {
    const { currentUiStepId } = useKyc(); // Get the current logical step ID from context

    // Find the index of the current step in our defined order
    const currentStepIndex = steps.findIndex(step => step.id === currentUiStepId);

    // Stepper visibility is now handled by the KycLayoutComponent based on currentUiStepId
    // No need for a check here if the layout conditionally renders it.

    return (
        <nav aria-label="KYC Progress">
            <ol role="list" className="flex items-center justify-between">
                {steps.map((step, stepIdx) => {
                    const isCompleted = currentStepIndex > stepIdx;
                    const isCurrent = currentStepIndex === stepIdx;

                    const status = isCompleted ? 'complete' : isCurrent ? 'current' : 'upcoming';

                    return (
                        <li key={step.id} className={cn(
                            "relative flex-1",
                            // Add padding to the right for all but the last item to make space for the line
                            stepIdx < steps.length - 1 ? 'pr-10 md:pr-16' : ''
                        )}>
                            {/* Connecting Line (except for the first item) */}
                            {stepIdx > 0 && (
                                <div
                                    className="absolute left-[-50%] top-4 -z-10 hidden h-0.5 w-full md:block"
                                    aria-hidden="true"
                                >
                                    <motion.div
                                         className={cn(
                                            "h-full rounded-full",
                                            status === 'complete' || status === 'current' ? 'bg-primary' : 'bg-border'
                                        )}
                                        // Animate line completion
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: (status === 'complete' || status === 'current') ? 1 : 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
                                        style={{ transformOrigin: 'left' }}
                                    />
                                </div>
                            )}

                            {/* Step Marker (Icon + Text) */}
                            <div className="flex flex-col items-center text-center gap-2">
                                <motion.div
                                    className={cn(
                                        "relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300",
                                        status === 'complete' ? 'border-primary bg-primary' :
                                        status === 'current' ? 'border-primary bg-background dark:bg-secondary' :
                                        'border-border bg-background dark:bg-secondary'
                                    )}
                                    // Animate scale/pop effect on status change
                                    initial={{ scale: 0.8, opacity: 0.8 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    {status === 'complete' && <Check className="h-5 w-5 text-primary-foreground" aria-hidden="true" />}
                                    {status === 'current' && <CircleDot className="h-5 w-5 text-primary animate-pulse" aria-hidden="true" />}
                                    {status === 'upcoming' && <Circle className="h-5 w-5 text-muted-foreground/50" aria-hidden="true" />}
                                    <span className="sr-only">{step.label} - {status}</span>
                                </motion.div>

                                {/* Label */}
                                <span className={cn(
                                    "text-xs font-medium transition-colors duration-300",
                                     status === 'complete' ? 'text-primary' :
                                     status === 'current' ? 'text-primary font-semibold' :
                                     'text-muted-foreground'
                                )}>
                                    {step.label}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}