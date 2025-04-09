// import React from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import Image from "next/image";
// import Link from "next/link";
// import USD from "../../../../public/assets/icons/usd.svg";

// const SocialTrustSection = () => {
//   return (
//     <section className="py-16 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex">
//           <div className="w-1/2">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tighter">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//               <div className="p-4 bg-green/10 rounded-full">
//                 <GoArrowLeft size={36} className="text-green" />
//               </div>
//               <div className="p-4 bg-green/10 rounded-full">
//                 <GoArrowRight size={36} className="text-green" />
//               </div>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="w-1/2">

//           <div className="flex flex-nowrap gap-4">

//             <div className="p-10 bg-lightgreen rounded-4xl min-w-md">
//               <div className="w-full pb-20">
//                 <Image src={USD} alt="USD Flag" width={150} height={150} />
//               </div>

//               <div className="flex flex-col gap-4">
//                 <div className="text-green font-medium text-3xl pb-10">
//                   <p>
//                     "They make our life split between two continents possible.
//                     Transfers are simple and very, very fast."
//                   </p>
//                 </div>
//                 <button className="text-left bg-green  rounded-full py-3 px-6 w-fit">
//                   <Link
//                     href=""
//                     className="text-xl font-medium text-lightgreen"
//                   >
//                     Stuart on Trustpilot
//                   </Link>
//                 </button>
//               </div>
//             </div>

//             <div className="p-10 bg-green rounded-4xl min-w-md">
//               <div className="w-full pb-20">
//                 <Image src={USD} alt="USD Flag" width={150} height={150} />
//               </div>

//               <div className="flex flex-col gap-4">
//                 <div className="text-lightgreen font-medium text-3xl mb-10">
//                   <p>
//                     "They make our life split between two continents possible.
//                     Transfers are simple and very, very fast."
//                   </p>
//                 </div>
//                 <button className="text-left bg-lightgreen py-3 px-6 rounded-full w-fit">
//                   <Link
//                     href=""
//                     className="text-xl font-medium text-green"
//                   >
//                     Megan on Trustpilot
//                   </Link>
//                 </button>
//               </div>
//             </div>

//               <div className="p-10 bg-lightgreen rounded-4xl min-w-md">
//               <div className="w-full pb-20">
//                 <Image src={USD} alt="USD Flag" width={150} height={150} />
//               </div>

//               <div className="flex flex-col gap-4">
//                 <div className="text-green font-medium text-3xl pb-10">
//                   <p>
//                     "They make our life split between two continents possible.
//                     Transfers are simple and very, very fast."
//                   </p>
//                 </div>
//                 <button className="text-left bg-green  rounded-full py-3 px-6 w-fit">
//                   <Link
//                     href=""
//                     className="text-xl font-medium text-lightgreen"
//                   >
//                     Stuart on Trustpilot
//                   </Link>
//                 </button>
//               </div>
//             </div>

//           </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SocialTrustSection;

// "use client"
// import React from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "../../components/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tighter">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//                 {/* Left arrow button */}
//               <div className="p-4 bg-green/10 rounded-full">
//                 <GoArrowLeft size={36} className="text-green" />
//               </div>
//               {/* Right arrow button  */}
//               <div className="p-4 bg-green/10 rounded-full">
//                 <GoArrowRight size={36} className="text-green" />
//               </div>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="lg:w-1/2 w-full">
//             <div className="flex flex-nowrap items-stretch gap-4">
//               {Array.from({ length: numberOfCards }).map((_, index) => (
//                 <SocialCard key={index} index={index} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SocialTrustSection;

// "use client"
// import React, { useState } from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "../../components/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;
//   const [startIndex, setStartIndex] = useState(0);

//   const handleNext = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % numberOfCards); // Cycle through the cards
//   };

//   const handlePrev = () => {
//     setStartIndex((prevIndex) =>
//       prevIndex === 0 ? numberOfCards - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tighter">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//               {/* Left arrow button */}
//               <button
//                 onClick={handlePrev}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowLeft size={36} className="text-green" />
//               </button>
//               {/* Right arrow button  */}
//               <button
//                 onClick={handleNext}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowRight size={36} className="text-green" />
//               </button>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="lg:w-1/2 w-full">
//             <div className="flex flex-nowrap gap-4 transition-transform duration-500"

//                 >
//               {Array.from({ length: numberOfCards }).map((_, index) => {
//                 const isActive = index >= startIndex;
//                 return (
//                     <div
//                       key={index}
//                       className={`transition-all duration-500 ${
//                         !isActive ? "scale-0 opacity-0 hidden" : ""
//                       } `}
//                       >
//                     <SocialCard key={index} index={index % numberOfCards} />
//                   </div>
//                 )
//                 }

//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SocialTrustSection;

// "use client"
// import React, { useState, useRef, useEffect } from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "../../components/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;
//   const [startIndex, setStartIndex] = useState(0);
//   const containerRef = useRef(null); // Ref for the card container
//   const [cardWidth, setCardWidth] = useState(0); // Store the card width

//     useEffect(() => {
//         const updateCardWidth = () => {
//             if (containerRef.current) {
//                 //get first children width and set
//                 const firstCard = containerRef.current.firstChild;
//                 if(firstCard){
//                     setCardWidth(firstCard.offsetWidth + 16); // Include margin/gap (assuming gap-4 = 1rem = 16px)
//                 }

//             }
//         };

//     updateCardWidth(); // Initial measurement

//         // recalculate when resize screen
//     window.addEventListener('resize', updateCardWidth);
//     return () => window.removeEventListener('resize', updateCardWidth);
//   }, []);

//   const handleNext = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % numberOfCards);
//   };

//   const handlePrev = () => {
//     setStartIndex((prevIndex) =>
//       prevIndex === 0 ? numberOfCards - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tighter">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//               <button
//                 onClick={handlePrev}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowLeft size={36} className="text-green" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowRight size={36} className="text-green" />
//               </button>
//             </div>
//           </div>

//           <div className="lg:w-1/2 w-full">
//             <div
//               ref={containerRef} // Attach the ref here
//               className="flex flex-nowrap gap-4"
//               style={{ transform: `translateX(-${startIndex * cardWidth}px)`, transition: 'transform 0.5s ease-in-out' }}
//             >
//               {Array.from({ length: numberOfCards }).map((_, index) => (
//                 <div
//                   key={index}
//                   className={`transition-all duration-500 ease-in-out ${
//                     index < startIndex ? "scale-0 opacity-0" : ""
//                   }  min-w-fit `}
//                 >
//                   <SocialCard index={index % numberOfCards} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SocialTrustSection;

// "use client";
// import React, { useState } from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "../../components/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;
//   const [startIndex, setStartIndex] = useState(0);

//   const handleNext = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % numberOfCards);
//   };

//   const handlePrev = () => {
//     setStartIndex((prevIndex) =>
//       prevIndex === 0 ? numberOfCards - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tighter">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//               <button
//                 onClick={handlePrev}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowLeft size={36} className="text-green" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowRight size={36} className="text-green" />
//               </button>
//             </div>
//           </div>

//           <div className="lg:w-1/2 w-full relative">
//             {/* Use a relative container */}
//             <div className="flex flex-nowrap gap-4 ">
//               {Array.from({ length: numberOfCards }).map((_, index) => {
//                 const offset = index - startIndex;
//                 const isActive = offset >= 0 && offset < 1; // Only one card is fully active
//                 const translateX = offset * 100; // Move by 100% of the card width

//                 return (
//                   <div
//                     key={index}
//                     className={`transition-all duration-500 ease-in-out ${
//                       !isActive ? "opacity-0 scale-75" : "opacity-100 scale-100"
//                     } `}
//                     style={{
//                       transform: `translateX(${translateX}%)`,
//                       minWidth: "350px",
//                     }}
//                   >
//                     <SocialCard index={index % numberOfCards} />
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

// export default SocialTrustSection;

// "use client"
// import React, { useState } from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "../../components/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;
//   const [startIndex, setStartIndex] = useState(0);

//   const handleNext = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % numberOfCards); // Cycle through the cards
//   };

//   const handlePrev = () => {
//     setStartIndex((prevIndex) =>
//       prevIndex === 0 ? numberOfCards - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tight">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//               {/* Left arrow button */}
//               <button
//                 onClick={handlePrev}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowLeft size={36} className="text-green" />
//               </button>
//               {/* Right arrow button  */}
//               <button
//                 onClick={handleNext}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowRight size={36} className="text-green" />
//               </button>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="lg:w-1/2 w-full">
//             <div className="flex flex-nowrap gap-4 transition-transform duration-500"

//                 >
//               {Array.from({ length: numberOfCards }).map((_, index) => {
//                 const isActive = index >= startIndex;
//                 return (
//                     <div
//                       key={index}
//                       className={`transition-all duration-500 min-w-md ${
//                         !isActive ? "scale-0 opacity-0 hidden" : ""
//                       } `}
//                       >
//                     <SocialCard key={index} index={index % numberOfCards} />
//                   </div>
//                 )
//                 }

//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SocialTrustSection;

"use client";
import React, { useState } from "react";
import AppStore from "@/app/components/ui/AppStore";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import SocialCard from "@/app/components/ui/SocialCard";

const SocialTrustSection = () => {
  const numberOfCards = 5;
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex < numberOfCards - 1) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <section className="py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex lg:flex-row flex-col gap-6">
          <div className="lg:w-1/2 w-full">
            <div className="space-y-5">
              <AppStore />
              <div>
                <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-mainheading dark:text-white font-mont uppercase tracking-tight">
                  For people going places
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-15">
              {/* Left arrow button */}
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className={`inline-flex items-center justify-center lg:w-16 lg:h-16 w-12 h-12 bg-lightborder dark:bg-secondary rounded-full transition-colors cursor-pointer ${
                  startIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primaryhover"
                }`}
              >
                <GoArrowLeft className="text-mainheading dark:text-primary lg:size-9 size-6" />
              </button>
              {/* Right arrow button */}
              <button
                onClick={handleNext}
                disabled={startIndex === numberOfCards - 1}
                className={`inline-flex items-center justify-center lg:w-16 lg:h-16 w-12 h-12 bg-lightborder dark:bg-secondary rounded-full transition-colors cursor-pointer ${
                  startIndex === numberOfCards - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primaryhover"
                }`}
              >
                <GoArrowRight className="text-mainheading dark:text-primary lg:size-9 size-6" />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-4xl overflow-hidden">
              <div
                className="flex transition-all duration-500 ease-in-out"
                style={{ transform: `translateX(-${startIndex * 100}%)` }}
              >
                {Array.from({ length: numberOfCards }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-full flex-shrink-0 ${
                      index === startIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75"
                    }`}
                  >
                    <SocialCard index={index % numberOfCards} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialTrustSection;
