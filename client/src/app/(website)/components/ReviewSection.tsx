// "use client";

// import React, { useState, useMemo } from "react";
// import UsaFlag from "./flags/UsaFlag";
// import ItalyFlag from "./flags/ItalyFlag";
// import UkFlag from "./flags/UkFlag";
// import DenmarkFlag from "./flags/DenmarkFlag";

// // Icons for arrows (using Heroicons as an example)
// const ArrowLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//     />
//   </svg>
// );

// const ArrowRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//     />
//   </svg>
// );

// const XCircleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// );

// interface Review {
//   id: number;
//   flagComponent: React.ElementType;
//   quote: string;
//   name: string;
//   bgColorClass: string;
//   textColorClass: string;
//   buttonClasses: string; // Combined button styling
// }

// const reviewsData: Review[] = [
//   {
//     id: 1,
//     flagComponent: UsaFlag,
//     quote:
//       "They make our life split between two continents possible. Transfers are simple and very, very fast.",
//     name: "Stuart",
//     bgColorClass: "bg-lime-300",
//     textColorClass: "text-black",
//     buttonClasses: "bg-green-700 hover:bg-green-800 text-white",
//   },
//   {
//     id: 2,
//     flagComponent: ItalyFlag,
//     quote:
//       "Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers.",
//     name: "Megan",
//     bgColorClass: "bg-green-700",
//     textColorClass: "text-white",
//     buttonClasses: "bg-lime-300 hover:bg-lime-400 text-green-800",
//   },
//   {
//     id: 3,
//     flagComponent: UkFlag,
//     quote:
//       "I use Wise to pay a mortgage in a different country each month. Superb. That simple.",
//     name: "Gerald",
//     bgColorClass: "bg-lime-300",
//     textColorClass: "text-black",
//     buttonClasses: "bg-green-700 hover:bg-green-800 text-white",
//   },
//   {
//     id: 4,
//     flagComponent: UsaFlag, // US flag for Gemma as per screenshot
//     quote:
//       "The best money travel buddy! Wise makes finances easier to deal with instantly.",
//     name: "Gemma",
//     bgColorClass: "bg-green-700",
//     textColorClass: "text-white",
//     buttonClasses: "bg-lime-300 hover:bg-lime-400 text-green-800",
//   },
//   {
//     id: 5,
//     flagComponent: DenmarkFlag,
//     quote:
//       "Wise has been a lifesaver for me as a student in a foreign country.",
//     name: "Stefani",
//     bgColorClass: "bg-lime-300",
//     textColorClass: "text-black",
//     buttonClasses: "bg-green-700 hover:bg-green-800 text-white",
//   },
// ];

// const CARD_WIDTH_REM = 22; // w-80 is 20rem, plus some for potential negative margins if needed for overlap. Let's use w-[22rem]
// const CARD_MARGIN_REM = 1.5; // Corresponds to gap-x-6 or mr-6
// const SLIDE_AMOUNT_REM = CARD_WIDTH_REM + CARD_MARGIN_REM; // This is the amount to slide by in rem

// const ReviewSection: React.FC = () => {
//   const [currentOffset, setCurrentOffset] = useState(0); // How many cards are "hidden" to the left
//   const [cardScales, setCardScales] = useState<number[]>(() =>
//     reviewsData.map(() => 1)
//   );

//   const handleNext = () => {
//     if (currentOffset < reviewsData.length - 1) {
//       const newCardScales = [...cardScales];
//       newCardScales[currentOffset] = 0; // Scale down the current leftmost visible card
//       setCardScales(newCardScales);
//       setCurrentOffset(currentOffset + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentOffset > 0) {
//       const newCardScales = [...cardScales];
//       newCardScales[currentOffset - 1] = 1; // Scale up the card that will become visible
//       setCardScales(newCardScales);
//       setCurrentOffset(currentOffset - 1);
//     }
//   };

//   const isPrevDisabled = currentOffset === 0;
//   const isNextDisabled = currentOffset >= reviewsData.length - 1;

//   // Memoize the transform style to prevent unnecessary re-renders of the inner container
//   const innerContainerStyle = useMemo(
//     () => ({
//       transform: `translateX(-${currentOffset * SLIDE_AMOUNT_REM}rem)`,
//     }),
//     [currentOffset]
//   );

//   return (
//     <section className="py-12 md:py-20 bg-white w-full">
//       {/* top part */}
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-12">
//           <div className="mb-8 lg:mb-0">
//             <div className="flex items-center mb-1 text-sm text-gray-600">
//               <svg
//                 className="w-5 h-5 text-green-500 mr-1"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//               </svg>
//               <span>4.2 on Trustpilot</span>
//               <span className="mx-1">·</span>
//               <span>207,486 reviews</span>
//             </div>
//             <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight">
//               FOR PEOPLE
//               <br />
//               GOING PLACES
//             </h2>
//           </div>
//           <div className="flex space-x-3">
//             <button
//               onClick={handlePrev}
//               disabled={isPrevDisabled}
//               className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200
//                           ${
//                             isPrevDisabled
//                               ? "bg-gray-200 cursor-not-allowed"
//                               : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                           }`}
//               aria-label="Previous review"
//             >
//               {isPrevDisabled ? (
//                 <XCircleIcon className="w-7 h-7 text-red-400" />
//               ) : (
//                 <ArrowLeftIcon className="w-6 h-6" />
//               )}
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={isNextDisabled}
//               className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200
//                           ${
//                             isNextDisabled
//                               ? "bg-gray-200 cursor-not-allowed"
//                               : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                           }`}
//               aria-label="Next review"
//             >
//               {isNextDisabled ? (
//                 <XCircleIcon className="w-7 h-7 text-red-400" />
//               ) : (
//                 <ArrowRightIcon className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>

//           {/* bottom part */}
//         <div className="overflow-hidden">
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={innerContainerStyle}
//           >
//             {reviewsData.map((review, index) => {
//               const Flag = review.flagComponent;
//               return (
//                 <div
//                   key={review.id}
//                   className={`flex-shrink-0 rounded-3xl p-6 md:p-8
//                               transition-all duration-500 ease-in-out
//                               w-[${CARD_WIDTH_REM}rem]
//                               ${
//                                 index !== reviewsData.length - 1
//                                   ? `mr-${(CARD_MARGIN_REM * 4) / 1.5} `
//                                   : ""
//                               } // mr-6 essentially for gap
//                               ${review.bgColorClass} ${review.textColorClass}`}
//                   style={{
//                     transform: `scale(${cardScales[index]})`,
//                     transformOrigin: "center", // Ensure scaling happens from center
//                     opacity: cardScales[index] === 0 ? 0 : 1,
//                     // If scaled to 0, it shouldn't be interactive.
//                     pointerEvents: cardScales[index] === 0 ? "none" : "auto",
//                   }}
//                 >
//                   <div className="flex flex-col h-full">
//                     <Flag className="w-10 h-10 md:w-12 md:h-12 mb-6" />
//                     <p className="text-lg md:text-xl font-medium mb-6 flex-grow">
//                       "{review.quote}"
//                     </p>
//                     <button
//                       className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 ${review.buttonClasses}`}
//                     >
//                       {review.name} on Trustpilot
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewSection;

// "use client";
// import React, { useState, useMemo } from "react";
// import UsaFlag from "./flags/UsaFlag";
// import ItalyFlag from "./flags/ItalyFlag";
// import UkFlag from "./flags/UkFlag";
// import DenmarkFlag from "./flags/DenmarkFlag";

// // Icons for arrows
// const ArrowLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//     />
//   </svg>
// );

// const ArrowRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//     />
//   </svg>
// );

// const XCircleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// );

// interface Review {
//   id: number;
//   flagComponent: React.ElementType;
//   quote: string;
//   name: string;
//   bgColorClass: string;
//   textColorClass: string;
//   buttonClasses: string;
//   trustpilotLink: string; // Added for the button link
// }

// const reviewsData: Review[] = [
//   {
//     id: 1,
//     flagComponent: UsaFlag,
//     quote:
//       "They make our life split between two continents possible. Transfers are simple and very, very fast.",
//     name: "Stuart",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-black",
//     buttonClasses: "bg-green-700 hover:bg-green-800 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5", // Example link
//   },
//   {
//     id: 2,
//     flagComponent: ItalyFlag,
//     quote:
//       "Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers.",
//     name: "Megan",
//     bgColorClass: "bg-green-700",
//     textColorClass: "text-white",
//     buttonClasses: "bg-primarybox hover:bg-lime-400 text-green-800",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 3,
//     flagComponent: UkFlag,
//     quote:
//       "I use Wise to pay a mortgage in a different country each month. Superb. That simple.",
//     name: "Gerald",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-black",
//     buttonClasses: "bg-green-700 hover:bg-green-800 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 4,
//     flagComponent: UsaFlag, // US flag for Gemma as per Wise's design
//     quote:
//       "The best money travel buddy! Wise makes finances easier to deal with instantly.",
//     name: "Gemma",
//     bgColorClass: "bg-green-700",
//     textColorClass: "text-white",
//     buttonClasses: "bg-primarybox hover:bg-lime-400 text-green-800",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 5,
//     flagComponent: DenmarkFlag,
//     quote:
//       "Wise has been a lifesaver for me as a student in a foreign country.",
//     name: "Stefani",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-black",
//     buttonClasses: "bg-green-700 hover:bg-green-800 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
// ];

// const CARD_WIDTH_REM_VALUE = 21; // For w-[21rem] (336px approx)
// const CARD_MARGIN_REM_VALUE = 1.5; // For mr-6 (24px approx)
// const SLIDE_AMOUNT_REM = CARD_WIDTH_REM_VALUE + CARD_MARGIN_REM_VALUE; // 22.5rem

// const ReviewSection: React.FC = () => {
//   const [currentOffset, setCurrentOffset] = useState(0);
//   const [cardScales, setCardScales] = useState<number[]>(() =>
//     reviewsData.map(() => 1)
//   );

//   const handleNext = () => {
//     if (currentOffset < reviewsData.length - 1) {
//       // Stop if last card is already the only one "potentially" visible by offset
//       const newCardScales = [...cardScales];
//       if (currentOffset < reviewsData.length) {
//         // Ensure we don't access out of bounds
//         newCardScales[currentOffset] = 0; // Scale down the current leftmost card that's being hidden
//       }
//       setCardScales(newCardScales);
//       setCurrentOffset(currentOffset + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentOffset > 0) {
//       const newCardScales = [...cardScales];
//       if (currentOffset - 1 >= 0) {
//         // Ensure we don't access out of bounds
//         newCardScales[currentOffset - 1] = 1; // Scale up the card that will become visible
//       }
//       setCardScales(newCardScales);
//       setCurrentOffset(currentOffset - 1);
//     }
//   };

//   const isPrevDisabled = currentOffset === 0;
//   // Next should be disabled when showing the last card as the *primary* card,
//   // meaning `reviewsData.length - (number of cards visible in viewport)`
//   // For simplicity here, disable when the last card is at the start of the visible cards,
//   // or more accurately, when no more cards can be brought in from the right.
//   // The video shows the carousel stopping when the last card is the only one visible on screen.
//   // This means the effective length for "next" is when currentOffset makes the last card the first one to *potentially* be scaled.
//   // If we assume a viewport can show ~1 full card (due to scaling others), then length-1 is fine.
//   // If viewport always shows more, this needs adjustment. The video seems to allow scrolling until only the last card is left, full scale.
//   // The animation implies one card is "lost" to scale 0 at a time.
//   const isNextDisabled = currentOffset >= reviewsData.length - 1;

//   const innerContainerStyle = useMemo(
//     () => ({
//       transform: `translateX(-${currentOffset * SLIDE_AMOUNT_REM}rem)`,
//     }),
//     [currentOffset]
//   );

//   return (
//     <section className="py-10 md:py-16 bg-background w-full">
//       {" "}
//       {/* Increased padding slightly */}
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row lg:space-x-10 xl:space-x-16">
//           {/* Left Column: Title and Navigation */}
//           <div className="lg:w-[35%] xl:w-[30%] mb-10 lg:mb-0">
//             <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-mainheadingWhite">
//               Real Stories,{" "}
//               <span className="text-primary capitalize">Real Trust</span>
//             </h3>

//             <p className="text-subheadingWhite lg:text-lg text-base leading-6 mb-4">
//               From quick account setup to secure global transfers, thousands
//               rely on us every day. Real experiences from real people proof that
//               your money is in trusted hands.
//             </p>

//             <div className="flex space-x-3">
//               <button
//                 onClick={handlePrev}
//                 disabled={isPrevDisabled}
//                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
//                             ${
//                               isPrevDisabled
//                                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                 : "bg-gray-100 hover:bg-gray-200 text-gray-800"
//                             }`}
//                 aria-label="Previous review"
//               >
//                 {isPrevDisabled ? (
//                   <XCircleIcon className="w-7 h-7 text-red-300" />
//                 ) : (
//                   <ArrowLeftIcon className="w-6 h-6" />
//                 )}
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={isNextDisabled}
//                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
//                             ${
//                               isNextDisabled
//                                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                 : "bg-gray-100 hover:bg-gray-200 text-gray-800"
//                             }`}
//                 aria-label="Next review"
//               >
//                 {isNextDisabled ? (
//                   <XCircleIcon className="w-7 h-7 text-red-300" />
//                 ) : (
//                   <ArrowRightIcon className="w-6 h-6" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Right Column: Review Cards Carousel */}
//           <div className="lg:w-[65%] xl:w-[70%]">
//             <div className="overflow-hidden">
//               {" "}
//               {/* This is the viewport */}
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={innerContainerStyle}
//               >
//                 {reviewsData.map((review, index) => {
//                   const Flag = review.flagComponent;
//                   return (
//                     <div
//                       key={review.id}
//                       className={`flex-shrink-0 rounded-3xl p-6 md:p-8
//                                   transition-all duration-500 ease-in-out
//                                   w-[${CARD_WIDTH_REM_VALUE}rem]
//                                   ${
//                                     index !== reviewsData.length - 1
//                                       ? "mr-6"
//                                       : ""
//                                   }
//                                   ${review.bgColorClass} ${
//                         review.textColorClass
//                       }`}
//                       style={{
//                         transform: `scale(${cardScales[index]})`,
//                         transformOrigin: "center",
//                         opacity: cardScales[index] === 0 ? 0 : 1,
//                         visibility:
//                           cardScales[index] === 0 ? "hidden" : "visible",
//                         pointerEvents:
//                           cardScales[index] === 0 ? "none" : "auto",
//                       }}
//                     >
//                       <div className="flex flex-col h-full">
//                         {" "}
//                         {/* Ensure card content uses full height */}
//                         <Flag className="w-10 h-10 md:w-12 md:h-12 mb-6" />
//                         <p className="text-lg md:text-xl font-medium mb-6 flex-grow">
//                           "{review.quote}"
//                         </p>
//                         <a
//                           href={review.trustpilotLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={`inline-block px-5 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 ${review.buttonClasses}`}
//                         >
//                           {review.name} on Trustpilot
//                         </a>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewSection;

// "use client";
// import React, { useState, useMemo } from "react";

// // Placeholder Flag Components (replace with your actual flag components)
// const PlaceholderFlag = ({ className, label }: { className?: string, label: string }) => (
//   <div
//     className={`${className} flex items-center justify-center border border-gray-400 bg-gray-200 text-gray-700`}
//     style={{ borderRadius: '50%'}} // Assuming flags are circular
//   >
//     {label}
//   </div>
// );
// const UsaFlag = ({ className }: { className?: string }) => <PlaceholderFlag className={className} label="US" />;
// const ItalyFlag = ({ className }: { className?: string }) => <PlaceholderFlag className={className} label="IT" />;
// const UkFlag = ({ className }: { className?: string }) => <PlaceholderFlag className={className} label="UK" />;
// const DenmarkFlag = ({ className }: { className?: string }) => <PlaceholderFlag className={className} label="DK" />;

// // Icons for arrows
// const ArrowLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
//   </svg>
// );
// const ArrowRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
//   </svg>
// );
// const XCircleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// interface Review {
//   id: number;
//   flagComponent: React.ElementType;
//   quote: string;
//   name: string;
//   bgColorClass: string;
//   textColorClass: string;
//   buttonClasses: string;
//   trustpilotLink: string;
// }

// const reviewsData: Review[] = [
//   {
//     id: 1,
//     flagComponent: UsaFlag,
//     quote: "They make our life split between two continents possible. Transfers are simple and very, very fast.",
//     name: "Stuart",
//     bgColorClass: "bg-slate-700", // Darker gray for primarybox
//     textColorClass: "text-white",
//     buttonClasses: "bg-green-500 hover:bg-green-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 2,
//     flagComponent: ItalyFlag,
//     quote: "Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers.",
//     name: "Megan",
//     bgColorClass: "bg-green-600", // Green card
//     textColorClass: "text-white",
//     buttonClasses: "bg-slate-700 hover:bg-slate-600 text-white", // Dark button on green card
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 3,
//     flagComponent: UkFlag,
//     quote: "I use Wise to pay a mortgage in a different country each month. Superb. That simple.",
//     name: "Gerald",
//     bgColorClass: "bg-slate-700",
//     textColorClass: "text-white",
//     buttonClasses: "bg-green-500 hover:bg-green-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 4,
//     flagComponent: UsaFlag,
//     quote: "The best money travel buddy! Wise makes finances easier to deal with instantly.",
//     name: "Gemma",
//     bgColorClass: "bg-green-600",
//     textColorClass: "text-white",
//     buttonClasses: "bg-slate-700 hover:bg-slate-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 5,
//     flagComponent: DenmarkFlag,
//     quote: "Wise has been a lifesaver for me as a student in a foreign country.",
//     name: "Stefani",
//     bgColorClass: "bg-slate-700",
//     textColorClass: "text-white",
//     buttonClasses: "bg-green-500 hover:bg-green-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
// ];

// const CARD_WIDTH_REM_VALUE = 21;
// const CARD_MARGIN_REM_VALUE = 1.5; // Corresponds to mr-6
// const SLIDE_AMOUNT_REM = CARD_WIDTH_REM_VALUE + CARD_MARGIN_REM_VALUE;

// // Define theme colors (replace with your actual Tailwind theme definitions if they come from config)
// const themeColors = {
//   mainheadingWhite: "text-white",
//   subheadingWhite: "text-slate-300", // Lighter gray for subheading
//   primary: "text-sky-400",          // Example: A bright blue for "Real Trust"
//   background: "bg-slate-800",       // Dark background for the section
// };

// const ReviewSection: React.FC = () => {
//   const [currentOffset, setCurrentOffset] = useState(0);
//   const [cardScales, setCardScales] = useState<number[]>(() =>
//     reviewsData.map(() => 1) // All cards start at full scale
//   );

//   const handleNext = () => {
//     // `currentOffset` is the index of the card currently at the "start" of the track.
//     // We want to scale this card down as it slides out.
//     if (currentOffset < reviewsData.length - 1) { // Ensure there's a card to slide to
//       const indexOfCardToScaleDown = currentOffset;
//       setCardScales(prevScales =>
//         prevScales.map((scale, index) =>
//           index === indexOfCardToScaleDown ? 0 : scale // Scale down the target card
//         )
//       );
//       setCurrentOffset(prevOffset => prevOffset + 1);
//     }
//   };

//   const handlePrev = () => {
//     // `currentOffset - 1` is the index of the card that was previously scaled down
//     // and is now coming back into view. We want to scale it up.
//     if (currentOffset > 0) { // Ensure there's a card to slide back to
//       const indexOfCardToScaleUp = currentOffset - 1;
//       setCardScales(prevScales =>
//         prevScales.map((scale, index) =>
//           index === indexOfCardToScaleUp ? 1 : scale // Scale up the target card
//         )
//       );
//       setCurrentOffset(prevOffset => prevOffset - 1);
//     }
//   };

//   const isPrevDisabled = currentOffset === 0;
//   // Disable "Next" when the currentOffset means the last card is already the primary visible one,
//   // or more accurately, when no more new cards can be brought in from the right.
//   // If currentOffset is reviewsData.length - 1, the last card is at the start.
//   const isNextDisabled = currentOffset >= reviewsData.length - 1;

//   const innerContainerStyle = useMemo(
//     () => ({
//       transform: `translateX(-${currentOffset * SLIDE_AMOUNT_REM}rem)`,
//       willChange: 'transform', // Hint for browser optimization
//     }),
//     [currentOffset]
//   );

//   const cardWidthClass = `w-[${CARD_WIDTH_REM_VALUE}rem]`;

//   return (
//     <section className={`py-10 md:py-16 ${themeColors.background} w-full overflow-hidden relative`}>
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row lg:space-x-10 xl:space-x-16">
//           {/* Left Column: Title and Navigation */}
//           <div className="lg:w-[35%] xl:w-[30%] mb-10 lg:mb-0 relative z-10"> {/* Ensure text is above cards if overlap */}
//             <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight ${themeColors.mainheadingWhite}`}>
//               Real Stories,{" "}
//               <span className={`${themeColors.primary} capitalize`}>Real Trust</span>
//             </h3>
//             <p className={`${themeColors.subheadingWhite} lg:text-lg text-base leading-relaxed mb-6`}>
//               From quick account setup to secure global transfers, thousands
//               rely on us every day. Real experiences from real people proof that
//               your money is in trusted hands.
//             </p>
//             <div className="flex space-x-3">
//               <button
//                 onClick={handlePrev}
//                 disabled={isPrevDisabled}
//                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
//                             ${isPrevDisabled
//                                 ? "bg-slate-600 text-slate-400 cursor-not-allowed"
//                                 : "bg-slate-200 hover:bg-slate-300 text-slate-800 active:bg-slate-400"
//                             }`}
//                 aria-label="Previous review"
//               >
//                 {isPrevDisabled ? <XCircleIcon className="w-7 h-7 text-red-400" /> : <ArrowLeftIcon className="w-6 h-6" />}
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={isNextDisabled}
//                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
//                             ${isNextDisabled
//                                 ? "bg-slate-600 text-slate-400 cursor-not-allowed"
//                                 : "bg-slate-200 hover:bg-slate-300 text-slate-800 active:bg-slate-400"
//                             }`}
//                 aria-label="Next review"
//               >
//                 {isNextDisabled ? <XCircleIcon className="w-7 h-7 text-red-400" /> : <ArrowRightIcon className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>

//           {/* Right Column: Review Cards Carousel */}
//           <div className="lg:w-[65%] xl:w-[70%]">
//             {/* The track that slides. No overflow-hidden here. */}
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={innerContainerStyle}
//             >
//               {reviewsData.map((review, index) => {
//                 const Flag = review.flagComponent;
//                 return (
//                   <div
//                     key={review.id}
//                     className={`flex-shrink-0 rounded-3xl p-6 md:p-8
//                                 transition-all duration-500 ease-in-out
//                                 ${cardWidthClass}
//                                 ${index !== reviewsData.length - 1 ? "mr-6" : ""}
//                                 ${review.bgColorClass} ${review.textColorClass}`}
//                     style={{
//                       transform: `scale(${cardScales[index]})`,
//                       transformOrigin: "center", // Scale from center. Use "left" if card should peel from left.
//                       opacity: cardScales[index], // Opacity directly linked to scale (0 or 1)
//                       visibility: cardScales[index] === 0 ? "hidden" : "visible",
//                       pointerEvents: cardScales[index] === 0 ? "none" : "auto",
//                       willChange: 'transform, opacity', // Hint for browser optimization
//                     }}
//                   >
//                     <div className="flex flex-col h-full">
//                       <Flag className="w-10 h-10 md:w-12 md:h-12 mb-6" />
//                       <p className="text-base md:text-lg font-medium mb-6 flex-grow leading-relaxed">
//                         "{review.quote}"
//                       </p>
//                       <a
//                         href={review.trustpilotLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={`inline-block self-start px-5 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 ${review.buttonClasses}`}
//                       >
//                         {review.name} on Trustpilot
//                       </a>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewSection;

// "use client";
// import React, { useState, useMemo } from "react";

// // Placeholder Flag Components (replace with your actual flag components)
// const PlaceholderFlag = ({
//   className,
//   label,
// }: {
//   className?: string;
//   label: string;
// }) => (
//   <div
//     className={`${className} flex items-center justify-center border border-gray-400 bg-gray-200 text-gray-700`}
//     style={{ borderRadius: "50%" }} // Assuming flags are circular
//   >
//     {label}
//   </div>
// );
// const UsaFlag = ({ className }: { className?: string }) => (
//   <PlaceholderFlag className={className} label="US" />
// );
// const ItalyFlag = ({ className }: { className?: string }) => (
//   <PlaceholderFlag className={className} label="IT" />
// );
// const UkFlag = ({ className }: { className?: string }) => (
//   <PlaceholderFlag className={className} label="UK" />
// );
// const DenmarkFlag = ({ className }: { className?: string }) => (
//   <PlaceholderFlag className={className} label="DK" />
// );

// // Icons for arrows
// const ArrowLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//     />
//   </svg>
// );
// const ArrowRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//     />
//   </svg>
// );

// interface Review {
//   id: number;
//   flagComponent: React.ElementType;
//   quote: string;
//   name: string;
//   bgColorClass: string;
//   textColorClass: string;
//   buttonClasses: string;
//   trustpilotLink: string;
// }

// const reviewsData: Review[] = [
//   {
//     id: 1,
//     flagComponent: UsaFlag,
//     quote:
//       "They make our life split between two continents possible. Transfers are simple and very, very fast.",
//     name: "Stuart",
//     bgColorClass: "bg-slate-700", // Darker gray for primarybox
//     textColorClass: "text-white",
//     buttonClasses: "bg-green-500 hover:bg-green-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 2,
//     flagComponent: ItalyFlag,
//     quote:
//       "Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers.",
//     name: "Megan",
//     bgColorClass: "bg-green-600", // Green card
//     textColorClass: "text-white",
//     buttonClasses: "bg-slate-700 hover:bg-slate-600 text-white", // Dark button on green card
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 3,
//     flagComponent: UkFlag,
//     quote:
//       "I use Wise to pay a mortgage in a different country each month. Superb. That simple.",
//     name: "Gerald",
//     bgColorClass: "bg-slate-700",
//     textColorClass: "text-white",
//     buttonClasses: "bg-green-500 hover:bg-green-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 4,
//     flagComponent: UsaFlag,
//     quote:
//       "The best money travel buddy! Wise makes finances easier to deal with instantly.",
//     name: "Gemma",
//     bgColorClass: "bg-green-600",
//     textColorClass: "text-white",
//     buttonClasses: "bg-slate-700 hover:bg-slate-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 5,
//     flagComponent: DenmarkFlag,
//     quote:
//       "Wise has been a lifesaver for me as a student in a foreign country.",
//     name: "Stefani",
//     bgColorClass: "bg-slate-700",
//     textColorClass: "text-white",
//     buttonClasses: "bg-green-500 hover:bg-green-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
// ];

// const CARD_WIDTH_REM_VALUE = 21;
// const CARD_MARGIN_REM_VALUE = 1.5; // Corresponds to mr-6
// const SLIDE_AMOUNT_REM = CARD_WIDTH_REM_VALUE + CARD_MARGIN_REM_VALUE;

// // Define theme colors (replace with your actual Tailwind theme definitions if they come from config)
// const themeColors = {
//   mainheadingWhite: "text-white",
//   subheadingWhite: "text-slate-300", // Lighter gray for subheading
//   primary: "text-sky-400", // Example: A bright blue for "Real Trust"
//   background: "bg-slate-800", // Dark background for the section
// };

// const ReviewSection: React.FC = () => {
//   const [currentOffset, setCurrentOffset] = useState(0);
//   const [cardScales, setCardScales] = useState<number[]>(
//     () => reviewsData.map(() => 1) // All cards start at full scale
//   );

//   const handleNext = () => {
//     if (currentOffset < reviewsData.length - 1) {
//       const indexOfCardToScaleDown = currentOffset;
//       setCardScales((prevScales) =>
//         prevScales.map((scale, index) =>
//           index === indexOfCardToScaleDown ? 0 : scale
//         )
//       );
//       setCurrentOffset((prevOffset) => prevOffset + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentOffset > 0) {
//       const indexOfCardToScaleUp = currentOffset - 1;
//       setCardScales((prevScales) =>
//         prevScales.map((scale, index) =>
//           index === indexOfCardToScaleUp ? 1 : scale
//         )
//       );
//       setCurrentOffset((prevOffset) => prevOffset - 1);
//     }
//   };

//   const isPrevDisabled = currentOffset === 0;
//   const isNextDisabled = currentOffset >= reviewsData.length - 1;

//   const innerContainerStyle = useMemo(
//     () => ({
//       transform: `translateX(-${currentOffset * SLIDE_AMOUNT_REM}rem)`,
//       willChange: "transform",
//     }),
//     [currentOffset]
//   );

