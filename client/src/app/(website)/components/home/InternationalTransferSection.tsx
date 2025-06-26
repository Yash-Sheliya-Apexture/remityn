// "use client"

// import React from 'react'; // Import React for React.FC and React.ReactNode
// import {
//   IoRocketOutline,       // For speed
//   IoSwapHorizontalOutline, // For transfer/exchange
//   IoWalletOutline,       // For competitive rates/value
// } from 'react-icons/io5'; // Import from react-icons
// // You might need to install react-icons if you haven't: npm install react-icons or yarn add react-icons

// // Define icons using React Icons components
// // Only icons used by 'individuals' are kept
// const icons = {
//   rocket: (
//     <IoRocketOutline className="w-8 h-8 text-primary" />
//   ),
//   transfer: (
//     <IoSwapHorizontalOutline className="w-8 h-8 text-primary" />
//   ),
//   wallet: (
//     <IoWalletOutline className="w-8 h-8 text-primary" />
//   ),
// };

// type Product = {
//   icon: React.ReactNode; // Changed from JSX.Element to React.ReactNode
//   title: string;
//   description: string;
// };

// // Data is now only for individuals, 'businesses' section removed
// const individualsProductsData: Product[] = [
//   {
//     icon: icons.transfer,
//     title: 'Effortless Money Transfers to India',
//     description: 'Easily transfer funds to family and friends in India. Enjoy a seamless experience with direct bank deposits and UPI payments.',
//   },
//   {
//     icon: icons.rocket,
//     title: 'Fast & Secure Transfers',
//     description: 'Experience swift and secure international money transfers to INR. Our robust platform ensures your money reaches its destination safely and quickly.',
//   },
//   {
//     icon: icons.wallet,
//     title: 'Competitive INR Exchange Rates',
//     description: 'Get the best value for your money with our highly competitive exchange rates for USD, EUR, GBP (and more) to INR, and transparent zero fees.',
//   },
// ];

// const InternationalTransferSection: React.FC = () => {
//   const currentProducts = individualsProductsData;

//   return (
//     <section className="InternationalTransferSection sm:py-14 pt-7.5 pb-10">
//       <div className="container mx-auto px-4">
//         {/* Header Section - simplified as tabs are removed */}
//         <div className="text-center lg:text-left">
//           <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Send Money to{" "}<span className="text-primary">India</span>
//           </h3>
//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             Transfer funds internationally to India with ease, speed, and
//             security. We offer competitive exchange rates and a seamless
//             experience for your INR remittances.
//           </p>
//         </div>

//         {/* Products Grid - remains largely the same, iterates over currentProducts */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 gap-8 sm:mt-16 mt-10">
//           {currentProducts.map((product, index) => {
//             const isLast = index === currentProducts.length - 1;
//             let conditionalClasses = "";

//             if (!isLast) {
//               // Original border and padding logic for non-last items
//               conditionalClasses = "lg:border-r border-r-gray-600/50 lg:border-b-0 border-b border-b-gray-600/50 pr-0 lg:pr-10 pb-8 sm:pb-10 lg:pb-0";
//             } else {
//               if (currentProducts.length === 1 || currentProducts.length % 2 !== 0) {
//                 conditionalClasses = "sm:col-span-2 lg:col-span-1"; // lg:col-span-1 ensures it takes 1/3 on large screens
//               } else {
//                 conditionalClasses = "lg:col-span-1";
//               }
//             }

//             return (
//               <div
//                 key={index}
//                 // Ensure space before conditionalClasses if it's not empty
//                 className={`text-center space-y-6${conditionalClasses ? ' ' + conditionalClasses.trim() : ''}`}
//               >
//                 <div className="flex justify-center">
//                   <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
//                     <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
//                       {product.icon}
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

// export default InternationalTransferSection;

// "use client"; // This component uses React state/effects implicitly or explicitly via icons, so "use client" is appropriate.

// import React from 'react';
// import {
//   IoRocketOutline,
//   IoSwapHorizontalOutline,
//   IoWalletOutline,
// } from 'react-icons/io5';

// // Define type for Product data
// type Product = {
//   icon: React.ReactNode; // Using React.ReactNode for flexibility (can be JSX, string, etc.)
//   title: string;
//   description: string;
// };

// // Icon components for better readability and potential reusability
// const TransferIcon = () => <IoSwapHorizontalOutline className="w-8 h-8 text-primary" />;
// const RocketIcon = () => <IoRocketOutline className="w-8 h-8 text-primary" />;
// const WalletIcon = () => <IoWalletOutline className="w-8 h-8 text-primary" />;

// // Data for the "individuals" products
// // This data is static, so it can be defined outside the component.
// const individualsProductsData: Product[] = [
//   {
//     icon: <TransferIcon />,
//     title: 'Effortless Money Transfers to India',
//     description: 'Easily transfer funds to family and friends in India. Enjoy a seamless experience with direct bank deposits and UPI payments.',
//   },
//   {
//     icon: <RocketIcon />,
//     title: 'Fast & Secure Transfers',
//     description: 'Experience swift and secure international money transfers to INR. Our robust platform ensures your money reaches its destination safely and quickly.',
//   },
//   {
//     icon: <WalletIcon />,
//     title: 'Competitive INR Exchange Rates',
//     description: 'Get the best value for your money with our highly competitive exchange rates for USD, EUR, GBP (and more) to INR, and transparent zero fees.',
//   },
// ];

// const InternationalTransferSection: React.FC = () => {
//   // Since currentProducts will always be individualsProductsData in this version,
//   // we can use it directly.
//   // const currentProducts = individualsProductsData; // This line is not strictly needed anymore

//   return (
//     <section className="InternationalTransferSection sm:py-14 pt-7.5 pb-10">
//       <div className="container mx-auto px-4">
//         {/* Header Section */}
//         <div className="text-center lg:text-left">
//           <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Send Money to <span className="text-primary">India</span>
//           </h3>
//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             Transfer funds internationally to India with ease, speed, and
//             security. We offer competitive exchange rates and a seamless
//             experience for your INR remittances.
//           </p>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 gap-8 sm:mt-16 mt-10">
//           {individualsProductsData.map((product, index) => {
//             const isLastItemInRowSm = (index + 1) % 2 === 0;
//             const isLastItemInRowLg = (index + 1) % 3 === 0;
//             const isLastItemOverall = index === individualsProductsData.length - 1;

//             // Simplified border logic:
//             // - On small screens (sm), items get a bottom border unless they are in the last row.
//             // - On large screens (lg), items get a right border unless they are the last in a 3-column row.
//             // - The very last item overall, or the last item in a row on its respective breakpoint, doesn't get a trailing border.
//             // - Padding is adjusted to accommodate borders.

//             let conditionalClasses = "pb-8 sm:pb-10"; // Default bottom padding

//             if (!isLastItemOverall) {
//                 // Small screens: bottom border if not last in a 2-col layout or if it's a single column item not last overall
//                 if (individualsProductsData.length > 1 && (individualsProductsData.length % 2 !== 0 && index < individualsProductsData.length -1) || (individualsProductsData.length % 2 === 0 && index < individualsProductsData.length - 2) ) {
//                    // Simpler: Add bottom border to all but the actual last items on small screens
//                    if (index < individualsProductsData.length - (individualsProductsData.length % 2 === 0 ? 2 : 1) || (individualsProductsData.length % 2 !== 0 && index < individualsProductsData.length -1 && individualsProductsData.length > 2 ) ) {
//                         // This condition becomes tricky. Let's simplify:
//                         // All items get bottom border on SM, except the last 1 or 2 depending on count.
//                    }
//                 }
//                 // More robust border handling for grid:
//                 // Add bottom border to all items except those that would be in the last row on 'sm'
//                 if (index < individualsProductsData.length - (individualsProductsData.length % 2 === 0 ? 2 : 1)) {
//                     conditionalClasses += " border-b border-b-gray-600/50";
//                 }
//                  // Add right border to all items except those that would be in the last column on 'lg'
//                 if ((index + 1) % 3 !== 0 && index < individualsProductsData.length -1 ) { // Not last in LG row and not the very last item
//                     conditionalClasses += " lg:border-r lg:border-r-gray-600/50 lg:pr-10";
//                 }
//                 // Remove bottom border if it's also getting a right border on LG
//                 if ((index + 1) % 3 !== 0 && index < individualsProductsData.length -1) {
//                     conditionalClasses += " lg:border-b-0 lg:pb-0";
//                 } else {
//                     // If it IS the last in an LG row (but not the overall last row), it might still need bottom padding for SM
//                     // This logic for conditionalClasses was complex. Let's use the original simpler one and refine it.
//                 }
//             }

//             // Reverting to a slightly modified version of your original logic for conditional classes, as it was closer.
//             // The main goal is to avoid borders on the very edges of the grid.
//             conditionalClasses = ""; // Reset

//             if (!isLastItemOverall) {
//                 // Default padding for items that are not the absolute last.
//                 conditionalClasses = "pb-8 sm:pb-10";

//                 // Add bottom border for items not in the last row on small screens
//                 // If 2 items per row, all items except the last 2 (if even) or last 1 (if odd) get bottom border.
//                 if (index < individualsProductsData.length - (individualsProductsData.length % 2 === 0 ? 2 : (individualsProductsData.length === 1 ? 0 : 1) ) ) {
//                      conditionalClasses += " border-b border-b-gray-600/50";
//                 }

//                 // Add right border for items not in the last column on large screens
//                 if (!isLastItemInRowLg) {
//                     conditionalClasses += " lg:border-r lg:border-r-gray-600/50 lg:pr-10";
//                 }

//                 // If it has a right border on LG, it shouldn't have a bottom border on LG
//                 if (!isLastItemInRowLg) {
//                     conditionalClasses += " lg:border-b-0 lg:pb-0"; // Remove bottom border/padding for LG
//                 }
//             }

//             // Handle the special col-span for the last item if the total count is odd
//             // This ensures the last item centers if it's alone on the last row (for sm) or takes full width (for lg if desired)
//             if (isLastItemOverall && individualsProductsData.length % 2 !== 0 && individualsProductsData.length > 1) { // For sm screens if odd number of items
//                 conditionalClasses += " sm:col-span-2 sm:col-span-2 lg:col-span-1";
//             }
//              if (isLastItemOverall && individualsProductsData.length % 3 !== 0 && individualsProductsData.length > 1) { // For lg screens, if items don't fill last row
//                  if (individualsProductsData.length % 3 === 1) { // last item is alone on lg row
//                     // conditionalClasses += " lg:col-span-3"; // Option to make it full width
//                     // Or let it be 1/3 width:
//                     // conditionalClasses += " lg:col-span-1"; // This is default
//                  } else if (individualsProductsData.length % 3 === 2) { // last two items on lg row
//                     // if (index === individualsProductsData.length - 2) conditionalClasses += " lg:col-span-1"; // previous one
//                     // if (index === individualsProductsData.length - 1) conditionalClasses += " lg:col-span-1"; // this one
//                  }
//              }

//             return (
//               <div
//                 key={product.title + index} // Using title + index for a more stable key if titles are unique
//                 className={`text-center space-y-6${conditionalClasses ? ' ' + conditionalClasses.trim() : ''}`}
//               >
//                 <div className="flex justify-center">
//                   <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
//                     <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
//                       {product.icon}
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

// export default React.memo(InternationalTransferSection);




"use client"; // This component uses React state/effects implicitly or explicitly via icons, so "use client" is appropriate.

import React from 'react';
import { MdOutlineHeadsetMic } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { IoReceiptOutline } from "react-icons/io5";
// Define type for Product data
type Product = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

// Icon components for better readability and potential reusability
const ReceiptIcon = () => <IoReceiptOutline className="w-8 h-8 text-primary" />;
const ExchangeAltIcon = () => <CgArrowsExchange className="w-10 h-10 text-primary" />;
const HeadsetIcon = () => <MdOutlineHeadsetMic className="w-8 h-8 text-primary" />;

// Data for the "individuals" products
const individualsProductsData: Product[] = [
  {
    icon: <ReceiptIcon />,
    title: 'No Hidden Fees',
    description: 'Transparent transfers with No hidden Charges.',
  },
  {
    icon: <ExchangeAltIcon />,
    title: 'Superior Exchange Rates',
    description: 'Always get the best value, guaranteed.',
  },
  {
    icon: <HeadsetIcon />,
    title: '24/7 Expert Support',
    description: 'Help when you need it, not bots.',
  },
];

const InternationalTransferSection: React.FC = () => {
  return (
    <section className="InternationalTransferSection lg:py-16 pb-2 py-10">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center lg:text-left">
          <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite lg:max-w-5xl max-w-full">
            Why Thousands Choose{" "}<span className="text-primary">Remityn</span>
          </h3>
          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
            Experience unmatched convenience, reliability,and security, trusted by businesses and individuals alike.
          </p>
        </div>

        {/*
          Products Grid:
          - Mobile (default): 1 column
          - Tablet (md): 2 columns, with the last item spanning both
          - Desktop (lg): 3 columns
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mt-16 mt-10">
          {individualsProductsData.map((product, index) => {
            const totalItems = individualsProductsData.length;

            // Specific check for the third item in a list of three to apply the full-width span on tablets.
            const isThirdItem = totalItems === 3 && index === 2;

            const itemWrapperClasses = `
              relative
              ${isThirdItem ? 'md:col-span-2 lg:col-span-1' : ''}
            `;

            return (
              <div
                key={product.title + index}
                className={itemWrapperClasses}
              >
                {/* Content Area with Padding */}
                <div className="px-0 sm:px-5 py-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
                        {product.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl text-mainheadingWhite font-semibold">
                    {product.title}
                  </h3>
                  <p className="text-subheadingWhite lg:text-lg text-base">
                    {product.description}
                  </p>
                </div>

                {/* --- SEPARATE BORDER DIVS --- */}

                {/* Vertical Border: Show ONLY on large screens (lg) between items */}
                {/* It will appear after items 1 and 2 in a 3-column layout */}
                { (index + 1) % 3 !== 0 && index < totalItems - 1 && (
                  <div className="absolute top-0 right-0 h-full w-px bg-gray-600/50 hidden lg:block" aria-hidden="true" />
                )}

                {/* Horizontal Border: Show on mobile and tablet, but hide on large screens */}
                {/* This applies a bottom border to the first two items, fulfilling the request. */}
                { index < 2 && (
                  <div
                      className="absolute bottom-0 left-0 w-full h-px bg-gray-600/50 block lg:hidden"
                      aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(InternationalTransferSection);






// import React from "react";
// import { IoReceiptOutline } from "react-icons/io5";
// import { CgArrowsExchange, CgArrowsExchangeAlt } from "react-icons/cg";
// import { MdOutlineHeadsetMic } from "react-icons/md";

// // Define type for Product data
// type Product = {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   highlight?: string;
// };

// // Data for the products
// const productsData: Product[] = [
//   {
//     icon: <IoReceiptOutline className="size-10" />,
//     title: "No Hidden Fees",
//     description: "Transparent transfers with No hidden Charges.",
//     highlight: "0% Hidden Charges",
//   },
//   {
//     icon: <CgArrowsExchangeAlt className="size-10" />,
//     title: "Superior Exchange Rates",
//     description: "Always get the best value, guaranteed.",
//     highlight: "Best Rates Guaranteed",
//   },
//   {
//     icon: <MdOutlineHeadsetMic className="size-10" />,
//     title: "24/7 Expert Support",
//     description: "Help when you need it, not bots.",
//     highlight: "Human Support Always",
//   },
// ];

// const InternationalTransferSection: React.FC = () => {
//   return (
//     <section className="relative sm:py-16 py-10 px-4 overflow-hidden bg-background">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-[#66e8fa] rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#66e8fa] rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#66e8fa] rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       {/* Grid Pattern Overlay */}
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="w-full h-full"
//           style={{
//             backgroundImage: `linear-gradient(#66e8fa 1px, transparent 1px), linear-gradient(90deg, #66e8fa 1px, transparent 1px)`,
//             backgroundSize: "50px 50px",
//           }}
//         ></div>
//       </div>

//       <div className="container mx-auto max-w-7xl relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-16 space-y-5">
//           <div className="border px-8 py-2.5 contactbg inline-block rounded-3xl">
//             <span className="text-mainheadingWhite text-lg">
//               Trusted by 100K+ Users
//             </span>
//           </div>

//           <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
//             <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
//               Why Thousands Choose
//             </span>
//             <br />
//             <span className="bg-gradient-to-r from-[#66e8fa] to-cyan-400 bg-clip-text text-transparent">
//               Remityn
//             </span>
//           </h2>

//           <p className="text-subheadingWhite text-xl md:text-2xl max-w-4xl mx-auto">
//             Experience unmatched convenience, reliability, and security trusted
//             by businesses and individuals worldwide.
//           </p>
//         </div>

//         {/* Products Grid */}

//         {/* Added md:grid-cols-2 to the grid container */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//           {productsData.map((product, index) => (
//             // Added conditional classes for the third item (index 2) at the md breakpoint,
//             // and reset them at the lg breakpoint.
//             <div
//               key={index}
//               className={`group relative bg-gradient-to-br from-primary/40 to-white/10 border rounded-3xl sm:p-8 p-6 transition-all duration-500
//                          ${
//                            index === 2
//                              ? "md:col-span-2 md:justify-self-center lg:col-span-1 lg:justify-self-auto"
//                              : ""
//                          }`}
//             >

//               {/* Content */}
//               <div className="relative z-10 text-center">
//                 {/* Icon Container */}
//                 <div className="mb-6">
//                   <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#66e8fa]/50 to-white/10 rounded-full flex items-center justify-center transition-transform duration-300">
//                     <div className="text-[#66e8fa] transition-colors duration-300">
//                       {product.icon}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-2xl font-bold text-white/90 mb-4 transition-colors duration-300">
//                   {product.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-subheadingWhite text-lg">
//                   {product.description}
//                 </p>

//                 {/* Decorative Line */}
//                 <div className="mt-6 w-20 h-1 bg-gradient-to-r from-[#66e8fa] to-transparent mx-auto rounded-full transition-all duration-300"></div>
//               </div>

//               {/* Corner Accent */}
//               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#66e8fa]/10 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 transition-opacity duration-500"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(InternationalTransferSection);
