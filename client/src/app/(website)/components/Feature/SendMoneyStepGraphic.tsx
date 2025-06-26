// import { Search } from 'lucide-react';
// import Image from 'next/image';
// import React from 'react';
// import { IoIosArrowForward } from 'react-icons/io';

// // A simple container for the graphics
// const GraphicContainer = ({ children }: { children: React.ReactNode }) => (
//   <div className="mt-8 flex justify-center items-center">
//     {children}
//   </div>
// );

// // Graphic for Step 1: Sign Up
// export const SignUpGraphic = () => (
//   <GraphicContainer>
//     <div className="w-full max-w-sm rounded-xl bg-background sm:p-6 p-4 shadow-md">
//       <div className="space-y-2 pb-2">
//         <div className="relative">
//           <Image
//             src={"/assets/images/logo.svg"}
//             alt="logo"
//             width={32}
//             height={32}
//           />
//         </div>
//         <p className="font-medium text-mainheadingWhite">Sign Up</p>
//         <p className="text-sm text-subheadingWhite">
//             Enter your details to create your account and get started.
//         </p>
//       </div>
//       <div className='border-t pt-2 space-y-2'>
//         <div className="bg-primarybox px-2.5 py-1.5 text-white w-full rounded-sm">
//             <span className='text-gray-400 text-xs'>Enter your email</span>
//         </div>
//         <button className="w-full rounded-sm bg-primary py-2 text-sm font-semibold text-mainheading">
//             Get Started
//         </button>
//       </div>
//     </div>
//   </GraphicContainer>
// );

// // Graphic for Step 2: Currency Wallet
// export const CurrencyWalletGraphic = () => (
//   <GraphicContainer>
//     <div className='relative mt-22'>
//         <div className='flex justify-center opacity-70'>
//             <div className="w-64 rounded-xl bg-background p-4 shadow-md h-[176px] absolute -top-22">
//                 <div className="flex flex-col justify-between">
//                     <div className="flex items-center gap-4">
//                     <Image
//                         src={`/assets/icon/aed.svg`}
//                         alt={`AED flag`}
//                         width={36}
//                         height={36}
//                         className="rounded-full object-contain"
//                     />
//                     <span className="text-mainheadingWhite text-xl font-semibold">
//                         AED
//                     </span>
//                     </div>
//                     <div className="pt-12">
//                     <span className="text-mainheadingWhite text-2xl font-semibold">
//                         100.00
//                     </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className='flex justify-center opacity-85'>
//             <div className="w-72 rounded-xl bg-background sm:p-6 p-4 shadow-md h-[176px]  absolute -top-12">
//                 <div className="flex flex-col justify-between">
//                     <div className="flex items-center gap-4">
//                     <Image
//                         src={`/assets/icon/eur.svg`}
//                         alt={`EUR flag`}
//                         width={36}
//                         height={36}
//                         className="rounded-full object-contain"
//                     />
//                     <span className="text-mainheadingWhite text-xl font-semibold">
//                         EUR
//                     </span>
//                     </div>
//                     <div className="pt-12">
//                     <span className="text-mainheadingWhite text-2xl font-semibold">
//                         980.00
//                     </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="w-80 rounded-xl bg-background sm:p-6 p-4 shadow-md h-[176px] relative z-10">
//             <div className="flex flex-col justify-between">
//                 <div className="flex items-center gap-4">
//                 <Image
//                     src={`/assets/icon/usd.svg`}
//                     alt={`USD flag`}
//                     width={36}
//                     height={36}
//                     className="rounded-full object-contain"
//                 />
//                 <span className="text-mainheadingWhite text-xl font-semibold">
//                     USD
//                 </span>
//                 </div>
//                 <div className="pt-12">
//                 <span className="text-mainheadingWhite text-2xl font-semibold">
//                     512.00
//                 </span>
//                 </div>
//             </div>
//         </div>
//     </div>
//   </GraphicContainer>
// );

// // Graphic for Step 3: Add Recipients
// export const RecipientsGraphic = () => (
//   <GraphicContainer>
//     <div className="w-full max-w-sm rounded-xl bg-background sm:p-6 p-4 shadow-md">
//       <div className="rounded-full w-full border p-4">
//         <Search className="size-5" />
//       </div>
//       <div className="mt-4">
//         <div className='flex justify-between items-center'>
//           <div className="flex items-center">
//             <div className="size-12.5 rounded-full bg-secondarybox flex items-center justify-center relative flex-shrink-0">
//               <span className="font-bold text-white/90">KP</span>
//               <div className="absolute bottom-0 right-0 size-4 rounded-full overflow-hidden">
//                 <Image
//                   src={`/assets/icon/inr.svg`} // Use dynamic icon path
//                   alt={`INR flag`}
//                   width={20}
//                   height={20}
//                 />
//               </div>
//             </div>

//             <div className="sm:ml-4 ml-2">
//               <h5 className="font-medium leading-relaxed text-mainheadingWhite sm:text-lg text-base">
//                 Kartavya Patel
//               </h5>

//               <p className="sm:text-sm text-xs text-subheadingWhite mt-1">
//                 INR Account XXXX0101{" "}
//               </p>
//             </div>
//           </div>
//           <div className="ml-4">
//             <IoIosArrowForward className="size-4 text-mainheadingWhite" />
//           </div>
//         </div>
//       </div>
//     </div>
//   </GraphicContainer>
// );


// import { Search } from 'lucide-react';
// import Image from 'next/image';
// import React, { useRef, useState, useEffect } from 'react';
// import { IoIosArrowForward } from 'react-icons/io';
// import { motion } from 'framer-motion';


// // --- DATA ARRAYS ---

// // Data for the Currency Wallet Graphic
// const walletData = [
//   {
//     currencyCode: 'AED',
//     amount: '100.00',
//     icon: '/assets/icon/aed.svg',
//     // Style classes for the stacked card effect
//     containerClasses: 'w-64 opacity-70 absolute -top-22',
//     wrapperClasses: 'flex justify-center',
//   },
//   {
//     currencyCode: 'EUR',
//     amount: '980.00',
//     icon: '/assets/icon/eur.svg',
//     containerClasses: 'w-72 opacity-85 absolute -top-12',
//     wrapperClasses: 'flex justify-center',
//   },
//   {
//     currencyCode: 'USD',
//     amount: '512.00',
//     icon: '/assets/icon/usd.svg',
//     containerClasses: 'w-80 relative z-10',
//     wrapperClasses: '', // The top card doesn't need centering wrapper
//   },
// ];

// // Data for the Recipients Graphic
// const recipientsData = [
//     {
//         name: 'Kartavya Patel',
//         initials: 'KP',
//         accountInfo: 'INR Account XXXX0101',
//         currencyCode: 'inr', // used for alt text
//         currencyIcon: '/assets/icon/inr.svg',
//     },
//     {
//         name: 'Amit Joshi',
//         initials: 'AJ',
//         accountInfo: 'INR Account XXXX2477',
//         currencyCode: 'inr',
//         currencyIcon: '/assets/icon/inr.svg',
//     },
//     {
//         name: 'Manish Vyas',
//         initials: 'MV',
//         accountInfo: 'INR Account XXXX9856',
//         currencyCode: 'inr',
//         currencyIcon: '/assets/icon/inr.svg',
//     },
// ];


// // --- COMPONENTS ---

// // A simple container for the graphics
// const GraphicContainer = ({ children }: { children: React.ReactNode }) => (
//   <div className="mt-8 flex justify-center items-center">
//     {children}
//   </div>
// );

// // Graphic for Step 1: Sign Up (Unchanged)
// export const SignUpGraphic = () => (
//   <GraphicContainer>
//     <div className="w-full max-w-sm rounded-xl bg-background sm:p-6 p-4 shadow-md">
//       <div className="space-y-2 pb-2">
//         <div className="relative">
//           <Image
//             src={"/assets/images/logo.svg"}
//             alt="logo"
//             width={32}
//             height={32}
//           />
//         </div>
//         <p className="font-medium text-mainheadingWhite">Sign Up</p>
//         <p className="text-sm text-subheadingWhite">
//             Enter your details to create your account and get started.
//         </p>
//       </div>
//       <div className='border-t pt-2 space-y-2'>
//         <div className="bg-primarybox px-2.5 py-1.5 text-white w-full rounded-sm">
//             <span className='text-gray-400 text-xs'>Enter your email</span>
//         </div>
//         <button className="w-full rounded-sm bg-primary py-2 text-sm font-semibold text-mainheading">
//             Get Started
//         </button>
//       </div>
//     </div>
//   </GraphicContainer>
// );

// // Graphic for Step 2: Currency Wallet (Refactored)
// export const CurrencyWalletGraphic = () => (
//   <GraphicContainer>
//     <div className='relative mt-22 h-[200px] w-80'> {/* Set a fixed height container */}
//       {walletData.map((wallet) => (
//         <div key={wallet.currencyCode} className={wallet.wrapperClasses}>
//           <div className={`rounded-xl bg-background p-4 shadow-md h-[176px] ${wallet.containerClasses}`}>
//             <div className="flex flex-col justify-between">
//               <div className="flex items-center gap-4">
//                 <Image
//                   src={wallet.icon}
//                   alt={`${wallet.currencyCode} flag`}
//                   width={36}
//                   height={36}
//                   className="rounded-full object-contain"
//                 />
//                 <span className="text-mainheadingWhite text-xl font-semibold">
//                   {wallet.currencyCode}
//                 </span>
//               </div>
//               <div className="pt-12">
//                 <span className="text-mainheadingWhite text-2xl font-semibold">
//                   {wallet.amount}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </GraphicContainer>
// );

// // Graphic for Step 3: Add Recipients (Refactored)
// export const RecipientsGraphic = () => (
//   <GraphicContainer>
//     <div className="w-full max-w-sm rounded-xl bg-background sm:p-6 p-4 shadow-md">
//       <div className="rounded-full w-full border p-4 flex items-center">
//         <Search className="size-5" />
//       </div>
//       <div className="mt-4 space-y-4"> {/* Added space-y-4 for multiple items */}
//         {recipientsData.map((recipient) => (
//           <div key={recipient.name} className='flex justify-between items-center'>
//             <div className="flex items-center">
//               <div className="size-12.5 rounded-full bg-secondarybox flex items-center justify-center relative flex-shrink-0">
//                 <span className="font-bold text-white/90">{recipient.initials}</span>
//                 <div className="absolute bottom-0 right-0 size-4 rounded-full overflow-hidden">
//                   <Image
//                     src={recipient.currencyIcon}
//                     alt={`${recipient.currencyCode} flag`}
//                     width={20}
//                     height={20}
//                   />
//                 </div>
//               </div>

//               <div className="sm:ml-4 ml-2">
//                 <h5 className="font-medium leading-relaxed text-mainheadingWhite sm:text-lg text-base">
//                   {recipient.name}
//                 </h5>

//                 <p className="sm:text-sm text-xs text-subheadingWhite mt-1">
//                   {recipient.accountInfo}
//                 </p>
//               </div>
//             </div>
//             <div className="ml-4">
//               <IoIosArrowForward className="size-4 text-mainheadingWhite" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </GraphicContainer>
// );

// export const SendMoneyGraphic = () => {
//     // 1. Create refs to hold the DOM elements of the cards
//     const leftCardRef = useRef<HTMLDivElement>(null);
//     const rightCardRef = useRef<HTMLDivElement>(null);
    
//     // 2. Create state to store the calculated start and end points of the animation
//     const [animationPath, setAnimationPath] = useState({ startX: 0, endX: 0 });

//     // 3. Use useEffect to measure the card positions after the component mounts and on window resize
//     useEffect(() => {
//         const calculatePath = () => {
//             // Ensure both refs are attached to elements before calculating
//             if (leftCardRef.current && rightCardRef.current) {
//                 const parentRect = leftCardRef.current.parentElement!.getBoundingClientRect();
//                 const leftRect = leftCardRef.current.getBoundingClientRect();
//                 const rightRect = rightCardRef.current.getBoundingClientRect();

//                 // Calculate the center of each card relative to their common parent
//                 const startX = leftRect.left - parentRect.left + (leftRect.width / 2);
//                 const endX = rightRect.left - parentRect.left + (rightRect.width / 2);
                
//                 setAnimationPath({ startX, endX });
//             }
//         };

//         // Calculate the path initially
//         calculatePath();

//         // Recalculate the path whenever the window is resized
//         window.addEventListener('resize', calculatePath);

//         // Cleanup: remove the event listener when the component unmounts
//         return () => window.removeEventListener('resize', calculatePath);
//     }, []); // Empty dependency array means this effect runs only once on mount

//     return (
//         <GraphicContainer>
//             <div 
//                 className="w-full max-w-lg rounded-2xl sm:p-6 p-4 bg-background [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]"
//             >
//                 {/* The parent div for the animation and the cards now needs to be relative */}
//                 <div className="relative flex items-center justify-between">
                    
//                     {/* 4. Only render the animation if we have a valid path to prevent it from appearing at (0,0) */}
//                     {animationPath.startX > 0 && (
//                         <motion.div
//                             // Position the animation layer absolutely within the relative parent
//                             className="absolute top-0 left-0 h-full flex items-center"
//                             // Use the calculated state for the animation path
//                             animate={{
//                                 x: [animationPath.startX, animationPath.endX],
//                                 opacity: [0, 1, 1, 0], // Fade in, stay visible, fade out
//                             }}
//                             transition={{
//                                 duration: 2,
//                                 repeat: Infinity,
//                                 ease: 'easeInOut',
//                                 // Control the timing of the opacity fade
//                                 // 0-10%: fade in, 10%-90%: move, 90%-100%: fade out
//                                 times: [0, 0.1, 0.9, 1], 
//                             }}
//                         >
//                             {/* The dollar sign needs to be vertically centered, so we subtract half its height */}
//                             <span className="text-3xl font-bold text-green-500 -translate-x-1/2">₹</span>
//                         </motion.div>
//                     )}

//                     {/* Left Card: Attach the ref here */}
//                     <div ref={leftCardRef} className="flex items-center justify-center sm:rounded-2xl rounded-xl bg-primarybox sm:p-4 p-2 z-10">
//                         <Image
//                             src="/assets/images/logo.svg"
//                             alt="logo"
//                             width={64}
//                             height={64}
//                             className='sm:size-16 size-12'
//                         />
//                     </div>  

//                     {/* Right Card: Attach the ref here */}
//                     <div ref={rightCardRef} className="flex items-center justify-center sm:rounded-2xl rounded-xl bg-primarybox sm:p-4 p-2 z-10">
//                         <Image
//                             src="/assets/icon/inr.svg"
//                             alt="inr flag"
//                             width={64}
//                             height={64}
//                             className='sm:size-16 size-12'
//                         />
//                     </div>
//                 </div>
//             </div>
//         </GraphicContainer>
//     );
// }



// import { Search } from 'lucide-react';
// import Image from 'next/image';
// import React, { useRef, useState, useEffect } from 'react';
// import { IoIosArrowForward } from 'react-icons/io';
// import { motion } from 'framer-motion';


// // --- DATA ARRAYS ---

// // Data for the Currency Wallet Graphic
// const walletData = [
//   {
//     currencyCode: 'AED',
//     amount: '100.00',
//     icon: '/assets/icon/aed.svg',
//     // Style classes for the stacked card effect
//     containerClasses: 'w-64 opacity-70 absolute -top-22',
//     wrapperClasses: 'flex justify-center',
//   },
//   {
//     currencyCode: 'EUR',
//     amount: '980.00',
//     icon: '/assets/icon/eur.svg',
//     containerClasses: 'w-72 opacity-85 absolute -top-12',
//     wrapperClasses: 'flex justify-center',
//   },
//   {
//     currencyCode: 'USD',
//     amount: '512.00',
//     icon: '/assets/icon/usd.svg',
//     containerClasses: 'w-80 relative z-10',
//     wrapperClasses: '', // The top card doesn't need centering wrapper
//   },
// ];

// // Data for the Recipients Graphic
// const recipientsData = [
//     {
//         name: 'Kartavya Patel',
//         initials: 'KP',
//         accountInfo: 'INR Account XXXX0101',
//         currencyCode: 'inr', // used for alt text
//         currencyIcon: '/assets/icon/inr.svg',
//     },
//     {
//         name: 'Amit Joshi',
//         initials: 'AJ',
//         accountInfo: 'INR Account XXXX2477',
//         currencyCode: 'inr',
//         currencyIcon: '/assets/icon/inr.svg',
//     },
//     {
//         name: 'Manish Vyas',
//         initials: 'MV',
//         accountInfo: 'INR Account XXXX9856',
//         currencyCode: 'inr',
//         currencyIcon: '/assets/icon/inr.svg',
//     },
// ];


// // --- COMPONENTS ---

// // A simple container for the graphics
// const GraphicContainer = ({ children }: { children: React.ReactNode }) => (
//   <div className="mt-8 flex justify-center items-center">
//     {children}
//   </div>
// );

// // Graphic for Step 1: Sign Up (Unchanged)
// export const SignUpGraphic = () => (
//   <GraphicContainer>
//     <div className="w-full max-w-sm rounded-xl bg-background sm:p-6 p-4 shadow-md">
//       <div className="space-y-2 pb-2">
//         <div className="relative">
//           <Image
//             src={"/assets/images/Logo.svg"}
//             alt="logo"
//             width={32}
//             height={32}
//           />
//         </div>
//         <p className="font-medium text-mainheadingWhite">Sign Up</p>
//         <p className="text-sm text-subheadingWhite">
//             Enter your details to create your account and get started.
//         </p>
//       </div>
//       <div className='border-t pt-2 space-y-2'>
//         <div className="bg-primarybox px-2.5 py-1.5 text-white w-full rounded-sm">
//             <span className='text-gray-400 text-xs'>Enter your email</span>
//         </div>
//         <button className="w-full rounded-sm bg-primary py-2 text-sm font-semibold text-mainheading">
//             Get Started
//         </button>
//       </div>
//     </div>
//   </GraphicContainer>
// );

// // Graphic for Step 2: Currency Wallet (Refactored)
// export const CurrencyWalletGraphic = () => (
//   <GraphicContainer>
//     <div className='relative mt-22 h-[200px] w-80'> {/* Set a fixed height container */}
//       {walletData.map((wallet) => (
//         <div key={wallet.currencyCode} className={wallet.wrapperClasses}>
//           <div className={`rounded-xl bg-background p-4 shadow-md h-[176px] ${wallet.containerClasses}`}>
//             <div className="flex flex-col justify-between">
//               <div className="flex items-center gap-4">
//                 <Image
//                   src={wallet.icon}
//                   alt={`${wallet.currencyCode} flag`}
//                   width={36}
//                   height={36}
//                   className="rounded-full object-contain"
//                 />
//                 <span className="text-mainheadingWhite text-xl font-semibold">
//                   {wallet.currencyCode}
//                 </span>
//               </div>
//               <div className="pt-12">
//                 <span className="text-mainheadingWhite text-2xl font-semibold">
//                   {wallet.amount}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </GraphicContainer>
// );

// // Graphic for Step 3: Add Recipients (Refactored)
// export const RecipientsGraphic = () => (
//   <GraphicContainer>
//     <div className="w-full max-w-sm rounded-xl bg-background sm:p-6 p-4 shadow-md">
//       <div className="rounded-full w-full border p-4 flex items-center">
//         <Search className="size-5" />
//       </div>
//       <div className="mt-4 space-y-4"> {/* Added space-y-4 for multiple items */}
//         {recipientsData.map((recipient) => (
//           <div key={recipient.name} className='flex justify-between items-center'>
//             <div className="flex items-center">
//               <div className="size-12.5 rounded-full bg-secondarybox flex items-center justify-center relative flex-shrink-0">
//                 <span className="font-bold text-white/90">{recipient.initials}</span>
//                 <div className="absolute bottom-0 right-0 size-4 rounded-full overflow-hidden">
//                   <Image
//                     src={recipient.currencyIcon}
//                     alt={`${recipient.currencyCode} flag`}
//                     width={20}
//                     height={20}
//                   />
//                 </div>
//               </div>

//               <div className="sm:ml-4 ml-2">
//                 <h5 className="font-medium leading-relaxed text-mainheadingWhite sm:text-lg text-base">
//                   {recipient.name}
//                 </h5>

//                 <p className="sm:text-sm text-xs text-subheadingWhite mt-1">
//                   {recipient.accountInfo}
//                 </p>
//               </div>
//             </div>
//             <div className="ml-4">
//               <IoIosArrowForward className="size-4 text-mainheadingWhite" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </GraphicContainer>
// );

// export const SendMoneyGraphic = () => {
//     // 1. Create refs to hold the DOM elements of the cards
//     const leftCardRef = useRef<HTMLDivElement>(null);
//     const rightCardRef = useRef<HTMLDivElement>(null);

//     // 2. Create state to store the calculated start and end points of the animation
//     const [animationPath, setAnimationPath] = useState({ startX: 0, endX: 0 });

//     // 3. Use useEffect to measure the card positions after the component mounts and on window resize
//     useEffect(() => {
//         const calculatePath = () => {
//             if (leftCardRef.current && rightCardRef.current) {
//                 const parentRect = leftCardRef.current.parentElement!.getBoundingClientRect();
//                 const leftRect = leftCardRef.current.getBoundingClientRect();
//                 const rightRect = rightCardRef.current.getBoundingClientRect();

//                 // Calculate the center of each card relative to their common parent.
//                 // This will be the start and end point for the center of our animated icon.
//                 const startX = leftRect.left - parentRect.left + (leftRect.width / 2);
//                 const endX = rightRect.left - parentRect.left + (rightRect.width / 2);

//                 setAnimationPath({ startX, endX });
//             }
//         };

//         calculatePath();
//         window.addEventListener('resize', calculatePath);
//         // Cleanup: remove the event listener when the component unmounts
//         return () => window.removeEventListener('resize', calculatePath);
//     }, []);

//     // 4. Define the animation transition properties
//     const animationTransition = {
//         duration: 2.5,
//         repeat: Infinity,
//         ease: 'easeInOut',
//         repeatDelay: 1, // A 1-second pause between each animation cycle
//     };

//     return (
//         <GraphicContainer>
//             <div
//                 className="w-full max-w-lg rounded-2xl sm:p-6 p-4 bg-background [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]"
//             >
//                 {/* The parent div for the animation and cards is now relative and has a fixed height for stability */}
//                 <div className="relative flex items-center justify-between h-20">

//                     {/* 5. Only render the animation if we have a valid path */}
//                     {animationPath.startX > 0 && (
//                         <>
//                             {/* The vertical gradient line in the middle, acting as a "converter" */}
//                             <div
//                                 className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-mainheadingWhite to-transparent"
//                                 style={{
//                                     // Optional: add a subtle glow effect to the line
//                                     boxShadow: '0 0 8px rgba(213, 225, 231, 0.5)',
//                                 }}
//                             />

//                             {/* This parent div moves horizontally from the left card to the right card */}
//                             <motion.div
//                                 className="absolute top-0 h-full flex items-center -translate-x-1/2"
//                                 // Animate the x position from the start to the end point
//                                 animate={{ x: [animationPath.startX, animationPath.endX] }}
//                                 transition={animationTransition}
//                             >
//                                 {/* The Dollar Symbol ($) */}
//                                 <motion.span
//                                     className="absolute text-3xl font-bold text-white"
//                                     // Animate opacity to appear and disappear in the FIRST half of the animation
//                                     animate={{ opacity: [0, 1, 1, 0, 0] }}
//                                     // The `times` array maps opacity keyframes to the parent's duration
//                                     transition={{ ...animationTransition, times: [0, 0.1, 0.48, 0.5, 1] }}
//                                 >
//                                     $
//                                 </motion.span>

//                                 {/* The Rupee Symbol (₹) */}
//                                 <motion.span
//                                     className="absolute text-3xl font-bold text-white"
//                                     // Animate opacity to appear and disappear in the SECOND half of the animation
//                                     animate={{ opacity: [0, 0, 1, 1, 0] }}
//                                     // The `times` array ensures this appears just as the dollar disappears
//                                     transition={{ ...animationTransition, times: [0, 0.5, 0.52, 0.9, 1] }}
//                                 >
//                                     ₹
//                                 </motion.span>
//                             </motion.div>
//                         </>
//                     )}

//                     {/* Left Card: Attach the ref here. The z-10 keeps it above the background grid but below the animation.*/}
//                     <div ref={leftCardRef} className="flex items-center justify-center sm:rounded-2xl rounded-xl bg-primarybox sm:p-4 p-2 z-10">
//                         <Image
//                             src="/assets/images/Logo.svg"
//                             alt="logo"
//                             width={64}
//                             height={64}
//                             className='sm:size-16 size-12'
//                         />
//                     </div>

//                     {/* Right Card: Attach the ref here */}
//                     <div ref={rightCardRef} className="flex items-center justify-center sm:rounded-2xl rounded-xl bg-primarybox sm:p-4 p-2 z-10">
//                         <Image
//                             src="/assets/icon/inr.svg"
//                             alt="inr flag"
//                             width={64}
//                             height={64}
//                             className='sm:size-16 size-12'
//                         />
//                     </div>
//                 </div>
//             </div>
//         </GraphicContainer>
//     );
// }




import { Search } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion';


// --- DATA ARRAYS ---

// Data for the Currency Wallet Graphic
const walletData = [
  {
    currencyCode: 'AED',
    amount: '100.00',
    icon: '/assets/icon/aed.svg',
    // Style classes for the stacked card effect
    containerClasses: 'w-64 opacity-70 absolute -top-22',
    wrapperClasses: 'flex justify-center',
  },
  {
    currencyCode: 'EUR',
    amount: '980.00',
    icon: '/assets/icon/eur.svg',
    containerClasses: 'w-72 opacity-85 absolute -top-12',
    wrapperClasses: 'flex justify-center',
  },
  {
    currencyCode: 'USD',
    amount: '512.00',
    icon: '/assets/icon/usd.svg',
    containerClasses: 'w-80 relative z-10',
    wrapperClasses: '', // The top card doesn't need centering wrapper
  },
];

// Data for the Recipients Graphic
const recipientsData = [
    {
        name: 'Kartavya Patel',
        initials: 'KP',
        accountInfo: 'INR Account XXXX0101',
        currencyCode: 'inr', // used for alt text
        currencyIcon: '/assets/icon/inr.svg',
    },
    {
        name: 'Amit Joshi',
        initials: 'AJ',
        accountInfo: 'INR Account XXXX2477',
        currencyCode: 'inr',
        currencyIcon: '/assets/icon/inr.svg',
    },
    {
        name: 'Manish Vyas',
        initials: 'MV',
        accountInfo: 'INR Account XXXX9856',
        currencyCode: 'inr',
        currencyIcon: '/assets/icon/inr.svg',
    },
];


// --- COMPONENTS ---

// A simple container for the graphics
const GraphicContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-8 flex justify-center items-center">
    {children}
  </div>
);

// Graphic for Step 1: Sign Up (Unchanged)
export const SignUpGraphic = () => (
  <GraphicContainer>
    <div className="w-full max-w-sm rounded-xl bg-background sm:p-6 p-4 shadow-md">
      <div className="space-y-2 pb-2">
        <div className="relative">
          <Image
            src={"/assets/images/Logo.svg"}
            alt="logo"
            width={32}
            height={32}
          />
        </div>
        <p className="font-medium text-mainheadingWhite">Sign Up</p>
        <p className="text-sm text-subheadingWhite">
            Enter your details to create your account and get started.
        </p>
      </div>
      <div className='border-t pt-2 space-y-2'>
        <div className="bg-primarybox px-2.5 py-1.5 text-white w-full rounded-sm">
            <span className='text-gray-400 text-xs'>Enter your email</span>
        </div>
        <button className="w-full rounded-sm bg-primary py-2 text-sm font-semibold text-mainheading">
            Get Started
        </button>
      </div>
    </div>
  </GraphicContainer>
);

// Graphic for Step 2: Currency Wallet (Refactored)
export const CurrencyWalletGraphic = () => (
  <GraphicContainer>
    <div className='relative mt-22 h-[200px] w-80'> {/* Set a fixed height container */}
      {walletData.map((wallet) => (
        <div key={wallet.currencyCode} className={wallet.wrapperClasses}>
          <div className={`rounded-xl bg-background p-4 shadow-md h-[176px] ${wallet.containerClasses}`}>
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={wallet.icon}
                  alt={`${wallet.currencyCode} flag`}
                  width={36}
                  height={36}
                  className="rounded-full object-contain"
                />
                <span className="text-mainheadingWhite text-xl font-semibold">
                  {wallet.currencyCode}
                </span>
              </div>
              <div className="pt-12">
                <span className="text-mainheadingWhite text-2xl font-semibold">
                  {wallet.amount}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </GraphicContainer>
);

// Graphic for Step 3: Add Recipients (Refactored)
export const RecipientsGraphic = () => (
  <GraphicContainer>
    <div className="w-full max-w-sm rounded-xl bg-background sm:p-6 p-4 shadow-md">
      <div className="rounded-full w-full border p-4 flex items-center">
        <Search className="size-5" />
      </div>
      <div className="mt-4 space-y-4"> {/* Added space-y-4 for multiple items */}
        {recipientsData.map((recipient) => (
          <div key={recipient.name} className='flex justify-between items-center'>
            <div className="flex items-center">
              <div className="size-12.5 rounded-full bg-secondarybox flex items-center justify-center relative flex-shrink-0">
                <span className="font-bold text-white/90">{recipient.initials}</span>
                <div className="absolute bottom-0 right-0 size-4 rounded-full overflow-hidden">
                  <Image
                    src={recipient.currencyIcon}
                    alt={`${recipient.currencyCode} flag`}
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              <div className="sm:ml-4 ml-2">
                <h5 className="font-medium leading-relaxed text-mainheadingWhite sm:text-lg text-base">
                  {recipient.name}
                </h5>

                <p className="sm:text-sm text-xs text-subheadingWhite mt-1">
                  {recipient.accountInfo}
                </p>
              </div>
            </div>
            <div className="ml-4">
              <IoIosArrowForward className="size-4 text-mainheadingWhite" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </GraphicContainer>
);

// 1. Define the source currencies we want to cycle through
const sourceCurrencies = [
  { symbol: '$', color: 'text-white' },
  { symbol: '€', color: 'text-white' },
  { symbol: '£', color: 'text-white' },
  { symbol: 'د.إ', color: 'text-white' } 
];

export const SendMoneyGraphic = () => {
    const leftCardRef = useRef<HTMLDivElement>(null);
    const rightCardRef = useRef<HTMLDivElement>(null);
    const [animationPath, setAnimationPath] = useState({ startX: 0, endX: 0 });
    
    // 2. Add state to track the index of the current currency
    const [currencyIndex, setCurrencyIndex] = useState(0);

    // Get the current currency object based on the index
    const currentCurrency = sourceCurrencies[currencyIndex];

    useEffect(() => {
        const calculatePath = () => {
            if (leftCardRef.current && rightCardRef.current) {
                const parentRect = leftCardRef.current.parentElement!.getBoundingClientRect();
                const leftRect = leftCardRef.current.getBoundingClientRect();
                const rightRect = rightCardRef.current.getBoundingClientRect();
                const startX = leftRect.left - parentRect.left + (leftRect.width / 2);
                const endX = rightRect.left - parentRect.left + (rightRect.width / 2);
                setAnimationPath({ startX, endX });
            }
        };

        calculatePath();
        window.addEventListener('resize', calculatePath);
        return () => window.removeEventListener('resize', calculatePath);
    }, []);

    // Animation transition properties (no longer needs repeat)
    const animationTransition = {
        duration: 2.5,
        ease: 'easeInOut',
    };

    return (
        <GraphicContainer>
            <div
                className="w-full max-w-lg rounded-2xl sm:p-6 p-4 bg-background [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]"
            >
                <div className="relative flex items-center justify-between h-20">
                    {animationPath.startX > 0 && (
                        <>
                            <div
                                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-mainheadingWhite to-transparent"
                                style={{ boxShadow: '0 0 8px rgba(213, 225, 231, 0.5)' }}
                            />

                            {/* 3. The key prop is crucial. When it changes, the animation restarts. */}
                            <motion.div
                                key={currencyIndex}
                                className="absolute top-0 h-full flex items-center -translate-x-1/2"
                                animate={{ x: [animationPath.startX, animationPath.endX] }}
                                transition={animationTransition}
                                // 4. When the animation completes, we schedule the next one.
                                onAnimationComplete={() => {
                                    // A short delay before starting the next currency's animation
                                    setTimeout(() => {
                                        setCurrencyIndex((prevIndex) => (prevIndex + 1) % sourceCurrencies.length);
                                    }, 1000); // 1-second pause
                                }}
                            >
                                {/* 5. The source symbol is now dynamic */}
                                <motion.span
                                    className={`absolute text-3xl font-bold ${currentCurrency.color}`}
                                    animate={{ opacity: [0, 1, 1, 0, 0] }}
                                    transition={{ ...animationTransition, times: [0, 0.1, 0.48, 0.5, 1] }}
                                >
                                    {currentCurrency.symbol}
                                </motion.span>

                                {/* The Rupee Symbol (remains the same) */}
                                <motion.span
                                    className="absolute text-3xl font-bold text-white"
                                    animate={{ opacity: [0, 0, 1, 1, 0] }}
                                    transition={{ ...animationTransition, times: [0, 0.5, 0.52, 0.9, 1] }}
                                >
                                    ₹
                                </motion.span>
                            </motion.div>
                        </>
                    )}

                    <div ref={leftCardRef} className="flex items-center justify-center sm:rounded-2xl rounded-xl bg-primarybox sm:p-4 p-2 z-10">
                        <Image
                            src="/assets/images/Logo.svg"
                            alt="logo"
                            width={64}
                            height={64}
                            className='sm:size-16 size-12'
                        />
                    </div>
                    <div ref={rightCardRef} className="flex items-center justify-center sm:rounded-2xl rounded-xl bg-primarybox sm:p-4 p-2 z-10">
                        <Image
                            src="/assets/icon/inr.svg"
                            alt="inr flag"
                            width={64}
                            height={64}
                            className='sm:size-16 size-12'
                        />
                    </div>
                </div>
            </div>
        </GraphicContainer>
    );
}