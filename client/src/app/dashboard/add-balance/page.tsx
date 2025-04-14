// // frontend/src/app/dashboard/add-balance/page.tsx
// "use client";

// import React, { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import axios from 'axios';
// import { useAuth } from '../../contexts/AuthContext'; // Adjust path
// import apiConfig from '../../config/apiConfig'; // Adjust path
// import CurrencySelectorModal from '../components/MainDashBoardSection/CurrencySelectorModal'; // Adjust path if needed
// import { Button } from '@/components/ui/button'; // Assuming you have a Button component
// import Link from 'next/link'; // *** ADD THIS LINE ***

// // Define necessary interfaces
// interface Currency {
//     _id: string;
//     code: string;
//     name: string;
//     flagImage?: string;
// }
// // Use the NewAccount interface consistent with CurrencySelectorModal output
// interface NewAccount {
//   _id: string;
//   userId: string;
//   currencyCode: string; // Assuming modal API returns code
//   balance: string;
//   createdAt: string;
//   updatedAt: string;
//   // Add currency object if API returns it nested
//   currency?: Currency; // It's better if API returns the full currency info
// }


// axios.defaults.baseURL = apiConfig.baseUrl;

// const AddBalancePage = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const { token } = useAuth();
//     const [isModalOpen, setIsModalOpen] = useState(true); // Open modal by default on this page
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const cameFromSelect = searchParams.get('source') === 'select';

//     // This function is called by the modal when a currency is selected AND added successfully via its own API call
//     const handleCurrencyAddedByModal = (newAccount: NewAccount) => {
//          // The modal already created the account, we just need to redirect
//          setIsLoading(false); // Turn off local loading state
//          setError(null); // Clear any local error

//          if (newAccount && newAccount._id) {
//               // Success! Redirect to the add-money page for the NEWLY created balance
//              console.log("Redirecting to add money for new balance:", newAccount._id); // Debug log
//              router.push(`/dashboard/balances/${newAccount._id}/add-money`);
//          } else {
//              // This case shouldn't happen if modal succeeded, but good failsafe
//              setError("Failed to get details of the newly created balance.");
//              console.error("New account data missing _id:", newAccount);
//          }
//     };


//     const handleModalClose = () => {
//         setIsModalOpen(false);
//         // When the modal is closed (e.g., by clicking Cancel or overlay), navigate back or to dashboard
//         // router.back() might be less predictable depending on history
//         console.log("Modal closed, navigating back or to dashboard."); // Debug log
//         router.push('/dashboard/add-money/select-balance'); // More reliable redirect
//     };

//     // If the modal handles the creation itself, this function might not be needed directly
//     // but keeping it for potential future refactor or if modal changes.
//     // const handleCurrencySelectedAndCreate = async (selectedCurrency: Currency) => { ... }


//     return (
//         <div className="max-w-xl mx-auto p-4 lg:p-8 flex flex-col items-center">
           

//              {/* Loading Indicator (This might be less used if modal handles its own loading) */}
//              {/* You might want a loading indicator *while* the modal is open and *its* internal state is loading */}
//              {isLoading && ( // This isLoading is now mainly for potential future direct creation logic
//                  <div className="flex flex-col items-center justify-center p-6 bg-lightgray dark:bg-primarybox rounded-lg shadow-md">
//                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
//                      <p className="text-neutral-700 dark:text-gray-300">Processing...</p>
//                  </div>
//              )}

//              {/* Error Display (Shows errors reported back from the modal or direct creation errors) */}
//             {error && !isLoading && (
//                 <div className="w-full my-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 border border-red-300 rounded-md text-center">
//                     {error}
//                      <Button
//                          variant="outline"
//                          size="sm"
//                          className="mt-2"
//                          onClick={() => { setError(null); setIsModalOpen(true); }} // Re-open modal on retry
//                      >
//                          Choose Currency Again
//                      </Button>
//                 </div>
//             )}


//             {/* Render the modal, controlled by isModalOpen state */}
//             {!isLoading && ( // Prevent modal interaction while page-level loading (if any)
//                  <CurrencySelectorModal
//                     isOpen={isModalOpen}
//                     onClose={handleModalClose} // Triggered on Cancel, overlay click, Esc
//                     onCurrencyAdded={handleCurrencyAddedByModal} // Triggered on successful Confirm click inside modal
//                  />
//             )}

//         </div>
//     );
// };

// export default AddBalancePage;









// frontend/src/app/dashboard/add-balance/page.tsx
"use client";

import React, { useState, useCallback } from 'react'; // Added useCallback
import { useRouter } from 'next/navigation';
import CurrencySelectorModal from '../components/MainDashBoardSection/CurrencySelectorModal'; // Adjust path if needed


// Interfaces remain the same as they define the expected data from the modal
interface Currency {
    _id: string;
    code: string;
    name: string;
    flagImage?: string;
}
interface NewAccount {
  _id: string;
  userId: string; // Assuming modal provides these details if needed by page
  currencyCode: string;
  balance: string;
  createdAt: string;
  updatedAt: string;
  currency?: Currency;
}

// Removed axios default baseURL setup

const AddBalancePage = () => {
    const router = useRouter();
    // Keep isModalOpen state to control the modal's visibility
    const [isModalOpen, setIsModalOpen] = useState(true);

    // --- Modal Success Handler ---
    // Called when the modal successfully creates a balance
    const handleCurrencyAddedByModal = useCallback((newAccount: NewAccount) => {
        // Directly redirect to the add-money page for the new balance
        if (newAccount?._id) {
            // console.log("Redirecting to add money for new balance:", newAccount._id);
            router.push(`/dashboard/balances/${newAccount._id}/add-money`);
        } else {
            // Fallback if modal returns invalid data (should ideally not happen)
            console.error("Received invalid new account data from modal:", newAccount);
            // Optional: Show a generic error message or redirect to a safe page
            router.push('/dashboard?error=balance_creation_failed');
        }
        // No need to set modal state here, the navigation unmounts the page
    }, [router]); // Dependency: router

    // --- Modal Close Handler ---
    // Called when the user cancels or closes the modal without success
    const handleModalClose = useCallback(() => {
        setIsModalOpen(false); // Update state to reflect modal closure
        // Navigate back to the selection page (or dashboard if preferred)
        // console.log("Modal closed, navigating back to select-balance.");
        router.replace('/dashboard/add-money/select-balance'); // Use replace to avoid polluting history
    }, [router]); // Dependency: router

    // The page simply renders the modal, controlled by `isModalOpen`
    // The modal handles its internal states (loading, errors, fetching, creating)
    return (
        <div className="flex justify-center items-start pt-10"> {/* Adjusted layout for modal focus */}
            {/*
              Optional: Add a minimal loading indicator or placeholder
              if there's a delay before the modal actually renders,
              but usually, it should be quick.
            */}

            {/* Render the modal, passing the necessary handlers */}
            <CurrencySelectorModal
                isOpen={isModalOpen}
                onClose={handleModalClose}         // Handles cancel/close actions
                onCurrencyAdded={handleCurrencyAddedByModal} // Handles successful creation
            />
        </div>
    );
};

export default AddBalancePage;