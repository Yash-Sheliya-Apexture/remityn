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




// // app/dashboard/balances/[balanceId]/add-money/page.tsx
// "use client";

// import Image from "next/image";
// import { useRouter, useParams } from "next/navigation";
// import React, { useState, useEffect, useCallback } from "react";
// import { AiFillBank } from "react-icons/ai";
// // Import the hook from its central location (adjust path as needed)
// import { useAuth } from "../../../../contexts/AuthContext"; // Or wherever your AuthContext/useAuth is
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
//     const { token } = useAuth(); // Uses the imported hook
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
//                 // FIX: Added /api prefix
//                 axios.post<PaymentSummary>(
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
//             if (!token || !balanceId) return; // Prevent fetch if token or id is missing
//             setIsLoading(true);
//             setError(null);
//             try {
//                 // FIX: Added /api prefix
//                 const response = await axios.get<{ currency: { code: string } }>(`/accounts/${balanceId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setBalanceCurrency({ code: response.data.currency.code });
//                 // Removed setTimeout, loading state handles UI
//                 setIsLoading(false);
//             } catch (err: unknown) { // Changed 'any' to 'unknown'
//                 let errorMessage = "Failed to load balance currency";
//                  if (axios.isAxiosError(err)) { // Type check for AxiosError
//                      errorMessage = err.response?.data?.message || errorMessage;
//                  } else if (err instanceof Error) {
//                      errorMessage = err.message;
//                  }
//                 setError(errorMessage);
//                  // Removed setTimeout
//                 setIsLoading(false);
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
//         // Allow empty string or valid numbers (including 0 temporarily before calculation triggers)
//         if (value === "" || (!isNaN(numberValue) && numberValue >= 0)) {
//              setAmountToAdd(numberValue);
//          }
//     };


//     const handleContinue = async () => {
//         // Ensure amount is a positive number
//         if (!balanceCurrency || amountToAdd === "" || isNaN(Number(amountToAdd)) || Number(amountToAdd) <= 0) {
//             alert("Please enter a valid positive amount.");
//             return;
//         }
//          // Ensure payment summary is calculated and available
//         if (!paymentSummary || isDetailsLoading) {
//             setError("Payment details are still calculating or missing. Please wait or re-enter the amount.");
//             return;
//         }


//         setIsLoading(true); // Use main loading indicator for final action
//         setError(null);

//         try {
//              // paymentSummary already contains all necessary calculated fields from calculate-summary endpoint
//             const paymentDataToSave = {
//                 ...paymentSummary, // Use the data from state
//                 amountToAdd: Number(amountToAdd), // Ensure amountToAdd is a number
//                 balanceId: balanceId, // Add balanceId if needed by backend initiate endpoint
//                 // Add any other required fields for initiation
//             };


//             // FIX: Added /api prefix
//             const initiateResponse = await axios.post<PaymentSummary>(
//                 "/payments/add-money/initiate",
//                 paymentDataToSave, // Send the calculated summary data + any extra needed fields
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );

//             const savedPayment = initiateResponse.data; // Payment data now saved in backend
//             if (savedPayment?._id) {
//                 // No need to setPaymentSummary again if redirecting immediately
//                 router.push(
//                     `/dashboard/balances/${balanceId}/payment-details?paymentId=${savedPayment._id}`
//                 );
//             } else {
//                 setError("Failed to initiate payment. Missing payment ID in response.");
//                  setIsLoading(false); // Stop loading on specific failure
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
//             setIsLoading(false); // Stop loading on error
//         }
//         // Removed finally block as loading is handled within try/catch outcomes
//     };

//     // --- Render logic remains largely the same ---
//     // (Make sure loading skeletons match the structure)
//     if (isLoading && !balanceCurrency) { // Show full page skeleton only on initial load
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

//     // Show error prominently if initial load failed
//     if (error && !balanceCurrency) {
//         return (
//             <div className="max-w-xl mx-auto p-4 lg:p-8 text-red-500 text-center">
//                 Error: {error || "Could not load page details."}
//             </div>
//         );
//     }

//      // Render page content if balance currency loaded (even if there's a subsequent error)
//      if (!balanceCurrency) {
//          // This case should ideally not be reached if loading/error handles above work
//          return <div className="max-w-xl mx-auto p-4 lg:p-8 text-center">Loading balance details...</div>;
//      }


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
//                 Add Money to {balanceCurrency.code} Balance
//             </h2>

//              {/* Display calculation/initiation errors here */}
//              {error && <div className="my-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">{error}</div>}

//             <div>
//                 <label
//                     htmlFor="amount"
//                     className="block text-base font-medium text-mainheading dark:text-white"
//                 >
//                     Amount to add
//                 </label>
//                 {/* Amount Input Fileld */}
//                 <div className="relative mt-1 rounded-md">
//                     <input
//                         type="number" // Use type number for better mobile input
//                         step="0.01" // Allow decimals
//                         min="0.01" // Minimum valid amount (adjust if needed)
//                         name="amount"
//                         id="amount"
//                         className="block w-full text-xl rounded-xl ps-2 font-bold h-18 py-3 pl-5 pr-28 border border-gray-300 dark:border-lightgray/26 transition-shadow ease-in-out duration-300 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-400 dark:placeholder:text-neutral-700"
//                         placeholder="0.00"
//                         value={amountToAdd}
//                         onChange={handleAmountChange}
//                         required
//                         aria-describedby="amount-currency" // Accessibility
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
//                         <div id="amount-currency" className="px-2 flex items-center md:gap-4 gap-2">
//                             <span className="inline-block rounded-full overflow-hidden">
//                                 <Image
//                                     src={`/assets/icon/${balanceCurrency.code.toLowerCase()}.svg`}
//                                     alt={`${balanceCurrency.code} Flag`}
//                                     height={25}
//                                     width={25}
//                                     className="md:size-7 size-6"
//                                     unoptimized // If SVGs don't need optimization
//                                 />
//                             </span>
//                             <span className="mr-2 text-neutral-700 dark:text-white font-bold md:text-xl text-lg">
//                                 {balanceCurrency.code}
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
//                          {/* Show skeleton only for currency if balance is loading, otherwise show default/actual */}
//                          <dd className="ml-6 text-secondary dark:text-gray-300 font-bold">
//                             {isLoading && !balanceCurrency ? <Skeleton className="h-4 w-10 inline-block" /> : payInCurrencyCode}
//                          </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 ">Bank transfer fee</dt>
//                         <dd className="ml-6 text-neutral-700 dark:text-gray-300  font-medium">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16 inline-block" /> : `${calculatedBankTransferFee} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 ">Our fee</dt>
//                         <dd className="ml-6 text-neutral-700 dark:text-gray-300 font-medium">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16 inline-block" /> : `${calculatedWiseFee} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                     <div className="py-2 flex justify-between text-sm text-gray">
//                         <dt className="text-neutral-700 dark:text-gray-300 font-medium">Total included fees</dt>
//                         <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16 inline-block" /> : `${totalFees} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                      {/* Show exchange rate if available */}
//                     {paymentSummary?.exchangeRate && !isDetailsLoading && (
//                         <div className="py-2 flex justify-between text-sm text-gray">
//                             <dt className="text-neutral-700 dark:text-gray-300">Guaranteed rate (24h)</dt>
//                             <dd className="ml-6 text-neutral-700 dark:text-gray-300 font-medium">
//                                 1 {payInCurrencyCode} = {paymentSummary.exchangeRate.toFixed(5)} {balanceCurrency.code}
//                             </dd>
//                         </div>
//                      )}
//                      {isDetailsLoading && ( /* Skeleton for rate */
//                         <div className="py-2 flex justify-between text-sm text-gray">
//                             <dt className="text-neutral-700 dark:text-gray-300">Guaranteed rate (24h)</dt>
//                             <dd className="ml-6"><Skeleton className="h-4 w-24 inline-block" /></dd>
//                         </div>
//                      )}
//                     <div className="py-3.5 flex justify-between text-sm text-gray border-t dark:border-lightgray/26">
//                         <dt className="text-neutral-900 dark:text-white font-bold capitalize">
//                             Total you&apos;ll pay
//                         </dt>
//                         <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
//                             {isDetailsLoading ? <Skeleton className="h-4 w-16 inline-block" /> : `${calculatedAmountToPay} ${payInCurrencyCode}`}
//                         </dd>
//                     </div>
//                 </div>

//                 {/* Continue button for confirm enter value */}
//                 <div className="mt-4">
//                     <button
//                         onClick={handleContinue}
//                         className={`w-full bg-primary text-neutral-900 hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 font-medium rounded-full transition-all duration-75 ease-linear ${
//                             isLoading || isDetailsLoading || amountToAdd === "" || Number(amountToAdd) <= 0
//                                 ? "cursor-not-allowed opacity-50"
//                                 : "cursor-pointer"
//                         }`}
//                         disabled={
//                             isLoading || // Main page loading (after clicking continue)
//                             isDetailsLoading || // Details calculation loading
//                             amountToAdd === "" || // No amount entered
//                             Number(amountToAdd) <= 0 // Amount is not positive
//                         }
//                     >
//                         {isLoading ? 'Processing...' : 'Continue'}
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

// FIX 1: Remove specific interface for useParams generic.
// The default return type of useParams already satisfies the necessary constraints.
// We will type the destructured variable `balanceId` later if needed,
// but usually, it's inferred correctly or can be asserted.
// interface AddMoneyPageParams {
//     balanceId: string;
// }


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
    // FIX 1 (continued): Use useParams without the generic.
    // The returned object will have keys based on the route segments.
    const params = useParams();
    // Explicitly get balanceId and assert/ensure it's a string if needed,
    // though often direct usage works if the route guarantees it.
    const balanceId = params.balanceId as string; // Asserting it's a string

    // Dynamically set payInCurrencyCode from balanceCurrency.code or default to "USD" if balanceCurrency is not yet loaded
    const payInCurrencyCode = balanceCurrency?.code || "USD";

    const calculatePaymentSummaryDebounced = useCallback(
        (amount: number) => { // Expects a number
            const balCurrencyCode = balanceCurrency?.code;

            // Guard clause already ensures amount is a valid number > 0
            if (balCurrencyCode && payInCurrencyCode) {
                setIsDetailsLoading(true);
                setError(null);
                // Assuming baseURL is set correctly, no need for /api prefix unless required by proxy setup
                axios.post<PaymentSummary>(
                    "/payments/add-money/calculate-summary",
                    {
                        balanceCurrencyCode: balCurrencyCode,
                        payInCurrencyCode: payInCurrencyCode,
                        amountToAdd: amount, // Pass the validated number
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
                // Should not happen if called correctly, but good failsafe
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
                // Assuming baseURL is set correctly
                const response = await axios.get<{ currency: { code: string } }>(`/accounts/${balanceId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBalanceCurrency({ code: response.data.currency.code });
                setIsLoading(false);
            } catch (err: unknown) {
                let errorMessage = "Failed to load balance currency";
                 if (axios.isAxiosError(err)) {
                     errorMessage = err.response?.data?.message || errorMessage;
                 } else if (err instanceof Error) {
                     errorMessage = err.message;
                 }
                setError(errorMessage);
                setIsLoading(false);
                console.error("Error fetching balance currency:", err);
            }
        };

        fetchBalanceCurrency();
    }, [balanceId, token]);


    useEffect(() => {
        // FIX 2 & 3 Check: Condition already correctly ensures amountToAdd is a number > 0
        // The call to calculatePaymentSummaryDebounced is safe.
        if (typeof amountToAdd === 'number' && !isNaN(amountToAdd) && amountToAdd > 0 && balanceCurrency?.code) {
            calculatePaymentSummaryDebounced(amountToAdd); // Passes a number
        } else {
            setPaymentSummary(null); // Clear summary if amount is invalid or zero/empty
        }
    }, [amountToAdd, calculatePaymentSummaryDebounced, balanceCurrency?.code]);


    // FIX 2 & 3: Refine handler logic for clarity and correctness
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "") {
            setAmountToAdd(""); // Set state to empty string if input is cleared
            setPaymentSummary(null); // Clear summary when amount is cleared
        } else {
            // Allow decimal points and numbers
            // Use regex to check for valid number format before parsing
            // Allows numbers like "12", "12.", "12.3", "12.34" but not "12.3.4" or "--12"
            if (/^\d*\.?\d{0,2}$/.test(value)) {
                 const numberValue = parseFloat(value);
                 // Check if parsing results in a valid, non-negative number
                 // Note: parseFloat("12.") === 12. Allow entry but might parse early.
                 // Setting state with the potentially incomplete string first might be better UX for typing decimals.
                 // Let's reconsider: Keep the original logic, it allows typing intermediate states.

                 // Original logic allows typing "0", "1", "1.", "1.2"
                 const numberValueParsed = parseFloat(value);

                 // Allow empty string OR a non-NaN, non-negative number result from parsing
                 // We set the state to number OR "" based on input value
                 if (!isNaN(numberValueParsed) && numberValueParsed >= 0) {
                    // If it parses to a valid number >= 0, store it as number
                    setAmountToAdd(numberValueParsed);
                 } else if (value === "") {
                     // Redundant check based on outer if, but safe
                     setAmountToAdd("");
                 }
                 // If it's not "" and not parsable to >= 0 (e.g., invalid chars, negative sign entered first),
                 // the state *won't* update, preventing invalid state values.
                 // The input field will show what user typed, state remains last valid value.

            }
             // If regex fails (invalid format like "abc", "1..2"), do nothing - state doesn't update.
        }
    };


    const handleContinue = async () => {
        // Ensure amount is a positive number AND state holds a number (not "")
        // FIX 2 & 3 Check: Correctly check typeof and value
        if (typeof amountToAdd !== 'number' || isNaN(amountToAdd) || amountToAdd <= 0) {
             alert("Please enter a valid positive amount.");
             return;
         }
        // Ensure balance currency is loaded
        if (!balanceCurrency) {
            setError("Balance details not loaded yet. Please wait.");
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
             // paymentSummary already contains all necessary calculated fields
            const paymentDataToSave = {
                ...paymentSummary, // Use the data from state
                // amountToAdd is already guaranteed to be a number here by the initial check
                amountToAdd: amountToAdd,
                balanceId: balanceId, // Add balanceId if needed by backend initiate endpoint
                // userId might be inferred from token backend-side, but include if API requires
                // userId: paymentSummary.userId // Assuming calculate-summary returned it
            };


            // Assuming baseURL is set correctly
            const initiateResponse = await axios.post<PaymentSummary>(
                "/payments/add-money/initiate",
                paymentDataToSave, // Send the calculated summary data + any extra needed fields
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const savedPayment = initiateResponse.data; // Payment data now saved in backend
            if (savedPayment?._id) {
                router.push(
                    `/dashboard/balances/${balanceId}/payment-details?paymentId=${savedPayment._id}`
                );
            } else {
                setError("Failed to initiate payment. Missing payment ID in response.");
                 setIsLoading(false);
            }

        } catch (err: unknown) {
            let errorMessage = "Failed to initiate payment";
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            console.error("Error initiating payment:", err);
            setIsLoading(false);
        }
    };

    // --- Render logic ---
    if (isLoading && !balanceCurrency) { // Show full page skeleton only on initial load
        return (
            <div className="max-w-xl mx-auto p-4 lg:p-8">
                <Skeleton className="h-8 w-48 mb-8 mx-auto" />
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-5 w-full mb-2" />)}
                <Skeleton className="h-12 w-full mt-4" />
            </div>
        );
    }

    if (error && !balanceCurrency) {
        return (
            <div className="max-w-xl mx-auto p-4 lg:p-8 text-red-500 text-center">
                Error: {error || "Could not load page details."}
            </div>
        );
    }

     if (!balanceCurrency) {
         return <div className="max-w-xl mx-auto p-4 lg:p-8 text-center">Loading balance details...</div>;
     }


    const calculatedAmountToPay = paymentSummary
        ? parseFloat(paymentSummary.amountToPay.toString()).toFixed(2) // Ensure conversion before toFixed
        : isDetailsLoading ? '...' : "0.00";
    const calculatedWiseFee =
        paymentSummary?.wiseFee !== undefined
            ? parseFloat(paymentSummary.wiseFee.toString()).toFixed(2) // Ensure conversion
            : isDetailsLoading ? '...' : "0.00";
    const calculatedBankTransferFee =
        paymentSummary?.bankTransferFee !== undefined
            ? parseFloat(paymentSummary.bankTransferFee.toString()).toFixed(2) // Ensure conversion
            : isDetailsLoading ? '...' : "0.00";
    // Ensure operands are numbers before addition
    const totalFees = paymentSummary && typeof paymentSummary.wiseFee === 'number' && typeof paymentSummary.bankTransferFee === 'number'
        ? (paymentSummary.wiseFee + paymentSummary.bankTransferFee).toFixed(2)
        : isDetailsLoading ? '...' : "0.00";


    return (
        <div className="max-w-lg mx-auto mt-5">
            <h2 className="lg:text-3xl md:text-2xl text-xl text-center font-semibold text-mainheading mb-6 dark:text-white">
                Add Money to {balanceCurrency.code} Balance
            </h2>

             {error && <div className="my-4 p-3 bg-red-700/20 text-red-700 border rounded-md">{error}</div>}

            <div>
                <label
                    htmlFor="amount"
                    className="block lg:text-base text-sm font-medium text-mainheading dark:text-white"
                >
                    Amount to add
                </label>
                <div className="relative mt-1 rounded-md">
                    <input
                        type="number"
                        step="0.01"
                        min="0.01" // HTML5 validation, actual logic uses > 0
                        name="amount"
                        id="amount"
                        className="block w-full text-xl rounded-xl ps-2 font-bold lg:h-18 h-16 py-3 pl-5 pr-28 border border-gray-300 dark:border-lightgray/26 transition-shadow ease-in-out duration-300 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-400 dark:placeholder:text-neutral-700"
                        placeholder="0.00"
                        // FIX 4, 5, 6: Explicitly convert state (number | "") to string for the input value prop
                        value={String(amountToAdd)}
                        onChange={handleAmountChange}
                        required // HTML5 validation
                        aria-describedby="amount-currency"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                        <div id="amount-currency" className="px-2 flex items-center md:gap-4 gap-2">
                            <span className="inline-block rounded-full overflow-hidden">
                                <Image
                                    // Defensive check for code existence, though unlikely to be missing here
                                    src={balanceCurrency.code ? `/assets/icon/${balanceCurrency.code.toLowerCase()}.svg` : '/assets/icon/default.svg'}
                                    alt={`${balanceCurrency.code || ''} Flag`}
                                    height={25}
                                    width={25}
                                    className="md:size-7 size-6"
                                    unoptimized
                                />
                            </span>
                            <span className="mr-2 text-neutral-700 dark:text-white font-bold md:text-xl text-lg">
                                {balanceCurrency.code}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm lg:text-base font-medium text-neutral-900 dark:text-white">
                        Paying with
                    </label>

                    <div className="border border-gray-300 dark:border-lightgray/26 rounded-xl ps-5 lg:py-4 py-3 flex items-center gap-4 mt-1">
                        <div className="p-2 bg-green-500/20 rounded-full inline-block">
                            <AiFillBank className="md:size-7 size-6 text-green-500" />
                        </div>
                        <span className="text-neutral-900 dark:text-white font-semibold capitalize md:text-lg text-base">
                            Bank transfer 
                        </span>
                    </div>
                </div>

                {/* currency calculation */}
                <div className="mt-4 border border-gray-300 dark:border-lightgray/26 rounded-xl p-4">
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-neutral-700 dark:text-gray-300 ">Currency to pay in</dt>
                         <dd className="ml-6 text-secondary dark:text-gray-300 font-bold">
                            {/* payInCurrencyCode defaults to USD if balanceCurrency is null */}
                            {payInCurrencyCode}
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

                    {/* Conditional rendering based on calculation status */}
                    {(paymentSummary?.exchangeRate && !isDetailsLoading) ? (
                        <div className="py-2 flex justify-between text-sm text-gray">
                            <dt className="text-neutral-700 dark:text-primary">Guaranteed rate (24h)</dt>
                            <dd className="ml-6 text-neutral-700 dark:text-gray-300 font-medium">
                                {/* Ensure exchangeRate is treated as number */}
                                1 {payInCurrencyCode} = {Number(paymentSummary.exchangeRate).toFixed(5)} {balanceCurrency.code}
                            </dd>
                        </div>
                     ) : isDetailsLoading ? ( /* Skeleton for rate when details are loading */
                        <div className="py-2 flex justify-between text-sm text-gray">
                            <dt className="text-neutral-700 dark:text-gray-300">Guaranteed rate (24h)</dt>
                            <dd className="ml-6"><Skeleton className="h-4 w-24 inline-block" /></dd>
                        </div>
                     ) : null /* Don't show rate section if not loading and no rate available */
                     }
                    <div className="py-3.5 flex justify-between text-sm text-gray border-t dark:border-lightgray/26">
                        <dt className="text-neutral-900 dark:text-white font-bold capitalize">
                            Total you'll pay
                        </dt>
                        <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16 inline-block" /> : `${calculatedAmountToPay} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                </div>

                {/* Continue button */}
                <div className="mt-4">
                    <button
                        onClick={handleContinue}
                        className={`w-full bg-primary text-neutral-900 font-medium hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 rounded-full transition-all duration-75 ease-linear ${
                            // Disable conditions:
                            isLoading || // Main processing (after click)
                            isDetailsLoading || // Fee calculation in progress
                            typeof amountToAdd !== 'number' || // Amount is not a number (i.e., it's "")
                            amountToAdd <= 0 // Amount is zero or negative
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer"
                        }`}
                        disabled={
                            isLoading ||
                            isDetailsLoading ||
                            typeof amountToAdd !== 'number' ||
                            amountToAdd <= 0
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