// // frontend/src/app/dashboard/add-money/select-balance/page.tsx
// "use client";

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useBalances } from '../../../hooks/useBalances'; // Adjust path
// import { Skeleton } from '@/components/ui/skeleton'; // Adjust path
// import { useAuth } from '../../../contexts/AuthContext'; // Adjust path
// import { IoIosArrowForward } from "react-icons/io";
// import { GoPlus } from "react-icons/go"; // Import the Plus icon

// // Re-use Account interface from useBalances or define here
// interface Currency {
//     _id: string;
//     code: string;
//     name: string;
//     flagImage?: string;
// }
// interface Account {
//     _id: string;
//     balance: string;
//     currency: Currency;
//     user: string;
//     createdAt: string;
//     updatedAt: string;
// }


// const SelectBalancePage = () => {
//     const router = useRouter();
//     const { balances, isLoading, error, refetchBalances } = useBalances();
//     const { token } = useAuth();

//     useEffect(() => {
//         // Redirect logic remains the same
//         if (!isLoading && !error && balances.length === 0 && token) {
//             router.replace('/dashboard/add-balance');
//         }
//          if (error?.includes("Unauthorized")) {
//             router.replace('/auth/login');
//          }
//     }, [isLoading, balances, error, router, token]);

//     const handleSelectBalance = (balanceId: string) => {
//         router.push(`/dashboard/balances/${balanceId}/add-money`);
//     };


//     // --- Loading State ---
//     if (isLoading) {
//       return (
//         <div className=""> {/* Add a container for loading state */}
//           <Skeleton className="h-10 w-72 sm:w-96 mx-auto rounded-md mb-8" /> {/* Title Skeleton */}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {/* Skeletons for balance cards */}
//             {Array(5)
//               .fill(0)
//               .map((_, i) => (
//                 <Skeleton key={`bal-skel-${i}`} className="h-28 w-full rounded-2xl" />
//               ))}
//              {/* Skeleton for the "Add New" card */}
//              <Skeleton key="add-skel" className="h-28 w-full rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600" />
//           </div>
//         </div>
//       );
//     }

//     // --- Main Content ---
//     return (
//         <div className="">
//             <h1 className="text-2xl sm:text-3xl font-semibold text-mainheading dark:text-white text-center mb-8"> {/* Added margin-bottom */}
//                 Select a Balance to Add Money To
//             </h1>

//             {/* --- Error State --- */}
//             {error && !isLoading && (
//                 <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md mb-6"> {/* Added margin-bottom */}
//                     <p>Error loading balances: {error}</p>
//                     <button
//                         onClick={refetchBalances}
//                         className="mt-2 px-4 py-1 bg-primary text-neutral-900 rounded hover:bg-primaryhover"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             )}

//              {/* --- No Balances State --- */}
//              {!isLoading && !error && balances.length === 0 && token && (
//                  <div className="text-center text-neutral-600 dark:text-gray-400 p-6 bg-lightgray dark:bg-primarybox rounded-lg">
//                      You don't have any currency balances yet.
//                      <Link href="/dashboard/add-balance" className="text-primary hover:underline block mt-3 font-medium">
//                          Create your first balance to add money
//                      </Link>
//                  </div>
//              )}

//             {/* --- Balances Grid --- */}
//             {!isLoading && !error && balances.length > 0 && (
//                 // Apply grid layout here
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {/* Map existing balances */}
//                     {balances.map((account) => (
//                         <div
//                             key={account._id}
//                             onClick={() => handleSelectBalance(account._id)}
//                             className="p-6 bg-lightgray dark:bg-primarybox hover:bg-neutral-200/70 hover:dark:bg-secondarybox rounded-2xl flex justify-between items-center gap-2 transition-all duration-75 ease-linear cursor-pointer min-h-[112px]" // Added min-height for consistency
//                             role="button"
//                             tabIndex={0}
//                             onKeyPress={(e) => e.key === 'Enter' && handleSelectBalance(account._id)}
//                         >
//                             <div className="flex items-center gap-4 overflow-hidden"> {/* Added overflow-hidden */}
//                                 <Image
//                                     src={account.currency.flagImage || `/assets/icon/${account.currency.code.toLowerCase()}.svg`}
//                                     alt={`${account.currency.code} flag`}
//                                     width={40}
//                                     height={40}
//                                     className="rounded-full flex-shrink-0" // Added flex-shrink-0
//                                     onError={(e) => {
//                                         (e.target as HTMLImageElement).src = "/assets/icon/default.svg";
//                                     }}
//                                     unoptimized
//                                 />
//                                 <div className="flex-grow min-w-0"> {/* Added flex-grow and min-w-0 */}
//                                     <p className="text-neutral-900 dark:text-white text-lg font-semibold truncate"> {/* Added truncate */}
//                                         {account.currency.code} Balance
//                                     </p>
//                                     <p className="text-neutral-500 dark:text-gray-300 font-semibold text-sm"> {/* Adjusted text size */}
//                                         {parseFloat(account.balance).toFixed(2)} {account.currency.code}
//                                     </p>
//                                 </div>
//                             </div>
//                             <IoIosArrowForward className='text-neutral-900 dark:text-white ml-2 flex-shrink-0'/> {/* Added flex-shrink-0 */}
//                         </div>
//                     ))}

//                     {/* "Add Another Balance" Card - Now a Link styled as a card */}
//                     <Link
//                         href="/dashboard/add-balance?source=select"
//                         className="p-6 bg-lightgray dark:bg-primarybox/70 hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:bg-neutral-200/70 transition-all duration-75 ease-linear border-2 border-dashed border-neutral-900 dark:border-neutral-300"> 
//                          <div className="rounded-full border-2 border-neutral-900 dark:border-white p-2 flex items-center justify-center mb-2">
//                              <GoPlus size={24} className="text-neutral-900 dark:text-white"/>
//                          </div>
//                          <span className="text-center text-neutral-500 dark:text-white">
//                             Add another currency to your account 
//                          </span>
//                     </Link>
//                 </div>
//             )}

//              {/* --- Logged Out State --- */}
//              {!token && !isLoading && (
//                   <div className="text-center text-neutral-600 dark:text-gray-400 p-4">
//                      Please <Link href="/auth/login" className="text-primary hover:underline">log in</Link> to manage your balances.
//                   </div>
//               )}
//         </div>
//     );
// };

// export default SelectBalancePage;





// frontend/src/app/dashboard/add-money/select-balance/page.tsx
"use client";

import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useBalances } from '../../../hooks/useBalances'; // Adjust path
import { useAuth } from '../../../contexts/AuthContext'; // Adjust path
import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Import the reusable component

const AddMoneySelectBalancePage = () => {
    const router = useRouter();
    const { balances, isLoading, error, refetchBalances } = useBalances();
    const { token } = useAuth(); // Get token status

    // --- Redirect Logic ---
    useEffect(() => {
        // If user isn't logged in and not loading, redirect to login
        // Let the component handle the display if token exists but balances are empty
        if (!token && !isLoading && !error) {
             router.replace('/auth/login');
        }
         // Let the component handle auth errors displayed to the user
    }, [token, isLoading, error, router]);

    // --- Selection Handler ---
    const handleSelectBalanceForAddMoney = useCallback((balanceId: string) => {
        router.push(`/dashboard/balances/${balanceId}/add-money`);
    }, [router]);

    // --- Render the reusable component ---
    return (
        <SelectBalanceComponent
            balances={balances}
            isLoading={isLoading}
            error={error}
            refetchBalances={refetchBalances}
            onSelectBalance={handleSelectBalanceForAddMoney}
            allowAddBalance={true} // IMPORTANT: Allow adding new balance
            pageTitle="Select a Balance to Add Money To"
            noBalancePrimaryMessage="You don't have any currency balances yet."
            noBalanceSecondaryMessage="Create your first balance to add money"
            addBalanceHref="/dashboard/add-balance" // Link to create page
            addBalanceLinkText="Add New Balance" // Text for the add card
            tokenExists={!!token} // Pass token presence
        />
    );
};

export default AddMoneySelectBalancePage;