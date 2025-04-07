// // frontend/src/app/dashboard/components/BalanceHeader.tsx
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import { BalanceDetail } from "@/app/hooks/useBalanceDetailData"; // Adjust path

// interface BalanceHeaderProps {
//   balanceDetail: BalanceDetail | null;
//   isLoading: boolean;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   marketRateAgainstINR: number | null;
//   ourRateAgainstINR: number | null;
// }

// const BalanceHeader: React.FC<BalanceHeaderProps> = ({
//   balanceDetail,
//   isLoading,
//   onSendClick,
//   canSendMoney,
//   marketRateAgainstINR,
//   ourRateAgainstINR,
// }) => {
//   // Initial Loading Skeleton
//   if (isLoading && !balanceDetail) {
//     return (
//       <>
//         <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700 animate-pulse">
//           <div className="flex items-center gap-4 mb-4">
//             <Skeleton className="h-10 w-10 rounded-full" />
//             <Skeleton className="h-6 w-32" />
//           </div>
//           <Skeleton className="h-10 w-48 mb-6" /> {/* Balance Amount */}
//           <div className="flex justify-start space-x-3">
//             <Skeleton className="h-10 w-24 rounded-md" /> {/* Add Button */}
//             <Skeleton className="h-10 w-24 rounded-md" /> {/* Send Button */}
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Render actual content when data is available (even if other things are loading)
//   if (!balanceDetail) {
//     // This case should ideally be handled by the parent's error state,
//     // but added as a fallback.
//     return null; // Or a more specific "Balance not found" message here
//   }

//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(
//     balanceDetail.balance.toString()
//   ).toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   return (
//     <>
//       {/* Balance Card */}
//       <div className="pb-6 mb-8 border-b">
//         <div className="flex gap-4 justify-between">
//           <div className="Balance">
//             <div className="flex items-center gap-2 mb-4">
//               {balanceDetail.currency.flagImage ? (
//                 <Image
//                   src={balanceDetail.currency.flagImage}
//                   alt={`${currencyCode} flag`}
//                   width={50}
//                   height={50}
//                   className="rounded-full object-cover"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src =
//                       "/assets/icon/default.svg";
//                   }}
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">
//                   {currencyCode.slice(0, 2)}
//                 </div>
//               )}
//               <h2 className="text-lg text-gray-800 dark:text-gray-100">
//                 {currencyCode} balance
//               </h2>
//             </div>
//             <div className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
//               {formattedBalance}
//               <span className="text-2xl font-bold"> {currencyCode}</span>
//             </div>
//             {/* Display Market Rate and Our Rate against INR */}
//             {marketRateAgainstINR && ourRateAgainstINR && currencyCode && (
//               <div className="mb-4 text-gray-500 dark:text-gray-300 flex gap-4">
//                 <div className="p-1.5 px-6 rounded-4xl bg-primary dark:bg-primary/20 text-neutral-900 dark:text-primary">
//                   Our Rate: 1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR
//                 </div>
//                 <div className="p-1.5 px-6 rounded-4xl bg-blue-600 dark:bg-blue-600/20 text-gray-100 dark:text-blue-600">
//                   Market Rate: 1 {currencyCode} =
//                   {marketRateAgainstINR.toFixed(2)} INR
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="flex flex-col justify-between">
//             <div className="flex justify-end space-x-6">
//               <Link
//                 href={`/dashboard/balances/${balanceDetail._id}/add-money`}
//                 className="text-center"
//               >
//                 <button className="bg-primary cursor-pointer mb-1 hover:bg-primaryhover text-neutral-900 w-14.5 h-14 flex justify-center items-center rounded-full">
//                   <LuPlus size={20} />
//                 </button>
//                 Add
//               </Link>
//               <div className="send text-center cursor-pointer" onClick={onSendClick}>
//                 <button
//                   // onClick={onSendClick}
//                   className={`bg-primary cursor-pointer mb-1 -z-1 relative text-neutral-900 w-14 h-14 flex justify-center items-center rounded-full ${
//                     !canSendMoney
//                       ? "opacity-50 bg-primary hover:bg-primaryhover cursor-not-allowed"
//                       : "hover:bg-primaryhover"
//                   }`}
//                   title={
//                     !canSendMoney ? "Add funds to send money" : "Send money"
//                   }
//                   disabled={!canSendMoney} // Explicitly disable for accessibility
//                 >
//                   <GoArrowUp size={20} />
//                 </button>
//                 Send
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BalanceHeader;





// frontend/src/app/dashboard/components/BalanceHeader.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path
import { BalanceDetail } from "@/app/hooks/useBalanceDetailData"; // Adjust path

interface BalanceHeaderProps {
  balanceDetail: BalanceDetail | null;
  isLoading: boolean;
  onSendClick: () => void;
  canSendMoney: boolean;
  marketRateAgainstINR: number | null;
  ourRateAgainstINR: number | null;
}

const BalanceHeader: React.FC<BalanceHeaderProps> = ({
  balanceDetail,
  isLoading,
  onSendClick,
  canSendMoney,
  marketRateAgainstINR,
  ourRateAgainstINR,
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
  const formattedBalance = parseFloat(
    balanceDetail.balance.toString()
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      {/* Balance Card */}
      <div className="pb-6 mb-8 border-b">
        <div className="flex sm:flex-row flex-col gap-4 justify-between">

          <div className="Balance sm:text-left text-center">
            <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
              {balanceDetail.currency.flagImage ? (
                <Image
                  src={balanceDetail.currency.flagImage}
                  alt={`${currencyCode} flag`}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/icon/default.svg";
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">
                  {currencyCode.slice(0, 2)}
                </div>
              )}
              <h2 className="text-lg text-neutral-900 dark:text-white">
                {currencyCode} balance
              </h2>
            </div>
            <div className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              {formattedBalance}
              <span className="text-2xl font-bold"> {currencyCode}</span>
            </div>
            {/* Display Market Rate and Our Rate against INR */}
            {marketRateAgainstINR && ourRateAgainstINR && currencyCode && (
              <div className="mb-4 text-gray-500 dark:text-gray-300 flex md:flex-row flex-col sm:items-start items-center gap-4">
                <div className="p-1.5 px-6 rounded-4xl bg-primary dark:bg-primary/20 text-neutral-900 dark:text-primary w-fit">
                  <span>Our Rate: 1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR</span>
                </div>
                <div className="p-1.5 px-6 rounded-4xl bg-blue-600 dark:bg-blue-600/20 text-gray-100 dark:text-blue-600 w-fit">
                  <span>Market Rate: 1 {currencyCode} =
                  {marketRateAgainstINR.toFixed(2)} INR</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex justify-center space-x-6">
              <Link
                href={`/dashboard/balances/${balanceDetail._id}/add-money`}
                className="text-center text-neutral-900 dark:text-white"
              >
                <button className="bg-primary cursor-pointer mb-1 hover:bg-primaryhover text-neutral-900 w-14.5 h-14 flex justify-center items-center rounded-full">
                  <LuPlus size={24} />
                </button>
                Add
              </Link>
              <div className="send text-center cursor-pointer" onClick={onSendClick}>
                <button
                  // onClick={onSendClick}
                  className={`bg-primary cursor-pointer mb-1 -z-1 relative text-neutral-900 w-14 h-14 flex justify-center items-center rounded-full ${
                    !canSendMoney
                      ? "opacity-50 bg-primary hover:bg-primaryhover cursor-not-allowed"
                      : "hover:bg-primaryhover "
                  }`}
                  title={
                    !canSendMoney ? "Add funds to send money" : "Send money"
                  }
                  disabled={!canSendMoney} // Explicitly disable for accessibility
                >
                  <GoArrowUp size={24} />
                </button>
                <span className="text-neutral-900 dark:text-white">Send</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default BalanceHeader;