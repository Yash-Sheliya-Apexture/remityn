// // frontend/src/app/dashboard/components/layout/DashboardHeader.tsx
// import React from "react";
// import { FaCheck } from "react-icons/fa"; // Using react-icons for checkmark

// interface DashboardHeaderProps {
//   title: string;
//   steps?: string[]; // Array of step names (e.g., ['Recipient', 'Amount', 'Review', 'Pay'])
//   currentStep?: number; // The current active step (1-based index)
//   // totalSteps is derived from steps.length
// }

// const DashboardHeader: React.FC<DashboardHeaderProps> = ({
//   title,
//   steps,
//   currentStep,
// }) => {
//   const showSteps = steps && steps.length > 0 && currentStep && currentStep > 0;
//   const totalSteps = steps ? steps.length : 0;

//   // Validate currentStep (optional, but good practice)
//   const validCurrentStep =
//     currentStep && currentStep > 0 && currentStep <= totalSteps
//       ? currentStep
//       : 1;

//   return (
//     <div className="bg-white dark:bg-background mb-6 md:mb-8 sticky top-0 z-20">
//       {" "}
//       {/* Make header sticky */}
//       <div className="container mx-auto px-4 py-4 md:py-5">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//           {/* Title */}
//           <h1 className="text-xl md:text-2xl font-semibold text-main dark:text-white mb-3 md:mb-0">
//             {title}
//           </h1>

//           {/* Step Indicator */}
//           {showSteps && (
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               {steps.map((stepName, index) => {
//                 const stepNumber = index + 1;
//                 const isCompleted = stepNumber < validCurrentStep;
//                 const isActive = stepNumber === validCurrentStep;
//                 const isUpcoming = stepNumber > validCurrentStep;

//                 // --- Dynamic Classes ---
//                 const circleBaseClasses =
//                   "w-6 h-6 md:size-8  rounded-full flex items-center justify-center border-2 transition-colors duration-300 ease-in-out";
//                 const circleCompletedClasses =
//                   "bg-primary border-primary text-mainheading";
//                 const circleActiveClasses =
//                   "border-primary text-primary font-bold";
//                 const circleUpcomingClasses = "border-gray-300 text-white";

//                 const textBaseClasses =
//                   "text-xs md:text-lg transition-colors duration-300 ease-in-out hidden sm:block ml-2"; // Hide text on very small screens
//                 const textCompletedClasses = "text-primary font-medium";
//                 const textActiveClasses = "text-primary font-bold";
//                 const textUpcomingClasses = "text-gray-400";

//                 const connectorBaseClasses =
//                   "flex-1 h-0.5 transition-colors duration-300 ease-in-out mx-1";
//                 const connectorCompletedClasses = "bg-primary";
//                 const connectorUpcomingClasses = "bg-gray-300";

//                 return (
//                   <React.Fragment key={stepNumber}>
//                     {/* Connector Line (before step, except first) */}
//                     {index > 0 && (
//                       <div
//                         className={`${connectorBaseClasses} ${
//                           isCompleted || isActive
//                             ? connectorCompletedClasses
//                             : connectorUpcomingClasses
//                         }`}
//                       />
//                     )}

//                     {/* Step Circle and Text */}
//                     <div className="flex items-center flex-shrink-0">
//                       <div
//                         className={`${circleBaseClasses} ${
//                           isCompleted
//                             ? circleCompletedClasses
//                             : isActive
//                             ? circleActiveClasses
//                             : circleUpcomingClasses
//                         }`}
//                       >
//                         {isCompleted ? <FaCheck size={16} /> : stepNumber}
//                       </div>
//                       <span
//                         className={`${textBaseClasses} ${
//                           isCompleted
//                             ? textCompletedClasses
//                             : isActive
//                             ? textActiveClasses
//                             : textUpcomingClasses
//                         }`}
//                       >
//                         {stepName}
//                       </span>
//                     </div>
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;

// import React from "react";
// import { FaCheck } from "react-icons/fa";

// interface DashboardHeaderProps {
//   title: string;
//   steps?: string[]; // Array of step names (e.g., ['Recipient', 'Amount', 'Review', 'Pay'])
//   currentStep?: number; // The current active step (1-based index)
//   // totalSteps is derived from steps.length
// }

// const DashboardHeader: React.FC<DashboardHeaderProps> = ({
//   title,
//   steps,
//   currentStep,
// }) => {
//   const showSteps = steps && steps.length > 0 && currentStep && currentStep > 0;
//   const totalSteps = steps ? steps.length : 0;

//   // Validate currentStep (optional, but good practice)
//   const validCurrentStep =
//     currentStep && currentStep > 0 && currentStep <= totalSteps
//       ? currentStep
//       : 1;

//   return (
//     <div className="bg-background sticky lg:top-28 top-20 z-20 pb-5">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           {/* Title */}
//           <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-mainheadingWhite">
//             {title}
//           </h1>

//           {/* Step Indicator - Preserving the original responsive behavior */}
//           {showSteps && (
//             <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto">
//               {steps.map((stepName, index) => {
//                 const stepNumber = index + 1;
//                 const isCompleted = stepNumber < validCurrentStep;
//                 const isActive = stepNumber === validCurrentStep;
//                 const isUpcoming = stepNumber > validCurrentStep;

//                 return (
//                   <React.Fragment key={stepNumber}>
//                     {/* Connector Line (before step, except first) */}
//                     {index > 0 && (
//                       <div
//                         className={`flex-1 h-0.5 transition-all duration-75 ease-linear  ${
//                           isCompleted || isActive
//                             ? "bg-primary"
//                             : "bg-mainheadingWhite"
//                         }`}
//                       />
//                     )}

//                     {/* Step Circle and Text */}
//                     <div className="flex flex-col gap-3 items-center flex-shrink-0 py-2">
//                       <div
//                         className={`sm:size-10 size-8 rounded-full flex shrink-0 items-center justify-center border-2 transition-all duration-75 ease-linear ${
//                           isCompleted
//                             ? "bg-primary border-primary text-mainheading"
//                             : isActive
//                             ? "border-primary text-primary font-bold ring-3 ring-primary/40"
//                             : "text-mainheadingWhite border-subheadingWhite"
//                         }`}
//                       >
//                         {isCompleted ? <FaCheck size={20} /> : stepNumber}
//                       </div>

//                       <span
//                         className={`text-xs md:text-base capitalize transition-all duration-75 ease-linear hidden sm:block ml-2 ${
//                           isCompleted
//                             ? "text-primary font-medium"
//                             : isActive
//                             ? "text-primary font-bold"
//                             : "text-mainheadingWhite"
//                         }`}
//                       >
//                         {stepName}
//                       </span>
//                     </div>
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;

// import React from "react";
// import { FaCheck } from "react-icons/fa";

// interface DashboardHeaderProps {
//   title: string;
//   steps?: string[]; // Array of step names (e.g., ['Recipient', 'Amount', 'Review', 'Pay'])
//   currentStep?: number; // The current active step (1-based index)
//   // totalSteps is derived from steps.length
// }

// const DashboardHeader: React.FC<DashboardHeaderProps> = ({
//   title,
//   steps,
//   currentStep,
// }) => {
//   const showSteps = steps && steps.length > 0 && currentStep && currentStep > 0;
//   const totalSteps = steps ? steps.length : 0;

//   // Validate currentStep (optional, but good practice)
//   const validCurrentStep =
//     currentStep && currentStep > 0 && currentStep <= totalSteps
//       ? currentStep
//       : 1;

//   return (
//     <div className="bg-background sticky lg:top-28 top-20 z-20 pb-5">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           {/* Title */}
//           <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-mainheadingWhite">
//             {title}
//           </h1>

//           {/* Step Indicator - Preserving the original responsive behavior */}
//           {showSteps && (
//             <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto">
//               {steps.map((stepName, index) => {
//                 const stepNumber = index + 1;
//                 const isCompleted = stepNumber < validCurrentStep;
//                 const isActive = stepNumber === validCurrentStep;
//                 const isUpcoming = stepNumber > validCurrentStep;

//                 return (
//                   <React.Fragment key={stepNumber}>
//                     {/* Connector Line (before step, except first) */}
//                     {index > 0 && (
//                       <div
//                         className={`flex-1 h-0.5 transition-all duration-75 ease-linear  ${
//                           isCompleted || isActive
//                             ? "bg-primary"
//                             : "bg-mainheadingWhite"
//                         }`}
//                       />
//                     )}

//                     {/* Step Circle and Text */}
//                     <div className="flex items-center flex-shrink-0 py-2">
//                       <div
//                         className={`sm:size-10 size-8 rounded-full flex flex-shrink-0 items-center justify-center border-2 transition-all duration-75 ease-linear ${
//                           isCompleted
//                             ? "bg-primary border-primary text-mainheading"
//                             : isActive
//                             ? "border-primary text-primary font-bold ring-3 ring-primary/40"
//                             : "text-mainheadingWhite border-subheadingWhite"
//                         }`}
//                       >
//                         {isCompleted ? <FaCheck size={20} /> : stepNumber}
//                       </div>

//                       <span
//                         className={`text-xs md:text-base capitalize transition-all duration-75 ease-linear hidden sm:block ml-2 ${
//                           isCompleted
//                             ? "text-primary font-medium"
//                             : isActive
//                             ? "text-primary font-bold"
//                             : "text-mainheadingWhite"
//                         }`}
//                       >
//                         {stepName}
//                       </span>
//                     </div>
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;


// import React from "react";
// import { FaCheck } from "react-icons/fa";

// interface DashboardHeaderProps {
//   title: string;
//   steps?: string[]; // Array of step names (e.g., ['Recipient', 'Amount', 'Review', 'Pay'])
//   currentStep?: number; // The current active step (1-based index)
//   // totalSteps is derived from steps.length
// }

// const DashboardHeader: React.FC<DashboardHeaderProps> = ({
//   title,
//   steps,
//   currentStep,
// }) => {
//   const showSteps = steps && steps.length > 0 && currentStep && currentStep > 0;
//   const totalSteps = steps ? steps.length : 0;

//   // Validate currentStep (optional, but good practice)
//   const validCurrentStep =
//     currentStep && currentStep > 0 && currentStep <= totalSteps
//       ? currentStep
//       : 1;

//   return (
//     <div className="bg-background sticky lg:top-28 top-20 z-20 pb-5">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           {/* Title */}
//           <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-mainheadingWhite">
//             {title}
//           </h1>

//           {/* Step Indicator */}
//           {showSteps && (
//             <div className="flex items-center md:space-x-4">
//               {steps.map((stepName, index) => {
//                 const stepNumber = index + 1;
//                 const isCompleted = stepNumber < validCurrentStep;
//                 const isActive = stepNumber === validCurrentStep;
//                 // const isUpcoming = stepNumber > validCurrentStep; // Defined but not directly used for styling here

//                 return (
//                   <React.Fragment key={stepNumber}>

//                     {/* Connector Line (before step, except first) */}
//                     {index > 0 && (
//                       <div
//                         className={`flex-1 h-0.5 transition-all duration-75 ease-linear ${
//                           isCompleted || isActive
//                             ? "bg-primary"
//                             : "bg-mainheadingWhite"
//                         }`}
//                       />
//                     )}

//                     {/* Step Item (Circle and Text) */}
//                     <div className="flex flex-col gap-3 items-center flex-shrink-0 py-2">
//                       {/* Container for circle and ping animation. This container is sized. */}
//                       <div className="relative sm:size-10 size-8">
//                         {/* Animated ping for the current (active) step */}
//                         {isActive && (
//                           <div
//                             className={`
//                               absolute top-0 left-0 w-full h-full
//                               rounded-full bg-primary animate-ping opacity-50
//                             `}
//                           />
//                         )}

//                         {/* Step Circle - positioned on top of the ping */}
//                         <div
//                           className={`
//                             absolute top-0 left-0 w-full h-full /* Fill the sized parent */
//                             rounded-full flex items-center justify-center
//                             transition-all duration-75 ease-linear
//                             ${
//                               isCompleted
//                                 ? "bg-primary border-primary text-mainheading" // Assuming border-primary is intended
//                                 : isActive
//                                 ? "font-bold bg-primary text-mainheading"
//                                 : "bg-primarybox text-white/90"
//                             }
//                           `}
//                         >
//                           {isCompleted ? <FaCheck size={20} /> : stepNumber}
//                         </div>
//                       </div>

//                       {/* Step Text */}
//                       <span
//                         className={`text-xs md:text-base capitalize transition-all duration-75 ease-linear hidden sm:block ${
//                           isCompleted
//                             ? "text-primary font-medium"
//                             : isActive
//                             ? "text-primary font-bold"
//                             : "text-mainheadingWhite"
//                         }`}
//                         // Removed ml-2 for better centering below the circle
//                       >
//                         {stepName}
//                       </span>
//                     </div>
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;



import React from "react";
import { FaCheck } from "react-icons/fa";

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
  const validCurrentStep =
    currentStep && currentStep > 0 && currentStep <= totalSteps
      ? currentStep
      : 1;

  return (
    <div className="bg-background sticky lg:top-28 top-20 z-20 pb-5">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center items-start md:justify-between gap-4">

          {/* Title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-mainheadingWhite">
            {title}
          </h1>


          

          {/* Step Indicator */}
          {showSteps && (
            // Added overflow-x-auto to allow horizontal scrolling if steps don't fit
            <div className="flex items-center sm:items-start">
              {steps.map((stepName, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < validCurrentStep;
                const isActive = stepNumber === validCurrentStep;
                // const isUpcoming = stepNumber > validCurrentStep; // Defined but not directly used for styling here

                return (
                  <React.Fragment key={stepNumber}>
                    {/* Connector Line (before step, except first) */}
                    {index > 0 && (
                      <div
                        className={`sm:min-w-20 min-w-15 h-0.5 sm:mt-9 mt-0 transition-all duration-75 ease-linear ${
                          isCompleted || isActive
                            ? "bg-primary"
                            : "bg-mainheadingWhite"
                        }`}
                      />
                    )}

                    {/* Step Item (Circle and Text) */}
                    <div className="flex flex-col gap-3 items-center flex-shrink-0  py-2">
                      {/* Container for circle and ping animation. This container is sized. */}
                      <div className="relative sm:size-14 size-10">
                        
                        {/* Animated ping for the current (active) step */}
                        {isActive && (
                          <div
                            className={`
                              absolute top-0 left-0 w-full h-full
                              rounded-full bg-primary animate-ping opacity-50
                            `}
                          />
                        )}

                        {/* Step Circle - positioned on top of the ping */}
                        <div
                          className={`
                            absolute top-0 left-0 w-full h-full /* Fill the sized parent */
                            rounded-full flex items-center justify-center
                            transition-all duration-75 ease-linear sm:text-lg text-base
                            ${
                              isCompleted
                                ? "bg-primary border-primary text-mainheading" // Assuming border-primary is intended
                                : isActive
                                ? "font-bold bg-primary text-mainheading"
                                : "bg-primarybox text-white/90"
                            }
                          `}
                        >
                          {isCompleted ? <FaCheck size={20} /> : stepNumber}
                        </div>
                      </div>

                      {/* Step Text */}
                      <span
                        className={`text-xs md:text-base capitalize transition-all duration-75 ease-linear hidden sm:block ${
                          isCompleted
                            ? "text-primary font-medium"
                            : isActive
                            ? "text-primary font-bold"
                            : "text-subheadingWhite "
                        }`}
                        // Removed ml-2 for better centering below the circle
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



