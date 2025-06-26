// "use client"; // This component uses client-side state for the tabs.

// import React, { useState } from "react";
// import Image from "next/image";
// import { ArrowRight } from "lucide-react";

// // --- Data Structure ---
// // This makes it easy to change the text and values for each tab.
// // I've updated the headline to separate the dynamic part.
// const transferData = {
//   cheapest: {
//     headline: "Cheapest Way to",
//     description:
//       "The cheapest way to send 9,000 USD to INR is from a Remityn balance and costs 0% USD. We use the mid-market exchange rate, the fairest rate and always show your fees upfront.",
//     table: {
//       headerRight: "Transfer Cost",
//       rowValue: "0.00 INR",
//     },
//   },
//   fastest: {
//     headline: "Fastest Way to",
//     description:
//       "Sending money with Remityn is super fast: 64% of transfers arrive in under 30 seconds, and 95% in less than a day. How long it takes depends on how you pay.",
//     table: {
//       headerRight: "Should arrive",
//       rowValue: "by Tuesday",
//     },
//   },
// };

// // --- Reusable Currency Flag Component ---
// const CurrencyFlag = ({ code, flagSrc }: { code: string; flagSrc: string }) => (
//   <div className="flex items-center gap-3">
//     <Image
//       src={flagSrc}
//       alt={`${code} flag`}
//       width={48}
//       height={48}
//       className="rounded-full"
//     />
//     <span className="font-semibold text-2xl text-mainheadingWhite">{code}</span>
//   </div>
// );

// const TransferWaySection = () => {
//   const [activeTab, setActiveTab] = useState<"cheapest" | "fastest">(
//     "cheapest"
//   );

//   const currentData = transferData[activeTab];

//   return (
//     <section className="py-10 sm:py-16">
//       <div className="container mx-auto px-4">
//         <div className="mx-auto max-w-4xl text-center space-y-4">
//           {/* Tab Switcher */}
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-primary-foreground p-1.5 rounded-full flex items-center gap-2">
//               <button
//                 onClick={() => setActiveTab("cheapest")}
//                 className={`px-4 py-3 w-36 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-75 ease-linear cursor-pointer ${
//                   activeTab === "cheapest"
//                     ? "shadow-sm bg-primary text-mainheading"
//                     : "bg-transparent text-mainheadingWhite"
//                 }`}
//               >
//                 Cheapest way
//               </button>
//               <button
//                 onClick={() => setActiveTab("fastest")}
//                 className={`px-4 py-3 w-36 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-75 ease-linear cursor-pointer ${
//                   activeTab === "fastest"
//                     ? "shadow-sm bg-primary text-mainheading"
//                     : "bg-transparent text-mainheadingWhite"
//                 }`}
//               >
//                 Fastest way
//               </button>
//             </div>
//           </div>

//           {/* Dynamic Headline */}
//           <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-mainheadingWhite">
//             {/* The h3 now includes the styled span */}
//             {currentData.headline}{" "}
//             <span className="text-primary">Send Money</span>
//           </h3>

//           {/* Dynamic Description */}
//           <p className="text-subheadingWhite md:text-lg text-base">
//             {currentData.description}
//           </p>
//         </div>

//         <div className="mt-8 space-y-8">
//           {/* Currency Display */}
//           <div className="flex items-center justify-center gap-4">
//             <CurrencyFlag code="USD" flagSrc="/assets/icon/flags/usd.svg" />
//             <ArrowRight className="text-white/90" size={24} />
//             <CurrencyFlag code="INR" flagSrc="/assets/icon/flags/inr.svg" />
//           </div>

//           {/* Transfer Details Card */}
//           <div className="w-full max-w-xl mx-auto">
//             <div className="rounded-xl shadow-md overflow-hidden">
//               {/* Card Header */}
//               <div className="bg-primary text-mainheading flex justify-between items-center py-4 px-6">
//                 <span className="font-semibold">Sending 9,000 USD</span>
//                 <span className="font-semibold">
//                   {currentData.table.headerRight}
//                 </span>
//               </div>
//               {/* Card Body */}
//               <div className="bg-primarybox flex justify-between items-center py-4 px-6 text-sunheadignWhite">
//                 <span className="text-sunheadignWhite">Bank Transfer</span>
//                 <span className="font-bold">{currentData.table.rowValue}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransferWaySection;



// "use client"; // This component uses client-side state for the tabs.

// import React, { useState } from "react";
// import Image from "next/image";
// import { ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";

// // --- Reusable Currency Flag Component (no changes) ---
// const CurrencyFlag = ({ code, flagSrc }: { code: string; flagSrc: string }) => (
//   <div className="flex items-center gap-3">
//     <Image
//       src={flagSrc}
//       alt={`${code} flag`}
//       width={48}
//       height={48}
//       className="rounded-full"
//     />
//     <span className="font-semibold text-2xl text-mainheadingWhite">{code}</span>
//   </div>
// );

// // --- Tabs definition (no changes) ---
// const tabs = [
//   { id: "cheapest", label: "Cheapest way" },
//   { id: "fastest", label: "Fastest way" },
// ];

// const TransferWaySection = () => {
//   const [activeTab, setActiveTab] = useState<"cheapest" | "fastest">(
//     tabs[1].id as "cheapest" | "fastest"
//   );

//   // --- DYNAMIC DATE CALCULATION ---
//   const arrivalDate = new Date();
//   arrivalDate.setDate(arrivalDate.getDate() + 2);
//   const arrivalDay = arrivalDate.toLocaleDateString("en-US", { weekday: "long" });

//   // --- DYNAMIC DAILY AMOUNT CALCULATION ---
//   // 1. Create a seed based on the current day to ensure the value is stable for 24h
//   const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

//   // 2. Use a simple pseudo-random generator to get a number for the thousands place (e.g., 1 to 50)
//   const minThousands = 1;
//   const maxThousands = 50;
//   // A simple math function to get a consistent "random" number between 0 and 1 for the day
//   const pseudoRandom = (Math.sin(daySeed) + 1) / 2; 
//   const randomThousands = Math.floor(pseudoRandom * (maxThousands - minThousands + 1)) + minThousands;

//   // 3. Calculate and format the final amount
//   const randomAmount = randomThousands * 1000;
//   const formattedAmount = randomAmount.toLocaleString("en-US"); // e.g., formats 9000 to "9,000"


//   // --- DATA STRUCTURE (using dynamic date and amount) ---
//   const transferData = {
//     cheapest: {
//       headline: "Cheapest Way to",
//       description: `The cheapest way to send ${formattedAmount} USD to INR is from a Remityn balance and costs 0% USD. We use the mid-market exchange rate, the fairest rate and always show your fees upfront.`,
//       table: {
//         headerLeft: `Sending ${formattedAmount} USD`,
//         headerRight: "Transfer Cost",
//         rowValue: "0.00 INR",
//       },
//     },
//     fastest: {
//       headline: "Fastest Way to",
//       description:
//         "Sending money with Remityn is super fast: 64% of transfers arrive in under 30 seconds, and 95% in less than a day. How long it takes depends on how you pay.",
//       table: {
//         headerLeft: `Sending ${formattedAmount} USD`,
//         headerRight: "Should arrive",
//         rowValue: `by ${arrivalDay}`,
//       },
//     },
//   };

//   const currentData = transferData[activeTab];

//   return (
//     <section className="py-10 sm:py-16">
//       <div className="container mx-auto px-4">
//         <div className="mx-auto max-w-4xl text-center space-y-4">
//           {/* Tab Switcher */}
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-primary-foreground p-1.5 rounded-full flex items-center gap-2 sm:w-auto w-full">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id as "cheapest" | "fastest")}
//                   className={`p-3 sm:w-44 w-full flex items-center justify-center rounded-full font-semibold transition-all duration-75 ease-linear cursor-pointer relative ${
//                     activeTab === tab.id
//                       ? "text-mainheading"
//                       : "text-mainheadingWhite hover:text-white"
//                   }`}
//                   style={{
//                     WebkitTapHighlightColor: "transparent",
//                   }}
//                 >
//                   {activeTab === tab.id && (
//                     <motion.div
//                       layoutId="active-pill"
//                       className="absolute inset-0 bg-primary rounded-full shadow-sm"
//                       transition={{ stiffness: 350, damping: 30 }}
//                     />
//                   )}
//                   <span className="relative z-10">{tab.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Dynamic Headline */}
//           <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-mainheadingWhite">
//             {currentData.headline}{" "}
//             <span className="text-primary">Send Money</span>
//           </h3>

//           {/* Dynamic Description */}
//           <p className="text-subheadingWhite md:text-lg text-base">
//             {currentData.description}
//           </p>
//         </div>

//         <div className="mt-8 space-y-8">
//           {/* Currency Display */}
//           <div className="flex items-center justify-center gap-4">
//             <CurrencyFlag code="USD" flagSrc="/assets/icon/flags/usd.svg" />
//             <ArrowRight className="text-white/90" size={24} />
//             <CurrencyFlag code="INR" flagSrc="/assets/icon/flags/inr.svg" />
//           </div>

//           {/* Transfer Details Card */}
//           <div className="w-full max-w-xl mx-auto">
//             <div className="rounded-xl shadow-md overflow-hidden">
//               <div className="bg-primary text-mainheading flex justify-between sm:items-center gap-2 py-4 px-6">
//                 {/* UPDATED to use dynamic data */}
//                 <span className="font-semibold flex-1">
//                   {currentData.table.headerLeft}
//                 </span>
//                 <span className="font-semibold flex-1">
//                   {currentData.table.headerRight}
//                 </span>
//               </div>
//               <div className="bg-primarybox flex justify-between items-center gap-2 py-4 px-6 text-sunheadignWhite">
//                 <span className="text-sunheadignWhite flex-1">Bank Transfer</span>
//                 <span className="font-bold flex-1">{currentData.table.rowValue}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransferWaySection;


"use client"; // This component uses client-side state for the tabs.

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// --- Reusable Currency Flag Component (no changes) ---
const CurrencyFlag = ({ code, flagSrc }: { code: string; flagSrc: string }) => (
  <div className="flex items-center gap-3">
    <Image
      src={flagSrc}
      alt={`${code} flag`}
      width={48}
      height={48}
      className="rounded-full"
    />
    <span className="font-semibold text-2xl text-mainheadingWhite">{code}</span>
  </div>
);

// --- Tabs definition (no changes) ---
const tabs = [
  { id: "cheapest", label: "Cheapest way" },
  { id: "fastest", label: "Fastest way" },
];

// --- NEW: Define the list of available source currencies ---
const availableCurrencies = [
  { code: "USD", flagSrc: "/assets/icon/flags/usd.svg" },
  { code: "EUR", flagSrc: "/assets/icon/flags/eur.svg" },
  { code: "AED", flagSrc: "/assets/icon/flags/aed.svg" },
  { code: "AUD", flagSrc: "/assets/icon/flags/aud.svg" },
  { code: "CAD", flagSrc: "/assets/icon/flags/cad.svg" },
];

// --- NEW: Define the static destination currency ---
const destinationCurrency = {
  code: "INR",
  flagSrc: "/assets/icon/flags/inr.svg",
};


const TransferWaySection = () => {
  const [activeTab, setActiveTab] = useState<"cheapest" | "fastest">(
    tabs[0].id as "cheapest" | "fastest"
  );

  // --- DYNAMIC DAILY CALCULATIONS ---
  // 1. Create a single seed based on the current day for all daily dynamic values.
  const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

  // --- NEW: DYNAMIC DAILY CURRENCY SELECTION ---
  // 2. Use the modulo operator to pick a currency for the day. This cycles through the list.
  const currencyIndex = daySeed % availableCurrencies.length;
  const fromCurrency = availableCurrencies[currencyIndex];

  // --- DYNAMIC DAILY AMOUNT CALCULATION (logic unchanged) ---
  // 3. Use a pseudo-random generator based on the same seed for the amount
  const pseudoRandom = (Math.sin(daySeed) + 1) / 2;
  const randomThousands = Math.floor(pseudoRandom * (50 - 1 + 1)) + 1; // 1 to 50
  const randomAmount = randomThousands * 1000;
  const formattedAmount = randomAmount.toLocaleString("en-US");

  // --- DYNAMIC DATE CALCULATION (logic unchanged) ---
  const arrivalDate = new Date();
  arrivalDate.setDate(arrivalDate.getDate() + 2);
  const arrivalDay = arrivalDate.toLocaleDateString("en-US", { weekday: "long" });

  // --- UPDATED DATA STRUCTURE (uses dynamic currency and amount) ---
  const transferData = {
    cheapest: {
      headline: "Cheapest Way to",
      description: (
        <>
          The cheapest way to send {formattedAmount} {fromCurrency.code} to {destinationCurrency.code} is using your Remityn balance with <strong>zero transfer fees</strong>. We offer the mid-market exchange rate, which is the most transparent and fair rate available, and we always show you the full cost upfront.
        </>
      ),
      table: {
        headerLeft: `Sending ${formattedAmount} ${fromCurrency.code}`,
        headerRight: "Transfer Cost",
        rowValue: `0.00 ${destinationCurrency.code}`,
      },
    },
    fastest: {
      headline: "Fastest Way to",
      description:
        "Remityn offers one of the fastest money transfer services: 64% of transfers arrive in under 30 seconds, and 95% arrive within a day. The delivery time depends on your payment method.",
      table: {
        headerLeft: `Sending ${formattedAmount} ${fromCurrency.code}`,
        headerRight: "Should arrive",
        rowValue: `by ${arrivalDay}`,
      },
    },
  };

  const currentData = transferData[activeTab];

  return (
    <section className="TransferWaySection py-10 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Tab Switcher (no changes) */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary-foreground p-1.5 rounded-full flex items-center gap-2 sm:w-auto w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "cheapest" | "fastest")}
                  className={`p-3 sm:w-44 w-full flex items-center justify-center rounded-full font-semibold transition-all duration-75 ease-linear cursor-pointer relative ${
                    activeTab === tab.id
                      ? "text-mainheading"
                      : "text-mainheadingWhite hover:text-white"
                  }`}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-primary rounded-full shadow-sm"
                      transition={{ stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Headline (no changes) */}
          <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
            {currentData.headline}{" "}
            <span className="text-primary">Send Money</span>
          </h3>

          {/* Dynamic Description (no changes needed, it pulls from currentData) */}
          <p className="text-subheadingWhite md:text-lg text-base">
            {currentData.description}
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center items-center gap-8">
          {/* --- UPDATED: Currency Display now fully dynamic --- */}
          <div className="flex items-center justify-center gap-4">
            <CurrencyFlag code={fromCurrency.code} flagSrc={fromCurrency.flagSrc} />
            <ArrowRight className="text-white/90" size={24} />
            <CurrencyFlag code={destinationCurrency.code} flagSrc={destinationCurrency.flagSrc} />
          </div>

          {/* Transfer Details Card (no changes needed, it pulls from currentData) */}
          <div className="w-full max-w-xl mx-auto">
            <div className="rounded-xl shadow-md overflow-hidden">
              <div className="bg-primary text-mainheading flex justify-between sm:items-center gap-2 py-4 px-6">
                <span className="font-semibold flex-1">
                  {currentData.table.headerLeft}
                </span>
                <span className="font-semibold flex-1">
                  {currentData.table.headerRight}
                </span>
              </div>
              <div className="bg-primarybox flex justify-between items-center gap-2 py-4 px-6 text-sunheadignWhite">
                <span className="text-sunheadignWhite flex-1">Bank Transfer</span>
                <span className="font-bold flex-1">{currentData.table.rowValue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferWaySection;