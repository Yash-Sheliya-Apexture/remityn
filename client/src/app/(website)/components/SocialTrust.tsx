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

// "use client";
// import React, { useState } from "react";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "@/app/components/ui/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;
//   const [startIndex, setStartIndex] = useState(0);

//   const handleNext = () => {
//     if (startIndex < numberOfCards - 1) {
//       setStartIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (startIndex > 0) {
//       setStartIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col gap-6">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <div>
//                 <h1 className="text-5xl md:text-6xl xl:text-8xl leading-14 lg:leading-24 font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//                   See Why People
//                   <span className="text-primary"> Trust Us </span>
//                 </h1>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 pt-15">
//               {/* Left arrow button */}
//               <button
//                 onClick={handlePrev}
//                 disabled={startIndex === 0}
//                 className={`inline-flex items-center justify-center lg:w-16 lg:h-16 w-12 h-12 bg-lightborder dark:bg-secondary rounded-full transition-colors cursor-pointer ${
//                   startIndex === 0
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-primaryhover"
//                 }`}
//               >
//                 <GoArrowLeft className="text-mainheading dark:text-primary lg:size-9 size-6" />
//               </button>
//               {/* Right arrow button */}
//               <button
//                 onClick={handleNext}
//                 disabled={startIndex === numberOfCards - 1}
//                 className={`inline-flex items-center justify-center lg:w-16 lg:h-16 w-12 h-12 bg-lightborder dark:bg-secondary rounded-full transition-colors cursor-pointer ${
//                   startIndex === numberOfCards - 1
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-primaryhover"
//                 }`}
//               >
//                 <GoArrowRight className="text-mainheading dark:text-primary lg:size-9 size-6" />
//               </button>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="lg:w-1/2 w-full">
//             <div className="relative rounded-4xl overflow-hidden">
//               <div
//                 className="flex transition-all duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${startIndex * 100}%)` }}
//               >
//                 {Array.from({ length: numberOfCards }).map((_, index) => (
//                   <div
//                     key={index}
//                     className={`w-full flex-shrink-0 ${
//                       index === startIndex
//                         ? "opacity-100 scale-100"
//                         : "opacity-0 scale-75"
//                     }`}
//                   >
//                     <SocialCard index={index % numberOfCards} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SocialTrustSection;

// import React, { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import logo from "../../assets/images/google.svg";

// const StarRating = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(<FaStar key={i} className="inline-block text-[#FBBF24]" />);
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt key={i} className="inline-block text-[#FBBF24]" />
//       );
//     } else {
//       stars.push(<FaStar key={i} className="inline-block" />);
//     }
//   }

//   return <div className="inline-block text-white">{stars}</div>;
// };

// const ReviewCard = ({ reviewerName, avatarUrl, rating, comment }) => {
//   return (
//     <div className="bg-white border border-[#D3D3D3] rounded-medium shadow-main lg:p-6 p-4 flex flex-col items-start relative mb-4">
//       <div className="flex md:flex-row items-center w-full justify-center">
//         <div className="flex flex-col md:flex-row items-center md:mr-auto">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="font-medium text-[#1C1A1D] lg:text-medium text-small text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>

//       <div className="absolute top-4 right-4 md:top-8">
//         <img src={logo} alt="" className="lg:h-10 h-8" />
//       </div>

//       <div className="text-dark-black font-normal mt-4 leading-6">
//         {comment}
//       </div>
//     </div>
//   );
// };

// const ReviewCards = () => {
//   const [reviewGroups, setReviewGroups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const columnRefs = useRef([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setReviewGroups(data.reviewGroups);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   if (loading) {
//     return <div>Loading reviews...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <section className="Reviews md:pt-14 pt-10">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
//           {reviewGroups.map((group, index) => (
//             <div
//               key={group.id}
//               className={`marquee-column marquee-column-${index + 1}`}
//               ref={(el) => (columnRefs.current[index] = el)}
//             >
//               <div className="marquee-content">
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// import { useState } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import logo from "../../../../public/assets/icon/google.svg";

// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(<FaStar key={i} className="inline-block text-[#FBBF24]" />);
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt key={i} className="inline-block text-[#FBBF24]" />
//       );
//     } else {
//       stars.push(<FaStar key={i} className="inline-block" />);
//     }
//   }

//   return <div className="inline-block text-white">{stars}</div>;
// };

// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-white border border-[#D3D3D3] rounded-medium shadow-main lg:p-6 p-4 flex flex-col items-start relative mb-4">
//       <div className="flex md:flex-row items-center w-full justify-center">
//         <div className="flex flex-col md:flex-row items-center md:mr-auto">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="font-medium text-[#1C1A1D] lg:text-medium text-small text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>

//       <div className="absolute top-4 right-4 md:top-8">
//         <img src={logo} alt="" className="lg:h-10 h-8" />
//       </div>

//       <div className="text-dark-black font-normal mt-4 leading-6">
//         {comment}
//       </div>
//     </div>
//   );
// };

// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const columnRefs = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = (await response.json()) as ReviewData; // Type assertion here
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         // Type 'err' as 'any' or 'unknown' or 'Error' if you are sure it's an Error
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   if (loading) {
//     return <div>Loading reviews...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <section className="Reviews md:pt-14 pt-10">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
//           {reviewGroups.map((group, index) => (
//             <div
//               key={group.id}
//               className={`marquee-column marquee-column-${index + 1}`}
//               ref={(el) => (columnRefs.current[index] = el as HTMLDivElement)} // Type assertion here
//             >
//               <div className="marquee-content">
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client"; // Mark this component as a client component

// import { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { FaStarHalf } from "react-icons/fa6";

// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(<FaStar key={i} className="inline-block text-[#FBBF24] dark:text-white" />);
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt  key={i} className="inline-block text-[#FBBF24] dark:text-white" />
//       );
//     } else {
//       stars.push(<FaStar key={i} className="inline-block" />);
//     }
//   }

//   return (
//     <div className="inline-block text-white dark:text-background">{stars}</div>
//   );
// };

// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-white dark:bg-white/5 border rounded-2xl lg:p-6 p-4 flex flex-col items-start relative mb-4">
//       <div className="flex md:flex-row items-center w-full justify-center">
//         <div className="flex flex-col md:flex-row items-center md:mr-auto">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="text-mainheading dark:text-primary font-semibold text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>

//       <div className="text-mainheading dark:text-gray-300 leading-relaxed font-normal mt-8 text-lg">
//         {comment}
//       </div>

//     </div>
//   );
// };

// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const columnRefs = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = (await response.json()) as ReviewData; // Type assertion here
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         // Type 'err' as 'any' or 'unknown' or 'Error' if you are sure it's an Error
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   if (loading) {
//     return <div>Loading reviews...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <section className="Reviews md:py-14 py-10">
//       <div className="container mx-auto">
//         <div className="w-full mb-10">
//           <h1 className="text-5xl md:text-6xl xl:text-8xl leading-14 lg:leading-24 font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Real Reviews from
//             <span className="text-primary"> Real Travelers</span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm max-w-1/2 text-gray-500 leading-relaxed dark:text-gray-300 mt-5">
//             Hear directly from globetrotters who’ve trusted us for their
//             currency exchange needs. From smooth transactions to unbeatable
//             rates, see why travelers around the world choose us every time.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px] max-h-[150vh] overflow-hidden relative">
//           {reviewGroups.map((group, index) => (
//             <div
//               key={group.id}
//               className={`marquee-column marquee-column-${index + 1}`}
//               ref={(el) => (columnRefs.current[index] = el as HTMLDivElement)} // Type assertion here
//             >
//               <div className="marquee-content">
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//               </div>
//             </div>
//           ))}
//           <div className="absolute inset-x-0 bottom-0 h-24 rounded-t-2xl bg-gradient-to-t from-gray-50 dark:from-background"></div>
//           <div className="absolute inset-x-0 top-0 h-24 rounded-2xl bg-gradient-to-b from-gray-50 dark:from-background"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client"; // Mark this component as a client component

// import { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// // Note: FaStarHalf seems unused in the original StarRating, sticking with FaStarHalfAlt
// // import { FaStarHalf } from "react-icons/fa6";

// // --- StarRating Component ---
// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(<FaStar key={`full-${i}`} className="inline-block text-[#FBBF24] dark:text-white" />);
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt key={`half-${i}`} className="inline-block text-[#FBBF24] dark:text-white" />
//       );
//     } else {
//       // Use a different color for empty stars for better contrast
//       stars.push(<FaStar key={`empty-${i}`} className="inline-block text-gray-300 dark:text-gray-600" />);
//     }
//   }

//   return (
//     // Removed text-white dark:text-background as star colors are specific
//     <div className="inline-block">{stars}</div>
//   );
// };

// // --- ReviewCard Component ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-white dark:bg-white/5 border dark:border-gray-700 rounded-2xl lg:p-6 p-4 flex flex-col items-start relative mb-6"> {/* Added mb-6 for spacing */}
//       <div className="flex md:flex-row items-center w-full justify-center">
//         <div className="flex flex-col md:flex-row items-center md:mr-auto">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="text-mainheading dark:text-primary font-semibold text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>

//       <div className="text-mainheading dark:text-gray-300 leading-relaxed font-normal mt-4 md:mt-6 text-base lg:text-lg"> {/* Adjusted margin and text size */}
//         {comment}
//       </div>
//     </div>
//   );
// };

// // --- Interfaces for Review Data ---
// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// // --- ReviewCards Component (Main Component) ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   // Use a more specific type for the ref array if possible, otherwise use any[] or HTMLDivElement[]
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]); // Refs for content wrappers

//   // Effect to fetch reviews
//   useEffect(() => {
//     const fetchReviews = async () => {
//       setLoading(true); // Set loading true at the start
//       setError(null); // Reset error
//       try {
//         // Ensure the path is correct relative to your public folder
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = (await response.json()) as ReviewData;
//         // Make sure reviewGroups exist and is an array
//         if (data && Array.isArray(data.reviewGroups)) {
//            setReviewGroups(data.reviewGroups);
//         } else {
//            console.error("Fetched data is not in the expected format:", data);
//            setReviewGroups([]); // Set to empty array if format is wrong
//            throw new Error("Review data is not in the expected format.");
//         }
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err instanceof Error ? err : new Error("An unknown error occurred"));
//         setReviewGroups([]); // Clear reviews on error
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []); // Empty dependency array: fetch only once on mount

//   // Effect for setting up infinite scrolling
//   useEffect(() => {
//     // Only run if reviews are loaded and refs are available
//     if (loading || error || reviewGroups.length === 0) {
//        return;
//     }

//     const cleanupFunctions: (() => void)[] = [];

//     reviewGroups.forEach((_, index) => {
//       const columnEl = columnRefs.current[index];
//       const contentEl = contentRefs.current[index];

//       if (columnEl && contentEl) {
//         // --- Cloning Logic ---
//         // Clear previous clones if any (e.g., on hot reload or data change)
//         const existingClones = columnEl.querySelectorAll('.marquee-content-clone');
//         existingClones.forEach(clone => clone.remove());

//         // Clone the original content
//         const clonedContent = contentEl.cloneNode(true) as HTMLDivElement;
//         clonedContent.classList.add('marquee-content-clone'); // Mark as clone
//         clonedContent.setAttribute('aria-hidden', 'true'); // Hide from screen readers

//         // Append the clone
//         columnEl.appendChild(clonedContent);

//         // --- Dynamic Animation Duration ---
//         // Calculate duration based on height for consistent speed
//         const contentHeight = contentEl.offsetHeight; // Height of the original content
//         // Adjust the factor (e.g., 35) to control speed: lower = faster, higher = slower
//         const duration = contentHeight / 35; // pixels per second

//         // Apply animation dynamically
//         // Ensure animation names match CSS (scroll-up-1, scroll-up-2, etc.)
//         const animationName = `scroll-up-${(index % 3) + 1}`; // Cycle through 3 animations
//         columnEl.style.setProperty('--marquee-duration', `${duration}s`);
//         columnEl.style.animationName = animationName;
//         columnEl.style.animationDuration = `var(--marquee-duration)`;
//         columnEl.style.animationTimingFunction = 'linear';
//         columnEl.style.animationIterationCount = 'infinite';

//          // Add to cleanup
//          cleanupFunctions.push(() => {
//              const clone = columnEl.querySelector('.marquee-content-clone');
//              if(clone) clone.remove();
//              columnEl.style.animationName = ''; // Remove animation properties on cleanup
//              columnEl.style.animationDuration = '';
//              columnEl.style.animationTimingFunction = '';
//              columnEl.style.animationIterationCount = '';
//          });

//       } else {
//          console.warn(`Ref missing for column or content at index ${index}`);
//       }
//     });

//      // Cleanup function to run when component unmounts or dependencies change
//      return () => {
//          cleanupFunctions.forEach(cleanup => cleanup());
//      };

//   // Rerun this effect if reviewGroups data changes, or loading/error state changes
//   }, [reviewGroups, loading, error]);

//   if (loading) {
//     return <div className="text-center py-10">Loading reviews...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-500">Error loading reviews: {error.message}</div>;
//   }

//   if (!reviewGroups || reviewGroups.length === 0) {
//      return <div className="text-center py-10">No reviews available.</div>
//   }

//   return (
//     <section className="Reviews md:py-14 py-10 bg-gray-50 dark:bg-background"> {/* Added background */}
//       <div className="container mx-auto px-4"> {/* Added horizontal padding */}
//         <div className="w-full mb-10 md:mb-16 text-center"> {/* Centered heading */}
//           <h1 className="text-4xl md:text-6xl xl:text-7xl leading-tight lg:leading-tight font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Real Reviews from
//             <span className="text-primary"> Real Travelers</span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm max-w-3xl mx-auto text-gray-600 dark:text-gray-400 mt-5 leading-relaxed"> {/* Centered paragraph, adjusted width/color */}
//             Hear directly from globetrotters who’ve trusted us for their
//             currency exchange needs. From smooth transactions to unbeatable
//             rates, see why travelers around the world choose us every time.
//           </p>
//         </div>

//         {/* --- Grid for Review Columns --- */}
//         {/*
//            - Added 'overflow-hidden' to the grid container.
//            - Set a fixed height `h-[700px]` and max-h `max-h-[80vh]` for responsiveness.
//            - `relative` is needed for the absolute positioned gradient overlays.
//         */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px] max-h-[80vh] overflow-hidden relative">
//           {reviewGroups.map((group, index) => (
//             <div
//               key={group.id || `group-${index}`} // Added fallback key
//               className={`marquee-column marquee-column-${(index % 3) + 1}`} // Cycle classes 1, 2, 3
//               ref={(el) => (columnRefs.current[index] = el)} // Assign ref to the column container
//               style={{ animationPlayState: 'running' }} // Ensure animation runs
//             >
//               {/* Original Content Wrapper */}
//               <div
//                 className="marquee-content"
//                 ref={(el) => (contentRefs.current[index] = el)} // Assign ref to the content wrapper
//                >
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//                </div>
//                {/* Cloned content will be appended here by useEffect */}
//             </div>
//           ))}

//           {/* --- Gradient Overlays --- */}
//           {/* Top Fade */}
//           <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gray-50 dark:from-background pointer-events-none"></div>
//            {/* Bottom Fade */}
//           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-50 dark:from-background pointer-events-none"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

"use client"; // Mark this component as a client component

import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// FaStarHalf is imported but not used in the original StarRating, keeping it just in case
// import { FaStarHalf } from "react-icons/fa6";

// --- StarRating Component ---
interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < maxRating; i++) {
    if (i < fullStars) {
      stars.push(
        <FaStar
          key={i}
          className="inline-block text-[#FBBF24] dark:text-white"
        /> // Adjusted dark mode color slightly
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className="inline-block text-[#FBBF24] dark:text-white"
        /> // Adjusted dark mode color slightly
      );
    } else {
      // Use a different color for empty stars for better contrast
      stars.push(
        <FaStar
          key={i}
          className="inline-block text-gray-300 dark:text-white"
        />
      );
    }
  }

  // Adjusted text color for better visibility in both modes
  return <div className="inline-block">{stars}</div>;
};

// --- ReviewCard Component ---
interface ReviewCardProps {
  reviewerName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  avatarUrl,
  rating,
  comment,
}) => {
  return (
    <div className="bg-white dark:bg-white/5 border rounded-2xl lg:p-6 p-4 flex flex-col items-start relative mb-4 flex-shrink-0">
      {/* Added flex-shrink-0 */}
      <div className="flex md:flex-row items-center w-full justify-center md:justify-start">
        {/* Adjusted alignment */}
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={avatarUrl}
            alt={`Avatar of ${reviewerName}`}
            className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
          />
          <div className="flex flex-col items-center md:items-start">
            <div className="text-mainheading dark:text-primary font-semibold text-nowrap">
              {reviewerName}
            </div>
            <StarRating rating={rating} />
          </div>
        </div>
      </div>
      <div className="text-mainheading dark:text-gray-300 leading-relaxed font-normal mt-4 md:mt-6 text-base md:text-xl">
        {comment}
      </div>
    </div>
  );
};

// --- Interfaces for Data Structure ---
interface Review {
  reviewerName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
}

interface ReviewGroup {
  id: string;
  reviews: Review[];
}

interface ReviewData {
  reviewGroups: ReviewGroup[];
}

// --- ReviewCards Component (Main Component) ---
const ReviewCards: React.FC = () => {
  const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  // Ref to hold references to the column divs
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  // --- Fetch Data ---
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error
      try {
        const response = await fetch("/Review.json"); // Make sure this path is correct
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ReviewData = await response.json();
        // Ensure data conforms to expected structure (basic check)
        if (!data || !Array.isArray(data.reviewGroups)) {
          throw new Error("Invalid data structure received from Review.json");
        }
        setReviewGroups(data.reviewGroups);
      } catch (err: any) {
        console.error("Failed to fetch reviews:", err); // Log error for debugging
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []); // Empty dependency array means this runs once on mount

  // --- Infinite Scroll Setup ---
  useEffect(() => {
    // Only run this effect if data is loaded and we have groups
    if (loading || error || reviewGroups.length === 0) {
      return;
    }

    const columns = columnRefs.current;

    columns.forEach((columnEl) => {
      if (!columnEl) return; // Skip if ref is null for some reason

      const contentEl =
        columnEl.querySelector<HTMLDivElement>(".marquee-content");
      if (!contentEl) return; // Skip if content element not found

      // --- Content Duplication Logic ---
      // Check if content is already duplicated to prevent duplication on hot reloads/re-renders
      const originalContentHeight = contentEl.scrollHeight / 2; // Assumes content is already duplicated by CSS or previous runs
      const currentScrollHeight = contentEl.scrollHeight;
      const childrenCount = contentEl.children.length;
      const expectedChildrenCount = reviewGroups[0]?.reviews.length * 2; // Estimate based on first group

      // Basic check to see if duplication likely already happened
      // This isn't foolproof but helps prevent infinite duplication loops during development HMR
      let needsDuplication = true;
      if (childrenCount > 0 && childrenCount === expectedChildrenCount) {
        // console.log("Skipping duplication, seems already done.");
        needsDuplication = false;
      }
      // More robust check: see if the scrollHeight is roughly double the height of its first child * number of original items
      if (contentEl.children.length > 0) {
        const firstChildHeight = (contentEl.children[0] as HTMLElement)
          .offsetHeight;
        const estimatedOriginalHeight = firstChildHeight * (childrenCount / 2); // Approximate original height
        // If current height is already much larger than estimated original height, assume duplication happened
        // Add some tolerance with margins/paddings
        if (currentScrollHeight > estimatedOriginalHeight * 1.8) {
          // console.log("Skipping duplication based on height check.");
          needsDuplication = false;
        }
      }

      if (needsDuplication) {
        // console.log(`Duplicating content for column...`);
        const originalChildren = Array.from(contentEl.children);
        originalChildren.forEach((child) => {
          const clone = child.cloneNode(true);
          contentEl.appendChild(clone);
        });
      }

      // --- Start Animation (handled by CSS) ---
      // No JS needed to manually start/control animation timing if using CSS animations correctly
    });

    // No cleanup needed for this specific effect as we are only manipulating the DOM once
    // and relying on CSS for the continuous animation loop.
  }, [loading, error, reviewGroups]); // Rerun when loading/error state changes or data arrives

  // --- Render Logic ---
  if (loading) {
    // Optional: Add a more visually appealing loader
    return <div className="text-center p-10">Loading reviews...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        Error loading reviews: {error.message}
      </div>
    );
  }

  if (reviewGroups.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500">
        No reviews available yet.
      </div>
    );
  }

  return (
    <section className="Reviews md:py-14 py-10 bg-gray-50 dark:bg-background">
      {/* Added background */}
      <div className="container mx-auto px-4">
        {/* Added horizontal padding */}
        <div className="w-full mb-10 lg:mb-16">
          <h1 className="text-5xl md:text-6xl xl:text-8xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
            Honest Reviews
            <span className="text-primary"> Real Travelers Like You </span>
          </h1>

          <p className="lg:text-lg sm:text-base text-sm max-w-full md:max-w-3xl text-gray-500 leading-relaxed dark:text-gray-300 mt-5 text-left">
            {/* Adjusted max-width and alignment */}
            Hear directly from globetrotters who’ve trusted us for their
            currency exchange needs. From smooth transactions to unbeatable
            rates, see why travelers around the world choose us every time.
          </p>
        </div>
        {/* Ensure the parent has a defined height and overflow hidden */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-[600px] md:h-[1000px] overflow-hidden relative">
          {/* Adjusted height and gap */}
          {reviewGroups.slice(0, 3).map(
            (
              group,
              index // Ensure only max 3 groups are rendered if more exist
            ) => (
              <div
                key={group.id || `group-${index}`} // Add fallback key
                // Assign specific classes for CSS animation targeting
                className={`lg:marquee-column marquee-column-${index + 1}`}
                // Assign ref to the array element
                ref={(el: HTMLDivElement | null) => {
                  // Ensure type and use curly braces
                  columnRefs.current[index] = el;
                }}
              >
                {/* This div will contain the duplicated content */}
                <div className="marquee-content flex flex-col space-y-4 md:space-y-6">
                  {/* Added spacing */}
                  {group.reviews.map((review, reviewIndex) => (
                    <ReviewCard
                      key={reviewIndex} // Key should be unique within this list
                      {...review}
                    />
                  ))}
                </div>
              </div>
            )
          )}
          {/* Gradient Fades */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none"></div>
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gray-50 via-gray-50/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCards;
