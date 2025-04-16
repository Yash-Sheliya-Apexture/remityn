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
import { useBalances } from '../../../hooks/useBalances'; // Adjust path as needed
import { useAuth } from '../../../contexts/AuthContext'; // Adjust path & ensure it provides user object
import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Adjust path as needed
import InsufficientBalanceModal from '@/app/dashboard/components/InsufficientBalanceModal'; // Adjust path as needed
import KycRequiredModal from '@/app/dashboard/components/KycRequiredModal'; // Adjust path as needed
// import LoadingSpinner from '@/components/ui/LoadingSpinner'; // Import or define your spinner

// --- Simple Loading Spinner Placeholder ---
const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
);

// --- Interfaces ---
interface Currency {
    _id: string;
    code: string;
    name: string;
    flagImage?: string;
}
interface Account {
    _id: string;
    balance: string;
    currency: Currency;
    user: string;
    createdAt: string;
    updatedAt: string;
}
// --- Assumed User structure from useAuth ---
interface AuthUser {
    // Add other user properties as needed (id, email, etc.)
    kycStatus: 'verified' | 'pending' | 'not_started' | 'rejected' | null | undefined;
}
interface AuthContextType {
    token: string | null;
    user: AuthUser | null;
    // other auth methods...
}

// --- Main Content Component ---
const SendMoneySelectBalanceContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { balances, isLoading, error, refetchBalances } = useBalances();
    const { token, user } = useAuth() as AuthContextType; // Cast or ensure useAuth provides user

    const recipientId = searchParams.get('recipientId');

    // --- State for Modals ---
    const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);
    const [insufficientBalanceData, setInsufficientBalanceData] = useState<{ currencyCode: string; balanceId: string } | null>(null);
    const [isKycModalOpen, setIsKycModalOpen] = useState(false);

    // --- Determine KYC Status ---
    const isKycVerified = user?.kycStatus === 'verified';

    // --- Redirect Logic ---
    useEffect(() => {
        // Redirect to login if no token/user after loading/error check
        if (!isLoading && !error && !token) {
             console.log("No token found on Select Balance page, redirecting to login.");
             // Check if user is also null if your logic depends on it before redirecting
             // if (!user) { ... }
             router.replace('/auth/login');
        }
    }, [token, user, isLoading, error, router]);

    // --- KYC Modal Actions ---
    const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
    const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
    const handleStartVerification = useCallback(() => {
        router.push('/dashboard/kyc'); // Adjust path to your KYC page
        handleCloseKycModal();
    }, [router, handleCloseKycModal]);

    // --- Selection Handler (with KYC and Balance Checks) ---
    const handleSelectBalanceForSendMoney = useCallback((balanceId: string) => {
        // 1. Check KYC Status
        if (!isKycVerified) {
            console.log("KYC not verified. Showing KYC modal.");
            handleOpenKycModal();
            return;
        }

        // 2. Find Selected Balance
        const selectedBalance = balances.find(b => b._id === balanceId);
        if (!selectedBalance) {
            console.error("Selected balance not found:", balanceId);
            alert("Error: Could not find the selected balance details. Please try again.");
            return;
        }

        // 3. Check Balance Amount
        const balanceAmount = parseFloat(selectedBalance.balance);
        if (isNaN(balanceAmount) || balanceAmount <= 0) {
            console.log(`Insufficient balance for ${selectedBalance.currency.code}. Showing modal.`);
            setInsufficientBalanceData({
                currencyCode: selectedBalance.currency.code,
                balanceId: selectedBalance._id,
            });
            setIsInsufficientBalanceModalOpen(true);
        } else {
            // KYC verified & Balance sufficient - Proceed to next step
            if (recipientId) {
                console.log(`KYC verified. Recipient ${recipientId} known. Navigating to amount page for balance ${balanceId}.`);
                router.push(`/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`);
            } else {
                console.log(`KYC verified. Recipient unknown. Navigating to select recipient page for balance ${balanceId}.`);
                router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
            }
        }
    }, [balances, router, recipientId, isKycVerified, handleOpenKycModal]);

    // --- Insufficient Balance Modal Actions ---
    const handleCloseInsufficientBalanceModal = useCallback(() => {
        setIsInsufficientBalanceModalOpen(false);
        setInsufficientBalanceData(null);
    }, []);

    const handleAddMoneyFromInsufficientModal = useCallback(() => {
        if (insufficientBalanceData?.balanceId) {
            // KYC check already passed to reach this point
            router.push(`/dashboard/balances/${insufficientBalanceData.balanceId}/add-money`);
        }
        handleCloseInsufficientBalanceModal();
    }, [insufficientBalanceData, router, handleCloseInsufficientBalanceModal]);


    // --- Render ---
    return (
        <>
            <SelectBalanceComponent
                balances={balances}
                isLoading={isLoading}
                error={error}
                refetchBalances={refetchBalances}
                onSelectBalance={handleSelectBalanceForSendMoney} // Use the KYC-aware handler
                allowAddBalance={false} // Don't allow adding new balance from Send Money flow
                pageTitle="Select a Balance to Send From"
                noBalancePrimaryMessage="You need an active balance with funds to send money."
                // Conditional secondary message based on KYC status
                noBalanceSecondaryMessage={
                    isLoading ? "" : // Don't show message while loading user/balances
                    !user ? "" : // Don't show if user data isn't loaded yet
                    isKycVerified
                        ? "Please add funds to an existing balance first."
                        : "Complete KYC verification and add funds to send money."
                }
                // No add action needed when allowAddBalance is false
                // onAddBalanceClick={undefined}
                tokenExists={!!token}
            />

            {/* Insufficient Balance Modal */}
            <InsufficientBalanceModal
                isOpen={isInsufficientBalanceModalOpen}
                onClose={handleCloseInsufficientBalanceModal}
                onAddMoney={handleAddMoneyFromInsufficientModal}
                currencyCode={insufficientBalanceData?.currencyCode || ''}
            />

            {/* KYC Required Modal */}
            <KycRequiredModal
                isOpen={isKycModalOpen}
                onClose={handleCloseKycModal}
                onStartVerification={handleStartVerification}
            />
        </>
    );
}

// --- Page Component with Suspense ---
const SendMoneySelectBalancePage = () => {
    return (
        // Suspense is needed because SendMoneySelectBalanceContent uses useSearchParams()
        <Suspense fallback={<LoadingSpinner />}>
             <SendMoneySelectBalanceContent />
        </Suspense>
    );
};

export default SendMoneySelectBalancePage;