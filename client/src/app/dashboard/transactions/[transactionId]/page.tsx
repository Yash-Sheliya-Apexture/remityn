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

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation"; // Hooks for routing and params
import Link from 'next/link'; // Import Link
import { format, parseISO } from 'date-fns'; // For date formatting

// Icons
import { IoIosArrowBack } from "react-icons/io"; // Back arrow icon
import { LuPlus } from "react-icons/lu"; // Icon for Add Money
import { GoArrowUp } from "react-icons/go"; // Icon for Send Money
import { MdErrorOutline } from "react-icons/md"; // Error/Warning icon for timeline
import { FaCheck, FaRegClock } from "react-icons/fa"; // Checkmark and Clock icons

// Custom Hooks & Services
import { useAuth } from "../../../hooks/useAuth"; // Adjust path if necessary
import apiConfig from "../../../config/apiConfig"; // API base URL configuration (adjust path)
import paymentService from "../../../services/payment"; // Adjust path
import transferService from "../../../services/transfer"; // Adjust path

// UI Components & Utils
import { cn } from "@/lib/utils"; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path
import CancelTransferModal from "../../components/CancelTransferModal"; // Adjust path
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path

// --- TypeScript Interfaces ---
interface PaymentDetails {
    _id: string;
    type: 'payment';
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
    status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled' | string; // Allow other strings for robustness
    bankDetails?: {
        payeeName?: string;
        iban?: string;
        bicSwift?: string;
        bankAddress?: string;
    };
    createdAt: string;
    updatedAt: string;
    note?: string;
    failureReason?: string;
}
interface TransferDetails {
    _id: string;
    type: 'transfer';
    user: { _id: string; email?: string; fullName?: string };
    sourceAccount: { _id: string; currency: { _id: string; code: string; flagImage?: string } };
    recipient: {
        _id: string;
        accountHolderName: string;
        nickname?: string;
        currency: { _id: string; code: string; flagImage?: string };
        accountNumber: string; // Assuming required for transfer display
        bankName: string; // Assuming required for transfer display
    };
    sendAmount: number;
    receiveAmount: number;
    sendCurrency: { _id: string; code: string; flagImage?: string };
    receiveCurrency: { _id: string; code: string; flagImage?: string };
    exchangeRate: number;
    fees: number; // Even if 0, keep for consistency
    reason?: string;
    reference?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled' | string;
    failureReason?: string;
    createdAt: string;
    updatedAt: string;
    note?: string;
}
type TransactionDetails = PaymentDetails | TransferDetails;
interface TransactionDetailsPageParams { transactionId: string; }
type TimelineStatus = 'completed' | 'active' | 'pending' | 'failed' | 'cancelled';
interface TimelineStep {
    id: string;
    label: string;
    status: TimelineStatus;
    date?: string;
    info?: string | null;
    showCancelAction?: boolean; // Flag for inline cancel button
}
// --- End Interfaces ---


// --- Component Definition ---
const TransactionDetailsPage = () => {
    // --- Hooks ---
    const params = useParams<TransactionDetailsPageParams>();
    const router = useRouter();
    const { transactionId } = params;
    const { token } = useAuth();

    // --- State Variables ---
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // General page error
    const [submissionError, setSubmissionError] = useState<string | null>(null); // Action-specific error
    const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
    const [noteText, setNoteText] = useState(""); // Note state
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for actions
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Modal visibility
    const [showAwaitingVerificationView, setShowAwaitingVerificationView] = useState(false); // Custom view flag
    const [copySuccess, setCopySuccess] = useState<string | null>(null); // Copy feedback state

    // --- Data Fetching ---
    const fetchTransactionDetails = useCallback(async (showLoading = true) => {
        if (!transactionId || !token) {
            setError("Missing transaction ID or authentication token.");
            setIsLoading(false);
            return;
        }
        if (showLoading) setIsLoading(true);
        setError(null); setSubmissionError(null);
        console.log("Fetching details for:", transactionId);

        try {
            let found = false;
            // Try fetching Transfer first
            try {
                const transferData = await transferService.getTransferDetails(transactionId, token);
                setTransactionDetails({ ...transferData, type: 'transfer' });
                setNoteText(transferData.note || "");
                setShowAwaitingVerificationView(false); // Reset custom view if it was a transfer
                found = true;
                console.log("Found as Transfer");
            } catch (transferErr: any) {
                const isNotFoundError = transferErr.response?.status === 404 || transferErr.message?.toLowerCase().includes('not found') || transferErr.message?.toLowerCase().includes('invalid id');
                if (!isNotFoundError) throw transferErr;
                console.warn(`Transfer ${transactionId} not found or error:`, transferErr.message);
            }

            // If not found as Transfer, try fetching Payment
            if (!found) {
                try {
                    const paymentData = await paymentService.getPaymentDetails(transactionId, token);
                    setTransactionDetails({ ...paymentData, type: 'payment' });
                    setNoteText(paymentData.note || "");
                    // Don't reset custom view if status is pending after clicking "I've paid"
                    if (paymentData.status !== 'pending') {
                        setShowAwaitingVerificationView(false);
                    }
                    found = true;
                    console.log("Found as Payment with status:", paymentData.status);
                } catch (paymentErr: any) {
                    if (paymentErr.response?.status === 404 || paymentErr.message?.toLowerCase().includes('not found')) {
                        setError(`Transaction with ID ${transactionId} not found.`);
                        setTransactionDetails(null);
                    } else { throw paymentErr; }
                    console.error(`Payment ${transactionId} not found or error:`, paymentErr.message);
                }
            }
             if (!found && !error) {
                setError(`Transaction with ID ${transactionId} could not be found or accessed.`);
                setTransactionDetails(null);
             }
        } catch (err: any) {
             const message = err.response?.data?.message || err.message || "Failed to load transaction details";
             setError(message);
             setTransactionDetails(null);
             console.error("Unhandled error fetching transaction details:", err);
        } finally { if (showLoading) setIsLoading(false); }
    }, [transactionId, token]); // Dependencies for useCallback

    // Effect to run fetch data on mount and when ID/token change
    useEffect(() => { fetchTransactionDetails(); }, [fetchTransactionDetails]); // Now depends on the stable useCallback version

    // --- Helper Functions & Derived Data ---
    const isPayment = transactionDetails?.type === 'payment';
    const isTransfer = transactionDetails?.type === 'transfer';

    const formatDisplayDate = (dateString: string | undefined): string => {
        if (!dateString) return "Date not available";
        try { return format(parseISO(dateString), "MMM d 'at' h:mm a"); }
        catch (e) { console.error("Date formatting error:", e, "Input:", dateString); return "Invalid Date"; }
    };

    // --- Timeline Logic ---
    const getTimelineSteps = (): TimelineStep[] => {
        if (!transactionDetails) return [];

        if (isPayment) {
            const payment = transactionDetails as PaymentDetails;
            const createdDate = formatDisplayDate(payment.createdAt);
            const finalDate = formatDisplayDate(payment.updatedAt);
            const isPending = payment.status === 'pending';
            const isInProgress = payment.status === 'in progress';
            const isComplete = payment.status === 'completed';
            const isCancelled = payment.status === 'canceled';
            const hasFailed = payment.status === 'failed';

            let steps: TimelineStep[] = [
                { id: 'setup', label: "You set up this payment", status: 'completed', date: createdDate, info: null, showCancelAction: false },
                { id: 'waiting', label: `We're waiting for you to pay`, status: 'pending', date: undefined, info: `Check the 'Details' tab for bank information.`, showCancelAction: false },
                { id: 'receive', label: `We receive your ${payment.payInCurrency?.code || 'money'}`, status: 'pending', date: undefined, info: null, showCancelAction: false },
                { id: 'add_balance', label: `We add it to your ${payment.balanceCurrency?.code || ''} balance`, status: 'pending', date: undefined, info: null, showCancelAction: false },
                { id: 'done', label: "All done!", status: 'pending', date: undefined, info: null, showCancelAction: false },
            ];

            if (isPending) {
                steps[1].status = 'active';
                steps[1].showCancelAction = true; // Show inline "I've not paid" button
            } else if (isInProgress) {
                 steps[1].status = 'completed'; steps[1].date = finalDate; steps[1].info = null;
                 steps[2].status = 'active'; steps[2].date = finalDate; // Use update time for receive step
                 steps[2].info = `We're processing your payment of ${payment.amountToPay.toFixed(2)} ${payment.payInCurrency?.code}.`;
            } else if (isComplete) {
                steps = steps.map((step, index) => ({ ...step, status: 'completed', date: index === 0 ? createdDate : finalDate, info: null, showCancelAction: false }));
            } else if (isCancelled || hasFailed) {
                const finalStatus: TimelineStatus = isCancelled ? 'cancelled' : 'failed';
                const finalInfo = isCancelled ? 'This payment was cancelled.' : `This payment failed. ${payment.failureReason || 'Unknown reason'}`;
                 const failedStepIndex = steps.findIndex(step => step.status !== 'completed');
                if (failedStepIndex >= 0) {
                     for(let i = 1; i < failedStepIndex; i++) { steps[i].status = 'completed'; steps[i].date = finalDate; steps[i].info = null; }
                     steps[failedStepIndex].status = finalStatus; steps[failedStepIndex].date = finalDate; steps[failedStepIndex].info = finalInfo;
                     for(let i = failedStepIndex + 1; i < steps.length; i++){ steps[i].status = 'pending'; steps[i].date = undefined; steps[i].info = null; }
                 } else { steps[steps.length - 1].status = finalStatus; steps[steps.length - 1].date = finalDate; steps[steps.length - 1].info = finalInfo; }
                 steps = steps.map(step => ({ ...step, showCancelAction: false }));
            }
            return steps;
        }
        else if (isTransfer) {
             // Keep existing transfer timeline logic
            const transfer = transactionDetails as TransferDetails;
            const createdDate = formatDisplayDate(transfer.createdAt); const updatedDate = formatDisplayDate(transfer.updatedAt); const isProcessing = transfer.status === 'processing' || transfer.status === 'pending'; const isComplete = transfer.status === 'completed'; const isCancelled = transfer.status === 'canceled'; const hasFailed = transfer.status === 'failed'; const finalStepStatus: TimelineStatus = isCancelled ? 'cancelled' : (hasFailed ? 'failed' : 'pending');
            let steps: TimelineStep[] = [ { id: 'setup', label: "You set up your transfer", status: 'completed', date: createdDate, info: null, showCancelAction: false }, { id: 'funded', label: `We've taken funds from your ${transfer.sendCurrency?.code || 'account'}`, status: (isComplete || isProcessing) ? 'completed' : 'pending', date: (isComplete || isProcessing) ? createdDate : undefined, info: null, showCancelAction: false }, { id: 'paid_out', label: `We pay out your ${transfer.receiveCurrency?.code || 'money'}`, status: isComplete ? 'completed' : (isProcessing ? 'active' : finalStepStatus), date: isComplete ? updatedDate : (isProcessing ? updatedDate : undefined), info: isProcessing ? `We're processing the payment to your recipient's bank.` : (hasFailed ? `Failed to pay out: ${transfer.failureReason || 'Unknown reason'}` : (isCancelled ? 'Transfer cancelled.' : null)), showCancelAction: false }, { id: 'delivered', label: `Sent to recipient's bank`, status: isComplete ? 'completed' : 'pending', date: isComplete ? updatedDate : undefined, info: null, showCancelAction: false }, ];
            if (isCancelled || hasFailed) { const failedStepIndex = steps.findIndex(step => step.id === 'paid_out'); if (failedStepIndex > 0) { steps[failedStepIndex].status = finalStepStatus; steps[failedStepIndex].date = updatedDate; for (let i = failedStepIndex + 1; i < steps.length; i++) { steps[i].status = 'pending'; } } steps = steps.map(step => ({ ...step, showCancelAction: false })); }
            return steps;
        }
        return [];
    };
    const timelineSteps = getTimelineSteps();

    // --- Event Handlers ---

    // Handles clicking the main "I've now paid" button for PENDING payments
    const handleConfirmPaymentSubmit = async () => {
        if (!transactionId || !token || !isPayment) return;
        setIsSubmitting(true); setSubmissionError(null);
        try {
            await paymentService.confirmUserTransfer(transactionId, token);
            setShowAwaitingVerificationView(true); // Show the custom view
            // Do not refresh data immediately
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || `Failed to confirm payment`;
            if (message.includes('not in pending state') || err.response?.status === 400) {
                 setError("Payment status may have already updated. Refreshing...");
                 await fetchTransactionDetails(false); // Refresh without main loading indicator
            } else { setSubmissionError(message); } // Show specific error
            console.error(`Error confirming payment (ID: ${transactionId}):`, err);
        } finally { setIsSubmitting(false); }
    };

    // Handles clicking the cancel button in the modal
    const handleConfirmCancel = async () => {
        if (!transactionId || !token || !transactionDetails) { setSubmissionError("Cannot proceed."); return; }
        setIsSubmitting(true); setSubmissionError(null);
        try {
            let cancelPromise;
            if (isPayment) { cancelPromise = paymentService.cancelPayment(transactionId, token); }
            else if (isTransfer) { cancelPromise = transferService.cancelTransfer(transactionId, token); }
            else { throw new Error("Unknown transaction type."); }
            await cancelPromise;
            setIsCancelModalOpen(false);
            await fetchTransactionDetails(); // Refresh data after successful cancel
        } catch (err: any) {
             const message = err.response?.data?.message || err.message || `Failed to cancel ${isPayment ? 'payment' : 'transfer'}`;
             setSubmissionError(message);
             console.error(`Error cancelling ${transactionDetails.type} (ID: ${transactionId}):`, err);
             setIsCancelModalOpen(false); // Close modal even on error
        } finally { setIsSubmitting(false); }
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setNoteText(e.target.value); };

     const handleCopyToClipboard = (text: string | undefined, fieldName: string) => {
        if (!text) { console.warn(`Attempted to copy empty field: ${fieldName}`); return; }
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(`${fieldName} copied!`);
            setTimeout(() => setCopySuccess(null), 1500); // Clear message after 1.5s
        }).catch(err => { console.error('Failed to copy text: ', err); alert(`Failed to copy ${fieldName}.`); });
    };

    // --- Determine Cancel Button Visibility ---
    const canCancelTransaction = useMemo(() => {
        if (!transactionDetails) return false;
        if (isPayment) return transactionDetails.status === 'pending' || transactionDetails.status === 'in progress';
        if (isTransfer) return transactionDetails.status === 'pending' || transactionDetails.status === 'processing';
        return false;
    }, [transactionDetails, isPayment, isTransfer]);


    // --- Render Logic ---
    if (isLoading && !transactionDetails) { return (
         <div className="container mx-auto px-4 py-8 animate-pulse">
             <Skeleton className="h-6 w-40 mb-4" />
             <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mx-auto max-w-4xl">
                 <Skeleton className="h-20 w-full" /> {/* Header */}
                 <Skeleton className="h-12 w-full border-y border-gray-200 dark:border-gray-700" /> {/* Tabs */}
                 <div className="p-6 space-y-6">
                     <Skeleton className="h-6 w-1/2" /> {/* Ref/ID */}
                     <Skeleton className="h-40 w-full" /> {/* Timeline */}
                     <Skeleton className="h-12 w-full" /> {/* Button Area */}
                 </div>
             </div>
         </div>
     ); }
    if (error && !transactionDetails) { return (
         <div className="container mx-auto px-4 py-8 text-center">
             <p className="text-red-600 bg-red-100 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">Error: {error}</p>
             <Button onClick={() => router.back()} variant="outline" className="mt-4">Go Back</Button>
         </div>
    ); }
    if (!transactionDetails) { return (
         <div className="container mx-auto px-4 py-8 text-center text-gray-500">
             Transaction details not found.
             <Button onClick={() => router.push('/dashboard/transactions')} variant="outline" className="mt-4">View Transactions</Button>
         </div>
     ); }

    // Header details calculation
    const headerIcon = isPayment ? <LuPlus size={24} /> : <GoArrowUp size={24} />;
    const headerTitle = isPayment ? `To your ${(transactionDetails as PaymentDetails).balanceCurrency?.code ?? ''} balance` : (transactionDetails as TransferDetails).recipient?.accountHolderName || "Recipient";
    const headerAmountRaw = isPayment ? (transactionDetails as PaymentDetails).amountToAdd : (transactionDetails as TransferDetails).sendAmount;
    const headerCurrencyCode = isPayment ? (transactionDetails as PaymentDetails).balanceCurrency?.code : (transactionDetails as TransferDetails).sendCurrency?.code;
    const headerAmount = `${headerAmountRaw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'} ${headerCurrencyCode ?? ''}`;
    const headerAmountSign = isPayment ? "+" : "-";
    let headerStatusText = "Status unknown"; let headerStatusColorClass = 'text-gray-600 dark:text-gray-400';
    // Determine header status text and color based on the *actual* transaction status
    switch (transactionDetails.status) {
        case 'pending': headerStatusText = isPayment ? "Waiting for you to pay" : "Transfer initiated"; headerStatusColorClass = 'text-orange-600 dark:text-orange-400'; break;
        case 'in progress': headerStatusText = "Processing payment"; headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; break;
        case 'processing': headerStatusText = "Transfer processing"; headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; break;
        case 'completed': headerStatusText = isPayment ? "Money added" : "Transfer completed"; headerStatusColorClass = 'text-green-600 dark:text-green-400'; break;
        case 'canceled': headerStatusText = "Transaction cancelled"; headerStatusColorClass = 'text-red-600 dark:text-red-400'; break;
        case 'failed': headerStatusText = "Transaction failed"; headerStatusColorClass = 'text-red-600 dark:text-red-400'; break;
    }
    // Override header status text if showing the custom view
    if (isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView) {
        headerStatusText = "Verifying Payment";
        headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; // Use 'in progress' color visually
    }

    return (
        <> {/* Fragment for page and modal */}
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
                    <IoIosArrowBack size={20} /> Back to Transactions
                </button>

                {/* Main Content Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mx-auto max-w-4xl">
                    {/* Card Header */}
                    <div className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-gray-200 dark:border-gray-700">
                         <div className={cn("rounded-full p-2 flex items-center justify-center flex-shrink-0", isPayment ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' )}> {headerIcon} </div>
                         <div className="flex-grow min-w-0"> <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">{headerTitle}</h2> <p className={cn("text-sm capitalize font-medium", headerStatusColorClass)}> {headerStatusText} </p> </div>
                         <div className={cn("ml-auto font-semibold whitespace-nowrap text-lg flex-shrink-0", isPayment ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100' )}> {headerAmountSign} {headerAmount} </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6">
                        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                             <button onClick={() => setActiveTab("Updates")} className={cn("whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium", activeTab === "Updates" ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300" )} aria-current={activeTab === "Updates" ? "page" : undefined}> Updates </button>
                             <button onClick={() => setActiveTab("Details")} className={cn("whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium", activeTab === "Details" ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300" )} aria-current={activeTab === "Details" ? "page" : undefined}> Details </button>
                        </nav>
                    </div>

                    {/* Tab Content Area */}
                    <div className="p-6">
                        {/* --- Updates Tab Content --- */}
                        {activeTab === "Updates" && (
                            <div>
                                {/* Transaction ID / Reference Code */}
                                <div className="flex items-center mb-6 text-sm">
                                    <span className="text-gray-500 dark:text-gray-400 w-28 flex-shrink-0">
                                        {isPayment ? "Reference Code" : "Transfer ID"}
                                    </span>
                                    <span className="ml-2 font-medium text-gray-700 dark:text-gray-300 break-all">
                                        {isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}
                                    </span>
                                </div>

                                {/* --- Conditional Rendering based on showAwaitingVerificationView --- */}
                                {isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView ? (
                                    // --- Render Awaiting Verification View ---
                                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                                        <FaRegClock className="text-4xl text-blue-500 mx-auto mb-4 animate-pulse" />
                                        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Thanks! We're checking your payment</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-md mx-auto">
                                            We received your confirmation and are now verifying the bank transfer. This usually takes a few hours, but can sometimes take up to 19 hours depending on your bank. We'll update the status here automatically once confirmed.
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Reference: {transactionDetails.referenceCode || 'N/A'}
                                        </p>
                                         <Button variant="outline" size="sm" onClick={() => fetchTransactionDetails(false)} className="mt-6" disabled={isSubmitting}>
                                             Refresh Status
                                         </Button>
                                    </div>
                                ) : (
                                    // --- Render Standard Timeline and Actions ---
                                    <>
                                        {/* Timeline Visualization */}
                                        <div className="relative mt-6">
                                            {timelineSteps.length > 0 ? (
                                                <ul className="space-y-0">
                                                    {timelineSteps.map((step, index) => (
                                                        <li key={step.id || index} className="flex items-start space-x-3 pb-6 last:pb-0">
                                                            {/* Marker & Line */}
                                                            <div className="relative flex flex-col items-center flex-shrink-0">
                                                                <div className={cn( "h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800 z-10", step.status === "completed" && "bg-green-500 text-white", step.status === "active" && "bg-indigo-600 text-white", step.status === "pending" && "bg-gray-300 dark:bg-gray-600", step.status === "failed" && "bg-red-500 text-white", step.status === "cancelled" && "bg-gray-500 text-white" )}>
                                                                    {step.status === "completed" && <FaCheck className="h-2.5 w-2.5" />}
                                                                    {step.status === "active" && <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>}
                                                                    {(step.status === "failed" || step.status === "cancelled") && <MdErrorOutline className="h-3 w-3 text-white"/>}
                                                                    {step.status === "pending" && <div className="h-2 w-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>}
                                                                </div>
                                                                {index < timelineSteps.length - 1 && ( <div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.5rem)] w-0.5 bg-gray-200 dark:bg-gray-600" aria-hidden="true"></div> )}
                                                            </div>
                                                            {/* Step Content */}
                                                            <div className="flex-1 pt-px min-w-0">
                                                                <h4 className={cn("text-sm font-semibold", step.status === 'pending' ? 'text-gray-500 dark:text-gray-400' : step.status === 'failed' ? 'text-red-600 dark:text-red-400' : step.status === 'cancelled' ? 'text-gray-600 dark:text-gray-300' : 'text-gray-800 dark:text-gray-100' )}> {step.label} </h4>
                                                                {step.date && (<p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.date}</p>)}
                                                                {step.info && (<div className={cn( "mt-2 text-sm p-3 rounded-md border", step.status === 'active' ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700/40 dark:text-blue-300' : step.status === 'failed' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-700/40 dark:text-red-300' : step.status === 'cancelled' ? 'bg-gray-100 border-gray-200 text-gray-600 dark:bg-gray-700/30 dark:border-gray-600/40 dark:text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-700/30 dark:border-gray-600/40 dark:text-gray-300' )}> <p>{step.info}</p> </div>)}
                                                                {/* Inline "I've not paid" Button (for pending payments) */}
                                                                {step.showCancelAction && (
                                                                    <Button variant="outline" size="sm" className="mt-3 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-300 h-8 px-3" onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting}> I've not paid </Button>
                                                                )}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : ( <p className="text-gray-500 dark:text-gray-400 text-sm">Status updates could not be loaded.</p> )}
                                        </div>

                                        {/* Conditional Bottom Action Area for PENDING Payments */}
                                        {isPayment && transactionDetails.status === 'pending' && !showAwaitingVerificationView && (
                                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Ready to pay?</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                    Find the bank details in the <button onClick={() => setActiveTab('Details')} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Details tab</button>. Once you've sent the money from your bank, click below.
                                                </p>
                                                {submissionError && <p className="mb-4 text-sm text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-700/40">{submissionError}</p>}
                                                <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
                                                    <Button variant="outline" onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting} className="order-2 sm:order-1"> Cancel transfer </Button>
                                                    <Button onClick={handleConfirmPaymentSubmit} disabled={isSubmitting} className="order-1 sm:order-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"> {isSubmitting ? 'Processing...' : "I've now paid"} </Button>
                                                </div>
                                            </div>
                                        )}

                                        {/* General Cancel Button (if cancelable and NOT the pending payment case handled above) */}
                                        {canCancelTransaction && !(isPayment && transactionDetails.status === 'pending') && (
                                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                                                <Button variant="destructive" onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting}>
                                                    {isSubmitting ? 'Processing...' : `Cancel ${isPayment ? 'Payment' : 'Transfer'}`}
                                                </Button>
                                            </div>
                                        )}
                                        {/* Display general submission error if needed */}
                                        {submissionError && activeTab === 'Updates' && !(isPayment && transactionDetails.status === 'pending') && <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-right">{submissionError}</p>}
                                    </>
                                )}
                                {/* --- End Conditional Rendering --- */}
                            </div>
                        )}

                        {/* --- Details Tab Content --- */}
                        {activeTab === "Details" && (
                             <div className="space-y-6">
                                {/* Transaction Breakdown */}
                                <div>
                                    <h3 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 pb-2">Transaction details</h3>
                                    <dl className="space-y-2 text-sm">
                                         {/* Payment Specific Details */}
                                        {isPayment && (
                                             <>
                                                <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Amount to add</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${(transactionDetails as PaymentDetails).amountToAdd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Total fees included</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${((transactionDetails as PaymentDetails).wiseFee + (transactionDetails as PaymentDetails).bankTransferFee).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Total amount to pay</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${(transactionDetails as PaymentDetails).amountToPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Exchange rate</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">1 {(transactionDetails as PaymentDetails).payInCurrency?.code} = {(transactionDetails as PaymentDetails).exchangeRate.toFixed(6)} {(transactionDetails as PaymentDetails).balanceCurrency?.code}</dd> </div>
                                                {(transactionDetails as PaymentDetails).failureReason && <div className="flex justify-between text-red-600 dark:text-red-400"> <dt>Failure Reason</dt> <dd>{(transactionDetails as PaymentDetails).failureReason}</dd> </div>}
                                             </>
                                         )}
                                         {/* Transfer Specific Details */}
                                        {isTransfer && (
                                             <>
                                                <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">You sent</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${(transactionDetails as TransferDetails).sendAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Fees</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${(transactionDetails as TransferDetails).fees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Exchange rate</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">1 {(transactionDetails as TransferDetails).sendCurrency?.code} = {(transactionDetails as TransferDetails).exchangeRate.toFixed(6)} {(transactionDetails as TransferDetails).receiveCurrency?.code}</dd> </div>
                                                <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Recipient gets</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${(transactionDetails as TransferDetails).receiveAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div>
                                                {(transactionDetails as TransferDetails).failureReason && <div className="flex justify-between text-red-600 dark:text-red-400"> <dt>Failure Reason</dt> <dd>{(transactionDetails as TransferDetails).failureReason}</dd> </div>}
                                             </>
                                         )}
                                         {/* Common Details */}
                                        <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Date Initiated</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{formatDisplayDate(transactionDetails.createdAt)}</dd> </div>
                                        <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Last Updated</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{formatDisplayDate(transactionDetails.updatedAt)}</dd> </div>
                                        <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">{isPayment ? 'Reference Code' : 'Transfer ID'}</dt> <dd className="font-medium text-gray-800 dark:text-gray-100 break-all">{isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}</dd> </div>
                                    </dl>
                                </div>

                                {/* Pay-in Bank Details / Recipient Details */}
                                <div>
                                    <h3 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 pb-2">
                                        {isPayment ? 'Pay-in Bank Details (Wise)' : 'Recipient Details'}
                                    </h3>
                                     {/* Payment Bank Details */}
                                    {isPayment && (transactionDetails as PaymentDetails).bankDetails && (
                                        <div className="space-y-3 text-sm">
                                            <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Payee name</p> <p className="font-semibold text-gray-800 dark:text-gray-100">{(transactionDetails as PaymentDetails).bankDetails?.payeeName || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.payeeName, 'Payee name')} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 px-2 h-auto">Copy</Button> </div>
                                            <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">IBAN</p> <p className="font-semibold text-gray-800 dark:text-gray-100 font-mono break-all">{(transactionDetails as PaymentDetails).bankDetails?.iban || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.iban, 'IBAN')} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 px-2 h-auto">Copy</Button> </div>
                                            <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Bank code (BIC/SWIFT)</p> <p className="font-semibold text-gray-800 dark:text-gray-100 font-mono">{(transactionDetails as PaymentDetails).bankDetails?.bicSwift || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.bicSwift, 'BIC/SWIFT')} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 px-2 h-auto">Copy</Button> </div>
                                            <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 p-3 rounded-md"> <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bank address</p> <p className="font-semibold text-gray-800 dark:text-gray-100 whitespace-pre-line">{(transactionDetails as PaymentDetails).bankDetails?.bankAddress || 'N/A'}</p> </div>
                                        </div>
                                     )}
                                     {/* Transfer Recipient Details */}
                                    {isTransfer && (transactionDetails as TransferDetails).recipient && (
                                        <dl className="space-y-2 text-sm">
                                             <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Name</dt> <dd className="font-medium text-gray-800 dark:text-gray-100 capitalize">{(transactionDetails as TransferDetails).recipient.accountHolderName}</dd> </div>
                                             <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Account Number</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">**** {(transactionDetails as TransferDetails).recipient.accountNumber?.slice(-4)}</dd> </div>
                                             <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Bank</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{(transactionDetails as TransferDetails).recipient.bankName}</dd> </div>
                                             {/* Add other recipient details like BIC/IFSC if relevant */}
                                        </dl>
                                     )}
                                     {/* Message if no details applicable */}
                                     {!isPayment && !isTransfer && <p className="text-sm text-gray-500 dark:text-gray-400">Details not applicable for this transaction type.</p>}

                                     {/* Copy Feedback */}
                                     {copySuccess && activeTab === 'Details' && <p className="text-sm text-center text-green-600 dark:text-green-400 mt-3">{copySuccess}</p>}
                                </div>

                                {/* Note Section */}
                                <div>
                                     <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">Note (for your reference)</h3>
                                     <textarea id="note" className="w-full bg-gray-50 dark:bg-gray-700 rounded-md p-3 text-sm text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400" placeholder="Add notes about this transaction..." value={noteText} onChange={handleNoteChange} rows={3} aria-label="Transaction Note" />
                                     {/* TODO: Add save note functionality if needed */}
                                </div>
                             </div>
                         )}
                    </div> {/* End Tab Content Area */}
                </div> {/* End Main Content Card */}
            </div> {/* End Container */}

            {/* --- Cancellation Modal --- */}
            {transactionDetails && (
                <CancelTransferModal
                    isOpen={isCancelModalOpen}
                    onClose={() => setIsCancelModalOpen(false)}
                    transactionId={transactionId}
                    transactionType={transactionDetails.type}
                    onConfirmCancel={handleConfirmCancel}
                    isSubmitting={isSubmitting}
                />
            )}
        </> // End Fragment
    );
};

export default TransactionDetailsPage;