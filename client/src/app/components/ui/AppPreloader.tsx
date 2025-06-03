// // app/components/ui/AppPreloader.tsx
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// const AppPreloader = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let currentProgress = 0;
//     const targetProgress = 99;
//     const animationDuration = 2500;
//     const updateInterval = 50;

//     const steps = animationDuration / updateInterval;
//     const incrementPerStep = targetProgress / steps;

//     const intervalId = setInterval(() => {
//       currentProgress += incrementPerStep;
//       if (currentProgress >= targetProgress) {
//         setProgress(targetProgress);
//         clearInterval(intervalId);
//       } else {
//         setProgress(Math.floor(currentProgress));
//       }
//     }, updateInterval);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="fixed bg-background overflow-hidden p-4 w-full">
//       <div className="top-0 left-0 w-full h-[calc(100vh-32px)]  flex flex-col justify-between items-center p-12 lg:px-16 font-satoshi text-mainheadingWhite bg-primarybox rounded-xl">

//       {/* Top Section */}
//       <div className="w-full flex justify-between items-start">
//         <div className="text-xl lg:text-2xl opacity-80 leading-snug text-subheadingWhite">
//           Loading <br /> your experience...
//         </div>
//         <div className="text-6xl lg:text-9xl font-medium text-mainheadingWhite opacity-90">
//           {progress}%
//         </div>
//       </div>

//       {/* Middle Section - Logo */}
//       <div className="flex justify-center items-center flex-grow">
//         <Image
//           src="/assets/images/main_logo.svg" // IMPORTANT: Your logo path
//           alt="Remityn Logo"
//           width={320}
//           height={90}
//           priority
//           className="object-contain"
//         />
//       </div>

//       {/* Bottom Section */}
//       <div className="w-full">
//         {/* Progress Bar */}
//         <div className="w-full h-[6px] bg-secondarybox rounded-full overflow-hidden mb-6">
//           <div
//             className="h-full bg-primary rounded-full transition-width duration-50 linear" // Using Tailwind's blue-500 or your brand color
//             style={{ width: `${progress}%` }} // Dynamic width remains inline
//           ></div>
//         </div>

//         {/* Footer Text */}
//         <div className="flex justify-between w-full text-sm opacity-70">
//           <span>Secure Money Transfer</span>
//           <span>Trusted Worldwide</span>
//           <span>Fast & Easy</span>
//         </div>
//       </div>

//       {/* Global styles for body overflow and animation (if not in globals.css) */}
//       <style jsx global>{`
//         body:has(div.z-\\[99999\\]) {
//           /* More robust selector if other high z-index elements exist */
//           overflow: hidden !important;
//         }
//         /* If you want to use Tailwind for the spinner icon itself, you'd define this in globals.css
//            and apply 'animate-spin' to the spinner div. The example preloader doesn't have a separate
//            spinning icon like the simple spinner, so this part isn't directly used by this specific preloader design.
//         */
//         /*
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         .animate-custom-spin {
//           animation: spin 1s linear infinite;
//         }
//         */
//       `}</style>
//       </div>
//     </div>
//   );
// };

// export default AppPreloader;

// // app/components/ui/AppPreloader.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// interface AppPreloaderProps {
//   onAnimationComplete: () => void; // Callback prop
// }

// const AppPreloader: React.FC<AppPreloaderProps> = ({ onAnimationComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [displayText, setDisplayText] = useState("Initializing systems...");
//   const [showLogo, setShowLogo] = useState(false);

//   const texts = [
//     "Connecting to secure servers...",
//     "Validating credentials...",
//     "Fetching user data...",
//     "Preparing your dashboard...",
//     "Almost there...",
//   ];

//   useEffect(() => {
//     let currentProgress = 0;
//     const targetProgress = 100;
//     const animationDuration = 2700; // Preloader's own visual duration
//     const updateInterval = 50;

//     const steps = animationDuration / updateInterval;
//     const incrementPerStep = targetProgress / steps;

//     let textIndex = 0;
//     const textChangeInterval = animationDuration / (texts.length + 1);

//     const progressIntervalId = setInterval(() => {
//       currentProgress += incrementPerStep;
//       if (currentProgress >= targetProgress) {
//         setProgress(targetProgress);
//         setDisplayText("Welcome!");
//         clearInterval(progressIntervalId);
//         onAnimationComplete(); // Signal visual completion
//       } else {
//         setProgress(Math.floor(currentProgress));
//       }
//     }, updateInterval);

//     const textIntervalId = setInterval(() => {
//       if (textIndex < texts.length) {
//         setDisplayText(texts[textIndex]);
//         textIndex++;
//       } else {
//         clearInterval(textIntervalId);
//       }
//     }, textChangeInterval);

//     const logoTimer = setTimeout(() => setShowLogo(true), 500);

//     return () => {
//       clearInterval(progressIntervalId);
//       clearInterval(textIntervalId);
//       clearTimeout(logoTimer);
//     };
//   }, [onAnimationComplete]);

//   return (
//     <div
//       className="fixed inset-0 bg-background flex flex-col items-center justify-center p-4 sm:p-8 z-[99999] overflow-hidden"
//     >
//       <div className="w-full max-w-2xl bg-primarybox rounded-xl shadow-2xl p-8 sm:p-12 flex flex-col items-center text-center relative">
//         <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-3xl animate-pulse_slow_custom"></div>
//         <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full filter blur-3xl animate-pulse_slower_delay_custom"></div>
//         <div className={`transition-all duration-700 ease-in-out mb-8 ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
//           <Image
//             src="/assets/images/main_logo.svg"
//             alt="Remityn Logo"
//             width={200}
//             height={55}
//             priority
//             className="object-contain"
//           />
//         </div>
//         <div className="text-5xl sm:text-6xl font-medium text-mainheadingWhite mb-4">
//           {progress}%
//         </div>
//         <p className="text-subheadingWhite text-sm sm:text-base mb-8 h-12 flex items-center justify-center transition-opacity duration-300">
//           {displayText}
//         </p>
//         <div className="w-full h-2 bg-secondarybox rounded-full overflow-hidden mb-2">
//           <div
//             className="h-full bg-primary rounded-full transition-all duration-150 ease-linear"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//         <p className="text-xs text-subheadingWhite/70">Please wait while we prepare your experience.</p>
//       </div>
//       <style jsx global>{`
//         body:has(div.z-\\[99999\\]) { overflow: hidden !important; }
//         @keyframes pulse_slow_custom_kf { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
//         .animate-pulse_slow_custom { animation: pulse_slow_custom_kf 8s infinite ease-in-out; }
//         @keyframes pulse_slower_delay_custom_kf { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.05); } }
//         .animate-pulse_slower_delay_custom { animation: pulse_slower_delay_custom_kf 10s infinite ease-in-out 2s; }
//       `}</style>
//     </div>
//   );
// };

// export default AppPreloader;

// // app/components/ui/AppPreloader.tsx
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// interface AppPreloaderProps {
//   onAnimationComplete: () => void; // Callback prop
// }

// const AppPreloader: React.FC<AppPreloaderProps> = ({ onAnimationComplete }) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let currentProgress = 0;
//     const targetProgress = 100; // Animate to 100% for visual completion
//     const animationDuration = 2500; // Duration of the preloader's animation
//     const updateInterval = 50;

//     const steps = animationDuration / updateInterval;
//     const incrementPerStep = targetProgress / steps;

//     const intervalId = setInterval(() => {
//       currentProgress += incrementPerStep;
//       if (currentProgress >= targetProgress) {
//         setProgress(targetProgress);
//         clearInterval(intervalId);
//         onAnimationComplete(); // Call the callback when animation is done
//       } else {
//         setProgress(Math.floor(currentProgress));
//       }
//     }, updateInterval);

//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, [onAnimationComplete]); // Add onAnimationComplete to dependencies

//   return (
//     // Outermost div is fixed, covers screen, uses app background, and applies padding
//     <div className="fixed bg-background overflow-hidden p-4 w-full">
//       {/* Inner div for the content card, with specific background and rounded corners */}
//       <div className="top-0 left-0 w-full h-[calc(100vh-32px)]  flex flex-col justify-between items-center p-12 lg:px-16 font-satoshi text-mainheadingWhite bg-primarybox rounded-xl">
//         {/* Top Section */}

//         <div className="w-full flex justify-between items-start mb-8 sm:mb-12">
//           <div className="text-xl lg:text-2xl opacity-80 leading-snug text-subheadingWhite">
//             Loading <br /> your experience...
//           </div>
//           <div className="text-5xl sm:text-6xl lg:text-9xl text-mainheadingWhite opacity-90">
//             {progress}%
//           </div>
//         </div>

//         {/* Middle Section - Logo */}
//         <div className="flex justify-center items-center flex-grow my-8 sm:my-12">
//           <Image
//             src="/assets/images/main_logo.svg" // IMPORTANT: Your logo path
//             alt="Remityn Logo"
//             width={280} // Slightly adjusted for proportion
//             height={80} // Slightly adjusted
//             priority
//             className="object-contain"
//           />
//         </div>

//         {/* Bottom Section */}
//         <div className="w-full mt-8 sm:mt-12">
//           {/* Progress Bar */}
//           <div className="w-full h-[6px] sm:h-[8px] bg-secondarybox rounded-full overflow-hidden mb-6">
//             <div
//               className="h-full bg-primary rounded-full transition-all duration-100 ease-linear" // Faster transition
//               style={{ width: `${progress}%` }} // Dynamic width remains inline
//             ></div>
//           </div>

//           {/* Footer Text */}
//           <div className="flex flex-col sm:flex-row justify-between w-full text-xs sm:text-sm text-subheadingWhite/70 gap-2 sm:gap-0 text-center sm:text-left">
//             <span>Secure Money Transfer</span>
//             <span>Trusted Worldwide</span>
//             <span>Fast & Easy</span>
//           </div>
//         </div>
//       </div>
//       {/* Global style to hide body scrollbar when preloader is visible */}
//       <style jsx global>{`
//         body:has(div.z-\\[99999\\]) {
//           overflow: hidden !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AppPreloader;

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// interface AppPreloaderProps {
//   onAnimationComplete: () => void;
// }

// const AppPreloader: React.FC<AppPreloaderProps> = ({ onAnimationComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [isContentVisible, setIsContentVisible] = useState(false);
//   const [isMounted, setIsMounted] = useState(false); // For hydration fix

//   useEffect(() => {
//     setIsMounted(true); // Will be true only on client-side after initial render
//   }, []);

//   useEffect(() => {
//     if (!isMounted) return; // Animations and content visibility logic only runs on client

//     const timer = setTimeout(() => {
//       setIsContentVisible(true);
//     }, 200);
//     return () => clearTimeout(timer);
//   }, [isMounted]);

//   useEffect(() => {
//     if (!isMounted || !isContentVisible) return; // Progress animation only runs on client when content is visible

//     let currentProgress = 0;
//     const targetProgress = 100;
//     const animationDuration = 2000; // 2 seconds
//     const updateInterval = 50; // ms

//     const steps = animationDuration / updateInterval;
//     const incrementPerStep = targetProgress / steps;

//     const intervalId = setInterval(() => {
//       currentProgress += incrementPerStep;
//       if (currentProgress >= targetProgress) {
//         setProgress(targetProgress);
//         clearInterval(intervalId);
//         setTimeout(() => {
//           onAnimationComplete();
//         }, 400); // Delay after 100% before calling complete
//       } else {
//         setProgress(Math.floor(currentProgress));
//       }
//     }, updateInterval);

//     return () => clearInterval(intervalId);
//   }, [isMounted, isContentVisible, onAnimationComplete]);

//   // Animation Variants
//   const preloaderVariants = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
//   };
//   const cardVariants = {
//     initial: { opacity: 0, scale: 0.95, y: 20 },
//     animate: {
//       opacity: 1, scale: 1, y: 0,
//       transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
//     },
//   };
//   const textItemVariants = {
//     initial: { opacity: 0, y: 15 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
//   };
//   const logoVariants = {
//     initial: { opacity: 0, scale: 0.8 },
//     animate: {
//       opacity: 1, scale: 1,
//       transition: { type: "spring", stiffness: 150, damping: 15, delay: 0.3 },
//     },
//   };
//   const footerTextContainerVariants = {
//     initial: {},
//     animate: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
//   };
//   const footerItemVariants = {
//     initial: { opacity: 0, y: 10 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
//   };

//   // Static placeholder for SSR and initial client render to prevent hydration mismatch
//   if (!isMounted) {
//     return (
//       // CRITICAL: This className MUST EXACTLY MATCH the motion.div below
//       <div className="fixed inset-0 bg-background overflow-hidden p-4 z-[99999]">
//         <div className="absolute inset-0 bg-[url('/assets/images/dot.svg')] bg-center bg-repeat z-0"></div>
//         <div className="top-0 left-0 w-full h-[calc(100vh-32px)] flex flex-col justify-between items-center p-8 sm:p-12 lg:px-16 font-satoshi text-mainheadingWhite relative z-4">
//           {/* Top Section Static */}
//           <div className="w-full flex justify-between items-start mb-8 sm:mb-12">
//             <div className="text-xl lg:text-2xl opacity-80 leading-snug text-subheadingWhite">
//               Loading <br /> your experience...
//             </div>
//             <div className="text-5xl sm:text-6xl lg:text-9xl font-medium text-mainheadingWhite opacity-90">
//               {'0% '} {/* Match server output if it includes a space as per error logs */}
//             </div>
//           </div>
//           {/* Middle Section Static - Logo Placeholder (optional) */}
//           <div className="flex justify-center items-center flex-grow my-8 sm:my-12">
//             {/* You can put a static SVG or empty div here if the logo isn't critical for static render */}
//           </div>
//           {/* Bottom Section Static */}
//           <div className="w-full mt-8 sm:mt-12">
//             <div className="w-full h-[6px] sm:h-[8px] bg-secondarybox rounded-full overflow-hidden mb-6">
//               <div className="h-full bg-primary rounded-full" style={{ width: "0%" }}></div>
//             </div>
//             <div className="flex flex-col sm:flex-row justify-between w-full text-xs sm:text-sm text-subheadingWhite/70 gap-2 sm:gap-0 text-center sm:text-left">
//               <span>Secure Money Transfer</span>
//               <span>Trusted Worldwide</span>
//               <span>Fast & Easy</span>
//             </div>
//           </div>
//         </div>
//         <style jsx global>{`
//           body:has(div.z-\\[99999\\]) { /* Make sure selector matches the one below */
//             overflow: hidden !important;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   // Full animated component, rendered only on the client after mount
//   return (
//     <motion.div
//       // CRITICAL: This className MUST EXACTLY MATCH the static div above
//       className="fixed inset-0 bg-background overflow-hidden p-4 z-[99999]"
//       variants={preloaderVariants}
//       initial="initial" // On client, initial state is opacity 0
//       animate={isContentVisible ? "animate" : "initial"} // Then animates to opacity 1
//     >
//     <div className="absolute inset-0 bg-[url('/assets/images/dot.svg')] bg-center bg-repeat z-0"></div>

//       <motion.div
//         className="top-0 left-0 w-full h-[calc(100vh-32px)] flex flex-col justify-between items-center p-8 sm:p-12 lg:px-16 font-satoshi text-mainheadingWhite relative z-4"
//         variants={cardVariants}
//         // initial/animate will be inherited from parent's animate state if not explicitly set
//       >
//         {/* Top Section */}
//         <motion.div
//           className="w-full flex justify-between items-start mb-8 sm:mb-12"
//           variants={textItemVariants}
//           // transition can be part of variants or set here if specific override needed
//         >
//           <div className="text-xl lg:text-2xl opacity-80 leading-snug text-subheadingWhite">
//             Loading <br /> your experience...
//           </div>
//           <motion.div
//             className="text-5xl sm:text-6xl lg:text-9xl text-mainheadingWhite font-medium"
//             key={progress} // Ensures animation on progress change
//             initial={{ opacity: 0.7, scale: 0.9, y: 5 }}
//             animate={{ opacity: 0.9, scale: 1, y: 0 }}
//             transition={{ duration: 0.15, ease: "easeOut" }}
//           >
//             {progress > 0 ? `${progress}% ` : '0% '} {/* Match space consistency */}
//           </motion.div>
//         </motion.div>

//         {/* Middle Section - Logo */}
//         <motion.div
//           className="flex justify-center items-center flex-grow my-8 sm:my-12"
//           variants={logoVariants}
//         >
//           <Image
//             src="/assets/images/main_logo.svg" // Ensure this path is correct
//             alt="Remityn Logo"
//             width={280}
//             height={80}
//             priority
//             className="object-contain"
//           />
//         </motion.div>

//         {/* Bottom Section */}
//         <motion.div className="w-full mt-8 sm:mt-12">
//           <div className="w-full h-[6px] sm:h-[8px] bg-secondarybox rounded-full overflow-hidden mb-6">
//             <motion.div
//               className="h-full bg-primary rounded-full"
//               initial={{ width: "0%" }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 0.1, ease: "linear" }} // Fast for progress bar
//             />
//           </div>
//           <motion.div
//             className="flex flex-col sm:flex-row justify-between w-full text-xs sm:text-sm text-subheadingWhite/70 gap-2 sm:gap-0 text-center sm:text-left"
//             variants={footerTextContainerVariants}
//           >
//             <motion.span variants={footerItemVariants}>Secure Money Transfer</motion.span>
//             <motion.span variants={footerItemVariants}>Trusted Worldwide</motion.span>
//             <motion.span variants={footerItemVariants}>Fast & Easy</motion.span>
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       <style jsx global>{`
//         body:has(div.z-\\[99999\\]) { /* Escaped for CSS: z-\[99999\] */
//           overflow: hidden !important;
//         }
//       `}</style>
//     </motion.div>
//   );
// };

// export default AppPreloader;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AppPreloaderProps {
  onAnimationComplete: () => void;
}

const AppPreloader: React.FC<AppPreloaderProps> = ({ onAnimationComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // For hydration fix

  useEffect(() => {
    setIsMounted(true); // Will be true only on client-side after initial render
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Animations and content visibility logic only runs on client

    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || !isContentVisible) return; // Progress animation only runs on client when content is visible

    let currentProgress = 0;
    const targetProgress = 100;
    const animationDuration = 2000; // 2 seconds
    const updateInterval = 50; // ms

    const steps = animationDuration / updateInterval;
    const incrementPerStep = targetProgress / steps;

    const intervalId = setInterval(() => {
      currentProgress += incrementPerStep;
      if (currentProgress >= targetProgress) {
        setProgress(targetProgress);
        clearInterval(intervalId);
        setTimeout(() => {
          onAnimationComplete();
        }, 400); // Delay after 100% before calling complete
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, [isMounted, isContentVisible, onAnimationComplete]);

  // Animation Variants
  const preloaderVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 },
    }, // Added exit animation
  };
  const cardVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
    },
  };
  const textItemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 15, delay: 0.3 },
    },
  };
  const footerTextContainerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
  };
  const footerItemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Static placeholder for SSR and initial client render to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-background overflow-hidden p-4 z-[99999]">
        <div className="absolute inset-0 bg-[url('/assets/images/dot.svg')] bg-center bg-repeat z-0"></div>
        <div className="top-0 left-0 w-full h-[calc(100dvh-32px)] flex flex-col justify-between items-center sm:p-8 p-0 font-satoshi text-mainheadingWhite relative z-4">
          {/* Top Section Static */}
          <div className="w-full flex justify-between items-start mb-8 sm:mb-12">
            <div className="text-xl lg:text-2xl opacity-80 leading-snug text-subheadingWhite">
              Loading <br /> your experience...
            </div>
            <div className="text-5xl sm:text-6xl lg:text-9xl font-medium text-mainheadingWhite opacity-90">
              {"0% "}
            </div>
          </div>
          {/* Middle Section Static - Logo Placeholder (optional) */}
          <div className="flex justify-center items-center flex-grow my-8 sm:my-12">
            {/* Static logo or empty div */}
          </div>
          {/* Bottom Section Static */}
          <div className="w-full mt-8 sm:mt-12">
            <div className="w-full h-[6px] sm:h-[8px] bg-secondarybox rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between w-full text-xs sm:text-sm text-subheadingWhite/70 gap-2 sm:gap-0 text-center sm:text-left">
              <span>Secure Money Transfer</span>
              <span>Trusted Worldwide</span>
              <span>Fast & Easy</span>
            </div>
          </div>
        </div>
        <style jsx global>{`
          body:has(div.z-\\[99999\\]) {
            overflow: hidden !important;
          }
        `}</style>
      </div>
    );
  }

  // Full animated component, rendered only on the client after mount
  return (
    <motion.div
      className="fixed inset-0 bg-background overflow-hidden p-4 z-[99999]"
      variants={preloaderVariants}
      initial="initial"
      animate={isContentVisible ? "animate" : "initial"}
      exit="exit" // Added exit prop for AnimatePresence
    >
      <div className="absolute inset-0 bg-[url('/assets/images/dot.svg')] bg-center bg-repeat z-0"></div>

      <motion.div
        className="top-0 left-0 w-full h-[calc(100vh-32px)] flex flex-col justify-between items-center sm:p-8 p-0 font-satoshi text-mainheadingWhite relative z-4"
        variants={cardVariants}
        // initial/animate will be inherited from parent's animate state if not explicitly set
        // For this component, we let the parent `motion.div` handle initial/animate/exit for the whole preloader
        // and this `cardVariants` controls the animation of the card content *within* the preloader.
        // To ensure it animates when preloader becomes visible:
        initial="initial" // Use cardVariants.initial
        animate={isContentVisible ? "animate" : "initial"} // Use cardVariants.animate when content is visible
      >
        {/* Top Section */}
        <motion.div
          className="w-full flex justify-between items-start mb-8 sm:mb-12"
          variants={textItemVariants}
        >
          <div className="text-xl lg:text-2xl opacity-80 leading-snug text-subheadingWhite">
            Loading <br /> your experience...
          </div>
          <motion.div
            className="text-5xl sm:text-6xl lg:text-9xl text-mainheadingWhite font-medium"
            key={progress}
            initial={{ opacity: 0.7, scale: 0.9, y: 5 }}
            animate={{ opacity: 0.9, scale: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {progress > 0 ? `${progress}% ` : "0% "}
          </motion.div>
        </motion.div>

        {/* Middle Section - Logo */}
        <motion.div
          className="flex justify-center items-center flex-grow my-8 sm:my-12"
          variants={logoVariants}
        >
          <Image
            src="/assets/images/main_logo.svg"
            alt="Remityn Logo"
            width={280}
            height={80}
            priority
            className="object-contain md:w-80 sm:w-60 w-50"
          />
        </motion.div>

        {/* Bottom Section */}
        <motion.div className="w-full mt-8 sm:mt-12">
          <div className="w-full h-[6px] sm:h-[8px] bg-secondarybox rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
          <motion.div
            className="flex flex-col sm:flex-row justify-between w-full text-xs sm:text-sm text-subheadingWhite/70 gap-2 sm:gap-0 text-center sm:text-left"
            variants={footerTextContainerVariants}
          >
            <motion.span variants={footerItemVariants}>
              Secure Money Transfer
            </motion.span>
            <motion.span variants={footerItemVariants}>
              Trusted Worldwide
            </motion.span>
            <motion.span variants={footerItemVariants}>Fast & Easy</motion.span>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        body:has(div.z-\\[99999\\]) {
          /* Escaped for CSS: z-\[99999\] */
          overflow: hidden !important;
        }
      `}</style>
    </motion.div>
  );
};

export default AppPreloader;
