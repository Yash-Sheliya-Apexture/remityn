// // frontend/src/components/Easymoney.tsx
// "use client";

// import Image from "next/image";
// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// interface CurrencyExchangeServicesProps {}

// // --- Animation Variants (Copied and adapted from AboutSection.tsx logic) ---
// const containerVariants = {
//   hidden: {}, // No visual change for the container itself initially
//   visible: {
//     transition: {
//       staggerChildren: 0.2, // Children will animate sequentially
//     },
//   },
// };

// // Variants for sliding in from the left (for the image)
// const leftBlockVariants = {
//   hidden: { opacity: 0, x: -100 }, // Start off-screen left, invisible
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to original position, fully visible
//     transition: {
//       duration: 0.7, // Animation duration
//       ease: "easeOut", // Animation easing function
//     },
//   },
// };

// // Variants for sliding in from the right (for the text content)
// const rightBlockVariants = {
//   hidden: { opacity: 0, x: 100 }, // Start off-screen right, invisible
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to original position, fully visible
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//       // The staggerChildren in containerVariants will handle the delay
//     },
//   },
// };

// const CurrencyExchangeServices: React.FC<
//   CurrencyExchangeServicesProps
// > = () => {
//   return (
//     <section className="CurrencyExchangeServicesSection md:py-20 py-5 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <motion.div
//           className="flex flex-col lg:flex-row items-center gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ amount: 0.2, once: true }} // Trigger once when 20% visible
//         >
//           {/* Image Area - Appears on the LEFT on large screens (lg:order-1), FIRST on small screens (order-1) */}
//           <motion.div
//             className="w-full lg:w-1/2 order-1 md:order-1" // Image first on SM, left on LG
//             variants={leftBlockVariants} // Slide in from left
//           >
//             <div className="relative w-full flex justify-center">
//               <Image
//                 src="/assets/images/women.png" // Original image path
//                 alt="Currency exchange services illustration" // Updated alt text for clarity
//                 width={550}
//                 height={800}
//                 className="object-contain rounded-3xl"
//                 priority
//               />
//             </div>
//           </motion.div>

//           {/* Text Content Area - Appears on the RIGHT on large screens (lg:order-2), SECOND on small screens (order-2) */}
//           <motion.div
//             className="w-full lg:w-1/2 order-2 lg:order-2" // Text second on SM, right on LG
//             variants={rightBlockVariants} // Slide in from right
//           >
//             <div className="space-y-4 text-center lg:text-left">
//               <div className="inline-block">
//                 <span className="text-subheadingWhite font-medium text-sm uppercase">
//                   <span className="text-subheadingWhite/30">[</span> Our mission{" "}
//                   <span className="text-subheadingWhite/30">]</span>
//                 </span>
//               </div>

//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                   Empowering Transparent{" "}
//                   <span className="text-primary">Global Exchange</span>
//                 </h2>

//                 <p className="text-lg md:text-xl text-subheadingWhite max-w-5xl">
//                   We are committed to making global currency exchange simple and
//                   clear. Our platform ensures transparency with honest rates and
//                   no hidden fees. Trust and reliability are at the heart of
//                   every transaction we facilitate. We empower travelers and
//                   businesses to exchange money confidently worldwide. With us,
//                   your currency exchange experience is secure, fast, and
//                   hassle-free.
//                 </p>
//               </div>

//               <div className="flex justify-center md:justify-start mt-8">
//                 <Link href="/auth/register" className="inline-block">
//                   <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     Create A Free Account
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default CurrencyExchangeServices;

// // frontend/src/components/Easymoney.tsx
// "use client";

// import Image from "next/image";
// import React from "react";
// import Link from "next/link";

// interface CurrencyExchangeServicesProps {}

// const CurrencyExchangeServices: React.FC<
//   CurrencyExchangeServicesProps
// > = () => {
//   return (
//     <section className="CurrencyExchangeServicesSection sm:py-16 py-10 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-8">
//           {/* Image Area - Appears on the LEFT on large screens (lg:order-1), FIRST on small screens (order-1) */}
//           <div
//             className="w-full lg:w-1/2 lg:order-1 order-2" // Image first on SM, left on LG
//           >
//             <div className="sm:hidden block">
//               <span className="text-subheadingWhite font-medium text-sm mb-1 text-center md:text-left block uppercase">
//                 <span className="text-subheadingWhite/30">[</span> Our mission
//                 <span className="text-subheadingWhite/30">]</span>
//               </span>
//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                   Empowering Transparent{" "}
//                   <span className="text-primary"> lobal Exchange</span>
//                 </h3>
//               </div>
//             </div>

//             <div className="relative w-full flex justify-center">
//               <Image
//                 src="/assets/images/women.png" // Original image path
//                 alt="Currency exchange services illustration" // Updated alt text for clarity
//                 width={550}
//                 height={800}
//                 className="object-contain rounded-3xl"
//                 priority
//               />
//             </div>

//             <div className="block md:hidden">
//               <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full pt-8 text-center">
//                 We are committed to making global currency exchange simple and
//                 clear. Our platform ensures transparency with honest rates and
//                 no hidden fees. Trust and reliability are at the heart of every
//                 transaction we facilitate. We empower travelers and businesses
//                 to exchange money confidently worldwide. With us, your currency
//                 exchange experience is secure, fast, and hassle-free.
//               </p>

//               <div className="flex justify-center md:justify-start mt-8">
//                 <Link href="/auth/register" className="inline-block">
//                   <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     Create A Free Account
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Text Content Area - Appears on the RIGHT on large screens (lg:order-2), SECOND on small screens (order-2) */}
//           <div
//             className="w-full lg:w-1/2 lg:order-2 order-1 hidden md:block" // Text second on SM, right on LG
//           >
//             <div className="space-y-4 text-center md:text-left">
//               <div className="sm:inline-block hidden">
//                 <span className="text-subheadingWhite font-medium text-sm uppercase">
//                   <span className="text-subheadingWhite/30">[</span> Our mission
//                   <span className="text-subheadingWhite/30">]</span>
//                 </span>
//               </div>

//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
//                   Empowering Transparent{" "}
//                   <span className="text-primary">Global Exchange </span>
//                 </h3>
//                 <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//                   We are committed to making global currency exchange simple and
//                   clear. Our platform ensures transparency with honest rates and
//                   no hidden fees. Trust and reliability are at the heart of
//                   every transaction we facilitate. We empower travelers and
//                   businesses to exchange money confidently worldwide. With us,
//                   your currency exchange experience is secure, fast, and
//                   hassle-free.
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-center md:justify-start mt-8">
//               <Link href="/auth/register" className="inline-block">
//                 <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                   Create A Free Account
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CurrencyExchangeServices;

// // frontend/src/components/Easymoney.tsx
// "use client";

// import Image from "next/image";
// import React from "react";
// import Link from "next/link";
// import { useAuth } from "@/app/contexts/AuthContext"; // Import useAuth

// interface CurrencyExchangeServicesProps {}

// const CurrencyExchangeServices: React.FC<
//   CurrencyExchangeServicesProps
// > = () => {
//   const { user } = useAuth(); // Get user from AuthContext

//   const buttonText = user ? "Get Started" : "Create A Free Account";
//   const buttonLink = user ? "/dashboard/send/select-balance" : "/auth/register";

//   return (
//     <section className="CurrencyExchangeServicesSection sm:py-16 py-10 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-8">
//           {/* Image Area - Appears on the LEFT on large screens (lg:order-1), FIRST on small screens (order-1) */}
//           <div
//             className="w-full lg:w-1/2 lg:order-1 order-2" // Image first on SM, left on LG
//           >
//             <div className="sm:hidden block">
//               <span className="text-subheadingWhite font-medium text-sm mb-1 text-center md:text-left block uppercase">
//                 <span className="text-subheadingWhite/30">[</span> Our mission
//                 <span className="text-subheadingWhite/30">]</span>
//               </span>
//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                   Empowering Transparent{" "}
//                   <span className="text-primary">Global Exchange</span>{" "}
//                   {/* Corrected typo: lobal -> Global */}
//                 </h3>
//               </div>
//             </div>

//             <div className="relative w-full flex justify-center">
//               <Image
//                 src="/assets/images/women.png" // Original image path
//                 alt="Currency exchange services illustration" // Updated alt text for clarity
//                 width={550}
//                 height={800}
//                 className="object-contain rounded-3xl"
//                 priority
//                 sizes="(max-width: 767px) 100vw, (max-width: 1023px) 768px, (max-width: 1279px) 60vw, 768px"
//               />
//             </div>

//             <div className="block md:hidden">
//               <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full pt-8 text-center">
//                 We are committed to making global currency exchange simple and
//                 clear. Our platform ensures transparency with honest rates and
//                 no hidden fees. Trust and reliability are at the heart of every
//                 transaction we facilitate. We empower travelers and businesses
//                 to exchange money confidently worldwide. With us, your currency
//                 exchange experience is secure, fast, and hassle-free.
//               </p>

//               <div className="flex justify-center md:justify-start mt-8">
//                 <Link href={buttonLink} className="inline-block">
//                   {" "}
//                   {/* MODIFIED Link */}
//                   <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     {buttonText} {/* MODIFIED Text */}
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Text Content Area - Appears on the RIGHT on large screens (lg:order-2), SECOND on small screens (order-2) */}
//           <div
//             className="w-full lg:w-1/2 lg:order-2 order-1 hidden md:block" // Text second on SM, right on LG
//           >
//             <div className="space-y-4 text-center md:text-left">
//               <div className="sm:inline-block hidden">
//                 <span className="text-subheadingWhite font-medium text-sm uppercase">
//                   <span className="text-subheadingWhite/30">[</span> Our mission
//                   <span className="text-subheadingWhite/30">]</span>
//                 </span>
//               </div>

//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
//                   Empowering Transparent{" "}
//                   <span className="text-primary">Global Exchange </span>
//                 </h3>
//                 <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//                   We are committed to making global currency exchange simple and
//                   clear. Our platform ensures transparency with honest rates and
//                   no hidden fees. Trust and reliability are at the heart of
//                   every transaction we facilitate. We empower travelers and
//                   businesses to exchange money confidently worldwide. With us,
//                   your currency exchange experience is secure, fast, and
//                   hassle-free.
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-center md:justify-start mt-8">
//               <Link href={buttonLink} className="inline-block">
//                 {" "}
//                 {/* MODIFIED Link */}
//                 <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                   {buttonText} {/* MODIFIED Text */}
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CurrencyExchangeServices;

// "use client";
// import Image from "next/image";
// import React from "react"; // Import React for React.memo
// import Link from "next/link";
// import { useAuth } from "@/app/contexts/AuthContext";

// interface CurrencyExchangeServicesProps {}

// const CurrencyExchangeServices: React.FC<
//   CurrencyExchangeServicesProps
// > = () => {
//   const { user } = useAuth();

//   const buttonText = user ? "Go to Dashboard" : "Join Remityn Now";
//   const buttonLink = user ? "/dashboard" : "/auth/register";

//   return (
//     <section className="CurrencyExchangeServicesSection sm:py-16 py-10 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-8">
//           <div className="w-full lg:w-1/2 lg:order-1 order-2">
//             {/* ... (content remains the same) ... */}
//             <div className="sm:hidden block">
//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                   Breaking Borders,{" "}
//                   <span className="text-primary">Building Global Trust</span>
//                 </h3>
//               </div>
//             </div>
//             <div className="relative w-full flex justify-center">
//               <Image
//                 src="/assets/images/Group 14.png"
//                 alt="Currency exchange services illustration"
//                 width={1000}
//                 height={1000}
//                 className="object-contain rounded-3xl w-full "
//                 quality={100}
//                 loading="lazy" // This image is likely below the fold, so lazy load
//                 sizes="(max-width: 767px) 100vw, (max-width: 1023px) 768px, (max-width: 1279px) 60vw, 768px"
//               />
//             </div>

//             {/* ... (rest of the content) ... */}
//             <div className="block md:hidden">
//               <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full pt-8 text-center">
//                 At Remityn, simplify global currency exchange by breaking down financial borders and building trust through transparent, reliable and fair-rate services.
//               </p>

