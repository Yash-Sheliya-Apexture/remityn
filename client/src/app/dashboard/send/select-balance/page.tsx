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





// frontend/src/app/dashboard/send/select-balance/page.tsx
"use client";

import React, { useEffect, useCallback, useState } from 'react'; // Added useState
import { useRouter } from 'next/navigation';
import { useBalances } from '../../../hooks/useBalances'; // Adjust path
import { useAuth } from '../../../contexts/AuthContext'; // Adjust path
import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Import the reusable component
import InsufficientBalanceModal from '../../components/InsufficientBalanceModal'; // *** IMPORT THE MODAL *** (Adjust path as needed)

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


const SendMoneySelectBalancePage = () => {
    const router = useRouter();
    const { balances, isLoading, error, refetchBalances } = useBalances();
    const { token } = useAuth();

    // --- State for the Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<{ currencyCode: string; balanceId: string } | null>(null);

    // --- Redirect Logic ---
    useEffect(() => {
        if (!token && !isLoading && !error) {
             router.replace('/auth/login');
        }
    }, [token, isLoading, error, router]);

    // --- Selection Handler (Modified) ---
    const handleSelectBalanceForSendMoney = useCallback((balanceId: string) => {
        // Find the selected balance details from the fetched list
        const selectedBalance = balances.find(b => b._id === balanceId);

        if (!selectedBalance) {
            console.error("Selected balance not found in the list.");
            // Optionally show a generic error to the user
            return;
        }

        // Check if the balance is sufficient (greater than 0 to initiate a send)
        const balanceAmount = parseFloat(selectedBalance.balance);
        if (isNaN(balanceAmount) || balanceAmount <= 0) {
            // Balance is insufficient - Open the modal
            setModalData({
                currencyCode: selectedBalance.currency.code,
                balanceId: selectedBalance._id,
            });
            setIsModalOpen(true);
        } else {
            // Balance is sufficient - Proceed to recipient selection
            router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
        }
    }, [balances, router]); // Depend on balances array and router

    // --- Modal Actions ---
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setModalData(null); // Clear data when closing
    }, []);

    const handleAddMoneyFromModal = useCallback(() => {
        if (modalData?.balanceId) {
            // Navigate to the add money page for the specific balance
            router.push(`/dashboard/balances/${modalData.balanceId}/add-money`);
        }
        handleCloseModal(); // Close the modal after initiating navigation
    }, [modalData, router, handleCloseModal]);


    // --- Render ---
    return (
        <> {/* Use Fragment to render modal alongside the main component */}
            <SelectBalanceComponent
                balances={balances}
                isLoading={isLoading}
                error={error}
                refetchBalances={refetchBalances}
                onSelectBalance={handleSelectBalanceForSendMoney} // Pass the updated handler
                allowAddBalance={false} // Correctly disallow adding new balance
                pageTitle="Select a Balance to Send From"
                noBalancePrimaryMessage="You need an active balance to send money from."
                noBalanceSecondaryMessage="Please add funds to a balance first."
                tokenExists={!!token}
            />

            {/* Render the Insufficient Balance Modal */}
            {/* Pass necessary props */}
            <InsufficientBalanceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAddMoney={handleAddMoneyFromModal}
                currencyCode={modalData?.currencyCode || ''} // Provide currency code or default
            />
        </>
    );
};

export default SendMoneySelectBalancePage;