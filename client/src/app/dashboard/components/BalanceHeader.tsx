// frontend/src/app/dashboard/components/BalanceHeader.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { LuPlus } from 'react-icons/lu';
import { GoArrowUp } from 'react-icons/go';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust path
import { Button } from '@/components/ui/button'; // Adjust path
import { BalanceDetail } from '@/app/hooks/useBalanceDetailData'; // Adjust path

interface BalanceHeaderProps {
    balanceDetail: BalanceDetail | null;
    isLoading: boolean;
    onBackClick: () => void;
    onSendClick: () => void;
    canSendMoney: boolean;
    marketRateAgainstINR: number | null;
    ourRateAgainstINR: number | null;
}

const BalanceHeader: React.FC<BalanceHeaderProps> = ({
    balanceDetail,
    isLoading,
    onBackClick,
    onSendClick,
    canSendMoney,
    marketRateAgainstINR,
    ourRateAgainstINR
}) => {
    // Initial Loading Skeleton
    if (isLoading && !balanceDetail) {
        return (
            <>
                <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700 animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-10 w-48 mb-6" /> {/* Balance Amount */}
                    <div className="flex justify-start space-x-3">
                        <Skeleton className="h-10 w-24 rounded-md" /> {/* Add Button */}
                        <Skeleton className="h-10 w-24 rounded-md" /> {/* Send Button */}
                    </div>
                </div>
            </>
        );
    }

    // Render actual content when data is available (even if other things are loading)
    if (!balanceDetail) {
        // This case should ideally be handled by the parent's error state,
        // but added as a fallback.
        return null; // Or a more specific "Balance not found" message here
    }

    const currencyCode = balanceDetail.currency.code;
    const formattedBalance = parseFloat(balanceDetail.balance.toString()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <>
            {/* Back Button */}
            <button onClick={onBackClick} className="mb-4 flex items-center gap-1 text-gray-700 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
                <IoIosArrowBack size={18} /> Back
            </button>

            {/* Balance Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                    {balanceDetail.currency.flagImage ? (
                        <Image src={balanceDetail.currency.flagImage} alt={`${currencyCode} flag`} width={40} height={40} className="rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">{currencyCode.slice(0, 2)}</div>
                    )}
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{balanceDetail.currency.currencyName || `${currencyCode} Balance`}</h2>
                </div>

                
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {formattedBalance} <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">{currencyCode}</span>
                </div>
                {/* Display Market Rate and Our Rate against INR */}
                {marketRateAgainstINR && ourRateAgainstINR && currencyCode && (
                    <div className="mb-4 text-sm text-gray-600  dark:text-gray-400 space-y-1">
                        <p>Market Rate (approx): 1 {currencyCode} = {marketRateAgainstINR.toFixed(2)} INR</p>
                        <p>Our Rate (for sends): 1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR</p>
                    </div>
                )}

                <div className="flex justify-start space-x-3">
                    <Link href={`/dashboard/balances/${balanceDetail._id}/add-money`} passHref>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <LuPlus size={18} className="mr-2" /> Add
                        </Button>
                    </Link>
                    <Button
                        onClick={onSendClick}
                        className={`bg-blue-600 text-white ${!canSendMoney ? 'opacity-50 bg-blue-400 hover:bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        title={!canSendMoney ? "Add funds to send money" : "Send money"}
                        disabled={!canSendMoney} // Explicitly disable for accessibility
                    >
                        <GoArrowUp size={18} className="mr-2" /> Send
                    </Button>
                </div>
            </div>
        </>
    );
};

export default BalanceHeader;

// frontend/src/app/dashboard/components/BalanceHeader.tsx
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { IoWalletOutline } from "react-icons/io5";
// import { RiExchangeLine } from "react-icons/ri";
// import { FiInfo } from "react-icons/fi";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { BalanceDetail } from "@/app/hooks/useBalanceDetailData";

// interface BalanceHeaderProps {
//   balanceDetail: BalanceDetail | null;
//   isLoading: boolean;
//   onBackClick: () => void;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   marketRateAgainstINR: number | null;
//   ourRateAgainstINR: number | null;
// }

// const BalanceHeader: React.FC<BalanceHeaderProps> = ({
//   balanceDetail,
//   isLoading,
//   onBackClick,
//   onSendClick,
//   canSendMoney,
//   marketRateAgainstINR,
//   ourRateAgainstINR,
// }) => {
//   const [animateBalance, setAnimateBalance] = useState(false);

//   // Animate balance when it loads
//   useEffect(() => {
//     if (balanceDetail && !isLoading) {
//       setAnimateBalance(true);
//     }
//   }, [balanceDetail, isLoading]);

//   // Initial Loading Skeleton
//   if (isLoading && !balanceDetail) {
//     return (
//       <div className="w-full">
//         <Skeleton className="h-8 w-24 mb-6" />
//         <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
//           {/* Skeleton header */}
//           <div className="bg-gray-100 dark:bg-gray-800 p-6 animate-pulse">
//             <Skeleton className="h-8 w-48 mb-2" />
//             <Skeleton className="h-5 w-32" />
//           </div>

//           {/* Skeleton body */}
//           <div className="bg-white dark:bg-gray-900 p-6 animate-pulse">
//             <div className="flex justify-between mb-6">
//               <Skeleton className="h-20 w-32" />
//               <Skeleton className="h-16 w-16 rounded-full" />
//             </div>
//             <Skeleton className="h-10 w-full mb-4" />
//             <div className="grid grid-cols-2 gap-4">
//               <Skeleton className="h-14 w-full rounded-xl" />
//               <Skeleton className="h-14 w-full rounded-xl" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!balanceDetail) {
//     return null;
//   }

//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(
//     balanceDetail.balance.toString()
//   ).toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
//   const currencyName =
//     balanceDetail.currency.currencyName || `${currencyCode} Account`;

//   // Generate dynamic accent color based on currency code
//   const getAccentColor = (code: string) => {
//     const currencies: Record<string, string> = {
//       USD: "from-green-400 to-green-600 dark:from-green-600 dark:to-green-800",
//       EUR: "from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800",
//       GBP: "from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800",
//       INR: "from-orange-400 to-orange-600 dark:from-orange-600 dark:to-orange-800",
//       AUD: "from-yellow-400 to-yellow-600 dark:from-yellow-600 dark:to-yellow-800",
//       CAD: "from-red-400 to-red-600 dark:from-red-600 dark:to-red-800",
//       SGD: "from-pink-400 to-pink-600 dark:from-pink-600 dark:to-pink-800",
//       JPY: "from-indigo-400 to-indigo-600 dark:from-indigo-600 dark:to-indigo-800",
//     };

//     return (
//       currencies[code] ||
//       "from-teal-400 to-teal-600 dark:from-teal-600 dark:to-teal-800"
//     );
//   };

//   const accentGradient = getAccentColor(currencyCode);
//   const isPositiveBalance = parseFloat(balanceDetail.balance.toString()) > 0;

//   return (
//     <div className="w-full">
//       {/* Back Navigation with subtle indicator */}
//       <button
//         onClick={onBackClick}
//         className="group flex items-center mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all"
//       >
//         <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 mr-2 group-hover:-translate-x-1 transition-transform">
//           <IoIosArrowBack size={18} />
//         </span>
//         <span className="font-medium">All Accounts</span>
//       </button>

//       {/* Glass-morphism inspired card with 3D effect */}
//       <div className="rounded-3xl overflow-hidden shadow-2xl mb-8 transform hover:scale-[1.01] transition-all duration-300">
//         {/* Header section with gradient background */}
//         <div className={`bg-gradient-to-r ${accentGradient} p-6`}>
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-xl font-bold text-white mb-1">
//                 {currencyName}
//               </h2>
//               <p className="text-white/80 text-sm">Personal Account • Active</p>
//             </div>
//             <div className="flex items-center">
//               <div className="relative flex items-center justify-center w-6 h-6 mr-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-30"></span>
//                 <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
//               </div>
//               <span className="text-xs font-medium text-white">LIVE</span>
//             </div>
//           </div>
//         </div>

//         {/* Main content area */}
//         <div className="bg-white dark:bg-gray-900 p-6">
//           {/* Balance section with 3D card effect */}
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
//                 <IoWalletOutline size={16} />
//                 Available Balance
//               </p>
//               <div
//                 className={`transition-all duration-700 ${
//                   animateBalance
//                     ? "translate-y-0 opacity-100"
//                     : "translate-y-4 opacity-0"
//                 }`}
//               >
//                 <h1
//                   className={`text-4xl md:text-5xl font-extrabold ${
//                     isPositiveBalance
//                       ? "text-gray-800 dark:text-white"
//                       : "text-red-600 dark:text-red-500"
//                   }`}
//                 >
//                   {formattedBalance}
//                 </h1>
//                 <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
//                   {currencyCode}
//                 </p>
//               </div>
//             </div>

//             {/* Currency emblem with shadow effect */}
//             <div className="relative">
//               {balanceDetail.currency.flagImage ? (
//                 <div className="h-16 w-16 rounded-full overflow-hidden shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
//                   <Image
//                     src={balanceDetail.currency.flagImage}
//                     alt={`${currencyCode} flag`}
//                     fill
//                     className="object-cover"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src =
//                         "/assets/icon/default.svg";
//                     }}
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className={`h-16 w-16 rounded-full bg-gradient-to-br ${accentGradient} flex items-center justify-center text-white text-xl font-bold shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300`}
//                 >
//                   {currencyCode.slice(0, 2)}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Exchange Rate Panel with expandable info */}
//           {marketRateAgainstINR && ourRateAgainstINR && currencyCode && (
//             <div className="mb-6 relative">
//               <div
//                 className={`p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
//               >
//                 <div className="flex items-center mb-2">
//                   <RiExchangeLine
//                     size={18}
//                     className={`mr-2 text-gray-600 dark:text-gray-300`}
//                   />
//                   <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//                     Current Exchange Rates
//                   </h3>
//                   <div className="ml-auto">
//                     <button className="group relative flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
//                       <FiInfo
//                         size={14}
//                         className="text-gray-600 dark:text-gray-400"
//                       />
//                       <span className="absolute bottom-full mb-2 w-48 text-xs bg-gray-900 text-white p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
//                         Rates are updated every 30 minutes. Transfer fees may
//                         apply.
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <div className="flex flex-col p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
//                     <span className="text-gray-500 dark:text-gray-400 text-xs mb-1">
//                       Market Rate
//                     </span>
//                     <span className="font-medium">
//                       1 {currencyCode} = {marketRateAgainstINR.toFixed(2)} INR
//                     </span>
//                   </div>
//                   <div className="flex flex-col p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
//                     <span className="text-gray-500 dark:text-gray-400 text-xs mb-1">
//                       Our Rate (Sends)
//                     </span>
//                     <span className="font-medium">
//                       1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Action buttons with animated hover effects */}
//           <div className="grid grid-cols-2 gap-4">
//             <Link
//               href={`/dashboard/balances/${balanceDetail._id}/add-money`}
//               passHref
//             >
//               <Button className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-gray-100 dark:hover:bg-white dark:text-gray-900 text-white font-medium rounded-xl relative overflow-hidden group">
//                 <span className="absolute inset-0 w-0 bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300 ease-out group-hover:w-full"></span>
//                 <span className="relative flex items-center justify-center">
//                   <LuPlus size={20} className="mr-2" /> Add Money
//                 </span>
//               </Button>
//             </Link>
//             <Button
//               onClick={onSendClick}
//               disabled={!canSendMoney}
//               className={`w-full py-4 font-medium rounded-xl relative overflow-hidden group ${
//                 canSendMoney
//                   ? "bg-gray-900 hover:bg-black dark:bg-gray-100 dark:hover:bg-white dark:text-gray-900 text-white"
//                   : "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
//               }`}
//               title={!canSendMoney ? "Add funds to send money" : "Send money"}
//             >
//               {canSendMoney && (
//                 <span
//                   className={`absolute inset-0 w-0 bg-gradient-to-r ${accentGradient} transition-all duration-300 ease-out group-hover:w-full`}
//                 ></span>
//               )}
//               <span className="relative flex items-center justify-center">
//                 <GoArrowUp size={20} className="mr-2" /> Send Money
//               </span>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BalanceHeader;


// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Plus,
//   ArrowUp,
//   TrendingUp,
//   CreditCard,
//   History,
// } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { BalanceDetail } from "@/app/hooks/useBalanceDetailData";
// import { motion } from "framer-motion";

// interface BalanceHeaderProps {
//   balanceDetail: BalanceDetail | null;
//   isLoading: boolean;
//   onBackClick: () => void;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   marketRateAgainstINR: number | null;
//   ourRateAgainstINR: number | null;
// }

// const BalanceHeader: React.FC<BalanceHeaderProps> = ({
//   balanceDetail,
//   isLoading,
//   onBackClick,
//   onSendClick,
//   canSendMoney,
//   marketRateAgainstINR,
//   ourRateAgainstINR,
// }) => {
//   // Initial Loading Skeleton
//   if (isLoading && !balanceDetail) {
//     return (
//       <div className="animate-pulse">
//         <div className="flex items-center mb-6">
//           <Skeleton className="h-10 w-28 rounded-full" />
//         </div>
//         <div className="rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-1">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
//             <div className="h-20 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600"></div>
//             <div className="px-8 pt-10 pb-8 -mt-10">
//               <div className="flex items-center gap-4 mb-6">
//                 <Skeleton className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800" />
//                 <Skeleton className="h-10 w-48" />
//               </div>
//               <Skeleton className="h-14 w-64 mb-6" />
//               <Skeleton className="h-6 w-full mb-8" />
//               <div className="flex space-x-4">
//                 <Skeleton className="h-14 w-40 rounded-full" />
//                 <Skeleton className="h-14 w-40 rounded-full" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Fallback for no data
//   if (!balanceDetail) {
//     return null;
//   }

//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(
//     balanceDetail.balance.toString()
//   ).toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   // Calculate savings percentage if both rates exist
//   const savingsPercentage =
//     marketRateAgainstINR && ourRateAgainstINR
//       ? (
//           ((marketRateAgainstINR - ourRateAgainstINR) / marketRateAgainstINR) *
//           100
//         ).toFixed(1)
//       : null;

//   return (
//     <>
//       {/* Back Button */}
//       <motion.button
//         initial={{ x: -20, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         onClick={onBackClick}
//         className="flex items-center mb-8 gap-2 px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
//           transition-all rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-100 dark:hover:border-blue-800/30"
//       >
//         <ArrowLeft size={18} />
//         <span className="font-medium">Back to Balances</span>
//       </motion.button>

//       {/* Balance Card */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4, delay: 0.1 }}
//         className="rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-1"
//       >
//         <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
//           {/* Decorative header */}
//           <div className="h-24 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 relative">
//             <div className="absolute inset-0 opacity-30">
//               <div
//                 className="h-full w-full bg-[radial-gradient(circle_at_10%_20%,white_2px,transparent_0),radial-gradient(circle_at_30%_60%,white_2px,transparent_0),radial-gradient(circle_at_60%_30%,white_2px,transparent_0),radial-gradient(circle_at_90%_70%,white_2px,transparent_0)]"
//                 style={{ backgroundSize: "32px 32px" }}
//               ></div>
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
//           </div>

//           <div className="px-8 pt-6 pb-8 -mt-16 relative z-10">
//             {/* Currency and Flag */}
//             <div className="flex items-center gap-5 mb-8">
//               {balanceDetail.currency.flagImage ? (
//                 <motion.div
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.4, delay: 0.2 }}
//                   className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg"
//                 >
//                   <Image
//                     src={balanceDetail.currency.flagImage}
//                     alt={`${currencyCode} flag`}
//                     layout="fill"
//                     className="object-cover"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src =
//                         "/assets/icon/default.svg";
//                     }}
//                   />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.4, delay: 0.2 }}
//                   className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-gray-800 shadow-lg"
//                 >
//                   {currencyCode.slice(0, 2)}
//                 </motion.div>
//               )}
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
//                   {balanceDetail.currency.currencyName ||
//                     `${currencyCode} Balance`}
//                 </h2>
//                 <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//                   <CreditCard size={14} className="mr-1" />
//                   <span>Balance ID: {balanceDetail._id.slice(0, 8)}...</span>
//                 </div>
//               </div>
//             </div>

//             {/* Balance Amount */}
//             <motion.div
//               initial={{ y: 10, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.4, delay: 0.3 }}
//               className="mb-6"
//             >
//               <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
//                 {formattedBalance}{" "}
//                 <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">
//                   {currencyCode}
//                 </span>
//               </div>
//             </motion.div>

//             {/* Exchange Rates */}
//             {marketRateAgainstINR && ourRateAgainstINR && currencyCode && (
//               <motion.div
//                 initial={{ y: 10, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.4, delay: 0.4 }}
//                 className="mb-8 rounded-xl overflow-hidden border border-blue-100 dark:border-blue-800/30"
//               >
//                 <div className="px-5 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/30 flex items-center">
//                   <TrendingUp
//                     size={16}
//                     className="text-blue-600 dark:text-blue-400 mr-2"
//                   />
//                   <span className="font-medium text-blue-700 dark:text-blue-300">
//                     Exchange Rates
//                   </span>
//                   {savingsPercentage && (
//                     <div className="ml-auto px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-md">
//                       Save {savingsPercentage}%
//                     </div>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-2 divide-x divide-blue-100 dark:divide-blue-800/30">
//                   <div className="p-4 bg-white dark:bg-gray-800">
//                     <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
//                       Market Rate
//                     </div>
//                     <div className="font-semibold text-gray-800 dark:text-gray-200">
//                       1 {currencyCode} = {marketRateAgainstINR.toFixed(2)} INR
//                     </div>
//                   </div>
//                   <div className="p-4 bg-white dark:bg-gray-800">
//                     <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
//                       Our Rate
//                     </div>
//                     <div className="font-semibold text-blue-600 dark:text-blue-400">
//                       1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Quick Actions */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <motion.div
//                 initial={{ x: -10, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.4, delay: 0.5 }}
//                 className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
//               >
//                 <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
//                   <History size={18} />
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                     Transaction History
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     View all activities
//                   </div>
//                 </div>
//               </motion.div>
//               <motion.div
//                 initial={{ x: 10, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.4, delay: 0.5 }}
//                 className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
//               >
//                 <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
//                   <CreditCard size={18} />
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                     Account Details
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     View your information
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-4">
//               <Link
//                 href={`/dashboard/balances/${balanceDetail._id}/add-money`}
//                 passHref
//               >
//                 <motion.button
//                   initial={{ y: 10, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.3, delay: 0.6 }}
//                   className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-6 py-4 h-14 font-medium shadow-md hover:shadow-lg transition-all"
//                 >
//                   <Plus size={18} />
//                   <span>Add Money</span>
//                 </motion.button>
//               </Link>
//               <motion.button
//                 initial={{ y: 10, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.3, delay: 0.7 }}
//                 onClick={onSendClick}
//                 className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-6 py-4 h-14 font-medium shadow-md hover:shadow-lg transition-all ${
//                   canSendMoney
//                     ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
//                     : "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
//                 }`}
//                 disabled={!canSendMoney}
//                 title={!canSendMoney ? "Add funds to send money" : "Send money"}
//               >
//                 <ArrowUp size={18} />
//                 <span>Send Money</span>
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default BalanceHeader;

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Plus,
//   ArrowUp,
//   TrendingUp,
//   CreditCard,
//   History,
//   Clock,
//   ChevronRight,
//   LineChart,
//   Wallet,
//   RefreshCcw,
//   Download,
//   Share2,
// } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { BalanceDetail } from "@/app/hooks/useBalanceDetailData";
// import { motion } from "framer-motion";

// interface BalanceHeaderProps {
//   balanceDetail: BalanceDetail | null;
//   isLoading: boolean;
//   onBackClick: () => void;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   marketRateAgainstINR: number | null;
//   ourRateAgainstINR: number | null;
// }

// const BalanceHeader: React.FC<BalanceHeaderProps> = ({
//   balanceDetail,
//   isLoading,
//   onBackClick,
//   onSendClick,
//   canSendMoney,
//   marketRateAgainstINR,
//   ourRateAgainstINR,
// }) => {
//   const [showRateHistory, setShowRateHistory] = useState(false);
//   const [animateBalance, setAnimateBalance] = useState(false);

//   useEffect(() => {
//     // Trigger balance animation after component mounts
//     const timer = setTimeout(() => setAnimateBalance(true), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   // Initial Loading Skeleton
//   if (isLoading && !balanceDetail) {
//     return (
//       <div className="animate-pulse">
//         <div className="flex items-center mb-6">
//           <Skeleton className="h-10 w-28 rounded-full" />
//         </div>
//         <div className="rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-1">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
//             <div className="h-20 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600"></div>
//             <div className="px-8 pt-10 pb-8 -mt-10">
//               <div className="flex items-center gap-4 mb-6">
//                 <Skeleton className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800" />
//                 <Skeleton className="h-10 w-48" />
//               </div>
//               <Skeleton className="h-14 w-64 mb-6" />
//               <Skeleton className="h-6 w-full mb-8" />
//               <div className="flex space-x-4">
//                 <Skeleton className="h-14 w-40 rounded-full" />
//                 <Skeleton className="h-14 w-40 rounded-full" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Fallback for no data
//   if (!balanceDetail) {
//     return null;
//   }

//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(
//     balanceDetail.balance.toString()
//   ).toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   // Calculate savings percentage if both rates exist
//   const savingsPercentage =
//     marketRateAgainstINR && ourRateAgainstINR
//       ? (
//           ((marketRateAgainstINR - ourRateAgainstINR) / marketRateAgainstINR) *
//           100
//         ).toFixed(1)
//       : null;

//   const lastUpdate = new Date().toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   // Generate some mock data for recent transactions
//   const recentTransactions = [
//     {
//       id: "tx1",
//       type: "received",
//       amount: (balanceDetail.balance * 0.15).toFixed(2),
//       date: "Today, 10:25 AM",
//       from: "John Doe",
//     },
//     {
//       id: "tx2",
//       type: "sent",
//       amount: (balanceDetail.balance * 0.08).toFixed(2),
//       date: "Yesterday, 3:45 PM",
//       to: "Sarah Wilson",
//     },
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 },
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="max-w-4xl mx-auto"
//     >
//       {/* Back Button with Rate Update Indicator */}
//       <motion.div
//         variants={itemVariants}
//         className="flex items-center justify-between mb-6"
//       >
//         <button
//           onClick={onBackClick}
//           className="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
//           transition-all rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-100 dark:hover:border-blue-800/30"
//         >
//           <ArrowLeft size={18} />
//           <span className="font-medium">Back to Balances</span>
//         </button>

//         <div className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
//           <RefreshCcw size={12} className="animate-spin-slow text-blue-500" />
//           <span>Rates updated at {lastUpdate}</span>
//         </div>
//       </motion.div>

//       {/* Balance Card with Glassmorphism Effect */}
//       <motion.div
//         variants={itemVariants}
//         className="rounded-3xl overflow-hidden shadow-lg backdrop-blur-sm p-0.5 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 relative"
//       >
//         <div className="bg-white/95 dark:bg-gray-800/95 rounded-3xl overflow-hidden backdrop-filter">
//           {/* Dynamic Background Pattern */}
//           <div className="h-32 bg-gradient-to-r from-blue-600 to-violet-600 relative overflow-hidden">
//             <div className="absolute inset-0 opacity-30">
//               <svg
//                 className="w-full h-full"
//                 viewBox="0 0 100 100"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#pattern)" />
//                 <defs>
//                   <pattern
//                     id="pattern"
//                     x="0"
//                     y="0"
//                     width="10"
//                     height="10"
//                     patternUnits="userSpaceOnUse"
//                   >
//                     <circle cx="1" cy="1" r="1" fill="white" opacity="0.3" />
//                     <circle cx="5" cy="5" r="1" fill="white" opacity="0.2" />
//                     <circle cx="9" cy="9" r="1" fill="white" opacity="0.3" />
//                   </pattern>
//                 </defs>
//               </svg>
//             </div>

//             {/* Curved Bottom Edge */}
//             <svg
//               className="absolute -bottom-1 left-0 right-0 w-full text-white dark:text-gray-800"
//               viewBox="0 0 1440 120"
//               fill="none"
//               preserveAspectRatio="none"
//               height="40"
//             >
//               <path
//                 d="M0 120L48 106.7C96 93.3 192 66.7 288 60C384 53.3 480 66.7 576 73.3C672 80 768 80 864 66.7C960 53.3 1056 26.7 1152 26.7C1248 26.7 1344 53.3 1392 66.7L1440 80V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
//                 fill="currentColor"
//               />
//             </svg>
//           </div>

//           <div className="px-8 pt-4 pb-8 relative z-10">
//             {/* Currency and Flag with Status Indicator */}
//             <div className="flex items-center gap-5 mb-6">
//               {balanceDetail.currency.flagImage ? (
//                 <motion.div
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.4, delay: 0.2 }}
//                   className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg"
//                 >
//                   <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-blue-400/30 to-purple-400/30 backdrop-blur-md z-0"></div>
//                   <Image
//                     src={balanceDetail.currency.flagImage}
//                     alt={`${currencyCode} flag`}
//                     layout="fill"
//                     className="object-cover z-10"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src =
//                         "/assets/icon/default.svg";
//                     }}
//                   />
//                   <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 z-20 flex items-center justify-center">
//                     <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.4, delay: 0.2 }}
//                   className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-gray-800 shadow-lg"
//                 >
//                   {currencyCode.slice(0, 2)}
//                   <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 z-20 flex items-center justify-center">
//                     <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                   </div>
//                 </motion.div>
//               )}
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//                     {balanceDetail.currency.currencyName ||
//                       `${currencyCode} Balance`}
//                   </h2>
//                   <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-md">
//                     Active
//                   </span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   <CreditCard size={14} className="mr-1" />
//                   <span>ID: {balanceDetail._id.slice(0, 8)}...</span>
//                   <span className="mx-2 text-gray-300 dark:text-gray-600">
//                     •
//                   </span>
//                   <Clock size={14} className="mr-1" />
//                   <span>Created 3 months ago</span>
//                 </div>
//               </div>
//             </div>

//             {/* Balance Amount with Floating Animation */}
//             <motion.div
//               className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/30 relative overflow-hidden"
//               variants={itemVariants}
//             >
//               <div className="absolute inset-0 opacity-5">
//                 <svg width="100%" height="100%">
//                   <pattern
//                     id="bubbles"
//                     x="0"
//                     y="0"
//                     width="20"
//                     height="20"
//                     patternUnits="userSpaceOnUse"
//                   >
//                     <circle
//                       cx="10"
//                       cy="10"
//                       r="2"
//                       fill="currentColor"
//                       className="text-blue-500"
//                     />
//                   </pattern>
//                   <rect width="100%" height="100%" fill="url(#bubbles)" />
//                 </svg>
//               </div>

//               <div className="relative">
//                 <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
//                   <Wallet size={14} className="mr-1" />
//                   Current Balance
//                 </div>
//                 <div className="flex items-end gap-2">
//                   <div
//                     className={`text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent transition-all duration-1000 ease-out ${
//                       animateBalance ? "scale-105" : ""
//                     }`}
//                   >
//                     {formattedBalance}
//                   </div>
//                   <span className="text-xl font-bold text-gray-400 dark:text-gray-500 mb-1">
//                     {currencyCode}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 mt-2">
//                   <div className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-md flex items-center">
//                     <ArrowUp size={12} className="mr-0.5" />
//                     2.4% this week
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     Last transaction: 2 days ago
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Exchange Rates with Toggle */}
//             {marketRateAgainstINR && ourRateAgainstINR && currencyCode && (
//               <motion.div
//                 variants={itemVariants}
//                 className="mb-8 rounded-xl overflow-hidden border border-blue-100 dark:border-blue-800/30 shadow-sm"
//               >
//                 <div
//                   className="px-5 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/30 flex items-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
//                   onClick={() => setShowRateHistory(!showRateHistory)}
//                 >
//                   <TrendingUp
//                     size={16}
//                     className="text-blue-600 dark:text-blue-400 mr-2"
//                   />
//                   <span className="font-medium text-blue-700 dark:text-blue-300">
//                     Exchange Rates
//                   </span>
//                   {savingsPercentage && (
//                     <div className="ml-auto px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-md">
//                       Save {savingsPercentage}%
//                     </div>
//                   )}
//                   <ChevronRight
//                     size={16}
//                     className={`ml-2 text-blue-600 dark:text-blue-400 transition-transform duration-300 ${
//                       showRateHistory ? "rotate-90" : ""
//                     }`}
//                   />
//                 </div>

//                 <div>
//                   <div className="grid grid-cols-2 divide-x divide-blue-100 dark:divide-blue-800/30">
//                     <div className="p-4 bg-white dark:bg-gray-800">
//                       <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
//                         Market Rate
//                       </div>
//                       <div className="font-semibold text-gray-800 dark:text-gray-200">
//                         1 {currencyCode} = {marketRateAgainstINR.toFixed(2)} INR
//                       </div>
//                     </div>
//                     <div className="p-4 bg-white dark:bg-gray-800">
//                       <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
//                         Our Rate
//                       </div>
//                       <div className="font-semibold text-blue-600 dark:text-blue-400">
//                         1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR
//                       </div>
//                     </div>
//                   </div>

//                   {/* Collapsible Rate History Section */}
//                   {showRateHistory && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="border-t border-blue-100 dark:border-blue-800/30"
//                     >
//                       <div className="p-4 bg-white dark:bg-gray-800">
//                         <div className="flex items-center justify-between mb-3">
//                           <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Rate History (7 days)
//                           </div>
//                           <button className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
//                             <LineChart size={14} className="mr-1" />
//                             View Full Chart
//                           </button>
//                         </div>
//                         <div className="h-20 w-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg relative">
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="w-full h-px bg-blue-200 dark:bg-blue-700 absolute"></div>
//                             <div className="w-full h-8 relative">
//                               <div className="absolute left-0 bottom-0 right-0 h-8 overflow-hidden">
//                                 <svg
//                                   viewBox="0 0 100 20"
//                                   preserveAspectRatio="none"
//                                   className="absolute bottom-0 w-full h-full"
//                                 >
//                                   <path
//                                     d="M0,10 L10,12 L20,8 L30,14 L40,6 L50,10 L60,4 L70,7 L80,2 L90,9 L100,3"
//                                     fill="none"
//                                     stroke="rgb(59, 130, 246)"
//                                     strokeWidth="1.5"
//                                     className="text-blue-500"
//                                   />
//                                 </svg>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>
//               </motion.div>
//             )}

//             {/* Recent Transactions Preview */}
//             <motion.div
//               variants={itemVariants}
//               className="mb-8 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50"
//             >
//               <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
//                 <div className="flex items-center">
//                   <History
//                     size={16}
//                     className="text-gray-600 dark:text-gray-400 mr-2"
//                   />
//                   <span className="font-medium text-gray-700 dark:text-gray-300">
//                     Recent Transactions
//                   </span>
//                 </div>
//                 <button className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
//                   View All
//                   <ChevronRight size={14} className="ml-1" />
//                 </button>
//               </div>

//               <div className="divide-y divide-gray-100 dark:divide-gray-700/50 bg-white dark:bg-gray-800">
//                 {recentTransactions.map((tx) => (
//                   <div
//                     key={tx.id}
//                     className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                             tx.type === "received"
//                               ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
//                               : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
//                           }`}
//                         >
//                           <ArrowUp
//                             size={16}
//                             className={tx.type === "sent" ? "rotate-180" : ""}
//                           />
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
//                             {tx.type === "received"
//                               ? `Received from ${tx.from}`
//                               : `Sent to ${tx.to}`}
//                           </div>
//                           <div className="text-xs text-gray-500 dark:text-gray-400">
//                             {tx.date}
//                           </div>
//                         </div>
//                       </div>
//                       <div
//                         className={`text-sm font-semibold ${
//                           tx.type === "received"
//                             ? "text-green-600 dark:text-green-400"
//                             : "text-orange-600 dark:text-orange-400"
//                         }`}
//                       >
//                         {tx.type === "received" ? "+" : "-"}
//                         {tx.amount} {currencyCode}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Quick Actions - Modern Card Style */}
//             <motion.div
//               variants={itemVariants}
//               className="grid grid-cols-4 gap-3 mb-8"
//             >
//               {[
//                 {
//                   icon: <History size={18} />,
//                   color: "blue",
//                   label: "History",
//                 },
//                 {
//                   icon: <Download size={18} />,
//                   color: "purple",
//                   label: "Receive",
//                 },
//                 {
//                   icon: <Share2 size={18} />,
//                   color: "emerald",
//                   label: "Share",
//                 },
//                 {
//                   icon: <LineChart size={18} />,
//                   color: "amber",
//                   label: "Analytics",
//                 },
//               ].map((action, idx) => (
//                 <div
//                   key={idx}
//                   className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all"
//                 >
//                   <div
//                     className={`w-10 h-10 rounded-full bg-${action.color}-100 dark:bg-${action.color}-900/30 flex items-center justify-center text-${action.color}-600 dark:text-${action.color}-400 mb-2`}
//                   >
//                     {action.icon}
//                   </div>
//                   <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
//                     {action.label}
//                   </div>
//                 </div>
//               ))}
//             </motion.div>

//             {/* Action Buttons - Enhanced with Styling */}
//             <motion.div
//               variants={itemVariants}
//               className="grid grid-cols-2 gap-4"
//             >
//               <Link
//                 href={`/dashboard/balances/${balanceDetail._id}/add-money`}
//                 passHref
//               >
//                 <button className="relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl px-6 py-4 h-14 font-medium shadow-md hover:shadow-lg transition-all">
//                   {/* Background Decoration */}
//                   <div className="absolute inset-0 overflow-hidden opacity-20">
//                     <div className="absolute -top-10 -right-10 w-20 h-20 bg-white rounded-full blur-xl transform rotate-45"></div>
//                     <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-white rounded-full blur-md"></div>
//                   </div>

//                   {/* Content */}
//                   <div className="relative flex items-center gap-2">
//                     <Plus size={18} />
//                     <span>Add Money</span>
//                   </div>
//                 </button>
//               </Link>

//               <button
//                 onClick={onSendClick}
//                 className={`relative overflow-hidden flex items-center justify-center gap-2 rounded-xl px-6 py-4 h-14 font-medium shadow-md hover:shadow-lg transition-all ${
//                   canSendMoney
//                     ? "bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white"
//                     : "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
//                 }`}
//                 disabled={!canSendMoney}
//                 title={!canSendMoney ? "Add funds to send money" : "Send money"}
//               >
//                 {canSendMoney && (
//                   <div className="absolute inset-0 overflow-hidden opacity-20">
//                     <div className="absolute -top-10 -left-10 w-20 h-20 bg-white rounded-full blur-xl"></div>
//                     <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-white rounded-full blur-md"></div>
//                   </div>
//                 )}

//                 <div className="relative flex items-center gap-2">
//                   <ArrowUp size={18} />
//                   <span>Send Money</span>
//                 </div>
//               </button>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default BalanceHeader;
