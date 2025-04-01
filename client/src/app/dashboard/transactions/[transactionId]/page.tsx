// // frontend/app/dashboard/transactions/[transactionId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../hooks/useAuth";
// import axios, { AxiosError } from "axios"; // Import AxiosError
// import apiConfig from "../../../config/apiConfig";
// import { cn } from "@/lib/utils";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface PaymentDetailsPageParams {
//   transactionId: string;
// }

// interface PaymentDetails {
//   _id: string;
//   user: {
//     _id: string;
//     email: string;
//   };
//   balanceCurrency: any;
//   payInCurrency: any;
//   amountToAdd: number;
//   amountToPay: number;
//   exchangeRate: number;
//   wiseFee: number;
//   bankTransferFee: number;
//   referenceCode: string;
//   transactionNumber?: string;
//   paymentMethod: string;
//   status: string;
//   bankDetails: {
//     payeeName?: string;
//     iban?: string;
//     bicSwift?: string;
//     bankAddress?: string;
//   };
//   createdAt: string;
//   __v: number;
//   note?: string;
// }

// const PaymentDetailsPage = () => {
//   const params = useParams<PaymentDetailsPageParams>();
//   const router = useRouter();
//   const { transactionId } = params;

//   const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//   const [noteText, setNoteText] = useState("");
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         if (!transactionId) {
//           setError("Payment ID is missing.");
//           setIsLoading(false);
//           return;
//         }
//         const response = await axios.get(`/payments/${transactionId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = response.data as PaymentDetails;
//         setPaymentDetails(data);
//         setNoteText(data.note || "");
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load payment details"
//         );
//         setIsLoading(false);
//         console.error("Error fetching payment details:", err);
//         if (err.response?.status === 404) {
//           router.push("/dashboard");
//         }
//       }
//     };

//     fetchPaymentDetails();
//   }, [transactionId, token, router]);

//   useEffect(() => {
//     if (paymentDetails) {
//       setNoteText(paymentDetails.note || "");
//     }
//   }, [paymentDetails]);

//   if (isLoading) {
//     return <div>Loading payment details...</div>;
//   }

//   if (error || !paymentDetails) {
//     return (
//       <div className="text-red-500">
//         Error: {error || "Payment details not found."}
//       </div>
//     );
//   }

//   const payInCurrencyCode = paymentDetails.payInCurrency.code;
//   const amountToPay = parseFloat(paymentDetails.amountToPay).toFixed(2);
//   const bankDetails = paymentDetails.bankDetails || {};
//   const balanceCurrencyCode = paymentDetails.balanceCurrency.code;
//   const amountToAdd = parseFloat(paymentDetails.amountToAdd).toFixed(2);
//   const wiseFee = parseFloat(paymentDetails.wiseFee).toFixed(2);
//   const createdAtDate = paymentDetails.createdAt
//     ? new Date(paymentDetails.createdAt)
//     : null;
//   const formattedDate = createdAtDate
//     ? createdAtDate.toLocaleDateString("en-US", {
//         month: "long",
//         day: "numeric",
//       }) +
//       " at " +
//       createdAtDate.toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//       })
//     : "Date not available";
//   const userEmail = paymentDetails.user.email || "Recipient Email Placeholder";

//   const handleCopyToClipboard = (text: string, fieldName: string) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         alert(`${fieldName} copied to clipboard!`);
//       })
//       .catch((err) => {
//         console.error("Failed to copy text: ", err);
//         alert(`Failed to copy ${fieldName}. Please copy manually.`);
//       });
//   };

//   const handleCancelPayment = async () => {
//     if (!transactionId) {
//       alert("Payment ID is missing, cannot cancel.");
//       return;
//     }

//     if (
//       paymentDetails?.status !== "pending" &&
//       paymentDetails?.status !== "in progress"
//     ) {
//       alert(
//         "This payment cannot be cancelled as it is not in 'pending' or 'in progress' status."
//       );
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     try {
//       await axios.post(`/payments/${transactionId}/cancel`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Payment successfully cancelled.");
//       router.push("/dashboard");
//     } catch (err: any) {
//       // Improved error handling for Axios errors
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError;
//         if (axiosError.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           setError(
//             `Failed to cancel payment: ${
//               axiosError.response.data.message || "Request failed"
//             } (Status ${axiosError.response.status})`
//           );
//           console.error(
//             "Error cancelling payment (server response):",
//             axiosError.response.data
//           );
//         } else if (axiosError.request) {
//           // The request was made but no response was received
//           setError(
//             "Failed to cancel payment: No response from server. Please check your network."
//           );
//           console.error("Error cancelling payment (no response):", axiosError.request);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           setError(
//             `Failed to cancel payment: ${axiosError.message}. Please try again.`
//           );
//           console.error(
//             "Error cancelling payment (request setup):",
//             axiosError.message
//           );
//         }
//       } else {
//         // Non-Axios error
//         setError("Failed to cancel payment: An unexpected error occurred.");
//         console.error("Error cancelling payment (non-axios error):", err);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNoteText(e.target.value);
//   };

//   const timelineSteps = [
//     {
//       label: "You set up your transfer",
//       status: "completed",
//       date: formattedDate,
//     },
//     {
//       label: "We’re waiting for your money",
//       status:
//         paymentDetails.status === "pending" ||
//         paymentDetails.status === "in progress"
//           ? "active"
//           : "pending",
//     },
//     { label: `We receive your ${balanceCurrencyCode}`, status: "pending" },
//     { label: `We pay out your ${payInCurrencyCode}`, status: "pending" },
//     {
//       label: `${userEmail} receives your ${balanceCurrencyCode}`,
//       status: "pending",
//       recipientEmail: userEmail,
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <button
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-2"
//       >
//         <IoIosArrowBack size={20} /> Back
//       </button>

//       <div className="bg-white rounded-2xl border  mx-auto">
//         <div className="px-6 pt-6 pb-2 flex items-start gap-4 border-b">
//           <div className="rounded-full bg-gray-100 p-2 flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-plus"
//             >
//               <path d="M12 5v14" />
//               <path d="M5 12h14" />
//             </svg>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold">
//               To your {balanceCurrencyCode} balance
//             </h2>
//             <p className="text-sm text-gray-500">Waiting for your money</p>
//           </div>
//           <div className="ml-auto font-semibold">
//             {amountToAdd} {balanceCurrencyCode}
//           </div>
//         </div>

//         <div className="border-b border-gray-200 px-6">
//           <nav className="-mb-px flex justify-between" aria-label="Tabs">
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setActiveTab("Updates")}
//                 className={cn(
//                   "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700",
//                   activeTab === "Updates"
//                     ? "border-indigo-500 text-indigo-600"
//                     : ""
//                 )}
//                 aria-current={activeTab === "Updates" ? "page" : undefined}
//               >
//                 Updates
//               </button>
//               <button
//                 onClick={() => setActiveTab("Details")}
//                 className={cn(
//                   "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700",
//                   activeTab === "Details"
//                     ? "border-indigo-500 text-indigo-600"
//                     : ""
//                 )}
//                 aria-current={activeTab === "Details" ? "page" : undefined}
//               >
//                 Details
//               </button>
//             </div>
//           </nav>
//         </div>

//         <div className="p-6">
//           {activeTab === "Updates" && (
//             <div>
//               <div className="flex items-center mb-4">
//                 <span className="text-sm text-gray-500">Reference Code</span>
//                 <span className="ml-2 text-sm font-medium">
//                   {paymentDetails.referenceCode}
//                 </span>
//               </div>
//               <div className="relative mt-6">
//                 <ul className="space-y-6">
//                   {timelineSteps.map((step, index) => (
//                     <li key={index} className="flex space-x-3">
//                       <div className="relative">
//                         <div
//                           className={cn(
//                             "h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center",
//                             step.status === "completed" && "bg-gray-200",
//                             step.status === "active" && "bg-indigo-600"
//                           )}
//                         >
//                           {step.status === "completed" && (
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="14"
//                               height="14"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               className="lucide lucide-check"
//                             >
//                               <path d="M20 6 9 17l-5-5" />
//                             </svg>
//                           )}
//                         </div>
//                         {index < timelineSteps.length - 1 && (
//                           <div
//                             className="absolute top-0 left-2 h-full w-0.5 bg-gray-200"
//                             aria-hidden="true"
//                           ></div>
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         {step.date && (
//                           <p className="text-sm text-gray-500">{step.date}</p>
//                         )}
//                         <h4
//                           className={cn(
//                             "text-sm font-semibold",
//                             step.status === "pending" && "text-gray-500"
//                           )}
//                         >
//                           {step.label}
//                         </h4>
//                         {step.status === "active" &&
//                           step.label === "We’re waiting for your money" && (
//                             <div className="mt-1">
//                               <p className="text-sm text-gray-500">
//                                 If you’ve already sent the money from your bank
//                                 to Wise, it’s on its way to us. We’ll let you
//                                 know when it’s arrived.
//                               </p>
//                               <button className="bg-white border border-gray-300 rounded-md py-2 px-3 mt-4 text-sm font-medium">
//                                 I’ve not paid
//                               </button>
//                             </div>
//                           )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="mt-8 flex justify-end">
//                 <button
//                   onClick={handleCancelPayment}
//                   className="bg-white text-red-500 border border-red-500 rounded-md py-2 px-4 text-sm font-medium"
//                 >
//                   Cancel transfer
//                 </button>
//               </div>
//             </div>
//           )}
//           {activeTab === "Details" && (
//             <div>
//               <div>
//                 <h3 className="text-sm font-semibold mb-4">
//                   Transaction details
//                 </h3>
//                 <div className="mb-2 flex justify-between">
//                   <span className="text-gray-500 text-sm">You're sending</span>
//                   <span className="font-medium text-sm">
//                     {amountToAdd} {balanceCurrencyCode}
//                   </span>
//                 </div>
//                 <div className="mb-2 flex justify-between">
//                   <span className="text-gray-500 text-sm">Wise fees</span>
//                   <span className="font-medium text-sm">
//                     {wiseFee} {payInCurrencyCode}
//                   </span>
//                 </div>
//                 <div className="mb-2 flex justify-between">
//                   <span className="text-gray-500 text-sm">
//                     You will receive
//                   </span>
//                   <span className="font-medium text-sm">
//                     {amountToAdd} {balanceCurrencyCode}
//                   </span>
//                 </div>
//                 <div className="mt-4 flex justify-between">
//                   <span className="text-gray-500 text-sm">Reference Code</span>
//                   <span className="font-medium text-sm">
//                     {paymentDetails.referenceCode}
//                   </span>
//                 </div>

//                 <div className="mt-4 flex justify-between">
//                   <h3 className="text-sm font-semibold mb-4 mr-8">Note</h3>
//                   <textarea
//                     id="note"
//                     className="bg-gray-100 rounded-md p-3 text-sm text-gray-700 w-full focus:ring-indigo-500 focus:border-indigo-500 border border-gray-200"
//                     placeholder="Add a few notes to help you later"
//                     value={noteText}
//                     onChange={handleNoteChange}
//                     rows={3}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentDetailsPage;



// // frontend/app/dashboard/transactions/[transactionId]/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu"; // Icon for Add Money
// import { GoArrowUp } from "react-icons/go"; // Icon for Send Money
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path if necessary
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../../config/apiConfig"; // Adjust path if necessary
// import { cn } from "@/lib/utils"; // Adjust path if necessary
// import paymentService from "../../../services/payment"; // Adjust path if necessary
// import transferService from "../../../services/transfer"; // Adjust path if necessary
// import { format, parseISO } from 'date-fns';
// import CancelTransferModal from "../../components/CancelTransferModal"; // <-- Import the modal

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces (Keep existing PaymentDetails, TransferDetails, TransactionDetails, TransactionDetailsPageParams) ---
// // Interface for Payment Details
// interface PaymentDetails {
//     _id: string;
//     type: 'payment';
//     user: { _id: string; email?: string; fullName?: string };
//     balanceCurrency: { _id: string; code: string; flagImage?: string };
//     payInCurrency: { _id: string; code: string; flagImage?: string };
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode?: string;
//     transactionNumber?: string;
//     paymentMethod: string;
//     status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled';
//     bankDetails?: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     updatedAt: string;
//     note?: string;
// }

// // Interface for Transfer Details
// interface TransferDetails {
//     _id: string;
//     type: 'transfer';
//     user: { _id: string; email?: string; fullName?: string };
//     sourceAccount: {
//         _id: string;
//         currency: { _id: string; code: string; flagImage?: string };
//     };
//     recipient: {
//         _id: string;
//         accountHolderName: string;
//         nickname?: string;
//         currency: { _id: string; code: string; flagImage?: string };
//         accountNumber: string;
//         bankName: string;
//     };
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrency: { _id: string; code: string; flagImage?: string };
//     receiveCurrency: { _id: string; code: string; flagImage?: string };
//     exchangeRate: number;
//     fees: number;
//     reason?: string;
//     reference?: string;
//     // Ensure 'processing' is a valid status if used
//     status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled';
//     transactionId?: string;
//     failureReason?: string;
//     createdAt: string;
//     updatedAt: string;
//     note?: string;
// }

// // Union type
// type TransactionDetails = PaymentDetails | TransferDetails;

// // Params interface
// interface TransactionDetailsPageParams {
//     transactionId: string;
// }


// // --- Component ---
// const TransactionDetailsPage = () => {
//     const params = useParams<TransactionDetailsPageParams>();
//     const router = useRouter();
//     const { transactionId } = params;
//     const { token } = useAuth();

//     const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//     const [noteText, setNoteText] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false); // State for button loading

//     // --- State for Cancel Modal ---
//     const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

//     // --- Data Fetching (keep existing fetchTransactionDetails) ---
//      const fetchTransactionDetails = useCallback(async () => {
//         // ... (keep existing fetch logic for both transfers and payments) ...
//         if (!transactionId || !token) {
//             setError("Missing transaction ID or authentication token.");
//             setIsLoading(false);
//             return;
//         }
//         setIsLoading(true);
//         setError(null);
//         setTransactionDetails(null); // Reset details on fetch

//         try {
//             // Try fetching as a Transfer first
//             try {
//                 console.log(`Attempting to fetch Transfer details for ID: ${transactionId}`);
//                 const transferData = await transferService.getTransferDetails(transactionId, token);
//                 console.log("Fetched Transfer Data:", transferData);
//                 setTransactionDetails({ ...transferData, type: 'transfer' });
//                 setNoteText(transferData.note || "");
//                 setIsLoading(false);
//                 return;
//             } catch (transferErr: any) {
//                  console.warn(`Failed to fetch as Transfer (ID: ${transactionId}):`, transferErr.response?.data?.message || transferErr.message);
//                  if (transferErr.response?.status !== 404 && transferErr.message !== 'Transfer not found or access denied.' && !transferErr.message?.includes('Invalid transfer ID format')) {
//                      throw transferErr;
//                  }
//             }

//             // If not found as Transfer, try fetching as Payment
//             try {
//                  console.log(`Attempting to fetch Payment details for ID: ${transactionId}`);
//                  const paymentData = await paymentService.getPaymentDetails(transactionId, token);
//                  console.log("Fetched Payment Data:", paymentData);
//                  setTransactionDetails({ ...paymentData, type: 'payment' });
//                  setNoteText(paymentData.note || "");
//                  setIsLoading(false);
//                  return;
//             } catch (paymentErr: any) {
//                  console.error(`Failed to fetch as Payment (ID: ${transactionId}):`, paymentErr.response?.data?.message || paymentErr.message);
//                  if (paymentErr.response?.status === 404 || paymentErr.message === 'Payment not found.') {
//                      setError(`Transaction with ID ${transactionId} not found.`);
//                  } else {
//                      throw paymentErr;
//                  }
//             }

//             // If neither fetch worked and no error was thrown previously
//             if (!transactionDetails && !error) {
//                  setError(`Transaction with ID ${transactionId} could not be found or accessed.`);
//             }

//         } catch (err: any) {
//             const message = err.response?.data?.message || err.message || "Failed to load transaction details";
//             setError(message);
//             console.error("Error fetching transaction details:", err);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [transactionId, token]);

//     useEffect(() => {
//         fetchTransactionDetails();
//     }, [fetchTransactionDetails]);

//     // --- Loading & Error States (keep existing) ---
//     if (isLoading) {
//         // ... loading JSX ...
//          return <div className="container mx-auto px-4 py-8 text-center">Loading transaction details...</div>;
//     }
//     if (error || !transactionDetails) {
//         // ... error JSX ...
//         return (
//             <div className="container mx-auto px-4 py-8">
//                  <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
//                     <IoIosArrowBack size={20} /> Back
//                 </button>
//                 <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md text-center">
//                     Error: {error || "Transaction details not found or could not be loaded."}
//                 </div>
//             </div>
//         );
//     }

//     // --- Helper Functions & Derived Data (keep existing) ---
//     const isPayment = transactionDetails.type === 'payment';
//     const isTransfer = transactionDetails.type === 'transfer';
//     const formatDisplayDate = (dateString: string | undefined): string => {
//          // ... (keep existing date formatting logic) ...
//          if (!dateString) return "Date not available";
//         try {
//             return format(parseISO(dateString), "MMMM d 'at' h:mm a");
//         } catch (e) {
//             console.error("Date formatting error:", e);
//             const date = new Date(dateString);
//             if (isNaN(date.getTime())) return "Invalid Date";
//             return date.toLocaleDateString("en-US", { month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
//         }
//     };
//      const getTimelineSteps = () => {
//         // ... (keep existing timeline logic) ...
//          if (isPayment) {
//             const payment = transactionDetails as PaymentDetails;
//             const createdDate = formatDisplayDate(payment.createdAt);
//              const isWaiting = payment.status === 'pending' || payment.status === 'in progress';
//              const isComplete = payment.status === 'completed';
//              const isCancelled = payment.status === 'canceled';
//              const hasFailed = payment.status === 'failed';

//              return [
//                  { label: "You set up your transfer", status: 'completed', date: createdDate },
//                  { label: "We’re waiting for your money", status: isWaiting ? 'active' : (isComplete || isCancelled || hasFailed ? 'completed' : 'pending') },
//                  { label: `We receive your ${payment.payInCurrency?.code || 'money'}`, status: isComplete ? 'completed' : (isCancelled || hasFailed || isWaiting ? 'pending' : 'pending') },
//                  { label: `We add it to your ${payment.balanceCurrency?.code || ''} balance`, status: isComplete ? 'completed' : 'pending' },
//                  { label: "All done!", status: isComplete ? 'completed' : 'pending' },
//              ];
//         } else if (isTransfer) {
//             const transfer = transactionDetails as TransferDetails;
//             const createdDate = formatDisplayDate(transfer.createdAt);
//             const updatedDate = formatDisplayDate(transfer.updatedAt);

//              const isSetup = true;
//              // Define cancellable statuses here for consistency
//              const isCancellable = transfer.status === 'pending' || transfer.status === 'processing';
//              const isProcessing = transfer.status === 'processing'; // Might be the same as cancellable
//              const isComplete = transfer.status === 'completed';
//              const isCancelled = transfer.status === 'canceled';
//              const hasFailed = transfer.status === 'failed';

//              return [
//                  { label: "You set up your transfer", status: 'completed', date: createdDate },
//                  { label: `We've taken the funds from your ${transfer.sendCurrency?.code || ''} account`, status: isSetup && !isCancelled && !hasFailed ? 'completed' : 'pending', date: createdDate },
//                  { label: `We paid out your ${transfer.receiveCurrency?.code || ''}`, status: isComplete ? 'completed' : (isProcessing ? 'active' : (isCancelled || hasFailed ? 'pending' : 'pending')), date: isComplete || isProcessing ? updatedDate : undefined },
//                  { label: `Transfer successfully sent to your recipient's bank`, status: isComplete ? 'completed' : (isProcessing ? 'active' : 'pending'), date: isComplete ? updatedDate : undefined },
//              ];
//         }
//         return [];
//     };
//     const timelineSteps = getTimelineSteps();


//     // --- Event Handlers ---

//     // Keep existing handleCancelPayment
//     const handleCancelPayment = async () => {
//         if (!isPayment || !transactionId) return;
//         const payment = transactionDetails as PaymentDetails;
//         if (payment.status !== "pending" && payment.status !== "in progress") {
//             alert("This payment cannot be cancelled in its current status."); return;
//         }
//         const confirmCancel = window.confirm("Are you sure you want to cancel this payment?");
//         if (!confirmCancel) return;
//         setIsSubmitting(true); setError(null);
//         try {
//             await paymentService.cancelPayment(transactionId, token);
//             alert("Payment successfully cancelled.");
//             fetchTransactionDetails();
//         } catch (err: any) {
//              const message = err.response?.data?.message || err.message || "Failed to cancel payment";
//             setError(message); console.error("Error cancelling payment:", err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // --- Handler for Confirming Transfer Cancellation ---
//     const handleConfirmCancelTransfer = async () => {
//         if (!isTransfer || !transactionId) return;

//         setIsSubmitting(true); // Indicate loading
//         setError(null);
//         try {
//             // Assuming transferService.cancelTransfer exists and takes (id, token)
//             await transferService.cancelTransfer(transactionId, token);
//             setIsCancelModalOpen(false); // Close modal on success
//             alert("Transfer successfully cancelled."); // Simple feedback
//             fetchTransactionDetails(); // Refresh details
//         } catch (err: any) {
//             const message = err.response?.data?.message || err.message || "Failed to cancel transfer";
//             setError(message); // Show error to user
//             console.error("Error cancelling transfer:", err);
//             // Optionally close modal on error too, or keep open to show error message nearby
//             setIsCancelModalOpen(false);
//         } finally {
//             setIsSubmitting(false); // Reset loading state
//         }
//     };


//     // Keep existing handleNoteChange
//      const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setNoteText(e.target.value);
//          console.warn("Note editing UI enabled, but saving is not implemented yet.");
//     };

//     // --- Determine if Transfer is Cancellable ---
//     const isTransferCancellable = isTransfer &&
//         (transactionDetails.status === 'pending' || transactionDetails.status === 'processing');

//     // --- Determine if Payment is Cancellable ---
//      const isPaymentCancellable = isPayment &&
//         (transactionDetails.status === 'pending' || transactionDetails.status === 'in progress');

//     // --- Render Logic ---
//     // Keep existing headerIcon, headerTitle, etc. definitions
//     const headerIcon = isPayment ? <LuPlus size={24} /> : <GoArrowUp size={24} />;
//     const headerTitle = isPayment
//         ? `To your ${(transactionDetails as PaymentDetails).balanceCurrency?.code} balance`
//         : (transactionDetails as TransferDetails).recipient?.accountHolderName || "Recipient";
//     const headerAmount = isPayment
//         ? `${(transactionDetails as PaymentDetails).amountToAdd.toFixed(2)} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`
//         : `${(transactionDetails as TransferDetails).sendAmount.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`;
//     const headerAmountSign = isPayment ? "+" : "-";
//     const headerStatusText =
//         transactionDetails.status === 'pending' ? (isPayment ? "Waiting for your money" : "Transfer initiated") :
//         transactionDetails.status === 'in progress' ? (isPayment ? "Processing payment" : "Transfer in progress") : // Use generic "in progress" if backend doesn't have "processing"
//         transactionDetails.status === 'processing' ? "Transfer processing" :
//         transactionDetails.status === 'completed' ? (isPayment ? "Money added" : "Transfer completed") :
//         transactionDetails.status === 'canceled' ? "Transaction canceled" :
//         transactionDetails.status === 'failed' ? "Transaction failed" : "Status unknown";


//     return (
//         <> {/* Use Fragment to wrap page and modal */}
//             <div className="container mx-auto px-4 py-8">
//                 <button
//                     onClick={() => router.back()}
//                     className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
//                 >
//                     <IoIosArrowBack size={20} /> Back
//                 </button>

//                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mx-auto max-w-4xl">
//                     {/* --- Header (keep existing) --- */}
//                     <div className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-gray-200">
//                          <div className={`rounded-full p-2 flex items-center justify-center ${isPayment ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
//                              {headerIcon}
//                          </div>
//                          <div className="flex-grow">
//                              <h2 className="text-lg font-semibold text-gray-800">{headerTitle}</h2>
//                               <p className={cn("text-sm", transactionDetails.status === 'completed' ? 'text-green-600' : transactionDetails.status === 'canceled' || transactionDetails.status === 'failed' ? 'text-red-600' : 'text-gray-500')}>
//                                  {headerStatusText}
//                              </p>
//                          </div>
//                          <div className={cn("ml-auto font-semibold whitespace-nowrap", isPayment ? 'text-green-600' : 'text-gray-800')}>
//                              {headerAmountSign} {headerAmount}
//                          </div>
//                     </div>


//                     {/* --- Tabs (keep existing) --- */}
//                     <div className="border-b border-gray-200 px-6">
//                         <nav className="-mb-px flex justify-between" aria-label="Tabs">
//                              <div className="flex space-x-4">
//                                 <button onClick={() => setActiveTab("Updates")} className={cn( "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium", activeTab === "Updates" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700")} aria-current={activeTab === "Updates" ? "page" : undefined}> Updates </button>
//                                 <button onClick={() => setActiveTab("Details")} className={cn( "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium", activeTab === "Details" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700")} aria-current={activeTab === "Details" ? "page" : undefined}> Details </button>
//                             </div>
//                         </nav>
//                     </div>

//                     {/* --- Tab Content --- */}
//                     <div className="p-6">
//                         {/* --- Updates Tab --- */}
//                         {activeTab === "Updates" && (
//                             <div>
//                                 {/* Transaction ID / Reference (keep existing) */}
//                                  <div className="flex items-center mb-6 text-sm">
//                                     <span className="text-gray-500 w-28"> {isPayment ? "Reference Code" : "Transfer ID"} </span>
//                                     <span className="ml-2 font-medium text-gray-700"> {isPayment ? (transactionDetails as PaymentDetails).referenceCode : transactionDetails._id} </span>
//                                 </div>

//                                 {/* Timeline (keep existing) */}
//                                  <div className="relative mt-6">
//                                     {/* ... timelineSteps mapping ... */}
//                                      {timelineSteps.length > 0 ? (
//                                         <ul className="space-y-6">
//                                             {timelineSteps.map((step, index) => (
//                                                 <li key={index} className="flex items-start space-x-3">
//                                                      {/* Marker */}
//                                                     <div className="relative flex flex-col items-center">
//                                                         <div className={cn("h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-white", step.status === "completed" && "bg-green-500 text-white", step.status === "active" && "bg-indigo-600 text-white", step.status === "pending" && "bg-gray-300")}>
//                                                              {step.status === "completed" && (<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /> </svg>)}
//                                                              {step.status === "active" && (<div className="h-2 w-2 bg-white rounded-full"></div>)}
//                                                          </div>
//                                                          {/* Line */}
//                                                          {index < timelineSteps.length - 1 && (<div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%-1.25rem+1.5rem)] w-0.5 bg-gray-200" aria-hidden="true"></div>)}
//                                                     </div>
//                                                      {/* Content */}
//                                                      <div className="flex-1 pb-6">
//                                                         <h4 className={cn("text-sm font-semibold", step.status === 'pending' ? 'text-gray-500' : 'text-gray-800')}>{step.label}</h4>
//                                                          {step.date && (<p className="text-xs text-gray-500 mt-0.5">{step.date}</p>)}
//                                                          {/* Specific messages */}
//                                                          {step.status === 'active' && isPayment && step.label === "We’re waiting for your money" && ( <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200"> <p> Please send exactly <strong className="font-medium">{`${(transactionDetails as PaymentDetails).amountToPay.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</strong> to the bank details provided in the 'Details' tab using the reference <strong className="font-medium">{(transactionDetails as PaymentDetails).referenceCode}</strong>. </p> <p className="mt-1">We'll notify you once received.</p> </div> )}
//                                                          {step.status === 'active' && isTransfer && step.label.includes("paid out") && ( <div className="mt-1 text-sm text-gray-500"> <p>We're processing the payment to your recipient's bank. This can take up to 2 working days.</p> </div> )}
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     ) : ( <p className="text-gray-500 text-sm">Status updates will appear here.</p> )}
//                                 </div>

//                                 {/* --- Action Buttons --- */}
//                                 <div className="mt-8 flex justify-end space-x-3">
//                                     {/* Show Cancel Payment Button */}
//                                     {isPaymentCancellable && (
//                                         <button
//                                             onClick={handleCancelPayment}
//                                             disabled={isSubmitting} // Use isSubmitting state
//                                             className="bg-white text-red-600 border border-red-300 rounded-md py-2 px-4 text-sm font-medium hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             {isSubmitting ? 'Cancelling...' : 'Cancel Payment'}
//                                         </button>
//                                     )}
//                                     {/* Show Cancel Transfer Button */}
//                                     {isTransferCancellable && (
//                                         <button
//                                             onClick={() => setIsCancelModalOpen(true)} // Open the modal
//                                             disabled={isSubmitting}
//                                             className="bg-white text-red-600 border border-red-300 rounded-md py-2 px-4 text-sm font-medium hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             Cancel Transfer
//                                         </button>
//                                     )}
//                                 </div>
//                                 {/* Display general submission error if any */}
//                                 {error && !isLoading && activeTab === 'Updates' && <p className="mt-4 text-sm text-red-600 text-right">{error}</p>}
//                             </div>
//                         )}

//                         {/* --- Details Tab (keep existing) --- */}
//                          {activeTab === "Details" && (
//                             <div className="space-y-6">
//                                 {/* Transaction Breakdown */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2">Transaction details</h3>
//                                      <dl className="space-y-2 text-sm">
//                                         {isPayment && ( <> <div className="flex justify-between"> <dt className="text-gray-500">Amount to add</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).amountToAdd.toFixed(2)} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Wise fee</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).wiseFee.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div> {(transactionDetails as PaymentDetails).bankTransferFee > 0 && <div className="flex justify-between"> <dt className="text-gray-500">Bank transfer fee</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).bankTransferFee.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>} <div className="flex justify-between border-t pt-2 mt-2"> <dt className="text-gray-600 font-medium">Total to pay</dt> <dd className="font-bold text-gray-900">{`${(transactionDetails as PaymentDetails).amountToPay.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Reference Code</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).referenceCode}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Payment Method</dt> <dd className="font-medium text-gray-800 capitalize">{(transactionDetails as PaymentDetails).paymentMethod.replace('_', ' ')}</dd> </div> </> )}
//                                         {isTransfer && ( <> <div className="flex justify-between"> <dt className="text-gray-500">You sent</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as TransferDetails).sendAmount.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Exchange rate</dt> <dd className="font-medium text-gray-800">{`1 ${(transactionDetails as TransferDetails).sendCurrency?.code} = ${(transactionDetails as TransferDetails).exchangeRate.toFixed(6)} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Fees</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as TransferDetails).fees.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div> <div className="flex justify-between border-t pt-2 mt-2"> <dt className="text-gray-600 font-medium">Recipient gets</dt> <dd className="font-bold text-gray-900">{`${(transactionDetails as TransferDetails).receiveAmount.toFixed(2)} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div> {(transactionDetails as TransferDetails).reason && <div className="flex justify-between"> <dt className="text-gray-500">Reason</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).reason}</dd> </div>} {(transactionDetails as TransferDetails).reference && <div className="flex justify-between"> <dt className="text-gray-500">Reference</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).reference}</dd> </div>} </> )}
//                                           <div className="flex justify-between"> <dt className="text-gray-500">Date Initiated</dt> <dd className="font-medium text-gray-800">{formatDisplayDate(transactionDetails.createdAt)}</dd> </div>
//                                           <div className="flex justify-between"> <dt className="text-gray-500">Last Updated</dt> <dd className="font-medium text-gray-800">{formatDisplayDate(transactionDetails.updatedAt)}</dd> </div>
//                                     </dl>
//                                 </div>
//                                 {/* Pay-in / Recipient Details */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2"> {isPayment ? 'Pay-in Bank Details' : 'Recipient Details'} </h3>
//                                      {isPayment && (transactionDetails as PaymentDetails).bankDetails && ( <dl className="space-y-2 text-sm"> {(transactionDetails as PaymentDetails).bankDetails?.payeeName && <div className="flex justify-between"> <dt className="text-gray-500">Payee Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.payeeName}</dd> </div>} {(transactionDetails as PaymentDetails).bankDetails?.iban && <div className="flex justify-between"> <dt className="text-gray-500">IBAN</dt> <dd className="font-mono text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.iban}</dd> </div>} {(transactionDetails as PaymentDetails).bankDetails?.bicSwift && <div className="flex justify-between"> <dt className="text-gray-500">BIC/SWIFT</dt> <dd className="font-mono text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.bicSwift}</dd> </div>} {(transactionDetails as PaymentDetails).bankDetails?.bankAddress && <div className="flex justify-between"> <dt className="text-gray-500">Bank Address</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.bankAddress}</dd> </div>} <p className="text-xs text-gray-500 pt-2">Please ensure you use the Reference Code <strong className="font-medium">{(transactionDetails as PaymentDetails).referenceCode}</strong> when making the payment from your bank.</p> </dl> )}
//                                      {isTransfer && (transactionDetails as TransferDetails).recipient && ( <dl className="space-y-2 text-sm"> <div className="flex justify-between"> <dt className="text-gray-500">Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.accountHolderName}</dd> </div> {(transactionDetails as TransferDetails).recipient.nickname && <div className="flex justify-between"> <dt className="text-gray-500">Nickname</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.nickname}</dd> </div>} <div className="flex justify-between"> <dt className="text-gray-500">Bank Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.bankName}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Account Number</dt> <dd className="font-mono text-gray-800">{(transactionDetails as TransferDetails).recipient.accountNumber}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Receiving Currency</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.currency.code}</dd> </div> </dl> )}
//                                 </div>
//                                 {/* Note Section */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-2 text-gray-700">Note</h3>
//                                     <textarea id="note" className="w-full bg-gray-50 rounded-md p-3 text-sm text-gray-700 border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Add a few notes to help you later (saving not yet implemented)" value={noteText} onChange={handleNoteChange} rows={3} />
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* --- Render the Modal --- */}
//             {/* It's outside the main content div but inside the page fragment */}
//             <CancelTransferModal
//                 isOpen={isCancelModalOpen}
//                 onClose={() => setIsCancelModalOpen(false)} // Close action
//                 transferNumber={transactionId} // Pass the ID
//                 onConfirmCancel={handleConfirmCancelTransfer} // Action on confirm
//             />
//         </>
//     );
// };

// export default TransactionDetailsPage;




// frontend/app/dashboard/transactions/[transactionId]/page.tsx

"use client"; // Essential for client-side hooks and interactivity

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation"; // Hooks for routing and params
import axios, { AxiosError } from "axios"; // For making HTTP requests (though services abstract this)
import { format, parseISO } from 'date-fns'; // For date formatting

// Icons
import { IoIosArrowBack } from "react-icons/io"; // Back arrow icon
import { LuPlus } from "react-icons/lu"; // Icon for Add Money
import { GoArrowUp } from "react-icons/go"; // Icon for Send Money
import { MdErrorOutline } from "react-icons/md"; // Error/Warning icon for timeline
import { FaCheck } from "react-icons/fa"; // Checkmark icon for completed timeline steps

// Custom Hooks & Services
import { useAuth } from "../../../hooks/useAuth"; // Authentication hook (adjust path if necessary)
import apiConfig from "../../../config/apiConfig"; // API base URL configuration (adjust path)
import paymentService from "../../../services/payment"; // Service for payment actions (adjust path)
import transferService from "../../../services/transfer"; // Service for transfer actions (adjust path)

// UI Components & Utils
import { cn } from "@/lib/utils"; // Utility for conditional class names (adjust path)
import { Button } from "@/components/ui/button"; // Button component (assuming Shadcn UI)
import CancelTransferModal from "../../components/CancelTransferModal"; // Modal for confirming transfer cancellation (adjust path)
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loader component

// Set Axios base URL (can also be done within services)
axios.defaults.baseURL = apiConfig.baseUrl;

// --- TypeScript Interfaces ---

// Interface for Payment Details
interface PaymentDetails {
    _id: string;
    type: 'payment'; // Discriminator field
    user: { _id: string; email?: string; fullName?: string };
    balanceCurrency: { _id: string; code: string; flagImage?: string };
    payInCurrency: { _id: string; code: string; flagImage?: string };
    amountToAdd: number;
    amountToPay: number;
    exchangeRate: number;
    wiseFee: number;
    bankTransferFee: number;
    referenceCode?: string;
    paymentMethod: string;
    status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled'; // Possible statuses
    bankDetails?: {
        payeeName?: string;
        iban?: string;
        bicSwift?: string;
        bankAddress?: string;
    };
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    note?: string;
}

// Interface for Transfer Details
interface TransferDetails {
    _id: string;
    type: 'transfer'; // Discriminator field
    user: { _id: string; email?: string; fullName?: string };
    sourceAccount: { // Assuming sourceAccount is populated with at least currency
        _id: string;
        currency: { _id: string; code: string; flagImage?: string };
    };
    recipient: { // Assuming recipient is populated
        _id: string;
        accountHolderName: string;
        nickname?: string;
        currency: { _id: string; code: string; flagImage?: string };
        accountNumber: string; // Could be IBAN, account number etc. depending on type
        bankName: string;
    };
    sendAmount: number;
    receiveAmount: number;
    sendCurrency: { _id: string; code: string; flagImage?: string };
    receiveCurrency: { _id: string; code: string; flagImage?: string };
    exchangeRate: number;
    fees: number;
    reason?: string;
    reference?: string;
    // Ensure 'processing' is included if your backend uses it for transfers
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled'; // Possible statuses
    failureReason?: string; // Optional reason for failure
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    note?: string;
}

// Union type for Transaction Details
type TransactionDetails = PaymentDetails | TransferDetails;

// Interface for page parameters (from URL)
interface TransactionDetailsPageParams {
    transactionId: string;
}

// --- Component Definition ---
const TransactionDetailsPage = () => {
    // --- Hooks ---
    const params = useParams<TransactionDetailsPageParams>(); // Get URL parameters
    const router = useRouter(); // Next.js router instance
    const { transactionId } = params; // Extract transactionId
    const { token } = useAuth(); // Get authentication token

    // --- State Variables ---
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state for initial fetch
    const [error, setError] = useState<string | null>(null); // Error message state
    const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates"); // State for active tab
    const [noteText, setNoteText] = useState(""); // State for the note textarea
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for buttons (cancel, etc.)
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // State for transfer cancel modal visibility

    // --- Data Fetching ---
    const fetchTransactionDetails = useCallback(async () => {
        // Basic validation
        if (!transactionId || !token) {
            setError("Missing transaction ID or authentication token.");
            setIsLoading(false);
            return;
        }

        // Reset states before fetching
        setIsLoading(true);
        setError(null);
        setTransactionDetails(null);

        try {
            // Attempt to fetch as a Transfer first
            try {
                console.log(`Attempting to fetch Transfer details for ID: ${transactionId}`);
                const transferData = await transferService.getTransferDetails(transactionId, token);
                console.log("Fetched Transfer Data:", transferData);
                setTransactionDetails({ ...transferData, type: 'transfer' }); // Add type discriminator
                setNoteText(transferData.note || "");
                setIsLoading(false);
                return; // Exit if transfer found
            } catch (transferErr: any) {
                // Log the error but only stop if it's not a "Not Found" type error
                console.warn(`Failed to fetch as Transfer (ID: ${transactionId}):`, transferErr.response?.data?.message || transferErr.message);
                // Check common "not found" conditions before throwing
                const isNotFoundError = transferErr.response?.status === 404 ||
                                        transferErr.message?.includes('not found') ||
                                        transferErr.message?.includes('Invalid ID format'); // Check for ID format errors too
                if (!isNotFoundError) {
                    throw transferErr; // Re-throw unexpected errors
                }
                // If it is a "not found" error, continue to try fetching as Payment
            }

            // Attempt to fetch as a Payment if not found as Transfer
            try {
                console.log(`Attempting to fetch Payment details for ID: ${transactionId}`);
                const paymentData = await paymentService.getPaymentDetails(transactionId, token);
                console.log("Fetched Payment Data:", paymentData);
                setTransactionDetails({ ...paymentData, type: 'payment' }); // Add type discriminator
                setNoteText(paymentData.note || "");
                setIsLoading(false);
                return; // Exit if payment found
            } catch (paymentErr: any) {
                console.error(`Failed to fetch as Payment (ID: ${transactionId}):`, paymentErr.response?.data?.message || paymentErr.message);
                 // Handle payment-specific "not found"
                 if (paymentErr.response?.status === 404 || paymentErr.message?.includes('not found')) {
                    setError(`Transaction with ID ${transactionId} not found.`);
                 } else {
                    // If error wasn't "not found", throw it
                    throw paymentErr;
                 }
                 // No need to return here, finally block will handle loading state
            }

             // Final check if nothing was found and no error was set
             if (!transactionDetails && !error) { // This check might be redundant due to error handling above
                 setError(`Transaction with ID ${transactionId} could not be found or accessed.`);
             }

        } catch (err: any) {
            // Catch errors re-thrown from the inner try-catch blocks
            const message = err.response?.data?.message || err.message || "Failed to load transaction details";
            setError(message);
            console.error("Unhandled error fetching transaction details:", err);
        } finally {
            setIsLoading(false); // Ensure loading state is always turned off
        }
    }, [transactionId, token]); // Dependencies for useCallback

    // Effect to run fetch data on component mount or when dependencies change
    useEffect(() => {
        fetchTransactionDetails();
    }, [fetchTransactionDetails]);

    // --- Loading State ---
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Skeleton className="h-8 w-20 mb-4" /> {/* Back button skeleton */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mx-auto max-w-4xl">
                    {/* Header Skeleton */}
                    <div className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-gray-200">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-grow space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-6 w-24 ml-auto" />
                    </div>
                    {/* Tabs Skeleton */}
                    <div className="border-b border-gray-200 px-6 h-14 flex items-end space-x-4">
                        <Skeleton className="h-5 w-16 mb-px" />
                        <Skeleton className="h-5 w-16 mb-px" />
                    </div>
                     {/* Content Skeleton */}
                     <div className="p-6 space-y-6">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-40 w-full" /> {/* Timeline placeholder */}
                        <Skeleton className="h-10 w-32 ml-auto" /> {/* Button placeholder */}
                    </div>
                </div>
            </div>
        );
    }

    // --- Error State ---
    if (error || !transactionDetails) {
        return (
            <div className="container mx-auto px-4 py-8">
                <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <IoIosArrowBack size={20} /> Back
                </button>
                <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md text-center max-w-4xl mx-auto">
                    Error: {error || "Transaction details not found or could not be loaded."}
                </div>
            </div>
        );
    }

    // --- Helper Functions & Derived Data ---
    const isPayment = transactionDetails.type === 'payment';
    const isTransfer = transactionDetails.type === 'transfer';

    // Formats ISO date string for display
    const formatDisplayDate = (dateString: string | undefined): string => {
        if (!dateString) return "Date not available";
        try {
            // Prefer 'en-US' or a specific locale for consistency
            return format(parseISO(dateString), "MMMM d 'at' h:mm a", { locale: navigator.language ? undefined : require('date-fns/locale/en-US') });
        } catch (e) {
            console.error("Date formatting error:", e, "Input:", dateString);
            // Fallback for potentially non-ISO strings (less ideal)
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString("en-US", { month: "long", day: "numeric" }) + ' at ' + date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
            }
            return "Invalid Date";
        }
    };

     // Generates steps for the timeline based on transaction type and status
     const getTimelineSteps = () => {
        // Guard clause if details aren't loaded (though handled by Error state)
        if (!transactionDetails) return [];

        if (isPayment) {
            const payment = transactionDetails as PaymentDetails;
            const createdDate = formatDisplayDate(payment.createdAt);
            // Use updatedAt for completion/failure/cancellation time, or createdDate as fallback
            const finalDate = formatDisplayDate(payment.updatedAt) || createdDate;

            // Status checks
            const isPending = payment.status === 'pending';
            const isInProgress = payment.status === 'in progress';
            const isComplete = payment.status === 'completed';
            const isCancelled = payment.status === 'canceled';
            const hasFailed = payment.status === 'failed';

            // Define base steps structure
            let steps = [
                { id: 'setup', label: "You set up this payment", status: 'completed' as const, date: createdDate, info: null as string | null },
                { id: 'waiting', label: `We're waiting for you to pay`, status: 'pending' as const, date: undefined as string | undefined, info: `Please send exactly ${payment.amountToPay.toFixed(2)} ${payment.payInCurrency?.code} to the bank details provided in the 'Details' tab using the reference ${payment.referenceCode}.` },
                { id: 'receive', label: `We receive your ${payment.payInCurrency?.code || 'money'}`, status: 'pending' as const, date: undefined, info: null },
                { id: 'add_balance', label: `We add it to your ${payment.balanceCurrency?.code || ''} balance`, status: 'pending' as const, date: undefined, info: null },
                { id: 'done', label: "All done!", status: 'pending' as const, date: undefined, info: null },
            ];

            // Adjust statuses based on the actual payment status
            if (isPending) {
                steps[1].status = 'active'; // 'Waiting' is the active step
            } else if (isInProgress) {
                steps[1].status = 'completed'; // User has paid
                steps[1].date = finalDate; // Assume updated time marks payment confirmation/receipt start
                steps[1].info = null;
                steps[2].status = 'active'; // 'Receiving/Processing' is active
                steps[2].date = finalDate;
                steps[2].info = `We're processing your payment of ${payment.amountToPay.toFixed(2)} ${payment.payInCurrency?.code}.`;
            } else if (isComplete) {
                // Mark all steps as completed
                steps = steps.map((step, index) => ({
                    ...step,
                    status: 'completed' as const,
                    date: index === 0 ? createdDate : finalDate, // Keep original setup date
                    info: null
                }));
            } else if (isCancelled || hasFailed) {
                 const finalStatus = isCancelled ? 'cancelled' : 'failed';
                 const finalInfo = isCancelled ? 'This payment was cancelled.' : `This payment failed. ${payment.failureReason || ''}`;

                 // Find the first non-completed step to mark as failed/cancelled
                 const failedStepIndex = steps.findIndex(step => step.status !== 'completed');

                 if (failedStepIndex > 0) { // If found after setup
                     // Mark steps before it as completed (if applicable)
                     for(let i=1; i<failedStepIndex; i++) {
                         steps[i].status = 'completed';
                         steps[i].date = finalDate; // Or a more specific timestamp if available
                         steps[i].info = null;
                     }
                     // Mark the step itself
                     steps[failedStepIndex].status = finalStatus;
                     steps[failedStepIndex].date = finalDate;
                     steps[failedStepIndex].info = finalInfo;
                 } else { // If it failed very early (e.g., during setup phase, though unlikely for cancel/fail status)
                     steps[1].status = finalStatus; // Mark the 'waiting' step
                     steps[1].date = finalDate;
                     steps[1].info = finalInfo;
                 }
                 // Keep subsequent steps pending or hide them
                 for(let i = (failedStepIndex > 0 ? failedStepIndex : 1) + 1; i < steps.length; i++){
                     steps[i].status = 'pending'; // Or maybe hide completely
                 }
             }

            return steps;

        } else if (isTransfer) {
            // --- Keep Transfer Timeline Logic (or adapt as needed) ---
            const transfer = transactionDetails as TransferDetails;
            const createdDate = formatDisplayDate(transfer.createdAt);
            const updatedDate = formatDisplayDate(transfer.updatedAt);

             const isSetup = true;
             const isProcessing = transfer.status === 'processing' || transfer.status === 'pending'; // Group pending/processing visually maybe
             const isActive = isProcessing; // Active step is during processing
             const isComplete = transfer.status === 'completed';
             const isCancelled = transfer.status === 'canceled';
             const hasFailed = transfer.status === 'failed';
             const finalStatus = isCancelled ? 'cancelled' : (hasFailed ? 'failed' : 'pending'); // Determine final non-complete status

             let steps = [
                 { id: 'setup', label: "You set up your transfer", status: 'completed' as const, date: createdDate, info: null },
                 { id: 'funded', label: `We've taken the funds from your ${transfer.sendCurrency?.code || ''} account`, status: (isComplete || isProcessing || isSetup && !isCancelled && !hasFailed) ? 'completed' as const : 'pending' as const, date: (isComplete || isProcessing) ? createdDate : undefined, info: null }, // Usually completed quickly after setup unless issue
                 { id: 'paid_out', label: `We paid out your ${transfer.receiveCurrency?.code || ''}`, status: isComplete ? 'completed' as const : (isActive ? 'active' as const : finalStatus), date: isComplete ? updatedDate : (isActive ? updatedDate : undefined), info: isActive ? `We're processing the payment to your recipient's bank. This usually takes 1-2 working days.` : (hasFailed ? `Failed to pay out: ${transfer.failureReason || 'Unknown reason'}` : (isCancelled ? 'Transfer cancelled before payout.' : null))},
                 { id: 'delivered', label: `Transfer successfully sent to recipient's bank`, status: isComplete ? 'completed' as const : 'pending' as const, date: isComplete ? updatedDate : undefined, info: null }, // Final confirmation
             ];

              // Adjust if cancelled/failed earlier
              if (isCancelled || hasFailed) {
                  const failedStepIndex = steps.findIndex(step => step.id === 'paid_out'); // Assume failure happens around payout
                  if (failedStepIndex > 0) {
                      steps[failedStepIndex].status = finalStatus;
                      steps[failedStepIndex].date = updatedDate;
                      // Keep subsequent steps pending or hide
                      for (let i = failedStepIndex + 1; i < steps.length; i++) {
                           steps[i].status = 'pending';
                      }
                  }
              }

             return steps;
        }
        return []; // Return empty array if type is unknown
    };
    const timelineSteps = getTimelineSteps(); // Generate timeline steps


    // --- Event Handlers ---

    // Generic Cancel Handler (calls specific service based on type)
    const handleCancel = async () => {
        if (!transactionId || !token || !transactionDetails) return;

        // Determine if cancellable based on current status
        const canCancel =
            (isPayment && (transactionDetails.status === "pending" || transactionDetails.status === "in progress")) ||
            (isTransfer && (transactionDetails.status === 'pending' || transactionDetails.status === 'processing'));

        if (!canCancel) {
             alert("This transaction cannot be cancelled in its current status.");
             return;
        }

        const confirmMessage = `Are you sure you want to cancel this ${isPayment ? 'payment' : 'transfer'}? This action cannot be undone.`;
        if (!window.confirm(confirmMessage)) return;

        setIsSubmitting(true);
        setError(null);

        try {
            if (isPayment) {
                await paymentService.cancelPayment(transactionId, token);
                 alert('Payment successfully cancelled.');
            } else {
                 // For transfers, we might rely on the modal confirmation,
                 // but if this button triggers it directly:
                 await transferService.cancelTransfer(transactionId, token);
                 alert('Transfer successfully cancelled.');
            }
             fetchTransactionDetails(); // Refresh data after cancellation
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || `Failed to cancel ${isPayment ? 'payment' : 'transfer'}`;
            setError(message); // Display error to the user
            console.error(`Error cancelling ${isPayment ? 'payment' : 'transfer'}:`, err);
        } finally {
            setIsSubmitting(false); // Reset button loading state
        }
    };

    // Handler specifically for confirming transfer cancellation via the modal
    const handleConfirmCancelTransfer = async () => {
         if (!isTransfer || !transactionId || !token) return;

         setIsSubmitting(true);
         setError(null);
         try {
             await transferService.cancelTransfer(transactionId, token);
             setIsCancelModalOpen(false); // Close modal on success
             alert("Transfer successfully cancelled.");
             fetchTransactionDetails(); // Refresh details
         } catch (err: any) {
             const message = err.response?.data?.message || err.message || "Failed to cancel transfer";
             setError(message);
             console.error("Error cancelling transfer:", err);
             // Optionally keep modal open on error, or close it:
             setIsCancelModalOpen(false);
         } finally {
             setIsSubmitting(false);
         }
    };

    // Handler for note textarea changes (saving not implemented)
     const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteText(e.target.value);
        // Add debounced save logic here if implementing note saving
        console.warn("Note editing UI enabled, but saving is not implemented yet.");
    };

    // --- Determine Button Visibility ---
    // Show general cancel button if status allows (and it's not a pending payment where "I've not paid" is shown)
    const showGeneralCancelButton = (
        (isPayment && transactionDetails.status === 'in progress') || // Can cancel payments 'in progress'? Check Wise policy
        (isTransfer && (transactionDetails.status === 'pending' || transactionDetails.status === 'processing'))
    );
    // Show specific "I've not paid" button only for pending payments
    const showNotPaidButton = isPayment && transactionDetails.status === 'pending';


    // --- Render Logic ---
    // Prepare header details safely
    const headerIcon = isPayment ? <LuPlus size={24} /> : <GoArrowUp size={24} />;
    const headerTitle = isPayment
        ? `To your ${(transactionDetails as PaymentDetails).balanceCurrency?.code ?? ''} balance`
        : (transactionDetails as TransferDetails).recipient?.accountHolderName || "Recipient";
    const headerAmountRaw = isPayment ? (transactionDetails as PaymentDetails).amountToAdd : (transactionDetails as TransferDetails).sendAmount;
    const headerCurrencyCode = isPayment
        ? (transactionDetails as PaymentDetails).balanceCurrency?.code
        : (transactionDetails as TransferDetails).sendCurrency?.code;
    const headerAmount = `${headerAmountRaw?.toFixed(2) ?? '0.00'} ${headerCurrencyCode ?? ''}`;
    const headerAmountSign = isPayment ? "+" : "-";

    // Determine status text based on type and status
     let headerStatusText = "Status unknown";
     switch (transactionDetails.status) {
         case 'pending':
             headerStatusText = isPayment ? "Waiting for you to pay" : "Transfer initiated";
             break;
         case 'in progress': // Payment specific
             headerStatusText = "Processing payment";
             break;
         case 'processing': // Transfer specific
             headerStatusText = "Transfer processing";
             break;
         case 'completed':
             headerStatusText = isPayment ? "Money added" : "Transfer completed";
             break;
         case 'canceled':
             headerStatusText = "Transaction cancelled";
             break;
         case 'failed':
             headerStatusText = "Transaction failed";
             break;
     }

    return (
        // Fragment to wrap page content and modal
        <>
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <IoIosArrowBack size={20} /> Back to Transactions
                </button>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mx-auto max-w-4xl">
                    {/* Card Header */}
                    <div className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-gray-200">
                         <div className={cn(
                            "rounded-full p-2 flex items-center justify-center",
                            isPayment ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                         )}>
                             {headerIcon}
                         </div>
                         <div className="flex-grow">
                             <h2 className="text-lg font-semibold text-gray-800">{headerTitle}</h2>
                              <p className={cn(
                                "text-sm capitalize font-medium", // Use capitalize for status
                                transactionDetails.status === 'completed' ? 'text-green-600' :
                                transactionDetails.status === 'canceled' || transactionDetails.status === 'failed' ? 'text-red-600' :
                                transactionDetails.status === 'pending' ? 'text-orange-600' : // Pending is orange
                                'text-blue-600' // In progress/processing is blue
                              )}>
                                 {headerStatusText}
                             </p>
                         </div>
                         <div className={cn(
                            "ml-auto font-semibold whitespace-nowrap text-lg",
                            isPayment ? 'text-green-600' : 'text-gray-800'
                         )}>
                             {headerAmountSign} {headerAmount}
                         </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200 px-6">
                        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                             <button
                                 onClick={() => setActiveTab("Updates")}
                                 className={cn(
                                     "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                                     activeTab === "Updates"
                                         ? "border-indigo-500 text-indigo-600"
                                         : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                 )}
                                 aria-current={activeTab === "Updates" ? "page" : undefined}
                             >
                                 Updates
                             </button>
                             <button
                                 onClick={() => setActiveTab("Details")}
                                 className={cn(
                                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                                    activeTab === "Details"
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                )}
                                 aria-current={activeTab === "Details" ? "page" : undefined}
                             >
                                 Details
                             </button>
                        </nav>
                    </div>

                    {/* Tab Content Area */}
                    <div className="p-6">
                        {/* --- Updates Tab Content --- */}
                        {activeTab === "Updates" && (
                            <div>
                                {/* Transaction ID / Reference Code */}
                                <div className="flex items-center mb-6 text-sm">
                                    <span className="text-gray-500 w-28 flex-shrink-0">
                                        {isPayment ? "Reference Code" : "Transfer ID"}
                                    </span>
                                    <span className="ml-2 font-medium text-gray-700 break-all">
                                         {isPayment ? (transactionDetails as PaymentDetails).referenceCode : transactionDetails._id}
                                    </span>
                                </div>

                                {/* Timeline Visualization */}
                                <div className="relative mt-6">
                                    {timelineSteps.length > 0 ? (
                                        <ul className="space-y-0"> {/* Remove space-y-6 if lines connect */}
                                            {timelineSteps.map((step, index) => (
                                                <li key={step.id || index} className="flex items-start space-x-3 pb-6 last:pb-0">
                                                    {/* Marker & Connecting Line */}
                                                    <div className="relative flex flex-col items-center flex-shrink-0">
                                                        {/* Marker Circle */}
                                                        <div className={cn(
                                                            "h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-white z-10",
                                                            step.status === "completed" && "bg-green-500 text-white",
                                                            step.status === "active" && "bg-indigo-600 text-white",
                                                            (step.status === "pending" || step.status === "failed" || step.status === "cancelled") && "bg-gray-300",
                                                             step.status === "failed" && "bg-red-500 text-white", // Specific color for failed?
                                                             step.status === "cancelled" && "bg-gray-500 text-white" // Specific color for cancelled?
                                                        )}>
                                                             {/* Icon inside marker */}
                                                             {step.status === "completed" && <FaCheck className="h-2.5 w-2.5" />}
                                                             {step.status === "active" && <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>}
                                                             {(step.status === "failed" || step.status === "cancelled") && <MdErrorOutline className="h-3 w-3 text-white"/>}
                                                         </div>
                                                        {/* Vertical Line Connector (only if not the last item) */}
                                                        {index < timelineSteps.length - 1 && (
                                                            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.5rem)] w-0.5 bg-gray-200" aria-hidden="true"></div>
                                                        )}
                                                    </div>

                                                    {/* Step Content */}
                                                    <div className="flex-1 pt-px"> {/* Adjust pt-px for alignment */}
                                                        <h4 className={cn(
                                                            "text-sm font-semibold",
                                                            step.status === 'pending' ? 'text-gray-500' :
                                                            (step.status === 'failed' || step.status === 'cancelled') ? 'text-red-600' :
                                                            'text-gray-800'
                                                        )}>
                                                            {step.label}
                                                        </h4>
                                                        {/* Date */}
                                                        {step.date && (<p className="text-xs text-gray-500 mt-0.5">{step.date}</p>)}
                                                        {/* Informational Text */}
                                                        {step.info && (
                                                            <div className={cn(
                                                                "mt-2 text-sm p-3 rounded-md border",
                                                                step.status === 'active' ? 'bg-blue-50 border-blue-200 text-blue-700' : // Active info style
                                                                (step.status === 'failed' || step.status === 'cancelled') ? 'bg-red-50 border-red-200 text-red-700' : // Fail/Cancel info style
                                                                'bg-gray-50 border-gray-200 text-gray-600' // Default info style
                                                            )}>
                                                                <p>{step.info}</p>
                                                            </div>
                                                        )}
                                                        {/* "I've not paid" Button for Pending Payments */}
                                                        {showNotPaidButton && step.id === 'waiting' && step.status === 'active' && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="mt-3 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 h-8 px-3" // Adjusted size
                                                                onClick={handleCancel} // Reuses the cancel logic
                                                                disabled={isSubmitting}
                                                            >
                                                                {isSubmitting ? 'Cancelling...' : "I've not paid / Cancel"}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-sm">Status updates could not be loaded.</p>
                                    )}
                                </div>

                                {/* General Action Buttons Area */}
                                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                                    {/* Show General Cancel Button if applicable */}
                                    {showGeneralCancelButton && (
                                        <Button
                                            variant="destructive" // Red button for cancellation
                                            onClick={isTransfer ? () => setIsCancelModalOpen(true) : handleCancel} // Use modal for transfer, direct for payment
                                            disabled={isSubmitting}
                                        >
                                             {isSubmitting ? 'Cancelling...' : `Cancel ${isPayment ? 'Payment' : 'Transfer'}`}
                                        </Button>
                                    )}
                                    {/* Add other action buttons here if needed */}
                                </div>
                                {/* Display general submission error if any */}
                                {error && activeTab === 'Updates' && <p className="mt-4 text-sm text-red-600 text-right">{error}</p>}
                            </div>
                        )}

                        {/* --- Details Tab Content --- */}
                        {activeTab === "Details" && (
                            <div className="space-y-6">
                                {/* Transaction Breakdown Section */}
                                <div>
                                    <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2">Transaction details</h3>
                                    <dl className="space-y-2 text-sm">
                                        {/* Payment Specific Details */}
                                        {isPayment && (
                                            <>
                                                <div className="flex justify-between"> <dt className="text-gray-500">Amount to add</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).amountToAdd.toFixed(2)} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500">Wise fee</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).wiseFee.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
                                                {(transactionDetails as PaymentDetails).bankTransferFee > 0 && <div className="flex justify-between"> <dt className="text-gray-500">Bank transfer fee</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).bankTransferFee.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>}
                                                <div className="flex justify-between border-t pt-2 mt-2"> <dt className="text-gray-600 font-medium">Total you needed to pay</dt> <dd className="font-bold text-gray-900">{`${(transactionDetails as PaymentDetails).amountToPay.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500">Reference Code</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).referenceCode}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500">Payment Method</dt> <dd className="font-medium text-gray-800 capitalize">{(transactionDetails as PaymentDetails).paymentMethod.replace('_', ' ')}</dd> </div>
                                            </>
                                        )}
                                        {/* Transfer Specific Details */}
                                        {isTransfer && (
                                            <>
                                                <div className="flex justify-between"> <dt className="text-gray-500">You sent</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as TransferDetails).sendAmount.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500">Exchange rate</dt> <dd className="font-medium text-gray-800">{`1 ${(transactionDetails as TransferDetails).sendCurrency?.code} = ${(transactionDetails as TransferDetails).exchangeRate.toFixed(6)} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500">Fees</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as TransferDetails).fees.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
                                                <div className="flex justify-between border-t pt-2 mt-2"> <dt className="text-gray-600 font-medium">Recipient gets</dt> <dd className="font-bold text-gray-900">{`${(transactionDetails as TransferDetails).receiveAmount.toFixed(2)} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div>
                                                {(transactionDetails as TransferDetails).reason && <div className="flex justify-between"> <dt className="text-gray-500">Reason</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).reason}</dd> </div>}
                                                {(transactionDetails as TransferDetails).reference && <div className="flex justify-between"> <dt className="text-gray-500">Reference</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).reference}</dd> </div>}
                                            </>
                                        )}
                                        {/* Common Details */}
                                        <div className="flex justify-between"> <dt className="text-gray-500">Date Initiated</dt> <dd className="font-medium text-gray-800">{formatDisplayDate(transactionDetails.createdAt)}</dd> </div>
                                        <div className="flex justify-between"> <dt className="text-gray-500">Last Updated</dt> <dd className="font-medium text-gray-800">{formatDisplayDate(transactionDetails.updatedAt)}</dd> </div>
                                    </dl>
                                </div>

                                {/* Pay-in / Recipient Details Section */}
                                <div>
                                    <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2">
                                        {isPayment ? 'Pay-in Bank Details (Where you needed to send money)' : 'Recipient Details'}
                                    </h3>
                                    {/* Payment Bank Details */}
                                    {isPayment && (transactionDetails as PaymentDetails).bankDetails && (
                                        <dl className="space-y-2 text-sm">
                                            {/* Render bank details like IBAN, BIC, Name etc. */}
                                             {(transactionDetails as PaymentDetails).bankDetails?.payeeName && <div className="flex justify-between"> <dt className="text-gray-500">Payee Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.payeeName}</dd> </div>}
                                             {(transactionDetails as PaymentDetails).bankDetails?.iban && <div className="flex justify-between"> <dt className="text-gray-500">IBAN</dt> <dd className="font-mono text-gray-800 break-all">{(transactionDetails as PaymentDetails).bankDetails?.iban}</dd> </div>}
                                             {(transactionDetails as PaymentDetails).bankDetails?.bicSwift && <div className="flex justify-between"> <dt className="text-gray-500">BIC/SWIFT</dt> <dd className="font-mono text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.bicSwift}</dd> </div>}
                                             {(transactionDetails as PaymentDetails).bankDetails?.bankAddress && <div className="flex justify-between"> <dt className="text-gray-500">Bank Address</dt> <dd className="font-medium text-gray-800 whitespace-pre-line">{(transactionDetails as PaymentDetails).bankDetails?.bankAddress}</dd> </div>}
                                             <p className="text-xs text-gray-500 pt-2">
                                                 Please ensure you use the Reference Code <strong className="font-medium">{(transactionDetails as PaymentDetails).referenceCode}</strong> when making the payment from your bank.
                                             </p>
                                        </dl>
                                    )}
                                    {/* Transfer Recipient Details */}
                                    {isTransfer && (transactionDetails as TransferDetails).recipient && (
                                        <dl className="space-y-2 text-sm">
                                            {/* Render recipient details like Name, Bank, Account Number etc. */}
                                            <div className="flex justify-between"> <dt className="text-gray-500">Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.accountHolderName}</dd> </div>
                                            {(transactionDetails as TransferDetails).recipient.nickname && <div className="flex justify-between"> <dt className="text-gray-500">Nickname</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.nickname}</dd> </div>}
                                            <div className="flex justify-between"> <dt className="text-gray-500">Bank Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.bankName}</dd> </div>
                                            <div className="flex justify-between"> <dt className="text-gray-500">Account Number</dt> <dd className="font-mono text-gray-800 break-all">{(transactionDetails as TransferDetails).recipient.accountNumber}</dd> </div>
                                            <div className="flex justify-between"> <dt className="text-gray-500">Receiving Currency</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.currency.code}</dd> </div>
                                        </dl>
                                    )}
                                </div>

                                {/* Note Section */}
                                <div>
                                    <h3 className="text-md font-semibold mb-2 text-gray-700">Note (for your reference)</h3>
                                    <textarea
                                        id="note"
                                        className="w-full bg-gray-50 rounded-md p-3 text-sm text-gray-700 border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Add a few notes to help you remember details about this transaction..."
                                        value={noteText}
                                        onChange={handleNoteChange}
                                        rows={3}
                                        aria-label="Transaction Note"
                                    />
                                    {/* Add a save button here if implementing note saving */}
                                </div>
                            </div>
                        )}
                    </div> {/* End Tab Content Area */}
                </div> {/* End Main Content Card */}
            </div> {/* End Container */}

            {/* --- Transfer Cancellation Modal --- */}
            {/* Only render if it's a transfer */}
            {isTransfer && (
                <CancelTransferModal
                    isOpen={isCancelModalOpen}
                    onClose={() => setIsCancelModalOpen(false)} // Action to close the modal
                    transferNumber={transactionId} // Pass the ID to display in the modal
                    onConfirmCancel={handleConfirmCancelTransfer} // Action to execute on confirmation
                />
            )}
        </> // End Fragment
    );
};

export default TransactionDetailsPage; // Export the component