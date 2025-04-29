// import React from "react";

// const TransferMoney = () => {
//   return <div>TransferMoney</div>;
// };

// export default TransferMoney;

// import React from "react";
// import Image from "next/image";

// const TransferSteps: React.FC = () => {
//   return (
//     <div className="py-10 bg-[#F2F4F7] dark:bg-background">
//       <section
//         className="flex flex-col justify-center container mx-auto px-4"
//         id="transfer-steps"
//       >
//         <article className="flex flex-col gap-5">
//           <h1 className="text-5xl md:text-6xl xl:text-8xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             4 easy steps to
//             <span className="text-primary"> Transfer to India </span>
//           </h1>
//         </article>
//         <article className="mt-8 grid items-center justify-center gap-16 lg:mt-14 lg:grid-cols-3 lg:gap-8">
//           <div className="hidden lg:block">
//             <div className="rounded-[30px] bg-white p-6 md:p-14">
//               <ul className="">
//                 <li className="relative cursor-pointer pb-8 md:pb-14">
//                   <button className="z-10 flex items-start gap-5 bg-white">
//                     <div>
//                       <svg
//                         width="54"
//                         height="54"
//                         viewBox="0 0 54 54"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="text-mainheading"
//                       >
//                         <rect
//                           x="1"
//                           y="1"
//                           width="52"
//                           height="52"
//                           rx="12"
//                           stroke="#EAECF0"
//                           strokeWidth="2"
//                         ></rect>
//                         <Image
//                           src="/assets/icon/verify.svg"
//                           alt=""
//                           width={24}
//                           height={24}
//                           className="transition-all duration-10"
//                           style={{
//                             transform: "translate(-12px, -12px)",
//                             position: "absolute",
//                             top: "50%",
//                             left: "50%",
//                           }}
//                         />
//                         <path
//                           d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                           stroke="#182230"
//                           strokeWidth="2"
//                           fill="none"
//                           strokeDasharray="208"
//                           strokeDashoffset="208"
//                           className="animate-border-animation"
//                         ></path>
//                       </svg>
//                     </div>
//                     <div className="flex flex-col items-start gap-1">
//                       <h3 className="text-start text-base font-semibold leading-4 transition-colors duration-100 md:text-xl text-gray-800">
//                         Register and verify
//                       </h3>
//                       <p className="text-start text-sm font-normal transition-colors duration-100 md:text-base text-gray-600">
//                         Complete verification process
//                       </p>
//                     </div>
//                   </button>
//                 </li>

//                 <li className="relative cursor-pointer pb-8 md:pb-14">
//                   <button className="z-10 flex items-start gap-5 bg-white">
//                     <div>
//                       <svg
//                         width="54"
//                         height="54"
//                         viewBox="0 0 54 54"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <rect
//                           x="1"
//                           y="1"
//                           width="52"
//                           height="52"
//                           rx="12"
//                           stroke="#EAECF0"
//                           strokeWidth="2"
//                         ></rect>
//                         <Image
//                           src="/images/rupees.0fc27297.svg"
//                           alt=""
//                           width={24}
//                           height={24}
//                           className="transition-all duration-100 opacity-20"
//                           style={{
//                             transform: "translate(-12px, -12px)",
//                             position: "absolute",
//                             top: "50%",
//                             left: "50%",
//                           }}
//                         />
//                         <path
//                           d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                           stroke="#182230"
//                           strokeWidth="2"
//                           fill="none"
//                           strokeDasharray="208"
//                           strokeDashoffset="208"
//                           className=""
//                         ></path>
//                       </svg>
//                     </div>
//                     <div className="flex flex-col items-start gap-1">
//                       <h3 className="text-start text-base font-semibold leading-4 transition-colors duration-100 md:text-xl text-gray-400">
//                         Create a Digital Wallet
//                       </h3>
//                       <p className="text-start text-sm font-normal transition-colors duration-100 md:text-base text-gray-400">
//                         Add transfer amount
//                       </p>
//                     </div>
//                   </button>
//                 </li>
//                 <li className="relative cursor-pointer pb-8 md:pb-14">
//                   <button className="z-10 flex items-start gap-5 bg-white">
//                     <div>
//                       <svg
//                         width="54"
//                         height="54"
//                         viewBox="0 0 54 54"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <rect
//                           x="1"
//                           y="1"
//                           width="52"
//                           height="52"
//                           rx="12"
//                           stroke="#EAECF0"
//                           strokeWidth="2"
//                         ></rect>
//                         <Image
//                           src="/images/recipients.1ad7c3f3.svg"
//                           alt=""
//                           width={24}
//                           height={24}
//                           className="transition-all duration-100 opacity-20"
//                           style={{
//                             transform: "translate(-12px, -12px)",
//                             position: "absolute",
//                             top: "50%",
//                             left: "50%",
//                           }}
//                         />
//                         <path
//                           d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                           stroke="#182230"
//                           strokeWidth="2"
//                           fill="none"
//                           strokeDasharray="208"
//                           strokeDashoffset="208"
//                           className=""
//                         ></path>
//                       </svg>
//                     </div>
//                     <div className="flex flex-col items-start gap-1">
//                       <h3 className="text-start text-base font-semibold leading-4 transition-colors duration-100 md:text-xl text-gray-400">
//                         Add Recipients
//                       </h3>
//                       <p className="text-start text-sm font-normal transition-colors duration-100 md:text-base text-gray-400">
//                         Who do we send to?
//                       </p>
//                     </div>
//                   </button>
//                 </li>
//                 <li className="relative cursor-pointer pb-8 md:pb-0">
//                   <button className="z-10 flex items-start gap-5 bg-white">
//                     <div>
//                       <svg
//                         width="54"
//                         height="54"
//                         viewBox="0 0 54 54"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <rect
//                           x="1"
//                           y="1"
//                           width="52"
//                           height="52"
//                           rx="12"
//                           stroke="#EAECF0"
//                           strokeWidth="2"
//                         ></rect>
//                         <Image
//                           src="/images/flight.3ce5a347.svg"
//                           alt=""
//                           width={24}
//                           height={24}
//                           className="transition-all duration-100 opacity-20"
//                           style={{
//                             transform: "translate(-12px, -12px)",
//                             position: "absolute",
//                             top: "50%",
//                             left: "50%",
//                           }}
//                         />
//                         <path
//                           d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                           stroke="#182230"
//                           strokeWidth="2"
//                           fill="none"
//                           strokeDasharray="208"
//                           strokeDashoffset="208"
//                           className=""
//                         ></path>
//                       </svg>
//                     </div>
//                     <div className="flex flex-col items-start gap-1">
//                       <h3 className="text-start text-base font-semibold leading-4 transition-colors duration-100 md:text-xl text-gray-400">
//                         Transfer Money
//                       </h3>
//                       <p className="text-start text-sm font-normal transition-colors duration-100 md:text-base text-gray-400">
//                         Complete transfer process
//                       </p>
//                     </div>
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="relative flex overflow-hidden lg:col-span-2 lg:block lg:self-stretch">
//             <div className="relative hidden h-full min-h-[20px] overflow-hidden rounded-[30px] bg-white lg:block">
//               <div className="space-y-3 p-10 duration-500 animate-in slide-in-from-left-20">
//                 <h3 className="text-2xl font-semibold leading-[125%] text-gray-800">
//                   Register & Identify
//                 </h3>
//                 <p className="leading-[150%] text-gray-600">
//                   Register with your email and phone number. <br />
//                   Identify yourself with our inbuilt KYC process
//                 </p>
//               </div>
//               <Image
//                 src="/assets/images/reg.997f6e4c.svg"
//                 alt=""
//                 className="absolute bottom-0 pl-10 duration-500 animate-in slide-in-from-bottom-20"
//                 width={0}
//                 height={0}
//                 sizes="100vw"
//                 style={{ width: "auto", height: "auto" }}
//               />
//               <Image
//                 src="/assets/images/reg-2.1d035221.svg"
//                 alt=""
//                 className="absolute bottom-0 right-0 w-[300px] duration-500 animate-in slide-in-from-right-10 xl:w-[412px]"
//                 width={0}
//                 height={0}
//                 sizes="100vw"
//                 style={{ width: "auto", height: "auto" }}
//               />
//             </div>
//             <div className="relative flex h-[500px] min-w-[320px] flex-col items-center gap-6 rounded-[30px] bg-white px-6 pt-6 lg:hidden">
//               <div className="space-y-3 text-center">
//                 <h3 className="text-2xl font-medium leading-[125%] text-gray-800">
//                   Register & Identify
//                 </h3>
//                 <p className="leading-[150%] text-gray-600">
//                   Register with your email and phone number. Identify yourself
//                   with our inbuilt KYC process
//                 </p>
//               </div>
//               <Image
//                 alt=""
//                 loading="lazy"
//                 width={202}
//                 height={314}
//                 decoding="async"
//                 data-nimg="1"
//                 className="absolute bottom-0 flex-1"
//                 src="/images/reg.997f6e4c.svg"
//                 style={{ color: "transparent" }}
//               />
//             </div>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default TransferSteps;

// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";

// const stepsData = [
//   {
//     id: 0,
//     iconDefault: "/assets/icon/verify.svg", // Use distinct inactive icon if desired
//     iconActive: "/assets/icon/verify.svg",
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     // contentTitle: "Register & Identify",
//     contentSubtitle: (
//       <>
//         {/* Register with your email and phone number. <br /> */}
//         {/* Identify yourself with our inbuilt KYC process */}
//       </>
//     ),
//     contentImage1: "/assets/images/reg.997f6e4c.svg", // Ensure this path is correct in /public
//     contentImage2: "/assets/images/reg-2.1d035221.svg", // Ensure this path is correct in /public
//   },
//   {
//     id: 1,
//     iconDefault: "/assets/icon/rupees..svg", // Replace with actual inactive icon path
//     iconActive: "/assets/icon/rupees..svg", // Replace with actual active icon path (rupees?)
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     // contentTitle: "Create Your Wallet",
//     contentSubtitle: (
//       <>
//         {/* Easily set up your secure digital wallet. <br /> */}
//         {/* Add funds to start transferring. */}
//       </>
//     ),
//     contentImage1: "/assets/images/wallet.8ef702f3.svg", // Replace with actual image path
//   },
//   {
//     id: 2,
//     iconDefault: "/assets/icon/recipients.svg", // Replace with actual inactive icon path
//     iconActive: "/assets/icon/recipients.svg", // Replace with actual active icon path
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     // contentTitle: "Manage Your Recipients",
//     contentSubtitle: (
//       <>
//         {/* Add and save recipient details securely. <br /> */}
//         {/* Send money quickly next time. */}
//       </>
//     ),
//     contentImage1: "/assets/images/rec-1.27d0b92a.svg", // Replace with actual image path
//     contentImage2: "/assets/images/rec-2.e0ece37b.svg", // Replace with actual image path
//   },
//   {
//     id: 3,
//     iconDefault: "/assets/icon/flight.svg", // Replace with actual inactive icon path (flight?)
//     iconActive: "/assets/icon/flight.svg", // Replace with actual active icon path
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     // contentTitle: "Send Your Money",
//     contentSubtitle: (
//       <>
//         {/* Review the details and confirm your transfer. <br /> */}
//         {/* Track your money's journey in real-time. */}
//       </>
//     ),
//     contentImage1: "/assets/images/trf-1.7a2bc647.svg", // Replace with actual image path
//   },
// ];

// const AUTO_ADVANCE_DELAY = 3000; // ms - How long to wait before advancing automatically (make >= animation duration)
// const BORDER_ANIMATION_DURATION = 3000; // ms - Should match CSS animation duration

// const TransferSteps: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true); // Track if auto-advance is active
//   const [isAnimating, setIsAnimating] = useState(true); // Track if border animation is running for the active item
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // --- Function to handle advancing to the next step ---
//   const advanceStep = useCallback(() => {
//     setActiveIndex((prevIndex) => {
//       const nextIndex = (prevIndex + 1) % stepsData.length;
//       setIsAnimating(true); // Start animation for the new index
//       // Set a timeout to mark animation as finished after its duration
//       if (animationTimeoutRef.current)
//         clearTimeout(animationTimeoutRef.current);
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimating(false); // Animation finished for this step
//       }, BORDER_ANIMATION_DURATION);
//       return nextIndex;
//     });
//   }, []); // No dependencies needed as it relies on the state updater function form

//   // --- Effect for automatic advancement ---
//   useEffect(() => {
//     if (isAutoAdvancing) {
//       // Clear existing timer before setting a new one
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//       }
//       // Start the animation flag immediately for index 0 on initial load
//       if (activeIndex === 0 && isAnimating) {
//         if (animationTimeoutRef.current)
//           clearTimeout(animationTimeoutRef.current);
//         animationTimeoutRef.current = setTimeout(() => {
//           setIsAnimating(false);
//         }, BORDER_ANIMATION_DURATION);
//       }

//       // Set the timer
//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);

//       // Cleanup function to clear timer on unmount or when isAutoAdvancing changes
//       return () => {
//         if (timerRef.current) {
//           clearTimeout(timerRef.current);
//         }
//         if (animationTimeoutRef.current) {
//           clearTimeout(animationTimeoutRef.current);
//         }
//       };
//     } else {
//       // If auto advancing is stopped, clear any running timer
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//       }
//       if (animationTimeoutRef.current) {
//         clearTimeout(animationTimeoutRef.current);
//       }
//     }
//   }, [activeIndex, isAutoAdvancing, advanceStep]); // Re-run effect if these change

//   // --- Handler for clicking a step ---
//   const handleStepClick = (index: number) => {
//     setIsAutoAdvancing(false); // Stop auto-advancing on manual click
//     if (timerRef.current) clearTimeout(timerRef.current); // Clear any pending auto-advance
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

//     setActiveIndex(index);
//     setIsAnimating(true); // Start animation for the clicked index
//     // Set timeout to mark animation as finished
//     animationTimeoutRef.current = setTimeout(() => {
//       setIsAnimating(false);
//     }, BORDER_ANIMATION_DURATION);
//   };

//   const currentStep = stepsData[activeIndex];

//   return (
//     <div className="py-10 bg-[#F2F4F7] dark:bg-gray-900">
//       <section
//         className="flex flex-col justify-center container mx-auto px-4"
//         id="transfer-steps"
//       >
//         {/* Title Section */}
//         <article className="flex flex-col gap-5 mb-8 lg:mb-14">
//           <h1 className="text-4xl md:text-5xl xl:text-7xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
//             4 easy steps to
//             <span className="text-primary"> Transfer to India </span>
//           </h1>
//         </article>

//         {/* Steps and Content Section */}
//         <article className="grid items-start justify-center gap-8 lg:grid-cols-3 lg:gap-8">
//           {/* Steps List (Left Side) */}
//           <div className="w-full lg:w-auto">
//             <div className="rounded-[30px] bg-white dark:bg-gray-800 p-6 md:p-10 shadow-md">
//               <ul className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-4 lg:gap-0">
//                 {stepsData.map((step, index) => {
//                   const isActive = activeIndex === index;
//                   const isCurrentlyAnimating = isActive && isAnimating;

//                   return (
//                     <li
//                       key={step.id}
//                       className={`relative shrink-0 lg:shrink lg:pb-8 ${
//                         index === stepsData.length - 1 ? "lg:pb-0" : "md:pb-10" // Remove bottom padding for last item on large screens
//                       }`}
//                     >
//                       <button
//                         onClick={() => handleStepClick(index)}
//                         className="z-10 flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-5 bg-transparent w-full text-left group" // Use group for potential hover effects
//                         aria-current={isActive ? "step" : undefined}
//                       >
//                         {/* Icon SVG Container */}
//                         <div className="relative">
//                           <svg
//                             width="54"
//                             height="54"
//                             viewBox="0 0 54 54"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className={`transition-colors duration-500 ${
//                               isActive
//                                 ? "text-mainheading dark:text-primary"
//                                 : "text-gray-400 dark:text-gray-500"
//                             }`}
//                           >
//                             {/* Base Rect */}
//                             <rect
//                               x="1"
//                               y="1"
//                               width="52"
//                               height="52"
//                               rx="12"
//                               className={`transition-colors duration-500 ${
//                                 isActive
//                                   ? "stroke-[#EAECF0] dark:stroke-gray-600"
//                                   : "stroke-[#EAECF0] dark:stroke-gray-700"
//                               }`}
//                               strokeWidth="2"
//                               fill={
//                                 isActive
//                                   ? "white dark:bg-gray-800"
//                                   : "transparent"
//                               } // Optional: Fill background when active
//                             />
//                             {/* Icon Image */}
//                             <image
//                               href={
//                                 isActive ? step.iconActive : step.iconDefault
//                               } // Use active or default icon
//                               width="24"
//                               height="24"
//                               x="15"
//                               y="15" // Center the 24x24 icon in 54x54 svg
//                               className={`transition-opacity duration-500 ${
//                                 isActive
//                                   ? "opacity-100"
//                                   : "opacity-50 group-hover:opacity-75"
//                               }`}
//                             />
//                             {/* Animated Border Path */}
//                             <path
//                               d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                               stroke={isActive ? "currentColor" : "none"} // Use text color for active border, none otherwise
//                               strokeWidth="2"
//                               fill="none"
//                               strokeDasharray="208" // Match this in CSS keyframes
//                               strokeDashoffset="208" // Initial state (hidden)
//                               // Apply animation class only when this step is active AND animating
//                               className={
//                                 isCurrentlyAnimating
//                                   ? "animate-border-draw"
//                                   : "border-path-reset"
//                               }
//                             />
//                           </svg>
//                         </div>

//                         {/* Text Content */}
//                         <div className="flex flex-col items-center lg:items-start gap-1 mt-2 lg:mt-0">
//                           <h3
//                             className={`text-center lg:text-left text-base font-semibold leading-tight transition-colors duration-500 md:text-lg ${
//                               isActive
//                                 ? "text-gray-800 dark:text-white"
//                                 : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
//                             }`}
//                           >
//                             {step.title}
//                           </h3>
//                           <p
//                             className={`text-center lg:text-left text-sm font-normal transition-colors duration-500 md:text-base ${
//                               isActive
//                                 ? "text-gray-600 dark:text-gray-300"
//                                 : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
//                             }`}
//                           >
//                             {step.subtitle}
//                           </p>
//                         </div>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>

//           {/* Content Area (Right Side) */}
//           <div className="relative flex lg:col-span-2 lg:block lg:self-stretch h-[450px] md:h-[500px] lg:h-auto min-h-[450px] md:min-h-[500px] lg:min-h-[400px]">
//             {/* Use key to force re-render on change, triggering animations */}
//             <div
//               key={activeIndex}
//               className="absolute inset-0 flex flex-col justify-center rounded-[30px] bg-white dark:bg-gray-800 shadow-md p-6 lg:p-10 animate-in fade-in duration-700" // Animate content fade-in
//             >
//               {/* Text Content */}
//               <div className="space-y-3 animate-in  slide-in-from-top-5 duration-500 z-50">
//                 <h3 className="text-2xl lg:text-3xl font-semibold text-secondary">
//                   {currentStep.contentTitle}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   {currentStep.contentSubtitle}
//                 </p>
//               </div>

//               {/* Images Container */}
//               <div className="relative mt-6 h-[250px] sm:h-[300px] lg:h-[550px] flex justify-center lg:justify-start">
//                 {/* Ensure images are positioned correctly, maybe adjust absolute/relative positioning as needed */}
//                 <div className="absolute bottom-0 left-0 lg:left-10 w-[180px] sm:w-[220px] md:w-[250px] lg:w-auto animate-in slide-in-from-bottom-10 duration-700 delay-200">
//                   <Image
//                     src={currentStep.contentImage1}
//                     alt={`${currentStep.contentTitle} illustration 1`}
//                     width={280} // Adjust based on actual image size/desired display
//                     height={400} // Adjust based on actual image size/desired display
//                     style={{
//                       width: "auto",
//                       height: "auto",
//                       maxHeight: "350px",
//                     }} // Allow natural sizing up to a max height
//                     priority={activeIndex === 0} // Prioritize loading the first image
//                   />
//                 </div>

//                 {/* Image 2 */}
//                 {currentStep.contentImage2 && (
//                   <div className="absolute bottom-0 right-0 w-[180px] sm:w-[240px] md:w-[300px] lg:w-[350px] xl:w-[412px] animate-in slide-in-from-right-10 duration-700 delay-300">
//                     <Image
//                       src={currentStep.contentImage2}
//                       alt={`${currentStep.contentTitle} illustration 2`}
//                       width={412} // Adjust based on actual image size/desired display
//                       height={300} // Adjust based on actual image size/desired display
//                       style={{
//                         width: "100%",
//                         height: "auto",
//                         maxHeight: "300px",
//                       }} // Responsive width
//                       priority={activeIndex === 0}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default TransferSteps;

// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";

// // Define the structure for content blocks (used in steps 2 and 4)
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success"; // Optional type for styling
// }

// // Define the structure for each step
// interface StepData {
//   id: number;
//   iconDefault: string;
//   iconActive: string;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode; // Can be string or JSX
//   contentImage1: string;
//   contentImage2?: string; // Optional second image
//   contentBlocks?: ContentBlock[]; // Optional array of text blocks
// }

// // Updated Data matching the reference images
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: "/assets/icon/verify.svg",
//     iconActive: "/assets/icon/verify.svg",
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Identify",
//     contentSubtitle: (
//       <>
//         Register with your email and phone number. <br />
//         Identify yourself with our inbuilt KYC process
//       </>
//     ),
//     contentImage1: "/assets/images/reg.997f6e4c.svg", // Left phone mockup
//     contentImage2: "/assets/images/reg-2.1d035221.svg", // Right phone mockup
//   },
//   {
//     id: 1,
//     iconDefault: "/assets/icon/rupees..svg", // Assuming this is the wallet icon
//     iconActive: "/assets/icon/rupees..svg",
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Digital Wallet With Passkey",
//     contentSubtitle: "Our passkey security feature safeguards your money",
//     contentImage1: "/assets/images/wallet.8ef702f3.svg", // Single phone mockup with security icons
//     contentBlocks: [
//       // Text blocks for this step
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: "/assets/icon/recipients.svg",
//     iconActive: "/assets/icon/recipients.svg",
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle: "Add the accounts of people you'd like to send to",
//     contentImage1: "/assets/images/rec-1.27d0b92a.svg", // Left phone mockup
//     contentImage2: "/assets/images/rec-2.e0ece37b.svg", // Right phone mockup
//   },
//   {
//     id: 3,
//     iconDefault: "/assets/icon/flight.svg", // Assuming this is the transfer icon
//     iconActive: "/assets/icon/flight.svg",
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money",
//     contentSubtitle: (
//       <>
//         Send Euros to our bank account. <br />
//         We transfer money to the recipient on your approval
//       </>
//     ),
//     contentImage1: "/assets/images/trf-1.7a2bc647.svg", // Single phone mockup showing transfer screen
//     contentBlocks: [
//       // Text blocks for this step
//       { text: "Approve your transaction", type: "default" },
//       { text: "ScopeX will verify your transfer soon", type: "default" },
//       { text: "Transfer Completed", type: "success" }, // Special styling for success
//     ],
//   },
// ];

// const AUTO_ADVANCE_DELAY = 3000; // ms
// const BORDER_ANIMATION_DURATION = 3000; // ms - Match CSS

// const TransferSteps: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
//   const [isAnimating, setIsAnimating] = useState(true); // Tracks border animation state
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const advanceStep = useCallback(() => {
//     setActiveIndex((prevIndex) => {
//       const nextIndex = (prevIndex + 1) % stepsData.length;
//       setIsAnimating(true);
//       if (animationTimeoutRef.current)
//         clearTimeout(animationTimeoutRef.current);
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimating(false);
//       }, BORDER_ANIMATION_DURATION);
//       return nextIndex;
//     });
//   }, []);

//   useEffect(() => {
//     if (isAutoAdvancing) {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       // Start animation timeout for initial load or auto-advance
//       if (isAnimating) {
//         // Should be true on initial load / advance
//         if (animationTimeoutRef.current)
//           clearTimeout(animationTimeoutRef.current);
//         animationTimeoutRef.current = setTimeout(() => {
//           setIsAnimating(false);
//         }, BORDER_ANIMATION_DURATION);
//       }

//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);

//       return () => {
//         if (timerRef.current) clearTimeout(timerRef.current);
//         if (animationTimeoutRef.current)
//           clearTimeout(animationTimeoutRef.current);
//       };
//     } else {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       // Optionally clear animation timeout if stopped manually,
//       // though letting it finish might be smoother visually.
//       // if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
//     }
//   }, [activeIndex, isAutoAdvancing, advanceStep, isAnimating]); // isAnimating added to deps

//   const handleStepClick = (index: number) => {
//     setIsAutoAdvancing(false);
//     if (timerRef.current) clearTimeout(timerRef.current);
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

//     if (index !== activeIndex) {
//       setActiveIndex(index);
//       setIsAnimating(true); // Start animation for newly clicked index
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimating(false);
//       }, BORDER_ANIMATION_DURATION);
//     } else {
//       // If clicking the already active index, maybe reset animation or do nothing
//       // For now, we assume clicking active does nothing to animation state unless auto-advance was on
//       setIsAnimating(false); // Ensure animation stops if clicking the active one while auto-advancing was on
//     }
//   };

//   const currentStep = stepsData[activeIndex];

//   // Helper function to get block styling
//   const getBlockClasses = (type: ContentBlock["type"]) => {
//     switch (type) {
//       case "success":
//         return "bg-green-600/20 text-green-600 dark:text-green-200";
//       case "default":
//       default:
//         return "bg-lightgray dark:bg-gray-700 text-gray-500 dark:text-gray-200";
//     }
//   };

//   return (
//     <div className="py-10 bg-[#F2F4F7] dark:bg-background">
//       {/* Adjusted dark bg */}
//       <section
//         className="flex flex-col justify-center container mx-auto px-4"
//         id="transfer-steps"
//       >
//         {/* Title Section */}
//         <article className="flex flex-col gap-5 mb-8 lg:mb-14">
//           <h1 className="text-4xl md:text-5xl xl:text-7xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
//             4 easy steps to
//             <span className="text-primary"> Transfer to India </span>
//           </h1>
//         </article>

//         {/* Steps and Content Section */}
//         <article className="grid items-start justify-center gap-8 lg:grid-cols-3 lg:gap-8">
//           {/* Steps List (Left Side) */}
//           <div className="w-full h-full">
//             <div className="rounded-3xl bg-white dark:bg-white/5 p-8 h-full">
//               <ul className="flex flex-col justify-between h-full">
//                 {stepsData.map((step, index) => {
//                   const isActive = activeIndex === index;
//                   const isCurrentlyAnimating = isActive && isAnimating;
//                   return (
//                     <li
//                       key={step.id}
//                       className={`relative shrink-0 lg:shrink ${
//                         index === stepsData.length - 1 ? "" : "" // Consistent padding
//                       }`}
//                     >
//                       <button
//                         onClick={() => handleStepClick(index)}
//                         className="z-10 flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-5 bg-transparent w-full text-left group focus:outline-none rounded-lg" // Added focus styles
//                         aria-current={isActive ? "step" : undefined}
//                       >
//                         {/* Icon SVG Container */}
//                         <div className="relative">
//                           <svg
//                             viewBox="0 0 54 54"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className={`transition-colors duration-300 md:size-18 size-10 ${
//                               // Faster transition
//                               isActive
//                                 ? "text-mainheading dark:text-primary" // Use primary color for active icon border
//                                 : "text-[#97A2B3] dark:text-gray-500"
//                             }`}
//                           >
//                             {/* Base Rect */}
//                             <rect
//                               x="1"
//                               y="1"
//                               width="52"
//                               height="52"
//                               rx="12"
//                               className={`transition-colors duration-300 stroke-[#EAECF0] dark:stroke-white`}
//                               strokeWidth="2"
//                               fill={
//                                 isActive
//                                   ? "dark:bg-gray-800"
//                                   : "#F2F4F7 dark:bg-gray-800" // Subtle bg for inactive
//                               }
//                             />
//                             {/* Icon Image */}
//                             <image
//                               href={
//                                 isActive ? step.iconActive : step.iconDefault
//                               }
//                               x="15"
//                               y="15"
//                               className={`transition-opacity duration-300 ${
//                                 isActive
//                                   ? "opacity-100 "
//                                   : "opacity-60 group-hover:opacity-80" // Adjusted opacity
//                               }`}
//                             />

//                             {/* Animated Border Path */}
//                             <path
//                               d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                               stroke={isActive ? "currentColor" : "none"}
//                               strokeWidth="2"
//                               fill="none"
//                               strokeDasharray="208"
//                               strokeDashoffset="208"
//                               className={
//                                 isCurrentlyAnimating
//                                   ? "animate-border-draw"
//                                   : isActive
//                                   ? "border-path-static"
//                                   : "border-path-reset" // Keep border visible when active but not animating
//                               }
//                             />
//                           </svg>
//                         </div>

//                         {/* Text Content */}
//                         <div className="flex flex-col items-center lg:items-start gap-1 mt-2">
//                           <h3
//                             className={`text-center lg:text-left capitalize text-base font-bold leading-tight transition-colors duration-300 md:text-xl ${
//                               isActive
//                                 ? "text-[#182230] dark:text-white" // Darker active text
//                                 : "text-[#97A2B3] dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
//                             }`}
//                           >
//                             {step.title}
//                           </h3>
//                           <p
//                             className={`text-center lg:text-left text-sm font-normal transition-colors duration-300 md:text-lg ${
//                               isActive
//                                 ? "text-gray-500 dark:text-gray-300"
//                                 : "text-[#97A2B3] dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-400"
//                             }`}
//                           >
//                             {step.subtitle}
//                           </p>
//                         </div>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>

//           {/* Content Area (Right Side) */}
//           <div className="relative flex lg:col-span-2 lg:block lg:self-stretch h-[500px] md:h-[550px] lg:h-[600px] min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">
//             <div
//               key={activeIndex} // Trigger animation on change
//               className="absolute inset-0 flex flex-col rounded-3xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700/10 p-8 animate-in fade-in duration-700 overflow-hidden" // Added overflow-hidden
//             >
//               {/* Top Text Content */}
//               <div className="space-y-2 animate-in slide-in-from-top-5 duration-500 z-10 mb-4 lg:mb-8">
//                 <h3 className="text-2xl lg:text-3xl font-medium text-mainheading dark:text-white">
//                   {/* Adjusted color */}
//                   {currentStep.contentTitle}
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                   {/* Handle line breaks */}
//                   {currentStep.contentSubtitle}
//                 </p>
//               </div>

//               {/* Content Blocks (Steps 2 & 4) */}
//               {currentStep.contentBlocks && (
//                 <div className="flex flex-col items-start lg:items-end gap-3 mb-4 lg:mb-0 lg:absolute lg:top-10 lg:right-10 z-10 animate-in fade-in slide-in-from-right-5 duration-500 delay-100">
//                   {currentStep.contentBlocks.map(
//                     (
//                       block,
//                       blockIndex
//                     ) => (
//                       <div
//                         key={blockIndex} // Use the inner index for the key
//                         className={`px-4 py-3 rounded-full font-medium ${getBlockClasses(
//                           block.type
//                         )}`}
//                       >
//                         {block.text}
//                       </div>
//                     )
//                   )}
//                 </div>
//               )}

//               {/* Images Container - Adjusted positioning and sizing */}
//               <div className="relative flex-grow flex items-end justify-center lg:justify-start mt-auto">
//                 {/* Image 1 */}
//                 <div
//                   className={`relative ${
//                     currentStep.contentImage2
//                       ? "w-1/2 lg:w-auto lg:absolute lg:bottom-0 lg:left-5"
//                       : "mx-auto lg:mx-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2"
//                   } animate-in slide-in-from-bottom-10 duration-700 delay-100`}
//                 >
//                   <Image
//                     src={currentStep.contentImage1}
//                     alt={`${currentStep.title} illustration 1`}
//                     width={currentStep.contentImage2 ? 280 : 320}
//                     height={currentStep.contentImage2 ? 500 : 550}
//                     style={{
//                       width: "auto",
//                       height: "auto",
//                       maxHeight: currentStep.contentImage2 ? "450px" : "500px",
//                       maxWidth: "100%",
//                     }} // Adjusted max heights
//                     priority={activeIndex === 0} // Prioritize Image 1 only if it's the first step active
//                     className="object-cover"
//                   />
//                 </div>

//                 {/* Image 2 (Conditional) */}
//                 {currentStep.contentImage2 && (
//                   <div className="relative w-1/2 lg:w-auto lg:absolute lg:bottom-0 lg:right-5 animate-in slide-in-from-bottom-10 duration-700 delay-200">
//                     <Image
//                       src={currentStep.contentImage2}
//                       alt={`${currentStep.title} illustration 2`}
//                       width={280}
//                       height={500}
//                       style={{
//                         width: "auto",
//                         height: "auto",
//                         maxHeight: "350px",
//                         maxWidth: "100%",
//                       }} // Responsive
//                       // --- FIX HERE ---
//                       priority={activeIndex === 0} // Prioritize Image 2 *only* if the active step is the first one (index 0)
//                       // --- END FIX ---
//                       className="object-cover"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default TransferSteps;

//latest Codes

// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa"; // Importing React Icons
// import { FaMoneyBillTransfer } from "react-icons/fa6";

// // Define the structure for content blocks (used in steps 2 and 4)
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success"; // Optional type for styling
// }

// // Define the structure for each step
// interface StepData {
//   id: number;
//   iconDefault: IconType; // Changed to IconType
//   iconActive: IconType; // Changed to IconType
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode; // Can be string or JSX
//   contentImage1: string;
//   contentImage2?: string; // Optional second image
//   contentBlocks?: ContentBlock[]; // Optional array of text blocks
// }

// // Updated Data matching the reference images, using React Icons
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Identify",
//     contentSubtitle: (
//       <>
//         Register with your email and phone number. <br />
//         Identify yourself with our inbuilt KYC process
//       </>
//     ),
//     contentImage1: "/assets/images/Frame.svg", // Left phone mockup
//     contentImage2: "/assets/images/reg-2.1d035221.svg", // Right phone mockup
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet, // Assuming this is the wallet icon
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Digital Wallet With Passkey",
//     contentSubtitle: "Our passkey security feature safeguards your money",
//     contentImage1: "/assets/images/wallet.8ef702f3.svg", // Single phone mockup with security icons
//     contentBlocks: [
//       // Text blocks for this step
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle: "Add the accounts of people you'd like to send to",
//     contentImage1: "/assets/images/rec-1.27d0b92a.svg", // Left phone mockup
//     contentImage2: "/assets/images/rec-2.e0ece37b.svg", // Right phone mockup
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer, // Assuming this is the transfer icon
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money",
//     contentSubtitle: (
//       <>
//         Send Euros to our bank account. <br />
//         We transfer money to the recipient on your approval
//       </>
//     ),
//     contentImage1: "/assets/images/trf-1.7a2bc647.svg", // Single phone mockup showing transfer screen
//     contentBlocks: [
//       // Text blocks for this step
//       { text: "Approve your transaction", type: "default" },
//       { text: "ScopeX will verify your transfer soon", type: "default" },
//       { text: "Transfer Completed", type: "success" }, // Special styling for success
//     ],
//   },
// ];

// const AUTO_ADVANCE_DELAY = 3000; // ms
// const BORDER_ANIMATION_DURATION = 3000; // ms - Match CSS

// const TransferSteps: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
//   const [isAnimating, setIsAnimating] = useState(true); // Tracks border animation state
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const advanceStep = useCallback(() => {
//     setActiveIndex((prevIndex) => {
//       const nextIndex = (prevIndex + 1) % stepsData.length;
//       setIsAnimating(true);
//       if (animationTimeoutRef.current)
//         clearTimeout(animationTimeoutRef.current);
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimating(false);
//       }, BORDER_ANIMATION_DURATION);
//       return nextIndex;
//     });
//   }, []);

//   useEffect(() => {
//     if (isAutoAdvancing) {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       // Start animation timeout for initial load or auto-advance
//       if (isAnimating) {
//         // Should be true on initial load / advance
//         if (animationTimeoutRef.current)
//           clearTimeout(animationTimeoutRef.current);
//         animationTimeoutRef.current = setTimeout(() => {
//           setIsAnimating(false);
//         }, BORDER_ANIMATION_DURATION);
//       }

//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);

//       return () => {
//         if (timerRef.current) clearTimeout(timerRef.current);
//         if (animationTimeoutRef.current)
//           clearTimeout(animationTimeoutRef.current);
//       };
//     } else {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       // Optionally clear animation timeout if stopped manually,
//       // though letting it finish might be smoother visually.
//       // if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
//     }
//   }, [activeIndex, isAutoAdvancing, advanceStep, isAnimating]); // isAnimating added to deps

//   const handleStepClick = (index: number) => {
//     setIsAutoAdvancing(false);
//     if (timerRef.current) clearTimeout(timerRef.current);
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

//     if (index !== activeIndex) {
//       setActiveIndex(index);
//       setIsAnimating(true); // Start animation for newly clicked index
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimating(false);
//       }, BORDER_ANIMATION_DURATION);
//     } else {
//       // If clicking the already active index, maybe reset animation or do nothing
//       // For now, we assume clicking active does nothing to animation state unless auto-advance was on
//       setIsAnimating(false); // Ensure animation stops if clicking the active one while auto-advancing was on
//     }
//   };

//   const currentStep = stepsData[activeIndex];

//   // Helper function to get block styling
//   const getBlockClasses = (type: ContentBlock["type"]) => {
//     switch (type) {
//       case "success":
//         return "bg-green-600/20 text-green-600";
//       case "default":
//       default:
//         return "bg-lightgray dark:bg-white/5 text-xs lg:text-base text-gray-500 dark:text-gray-300";
//     }
//   };

//   return (
//     <div className="py-10 bg-[#F2F4F7] dark:bg-background">
//       {/* Adjusted dark bg */}
//       <section
//         className="flex flex-col justify-center container mx-auto px-4"
//         id="transfer-steps"
//       >
//         {/* Title Section */}
//         <article className="flex flex-col gap-5 mb-8 lg:mb-14">
//           <h1 className="text-4xl md:text-5xl xl:text-7xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
//             4 easy steps to
//             <span className="text-primary"> Transfer to India </span>
//           </h1>
//         </article>

//         {/* Steps and Content Section */}
//         <article className="grid gap-8 lg:grid-cols-3 lg:gap-8">
//           {/* Steps List (Left Side) */}
//           <div className="w-full h-full">
//             <div className="rounded-3xl bg-white dark:bg-white/5 lg:p-8 p-6 h-full">
//               <ul className="lg:flex md:grid md:grid-cols-2 grid-cols-1 flex-col space-y-6 justify-between h-full gap-8">
//                 {stepsData.map((step, index) => {
//                   const isActive = activeIndex === index;
//                   const isCurrentlyAnimating = isActive && isAnimating;
//                   return (
//                     <li
//                       key={step.id}
//                       className={`relative shrink-0 lg:shrink ${
//                         index === stepsData.length - 1 ? "" : "" // Consistent padding
//                       }`}
//                     >
//                       <button
//                         onClick={() => handleStepClick(index)}
//                         className="z-10 flex flex-col lg:flex-row cursor-pointer items-center lg:items-start gap-2 lg:gap-5 bg-transparent w-full text-left group focus:outline-none rounded-lg" // Added focus styles
//                         aria-current={isActive ? "step" : undefined}
//                       >
//                         {/* Icon SVG Container */}
//                         <div className="relative">
//                           <svg
//                             viewBox="0 0 54 54"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className={`transition-colors duration-300 lg:size-18 md:size-14 size-10 ${
//                               // Faster transition
//                               isActive
//                                 ? "text-mainheading dark:text-primary" // Use primary color for active icon border
//                                 : "text-[#97A2B3] dark:text-gray-500"
//                             }`}
//                           >
//                             {/* Base Rect */}
//                             <rect
//                               x="1"
//                               y="1"
//                               width="52"
//                               height="52"
//                               rx="12"
//                               className={`transition-colors duration-300 stroke-[#EAECF0] dark:stroke-gray-500`}
//                               strokeWidth="2"
//                               fill={isActive ? "dark:stroke-black" : ""}
//                             />
//                             {/* Icon Image */}
//                             <foreignObject x="15" y="15" width="24" height="24">
//                               {isActive ? (
//                                 <step.iconActive
//                                   className={`h-6 w-6 ${
//                                     isActive
//                                       ? "text-mainheading dark:text-primary"
//                                       : "text-[#97A2B3] dark:text-gray-500"
//                                   }`}
//                                 />
//                               ) : (
//                                 <step.iconDefault
//                                   className={`h-6 w-6 ${
//                                     isActive
//                                       ? "text-mainheading dark:text-primary"
//                                       : "text-[#97A2B3] dark:text-gray-500"
//                                   }`}
//                                 />
//                               )}
//                             </foreignObject>

//                             {/* Animated Border Path */}
//                             <path
//                               d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                               stroke={isActive ? "currentColor" : "none"}
//                               strokeWidth="2"
//                               fill="none"
//                               strokeDasharray="208"
//                               strokeDashoffset="208"
//                               className={
//                                 isCurrentlyAnimating
//                                   ? "animate-border-draw"
//                                   : isActive
//                                   ? "border-path-static"
//                                   : "border-path-reset" // Keep border visible when active but not animating
//                               }
//                             />
//                           </svg>
//                         </div>

//                         {/* Text Content */}
//                         <div className="flex flex-col items-center lg:items-start gap-1 mt-2">
//                           <h3
//                             className={`text-center lg:text-left capitalize text-base font-bold leading-tight transition-colors duration-300 lg:text-xl ${
//                               isActive
//                                 ? "text-[#182230] dark:text-white" // Darker active text
//                                 : "text-[#97A2B3] dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
//                             }`}
//                           >
//                             {step.title}
//                           </h3>
//                           <p
//                             className={`text-center lg:text-left text-sm font-normal transition-colors duration-300 lg:text-lg ${
//                               isActive
//                                 ? "text-gray-500 dark:text-gray-300"
//                                 : "text-[#97A2B3] dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-400"
//                             }`}
//                           >
//                             {step.subtitle}
//                           </p>
//                         </div>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>

//           {/* Content Area (Right Side) */}
//           <div className="relative flex lg:col-span-2 lg:block lg:self-stretch h-[500px] md:h-[550px] lg:h-[600px] min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">
//             <div
//               key={activeIndex} // Trigger animation on change
//               className="absolute inset-0 flex flex-col rounded-3xl bg-white dark:bg-white/5 lg:p-8 p-6 animate-in fade-in duration-700 overflow-hidden" // Added overflow-hidden
//             >
//               {/* Top Text Content */}
//               <div className="space-y-2 animate-in slide-in-from-top-5 duration-500 z-10 mb-4 lg:mb-8">
//                 <h3 className="text-xl lg:text-3xl font-medium text-mainheading dark:text-white">
//                   {/* Adjusted color */}
//                   {currentStep.contentTitle}
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-300 lg:text-base text-xs leading-relaxed">
//                   {/* Handle line breaks */}
//                   {currentStep.contentSubtitle}
//                 </p>
//               </div>

//               {/* Content Blocks (Steps 2 & 4) */}
//               {currentStep.contentBlocks && (
//                 <div className="flex flex-col items-start lg:items-end gap-3 mb-4 text-nowrap lg:mb-0 lg:absolute lg:top-10 lg:right-10 z-10 animate-in fade-in slide-in-from-right-5 duration-500 delay-100">
//                   {currentStep.contentBlocks.map((block, blockIndex) => (
//                     <div
//                       key={blockIndex} // Use the inner index for the key
//                       className={`px-4 lg:py-3 py-2 rounded-full font-medium ${getBlockClasses(
//                         block.type
//                       )}`}
//                     >
//                       {block.text}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Images Container - Adjusted positioning and sizing */}
//               <div className="relative flex-grow flex items-end justify-center lg:justify-start mt-auto">
//                 {/* Image 1 */}
//                 <div
//                   className={`relative ${
//                     currentStep.contentImage2
//                       ? "w-1/2 lg:w-auto lg:absolute lg:bottom-0 lg:left-5"
//                       : "mx-auto lg:mx-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2"
//                   } animate-in slide-in-from-bottom-10 duration-700 delay-100`}
//                 >
//                   <Image
//                     src={currentStep.contentImage1}
//                     alt={`${currentStep.title} illustration 1`}
//                     width={currentStep.contentImage2 ? 280 : 320}
//                     height={currentStep.contentImage2 ? 500 : 550}
//                     style={{
//                       width: "auto",
//                       height: "auto",
//                       maxHeight: currentStep.contentImage2 ? "450px" : "500px",
//                       maxWidth: "100%",
//                     }} // Adjusted max heights
//                     priority={activeIndex === 0} // Prioritize Image 1 only if it's the first step active
//                     className="object-cover"
//                   />
//                 </div>

//                 {/* Image 2 (Conditional) */}
//                 {currentStep.contentImage2 && (
//                   <div className="relative w-1/2 lg:w-auto lg:absolute lg:bottom-0 lg:right-5 animate-in slide-in-from-bottom-10 duration-700 delay-200">
//                     <Image
//                       src={currentStep.contentImage2}
//                       alt={`${currentStep.title} illustration 2`}
//                       width={280}
//                       height={500}
//                       style={{
//                         width: "auto",
//                         height: "auto",
//                         maxHeight: "350px",
//                         maxWidth: "100%",
//                       }} // Responsive
//                       // --- FIX HERE ---
//                       priority={activeIndex === 0} // Prioritize Image 2 *only* if the active step is the first one (index 0)
//                       // --- END FIX ---
//                       className="object-cover"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default TransferSteps;

// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa"; // Importing React Icons
// import { FaMoneyBillTransfer } from "react-icons/fa6";

// // Define the structure for content blocks (used in steps 2 and 4)
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success"; // Optional type for styling
// }

// // Define the structure for each step
// interface StepData {
//   id: number;
//   iconDefault: IconType; // Changed to IconType
//   iconActive: IconType; // Changed to IconType
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode; // Can be string or JSX
//   contentImage1: string;
//   contentImage2?: string; // Optional second image
//   contentBlocks?: ContentBlock[]; // Optional array of text blocks
// }

// // Updated Data matching the reference images, using React Icons
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Identify",
//     contentSubtitle: (
//       <>
//         Register with your email and phone number. <br />
//         Identify yourself with our inbuilt KYC process
//       </>
//     ),
//     contentImage1: "/assets/images/Frame.svg", // Left phone mockup
//     contentImage2: "/assets/images/reg-2.1d035221.svg", // Right phone mockup
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet, // Assuming this is the wallet icon
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Digital Wallet With Passkey",
//     contentSubtitle: "Our passkey security feature safeguards your money",
//     contentImage1: "/assets/images/wallet.8ef702f3.svg", // Single phone mockup with security icons
//     contentBlocks: [
//       // Text blocks for this step
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle: "Add the accounts of people you'd like to send to",
//     contentImage1: "/assets/images/rec-1.27d0b92a.svg", // Left phone mockup
//     contentImage2: "/assets/images/rec-2.e0ece37b.svg", // Right phone mockup
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer, // Assuming this is the transfer icon
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money",
//     contentSubtitle: (
//       <>
//         Send Euros to our bank account. <br />
//         We transfer money to the recipient on your approval
//       </>
//     ),
//     contentImage1: "/assets/images/trf-1.7a2bc647.svg", // Single phone mockup showing transfer screen
//     contentBlocks: [
//       // Text blocks for this step
//       { text: "Approve your transaction", type: "default" },
//       { text: "ScopeX will verify your transfer soon", type: "default" },
//       { text: "Transfer Completed", type: "success" }, // Special styling for success
//     ],
//   },
// ];

// const AUTO_ADVANCE_DELAY = 3000; // ms
// const BORDER_ANIMATION_DURATION = 3000; // ms - Match CSS

// const TransferSteps: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
//   const [isAnimating, setIsAnimating] = useState(true); // Tracks border animation state
//   const [isHoverPaused, setIsHoverPaused] = useState(false); // Track if hover is pausing the timer

//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Function to clear all timers
//   const clearTimers = () => {
//     if (timerRef.current) clearTimeout(timerRef.current);
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
//   };

//   // Function to start the border animation timeout
//   const startBorderAnimation = () => {
//     setIsAnimating(true);
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
//     animationTimeoutRef.current = setTimeout(() => {
//       setIsAnimating(false);
//     }, BORDER_ANIMATION_DURATION);
//   };

//   // Callback to advance to the next step
//   const advanceStep = useCallback(() => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % stepsData.length);
//     startBorderAnimation(); // Start border animation for the next step
//   }, []);

//   // Effect to handle automatic advancement and cleanup
//   useEffect(() => {
//     // Clear previous timers on cleanup or when dependencies change
//     clearTimers();

//     // Start the border animation for the initial load or when activeIndex changes
//     startBorderAnimation();

//     // Set up the auto-advance timer if enabled and not paused by hover
//     if (isAutoAdvancing && !isHoverPaused) {
//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);
//     }

//     // Cleanup function to clear timers when the component unmounts
//     // or when dependencies change before the next effect runs
//     return () => {
//       clearTimers();
//     };
//     // Dependencies: Re-run when activeIndex changes, auto-advance state changes,
//     // hover pause state changes, or the advanceStep function reference changes.
//   }, [activeIndex, isAutoAdvancing, isHoverPaused, advanceStep]);

//   // Handle clicking on a step button
//   const handleStepClick = (index: number) => {
//     // --- MODIFIED LOGIC ---
//     // No longer sets isAutoAdvancing to false

//     // Prevent changing if already active (optional, but good practice)
//     if (index === activeIndex) {
//       // If clicking the active step while auto-advancing, reset its timer/animation
//       if (isAutoAdvancing && !isHoverPaused) {
//         clearTimers(); // Clear existing timers
//         startBorderAnimation(); // Restart border animation
//         timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY); // Restart advance timer
//       }
//       return;
//     }

//     // Clear existing timers before setting new state
//     clearTimers();

//     // Set the new active index IMMEDIATELY
//     setActiveIndex(index);

//   };

//   // --- NEW: Handle mouse entering the content area ---
//   const handleContentMouseEnter = () => {
//     if (isAutoAdvancing) {
//       setIsHoverPaused(true); // Set pause flag
//       if (timerRef.current) {
//         clearTimeout(timerRef.current); // Clear the advance timer
//         // console.log("Auto-advance paused on hover");
//       }
//     }
//   };

//   // --- NEW: Handle mouse leaving the content area ---
//   const handleContentMouseLeave = () => {
//     if (isAutoAdvancing) {
//       setIsHoverPaused(false); // Unset pause flag
//       // The useEffect will now detect isHoverPaused is false and restart the timer
//       // console.log("Auto-advance resuming on hover leave");
//     }
//   };

//   const currentStep = stepsData[activeIndex];

//   // Helper function to get block styling
//   const getBlockClasses = (type: ContentBlock["type"]) => {
//     switch (type) {
//       case "success":
//         return "bg-green-600/20 text-green-600";
//       case "default":
//       default:
//         return "bg-lightgray dark:bg-white/5 text-xs lg:text-base text-gray-500 dark:text-gray-300";
//     }
//   };

//   return (
//     <div className="py-10 bg-[#F2F4F7] dark:bg-background">
//       <section
//         className="flex flex-col justify-center container mx-auto px-4"
//         id="transfer-steps"
//       >
//         {/* Title Section */}
//         <article className="flex flex-col gap-5 mb-8 lg:mb-14">
//           <h1 className="text-4xl md:text-5xl xl:text-7xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
//             4 easy steps to
//             <span className="text-primary"> Transfer to India </span>
//           </h1>
//           {/* Optional: Button to toggle auto-advance for testing */}
//           {/* <button onClick={() => setIsAutoAdvancing(prev => !prev)} className="p-2 bg-blue-500 text-white rounded">
//                         {isAutoAdvancing ? "Pause Auto Advance" : "Resume Auto Advance"}
//                     </button> */}
//         </article>

//         {/* Steps and Content Section */}
//         <article className="grid gap-8 lg:grid-cols-3 lg:gap-8">
//           {/* Steps List (Left Side) */}
//           <div className="w-full h-full">
//             <div className="rounded-3xl bg-white dark:bg-white/5 lg:p-8 p-6 h-full">
//               <ul className="lg:flex md:grid md:grid-cols-2 grid-cols-1 flex-col space-y-6 justify-between h-full gap-8">
//                 {stepsData.map((step, index) => {
//                   const isActive = activeIndex === index;
//                   const isCurrentlyAnimating = isActive && isAnimating;
//                   return (
//                     <li
//                       key={step.id}
//                       className={`relative shrink-0 lg:shrink ${
//                         index === stepsData.length - 1 ? "" : ""
//                       }`}
//                     >
//                       <button
//                         onClick={() => handleStepClick(index)}
//                         className="z-10 flex flex-col lg:flex-row cursor-pointer items-center lg:items-start gap-2 lg:gap-5 bg-transparent w-full text-left group focus:outline-none rounded-lg" // Added focus styles
//                         aria-current={isActive ? "step" : undefined}
//                       >
//                         {/* Icon SVG Container */}
//                         <div className="relative">
//                           <svg
//                             viewBox="0 0 54 54"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className={`transition-colors duration-300 lg:size-18 md:size-14 size-10 ${
//                               isActive
//                                 ? "text-mainheading dark:text-primary"
//                                 : "text-[#97A2B3] dark:text-gray-500"
//                             }`}
//                           >
//                             {/* Base Rect */}
//                             <rect
//                               x="1"
//                               y="1"
//                               width="52"
//                               height="52"
//                               rx="12"
//                               className={`transition-colors duration-300 stroke-[#EAECF0] dark:stroke-gray-500`}
//                               strokeWidth="2"
//                               // Updated fill logic for dark mode active state
//                               fill={
//                                 isActive
//                                   ? "transparent dark:transparent"
//                                   : "transparent"
//                               }
//                             />
//                             {/* Icon Image */}
//                             <foreignObject x="15" y="15" width="24" height="24">
//                               {isActive ? (
//                                 <step.iconActive
//                                   className={`h-6 w-6 ${
//                                     isActive
//                                       ? "text-mainheading dark:text-primary"
//                                       : "text-[#97A2B3] dark:text-gray-500"
//                                   }`}
//                                 />
//                               ) : (
//                                 <step.iconDefault
//                                   className={`h-6 w-6 ${
//                                     isActive
//                                       ? "text-mainheading dark:text-primary"
//                                       : "text-[#97A2B3] dark:text-gray-500"
//                                   }`}
//                                 />
//                               )}
//                             </foreignObject>

//                             {/* Animated Border Path */}
//                             <path
//                               // Corrected path data for rounded rect perimeter
//                               d="M 27,1 H 41 C 47.6274,1 53,6.37258 53,13 V 41 C 53,47.6274 47.6274,53 41,53 H 13 C 6.37258,53 1,47.6274 1,41 V 13 C 1,6.37258 6.37258,1 13,1 H 27 Z"
//                               stroke={isActive ? "currentColor" : "none"} // Use text color for border
//                               strokeWidth="2"
//                               fill="none"
//                               strokeDasharray="208" // Approximate perimeter length
//                               strokeDashoffset="208"
//                               className={
//                                 isCurrentlyAnimating
//                                   ? "animate-border-draw"
//                                   : isActive
//                                   ? "border-path-static" // Keep border fully drawn when active but not animating
//                                   : "border-path-reset" // Fully hidden when not active
//                               }
//                             />
//                           </svg>
//                         </div>

//                         {/* Text Content */}
//                         <div className="flex flex-col items-center lg:items-start gap-1 mt-2 lg:mt-0">
//                           <h3
//                             className={`text-center lg:text-left capitalize text-base font-bold leading-tight transition-colors duration-300 lg:text-xl ${
//                               isActive
//                                 ? "text-[#182230] dark:text-white"
//                                 : "text-[#97A2B3] dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
//                             }`}
//                           >
//                             {step.title}
//                           </h3>
//                           <p
//                             className={`text-center lg:text-left text-sm font-normal transition-colors duration-300 lg:text-lg ${
//                               isActive
//                                 ? "text-gray-500 dark:text-gray-300"
//                                 : "text-[#97A2B3] dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-400"
//                             }`}
//                           >
//                             {step.subtitle}
//                           </p>
//                         </div>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>

//           {/* Content Area (Right Side) */}
//           {/* --- ADDED HOVER HANDLERS --- */}
//           <div
//             className="relative flex lg:col-span-2 lg:block lg:self-stretch h-[500px] md:h-[550px] lg:h-[600px] min-h-[500px] md:min-h-[550px] lg:min-h-[600px]"
//             onMouseEnter={handleContentMouseEnter}
//             onMouseLeave={handleContentMouseLeave}
//           >
//             <div
//               key={activeIndex} // Trigger animation on content change
//               className="absolute inset-0 flex flex-col rounded-3xl bg-white dark:bg-white/5 lg:p-8 p-6 animate-in fade-in duration-700 overflow-hidden"
//             >
//               {/* Top Text Content */}
//               <div className="space-y-2 animate-in slide-in-from-top-5 duration-500 z-10 mb-4 lg:mb-8">
//                 <h3 className="text-xl lg:text-3xl font-medium text-mainheading dark:text-white">
//                   {currentStep.contentTitle}
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-300 lg:text-base text-xs leading-relaxed">
//                   {currentStep.contentSubtitle}
//                 </p>
//               </div>

//               {/* Content Blocks (Steps 2 & 4) */}
//               {currentStep.contentBlocks && (
//                 <div className="flex flex-col items-start lg:items-end gap-3 mb-4 text-nowrap lg:mb-0 lg:absolute lg:top-10 lg:right-10 z-10 animate-in fade-in slide-in-from-right-5 duration-500 delay-100">
//                   {currentStep.contentBlocks.map((block, blockIndex) => (
//                     <div
//                       key={blockIndex}
//                       className={`px-4 lg:py-3 py-2 rounded-full font-medium ${getBlockClasses(
//                         block.type
//                       )}`}
//                     >
//                       {block.text}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Images Container */}
//               <div className="relative flex-grow flex items-end justify-center lg:justify-start mt-auto">
//                 {/* Image 1 */}
//                 <div
//                   className={`relative ${
//                     currentStep.contentImage2
//                       ? "w-1/2 lg:w-auto lg:absolute lg:bottom-0 lg:left-5"
//                       : "mx-auto lg:mx-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2"
//                   } animate-in slide-in-from-bottom-10 duration-700 delay-100`}
//                 >
//                   <Image
//                     src={currentStep.contentImage1}
//                     alt={`${currentStep.title} illustration 1`}
//                     width={currentStep.contentImage2 ? 280 : 320}
//                     height={currentStep.contentImage2 ? 500 : 550}
//                     style={{
//                       width: "auto",
//                       height: "auto",
//                       maxHeight: currentStep.contentImage2 ? "450px" : "500px",
//                       maxWidth: "100%",
//                     }}
//                     priority={activeIndex === 0}
//                     className="object-contain" // Changed to contain for better fitting potentially
//                   />
//                 </div>

//                 {/* Image 2 (Conditional) */}
//                 {currentStep.contentImage2 && (
//                   <div className="relative w-1/2 lg:w-auto lg:absolute lg:bottom-0 lg:right-5 animate-in slide-in-from-bottom-10 duration-700 delay-200">
//                     <Image
//                       src={currentStep.contentImage2}
//                       alt={`${currentStep.title} illustration 2`}
//                       width={280}
//                       height={500}
//                       style={{
//                         width: "auto",
//                         height: "auto",
//                         maxHeight: "350px",
//                         maxWidth: "100%",
//                       }}
//                       // Priority only for first step's images
//                       priority={activeIndex === 0}
//                       className="object-contain" // Changed to contain
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default TransferSteps;

// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";

// interface ContentBlock {
//   text: string;
//   type?: "default" | "success";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImage1: string;
//   contentImage2?: string;
//   contentBlocks?: ContentBlock[];
// }

// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Identify",
//     contentSubtitle: (
//       <>
//         Register with your email and phone number. <br />
//         Identify yourself with our inbuilt KYC process
//       </>
//     ),
//     contentImage1: "/assets/images/reg.997f6e4c2.svg",
//     contentImage2: "/assets/images/reg-654534534521.svg",
//     contentBlocks: [
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Digital Wallet With Passkey",
//     contentSubtitle: "Our passkey security feature safeguards your money",
//     contentImage1: "/assets/images/wallet.6868768671.svg",
//     contentBlocks: [
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle: "Add the accounts of people you'd like to send to",
//     contentImage1: "/assets/images/rec-1.27d0b92a.svg",
//     contentImage2: "/assets/images/rec-2.e0ece37b.svg",
//     contentBlocks: [
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money",
//     contentSubtitle: (
//       <>
//         Send Euros to our bank account. <br />
//         We transfer money to the recipient on your approval
//       </>
//     ),
//     contentImage1: "/assets/images/trf-1.7a2bc647.svg",
//     contentBlocks: [
//       { text: "Approve your transaction", type: "default" },
//       { text: "ScopeX will verify your transfer soon", type: "default" },
//       { text: "Transfer Completed", type: "success" },
//     ],
//   },
// ];

// const AUTO_ADVANCE_DELAY = 3200;
// const BORDER_ANIMATION_DURATION = 3200;

// const TransferSteps: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
//   const [isAnimating, setIsAnimating] = useState(true);
//   const [isContentHovered, setIsContentHovered] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const advanceStep = useCallback(() => {
//     setActiveIndex((prevIndex) => {
//       const nextIndex = (prevIndex + 1) % stepsData.length;
//       setIsAnimating(true);
//       if (animationTimeoutRef.current)
//         clearTimeout(animationTimeoutRef.current);
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimating(false);
//       }, BORDER_ANIMATION_DURATION);
//       return nextIndex;
//     });
//   }, []);

//   useEffect(() => {
//     if (isAutoAdvancing && !isContentHovered) {
//       if (timerRef.current) clearTimeout(timerRef.current);

//       if (isAnimating) {
//         if (animationTimeoutRef.current)
//           clearTimeout(animationTimeoutRef.current);
//         animationTimeoutRef.current = setTimeout(() => {
//           setIsAnimating(false);
//         }, BORDER_ANIMATION_DURATION);
//       }

//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);

//       return () => {
//         if (timerRef.current) clearTimeout(timerRef.current);
//         if (animationTimeoutRef.current)
//           clearTimeout(animationTimeoutRef.current);
//       };
//     } else {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     }
//   }, [
//     activeIndex,
//     isAutoAdvancing,
//     advanceStep,
//     isAnimating,
//     isContentHovered,
//   ]);

//   const handleStepClick = (index: number) => {
//     setIsAutoAdvancing(true);
//     setIsContentHovered(false);
//     if (timerRef.current) clearTimeout(timerRef.current);
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

//     setActiveIndex(index);
//     setIsAnimating(true);
//     animationTimeoutRef.current = setTimeout(() => {
//       setIsAnimating(false);
//     }, BORDER_ANIMATION_DURATION);
//   };

//   const currentStep = stepsData[activeIndex];

//   const getBlockClasses = (type: ContentBlock["type"]) => {
//     switch (type) {
//       case "success":
//         return "bg-green-600/20 text-green-600";
//       case "default":
//       default:
//         return "bg-lightgray dark:bg-white/5 text-xs lg:text-base text-gray-500 dark:text-gray-300";
//     }
//   };

//   return (
//     <div className="py-10 bg-white dark:bg-background">
//       <section
//         className="flex flex-col justify-center container mx-auto px-4"
//         id="transfer-steps"
//       >
//         <article className="flex flex-col gap-5 mb-8 lg:mb-14">
//           <h1 className="text-4xl md:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
//             4 easy steps to
//             <span className="text-primary"> Transfer to India </span>
//           </h1>
//         </article>

//         <article className="grid gap-8 lg:grid-cols-3 lg:gap-8">

//           {/* leftside Tabs */}
//           <div className="w-full h-full">
//             <div className="rounded-3xl bg-white dark:bg-white/5 lg:p-8 p-6 h-full border shadow-md">
//               <ul className="lg:flex md:grid md:grid-cols-2 grid-cols-1 flex-col space-y-6 justify-between h-full gap-8">
//                 {stepsData.map((step, index) => {
//                   const isActive = activeIndex === index;
//                   const isCurrentlyAnimating = isActive && isAnimating;
//                   return (
//                     <li
//                       key={step.id}
//                       className={`relative shrink-0 lg:shrink ${
//                         index === stepsData.length - 1 ? "" : ""
//                       }`}
//                     >
//                       <button
//                         onClick={() => handleStepClick(index)}
//                         className="z-10 flex flex-col lg:flex-row cursor-pointer items-center lg:items-start gap-2 lg:gap-5 bg-transparent w-full text-left group focus:outline-none rounded-lg"
//                         aria-current={isActive ? "step" : undefined}
//                       >
//                         <div className="relative">
//                           <svg
//                             viewBox="0 0 54 54"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className={`transition-colors duration-300 lg:size-18 md:size-14 size-10 ${
//                               isActive
//                                 ? "text-mainheading dark:text-primary"
//                                 : "text-[#97A2B3] dark:text-gray-500"
//                             }`}
//                           >
//                             <rect
//                               x="1"
//                               y="1"
//                               width="52"
//                               height="52"
//                               rx="12"
//                               className={`transition-colors duration-300 stroke-[#EAECF0] dark:stroke-gray-500`}
//                               strokeWidth="2"
//                               fill={isActive ? "dark:stroke-black" : ""}
//                             />
//                             <foreignObject x="15" y="15" width="24" height="24">
//                               {isActive ? (
//                                 <step.iconActive
//                                   className={`h-6 w-6 ${
//                                     isActive
//                                       ? "text-mainheading dark:text-primary"
//                                       : "text-[#97A2B3] dark:text-gray-500"
//                                   }`}
//                                 />
//                               ) : (
//                                 <step.iconDefault
//                                   className={`h-6 w-6 ${
//                                     isActive
//                                       ? "text-mainheading dark:text-primary"
//                                       : "text-[#97A2B3] dark:text-gray-500"
//                                   }`}
//                                 />
//                               )}
//                             </foreignObject>

//                             <path
//                               d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                               stroke={isActive ? "currentColor" : "none"}
//                               strokeWidth="2"
//                               fill="none"
//                               strokeDasharray="208"
//                               strokeDashoffset="208"
//                               className={
//                                 isCurrentlyAnimating
//                                   ? "animate-border-draw"
//                                   : isActive
//                                   ? "border-path-static"
//                                   : "border-path-reset"
//                               }
//                             />
//                           </svg>
//                         </div>

//                         <div className="flex flex-col items-center lg:items-start gap-1 mt-2">
//                           <h3
//                             className={`text-center lg:text-left capitalize text-base font-medium leading-tight transition-colors duration-300 lg:text-xl ${
//                               isActive
//                                 ? "text-[#182230] dark:text-white"
//                                 : "text-[#97A2B3] dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
//                             }`}
//                           >
//                             {step.title}
//                           </h3>
//                           <p
//                             className={`text-center lg:text-left text-sm font-normal transition-colors duration-300 lg:text-lg ${
//                               isActive
//                                 ? "text-gray-500 dark:text-gray-300"
//                                 : "text-[#97A2B3] dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-400"
//                             }`}
//                           >
//                             {step.subtitle}
//                           </p>
//                         </div>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>

//           {/* RightSide Tab Content */}
//           <div
//             className="relative flex lg:col-span-2 lg:block lg:self-stretch h-[500px] md:h-[550px] lg:h-[600px] min-h-[500px] md:min-h-[550px] lg:min-h-[600px]"
//             onMouseEnter={() => {
//               setIsContentHovered(true);
//               setIsAutoAdvancing(false);
//             }}
//             onMouseLeave={() => {
//               setIsContentHovered(false);
//               setIsAutoAdvancing(true);
//             }}
//           >
//             <div
//               key={activeIndex}
//               className="absolute inset-0 flex flex-col border shadow-md rounded-2xl bg-white dark:bg-white/5 lg:p-8 p-6 animate-in fade-in duration-700 overflow-hidden"
//             >
//               <div className="space-y-2 animate-in slide-in-from-top-5 duration-500 z-10 mb-4 lg:mb-8">
//                 <h3 className="text-xl lg:text-3xl font-normal text-mainheading dark:text-white">
//                   {currentStep.contentTitle}
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-300 lg:text-base text-xs leading-relaxed">
//                   {currentStep.contentSubtitle}
//                 </p>
//               </div>

//               {currentStep.contentBlocks && (
//                 <div className="flex flex-col items-start lg:items-end gap-3 mb-4 text-nowrap lg:mb-0 lg:absolute lg:top-10 lg:right-10 z-10 animate-in fade-in slide-in-from-right-5 duration-500 delay-100">
//                   {currentStep.contentBlocks.map((block, blockIndex) => (
//                     <div
//                       key={blockIndex}
//                       className={`px-4 lg:py-3 py-2 rounded-full ${getBlockClasses(
//                         block.type
//                       )}`}
//                     >
//                       {block.text}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="relative flex-grow flex items-end justify-center lg:justify-start mt-auto">
//                 <div
//                   className={`relative ${
//                     currentStep.contentImage2
//                       ? "w-1/2 lg:w-auto lg:absolute lg:bottom-0 lg:left-5"
//                       : "mx-auto lg:mx-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2"
//                   } animate-in slide-in-from-bottom-10 duration-700 delay-100`}
//                 >
//                   <Image
//                     src={currentStep.contentImage1}
//                     alt={`${currentStep.title} illustration 1`}
//                     width={currentStep.contentImage2 ? 280 : 320}
//                     height={currentStep.contentImage2 ? 500 : 550}
//                     style={{
//                       width: "auto",
//                       height: "auto",
//                       maxHeight: currentStep.contentImage2 ? "450px" : "500px",
//                       maxWidth: "100%",
//                     }}
//                     priority={activeIndex === 0}
//                     className="object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default TransferSteps;

// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";

// interface ContentBlock {
//   text: string;
//   type?: "default" | "success";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImage1: string;
//   // contentImage2 is kept in data structure but won't be explicitly rendered in the new layout
//   contentImage2?: string;
//   contentBlocks?: ContentBlock[];
// }

// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Identify",
//     contentSubtitle: (
//       <>
//         Register with your email and phone number. <br />
//         Identify yourself with our inbuilt KYC process
//       </>
//     ),
//     // Assuming this is the phone image shown in the example
//     contentImage1: "/assets/images/wallet.6868768671.svg",
//     contentBlocks: [
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Digital Wallet With Passkey",
//     contentSubtitle: "Our passkey security feature safeguards your money",
//     contentImage1: "/assets/images/wallet.6868768671.svg",
//     contentBlocks: [
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle: "Add the accounts of people you'd like to send to money now's",
//     contentImage1: "/assets/images/wallet.6868768671.svg",
//     contentBlocks: [
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money",
//     contentSubtitle: (
//       <>
//         Send Euros to our bank account. <br />
//         We transfer money to the recipient on your approval
//       </>
//     ),
//     contentImage1: "/assets/images/wallet.6868768671.svg",
//     contentBlocks: [
//       { text: "Approve your transaction", type: "default" },
//       { text: "ScopeX will verify your transfer soon", type: "default" },
//       { text: "Transfer Completed", type: "success" },
//     ],
//   },
// ];

// const AUTO_ADVANCE_DELAY = 3200;
// const BORDER_ANIMATION_DURATION = 3200;

// const TransferSteps: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
//   const [isAnimating, setIsAnimating] = useState(true);
//   const [isContentHovered, setIsContentHovered] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const advanceStep = useCallback(() => {
//     setActiveIndex((prevIndex) => {
//       const nextIndex = (prevIndex + 1) % stepsData.length;
//       setIsAnimating(true);
//       if (animationTimeoutRef.current)
//         clearTimeout(animationTimeoutRef.current);
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimating(false);
//       }, BORDER_ANIMATION_DURATION);
//       return nextIndex;
//     });
//   }, []);

//   useEffect(() => {
//     if (isAutoAdvancing && !isContentHovered) {
//       if (timerRef.current) clearTimeout(timerRef.current);

//       setIsAnimating(true);
//       if (animationTimeoutRef.current)
//         clearTimeout(animationTimeoutRef.current);
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimating(false);
//       }, BORDER_ANIMATION_DURATION);

//       // Set timer for the next step advance
//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);

//       return () => {
//         if (timerRef.current) clearTimeout(timerRef.current);
//         if (animationTimeoutRef.current)
//           clearTimeout(animationTimeoutRef.current);
//       };
//     } else {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       // Optionally keep the border animation running even when hovered/paused
//       if (!isAnimating && activeIndex >= 0) {
//         // Check activeIndex >= 0 for safety
//         setIsAnimating(true);
//         animationTimeoutRef.current = setTimeout(() => {
//           setIsAnimating(false);
//         }, BORDER_ANIMATION_DURATION);
//       }
//     }
//   }, [
//     activeIndex,
//     isAutoAdvancing,
//     advanceStep,
//     isContentHovered,
//     // isAnimating // remove isAnimating dependency to prevent loop issues
//   ]);

//   const handleStepClick = (index: number) => {
//     setIsAutoAdvancing(true); // Or false if you want it to pause on manual click
//     setIsContentHovered(false); // Reset hover state
//     if (timerRef.current) clearTimeout(timerRef.current);
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

//     setActiveIndex(index);
//     setIsAnimating(true); // Start animation for the clicked step
//     animationTimeoutRef.current = setTimeout(() => {
//       setIsAnimating(false);
//     }, BORDER_ANIMATION_DURATION);

//     // Restart auto-advance timer immediately after click if isAutoAdvancing is true
//     if (isAutoAdvancing) {
//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);
//     }
//   };

//   const currentStep = stepsData[activeIndex];

//   const getBlockClasses = (type: ContentBlock["type"]) => {
//     switch (type) {
//       case "success":
//         return "bg-green-600/20 text-green-600";
//       case "default":
//       default:
//         // Adjusted padding and potentially text size for better fit
//         return "bg-lightgray dark:bg-white/5 text-xs lg:text-sm text-gray-500 dark:text-gray-300";
//     }
//   };

//   return (
//     <div className="py-10 bg-white dark:bg-background">
//       <section
//         className="flex flex-col justify-center container mx-auto px-4"
//         id="transfer-steps"
//       >
//         <article className="flex flex-col gap-5 mb-8 lg:mb-14">
//           <h1 className="text-4xl md:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
//             4 easy steps to
//             <span className="text-primary"> Transfer to India </span>
//           </h1>
//         </article>

//         <article className="grid gap-8 lg:grid-cols-3 lg:gap-8">
//           {/* leftside Tabs */}
//           <div className="w-full h-full">
//             <div className="rounded-3xl bg-white dark:bg-white/5 lg:p-8 p-6 h-full border dark:border-none">
//               {/* Adjusted grid layout for medium screens and spacing */}
//               <ul className="lg:flex md:grid md:grid-cols-2 lg:grid-cols-1  grid-cols-1 lg:flex-col space-y-6 justify-between h-full gap-6">
//                 {stepsData.map((step, index) => {
//                   const isActive = activeIndex === index;
//                   const isCurrentlyAnimating = isActive && isAnimating;
//                   return (
//                     <li
//                       key={step.id}
//                       // Removed shrink classes, adjusted layout handle sizing
//                       className={`relative shrink-0 lg:shrink ${
//                         index === stepsData.length - 1 ? "" : ""
//                       }`}
//                     >
//                       <button
//                         onClick={() => handleStepClick(index)}
//                         // Adjusted alignment and gap for consistency
//                         className="z-10 flex flex-col lg:flex-row cursor-pointer items-center lg:items-start lg:gap-5 bg-transparent w-full text-left group focus:outline-none rounded-lg"
//                         aria-current={isActive ? "step" : undefined}
//                       >
//                         <div className="relative flex-shrink-0">
//
//                           {/* Added flex-shrink-0 */}
//                           <svg
//                             viewBox="0 0 54 54"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className={`transition-colors duration-300 lg:size-18 md:size-14 size-12 ${
//                               // Slightly adjusted size
//                               isActive
//                                 ? "text-mainheading dark:text-primary"
//                                 : "text-[#97A2B3] dark:text-gray-500"
//                             }`}
//                           >
//                             <rect
//                               x="1"
//                               y="1"
//                               width="52"
//                               height="52"
//                               rx="12"
//                               className={`transition-colors duration-300 stroke-[#EAECF0] dark:stroke-gray-500`}
//                               strokeWidth="2"
//                               fill={isActive ? "dark:stroke-black" : ""}
//                             />

//                             {/* Centered icon using foreignObject */}
//                             <foreignObject x="15" y="15" width="24" height="24">
//                               <div className="flex items-center justify-center h-full w-full">
//                                 {isActive ? (
//                                   <step.iconActive
//                                     className={`h-6 w-6 ${
//                                       isActive
//                                         ? "text-mainheading dark:text-primary"
//                                         : "text-[#97A2B3] dark:text-gray-500"
//                                     }`}
//                                   />
//                                 ) : (
//                                   <step.iconDefault
//                                     className={`h-6 w-6 ${
//                                       isActive
//                                         ? "text-mainheading dark:text-primary"
//                                         : "text-[#97A2B3] dark:text-gray-500"
//                                     }`}
//                                   />
//                                 )}
//                               </div>
//                             </foreignObject>

//                             {/* Border Animation Path */}
//                             <path
//                               d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                               stroke={isActive ? "currentColor" : "none"}
//                               strokeWidth="2"
//                               fill="none"
//                               strokeDasharray="208" // Circumference estimate
//                               strokeDashoffset="208"
//                               className={
//                                 isCurrentlyAnimating
//                                   ? "animate-border-draw"
//                                   : isActive
//                                   ? "border-path-static" // Static state when active but not animating
//                                   : "border-path-reset" // Reset state when inactive
//                               }
//                               style={{
//                                 animationDuration: `${BORDER_ANIMATION_DURATION}ms`,
//                               }} // Link duration to constant
//                             />
//                           </svg>
//                         </div>

//                         {/* Text Content - Centered on small screens, left-aligned on larger */}
//                         <div className="flex flex-col items-center lg:items-start gap-1 mt-2.5">
//                           <h3
//                             className={`text-center lg:text-left capitalize text-base font-medium leading-tight transition-colors duration-300 lg:text-xl ${
//                               isActive
//                                 ? "text-[#182230] dark:text-white"
//                                 : "text-[#97A2B3] dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
//                             }`}
//                           >
//                             {step.title}
//                           </h3>
//                           <p
//                             className={`text-center lg:text-left text-sm font-normal transition-colors duration-300 lg:text-lg ${
//                               isActive
//                                 ? "text-gray-500 dark:text-gray-300"
//                                 : "text-[#97A2B3] dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-400"
//                             }`}
//                           >
//                             {step.subtitle}
//                           </p>
//                         </div>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>

//           {/* RightSide Tab Content - Modified Layout */}
//           <div
//             className="relative flex lg:col-span-2 lg:block lg:self-stretch h-[500px] md:h-[550px] lg:h-[600px] min-h-[500px] md:min-h-[550px] lg:min-h-[600px]"
//             onMouseEnter={() => {
//               setIsContentHovered(true);
//               setIsAutoAdvancing(false); // Pause auto-advance on hover
//             }}
//             onMouseLeave={() => {
//               setIsContentHovered(false);
//               setIsAutoAdvancing(true); // Resume auto-advance on leave
//             }}
//           >
//             {/* Keyed div ensures re-render on activeIndex change, applying animations */}
//             <div
//               key={activeIndex}
//               className="absolute inset-0 flex flex-col border  dark:border-none rounded-2xl bg-white dark:bg-white/5  p-6 animate-in fade-in duration-700 overflow-hidden"
//             >
//               {/* New Flex container for 50/50 split on large screens */}
//               <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-8">
//                 {/* Left Side (50% Width on LG screens) */}
//                 <div className="lg:w-1/2 flex flex-col animate-in slide-in-from-left-5 duration-500">
//                   {/* Text Content Area */}
//                   <div className="space-y-2 mb-4 lg:mb-6">
//                     <h3 className="text-xl lg:text-3xl font-normal text-mainheading dark:text-white">
//                       {currentStep.contentTitle}
//                     </h3>
//                     <p className="text-gray-700 dark:text-gray-300 lg:text-base text-sm leading-relaxed">
//                       {" "}
//                       {/* Adjusted text size */}
//                       {currentStep.contentSubtitle}
//                     </p>
//                   </div>

//                   {/* Image Area - Placed below text */}
//                   <div className="relative flex-grow flex items-center justify-center mt-5">
//                     {/* Adjusted image sizing and positioning */}
//                     <Image
//                       src={currentStep.contentImage1}
//                       alt={`${currentStep.title} illustration`}
//                       width={500} // Base width, adjust as needed
//                       height={550} // Base height, adjust as needed
//                       style={{
//                         width: "auto", // Maintain aspect ratio
//                         height: "auto", // Maintain aspect ratio
//                         maxHeight: "500px", // Max height constraint
//                         maxWidth: "100%", // Ensure it doesn't overflow container
//                       }}
//                       priority={activeIndex === 0} // Prioritize first image load
//                       className="object-cover" // Use contain to prevent cropping
//                     />
//                   </div>
//                 </div>

//                 {/* Right Side (50% Width on LG screens) */}
//                 <div className="lg:w-1/2 flex flex-col items-center lg:items-end justify-center lg:justify-start lg:pt-4 animate-in slide-in-from-right-5 duration-500 delay-100">
//                   {/* Content Blocks Area */}
//                   {currentStep.contentBlocks && (
//                     <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
//                       {currentStep.contentBlocks.map((block, blockIndex) => (
//                         <div
//                           key={blockIndex}
//                           // Adjusted padding for better fit
//                           className={`px-4 py-2 lg:py-2.5 rounded-full text-nowrap ${getBlockClasses(
//                             block.type
//                           )}`}
//                         >
//                           {block.text}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default TransferSteps;

// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

// // --- Interface definitions (keep as they are) ---
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImage1: string;
//   contentImage2?: string; // Kept for data structure consistency
//   contentBlocks?: ContentBlock[];
// }

// // --- stepsData (keep as it is, but ensure image paths are correct) ---
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Identify",
//     contentSubtitle: (
//       <>
//         Register with your email and phone number. <br />
//         Identify yourself with our inbuilt KYC process
//       </>
//     ),
//     contentImage1: "/assets/images/wallet.6868768671.svg", // Example: Changed path for clarity
//     contentBlocks: [
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Digital Wallet With Passkey",
//     contentSubtitle: "Our passkey security feature safeguards your money",
//     contentImage1: "/assets/images/wallet.6868768671.svg", // Example: Use same image or different ones
//     contentBlocks: [
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle:
//       "Add the accounts of people you'd like to send to money now's",
//     contentImage1: "/assets/images/wallet.6868768671.svg", // Example
//     contentBlocks: [
//       { text: "Passkeys : Robust alternative to passwords", type: "default" },
//       { text: "Prevents phishing and password hacks", type: "default" },
//       { text: "Protect your wallet with passkey", type: "default" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money",
//     contentSubtitle: (
//       <>
//         Send Euros to our bank account. <br />
//         We transfer money to the recipient on your approval
//       </>
//     ),
//     contentImage1: "/assets/images/wallet.6868768671.svg", // Example
//     contentBlocks: [
//       { text: "Approve your transaction", type: "default" },
//       { text: "ScopeX will verify your transfer soon", type: "default" },
//       { text: "Transfer Completed", type: "success" },
//     ],
//   },
// ];

// const AUTO_ADVANCE_DELAY = 3200;
// const BORDER_ANIMATION_DURATION = 3200;

// // --- Framer Motion Variants ---
// const panelVariants = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1, transition: { duration: 0.5 } },
//   exit: { opacity: 0, transition: { duration: 0.3 } },
// };

// const leftContentVariants = {
//   initial: { opacity: 0, x: "-50%" },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     x: "-30%", // Slightly less distance on exit
//     transition: { duration: 0.3, ease: "easeIn" },
//   },
// };

// const rightContentVariants = {
//   initial: { opacity: 0, x: "50%" },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.6, ease: "easeOut", delay: 0.1 }, // Slight delay
//   },
//   exit: {
//     opacity: 0,
//     x: "30%",
//     transition: { duration: 0.3, ease: "easeIn" },
//   },
// };

// const blockContainerVariants = {
//   initial: {}, // No initial animation needed for the container itself
//   animate: {
//     transition: {
//       staggerChildren: 0.1, // Stagger animation of children
//       delayChildren: 0.3, // Delay start after parent animates in
//     },
//   },
//   exit: {}, // No specific exit animation for the container needed here
// };

// const blockItemVariants = {
//   initial: { opacity: 0, x: 30 }, // Start from right and faded out
//   animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
//   exit: { opacity: 0, x: 30, transition: { duration: 0.2, ease: "easeIn" } }, // Fade out and move right
// };
// // --- Component ---
// const TransferSteps: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
//   const [isAnimating, setIsAnimating] = useState(true);
//   const [isContentHovered, setIsContentHovered] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // --- advanceStep, useEffect, handleStepClick (largely unchanged) ---
//   const advanceStep = useCallback(() => {
//     setActiveIndex((prevIndex) => {
//       const nextIndex = (prevIndex + 1) % stepsData.length;
//       // Reset border animation state for the *next* step
//       setIsAnimating(true);
//       if (animationTimeoutRef.current)
//         clearTimeout(animationTimeoutRef.current);
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimating(false);
//       }, BORDER_ANIMATION_DURATION);
//       return nextIndex;
//     });
//   }, []);

//   useEffect(() => {
//     // Start border animation immediately for the initial step
//     setIsAnimating(true);
//     animationTimeoutRef.current = setTimeout(() => {
//       setIsAnimating(false);
//     }, BORDER_ANIMATION_DURATION);

//     if (isAutoAdvancing && !isContentHovered) {
//       if (timerRef.current) clearTimeout(timerRef.current);

//       // Set timer for the next step advance
//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);

//       return () => {
//         if (timerRef.current) clearTimeout(timerRef.current);
//         if (animationTimeoutRef.current)
//           clearTimeout(animationTimeoutRef.current);
//       };
//     } else {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       // Keep border animation running if paused? Optional.
//       // If you want the border to *pause* its animation when hovered:
//       // if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
//       // setIsAnimating(false);
//     }
//   }, [activeIndex, isAutoAdvancing, advanceStep, isContentHovered]); // Removed isAnimating dependency

//   const handleStepClick = (index: number) => {
//     setIsAutoAdvancing(true); // Resume auto-advance on click
//     setIsContentHovered(false);
//     if (timerRef.current) clearTimeout(timerRef.current);
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

//     setActiveIndex(index);
//     setIsAnimating(true); // Start border animation for the clicked step
//     animationTimeoutRef.current = setTimeout(() => {
//       setIsAnimating(false);
//     }, BORDER_ANIMATION_DURATION);

//     // Restart auto-advance timer if enabled
//     if (isAutoAdvancing) {
//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);
//     }
//   };
//   // --- End of hooks and handlers ---

//   const currentStep = stepsData[activeIndex];

//   const getBlockClasses = (type: ContentBlock["type"]) => {
//     switch (type) {
//       case "success":
//         return "bg-green-600/20 text-green-600";
//       case "default":
//       default:
//         return "bg-lightgray dark:bg-white/5 text-xs lg:text-sm text-gray-500 dark:text-gray-300";
//     }
//   };

//   return (
//     <div className="py-10 bg-white dark:bg-background">
//       <section
//         className="flex flex-col justify-center container mx-auto px-4"
//         id="transfer-steps"
//       >
//         {/* --- Header (unchanged) --- */}
//         <article className="flex flex-col gap-5 mb-8 lg:mb-14">
//           <h1 className="text-4xl md:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
//             4 easy steps to
//             <span className="text-primary"> Transfer to India </span>
//           </h1>
//         </article>

//         <article className="grid gap-8 lg:grid-cols-3 lg:gap-8">
//           {/* --- Leftside Tabs (unchanged structure, logic for border animation kept) --- */}
//           <div className="w-full h-full">
//             <div className="rounded-3xl bg-white dark:bg-white/5 lg:p-8 p-6 h-full border dark:border-none">
//               <ul className="lg:flex md:grid md:grid-cols-2 lg:grid-cols-1 grid-cols-1 lg:flex-col space-y-6 justify-between h-full gap-6">
//                 {stepsData.map((step, index) => {
//                   const isActive = activeIndex === index;
//                   const isCurrentlyAnimatingBorder = isActive && isAnimating; // Use the dedicated state for border animation
//                   return (
//                     <li
//                       key={step.id}
//                       className={`relative shrink-0 lg:shrink ${
//                         index === stepsData.length - 1 ? "" : ""
//                       }`}
//                     >
//                       <button
//                         onClick={() => handleStepClick(index)}
//                         className="z-10 flex flex-col lg:flex-row cursor-pointer items-center lg:items-start lg:gap-5 bg-transparent w-full text-left group focus:outline-none rounded-lg"
//                         aria-current={isActive ? "step" : undefined}
//                       >
//                         <div className="relative flex-shrink-0">
//                           <svg
//                             viewBox="0 0 54 54"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className={`transition-colors duration-300 lg:size-18 md:size-14 size-12 ${
//                               isActive
//                                 ? "text-mainheading dark:text-primary"
//                                 : "text-[#97A2B3] dark:text-gray-500"
//                             }`}
//                           >
//                             {/* Base rectangle */}
//                             <rect
//                               x="1"
//                               y="1"
//                               width="52"
//                               height="52"
//                               rx="12"
//                               className={`transition-colors duration-300 stroke-[#EAECF0] dark:stroke-gray-500`}
//                               strokeWidth="2"
//                               fill={
//                                 isActive ? "dark:bg-black/20" : "transparent"
//                               } // Optional fill change on active
//                             />

//                             {/* Icon */}
//                             <foreignObject x="15" y="15" width="24" height="24">
//                               <div className="flex items-center justify-center h-full w-full">
//                                 {React.createElement(
//                                   isActive ? step.iconActive : step.iconDefault,
//                                   {
//                                     className: `h-6 w-6 ${
//                                       isActive
//                                         ? "text-mainheading dark:text-primary"
//                                         : "text-[#97A2B3] dark:text-gray-500"
//                                     }`,
//                                   }
//                                 )}
//                               </div>
//                             </foreignObject>

//                             {/* Border Animation Path */}
//                             <path
//                               d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                               stroke={isActive ? "currentColor" : "none"}
//                               strokeWidth="2"
//                               fill="none"
//                               strokeDasharray="208"
//                               strokeDashoffset="208"
//                               className={
//                                 isCurrentlyAnimatingBorder // Use state specific to border animation
//                                   ? "animate-border-draw"
//                                   : isActive
//                                   ? "border-path-static"
//                                   : "border-path-reset"
//                               }
//                               style={{
//                                 animationDuration: `${BORDER_ANIMATION_DURATION}ms`,
//                               }}
//                             />
//                           </svg>
//                         </div>

//                         {/* Text Content */}
//                         <div className="flex flex-col items-center lg:items-start gap-1 mt-2.5">
//                           <h3
//                             className={`text-center lg:text-left capitalize text-base font-medium leading-tight transition-colors duration-300 lg:text-xl ${
//                               isActive
//                                 ? "text-[#182230] dark:text-white"
//                                 : "text-[#97A2B3] dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
//                             }`}
//                           >
//                             {step.title}
//                           </h3>
//                           <p
//                             className={`text-center lg:text-left text-sm font-normal transition-colors duration-300 lg:text-lg ${
//                               isActive
//                                 ? "text-gray-500 dark:text-gray-300"
//                                 : "text-[#97A2B3] dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-400"
//                             }`}
//                           >
//                             {step.subtitle}
//                           </p>
//                         </div>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>

//           {/* --- RightSide Tab Content - WITH FRAMER MOTION --- */}
//           <div
//             className="relative lg:col-span-2 h-[500px] md:h-[550px] lg:h-[600px] min-h-[500px] md:min-h-[550px] lg:min-h-[600px] overflow-hidden" // Added overflow-hidden here
//             onMouseEnter={() => {
//               setIsContentHovered(true);
//               setIsAutoAdvancing(false);
//             }}
//             onMouseLeave={() => {
//               setIsContentHovered(false);
//               setIsAutoAdvancing(true);
//             }}
//           >
//             {/* AnimatePresence handles enter/exit animations */}
//             <AnimatePresence mode="wait">
//               {/* Keyed motion.div ensures re-render and animation trigger on activeIndex change */}
//               <motion.div
//                 key={activeIndex} // Crucial for AnimatePresence to detect changes
//                 className="absolute inset-0 flex flex-col border dark:border-none rounded-2xl bg-white dark:bg-white/5 p-6"
//                 variants={panelVariants} // Apply overall panel fade
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 {/* Flex container for 50/50 split */}
//                 <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-8">
//                   {/* Left Side (50% Width on LG screens) - Animated */}
//                   <motion.div
//                     className="lg:w-1/2 flex flex-col"
//                     variants={leftContentVariants} // Apply slide from left
//                     // initial, animate, exit are inherited from parent AnimatePresence context
//                   >
//                     {/* Text Content Area */}
//                     <div className="space-y-2 mb-4 lg:mb-6">
//                       <h3 className="text-xl lg:text-3xl font-normal text-mainheading dark:text-white">
//                         {currentStep.contentTitle}
//                       </h3>
//                       <p className="text-gray-700 dark:text-gray-300 lg:text-base text-sm leading-relaxed">
//                         {currentStep.contentSubtitle}
//                       </p>
//                     </div>

//                     {/* Image Area */}
//                     <div className="relative flex-grow flex items-center justify-center mt-5">
//                       <Image
//                         src={currentStep.contentImage1}
//                         alt={`${currentStep.title} illustration`}
//                         width={500}
//                         height={550}
//                         style={{
//                           width: "auto",
//                           height: "auto",
//                           maxHeight: "500px",
//                           maxWidth: "100%",
//                         }}
//                         priority={activeIndex === 0}
//                         className="object-contain" // Changed to contain
//                       />
//                     </div>
//                   </motion.div>

//                   {/* Right Side (50% Width on LG screens) - Animated */}
//                   <motion.div
//                     className="lg:w-1/2 flex flex-col items-center lg:items-end justify-center lg:justify-start lg:pt-4"
//                     variants={rightContentVariants} // Apply slide from right
//                     // initial, animate, exit are inherited
//                   >
//                     {/* Content Blocks Area - Staggered Animation */}
//                     {currentStep.contentBlocks && (
//                       <motion.div
//                         className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto"
//                         variants={blockContainerVariants} // Apply stagger container variants
//                         initial="initial" // Explicitly set initial/animate for stagger parent
//                         animate="animate"
//                         exit="exit" // Add exit if container needs specific exit behavior
//                       >
//                         {currentStep.contentBlocks.map((block, blockIndex) => (
//                           <motion.div
//                             key={blockIndex}
//                             className={`px-4 py-2 lg:py-2.5 rounded-full text-nowrap ${getBlockClasses(
//                               block.type
//                             )}`}
//                             variants={blockItemVariants} // Apply item variants
//                             // initial, animate, exit are inherited from parent stagger context
//                           >
//                             {block.text}
//                           </motion.div>
//                         ))}
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default TransferSteps;

// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Interface definitions (keep as they are) ---
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success" | "warning" | "secondry";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImage1: string;
//   contentImage2?: string;
//   contentBlocks?: ContentBlock[];
// }

// // --- stepsData (ensure image paths are correct) ---
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Verify",
//     contentSubtitle: (
//       <>
//         Get started in minutes with a secure and simple sign-up process. We use
//         top-level identity verification to protect your account and ensure
//         compliance with international money transfer regulations.
//       </>
//     ),
//     contentImage1: "/assets/images/Register-and-verify-dark.png", // Replace with your actual image path
//     contentBlocks: [
//       { text: "Instant Account Setup", type: "success" },
//       { text: "Seamless KYC Verification", type: "secondry" },
//       { text: "Enhanced Security with Passkeys", type: "warning" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Your Digital Wallet with Passkey",
//     contentSubtitle:
//       "Set up your secure digital wallet in seconds. With integrated passkey protection, your funds and personal details are safeguarded from the start.",
//     contentImage1: "/assets/images/wallet.6868768671.svg", // Replace with your actual image path
//     contentBlocks: [
//       { text: "Passkeys: The Future of Security", type: "success" },
//       { text: "Defends Against Online Threats", type: "secondry" },
//       { text: "Peace of Mind, Always", type: "warning" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle:
//       "Easily link the bank accounts or digital wallets of the people you wish to send money to. Manage recipients securely and send funds with confidence.",
//     contentImage1: "/assets/images/wallet.6868768671.svg", // Replace with your actual image path
//     contentBlocks: [
//       { text: "Multiple Recipient Support", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "Quick Add Feature", type: "warning" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money Seamlessly",
//     contentSubtitle: "Complete your money transfer in just a few taps. Enjoy real-time processing, transparent fees, and secure delivery to your recipients in India.",
//     contentImage1: "/assets/images/wallet.6868768671.svg", // Replace with your actual image path
//     contentBlocks: [
//       { text: "Instant Transfers", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "24/7 Secure Transactions", type: "warning" },
//     ],
//   },
// ];

// const AUTO_ADVANCE_DELAY = 3200;
// const BORDER_ANIMATION_DURATION = 3200;

// // --- Animation Speed Adjustment ---
// const ANIMATION_DURATION_PANEL = 0.7; // Slower fade for the whole panel
// const ANIMATION_DURATION_CONTENT = 0.8; // Slower slide for content sections
// const ANIMATION_DURATION_IMAGE = 0.9; // Slower slide for image
// const ANIMATION_DURATION_BLOCK_ITEM = 0.5; // Block item speed
// const EXIT_DURATION_MULTIPLIER = 0.6; // Make exit slightly faster than entry

// const leftContentVariants = {
//   // This will now only apply to the text part of the left side
//   initial: { opacity: 0, x: "-50%" },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     x: "-30%",
//     transition: {
//       duration: ANIMATION_DURATION_CONTENT * EXIT_DURATION_MULTIPLIER,
//       ease: "easeIn",
//     },
//   },
// };

// // NEW: Variants specifically for the image animation
// const imageVariants = {
//   initial: { opacity: 0, y: "50%" }, // Start from bottom
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: ANIMATION_DURATION_IMAGE,
//       ease: "easeOut",
//       delay: 0.1,
//     }, // Slightly delay after text starts
//   },
//   exit: {
//     opacity: 0,
//     y: "30%", // Exit downwards
//     transition: {
//       duration: ANIMATION_DURATION_IMAGE * EXIT_DURATION_MULTIPLIER,
//       ease: "easeIn",
//     },
//   },
// };

// const rightContentVariants = {
//   initial: { opacity: 0, x: "50%" },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: ANIMATION_DURATION_CONTENT,
//       ease: "easeOut",
//       delay: 0.1, // Delay slightly after left content starts
//     },
//   },
//   exit: {
//     opacity: 0,
//     x: "30%",
//     transition: {
//       duration: ANIMATION_DURATION_CONTENT * EXIT_DURATION_MULTIPLIER,
//       ease: "easeIn",
//     },
//   },
// };

// const blockContainerVariants = {
//   initial: {},
//   animate: {
//     transition: {
//       staggerChildren: 0.15, // Slightly increased stagger
//       delayChildren: ANIMATION_DURATION_CONTENT * 0.4, // Delay start relative to right panel animation
//     },
//   },
//   exit: {},
// };

// const blockItemVariants = {
//   initial: { opacity: 0, x: 30 },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: ANIMATION_DURATION_BLOCK_ITEM, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     x: 30,
//     transition: {
//       duration: ANIMATION_DURATION_BLOCK_ITEM * EXIT_DURATION_MULTIPLIER,
//       ease: "easeIn",
//     },
//   },
// };

// // --- Component ---
// const TransferSteps: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
//   const [isAnimatingBorder, setIsAnimatingBorder] = useState(true); // Renamed for clarity
//   const [isContentHovered, setIsContentHovered] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // --- advanceStep, useEffect, handleStepClick (logic largely unchanged) ---
//   const advanceStep = useCallback(() => {
//     setActiveIndex((prevIndex) => {
//       const nextIndex = (prevIndex + 1) % stepsData.length;
//       setIsAnimatingBorder(true); // Trigger border animation for the next step
//       if (animationTimeoutRef.current)
//         clearTimeout(animationTimeoutRef.current);
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimatingBorder(false);
//       }, BORDER_ANIMATION_DURATION);
//       return nextIndex;
//     });
//   }, []);

//   useEffect(() => {
//     // Start border animation immediately for the initial step
//     setIsAnimatingBorder(true);
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current); // Clear previous timeout just in case
//     animationTimeoutRef.current = setTimeout(() => {
//       setIsAnimatingBorder(false);
//     }, BORDER_ANIMATION_DURATION);

//     if (isAutoAdvancing && !isContentHovered) {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);

//       return () => {
//         if (timerRef.current) clearTimeout(timerRef.current);
//         // Don't clear animationTimeoutRef here, let it finish
//       };
//     } else {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       // Optional: Pause border animation on hover
//       if (animationTimeoutRef.current)
//         clearTimeout(animationTimeoutRef.current);
//       setIsAnimatingBorder(false);
//     }
//     // Cleanup animation timeout on component unmount or when dependencies change causing re-run
//     return () => {
//       if (animationTimeoutRef.current)
//         clearTimeout(animationTimeoutRef.current);
//     };
//   }, [activeIndex, isAutoAdvancing, advanceStep, isContentHovered]);

//   const handleStepClick = (index: number) => {
//     setIsAutoAdvancing(true);
//     setIsContentHovered(false);
//     if (timerRef.current) clearTimeout(timerRef.current);
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

//     setActiveIndex(index);
//     setIsAnimatingBorder(true); // Start border animation for clicked step
//     animationTimeoutRef.current = setTimeout(() => {
//       setIsAnimatingBorder(false);
//     }, BORDER_ANIMATION_DURATION);

//     if (isAutoAdvancing) {
//       timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);
//     }
//   };
//   // --- End of hooks and handlers ---

//   const currentStep = stepsData[activeIndex];

//   const getBlockClasses = (type: ContentBlock["type"]) => {
//     switch (type) {
//       case "success":
//         return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//       case "warning":
//         return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//       case "secondry":
//         return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//       case "default":

//       default:
//         return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//     }
//   };

//   return (
//     <div className="lg:py-10 py-5 bg-white dark:bg-background px-4">
//       <section
//         className="flex flex-col justify-center container mx-auto"
//         id="transfer-steps"
//       >
//         {/* --- Header (unchanged) --- */}
//         <article className="flex flex-col gap-5 mb-8 lg:mb-10">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
//             4 easy steps to
//             <span className="text-primary"> Transfer to India </span>
//           </h1>
//         </article>

//         <article className="grid gap-8 lg:grid-cols-3 lg:gap-8">
//           {/* --- Leftside Tabs (structure unchanged, logic for border animation kept) --- */}
//           <div className="w-full h-full">
//             <div className="rounded-3xl bg-white dark:bg-white/5 lg:p-8 p-6 h-full border shadow-sm dark:border-none">
//               <ul className="lg:flex md:grid md:grid-cols-2 lg:grid-cols-1 grid-cols-1 lg:flex-col space-y-6 justify-between h-full gap-6">
//                 {stepsData.map((step, index) => {
//                   const isActive = activeIndex === index;
//                   // Use the dedicated state for border animation
//                   const isCurrentlyAnimatingBorder =
//                     isActive && isAnimatingBorder;
//                   return (
//                     <li
//                       key={step.id}
//                       className={`relative shrink-0 lg:shrink ${
//                         index === stepsData.length - 1 ? "" : ""
//                       }`}
//                     >
//                       <button
//                         onClick={() => handleStepClick(index)}
//                         className="z-10 flex flex-col lg:flex-row cursor-pointer items-center lg:items-start lg:gap-5 bg-transparent w-full text-left group focus:outline-none rounded-lg"
//                         aria-current={isActive ? "step" : undefined}
//                       >
//                         <div className="relative flex-shrink-0">
//                           <svg
//                             viewBox="0 0 54 54"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className={`transition-colors duration-300 lg:size-18 md:size-14 size-12 ${
//                               isActive
//                                 ? "text-mainheading dark:text-primary"
//                                 : "text-[#97A2B3] dark:text-gray-500"
//                             }`}
//                           >
//                             {/* Base rectangle */}
//                             <rect
//                               x="1"
//                               y="1"
//                               width="52"
//                               height="52"
//                               rx="12"
//                               className={`transition-colors duration-300 stroke-[#EAECF0] dark:stroke-gray-500`}
//                               strokeWidth="2"
//                               fill={
//                                 isActive ? "dark:bg-black/20" : "transparent"
//                               }
//                             />

//                             {/* Icon */}
//                             <foreignObject x="15" y="15" width="24" height="24">
//                               <div className="flex items-center justify-center h-full w-full">
//                                 {React.createElement(
//                                   isActive ? step.iconActive : step.iconDefault,
//                                   {
//                                     className: `h-6 w-6 ${
//                                       isActive
//                                         ? "text-mainheading dark:text-primary"
//                                         : "text-[#97A2B3] dark:text-gray-500"
//                                     }`,
//                                   }
//                                 )}
//                               </div>
//                             </foreignObject>

//                             {/* Border Animation Path */}
//                             <path
//                               d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                               stroke={isActive ? "currentColor" : "none"}
//                               strokeWidth="2"
//                               fill="none"
//                               strokeDasharray="208"
//                               strokeDashoffset="208"
//                               className={
//                                 isCurrentlyAnimatingBorder
//                                   ? "animate-border-draw"
//                                   : isActive
//                                   ? "border-path-static"
//                                   : "border-path-reset"
//                               }
//                               style={{
//                                 animationDuration: `${BORDER_ANIMATION_DURATION}ms`,
//                               }}
//                             />
//                           </svg>
//                         </div>

//                         {/* Text Content */}
//                         <div className="flex flex-col items-center lg:items-start gap-1 mt-2.5">
//                           <h3
//                             className={`text-center lg:text-left capitalize text-base font-medium leading-tight transition-colors duration-300 lg:text-xl ${
//                               isActive
//                                 ? "text-[#182230] dark:text-white"
//                                 : "text-[#97A2B3] dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
//                             }`}
//                           >
//                             {step.title}
//                           </h3>
//                           <p
//                             className={`text-center lg:text-left text-sm font-normal transition-colors duration-300 lg:text-lg ${
//                               isActive
//                                 ? "text-gray-500 dark:text-white "
//                                 : "text-[#97A2B3] dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-200"
//                             }`}
//                           >
//                             {step.subtitle}
//                           </p>
//                         </div>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//           {/* --- RightSide Tab Content - WITH FRAMER MOTION (MODIFIED) --- */}
//           <div
//             className="relative lg:col-span-2 h-[500px] md:h-[550px] lg:h-[600px] min-h-[600px] md:min-h-[550px] lg:min-h-[600px] overflow-hidden" // Keep overflow-hidden
//             onMouseEnter={() => {
//               setIsContentHovered(true);
//               setIsAutoAdvancing(false);
//             }}
//             onMouseLeave={() => {
//               setIsContentHovered(false);
//               setIsAutoAdvancing(true);
//             }}
//           >
//             <AnimatePresence mode="wait">
//               {/* Keyed motion.div for overall panel animation */}
//               <motion.div
//                 key={activeIndex}
//                 className="absolute inset-0 flex flex-col border dark:border-none shadow-sm rounded-2xl bg-white dark:bg-white/5 p-6"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 {/* Flex container for 50/50 split */}
//                 <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-8">
//                   {/* Left Side (50% Width on LG screens) - Contains Text and Image */}
//                   <div className="lg:w-1/2 w-full flex flex-col">
//                     {/* Text Content Area - Animated Separately */}
//                     <motion.div
//                       className="space-y-2 mb-4 lg:mb-6"
//                       variants={leftContentVariants} // Apply slide from left to text
//                       // initial, animate, exit are inherited
//                     >
//                       <h3 className="text-lg md:text-xl lg:text-2xl font-normal text-mainheading dark:text-white">
//                         {currentStep.contentTitle}
//                       </h3>
//                       <p className="text-gray-700 dark:text-gray-300 lg:text-base text-sm">
//                         {currentStep.contentSubtitle}
//                       </p>
//                     </motion.div>

//                     {/* Image Area - Animated Separately */}
//                     <motion.div
//                       className="relative flex-grow flex items-center justify-center mt-5"
//                       variants={imageVariants} // Apply slide from bottom to image
//                       // initial, animate, exit are inherited
//                     >
//                       <Image
//                         // Make sure src is correct and image exists in public folder
//                         src={currentStep.contentImage1}
//                         alt={`${currentStep.title} illustration`}
//                         width={500} // Adjust as needed
//                         height={550} // Adjust as needed
//                         style={{
//                           width: "auto", // Maintain aspect ratio
//                           height: "auto", // Maintain aspect ratio
//                           maxHeight: "500px", // Constraint
//                           maxWidth: "100%", // Constraint
//                         }}
//                         priority={activeIndex === 0} // Prioritize first image
//                         className="object-contain" // Use contain
//                       />
//                     </motion.div>
//                   </div>

//                   {/* Right Side (50% Width on LG screens) - Animated */}
//                   <motion.div
//                     className="lg:w-1/2 w-full flex flex-col items-center lg:items-end justify-center lg:justify-start lg:pt-4"
//                     variants={rightContentVariants} // Slide from right for the whole right side
//                     // initial, animate, exit are inherited
//                   >
//                     {/* Content Blocks Area - Staggered Animation */}
//                     {currentStep.contentBlocks && (
//                       <motion.div
//                         className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto"
//                         variants={blockContainerVariants} // Stagger container
//                         initial="initial"
//                         animate="animate"
//                         exit="exit" // Apply exit to container if children need to animate out before container slides
//                       >
//                         {currentStep.contentBlocks.map((block, blockIndex) => (
//                           <motion.div
//                             key={blockIndex}
//                             className={`px-4 font-medium lg:text-base text-sm lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(
//                               block.type
//                             )}`}
//                             variants={blockItemVariants} // Individual block animation
//                           >
//                             {block.text}
//                           </motion.div>
//                         ))}
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default TransferSteps;

// // TransferSteps.tsx

// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { motion, AnimatePresence } from "framer-motion";
// // Removed: import { useTheme } from "next-themes";

// // --- Interface definitions ---
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success" | "warning" | "secondry";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   // Use an object for theme-specific images
//   contentImages: {
//     light: string;
//     dark: string;
//   };
//   contentImage2?: string; // Keep if you still need a second optional image
//   contentBlocks?: ContentBlock[];
// }

// // --- stepsData (Ensure image paths are correct and exist) ---
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Verify",
//     contentSubtitle: (
//       <>
//         Get started in minutes with a secure and simple sign-up process. We use
//         top-level identity verification to protect your account and ensure
//         compliance with international money transfer regulations.
//       </>
//     ),
//     contentImages: {
//       light: "/assets/images/Register-and-verify-light.png", // Replace with your light mode image
//       dark: "/assets/images/Register-and-verify-dark.png",   // Replace with your dark mode image
//     },
//     contentBlocks: [
//       { text: "Instant Account Setup", type: "success" },
//       { text: "Seamless KYC Verification", type: "secondry" },
//       { text: "Enhanced Security with Passkeys", type: "warning" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Your Digital Wallet with Passkey",
//     contentSubtitle:
//       "Set up your secure digital wallet in seconds. With integrated passkey protection, your funds and personal details are safeguarded from the start.",
//     contentImages: {
//       light: "/assets/images/Create-a-Digital-Wallet-light.png", // Replace with your light mode image
//       dark: "/assets/images/Create-a-Digital-Wallet-dark.png",   // Replace with your dark mode image
//     },
//     contentBlocks: [
//       { text: "Passkeys: The Future of Security", type: "success" },
//       { text: "Defends Against Online Threats", type: "secondry" },
//       { text: "Peace of Mind, Always", type: "warning" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle:
//       "Easily link the bank accounts or digital wallets of the people you wish to send money to. Manage recipients securely and send funds with confidence.",
//     contentImages: {
//       light: "/assets/images/Add-Recipients-light.png", // Replace with your light mode image
//       dark: "/assets/images/Add-Recipients-dark.png",   // Replace with your dark mode image
//     },
//     contentBlocks: [
//       { text: "Multiple Recipient Support", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "Quick Add Feature", type: "warning" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money Seamlessly",
//     contentSubtitle: "Complete your money transfer in just a few taps. Enjoy real-time processing, transparent fees, and secure delivery to your recipients in India.",
//     contentImages: {
//       light: "/assets/images/Transfer-Money-light.png", // Replace with your light mode image
//       dark: "/assets/images/Transfer-Money-dark.png",   // Replace with your dark mode image
//     },
//     contentBlocks: [
//       { text: "Instant Transfers", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "24/7 Secure Transactions", type: "warning" },
//     ],
//   },
// ];

// // --- Constants ---
// const AUTO_ADVANCE_DELAY = 3200;
// const BORDER_ANIMATION_DURATION = 3200;

// // --- Animation Speed Adjustment ---
// const ANIMATION_DURATION_CONTENT = 0.8;
// const ANIMATION_DURATION_IMAGE = 0.9;
// const ANIMATION_DURATION_BLOCK_ITEM = 0.5;
// const EXIT_DURATION_MULTIPLIER = 0.6;

// // --- Animation Variants ---
// const leftContentVariants = {
//   initial: { opacity: 0, x: "-50%" },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     x: "-30%",
//     transition: {
//       duration: ANIMATION_DURATION_CONTENT * EXIT_DURATION_MULTIPLIER,
//       ease: "easeIn",
//     },
//   },
// };

// const imageVariants = {
//   initial: { opacity: 0, y: "50%" },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: ANIMATION_DURATION_IMAGE,
//       ease: "easeOut",
//       delay: 0.1, // Delay image animation slightly after text
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: "30%", // Exit downwards
//     transition: {
//       duration: ANIMATION_DURATION_IMAGE * EXIT_DURATION_MULTIPLIER,
//       ease: "easeIn",
//     },
//   },
// };

// const rightContentVariants = {
//   initial: { opacity: 0, x: "50%" },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: ANIMATION_DURATION_CONTENT,
//       ease: "easeOut",
//       delay: 0.1, // Delay right side slightly
//     },
//   },
//   exit: {
//     opacity: 0,
//     x: "30%",
//     transition: {
//       duration: ANIMATION_DURATION_CONTENT * EXIT_DURATION_MULTIPLIER,
//       ease: "easeIn",
//     },
//   },
// };

// const blockContainerVariants = {
//   initial: {}, // No initial state needed for container itself
//   animate: {
//     transition: {
//       staggerChildren: 0.15, // Stagger animation of child blocks
//       delayChildren: ANIMATION_DURATION_CONTENT * 0.4, // Delay children animation start
//     },
//   },
//   exit: {}, // Exit handled by individual items if needed
// };

// const blockItemVariants = {
//   initial: { opacity: 0, x: 30 }, // Start off-screen right and transparent
//   animate: {
//     opacity: 1,
//     x: 0, // Animate to original position and full opacity
//     transition: { duration: ANIMATION_DURATION_BLOCK_ITEM, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     x: 30, // Exit back off-screen right
//     transition: {
//       duration: ANIMATION_DURATION_BLOCK_ITEM * EXIT_DURATION_MULTIPLIER,
//       ease: "easeIn",
//     },
//   },
// };

// // --- Component ---
// const TransferSteps: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
//   const [isAnimatingBorder, setIsAnimatingBorder] = useState(true); // Controls the SVG border animation
//   const [isContentHovered, setIsContentHovered] = useState(false); // Tracks hover state over the content panel
//   const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref for the auto-advance timer
//   const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for the border animation end timeout

//   // --- Removed theme-related state and effects ---

//   // --- Advance to the next step ---
//   const advanceStep = useCallback(() => {
//     setActiveIndex((prevIndex) => {
//       const nextIndex = (prevIndex + 1) % stepsData.length;
//       setIsAnimatingBorder(true); // Trigger border animation for the next step
//       if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
//       // Set a timeout to turn off the animation class after it should have completed
//       animationTimeoutRef.current = setTimeout(() => {
//         setIsAnimatingBorder(false);
//       }, BORDER_ANIMATION_DURATION);
//       return nextIndex;
//     });
//   }, []); // No dependencies needed here

//   // --- Effect for managing timers and initial animation ---
//   useEffect(() => {
//     // Start border animation for the current step when it becomes active or on initial load
//     setIsAnimatingBorder(true);
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
//     animationTimeoutRef.current = setTimeout(() => {
//       setIsAnimatingBorder(false);
//     }, BORDER_ANIMATION_DURATION);

//     let advanceTimer: NodeJS.Timeout | null = null;
//     // Manage auto-advance timer based on state
//     if (isAutoAdvancing && !isContentHovered) {
//       if (timerRef.current) clearTimeout(timerRef.current); // Clear any existing timer
//       advanceTimer = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);
//       timerRef.current = advanceTimer; // Store the new timer ID
//     } else {
//       // If paused or hovered, clear the auto-advance timer
//       if (timerRef.current) clearTimeout(timerRef.current);
//       // Optionally pause border animation immediately on hover
//       if (isContentHovered && animationTimeoutRef.current) {
//            clearTimeout(animationTimeoutRef.current);
//            setIsAnimatingBorder(false); // Stop animation class
//       }
//     }

//     // Cleanup function to clear timers when component unmounts or dependencies change
//     return () => {
//       if (advanceTimer) clearTimeout(advanceTimer); // Clear the specific timer created in this effect run
//       if (timerRef.current === advanceTimer) { // Prevent clearing unrelated timers
//           timerRef.current = null;
//       }
//       // No need to clear animationTimeoutRef here, allow border animation to finish if already started
//     };
//   }, [activeIndex, isAutoAdvancing, isContentHovered, advanceStep]); // Dependencies for the effect

//   // --- Handle click on a step tab ---
//   const handleStepClick = (index: number) => {
//     setIsAutoAdvancing(true); // Keep auto-advancing enabled after manual click
//     setIsContentHovered(false); // Reset hover state
//     if (timerRef.current) clearTimeout(timerRef.current); // Clear existing auto-advance timer
//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current); // Clear existing border animation timer

//     setActiveIndex(index); // Set the new active step
//     setIsAnimatingBorder(true); // Start border animation for the clicked step
//     animationTimeoutRef.current = setTimeout(() => {
//       setIsAnimatingBorder(false);
//     }, BORDER_ANIMATION_DURATION);

//     // Restart the auto-advance timer if it's enabled
//     if (isAutoAdvancing) {
//         timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);
//     }
//   };

//   const currentStep = stepsData[activeIndex];

//   // --- Helper function to get CSS classes for content blocks based on type ---
//   const getBlockClasses = (type: ContentBlock["type"]) => {
//     switch (type) {
//       case "success":
//         return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//       case "warning":
//         return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//       case "secondry": // Assuming 'secondry' is intentional, otherwise 'secondary'
//         return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//       case "default":
//       default:
//         return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//     }
//   };

//   return (
//     <div className="lg:py-10 py-5 bg-white dark:bg-background px-4">
//       <section
//         className="flex flex-col justify-center container mx-auto"
//         id="transfer-steps"
//       >
//         {/* --- Section Header --- */}
//         <article className="flex flex-col gap-5 mb-8 lg:mb-10">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
//             4 easy steps to
//             <span className="text-primary"> Transfer to India </span>
//           </h1>
//         </article>

//         {/* --- Main Grid Layout (Tabs + Content) --- */}
//         <article className="grid gap-8 lg:grid-cols-3 lg:gap-8">
//           {/* --- Left Side: Step Tabs --- */}
//           <div className="w-full h-full">
//             <div className="rounded-3xl bg-white dark:bg-white/5 lg:p-8 p-6 h-full border shadow-sm dark:border-none">
//               <ul className="lg:flex md:grid md:grid-cols-2 lg:grid-cols-1 grid-cols-1 lg:flex-col space-y-6 justify-between h-full gap-6">
//                 {stepsData.map((step, index) => {
//                    const isActive = activeIndex === index;
//                    // Determine if the border animation should be running for *this specific* active tab
//                    const isCurrentlyAnimatingBorder = isActive && isAnimatingBorder;
//                    return (
//                     <li
//                       key={step.id}
//                       className={`relative shrink-0 lg:shrink ${
//                         index === stepsData.length - 1 ? "" : "" // No specific style for last item needed here
//                       }`}
//                     >
//                       <button
//                         onClick={() => handleStepClick(index)}
//                         className="z-10 flex flex-col lg:flex-row cursor-pointer items-center lg:items-start lg:gap-5 bg-transparent w-full text-left group focus:outline-none rounded-lg"
//                         aria-current={isActive ? "step" : undefined}
//                       >
//                         {/* SVG Icon Container */}
//                          <div className="relative flex-shrink-0">
//                           <svg
//                             viewBox="0 0 54 54"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             // Apply dynamic text color based on active state
//                             className={`transition-colors duration-300 lg:size-18 md:size-14 size-12 ${
//                               isActive
//                                 ? "text-mainheading dark:text-primary" // Active colors
//                                 : "text-[#97A2B3] dark:text-gray-500" // Inactive colors
//                             }`}
//                           >
//                             {/* Base rectangle background */}
//                             <rect
//                               x="1"
//                               y="1"
//                               width="52"
//                               height="52"
//                               rx="12"
//                               className={`transition-colors duration-300 stroke-[#EAECF0] dark:stroke-gray-500`} // Border color
//                               strokeWidth="2"
//                               fill={'transparent'} // No JS-based fill needed
//                             />

//                             {/* Icon rendering inside SVG */}
//                             <foreignObject x="15" y="15" width="24" height="24">
//                               <div className="flex items-center justify-center h-full w-full">
//                                 {React.createElement(
//                                   // Choose icon based on active state
//                                   isActive ? step.iconActive : step.iconDefault,
//                                   { // Apply dynamic icon color class
//                                     className: `h-6 w-6 transition-colors duration-300 ${
//                                       isActive
//                                         ? "text-mainheading dark:text-primary" // Active icon color
//                                         : "text-[#97A2B3] dark:text-gray-500" // Inactive icon color
//                                     }`,
//                                   }
//                                 )}
//                               </div>
//                             </foreignObject>

//                             {/* Animated Border Path */}
//                             <path
//                               // Path definition for the rounded rectangle border
//                               d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
//                               // Stroke color comes from the parent SVG's text color if 'currentColor'
//                               stroke={isActive ? "currentColor" : "none"} // Show stroke only if active
//                               strokeWidth="2"
//                               fill="none" // No fill for the border path
//                               strokeDasharray="208" // Total path length (approx)
//                               strokeDashoffset="208" // Start with the border fully 'undrawn'
//                               // Apply animation class conditionally
//                               className={
//                                 isCurrentlyAnimatingBorder
//                                   ? "animate-border-draw" // Your animation class from CSS
//                                   : isActive
//                                   ? "border-path-static" // Class to keep border visible when active but not animating
//                                   : "border-path-reset" // Class to hide border when inactive
//                               }
//                               // Set animation duration via style
//                               style={{
//                                 animationDuration: `${BORDER_ANIMATION_DURATION}ms`,
//                               }}
//                             />
//                           </svg>
//                         </div>

//                          {/* Text Content (Title and Subtitle) */}
//                         <div className="flex flex-col items-center lg:items-start gap-1 mt-2.5">
//                           <h3
//                             // Dynamic text color and size for title
//                             className={`text-center lg:text-left capitalize text-base font-medium leading-tight transition-colors duration-300 lg:text-xl ${
//                               isActive
//                                 ? "text-[#182230] dark:text-white" // Active title color
//                                 : "text-[#97A2B3] dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" // Inactive title color + hover
//                             }`}
//                           >
//                             {step.title}
//                           </h3>
//                           <p
//                             // Dynamic text color and size for subtitle
//                             className={`text-center lg:text-left text-sm font-normal transition-colors duration-300 lg:text-lg ${
//                               isActive
//                                 ? "text-gray-500 dark:text-gray-300" // Active subtitle color
//                                 : "text-[#97A2B3] dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-200" // Inactive subtitle color + hover
//                             }`}
//                           >
//                             {step.subtitle}
//                           </p>
//                         </div>
//                       </button>
//                     </li>
//                    )
//                  })}
//               </ul>
//             </div>
//           </div>

//           {/* --- Right Side: Content Panel --- */}
//           <div
//             className="relative lg:col-span-2 h-[500px] md:h-[550px] lg:h-[600px] min-h-[600px] md:min-h-[550px] lg:min-h-[600px] overflow-hidden"
//             // Pause auto-advance on hover
//             onMouseEnter={() => setIsContentHovered(true)}
//             // Resume auto-advance on leave
//             onMouseLeave={() => setIsContentHovered(false)}
//           >
//             <AnimatePresence mode="wait">
//               {/* Animated container for the active step's content */}
//               <motion.div
//                 key={activeIndex} // Animate when activeIndex changes
//                 className="absolute inset-0 flex flex-col border dark:border-none shadow-sm rounded-2xl bg-white dark:bg-white/5 p-6"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 // Variants for the overall panel fade can be added here if needed
//                 // variants={panelVariants} // Example if you have panel-specific fade
//               >
//                 {/* Flex container for 50/50 split on large screens */}
//                 <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-8">
//                   {/* Left Side (Text and Image) */}
//                   <div className="lg:w-1/2 w-full flex flex-col">
//                     {/* Animated Text Content Area */}
//                     <motion.div
//                       className="space-y-2 mb-4 lg:mb-6"
//                       variants={leftContentVariants} // Slide/fade in from left
//                       // Inherits initial/animate/exit from parent motion.div
//                     >
//                       <h3 className="text-lg md:text-xl lg:text-2xl font-normal text-mainheading dark:text-white">
//                         {currentStep.contentTitle}
//                       </h3>
//                       <p className="text-gray-700 dark:text-gray-300 lg:text-base text-sm">
//                         {currentStep.contentSubtitle}
//                       </p>
//                     </motion.div>

//                     {/* Animated Image Area */}
//                     <motion.div
//                       // Key ensures animation runs when step changes, not on theme change
//                       key={activeIndex}
//                       className="relative flex-grow flex items-center justify-center mt-5"
//                       variants={imageVariants} // Slide/fade in from bottom
//                       // Inherits initial/animate/exit from parent motion.div
//                     >
//                       {/* Light Mode Image - Displayed by default, hidden in dark mode */}
//                       <Image
//                         src={currentStep.contentImages.light}
//                         alt={`${currentStep.title} illustration (light)`}
//                         width={500}
//                         height={550}
//                         style={{
//                           width: "auto", height: "auto",
//                           maxHeight: "500px", maxWidth: "100%",
//                         }}
//                         priority={activeIndex === 0} // Prioritize loading for the first step
//                         className="object-contain block dark:hidden" // CSS for light mode
//                       />
//                       {/* Dark Mode Image - Hidden by default, displayed in dark mode */}
//                       <Image
//                         src={currentStep.contentImages.dark}
//                         alt={`${currentStep.title} illustration (dark)`}
//                         width={500}
//                         height={550}
//                         style={{
//                             width: "auto", height: "auto",
//                             maxHeight: "500px", maxWidth: "100%",
//                         }}
//                         priority={activeIndex === 0} // Prioritize loading for the first step
//                         className="object-contain hidden dark:block" // CSS for dark mode
//                       />
//                     </motion.div>
//                   </div>

//                   {/* Right Side (Content Blocks) */}
//                   <motion.div
//                     className="lg:w-1/2 w-full flex flex-col items-center lg:items-end justify-center lg:justify-start lg:pt-4"
//                     variants={rightContentVariants} // Slide/fade in from right
//                      // Inherits initial/animate/exit from parent motion.div
//                   >
//                     {/* Conditionally render blocks container if blocks exist */}
//                     {currentStep.contentBlocks && (
//                       <motion.div
//                         className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto"
//                         variants={blockContainerVariants} // Applies stagger/delay to children
//                         initial="initial" // Necessary for staggerChildren to work correctly
//                         animate="animate"
//                         exit="exit" // Ensure blocks animate out if needed
//                       >
//                         {/* Map over blocks to render each one */}
//                         {currentStep.contentBlocks.map((block, blockIndex) => (
//                           <motion.div
//                             key={blockIndex} // Unique key for each block
//                             // Apply dynamic styling based on block type
//                             className={`px-4 font-medium lg:text-base text-sm lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(
//                               block.type
//                             )}`}
//                             variants={blockItemVariants} // Individual block slide/fade animation
//                              // initial/animate/exit inherited from parent variants
//                           >
//                             {block.text}
//                           </motion.div>
//                         ))}
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default TransferSteps;

// TransferSteps.tsx
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { IconType } from "react-icons";
import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- Interface definitions (remain the same) ---
interface ContentBlock {
  text: string;
  type?: "default" | "success" | "warning" | "secondry";
}

interface StepData {
  id: number;
  iconDefault: IconType;
  iconActive: IconType;
  title: string;
  subtitle: string;
  contentTitle: string;
  contentSubtitle: React.ReactNode;
  contentImages: {
    light: string;
    dark: string;
  };
  contentImage2?: string;
  contentBlocks?: ContentBlock[];
}

const stepsData: StepData[] = [
  {
    id: 0,
    iconDefault: FaCheckCircle,
    iconActive: FaCheckCircle,
    title: "Register and verify",
    subtitle: "Complete verification process",
    contentTitle: "Register & Verify",
    contentSubtitle: (
      <>
        Get started in minutes with a secure and simple sign-up process. We use
        top-level identity verification to protect your account and ensure
        compliance with international money transfer regulations.
      </>
    ),
    contentImages: {
      light: "/assets/images/Register-and-verify-light.png", // Replace with your light mode image
      dark: "/assets/images/Register-and-verify-dark.png", // Replace with your dark mode image
    },
    contentBlocks: [
      { text: "Instant Account Setup", type: "success" },
      { text: "Seamless KYC Verification", type: "secondry" },
      { text: "Enhanced Security with Passkeys", type: "warning" },
    ],
  },
  {
    id: 1,
    iconDefault: FaWallet,
    iconActive: FaWallet,
    title: "Create a Digital Wallet",
    subtitle: "Add transfer amount",
    contentTitle: "Create Your Digital Wallet with Passkey",
    contentSubtitle:
      "Set up your secure digital wallet in seconds. With integrated passkey protection, your funds and personal details are safeguarded from the start.",
    contentImages: {
      light: "/assets/images/Create-a-Digital-Wallet-light.png", // Replace with your light mode image
      dark: "/assets/images/Create-a-Digital-Wallet-dark.png", // Replace with your dark mode image
    },
    contentBlocks: [
      { text: "Passkeys: The Future of Security", type: "success" },
      { text: "Defends Against Online Threats", type: "secondry" },
      { text: "Peace of Mind, Always", type: "warning" },
    ],
  },
  {
    id: 2,
    iconDefault: FaUserFriends,
    iconActive: FaUserFriends,
    title: "Add Recipients",
    subtitle: "Who do we send to?",
    contentTitle: "Add Recipients",
    contentSubtitle:
      "Easily link the bank accounts or digital wallets of the people you wish to send money to. Manage recipients securely and send funds with confidence.",
    contentImages: {
      light: "/assets/images/Add-Recipients-light.png", // Replace with your light mode image
      dark: "/assets/images/Add-Recipients-dark.png", // Replace with your dark mode image
    },
    contentBlocks: [
      { text: "Multiple Recipient Support", type: "success" },
      { text: "Secure Data Handling", type: "secondry" },
      { text: "Quick Add Feature", type: "warning" },
    ],
  },
  {
    id: 3,
    iconDefault: FaMoneyBillTransfer,
    iconActive: FaMoneyBillTransfer,
    title: "Transfer Money",
    subtitle: "Complete transfer process",
    contentTitle: "Transfer Money Seamlessly",
    contentSubtitle:
      "Complete your money transfer in just a few taps. Enjoy real-time processing, transparent fees, and secure delivery to your recipients in India.",
    contentImages: {
      light: "/assets/images/Transfer-Money-light.png", // Replace with your light mode image
      dark: "/assets/images/Transfer-Money-dark.png", // Replace with your dark mode image
    },
    contentBlocks: [
      { text: "Instant Transfers", type: "success" },
      { text: "Secure Data Handling", type: "secondry" },
      { text: "24/7 Secure Transactions", type: "warning" },
    ],
  },
];

// --- Constants ---
const AUTO_ADVANCE_DELAY = 3500;
const BORDER_ANIMATION_DURATION = 3500;

// --- Animation Durations ---
const ANIMATION_DURATION_CONTENT = 0.6;
const ANIMATION_DURATION_IMAGE = 0.7;
const ANIMATION_DURATION_BLOCK_ITEM = 0.4;
const EXIT_DURATION_MULTIPLIER = 0.7;


// --- Animation Variants (remain the same) ---
const leftContentVariants = {
  initial: { opacity: 0, x: "-50%" },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: "-30%",
    transition: {
      duration: ANIMATION_DURATION_CONTENT * EXIT_DURATION_MULTIPLIER,
      ease: "easeIn",
    },
  },
};

const imageVariants = {
  initial: { opacity: 0, y: "50%" },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION_IMAGE,
      ease: "easeOut",
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: "30%",
    transition: {
      duration: ANIMATION_DURATION_IMAGE * EXIT_DURATION_MULTIPLIER,
      ease: "easeIn",
    },
  },
};

const rightContentVariants = {
  initial: { opacity: 0, x: "50%" },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATION_CONTENT,
      ease: "easeOut",
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: "30%",
    transition: {
      duration: ANIMATION_DURATION_CONTENT * EXIT_DURATION_MULTIPLIER,
      ease: "easeIn",
    },
  },
};

const blockContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: ANIMATION_DURATION_CONTENT * 0.4,
    },
  },
  exit: {},
};

const blockItemVariants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: ANIMATION_DURATION_BLOCK_ITEM, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: ANIMATION_DURATION_BLOCK_ITEM * EXIT_DURATION_MULTIPLIER,
      ease: "easeIn",
    },
  },
};

// --- Component ---
const TransferSteps: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
  const [isAnimatingBorder, setIsAnimatingBorder] = useState(false);
  const [isContentHovered, setIsContentHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimatedIn = useRef(false); // Track if entrance animation has run *at least once*
  const prevInViewRef = useRef<boolean | undefined>(undefined); // Track previous inView state

  // --- Intersection Observer Setup ---
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 100% visible
    // triggerOnce: false, // **CHANGED**: Allow triggering multiple times
  });

  // --- Advance Step Callback ---
  const advanceStep = useCallback(() => {
    if (!hasAnimatedIn.current || !inView) return; // Only advance if entered & currently in view

    setActiveIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % stepsData.length;
      setIsAnimatingBorder(true);
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimatingBorder(false);
      }, BORDER_ANIMATION_DURATION);
      return nextIndex;
    });
  }, [inView]); // Depend on inView to ensure it stops if scrolled out

  // --- Effect for Entrance and Re-entrance Logic ---
  useEffect(() => {
    const wasPreviouslyInView = prevInViewRef.current;

    // --- Handle Entrance (First Time Only) ---
    if (inView && !hasAnimatedIn.current) {
      console.log("TransferSteps: Initial Entrance Triggered");
      hasAnimatedIn.current = true; // Mark entrance animation as having run
      // Start border animation for the initial step (0)
      setIsAnimatingBorder(true);
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimatingBorder(false);
      }, BORDER_ANIMATION_DURATION);
      // Start auto-advance timer immediately
      if (isAutoAdvancing) {
        timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);
      }
    }
    // --- Handle Re-entrance (After Initial Entrance) ---
    else if (inView && wasPreviouslyInView === false && hasAnimatedIn.current) {
      console.log("TransferSteps: Re-entrance Triggered - Resetting State");
      // Clear existing timers
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);

      // Reset to the first step
      setActiveIndex(0);
      setIsAnimatingBorder(true); // Start border animation for step 0
      setIsAutoAdvancing(true); // Ensure auto-advance is on
      setIsContentHovered(false); // Reset hover state

      // Set timeout for the new border animation
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimatingBorder(false);
      }, BORDER_ANIMATION_DURATION);

      // Restart auto-advance timer for step 0
      timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);
    }
    // --- Handle Leaving Viewport ---
    else if (!inView && wasPreviouslyInView === true && hasAnimatedIn.current) {
      console.log("TransferSteps: Left Viewport - Clearing Timers");
      // Clear timers when scrolling out
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
      setIsAnimatingBorder(false); // Stop border animation immediately
      // Optional: Pause auto-advancing? Resetting on re-entry might be enough.
      // setIsAutoAdvancing(false);
    }

    // Update previous inView state for the next render
    prevInViewRef.current = inView;

    // Cleanup timers on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
    };
    // Only re-run this specific effect when inView changes
  }, [inView, isAutoAdvancing, advanceStep]);

  // --- Separate Effect for Hover/AutoAdvance Interaction (Runs only after entrance) ---
  useEffect(() => {
    if (!hasAnimatedIn.current || !inView) return; // Only manage hover logic if entered and in view

    if (isAutoAdvancing && !isContentHovered) {
      // If auto-advancing should run, ensure timer is set (clearing previous if needed)
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);

      // Optional: Resume border animation if it was paused by hover
      if (!isAnimatingBorder && activeIndex >= 0) {
        // Re-evaluate if border *should* be running based on activeIndex and its timer
        // This might be complex if border animation needs precise resume logic.
        // Simpler: Let the next advanceStep or handleStepClick restart it.
      }
    } else {
      // If paused by hover or setting, clear the auto-advance timer
      if (timerRef.current) clearTimeout(timerRef.current);
      // Pause border animation immediately on hover
      if (
        isContentHovered &&
        isAnimatingBorder &&
        animationTimeoutRef.current
      ) {
        clearTimeout(animationTimeoutRef.current);
        setIsAnimatingBorder(false);
      }
    }

    // Cleanup timer on effect re-run or unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAutoAdvancing, isContentHovered, activeIndex, advanceStep, inView]); // React only to these states

  // --- Handle Click on Step Tab ---
  const handleStepClick = (index: number) => {
    if (!hasAnimatedIn.current || !inView) return; // Only allow after entrance and if in view

    console.log(`Step clicked: ${index}`);
    setIsAutoAdvancing(true); // Re-enable auto-advance on interaction
    setIsContentHovered(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

    setActiveIndex(index);
    setIsAnimatingBorder(true); // Start border for clicked step
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimatingBorder(false);
    }, BORDER_ANIMATION_DURATION);

    // Restart auto-advance timer after click
    timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);
  };

  const currentStep = activeIndex >= 0 ? stepsData[activeIndex] : null;

  // / Helper function to get CSS classes (remains the same)
  const getBlockClasses = (type: ContentBlock["type"]) => {
    switch (type) {
      case "success":
        return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
      case "warning":
        return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
      case "secondry": // Assuming 'secondry' is intentional, otherwise 'secondary'
        return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
      case "default":
      default:
        return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl capitalize text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
    }
  };


  return (
    // Attach ref HERE to the element whose visibility triggers animations
    <div
      ref={ref}
      className="lg:py-10 py-5 bg-white dark:bg-background px-4 overflow-hidden"
    >
      {/* Apply ENTRANCE animation controlled by useInView */}
      <motion.section
        className="flex flex-col justify-center container mx-auto"
        id="transfer-steps"
        initial="hidden"
      >
        {/* Section Header */}
        <article className="flex flex-col gap-5 mb-8 lg:mb-10">
          {/* ... h1 ... */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
            4 easy steps to
            <span className="text-primary"> Transfer to India </span>
          </h1>
        </article>

        {/* Main Grid Layout (Tabs + Content) */}
        <article className="grid gap-8 lg:grid-cols-3 lg:gap-8">
          {/* Left Side: Step Tabs */}
          <div className="w-full h-full">
            {/* ... Tabs container div ... */}
            <div className="rounded-3xl bg-white dark:bg-white/5 lg:p-8 p-6 h-full border shadow-sm dark:border-none">
              <ul className="lg:flex md:grid md:grid-cols-2 lg:grid-cols-1 grid-cols-1 lg:flex-col space-y-6 justify-between h-full gap-6">
                {stepsData.map((step, index) => {
                  const isActive = activeIndex === index;
                  const isCurrentlyAnimatingBorder =
                    isActive && isAnimatingBorder;
                  return (
                    <li key={step.id} className={`relative shrink-0 lg:shrink`}>
                      <button
                        onClick={() => handleStepClick(index)}
                        disabled={!hasAnimatedIn.current}
                        className={`z-10 flex flex-col lg:flex-row cursor-pointer items-center lg:items-start lg:gap-5 bg-transparent w-full text-left group focus:outline-none rounded-lg ${
                          !hasAnimatedIn.current
                            ? "cursor-default opacity-60"
                            : ""
                        }`}
                        aria-current={isActive ? "step" : undefined}
                      >
                        {/* SVG Icon Container */}
                        <div className="relative flex-shrink-0">
                          <svg
                            viewBox="0 0 54 54"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-colors duration-300 lg:size-18 md:size-14 size-12 ${
                              isActive
                                ? "text-mainheading dark:text-primary"
                                : "text-[#97A2B3] dark:text-gray-500"
                            }`}
                          >
                            <rect
                              x="1"
                              y="1"
                              width="52"
                              height="52"
                              rx="12"
                              className="transition-colors duration-300 stroke-[#EAECF0] dark:stroke-gray-700"
                              strokeWidth="2"
                              fill="transparent"
                            />
                            <foreignObject x="15" y="15" width="24" height="24">
                              <div className="flex items-center justify-center h-full w-full">
                                {React.createElement(
                                  isActive ? step.iconActive : step.iconDefault,
                                  {
                                    className: `h-6 w-6 transition-colors duration-300 ${
                                      isActive
                                        ? "text-mainheading dark:text-primary"
                                        : "text-[#97A2B3] dark:text-gray-500"
                                    }`,
                                  }
                                )}
                              </div>
                            </foreignObject>
                            <path
                              d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
                              stroke={isActive ? "currentColor" : "none"}
                              strokeWidth="2"
                              fill="none"
                              strokeDasharray="208"
                              strokeDashoffset="208"
                              className={
                                isCurrentlyAnimatingBorder
                                  ? "animate-border-draw"
                                  : isActive
                                  ? "border-path-static"
                                  : "border-path-reset"
                              }
                              style={{
                                animationDuration: `${BORDER_ANIMATION_DURATION}ms`,
                              }}
                            />
                          </svg>
                        </div>
                        {/* Text Content */}
                        <div className="flex flex-col items-center lg:items-start gap-1 mt-2.5">
                          <h3
                            className={`text-center lg:text-left capitalize text-base font-medium leading-tight transition-colors duration-300 lg:text-xl ${
                              isActive
                                ? "text-[#182230] dark:text-white"
                                : "text-[#97A2B3] dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-center lg:text-left text-sm font-normal transition-colors duration-300 lg:text-lg ${
                              isActive
                                ? "text-gray-500 dark:text-gray-300"
                                : "text-[#97A2B3] dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                            }`}
                          >
                            {step.subtitle}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Side: Content Panel */}
          <div
            className="relative lg:col-span-2 h-[500px] md:h-[550px] lg:h-[600px] min-h-[600px] md:min-h-[550px] lg:min-h-[600px] overflow-hidden"
            onMouseEnter={() => {
              if (hasAnimatedIn.current) setIsContentHovered(true);
            }}
            onMouseLeave={() => {
              if (hasAnimatedIn.current) setIsContentHovered(false);
            }}
          >
            {/* AnimatePresence for step transitions */}
            <AnimatePresence mode="wait">
              {currentStep && (
                <motion.div
                  key={activeIndex} // Key change triggers transitions
                  className="absolute inset-0 flex flex-col border dark:border-none shadow-sm rounded-2xl bg-white dark:bg-white/5 p-6"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {/* Inner step content using internal variants */}
                  <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-8">
                    {/* Left Side */}
                    <div className="lg:w-1/2 w-full flex flex-col">
                      <motion.div
                        className="space-y-2 mb-4 lg:mb-6"
                        variants={leftContentVariants}
                      >
                        <h3 className="text-lg md:text-xl lg:text-2xl font-normal text-mainheading dark:text-white">
                          {currentStep.contentTitle}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 lg:text-base text-sm">
                          {currentStep.contentSubtitle}
                        </p>
                      </motion.div>
                      <motion.div
                        key={`${activeIndex}-image`}
                        className="relative flex-grow flex items-center justify-center mt-5"
                        variants={imageVariants}
                      >
                        <Image
                          src={currentStep.contentImages.light}
                          alt={`${currentStep.title} illustration (light)`}
                          width={500}
                          height={550}
                          style={{
                            width: "auto",
                            height: "auto",
                            maxHeight: "500px",
                            maxWidth: "100%",
                          }}
                          priority={activeIndex === 0}
                          className="object-contain block dark:hidden"
                        />
                        <Image
                          src={currentStep.contentImages.dark}
                          alt={`${currentStep.title} illustration (dark)`}
                          width={500}
                          height={550}
                          style={{
                            width: "auto",
                            height: "auto",
                            maxHeight: "500px",
                            maxWidth: "100%",
                          }}
                          priority={activeIndex === 0}
                          className="object-contain hidden dark:block"
                        />
                      </motion.div>
                    </div>
                    {/* Right Side */}
                    <motion.div
                      className="lg:w-1/2 w-full flex flex-col items-center lg:items-end justify-center lg:justify-start lg:pt-4"
                      variants={rightContentVariants}
                    >
                      {currentStep.contentBlocks && (
                        <motion.div
                          className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto"
                          variants={blockContainerVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          {currentStep.contentBlocks.map(
                            (block, blockIndex) => (
                              <motion.div
                                key={blockIndex}
                                className={`px-4 font-medium lg:text-base text-sm lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(
                                  block.type
                                )}`}
                                variants={blockItemVariants}
                              >
                                {block.text}
                              </motion.div>
                            )
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </article>
      </motion.section>
    </div>
  );
};

export default TransferSteps;
