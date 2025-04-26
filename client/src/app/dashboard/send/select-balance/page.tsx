// // frontend/src/app/dashboard/send/select-balance/page.tsx
// "use client";

// import React, { useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { useBalances } from '../../../hooks/useBalances'; // Adjust path
// import { useAuth } from '../../../contexts/AuthContext'; // Adjust path
// import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Import the reusable component

// const SendMoneySelectBalancePage = () => {
//     const router = useRouter();
//     const { balances, isLoading, error, refetchBalances } = useBalances();
//     const { token } = useAuth(); // Get token status

//     // --- Redirect Logic ---
//     useEffect(() => {
//         // If user isn't logged in and not loading, redirect to login
//         // Component will handle display if logged in but no balances
//         if (!token && !isLoading && !error) {
//              router.replace('/auth/login');
//         }
//         // Let component handle auth errors
//     }, [token, isLoading, error, router]);

//     // --- Selection Handler ---
//     const handleSelectBalanceForSendMoney = useCallback((balanceId: string) => {
//         // Navigate to the next step of the send money flow, passing the selected balance ID
//         // Adjust the target route as per your send money flow structure
//         router.push(`/dashboard/send?fromBalanceId=${balanceId}`);
//     }, [router]);

//     // --- Render the reusable component ---
//     return (
//         <SelectBalanceComponent
//             balances={balances}
//             isLoading={isLoading}
//             error={error}
//             refetchBalances={refetchBalances}
//             onSelectBalance={handleSelectBalanceForSendMoney}
//             allowAddBalance={false} // IMPORTANT: Disallow adding new balance
//             pageTitle="Select a Balance to Send From"
//             noBalancePrimaryMessage="You need an active balance to send money from."
//             // Optional secondary message for the 'send' context when no balances exist
//             noBalanceSecondaryMessage="Please add funds to a balance first."
//             // addBalanceHref and addBalanceLinkText are not needed here as allowAddBalance is false
//             tokenExists={!!token} // Pass token presence
//         />
//     );
// };

// export default SendMoneySelectBalancePage;






// // frontend/src/app/dashboard/send/select-balance/page.tsx
// "use client";

// import React, { useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { useBalances } from '../../../hooks/useBalances'; // Adjust path
// import { useAuth } from '../../../contexts/AuthContext'; // Adjust path
// import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Import the reusable component

// const SendMoneySelectBalancePage = () => {
//     const router = useRouter();
//     const { balances, isLoading, error, refetchBalances } = useBalances();
//     const { token } = useAuth(); // Get token status

//     // --- Redirect Logic ---
//     useEffect(() => {
//         if (!token && !isLoading && !error) {
//              router.replace('/auth/login');
//         }
//     }, [token, isLoading, error, router]);

//     // --- Selection Handler ---
//     // *** THIS IS THE KEY CHANGE ***
//     const handleSelectBalanceForSendMoney = useCallback((balanceId: string) => {
//         // Navigate to the Select Recipient page for the CHOSEN balanceId
//         router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//     }, [router]);
//     // *** END OF KEY CHANGE ***

//     // --- Render the reusable component ---
//     return (
//         <SelectBalanceComponent
//             balances={balances}
//             isLoading={isLoading}
//             error={error}
//             refetchBalances={refetchBalances}
//             onSelectBalance={handleSelectBalanceForSendMoney} // Pass the updated handler
//             allowAddBalance={false} // Correctly disallow adding new balance
//             pageTitle="Select a Balance to Send From"
//             noBalancePrimaryMessage="You need an active balance to send money from."
//             noBalanceSecondaryMessage="Please add funds to a balance first."
//             tokenExists={!!token}
//         />
//     );
// };

// export default SendMoneySelectBalancePage;





// // frontend/src/app/dashboard/send/select-balance/page.tsx
// "use client";

// import React, { useEffect, useCallback, useState } from 'react'; // Added useState
// import { useRouter } from 'next/navigation';
// import { useBalances } from '../../../hooks/useBalances'; // Adjust path
// import { useAuth } from '../../../contexts/AuthContext'; // Adjust path
// import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Import the reusable component
// import InsufficientBalanceModal from '../../components/InsufficientBalanceModal'; // *** IMPORT THE MODAL *** (Adjust path as needed)

// // Interface for the account data from useBalances hook
// interface Currency {
//     _id: string;
//     code: string;
//     name: string;
//     flagImage?: string;
// }
// interface Account {
//     _id: string;
//     balance: string; // Balance is a string from the hook
//     currency: Currency;
//     user: string;
//     createdAt: string;
//     updatedAt: string;
// }


// const SendMoneySelectBalancePage = () => {
//     const router = useRouter();
//     const { balances, isLoading, error, refetchBalances } = useBalances();
//     const { token } = useAuth();

//     // --- State for the Modal ---
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalData, setModalData] = useState<{ currencyCode: string; balanceId: string } | null>(null);

//     // --- Redirect Logic ---
//     useEffect(() => {
//         if (!token && !isLoading && !error) {
//              router.replace('/auth/login');
//         }
//     }, [token, isLoading, error, router]);

//     // --- Selection Handler (Modified) ---
//     const handleSelectBalanceForSendMoney = useCallback((balanceId: string) => {
//         // Find the selected balance details from the fetched list
//         const selectedBalance = balances.find(b => b._id === balanceId);

//         if (!selectedBalance) {
//             console.error("Selected balance not found in the list.");
//             // Optionally show a generic error to the user
//             return;
//         }

//         // Check if the balance is sufficient (greater than 0 to initiate a send)
//         const balanceAmount = parseFloat(selectedBalance.balance);
//         if (isNaN(balanceAmount) || balanceAmount <= 0) {
//             // Balance is insufficient - Open the modal
//             setModalData({
//                 currencyCode: selectedBalance.currency.code,
//                 balanceId: selectedBalance._id,
//             });
//             setIsModalOpen(true);
//         } else {
//             // Balance is sufficient - Proceed to recipient selection
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         }
//     }, [balances, router]); // Depend on balances array and router

//     // --- Modal Actions ---
//     const handleCloseModal = useCallback(() => {
//         setIsModalOpen(false);
//         setModalData(null); // Clear data when closing
//     }, []);

//     const handleAddMoneyFromModal = useCallback(() => {
//         if (modalData?.balanceId) {
//             // Navigate to the add money page for the specific balance
//             router.push(`/dashboard/balances/${modalData.balanceId}/add-money`);
//         }
//         handleCloseModal(); // Close the modal after initiating navigation
//     }, [modalData, router, handleCloseModal]);


//     // --- Render ---
//     return (
//         <> {/* Use Fragment to render modal alongside the main component */}
//             <SelectBalanceComponent
//                 balances={balances}
//                 isLoading={isLoading}
//                 error={error}
//                 refetchBalances={refetchBalances}
//                 onSelectBalance={handleSelectBalanceForSendMoney} // Pass the updated handler
//                 allowAddBalance={false} // Correctly disallow adding new balance
//                 pageTitle="Select a Balance to Send From"
//                 noBalancePrimaryMessage="You need an active balance to send money from."
//                 noBalanceSecondaryMessage="Please add funds to a balance first."
//                 tokenExists={!!token}
//             />

//             {/* Render the Insufficient Balance Modal */}
//             {/* Pass necessary props */}
//             <InsufficientBalanceModal
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 onAddMoney={handleAddMoneyFromModal}
//                 currencyCode={modalData?.currencyCode || ''} // Provide currency code or default
//             />
//         </>
//     );
// };

// export default SendMoneySelectBalancePage;




// // frontend/src/app/dashboard/send/select-balance/page.tsx
// "use client";

// import React, { useEffect, useCallback, useState, Suspense } from 'react'; // Added Suspense
// import { useRouter, useSearchParams } from 'next/navigation'; // Added useSearchParams
// import { useBalances } from '../../../hooks/useBalances';
// import { useAuth } from '../../../contexts/AuthContext';
// import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Corrected import path assumption
// import InsufficientBalanceModal from '@/app/dashboard/components/InsufficientBalanceModal'; // Corrected import path assumption

// // Interface for the account data from useBalances hook
// interface Currency {
//     _id: string;
//     code: string;
//     name: string;
//     flagImage?: string;
// }
// interface Account {
//     _id: string;
//     balance: string; // Balance is a string from the hook
//     currency: Currency;
//     user: string;
//     createdAt: string;
//     updatedAt: string;
// }

// // Wrap the main component logic in a new component to use Suspense
// const SendMoneySelectBalanceContent = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams(); // Hook to read search params
//     const { balances, isLoading, error, refetchBalances } = useBalances();
//     const { token } = useAuth();

//     // --- Get recipientId from URL ---
//     const recipientId = searchParams.get('recipientId'); // Get the recipientId if present

//     // --- State for the Modal ---
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalData, setModalData] = useState<{ currencyCode: string; balanceId: string } | null>(null);

//     // --- Redirect Logic ---
//     useEffect(() => {
//         // Redirect to login if token is missing after loading/error check
//         if (!token && !isLoading && !error) {
//              console.log("No token found on Select Balance page, redirecting to login.");
//              router.replace('/auth/login'); // Use replace for login redirect
//         }
//     }, [token, isLoading, error, router]);

//     // --- Selection Handler (MODIFIED) ---
//     const handleSelectBalanceForSendMoney = useCallback((balanceId: string) => {
//         const selectedBalance = balances.find(b => b._id === balanceId);

//         if (!selectedBalance) {
//             console.error("Selected balance not found in the list.");
//             // Optionally show an error message to the user
//             alert("Error: Could not find the selected balance details. Please try again.");
//             return;
//         }

//         const balanceAmount = parseFloat(selectedBalance.balance);
//         if (isNaN(balanceAmount) || balanceAmount <= 0) {
//             // Balance is insufficient - Open the modal
//             setModalData({
//                 currencyCode: selectedBalance.currency.code,
//                 balanceId: selectedBalance._id,
//             });
//             setIsModalOpen(true);
//         } else {
//             // Balance is sufficient - Route based on recipientId presence
//             if (recipientId) {
//                 // *** NEW FLOW: Recipient is known, go directly to Amount page ***
//                 console.log(`Recipient ${recipientId} known, navigating to amount page for balance ${balanceId}.`);
//                 router.push(`/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`);
//             } else {
//                 // *** ORIGINAL FLOW: Recipient unknown, go to Select Recipient page ***
//                 console.log(`Recipient unknown, navigating to select recipient page for balance ${balanceId}.`);
//                 router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//             }
//         }
//     }, [balances, router, recipientId]); // Add recipientId to dependency array

//     // --- Modal Actions ---
//     const handleCloseModal = useCallback(() => {
//         setIsModalOpen(false);
//         setModalData(null);
//     }, []);

//     const handleAddMoneyFromModal = useCallback(() => {
//         if (modalData?.balanceId) {
//             router.push(`/dashboard/balances/${modalData.balanceId}/add-money`);
//         }
//         handleCloseModal();
//     }, [modalData, router, handleCloseModal]);


//     // --- Render ---
//     return (
//         <>
//             <SelectBalanceComponent
//                 balances={balances}
//                 isLoading={isLoading}
//                 error={error}
//                 refetchBalances={refetchBalances}
//                 onSelectBalance={handleSelectBalanceForSendMoney} // Use the modified handler
//                 allowAddBalance={false} // Disallow adding new balance on this specific page
//                 pageTitle="Select a Balance to Send From"
//                 noBalancePrimaryMessage="You need an active balance with funds to send money."
//                 noBalanceSecondaryMessage="Please add funds to an existing balance or create a new balance first."
//                 // You might still want a link to general balances if allowAddBalance is false
//                 // addBalanceHref="/dashboard/balances"
//                 // addBalanceLinkText="View your balances"
//                 tokenExists={!!token} // Pass token presence correctly
//             />

//             <InsufficientBalanceModal
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 onAddMoney={handleAddMoneyFromModal}
//                 currencyCode={modalData?.currencyCode || ''}
//             />
//         </>
//     );
// }

// // The Page component that uses Suspense
// const SendMoneySelectBalancePage = () => {
//     return (
//         // Suspense is required because useSearchParams() reads from the URL,
//         // which might not be available during initial server render.
//         <Suspense fallback={<LoadingSpinner />}>
//              <SendMoneySelectBalanceContent />
//         </Suspense>
//     );
// };

// // Simple loading spinner placeholder for Suspense
// const LoadingSpinner = () => (
//     <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//     </div>
// );


// export default SendMoneySelectBalancePage;


// frontend/src/app/dashboard/send/select-balance/page.tsx
"use client";

import React, { useEffect, useCallback, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBalances } from '../../../hooks/useBalances';
// *** MODIFIED: Import user and loading from useAuth ***
import { useAuth } from '../../../contexts/AuthContext';
import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent';
import InsufficientBalanceModal from '@/app/dashboard/components/InsufficientBalanceModal';
// *** MODIFIED: Import KycRequiredModal ***
import KycRequiredModal from '@/app/dashboard/components/KycRequiredModal';


// Interface for the account data from useBalances hook
interface Currency {
    _id: string;
    code: string;
    name: string;
    flagImage?: string;
}
interface Account {
    _id: string;
    balance: string; // Balance is a string from the hook
    currency: Currency;
    user: string;
    createdAt: string;
    updatedAt: string;
}

// Wrap the main component logic in a new component to use Suspense
const SendMoneySelectBalanceContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { balances, isLoading: isBalancesLoading, error, refetchBalances } = useBalances();
    // *** MODIFIED: Get user, token, and auth loading status ***
    const { token, user, loading: isAuthLoading } = useAuth();

    // --- Get recipientId from URL ---
    const recipientId = searchParams.get('recipientId');

    // --- State for Modals ---
    const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);
    const [modalData, setModalData] = useState<{ currencyCode: string; balanceId: string } | null>(null);
    // *** MODIFIED: Add state for KYC Modal ***
    const [isKycModalOpen, setIsKycModalOpen] = useState(false);

    // *** MODIFIED: Determine KYC Status (only after auth check) ***
    // We need to wait for isAuthLoading to be false before reliably checking user kyc status
    const isKycVerified = !isAuthLoading && user?.kyc?.status === 'verified';
    // Combine loading states
    const isLoading = isBalancesLoading || isAuthLoading;

    // --- Redirect Logic (No change needed here) ---
    useEffect(() => {
        // Redirect only after initial auth check is complete
        if (!isAuthLoading && !token) {
            console.log("Send Money Select Balance: No token after auth check, redirecting to login.");
            router.replace('/auth/login');
        }
    }, [token, isAuthLoading, router]);

    // --- KYC Modal Actions ---
    const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
    const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
    const handleStartVerification = useCallback(() => {
        router.push('/kyc/start'); // Navigate to KYC flow start page
        handleCloseKycModal();
    }, [router, handleCloseKycModal]);

    // --- Selection Handler (MODIFIED to include KYC check) ---
    const handleSelectBalanceForSendMoney = useCallback((balanceId: string) => {
        // 1. Wait for auth loading to finish (essential before checking user status)
        if (isAuthLoading) {
            console.log("Select Balance (Send Money): Waiting for auth check...");
            // Optionally show a brief loading state or disable selection while loading auth
            return;
        }

        // 2. Check KYC Status FIRST
        if (!isKycVerified) {
            console.log("Select Balance (Send Money): KYC not verified. Showing KYC modal.");
            handleOpenKycModal(); // Open KYC modal instead of proceeding
            return;
        }

        // 3. Find the selected balance (Only proceed if KYC is verified)
        console.log("Select Balance (Send Money): KYC verified. Proceeding to balance check.");
        const selectedBalance = balances.find(b => b._id === balanceId);

        if (!selectedBalance) {
            console.error("Selected balance not found in the list.");
            alert("Error: Could not find the selected balance details. Please try again.");
            return;
        }

        // 4. Check Balance Amount
        const balanceAmount = parseFloat(selectedBalance.balance);
        if (isNaN(balanceAmount) || balanceAmount <= 0) {
            // Balance is insufficient - Open the insufficient balance modal
            console.log(`Select Balance (Send Money): Insufficient funds in balance ${balanceId}. Opening insufficient funds modal.`);
            setModalData({
                currencyCode: selectedBalance.currency.code,
                balanceId: selectedBalance._id,
            });
            setIsInsufficientBalanceModalOpen(true); // Correct modal state variable
        } else {
            // Balance is sufficient & KYC Verified - Route based on recipientId presence
            if (recipientId) {
                console.log(`Select Balance (Send Money): Balance ${balanceId} sufficient. Recipient ${recipientId} known, navigating to amount page.`);
                router.push(`/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`);
            } else {
                console.log(`Select Balance (Send Money): Balance ${balanceId} sufficient. Recipient unknown, navigating to select recipient page.`);
                router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
            }
        }
    }, [
        balances,
        router,
        recipientId,
        isAuthLoading, // Add auth loading status to dependencies
        isKycVerified, // Add kyc status to dependencies
        handleOpenKycModal // Add kyc modal handler to dependencies
    ]);

    // --- Insufficient Balance Modal Actions ---
    const handleCloseInsufficientBalanceModal = useCallback(() => {
        setIsInsufficientBalanceModalOpen(false);
        setModalData(null);
    }, []);

    const handleAddMoneyFromModal = useCallback(() => {
        if (modalData?.balanceId) {
            // Before redirecting to add money, DOUBLE CHECK KYC status again (safety measure)
            if (isKycVerified) {
                router.push(`/dashboard/balances/${modalData.balanceId}/add-money`);
            } else {
                // If KYC somehow became unverified between selection and clicking add money
                console.warn("KYC became unverified before adding money from modal. Re-showing KYC modal.");
                handleOpenKycModal();
            }
        }
        handleCloseInsufficientBalanceModal();
    }, [modalData, router, handleCloseInsufficientBalanceModal, isKycVerified, handleOpenKycModal]); // Add kyc dependencies


    // --- Render ---
    return (
        <>
            <SelectBalanceComponent
                balances={balances}
                // *** MODIFIED: Use combined loading state ***
                isLoading={isLoading}
                error={error}
                refetchBalances={refetchBalances}
                onSelectBalance={handleSelectBalanceForSendMoney} // Use the KYC-aware handler
                allowAddBalance={false}
                pageTitle="Select a Balance to Send From"
                // *** MODIFIED: More informative messages considering KYC ***
                noBalancePrimaryMessage={
                    isLoading ? "Loading balances..." : // Show loading text
                    !user ? "Login required to view balances." : // Should be handled by redirect, but good fallback
                    isKycVerified
                        ? "You don't have any currency balances yet." // User is verified but has no balances
                        : "Complete KYC verification to send money." // User is not verified
                }
                noBalanceSecondaryMessage={
                    isLoading ? "" :
                    !user ? "" :
                    isKycVerified
                        ? "You need an active balance with funds. You can add funds via the main dashboard or balance details." // Clarify how to add funds if verified but no balance/funds
                        : "Start KYC verification to enable sending funds." // Prompt unverified user
                }
                 // If `allowAddBalance` is false, we might not need these, or they could link elsewhere
                // addBalanceHref="/dashboard/balances"
                // addBalanceLinkText="View Balances"
                tokenExists={!!token}
            />

            {/* Insufficient Balance Modal */}
            <InsufficientBalanceModal
                isOpen={isInsufficientBalanceModalOpen}
                onClose={handleCloseInsufficientBalanceModal}
                onAddMoney={handleAddMoneyFromModal}
                currencyCode={modalData?.currencyCode || ''}
            />

            {/* *** MODIFIED: Add KYC Required Modal *** */}
            <KycRequiredModal
                isOpen={isKycModalOpen}
                onClose={handleCloseKycModal}
                onStartVerification={handleStartVerification}
            />
        </>
    );
}

// The Page component that uses Suspense (No changes needed here)
const SendMoneySelectBalancePage = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
             <SendMoneySelectBalanceContent />
        </Suspense>
    );
};

// Simple loading spinner placeholder (No changes needed here)
const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
);


export default SendMoneySelectBalancePage;

// // frontend/src/app/dashboard/send/select-balance/page.tsx
// "use client";

// import React, { useEffect, useCallback, useState, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useBalances } from '../../../hooks/useBalances'; // Adjust path as needed
// import { useAuth } from '../../../contexts/AuthContext'; // Adjust path & ensure it provides user object
// import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Adjust path as needed
// import InsufficientBalanceModal from '@/app/dashboard/components/InsufficientBalanceModal'; // Adjust path as needed
// import KycRequiredModal from '@/app/dashboard/components/KycRequiredModal'; // Adjust path as needed

// // --- Simple Loading Spinner Placeholder ---
// const LoadingSpinner = () => (
//     <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//     </div>
// );

// // --- Interfaces ---
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
//     user: string; // Assuming it's just the user ID string
//     createdAt: string;
//     updatedAt: string;
// }
// // NOTE: No need to redefine AuthUser/AuthContextType here

// // --- Main Content Component ---
// const SendMoneySelectBalanceContent = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const { balances, isLoading: isBalancesLoading, error, refetchBalances } = useBalances();
//     // Get user and auth loading status from context
//     const { token, user, loading: isAuthLoading } = useAuth();

//     const recipientId = searchParams.get('recipientId');

//     // --- State for Modals ---
//     const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);
//     const [insufficientBalanceData, setInsufficientBalanceData] = useState<{ currencyCode: string; balanceId: string } | null>(null);
//     const [isKycModalOpen, setIsKycModalOpen] = useState(false);

//     // --- Determine KYC Status ---
//     // Check only after auth is loaded and user exists
//     const isKycVerified = !isAuthLoading && user?.kyc.status === 'verified';

//     // --- Redirect Logic ---
//     useEffect(() => {
//         // Redirect ONLY after initial auth loading is complete
//         if (!isAuthLoading && !token) {
//              console.log("Send Money (Select Balance): No token after auth check, redirecting to login.");
//              router.replace('/auth/login');
//         }
//     }, [token, isAuthLoading, router]);

//     // --- KYC Modal Actions ---
//     const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
//     const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
//     const handleStartVerification = useCallback(() => {
//         // Use router to navigate to the start page of the KYC flow
//         router.push('/kyc/start'); // Ensure this is the correct path
//         handleCloseKycModal();
//     }, [router, handleCloseKycModal]);

//     // --- Selection Handler (with KYC and Balance Checks) ---
//     const handleSelectBalanceForSendMoney = useCallback((balanceId: string) => {
//         // 0. Wait for auth loading to finish
//         if (isAuthLoading) {
//             console.log("Select Balance (Send Money): Waiting for auth...");
//             return; // Or show some indicator
//         }
//         // 1. Check KYC Status
//         if (!isKycVerified) {
//             console.log("Select Balance (Send Money): KYC not verified. Showing KYC modal.");
//             handleOpenKycModal();
//             return;
//         }

//         // 2. Find Selected Balance (Ensure balances are loaded and available)
//         const selectedBalance = balances.find(b => b._id === balanceId);
//         if (!selectedBalance) {
//             console.error("Selected balance not found (might still be loading or error occurred):", balanceId);
//             // Don't show alert if balances might still be loading
//             if (!isBalancesLoading) {
//                  alert("Error: Could not find the selected balance details. Please try refreshing.");
//             }
//             return;
//         }

//         // 3. Check Balance Amount
//         const balanceAmount = parseFloat(selectedBalance.balance);
//         if (isNaN(balanceAmount) || balanceAmount <= 0) {
//             console.log(`Select Balance (Send Money): Insufficient balance for ${selectedBalance.currency.code}. Showing modal.`);
//             setInsufficientBalanceData({
//                 currencyCode: selectedBalance.currency.code,
//                 balanceId: selectedBalance._id,
//             });
//             setIsInsufficientBalanceModalOpen(true);
//         } else {
//             // KYC verified & Balance sufficient - Proceed to next step
//             if (recipientId) {
//                 console.log(`Select Balance (Send Money): KYC verified & funds OK. Recipient ${recipientId} known. Navigating to amount page for balance ${balanceId}.`);
//                 router.push(`/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`);
//             } else {
//                 console.log(`Select Balance (Send Money): KYC verified & funds OK. Recipient unknown. Navigating to select recipient page for balance ${balanceId}.`);
//                 router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//             }
//         }
//     }, [balances, router, recipientId, isKycVerified, isAuthLoading, isBalancesLoading, handleOpenKycModal]); // Added loading states and balance dependency

//     // --- Insufficient Balance Modal Actions ---
//     const handleCloseInsufficientBalanceModal = useCallback(() => {
//         setIsInsufficientBalanceModalOpen(false);
//         setInsufficientBalanceData(null);
//     }, []);

//     const handleAddMoneyFromInsufficientModal = useCallback(() => {
//         if (insufficientBalanceData?.balanceId) {
//             // KYC check happened before opening the selection that *led* to this modal,
//             // but it's safest to re-check briefly or just navigate.
//             // User must be KYC verified to have selected the balance in the first place.
//             if (isKycVerified) {
//                 router.push(`/dashboard/balances/${insufficientBalanceData.balanceId}/add-money`);
//             } else {
//                 // This case should be rare, means KYC status changed between selection and clicking Add Money here.
//                 console.warn("KYC status became unverified before adding money from insufficient balance modal.");
//                 handleOpenKycModal(); // Show KYC modal again
//             }
//         }
//         handleCloseInsufficientBalanceModal();
//     }, [insufficientBalanceData, router, handleCloseInsufficientBalanceModal, isKycVerified, handleOpenKycModal]); // Add kyc state dependency

//     // Combined loading state
//     const isLoading = isBalancesLoading || isAuthLoading;

//     // --- Render ---
//     return (
//         <>
//             <SelectBalanceComponent
//                 balances={balances}
//                 isLoading={isLoading} // Use combined loading state
//                 error={error}
//                 refetchBalances={refetchBalances}
//                 onSelectBalance={handleSelectBalanceForSendMoney} // Use the updated KYC/Balance-aware handler
//                 allowAddBalance={false} // Correct: Don't allow adding new balance from Send Money flow
//                 pageTitle="Select a Balance to Send From"
//                  // Conditional messages shown *after* loading is complete
//                 noBalancePrimaryMessage={
//                      isLoading ? "Loading balances..." : // Show loading text
//                      !user ? "Login required to manage balances." : // Should be handled by redirect
//                      "You need an active balance with funds to send money."
//                  }
//                 noBalanceSecondaryMessage={
//                     isLoading ? "" : // No secondary while loading
//                     !user ? "" :
//                     isKycVerified // If KYC is OK, the issue must be lack of funds/balances
//                         ? "Please add funds to an existing balance or create one first." // Guide user to add funds/balances elsewhere
//                         : "Complete KYC verification and add funds to send money." // Guide user to KYC first
//                 }
//                 // No onAddBalanceClick needed when allowAddBalance is false
//                 tokenExists={!!token}
//             />

//             {/* Insufficient Balance Modal */}
//             <InsufficientBalanceModal
//                 isOpen={isInsufficientBalanceModalOpen}
//                 onClose={handleCloseInsufficientBalanceModal}
//                 onAddMoney={handleAddMoneyFromInsufficientModal}
//                 currencyCode={insufficientBalanceData?.currencyCode || ''}
//             />

//             {/* KYC Required Modal */}
//             <KycRequiredModal
//                 isOpen={isKycModalOpen}
//                 onClose={handleCloseKycModal}
//                 onStartVerification={handleStartVerification}
//             />
//         </>
//     );
// }

// // --- Page Component with Suspense ---
// const SendMoneySelectBalancePage = () => {
//     return (
//         // Suspense is needed because SendMoneySelectBalanceContent uses useSearchParams()
//         <Suspense fallback={<LoadingSpinner />}>
//              <SendMoneySelectBalanceContent />
//         </Suspense>
//     );
// };

// export default SendMoneySelectBalancePage;