//   const cardWidthClass = `w-[${CARD_WIDTH_REM_VALUE}rem]`;

//   return (
//     <section
//       className={`py-10 md:py-16 bg-background w-full overflow-hidden relative`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row lg:space-x-10 xl:space-x-16">
//           {/* Left Column: Title and Navigation */}
//           <div className="lg:w-[35%] mb-10 lg:mb-0 relative z-10">
//             <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//               Real Stories,{" "}
//               <span className="text-primary capitalize">Real Trust</span>
//             </h3>

//             <p
//               className={`${themeColors.subheadingWhite} lg:text-lg text-base leading-relaxed mb-6`}
//             >
//               From quick account setup to secure global transfers, thousands
//               rely on us every day. Real experiences from real people proof that
//               your money is in trusted hands.
//             </p>
//             <div className="flex space-x-3">
//               <button
//                 onClick={handlePrev}
//                 disabled={isPrevDisabled}
//                 className={`size-12 cursor-pointer rounded-full flex items-center justify-center transition-all duration-150 ease-linear
//                             ${
//                               isPrevDisabled
//                                 ? "bg-primarybox/50 text-subheadingWhite cursor-not-allowed"
//                                 : "bg-primarybox text-white"
//                             }`}
//                 aria-label="Previous review"
//               >
//                 <ArrowLeftIcon className="size-5" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={isNextDisabled}
//                 className={`size-12 cursor-pointer rounded-full flex items-center justify-center transition-all duration-150 ease-linear
//                             ${
//                               isNextDisabled
//                                 ? "bg-primarybox/50 text-subheadingWhite cursor-not-allowed"
//                                 : "bg-primarybox text-white"
//                             }`}
//                 aria-label="Next review"
//               >
//                 <ArrowRightIcon className="size-5" />
//               </button>
//             </div>
//           </div>

//           {/* Right Column: Review Cards Carousel */}
//           <div className="lg:w-[65%]">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={innerContainerStyle}
//             >
//               {reviewsData.map((review, index) => {
//                 const Flag = review.flagComponent;
//                 return (
//                   <div
//                     key={review.id}
//                     className={`flex-shrink-0 rounded-3xl p-6 md:p-8
//                                 transition-all duration-500 ease-in-out
//                                 ${cardWidthClass}
//                                 ${
//                                   index !== reviewsData.length - 1 ? "mr-6" : ""
//                                 }
//                                 ${review.bgColorClass} ${
//                       review.textColorClass
//                     }`}
//                     style={{
//                       transform: `scale(${cardScales[index]})`,
//                       transformOrigin: "right", // MODIFIED: Ensures consistent spacing with right neighbor
//                       opacity: cardScales[index],
//                       // visibility: cardScales[index] === 0 ? "hidden" : "visible", // REMOVED: Rely on opacity/scale
//                       pointerEvents: cardScales[index] === 0 ? "none" : "auto",
//                       willChange: "transform, opacity",
//                     }}
//                   >
//                     <div className="flex flex-col h-full">
//                       <Flag className="w-10 h-10 md:w-12 md:h-12 mb-6" />
//                       <p className="text-base md:text-lg font-medium mb-6 flex-grow leading-relaxed">
//                         "{review.quote}"
//                       </p>
//                       <a
//                         href={review.trustpilotLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={`inline-block self-start px-5 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 ${review.buttonClasses}`}
//                       >
//                         {review.name} on Trustpilot
//                       </a>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewSection;

// "use client";
// import React, { useState, useMemo } from "react";
// import Image from "next/image"; // Import Next.js Image component

// // Icons for arrows
// const ArrowLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//     />
//   </svg>
// );
// const ArrowRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//     />
//   </svg>
// );

// interface Review {
//   id: number;
//   flagImageSrc: string;
//   flagImageAlt: string;
//   quote: string;
//   name: string;
//   bgColorClass: string;
//   textColorClass: string;
//   buttonClasses: string;
//   trustpilotLink: string;
// }

// const reviewsData: Review[] = [
//   {
//     id: 1,
//     flagImageSrc: "../assets/icon/flags/aud.svg",
//     flagImageAlt: "USA Flag",
//     quote:
//       "They make our life split between two continents possible. Transfers are simple and very, very fast.",
//     name: "Stuart",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     buttonClasses: "bg-green-500 hover:bg-green-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 2,
//     flagImageSrc: "../assets/icon/flags/aud.svg",
//     flagImageAlt: "Italy Flag",
//     quote:
//       "Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers.",
//     name: "Megan",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     buttonClasses: "bg-primarybox hover:bg-slate-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 3,
//     flagImageSrc: "../assets/icon/flags/aud.svg",
//     flagImageAlt: "UK Flag",
//     quote:
//       "I use Wise to pay a mortgage in a different country each month. Superb. That simple.",
//     name: "Gerald",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     buttonClasses: "bg-green-500 hover:bg-green-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 4,
//     flagImageSrc: "../assets/icon/flags/aud.svg",
//     flagImageAlt: "USA Flag",
//     quote:
//       "The best money travel buddy! Wise makes finances easier to deal with instantly.",
//     name: "Gemma",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     buttonClasses: "bg-primarybox hover:bg-slate-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
//   {
//     id: 5,
//     flagImageSrc: "../assets/icon/flags/aud.svg",
//     flagImageAlt: "Denmark Flag",
//     quote:
//       "Wise has been a lifesaver for me as a student in a foreign country.",
//     name: "Stefani",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     buttonClasses: "bg-green-500 hover:bg-green-600 text-white",
//     trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
//   },
// ];

// const CARD_WIDTH_REM_VALUE = 21;
// const CARD_MARGIN_REM_VALUE = 1.5; // Corresponds to mr-6
// const SLIDE_AMOUNT_REM = CARD_WIDTH_REM_VALUE + CARD_MARGIN_REM_VALUE;

// const ReviewSection: React.FC = () => {
//   const [currentOffset, setCurrentOffset] = useState(0);
//   const [cardScales, setCardScales] = useState<number[]>(() =>
//     reviewsData.map(() => 1)
//   );

//   const handleNext = () => {
//     if (currentOffset < reviewsData.length - 1) {
//       const indexOfCardToScaleDown = currentOffset;
//       setCardScales((prevScales) =>
//         prevScales.map((scale, index) =>
//           index === indexOfCardToScaleDown ? 0 : scale
//         )
//       );
//       setCurrentOffset((prevOffset) => prevOffset + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentOffset > 0) {
//       const indexOfCardToScaleUp = currentOffset - 1;
//       setCardScales((prevScales) =>
//         prevScales.map((scale, index) =>
//           index === indexOfCardToScaleUp ? 1 : scale
//         )
//       );
//       setCurrentOffset((prevOffset) => prevOffset - 1);
//     }
//   };

//   const isPrevDisabled = currentOffset === 0;
//   const isNextDisabled = currentOffset >= reviewsData.length - 1;

//   const innerContainerStyle = useMemo(
//     () => ({
//       transform: `translateX(-${currentOffset * SLIDE_AMOUNT_REM}rem)`,
//       willChange: "transform",
//     }),
//     [currentOffset]
//   );

//   const cardWidthClass = `w-[${CARD_WIDTH_REM_VALUE}rem]`;

//   return (
//     <section
//       className={`py-10 md:py-18 bg-background w-full overflow-hidden relative`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row lg:space-x-10 xl:space-x-16">
//           <div className="lg:w-[35%] mb-10 lg:mb-0 relative z-10">
//             <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight text-mainheadingWhite">
//               Real Stories,{" "}
//               <span className="text-primary capitalize">Real Trust</span>
//             </h3>

//             <p className="text-subheadingWhite md:text-lg text-base mb-4">
//               From quick account setup to secure global transfers, thousands
//               rely on us every day. Real experiences from real people proof that
//               your money is in trusted hands.
//             </p>

//             <div className="flex space-x-3">
//               <button
//                 onClick={handlePrev}
//                 disabled={isPrevDisabled}
//                 className={`size-12 rounded-full flex items-center justify-center transition-all duration-150 ease-linear
//                             ${
//                               isPrevDisabled
//                                 ? "bg-primarybox/40 text-subheadingWhite cursor-not-allowed" // Assuming primarybox was slate-700 or similar
//                                 : "bg-primarybox cursor-pointer text-white " // Adjusted for consistency
//                             }`}
//                 aria-label="Previous review"
//               >
//                 <ArrowLeftIcon className="size-5" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={isNextDisabled}
//                 className={`size-12 rounded-full flex items-center justify-center transition-all duration-150 ease-linear
//                             ${
//                               isNextDisabled
//                                 ? "bg-primarybox/40 text-subheadingWhite cursor-not-allowed" // Assuming primarybox was slate-700 or similar
//                                 : "bg-primarybox cursor-pointer text-white " // Adjusted for consistency
//                             }`}
//                 aria-label="Next review"
//               >
//                 <ArrowRightIcon className="size-5" />
//               </button>
//             </div>
//           </div>

//           <div className="lg:w-[65%]">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={innerContainerStyle}
//             >
//               {reviewsData.map((review, index) => {
//                 return (
//                   <div
//                     key={review.id}
//                     className={`flex-shrink-0 rounded-3xl p-6 md:p-8
//                                 transition-all duration-500 ease-in-out
//                                 ${cardWidthClass}
//                                 ${
//                                   index !== reviewsData.length - 1 ? "mr-6" : ""
//                                 }
//                                 ${review.bgColorClass} ${
//                       review.textColorClass
//                     }`}
//                     style={{
//                       transform: `scale(${cardScales[index]})`,
//                       transformOrigin: "right",
//                       opacity: cardScales[index],
//                       pointerEvents: cardScales[index] === 0 ? "none" : "auto",
//                       willChange: "transform, opacity",
//                     }}
//                   >
//                     <div className="flex flex-col h-full">
//                       <Image
//                         src={review.flagImageSrc}
//                         alt={review.flagImageAlt}
//                         width={100} // Corresponds to w-12 (12 * 4px = 48px)
//                         height={100} // Corresponds to h-12
//                         className="size-12 sm:size-14 mb-6 rounded-full" // Added rounded-full for circular flags
//                       />

//                       <p className="text-base md:text-lg font-medium mb-6 flex-grow leading-relaxed">
//                         "{review.quote}"
//                       </p>

//                       <a
//                         href={review.trustpilotLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={`inline-block self-start px-5 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 ${review.buttonClasses}`}
//                       >
//                         {review.name} on Trustpilot
//                       </a>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewSection;

// "use client";
// import React, { useState, useMemo } from "react";
// import Image from "next/image"; // Import Next.js Image component

// // Icons for arrows
// const ArrowLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//     />
//   </svg>
// );
// const ArrowRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//     />
//   </svg>
// );

// // --- Trustpilot Helper Components (Copied from ClientTestimonialSection) ---

// // Trustpilot Logo Star Component (Flat Green)
// const TrustpilotLogoStar = ({ className }: { className?: string }) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="#00B67B" // Trustpilot Green
//     xmlns="http://www.w3.org/2000/svg"
//     className={className}
//     aria-hidden="true"
//   >
//     <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.432l-7.416 4.001 1.481-8.279-6.064-5.828 8.332-1.151L12 .587z" />
//   </svg>
// );

// // Single White Star Icon for Rating
// const SingleRatingStarIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="white"
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-full h-full" // Star fills its container
//     aria-hidden="true"
//   >
//     <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.432l-7.416 4.001 1.481-8.279-6.064-5.828 8.332-1.151L12 .587z" />
//   </svg>
// );

// // Rating Star Component (renders one of the 5 small stars)
// const RatingStar = ({
//   rating,
//   starIndex,
// }: {
//   rating: number;
//   starIndex: number;
// }) => {
//   const greenColor = "#00B67B";
//   const greyColor = "#DCDCE6"; // Light grey for empty part of background

//   let backgroundStyle: React.CSSProperties = {};
//   const starValue = starIndex + 1; // 1-indexed star

//   if (rating >= starValue) {
//     // Full star
//     backgroundStyle = { backgroundColor: greenColor };
//   } else if (rating > starIndex && rating < starValue) {
//     // Partial star
//     const percentage = (rating - starIndex) * 100;
//     backgroundStyle = {
//       background: `linear-gradient(to right, ${greenColor} ${percentage}%, ${greyColor} ${percentage}%)`,
//     };
//   } else {
//     // Empty star
//     backgroundStyle = { backgroundColor: greyColor };
//   }

//   return (
//     <div
//       className="w-5 h-5 sm:w-6 sm:h-6 mr-1 p-0.5 relative" // Square container for each star
//       style={backgroundStyle}
//     >
//       <SingleRatingStarIcon />
//     </div>
//   );
// };
// // --- End Trustpilot Helper Components ---

// interface Review {
//   id: number;
//   flagImageSrc: string;
//   flagImageAlt: string;
//   quote: string;
//   name: string;
//   bgColorClass: string;
//   textColorClass: string;
//   trustpilotRating: number; // Added for Trustpilot rating
// }

// const reviewsData: Review[] = [
//   {
//     id: 1,
//     flagImageSrc: "../assets/icon/flags/aud.svg", // Assuming these paths are correct relative to your public folder
//     flagImageAlt: "USA Flag", // Note: aud.svg usually means Australian Dollar, might be a placeholder
//     quote:
//       "Remityn has truly been a game-changer for me when it comes to sending money abroad. The platform is simple to use, fully transparent about fees.Transfers are quick, and I always feel secure knowing my money is in safe hands.",
//     name: "Stuart",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 5,
//   },
//   {
//     id: 2,
//     flagImageSrc: "../assets/icon/flags/gbp.svg", // Example: Changed to GBP
//     flagImageAlt: "UK Flag",
//     quote:
//       "Remityn offers a smooth, user-friendly experience with fast transfers and low fees. The USD to INR exchange rate is always fair and clearly shown. I've used the service several times, and it has never let me down highly recommended!",
//     name: "Megan",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 4.5,
//   },
//   {
//     id: 3,
//     flagImageSrc: "../assets/icon/flags/eur.svg", // Example: Changed to EUR
//     flagImageAlt: "Euro Flag",
//     quote:
//       "I’ve been using Remityn for my international money transfers, and I’m more than satisfied with their service. The process is fast, secure, and easy to navigate. My funds arrived earlier than expected, and the exchange rates were very competitive.",
//     name: "Gerald",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 5,
//   },
//   {
//     id: 4,
//     flagImageSrc: "../assets/icon/flags/usd.svg", // Example: Changed to USD
//     flagImageAlt: "USA Flag",
//     quote:
//       "The process is easy, and the transfer charges are comparatively lower than other services. The recipient receives the money in less than 10 minutes. Remityn is one of the best money transfer services I’ve used. I’ll definitely continue using it for all my future transfers.",
//     name: "Gemma",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 4.0,
//   },
//   {
//     id: 5,
//     flagImageSrc: "../assets/icon/flags/cad.svg", // Example: Changed to CAD
//     flagImageAlt: "Canada Flag",
//     quote:
//       "Remityn is simply amazing. Not only are transfers instant, but the platform is also super user-friendly, and support is always available no matter what time you send money. I’ve saved a lot on international transfer fees and exchange rates.Highly reliable and definitely worth using!",
//     name: "Stefani",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 4.8,
//   },
//   {
//     id: 6,
//     flagImageSrc: "../assets/icon/flags/inr.svg", // Example: Added one more
//     flagImageAlt: "India Flag",
//     quote:
//       "Using Remityn is incredibly convenient, especially when I need to send money on the go. As long as I have my phone, I can quickly transfer funds without hassle. It’s also super helpful when I’m traveling abroad Remityn makes currency exchange and international transfers simple.",
//     name: "Rajesh",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 5,
//   },
// ];

// const CARD_WIDTH_REM_VALUE = 22; // approx 336px
// const CARD_MARGIN_REM_VALUE = 1.5; // mr-6, approx 24px
// const SLIDE_AMOUNT_REM = CARD_WIDTH_REM_VALUE + CARD_MARGIN_REM_VALUE;

// const ReviewSection: React.FC = () => {
//   const [currentOffset, setCurrentOffset] = useState(0);
//   const [cardScales, setCardScales] = useState<number[]>(() =>
//     reviewsData.map(() => 1)
//   );

//   // Calculate the number of "visible" cards. For this carousel, it's effectively 1 active card.
//   // The 'next' button should be disabled if the last card is fully in view.
//   // Since we slide one full card width + margin at a time,
//   // the max offset is when (reviewsData.length - 1) cards have been moved off-screen.
//   const maxOffset = reviewsData.length > 1 ? reviewsData.length - 1 : 0;

//   const handleNext = () => {
//     // We are showing '1' primary card at a time conceptually.
//     // The offset is the index of the card that is currently "active" or at the start of the viewport.
//     if (currentOffset < maxOffset) {
//       const indexOfCardToScaleDown = currentOffset; // The card currently at the "front"
//       setCardScales((prevScales) =>
//         prevScales.map((scale, index) =>
//           index === indexOfCardToScaleDown ? 0 : scale
//         )
//       );
//       setCurrentOffset((prevOffset) => prevOffset + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentOffset > 0) {
//       const indexOfCardToScaleUp = currentOffset - 1; // The card that will become "front"
//       setCardScales((prevScales) =>
//         prevScales.map((scale, index) =>
//           index === indexOfCardToScaleUp ? 1 : scale
//         )
//       );
//       setCurrentOffset((prevOffset) => prevOffset - 1);
//     }
//   };

//   const isPrevDisabled = currentOffset === 0;
//   const isNextDisabled = currentOffset >= maxOffset;

//   const innerContainerStyle = useMemo(
//     () => ({
//       transform: `translateX(-${currentOffset * SLIDE_AMOUNT_REM}rem)`,
//       willChange: "transform",
//     }),
//     [currentOffset]
//   );

//   const cardWidthClass = `w-[${CARD_WIDTH_REM_VALUE}rem]`; // e.g. w-[21rem]

//   return (
//     <section
//       className={`py-10 md:py-18 bg-background w-full overflow-hidden relative`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row lg:space-x-10 xl:space-x-16">
//           {/* Left Content */}

//           <div className="lg:w-[35%] w-full mb-10 lg:mb-0 relative z-10 text-center flex flex-col justify-center lg:text-left">
//             <div className="main-wrap">
//               <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight text-mainheadingWhite">
//                 Real Stories,{" "}
//                 <span className="text-primary capitalize">Real Trust</span>
//               </h3>
//             </div>

//             <div className="flex space-x-7 mt-20">
//               <button
//                 onClick={handlePrev}
//                 disabled={isPrevDisabled}
//                 className={`size-16 rounded-full flex items-center justify-center transition-all duration-150 ease-linear
//                             ${
//                               isPrevDisabled
//                                 ? "bg-primarybox/40 text-subheadingWhite cursor-not-allowed"
//                                 : "bg-primarybox cursor-pointer text-mainheadingWhite"
//                             }`}
//                 aria-label="Previous review"
//               >
//                 <ArrowLeftIcon className="size-8" />
//               </button>

//               <button
//                 onClick={handleNext}
//                 disabled={isNextDisabled}
//                 className={`size-16 rounded-full flex items-center justify-center transition-all duration-150 ease-linear
//                             ${
//                               isNextDisabled
//                                 ? "bg-primarybox/40 text-subheadingWhite cursor-not-allowed"
//                                 : "bg-primarybox cursor-pointer text-mainheadingWhite"
//                             }`}
//                 aria-label="Next review"
//               >
//                 <ArrowRightIcon className="size-8" />
//               </button>
//             </div>
//           </div>

//           {/* Right Content: Sliding Reviews */}
//           <div className="lg:w-[65%] w-full">
//             {" "}
//             {/* Ensure this container allows overflow for the visual effect */}
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={innerContainerStyle}
//             >
//               {reviewsData.map((review, index) => {
//                 return (
//                   <div
//                     key={review.id}
//                     className={`flex-shrink-0 rounded-3xl p-6 md:p-8 lg:w-[400px] w-[350px]
//                                 transition-all duration-500 ease-in-out
//                                 ${cardWidthClass}
//                                 ${
//                                   index !== reviewsData.length - 1 ? "mr-6" : "" // mr-[1.5rem]
//                                 }
//                                 ${review.bgColorClass} ${
//                       review.textColorClass
//                     }`}
//                     style={{
//                       transform: `scale(${cardScales[index]})`,
//                       transformOrigin: "right", // Changed to 'right' to match the slide direction visually
//                       opacity: cardScales[index],
//                       pointerEvents: cardScales[index] === 0 ? "none" : "auto",
//                       willChange: "transform, opacity",
//                       height: "auto", // Allow card to define its height
//                       minHeight: "300px", // Minimum height for consistency
//                     }}
//                   >
//                     <div className="flex flex-col h-full">

//                       {/* Quote */}
//                       <p className="text-base lg:text-xl text-mainheadingWhite font-normal leading-normal mb-6">
//                         "{review.quote}"
//                       </p>

//                       {/* Trustpilot Section */}
//                       <div className="space-y-2">
//                         <div className="flex items-center">
//                           <TrustpilotLogoStar className="w-6 h-6 sm:w-7 sm:h-7 mr-2" />
//                           <span
//                             className={`text-lg sm:text-xl font-semibold ${review.textColorClass}`}
//                           >
//                             Trustpilot
//                           </span>
//                         </div>
//                         <div className="flex">
//                           {Array.from({ length: 5 }).map((_, i) => (
//                             <RatingStar
//                               key={i}
//                               rating={review.trustpilotRating}
//                               starIndex={i}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       {/* End Trustpilot Section */}

//                       {/* Reviewer Name */}
//                       <div className="mt-auto  text-right">
//                         {" "}
//                         {/* Pushes name to the bottom */}
//                         <span
//                           className={`text-base sm:text-lg font-semibold block ${review.textColorClass}`}
//                         >
//                           {review.name}
//                         </span>
//                         {/* You could add country or other info here if needed */}
//                         {/* e.g., <span className={`text-sm ${review.textColorClass} opacity-80`}>{review.country}</span> */}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewSection;

// "use client";
// import React, { useState, useMemo, useEffect, useRef } from "react"; // Added useEffect, useRef

// // Icons for arrows (no changes from your original)
// const ArrowLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//     />
//   </svg>
// );
// const ArrowRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//     />
//   </svg>
// );

// // --- Trustpilot Helper Components (No changes from your original) ---
// const TrustpilotLogoStar = ({ className }: { className?: string }) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="#00B67B"
//     xmlns="http://www.w3.org/2000/svg"
//     className={className}
//     aria-hidden="true"
//   >
//     <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.432l-7.416 4.001 1.481-8.279-6.064-5.828 8.332-1.151L12 .587z" />
//   </svg>
// );

// const SingleRatingStarIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="white"
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-full h-full"
//     aria-hidden="true"
//   >
//     <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.432l-7.416 4.001 1.481-8.279-6.064-5.828 8.332-1.151L12 .587z" />
//   </svg>
// );

// const RatingStar = ({
//   rating,
//   starIndex,
// }: {
//   rating: number;
//   starIndex: number;
// }) => {
//   const greenColor = "#00B67B";
//   const greyColor = "#DCDCE6";
//   let backgroundStyle: React.CSSProperties = {};
//   const starValue = starIndex + 1;

//   if (rating >= starValue) {
//     backgroundStyle = { backgroundColor: greenColor };
//   } else if (rating > starIndex && rating < starValue) {
//     const percentage = (rating - starIndex) * 100;
//     backgroundStyle = {
//       background: `linear-gradient(to right, ${greenColor} ${percentage}%, ${greyColor} ${percentage}%)`,
//     };
//   } else {
//     backgroundStyle = { backgroundColor: greyColor };
//   }

//   return (
//     <div
//       className="w-5 h-5 sm:w-6 sm:h-6 mr-1 p-0.5 relative"
//       style={backgroundStyle}
//     >
//       <SingleRatingStarIcon />
//     </div>
//   );
// };

// // --- End Trustpilot Helper Components ---

// interface Review {
//   id: number;
//   flagImageSrc: string;
//   flagImageAlt: string;
//   quote: string;
//   name: string;
//   bgColorClass: string;
//   textColorClass: string;
//   trustpilotRating: number;
// }

// const reviewsData: Review[] = [
//   {
//     id: 1,
//     flagImageSrc: "../assets/icon/flags/aud.svg", // Assuming these paths are correct relative to your public folder
//     flagImageAlt: "USA Flag", // Note: aud.svg usually means Australian Dollar, might be a placeholder
//     quote:
//       "Remityn has truly been a game-changer for me when it comes to sending money abroad. The platform is simple to use, fully transparent about fees.Transfers are quick, and I always feel secure knowing my money is in safe hands.",
//     name: "Rashmi",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 5,
//   },
//   {
//     id: 2,
//     flagImageSrc: "../assets/icon/flags/gbp.svg", // Example: Changed to GBP
//     flagImageAlt: "UK Flag",
//     quote:
//       "Remityn offers a smooth, user-friendly experience with fast transfers and low fees. The USD to INR exchange rate is always fair and clearly shown. I've used the service several times, and it has never let me down highly recommended!",
//     name: "Ben Cane",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 4.5,
//   },
//   {
//     id: 3,
//     flagImageSrc: "../assets/icon/flags/eur.svg", // Example: Changed to EUR
//     flagImageAlt: "Euro Flag",
//     quote:
//       "I’ve been using Remityn for my international money transfers, and I’m more than satisfied with their service. The process is fast, secure, and easy to navigate. My funds arrived earlier than expected, and the exchange rates were very competitive.",
//     name: "Anitha Kaipally",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 5,
//   },
//   {
//     id: 4,
//     flagImageSrc: "../assets/icon/flags/usd.svg", // Example: Changed to USD
//     flagImageAlt: "USA Flag",
//     quote:
//       "The process is easy, and the transfer charges are comparatively lower than other services. The recipient receives the money in less than 10 minutes. Remityn is one of the best money transfer services I’ve used. I’ll definitely continue using it for all my future transfers.",
//     name: "Catherine Luna",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 4.0,
//   },
//   {
//     id: 5,
//     flagImageSrc: "../assets/icon/flags/cad.svg", // Example: Changed to CAD
//     flagImageAlt: "Canada Flag",
//     quote:
//       "Remityn is simply amazing. Not only are transfers instant, but the platform is also super user-friendly, and support is always available no matter what time you send money. I’ve saved a lot on international transfer fees and exchange rates.Highly reliable and definitely worth using!",
//     name: "Chelsy Desai",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 4.8,
//   },
//   {
//     id: 6,
//     flagImageSrc: "../assets/icon/flags/inr.svg", // Example: Added one more
//     flagImageAlt: "India Flag",
//     quote:
//       "Using Remityn is incredibly convenient, especially when I need to send money on the go. As long as I have my phone, I can quickly transfer funds without hassle. It’s also super helpful when I’m traveling abroad Remityn makes currency exchange and international transfers simple.",
//     name: "Sofia Vyas",
//     bgColorClass: "bg-primarybox",
//     textColorClass: "text-white",
//     trustpilotRating: 5,
//   },
// ];

// const ReviewSection: React.FC = () => {
//   const [currentOffset, setCurrentOffset] = useState(0);
//   const [slideAmountPx, setSlideAmountPx] = useState(0);
//   const cardRef = useRef<HTMLDivElement>(null); // Ref for a single card to measure its width

//   const [cardScales, setCardScales] = useState<number[]>(() =>
//     reviewsData.map(() => 1)
//   );

//   const maxOffset = reviewsData.length > 1 ? reviewsData.length - 1 : 0;

//   // Effect to calculate slideAmountPx based on actual card dimensions
//   useEffect(() => {
//     const calculateAndSetSlideAmount = () => {
//       if (cardRef.current) {
//         const cardWidth = cardRef.current.offsetWidth;
//         let marginForSlide = 0;
//         // The margin between cards is `mr-6` (1.5rem). Add this if there are multiple cards.
//         if (reviewsData.length > 1) {
//           const rootFontSize = parseFloat(
//             window.getComputedStyle(document.documentElement).fontSize
//           ); // Get base font size in px
//           marginForSlide = 1.5 * rootFontSize; // 1.5rem in pixels
//         }
//         setSlideAmountPx(cardWidth + marginForSlide);
//       }
//     };

//     // Ensure this runs only on the client where window and document are available
//     if (typeof window !== "undefined") {
//       calculateAndSetSlideAmount(); // Initial calculation
//       window.addEventListener("resize", calculateAndSetSlideAmount); // Recalculate on window resize

//       // Cleanup listener on component unmount
//       return () => {
//         window.removeEventListener("resize", calculateAndSetSlideAmount);
//       };
//     }
//   }, [reviewsData.length]); // Recalculate if the number of reviews changes (e.g., if data was dynamic)

//   const handleNext = () => {
//     if (currentOffset < maxOffset) {
//       const indexOfCardToScaleDown = currentOffset;
//       setCardScales((prevScales) =>
//         prevScales.map(
//           (scale, index) => (index === indexOfCardToScaleDown ? 0 : scale) // Keep other scales as they are
//         )
//       );
//       setCurrentOffset((prevOffset) => prevOffset + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentOffset > 0) {
//       const indexOfCardToScaleUp = currentOffset - 1;
//       setCardScales((prevScales) =>
//         prevScales.map(
//           (scale, index) => (index === indexOfCardToScaleUp ? 1 : scale) // Keep other scales as they are
//         )
//       );
//       setCurrentOffset((prevOffset) => prevOffset - 1);
//     }
//   };

//   const isPrevDisabled = currentOffset === 0;
//   // Disable next if at max offset or if slideAmountPx hasn't been calculated yet (important for initial render stability)
//   const isNextDisabled = currentOffset >= maxOffset || slideAmountPx === 0;

//   const innerContainerStyle = useMemo(
//     () => ({
//       transform: `translateX(-${currentOffset * slideAmountPx}px)`,
//       willChange: "transform",
//     }),
//     [currentOffset, slideAmountPx]
//   );

//   // Define responsive card widths using Tailwind classes
//   // w-[85vw] for very small screens (e.g., < 640px viewport width)
//   // sm:w-[22rem] for small screens (352px width)
//   // md:w-[24rem] for medium screens and up (384px width) - matches original 24rem intention
//   const responsiveCardClasses = "w-[22rem] lg:w-[24rem]";

//   return (
//     <section
//       className={`py-10 lg:py-18 bg-background w-full overflow-hidden relative`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row lg:space-x-10 xl:space-x-16">
//           {/* Left Content */}
//           <div className="lg:w-[35%] relative z-10">
//             {/* Heading */}
//             <div className="main-wrap sm:text-left text-center">
//               <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold lg:mb-4 mb-10 leading-tight text-mainheadingWhite">
//                 Real Stories,{" "}
//                 <span className="text-primary capitalize">Real Trust</span>
//               </h3>
//             </div>
//             {/* Arrow button */}{" "}
//             <div className="hidden lg:block">
//               <div className="flex space-x-7 mt-20 justify-center lg:justify-start">
//                 {/* Adjusted margin and alignment */}
//                 <button
//                   onClick={handlePrev}
//                   disabled={isPrevDisabled}
//                   className={`size-14 md:size-18 rounded-full flex items-center justify-center transition-all duration-150 ease-linear
//                             ${
//                               isPrevDisabled
//                                 ? "bg-primarybox/40 text-subheadingWhite cursor-not-allowed"
//                                 : "bg-primarybox cursor-pointer text-mainheadingWhite hover:bg-primarybox/80"
//                             }`}
//                   aria-label="Previous review"
//                 >
//                   <ArrowLeftIcon className="size-6 md:size-8" />{" "}
//                   {/* Responsive icon size */}
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   disabled={isNextDisabled}
//                   className={`size-14 md:size-18 rounded-full flex items-center justify-center transition-all duration-150 ease-linear
//                             ${
//                               isNextDisabled
//                                 ? "bg-primarybox/40 text-subheadingWhite cursor-not-allowed"
//                                 : "bg-primarybox cursor-pointer text-mainheadingWhite hover:bg-primarybox/80"
//                             }`}
//                   aria-label="Next review"
//                 >
//                   <ArrowRightIcon className="size-6 md:size-8" />{" "}
//                   {/* Responsive icon size */}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Content: Sliding Reviews */}
//           <div className="lg:w-[65%]">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={innerContainerStyle}
//             >
//               {reviewsData.map((review, index) => {
//                 return (
//                   <div
//                     // Assign the ref to the first card; its dimensions will represent all cards
//                     ref={index === 0 ? cardRef : null}
//                     key={review.id}
//                     className={`flex-shrink-0 rounded-3xl p-6 md:p-8
//                                 transition-all duration-500 ease-in-out
//                                 ${responsiveCardClasses}
//                                 ${
//                                   index !== reviewsData.length - 1 ? "mr-6" : ""
//                                 } {/* mr-6 is 1.5rem */}
//                                 ${review.bgColorClass} ${
//                       review.textColorClass
//                     }`}
//                     style={{
//                       transform: `scale(${cardScales[index]})`,
//                       transformOrigin: "right", // Kept your original transformOrigin
//                       opacity: cardScales[index], // Opacity directly tied to scale
//                       pointerEvents: cardScales[index] === 0 ? "none" : "auto",
//                       willChange: "transform, opacity",
//                       height: "auto", // Allow card to define its height based on content
//                       minHeight: "380px", // Adjusted min-height for potentially longer quotes and consistent look
//                     }}
//                   >
//                     <div className="flex flex-col h-full">
//                       {" "}
//                       {/* Ensure content uses full card height */}
//                       {/* Quote - flex-grow allows it to take available space */}
//                       <p className="text-base lg:text-xl text-mainheadingWhite font-normal leading-normal mb-6 flex-grow">
//                         "{review.quote}"
//                       </p>
//                       {/* Trustpilot Section & Reviewer Name - pushed to bottom by flex-grow on quote */}
//                       <div className="mt-auto">
//                         {" "}
//                         {/* This div will be at the bottom */}
//                         <div className="space-y-2">
//                           <div className="flex items-center">
//                             <TrustpilotLogoStar className="w-6 h-6 sm:w-7 sm:h-7 mr-2" />
//                             <span
//                               className={`text-lg sm:text-xl font-semibold text-mainheadingWhite`}
//                             >
//                               Trustpilot
//                             </span>
//                           </div>
//                           <div className="flex">
//                             {Array.from({ length: 5 }).map((_, i) => (
//                               <RatingStar
//                                 key={i}
//                                 rating={review.trustpilotRating}
//                                 starIndex={i}
//                               />
//                             ))}
//                           </div>
//                         </div>
//                         {/* Reviewer Name */}
//                         <div className="mt-4 text-right">
//                           {" "}
//                           {/* Added margin-top for spacing */}
//                           <span
//                             className={`text-base sm:text-lg block text-subheadingWhite font-normal`}
//                           >
//                             {review.name}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             {/* Arrow button */}{" "}
//             <div className="lg:hidden block">
//               <div className="flex space-x-5 mt-12">
//                 {/* Adjusted margin and alignment */}
//                 <button
//                   onClick={handlePrev}
//                   disabled={isPrevDisabled}
//                   className={`size-14 rounded-full flex items-center justify-center transition-all duration-150 ease-linear
//                             ${
//                               isPrevDisabled
//                                 ? "bg-primarybox/40 text-subheadingWhite cursor-not-allowed"
//                                 : "bg-primarybox cursor-pointer text-mainheadingWhite hover:bg-primarybox/80"
//                             }`}
//                   aria-label="Previous review"
//                 >
//                   <ArrowLeftIcon className="size-6" />{" "}
//                   {/* Responsive icon size */}
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   disabled={isNextDisabled}
//                   className={`size-14 rounded-full flex items-center justify-center transition-all duration-150 ease-linear
//                             ${
//                               isNextDisabled
//                                 ? "bg-primarybox/40 text-subheadingWhite cursor-not-allowed"
//                                 : "bg-primarybox cursor-pointer text-mainheadingWhite hover:bg-primarybox/80"
//                             }`}
//                   aria-label="Next review"
//                 >
//                   <ArrowRightIcon className="size-6" />{" "}
//                   {/* Responsive icon size */}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewSection;

"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image"; // Import Next.js Image component
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

// Icons for arrows (no changes from your original)
const ArrowLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);

const ArrowRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    />
  </svg>
);

// --- Trustpilot Helper Components (No changes from your original) ---
const TrustpilotLogoStar = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="#00B67B"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.432l-7.416 4.001 1.481-8.279-6.064-5.828 8.332-1.151L12 .587z" />
  </svg>
);

const SingleRatingStarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.432l-7.416 4.001 1.481-8.279-6.064-5.828 8.332-1.151L12 .587z" />
  </svg>
);

const RatingStar = ({
  rating,
  starIndex,
}: {
  rating: number;
  starIndex: number;
}) => {
  const greenColor = "#00B67B";
  const greyColor = "#DCDCE6";
  let backgroundStyle: React.CSSProperties = {};
  const starValue = starIndex + 1;

  if (rating >= starValue) {
    backgroundStyle = { backgroundColor: greenColor };
  } else if (rating > starIndex && rating < starValue) {
    const percentage = (rating - starIndex) * 100;
    backgroundStyle = {
      background: `linear-gradient(to right, ${greenColor} ${percentage}%, ${greyColor} ${percentage}%)`,
    };
  } else {
    backgroundStyle = { backgroundColor: greyColor };
  }

  return (
    <div
      className="w-5 h-5 sm:w-6 sm:h-6 mr-1 p-0.5 relative"
      style={backgroundStyle}
    >
      <SingleRatingStarIcon />
    </div>
  );
};

// --- End Trustpilot Helper Components ---

interface Review {
  id: number;
  flagImageSrc: string; // Path for Next.js Image (relative to public folder)
  flagImageAlt: string;
  quote: string;
  name: string;
  bgColorClass: string;
  textColorClass: string;
  trustpilotRating: number;
}

// Updated reviewsData with paths suitable for Next.js Image (assuming assets folder is in public)
const reviewsData: Review[] = [
  {
    id: 1,
    flagImageSrc: "/assets/images/female.png", // Path from public directory
    flagImageAlt: "Aaradhya Sharma",
    quote:
      "Remityn has truly been a game-changer for me when it comes to sending money abroad. The platform is simple to use, fully transparent about fees. Transfers are quick, and I always feel secure knowing my money is in safe hands with fast service, and trusted transfers.",
    name: "Aaradhya Sharma",
    bgColorClass: "bg-primarybox",
    textColorClass: "text-white",
    trustpilotRating: 5,
  },
  {
    id: 2,
    flagImageSrc: "/assets/images/UserMen.png",
    flagImageAlt: "Noah Williams",
    quote:
      "Remityn offers a smooth, user-friendly experience with fast transfers and low fees. The USD to INR exchange rate is always fair and clearly shown. I've used the service several times, and it has never let me down highly recommended for reliable conversions, secure transactions.",
    name: "Noah Williams",
    bgColorClass: "bg-primarybox",
    textColorClass: "text-white",
    trustpilotRating: 4.5,
  },
  {
    id: 3,
    flagImageSrc: "/assets/images/female.png",
    flagImageAlt: "Sophia Brown",
    quote:
      "I’ve been using Remityn for my international money transfers, and I’m more than satisfied with their service. The process is fast, secure, and easy to navigate. My funds arrived earlier than expected, and the exchange rates were very competitive.",
    name: "Sophia Brown",
    bgColorClass: "bg-primarybox",
    textColorClass: "text-white",
    trustpilotRating: 5,
  },
  {
    id: 4,
    flagImageSrc: "/assets/images/UserMen.png",
    flagImageAlt: "Oliver Johnson",
    quote:
      "The process is easy, and the transfer charges are comparatively lower than other services. The recipient receives the money in less than 10 minutes. Remityn is one of the best money transfer services I’ve used. I’ll definitely continue using it for all my future transfers.",
    name: "Oliver Johnson",
    bgColorClass: "bg-primarybox",
    textColorClass: "text-white",
    trustpilotRating: 4.0,
  },
  {
    id: 5,
    flagImageSrc: "/assets/images/female.png",
    flagImageAlt: "Evelyn Clark",
    quote:
      "Remityn is simply amazing. Not only are transfers instant, but the platform is also super user-friendly, and support is always available no matter what time you send money. I’ve saved a lot on international transfer fees and exchange rates.Highly reliable and definitely worth using!",
    name: "Evelyn Clark",
    bgColorClass: "bg-primarybox",
    textColorClass: "text-white",
    trustpilotRating: 4.8,
  },
  {
    id: 6,
    flagImageSrc: "/assets/images/UserMen.png",
    flagImageAlt: "Alexander Martin",
    quote:
      "Using Remityn is incredibly convenient, especially when I need to send money on the go. As long as I have my phone, I can quickly transfer funds without hassle. It’s also super helpful when I’m traveling abroad Remityn makes currency exchange and international transfers simple.",
    name: "Alexander Martin",
    bgColorClass: "bg-primarybox",
    textColorClass: "text-white",
    trustpilotRating: 5,
  },
];

const ReviewSection: React.FC = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [slideAmountPx, setSlideAmountPx] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const [cardScales, setCardScales] = useState<number[]>(() =>
    reviewsData.map(() => 1)
  );

  const maxOffset = reviewsData.length > 1 ? reviewsData.length - 1 : 0;

  useEffect(() => {
    const calculateAndSetSlideAmount = () => {
      if (cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth;
        let marginForSlide = 0;
        if (reviewsData.length > 1) {
          const rootFontSize = parseFloat(
            window.getComputedStyle(document.documentElement).fontSize
          );
          marginForSlide = 1.5 * rootFontSize; // 1.5rem in pixels (for mr-6)
        }
        setSlideAmountPx(cardWidth + marginForSlide);
      }
    };

    if (typeof window !== "undefined") {
      calculateAndSetSlideAmount();
      window.addEventListener("resize", calculateAndSetSlideAmount);
      return () => {
        window.removeEventListener("resize", calculateAndSetSlideAmount);
      };
    }
  }, [reviewsData.length]);

  const handleNext = () => {
    if (currentOffset < maxOffset) {
      const indexOfCardToScaleDown = currentOffset;
      setCardScales((prevScales) =>
        prevScales.map((scale, index) =>
          index === indexOfCardToScaleDown ? 0 : scale
        )
      );
      setCurrentOffset((prevOffset) => prevOffset + 1);
    }
  };

  const handlePrev = () => {
    if (currentOffset > 0) {
      const indexOfCardToScaleUp = currentOffset - 1;
      setCardScales((prevScales) =>
        prevScales.map((scale, index) =>
          index === indexOfCardToScaleUp ? 1 : scale
        )
      );
      setCurrentOffset((prevOffset) => prevOffset - 1);
    }
  };

  const isPrevDisabled = currentOffset === 0;
  const isNextDisabled = currentOffset >= maxOffset || slideAmountPx === 0;

  const innerContainerStyle = useMemo(
    () => ({
      transform: `translateX(-${currentOffset * slideAmountPx}px)`,
      willChange: "transform",
    }),
    [currentOffset, slideAmountPx]
  );

  const responsiveCardClasses = "w-[21.5rem] lg:w-[24rem]";

  return (
    <section
      className={`py-10 lg:py-16 bg-background w-full overflow-hidden relative`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:space-x-10 xl:space-x-16">
          {/* Left Content */}
          <div className="lg:w-[35%] w-full relative z-10">
            <div className="main-wrap">
              <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold lg:mb-4 mb-10 leading-tight text-mainheadingWhite">
                Real Stories,{" "}
                <span className="text-primary capitalize">Real Trust</span>
              </h3>
            </div>

            <div className="hidden lg:block">
              <div className="flex space-x-7 mt-20 justify-center lg:justify-start">
                <button
                  onClick={handlePrev}
                  disabled={isPrevDisabled}
                  className={`size-14 md:size-16 rounded-full flex items-center justify-center transition-all duration-75 ease-linear
                            ${
                              isPrevDisabled
                                ? "bg-primarybox/40 text-subheadingWhite/50 cursor-not-allowed"
                                : "bg-primarybox cursor-pointer text-mainheadingWhite hover:bg-primarybox/80"
                            }`}
                  aria-label="Previous review"
                >
                  <FaArrowLeft className="size-6 md:size-7" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled}
                  className={`size-14 md:size-16 rounded-full flex items-center justify-center transition-all duration-75 ease-linear
                            ${
                              isNextDisabled
                                ? "bg-primarybox/40 text-subheadingWhite/50 cursor-not-allowed"
                                : "bg-primarybox cursor-pointer text-mainheadingWhite hover:bg-primarybox/80"
                            }`}
                  aria-label="Next review"
                >
                  <FaArrowRight className="size-6 md:size-7" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Content: Sliding Reviews */}
          <div className="lg:w-[65%] w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={innerContainerStyle}
            >
              {reviewsData.map((review, index) => {
                return (
                  <div
                    ref={index === 0 ? cardRef : null}
                    key={review.id}
                    className={`flex-shrink-0 rounded-3xl p-6 md:p-8 
                                transition-all duration-500 ease-in-out
                                ${responsiveCardClasses} 
                                ${
                                  index !== reviewsData.length - 1 ? "mr-6" : ""
                                } 
                                ${review.bgColorClass} ${
                      review.textColorClass
                    }`}
                    style={{
                      transform: `scale(${cardScales[index]})`,
                      transformOrigin: "right",
                      opacity: cardScales[index],
                      pointerEvents: cardScales[index] === 0 ? "none" : "auto",
                      willChange: "transform, opacity",
                      height: "auto",
                      minHeight: "380px", // Adjusted as per original
                    }}
                  >
                    <div className="flex flex-col h-full">
                      {/* Flag Image using Next.js Image */}
                      <div className="relative mb-6">
                        {" "}
                        {/* Container for layout */}
                        <Image
                          src={review.flagImageSrc}
                          alt={review.flagImageAlt}
                          width={500} // Example width, adjust as needed. For SVGs, intrinsic size is often used if not specified here.
                          height={500} // Example height, adjust as needed.
                          className="rounded-full size-18" // Optional: make flag icons circular
                        />
                      </div>

                      <p className="text-base lg:text-xl text-mainheadingWhite font-normal leading-normal mb-6 flex-grow">
                        "{review.quote}"
                      </p>

                      <div className="mt-auto">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <TrustpilotLogoStar className="w-6 h-6 sm:w-7 sm:h-7 mr-2" />
                            <span
                              className={`text-lg sm:text-xl font-semibold text-mainheadingWhite`}
                            >
                              Trustpilot
                            </span>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <RatingStar
                                key={i}
                                rating={review.trustpilotRating}
                                starIndex={i}
                              />
                            ))}
                          </div>
                        </div>
                        {/* Reviewer Name and Flag */}
                        <div className="mt-4 flex items-center justify-end space-x-2">
                          <span
                            className={`text-base sm:text-lg block text-subheadingWhite font-normal`}
                          >
                            {review.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Arrow button for mobile */}
            <div className="lg:hidden block">
              <div className="flex space-x-5 mt-10 justify-start">
                {" "}
                {/* Centered mobile buttons */}
                <button
                  onClick={handlePrev}
                  disabled={isPrevDisabled}
                  className={`size-14 rounded-full flex items-center justify-center transition-all duration-150 ease-linear
                            ${
                              isPrevDisabled
                                ? "bg-primarybox/40 text-subheadingWhite/50 cursor-not-allowed"
                                : "bg-primarybox cursor-pointer text-mainheadingWhite hover:bg-primarybox/80"
                            }`}
                  aria-label="Previous review"
                >
                  <FaArrowLeft className="size-6" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled}
                  className={`size-14 rounded-full flex items-center justify-center transition-all duration-150 ease-linear
                            ${
                              isNextDisabled
                                ? "bg-primarybox/40 text-subheadingWhite/50 cursor-not-allowed"
                                : "bg-primarybox cursor-pointer text-mainheadingWhite hover:bg-primarybox/80"
                            }`}
                  aria-label="Next review"
                >
                  <FaArrowRight className="size-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
