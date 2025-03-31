// frontend/src/app/dashboard/balances/[balanceId]/send/review/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth } from '../../../../../hooks/useAuth'; // Adjust path
import axios from 'axios';
import apiConfig from '../../../../../config/apiConfig'; // Adjust path
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton"; // For loading
import DashboardHeader from '../../../../components/layout/DashboardHeader';

axios.defaults.baseURL = apiConfig.baseUrl;

// --- Interfaces (NO FEES/ARRIVAL) ---
interface ReviewParams {
    balanceId: string;
}
interface SendSummary { // Structure from localStorage (NO FEES/ARRIVAL)
     userId?: string;
     sourceAccountId: string;
     recipientId: string;
     sendAmount: number;
     receiveAmount: number;
     sendCurrencyCode: string;
     receiveCurrencyCode: string;
     exchangeRate: number;
     availableBalance?: number; // Optional from summary
     reason?: string;
}
interface RecipientDetails { // Structure expected from /recipients/:id
    _id: string;
    accountHolderName: string;
    ifscCode: string;
    accountNumber: string;
    bankName: string;
    address?: string; // Address might be optional depending on backend model
    nickname?: string;
    currency: { code: string };
}

// --- Component Definition ---
const steps = ['Recipient', 'Amount', 'Review', 'Pay']; // Steps for header

const ReviewSendPage = () => {
    // --- Hooks ---
    const router = useRouter();
    const params = useParams<ReviewParams>();
    const searchParams = useSearchParams();
    const { balanceId } = params;
    const recipientId = searchParams.get('recipientId');
    const { token } = useAuth();

    // --- State ---
    const [summary, setSummary] = useState<SendSummary | null>(null);
    const [recipientDetails, setRecipientDetails] = useState<RecipientDetails | null>(null);
    const [userReference, setUserReference] = useState(''); // Optional reference input
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for confirmation
    const [error, setError] = useState<string | null>(null); // Error display
    const [isLoadingDetails, setIsLoadingDetails] = useState(true); // Loading state for recipient details

    // --- Previous Step Link Logic ---
     const getPreviousStepLink = () => {
         // Check if the summary indicates a reason was likely required (based on recipient currency)
         const needsReason = summary?.receiveCurrencyCode === 'INR';
         if (needsReason) {
             return `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`;
         } else {
             return `/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`;
         }
     };

    // --- Effect: Load Summary from localStorage and Fetch Recipient Details ---
    useEffect(() => {
         // Load summary data passed from previous step
         const storedSummary = localStorage.getItem('sendTransferSummary');
         if (storedSummary) {
             setSummary(JSON.parse(storedSummary));
         } else {
             // If summary is missing, something went wrong in the flow
             setError("Transfer details are missing. Please start the transfer again.");
             setIsLoadingDetails(false);
             return; // Stop further execution
         }

         // Fetch full recipient details required for display on the review page
         const fetchRecipient = async () => {
             setIsLoadingDetails(true);
             if (!recipientId || !token) {
                  // Should ideally not happen if summary is present, but good check
                  setError("Recipient ID or authentication token is missing.");
                  setIsLoadingDetails(false);
                  return;
              };
             try {
                 const response = await axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } });
                 setRecipientDetails(response.data);
             } catch (err: any) {
                 console.error("Error fetching recipient details for review:", err);
                 setError(err.response?.data?.message || "Failed to load recipient details.");
             } finally {
                 setIsLoadingDetails(false);
             }
         };

         // Only fetch recipient if summary was loaded successfully
         if (storedSummary) {
             fetchRecipient();
         }

    }, [recipientId, token]); // Dependencies: recipientId and token


    // --- Confirm and Send Handler ---
    const handleConfirmAndSend = async () => {
        // Ensure all necessary data is available
        if (!summary || !recipientDetails || !token) {
            setError("Cannot proceed. Missing transfer or recipient information.");
            return;
        }
        setIsSubmitting(true); // Indicate submission process start
        setError(null); // Clear previous errors

        try {
            // Construct the payload for the backend, excluding fees/arrival
            const payload = {
                 userId: summary.userId, // Include if backend requires it
                 sourceAccountId: summary.sourceAccountId,
                 recipientId: summary.recipientId,
                 sendAmount: summary.sendAmount,
                 receiveAmount: summary.receiveAmount,
                 sendCurrencyCode: summary.sendCurrencyCode,
                 receiveCurrencyCode: summary.receiveCurrencyCode,
                 exchangeRate: summary.exchangeRate,
                 reason: summary.reason, // Include reason if present
                 reference: userReference.trim() || null, // Send trimmed reference or null
             };

            // Make the API call to execute the transfer
            const response = await axios.post(
                '/transfers/execute', // Backend endpoint
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Transfer initiated successfully
            console.log("Transfer execution response:", response.data);
            localStorage.removeItem('sendTransferSummary'); // Clean up stored summary
            // Redirect to a success page or dashboard, optionally passing transfer ID
            router.push(`/dashboard?transferSuccess=true&transferId=${response.data?._id || ''}`);

        } catch (err: any) {
            // Handle errors during transfer execution
            console.error("Error executing transfer:", err);
            setError(err.response?.data?.message || "Failed to send money. Please try again later.");
            setIsSubmitting(false); // Allow user to retry if applicable
        }
        // No finally block needed here because we redirect on success
    };

    // --- Render Logic ---

    // Loading State
    if (isLoadingDetails) {
         return (
            <div className='ReviewSend-Page pb-10'>
                <DashboardHeader title="Send Money" currentStep={3} totalSteps={steps.length} steps={steps} />
                <div className="container mx-auto max-w-2xl p-4 lg:p-8">
                   <Skeleton className="h-8 w-32 mb-6" /> {/* Back link */}
                   <Skeleton className="h-10 w-48 mb-8" /> {/* Title */}
                   <div className="space-y-6 border rounded-lg p-6"> {/* Main content box */}
                       <Skeleton className="h-6 w-3/4 mb-4" /> {/* Detail line */}
                       <Skeleton className="h-4 w-1/2" />
                       <Skeleton className="h-4 w-1/2" />
                       <Skeleton className="h-4 w-1/2" />
                       <Skeleton className="h-4 w-1/2" />
                       <hr className="my-4"/>
                        <Skeleton className="h-6 w-3/4 mb-4" /> {/* Detail line */}
                       <Skeleton className="h-4 w-1/2" />
                       <Skeleton className="h-4 w-1/2" />
                       <Skeleton className="h-4 w-1/2" />
                       <hr className="my-4"/>
                       <Skeleton className="h-10 w-full" /> {/* Reference Input */}
                       <Skeleton className="h-12 w-full rounded-full mt-6" /> {/* Button */}
                   </div>
                </div>
            </div>
        );
    }

    // Error State (if initial loading failed)
    if (error && !isSubmitting) {
        return (
             <div className='ReviewSend-Page pb-10'>
                  <DashboardHeader title="Send Money" currentStep={3} totalSteps={steps.length} steps={steps} />
                  <div className="container mx-auto max-w-2xl p-4 lg:p-8 text-center">
                       <p className="text-red-600 mb-4">Error: {error}</p>
                       <Link href={getPreviousStepLink()} className='text-blue-600 underline ml-2'>Go back</Link>
                  </div>
             </div>
         );
    }

    // Data Missing State (Should ideally be caught by error state above)
    if (!summary || !recipientDetails) {
        return (
            <div className='ReviewSend-Page pb-10'>
                <DashboardHeader title="Send Money" currentStep={3} totalSteps={steps.length} steps={steps} />
                <div className="container mx-auto max-w-2xl p-4 lg:p-8 text-center">
                    <p className="text-red-500 mb-4">Error: Missing required transfer or recipient details.</p>
                    <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className='text-blue-600 underline ml-2'>Start Transfer Again</Link>
                </div>
            </div>
        );
    }

    // Main Render - Display Review Details
    return (
         <div className='ReviewSend-Page pb-10'>
              <DashboardHeader title="Send Money" currentStep={3} totalSteps={steps.length} steps={steps} />
             <div className="container mx-auto max-w-2xl p-4 lg:p-8">
                 {/* Back Link */}
                 <Link href={getPreviousStepLink()} className="inline-flex items-center gap-1 mb-6 text-gray-600 hover:text-gray-900">
                     <IoIosArrowBack size={20}/> Back
                 </Link>

                 {/* Title */}
                <h1 className="text-2xl lg:text-3xl font-semibold text-main mb-6">Confirm and send</h1>

                 {/* Submission Error Display */}
                 {error && isSubmitting && <p className="text-red-600 text-sm mb-4 p-3 bg-red-100 rounded border border-red-200">{error}</p>}

                 {/* Main Review Box */}
                 <div className="border rounded-lg p-6 bg-white shadow-sm space-y-5">

                     {/* Transfer Details Section */}
                     <div>
                         <h3 className='text-sm font-medium text-gray-500 mb-3'>Transfer details</h3>
                         <div className='space-y-2 text-sm'>
                             <div className='flex justify-between'>
                                 <span>You send exactly</span>
                                 <span className='font-semibold'>{summary.sendAmount.toFixed(2)} {summary.sendCurrencyCode}</span>
                             </div>
                             {/* Fee line is removed */}
                             {/* Amount to convert line is removed */}
                             <div className='flex justify-between'>
                                 <span>Guaranteed rate</span>
                                 <span className='font-semibold'>1 {summary.sendCurrencyCode} = {summary.exchangeRate.toFixed(5)} {summary.receiveCurrencyCode}</span>
                             </div>
                             <div className='flex justify-between font-bold text-base mt-1'> {/* Slightly larger font for final amount */}
                                 <span>{recipientDetails.nickname || recipientDetails.accountHolderName} gets</span>
                                 <span>{summary.receiveAmount.toFixed(2)} {summary.receiveCurrencyCode}</span>
                             </div>
                         </div>
                     </div>
                     <hr/>

                     {/* Recipient Details Section */}
                     <div>
                          <h3 className='text-sm font-medium text-gray-500 mb-3'>Recipient details</h3>
                          <div className='space-y-2 text-sm'>
                              <div className='flex justify-between'>
                                  <span>Account holder name</span>
                                  <span className='font-semibold capitalize'>{recipientDetails.accountHolderName}</span>
                              </div>
                             <div className='flex justify-between'>
                                 <span>IFSC code</span>
                                 <span className='font-semibold'>{recipientDetails.ifscCode}</span>
                             </div>
                             <div className='flex justify-between'>
                                 <span>Account number</span>
                                 {/* Mask account number */}
                                 <span className='font-semibold'>**** **** {recipientDetails.accountNumber.slice(-4)}</span>
                             </div>
                             <div className='flex justify-between'>
                                 <span>Bank name</span>
                                 <span className='font-semibold'>{recipientDetails.bankName}</span>
                             </div>
                             {/* Address can be omitted on review if not critical */}
                             {/* {recipientDetails.address && <div className='flex justify-between'><span>Address</span><span className='font-semibold'>{recipientDetails.address}</span></div>} */}
                         </div>
                     </div>
                     <hr/>

                     {/* --- REMOVED Schedule Details Section --- */}

                     {/* Reason Section (Conditional) */}
                      {summary.reason && (
                          <>
                             <hr/>
                             <div>
                                  <h3 className='text-sm font-medium text-gray-500 mb-2'>Reason for transfer</h3>
                                 <p className='text-sm font-semibold'>{summary.reason}</p>
                             </div>
                         </>
                     )}
                    <hr/>

                     {/* Reference Input Section */}
                     <div>
                         <label htmlFor="reference" className='block text-sm font-medium text-gray-500 mb-2'>Reference for recipient (optional)</label>
                         <input
                            type="text"
                            id="reference"
                            value={userReference}
                            onChange={(e) => setUserReference(e.target.value)}
                            maxLength={35} // Example length limit
                            placeholder={`e.g., Invoice payment, Gift`}
                            className="block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                            aria-label="Reference for recipient"
                        />
                     </div>

                 </div>

                 {/* Disclaimer Text */}
                 <p className='text-xs text-gray-500 my-4'>
                     You can cancel for a full refund within 30 minutes of payment, unless the funds have been picked up or deposited. Make sure you're sending money to someone you know and trust, and that their information is correct. Fraudulent transactions may result in the loss of money with no recourse.
                 </p>

                 {/* Confirm Button */}
                 <button
                     onClick={handleConfirmAndSend}
                     disabled={isSubmitting} // Disable while submitting
                     className="w-full bg-green-600 text-white font-semibold py-3 rounded-full disabled:opacity-50 disabled:cursor-wait hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                     data-testid="confirm-send-button"
                 >
                     {isSubmitting ? (
                         // Loading indicator inside button
                         <div className="flex justify-center items-center">
                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                             Processing...
                         </div>
                     ) : (
                        'Confirm and send' // Default button text
                     )}
                 </button>

             </div>
         </div>
    );
};

export default ReviewSendPage;