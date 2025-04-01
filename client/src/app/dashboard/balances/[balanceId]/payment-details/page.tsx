// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { IoIosArrowBack } from 'react-icons/io';
// import { useAuth } from '../../../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../../../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;


// interface PaymentDetailsPageParams {
//     balanceId: string;
// }

// interface PaymentDetails {
//     _id: string;
//     user: string;
//     balanceCurrency: any; // Define more specific type if needed
//     payInCurrency: any;   // Define more specific type if needed
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode: string;
//     paymentMethod: string;
//     status: string;
//     bankDetails: {
//         payeeName?: string; // Mark as optional
//         iban?: string;      // Mark as optional
//         bicSwift?: string;  // Mark as optional
//         bankAddress?: string;// Mark as optional
//     };
//     createdAt: string;
//     __v: number;
// }


// const PaymentDetailsPage = () => {
//     const params = useParams<PaymentDetailsPageParams>();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const { balanceId } = params;
//     const paymentId = searchParams.get('paymentId'); // Get paymentId from query parameter
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null); // Use interface
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();

//     useEffect(() => {
//         const fetchPaymentDetails = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 if (!paymentId) {
//                     setError("Payment ID is missing.");
//                     setIsLoading(false);
//                     return;
//                 }
//                 const response = await axios.get(`/payments/${paymentId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPaymentDetails(response.data as PaymentDetails); // Type assertion
//                 setIsLoading(false);
//             } catch (err: any) {
//                 setError(err.response?.data?.message || 'Failed to load payment details');
//                 setIsLoading(false);
//                 console.error("Error fetching payment details:", err);
//                 if (err.response?.status === 404) {
//                     router.push('/dashboard'); // Redirect if payment not found
//                 }
//             }
//         };

//         fetchPaymentDetails();
//     }, [paymentId, token, router]);

//     if (isLoading) {
//         return <div>Loading payment details...</div>;
//     }

//     if (error || !paymentDetails) {
//         return <div className="text-red-500">Error: {error || "Payment details not found."}</div>;
//     }

//     const payInCurrencyCode = paymentDetails.payInCurrency.code;
//     const amountToPay = parseFloat(paymentDetails.amountToPay).toFixed(2);


//     return (
//         <div className="container mx-auto px-4 py-8">
//             <button onClick={() => router.back()} className="mb-4 flex items-center gap-2">
//                 <IoIosArrowBack size={20} /> Pay another way
//             </button>

//             <div className="bg-white rounded-2xl p-6 shadow-md max-w-lg mx-auto">
//                 <h2 className="text-xl font-semibold mb-6">Use your bank to make a payment to Wise</h2>
//                 <p className="text-gray-700 mb-4">Make a European (SEPA) payment — not an international one — using the details below.</p>

//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-3">Details you’ll need to make this transfer</h3>
//                     <div className="grid grid-cols-1 gap-4">
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Payee name</p>
//                                 <p className="font-semibold">{paymentDetails.bankDetails?.payeeName || 'Wise'}</p> {/* Optional chaining */}
//                             </div>
//                             <button className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Reference code</p>
//                                 <p className="font-semibold">{paymentDetails.referenceCode}</p>
//                             </div>
//                             <button className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">IBAN</p>
//                                 <p className="font-semibold">{paymentDetails.bankDetails?.iban || 'IBAN Placeholder'}</p> {/* Optional chaining */}
//                             </div>
//                             <button className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Bank code (BIC/SWIFT)</p>
//                                 <p className="font-semibold">{paymentDetails.bankDetails?.bicSwift || 'BIC/SWIFT Placeholder'}</p> {/* Optional chaining */}
//                             </div>
//                             <button className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Amount to send ({payInCurrencyCode})</p>
//                                 <p className="font-semibold">{amountToPay} {payInCurrencyCode}</p>
//                             </div>
//                             <button className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-3">Our bank’s address</h3>
//                     <div className="bg-gray-100 p-4 rounded-md">
//                         <p className="text-gray-700 whitespace-pre-line">{paymentDetails.bankDetails?.bankAddress || 'Bank Address Placeholder'}</p> {/* Optional chaining */}
//                     </div>
//                 </div>

//                 <div className="mb-6 flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                         <span className="text-gray-500">Need more help?</span>
//                         <a href="#" className="text-green-500 hover:underline text-sm">Download PDF</a> {/* Placeholder for PDF download */}
//                     </div>
//                     <button className="text-green-500 hover:underline text-sm">Download PDF</button> {/* Another placeholder */}
//                 </div>

//                 <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3">
//                     I’ve made my bank transfer
//                 </button>
//                 <button className="w-full text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-300">
//                     I’ll transfer my money later
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentDetailsPage;


// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { IoIosArrowBack } from 'react-icons/io';
// import { useAuth } from '../../../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../../../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface PaymentDetailsPageParams {
//     balanceId: string;
// }

// interface PaymentDetails {
//     _id: string;
//     user: string;
//     balanceCurrency: any;
//     payInCurrency: any;
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode: string;
//     paymentMethod: string;
//     status: string;
//     bankDetails: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     __v: number;
// }

// const PaymentDetailsPage = () => {
//     const params = useParams<PaymentDetailsPageParams>();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const { balanceId } = params;
//     const paymentId = searchParams.get('paymentId');
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();

//     useEffect(() => {
//         const fetchPaymentDetails = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 if (!paymentId) {
//                     setError("Payment ID is missing.");
//                     setIsLoading(false);
//                     return;
//                 }
//                 const response = await axios.get(`/payments/${paymentId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPaymentDetails(response.data as PaymentDetails);
//                 setIsLoading(false);
//             } catch (err: any) {
//                 setError(err.response?.data?.message || 'Failed to load payment details');
//                 setIsLoading(false);
//                 console.error("Error fetching payment details:", err);
//                 if (err.response?.status === 404) {
//                     router.push('/dashboard');
//                 }
//             }
//         };

//         fetchPaymentDetails();
//     }, [paymentId, token, router]);

//     if (isLoading) {
//         return <div>Loading payment details...</div>;
//     }

//     if (error || !paymentDetails) {
//         return <div className="text-red-500">Error: {error || "Payment details not found."}</div>;
//     }

//     const payInCurrencyCode = paymentDetails.payInCurrency.code;
//     const amountToPay = parseFloat(paymentDetails.amountToPay).toFixed(2);
//     const bankDetails = paymentDetails.bankDetails || {};

//     const handleCopyToClipboard = (text: string, fieldName: string) => {
//         navigator.clipboard.writeText(text).then(() => {
//             alert(`${fieldName} copied to clipboard!`); // Simple alert for feedback
//         }).catch(err => {
//             console.error('Failed to copy text: ', err);
//             alert(`Failed to copy ${fieldName}. Please copy manually.`);
//         });
//     };


//     return (
//         <div className="container mx-auto px-4 py-8">
//             <button onClick={() => router.back()} className="mb-4 flex items-center gap-2">
//                 <IoIosArrowBack size={20} /> Pay another way
//             </button>

//             <div className="bg-white rounded-2xl p-6 shadow-md max-w-lg mx-auto">
//                 <h2 className="text-xl font-semibold mb-6">Use your bank to make a payment to Wise</h2>
//                 <p className="text-gray-700 mb-4">Make a European (SEPA) payment — not an international one — using the details below.</p>

//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-3">Details you’ll need to make this transfer</h3>
//                     <div className="grid grid-cols-1 gap-4">
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Payee name</p>
//                                 <p className="font-semibold">{bankDetails.payeeName || 'Wise'}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(bankDetails.payeeName || 'Wise', 'Payee name')} className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Reference code</p>
//                                 <p className="font-semibold">{paymentDetails.referenceCode}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(paymentDetails.referenceCode, 'Reference code')} className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">IBAN</p>
//                                 <p className="font-semibold">{bankDetails.iban || 'IBAN Placeholder'}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(bankDetails.iban || 'IBAN Placeholder', 'IBAN')} className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Bank code (BIC/SWIFT)</p>
//                                 <p className="font-semibold">{bankDetails.bicSwift || 'BIC/SWIFT Placeholder'}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(bankDetails.bicSwift || 'BIC/SWIFT Placeholder', 'BIC/SWIFT')} className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Amount to send ({payInCurrencyCode})</p>
//                                 <p className="font-semibold">{amountToPay} {payInCurrencyCode}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(`${amountToPay} ${payInCurrencyCode}`, 'Amount to send')} className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-3">Our bank’s address</h3>
//                     <div className="bg-gray-100 p-4 rounded-md whitespace-pre-line">
//                         {bankDetails.bankAddress || 'Bank Address Placeholder'}
//                     </div>
//                 </div>

//                 <div className="mb-6 flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                         <span className="text-gray-500">Need more help?</span>
//                         <a href="#" className="text-green-500 hover:underline text-sm">Download PDF</a>
//                     </div>
//                     <button className="text-green-500 hover:underline text-sm">Download PDF</button>
//                 </div>

//                 <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3">
//                     I’ve made my bank transfer
//                 </button>
//                 <button className="w-full text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-300">
//                     I’ll transfer my money later
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentDetailsPage;




"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth } from '../../../../hooks/useAuth'; // Adjust path as needed
import paymentService from '../../../../services/payment'; // Adjust path as needed
import { Skeleton } from '@/components/ui/skeleton'; // Adjust path as needed
import { Button } from '@/components/ui/button'; // Adjust path as needed

// Define the structure of the Payment Details expected from the API
interface PaymentDetails {
    _id: string;
    user: string; // Assuming user ID string
    balanceCurrency: { _id: string; code: string; /* other fields */ };
    payInCurrency: { _id: string; code: string; /* other fields */ };
    amountToAdd: number;
    amountToPay: number;
    exchangeRate: number;
    wiseFee: number;
    bankTransferFee: number;
    referenceCode: string;
    paymentMethod: string;
    status: string;
    bankDetails: {
        payeeName?: string;
        iban?: string;
        bicSwift?: string;
        bankAddress?: string;
    };
    createdAt: string;
    updatedAt?: string; // Optional
    __v?: number; // Optional
}

// Define the structure for the route parameters
interface PaymentDetailsPageParams {
    balanceId: string;
}

const PaymentDetailsPage = () => {
    // --- Hooks ---
    const params = useParams<PaymentDetailsPageParams>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { token } = useAuth();

    // --- State ---
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Extract IDs from route/query params
    const { balanceId } = params; // Get balanceId from route params
    const paymentId = searchParams.get('paymentId'); // Get paymentId from query params

    // --- Data Fetching Effect ---
    useEffect(() => {
        const fetchPaymentDetails = async () => {
            setIsLoading(true);
            setError(null);
            console.log("PaymentDetailsPage: Fetching details for paymentId:", paymentId); // Debug log

            if (!paymentId) {
                setError("Payment ID is missing from URL.");
                setIsLoading(false);
                console.error("PaymentDetailsPage: No paymentId found in query parameters.");
                router.push('/dashboard/transactions'); // Redirect if no ID
                return;
            }
            if (!token) {
                 setError("Authentication required.");
                 setIsLoading(false);
                 router.push('/auth/login'); // Redirect to login if no token
                 return;
            }

            try {
                const details = await paymentService.getPaymentDetails(paymentId, token);
                setPaymentDetails(details);
            } catch (err: any) {
                const errMsg = err.response?.data?.message || err.message || 'Failed to load payment details';
                setError(errMsg);
                console.error("PaymentDetailsPage: Error fetching payment details:", err);
                if (err.response?.status === 404) {
                    setError(`Payment with ID ${paymentId} not found or you don't have access.`);
                } else if (err.response?.status === 401 || err.response?.status === 403) {
                     setError("Unauthorized to view this payment.");
                     // Consider redirecting if unauthorized
                     // router.push('/dashboard');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [paymentId, token, router]); // Dependencies for the effect

    // --- Utility Functions ---
    const handleCopyToClipboard = (text: string | undefined, fieldName: string) => {
         if (!text) {
             console.warn(`PaymentDetailsPage: Attempted to copy empty field: ${fieldName}`);
             // Optionally provide user feedback (e.g., toast notification)
             return;
         }
        navigator.clipboard.writeText(text).then(() => {
            console.log(`PaymentDetailsPage: ${fieldName} copied.`);
            // Optionally provide user feedback
        }).catch(err => {
            console.error('PaymentDetailsPage: Failed to copy text: ', err);
            // Inform user about the failure
            alert(`Failed to copy ${fieldName}. Please copy manually.`);
        });
    };

    // --- Action Handlers ---
    const handleIvePaid = async () => {
        console.log("PaymentDetailsPage: handleIvePaid triggered");
        setError(null); // Clear previous errors

        if (!paymentId || !token || !balanceId) {
            const missing = [!paymentId && "Payment ID", !token && "Token", !balanceId && "Balance ID"].filter(Boolean).join(", ");
            const errorMsg = `Cannot proceed: Missing ${missing}.`;
            setError(errorMsg);
            console.error("PaymentDetailsPage: Missing critical data for handleIvePaid:", { paymentId, token, balanceId });
            return;
        }

        setIsSubmitting(true);
        console.log("PaymentDetailsPage: Submitting... paymentId:", paymentId, "balanceId:", balanceId);

        try {
            // Optional: Attempt to update backend status first
            try {
                console.log("PaymentDetailsPage: Attempting paymentService.confirmUserTransfer");
                await paymentService.confirmUserTransfer(paymentId, token);
                console.log("PaymentDetailsPage: confirmUserTransfer successful (status updated to 'in progress')");
            } catch (confirmErr: any) {
                 console.error("PaymentDetailsPage: Non-critical error: Failed to update payment status via confirmUserTransfer:", confirmErr.response?.data?.message || confirmErr.message);
                 // Continue with navigation even if status update fails
            }

            // Navigate to Success Page
            const successUrl = `/dashboard/balances/${balanceId}/payment-success?paymentId=${paymentId}`;
            console.log("PaymentDetailsPage: Navigating to success page:", successUrl);
            router.push(successUrl);
            // Note: State update (setIsSubmitting(false)) might not run if navigation is immediate

        } catch (err: any) {
            // This catch handles unexpected errors before or during navigation attempt
            const errMsg = err.response?.data?.message || err.message || 'An unexpected error occurred while trying to proceed.';
            setError(`Failed to proceed: ${errMsg}`);
            console.error("PaymentDetailsPage: Error during handleIvePaid (outer catch):", err);
            setIsSubmitting(false); // Ensure loading stops on failure *before* navigation
        }
    };

    const handlePayLater = () => {
        console.log("PaymentDetailsPage: handlePayLater triggered, navigating to /dashboard/tasks");
        // Navigate specifically to the Tasks page where the pending payment should appear
        router.push('/dashboard/transactions');
    };
    // --- END Action Handlers ---

    // --- Render Logic ---

    // Loading State
    if (isLoading) {
        return (
             <div className="container mx-auto px-4 py-8 animate-pulse">
                 <Skeleton className="h-8 w-32 mb-6" />
                 <div className="bg-white rounded-2xl p-6 shadow-md max-w-lg mx-auto">
                     <Skeleton className="h-6 w-3/4 mb-6" />
                     <Skeleton className="h-4 w-full mb-4" />
                     <Skeleton className="h-6 w-4/5 mb-4" />
                     <div className="space-y-3 mb-6">
                          <Skeleton className="h-16 w-full rounded-md" />
                          <Skeleton className="h-16 w-full rounded-md" />
                          <Skeleton className="h-16 w-full rounded-md" />
                          <Skeleton className="h-16 w-full rounded-md" />
                          <Skeleton className="h-16 w-full rounded-md" />
                     </div>
                      <Skeleton className="h-6 w-1/2 mb-3" />
                      <Skeleton className="h-20 w-full rounded-md mb-6" />
                      <div className="space-y-3 mt-6">
                         <Skeleton className="h-12 w-full rounded-md" />
                         <Skeleton className="h-12 w-full rounded-md" />
                      </div>
                 </div>
             </div>
         );
    }

    // Error State (if loading finished but error occurred preventing details display)
     if (!isLoading && error && !paymentDetails) {
         return (
             <div className="container mx-auto px-4 py-8 text-center">
                 <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md max-w-lg mx-auto">
                     <p className="font-semibold">Error Loading Payment Details</p>
                     <p className="text-sm mt-1">{error}</p>
                 </div>
                  <Button onClick={() => router.back()} variant="outline" className="mt-6">
                     Go Back
                 </Button>
             </div>
         );
     }

    // Not Found State (if loading finished, no specific error, but details are null)
    if (!isLoading && !error && !paymentDetails) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-gray-500">
                <p>Payment details could not be found.</p>
                <Button onClick={() => router.push('/dashboard/transactions')} variant="outline" className="mt-4">
                     View Transactions
                 </Button>
            </div>
        );
    }

    // --- Render Payment Details (paymentDetails is valid) ---
    const payInCurrencyCode = paymentDetails.payInCurrency?.code || 'N/A';
    const amountToPay = paymentDetails.amountToPay ? parseFloat(paymentDetails.amountToPay.toString()).toFixed(2) : 'N/A';
    const bankDetails = paymentDetails.bankDetails || {};
    const referenceCode = paymentDetails.referenceCode || 'N/A';

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Optional: Back link */}
            {/* <Button variant="link" onClick={() => router.back()} className="mb-4 px-0 text-gray-600 hover:text-gray-800">
                <IoIosArrowBack size={18} className="mr-1" /> Go Back
            </Button> */}

            <div className="bg-white rounded-2xl p-6 shadow-md max-w-lg mx-auto border border-gray-200">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Pay using Bank Transfer</h2>
                <p className="text-gray-600 mb-6 text-sm">Make a standard bank transfer from your online banking using these details. Please ensure the <strong className='text-gray-700'>Reference code</strong> is included.</p>

                {/* Bank Details Section */}
                <div className="mb-6">
                    <h3 className="text-base font-semibold mb-3 text-gray-700">Recipient Details (Wise)</h3>
                    <div className="space-y-3">
                        {/* Payee Name */}
                        <div className="bg-gray-50 border border-gray-200 p-3 rounded-md flex justify-between items-center text-sm">
                            <div>
                                <p className="text-xs text-gray-500 mb-0.5">Payee name</p>
                                <p className="font-semibold text-gray-800">{bankDetails.payeeName || 'Wise Europe SA'}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(bankDetails.payeeName || 'Wise Europe SA', 'Payee name')} className="text-green-600 hover:text-green-700 px-2 h-auto">Copy</Button>
                        </div>
                        {/* Reference */}
                        <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-md flex justify-between items-center text-sm">
                            <div>
                                <p className="text-xs text-yellow-800 font-medium mb-0.5">Reference code (Include this)</p>
                                <p className="font-semibold text-gray-900 font-mono">{referenceCode}</p>
                            </div>
                             <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(referenceCode, 'Reference code')} className="text-green-600 hover:text-green-700 px-2 h-auto">Copy</Button>
                        </div>
                         {/* IBAN */}
                        <div className="bg-gray-50 border border-gray-200 p-3 rounded-md flex justify-between items-center text-sm">
                            <div>
                                <p className="text-xs text-gray-500 mb-0.5">IBAN</p>
                                <p className="font-semibold text-gray-800 font-mono break-all">{bankDetails.iban || 'N/A'}</p>
                            </div>
                             <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(bankDetails.iban, 'IBAN')} className="text-green-600 hover:text-green-700 px-2 h-auto ml-2">Copy</Button>
                        </div>
                         {/* BIC */}
                        <div className="bg-gray-50 border border-gray-200 p-3 rounded-md flex justify-between items-center text-sm">
                            <div>
                                <p className="text-xs text-gray-500 mb-0.5">Bank code (BIC/SWIFT)</p>
                                <p className="font-semibold text-gray-800 font-mono">{bankDetails.bicSwift || 'N/A'}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(bankDetails.bicSwift, 'BIC/SWIFT')} className="text-green-600 hover:text-green-700 px-2 h-auto">Copy</Button>
                        </div>
                         {/* Amount */}
                        <div className="bg-gray-50 border border-gray-200 p-3 rounded-md flex justify-between items-center text-sm">
                            <div>
                                <p className="text-xs text-gray-500 mb-0.5">Amount to send ({payInCurrencyCode})</p>
                                <p className="font-semibold text-gray-800">{amountToPay} {payInCurrencyCode}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(`${amountToPay} ${payInCurrencyCode}`, 'Amount to send')} className="text-green-600 hover:text-green-700 px-2 h-auto">Copy</Button>
                        </div>
                    </div>
                </div>

                {/* Bank Address */}
                <div className="mb-6">
                    <h3 className="text-base font-semibold mb-3 text-gray-700">Wise Bank Address</h3>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-md whitespace-pre-line text-sm text-gray-800">
                        {bankDetails.bankAddress || 'Wise Europe SA\nAvenue Louise 54, Room S52\n1050 Brussels\nBelgium'}
                    </div>
                </div>

                 {/* Display general submission error if any */}
                 {error && !isLoading && (
                     <p className="text-red-600 text-sm mb-4 text-center bg-red-50 p-2 rounded border border-red-200">{error}</p>
                 )}

                {/* Action Buttons */}
                <div className='space-y-3'>
                    <Button
                        onClick={handleIvePaid}
                        disabled={isSubmitting}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 h-auto text-base rounded-md transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
                        size="lg" // Make button larger
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </div>
                        ) : 'I’ve made my bank transfer'}
                    </Button>
                    <Button
                        onClick={handlePayLater}
                        disabled={isSubmitting} // Also disable if the other action is in progress
                        variant="outline" // Use outline style
                        className="w-full text-gray-700 font-medium py-3 px-4 h-auto text-base rounded-md border-gray-300 hover:bg-gray-50 transition duration-150 ease-in-out disabled:opacity-60"
                        size="lg" // Make button larger
                    >
                        I’ll transfer my money later
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsPage;