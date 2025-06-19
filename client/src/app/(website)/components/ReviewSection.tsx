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




"use client";
import React, { useState, useMemo } from "react";
import UsaFlag from "./flags/UsaFlag";
import ItalyFlag from "./flags/ItalyFlag";
import UkFlag from "./flags/UkFlag";
import DenmarkFlag from "./flags/DenmarkFlag";

// Icons for arrows
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

const XCircleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface Review {
  id: number;
  flagComponent: React.ElementType;
  quote: string;
  name: string;
  bgColorClass: string;
  textColorClass: string;
  buttonClasses: string;
  trustpilotLink: string; // Added for the button link
}

const reviewsData: Review[] = [
  {
    id: 1,
    flagComponent: UsaFlag,
    quote:
      "They make our life split between two continents possible. Transfers are simple and very, very fast.",
    name: "Stuart",
    bgColorClass: "bg-lime-300",
    textColorClass: "text-black",
    buttonClasses: "bg-green-700 hover:bg-green-800 text-white",
    trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5", // Example link
  },
  {
    id: 2,
    flagComponent: ItalyFlag,
    quote:
      "Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers.",
    name: "Megan",
    bgColorClass: "bg-green-700",
    textColorClass: "text-white",
    buttonClasses: "bg-lime-300 hover:bg-lime-400 text-green-800",
    trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
  },
  {
    id: 3,
    flagComponent: UkFlag,
    quote:
      "I use Wise to pay a mortgage in a different country each month. Superb. That simple.",
    name: "Gerald",
    bgColorClass: "bg-lime-300",
    textColorClass: "text-black",
    buttonClasses: "bg-green-700 hover:bg-green-800 text-white",
    trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
  },
  {
    id: 4,
    flagComponent: UsaFlag, // US flag for Gemma as per Wise's design
    quote:
      "The best money travel buddy! Wise makes finances easier to deal with instantly.",
    name: "Gemma",
    bgColorClass: "bg-green-700",
    textColorClass: "text-white",
    buttonClasses: "bg-lime-300 hover:bg-lime-400 text-green-800",
    trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
  },
  {
    id: 5,
    flagComponent: DenmarkFlag,
    quote:
      "Wise has been a lifesaver for me as a student in a foreign country.",
    name: "Stefani",
    bgColorClass: "bg-lime-300",
    textColorClass: "text-black",
    buttonClasses: "bg-green-700 hover:bg-green-800 text-white",
    trustpilotLink: "https://www.trustpilot.com/review/wise.com?stars=5",
  },
];

const CARD_WIDTH_REM_VALUE = 21; // For w-[21rem] (336px approx)
const CARD_MARGIN_REM_VALUE = 1.5; // For mr-6 (24px approx)
const SLIDE_AMOUNT_REM = CARD_WIDTH_REM_VALUE + CARD_MARGIN_REM_VALUE; // 22.5rem

const ReviewSection: React.FC = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [cardScales, setCardScales] = useState<number[]>(() =>
    reviewsData.map(() => 1)
  );

  const handleNext = () => {
    if (currentOffset < reviewsData.length - 1) {
      // Stop if last card is already the only one "potentially" visible by offset
      const newCardScales = [...cardScales];
      if (currentOffset < reviewsData.length) {
        // Ensure we don't access out of bounds
        newCardScales[currentOffset] = 0; // Scale down the current leftmost card that's being hidden
      }
      setCardScales(newCardScales);
      setCurrentOffset(currentOffset + 1);
    }
  };

  const handlePrev = () => {
    if (currentOffset > 0) {
      const newCardScales = [...cardScales];
      if (currentOffset - 1 >= 0) {
        // Ensure we don't access out of bounds
        newCardScales[currentOffset - 1] = 1; // Scale up the card that will become visible
      }
      setCardScales(newCardScales);
      setCurrentOffset(currentOffset - 1);
    }
  };

  const isPrevDisabled = currentOffset === 0;
  // Next should be disabled when showing the last card as the *primary* card,
  // meaning `reviewsData.length - (number of cards visible in viewport)`
  // For simplicity here, disable when the last card is at the start of the visible cards,
  // or more accurately, when no more cards can be brought in from the right.
  // The video shows the carousel stopping when the last card is the only one visible on screen.
  // This means the effective length for "next" is when currentOffset makes the last card the first one to *potentially* be scaled.
  // If we assume a viewport can show ~1 full card (due to scaling others), then length-1 is fine.
  // If viewport always shows more, this needs adjustment. The video seems to allow scrolling until only the last card is left, full scale.
  // The animation implies one card is "lost" to scale 0 at a time.
  const isNextDisabled = currentOffset >= reviewsData.length - 1;

  const innerContainerStyle = useMemo(
    () => ({
      transform: `translateX(-${currentOffset * SLIDE_AMOUNT_REM}rem)`,
    }),
    [currentOffset]
  );

  return (
    <section className="py-16 md:py-24 bg-white w-full">
      {" "}
      {/* Increased padding slightly */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-10 xl:space-x-16">
          {/* Left Column: Title and Navigation */}
          <div className="lg:w-[35%] xl:w-[30%] mb-10 lg:mb-0">
            <div className="flex items-center mb-2 text-xs text-gray-700">
              <span>4.3</span>
              <svg
                className="w-3.5 h-3.5 text-green-500 mx-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="font-medium">on Trustpilot</span>
              <span className="ml-1.5">
                {reviewsData.length > 0
                  ? "261,486 reviews"
                  : "Loading reviews..."}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold text-black leading-none mb-8 lg:mb-10">
              FOR PEOPLE
              <br />
              GOING PLACES
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
                            ${
                              isPrevDisabled
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md"
                            }`}
                aria-label="Previous review"
              >
                {isPrevDisabled ? (
                  <XCircleIcon className="w-7 h-7 text-red-300" />
                ) : (
                  <ArrowLeftIcon className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
                            ${
                              isNextDisabled
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md"
                            }`}
                aria-label="Next review"
              >
                {isNextDisabled ? (
                  <XCircleIcon className="w-7 h-7 text-red-300" />
                ) : (
                  <ArrowRightIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Review Cards Carousel */}
          <div className="lg:w-[65%] xl:w-[70%]">
            <div className="overflow-hidden">
              {" "}
              {/* This is the viewport */}
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={innerContainerStyle}
              >
                {reviewsData.map((review, index) => {
                  const Flag = review.flagComponent;
                  return (
                    <div
                      key={review.id}
                      className={`flex-shrink-0 rounded-3xl p-6 md:p-8 
                                  transition-all duration-500 ease-in-out
                                  w-[${CARD_WIDTH_REM_VALUE}rem] 
                                  ${
                                    index !== reviewsData.length - 1
                                      ? "mr-6"
                                      : ""
                                  } 
                                  ${review.bgColorClass} ${
                        review.textColorClass
                      }`}
                      style={{
                        transform: `scale(${cardScales[index]})`,
                        transformOrigin: "center",
                        opacity: cardScales[index] === 0 ? 0 : 1,
                        visibility:
                          cardScales[index] === 0 ? "hidden" : "visible",
                        pointerEvents:
                          cardScales[index] === 0 ? "none" : "auto",
                      }}
                    >
                      <div className="flex flex-col h-full">
                        {" "}
                        {/* Ensure card content uses full height */}
                        <Flag className="w-10 h-10 md:w-12 md:h-12 mb-6" />
                        <p className="text-lg md:text-xl font-medium mb-6 flex-grow">
                          "{review.quote}"
                        </p>
                        <a
                          href={review.trustpilotLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-block px-5 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 ${review.buttonClasses}`}
                        >
                          {review.name} on Trustpilot
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
