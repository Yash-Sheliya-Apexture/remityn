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

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const stepsData = [
  {
    id: 0,
    iconDefault: "/assets/icon/verify.svg", // Use distinct inactive icon if desired
    iconActive: "/assets/icon/verify.svg",
    title: "Register and verify",
    subtitle: "Complete verification process",
    // contentTitle: "Register & Identify",
    contentSubtitle: (
      <>
        {/* Register with your email and phone number. <br /> */}
        {/* Identify yourself with our inbuilt KYC process */}
      </>
    ),
    contentImage1: "/assets/images/reg.997f6e4c.svg", // Ensure this path is correct in /public
    contentImage2: "/assets/images/reg-2.1d035221.svg", // Ensure this path is correct in /public
  },
  {
    id: 1,
    iconDefault: "/assets/icon/rupees..svg", // Replace with actual inactive icon path
    iconActive: "/assets/icon/rupees..svg", // Replace with actual active icon path (rupees?)
    title: "Create a Digital Wallet",
    subtitle: "Add transfer amount",
    // contentTitle: "Create Your Wallet",
    contentSubtitle: (
      <>
        {/* Easily set up your secure digital wallet. <br /> */}
        {/* Add funds to start transferring. */}
      </>
    ),
    contentImage1: "/assets/images/wallet.8ef702f3.svg", // Replace with actual image path
  },
  {
    id: 2,
    iconDefault: "/assets/icon/recipients.svg", // Replace with actual inactive icon path
    iconActive: "/assets/icon/recipients.svg", // Replace with actual active icon path
    title: "Add Recipients",
    subtitle: "Who do we send to?",
    // contentTitle: "Manage Your Recipients",
    contentSubtitle: (
      <>
        {/* Add and save recipient details securely. <br /> */}
        {/* Send money quickly next time. */}
      </>
    ),
    contentImage1: "/assets/images/rec-1.27d0b92a.svg", // Replace with actual image path
    contentImage2: "/assets/images/rec-2.e0ece37b.svg", // Replace with actual image path
  },
  {
    id: 3,
    iconDefault: "/assets/icon/flight.svg", // Replace with actual inactive icon path (flight?)
    iconActive: "/assets/icon/flight.svg", // Replace with actual active icon path
    title: "Transfer Money",
    subtitle: "Complete transfer process",
    // contentTitle: "Send Your Money",
    contentSubtitle: (
      <>
        {/* Review the details and confirm your transfer. <br /> */}
        {/* Track your money's journey in real-time. */}
      </>
    ),
    contentImage1: "/assets/images/trf-1.7a2bc647.svg", // Replace with actual image path
  },
];

const AUTO_ADVANCE_DELAY = 2800; // ms - How long to wait before advancing automatically (make >= animation duration)
const BORDER_ANIMATION_DURATION = 2800; // ms - Should match CSS animation duration