//               <div className="flex justify-center md:justify-start mt-7">
//                 <Link href={buttonLink} className="inline-block">
//                   <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium py-3 px-8 h-12.5 lg:text-lg text-base rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     {buttonText}
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2 lg:order-2 order-1 hidden md:block">
//             {/* ... (content remains the same) ... */}
//             <div className="space-y-4 text-center md:text-left">
//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
//                   Breaking Borders,{" "}
//                   <span className="text-primary">Building Global Trust</span>
//                 </h3>
//                 <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//                   At Remityn, simplify global currency exchange by breaking down financial borders and building trust through transparent, reliable and fair-rate services.
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-center md:justify-start mt-8">
//               <Link href={buttonLink} className="inline-block">
//                 <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium py-3 px-8 lg:text-lg text-base h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                   {buttonText}
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="mt-10 bg-primary-foreground sm:p-6 p-4 rounded-3xl flex items-center w-96">
//           <div className="space-y-6">
//               <p className="font-bold text-3xl text-mainheadingWhite">Goal Progress</p>
//               <div className="flex items-center gap-10">
//                 <div className="flex flex-col text-2xl">
//                     <span className="text-subheadingWhite">Paid</span>
//                     <span className="font-semibold text-mainheadingWhite">$3290</span>
//                 </div>
//                 <div className="flex flex-col text-2xl">
//                   <span className="text-subheadingWhite">Remaining</span>
//                   <span className="font-semibold text-mainheadingWhite">$1840</span>
//                 </div>
//               </div>
//               <div className="rounded-full bg-secondarybox h-2 w-72">

//               </div>
//           </div>
//         </div>

//         {/* Progress Card  */}
//         <div className="p-4 bg-white/30 rounded-3xl">

//         </div>

//       </div>
//     </section>
//   );
// };

// export default React.memo(CurrencyExchangeServices); // Memoize component

// "use client";
// import Image from "next/image";
// import React from "react";
// import Link from "next/link";
// import { useAuth } from "@/app/contexts/AuthContext";
// import ProgressCircleCard from "./ProgressCircleCard"; // 1. IMPORT THE NEW COMPONENT (adjust path if needed)

// interface CurrencyExchangeServicesProps {}

// const CurrencyExchangeServices: React.FC<
//   CurrencyExchangeServicesProps
// > = () => {
//   const { user } = useAuth();

//   const buttonText = user ? "Go to Dashboard" : "Join Remityn Now";
//   const buttonLink = user ? "/dashboard" : "/auth/register";

//   return (
//     <section className="CurrencyExchangeServicesSection sm:py-16 py-10 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-8">
//           {/* Left Column with Image */}
//           <div className="w-full lg:w-1/2 lg:order-1 order-2">
//             {/* ... (your existing code for mobile title) ... */}
//             <div className="sm:hidden block">
//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                   Breaking Borders,{" "}
//                   <span className="text-primary">Building Global Trust</span>
//                 </h3>
//               </div>
//             </div>

//             {/* The image container is relative, allowing absolute positioning for children */}
//             <div className="relative sm:pb-28 pb-22 lg:pr-12">
//               <Image
//                 src="/assets/images/Group 14.png"
//                 alt="Woman working on a laptop, representing currency exchange services"
//                 width={1000}
//                 height={1000}
//                 className="object-contain rounded-3xl w-full h-auto"
//                 quality={100}
//                 loading="lazy"
//                 sizes="(max-width: 767px) 100vw, (max-width: 1023px) 768px, (max-width: 1279px) 60vw, 768px"
//               />

//               <div className="w-full absolute bottom-0 sm:right-30 right-7 sm:max-w-[360px] max-w-[260px] bg-primary-foreground p-4 sm:p-6 sm:rounded-3xl rounded-xl flex items-center shadow-2xl z-10 ">
//                 <div className="space-y-4 sm:space-y-6 w-full">
//                   <p className="font-bold text-base sm:text-3xl text-mainheadingWhite">
//                     Goal Progress
//                   </p>
//                   <div className="flex items-center gap-6 sm:gap-10">
//                     <div className="flex flex-col text-sm sm:text-2xl">
//                       <span className="text-subheadingWhite">Paid</span>
//                       <span className="font-semibold text-mainheadingWhite">
//                         $3290
//                       </span>
//                     </div>
//                     <div className="flex flex-col text-sm sm:text-2xl">
//                       <span className="text-subheadingWhite">Remaining</span>
//                       <span className="font-semibold text-mainheadingWhite">
//                         $1840
//                       </span>
//                     </div>
//                   </div>

//                   {/* The progress bar container */}
//                   <div className="relative rounded-full bg-secondarybox h-2 w-full overflow-hidden">
//                     {/* The actual progress fill. Example: 64% progress */}
//                     <div
//                       className="absolute top-0 left-0 h-full bg-primary"
//                       style={{ width: "64%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Progress Circle Card - Positioned on the image */}
//               {/* This outer div creates the semi-transparent, glassy border effect */}
//               <div className="absolute z-10 bottom-16 right-0 bg-gray-500/20 backdrop-blur-lg sm:p-2.5 p-1.5 sm:rounded-3xl rounded-xl w-fit shadow-2xl">
//                 <ProgressCircleCard progress={73} />
//               </div>
//             </div>

//             {/* ... (rest of your left column code) ... */}
//             <div className="block md:hidden">
//               <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full pt-8 text-center">
//                 At Remityn, simplify global currency exchange by breaking down
//                 financial borders and building trust through transparent,
//                 reliable and fair-rate services.
//               </p>

//               <div className="flex justify-center md:justify-start mt-7">
//                 <Link href={buttonLink} className="inline-block">
//                   <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium py-3 px-8 h-12.5 lg:text-lg text-base rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     {buttonText}
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Right Column with Text and Cards */}
//           <div className="w-full lg:w-1/2 lg:order-2 order-1">
//             <div className="hidden md:block">
//               <div className="space-y-4 text-center md:text-left">
//                 <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                   <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
//                     Breaking Borders,{" "}
//                     <span className="text-primary">Building Global Trust</span>
//                   </h3>
//                   <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//                     At Remityn, simplify global currency exchange by breaking
//                     down financial borders and building trust through
//                     transparent, reliable and fair-rate services.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex justify-center md:justify-start mt-8">
//                 <Link href={buttonLink} className="inline-block">
//                   <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium py-3 px-8 lg:text-lg text-base h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     {buttonText}
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(CurrencyExchangeServices);

"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import ProgressCircleCard from "./ProgressCircleCard"; // 1. IMPORT THE NEW COMPONENT (adjust path if needed)

interface CurrencyExchangeServicesProps {}

const CurrencyExchangeServices: React.FC<
  CurrencyExchangeServicesProps
> = () => {
  const { user } = useAuth();

  const buttonText = user ? "Explore Services" : "Join Remityn Now";
  const buttonLink = user ? "/dashboard" : "/auth/register";

  return (
    <section className="CurrencyExchangeServicesSection sm:py-16 py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Column with Image */}
          <div className="w-full lg:w-1/2 lg:order-1 order-2">
            {/* ... (your existing code for mobile title) ... */}
            <div className="sm:hidden block">
              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
                  Empowering Global Payments,{" "}
                  <span className="text-primary">Built on Trust</span>
                </h3>
              </div>
            </div>

            {/* The image container is relative, allowing absolute positioning for children */}
            <div className="relative">
              <Image
                src="/assets/images/Group 14.png"
                alt="Woman working on a laptop, representing currency exchange services"
                width={1000}
                height={1000}
                className="object-cover rounded-3xl w-full h-full"
                quality={100}
                loading="lazy"
              />
            </div>

            {/* ... (rest of your left column code) ... */}
            <div className="block md:hidden">
              <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full pt-8 text-center">
                At Remityn, we simplify international currency exchange by
                eliminating financial barriers. Our commitment is to deliver
                transparent, secure, and competitive rate services helping you
                send money across borders with confidence.
              </p>

              <div className="flex justify-center md:justify-start mt-7">
                <Link href={buttonLink} className="inline-block">
                  <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium py-3 px-8 h-12.5 lg:text-lg text-base rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    {buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column with Text and Cards */}
          <div className="w-full lg:w-1/2 lg:order-2 order-1">
            <div className="hidden md:block">
              <div className="space-y-4 text-center md:text-left">
                <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                  <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
                    Empowering Global Payments,{" "}
                    <span className="text-primary">Built on Trust</span>
                  </h3>

                  <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
                    At Remityn, we simplify international currency exchange by
                    eliminating financial barriers. Our commitment is to deliver
                    transparent, secure, and competitive rate services helping
                    you send money across borders with confidence.
                  </p>
                </div>
              </div>
              <div className="flex justify-center md:justify-start mt-8">
                <Link href={buttonLink} className="inline-block">
                  <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium py-3 px-8 lg:text-lg text-base h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    {buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CurrencyExchangeServices);
