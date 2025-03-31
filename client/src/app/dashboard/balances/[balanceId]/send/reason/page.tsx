// frontend/src/app/dashboard/balances/[balanceId]/send/reason/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import DashboardHeader from '../../../../components/layout/DashboardHeader';

interface ReasonParams {
    balanceId: string;
}

// Define steps for the header (if using)
const steps = ['Recipient', 'Amount', 'Review', 'Pay']; // Adjust based on whether reason is always shown

const TransferReasonPage = () => {
    const router = useRouter();
    const params = useParams<ReasonParams>();
    const searchParams = useSearchParams();
    const { balanceId } = params;
    const recipientId = searchParams.get('recipientId');
    const [selectedReason, setSelectedReason] = useState('');
    const [error, setError] = useState('');

    // Retrieve summary from localStorage
    const [summary, setSummary] = useState<any>(null); // Use 'any' or define SendSummary interface

    useEffect(() => {
         const storedSummary = localStorage.getItem('sendTransferSummary');
         if (storedSummary) {
             setSummary(JSON.parse(storedSummary));
         } else {
             // Handle missing summary - maybe redirect back
             setError("Transfer details missing. Please start again.");
             console.error("Transfer summary missing from localStorage");
             // Optional: router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
         }
    }, []);

    const reasons = [
        "Sending money home to family",
        "Paying for goods or services",
        "Property payment",
        "Paying salary",
        "General expenses",
        // Add other relevant reasons
    ];

    const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedReason(event.target.value);
        setError(''); // Clear error on selection
    };

    const handleSubmit = () => {
        if (!selectedReason) {
            setError('Please select a reason for your transfer.');
            return;
        }
        if (!summary) {
             setError("Transfer details missing. Please start again.");
             return;
         }

        // Add reason to summary object
         const updatedSummary = { ...summary, reason: selectedReason };
         localStorage.setItem('sendTransferSummary', JSON.stringify(updatedSummary)); // Update localStorage

        // Navigate to review page
        router.push(`/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`);
    };

    return (
        <div className='TransferReason-Page'>
             {/* Optional Header */}
             {/* <DashboardHeader title="Send Money" currentStep={2.5} totalSteps={steps.length} steps={steps} /> */}

             <div className="container mx-auto max-w-lg p-4 lg:p-8">
                  <Link href={`/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`} className="inline-flex items-center gap-1 mb-6 text-gray-600 hover:text-gray-900">
                     <IoIosArrowBack size={20}/> Back to Amount
                 </Link>

                 <h1 className="text-xl lg:text-2xl font-semibold text-center text-main mb-4">What's the reason for your transfer?</h1>
                 {/* Add note about India transfers if needed */}
                 {summary?.receiveCurrencyCode === 'INR' && (
                     <p className="text-sm text-center text-gray-600 mb-6">Please note that transfers to charities or NGOs in India may have restrictions.</p>
                 )}

                <div className="mb-6">
                     <label htmlFor="transfer-reason" className="block text-sm font-medium text-gray-700 mb-2">
                         Select an option that best describes the reason
                     </label>
                     <select
                         id="transfer-reason"
                         value={selectedReason}
                         onChange={handleReasonChange}
                         className={`block w-full border rounded-md p-3 focus:ring-primary focus:border-primary ${error ? 'border-red-500' : 'border-gray-300'}`}
                     >
                         <option value="" disabled>Select an option</option>
                         {reasons.map((reason) => (
                             <option key={reason} value={reason}>{reason}</option>
                         ))}
                     </select>
                     {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                </div>

                 <button
                     onClick={handleSubmit}
                     className="w-full bg-primary text-secondary font-semibold py-3 rounded-full disabled:opacity-50 hover:bg-primary-hover transition-colors"
                     disabled={!summary} // Disable if summary is missing
                 >
                     Continue
                 </button>
             </div>
        </div>
    );
};

export default TransferReasonPage;