const TransferSteps: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true); // Track if auto-advance is active
  const [isAnimating, setIsAnimating] = useState(true); // Track if border animation is running for the active item
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- Function to handle advancing to the next step ---
  const advanceStep = useCallback(() => {
    setActiveIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % stepsData.length;
      setIsAnimating(true); // Start animation for the new index
      // Set a timeout to mark animation as finished after its duration
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false); // Animation finished for this step
      }, BORDER_ANIMATION_DURATION);
      return nextIndex;
    });
  }, []); // No dependencies needed as it relies on the state updater function form

  // --- Effect for automatic advancement ---
  useEffect(() => {
    if (isAutoAdvancing) {
      // Clear existing timer before setting a new one
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Start the animation flag immediately for index 0 on initial load
      if (activeIndex === 0 && isAnimating) {
        if (animationTimeoutRef.current)
          clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, BORDER_ANIMATION_DURATION);
      }

      // Set the timer
      timerRef.current = setTimeout(advanceStep, AUTO_ADVANCE_DELAY);

      // Cleanup function to clear timer on unmount or when isAutoAdvancing changes
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
      };
    } else {
      // If auto advancing is stopped, clear any running timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    }
  }, [activeIndex, isAutoAdvancing, advanceStep]); // Re-run effect if these change

  // --- Handler for clicking a step ---
  const handleStepClick = (index: number) => {
    setIsAutoAdvancing(false); // Stop auto-advancing on manual click
    if (timerRef.current) clearTimeout(timerRef.current); // Clear any pending auto-advance
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

    setActiveIndex(index);
    setIsAnimating(true); // Start animation for the clicked index
    // Set timeout to mark animation as finished
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, BORDER_ANIMATION_DURATION);
  };

  const currentStep = stepsData[activeIndex];

  return (
    <div className="py-10 bg-[#F2F4F7] dark:bg-gray-900">
      <section
        className="flex flex-col justify-center container mx-auto px-4"
        id="transfer-steps"
      >
        {/* Title Section */}
        <article className="flex flex-col gap-5 mb-8 lg:mb-14">
          <h1 className="text-4xl md:text-5xl xl:text-7xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight text-center lg:text-left">
            4 easy steps to
            <span className="text-primary"> Transfer to India </span>
          </h1>
        </article>

        {/* Steps and Content Section */}
        <article className="grid items-start justify-center gap-8 lg:grid-cols-3 lg:gap-8">
          {/* Steps List (Left Side) */}
          <div className="w-full lg:w-auto">
            <div className="rounded-[30px] bg-white dark:bg-gray-800 p-6 md:p-10 shadow-md">
              <ul className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-4 lg:gap-0">
                {stepsData.map((step, index) => {
                  const isActive = activeIndex === index;
                  const isCurrentlyAnimating = isActive && isAnimating;

                  return (
                    <li
                      key={step.id}
                      className={`relative shrink-0 lg:shrink lg:pb-8 ${
                        index === stepsData.length - 1 ? "lg:pb-0" : "md:pb-10" // Remove bottom padding for last item on large screens
                      }`}
                    >
                      <button
                        onClick={() => handleStepClick(index)}
                        className="z-10 flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-5 bg-transparent w-full text-left group" // Use group for potential hover effects
                        aria-current={isActive ? "step" : undefined}
                      >
                        {/* Icon SVG Container */}
                        <div className="relative">
                          <svg
                            width="54"
                            height="54"
                            viewBox="0 0 54 54"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-colors duration-500 ${
                              isActive
                                ? "text-mainheading dark:text-primary"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {/* Base Rect */}
                            <rect
                              x="1"
                              y="1"
                              width="52"
                              height="52"
                              rx="12"
                              className={`transition-colors duration-500 ${
                                isActive
                                  ? "stroke-[#EAECF0] dark:stroke-gray-600"
                                  : "stroke-[#EAECF0] dark:stroke-gray-700"
                              }`}
                              strokeWidth="2"
                              fill={
                                isActive
                                  ? "white dark:bg-gray-800"
                                  : "transparent"
                              } // Optional: Fill background when active
                            />
                            {/* Icon Image */}
                            <image
                              href={
                                isActive ? step.iconActive : step.iconDefault
                              } // Use active or default icon
                              width="24"
                              height="24"
                              x="15"
                              y="15" // Center the 24x24 icon in 54x54 svg
                              className={`transition-opacity duration-500 ${
                                isActive
                                  ? "opacity-100"
                                  : "opacity-50 group-hover:opacity-75"
                              }`}
                            />
                            {/* Animated Border Path */}
                            <path
                              d="M 27,1 H 41 A 12,12 0 0 1 53,13 V 41 A 12,12 0 0 1 41,53 H 13 A 12,12 0 0 1 1,41 V 13 A 12,12 0 0 1 13,1 H 27 Z"
                              stroke={isActive ? "currentColor" : "none"} // Use text color for active border, none otherwise
                              strokeWidth="2"
                              fill="none"
                              strokeDasharray="208" // Match this in CSS keyframes
                              strokeDashoffset="208" // Initial state (hidden)
                              // Apply animation class only when this step is active AND animating
                              className={
                                isCurrentlyAnimating
                                  ? "animate-border-draw"
                                  : "border-path-reset"
                              }
                            />
                          </svg>
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col items-center lg:items-start gap-1 mt-2 lg:mt-0">
                          <h3
                            className={`text-center lg:text-left text-base font-semibold leading-tight transition-colors duration-500 md:text-lg ${
                              isActive
                                ? "text-gray-800 dark:text-white"
                                : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-center lg:text-left text-sm font-normal transition-colors duration-500 md:text-base ${
                              isActive
                                ? "text-gray-600 dark:text-gray-300"
                                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
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

          {/* Content Area (Right Side) */}
          <div className="relative flex lg:col-span-2 lg:block lg:self-stretch h-[450px] md:h-[500px] lg:h-auto min-h-[450px] md:min-h-[500px] lg:min-h-[400px]">
            {/* Use key to force re-render on change, triggering animations */}
            <div
              key={activeIndex}
              className="absolute inset-0 flex flex-col justify-center rounded-[30px] bg-white dark:bg-gray-800 shadow-md p-6 lg:p-10 animate-in fade-in duration-700" // Animate content fade-in
            >
              {/* Text Content */}
              <div className="space-y-3 animate-in  slide-in-from-top-5 duration-500 z-50">
                <h3 className="text-2xl lg:text-3xl font-semibold text-secondary">
                  {currentStep.contentTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentStep.contentSubtitle}
                </p>
              </div>

              {/* Images Container */}
              <div className="relative mt-6 h-[250px] sm:h-[300px] lg:h-[550px] flex justify-center lg:justify-start">
                {/* Ensure images are positioned correctly, maybe adjust absolute/relative positioning as needed */}
                <div className="absolute bottom-0 left-0 lg:left-10 w-[180px] sm:w-[220px] md:w-[250px] lg:w-auto animate-in slide-in-from-bottom-10 duration-700 delay-200">
                  <Image
                    src={currentStep.contentImage1}
                    alt={`${currentStep.contentTitle} illustration 1`}
                    width={280} // Adjust based on actual image size/desired display
                    height={400} // Adjust based on actual image size/desired display
                    style={{
                      width: "auto",
                      height: "auto",
                      maxHeight: "350px",
                    }} // Allow natural sizing up to a max height
                    priority={activeIndex === 0} // Prioritize loading the first image
                  />
                </div>

                {/* Image 2 */}
                {currentStep.contentImage2 && (
                  <div className="absolute bottom-0 right-0 w-[180px] sm:w-[240px] md:w-[300px] lg:w-[350px] xl:w-[412px] animate-in slide-in-from-right-10 duration-700 delay-300">
                    <Image
                      src={currentStep.contentImage2}
                      alt={`${currentStep.contentTitle} illustration 2`}
                      width={412} // Adjust based on actual image size/desired display
                      height={300} // Adjust based on actual image size/desired display
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "300px",
                      }} // Responsive width
                      priority={activeIndex === 0}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default TransferSteps;
