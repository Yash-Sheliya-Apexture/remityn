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



// frontend/app/dashboard/transactions/[transactionId]/page.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { LuPlus } from "react-icons/lu"; // Icon for Add Money
import { GoArrowUp } from "react-icons/go"; // Icon for Send Money
import { useAuth } from "../../../hooks/useAuth";
import axios, { AxiosError } from "axios";
import apiConfig from "../../../config/apiConfig";
import { cn } from "@/lib/utils";
import paymentService from "../../../services/payment"; // Import payment service
import transferService from "../../../services/transfer"; // Import transfer service
import { format, parseISO } from 'date-fns'; // For consistent date formatting

axios.defaults.baseURL = apiConfig.baseUrl;

// --- Interfaces ---
// Interface for Payment Details (keep existing or refine)
interface PaymentDetails {
    _id: string;
    type: 'payment'; // Add type identifier
    user: { _id: string; email?: string; fullName?: string }; // Added fullName optional
    balanceCurrency: { _id: string; code: string; flagImage?: string };
    payInCurrency: { _id: string; code: string; flagImage?: string };
    amountToAdd: number;
    amountToPay: number;
    exchangeRate: number;
    wiseFee: number;
    bankTransferFee: number;
    referenceCode?: string; // Optional as it's payment specific
    transactionNumber?: string; // Optional general transaction ID
    paymentMethod: string;
    status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled';
    bankDetails?: { // Wise's bank details for user to pay into
        payeeName?: string;
        iban?: string;
        bicSwift?: string;
        bankAddress?: string;
    };
    createdAt: string;
    updatedAt: string; // Add updatedAt
    note?: string;
}

// Interface for Transfer Details
interface TransferDetails {
    _id: string;
    type: 'transfer'; // Add type identifier
    user: { _id: string; email?: string; fullName?: string }; // Added fullName optional
    sourceAccount: {
        _id: string;
        currency: { _id: string; code: string; flagImage?: string };
        // balance?: number; // Might not be needed on details page
    };
    recipient: {
        _id: string;
        accountHolderName: string;
        nickname?: string;
        currency: { _id: string; code: string; flagImage?: string };
        accountNumber: string;
        bankName: string;
        // Add other recipient fields if needed (address, ifscCode etc.)
    };
    sendAmount: number;
    receiveAmount: number;
    sendCurrency: { _id: string; code: string; flagImage?: string }; // Populated from sourceAccount usually
    receiveCurrency: { _id: string; code: string; flagImage?: string }; // Populated from recipient usually
    exchangeRate: number;
    fees: number; // Should be 0 based on current service logic
    reason?: string;
    reference?: string; // User provided reference
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled';
    transactionId?: string; // Optional specific transaction ID from provider
    failureReason?: string;
    createdAt: string;
    updatedAt: string;
    note?: string; // Optional: Add if you implement notes for transfers
}

// Union type for the state
type TransactionDetails = PaymentDetails | TransferDetails;

// Params interface remains the same
interface TransactionDetailsPageParams {
    transactionId: string;
}

// --- Component ---
const TransactionDetailsPage = () => {
    const params = useParams<TransactionDetailsPageParams>();
    const router = useRouter();
    const { transactionId } = params;
    const { token } = useAuth();

    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
    const [noteText, setNoteText] = useState(""); // TODO: Implement note saving for transfers later

    // --- Data Fetching ---
    const fetchTransactionDetails = useCallback(async () => {
        if (!transactionId || !token) {
            setError("Missing transaction ID or authentication token.");
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        setTransactionDetails(null); // Reset details on fetch

        try {
            // Try fetching as a Transfer first (more common for outgoing view?)
            try {
                console.log(`Attempting to fetch Transfer details for ID: ${transactionId}`);
                const transferData = await transferService.getTransferDetails(transactionId, token);
                console.log("Fetched Transfer Data:", transferData);
                setTransactionDetails({ ...transferData, type: 'transfer' }); // Add type identifier
                setNoteText(transferData.note || ""); // Set note if exists
                setIsLoading(false);
                return; // Exit if transfer found
            } catch (transferErr: any) {
                 console.warn(`Failed to fetch as Transfer (ID: ${transactionId}):`, transferErr.response?.data?.message || transferErr.message);
                if (transferErr.response?.status !== 404 && transferErr.message !== 'Transfer not found or access denied.' && !transferErr.message?.includes('Invalid transfer ID format')) {
                     // If it's not a "Not Found" error, it's a real error
                     throw transferErr; // Re-throw to be caught by outer catch
                 }
                 // If it was a 404 or specific "not found", proceed to try fetching as Payment
            }

            // If not found as Transfer, try fetching as Payment
            try {
                 console.log(`Attempting to fetch Payment details for ID: ${transactionId}`);
                 const paymentData = await paymentService.getPaymentDetails(transactionId, token);
                 console.log("Fetched Payment Data:", paymentData);
                 setTransactionDetails({ ...paymentData, type: 'payment' }); // Add type identifier
                 setNoteText(paymentData.note || "");
                 setIsLoading(false);
                 return; // Exit if payment found
            } catch (paymentErr: any) {
                 console.error(`Failed to fetch as Payment (ID: ${transactionId}):`, paymentErr.response?.data?.message || paymentErr.message);
                 if (paymentErr.response?.status === 404 || paymentErr.message === 'Payment not found.') {
                     setError(`Transaction with ID ${transactionId} not found.`);
                 } else {
                      // Throw other payment errors
                    throw paymentErr;
                 }
            }

            // If neither fetch worked and no error was thrown previously
            if (!transactionDetails && !error) {
                 setError(`Transaction with ID ${transactionId} could not be found or accessed.`);
            }


        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to load transaction details";
            setError(message);
            console.error("Error fetching transaction details:", err);
             // Optional: Redirect on specific errors like 401/403 if needed
            // if (err.response?.status === 401 || err.response?.status === 403) router.push('/login');
        } finally {
            setIsLoading(false);
        }
    }, [transactionId, token]); // Removed router from dependencies unless needed for redirects

    useEffect(() => {
        fetchTransactionDetails();
    }, [fetchTransactionDetails]); // Depend only on the memoized fetch function


    // --- Loading & Error States ---
    if (isLoading) {
        return <div className="container mx-auto px-4 py-8 text-center">Loading transaction details...</div>;
    }

    if (error || !transactionDetails) {
        return (
            <div className="container mx-auto px-4 py-8">
                 <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <IoIosArrowBack size={20} /> Back
                </button>
                <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md text-center">
                    Error: {error || "Transaction details not found or could not be loaded."}
                </div>
            </div>
        );
    }

    // --- Helper Functions & Derived Data ---
    const isPayment = transactionDetails.type === 'payment';
    const isTransfer = transactionDetails.type === 'transfer';

    const formatDisplayDate = (dateString: string | undefined): string => {
        if (!dateString) return "Date not available";
        try {
            // Use date-fns for robust parsing and formatting
            return format(parseISO(dateString), "MMMM d 'at' h:mm a");
        } catch (e) {
            console.error("Date formatting error:", e);
            // Fallback to simpler formatting if parseISO fails
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Invalid Date";
            return date.toLocaleDateString("en-US", {
                month: "long", day: "numeric", hour: "numeric", minute: "2-digit"
            });
        }
    };

    const getTimelineSteps = () => {
        if (isPayment) {
            // Payment Timeline (similar to original)
            const payment = transactionDetails as PaymentDetails;
            const createdDate = formatDisplayDate(payment.createdAt);
            // Derive more specific statuses if backend provides them, otherwise keep simple
             const isWaiting = payment.status === 'pending' || payment.status === 'in progress';
             const isComplete = payment.status === 'completed';
             const isCancelled = payment.status === 'canceled';
             const hasFailed = payment.status === 'failed';

             return [
                 { label: "You set up your transfer", status: 'completed', date: createdDate },
                 { label: "We’re waiting for your money", status: isWaiting ? 'active' : (isComplete || isCancelled || hasFailed ? 'completed' : 'pending') }, // Simplified logic
                 { label: `We receive your ${payment.payInCurrency?.code || 'money'}`, status: isComplete ? 'completed' : (isCancelled || hasFailed || isWaiting ? 'pending' : 'pending') }, // More specific status needed from backend ideally
                 { label: `We add it to your ${payment.balanceCurrency?.code || ''} balance`, status: isComplete ? 'completed' : 'pending' },
                 { label: "All done!", status: isComplete ? 'completed' : 'pending' }, // Final step
             ];
        } else if (isTransfer) {
            // Transfer Timeline (based on Wise screenshot and Transfer statuses)
            const transfer = transactionDetails as TransferDetails;
            const createdDate = formatDisplayDate(transfer.createdAt);
            const updatedDate = formatDisplayDate(transfer.updatedAt); // Use updated for progress

             const isSetup = true; // Always true once created
             const isProcessing = transfer.status === 'processing' || transfer.status === 'pending'; // Combine pending and processing visually?
             const isComplete = transfer.status === 'completed';
             const isCancelled = transfer.status === 'canceled';
             const hasFailed = transfer.status === 'failed';

             // Example structure - adjust based on actual backend status flow if more granular
             return [
                 { label: "You set up your transfer", status: 'completed', date: createdDate },
                 { label: `We've taken the funds from your ${transfer.sendCurrency?.code || ''} account`, status: isSetup && !isCancelled && !hasFailed ? 'completed' : 'pending', date: createdDate }, // Assumes debit happens on creation
                 { label: `We paid out your ${transfer.receiveCurrency?.code || ''}`, status: isComplete ? 'completed' : (isProcessing ? 'active' : (isCancelled || hasFailed ? 'pending' : 'pending')), date: isComplete || isProcessing ? updatedDate : undefined },
                 { label: `Transfer successfully sent to your recipient's bank`, status: isComplete ? 'completed' : (isProcessing ? 'active' : 'pending'), date: isComplete ? updatedDate : undefined },
                 // Optional: Add expected delivery if available
                 // { label: `Should arrive by ${transfer.estimatedArrival || '...'}`, status: 'pending' } // Example
             ];
        }
        return []; // Default empty timeline
    };

    const timelineSteps = getTimelineSteps();

    // --- Event Handlers ---
    const handleCancelPayment = async () => {
        if (!isPayment || !transactionId) return;

        const payment = transactionDetails as PaymentDetails;
        if (payment.status !== "pending" && payment.status !== "in progress") {
            alert("This payment cannot be cancelled in its current status.");
            return;
        }

        const confirmCancel = window.confirm("Are you sure you want to cancel this payment?");
        if (!confirmCancel) return;

        setIsLoading(true); // Use loading state for feedback
        setError(null);
        try {
            await paymentService.cancelPayment(transactionId, token);
            alert("Payment successfully cancelled.");
            // Refetch details to show updated status or redirect
            fetchTransactionDetails(); // Refetch
            // router.push("/dashboard/transactions"); // Or redirect
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to cancel payment";
            setError(message);
            console.error("Error cancelling payment:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteText(e.target.value);
        // TODO: Add debounced save functionality here if notes are editable
        // For now, it just updates local state. Need backend PUT/PATCH endpoint.
        console.warn("Note editing UI enabled, but saving is not implemented yet.");
    };

    // --- Render Logic ---
    const headerIcon = isPayment ? <LuPlus size={24} /> : <GoArrowUp size={24} />;
    const headerTitle = isPayment
        ? `To your ${(transactionDetails as PaymentDetails).balanceCurrency?.code} balance`
        : (transactionDetails as TransferDetails).recipient?.accountHolderName || "Recipient";
    const headerAmount = isPayment
        ? `${(transactionDetails as PaymentDetails).amountToAdd.toFixed(2)} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`
        : `${(transactionDetails as TransferDetails).sendAmount.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`;
    const headerAmountSign = isPayment ? "+" : "-";
    const headerStatusText = // More descriptive status
        transactionDetails.status === 'pending' ? (isPayment ? "Waiting for your money" : "Transfer initiated") :
        transactionDetails.status === 'in progress' ? (isPayment ? "Processing payment" : "Transfer in progress") :
        transactionDetails.status === 'processing' ? "Transfer processing" : // Transfer specific
        transactionDetails.status === 'completed' ? (isPayment ? "Money added" : "Transfer completed") :
        transactionDetails.status === 'canceled' ? "Transaction canceled" :
        transactionDetails.status === 'failed' ? "Transaction failed" : "Status unknown";


    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => router.back()}
                className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
                <IoIosArrowBack size={20} /> Back
            </button>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mx-auto max-w-4xl"> {/* Added max-width */}
                {/* --- Header --- */}
                <div className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-gray-200">
                    <div className={`rounded-full p-2 flex items-center justify-center ${isPayment ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                        {headerIcon}
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-lg font-semibold text-gray-800">{headerTitle}</h2>
                        <p className={cn(
                            "text-sm",
                             transactionDetails.status === 'completed' ? 'text-green-600' :
                             transactionDetails.status === 'canceled' || transactionDetails.status === 'failed' ? 'text-red-600' :
                             'text-gray-500' // Default for pending/in progress
                        )}>
                            {headerStatusText}
                        </p>
                    </div>
                    <div className={cn(
                        "ml-auto font-semibold whitespace-nowrap",
                        isPayment ? 'text-green-600' : 'text-gray-800'
                        )}>
                        {headerAmountSign} {headerAmount}
                    </div>
                </div>

                {/* --- Tabs --- */}
                <div className="border-b border-gray-200 px-6">
                    <nav className="-mb-px flex justify-between" aria-label="Tabs">
                        <div className="flex space-x-4">
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
                        </div>
                         {/* Optional: Add general action buttons here if needed */}
                         {/* <div className="flex items-center gap-2"> ... </div> */}
                    </nav>
                </div>

                {/* --- Tab Content --- */}
                <div className="p-6">
                    {/* --- Updates Tab --- */}
                    {activeTab === "Updates" && (
                        <div>
                            {/* Transaction ID / Reference */}
                            <div className="flex items-center mb-6 text-sm">
                                <span className="text-gray-500 w-28"> {/* Fixed width for alignment */}
                                    {isPayment ? "Reference Code" : "Transfer ID"}
                                    </span>
                                <span className="ml-2 font-medium text-gray-700">
                                    {isPayment ? (transactionDetails as PaymentDetails).referenceCode : transactionDetails._id}
                                </span>
                                {/* Add Copy button if needed */}
                            </div>

                             {/* Timeline */}
                            <div className="relative mt-6">
                                 {timelineSteps.length > 0 ? (
                                    <ul className="space-y-6">
                                        {timelineSteps.map((step, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                 {/* Timeline Marker */}
                                                <div className="relative flex flex-col items-center">
                                                    <div
                                                        className={cn(
                                                            "h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-white", // Ring for better visibility over line
                                                            step.status === "completed" && "bg-green-500 text-white",
                                                            step.status === "active" && "bg-indigo-600 text-white",
                                                            step.status === "pending" && "bg-gray-300"
                                                        )}
                                                    >
                                                        {step.status === "completed" && (
                                                             <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /> </svg>
                                                        )}
                                                         {step.status === "active" && (
                                                             <div className="h-2 w-2 bg-white rounded-full"></div> // Inner dot for active
                                                         )}
                                                    </div>
                                                     {/* Connecting Line */}
                                                    {index < timelineSteps.length - 1 && (
                                                        <div
                                                            className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%-1.25rem+1.5rem)] w-0.5 bg-gray-200" // Adjusted length/positioning
                                                            aria-hidden="true"
                                                        ></div>
                                                    )}
                                                </div>
                                                 {/* Timeline Content */}
                                                <div className="flex-1 pb-6"> {/* Added padding bottom */}
                                                    <h4
                                                        className={cn(
                                                            "text-sm font-semibold",
                                                             step.status === 'pending' ? 'text-gray-500' : 'text-gray-800'
                                                        )}
                                                    >
                                                        {step.label}
                                                    </h4>
                                                     {step.date && (
                                                        <p className="text-xs text-gray-500 mt-0.5">{step.date}</p>
                                                    )}
                                                    {/* Specific messages for active steps */}
                                                    {step.status === 'active' && isPayment && step.label === "We’re waiting for your money" && (
                                                        <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
                                                            <p>
                                                                Please send exactly <strong className="font-medium">{`${(transactionDetails as PaymentDetails).amountToPay.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</strong> to the bank details provided in the 'Details' tab using the reference <strong className="font-medium">{(transactionDetails as PaymentDetails).referenceCode}</strong>.
                                                            </p>
                                                            <p className="mt-1">We'll notify you once received.</p>
                                                             {/* Optional: Add "I've Paid" button if needed */}
                                                        </div>
                                                    )}
                                                      {step.status === 'active' && isTransfer && step.label.includes("paid out") && (
                                                        <div className="mt-1 text-sm text-gray-500">
                                                             <p>We're processing the payment to your recipient's bank. This can take up to 2 working days.</p>
                                                        </div>
                                                     )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                 ) : (
                                     <p className="text-gray-500 text-sm">Status updates will appear here.</p>
                                 )}
                            </div>

                             {/* Action Buttons */}
                             <div className="mt-8 flex justify-end space-x-3">
                                {/* Show Cancel only for cancellable Payments */}
                                {isPayment && ((transactionDetails as PaymentDetails).status === 'pending' || (transactionDetails as PaymentDetails).status === 'in progress') && (
                                     <button
                                        onClick={handleCancelPayment}
                                        disabled={isLoading} // Disable while loading
                                        className="bg-white text-red-600 border border-red-300 rounded-md py-2 px-4 text-sm font-medium hover:bg-red-50 disabled:opacity-50"
                                    >
                                        {isLoading ? 'Cancelling...' : 'Cancel Payment'}
                                    </button>
                                )}
                                {/* Add other buttons like "Repeat Transfer" if needed */}
                                {isTransfer && (
                                     <button
                                        onClick={() => alert('Repeat transfer functionality not yet implemented.')} // Placeholder
                                        className="bg-indigo-600 text-white border border-transparent rounded-md py-2 px-4 text-sm font-medium hover:bg-indigo-700"
                                    >
                                        Repeat transfer
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                     {/* --- Details Tab --- */}
                    {activeTab === "Details" && (
                        <div className="space-y-6">
                             {/* Transaction Breakdown */}
                            <div>
                                <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2">Transaction details</h3>
                                <dl className="space-y-2 text-sm">
                                    {isPayment && (
                                        <>
                                            <div className="flex justify-between"> <dt className="text-gray-500">Amount to add</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).amountToAdd.toFixed(2)} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`}</dd> </div>
                                            <div className="flex justify-between"> <dt className="text-gray-500">Wise fee</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).wiseFee.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
                                            {/* Add bank fee if applicable */}
                                             {(transactionDetails as PaymentDetails).bankTransferFee > 0 && <div className="flex justify-between"> <dt className="text-gray-500">Bank transfer fee</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).bankTransferFee.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>}
                                            <div className="flex justify-between border-t pt-2 mt-2"> <dt className="text-gray-600 font-medium">Total to pay</dt> <dd className="font-bold text-gray-900">{`${(transactionDetails as PaymentDetails).amountToPay.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
                                            <div className="flex justify-between"> <dt className="text-gray-500">Reference Code</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).referenceCode}</dd> </div>
                                             <div className="flex justify-between"> <dt className="text-gray-500">Payment Method</dt> <dd className="font-medium text-gray-800 capitalize">{(transactionDetails as PaymentDetails).paymentMethod.replace('_', ' ')}</dd> </div>
                                        </>
                                    )}
                                    {isTransfer && (
                                        <>
                                            <div className="flex justify-between"> <dt className="text-gray-500">You sent</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as TransferDetails).sendAmount.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
                                            <div className="flex justify-between"> <dt className="text-gray-500">Exchange rate</dt> <dd className="font-medium text-gray-800">{`1 ${(transactionDetails as TransferDetails).sendCurrency?.code} = ${(transactionDetails as TransferDetails).exchangeRate.toFixed(6)} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div>
                                            <div className="flex justify-between"> <dt className="text-gray-500">Fees</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as TransferDetails).fees.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div> {/* Fee currency is usually send currency */}
                                            <div className="flex justify-between border-t pt-2 mt-2"> <dt className="text-gray-600 font-medium">Recipient gets</dt> <dd className="font-bold text-gray-900">{`${(transactionDetails as TransferDetails).receiveAmount.toFixed(2)} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div>
                                             {(transactionDetails as TransferDetails).reason && <div className="flex justify-between"> <dt className="text-gray-500">Reason</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).reason}</dd> </div>}
                                             {(transactionDetails as TransferDetails).reference && <div className="flex justify-between"> <dt className="text-gray-500">Reference</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).reference}</dd> </div>}
                                        </>
                                    )}
                                      <div className="flex justify-between"> <dt className="text-gray-500">Date Initiated</dt> <dd className="font-medium text-gray-800">{formatDisplayDate(transactionDetails.createdAt)}</dd> </div>
                                      <div className="flex justify-between"> <dt className="text-gray-500">Last Updated</dt> <dd className="font-medium text-gray-800">{formatDisplayDate(transactionDetails.updatedAt)}</dd> </div>
                                </dl>
                            </div>

                             {/* Payment Bank Details / Transfer Recipient Details */}
                             <div>
                                <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2">
                                     {isPayment ? 'Pay-in Bank Details' : 'Recipient Details'}
                                </h3>
                                {isPayment && (transactionDetails as PaymentDetails).bankDetails && (
                                    <dl className="space-y-2 text-sm">
                                        {(transactionDetails as PaymentDetails).bankDetails?.payeeName && <div className="flex justify-between"> <dt className="text-gray-500">Payee Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.payeeName}</dd> </div>}
                                        {(transactionDetails as PaymentDetails).bankDetails?.iban && <div className="flex justify-between"> <dt className="text-gray-500">IBAN</dt> <dd className="font-mono text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.iban}</dd> </div>}
                                         {(transactionDetails as PaymentDetails).bankDetails?.bicSwift && <div className="flex justify-between"> <dt className="text-gray-500">BIC/SWIFT</dt> <dd className="font-mono text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.bicSwift}</dd> </div>}
                                         {(transactionDetails as PaymentDetails).bankDetails?.bankAddress && <div className="flex justify-between"> <dt className="text-gray-500">Bank Address</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.bankAddress}</dd> </div>}
                                         <p className="text-xs text-gray-500 pt-2">Please ensure you use the Reference Code <strong className="font-medium">{(transactionDetails as PaymentDetails).referenceCode}</strong> when making the payment from your bank.</p>
                                    </dl>
                                )}
                                 {isTransfer && (transactionDetails as TransferDetails).recipient && (
                                     <dl className="space-y-2 text-sm">
                                         <div className="flex justify-between"> <dt className="text-gray-500">Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.accountHolderName}</dd> </div>
                                          {(transactionDetails as TransferDetails).recipient.nickname && <div className="flex justify-between"> <dt className="text-gray-500">Nickname</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.nickname}</dd> </div>}
                                         <div className="flex justify-between"> <dt className="text-gray-500">Bank Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.bankName}</dd> </div>
                                         <div className="flex justify-between"> <dt className="text-gray-500">Account Number</dt> <dd className="font-mono text-gray-800">{(transactionDetails as TransferDetails).recipient.accountNumber}</dd> </div>
                                         {/* Add IFSC, Address etc. if available and needed */}
                                         {/* <div className="flex justify-between"> <dt className="text-gray-500">IFSC Code</dt> <dd className="font-mono text-gray-800">{(transactionDetails as TransferDetails).recipient.ifscCode}</dd> </div> */}
                                         <div className="flex justify-between"> <dt className="text-gray-500">Receiving Currency</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.currency.code}</dd> </div>
                                     </dl>
                                 )}
                             </div>

                             {/* Note Section */}
                            <div>
                                <h3 className="text-md font-semibold mb-2 text-gray-700">Note</h3>
                                <textarea
                                    id="note"
                                    className="w-full bg-gray-50 rounded-md p-3 text-sm text-gray-700 border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Add a few notes to help you later (saving not yet implemented for transfers)"
                                    value={noteText}
                                    onChange={handleNoteChange}
                                    rows={3}
                                    // readOnly={isTransfer} // Optional: Make read-only for transfers initially
                                />
                                 {/* Add a save button here if implementing note saving */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailsPage;