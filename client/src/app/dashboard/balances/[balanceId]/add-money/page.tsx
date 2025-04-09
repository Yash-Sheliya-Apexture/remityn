// // app/dashboard/balances/[balanceId]/add-money/page.tsx
// "use client";

// import Image from "next/image";
// import { useRouter, useParams } from "next/navigation";
// import React, { useState, useEffect, useCallback } from "react";
// import { AiFillBank } from "react-icons/ai";
// import { useAuth } from "../../../../hooks/useAuth";
// import axios from "axios"; // Keep axios import for type checking
// import apiConfig from "../../../../config/apiConfig";
// import { Skeleton } from "@/components/ui/skeleton";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface AddMoneyPageParams {
//     balanceId: string;
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
//                     "/payments/add-money/calculate-summary", // ADD /api prefix here
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
//                         let errorMessage = "Failed to calculate payment summary";
//                         if (axios.isAxiosError(err)) {
//                             errorMessage = err.response?.data?.message || errorMessage;
//                         }
//                         setError(errorMessage);
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
//                 const response = await axios.get<{ currency: { code: string } }>(`/accounts/${balanceId}`, { // ADD /api prefix here
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setBalanceCurrency({ code: response.data.currency.code });
//                 setTimeout(() => {
//                     setIsLoading(false);
//                 }, 200);
//             } catch (err: unknown) { // Changed 'any' to 'unknown'
//                 let errorMessage = "Failed to load balance currency";
//                  if (axios.isAxiosError(err)) { // Type check for AxiosError
//                      errorMessage = err.response?.data?.message || errorMessage;
//                  } else if (err instanceof Error) {
//                      errorMessage = err.message;
//                  }
//                 setError(errorMessage);
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
//                 "/payments/add-money/initiate", // ADD /api prefix here
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


//         } catch (err: unknown) { // Changed 'any' to 'unknown'
//             let errorMessage = "Failed to initiate payment";
//             if (axios.isAxiosError(err)) { // Type check for AxiosError
//                 errorMessage = err.response?.data?.message || errorMessage;
//             } else if (err instanceof Error) {
//                 errorMessage = err.message;
//             }
//             setError(errorMessage);
//             console.error("Error initiating payment:", err);
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     if (isLoading) {
//         return (
//             <div className="max-w-xl mx-auto p-4 lg:p-8">
//                 <Skeleton className="h-8 w-48 mb-8 mx-auto" />
//                 <Skeleton className="h-12 w-full mb-2" />
//                 <Skeleton className="h-16 w-full mb-4" />
//                 <Skeleton className="h-12 w-full mb-2" />
//                 <Skeleton className="h-16 w-full mb-4" />
//                 <Skeleton className="h-6 w-full mb-2" />
//                 {/* Adjusted skeleton count */}
//                 {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-5 w-full mb-2" />)}
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
//             <h2 className="sm:text-3xl text-2xl text-center font-semibold text-mainheading mb-6 dark:text-white">
//                 Add Money
//             </h2>

//             <div>
//                 <label
//                     htmlFor="amount"
//                     className="block text-base font-medium text-mainheading dark:text-white"
//                 >
//                     Amount to add to Wise
//                 </label>
//                 {/* Amount Input Fileld */}
//                 <div className="relative mt-1 rounded-md">
//                     <input
//                         name="amount"
//                         id="amount"
//                         className="block w-full text-xl rounded-xl ps-2 font-bold h-18 py-3 pl-5 pr-28 border border-gray-300 dark:border-lightgray/26 transition-shadow ease-in-out duration-300 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-400 dark:placeholder:text-neutral-700"
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
//                                     className="md:size-7 size-6"
//                                 />
//                             </span>
//                             <span className="mr-2 text-neutral-700 dark:text-white font-bold md:text-xl text-lg">
//                                 {balanceCurrency?.code}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-4">
//                     <label className="block text-base font-medium text-neutral-900 dark:text-white">
//                         Paying with
//                     </label>
//                     <div className="border border-gray-300 dark:border-lightgray/26 rounded-xl ps-5 py-4 flex items-center gap-4 mt-1">
//                         <div className="p-2 bg-green-500/20 rounded-full inline-block">
//                             <AiFillBank className="size-7 text-green-500" />
//                         </div>
//                         <span className="text-neutral-900 dark:text-white  font-semibold capitalize md:text-lg text-base">
//                             Bank transfer
//                         </span>
//                     </div>
//                 </div>

//                 {/* currency calculation */}
//                 <div className="mt-4 border border-gray-300 dark:border-lightgray/26 rounded-xl p-4">
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 ">Currency to pay in</dt>
//                         <dd className="ml-6 text-secondary dark:text-gray-300 font-bold">
//                             {payInCurrencyCode}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 ">Bank transfer fee</dt>
//                         <dd className="ml-6 text-neutral-700 dark:text-gray-300  font-medium">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedBankTransferFee} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 ">Our fee</dt>
//                         <dd className="ml-6 text-neutral-700 dark:text-gray-300 font-medium">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedWiseFee} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 font-medium">Total included fees</dt>
//                         <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${totalFees} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-3.5 flex justify-between text-sm text-gray border-t dark:border-lightgray/26">
//                         <dt className="text-neutral-900 dark:text-white font-bold capitalize">
//                             Total you'll pay
//                         </dt>
//                         <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedAmountToPay} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                 </div>

//                 {/* Continue button for confirm enter value */}
//                 <div className="mt-4">
//                     <button
//                         onClick={handleContinue}
//                         className="w-full bg-primary text-neutral-900 hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer"
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



// // app/dashboard/balances/[balanceId]/add-money/page.tsx
// "use client";

// import Image from "next/image";
// import { useRouter, useParams } from "next/navigation";
// import React, { useState, useEffect, useCallback } from "react";
// import { AiFillBank } from "react-icons/ai";
// import { useAuth } from "../../../../hooks/useAuth";
// import axios from "axios"; // Keep axios import for type checking
// import apiConfig from "../../../../config/apiConfig";
// import { Skeleton } from "@/components/ui/skeleton";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface AddMoneyPageParams {
//     balanceId: string;
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
//                     "/payments/add-money/calculate-summary", // ADD /api prefix here
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
//                         let errorMessage = "Failed to calculate payment summary";
//                         if (axios.isAxiosError(err)) {
//                             errorMessage = err.response?.data?.message || errorMessage;
//                         }
//                         setError(errorMessage);
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
//                 const response = await axios.get<{ currency: { code: string } }>(`/accounts/${balanceId}`, { // ADD /api prefix here
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setBalanceCurrency({ code: response.data.currency.code });
//                 setTimeout(() => {
//                     setIsLoading(false);
//                 }, 200);
//             } catch (err: unknown) { // Changed 'any' to 'unknown'
//                 let errorMessage = "Failed to load balance currency";
//                  if (axios.isAxiosError(err)) { // Type check for AxiosError
//                      errorMessage = err.response?.data?.message || errorMessage;
//                  } else if (err instanceof Error) {
//                      errorMessage = err.message;
//                  }
//                 setError(errorMessage);
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
//                 "/payments/add-money/initiate", // ADD /api prefix here
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


//         } catch (err: unknown) { // Changed 'any' to 'unknown'
//             let errorMessage = "Failed to initiate payment";
//             if (axios.isAxiosError(err)) { // Type check for AxiosError
//                 errorMessage = err.response?.data?.message || errorMessage;
//             } else if (err instanceof Error) {
//                 errorMessage = err.message;
//             }
//             setError(errorMessage);
//             console.error("Error initiating payment:", err);
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     if (isLoading) {
//         return (
//             <div className="max-w-xl mx-auto p-4 lg:p-8">
//                 <Skeleton className="h-8 w-48 mb-8 mx-auto" />
//                 <Skeleton className="h-12 w-full mb-2" />
//                 <Skeleton className="h-16 w-full mb-4" />
//                 <Skeleton className="h-12 w-full mb-2" />
//                 <Skeleton className="h-16 w-full mb-4" />
//                 <Skeleton className="h-6 w-full mb-2" />
//                 {/* Adjusted skeleton count */}
//                 {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-5 w-full mb-2" />)}
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
//             <h2 className="sm:text-3xl text-2xl text-center font-semibold text-mainheading mb-6 dark:text-white">
//                 Add Money
//             </h2>

//             <div>
//                 <label
//                     htmlFor="amount"
//                     className="block text-base font-medium text-mainheading dark:text-white"
//                 >
//                     Amount to add to Wise
//                 </label>
//                 {/* Amount Input Fileld */}
//                 <div className="relative mt-1 rounded-md">
//                     <input
//                         name="amount"
//                         id="amount"
//                         className="block w-full text-xl rounded-xl ps-2 font-bold h-18 py-3 pl-5 pr-28 border border-gray-300 dark:border-lightgray/26 transition-shadow ease-in-out duration-300 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-400 dark:placeholder:text-neutral-700"
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
//                                     className="md:size-7 size-6"
//                                 />
//                             </span>
//                             <span className="mr-2 text-neutral-700 dark:text-white font-bold md:text-xl text-lg">
//                                 {balanceCurrency?.code}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-4">
//                     <label className="block text-base font-medium text-neutral-900 dark:text-white">
//                         Paying with
//                     </label>
//                     <div className="border border-gray-300 dark:border-lightgray/26 rounded-xl ps-5 py-4 flex items-center gap-4 mt-1">
//                         <div className="p-2 bg-green-500/20 rounded-full inline-block">
//                             <AiFillBank className="size-7 text-green-500" />
//                         </div>
//                         <span className="text-neutral-900 dark:text-white  font-semibold capitalize md:text-lg text-base">
//                             Bank transfer
//                         </span>
//                     </div>
//                 </div>

//                 {/* currency calculation */}
//                 <div className="mt-4 border border-gray-300 dark:border-lightgray/26 rounded-xl p-4">
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 ">Currency to pay in</dt>
//                         <dd className="ml-6 text-secondary dark:text-gray-300 font-bold">
//                             {payInCurrencyCode}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 ">Bank transfer fee</dt>
//                         <dd className="ml-6 text-neutral-700 dark:text-gray-300  font-medium">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedBankTransferFee} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 ">Our fee</dt>
//                         <dd className="ml-6 text-neutral-700 dark:text-gray-300 font-medium">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedWiseFee} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 font-medium">Total included fees</dt>
//                         <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${totalFees} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-3.5 flex justify-between text-sm text-gray border-t dark:border-lightgray/26">
//                         {/* FIX: Changed you'll to you'll */}
//                         <dt className="text-neutral-900 dark:text-white font-bold capitalize">
//                             Total you&apos;ll pay
//                         </dt>
//                         <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedAmountToPay} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                 </div>

//                 {/* Continue button for confirm enter value */}
//                 <div className="mt-4">
//                     <button
//                         onClick={handleContinue}
//                         className="w-full bg-primary text-neutral-900 hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer"
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




// app/dashboard/balances/[balanceId]/add-money/page.tsx
"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { AiFillBank } from "react-icons/ai";
// Import the hook from its central location (adjust path as needed)
import { useAuth } from "../../../../contexts/AuthContext"; // Or wherever your AuthContext/useAuth is
import axios from "axios"; // Keep axios import for type checking
import apiConfig from "../../../../config/apiConfig";
import { Skeleton } from "@/components/ui/skeleton";

axios.defaults.baseURL = apiConfig.baseUrl;

interface AddMoneyPageParams {
    balanceId: string;
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
    const { token } = useAuth(); // Uses the imported hook
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
                // FIX: Added /api prefix
                axios.post<PaymentSummary>(
                    "/payments/add-money/calculate-summary",
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
                        let errorMessage = "Failed to calculate payment summary";
                        if (axios.isAxiosError(err)) {
                            errorMessage = err.response?.data?.message || errorMessage;
                        }
                        setError(errorMessage);
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
            if (!token || !balanceId) return; // Prevent fetch if token or id is missing
            setIsLoading(true);
            setError(null);
            try {
                // FIX: Added /api prefix
                const response = await axios.get<{ currency: { code: string } }>(`/accounts/${balanceId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBalanceCurrency({ code: response.data.currency.code });
                // Removed setTimeout, loading state handles UI
                setIsLoading(false);
            } catch (err: unknown) { // Changed 'any' to 'unknown'
                let errorMessage = "Failed to load balance currency";
                 if (axios.isAxiosError(err)) { // Type check for AxiosError
                     errorMessage = err.response?.data?.message || errorMessage;
                 } else if (err instanceof Error) {
                     errorMessage = err.message;
                 }
                setError(errorMessage);
                 // Removed setTimeout
                setIsLoading(false);
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
        // Allow empty string or valid numbers (including 0 temporarily before calculation triggers)
        if (value === "" || (!isNaN(numberValue) && numberValue >= 0)) {
             setAmountToAdd(numberValue);
         }
    };


    const handleContinue = async () => {
        // Ensure amount is a positive number
        if (!balanceCurrency || amountToAdd === "" || isNaN(Number(amountToAdd)) || Number(amountToAdd) <= 0) {
            alert("Please enter a valid positive amount.");
            return;
        }
         // Ensure payment summary is calculated and available
        if (!paymentSummary || isDetailsLoading) {
            setError("Payment details are still calculating or missing. Please wait or re-enter the amount.");
            return;
        }


        setIsLoading(true); // Use main loading indicator for final action
        setError(null);

        try {
             // paymentSummary already contains all necessary calculated fields from calculate-summary endpoint
            const paymentDataToSave = {
                ...paymentSummary, // Use the data from state
                amountToAdd: Number(amountToAdd), // Ensure amountToAdd is a number
                balanceId: balanceId, // Add balanceId if needed by backend initiate endpoint
                // Add any other required fields for initiation
            };


            // FIX: Added /api prefix
            const initiateResponse = await axios.post<PaymentSummary>(
                "/payments/add-money/initiate",
                paymentDataToSave, // Send the calculated summary data + any extra needed fields
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const savedPayment = initiateResponse.data; // Payment data now saved in backend
            if (savedPayment?._id) {
                // No need to setPaymentSummary again if redirecting immediately
                router.push(
                    `/dashboard/balances/${balanceId}/payment-details?paymentId=${savedPayment._id}`
                );
            } else {
                setError("Failed to initiate payment. Missing payment ID in response.");
                 setIsLoading(false); // Stop loading on specific failure
            }

        } catch (err: unknown) { // Changed 'any' to 'unknown'
            let errorMessage = "Failed to initiate payment";
            if (axios.isAxiosError(err)) { // Type check for AxiosError
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            console.error("Error initiating payment:", err);
            setIsLoading(false); // Stop loading on error
        }
        // Removed finally block as loading is handled within try/catch outcomes
    };

    // --- Render logic remains largely the same ---
    // (Make sure loading skeletons match the structure)
    if (isLoading && !balanceCurrency) { // Show full page skeleton only on initial load
        return (
            <div className="max-w-xl mx-auto p-4 lg:p-8">
                <Skeleton className="h-8 w-48 mb-8 mx-auto" />
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                {/* Adjusted skeleton count */}
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-5 w-full mb-2" />)}
                <Skeleton className="h-12 w-full mt-4" />
            </div>
        );
    }

    // Show error prominently if initial load failed
    if (error && !balanceCurrency) {
        return (
            <div className="max-w-xl mx-auto p-4 lg:p-8 text-red-500 text-center">
                Error: {error || "Could not load page details."}
            </div>
        );
    }

     // Render page content if balance currency loaded (even if there's a subsequent error)
     if (!balanceCurrency) {
         // This case should ideally not be reached if loading/error handles above work
         return <div className="max-w-xl mx-auto p-4 lg:p-8 text-center">Loading balance details...</div>;
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
            <h2 className="sm:text-3xl text-2xl text-center font-semibold text-mainheading mb-6 dark:text-white">
                Add Money to {balanceCurrency.code} Balance
            </h2>

             {/* Display calculation/initiation errors here */}
             {error && <div className="my-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">{error}</div>}

            <div>
                <label
                    htmlFor="amount"
                    className="block text-base font-medium text-mainheading dark:text-white"
                >
                    Amount to add
                </label>
                {/* Amount Input Fileld */}
                <div className="relative mt-1 rounded-md">
                    <input
                        type="number" // Use type number for better mobile input
                        step="0.01" // Allow decimals
                        min="0.01" // Minimum valid amount (adjust if needed)
                        name="amount"
                        id="amount"
                        className="block w-full text-xl rounded-xl ps-2 font-bold h-18 py-3 pl-5 pr-28 border border-gray-300 dark:border-lightgray/26 transition-shadow ease-in-out duration-300 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-400 dark:placeholder:text-neutral-700"
                        placeholder="0.00"
                        value={amountToAdd}
                        onChange={handleAmountChange}
                        required
                        aria-describedby="amount-currency" // Accessibility
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                        <div id="amount-currency" className="px-2 flex items-center md:gap-4 gap-2">
                            <span className="inline-block rounded-full overflow-hidden">
                                <Image
                                    src={`/assets/icon/${balanceCurrency.code.toLowerCase()}.svg`}
                                    alt={`${balanceCurrency.code} Flag`}
                                    height={25}
                                    width={25}
                                    className="md:size-7 size-6"
                                    unoptimized // If SVGs don't need optimization
                                />
                            </span>
                            <span className="mr-2 text-neutral-700 dark:text-white font-bold md:text-xl text-lg">
                                {balanceCurrency.code}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-base font-medium text-neutral-900 dark:text-white">
                        Paying with
                    </label>
                    <div className="border border-gray-300 dark:border-lightgray/26 rounded-xl ps-5 py-4 flex items-center gap-4 mt-1">
                        <div className="p-2 bg-green-500/20 rounded-full inline-block">
                            <AiFillBank className="size-7 text-green-500" />
                        </div>
                        <span className="text-neutral-900 dark:text-white  font-semibold capitalize md:text-lg text-base">
                            Bank transfer
                        </span>
                    </div>
                </div>

                {/* currency calculation */}
                <div className="mt-4 border border-gray-300 dark:border-lightgray/26 rounded-xl p-4">
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-neutral-700 dark:text-gray-300 ">Currency to pay in</dt>
                         {/* Show skeleton only for currency if balance is loading, otherwise show default/actual */}
                         <dd className="ml-6 text-secondary dark:text-gray-300 font-bold">
                            {isLoading && !balanceCurrency ? <Skeleton className="h-4 w-10 inline-block" /> : payInCurrencyCode}
                         </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-neutral-700 dark:text-gray-300 ">Bank transfer fee</dt>
                        <dd className="ml-6 text-neutral-700 dark:text-gray-300  font-medium">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16 inline-block" /> : `${calculatedBankTransferFee} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-neutral-700 dark:text-gray-300 ">Our fee</dt>
                        <dd className="ml-6 text-neutral-700 dark:text-gray-300 font-medium">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16 inline-block" /> : `${calculatedWiseFee} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-neutral-700 dark:text-gray-300 font-medium">Total included fees</dt>
                        <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16 inline-block" /> : `${totalFees} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                     {/* Show exchange rate if available */}
                    {paymentSummary?.exchangeRate && !isDetailsLoading && (
                        <div className="py-2 flex justify-between text-sm text-gray">
                            <dt className="text-neutral-700 dark:text-gray-300">Guaranteed rate (24h)</dt>
                            <dd className="ml-6 text-neutral-700 dark:text-gray-300 font-medium">
                                1 {payInCurrencyCode} = {paymentSummary.exchangeRate.toFixed(5)} {balanceCurrency.code}
                            </dd>
                        </div>
                     )}
                     {isDetailsLoading && ( /* Skeleton for rate */
                        <div className="py-2 flex justify-between text-sm text-gray">
                            <dt className="text-neutral-700 dark:text-gray-300">Guaranteed rate (24h)</dt>
                            <dd className="ml-6"><Skeleton className="h-4 w-24 inline-block" /></dd>
                        </div>
                     )}
                    <div className="py-3.5 flex justify-between text-sm text-gray border-t dark:border-lightgray/26">
                        <dt className="text-neutral-900 dark:text-white font-bold capitalize">
                            Total you'll pay
                        </dt>
                        <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16 inline-block" /> : `${calculatedAmountToPay} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                </div>

                {/* Continue button for confirm enter value */}
                <div className="mt-4">
                    <button
                        onClick={handleContinue}
                        className={`w-full bg-primary text-neutral-900 hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 font-medium rounded-full transition-all duration-75 ease-linear ${
                            isLoading || isDetailsLoading || amountToAdd === "" || Number(amountToAdd) <= 0
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer"
                        }`}
                        disabled={
                            isLoading || // Main page loading (after clicking continue)
                            isDetailsLoading || // Details calculation loading
                            amountToAdd === "" || // No amount entered
                            Number(amountToAdd) <= 0 // Amount is not positive
                        }
                    >
                        {isLoading ? 'Processing...' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMoneyPage;