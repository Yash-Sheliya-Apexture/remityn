// // XeFeaturesSection.tsx
// "use client"; // Add this for Framer Motion client-side hooks

// import React, { JSX } from "react";
// import { BsCashStack, BsEmojiSmile } from "react-icons/bs";
// import { FaGlobe } from "react-icons/fa6";
// import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import { motion } from "framer-motion"; // Import motion

// // Interface for the feature data structure
// interface FeatureItem {
//   title: string;
//   description: string;
//   icons: JSX.Element;
// }

// // Array containing the data for the feature boxes
// const featuresData: FeatureItem[] = [
//   {
//     title: "Global reach",
//     description:
//       "Send and receive money across 200+ countries and territories in over 170+ currencies. Receiving your money is easy. Connect a bank account or opt for cash pick-up at one of our 500,000 locations worldwide.",
//     icons: <FaGlobe className="size-6 lg:size-8 text-primary" />,
//   },
//   {
//     title: "Transparent prices",
//     description:
//       "With our transparent rates, you’ll always be in the know. You’ll never have to worry about surprises or sneaky deductions with our competitive exchange rates and minimal fees.",
//     icons: <BsCashStack className="size-6 lg:size-8 text-primary" />,
//   },
//   {
//     title: "Fast Money transfers",
//     description:
//       "We understand the value of your hard-earned money. That’s why we prioritize safe and speedy transfers. Send money within seconds and your recipient will receive it within 1-5 days.",
//     icons: <RiMoneyDollarCircleLine className="size-6 lg:size-8 text-primary" />,
//   },
// ];

// // --- Animation Variants ---

// // Variant for the main section container to control overall triggering and stagger children
// const sectionVariants = {
//   hidden: {}, // No initial visual state needed for the container itself
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Stagger the animation of direct children (heading container and grid container)
//     },
//   },
// };

// // Variant for the heading section (fade in + slight slide down)
// const headingVariants = {
//   hidden: { opacity: 0, y: -30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// // Variant for the grid container (to stagger the cards inside)
// const gridContainerVariants = {
//   hidden: {}, // No initial visual state needed
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger the animation of each card
//       delayChildren: 0.2, // Small delay after the heading likely appears
//     },
//   },
// };

// // Variant for each individual feature card (fade + scale + slide up)
// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.9, // Start slightly smaller
//     y: 50, // Start 50px down
//   },
//   visible: {
//     opacity: 1,
//     scale: 1, // Animate to full size
//     y: 0, // Animate to original vertical position
//     transition: {
//       duration: 0.5, // Animation duration for each card
//       ease: "easeOut", // Smooth easing
//     },
//   },
// };

// // --- Component ---
// const WhyChooseUs: React.FC = () => {
//   return (
//     // Add overflow-hidden to prevent scrollbars during card animation
//     <section className="WhyChooseUsSection md:py-20 py-5 overflow-hidden">
//       {/* Wrap the main container with motion to trigger animations on view */}
//       <motion.div
//         className="mx-auto container px-4"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.1, once: true }} // Trigger when 10% visible, run only once
//       >
//         {/* Heading Section - Wrap with motion */}
//         <motion.div
//           className="mx-auto max-w-2xl text-center space-y-4"
//           variants={headingVariants} // Apply heading animation
//           // Inherits trigger from parent motion.div
//         >
//           <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheadingWhite uppercase">
//             Find out why
//             <span className="text-primary">millions choose Remityn</span>
//           </h1>

//           <p className="lg:text-lg text-base text-subheadingWhite">
//             For over 10 years, Remityn Corporation Inc. customers have been
//             trusting us to manage and send international money transfers. It's
//             what we do.
//           </p>
//         </motion.div>

//         {/* Features Grid - Wrap grid container with motion for staggering cards */}
//         <motion.div
//           className="lg:mt-20 mt-10 flex gap-6"
//           variants={gridContainerVariants} // Apply grid container variants (staggerChildren)
//           // Inherits trigger from parent motion.div
//         >
//           {featuresData.map((feature) => (
//             // Wrap EACH feature card with motion
//             <motion.div
//               key={feature.title} // Key goes on the motion component
//               variants={cardVariants} // Apply card animation variants
//               // Individual card timing controlled by parent's staggerChildren
//               className="sm:p-6 p-4 text-center space-y-6"
//             >
//               {/* Icon */}
//               <div className="flex justify-center">
//                 <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
//                   <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
//                     {feature.icons}
//                   </div>
//                 </div>
//               </div>

//               {/* Title */}
//               <h3 className="text-2xl text-mainheadingWhite font-semibold">
//                 {feature.title}
//               </h3>

//               {/* Description */}
//               <p className="text-subheadingWhite lg:text-lg text-base">
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default WhyChooseUs;

// // XeFeaturesSection.tsx
// "use client"; // This can be kept or removed, doesn't strictly affect functionality without client-side hooks like motion

// import React, { JSX } from "react";
// import { BsCashStack, BsEmojiSmile } from "react-icons/bs"; // BsEmojiSmile is imported but not used, can be removed if not needed elsewhere
// import { FaGlobe } from "react-icons/fa6";
// import { RiMoneyDollarCircleLine } from "react-icons/ri";

// // Interface for the feature data structure
// interface FeatureItem {
//   title: string;
//   description: string;
//   icons: JSX.Element;
// }

// // Array containing the data for the feature boxes
// const featuresData: FeatureItem[] = [
//   {
//     title: "Effortless Transactions, Every Time",
//     description:
//       "We've designed Remityn for ultimate simplicity. From instant account setup to easy recipient management and intuitive transfers, sending money to India is just a few clicks away.",
//     icons: <FaGlobe className="size-6 lg:size-8 text-primary" />,
//   },
//   {
//     title: "Swift Setup & Secure Wallets",
//     description:
//       "Get started in minutes with our quick sign-up and simple KYC. Create your secure digital wallets for USD, EUR, GBP and many more, fund them easily, and gain full control over your international transfers.",
//     icons: <BsCashStack className="size-6 lg:size-8 text-primary" />,
//   },
//   {
//     title: " Transparent Tracking & Trusted Service",
//     description:
//       "Add recipients with ease, save their details for future use, and monitor your transaction status every step of the way. Experience the peace of mind that comes with a reliable and transparent money transfer service.",
//     icons: (
//       <RiMoneyDollarCircleLine className="size-6 lg:size-8 text-primary" />
//     ),
//   },
// ];

// // --- Component ---
// const WhyChooseUs: React.FC = () => {

//   const currentProducts = featuresData;

//   return (
//     // Add overflow-hidden to prevent scrollbars during card animation (can be kept or removed based on static layout needs)
//     <section className="WhyChooseUsSection sm:py-16 py-10 overflow-hidden ">
//       <div className="mx-auto container px-4">
//         {/* Heading Section */}
//         <div className="mx-auto max-w-4xl text-center space-y-4">
//           <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Find Out Why{" "}
//             <span className="text-primary">Millions Choose Remityn</span>
//           </h3>

//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             At Remityn, we’re redefining how international money transfers work. With a focus on security, simplicity, and speed, thousands trust us to move their money reliably to India. Whether you're supporting family or managing personal finances abroad, our platform offers an intuitive experience, competitive exchange rates, and bank transfer method—all backed by responsive customer support and transparent processes.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 gap-8 sm:mt-16 mt-10" // Added flex-col for small screens, md:flex-row for medium and up
//         >
//           {featuresData.map((product, index) => {
//             const isLast = index === currentProducts.length - 1;
//             let conditionalClasses = "";

//             if (!isLast) {
//               // Original border and padding logic for non-last items
//               conditionalClasses =
//                 "lg:border-r border-r-gray-600/50 lg:border-b-0 border-b border-b-gray-600/50 pr-0 lg:pr-10 pb-8 sm:pb-10 lg:pb-0";
//             } else {
//               if (
//                 currentProducts.length === 1 ||
//                 currentProducts.length % 2 !== 0
//               ) {
//                 conditionalClasses = "sm:col-span-2 lg:col-span-1"; // lg:col-span-1 ensures it takes 1/3 on large screens
//               } else {
//                 conditionalClasses = "lg:col-span-1";
//               }
//             }

//             return (
//             <div
//               key={index} // Key goes on the outer div
//               className={`text-center space-y-6${conditionalClasses ? ' ' + conditionalClasses.trim() : ''}`}// Added md:w-1/3 for equal width on medium screens and up
//             >
//               {/* Icon */}
//               <div className="flex justify-center">
//                 <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
//                   <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
//                     {product.icons}
//                   </div>
//                 </div>
//               </div>

//               {/* Title */}
//               <h3 className="text-2xl text-mainheadingWhite font-semibold">
//                 {product.title}
//               </h3>

//               {/* Description */}
//               <p className="text-subheadingWhite lg:text-lg text-base">
//                 {product.description}
//               </p>
//             </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

// "use client";
// import { Globe, Handshake, LockKeyhole } from "lucide-react";
// import React, { JSX } from "react"; // Import React for React.memo

// interface FeatureItem {
//   title: string;
//   description: string;
//   icons: JSX.Element;
// }

// const featuresData: FeatureItem[] = [
//   {
//     title: "Global Transfers, Simplified",
//     description:
//       "Send and manage money worldwide with ease.",
//     icons: <Globe className="size-6 lg:size-8 text-primary" />,
//   },
//   {
//     title: "Security That Never Sleeps",
//     description:
//       "24/7 protection with encryption and 2FA.",
//     icons: <LockKeyhole className="size-6 lg:size-8 text-primary" />,
//   },
//   {
//     title: "Beyond Transfers",
//     description:
//       "Trusted partner in your money journey.",
//     icons: <Handshake className="size-6 lg:size-8 text-primary" />,
//   },
// ];

// const WhyChooseUs: React.FC = () => {
//   const currentProducts = featuresData; // This variable isn't strictly necessary if always using featuresData

//   return (
//     <section className="WhyChooseUsSection sm:py-16 py-10 overflow-hidden">
//       <div className="mx-auto container px-4">
//         <div className="mx-auto max-w-4xl text-center space-y-4">
//           {/* ... (heading content remains the same) ... */}
//           <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Remityn: Where Your Money {"  "}
//             <span className="text-primary">Journey Truly Matters</span>
//           </h3>

//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             Your money isn’t just currency. it represents care, commitment and connection. Remityn ensures every transfer is secure, fast and personally supported.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 gap-8 sm:mt-16 mt-10">
//           {featuresData.map((product, index) => {
//             const isLast = index === featuresData.length - 1;
//             // Simplified conditional classes for borders, assuming standard grid behavior handles alignment.
//             // The complex logic for col-span might be unnecessary if the grid itself handles item flow correctly.
//             // Focus on border logic.
//             let conditionalClasses = "";
//             if (featuresData.length > 1 && !isLast) {
//               // Add right border for items not last in their row on larger screens
//               // And bottom border for items not in the last row on smaller screens
//               conditionalClasses =
//                 "lg:border-r border-r-gray-600/50 lg:border-b-0 border-b border-b-gray-600/50 pr-0 lg:pr-10 pb-8 sm:pb-10 lg:pb-0";

//               // Refinement: Only add lg:border-r if not the last item in a 3-column row
//               if ((index + 1) % 3 === 0) {
//                 // Last in a 3-col row
//                 conditionalClasses = conditionalClasses
//                   .replace("lg:border-r border-r-gray-600/50", "")
//                   .replace("lg:pr-10", "");
//               }
//               // Refinement: Only add border-b if not the last item in a 2-column row (for sm)
//               if ((index + 1) % 2 === 0 && index < featuresData.length - 1) {
//                 // Last in a 2-col row, but not overall last
//                 // The original class had border-b for all non-last items. This might be fine.
//               } else if (
//                 index >=
//                   featuresData.length -
//                     (featuresData.length % 2 === 0 ? 2 : 1) &&
//                 featuresData.length % 3 === 0 &&
//                 index >= featuresData.length - 3
//               ) {
//                 // If in last row of sm or lg, no bottom border needed
//               }

//               // Sticking to the original simpler logic for borders on non-last items, as it's hard to perfect without visual testing.
//               // The key is that `isLast` determines if ANY border styling for "non-last" items applies.
//               // The original:
//               if (!isLast) {
//                 conditionalClasses =
//                   "lg:border-r border-r-gray-600/50 lg:border-b-0 border-b border-b-gray-600/50 pr-0 lg:pr-10 pb-8 sm:pb-10 lg:pb-0";
//               } else {
//                 // The original col-span logic for the last item
//                 if (
//                   featuresData.length === 1 ||
//                   (featuresData.length % 2 !== 0 && isLast)
//                 ) {
//                   conditionalClasses = "sm:col-span-2 lg:col-span-1";
//                 } else if (isLast) {
//                   conditionalClasses = "lg:col-span-1";
//                 }
//               }
//             }

//             return (
//               <div
//                 key={index}
//                 className={`text-center space-y-6${
//                   conditionalClasses ? " " + conditionalClasses.trim() : ""
//                 }`}
//               >
//                 {/* ... (icon, title, description remains the same) ... */}
//                 <div className="flex justify-center">
//                   <div className="size-20 rounded-full icon-outer-wrapper flex items-center justify-center">
//                     <div className="size-14 rounded-full icon-inner-background flex items-center justify-center">
//                       {product.icons}
//                     </div>
//                   </div>
//                 </div>
//                 <h3 className="text-2xl text-mainheadingWhite font-semibold">
//                   {product.title}
//                 </h3>
//                 <p className="text-subheadingWhite lg:text-lg text-base">
//                   {product.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(WhyChooseUs); // Memoize component.

// "use client"; // This component uses React state/effects implicitly or explicitly via icons, so "use client" is appropriate.

// import React from "react"; // Simplified import
// import { Globe, Handshake, LockKeyhole } from "lucide-react";

// // Define type for FeatureItem data
// interface FeatureItem {
//   title: string;
//   description: string;
//   icons: React.ReactNode; // Using React.ReactNode for broader compatibility with icon types
// }

// // Data for the features
// const featuresData: FeatureItem[] = [
//   {
//     title: "Global Transfers, Simplified",
//     description: "Send and manage money worldwide with ease.",
//     icons: <Globe className="size-6 lg:size-8 text-primary" />,
//   },
//   {
//     title: "Security That Never Sleeps",
//     description: "24/7 protection with encryption and 2FA.",
//     icons: <LockKeyhole className="size-6 lg:size-8 text-primary" />,
//   },
//   {
//     title: "Beyond Transfers",
//     description: "Trusted partner in your money journey.",
//     icons: <Handshake className="size-6 lg:size-8 text-primary" />,
//   },
// ];

// const WhyChooseUs: React.FC = () => {
//   return (
//     <section className="WhyChooseUsSection sm:py-16 py-10 overflow-hidden">
//       <div className="mx-auto container px-4">
//         {/* Header Section */}
//         <div className="mx-auto max-w-4xl text-center space-y-4">
//           <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Remityn: Where Your Money {"  "}
//             <span className="text-primary">Journey Truly Matters</span>
//           </h3>
//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             Your money isn’t just currency. it represents care, commitment and
//             connection. Remityn ensures every transfer is secure, fast and
//             personally supported.
//           </p>
//         </div>

//         {/*
//           Features Grid:
//           - Mobile (default): 1 column
//           - Tablet (sm): 2 columns, with the last item spanning both if total is 3 (as per featuresData structure)
//           - Desktop (lg): 3 columns
//         */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16 mt-10">
//           {featuresData.map((feature, index) => {
//             const totalItems = featuresData.length;

//             // Specific check for the third item in a list of three to apply the full-width span on tablets (sm).
//             // This mirrors the logic from InternationalTransferSection (ITS used 'md', here 'sm' is used for the 2-col breakpoint).
//             const isThirdItemAndTotalIsThree = totalItems === 3 && index === 2;

//             const itemWrapperClasses = `
//               relative
//               ${isThirdItemAndTotalIsThree ? "sm:col-span-2 lg:col-span-1" : ""}
//             `;

//             return (
//               <div key={feature.title + index} className={itemWrapperClasses}>
//                 {/* Content Area with Padding */}
//                 {/* Using py-8 for vertical padding consistency with ITS, space-y-6 from original WCU */}
//                 <div className="px-5 py-8 text-center space-y-6">
//                   <div className="flex justify-center">
//                     <div className="size-20 rounded-full icon-outer-wrapper flex items-center justify-center">
//                       <div className="size-14 rounded-full icon-inner-background flex items-center justify-center">
//                         {feature.icons}
//                       </div>
//                     </div>
//                   </div>
//                   <h3 className="text-2xl text-mainheadingWhite font-semibold">
//                     {feature.title}
//                   </h3>
//                   <p className="text-subheadingWhite lg:text-lg text-base">
//                     {feature.description}
//                   </p>
//                 </div>

//                 {/* --- SEPARATE BORDER DIVS (Adapted from InternationalTransferSection) --- */}

//                 {/* Vertical Border: Show ONLY on large screens (lg) between items */}
//                 {/* For 3 items, it will appear after items 0 and 1 in a 3-column layout. */}
//                 {(index + 1) % 3 !== 0 && index < totalItems - 1 && (
//                   <div
//                     className="absolute top-0 right-0 h-full w-px bg-gray-600/50 hidden lg:block"
//                     aria-hidden="true"
//                   />
//                 )}

//                 {/* Horizontal Border: Show on mobile and tablet (sm), but hide on large screens (lg) */}
//                 {/* Given featuresData has 3 items (like ITS's example), this applies a bottom border to the first two items (index 0 and 1).
//                     This ensures correct separation on mobile (1-col) and forms a line under the first row on tablet (sm: 2-col)
//                     when the third item spans the next row.
//                     If featuresData length were highly variable, this condition (index < 2) would need generalization.
//                 */}
//                 {index < 2 && ( // This condition is specific to featuresData having 3 items.
//                   <div
//                     className="absolute bottom-0 left-0 w-full h-px bg-gray-600/50 block lg:hidden"
//                     aria-hidden="true"
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(WhyChooseUs);

// "use client"; // This component uses React state/effects implicitly or explicitly via icons, so "use client" is appropriate.

// import React from "react";
// // Import the specific icons that match the image: Target, Users, Lightbulb
// import {
//   Target,
//   Users,
//   Lightbulb,
//   Globe,
//   LockKeyhole,
//   Handshake,
// } from "lucide-react";

// // Define type for FeatureItem data
// interface FeatureItem {
//   title: string;
//   description: string;
//   icons: React.ReactNode; // Using React.ReactNode for broader compatibility with icon types
// }

// // // Data for the features
// const featuresData: FeatureItem[] = [
//   {
//     title: "Global Transfers, Simplified",
//     description:
//       "Send and manage money worldwide with ease. Our platform is built to make international transfers quick, seamless.",
//     icons: <Globe className="size-8 lg:size-10" />,
//   },
//   {
//     title: "Security That Never Sleeps",
//     description:
//       "Our peace of mind is our top priority. With 24/7 protection, bank-grade encryption, and advanced 2FA Security.",
//     icons: <LockKeyhole className="size-8 lg:size-10" />,
//   },
//   {
//     title: "Beyond Transfers",
//     description:
//       "We're more than just a currency exchange we're your trusted partner in every financial move on your career right way.",
//     icons: <Handshake className="size-8 lg:size-10" />,
//   },
// ];

// const WhyChooseUs: React.FC = () => {
//   return (
//     // Section with white background (or no background class for default white) and vertical padding
//     <section className="sm:py-16 py-10 overflow-hidden bg-background">
//       <div className="mx-auto container px-4">
//         {/* Header Section - Centered text */}
//         <div className="mx-auto max-w-4xl text-center space-y-4">
//           <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Remityn: Where Your Money {"  "}
//             <span className="text-primary">Journey Truly Matters</span>
//           </h3>

//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             Your money isn’t just currency. it represents care, commitment and
//             connection. Remityn ensures every transfer is secure, fast and
//             personally supported.
//           </p>
//         </div>

//         {/* Features Grid: 1 column on mobile, 3 columns on medium screens and up, with a gap */}
//         {/* Added md:grid-cols-3 and gap-6 for spacing between cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//           {featuresData.map((feature, index) => (
//             // Individual Card
//             // Added light grey background, rounded corners, and padding
//             // Using a potential light grey hex color for bg-[#f3f4f6] or bg-gray-100
//             <div
//               key={feature.title + index}
//               className="bg-primarybox rounded-2xl p-6"
//             >
//               {/* Icon Container: Centered, circular, slightly lighter grey background */}
//               {/* Using a potential very light grey hex color for bg-[#e5e7eb] or bg-gray-200 */}
//               <div className="flex mb-10">
//                 {" "}
//                 <div className="size-16 lg:size-20 rounded-full bg-secondarybox flex items-center justify-center">
//                   {feature.icons}
//                 </div>
//               </div>

//               {/* Title: Dark green, bold */}
//               {/* Using a potential dark green hex color for text-[#335525] */}
//               <h3 className="text-xl lg:text-2xl text-white font-semibold mb-4">
//                 {" "}
//                 {/* Added bottom margin */}
//                 {feature.title}
//               </h3>

//               {/* Description: Dark grey */}
//               {/* Using a potential dark grey hex color for text-[#555] or text-gray-700 */}
//               <p className="text-subheadingWhite lg:text-lg text-base leading-normal">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(WhyChooseUs);




// "use client"; // This component uses React state/effects implicitly or explicitly via icons, so "use client" is appropriate.

// import React from "react";
// // Import the specific icons that match the image: Target, Users, Lightbulb
// import {
//   Target,
//   Users,
//   Lightbulb,
//   Globe,
//   LockKeyhole,
//   Handshake,
// } from "lucide-react";

// // Define type for FeatureItem data
// interface FeatureItem {
//   title: string;
//   description: string;
//   icons: React.ReactNode; // Using React.ReactNode for broader compatibility with icon types
// }

// // Data for the features (Kept identical to your provided WhyChooseUs data)
// const featuresData: FeatureItem[] = [
//   {
//     title: "Global Transfers, Simplified",
//     description:
//       "Easily send and manage money across the globe. Our platform is designed to make international transfers fast, seamless, and stress-free.",
//     icons: <Globe className="size-8 lg:size-10 text-primary" />,
//   },
//   {
//     title: "Security That Never Sleeps",
//     description:
//       "Your peace of mind is our top priority. Enjoy 24/7 protection, bank-level encryption, and advanced two-factor authentication for every transaction.",
//     icons: <LockKeyhole className="size-8 lg:size-10 text-primary" />,
//   },
//   {
//     title: "Beyond Transfers",
//     description:
//       "We're more than just a currency exchange we're your trusted partner in every financial step of your journey, both personal and professional.",
//     icons: <Handshake className="size-8 lg:size-10 text-primary" />,
//   },
// ];

// const WhyChooseUs: React.FC = () => {
//   // Keep the data structure and count here for clarity, though totalItems is calculated inside the map
//   const totalItems = featuresData.length;

//   return (
//     // Section with white background (or no background class for default white) and vertical padding
//     <section className="WhyChooseUs sm:py-16 py-10 overflow-hidden bg-background">
//       <div className="mx-auto container px-4">
//         {/* Header Section - Centered text (Kept identical) */}
//         <div className="mx-auto max-w-4xl text-center space-y-4">
//           <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Remityn: Where Your Money {"  "}
//             <span className="text-primary">Journey Truly Matters</span>
//           </h3>

//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             Your money isn’t just currency. it represents care, commitment and
//             connection. Remityn ensures every transfer is secure, fast and
//             personally supported.
//           </p>
//         </div>

//         {/*
//           Features Grid - Modified to match InternationalTransferSection logic:
//           - Mobile (default): 1 column
//           - Tablet (md): 2 columns, with the last item spanning both (if total items is 3)
//           - Desktop (lg): 3 columns (if total items is 3, the 3rd item goes back to 1 column)

//           Added md:grid-cols-2 lg:grid-cols-3 from the reference.
//           Kept the existing gap-6 and mt-12 classes.
//         */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
//           {featuresData.map((feature, index) => {
//             // Calculate totalItems inside map for potential edge cases, though defined above too
//             const currentTotalItems = featuresData.length;

//             // Specific check for the third item (index 2) in a list of exactly three items
//             // This item will span 2 columns on 'md' (tablet)
//             const isThirdItemInThree = currentTotalItems === 3 && index === 2;

//             // Define the base classes that should always apply to the item wrapper
//             const baseItemClasses = "bg-primarybox rounded-2xl sm:p-6 p-4";

//             // Define the conditional classes for column spanning
//             // If it's the 3rd item in 3, apply md:col-span-2 and reset lg:col-span-1
//             const conditionalSpanClasses = isThirdItemInThree
//               ? "md:col-span-2 lg:col-span-1"
//               : "";

//             // Combine base classes and conditional classes
//             const itemWrapperClasses = `${baseItemClasses} ${conditionalSpanClasses}`;

//             return (
//               // Individual Card - ClassName now uses the calculated variable
//               <div
//                 key={feature.title + index}
//                 className={itemWrapperClasses.trim()} // Use trim() to clean up potential extra space
//               >
//                 {/* Icon Container: (Kept identical) */}
//                 <div className="flex mb-12">
//                   {" "}
//                   <div className="size-16 lg:size-20 rounded-full bg-secondarybox flex items-center justify-center">
//                     {feature.icons}
//                   </div>
//                 </div>

//                 {/* Title: (Kept identical) */}
//                 <h3 className="text-xl lg:text-2xl text-white font-semibold mb-4">
//                   {" "}
//                   {feature.title}
//                 </h3>

//                 {/* Description: (Kept identical) */}
//                 <p className="text-subheadingWhite lg:text-lg text-base leading-normal">
//                   {feature.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(WhyChooseUs);



"use client"; // This component uses React state/effects implicitly or explicitly via icons, so "use client" is appropriate.

import React from "react";
// Import the specific icons that match the image: Target, Users, Lightbulb
import {
  Target,
  Users,
  Lightbulb,
  Globe,
  LockKeyhole,
  Handshake,
} from "lucide-react";
import { GrSecure } from "react-icons/gr";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiFillLike, AiFillStar	} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { IoMdFlash } from "react-icons/io";
import { LiaExchangeAltSolid } from "react-icons/lia";

// Define type for FeatureItem data
interface FeatureItem {
  title: string;
  description: string;
  icons: React.ReactNode; // Using React.ReactNode for broader compatibility with icon types
}

// Define type for the feature tags
interface FeatureTag {
  text: string;
  icon: React.ReactNode;
}

// Data for the features (Kept identical to your provided WhyChooseUs data)
const featuresData: FeatureItem[] = [
  {
    title: "Global Transfers, Simplified",
    description:
      "Easily send and manage money across the globe. Our platform is designed to make international transfers fast, seamless, and stress-free.",
    icons: <Globe className="size-8 lg:size-10 text-primary" />,
  },
  {
    title: "Security That Never Sleeps",
    description:
      "Your peace of mind is our top priority. Enjoy 24/7 protection, bank-level encryption, and advanced two-factor authentication for every transaction.",
    icons: <LockKeyhole className="size-8 lg:size-10 text-primary" />,
  },
  {
    title: "Beyond Transfers",
    description:
      "We're more than just a currency exchange we're your trusted partner in every financial step of your journey, both personal and professional.",
    icons: <Handshake className="size-8 lg:size-10 text-primary" />,
  },
];

// Array for the feature tags/cards wrapper
const featureTags: FeatureTag[] = [
  { text: "Money Safe", icon: <BsFillShieldLockFill size={20} /> },
  { text: "Fast Payouts", icon: <IoMdFlash size={20} /> },
  { text: "Customers Loves", icon: <FaHeart size={20} /> },
  { text: "Reliable Payment", icon: <RiFileList3Fill size={20} /> },
  { text: "Easy", icon: <AiFillLike size={20} /> },
  { text: "Great Experience", icon: <AiFillStar size={20} /> },
  { text: "Best Exchange Rate", icon: <LiaExchangeAltSolid size={20} /> },
];

const WhyChooseUs: React.FC = () => {
  // Keep the data structure and count here for clarity, though totalItems is calculated inside the map
  const totalItems = featuresData.length;

  return (
    // Section with white background (or no background class for default white) and vertical padding
    <section className="WhyChooseUs lg:py-16 py-10 overflow-hidden bg-background">
      <div className="mx-auto container px-4">
        {/* Header Section - Centered text (Kept identical) */}
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
            Remityn: Where Your Money {"  "}
            <span className="text-primary">Journey Truly Matters</span>
          </h3>

          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
            Your money isn’t just currency. it represents care, commitment and
            connection. Remityn ensures every transfer is secure, fast and
            personally supported.
          </p>
        </div>

        {/*
          Features Grid - Modified to match InternationalTransferSection logic:
          - Mobile (default): 1 column
          - Tablet (md): 2 columns, with the last item spanning both (if total items is 3)
          - Desktop (lg): 3 columns (if total items is 3, the 3rd item goes back to 1 column)

          Added md:grid-cols-2 lg:grid-cols-3 from the reference.
          Kept the existing gap-6 and mt-12 classes.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featuresData.map((feature, index) => {
            // Calculate totalItems inside map for potential edge cases, though defined above too
            const currentTotalItems = featuresData.length;

            // Specific check for the third item (index 2) in a list of exactly three items
            // This item will span 2 columns on 'md' (tablet)
            const isThirdItemInThree = currentTotalItems === 3 && index === 2;

            // Define the base classes that should always apply to the item wrapper
            const baseItemClasses = "bg-primarybox rounded-2xl sm:p-6 p-4 flex flex-col items-center";

            // Define the conditional classes for column spanning
            // If it's the 3rd item in 3, apply md:col-span-2 and reset lg:col-span-1
            const conditionalSpanClasses = isThirdItemInThree
              ? "md:col-span-2 lg:col-span-1"
              : "";

            // Combine base classes and conditional classes
            const itemWrapperClasses = `${baseItemClasses} ${conditionalSpanClasses}`;

            return (
              // Individual Card - ClassName now uses the calculated variable
              <div
                key={feature.title + index}
                className={itemWrapperClasses.trim()} // Use trim() to clean up potential extra space
              >
                {/* Icon Container: (Kept identical) */}
                <div className="flex mb-12">
                  {" "}
                  <div className="size-16 lg:size-20 rounded-full bg-secondarybox flex items-center justify-center">
                    {feature.icons}
                  </div>
                </div>

                {/* Title: (Kept identical) */}
                <h3 className="text-xl lg:text-2xl text-white font-semibold mb-4">
                  {" "}
                  {feature.title}
                </h3>

                {/* Description: (Kept identical) */}
                <p className="text-subheadingWhite lg:text-lg text-base leading-normal text-center">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 lg:max-w-4xl max-w-full mx-auto flex flex-wrap items-center justify-center gap-6">
          {featureTags.map((tag) => (
            <div
              key={tag.text}
              className="bg-primary-foreground p-3 px-5 rounded-xl"
            >
              <div className="flex items-center text-lg gap-4">
                <span className=" text-primary ">{tag.icon}</span>
                <span className="text-mainheadingWhite">{tag.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyChooseUs);
