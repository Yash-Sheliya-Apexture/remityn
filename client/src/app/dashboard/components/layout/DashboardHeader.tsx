// frontend/src/app/dashboard/components/layout/DashboardHeader.tsx
import React from "react";
import { FaCheck } from "react-icons/fa"; // Using react-icons for checkmark

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
    <div className="bg-white dark:bg-background mb-6 md:mb-8 sticky top-0 z-20">
      {" "}
      {/* Make header sticky */}
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-semibold text-main dark:text-white mb-3 md:mb-0">
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
                const circleBaseClasses =
                  "w-6 h-6 md:size-8  rounded-full flex items-center justify-center border-2 transition-colors duration-300 ease-in-out";
                const circleCompletedClasses =
                  "bg-primary border-primary text-mainheading";
                const circleActiveClasses =
                  "border-primary text-primary font-bold";
                const circleUpcomingClasses = "border-gray-300 text-white";

                const textBaseClasses =
                  "text-xs md:text-lg transition-colors duration-300 ease-in-out hidden sm:block ml-2"; // Hide text on very small screens
                const textCompletedClasses = "text-primary font-medium";
                const textActiveClasses = "text-primary font-bold";
                const textUpcomingClasses = "text-gray-400";

                const connectorBaseClasses =
                  "flex-1 h-0.5 transition-colors duration-300 ease-in-out mx-1";
                const connectorCompletedClasses = "bg-primary";
                const connectorUpcomingClasses = "bg-gray-300";

                return (
                  <React.Fragment key={stepNumber}>
                    {/* Connector Line (before step, except first) */}
                    {index > 0 && (
                      <div
                        className={`${connectorBaseClasses} ${
                          isCompleted || isActive
                            ? connectorCompletedClasses
                            : connectorUpcomingClasses
                        }`}
                      />
                    )}

                    {/* Step Circle and Text */}
                    <div className="flex items-center flex-shrink-0">
                      <div
                        className={`${circleBaseClasses} ${
                          isCompleted
                            ? circleCompletedClasses
                            : isActive
                            ? circleActiveClasses
                            : circleUpcomingClasses
                        }`}
                      >
                        {isCompleted ? <FaCheck size={16} /> : stepNumber}
                      </div>
                      <span
                        className={`${textBaseClasses} ${
                          isCompleted
                            ? textCompletedClasses
                            : isActive
                            ? textActiveClasses
                            : textUpcomingClasses
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


// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCheck, FaChevronRight } from "react-icons/fa";

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
//   const [mounted, setMounted] = useState(false);
//   const showSteps = steps && steps.length > 0 && currentStep && currentStep > 0;
//   const totalSteps = steps ? steps.length : 0;

//   // Validate currentStep (optional, but good practice)
//   const validCurrentStep =
//     currentStep && currentStep > 0 && currentStep <= totalSteps
//       ? currentStep
//       : 1;

//   // Set mounted to true after component mounts for animations
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Animation variants
//   const headerVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     },
//   };

//   const stepVariants = {
//     inactive: { scale: 0.95, opacity: 0.7 },
//     active: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 500,
//         damping: 30,
//       },
//     },
//     completed: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 500,
//         damping: 30,
//       },
//     },
//   };

//   const lineVariants = {
//     incomplete: {
//       scaleX: 0,
//       originX: 0,
//       backgroundColor: "#e5e7eb",
//     },
//     complete: {
//       scaleX: 1,
//       originX: 0,
//       backgroundColor: "#4F46E5",
//       transition: {
//         duration: 0.5,
//         ease: "easeInOut",
//         delay: 0.2,
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="bg-white shadow-md mb-6 md:mb-8 sticky top-0 z-20 backdrop-blur-md bg-opacity-95"
//       variants={headerVariants}
//       initial="hidden"
//       animate={mounted ? "visible" : "hidden"}
//     >
//       <div className="container mx-auto px-4 py-5 md:py-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
//           {/* Title with subtle animation */}
//           <motion.h1
//             className="text-xl md:text-2xl font-bold text-indigo-900 tracking-tight"
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2, duration: 0.3 }}
//           >
//             {title}
//           </motion.h1>

//           {/* Step Indicator with animations */}
//           {showSteps && (
//             <div className="flex items-center space-x-1 sm:space-x-2 w-full md:w-auto">
//               {steps.map((stepName, index) => {
//                 const stepNumber = index + 1;
//                 const isCompleted = stepNumber < validCurrentStep;
//                 const isActive = stepNumber === validCurrentStep;
//                 const isFirst = index === 0;

//                 const stepStatus = isCompleted
//                   ? "completed"
//                   : isActive
//                   ? "active"
//                   : "inactive";

//                 return (
//                   <React.Fragment key={stepNumber}>
//                     {/* Connector Line (before step, except first) */}
//                     {!isFirst && (
//                       <motion.div
//                         className="flex-1 h-1 max-w-16 rounded-full mx-1 sm:mx-2"
//                         variants={lineVariants}
//                         initial="incomplete"
//                         animate={
//                           isCompleted || isActive ? "complete" : "incomplete"
//                         }
//                       />
//                     )}

//                     {/* Step Circle and Text */}
//                     <div className="flex items-center flex-shrink-0">
//                       <motion.div
//                         className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center 
//                           ${
//                             isCompleted
//                               ? "bg-indigo-600 text-white"
//                               : isActive
//                               ? "border-2 border-indigo-600 text-indigo-600 bg-indigo-50"
//                               : "border-2 border-gray-300 text-gray-400 bg-gray-50"
//                           }`}
//                         variants={stepVariants}
//                         animate={stepStatus}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         {isCompleted ? (
//                           <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ type: "spring", stiffness: 500 }}
//                           >
//                             <FaCheck size={16} />
//                           </motion.div>
//                         ) : (
//                           <span className="font-medium">{stepNumber}</span>
//                         )}
//                       </motion.div>

//                       <AnimatePresence>
//                         <motion.span
//                           className={`hidden sm:block ml-2 text-sm font-medium whitespace-nowrap
//                             ${
//                               isCompleted
//                                 ? "text-indigo-600"
//                                 : isActive
//                                 ? "text-indigo-700 font-semibold"
//                                 : "text-gray-400"
//                             }`}
//                           initial={{ opacity: 0, x: -5 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{
//                             delay: 0.1 * stepNumber,
//                             duration: 0.3,
//                           }}
//                         >
//                           {stepName}
//                         </motion.span>
//                       </AnimatePresence>
//                     </div>

//                     {/* Mobile step transitions */}
//                     {!isFirst && index < steps.length - 1 && (
//                       <motion.div
//                         className="sm:hidden flex-shrink-0"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 0.5 }}
//                         transition={{ delay: 0.3 }}
//                       >
//                         <FaChevronRight className="text-gray-400" size={12} />
//                       </motion.div>
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Subtle progress indicator - full width */}
//       {showSteps && (
//         <motion.div
//           className="h-1 bg-gradient-to-r from-indigo-600 to-purple-500"
//           initial={{ width: "0%" }}
//           animate={{
//             width: `${((validCurrentStep - 1) / (totalSteps - 1)) * 100}%`,
//           }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//         />
//       )}
//     </motion.div>
//   );
// };

// export default DashboardHeader;


// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
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
//   const [prevStep, setPrevStep] = useState(currentStep);
//   const [mounted, setMounted] = useState(false);
//   const showSteps = steps && steps.length > 0 && currentStep && currentStep > 0;
//   const totalSteps = steps ? steps.length : 0;

//   // Validate currentStep (optional, but good practice)
//   const validCurrentStep =
//     currentStep && currentStep > 0 && currentStep <= totalSteps
//       ? currentStep
//       : 1;

//   // Detect step changes for animations
//   useEffect(() => {
//     if (mounted && prevStep !== currentStep) {
//       setPrevStep(currentStep);
//     }
//   }, [currentStep, mounted, prevStep]);

//   // Set mounted to true after component mounts
//   useEffect(() => {
//     setMounted(true);
//     setPrevStep(currentStep);
//   }, [currentStep]);

//   // Determine animation direction (forward or backward)
//   const isForward = prevStep && currentStep ? currentStep > prevStep : true;

//   // Animation variants
//   const headerVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.4,
//         ease: "easeOut",
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const stepCircleVariants = {
//     inactive: { 
//       scale: 0.9, 
//       opacity: 0.7,
//       transition: { duration: 0.3 }
//     },
//     active: { 
//       scale: 1.1, 
//       opacity: 1,
//       boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.2)",
//       transition: { 
//         type: "spring", 
//         stiffness: 500, 
//         damping: 15,
//         duration: 0.5
//       }
//     },
//     completed: {
//       scale: 1,
//       opacity: 1,
//       transition: { 
//         type: "spring", 
//         stiffness: 500, 
//         damping: 25,
//         duration: 0.3
//       }
//     }
//   };

//   const stepLabelVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" }
//     },
//     active: {
//       fontWeight: 600,
//       color: "#4338CA", // Indigo-700
//       scale: 1.05,
//       transition: { duration: 0.3 }
//     },
//     inactive: {
//       fontWeight: 400,
//       color: "#9CA3AF", // Gray-400
//       scale: 1,
//       transition: { duration: 0.3 }
//     }
//   };

//   const checkmarkVariants = {
//     hidden: { scale: 0, opacity: 0 },
//     visible: { 
//       scale: 1, 
//       opacity: 1,
//       transition: { 
//         type: "spring",
//         stiffness: 500,
//         damping: 15,
//         delay: 0.2
//       }
//     }
//   };

//   const lineVariants = {
//     incomplete: { 
//       scaleX: 0,
//       backgroundColor: "#E5E7EB",
//       transition: { duration: 0.3 }
//     },
//     inProgress: {
//       scaleX: 0.5,
//       backgroundColor: "#818CF8", // Indigo-400
//       transition: { 
//         duration: 0.4,
//         ease: "easeOut" 
//       }
//     },
//     complete: { 
//       scaleX: 1,
//       backgroundColor: "#4F46E5", // Indigo-600
//       transition: { 
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const progressBarVariants = {
//     initial: { width: `${((validCurrentStep - 1) / (totalSteps - 1)) * 100}%` },
//     animate: { 
//       width: `${((validCurrentStep - 1) / (totalSteps - 1)) * 100}%`,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   return (
//     <motion.div 
//       className="bg-white shadow-md mb-6 md:mb-8 sticky top-0 z-20 backdrop-blur-sm bg-white/95"
//       variants={headerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <div className="container mx-auto px-4 py-5 md:py-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
//           {/* Title with animation */}
//           <motion.h1 
//             className="text-xl md:text-2xl font-bold text-indigo-900 tracking-tight"
//             initial={{ opacity: 0, x: -15 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.1, duration: 0.4 }}
//           >
//             {title}
//           </motion.h1>

//           {/* Step Indicator with animations */}
//           {showSteps && (
//             <div className="flex items-center w-full md:w-auto justify-center md:justify-end pt-2 pb-1">
//               {steps.map((stepName, index) => {
//                 const stepNumber = index + 1;
//                 const isCompleted = stepNumber < validCurrentStep;
//                 const isActive = stepNumber === validCurrentStep;
//                 const isUpcoming = stepNumber > validCurrentStep;
//                 const isFirst = index === 0;
//                 const isLast = index === steps.length - 1;
                
//                 // Determine line state for animation
//                 let lineState = "incomplete";
//                 if (isCompleted) lineState = "complete";
//                 else if (isActive) lineState = "inProgress";

//                 return (
//                   <React.Fragment key={stepNumber}>
//                     {/* Step Circle and Text */}
//                     <div className="flex flex-col items-center relative">
//                       {/* Step Number/Check */}
//                       <motion.div
//                         className={`w-10 h-10 rounded-full flex items-center justify-center 
//                           transition-colors duration-300
//                           ${isCompleted 
//                             ? "bg-indigo-600 text-white" 
//                             : isActive 
//                               ? "border-2 border-indigo-600 text-indigo-600 bg-indigo-50" 
//                               : "border-2 border-gray-300 text-gray-400 bg-gray-50"}`}
//                         variants={stepCircleVariants}
//                         initial="inactive"
//                         animate={isActive ? "active" : isCompleted ? "completed" : "inactive"}
//                         whileHover={{ scale: isUpcoming ? 1.05 : 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                         layout
//                       >
//                         <AnimatePresence mode="wait">
//                           {isCompleted ? (
//                             <motion.div
//                               key="checkmark"
//                               variants={checkmarkVariants}
//                               initial="hidden"
//                               animate="visible"
//                               exit={{ scale: 0, opacity: 0 }}
//                             >
//                               <FaCheck size={16} />
//                             </motion.div>
//                           ) : (
//                             <motion.span
//                               key="number"
//                               className="font-medium"
//                               initial={{ scale: 0.8, opacity: 0 }}
//                               animate={{ scale: 1, opacity: 1 }}
//                               exit={{ scale: 0.8, opacity: 0 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               {stepNumber}
//                             </motion.span>
//                           )}
//                         </AnimatePresence>
//                       </motion.div>

//                       {/* Step name label */}
//                       <motion.span
//                         className={`text-sm mt-1 font-medium whitespace-nowrap px-1
//                           ${isActive ? "text-indigo-700" : isCompleted ? "text-indigo-600" : "text-gray-400"}`}
//                         variants={stepLabelVariants}
//                         initial="hidden"
//                         animate={isActive ? "active" : "visible"}
//                         layout
//                       >
//                         {stepName}
//                       </motion.span>

//                       {/* Status dot indicators for mobile */}
//                       <div className="flex space-x-1 mt-1 md:hidden">
//                         {steps.map((_, dotIndex) => (
//                           <motion.div
//                             key={`dot-${dotIndex}`}
//                             className={`h-1.5 w-1.5 rounded-full ${
//                               dotIndex + 1 === stepNumber
//                                 ? "bg-indigo-600"
//                                 : "bg-gray-300"
//                             }`}
//                             initial={{ scale: 0.8, opacity: 0.5 }}
//                             animate={{ 
//                               scale: dotIndex + 1 === stepNumber ? 1 : 0.8,
//                               opacity: dotIndex + 1 === stepNumber ? 1 : 0.5
//                             }}
//                             transition={{ duration: 0.3 }}
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     {/* Connector Line */}
//                     {!isLast && (
//                       <motion.div
//                         className="hidden md:block h-1 mx-2 rounded-full bg-gray-200 w-12"
//                         style={{ transformOrigin: isForward ? "left" : "right" }}
//                         variants={lineVariants}
//                         initial="incomplete"
//                         animate={lineState}
//                       />
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Progress bar - animates based on current step */}
//       {showSteps && (
//         <motion.div 
//           className="h-1 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500"
//           variants={progressBarVariants}
//           initial="initial"
//           animate="animate"
//           key={validCurrentStep} // Force animation when step changes
//         />
//       )}
//     </motion.div>
//   );
// };

// export default DashboardHeader;