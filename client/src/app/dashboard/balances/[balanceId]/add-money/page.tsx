// "use client";

// import Image from "next/image";
// import { useRouter, useParams } from "next/navigation";
// import React, { useState, useEffect, useCallback } from "react";
// import { AiFillBank } from "react-icons/ai";
// import { IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../../hooks/useAuth";
// import axios from "axios";
// import apiConfig from "../../../../config/apiConfig";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from 'next/link';

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface AddMoneyPageParams {
//     balanceId: string;
// }

// interface CurrencyOption {
//     _id: string;
//     code: string;
// }

// interface PaymentSummary {
//     _id?: string; // _id is optional in summary, will be present after initiateAddMoney
//     amountToPay: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     exchangeRate: number;
//     balanceCurrencyCode: string; // Add these to summary type
//     payInCurrencyCode: string;
//     amountToAdd: number;
//     userId: string;
//     // ... other properties
// }

// const AddMoneyPage = () => {
//     const [amountToAdd, setAmountToAdd] = useState<number | "">("");
//     const [balanceCurrency, setBalanceCurrency] = useState<{
//         code: string;
//     } | null>(null);
//     const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isDetailsLoading, setIsDetailsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();
//     const router = useRouter();
//     const params = useParams<AddMoneyPageParams>();
//     const { balanceId } = params;

//     const payInCurrencyCode = balanceCurrency?.code || "INR";


//     const calculatePaymentSummaryDebounced = useCallback(
//         (amount: number) => {
//             const balCurrencyCode = balanceCurrency?.code;
//             const payinCurrencyCode = balCurrencyCode || "INR";

//             if (balCurrencyCode && payinCurrencyCode && !isNaN(amount) && amount > 0) {
//                 setIsDetailsLoading(true);
//                 setError(null);
//                 axios.post<PaymentSummary>( // Call calculate-summary endpoint for calculation only
//                     "/payments/add-money/calculate-summary",
//                     {
//                         balanceCurrencyCode: balCurrencyCode,
//                         payInCurrencyCode: payinCurrencyCode,
//                         amountToAdd: amount,
//                     },
//                     {
//                         headers: { Authorization: `Bearer ${token}` },
//                     }
//                 )
//                     .then(response => {
//                         setPaymentSummary(response.data);
//                         setIsDetailsLoading(false);
//                     })
//                     .catch(err => {
//                         setError(
//                             err.response?.data?.message || "Failed to calculate payment summary"
//                         );
//                         console.error("Error calculating payment summary:", err);
//                         setPaymentSummary(null);
//                         setIsDetailsLoading(false);
//                     });
//             } else {
//                 setPaymentSummary(null);
//                 setIsDetailsLoading(false);
//             }
//         },
//         [token, balanceCurrency?.code]
//     );


//     useEffect(() => {
//         const fetchBalanceCurrency = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get<{ currency: { code: string } }>(`/accounts/${balanceId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setBalanceCurrency({ code: response.data.currency.code });
//                 setTimeout(() => {
//                     setIsLoading(false);
//                 }, 200);
//             } catch (err: any) {
//                 setError(
//                     err.response?.data?.message || "Failed to load balance currency"
//                 );
//                 setTimeout(() => {
//                     setIsLoading(false);
//                 }, 200);
//                 console.error("Error fetching balance currency:", err);
//             }
//         };

//         fetchBalanceCurrency();
//     }, [balanceId, token]);


//     useEffect(() => {
//         if (typeof amountToAdd === 'number' && !isNaN(amountToAdd) && amountToAdd > 0 && balanceCurrency?.code) {
//             calculatePaymentSummaryDebounced(amountToAdd);
//         } else {
//             setPaymentSummary(null);
//         }
//     }, [amountToAdd, calculatePaymentSummaryDebounced, balanceCurrency?.code]);


//     const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         const numberValue = value === "" ? "" : parseFloat(value);
//         if (!isNaN(numberValue) || value === "") {
//             setAmountToAdd(numberValue);
//         }
//     };


//     const handleContinue = async () => {
//         if (!balanceCurrency || amountToAdd === "" || isNaN(Number(amountToAdd))) {
//             alert("Please enter a valid amount.");
//             return;
//         }

//         setIsLoading(true); // Start loading before API call
//         setError(null);

//         try {
//             const paymentDataToSave = paymentSummary; // Use the calculated summary data to save
//             if (!paymentDataToSave) {
//                 setError("Payment summary is missing. Please enter a valid amount.");
//                 setIsLoading(false);
//                 return;
//             }

//             const initiateResponse = await axios.post<PaymentSummary>( // Call initiate endpoint to save payment
//                 "/payments/add-money/initiate",
//                 paymentDataToSave, // Send the summary data to initiate endpoint for saving
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );

//             const savedPayment = initiateResponse.data; // Payment data now saved in backend
//             if (savedPayment?._id) {
//                 setPaymentSummary(savedPayment); // Store full payment summary with _id (though might not be needed again after redirect)
//                 router.push(
//                     `/dashboard/balances/${balanceId}/payment-details?paymentId=${savedPayment._id}`
//                 );
//             } else {
//                 setError("Failed to initiate payment. Please try again.");
//             }


//         } catch (err: any) {
//             setError(err.response?.data?.message || "Failed to initiate payment");
//             console.error("Error initiating payment:", err);
//         } finally {
//             setIsLoading(false); // End loading after API call (success or failure)
//         }
//     };


//     if (isLoading) {
//         return (
//             <div className="max-w-xl mx-auto p-4 lg:p-8">
//                 <Skeleton className="h-10 w-32 mb-4" />
//                 <Skeleton className="h-8 w-48 mb-8 mx-auto" />
//                 <Skeleton className="h-12 w-full mb-2" />
//                 <Skeleton className="h-16 w-full mb-4" />
//                 <Skeleton className="h-12 w-full mb-2" />
//                 <Skeleton className="h-16 w-full mb-4" />
//                 <Skeleton className="h-6 w-full mb-2" />
//                 <Skeleton className="h-5 w-full mb-2" count={5} />
//                 <Skeleton className="h-12 w-full mt-4" />
//             </div>
//         );
//     }

//     if (error || !balanceCurrency) {
//         return (
//             <div className="max-w-xl mx-auto p-4 lg:p-8 text-red-500">
//                 Error: {error || "Could not load page details."}
//             </div>
//         );
//     }

//     const calculatedAmountToPay = paymentSummary
//         ? parseFloat(paymentSummary.amountToPay).toFixed(2)
//         : isDetailsLoading ? '...' : "0.00";
//     const calculatedWiseFee =
//         paymentSummary?.wiseFee !== undefined
//             ? parseFloat(paymentSummary.wiseFee).toFixed(2)
//             : isDetailsLoading ? '...' : "0.00";
//     const calculatedBankTransferFee =
//         paymentSummary?.bankTransferFee !== undefined
//             ? parseFloat(paymentSummary.bankTransferFee).toFixed(2)
//             : isDetailsLoading ? '...' : "0.00";
//     const totalFees = paymentSummary
//         ? (parseFloat(calculatedWiseFee) + parseFloat(calculatedBankTransferFee)).toFixed(2)
//         : isDetailsLoading ? '...' : "0.00";


//     return (
//         <div className="max-w-xl mx-auto p-4 lg:p-8">
//             <Link href={`/dashboard/balances/${balanceId}`} className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800">
//                 <IoIosArrowBack size={20} /> Pay another way
//             </Link>

//             <h2 className="lg:text-2xl text-xl text-center font-bold text-main mb-8 capitalize">
//                 Add money
//             </h2>

//             <div>
//                 <label
//                     htmlFor="amount"
//                     className="block text-base font-medium text-main"
//                 >
//                     Amount to add to Wise
//                 </label>
//                 {/* Amount Input Fileld */}
//                 <div className="relative mt-1 rounded-md">
//                     <input
//                         name="amount"
//                         id="amount"
//                         className="block w-full rounded-xl ps-5 font-bold md:text-lg text-base text-main focus:outline-none py-4 border border-gray-300 pr-20"
//                         placeholder="0.00"
//                         value={amountToAdd}
//                         onChange={handleAmountChange}
//                         required
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
//                         <div className="px-2 flex items-center md:gap-4 gap-2">
//                             <span className="inline-block rounded-full overflow-hidden">
//                                 <Image
//                                     src={`/assets/icon/${balanceCurrency?.code.toLowerCase()}.svg`}
//                                     alt={`${balanceCurrency?.code} Flag`}
//                                     height={25}
//                                     width={25}
//                                     className="md:size-8 size-6"
//                                 />
//                             </span>
//                             <span className="mr-2 text-gray font-medium md:text-xl text-lg">
//                                 {balanceCurrency?.code}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-4">
//                     <label className="block text-base font-medium text-main">
//                         Paying with
//                     </label>
//                     <div className="border border-gray-300 rounded-xl ps-5 py-4 flex items-center gap-4 mt-1">
//                         <div className="p-2 bg-green/10 rounded-full inline-block">
//                             <AiFillBank className="size-6 text-green-500" />
//                         </div>
//                         <span className="text-main font-semibold capitalize md:text-lg text-base">
//                             Bank transfer
//                         </span>
//                     </div>
//                 </div>

//                 {/* currency calculation */}
//                 <div className="mt-4 border border-gray-300 rounded-xl p-4">
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-gray-700">Currency to pay in</dt>
//                         <dd className="ml-6 text-secondary font-medium">
//                             {payInCurrencyCode}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-gray-700">Bank transfer fee</dt>
//                         <dd className="ml-6 text-gray font-medium">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedBankTransferFee} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-gray-700">Our fee</dt>
//                         <dd className="ml-6 text-gray font-medium">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedWiseFee} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-gray-700 font-medium">Total included fees</dt>
//                         <dd className="ml-6 text-main font-bold">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${totalFees} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-3.5 flex justify-between text-sm text-gray border-t border-gray-300">
//                         <dt className="text-main font-bold capitalize">
//                             Total you'll pay
//                         </dt>
//                         <dd className="ml-6 text-main font-bold">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedAmountToPay} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                 </div>

//                 {/* Continue button for confirm enter value */}
//                 <div className="mt-4">
//                     <button
//                         onClick={handleContinue}
//                         className="w-full bg-primary py-3 inline-block rounded-full font-medium text-lg text-secondary hover:bg-primary-hover cursor-pointer"
//                         disabled={
//                             isLoading || amountToAdd === "" || isNaN(Number(amountToAdd)) || isDetailsLoading
//                         }
//                     >
//                         Continue
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddMoneyPage;


// interface CurrencyOption {
//     _id: string;
//     code: string;
// }


// "use client";

// import Image from "next/image";
// import { useRouter, useParams } from "next/navigation";
// import React, { useState, useEffect, useCallback } from "react";
// import { AiFillBank } from "react-icons/ai";
// import { IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../../hooks/useAuth";
// import axios from "axios";
// import apiConfig from "../../../../config/apiConfig";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from 'next/link';

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface AddMoneyPageParams {
//     balanceId: string;
// }

// interface CurrencyOption {
//     _id: string;
//     code: string;
// }

// interface PaymentSummary {
//     _id?: string; // _id is optional in summary, will be present after initiateAddMoney
//     amountToPay: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     exchangeRate: number;
//     balanceCurrencyCode: string; // Add these to summary type
//     payInCurrencyCode: string;
//     amountToAdd: number;
//     userId: string;
//     // ... other properties
// }

// const AddMoneyPage = () => {
//     const [amountToAdd, setAmountToAdd] = useState<number | "">("");
//     const [balanceCurrency, setBalanceCurrency] = useState<{
//         code: string;
//     } | null>(null);
//     const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isDetailsLoading, setIsDetailsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();
//     const router = useRouter();
//     const params = useParams<AddMoneyPageParams>();
//     const { balanceId } = params;

//     // Dynamically set payInCurrencyCode from balanceCurrency.code or default to "USD" if balanceCurrency is not yet loaded
//     const payInCurrencyCode = balanceCurrency?.code || "USD";

//     const calculatePaymentSummaryDebounced = useCallback(
//         (amount: number) => {
//             const balCurrencyCode = balanceCurrency?.code;

//             if (balCurrencyCode && payInCurrencyCode && !isNaN(amount) && amount > 0) {
//                 setIsDetailsLoading(true);
//                 setError(null);
//                 axios.post<PaymentSummary>( // Call calculate-summary endpoint for calculation only
//                     "/payments/add-money/calculate-summary",
//                     {
//                         balanceCurrencyCode: balCurrencyCode,
//                         payInCurrencyCode: payInCurrencyCode,
//                         amountToAdd: amount,
//                     },
//                     {
//                         headers: { Authorization: `Bearer ${token}` },
//                     }
//                 )
//                     .then(response => {
//                         setPaymentSummary(response.data);
//                         setIsDetailsLoading(false);
//                     })
//                     .catch(err => {
//                         setError(
//                             err.response?.data?.message || "Failed to calculate payment summary"
//                         );
//                         console.error("Error calculating payment summary:", err);
//                         setPaymentSummary(null);
//                         setIsDetailsLoading(false);
//                     });
//             } else {
//                 setPaymentSummary(null);
//                 setIsDetailsLoading(false);
//             }
//         },
//         [token, balanceCurrency?.code, payInCurrencyCode] // Include payInCurrencyCode in dependency array
//     );


//     useEffect(() => {
//         const fetchBalanceCurrency = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get<{ currency: { code: string } }>(`/accounts/${balanceId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setBalanceCurrency({ code: response.data.currency.code });
//                 setTimeout(() => {
//                     setIsLoading(false);
//                 }, 200);
//             } catch (err: any) {
//                 setError(
//                     err.response?.data?.message || "Failed to load balance currency"
//                 );
//                 setTimeout(() => {
//                     setIsLoading(false);
//                 }, 200);
//                 console.error("Error fetching balance currency:", err);
//             }
//         };

//         fetchBalanceCurrency();
//     }, [balanceId, token]);


//     useEffect(() => {
//         if (typeof amountToAdd === 'number' && !isNaN(amountToAdd) && amountToAdd > 0 && balanceCurrency?.code) {
//             calculatePaymentSummaryDebounced(amountToAdd);
//         } else {
//             setPaymentSummary(null);
//         }
//     }, [amountToAdd, calculatePaymentSummaryDebounced, balanceCurrency?.code]);


//     const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         const numberValue = value === "" ? "" : parseFloat(value);
//         if (!isNaN(numberValue) || value === "") {
//             setAmountToAdd(numberValue);
//         }
//     };


//     const handleContinue = async () => {
//         if (!balanceCurrency || amountToAdd === "" || isNaN(Number(amountToAdd))) {
//             alert("Please enter a valid amount.");
//             return;
//         }
    
//         setIsLoading(true); // Start loading before API call
//         setError(null);
    
//         try {
//             const paymentDataToSave = paymentSummary; // Use the calculated summary data to save
//             if (!paymentDataToSave) {
//                 setError("Payment summary is missing. Please enter a valid amount.");
//                 setIsLoading(false);
//                 return;
//             }
    
//             const initiateResponse = await axios.post<PaymentSummary>( // Call initiate endpoint to save payment
//                 "/payments/add-money/initiate",
//                 paymentDataToSave, // Send the summary data to initiate endpoint for saving
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
    
//             const savedPayment = initiateResponse.data; // Payment data now saved in backend
//             if (savedPayment?._id) {
//                 setPaymentSummary(savedPayment); // Store full payment summary with _id (though might not be needed again after redirect)
//                 router.push(
//                     `/dashboard/balances/${balanceId}/payment-details?paymentId=${savedPayment._id}`
//                 );
//             } else {
//                 setError("Failed to initiate payment. Please try again.");
//             }
    
    
//         } catch (err: any) {
//             setError(err.response?.data?.message || "Failed to initiate payment");
//             console.error("Error initiating payment:", err);
//         } finally {
//             setIsLoading(false); // End loading after API call (success or failure)
//         }
//     };


//     if (isLoading) {
//         return (
//             <div className="max-w-xl mx-auto p-4 lg:p-8">
//                 <Skeleton className="h-10 w-32 mb-4" />
//                 <Skeleton className="h-8 w-48 mb-8 mx-auto" />
//                 <Skeleton className="h-12 w-full mb-2" />
//                 <Skeleton className="h-16 w-full mb-4" />
//                 <Skeleton className="h-12 w-full mb-2" />
//                 <Skeleton className="h-16 w-full mb-4" />
//                 <Skeleton className="h-6 w-full mb-2" />
//                 <Skeleton className="h-5 w-full mb-2" count={5} />
//                 <Skeleton className="h-12 w-full mt-4" />
//             </div>
//         );
//     }

//     if (error || !balanceCurrency) {
//         return (
//             <div className="max-w-xl mx-auto p-4 lg:p-8 text-red-500">
//                 Error: {error || "Could not load page details."}
//             </div>
//         );
//     }

//     const calculatedAmountToPay = paymentSummary
//         ? parseFloat(paymentSummary.amountToPay).toFixed(2)
//         : isDetailsLoading ? '...' : "0.00";
//     const calculatedWiseFee =
//         paymentSummary?.wiseFee !== undefined
//             ? parseFloat(paymentSummary.wiseFee).toFixed(2)
//             : isDetailsLoading ? '...' : "0.00";
//     const calculatedBankTransferFee =
//         paymentSummary?.bankTransferFee !== undefined
//             ? parseFloat(paymentSummary.bankTransferFee).toFixed(2)
//             : isDetailsLoading ? '...' : "0.00";
//     const totalFees = paymentSummary
//         ? (parseFloat(calculatedWiseFee) + parseFloat(calculatedBankTransferFee)).toFixed(2)
//         : isDetailsLoading ? '...' : "0.00";


//     return (
//         <div className="max-w-xl mx-auto p-4 lg:p-8">
//             <Link href={`/dashboard/balances/${balanceId}`} className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800">
//                 <IoIosArrowBack size={20} /> Pay another way
//             </Link>

//             <h2 className="lg:text-2xl text-xl text-center font-bold text-main mb-8 capitalize">
//                 Add money
//             </h2>

//             <div>
//                 <label
//                     htmlFor="amount"
//                     className="block text-base font-medium text-main"
//                 >
//                     Amount to add to Wise
//                 </label>
//                 {/* Amount Input Fileld */}
//                 <div className="relative mt-1 rounded-md">
//                     <input
//                         name="amount"
//                         id="amount"
//                         className="block w-full rounded-xl ps-5 font-bold md:text-lg text-base text-main focus:outline-none py-4 border border-gray-300 pr-20"
//                         placeholder="0.00"
//                         value={amountToAdd}
//                         onChange={handleAmountChange}
//                         required
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
//                         <div className="px-2 flex items-center md:gap-4 gap-2">
//                             <span className="inline-block rounded-full overflow-hidden">
//                                 <Image
//                                     src={`/assets/icon/${balanceCurrency?.code?.toLowerCase()}.svg`}
//                                     alt={`${balanceCurrency?.code} Flag`}
//                                     height={25}
//                                     width={25}
//                                     className="md:size-8 size-6"
//                                 />
//                             </span>
//                             <span className="mr-2 text-gray font-medium md:text-xl text-lg">
//                                 {balanceCurrency?.code}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-4">
//                     <label className="block text-base font-medium text-main">
//                         Paying with
//                     </label>
//                     <div className="border border-gray-300 rounded-xl ps-5 py-4 flex items-center gap-4 mt-1">
//                         <div className="p-2 bg-green/10 rounded-full inline-block">
//                             <AiFillBank className="size-6 text-green-500" />
//                         </div>
//                         <span className="text-main font-semibold capitalize md:text-lg text-base">
//                             Bank transfer
//                         </span>
//                     </div>
//                 </div>

//                 {/* currency calculation */}
//                 <div className="mt-4 border border-gray-300 rounded-xl p-4">
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-gray-700">Currency to pay in</dt>
//                         <dd className="ml-6 text-secondary font-medium">
//                             {payInCurrencyCode}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-gray-700">Bank transfer fee</dt>
//                         <dd className="ml-6 text-gray font-medium">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedBankTransferFee} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-gray-700">Our fee</dt>
//                         <dd className="ml-6 text-gray font-medium">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedWiseFee} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-gray-700 font-medium">Total included fees</dt>
//                         <dd className="ml-6 text-main font-bold">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${totalFees} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-3.5 flex justify-between text-sm text-gray border-t border-gray-300">
//                         <dt className="text-main font-bold capitalize">
//                             Total you'll pay
//                         </dt>
//                         <dd className="ml-6 text-main font-bold">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedAmountToPay} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                 </div>

//                 {/* Continue button for confirm enter value */}
//                 <div className="mt-4">
//                     <button
//                         onClick={handleContinue}
//                         className="w-full bg-primary py-3 inline-block rounded-full font-medium text-lg text-secondary hover:bg-primary-hover cursor-pointer"
//                         disabled={
//                             isLoading || amountToAdd === "" || isNaN(Number(amountToAdd)) || isDetailsLoading
//                         }
//                     >
//                         Continue
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddMoneyPage;


// interface CurrencyOption {
//     _id: string;
//     code: string;
// }

"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { AiFillBank } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import apiConfig from "../../../../config/apiConfig";
import { Skeleton } from "@/components/ui/skeleton";
import Link from 'next/link';

axios.defaults.baseURL = apiConfig.baseUrl;

interface AddMoneyPageParams {
    balanceId: string;
}

interface CurrencyOption {
    _id: string;
    code: string;
}

interface PaymentSummary {
    _id?: string; // _id is optional in summary, will be present after initiateAddMoney
    amountToPay: number;
    wiseFee: number;
    bankTransferFee: number;
    exchangeRate: number;
    balanceCurrencyCode: string; // Add these to summary type
    payInCurrencyCode: string;
    amountToAdd: number;
    userId: string;
    // ... other properties
}

const AddMoneyPage = () => {
    const [amountToAdd, setAmountToAdd] = useState<number | "">("");
    const [balanceCurrency, setBalanceCurrency] = useState<{
        code: string;
    } | null>(null);
    const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDetailsLoading, setIsDetailsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();
    const router = useRouter();
    const params = useParams<AddMoneyPageParams>();
    const { balanceId } = params;

    // Dynamically set payInCurrencyCode from balanceCurrency.code or default to "USD" if balanceCurrency is not yet loaded
    const payInCurrencyCode = balanceCurrency?.code || "USD";

    const calculatePaymentSummaryDebounced = useCallback(
        (amount: number) => {
            const balCurrencyCode = balanceCurrency?.code;

            if (balCurrencyCode && payInCurrencyCode && !isNaN(amount) && amount > 0) {
                setIsDetailsLoading(true);
                setError(null);
                axios.post<PaymentSummary>( // Call calculate-summary endpoint for calculation only
                    "/payments/add-money/calculate-summary", // ADD /api prefix here
                    {
                        balanceCurrencyCode: balCurrencyCode,
                        payInCurrencyCode: payInCurrencyCode,
                        amountToAdd: amount,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                    .then(response => {
                        setPaymentSummary(response.data);
                        setIsDetailsLoading(false);
                    })
                    .catch(err => {
                        setError(
                            err.response?.data?.message || "Failed to calculate payment summary"
                        );
                        console.error("Error calculating payment summary:", err);
                        setPaymentSummary(null);
                        setIsDetailsLoading(false);
                    });
            } else {
                setPaymentSummary(null);
                setIsDetailsLoading(false);
            }
        },
        [token, balanceCurrency?.code, payInCurrencyCode] // Include payInCurrencyCode in dependency array
    );


    useEffect(() => {
        const fetchBalanceCurrency = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get<{ currency: { code: string } }>(`/accounts/${balanceId}`, { // ADD /api prefix here
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBalanceCurrency({ code: response.data.currency.code });
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            } catch (err: any) {
                setError(
                    err.response?.data?.message || "Failed to load balance currency"
                );
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
                console.error("Error fetching balance currency:", err);
            }
        };

        fetchBalanceCurrency();
    }, [balanceId, token]);


    useEffect(() => {
        if (typeof amountToAdd === 'number' && !isNaN(amountToAdd) && amountToAdd > 0 && balanceCurrency?.code) {
            calculatePaymentSummaryDebounced(amountToAdd);
        } else {
            setPaymentSummary(null);
        }
    }, [amountToAdd, calculatePaymentSummaryDebounced, balanceCurrency?.code]);


    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = value === "" ? "" : parseFloat(value);
        if (!isNaN(numberValue) || value === "") {
            setAmountToAdd(numberValue);
        }
    };


    const handleContinue = async () => {
        if (!balanceCurrency || amountToAdd === "" || isNaN(Number(amountToAdd))) {
            alert("Please enter a valid amount.");
            return;
        }

        setIsLoading(true); // Start loading before API call
        setError(null);

        try {
            const paymentDataToSave = paymentSummary; // Use the calculated summary data to save
            if (!paymentDataToSave) {
                setError("Payment summary is missing. Please enter a valid amount.");
                setIsLoading(false);
                return;
            }

            const initiateResponse = await axios.post<PaymentSummary>( // Call initiate endpoint to save payment
                "/payments/add-money/initiate", // ADD /api prefix here
                paymentDataToSave, // Send the summary data to initiate endpoint for saving
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const savedPayment = initiateResponse.data; // Payment data now saved in backend
            if (savedPayment?._id) {
                setPaymentSummary(savedPayment); // Store full payment summary with _id (though might not be needed again after redirect)
                router.push(
                    `/dashboard/balances/${balanceId}/payment-details?paymentId=${savedPayment._id}`
                );
            } else {
                setError("Failed to initiate payment. Please try again.");
            }


        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to initiate payment");
            console.error("Error initiating payment:", err);
        } finally {
            setIsLoading(false); // End loading after API call (success or failure)
        }
    };


    if (isLoading) {
        return (
            <div className="max-w-xl mx-auto p-4 lg:p-8">
                <Skeleton className="h-10 w-32 mb-4" />
                <Skeleton className="h-8 w-48 mb-8 mx-auto" />
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-5 w-full mb-2" count={5} />
                <Skeleton className="h-12 w-full mt-4" />
            </div>
        );
    }

    if (error || !balanceCurrency) {
        return (
            <div className="max-w-xl mx-auto p-4 lg:p-8 text-red-500">
                Error: {error || "Could not load page details."}
            </div>
        );
    }

    const calculatedAmountToPay = paymentSummary
        ? parseFloat(paymentSummary.amountToPay).toFixed(2)
        : isDetailsLoading ? '...' : "0.00";
    const calculatedWiseFee =
        paymentSummary?.wiseFee !== undefined
            ? parseFloat(paymentSummary.wiseFee).toFixed(2)
            : isDetailsLoading ? '...' : "0.00";
    const calculatedBankTransferFee =
        paymentSummary?.bankTransferFee !== undefined
            ? parseFloat(paymentSummary.bankTransferFee).toFixed(2)
            : isDetailsLoading ? '...' : "0.00";
    const totalFees = paymentSummary
        ? (parseFloat(calculatedWiseFee) + parseFloat(calculatedBankTransferFee)).toFixed(2)
        : isDetailsLoading ? '...' : "0.00";


    return (
        <div className="max-w-xl mx-auto p-4 lg:p-8">
            <Link href={`/dashboard/balances/${balanceId}`} className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800">
                <IoIosArrowBack size={20} /> Pay another way
            </Link>

            <h2 className="lg:text-2xl text-xl text-center font-bold text-main mb-8 capitalize">
                Add money
            </h2>

            <div>
                <label
                    htmlFor="amount"
                    className="block text-base font-medium text-main"
                >
                    Amount to add to Wise
                </label>
                {/* Amount Input Fileld */}
                <div className="relative mt-1 rounded-md">
                    <input
                        name="amount"
                        id="amount"
                        className="block w-full rounded-xl ps-5 font-bold md:text-lg text-base text-main focus:outline-none py-4 border border-gray-300 pr-20"
                        placeholder="0.00"
                        value={amountToAdd}
                        onChange={handleAmountChange}
                        required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                        <div className="px-2 flex items-center md:gap-4 gap-2">
                            <span className="inline-block rounded-full overflow-hidden">
                                <Image
                                    src={`/assets/icon/${balanceCurrency?.code?.toLowerCase()}.svg`}
                                    alt={`${balanceCurrency?.code} Flag`}
                                    height={25}
                                    width={25}
                                    className="md:size-8 size-6"
                                />
                            </span>
                            <span className="mr-2 text-gray font-medium md:text-xl text-lg">
                                {balanceCurrency?.code}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-base font-medium text-main">
                        Paying with
                    </label>
                    <div className="border border-gray-300 rounded-xl ps-5 py-4 flex items-center gap-4 mt-1">
                        <div className="p-2 bg-green/10 rounded-full inline-block">
                            <AiFillBank className="size-6 text-green-500" />
                        </div>
                        <span className="text-main font-semibold capitalize md:text-lg text-base">
                            Bank transfer
                        </span>
                    </div>
                </div>

                {/* currency calculation */}
                <div className="mt-4 border border-gray-300 rounded-xl p-4">
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-gray-700">Currency to pay in</dt>
                        <dd className="ml-6 text-secondary font-medium">
                            {payInCurrencyCode}
                        </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-gray-700">Bank transfer fee</dt>
                        <dd className="ml-6 text-gray font-medium">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedBankTransferFee} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-gray-700">Our fee</dt>
                        <dd className="ml-6 text-gray font-medium">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedWiseFee} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-gray-700 font-medium">Total included fees</dt>
                        <dd className="ml-6 text-main font-bold">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${totalFees} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                    <div className="py-3.5 flex justify-between text-sm text-gray border-t border-gray-300">
                        <dt className="text-main font-bold capitalize">
                            Total you'll pay
                        </dt>
                        <dd className="ml-6 text-main font-bold">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedAmountToPay} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                </div>

                {/* Continue button for confirm enter value */}
                <div className="mt-4">
                    <button
                        onClick={handleContinue}
                        className="w-full bg-primary py-3 inline-block rounded-full font-medium text-lg text-secondary hover:bg-primary-hover cursor-pointer"
                        disabled={
                            isLoading || amountToAdd === "" || isNaN(Number(amountToAdd)) || isDetailsLoading
                        }
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMoneyPage;


interface CurrencyOption {
    _id: string;
    code: string;
}