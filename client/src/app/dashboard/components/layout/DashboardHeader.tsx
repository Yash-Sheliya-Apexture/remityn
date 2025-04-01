// frontend/src/app/dashboard/components/layout/DashboardHeader.tsx
import React from 'react';
import { FaCheck } from 'react-icons/fa'; // Using react-icons for checkmark

interface DashboardHeaderProps {
    title: string;
    steps?: string[]; // Array of step names (e.g., ['Recipient', 'Amount', 'Review', 'Pay'])
    currentStep?: number; // The current active step (1-based index)
    // totalSteps is derived from steps.length
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    title,
    steps,
    currentStep,
}) => {
    const showSteps = steps && steps.length > 0 && currentStep && currentStep > 0;
    const totalSteps = steps ? steps.length : 0;

    // Validate currentStep (optional, but good practice)
    const validCurrentStep = (currentStep && currentStep > 0 && currentStep <= totalSteps) ? currentStep : 1;

    return (
        <div className="bg-white shadow-sm mb-6 md:mb-8 sticky top-0 z-20"> {/* Make header sticky */}
            <div className="container mx-auto px-4 py-4 md:py-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    {/* Title */}
                    <h1 className="text-xl md:text-2xl font-semibold text-main mb-3 md:mb-0">
                        {title}
                    </h1>

                    {/* Step Indicator */}
                    {showSteps && (
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {steps.map((stepName, index) => {
                                const stepNumber = index + 1;
                                const isCompleted = stepNumber < validCurrentStep;
                                const isActive = stepNumber === validCurrentStep;
                                const isUpcoming = stepNumber > validCurrentStep;

                                // --- Dynamic Classes ---
                                const circleBaseClasses = "w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ease-in-out";
                                const circleCompletedClasses = "bg-primary border-primary text-white";
                                const circleActiveClasses = "border-primary text-primary font-bold";
                                const circleUpcomingClasses = "border-gray-300 text-gray-400";

                                const textBaseClasses = "text-xs md:text-sm transition-colors duration-300 ease-in-out hidden sm:block ml-2"; // Hide text on very small screens
                                const textCompletedClasses = "text-primary font-medium";
                                const textActiveClasses = "text-primary font-bold";
                                const textUpcomingClasses = "text-gray-400";

                                const connectorBaseClasses = "flex-1 h-0.5 transition-colors duration-300 ease-in-out mx-1";
                                const connectorCompletedClasses = "bg-primary";
                                const connectorUpcomingClasses = "bg-gray-300";


                                return (
                                    <React.Fragment key={stepNumber}>
                                        {/* Connector Line (before step, except first) */}
                                        {index > 0 && (
                                            <div
                                                className={`${connectorBaseClasses} ${
                                                    isCompleted || isActive ? connectorCompletedClasses : connectorUpcomingClasses
                                                }`}
                                            />
                                        )}

                                        {/* Step Circle and Text */}
                                        <div className="flex items-center flex-shrink-0">
                                            <div
                                                className={`${circleBaseClasses} ${
                                                    isCompleted ? circleCompletedClasses : isActive ? circleActiveClasses : circleUpcomingClasses
                                                }`}
                                            >
                                                {isCompleted ? <FaCheck size={12} /> : stepNumber}
                                            </div>
                                            <span
                                                className={`${textBaseClasses} ${
                                                    isCompleted ? textCompletedClasses : isActive ? textActiveClasses : textUpcomingClasses
                                                }`}
                                            >
                                                {stepName}
                                            </span>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;