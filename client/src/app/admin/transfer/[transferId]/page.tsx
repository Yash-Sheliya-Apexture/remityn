// // frontend/src/app/admin/transfers/[transferId]/page.tsx
// "use client";
// import React, { useState, useEffect } from 'react';
// import adminTransferService from '../../../services/admin/transfer';
// import { useAuth } from '../../../hooks/useAuth';
// import { useParams, useRouter } from 'next/navigation';
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from 'next/link';

// interface AdminTransferDetailPageParams {
//     transferId: string;
// }

// const AdminTransferDetailPage = () => {
//     const params = useParams<AdminTransferDetailPageParams>();
//     const { transferId } = params;
//     const [transfer, setTransfer] = useState<any>(null); // Type as 'any' initially, refine later based on your TransferType
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token, isAdmin, loadingAuth } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if (!token) {
//             return;
//         }
//         if (!isAdmin) {
//             router.push('/dashboard');
//             return;
//         }
//         fetchTransferDetails();
//     }, [transferId, token, isAdmin, router]);

//     const fetchTransferDetails = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const data = await adminTransferService.getAdminTransferById(transferId, token);
//             setTransfer(data);
//         } catch (err: any) {
//             setError(err.message || 'Failed to load transfer details.');
//             console.error("Error fetching transfer details:", err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleStatusUpdated = () => {
//         fetchTransferDetails();
//     };

//     if (loadingAuth || isLoading) {
//         return (
//             <div className="p-6 container mx-auto max-w-3xl">
//                 <h2 className="text-2xl font-semibold mb-6">Transfer Details</h2>
//                 <div className="space-y-4">
//                     {Array(7).fill(0).map((_, i) => <Skeleton key={i} height={40} />)}
//                 </div>
//             </div>
//         );
//     }

//     if (error || !transfer) {
//         return (
//             <div className="p-6 container mx-auto max-w-3xl text-center">
//                 <h2 className="text-2xl font-semibold mb-4">Transfer Details</h2>
//                 <p className="text-red-500 mb-4">{error || "Transfer details not found."}</p>
//                 <div className="flex justify-center">
//                     <button
//                         onClick={fetchTransferDetails}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     >
//                         Retry Loading
//                     </button>
//                     <Link href="/admin/transfer" className="ml-4 text-blue-600 underline">Back to Transfers List</Link>
//                 </div>
//             </div>
//         );
//     }

//     if (!isAdmin) {
//         return (
//             <div className="p-6 container mx-auto max-w-3xl text-center">
//                 <h2 className="text-2xl font-semibold mb-6">Unauthorized</h2>
//                 <p className="text-gray-700 mb-8">
//                     You are not authorized to view this page. Please ensure you have administrator privileges.
//                 </p>
//                 <Link href="/dashboard" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                     Back to Dashboard
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 container mx-auto max-w-3xl">
//             <h2 className="text-2xl font-semibold mb-6">Transfer Details</h2>
//             <Link href="/admin/transfer" className="inline-block mb-4 text-blue-600 underline">Back to Transfers List</Link>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Left Side - Basic Transfer Info */}
//                 <div>
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer Information</h3>
//                         <div className="mb-4">
//                             <p className="text-gray-700"><span className="font-semibold">Transfer ID:</span> {transfer._id}</p>
//                         </div>
//                         <div className="mb-4">
//                             <p className="text-gray-700"><span className="font-semibold">Status:</span> {transfer.status}</p>
//                         </div>
//                         <div className="mb-4">
//                             <p className="text-gray-700"><span className="font-semibold">Created At:</span> {new Date(transfer.createdAt).toLocaleString()}</p>
//                         </div>
//                         {transfer.failureReason && (
//                             <div className="mb-4">
//                                 <p className="text-red-500"><span className="font-semibold text-gray-700">Failure Reason:</span> {transfer.failureReason}</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Right Side - User, Recipient, Amount Details */}
//                 <div>
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-4">Details</h3>

//                         <div className="mb-6">
//                             <h4 className="text-md font-semibold text-gray-700 mb-2">Sender</h4>
//                             <div className="flex items-center space-x-4">
//                                 {/* Assuming user has a profile image, replace with actual path if available */}
//                                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                                     {transfer.user?.profileImage ? (
//                                         <img src={transfer.user.profileImage} alt="Sender Profile" className="w-full h-full object-cover" />
//                                     ) : (
//                                         <span className="text-xl font-semibold text-gray-600">{transfer.user?.fullName?.charAt(0).toUpperCase() || 'U'}</span>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-700 font-semibold">{transfer.user?.fullName || 'N/A'}</p>
//                                     <p className="text-gray-500">{transfer.user?.email || 'Email N/A'}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="mb-6">
//                             <h4 className="text-md font-semibold text-gray-700 mb-2">Recipient</h4>
//                             <div className="flex items-center space-x-4">
//                                 {/* Assuming recipient has a profile image, replace with actual path if available */}
//                                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                                     {transfer.recipient?.profileImage ? (
//                                         <img src={transfer.recipient.profileImage} alt="Recipient Profile" className="w-full h-full object-cover" />
//                                     ) : (
//                                         <span className="text-xl font-semibold text-gray-600">{transfer.recipient?.accountHolderName?.charAt(0).toUpperCase() || 'R'}</span>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-700 font-semibold">{transfer.recipient?.accountHolderName || 'N/A'}</p>
//                                     <p className="text-gray-500">{transfer.recipient?.bankName || 'Bank N/A'}</p>
//                                     <p className="text-gray-500">Account: {transfer.recipient?.accountNumber || 'N/A'}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="mb-6">
//                             <h4 className="text-md font-semibold text-gray-700 mb-2">Amount</h4>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">Sent:</span> {transfer.sendAmount} {transfer.sendCurrency?.code}
//                             </p>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">Received:</span> {transfer.receiveAmount} {transfer.receiveCurrency?.code}
//                             </p>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">Exchange Rate:</span> {transfer.exchangeRate}
//                             </p>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">Fees:</span> {transfer.fees} {transfer.sendCurrency?.code}
//                             </p>
//                         </div>

//                         {/* Update Status Section - Conditionally render based on status? */}
//                         <div className="mt-4">
//                             <TransferStatusDropdown transferId={transfer._id} currentStatus={transfer.status} token={token} onStatusUpdated={handleStatusUpdated} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// interface TransferStatusDropdownProps {
//     transferId: string;
//     currentStatus: string;
//     token: string;
//     onStatusUpdated: () => void;
// }

// const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({ transferId, currentStatus, token, onStatusUpdated }) => {
//     const [status, setStatus] = useState(currentStatus);
//     const [failureReasonInput, setFailureReasonInput] = useState<string>('');
//     const [isFailureReasonOpen, setIsFailureReasonOpen] = useState(false);

//     useEffect(() => {
//         setStatus(currentStatus);
//     }, [currentStatus]);

//     const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const newStatus = event.target.value;
//         setStatus(newStatus);
//         if (newStatus === 'failed' || newStatus === 'canceled') {
//             setIsFailureReasonOpen(true);
//         } else {
//             setIsFailureReasonOpen(false);
//             setFailureReasonInput(''); // Clear failure reason if status is not failed/canceled
//             await updateTransferStatus(newStatus, null); // No failure reason for other statuses
//         }
//     };

//     const handleFailureReasonSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         await updateTransferStatus(status, failureReasonInput);
//         setIsFailureReasonOpen(false);
//         setFailureReasonInput('');
//     };

//     const updateTransferStatus = async (newStatus: string, failureReason: string | null) => {
//         try {
//             await adminTransferService.updateAdminTransferStatus(transferId, newStatus, failureReason, token);
//             onStatusUpdated(); // Refresh transfer details
//         } catch (error: any) {
//             console.error("Error updating transfer status:", error);
//             alert(`Failed to update status: ${error.message}`);
//             // Revert status in dropdown on failure
//             setStatus(currentStatus);
//         }
//     };

//     return (
//         <div>
//             <label htmlFor="status" className="block text-sm font-medium text-gray-700">Update Status</label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//                 <select
//                     id="status"
//                     className="block w-full pr-10 py-2 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     value={status}
//                     onChange={handleStatusChange}
//                 >
//                     <option value="pending">Pending</option>
//                     <option value="processing">Processing</option>
//                     <option value="completed">Completed</option>
//                     <option value="failed">Failed</option>
//                     <option value="canceled">Canceled</option>
//                 </select>
//             </div>

//             {isFailureReasonOpen && (
//                 <form onSubmit={handleFailureReasonSubmit} className="mt-2">
//                     <label htmlFor="failureReason" className="block text-sm font-medium text-gray-700">Failure/Cancellation Reason</label>
//                     <div className="mt-1">
//                         <textarea
//                             id="failureReason"
//                             rows={3}
//                             className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
//                             placeholder="Provide a reason for failure or cancellation"
//                             value={failureReasonInput}
//                             onChange={(e) => setFailureReasonInput(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                         Submit Reason & Update Status
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default AdminTransferDetailPage;

// frontend/src/app/admin/transfers/[transferId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import adminTransferService from "../../../services/admin/transfer";
// import adminCurrencyService from "../../../services/admin/currency"; // Import currency service
// import { useAuth } from "../../../hooks/useAuth";
// import { useParams, useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";

// interface AdminTransferDetailPageParams {
//   transferId: string;
// }

// const AdminTransferDetailPage = () => {
//   const params = useParams<AdminTransferDetailPageParams>();
//   const { transferId } = params;
//   const [transfer, setTransfer] = useState<any>(null); // Type as 'any' initially, refine later based on your TransferType
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter();
//   const [currenciesMap, setCurrenciesMap] = useState<{ [key: string]: any }>(
//     {}
//   ); // State to store currencies

//   useEffect(() => {
//     if (!token) {
//       return;
//     }
//     if (!isAdmin) {
//       router.push("/dashboard");
//       return;
//     }
//     fetchTransferDetails();
//     fetchCurrencies(); // Fetch currencies on component mount
//   }, [transferId, token, isAdmin, router]);

//   const fetchTransferDetails = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await adminTransferService.getAdminTransferById(
//         transferId,
//         token
//       );
//       setTransfer(data);
//       console.log("transfer:", data); // Add this line to inspect the transfer object
//     } catch (err: any) {
//       setError(err.message || "Failed to load transfer details.");
//       console.error("Error fetching transfer details:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchCurrencies = async () => {
//     try {
//       const currenciesData = await adminCurrencyService.getAllCurrenciesAdmin(
//         token
//       );
//       const map: { [key: string]: any } = {};
//       currenciesData.forEach((currency) => {
//         map[currency._id] = currency;
//       });
//       setCurrenciesMap(map);
//       console.log("currenciesMap:", map); // Add this line
//     } catch (error) {
//       console.error("Error fetching currencies:", error);
//       // Optionally handle error, maybe set an error state for currencies if needed
//     }
//   };

//   const handleStatusUpdated = () => {
//     fetchTransferDetails();
//   };

//   if (loadingAuth || isLoading) {
//     return (
//       <div className="p-6 container mx-auto max-w-3xl">
//         <h2 className="text-2xl font-semibold mb-6">Transfer Details</h2>
//         <div className="space-y-4">
//           {Array(7)
//             .fill(0)
//             .map((_, i) => (
//               <Skeleton key={i} height={40} />
//             ))}
//         </div>
//       </div>
//     );
//   }

//   if (error || !transfer) {
//     return (
//       <div className="container mx-auto max-w-3xl text-center">
//         <h2 className="text-3xl font-semibold mb-4">Transfer Details</h2>
//         <p className="text-red-500 mb-4">
//           {error || "Transfer details not found."}
//         </p>
//         <div className="flex justify-center">
//           <button
//             onClick={fetchTransferDetails}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Retry Loading
//           </button>
//           <Link href="/admin/transfer" className="ml-4 text-blue-600 underline">
//             Back to Transfers List
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="p-6 container mx-auto max-w-3xl text-center">
//         <h2 className="text-2xl font-semibold mb-6">Unauthorized</h2>
//         <p className="text-gray-700 mb-8">
//           You are not authorized to view this page. Please ensure you have
//           administrator privileges.
//         </p>
//         <Link
//           href="/dashboard"
//           className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Back to Dashboard
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 container mx-auto max-w-3xl">
//       <h2 className="text-2xl font-semibold mb-6">Transfer Details</h2>
//       <Link
//         href="/admin/transfer"
//         className="inline-block mb-4 text-blue-600 underline"
//       >
//         Back to Transfers List
//       </Link>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Side - Basic Transfer Info */}
//         <div>
//           <div className="bg-white shadow-md border rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Transfer Information
//             </h3>
//             <div className="mb-4">
//               <p className="text-gray-700">
//                 <span className="font-semibold">Transfer ID:</span>{" "}
//                 {transfer._id}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p className="text-gray-700">
//                 <span className="font-semibold">Status:</span> {transfer.status}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p className="text-gray-700">
//                 <span className="font-semibold">Created At:</span>{" "}
//                 {new Date(transfer.createdAt).toLocaleString()}
//               </p>
//             </div>
//             {transfer.failureReason && (
//               <div className="mb-4">
//                 <p className="text-red-500">
//                   <span className="font-semibold text-gray-700">
//                     Failure Reason:
//                   </span>{" "}
//                   {transfer.failureReason}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Side - User, Recipient, Amount Details */}
//         <div>
//           <div className="bg-white shadow-md border rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Details
//             </h3>

//             <div className="mb-6">
//               <h4 className="text-md font-semibold text-gray-700 mb-2">
//                 Sender
//               </h4>
//               <div className="flex items-center space-x-4">
//                 {/* Assuming user has a profile image, replace with actual path if available */}
//                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                   {transfer.user?.profileImage ? (
//                     <img
//                       src={transfer.user.profileImage}
//                       alt="Sender Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-xl font-semibold text-gray-600">
//                       {transfer.user?.fullName?.charAt(0).toUpperCase() || "U"}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-gray-700 font-semibold">
//                     {transfer.user?.fullName || "N/A"}
//                   </p>
//                   <p className="text-gray-500">
//                     {transfer.user?.email || "Email N/A"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h4 className="text-md font-semibold text-gray-700 mb-2">
//                 Recipient
//               </h4>
//               <div className="flex items-center space-x-4">
//                 {/* Assuming recipient has a profile image, replace with actual path if available */}
//                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                   {transfer.recipient?.profileImage ? (
//                     <img
//                       src={transfer.recipient.profileImage}
//                       alt="Recipient Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-xl font-semibold text-gray-600">
//                       {transfer.recipient?.accountHolderName
//                         ?.charAt(0)
//                         .toUpperCase() || "R"}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-gray-700 font-semibold">
//                     {transfer.recipient?.accountHolderName || "N/A"}
//                   </p>
//                   <p className="text-gray-500">
//                     {transfer.recipient?.bankName || "Bank N/A"}
//                   </p>
//                   <p className="text-gray-500">
//                     Account: {transfer.recipient?.accountNumber || "N/A"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h4 className="text-md font-semibold text-gray-700 mb-2">
//                 Amount
//               </h4>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Sent:</span>{" "}
//                 {transfer.sendAmount} {transfer.sendCurrency?.code}
//                 {currenciesMap[transfer.sendCurrency?._id]?.flagImage && (
//                   <img
//                     src={currenciesMap[transfer.sendCurrency?._id]?.flagImage}
//                     alt={`${transfer.sendCurrency?.code} Flag`}
//                     className="inline-block h-5 w-5 ml-1"
//                   />
//                 )}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Received:</span>{" "}
//                 {transfer.receiveAmount} {transfer.receiveCurrency?.code}
//                 {currenciesMap[transfer.receiveCurrency?._id]?.flagImage && (
//                   <img
//                     src={
//                       currenciesMap[transfer.receiveCurrency?._id]?.flagImage
//                     }
//                     alt={`${transfer.receiveCurrency?.code} Flag`}
//                     className="inline-block h-5 w-5 ml-1"
//                   />
//                 )}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Exchange Rate:</span>{" "}
//                 {transfer.exchangeRate}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Fees:</span> {transfer.fees}{" "}
//                 {transfer.sendCurrency?.code}
//               </p>
//             </div>

//             {/* Update Status Section - Conditionally render based on status? */}
//             <div className="mt-4">
//               <TransferStatusDropdown
//                 transferId={transfer._id}
//                 currentStatus={transfer.status}
//                 token={token}
//                 onStatusUpdated={handleStatusUpdated}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface TransferStatusDropdownProps {
//   transferId: string;
//   currentStatus: string;
//   token: string;
//   onStatusUpdated: () => void;
// }

// const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({
//   transferId,
//   currentStatus,
//   token,
//   onStatusUpdated,
// }) => {
//   const [status, setStatus] = useState(currentStatus);
//   const [failureReasonInput, setFailureReasonInput] = useState<string>("");
//   const [isFailureReasonOpen, setIsFailureReasonOpen] = useState(false);

//   useEffect(() => {
//     setStatus(currentStatus);
//   }, [currentStatus]);

//   const handleStatusChange = async (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const newStatus = event.target.value;
//     setStatus(newStatus);
//     if (newStatus === "failed" || newStatus === "canceled") {
//       setIsFailureReasonOpen(true);
//     } else {
//       setIsFailureReasonOpen(false);
//       setFailureReasonInput(""); // Clear failure reason if status is not failed/canceled
//       await updateTransferStatus(newStatus, null); // No failure reason for other statuses
//     }
//   };

//   const handleFailureReasonSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     await updateTransferStatus(status, failureReasonInput);
//     setIsFailureReasonOpen(false);
//     setFailureReasonInput("");
//   };

//   const updateTransferStatus = async (
//     newStatus: string,
//     failureReason: string | null
//   ) => {
//     try {
//       await adminTransferService.updateAdminTransferStatus(
//         transferId,
//         newStatus,
//         failureReason,
//         token
//       );
//       onStatusUpdated(); // Refresh transfer details
//     } catch (error: any) {
//       console.error("Error updating transfer status:", error);
//       alert(`Failed to update status: ${error.message}`);
//       // Revert status in dropdown on failure
//       setStatus(currentStatus);
//     }
//   };

//   return (
//     <div>
//       <label
//         htmlFor="status"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Update Status
//       </label>
//       <div className="mt-1 relative rounded-md shadow-sm">
//         <select
//           id="status"
//           className="block w-full pr-10 py-2 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           value={status}
//           onChange={handleStatusChange}
//         >
//           <option value="pending">Pending</option>
//           <option value="processing">Processing</option>
//           <option value="completed">Completed</option>
//           <option value="failed">Failed</option>
//           <option value="canceled">Canceled</option>
//         </select>
//       </div>

//       {isFailureReasonOpen && (
//         <form onSubmit={handleFailureReasonSubmit} className="mt-2">
//           <label
//             htmlFor="failureReason"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Failure/Cancellation Reason
//           </label>
//           <div className="mt-1">
//             <textarea
//               id="failureReason"
//               rows={3}
//               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
//               placeholder="Provide a reason for failure or cancellation"
//               value={failureReasonInput}
//               onChange={(e) => setFailureReasonInput(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Submit Reason & Update Status
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AdminTransferDetailPage;

"use client";
import React, { useState, useEffect, useRef } from "react";
import adminTransferService from "../../../services/admin/transfer";
import adminCurrencyService from "../../../services/admin/currency";
import { useAuth } from "../../../hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  Circle,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  RefreshCcw,
} from "lucide-react";
import { BiTransfer } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";

interface AdminTransferDetailPageParams {
  transferId: string;
}

const AdminTransferDetailPage = () => {
  const params = useParams<AdminTransferDetailPageParams>();
  const { transferId } = params;
  const [transfer, setTransfer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isAdmin, loadingAuth } = useAuth();
  const router = useRouter();
  const [currenciesMap, setCurrenciesMap] = useState<{ [key: string]: any }>(
    {}
  );

  useEffect(() => {
    if (!token) {
      return;
    }
    if (!isAdmin) {
      router.push("/dashboard");
      return;
    }
    fetchTransferDetails();
    fetchCurrencies();
  }, [transferId, token, isAdmin, router]);

  const fetchTransferDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminTransferService.getAdminTransferById(
        transferId,
        token
      );
      setTransfer(data);
    } catch (err: any) {
      setError(err.message || "Failed to load transfer details.");
      console.error("Error fetching transfer details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const currenciesData = await adminCurrencyService.getAllCurrenciesAdmin(
        token
      );
      const map: { [key: string]: any } = {};
      currenciesData.forEach((currency) => {
        map[currency._id] = currency;
      });
      setCurrenciesMap(map);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  const handleStatusUpdated = () => {
    fetchTransferDetails();
  };

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="size-5 text-yellow-500" />;
      case "processing":
        return <RefreshCcw className="size-5 text-blue-500 animate-spin" />;
      case "completed":
        return <CheckCircle2 className="size-5 text-green-500" />;
      case "failed":
        return <XCircle className="size-5 text-red-500" />;
      case "canceled":
        return <AlertCircle className="size-5 text-gray-500" />;
      default:
        return <Circle className="size-5 text-gray-400" />;
    }
  };

  if (loadingAuth || isLoading) {
    return (
      <div className="p-6 container mx-auto max-w-5xl">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="ml-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32 mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !transfer) {
    return (
      <div className="container mx-auto max-w-5xl p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Transfer Details</h2>
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 mb-8">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 text-lg mb-4">
            {error || "Transfer details not found."}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={fetchTransferDetails}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Retry Loading
            </button>
            <Link
              href="/admin/transfer"
              className="text-blue-600 font-medium py-2 px-6 rounded-full border border-blue-300 hover:bg-blue-50 transition-all"
            >
              Back to Transfers List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-8 container mx-auto max-w-5xl text-center">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 mb-8">
          <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">
            Unauthorized Access
          </h2>
          <p className="text-gray-700 mb-8 max-w-md mx-auto">
            You do not have the required permissions to view this page. Please
            ensure you have administrator privileges.
          </p>
          <Link
            href="/dashboard"
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-full transition-all shadow-md hover:shadow-lg focus:outline-none"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Calculate the time since creation
  const getTimeAgo = (dateString: string) => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - createdDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <div className="flex items-center mb-8">
        <Link
          href="/admin/transfer"
          className="flex items-center text-primary font-medium transition-colors"
        >
          <ChevronLeft className="size-5 mr-1" />
          Back to Transfers
        </Link>
        <div className="mx-4 h-6 border-r border-gray-300"></div>
        <h2 className="text-2xl font-bold text-main">Transfer Details</h2>
      </div>

      <div className="bg-primary/10 rounded-2xl p-4 mb-8 flex items-center">
        <div className="p-4 bg-white border border-gray-300/50 rounded-full mr-4">
          {getStatusIcon(transfer.status)}
        </div>
        <div className="space-y-1">
          <p className="text-gray">Transfer ID: {transfer._id}</p>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold capitalize">
              {transfer.status} Transfer
            </h3>
            <span className="text-gray">
              • {getTimeAgo(transfer.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {/* Left Column - Basic Info & Status */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md border rounded-2xl border-gray-300/50">
            <div className="bg-primary rounded-t-xl px-6 py-4">
              <h3 className="text-lg font-medium text-secondary">
                Transfer Information
              </h3>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <p className="text-gray mb-1.5">Status</p>
                <div className="flex items-center">
                  {getStatusIcon(transfer.status)}
                  <span className="ml-2 font-medium capitalize">
                    {transfer.status}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className=" text-gray-500 mb-1">Transfer ID</p>
                <p className="font-mono px-4 py-3 rounded-lg border border-gray-200 break-all">
                  {transfer._id}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray mb-1.5">Created On</p>
                <p className="font-medium border border-gray-200 font-mono px-4 py-3 rounded-lg break-all">
                  {new Date(transfer.createdAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {transfer.failureReason && (
                <div className="mb-4">
                  <p className="text-gray mb-1">Failure Reason</p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-md">
                    <p className="text-red-700">{transfer.failureReason}</p>
                  </div>
                </div>
              )}

              <TransferStatusDropdown
                transferId={transfer._id}
                currentStatus={transfer.status}
                token={token}
                onStatusUpdated={handleStatusUpdated}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Sender, Recipient, Amount Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300/50">
            <div className="bg-primary px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-secondary">Transfer Details</h3>
            </div>

            <div className="px-4 py-4">
              {/* Sender Information */}
              <div className="mb-8 bg-blue-100 rounded-xl p-4">
                <h4 className="text-md font-semibold text-blue-800 mb-3 flex items-center">
                  <User className="size-5 mr-2" />
                  Sender Information
                </h4>
                <div className="flex items-start">
                  <div className="size-14 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white">
                    {transfer.user?.profileImage ? (
                      <img
                        src={transfer.user.profileImage}
                        alt="Sender Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-semibold text-blue-600">
                        {transfer.user?.fullName?.charAt(0).toUpperCase() ||
                          "U"}
                      </span>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-main capitalize">
                      {transfer.user?.fullName || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      {transfer.user?.email || "Email N/A"}
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Sender
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipient Information */}
              <div className="mb-8 bg-purple-100 rounded-xl p-4">
                <h4 className="text-md font-semibold text-purple-500 mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Recipient Information
                </h4>
                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white">
                    {transfer.recipient?.profileImage ? (
                      <img
                        src={transfer.recipient.profileImage}
                        alt="Recipient Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-semibold text-purple-500">
                        {transfer.recipient?.accountHolderName
                          ?.charAt(0)
                          .toUpperCase() || "R"}
                      </span>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-main">
                      {transfer.recipient?.accountHolderName || "N/A"}
                    </p>
                    <div className="space-y-1 mt-1">
                      <p className="text-gray-600 flex items-center">
                        <span className="inline-block w-20 font-medium text-gray-500">
                          Bank:
                        </span>
                        <span>{transfer.recipient?.bankName || "N/A"}</span>
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <span className="inline-block w-20 font-medium text-gray-500">
                          Account:
                        </span>
                        <span className="font-mono">
                          {transfer.recipient?.accountNumber || "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount Information */}
              <div className="bg-green-100 rounded-xl p-4">
                <h4 className="text-md flex items-center gap-2 font-semibold text-green-800 mb-3">
                <GrTransaction />
                  Transaction Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-green-100 shadow-sm p-4">
                    <p className="font-medium text-gray-500 mb-1">
                      Sent Amount
                    </p>
                    <div className="flex items-center">
                      <span className="text-xl font-bold">
                        {transfer.sendAmount}
                      </span>
                      <span className="ml-2 font-medium text-gray">
                        {transfer.sendCurrency?.code}
                      </span>
                      {currenciesMap[transfer.sendCurrency?._id]?.flagImage && (
                        <img
                          src={
                            currenciesMap[transfer.sendCurrency?._id]?.flagImage
                          }
                          alt={`${transfer.sendCurrency?.code} Flag`}
                          className="ml-2 size-5 rounded-full"
                        />
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-green-100 shadow-sm p-4">
                    <p className="font-medium text-gray-500 mb-1">
                      Received Amount
                    </p>
                    <div className="flex items-center">
                      <span className="text-xl font-bold">
                        {transfer.receiveAmount}
                      </span>
                      <span className="ml-2 font-medium text-gray-600">
                        {transfer.receiveCurrency?.code}
                      </span>
                      {currenciesMap[transfer.receiveCurrency?._id]
                        ?.flagImage && (
                        <img
                          src={
                            currenciesMap[transfer.receiveCurrency?._id]
                              ?.flagImage
                          }
                          alt={`${transfer.receiveCurrency?.code} Flag`}
                          className="ml-2 size-4 rounded-full"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                    <p className="font-medium text-gray-500">
                      Exchange Rate
                    </p>
                    <p className="font-mono font-medium mt-2">
                      1 {transfer.sendCurrency?.code} = {transfer.exchangeRate}{" "}
                      {transfer.receiveCurrency?.code}
                    </p>
                  </div>

                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                    <p className="font-medium text-gray-500">Fees</p>
                    <p className="font-medium mt-2">
                      {transfer.fees} {transfer.sendCurrency?.code}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TransferStatusDropdownProps {
  transferId: string;
  currentStatus: string;
  token: string;
  onStatusUpdated: () => void;
}

const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({
  transferId,
  currentStatus,
  token,
  onStatusUpdated,
}) => {
  const [status, setStatus] = useState(currentStatus);
  const [failureReasonInput, setFailureReasonInput] = useState<string>("");
  const [isFailureReasonOpen, setIsFailureReasonOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    setIsDropdownOpen(false);

    if (newStatus === "failed" || newStatus === "canceled") {
      setIsFailureReasonOpen(true);
    } else {
      setIsFailureReasonOpen(false);
      setFailureReasonInput(""); // Clear failure reason if status is not failed/canceled
      await updateTransferStatus(newStatus, null); // No failure reason for other statuses
    }
  };

  const handleFailureReasonSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateTransferStatus(status, failureReasonInput);
    setIsFailureReasonOpen(false);
    setFailureReasonInput("");
  };

  const updateTransferStatus = async (
    newStatus: string,
    failureReason: string | null
  ) => {
    try {
      await adminTransferService.updateAdminTransferStatus(
        transferId,
        newStatus,
        failureReason,
        token
      );
      onStatusUpdated(); // Refresh transfer details
    } catch (error: any) {
      console.error("Error updating transfer status:", error);
      alert(`Failed to update status: ${error.message}`);
      // Revert status in dropdown on failure
      setStatus(currentStatus);
    }
  };

  // Status option configurations
  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-500",
      icon: <Clock className="size-4" />,
    },
    {
      value: "processing",
      label: "Processing",
      color: "bg-blue-500",
      icon: <RefreshCcw className="size-4" />,
    },
    {
      value: "completed",
      label: "Completed",
      color: "bg-green-500",
      icon: <CheckCircle2 className="size-4" />,
    },
    {
      value: "failed",
      label: "Failed",
      color: "bg-red-500",
      icon: <XCircle className="size-4" />,
    },
    {
      value: "canceled",
      label: "Canceled",
      color: "bg-gray-500",
      icon: <AlertCircle className="size-4" />,
    },
  ];

  // Find current status option
  const currentOption =
    statusOptions.find((option) => option.value === status) || statusOptions[0];

  return (
    <div>
      <label className="block text-sm font-medium text-gray mb-1.5">
        Update Transfer Status
      </label>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="w-full flex items-center justify-between cursor-pointer p-3 border border-gray-300 rounded-lg bg-white transition-colors focus:outline-none"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center">
            <span
              className={`inline-block size-3 rounded-full ${currentOption.color} mr-2 `}
            ></span>
            <span className="capitalize">{currentOption.label}</span>
          </div>
          <ChevronDown
            className={`size-5 text-gray transition-transform ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1.5 w-full origin-top-right rounded-md bg-white shadow-sm border border-gray-200 focus:outline-none overflow-hidden">
            <div className="space-y-1">
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-4 py-3.5 flex items-center cursor-pointer hover:bg-gray-100 transition-colors ${
                    status === option.value ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleStatusChange(option.value)}
                >
                  <span
                    className={`inline-block size-3 rounded-full ${option.color} mr-2`}
                  ></span>
                  <span className="capitalize">{option.label}</span>
                  {status === option.value && (
                    <CheckCircle2 className="size-5 text-primary ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isFailureReasonOpen && (
        <form
          onSubmit={handleFailureReasonSubmit}
          className="mt-4 bg-red-50 p-4 rounded-lg"
        >
          <label className="inline-block text-sm capitalize font-medium text-error mb-2">
            Please provide a reason for{" "}
            {status === "failed" ? "failure" : "cancellation"}
          </label>
          <textarea
            className="w-full p-2 border border-error/50 text-main font-medium rounded-lg focus:outline-none resize-none bg-white"
            rows={3}
            placeholder={`Why is this transfer being ${
              status === "failed" ? "failed" : "canceled"
            }?`}
            value={failureReasonInput}
            onChange={(e) => setFailureReasonInput(e.target.value)}
            required
          />
          <div className="flex justify-end mt-3 gap-2">
            <button
              type="button"
              className="w-full py-2.5 cursor-pointer text-sm font-medium text-main bg-white border border-gray-300 rounded-lg focus:outline-none"
              onClick={() => {
                setIsFailureReasonOpen(false);
                setStatus(currentStatus);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2.5 cursor-pointer text-sm font-medium text-white bg-error border border-transparent rounded-lg hover:bg-error focus:outline-none"
            >
              Confirm {status === "failed" ? "Failure" : "Cancellation"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminTransferDetailPage;
