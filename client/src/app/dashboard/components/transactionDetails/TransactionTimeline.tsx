// // frontend/app/dashboard/transactions/[transactionId]/components/TransactionTimeline.tsx
// import React from 'react';
// import { cn } from "@/lib/utils"; // Adjust path
// import { TimelineStep } from '../../../../types/transaction'; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import { MdErrorOutline } from "react-icons/md";
// import { FaCheck, FaRegClock } from "react-icons/fa";

// interface TransactionTimelineProps {
//     steps: TimelineStep[];
//     isPayment: boolean;
//     status: string;
//     isSubmitting: boolean;
//     onOpenCancelModal: () => void;
// }

// const TransactionTimeline: React.FC<TransactionTimelineProps> = ({
//     steps,
//     isPayment,
//     status,
//     isSubmitting,
//     onOpenCancelModal
// }) => {
//     if (!steps || steps.length === 0) {
//         return (
//             <p className="text-gray-500 dark:text-gray-300 text-sm py-4">
//                 Status updates are currently unavailable.
//             </p>
//         );
//     }

//     return (
//         <div className="relative mt-2">
//             <ul className="space-y-1">
//                 {steps.map((step, index) => (
//                     <li key={step.id || index} className="flex items-start space-x-4 py-3 last:pb-0">
//                         {/* Marker & Line */}
//                         <div className="relative z-0 flex flex-col items-center flex-shrink-0 pt-1">
//                             <div className={cn(
//                                 "h-6 w-6 rounded-full flex items-center justify-center ring-4 z-10",
//                                 step.status === "completed" && "bg-green-600 ring-green-600/40 text-white",
//                                 step.status === "active" && "bg-blue-500 ring-blue-600/30 text-white animate-pulse",
//                                 step.status === "pending" && "bg-gray-500  ring-gray-600/30 dark:ring-gray-600/50 text-white",
//                                 (step.status === "failed" || step.status === "cancelled") && "bg-red-600 ring-red-600/20 text-white"
//                             )}>
//                                 {step.status === "completed" && <FaCheck size={12} />}
//                                 {step.status === "active" && <FaRegClock size={12}/>}
//                                 {(step.status === "failed" || step.status === "cancelled") && <MdErrorOutline size={16} />}
//                                 {step.status === "pending" && <div className="h-2 w-2 bg-white rounded-full"></div>}
//                             </div>
//                             {index < steps.length - 1 && (
//                                 <div className={cn(
//                                     "absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.25rem)] w-0.5",
//                                     step.status === "completed" ? "bg-green-600" :
//                                     (step.status === 'failed' || step.status === 'cancelled') ? 'bg-red-600' :
//                                     step.status === "active" ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-500"
//                                 )} aria-hidden="true"></div>
//                             )}
//                         </div>

//                         {/* Step Content */}
//                         <div className="flex-1 min-w-0 pb-1">
//                             <h4 className={cn(
//                                 "text-sm font-medium",
//                                 step.status === 'pending' ? 'text-gray-500 dark:text-gray-300' :
//                                 step.status === 'active' ? 'text-blue-600 dark:text-blue-400 font-semibold' :
//                                 (step.status === 'failed' || step.status === 'cancelled') ? 'text-red-600 dark:text-red-400 font-semibold' :
//                                 'text-neutral-900 dark:text-white'
//                             )}>
//                                 {step.label}
//                             </h4>
//                             {step.date && (<p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">{step.date}</p>)}
//                             {step.info && (<div className={cn(
//                                 "mt-4 text-sm p-3 rounded-md border",
//                                 step.status === 'active' ? 'bg-blue-600/20 dark:border-none text-blue-600 dark:text-blue-400' :
//                                 step.status === 'failed' ? 'bg-rose-600/10 border-rose-600/70 text-rose-600 dark:text-rose-300' :
//                                 step.status === 'cancelled' ? 'bg-red-600/20 border-red-600/60 text-red-600 dark:text-red-400' :
//                                 'bg-gray-600/20 border-gray-600/60 text-gray-600 dark:text-gray-300'
//                             )}>
//                                 <p>{step.info}</p>
//                             </div>)}
                            
//                             {step.showCancelAction && isPayment && status === 'pending' && (
//                                 <button
//                                     className="mt-3 px-3 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all duration-75 ease-linear cursor-pointer"
//                                     onClick={onOpenCancelModal}
//                                     disabled={isSubmitting}
//                                 >
//                                     I haven't paid / Cancel
//                                 </button>
//                             )}
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TransactionTimeline;


// frontend/app/dashboard/transactions/[transactionId]/components/TransactionTimeline.tsx
import React from 'react';
import { cn } from "@/lib/utils"; // Adjust path
import { TimelineStep, TimelineStatus } from '../../../../types/transaction'; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path
import { MdErrorOutline, MdCancel } from "react-icons/md";
import { FaCheck, FaRegClock, FaSpinner } from "react-icons/fa"; // Added FaSpinner

interface TransactionTimelineProps {
    steps: TimelineStep[];
    isPayment: boolean;
    status: string; // Keep original status string for generic checks
    isSubmitting: boolean; // Loading state specifically for the cancel action in the timeline
    onOpenCancelModal: () => void;
    canCancel: boolean; // Explicit prop to control cancel button visibility
}

const TransactionTimeline: React.FC<TransactionTimelineProps> = ({
    steps,
    isPayment,
    status,
    isSubmitting,
    onOpenCancelModal,
    canCancel // Use this prop
}) => {
    if (!steps || steps.length === 0) {
        return (
            <p className="text-gray-500 dark:text-gray-300 text-sm py-4">
                Status updates are currently unavailable.
            </p>
        );
    }

     // Helper function to get icon based on timeline step status
     const getStatusIcon = (stepStatus: TimelineStatus) => {
        switch (stepStatus) {
            case 'completed': return <FaCheck size={12} />;
            case 'active': return <FaRegClock size={12} />;
            case 'failed': return <MdErrorOutline size={16} />;
            case 'cancelled': return <MdCancel size={14} />; // Using MdCancel for cancelled
            case 'pending': return <div className="h-2 w-2 bg-white rounded-full"></div>;
            default: return null;
        }
    };

    // Helper function to get icon background/ring color
     const getStatusColorClasses = (stepStatus: TimelineStatus) => {
         switch (stepStatus) {
             case 'completed': return "bg-green-600 ring-green-600/40 text-white";
             case 'active': return "bg-blue-500 ring-blue-600/30 text-white animate-pulse";
             case 'pending': return "bg-gray-400 dark:bg-gray-500 ring-gray-500/30 dark:ring-gray-600/50 text-white";
             case 'failed': return "bg-red-600 ring-red-600/20 text-white";
             case 'cancelled': return "bg-gray-600 dark:bg-gray-700 ring-gray-600/30 dark:ring-gray-700/50 text-white"; // Gray for cancelled
             default: return "bg-gray-400 ring-gray-500/30";
         }
     };

      // Helper function to get line color
      const getLineColorClass = (stepStatus: TimelineStatus) => {
          switch (stepStatus) {
              case 'completed': return "bg-green-600";
              case 'active': return "bg-blue-500"; // Line matches active color
              case 'failed': return "bg-red-600";
              case 'cancelled': return "bg-gray-600 dark:bg-gray-700"; // Gray line for cancelled
              case 'pending': return "bg-gray-300 dark:bg-gray-500"; // Default for pending
              default: return "bg-gray-300 dark:bg-gray-500";
          }
      };

       // Helper function to get text color based on step status
       const getTextColorClass = (stepStatus: TimelineStatus) => {
           switch (stepStatus) {
               case 'completed': return 'text-neutral-900 dark:text-white';
               case 'active': return 'text-blue-600 dark:text-blue-400 font-semibold';
               case 'pending': return 'text-gray-500 dark:text-gray-400'; // Less prominent for pending text
               case 'failed': return 'text-red-600 dark:text-red-400 font-semibold';
               case 'cancelled': return 'text-gray-700 dark:text-gray-300 font-semibold'; // Distinct color for cancelled
               default: return 'text-gray-500 dark:text-gray-400';
           }
       };

        // Helper function to get info box style
        const getInfoBoxClass = (stepStatus: TimelineStatus) => {
             switch (stepStatus) {
                 case 'active': return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-300';
                 case 'failed': return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300';
                 case 'cancelled': return 'bg-gray-100 dark:bg-neutral-800/40 border-gray-200 dark:border-neutral-700/50 text-gray-700 dark:text-gray-300'; // Style for cancelled info
                 default: return 'bg-gray-50 dark:bg-neutral-800/30 border-gray-200 dark:border-neutral-700/50 text-gray-600 dark:text-gray-300'; // Default/pending info style
             }
         };


    return (
        <div className="relative mt-2">
            <ul className="space-y-1">
                {steps.map((step, index) => (
                    <li key={step.id || index} className="flex items-start space-x-4 py-3 last:pb-0">
                        {/* Marker & Line */}
                        <div className="relative z-0 flex flex-col items-center flex-shrink-0 pt-1">
                            {/* Marker */}
                            <div className={cn(
                                "h-6 w-6 rounded-full flex items-center justify-center ring-4 z-10",
                                getStatusColorClasses(step.status)
                            )}>
                                {getStatusIcon(step.status)}
                            </div>
                            {/* Line */}
                            {index < steps.length - 1 && (
                                <div className={cn(
                                    "absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.25rem)] w-0.5",
                                     // Line color should depend on the *current* step's status
                                     // to show progress up to that point.
                                    getLineColorClass(step.status)
                                )} aria-hidden="true"></div>
                            )}
                             {/* Line Segment for steps *after* a failed/cancelled one */}
                             {index < steps.length - 1 && (step.status === 'failed' || step.status === 'cancelled') && (
                                 <div className={cn(
                                     "absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.25rem)] w-0.5",
                                     "bg-gray-300 dark:bg-gray-500" // Subsequent lines are inactive gray
                                 )} aria-hidden="true" style={{ zIndex: -1 }}></div> // Ensure it's behind the colored part
                             )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0 pb-1">
                            {/* Label */}
                            <h4 className={cn(
                                "text-sm font-medium",
                                getTextColorClass(step.status) // Use helper for text color
                            )}>
                                {step.label}
                            </h4>
                            {/* Date */}
                            {step.date && (<p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">{step.date}</p>)}
                            {/* Info Box */}
                            {step.info && (<div className={cn(
                                "mt-2 text-xs p-3 rounded-md border", // Adjusted margin/padding/size
                                getInfoBoxClass(step.status) // Use helper for styling
                            )}>
                                <p>{step.info}</p>
                            </div>)}

                            {/* Cancel Action Button - Conditionally rendered */}
                            {step.showCancelAction && canCancel && (
                                <button
                                    className={cn(
                                        "mt-3 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ease-linear cursor-pointer flex items-center gap-1.5",
                                        "text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
                                        )}
                                    onClick={onOpenCancelModal}
                                    disabled={isSubmitting} // Disable button while cancel is in progress
                                >
                                     {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin" size={12}/>
                                            <span>Cancelling...</span>
                                        </>
                                    ) : (
                                        isPayment ? "I haven't paid / Cancel" : "Cancel Transfer"
                                    )}
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionTimeline;