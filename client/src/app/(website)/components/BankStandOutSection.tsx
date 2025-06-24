// "use client";

// // components/BankStandOutSection.tsx
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// // Define the structure for each accordion item's data
// interface AccordionItemData {
//   id: string;
//   title: string;
//   content: string;
//   imageSrc: string;
// }

// // Data for the accordion items
// const accordionData: AccordionItemData[] = [
//   {
//     id: "innovation",
//     title: "Innovation",
//     content:
//       "Interdum in nec scelerisque nunc et sit venenatis pretium enim tellus aliquet in lectus rhoncus non nisl feugiat velit odio volutpat eget mattis nisl tincidunt ornare commodo scelerisque quis.",
//     imageSrc: "/assets/images/about1.jpeg",
//   },
//   {
//     id: "technology",
//     title: "Technology",
//     content:
//       "Our cutting-edge technology platforms provide seamless and secure banking experiences, tailored to meet your evolving financial needs efficiently.",
//     imageSrc: "/assets/images/about2.jpeg",
//   },
//   {
//     id: "security",
//     title: "Security",
//     content:
//       "We prioritize your financial safety with robust security measures, employing advanced protocols to protect your assets and data around the clock.",
//     imageSrc: "/assets/images/about3.jpeg",
//   },
// ];

// const BankStandOutSection: React.FC = () => {
//   // State to track the active accordion item, default to the first item
//   const [activeItemId, setActiveItemId] = useState<string>(accordionData[0].id);
//   // State for the currently displayed image
//   const [currentImage, setCurrentImage] = useState<string>(
//     accordionData[0].imageSrc
//   );

//   // Effect to update the image when the active item changes
//   useEffect(() => {
//     const activeItem = accordionData.find((item) => item.id === activeItemId);
//     if (activeItem) {
//       setCurrentImage(activeItem.imageSrc);
//     }
//   }, [activeItemId]);

//   // Handler for clicking an accordion item
//   const handleItemClick = (id: string) => {
//     setActiveItemId(id);
//   };

//   // Find the alt text for the current image
//   const currentImageAlt =
//     accordionData.find((item) => item.id === activeItemId)?.title ||
//     "Bank feature";

//   return (
//     <div className="bg-background py-12 md:py-20 px-4">
//       <div className="container mx-auto px-4">
//         <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-8 max-w-2xl leading-tight text-mainheadingWhite lg:block hidden">
//           Secure & Trusted{" "}
//           <span className="text-primary">Global Exchange Rates</span>
//         </h3>

//         {/* Content Layout: Image on Left, Accordion on Right */}
//         <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
//           {/* Left Side: Image Display */}
//           <div className="w-full md:w-1/2 lg:w-[55%]">
//             {" "}
//             {/* Adjusted width percentage */}
//             <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
//               <Image
//                 src={currentImage}
//                 alt={currentImageAlt}
//                 layout="fill"
//                 objectFit="cover"
//                 key={currentImage} // Helps with re-rendering for transitions if CSS is set up
//                 className="transition-opacity duration-300 ease-in-out" // Basic opacity transition
//               />
//             </div>
//           </div>

//           {/* Right Side: Static Description + Accordion */}
//           <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col">
//             {/* Accordion Group */}
//             <div className="divide-y divide-gray-200">
//               {accordionData.map((item) => (
//                 <div key={item.id} className="py-3">
//                   {" "}
//                   {/* Vertical padding for each item */}
//                   <button
//                     onClick={() => handleItemClick(item.id)}
//                     aria-expanded={activeItemId === item.id}
//                     aria-controls={`accordion-content-${item.id}`}
//                     className="w-full flex justify-between items-center text-left py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
//                   >
//                     <h3
//                       className={`text-xl font-medium ${
//                         activeItemId === item.id
//                           ? "text-blue-600"
//                           : "text-gray-900"
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     {/* Chevron Icons */}
//                     {activeItemId === item.id ? (
//                       // Downward Chevron (Active)
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className="w-5 h-5 text-blue-600"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                         />
//                       </svg>
//                     ) : (
//                       // Rightward Chevron (Inactive)
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className="w-5 h-5 text-gray-400"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                   {/* Accordion Item Content (Conditionally Rendered) */}
//                   {activeItemId === item.id && (
//                     <div
//                       id={`accordion-content-${item.id}`}
//                       role="region"
//                       aria-labelledby={`accordion-title-${item.id}`} // Assuming title h3 gets this id
//                       className="pt-2 pb-1 pr-6"
//                     >
//                       <p className="text-sm text-gray-500 leading-relaxed">
//                         {item.content}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankStandOutSection;

// "use client";
// // components/BankStandOutSection.tsx
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// // Define the structure for each accordion item's data
// interface AccordionItemData {
//   id: string;
//   title: string;
//   content: string;
//   imageSrc: string;
// }

// // Data for the accordion items
// const accordionData: AccordionItemData[] = [
//   {
//     id: "innovation",
//     title: "Innovation",
//     content:
//       "Interdum in nec scelerisque nunc et sit venenatis pretium enim tellus aliquet in lectus rhoncus non nisl feugiat velit odio volutpat eget mattis nisl tincidunt ornare commodo scelerisque quis.",
//     imageSrc: "/assets/images/about1.jpeg", // Ensure this path is correct relative to your public folder
//   },
//   {
//     id: "technology",
//     title: "Technology",
//     content:
//       "Our cutting-edge technology platforms provide seamless and secure banking experiences, tailored to meet your evolving financial needs efficiently.",
//     imageSrc: "/assets/images/about2.jpeg", // Ensure this path is correct
//   },
//   {
//     id: "security",
//     title: "Security",
//     content:
//       "We prioritize your financial safety with robust security measures, employing advanced protocols to protect your assets and data around the clock.",
//     imageSrc: "/assets/images/about3.jpeg", // Ensure this path is correct
//   },
// ];

// const BankStandOutSection: React.FC = () => {
//   const [activeItemId, setActiveItemId] = useState<string>(accordionData[0].id);
//   const [currentImage, setCurrentImage] = useState<string>(
//     accordionData[0].imageSrc
//   );

//   useEffect(() => {
//     const activeItem = accordionData.find((item) => item.id === activeItemId);
//     if (activeItem) {
//       setCurrentImage(activeItem.imageSrc);
//     }
//   }, [activeItemId]);

//   const handleItemClick = (id: string) => {
//     setActiveItemId(id);
//   };

//   const currentImageAlt =
//     accordionData.find((item) => item.id === activeItemId)?.title ||
//     "Bank feature";

//   // Define border thickness. You can adjust this.
//   const borderThickness = "2px";

//   return (
//     // Added `position: relative` to this outer div for the absolute positioned borders.
//     // Ensure `bg-background` is defined in your tailwind.config.js or use a standard color e.g. `bg-white` or `bg-gray-50`.
//     <div className="bg-background py-12 md:py-20 px-4 relative">
//       {/* Animated Border Elements */}
//       {/* Top border */}
//       <div
//         className="absolute top-0 left-0 bg-red-500 animate-draw-top"
//         style={{ height: borderThickness }}
//       ></div>
//       {/* Right border */}
//       <div
//         className="absolute top-0 right-0 bg-red-500 animate-draw-right"
//         style={{ width: borderThickness }}
//       ></div>
//       {/* Bottom border */}
//       <div
//         className="absolute bottom-0 right-0 bg-red-500 animate-draw-bottom"
//         style={{ height: borderThickness }}
//       ></div>
//       {/* Left border */}
//       <div
//         className="absolute bottom-0 left-0 bg-red-500 animate-draw-left"
//         style={{ width: borderThickness }}
//       ></div>

//       {/* Original content container */}
//       <div className="container mx-auto px-4">
//         {" "}
//         {/* Added another px-4 here from your original code, ensure this is intended */}
//         {/*
//             The title "Secure & Trusted Global Exchange Rates" was in your provided code.
//             The original screenshot had "What makes our bank stand out...".
//             I'm keeping your updated title.
//             */}
//         <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-8 max-w-2xl leading-tight text-mainheadingWhite lg:block hidden">
//           Secure & Trusted{" "}
//           <span className="text-primary">Global Exchange Rates</span>
//         </h3>
//         {/* Your original title (from screenshot) - uncomment if you prefer this one
//             <h2 className="text-3xl sm:text-4xl lg:text-[40px] leading-tight font-bold text-gray-900 mb-10 md:mb-16 text-left">
//             What makes our bank <br />
//             stand out from the rest?
//             </h2>
//             */}
//         {/* Static Description Text from original screenshot - you removed this in your update. Add back if needed.
//             <p className="text-gray-500 text-sm leading-relaxed mb-8 md:hidden">  This was originally on the right side for desktop
//                 Interdum in nec scelerisque nunc et sit venenatis pretium enim tellus aliquet in lectus rhoncus non nisl feugiat velit odio volutpat eget mattis nisl tincidunt ornare commodo scelerisque quis.
//                 </p>
//             */}
//         <div className="flex flex-col items-center md:flex-row gap-10 lg:gap-16">
//           <div className="w-full md:w-1/2 lg:w-[55%]">
//             <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
//               {" "}
//               {/* Added shadow-lg for better depth */}
//               <Image
//                 src={currentImage}
//                 alt={currentImageAlt}
//                 fill // Changed from layout="fill" to fill for Next.js 13+ convention
//                 style={{ objectFit: "cover" }} // Replaces objectFit="cover"
//                 key={currentImage}
//                 className="transition-opacity duration-300 ease-in-out"
//                 priority={
//                   accordionData.findIndex(
//                     (item) => item.imageSrc === currentImage
//                   ) === 0
//                 } // Prioritize loading the first image
//               />
//             </div>
//           </div>

//           <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col">
//             <div>
//               {" "}
//               {/* Slightly darker divide color */}
//               {accordionData.map((item) => (
//                 <div key={item.id} className="py-4">
//                   {" "}
//                   {/* Increased py slightly */}
//                   <button
//                     onClick={() => handleItemClick(item.id)}
//                     aria-expanded={activeItemId === item.id}
//                     aria-controls={`accordion-content-${item.id}`}
//                     className="w-full flex justify-between items-center text-left py-2 focus:outline-none rounded-md group"
//                   >
//                     <h3
//                       className={`text-4xl capitalize font-medium transition-colors duration-200 ${
//                         activeItemId === item.id
//                           ? "text-primary"
//                           : "text-mainheadingWhite" // Added dark mode consideration
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     {activeItemId === item.id ? (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className="w-5 h-5 text-primary"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className="w-5 h-5 text-gray-400 transition-colors duration-200"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                   {activeItemId === item.id && (
//                     <div
//                       id={`accordion-content-${item.id}`}
//                       role="region"
//                       aria-labelledby={`accordion-title-${item.id}`}
//                       className="pt-3 pb-1 pr-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed animate-fadeIn" // Added a simple fadeIn for content
//                     >
//                       <p>{item.content}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankStandOutSection;

// "use client";
// // components/BankStandOutSection.tsx
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// // Define the structure for each accordion item's data
// interface AccordionItemData {
//   id: string;
//   title: string;
//   content: string;
//   imageSrc: string;
// }

// // Data for the accordion items
// const accordionData: AccordionItemData[] = [
//   {
//     id: "innovation",
//     title: "Innovation",
//     content:
//       "Interdum in nec scelerisque nunc et sit venenatis pretium enim tellus aliquet in lectus rhoncus non nisl feugiat velit odio volutpat eget mattis nisl tincidunt ornare commodo scelerisque quis.",
//     imageSrc: "/assets/images/about1.jpeg", // Ensure this path is correct
//   },
//   {
//     id: "technology",
//     title: "Technology",
//     content:
//       "Our cutting-edge technology platforms provide seamless and secure banking experiences, tailored to meet your evolving financial needs efficiently.",
//     imageSrc: "/assets/images/about2.jpeg", // Ensure this path is correct
//   },
//   {
//     id: "security",
//     title: "Security",
//     content:
//       "We prioritize your financial safety with robust security measures, employing advanced protocols to protect your assets and data around the clock.",
//     imageSrc: "/assets/images/about3.jpeg", // Ensure this path is correct
//   },
// ];

// const BankStandOutSection: React.FC = () => {
//   const [activeItemId, setActiveItemId] = useState<string>(accordionData[0].id);
//   const [currentImage, setCurrentImage] = useState<string>(
//     accordionData[0].imageSrc
//   );

//   useEffect(() => {
//     const activeItem = accordionData.find((item) => item.id === activeItemId);
//     if (activeItem) {
//       setCurrentImage(activeItem.imageSrc);
//     }
//   }, [activeItemId]);

//   const handleItemClick = (id: string) => {
//     setActiveItemId(id);
//   };

//   const currentImageAlt =
//     accordionData.find((item) => item.id === activeItemId)?.title ||
//     "Bank feature image";

//   return (
//     // Assuming a light background like in the video. Adjust bg-white if your theme is different.
//     <div className="bg-background py-10 md:py-16 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
//           {/* Left Column: Title and Image */}
//           <div className="w-full md:w-1/2 lg:w-[45%]">
//             <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite lg:block hidden">
//               Secure & Trusted{" "}
//               <span className="text-primary">Global Exchange Rates</span>
//             </h3>
//             <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
//               <Image
//                 src={currentImage}
//                 alt={currentImageAlt}
//                 fill
//                 style={{ objectFit: "cover" }}
//                 key={currentImage} // Key change triggers re-render and transition
//                 className="transition-opacity duration-500 ease-in-out" // Fade transition for image
//                 priority={currentImage === accordionData[0].imageSrc} // Prioritize first image
//               />
//             </div>
//           </div>

//           {/* Right Column: Static Text and Accordion */}
//           {/* Apply margin-top on medium screens to align with content, adjust value as needed */}
//           <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col md:mt-24">
//             <div className="space-y-5">
//               {accordionData.map((item, index) => (
//                 <div key={item.id}>
//                   {" "}
//                   {/* Top border for items except first */}
//                   <button
//                     onClick={() => handleItemClick(item.id)}
//                     aria-expanded={activeItemId === item.id}
//                     aria-controls={`accordion-content-${item.id}`}
//                     className="w-full flex items-center gap-5 text-left py-5 px-1 focus:outline-none group"
//                   >
//                     <h3
//                       className={`text-4xl font-semibold transition-all duration-300 ease-linear ${
//                         activeItemId === item.id
//                           ? "text-primary"
//                           : "text-mainheadingWhite"
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     {activeItemId === item.id ? (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5} // Slightly thicker to match video
//                         stroke="currentColor"
//                         className="size-6 text-primary transition-all ease-linear duration-300"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M19.5 8.25l-7.5 7.5-7.5-7.5" // Chevron down
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5} // Slightly thicker
//                         stroke="currentColor"
//                         className={`size-6 text-mainheadingWhite transition-all ease-linear duration-300`}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M8.25 4.5l7.5 7.5-7.5 7.5" // Chevron right
//                         />
//                       </svg>
//                     )}
//                   </button>

//                   {/* Accordion Content with slide and fade animation */}
//                   <div
//                     id={`accordion-content-${item.id}`}
//                     role="region"
//                     aria-labelledby={`accordion-title-${item.id}`}
//                     className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                       activeItemId === item.id
//                         ? "max-h-[300px] opacity-100" // Adjust max-h based on typical content length
//                         : "max-h-0 opacity-0"
//                     }`}
//                   >
//                     {/* Padding for content inside the animated div */}
//                     <div
//                       className={`pt-1 pb-5 pr-8 pl-1 text-xl max-w-2xl leading-relaxed`}
//                     >
//                       <p>{item.content}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankStandOutSection;

// "use client";
// // components/BankStandOutSection.tsx
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// // Define the structure for each accordion item's data
// interface AccordionItemData {
//   id: string;
//   title: string;
//   content: string;
//   imageSrc: string;
// }

// // Data for the accordion items
// const accordionData: AccordionItemData[] = [
//   {
//     id: "innovation",
//     title: "Innovation",
//     content:
//       "Interdum in nec scelerisque nunc et sit venenatis pretium enim tellus aliquet in lectus rhoncus non nisl feugiat velit odio volutpat eget mattis nisl tincidunt ornare commodo scelerisque quis.",
//     imageSrc: "/assets/images/about1.jpeg", // Ensure this path is correct
//   },
//   {
//     id: "technology",
//     title: "Technology",
//     content:
//       "Our cutting-edge technology platforms provide seamless and secure banking experiences, tailored to meet your evolving financial needs efficiently.",
//     imageSrc: "/assets/images/about2.jpeg", // Ensure this path is correct
//   },
//   {
//     id: "security",
//     title: "Security",
//     content:
//       "We prioritize your financial safety with robust security measures, employing advanced protocols to protect your assets and data around the clock.",
//     imageSrc: "/assets/images/about3.jpeg", // Ensure this path is correct
//   },
// ];

// const BankStandOutSection: React.FC = () => {
//   const [activeItemId, setActiveItemId] = useState<string>(accordionData[0].id);
//   const [currentImage, setCurrentImage] = useState<string>(
//     accordionData[0].imageSrc
//   );

//   useEffect(() => {
//     const activeItem = accordionData.find((item) => item.id === activeItemId);
//     if (activeItem) {
//       setCurrentImage(activeItem.imageSrc);
//     }
//   }, [activeItemId]);

//   const handleItemClick = (id: string) => {
//     setActiveItemId(id);
//   };

//   const currentImageAlt =
//     accordionData.find((item) => item.id === activeItemId)?.title ||
//     "Bank feature image";

//   return (
//     // Assuming bg-background is defined in your tailwind.config.js
//     // Replace with a concrete color like bg-white or bg-gray-100 if needed.
//     <div className="bg-background py-10 md:py-16 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
//           {/* Left Column: Title and Image */}
//           <div className="w-full md:w-1/2 lg:w-[45%]">
//             <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//               Secure & Trusted{" "}
//               <span className="text-primary">Global Exchange Rates</span>
//             </h3>
//             <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
//               <Image
//                 src={currentImage}
//                 alt={currentImageAlt}
//                 fill
//                 style={{ objectFit: "cover" }}
//                 key={currentImage} // Key change triggers re-render and transition
//                 className="transition-opacity duration-500 ease-in-out" // Fade transition for image
//                 priority={currentImage === accordionData[0].imageSrc} // Prioritize first image
//               />
//             </div>
//           </div>

//           {/* Right Column: Accordion */}
//           <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col lg:mt-26">
//             <div className="space-y-5">
//               {accordionData.map((item) => (
//                 <div key={item.id}>
//                   <button
//                     onClick={() => handleItemClick(item.id)}
//                     aria-expanded={activeItemId === item.id}
//                     aria-controls={`accordion-content-${item.id}`}
//                     className="w-full flex items-center gap-5 text-left py-5 px-1 focus:outline-none group" // Consider adding focus:ring-2 for accessibility if outline is none
//                   >
//                     <h3
//                       id={`accordion-title-${item.id}`} // Added ID for aria-labelledby
//                       className={`text-4xl font-semibold transition-colors duration-300 ease-in-out ${
//                         // Changed from transition-all
//                         activeItemId === item.id
//                           ? "text-primary"
//                           : "text-mainheadingWhite"
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     {activeItemId === item.id ? (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className="size-6 text-primary transition-transform duration-300 ease-in-out" // Added transition-transform for potential future rotation effects
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M19.5 8.25l-7.5 7.5-7.5-7.5" // Chevron down
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className={`size-6 text-mainheadingWhite transition-transform duration-300 ease-in-out`} // Added transition-transform
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M8.25 4.5l7.5 7.5-7.5 7.5" // Chevron right
//                         />
//                       </svg>
//                     )}
//                   </button>
//                   {/* Accordion Content with smooth grid animation */}
//                   <div
//                     id={`accordion-content-${item.id}`}
//                     role="region"
//                     aria-labelledby={`accordion-title-${item.id}`}
//                     // Apply grid and transition for grid-template-rows and opacity
//                     className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
//                       activeItemId === item.id
//                         ? "grid-rows-[1fr] opacity-100" // Expand to 1 fraction of available space
//                         : "grid-rows-[0fr] opacity-0" // Collapse to 0 fraction
//                     }`}
//                   >
//                     {/* Inner div needs overflow-hidden for the grid animation to work correctly */}
//                     <div
//                       className={`overflow-hidden pt-1 pb-5 pr-8 pl-1 text-xl max-w-2xl leading-relaxed`}
//                     >
//                       <p>{item.content}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankStandOutSection;

// "use client";
// // components/BankStandOutSection.tsx
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// // Define the structure for each accordion item's data
// interface AccordionItemData {
//   id: string;
//   title: string;
//   content: string;
//   imageSrc: string;
// }

// // Data for the accordion items
// const accordionData: AccordionItemData[] = [
//   {
//     id: "innovation",
//     title: "Innovation",
//     content:
//       "Interdum in nec scelerisque nunc et sit venenatis pretium enim tellus aliquet in lectus rhoncus non nisl feugiat velit odio volutpat eget mattis nisl tincidunt ornare commodo scelerisque quis.",
//     imageSrc: "/assets/images/about1.jpeg", // Ensure this path is correct and image exists in /public/assets/images/
//   },
//   {
//     id: "technology",
//     title: "Technology",
//     content:
//       "Our cutting-edge technology platforms provide seamless and secure banking experiences, tailored to meet your evolving financial needs efficiently.",
//     imageSrc: "/assets/images/about2.jpeg", // Ensure this path is correct
//   },
//   {
//     id: "security",
//     title: "Security",
//     content:
//       "We prioritize your financial safety with robust security measures, employing advanced protocols to protect your assets and data around the clock.",
//     imageSrc: "/assets/images/about3.jpeg", // Ensure this path is correct
//   },
// ];

// const BankStandOutSection: React.FC = () => {
//   // Handle case where accordionData might be empty to prevent runtime errors
//   if (accordionData.length === 0) {
//     return (
//       <div className="bg-background py-10 md:py-16 px-4 text-center text-mainheadingWhite">
//         {/* Ensure text-mainheadingWhite and bg-background are defined in your Tailwind config */}
//         No bank features to display.
//       </div>
//     );
//   }

//   const [activeItemId, setActiveItemId] = useState<string>(accordionData[0].id);
//   const [currentImageSrc, setCurrentImageSrc] = useState<string>(
//     accordionData[0].imageSrc
//   );
//   const [currentImageAlt, setCurrentImageAlt] = useState<string>(
//     accordionData[0].title || "Bank feature image"
//   );
//   const [imageOpacity, setImageOpacity] = useState<number>(1); // 1 for visible, 0 for invisible

//   useEffect(() => {
//     const activeItem = accordionData.find((item) => item.id === activeItemId);
//     if (activeItem) {
//       // Check if the image source needs to change
//       if (activeItem.imageSrc !== currentImageSrc) {
//         setImageOpacity(0); // Start fade-out of the current image

//         // After the fade-out duration, change the image source and fade it in
//         const timer = setTimeout(() => {
//           setCurrentImageSrc(activeItem.imageSrc);
//           setCurrentImageAlt(activeItem.title || "Bank feature image");
//           setImageOpacity(1); // Start fade-in of the new image
//         }, 500); // This duration should match the CSS transition duration for opacity (duration-500)

//         return () => clearTimeout(timer); // Cleanup timer on component unmount or if effect re-runs
//       }
//     }
//   }, [activeItemId, currentImageSrc]); // Rerun effect if activeItemId changes, currentImageSrc is included to reflect its state

//   const handleItemClick = (id: string) => {
//     setActiveItemId(id); // This will trigger the useEffect above to handle image changes
//   };

//   return (
//     // Ensure bg-background, text-mainheadingWhite, text-primary are defined in your tailwind.config.js
//     // Example: module.exports = { theme: { extend: { colors: {
//     // 'background': '#1F2937', /* Dark Gray */
//     // 'mainheadingWhite': '#FFFFFF',
//     // 'primary': '#3B82F6' /* Blue */
//     // } } } }
//     <div className="bg-background py-10 md:py-16 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
//           {/* Left Column: Title and Image */}
//           <div className="w-full md:w-1/2 lg:w-[45%]">
//             <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//               Secure & Trusted{" "}
//               <span className="text-primary">Global Exchange Rates</span>
//             </h3>
//             <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
//               <Image
//                 src={currentImageSrc}
//                 alt={currentImageAlt}
//                 fill
//                 style={{
//                   objectFit: "cover",
//                   opacity: imageOpacity, // Opacity controlled by React state for smooth animation
//                 }}
//                 className="transition-all duration-75 ease-linear" // CSS transition for opacity changes
//                 priority={currentImageSrc === accordionData[0].imageSrc} // Prioritize loading for the first image
//               />
//             </div>
//           </div>

//           {/* Right Column: Accordion */}
//           <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col lg:mt-26">
//             <div className="lg:space-y-5 space-y-0">
//               {accordionData.map((item) => (
//                 <div key={item.id}>
//                   <button
//                     onClick={() => handleItemClick(item.id)}
//                     aria-expanded={activeItemId === item.id}
//                     aria-controls={`accordion-content-${item.id}`}
//                     // Added focus-visible for better accessibility and group for hover states
//                     className="w-full flex items-center gap-3 cursor-pointer text-left py-5 px-1 focus:outline-none group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
//                   >
//                     <h3
//                       id={`accordion-title-${item.id}`}
//                       className={`lg:text-4xl text-3xl font-semibold transition-colors duration-300 ease-in-out ${
//                         activeItemId === item.id
//                           ? "text-primary"
//                           : "text-mainheadingWhite group-hover:text-primary/80" // Added hover effect for non-active titles
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     {activeItemId === item.id ? (
//                       <svg // Chevron down icon
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className="size-6 text-primary transition-transform duration-300 ease-in-out"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                         />
//                       </svg>
//                     ) : (
//                       <svg // Chevron right icon
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className={`size-6 text-mainheadingWhite group-hover:text-primary/80 transition-transform duration-300 ease-in-out`}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                   {/* Accordion Content with smooth grid animation */}
//                   <div
//                     id={`accordion-content-${item.id}`}
//                     role="region"
//                     aria-labelledby={`accordion-title-${item.id}`}
//                     className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
//                       activeItemId === item.id
//                         ? "grid-rows-[1fr] opacity-100" // Expand
//                         : "grid-rows-[0fr] opacity-0" // Collapse
//                     }`}
//                   >
//                     {/* Inner div for content, ensures correct animation */}
//                     <div
//                       className={`overflow-hidden pt-1 pb-5 lg:pr-8 pl-1 sm:text-xl text-lg max-w-2xl leading-relaxed text-mainheadingWhite/90`} // Using slightly less bright color for content for readability
//                     >
//                       <p>{item.content}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankStandOutSection;

// "use client";
// // components/BankStandOutSection.tsx
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// // Define the structure for each accordion item's data
// interface AccordionItemData {
//   id: string;
//   title: string;
//   content: string;
//   imageSrc: string;
// }

// // Data for the accordion items
// const accordionData: AccordionItemData[] = [
//   {
//     id: "innovation",
//     title: "Innovation",
//     content:
//       "Interdum in nec scelerisque nunc et sit venenatis pretium enim tellus aliquet in lectus rhoncus non nisl feugiat velit odio volutpat eget mattis nisl tincidunt ornare commodo scelerisque quis.",
//     imageSrc: "/assets/images/about1.jpeg", // Ensure this path is correct
//   },
//   {
//     id: "technology",
//     title: "Technology",
//     content:
//       "Our cutting-edge technology platforms provide seamless and secure banking experiences, tailored to meet your evolving financial needs efficiently.",
//     imageSrc: "/assets/images/about2.jpeg", // Ensure this path is correct
//   },
//   {
//     id: "security",
//     title: "Security",
//     content:
//       "We prioritize your financial safety with robust security measures, employing advanced protocols to protect your assets and data around the clock.",
//     imageSrc: "/assets/images/about3.jpeg", // Ensure this path is correct
//   },
// ];

// const BankStandOutSection: React.FC = () => {
//   if (accordionData.length === 0) {
//     return (
//       <div className="bg-background py-10 md:py-16 px-4 text-center text-mainheadingWhite">
//         No bank features to display.
//       </div>
//     );
//   }

//   const [activeItemId, setActiveItemId] = useState<string>(accordionData[0].id);
//   // State for the image that will be displayed
//   const [currentImageSrc, setCurrentImageSrc] = useState<string>(
//     accordionData[0].imageSrc
//   );
//   const [currentImageAlt, setCurrentImageAlt] = useState<string>(
//     accordionData[0].title || "Bank feature image"
//   );

//   useEffect(() => {
//     const activeItem = accordionData.find((item) => item.id === activeItemId);
//     if (activeItem) {
//       // Update image details if the active item's image is different
//       // This will trigger a re-render, and if currentImageSrc changes,
//       // the Image component's key will change, re-triggering its animation.
//       if (activeItem.imageSrc !== currentImageSrc) {
//         setCurrentImageSrc(activeItem.imageSrc);
//         setCurrentImageAlt(activeItem.title || "Bank feature image");
//       }
//     }
//   }, [activeItemId, currentImageSrc]); // Effect runs when activeItemId changes

//   const handleItemClick = (id: string) => {
//     setActiveItemId(id);
//   };

//   return (
//     <div className="bg-background py-10 md:py-16 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
//           {/* Left Column: Title and Image */}
//           <div className="w-full md:w-1/2 lg:w-[45%]">
//             <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//               Secure & Trusted{" "}
//               <span className="text-primary">Global Exchange Rates</span>
//             </h3>
//             <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
//               <Image
//                 key={currentImageSrc} // Crucial: This makes React re-mount the component on src change
//                 src={currentImageSrc}
//                 alt={currentImageAlt}
//                 fill
//                 style={{
//                   objectFit: "cover",
//                 }}
//                 className="animate-zoomIn" // Apply the Tailwind animation class
//                 priority={currentImageSrc === accordionData[0].imageSrc}
//               />
//             </div>
//           </div>

//           {/* Right Column: Accordion */}
//           <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col lg:mt-26">
//             <div className="lg:space-y-5 space-y-0">
//               {accordionData.map((item) => (
//                 <div key={item.id}>
//                   <button
//                     onClick={() => handleItemClick(item.id)}
//                     aria-expanded={activeItemId === item.id}
//                     aria-controls={`accordion-content-${item.id}`}
//                     className="w-full flex items-center gap-3 cursor-pointer text-left py-5 px-1 focus:outline-none group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
//                   >
//                     <h3
//                       id={`accordion-title-${item.id}`}
//                       className={`lg:text-4xl text-3xl font-semibold transition-colors duration-300 ease-in-out ${
//                         activeItemId === item.id
//                           ? "text-primary"
//                           : "text-mainheadingWhite group-hover:text-primary/80"
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     {activeItemId === item.id ? (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className="size-6 text-primary transition-transform duration-300 ease-in-out"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className={`size-6 text-mainheadingWhite group-hover:text-primary/80 transition-transform duration-300 ease-in-out`}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                   <div
//                     id={`accordion-content-${item.id}`}
//                     role="region"
//                     aria-labelledby={`accordion-title-${item.id}`}
//                     className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
//                       activeItemId === item.id
//                         ? "grid-rows-[1fr] opacity-100"
//                         : "grid-rows-[0fr] opacity-0"
//                     }`}
//                   >
//                     <div
//                       className={`overflow-hidden pt-1 pb-5 lg:pr-8 pl-1 sm:text-xl text-lg max-w-2xl leading-relaxed text-mainheadingWhite/90`}
//                     >
//                       <p>{item.content}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankStandOutSection;

// "use client";
// // components/BankStandOutSection.tsx
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

// // Define the structure for each accordion item's data
// interface AccordionItemData {
//   id: string;
//   title: string;
//   content: string;
//   imageSrc: string;
// }

// // Data for the accordion items
// const accordionData: AccordionItemData[] = [
//   {
//     id: "innovation",
//     title: "Innovation",
//     content:
//       "We bring cutting-edge solutions to simplify currency exchange. From automated rate tracking to seamless transfers, our platform continuously evolves to meet your financial needs quickly, securely, and efficiently.",
//     imageSrc: "/assets/images/uxin-about-3.jpg", // Ensure this path is correct
//   },
//   {
//     id: "technology",
//     title: "Technology",
//     content:
//       "Our advanced technology infrastructure ensures fast processing, accurate conversion, and 24/7 system reliability. With AI-powered tools and real-time updates, we deliver the best possible rates and service in every transaction.",
//     imageSrc: "/assets/images/1724198656928.jpg", // Ensure this path is correct
//   },
//   {
//     id: "security",
//     title: "Security",
//     content:
//       "Your money and data are protected with bank-grade encryption, two-factor authentication, and regulatory compliance. We prioritize your safety at every step of the exchange process.",
//     imageSrc: "/assets/images/GROWTH-BARRIER-2.jpg", // Ensure this path is correct
//   },
// ];

// const BankStandOutSection: React.FC = () => {
//   if (accordionData.length === 0) {
//     return (
//       <div className="bg-background py-10 md:py-16 px-4 text-center text-mainheadingWhite">
//         No bank features to display.
//       </div>
//     );
//   }

//   const [activeItemId, setActiveItemId] = useState<string>(accordionData[0].id);
//   const [currentImageSrc, setCurrentImageSrc] = useState<string>(
//     accordionData[0].imageSrc
//   );
//   const [currentImageAlt, setCurrentImageAlt] = useState<string>(
//     accordionData[0].title || "Bank feature image"
//   );

//   useEffect(() => {
//     const activeItem = accordionData.find((item) => item.id === activeItemId);
//     if (activeItem) {
//       if (activeItem.imageSrc !== currentImageSrc) {
//         setCurrentImageSrc(activeItem.imageSrc);
//         setCurrentImageAlt(activeItem.title || "Bank feature image");
//       }
//     }
//   }, [activeItemId, currentImageSrc]);

//   const handleItemClick = (id: string) => {
//     setActiveItemId(id);
//   };

//   const imageVariants = {
//     initial: { opacity: 0, scale: 1 },
//     animate: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 1 },
//   };

//   return (
//     <div className="bg-background py-10 md:py-16 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
//           {/* Left Column: Title and Image */}
//           <div className="w-full md:w-1/2 lg:w-[45%]">
//             <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-mainheadingWhite">
//               Secure & Trusted{" "}
//               <span className="text-primary">Global Exchange Rates</span>
//             </h3>

//             <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mt-6">
//               <AnimatePresence mode="wait">
//                 {" "}
//                 {/* 'wait' ensures one image animates out before the next animates in */}
//                 <motion.div
//                   key={currentImageSrc} // Crucial for AnimatePresence to detect changes
//                   variants={imageVariants}
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   transition={{ duration: 0.3, ease: "easeIn" }}
//                   className="absolute inset-0" // Ensure motion.div fills the parent
//                 >
//                   <Image
//                     src={currentImageSrc}
//                     alt={currentImageAlt}
//                     fill
//                     style={{
//                       objectFit: "cover",
//                     }}
//                     // className="animate-zoomIn" // Removed Tailwind animation class
//                     priority={currentImageSrc === accordionData[0].imageSrc}
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Right Column: Accordion */}
//           <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col lg:mt-26">
//             <div className="lg:space-y-5 space-y-0">
//               {accordionData.map((item) => (
//                 <div key={item.id}>
//                   <button
//                     onClick={() => handleItemClick(item.id)}
//                     aria-expanded={activeItemId === item.id}
//                     aria-controls={`accordion-content-${item.id}`}
//                     className="w-full flex items-center gap-3 cursor-pointer text-left py-5 px-1 focus:outline-none group"
//                   >
//                     <h3
//                       id={`accordion-title-${item.id}`}
//                       className={`lg:text-4xl text-3xl font-semibold transition-all duration-150 ease-linear ${
//                         activeItemId === item.id
//                           ? "text-primary"
//                           : "text-mainheadingWhite group-hover:text-primary/80"
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     {activeItemId === item.id ? (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className="size-6 text-primary transition-all duration-150 ease-linear"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className={`size-6 text-mainheadingWhite group-hover:text-primary/80 transition-all duration-300 ease-linear`}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                         />
//                       </svg>
//                     )}
//                   </button>

//                   <div
//                     id={`accordion-content-${item.id}`}
//                     role="region"
//                     aria-labelledby={`accordion-title-${item.id}`}
//                     className={`grid transition-[grid-template-rows,opacity] duration-300 ease-linear ${
//                       activeItemId === item.id
//                         ? "grid-rows-[1fr] opacity-100"
//                         : "grid-rows-[0fr] opacity-0"
//                     }`}
//                   >
//                     <div
//                       className={`overflow-hidden pt-1 pb-5 lg:pr-8 pl-1 sm:text-xl text-lg max-w-3xl leading-relaxed text-mainheadingWhite/90`}
//                     >
//                       <p>{item.content}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankStandOutSection;

// "use client";
// // components/BankStandOutSection.tsx
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

// // Define the structure for each accordion item's data
// interface AccordionItemData {
//   id: string;
//   title: string;
//   content: string;
//   imageSrc: string;
// }

// // Data for the accordion items
// const accordionData: AccordionItemData[] = [
//   {
//     id: "innovation",
//     title: "Innovation",
//     content:
//       "We bring cutting-edge solutions to simplify currency exchange. From automated rate tracking to seamless transfers, our platform continuously evolves to meet your financial needs quickly, securely, and efficiently.",
//     imageSrc: "/assets/images/invocation.jpg",
//   },
//   {
//     id: "technology",
//     title: "Technology",
//     content:
//       "Our advanced technology infrastructure ensures fast processing, accurate conversion, and 24/7 system reliability. With AI-powered tools and real-time updates, we deliver the best possible rates and service in every transaction.",
//     imageSrc: "/assets/images/technology.jpg",
//   },
//   {
//     id: "security",
//     title: "Security",
//     content:
//       "Your money and data are protected with bank-grade encryption, two-factor authentication, and regulatory compliance. We prioritize your safety at every step of the exchange process.",
//     imageSrc: "/assets/images/security.jpg",
//   },
// ];

// const BankStandOutSection: React.FC = () => {
//   if (accordionData.length === 0) {
//     return (
//       <div className="bg-background py-10 md:py-16 px-4 text-center text-mainheadingWhite">
//         No bank features to display.
//       </div>
//     );
//   }

//   const [activeItemId, setActiveItemId] = useState<string>(accordionData[0].id);
//   const [currentImageSrc, setCurrentImageSrc] = useState<string>(
//     accordionData[0].imageSrc
//   );
//   const [currentImageAlt, setCurrentImageAlt] = useState<string>(
//     accordionData[0].title || "Bank feature image"
//   );

//   useEffect(() => {
//     const activeItem = accordionData.find((item) => item.id === activeItemId);
//     if (activeItem) {
//       if (activeItem.imageSrc !== currentImageSrc) {
//         setCurrentImageSrc(activeItem.imageSrc);
//         setCurrentImageAlt(activeItem.title || "Bank feature image");
//       }
//     }
//   }, [activeItemId, currentImageSrc]); // Added currentImageSrc to dependency array as it's used in condition

//   const handleItemClick = (id: string) => {
//     setActiveItemId(id);
//   };

//   const imageVariants = {
//     initial: { opacity: 0, scale: 1 },
//     animate: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 1 },
//   };

//   return (
//     <div className="bg-background py-10 md:py-16 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row gap-4 items-center lg:gap-16">
//           {/* Left Column: Title and Image */}
//           <div className="w-full lg:w-[45%]">
//             <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-mainheadingWhite">
//               Secure & Trusted{" "}
//               <span className="text-primary">Global Exchange Rates</span>
//             </h3>

//             <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mt-6">
//               <AnimatePresence mode="wait">
//                 {" "}
//                 {/* 'wait' ensures one image animates out before the next animates in */}
//                 <motion.div
//                   key={currentImageSrc} // Crucial for AnimatePresence to detect changes
//                   variants={imageVariants}
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   transition={{ duration: 0.3, ease: "easeIn" }}
//                   className="absolute inset-0" // Ensure motion.div fills the parent
//                 >
//                   <Image
//                     src={currentImageSrc}
//                     alt={currentImageAlt}
//                     fill
//                     style={{
//                       objectFit: "cover",
//                     }}
//                     className="w-full"
//                     priority={currentImageSrc === accordionData[0].imageSrc}
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Right Column: Accordion */}
//           <div className="w-full lg:w-[55%] flex flex-col lg:mt-26">
//             <div className="lg:space-y-5 space-y-0">
//               {accordionData.map((item) => (
//                 <div key={item.id}>
//                   <button
//                     onClick={() => handleItemClick(item.id)}
//                     aria-expanded={activeItemId === item.id}
//                     aria-controls={`accordion-content-${item.id}`}
//                     className="w-full flex items-center gap-3 cursor-pointer text-left py-4 focus:outline-none group"
                  
//                   >
//                     <h3
//                       id={`accordion-title-${item.id}`}
//                       className={`lg:text-4xl md:text-3xl text-2xl font-medium transition-all duration-150 ease-linear ${
//                         activeItemId === item.id
//                           ? "text-primary" // Active title: primary color (implicitly 100% opacity)
//                           : "text-mainheadingWhite/50" // Inactive title: mainheadingWhite at 50% opacity, hover changes to primary at 80% opacity
//                       }`}
//                     >
//                       {item.title}
//                     </h3>

//                     {activeItemId === item.id ? (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className="md:size-6 size-5 text-primary transition-all duration-150 ease-linear"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                         stroke="currentColor"
//                         className={`md:size-6 size-5 text-mainheadingWhite/50 transition-all duration-150 ease-linear`} // Icon remains as is, could be changed to text-mainheadingWhite/50 if desired for visual consistency
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                         />
//                       </svg>
//                     )}
//                   </button>

//                   <div
//                     id={`accordion-content-${item.id}`}
//                     role="region"
//                     aria-labelledby={`accordion-title-${item.id}`}
//                     className={`grid transition-[grid-template-rows,opacity] duration-300 ease-linear ${
//                       activeItemId === item.id
//                         ? "grid-rows-[1fr] opacity-100"
//                         : "grid-rows-[0fr] opacity-0"
//                     }`}
//                   >
//                     <div
//                       className={`overflow-hidden  pb-5 lg:pr-8 sm:text-2xl max-w-3xl leading-normal text-subheadingWhite`}
//                     >
//                       <p>{item.content}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankStandOutSection;



"use client";
// components/BankStandOutSection.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Define the structure for each accordion item's data
interface AccordionItemData {
  id: string;
  title: string;
  content: string;
  imageSrc: string;
}

// Data for the accordion items
const accordionData: AccordionItemData[] = [
  {
    id: "innovation",
    title: "Innovation",
    content:
      "We bring cutting-edge solutions to simplify currency exchange. From automated rate tracking to seamless transfers, our platform continuously evolves to meet your financial needs quickly, securely, and efficiently.",
    imageSrc: "/assets/images/invocation.jpg",
  },
  {
    id: "technology",
    title: "Technology",
    content:
      "Our advanced technology infrastructure ensures fast processing, accurate conversion, and 24/7 system reliability. With AI-powered tools and real-time updates, we deliver the best possible rates and service in every transaction.",
    imageSrc: "/assets/images/technology.jpg",
  },
  {
    id: "security",
    title: "Security",
    content:
      "Your money and data are protected with bank-grade encryption, two-factor authentication, and regulatory compliance. We prioritize your safety at every step of the exchange process.",
    imageSrc: "/assets/images/security.jpg",
  },
];

const BankStandOutSection: React.FC = () => {
  // Determine initial states, safely handling the case where accordionData might be empty.
  // These are calculated before useState calls.
  const initialActiveId = accordionData.length > 0 ? accordionData[0].id : "";
  const initialImageSrc = accordionData.length > 0 ? accordionData[0].imageSrc : "";
  const initialImageAlt = accordionData.length > 0 
    ? (accordionData[0].title || "Bank feature image") 
    : "Feature image"; // Default alt if no data

  // Call Hooks unconditionally at the top level of the component.
  const [activeItemId, setActiveItemId] = useState<string>(initialActiveId);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(initialImageSrc);
  const [currentImageAlt, setCurrentImageAlt] = useState<string>(initialImageAlt);

  useEffect(() => {
    const activeItem = accordionData.find((item) => item.id === activeItemId);
    if (activeItem) {
      // Only update if the image source or alt text needs to change.
      // This check is important because currentImageSrc is in the dependency array,
      // and this prevents unnecessary state updates or potential loops.
      if (activeItem.imageSrc !== currentImageSrc) {
        setCurrentImageSrc(activeItem.imageSrc);
        // It's good practice to update alt text when image source changes
        setCurrentImageAlt(activeItem.title || "Bank feature image");
      }
    }
    // If accordionData is initially empty, activeItemId will be "", activeItem will be undefined,
    // and no state update will occur here, which is correct.
  }, [activeItemId, currentImageSrc]); // accordionData is a module-level constant, so it's stable and
                                       // not strictly required in the dependency array by some linters.
                                       // If it were a prop or component state, it would be essential to include it.

  // Conditional early return: Now placed AFTER all hook calls.
  if (accordionData.length === 0) {
    return (
      <div className="bg-background py-10 md:py-16 px-4 text-center text-mainheadingWhite">
        No bank features to display.
      </div>
    );
  }

  const handleItemClick = (id: string) => {
    setActiveItemId(id);
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1 },
  };

  return (
    <div className="bg-background py-10 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-center lg:gap-16">
          {/* Left Column: Title and Image */}
          <div className="w-full lg:w-[45%]">
            <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-mainheadingWhite">
              Secure & Trusted{" "}
              <span className="text-primary">Global Exchange Rates</span>
            </h3>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageSrc} // Crucial for AnimatePresence to detect changes
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  className="absolute inset-0" // Ensure motion.div fills the parent
                >
                  <Image
                    src={currentImageSrc}
                    alt={currentImageAlt}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    className="w-full"
                    // accordionData[0] is safe to access here because we've already
                    // returned early if accordionData.length === 0.
                    priority={currentImageSrc === accordionData[0].imageSrc}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="w-full lg:w-[55%] flex flex-col lg:mt-26">
            <div className="lg:space-y-5 space-y-0">
              {accordionData.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    aria-expanded={activeItemId === item.id}
                    aria-controls={`accordion-content-${item.id}`}
                    className="w-full flex items-center gap-3 cursor-pointer text-left py-4 focus:outline-none group"
                  >
                    <h3
                      id={`accordion-title-${item.id}`}
                      className={`lg:text-4xl md:text-3xl text-2xl font-medium transition-all duration-150 ease-linear ${
                        activeItemId === item.id
                          ? "text-primary"
                          : "text-mainheadingWhite/50"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {activeItemId === item.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="md:size-6 size-5 text-primary transition-all duration-150 ease-linear"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className={`md:size-6 size-5 text-mainheadingWhite/50 transition-all duration-150 ease-linear`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    )}
                  </button>

                  <div
                    id={`accordion-content-${item.id}`}
                    role="region"
                    aria-labelledby={`accordion-title-${item.id}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-linear ${
                      activeItemId === item.id
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div
                      className={`overflow-hidden pb-5 lg:pr-8 sm:text-2xl max-w-3xl leading-normal text-subheadingWhite`}
                    >
                      <p>{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankStandOutSection;