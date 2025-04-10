// frontend/app/dashboard/transactions/[transactionId]/components/TransactionTimeline.tsx
import React from 'react';
import { cn } from "@/lib/utils"; // Adjust path
import { TimelineStep } from '../../../../types/transaction'; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path
import { MdErrorOutline } from "react-icons/md";
import { FaCheck, FaRegClock } from "react-icons/fa";

interface TransactionTimelineProps {
    steps: TimelineStep[];
    isPayment: boolean;
    status: string;
    isSubmitting: boolean;
    onOpenCancelModal: () => void;
}

const TransactionTimeline: React.FC<TransactionTimelineProps> = ({
    steps,
    isPayment,
    status,
    isSubmitting,
    onOpenCancelModal
}) => {
    if (!steps || steps.length === 0) {
        return (
            <p className="text-gray-500 dark:text-gray-400 text-sm py-4">
                Status updates are currently unavailable.
            </p>
        );
    }

    return (
        <div className="relative mt-2">
            <ul className="space-y-1">
                {steps.map((step, index) => (
                    <li key={step.id || index} className="flex items-start space-x-4 py-3 last:pb-0">
                        {/* Marker & Line */}
                        <div className="relative flex flex-col items-center flex-shrink-0 pt-1">
                            <div className={cn(
                                "h-5 w-5 rounded-full flex items-center justify-center ring-4 z-10",
                                step.status === "completed" && "bg-green-600 ring-green-100 dark:ring-green-900/50 text-white",
                                step.status === "active" && "bg-blue-500 ring-blue-100 dark:ring-blue-900/50 text-white animate-pulse",
                                step.status === "pending" && "bg-gray-300 dark:bg-gray-600 ring-gray-100 dark:ring-gray-700/50 text-gray-600 dark:text-gray-300",
                                (step.status === "failed" || step.status === "cancelled") && "bg-red-600 ring-red-100 dark:ring-red-900/50 text-white"
                            )}>
                                {step.status === "completed" && <FaCheck className="h-2.5 w-2.5" />}
                                {step.status === "active" && <FaRegClock className="h-2.5 w-2.5" />}
                                {(step.status === "failed" || step.status === "cancelled") && <MdErrorOutline className="h-3 w-3" />}
                                {step.status === "pending" && <div className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"></div>}
                            </div>
                            {index < steps.length - 1 && (
                                <div className={cn(
                                    "absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.25rem)] w-0.5",
                                    step.status === "completed" || step.status === "active" ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                                )} aria-hidden="true"></div>
                            )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0 pb-1">
                            <h4 className={cn(
                                "text-sm font-medium",
                                step.status === 'pending' ? 'text-gray-500 dark:text-gray-400' :
                                step.status === 'active' ? 'text-blue-600 dark:text-blue-400 font-semibold' :
                                (step.status === 'failed' || step.status === 'cancelled') ? 'text-red-600 dark:text-red-400 font-semibold' :
                                'text-neutral-800 dark:text-neutral-200'
                            )}>
                                {step.label}
                            </h4>
                            {step.date && (<p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.date}</p>)}
                            {step.info && (<div className={cn(
                                "mt-2 text-sm p-3 rounded-md border",
                                step.status === 'active' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-300' :
                                step.status === 'failed' ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300' :
                                step.status === 'cancelled' ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300' :
                                'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 text-gray-600 dark:text-gray-300'
                            )}>
                                <p>{step.info}</p>
                            </div>)}
                            {step.showCancelAction && isPayment && status === 'pending' && (
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="mt-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 h-auto px-0 py-0"
                                    onClick={onOpenCancelModal}
                                    disabled={isSubmitting}
                                >
                                    I haven't paid / Cancel
                                </Button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionTimeline;