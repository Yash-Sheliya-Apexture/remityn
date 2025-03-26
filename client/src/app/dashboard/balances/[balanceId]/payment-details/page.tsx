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


'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth } from '../../../../hooks/useAuth';
import axios from 'axios';
import apiConfig from '../../../../config/apiConfig';

axios.defaults.baseURL = apiConfig.baseUrl;

interface PaymentDetailsPageParams {
    balanceId: string;
}

interface PaymentDetails {
    _id: string;
    user: string;
    balanceCurrency: any;
    payInCurrency: any;
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
    __v: number;
}

const PaymentDetailsPage = () => {
    const params = useParams<PaymentDetailsPageParams>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { balanceId } = params;
    const paymentId = searchParams.get('paymentId');
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (!paymentId) {
                    setError("Payment ID is missing.");
                    setIsLoading(false);
                    return;
                }
                const response = await axios.get(`/payments/${paymentId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPaymentDetails(response.data as PaymentDetails);
                setIsLoading(false);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load payment details');
                setIsLoading(false);
                console.error("Error fetching payment details:", err);
                if (err.response?.status === 404) {
                    router.push('/dashboard');
                }
            }
        };

        fetchPaymentDetails();
    }, [paymentId, token, router]);

    if (isLoading) {
        return <div>Loading payment details...</div>;
    }

    if (error || !paymentDetails) {
        return <div className="text-red-500">Error: {error || "Payment details not found."}</div>;
    }

    const payInCurrencyCode = paymentDetails.payInCurrency.code;
    const amountToPay = parseFloat(paymentDetails.amountToPay).toFixed(2);
    const bankDetails = paymentDetails.bankDetails || {};

    const handleCopyToClipboard = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`${fieldName} copied to clipboard!`); // Simple alert for feedback
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert(`Failed to copy ${fieldName}. Please copy manually.`);
        });
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => router.back()} className="mb-4 flex items-center gap-2">
                <IoIosArrowBack size={20} /> Pay another way
            </button>

            <div className="bg-white rounded-2xl p-6 shadow-md max-w-lg mx-auto">
                <h2 className="text-xl font-semibold mb-6">Use your bank to make a payment to Wise</h2>
                <p className="text-gray-700 mb-4">Make a European (SEPA) payment — not an international one — using the details below.</p>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Details you’ll need to make this transfer</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Payee name</p>
                                <p className="font-semibold">{bankDetails.payeeName || 'Wise'}</p>
                            </div>
                            <button onClick={() => handleCopyToClipboard(bankDetails.payeeName || 'Wise', 'Payee name')} className="text-green-500 hover:underline text-sm">Copy</button>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Reference code</p>
                                <p className="font-semibold">{paymentDetails.referenceCode}</p>
                            </div>
                            <button onClick={() => handleCopyToClipboard(paymentDetails.referenceCode, 'Reference code')} className="text-green-500 hover:underline text-sm">Copy</button>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">IBAN</p>
                                <p className="font-semibold">{bankDetails.iban || 'IBAN Placeholder'}</p>
                            </div>
                            <button onClick={() => handleCopyToClipboard(bankDetails.iban || 'IBAN Placeholder', 'IBAN')} className="text-green-500 hover:underline text-sm">Copy</button>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Bank code (BIC/SWIFT)</p>
                                <p className="font-semibold">{bankDetails.bicSwift || 'BIC/SWIFT Placeholder'}</p>
                            </div>
                            <button onClick={() => handleCopyToClipboard(bankDetails.bicSwift || 'BIC/SWIFT Placeholder', 'BIC/SWIFT')} className="text-green-500 hover:underline text-sm">Copy</button>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Amount to send ({payInCurrencyCode})</p>
                                <p className="font-semibold">{amountToPay} {payInCurrencyCode}</p>
                            </div>
                            <button onClick={() => handleCopyToClipboard(`${amountToPay} ${payInCurrencyCode}`, 'Amount to send')} className="text-green-500 hover:underline text-sm">Copy</button>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Our bank’s address</h3>
                    <div className="bg-gray-100 p-4 rounded-md whitespace-pre-line">
                        {bankDetails.bankAddress || 'Bank Address Placeholder'}
                    </div>
                </div>

                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">Need more help?</span>
                        <a href="#" className="text-green-500 hover:underline text-sm">Download PDF</a>
                    </div>
                    <button className="text-green-500 hover:underline text-sm">Download PDF</button>
                </div>

                <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3">
                    I’ve made my bank transfer
                </button>
                <button className="w-full text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-300">
                    I’ll transfer my money later
                </button>
            </div>
        </div>
    );
};

export default PaymentDetailsPage;