// // frontend/src/app/admin/components/TransferList.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { Transfer as TransferType } from "../../../types/transfer"; // Assuming you have types defined

// interface TransferListProps {
//   transfers: TransferType[]; // Array of Transfer type
// }

// const TransferList: React.FC<TransferListProps> = ({ transfers }) => {
//   return (
//     <div className="overflow-x-auto shadow-md sm:rounded-lg">
//       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               ID
//             </th>
//             <th scope="col" className="px-6 py-3">
//               User
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Recipient
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Amount
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Status
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Created At
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {transfers.map((transfer) => (
//             <tr
//               key={transfer._id}
//               className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//             >
//               <th
//                 scope="row"
//                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//               >
//                 {transfer._id}
//               </th>
//               <td className="px-6 py-4">{transfer.user?.fullName || "N/A"}</td>
//               <td className="px-6 py-4">
//                 {transfer.recipient?.accountHolderName || "N/A"}
//               </td>
//               <td className="px-6 py-4">
//                 {transfer.sendAmount} {transfer.sendCurrency?.code}
//               </td>
//               <td className="px-6 py-4">{transfer.status}</td>
//               <td className="px-6 py-4">
//                 {new Date(transfer.createdAt).toLocaleString()}
//               </td>
//               <td className="px-6 py-4">
//                 <Link
//                   href={`/admin/transfer/${transfer._id}`}
//                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                 >
//                   View Details
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {transfers.length === 0 && (
//         <div className="p-4 text-center">No transfers to display.</div>
//       )}
//       {/* TODO: Add Pagination Controls Below the table */}
//     </div>
//   );
// };

// export default TransferList;

// frontend/src/app/admin/components/TransferList.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { Transfer as TransferType } from "../../../types/transfer";
// import {
//   ChevronRight,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   MinusCircle,
//   Loader2,
// } from "lucide-react";

// interface TransferListProps {
//   transfers: TransferType[];
//   isLoading?: boolean;
// }

// const TransferList: React.FC<TransferListProps> = ({
//   transfers,
//   isLoading = false,
// }) => {
//   // Status badge styling and icons
//   const statusConfig = {
//     pending: {
//       icon: <Clock size={18} />,
//       class: "bg-yellow-300 text-yellow-700",
//     },
//     processing: {
//       icon: <Loader2 size={18} className="animate-spin" />,
//       class: "bg-blue-300 text-blue-700 ",
//     },
//     completed: {
//       icon: <CheckCircle size={18} />,
//       class: "bg-green-300 text-green-700",
//     },
//     failed: {
//       icon: <XCircle size={18} />,
//       class: "bg-red-300 text-red-700",
//     },
//     canceled: {
//       icon: <MinusCircle size={18} />,
//       class: "bg-gray-300 text-gray-700",
//     },
//   };

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div className="animate-pulse">
//         <div className="p-4 border-b border-gray-100">
//           <div className="grid grid-cols-7 gap-4">
//             {[...Array(7)].map((_, i) => (
//               <div key={i} className="h-4 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="p-4 border-b border-gray-100">
//             <div className="grid grid-cols-7 gap-4">
//               {[...Array(7)].map((_, j) => (
//                 <div key={j} className="h-5 bg-gray-200 rounded"></div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // Empty state
//   if (transfers.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12">
//         <AlertTriangle size={48} className="text-gray-300 mb-4" />
//         <h3 className="text-lg font-medium text-gray-700">
//           No transfers found
//         </h3>
//         <p className="text-gray mt-1">
//           Try changing your filter criteria or check back later
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-5">
//       {/* Header row */}
//       <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 border-b border-gray-300 font-semibold text-main">
//         {/* transaction ID */}
//         <div>ID</div>
//         <div>USER</div>
//         <div>RECIPIENT</div>
//         <div>AMOUNT</div>
//         <div>STATUS</div>
//         <div>DATE</div>
//         <div className="text-center">ACTIONS</div>
//       </div>

//       {/* Data rows */}
//       {transfers.map((transfer) => (
//         <div
//           key={transfer._id}
//           className="grid grid-cols-1 md:grid-cols-7 border-b border-gray-300 gap-4 p-5 bg-gray-50 transition-colors duration-200"
//         >
//           <div className="font-medium text-gray truncate" title={transfer._id}>
//             {transfer._id.substring(0, 10)}...
//           </div>

//           <div className="text-gray font-medium capitalize truncate">
//             {transfer.user?.fullName || "N/A"}
//           </div>

//           <div className="text-gray truncate">
//             {transfer.recipient?.accountHolderName.substring(0, 16) || "N/A"}...
//           </div>

//           <div className="font-medium gap-1 flex text-gray capitalize">
//             {transfer.sendAmount}
//             <span>{transfer.sendCurrency?.code}</span>
//           </div>

//           <div>
//             <div
//               className={`inline-flex items-center gap-1.5 px-3 font-medium py-1.5 rounded-md ${
//                 statusConfig[transfer.status]?.class ||
//                 "bg-gray-100 text-gray font-bold"
//               }`}
//             >
//               {statusConfig[transfer.status]?.icon || <Clock size={20} />}
//               <span className="capitalize">{transfer.status}</span>
//             </div>
//           </div>

//           <div className="text-gray font-medium truncate">
//             {formatDate(transfer.createdAt)}
//           </div>

//           <div className="text-end">
//             <Link
//               href={`/admin/transfer/${transfer._id}`}
//               className="inline-flex items-center group border border-primary px-4 py-1.5 hover:bg-primary hover:text-main rounded-md space-x-1 text-primary transition-colors duration-300 font-medium"
//             >
//               <span>View Details</span>
//               <ChevronRight className="size-5 group-hover:translate-x-3 transition-transform ease-in-out duration-300" />
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TransferList;

// frontend/src/app/admin/components/TransferList.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { Transfer as TransferType } from "../../../types/transfer";
// import {
//   ChevronRight,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   MinusCircle,
//   Loader2,
// } from "lucide-react";

// interface TransferListProps {
//   transfers: TransferType[];
//   isLoading?: boolean;
// }

// const TransferList: React.FC<TransferListProps> = ({
//   transfers,
//   isLoading = false,
// }) => {
//   // Status badge styling and icons
//   const statusConfig = {
//     pending: {
//       icon: <Clock size={18} />,
//       class: "bg-yellow-300 text-yellow-700",
//     },
//     processing: {
//       icon: <Loader2 size={18} className="animate-spin"/>,
//       class: "bg-blue-300 text-blue-700",
//     },
//     completed: {
//       icon: <CheckCircle size={18} />,
//       class: "bg-green-300 text-green-700",
//     },
//     failed: {
//       icon: <XCircle size={18} />,
//       class: "bg-red-300 text-red-700",
//     },
//     canceled: {
//       icon: <MinusCircle size={18} />,
//       class: "bg-gray-300 text-gray-700",
//     },
//   };

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div className="animate-pulse">
//         <div className="p-4 border-b border-gray-100">
//           <div className="grid grid-cols-7 gap-4">
//             {[...Array(7)].map((_, i) => (
//               <div key={i} className="h-4 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="p-4 border-b border-gray-100">
//             <div className="grid grid-cols-7 gap-4">
//               {[...Array(7)].map((_, j) => (
//                 <div key={j} className="h-5 bg-gray-200 rounded"></div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // Empty state
//   if (transfers.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12">
//         <AlertTriangle size={48} className="text-gray-300 mb-4" />
//         <h3 className="text-lg font-medium text-gray-700">
//           No transfers found
//         </h3>
//         <p className="text-gray mt-1">
//           Try changing your filter criteria or check back later
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-5">
//       {/* Header row */}
//       <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-5 border-b border-gray-300 font-semibold text-main">
//         {/* transaction ID */}
//         <div>ID</div>
//         <div>USER</div>
//         <div>RECIPIENT</div>
//         <div>AMOUNT</div>
//         <div>STATUS</div>
//         <div>DATE</div>
//         <div className="text-center">ACTIONS</div>
//       </div>

//       {/* Data rows */}
//       {transfers.map((transfer, index) => (
//         <div
//           key={transfer._id}
//           className={`grid grid-cols-1 md:grid-cols-7 ${
//             index < transfers.length - 1 ? "border-b border-gray-300" : ""
//           } gap-4 p-5 transition-colors duration-200 ${
//             index % 2 !== 0 ? "bg-gray-100" : ""
//           }`}
//         >
//           <div className="font-medium text-gray truncate" title={transfer._id}>
//             {transfer._id.substring(0, 10)}...
//           </div>

//           <div className="text-gray font-medium capitalize truncate">
//             {transfer.user?.fullName || "N/A"}
//           </div>

//           <div className="text-gray truncate">
//             {transfer.recipient?.accountHolderName.substring(0, 16) || "N/A"}...
//           </div>

//           <div className="font-medium gap-1 flex text-gray capitalize">
//             {transfer.sendAmount}
//             <span>{transfer.sendCurrency?.code}</span>
//           </div>

//           <div>
//             <div
//               className={`inline-flex items-center gap-1.5 w-32 px-3 font-medium py-1.5 rounded-md ${
//                 statusConfig[transfer.status]?.class ||
//                 "bg-gray-100 text-gray font-bold"
//               }`}
//             >
//               {statusConfig[transfer.status]?.icon || <Clock size={20} />}
//               <span className="capitalize">{transfer.status}</span>
//             </div>
//           </div>

//           <div className="text-gray font-medium truncate">
//             {formatDate(transfer.createdAt)}
//           </div>

//           <div className="text-end">
//             <Link
//               href={`/admin/transfer/${transfer._id}`}
//               className="inline-flex items-center group px-6 py-1.5 rounded-md space-x-1 text-secondary transition-colors duration-300 font-medium"
//             >
//               <span>View Details</span>
//               <ChevronRight className="size-5 group-hover:translate-x-2 transition-transform ease-in-out duration-300" />
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TransferList;

// frontend/src/app/admin/components/TransferList.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { Transfer as TransferType } from "../../../types/transfer";
// import {
//   ChevronRight,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   MinusCircle,
//   Loader2,
//   FilterIcon,
//   X,
// } from "lucide-react";

// interface TransferListProps {
//   transfers: TransferType[];
//   isLoading?: boolean;
// }

// const TransferList: React.FC<TransferListProps> = ({
//   transfers,
//   isLoading = false,
// }) => {
//   const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
//   const [filterTransactionId, setFilterTransactionId] = useState("");
//   const [filterUser, setFilterUser] = useState(""); // Assume string for user full name for now
//   const [filterStatus, setFilterStatus] = useState("");
//   const [filterDateFrom, setFilterDateFrom] = useState("");
//   const [filterDateTo, setFilterDateTo] = useState("");
//   const [filteredTransfers, setFilteredTransfers] =
//     useState<TransferType[]>(transfers);

//   // Status badge styling and icons
//   const statusConfig = {
//     pending: {
//       icon: <Clock size={18} />,
//       class: "bg-yellow-300 text-yellow-700",
//     },
//     processing: {
//       icon: <Loader2 size={18} className="animate-spin" />,
//       class: "bg-blue-300 text-blue-700",
//     },
//     completed: {
//       icon: <CheckCircle size={18} />,
//       class: "bg-green-300 text-green-700",
//     },
//     failed: {
//       icon: <XCircle size={18} />,
//       class: "bg-red-300 text-red-700",
//     },
//     canceled: {
//       icon: <MinusCircle size={18} />,
//       class: "bg-gray-300 text-gray-700",
//     },
//   };

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   useEffect(() => {
//     let currentFilteredTransfers = [...transfers];

//     if (filterTransactionId) {
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) =>
//         transfer._id.toLowerCase().includes(filterTransactionId.toLowerCase())
//       );
//     }

//     if (filterUser) {
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) =>
//         transfer.user?.fullName
//           ?.toLowerCase()
//           .includes(filterUser.toLowerCase())
//       );
//     }

//     if (filterStatus) {
//       currentFilteredTransfers = currentFilteredTransfers.filter(
//         (transfer) => transfer.status === filterStatus
//       );
//     }

//     if (filterDateFrom && filterDateTo) {
//       const fromDate = new Date(filterDateFrom);
//       const toDate = new Date(filterDateTo);
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
//         const transferDate = new Date(transfer.createdAt);
//         return transferDate >= fromDate && transferDate <= toDate;
//       });
//     } else if (filterDateFrom) {
//       const fromDate = new Date(filterDateFrom);
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
//         const transferDate = new Date(transfer.createdAt);
//         return transferDate >= fromDate;
//       });
//     } else if (filterDateTo) {
//       const toDate = new Date(filterDateTo);
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
//         const transferDate = new Date(transfer.createdAt);
//         return transferDate <= toDate;
//       });
//     }

//     setFilteredTransfers(currentFilteredTransfers);
//   }, [
//     transfers,
//     filterTransactionId,
//     filterUser,
//     filterStatus,
//     filterDateFrom,
//     filterDateTo,
//   ]);

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div className="animate-pulse">
//         <div className="flex justify-between items-center mb-4">
//           <div className="h-8 bg-gray-200 rounded w-32"></div>{" "}
//           {/* Placeholder for title/filters */}
//         </div>
//         <div className="p-4 border-b border-gray-100">
//           <div className="grid grid-cols-7 gap-4">
//             {[...Array(7)].map((_, i) => (
//               <div key={i} className="h-4 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="p-4 border-b border-gray-100">
//             <div className="grid grid-cols-7 gap-4">
//               {[...Array(7)].map((_, j) => (
//                 <div key={j} className="h-5 bg-gray-200 rounded"></div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // Empty state
//   if (transfers.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12">
//         <AlertTriangle size={48} className="text-gray-300 mb-4" />
//         <h3 className="text-lg font-medium text-gray-700">
//           No transfers found
//         </h3>
//         <p className="text-gray mt-1">
//           Try changing your filter criteria or check back later
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       {/* Filter Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
//           className="inline-flex items-center cursor-pointer gap-2 px-8 hover:bg-primary-hover py-2.5 bg-primary text-main rounded-md transition-colors duration-200"
//         >
//           <FilterIcon className="size-5" />
//           Filters
//         </button>
//       </div>

//       {/* Filter Sidebar */}
//       <aside
//         className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
//           isFilterSidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Filter Transfers
//             </h2>
//             <button
//               onClick={() => setIsFilterSidebarOpen(false)}
//               className="p-2 rounded-md hover:bg-gray-100"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <div className="space-y-4">
//             {/* Transaction ID Filter */}
//             <div>
//               <label
//                 htmlFor="transactionId"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Transaction ID
//               </label>
//               <input
//                 type="text"
//                 id="transactionId"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
//                 placeholder="Search by Transaction ID"
//                 value={filterTransactionId}
//                 onChange={(e) => setFilterTransactionId(e.target.value)}
//               />
//             </div>

//             {/* User Filter */}
//             <div>
//               <label
//                 htmlFor="user"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 User
//               </label>
//               <input
//                 type="text"
//                 id="user"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
//                 placeholder="Search by User Name"
//                 value={filterUser}
//                 onChange={(e) => setFilterUser(e.target.value)}
//               />
//             </div>

//             {/* Status Filter */}
//             <div>
//               <label
//                 htmlFor="status"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Status
//               </label>
//               <select
//                 id="status"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//               >
//                 <option value="">All Statuses</option>
//                 {Object.keys(statusConfig).map((status) => (
//                   <option key={status} value={status}>
//                     {status}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Date Filter */}
//             <div>
//               <label
//                 htmlFor="dateFrom"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Date Range
//               </label>
//               <div className="flex space-x-2">
//                 <div>
//                   <label
//                     htmlFor="dateFrom"
//                     className="block text-xs font-medium text-gray-700 mb-1"
//                   >
//                     From
//                   </label>
//                   <input
//                     type="date"
//                     id="dateFrom"
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
//                     value={filterDateFrom}
//                     onChange={(e) => setFilterDateFrom(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="dateTo"
//                     className="block text-xs font-medium text-gray-700 mb-1"
//                   >
//                     To
//                   </label>
//                   <input
//                     type="date"
//                     id="dateTo"
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
//                     value={filterDateTo}
//                     onChange={(e) => setFilterDateTo(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Apply Filters Button - Optional, filtering is live now */}
//             {/* <button
//               onClick={() => {}} // Apply filter logic here if needed for button click
//               className="inline-flex justify-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition-colors duration-200 w-full"
//             >
//               Apply Filters
//             </button> */}
//           </div>
//         </div>
//       </aside>

//       {/* Main Content - Transfer List */}
//       <div className="mt-5">
//         {/* Header row */}
//         <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-5 border-b border-gray-300 font-semibold text-main">
//           {/* transaction ID */}
//           <div>ID</div>
//           <div>USER</div>
//           <div>RECIPIENT</div>
//           <div>AMOUNT</div>
//           <div>STATUS</div>
//           <div>DATE</div>
//           <div className="text-center">ACTIONS</div>
//         </div>

//         {/* Data rows */}
//         {filteredTransfers.map((transfer, index) => (
//           <div
//             key={transfer._id}
//             className={`grid grid-cols-1 md:grid-cols-7 ${
//               index < filteredTransfers.length - 1
//                 ? "border-b border-gray-300"
//                 : ""
//             } gap-4 p-5 transition-colors duration-200 ${
//               index % 2 !== 0 ? "bg-gray-100" : ""
//             }`}
//           >
//             <div
//               className="font-medium text-gray truncate"
//               title={transfer._id}
//             >
//               {transfer._id.substring(0, 10)}...
//             </div>

//             <div className="text-gray font-medium capitalize truncate">
//               {transfer.user?.fullName || "N/A"}
//             </div>

//             <div className="text-gray truncate">
//               {transfer.recipient?.accountHolderName.substring(0, 16) || "N/A"}
//               ...
//             </div>

//             <div className="font-medium gap-1 flex text-gray capitalize">
//               {transfer.sendAmount}
//               <span>{transfer.sendCurrency?.code}</span>
//             </div>

//             <div>
//               <div
//                 className={`inline-flex items-center gap-1.5 w-32 px-3 font-medium py-1.5 rounded-md ${
//                   statusConfig[transfer.status]?.class ||
//                   "bg-gray-100 text-gray font-bold"
//                 }`}
//               >
//                 {statusConfig[transfer.status]?.icon || <Clock size={20} />}
//                 <span className="capitalize">{transfer.status}</span>
//               </div>
//             </div>

//             <div className="text-gray font-medium truncate">
//               {formatDate(transfer.createdAt)}
//             </div>

//             <div className="text-end">
//               <Link
//                 href={`/admin/transfer/${transfer._id}`}
//                 className="inline-flex items-center group px-6 py-1.5 rounded-md space-x-1 text-secondary transition-colors duration-300 font-medium"
//               >
//                 <span>View Details</span>
//                 <ChevronRight className="size-5 group-hover:translate-x-2 transition-transform ease-in-out duration-300" />
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TransferList;

// frontend/src/app/admin/components/TransferList.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { Transfer as TransferType } from "../../../types/transfer";
// import {
//   ChevronRight,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   MinusCircle,
//   Loader2,
//   FilterIcon,
//   X,
//   Calendar as CalendarIcon,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";

// interface TransferListProps {
//   transfers: TransferType[];
//   isLoading?: boolean;
// }

// const TransferList: React.FC<TransferListProps> = ({
//   transfers,
//   isLoading = false,
// }) => {
//   const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
//   const [filterTransactionId, setFilterTransactionId] = useState("");
//   const [filterUser, setFilterUser] = useState(""); // Assume string for user full name for now
//   const [filterStatus, setFilterStatus] = useState("");
//   const [dateRange, setDateRange] = useState({ from: null, to: null });
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [filteredTransfers, setFilteredTransfers] =
//     useState<TransferType[]>(transfers);
//   const filterModalRef = useRef(null);

//   // Status badge styling and icons
//   const statusConfig = {
//     pending: {
//       icon: <Clock size={18} />,
//       class: "bg-yellow-300 text-yellow-700",
//     },
//     processing: {
//       icon: <Loader2 size={18} className="animate-spin" />,
//       class: "bg-blue-300 text-blue-700",
//     },
//     completed: {
//       icon: <CheckCircle size={18} />,
//       class: "bg-green-300 text-green-700",
//     },
//     failed: {
//       icon: <XCircle size={18} />,
//       class: "bg-red-300 text-red-700",
//     },
//     canceled: {
//       icon: <MinusCircle size={18} />,
//       class: "bg-gray-300 text-gray-700",
//     },
//   };

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   useEffect(() => {
//     let currentFilteredTransfers = [...transfers];

//     if (filterTransactionId) {
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) =>
//         transfer._id.toLowerCase().includes(filterTransactionId.toLowerCase())
//       );
//     }

//     if (filterUser) {
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) =>
//         transfer.user?.fullName
//           ?.toLowerCase()
//           .includes(filterUser.toLowerCase())
//       );
//     }

//     if (filterStatus) {
//       currentFilteredTransfers = currentFilteredTransfers.filter(
//         (transfer) => transfer.status === filterStatus
//       );
//     }

//     if (dateRange.from) {
//       const fromDate = new Date(dateRange.from);
//       fromDate.setHours(0, 0, 0, 0);
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
//         const transferDate = new Date(transfer.createdAt);
//         return transferDate >= fromDate;
//       });
//     }

//     if (dateRange.to) {
//       const toDate = new Date(dateRange.to);
//       toDate.setHours(23, 59, 59, 999);
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
//         const transferDate = new Date(transfer.createdAt);
//         return transferDate <= toDate;
//       });
//     }

//     setFilteredTransfers(currentFilteredTransfers);
//   }, [transfers, filterTransactionId, filterUser, filterStatus, dateRange]);

//   // Handle clicks outside filter sidebar
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isFilterSidebarOpen &&
//         filterModalRef.current &&
//         !filterModalRef.current.contains(event.target) &&
//         !event.target.closest('[id^="radix-ui-popper-"]')
//       ) {
//         setIsFilterSidebarOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isFilterSidebarOpen]);

//   const clearFilters = () => {
//     setFilterTransactionId("");
//     setFilterUser("");
//     setFilterStatus("");
//     setDateRange({ from: null, to: null });
//   };

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div className="animate-pulse">
//         <div className="flex justify-between items-center mb-4">
//           <div className="h-8 bg-gray-200 rounded w-32"></div>{" "}
//           {/* Placeholder for title/filters */}
//         </div>
//         <div className="p-4 border-b border-gray-100">
//           <div className="grid grid-cols-7 gap-4">
//             {[...Array(7)].map((_, i) => (
//               <div key={i} className="h-4 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="p-4 border-b border-gray-100">
//             <div className="grid grid-cols-7 gap-4">
//               {[...Array(7)].map((_, j) => (
//                 <div key={j} className="h-5 bg-gray-200 rounded"></div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // Empty state
//   if (transfers.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12">
//         <AlertTriangle size={48} className="text-gray-300 mb-4" />
//         <h3 className="text-lg font-medium text-gray-700">
//           No transfers found
//         </h3>
//         <p className="text-gray mt-1">
//           Try changing your filter criteria or check back later
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       {/* Filter Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setIsFilterSidebarOpen(true)}
//           className="inline-flex items-center cursor-pointer gap-2 px-8 hover:bg-primary-hover py-2.5 bg-primary text-secondary rounded-md transition-colors duration-200"
//         >
//           <FilterIcon className="size-5" />
//           Filters
//         </button>
//       </div>

//       {/* Filter Sidebar */}
//       <AnimatePresence>
//         {isFilterSidebarOpen && (
//           <motion.div
//             ref={filterModalRef}
//             initial={{ opacity: 0, x: "100%" }}
//             animate={{ opacity: 1, x: "0%" }}
//             exit={{ opacity: 0, x: "100%" }}
//             transition={{ duration: 0.4 }}
//             className="fixed top-0 right-0 h-full w-96 scrollbar-hide bg-white shadow-sm z-50 border-l border-gray-200 overflow-y-auto"
//           >
//             <div className="p-4 border-b border-gray-300 shadow-sm">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-medium text-gray-900">
//                   Filter Transfers
//                 </h3>
//                 <button
//                   onClick={() => setIsFilterSidebarOpen(false)}
//                   className="text-gray cursor-pointer"
//                 >
//                   <X className="size-12 hover:bg-green/10 p-1.5 rounded-full" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-4 space-y-4">
//               {/* Transaction ID Filter */}
//               <div>
//                 <label className="block font-medium text-gray mb-1">
//                   Transaction ID
//                 </label>
//                 <input
//                   type="text"
//                   id="transactionId"
//                   className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                   placeholder="Search by Transaction ID"
//                   value={filterTransactionId}
//                   onChange={(e) => setFilterTransactionId(e.target.value)}
//                 />
//               </div>

//               {/* User Filter */}
//               <div>
//                 <label className="block font-medium text-gray mb-1">User</label>
//                 <input
//                   type="text"
//                   id="user"
//                   className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                   placeholder="Search by User Name"
//                   value={filterUser}
//                   onChange={(e) => setFilterUser(e.target.value)}
//                 />
//               </div>

//               {/* Status Filter */}
//               <div>
//                 <label
//                   htmlFor="status"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Status
//                 </label>
//                 <select
//                   id="status"
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm px-4 py-3"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="">All Statuses</option>
//                   {Object.keys(statusConfig).map((status) => (
//                     <option key={status} value={status}>
//                       {status}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Date Range Filter */}
//               <div>
//                 <label className="block font-medium text-gray mb-1">
//                   Date Range
//                 </label>
//                 <div className="relative">
//                   <button
//                     type="button"
//                     onClick={() => setShowCalendar(!showCalendar)}
//                     className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                   >
//                     <span>
//                       {dateRange.from
//                         ? dateRange.to
//                           ? `${format(
//                               dateRange.from,
//                               "MMM dd, yyyy"
//                             )} - ${format(dateRange.to, "MMM dd, yyyy")}`
//                           : `From ${format(dateRange.from, "MMM dd, yyyy")}`
//                         : dateRange.to
//                         ? `Until ${format(dateRange.to, "MMM dd, yyyy")}`
//                         : "Select date range"}
//                     </span>
//                     <CalendarIcon className="size-5 text-gray-400" />
//                   </button>
//                   <AnimatePresence>
//                     {showCalendar && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                       >
//                         <Calendar
//                           mode="range"
//                           selected={dateRange}
//                           onSelect={(range) => {
//                             setDateRange(range);
//                             setShowCalendar(false);
//                           }}
//                         />
//                         {(dateRange.from || dateRange.to) && (
//                           <div className="mt-2 flex justify-end">
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setDateRange({ from: null, to: null });
//                                 setShowCalendar(false);
//                               }}
//                               className="text-sm text-error"
//                             >
//                               Clear dates
//                             </button>
//                           </div>
//                         )}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>

//             <div className="px-6 flex justify-end gap-3 mt-5">
//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="text-secondary bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none"
//               >
//                 Clear All
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsFilterSidebarOpen(false)}
//                 className="inline-flex bg-primary justify-center px-6 py-3 cursor-pointer text-secondary font-medium border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Apply Filters
//               </button>
//             </div>
//             {/* Applied Filters Display inside Sidebar */}
//             <div className="px-6 py-4">
//               <h4 className="font-semibold text-gray-800 mb-3">
//                 Applied Filters
//               </h4>
//               <div className="space-y-2">
//                 {filterTransactionId && (
//                   <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                     <span>Transaction ID: {filterTransactionId}</span>
//                     <button
//                       onClick={() => setFilterTransactionId("")}
//                       className="ml-2"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 )}
//                 {filterUser && (
//                   <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                     <span>User Search: {filterUser}</span>
//                     <button onClick={() => setFilterUser("")} className="ml-2">
//                       <X size={16} />
//                     </button>
//                   </div>
//                 )}
//                 {filterStatus && filterStatus !== "all" && (
//                   <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                     <span>Status: {filterStatus}</span>
//                     <button
//                       onClick={() => setFilterStatus("")}
//                       className="ml-2"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 )}
//                 {(dateRange.from || dateRange.to) && (
//                   <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                     <span>
//                       Date:{" "}
//                       {dateRange.from ? format(dateRange.from, "MMM dd") : ""}
//                       {dateRange.from && dateRange.to ? " - " : ""}
//                       {dateRange.to ? format(dateRange.to, "MMM dd") : ""}
//                     </span>
//                     <button
//                       onClick={() => setDateRange({ from: null, to: null })}
//                       className="ml-2"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Content - Transfer List */}
//       <div className="mt-5">
//         {/* Header row */}
//         <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-5 border-b border-gray-300 font-semibold text-main">
//           {/* transaction ID */}
//           <div>ID</div>
//           <div>USER</div>
//           <div>RECIPIENT</div>
//           <div>AMOUNT</div>
//           <div>STATUS</div>
//           <div>DATE</div>
//           <div className="text-center">ACTIONS</div>
//         </div>

//         {/* Data rows */}
//         {filteredTransfers.map((transfer, index) => (
//           <div
//             key={transfer._id}
//             className={`grid grid-cols-1 md:grid-cols-7 ${
//               index < filteredTransfers.length - 1
//                 ? "border-b border-gray-300"
//                 : ""
//             } gap-4 p-5 transition-colors duration-200 ${
//               index % 2 !== 0 ? "bg-gray-100" : ""
//             }`}
//           >
//             <div
//               className="font-medium text-gray truncate"
//               title={transfer._id}
//             >
//               {transfer._id.substring(0, 10)}...
//             </div>

//             <div className="text-gray font-medium capitalize truncate">
//               {transfer.user?.fullName || "N/A"}
//             </div>

//             <div className="text-gray truncate">
//               {transfer.recipient?.accountHolderName.substring(0, 16) || "N/A"}
//               ...
//             </div>

//             <div className="font-medium gap-1 flex text-gray capitalize">
//               {transfer.sendAmount}
//               <span>{transfer.sendCurrency?.code}</span>
//             </div>

//             <div>
//               <div
//                 className={`inline-flex items-center gap-1.5 w-32 px-3 font-medium py-1.5 rounded-md ${
//                   statusConfig[transfer.status]?.class ||
//                   "bg-gray-100 text-gray font-bold"
//                 }`}
//               >
//                 {statusConfig[transfer.status]?.icon || <Clock size={20} />}
//                 <span className="capitalize">{transfer.status}</span>
//               </div>
//             </div>

//             <div className="text-gray font-medium truncate">
//               {formatDate(transfer.createdAt)}
//             </div>

//             <div className="text-end">
//               <Link
//                 href={`/admin/transfer/${transfer._id}`}
//                 className="inline-flex items-center group px-6 py-1.5 rounded-md space-x-1 text-secondary transition-colors duration-300 font-medium"
//               >
//                 <span>View Details</span>
//                 <ChevronRight className="size-5 group-hover:translate-x-2 transition-transform ease-in-out duration-300" />
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TransferList;

// // frontend/src/app/admin/components/TransferList.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { Transfer as TransferType } from "../../../types/transfer";
// import {
//   ChevronRight,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   MinusCircle,
//   Loader2,
//   FilterIcon,
//   X,
//   Calendar as CalendarIcon,
//   ChevronDown,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { GiCheckMark } from "react-icons/gi";

// interface TransferListProps {
//   transfers: TransferType[];
//   isLoading?: boolean;
// }

// // Custom Dropdown Component
// const CustomDropdown = ({ label, value, onChange, options }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const inputFieldRef = useRef(null); // Ref for the input field area

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isOpen &&
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         inputFieldRef.current &&
//         !inputFieldRef.current.contains(event.target)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <label className="block font-medium text-gray mb-1">{label}</label>
//       <div className="relative">
//         <div
//           ref={inputFieldRef} // Attach ref to the input field area
//           onClick={toggleDropdown} // Toggle dropdown on click
//           className="flex items-center justify-between capitalize cursor-pointer w-full border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-main focus:outline-none"
//         >
//           <span>{value || `All ${label}s`}</span>
//           <ChevronDown className="size-6 text-gray-400" />
//         </div>
//         <AnimatePresence>
//           {isOpen && (
//             <motion.ul
//               ref={dropdownRef}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               className="absolute mt-2 w-full capitalize bg-white rounded-md shadow-lg z-10 border border-gray-300 overflow-hidden"
//             >
//               {options.map((option) => (
//                 <motion.li
//                   key={option}
//                   onClick={() => {
//                     onChange(option);
//                     setIsOpen(false);
//                   }}
//                   className="px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium cursor-pointer flex justify-between items-center"
//                 >
//                   {option === "all" ? `All ${label}s` : option}
//                   {value === option && (
//                     <GiCheckMark className="text-gray" size={20} />
//                   )}
//                 </motion.li>
//               ))}
//             </motion.ul>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// const TransferList: React.FC<TransferListProps> = ({
//   transfers,
//   isLoading = false,
// }) => {
//   const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
//   const [filterTransactionId, setFilterTransactionId] = useState("");
//   const [filterUser, setFilterUser] = useState(""); // Assume string for user full name for now
//   const [filterStatus, setFilterStatus] = useState("");
//   const [dateRange, setDateRange] = useState({ from: null, to: null });
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [filteredTransfers, setFilteredTransfers] =
//     useState<TransferType[]>(transfers);
//   const filterModalRef = useRef(null);

//   // Status badge styling and icons
//   const statusConfig = {
//     pending: {
//       icon: <Clock size={18} />,
//       class: "bg-yellow-300 text-yellow-700",
//     },
//     processing: {
//       icon: <Loader2 size={18} className="animate-spin" />,
//       class: "bg-blue-300 text-blue-700",
//     },
//     completed: {
//       icon: <CheckCircle size={18} />,
//       class: "bg-green-300 text-green-700",
//     },
//     failed: {
//       icon: <XCircle size={18} />,
//       class: "bg-red-300 text-red-700",
//     },
//     canceled: {
//       icon: <MinusCircle size={18} />,
//       class: "bg-gray-300 text-gray-700",
//     },
//   };

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   useEffect(() => {
//     let currentFilteredTransfers = [...transfers];

//     if (filterTransactionId) {
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) =>
//         transfer._id.toLowerCase().includes(filterTransactionId.toLowerCase())
//       );
//     }

//     if (filterUser) {
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) =>
//         transfer.user?.fullName
//           ?.toLowerCase()
//           .includes(filterUser.toLowerCase())
//       );
//     }

//     if (filterStatus && filterStatus !== "all") {
//       currentFilteredTransfers = currentFilteredTransfers.filter(
//         (transfer) => transfer.status === filterStatus
//       );
//     }

//     if (dateRange.from) {
//       const fromDate = new Date(dateRange.from);
//       fromDate.setHours(0, 0, 0, 0);
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
//         const transferDate = new Date(transfer.createdAt);
//         return transferDate >= fromDate;
//       });
//     }

//     if (dateRange.to) {
//       const toDate = new Date(dateRange.to);
//       toDate.setHours(23, 59, 59, 999);
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
//         const transferDate = new Date(transfer.createdAt);
//         return transferDate <= toDate;
//       });
//     }

//     setFilteredTransfers(currentFilteredTransfers);
//   }, [transfers, filterTransactionId, filterUser, filterStatus, dateRange]);

//   // Handle clicks outside filter sidebar
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isFilterSidebarOpen &&
//         filterModalRef.current &&
//         !filterModalRef.current.contains(event.target) &&
//         !event.target.closest('[id^="radix-ui-popper-"]')
//       ) {
//         setIsFilterSidebarOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isFilterSidebarOpen]);

//   const clearFilters = () => {
//     setFilterTransactionId("");
//     setFilterUser("");
//     setFilterStatus("all"); // Reset status filter to 'all'
//     setDateRange({ from: null, to: null });
//   };

//   const statusOptions = ["all", ...Object.keys(statusConfig)];
//   const handleStatusDropdownChange = (status) => {
//     setFilterStatus(status);
//   };

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div className="animate-pulse">
//         <div className="flex justify-between items-center mb-4">
//           <div className="h-8 bg-gray-200 rounded w-32"></div>{" "}
//           {/* Placeholder for title/filters */}
//         </div>
//         <div className="p-4 border-b border-gray-100">
//           <div className="grid grid-cols-7 gap-4">
//             {[...Array(7)].map((_, i) => (
//               <div key={i} className="h-4 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="p-4 border-b border-gray-100">
//             <div className="grid grid-cols-7 gap-4">
//               {[...Array(7)].map((_, j) => (
//                 <div key={j} className="h-5 bg-gray-200 rounded"></div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // Empty state
//   if (transfers.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12">
//         <AlertTriangle size={48} className="text-gray-300 mb-4" />
//         <h3 className="text-lg font-medium text-gray-700">
//           No transfers found
//         </h3>
//         <p className="text-gray mt-1">
//           Try changing your filter criteria or check back later
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       {/* Filter Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setIsFilterSidebarOpen(true)}
//           className="inline-flex items-center cursor-pointer gap-2 px-8 hover:bg-primary-hover py-2.5 bg-primary text-secondary rounded-md transition-colors duration-200"
//         >
//           <FilterIcon className="size-5" />
//           Filters
//         </button>
//       </div>

//       {/* Filter Sidebar */}
//       <AnimatePresence>
//         {isFilterSidebarOpen && (
//           <motion.div
//             ref={filterModalRef}
//             initial={{ opacity: 0, x: "100%" }}
//             animate={{ opacity: 1, x: "0%" }}
//             exit={{ opacity: 0, x: "100%" }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-0 right-0 h-full w-96 scrollbar-hide bg-white shadow-sm z-50 border-l border-gray-200 overflow-y-auto"
//           >
//             <div className="p-5 border-b border-gray-300 shadow-sm">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-medium text-gray-900">
//                   Filter Transfers
//                 </h3>
//                 <button
//                   onClick={() => setIsFilterSidebarOpen(false)}
//                   className="text-gray cursor-pointer"
//                 >
//                   <X className="size-10 hover:bg-green/10 p-1.5 rounded-full" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-4 space-y-4">
//               {/* Transaction ID Filter */}
//               <div>
//                 <label className="block font-medium text-gray mb-1">
//                   Transaction ID
//                 </label>
//                 <input
//                   type="text"
//                   id="transactionId"
//                   className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                   placeholder="Search by Transaction ID"
//                   value={filterTransactionId}
//                   onChange={(e) => setFilterTransactionId(e.target.value)}
//                 />
//               </div>

//               {/* User Filter */}
//               <div>
//                 <label className="block font-medium text-gray mb-1">User</label>
//                 <input
//                   type="text"
//                   id="user"
//                   className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                   placeholder="Search by User Name"
//                   value={filterUser}
//                   onChange={(e) => setFilterUser(e.target.value)}
//                 />
//               </div>

//               {/* Status Filter */}
//               <div>
//                 <CustomDropdown
//                   label="Status"
//                   value={filterStatus === "all" ? null : filterStatus}
//                   onChange={handleStatusDropdownChange}
//                   options={statusOptions.filter(opt => opt !== 'all')}
//                 />
//               </div>

//               {/* Date Range Filter */}
//               <div>
//                 <label className="block font-medium text-gray mb-1">
//                   Date Range
//                 </label>
//                 <div className="relative">
//                   <button
//                     type="button"
//                     onClick={() => setShowCalendar(!showCalendar)}
//                     className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                   >
//                     <span>
//                       {dateRange.from
//                         ? dateRange.to
//                           ? `${format(
//                               dateRange.from,
//                               "MMM dd, yyyy"
//                             )} - ${format(dateRange.to, "MMM dd, yyyy")}`
//                           : `From ${format(dateRange.from, "MMM dd, yyyy")}`
//                         : dateRange.to
//                         ? `Until ${format(dateRange.to, "MMM dd, yyyy")}`
//                         : "Select date range"}
//                     </span>
//                     <CalendarIcon className="size-5 text-gray-400" />
//                   </button>
//                   <AnimatePresence>
//                     {showCalendar && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                       >
//                         <Calendar
//                           mode="range"
//                           selected={dateRange}
//                           onSelect={(range) => {
//                             setDateRange(range);
//                             setShowCalendar(false);
//                           }}
//                         />
//                         {(dateRange.from || dateRange.to) && (
//                           <div className="mt-2 flex justify-end">
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setDateRange({ from: null, to: null });
//                                 setShowCalendar(false);
//                               }}
//                               className="text-sm text-error"
//                             >
//                               Clear dates
//                             </button>
//                           </div>
//                         )}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>

//             <div className="px-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="text-main w-full bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none"
//               >
//                 Clear All
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsFilterSidebarOpen(false)}
//                 className="inline-flex w-full bg-primary text-main justify-center px-6 py-3 cursor-pointer font-medium border border-transparent rounded-md hover:bg-primary-hover focus:outline-none"
//               >
//                 Apply Filters
//               </button>
//             </div>
//             {/* Applied Filters Display inside Sidebar */}
//             <div className="px-6 py-4">
//               <h4 className="font-semibold text-xl text-main">
//                 Applied Filters
//               </h4>
//               <div className="space-y-2.5 py-5">
//                 {filterTransactionId && (
//                   <div className="bg-primary text-main font-medium rounded-md px-4 py-2.5 flex text-nowrap text-sm items-center justify-between">
//                     <span>Transaction ID: {filterTransactionId}</span>
//                     <button
//                       onClick={() => setFilterTransactionId("")}
//                       className="ml-2"
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>
//                 )}
//                 {filterUser && (
//                   <div className="bg-primary text-main font-medium rounded-md px-4 py-2.5 flex text-sm items-center justify-between">
//                     <span>User Search: {filterUser}</span>
//                     <button onClick={() => setFilterUser("")} className="ml-2">
//                       <X size={20} />
//                     </button>
//                   </div>
//                 )}
//                 {filterStatus && filterStatus !== "all" && (
//                   <div className="bg-primary text-main font-medium rounded-md px-4 py-2.5 flex items-center justify-between">
//                     <span>Status: {filterStatus}</span>
//                     <button
//                       onClick={() => setFilterStatus("all")}
//                       className="ml-2"
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>
//                 )}
//                 {(dateRange.from || dateRange.to) && (
//                   <div className="bg-primary text-main font-medium rounded-md px-4 py-2.5 flex text-sm items-center justify-between">
//                     <span>
//                       Date:{" "}
//                       {dateRange.from ? format(dateRange.from, "MMM dd") : ""}
//                       {dateRange.from && dateRange.to ? " - " : ""}
//                       {dateRange.to ? format(dateRange.to, "MMM dd") : ""}
//                     </span>
//                     <button
//                       onClick={() => setDateRange({ from: null, to: null })}
//                       className="ml-2"
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Content - Transfer List */}
//       <div className="mt-5 bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden">
//         {/* Header row */}
//         <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-5 border-b border-gray-300 font-semibold text-main">
//           {/* transaction ID */}
//           <div>ID</div>
//           <div>USER</div>
//           <div>RECIPIENT</div>
//           <div>AMOUNT</div>
//           <div>STATUS</div>
//           <div>DATE</div>
//           <div className="text-center">ACTIONS</div>
//         </div>

//         {/* Data rows */}
//         {filteredTransfers.map((transfer, index) => (
//           <div
//             key={transfer._id}
//             className={`grid grid-cols-1 md:grid-cols-7 ${
//               index < filteredTransfers.length - 1
//                 ? "border-b border-gray-300"
//                 : ""
//             } gap-4 p-5 transition-colors duration-200 ${
//               index % 2 !== 0 ? "bg-gray-100" : ""
//             }`}
//           >
//             <div
//               className="font-medium text-gray truncate"
//               title={transfer._id}
//             >
//               {transfer._id.substring(0, 10)}...
//             </div>

//             <div className="text-gray font-medium capitalize truncate">
//               {transfer.user?.fullName || "N/A"}
//             </div>

//             <div className="text-gray truncate">
//               {transfer.recipient?.accountHolderName.substring(0, 16) || "N/A"}
//               ...
//             </div>

//             <div className="font-medium gap-1 flex text-gray capitalize">
//               {transfer.sendAmount}
//               <span>{transfer.sendCurrency?.code}</span>
//             </div>

//             <div>
//               <div
//                 className={`inline-flex items-center gap-1.5 w-32 px-3 font-medium py-1.5 rounded-md ${
//                   statusConfig[transfer.status]?.class ||
//                   "bg-gray-100 text-gray font-bold"
//                 }`}
//               >
//                 {statusConfig[transfer.status]?.icon || <Clock size={20} />}
//                 <span className="capitalize">{transfer.status}</span>
//               </div>
//             </div>

//             <div className="text-gray font-medium truncate">
//               {formatDate(transfer.createdAt)}
//             </div>

//             <div className="text-end">
//               <Link
//                 href={`/admin/transfer/${transfer._id}`}
//                 className="inline-flex items-center group px-6 py-1.5 rounded-md space-x-1 text-secondary transition-colors duration-300 font-medium"
//               >
//                 <span>View Details</span>
//                 <ChevronRight className="size-5 group-hover:translate-x-2 transition-transform ease-in-out duration-300" />
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TransferList;

// frontend/src/app/admin/components/TransferList.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { Transfer as TransferType } from "../../../types/transfer";
// import {
//   ChevronRight,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   MinusCircle,
//   Loader2,
//   FilterIcon,
//   X,
//   Calendar as CalendarIcon,
//   ChevronDown,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { GiCheckMark } from "react-icons/gi";

// interface TransferListProps {
//   transfers: TransferType[];
//   isLoading?: boolean;
// }

// // Custom Dropdown Component
// const CustomDropdown = ({ label, value, onChange, options }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const inputFieldRef = useRef(null); // Ref for the input field area

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isOpen &&
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         inputFieldRef.current &&
//         !inputFieldRef.current.contains(event.target)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <label className="block font-medium text-gray mb-1">{label}</label>
//       <div className="relative">
//         <div
//           ref={inputFieldRef} // Attach ref to the input field area
//           onClick={toggleDropdown} // Toggle dropdown on click
//           className="flex items-center justify-between capitalize cursor-pointer w-full border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-main focus:outline-none"
//         >
//           <span>{value || `All ${label}s`}</span>
//           <ChevronDown className="size-6 text-gray-400" />
//         </div>
//         <AnimatePresence>
//           {isOpen && (
//             <motion.ul
//               ref={dropdownRef}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               className="absolute mt-2 w-full capitalize bg-white rounded-md shadow-lg z-10 border border-gray-300 overflow-hidden"
//             >
//               {options.map((option) => (
//                 <motion.li
//                   key={option}
//                   onClick={() => {
//                     onChange(option);
//                     setIsOpen(false);
//                   }}
//                   className="px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium cursor-pointer flex justify-between items-center"
//                 >
//                   {option === "all" ? `All ${label}s` : option}
//                   {value === option && (
//                     <GiCheckMark className="text-gray" size={20} />
//                   )}
//                 </motion.li>
//               ))}
//             </motion.ul>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// const TransferList: React.FC<TransferListProps> = ({
//   transfers,
//   isLoading = false,
// }) => {
//   const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
//   const [filterTransactionId, setFilterTransactionId] = useState("");
//   const [filterUser, setFilterUser] = useState(""); // Assume string for user full name for now
//   const [filterStatus, setFilterStatus] = useState("");
//   const [dateRange, setDateRange] = useState({ from: null, to: null });
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [filteredTransfers, setFilteredTransfers] =
//     useState<TransferType[]>(transfers);
//   const filterModalRef = useRef(null);

//   // Status badge styling and icons
//   const statusConfig = {
//     pending: {
//       icon: <Clock size={18} />,
//       class: "bg-yellow-300 text-yellow-700",
//     },
//     processing: {
//       icon: <Loader2 size={18} className="animate-spin" />,
//       class: "bg-blue-300 text-blue-700",
//     },
//     completed: {
//       icon: <CheckCircle size={18} />,
//       class: "bg-green-300 text-green-700",
//     },
//     failed: {
//       icon: <XCircle size={18} />,
//       class: "bg-red-300 text-red-700",
//     },
//     canceled: {
//       icon: <MinusCircle size={18} />,
//       class: "bg-gray-300 text-gray-700",
//     },
//   };

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   useEffect(() => {
//     let currentFilteredTransfers = [...transfers];

//     if (filterTransactionId) {
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) =>
//         transfer._id.toLowerCase().includes(filterTransactionId.toLowerCase())
//       );
//     }

//     if (filterUser) {
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) =>
//         transfer.user?.fullName
//           ?.toLowerCase()
//           .includes(filterUser.toLowerCase())
//       );
//     }

//     if (filterStatus && filterStatus !== "all") {
//       currentFilteredTransfers = currentFilteredTransfers.filter(
//         (transfer) => transfer.status === filterStatus
//       );
//     }

//     if (dateRange.from) {
//       const fromDate = new Date(dateRange.from);
//       fromDate.setHours(0, 0, 0, 0);
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
//         const transferDate = new Date(transfer.createdAt);
//         return transferDate >= fromDate;
//       });
//     }

//     if (dateRange.to) {
//       const toDate = new Date(dateRange.to);
//       toDate.setHours(23, 59, 59, 999);
//       currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
//         const transferDate = new Date(transfer.createdAt);
//         return transferDate <= toDate;
//       });
//     }

//     setFilteredTransfers(currentFilteredTransfers);
//   }, [transfers, filterTransactionId, filterUser, filterStatus, dateRange]);

//   // Handle clicks outside filter sidebar
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isFilterSidebarOpen &&
//         filterModalRef.current &&
//         !filterModalRef.current.contains(event.target) &&
//         !event.target.closest('[id^="radix-ui-popper-"]')
//       ) {
//         setIsFilterSidebarOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isFilterSidebarOpen]);

//   const clearFilters = () => {
//     setFilterTransactionId("");
//     setFilterUser("");
//     setFilterStatus("all"); // Reset status filter to 'all'
//     setDateRange({ from: null, to: null });
//   };

//   const statusOptions = ["all", ...Object.keys(statusConfig)];
//   const handleStatusDropdownChange = (status) => {
//     setFilterStatus(status);
//   };

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div className="animate-pulse">
//         <div className="flex justify-between items-center mb-4">
//           <div className="h-8 bg-gray-200 rounded w-32"></div>{" "}
//           {/* Placeholder for title/filters */}
//         </div>
//         <div className="p-4 border-b border-gray-100">
//           <div className="grid grid-cols-7 gap-4">
//             {[...Array(7)].map((_, i) => (
//               <div key={i} className="h-4 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="p-4 border-b border-gray-100">
//             <div className="grid grid-cols-7 gap-4">
//               {[...Array(7)].map((_, j) => (
//                 <div key={j} className="h-5 bg-gray-200 rounded"></div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // Empty state for initial load
//   if (transfers.length === 0 && !isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12">
//         <AlertTriangle size={48} className="text-gray-300 mb-4" />
//         <h3 className="text-lg font-medium text-gray-700">
//           No transfers found
//         </h3>
//         <p className="text-gray mt-1">
//           Try changing your filter criteria or check back later
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       {/* Filter Button */}
//       <div className="flex justify-end mt-10">
//         <button
//           onClick={() => setIsFilterSidebarOpen(true)}
//           className="inline-flex items-center cursor-pointer gap-2 px-8 hover:bg-primary-hover py-2.5 bg-primary text-secondary rounded-md transition-colors duration-200"
//         >
//           <FilterIcon className="size-5" />
//           Filters
//         </button>
//       </div>

//       {/* Filter Sidebar */}
//       <AnimatePresence>
//         {isFilterSidebarOpen && (
//           <motion.div
//             ref={filterModalRef}
//             initial={{ opacity: 0, x: "100%" }}
//             animate={{ opacity: 1, x: "0%" }}
//             exit={{ opacity: 0, x: "100%" }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-0 right-0 h-full w-96 scrollbar-hide bg-white shadow-sm z-50 border-l border-gray-200 overflow-y-auto"
//           >
//             <div className="p-6 border-b border-gray-300 shadow-sm">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-medium text-gray-900">
//                   Filter Transfers
//                 </h3>
//                 <button
//                   onClick={() => setIsFilterSidebarOpen(false)}
//                   className="text-gray cursor-pointer"
//                 >
//                   <X className="size-10 hover:bg-green/10 p-1.5 rounded-full" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-4 space-y-4">
//               {/* Transaction ID Filter */}
//               <div>
//                 <label className="block font-medium text-gray mb-1">
//                   Transaction ID
//                 </label>
//                 <input
//                   type="text"
//                   id="transactionId"
//                   className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                   placeholder="Search by Transaction ID"
//                   value={filterTransactionId}
//                   onChange={(e) => setFilterTransactionId(e.target.value)}
//                 />
//               </div>

//               {/* User Filter */}
//               <div>
//                 <label className="block font-medium text-gray mb-1">User</label>
//                 <input
//                   type="text"
//                   id="user"
//                   className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                   placeholder="Search by User Name"
//                   value={filterUser}
//                   onChange={(e) => setFilterUser(e.target.value)}
//                 />
//               </div>

//               {/* Status Filter */}
//               <div>
//                 <CustomDropdown
//                   label="Status"
//                   value={filterStatus === "all" ? null : filterStatus}
//                   onChange={handleStatusDropdownChange}
//                   options={statusOptions.filter((opt) => opt !== "all")}
//                 />
//               </div>

//               {/* Date Range Filter */}
//               <div>
//                 <label className="block font-medium text-gray mb-1">
//                   Date Range
//                 </label>
//                 <div className="relative">
//                   <button
//                     type="button"
//                     onClick={() => setShowCalendar(!showCalendar)}
//                     className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                   >
//                     <span>
//                       {dateRange.from
//                         ? dateRange.to
//                           ? `${format(
//                               dateRange.from,
//                               "MMM dd, yyyy"
//                             )} - ${format(dateRange.to, "MMM dd, yyyy")}`
//                           : `From ${format(dateRange.from, "MMM dd, yyyy")}`
//                         : dateRange.to
//                         ? `Until ${format(dateRange.to, "MMM dd, yyyy")}`
//                         : "Select date range"}
//                     </span>
//                     <CalendarIcon className="size-5 text-gray-400" />
//                   </button>
//                   <AnimatePresence>
//                     {showCalendar && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                       >
//                         <Calendar
//                           mode="range"
//                           selected={dateRange}
//                           onSelect={(range) => {
//                             setDateRange(range);
//                             setShowCalendar(false);
//                           }}
//                         />
//                         {(dateRange.from || dateRange.to) && (
//                           <div className="mt-2 flex justify-end">
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setDateRange({ from: null, to: null });
//                                 setShowCalendar(false);
//                               }}
//                               className="text-sm text-error"
//                             >
//                               Clear dates
//                             </button>
//                           </div>
//                         )}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>

//             <div className="px-4 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="text-main w-full bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none"
//               >
//                 Clear All
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsFilterSidebarOpen(false)}
//                 className="inline-flex w-full bg-primary text-main justify-center px-6 py-3 cursor-pointer font-medium border border-transparent rounded-md hover:bg-primary-hover focus:outline-none"
//               >
//                 Apply Filters
//               </button>
//             </div>

//             {/* Applied Filters Display inside Sidebar */}
//             <div className="px-4 py-4">
//               <h4 className="font-semibold text-xl text-main">
//                 Applied Filters
//               </h4>
//               <div className="space-y-2.5 py-5">
//                 {filterTransactionId && (
//                   <div className="bg-primary text-main gap-1 font-medium rounded-md px-4 py-2.5 flex text-nowrap text-sm items-center justify-between">
//                     <span>Transaction ID: {filterTransactionId}</span>
//                     <button
//                       onClick={() => setFilterTransactionId("")}
//                       className=""
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>
//                 )}
//                 {filterUser && (
//                   <div className="bg-primary text-main font-medium rounded-md px-4 py-2.5 flex text-sm items-center justify-between">
//                     <span>User Search: {filterUser}</span>
//                     <button onClick={() => setFilterUser("")} className="ml-2">
//                       <X size={20} />
//                     </button>
//                   </div>
//                 )}
//                 {filterStatus && filterStatus !== "all" && (
//                   <div className="bg-primary text-main font-medium rounded-md px-4 py-2.5 flex items-center justify-between">
//                     <span>Status: {filterStatus}</span>
//                     <button
//                       onClick={() => setFilterStatus("all")}
//                       className="ml-2"
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>
//                 )}
//                 {(dateRange.from || dateRange.to) && (
//                   <div className="bg-primary text-main font-medium rounded-md px-4 py-2.5 flex text-sm items-center justify-between">
//                     <span>
//                       Date:{" "}
//                       {dateRange.from ? format(dateRange.from, "MMM dd") : ""}
//                       {dateRange.from && dateRange.to ? " - " : ""}
//                       {dateRange.to ? format(dateRange.to, "MMM dd") : ""}
//                     </span>
//                     <button
//                       onClick={() => setDateRange({ from: null, to: null })}
//                       className="ml-2"
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Content - Transfer List */}
//       <div className="mt-5 bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden">
//         {/* Header row */}
//         <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-5 border-b border-gray-300 font-medium tracking-wider text-gray-500">
//           {/* transaction ID */}
//           <div>ID</div>
//           <div>USER</div>
//           <div>RECIPIENT</div>
//           <div>AMOUNT</div>
//           <div>STATUS</div>
//           <div>DATE</div>
//           <div className="text-center">ACTIONS</div>
//         </div>

//         {/* Data rows */}
//         {filteredTransfers.length > 0 ? (
//           filteredTransfers.map((transfer, index) => (
//             <div
//               key={transfer._id}
//               className={`grid grid-cols-1 md:grid-cols-7 ${
//                 index < filteredTransfers.length - 1
//                   ? "border-b border-gray-300"
//                   : ""
//               } gap-4 p-5 transition-colors duration-200 ${
//                 index % 2 !== 0 ? "bg-gray-100" : ""
//               }`}
//             >
//               <div
//                 className="font-medium text-gray truncate"
//                 title={transfer._id}
//               >
//                 {transfer._id.substring(0, 10)}...
//               </div>

//               <div className="text-gray font-medium capitalize truncate">
//                 {transfer.user?.fullName || "N/A"}
//               </div>

//               <div className="text-gray truncate">
//                 {transfer.recipient?.accountHolderName.substring(0, 16) ||
//                   "N/A"}
//                 ...
//               </div>

//               <div className="font-medium gap-1 flex text-gray capitalize">
//                 {transfer.sendAmount}
//                 <span>{transfer.sendCurrency?.code}</span>
//               </div>

//               <div>
//                 <div
//                   className={`inline-flex items-center gap-1.5 w-32 px-3 font-medium py-1.5 rounded-md ${
//                     statusConfig[transfer.status]?.class ||
//                     "bg-gray-100 text-gray font-bold"
//                   }`}
//                 >
//                   {statusConfig[transfer.status]?.icon || <Clock size={20} />}
//                   <span className="capitalize">{transfer.status}</span>
//                 </div>
//               </div>

//               <div className="text-gray font-medium truncate">
//                 {formatDate(transfer.createdAt)}
//               </div>

//               <div className="text-end">
//                 <Link
//                   href={`/admin/transfer/${transfer._id}`}
//                   className="inline-flex items-center group px-6 py-1.5 rounded-md space-x-1 text-secondary transition-colors duration-300 font-medium"
//                 >
//                   <span>View Details</span>
//                   <ChevronRight className="size-5 group-hover:translate-x-2 transition-transform ease-in-out duration-300" />
//                 </Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="py-10 text-center col-span-full">
//             <p className="text-gray text-lg font-medium capitalize">
//               No transfers found matching your filters.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransferList;

// frontend/src/app/admin/components/TransferList.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Transfer as TransferType } from "../../../types/transfer";
import {
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MinusCircle,
  Loader2,
  FilterIcon,
  X,
  Calendar as CalendarIcon,
  ChevronDown,
  SearchIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { GiCheckMark } from "react-icons/gi";

interface TransferListProps {
  transfers: TransferType[];
  isLoading?: boolean;
}

// Custom Dropdown Component
const CustomDropdown = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputFieldRef = useRef(null); // Ref for the input field area

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputFieldRef.current &&
        !inputFieldRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <label className="block font-medium text-gray mb-1">{label}</label>
      <div className="relative">
        <div
          ref={inputFieldRef} // Attach ref to the input field area
          onClick={toggleDropdown} // Toggle dropdown on click
          className="flex items-center justify-between capitalize cursor-pointer w-full border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-main focus:outline-none"
        >
          <span>{value || `All ${label}s`}</span>
          <ChevronDown className="size-6 text-gray-400" />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              ref={dropdownRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute mt-2 w-full capitalize bg-white rounded-md shadow-lg z-10 border border-gray-300 overflow-hidden"
            >
              {options.map((option) => (
                <motion.li
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium cursor-pointer flex justify-between items-center"
                >
                  {option === "all" ? `All ${label}s` : option}
                  {value === option && (
                    <GiCheckMark className="text-gray" size={20} />
                  )}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TransferList: React.FC<TransferListProps> = ({
  transfers,
  isLoading = false,
}) => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [filterTransactionId, setFilterTransactionId] = useState("");
  const [filterUser, setFilterUser] = useState(""); // Assume string for user full name for now
  const [filterStatus, setFilterStatus] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [showCalendar, setShowCalendar] = useState(false);
  const [filteredTransfers, setFilteredTransfers] =
    useState<TransferType[]>(transfers);
  const filterModalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Status badge styling and icons
  const statusConfig = {
    pending: {
      icon: <Clock size={18} />,
      class: "bg-yellow-300 text-yellow-700",
    },
    processing: {
      icon: <Loader2 size={18} className="animate-spin" />,
      class: "bg-blue-300 text-blue-700",
    },
    completed: {
      icon: <CheckCircle size={18} />,
      class: "bg-green-300 text-green-700",
    },
    failed: {
      icon: <XCircle size={18} />,
      class: "bg-red-300 text-red-700",
    },
    canceled: {
      icon: <MinusCircle size={18} />,
      class: "bg-gray-300 text-gray-700",
    },
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    let currentFilteredTransfers = [...transfers];

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
        const transactionIdMatch = transfer._id
          .toLowerCase()
          .includes(lowerSearchTerm);
        const userNameMatch = transfer.user?.fullName
          ?.toLowerCase()
          .includes(lowerSearchTerm);
        const amountMatch = String(transfer.sendAmount).includes(
          lowerSearchTerm
        ); // Convert amount to string for searching
        return transactionIdMatch || userNameMatch || amountMatch;
      });
    }

    if (filterTransactionId) {
      currentFilteredTransfers = currentFilteredTransfers.filter((transfer) =>
        transfer._id.toLowerCase().includes(filterTransactionId.toLowerCase())
      );
    }

    if (filterUser) {
      currentFilteredTransfers = currentFilteredTransfers.filter((transfer) =>
        transfer.user?.fullName
          ?.toLowerCase()
          .includes(filterUser.toLowerCase())
      );
    }

    if (filterStatus && filterStatus !== "all") {
      currentFilteredTransfers = currentFilteredTransfers.filter(
        (transfer) => transfer.status === filterStatus
      );
    }

    if (dateRange.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
        const transferDate = new Date(transfer.createdAt);
        return transferDate >= fromDate;
      });
    }

    if (dateRange.to) {
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999);
      currentFilteredTransfers = currentFilteredTransfers.filter((transfer) => {
        const transferDate = new Date(transfer.createdAt);
        return transferDate <= toDate;
      });
    }

    setFilteredTransfers(currentFilteredTransfers);
  }, [
    transfers,
    filterTransactionId,
    filterUser,
    filterStatus,
    dateRange,
    searchTerm, // Include searchTerm in dependency array
  ]);

  // Handle clicks outside filter sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isFilterSidebarOpen &&
        filterModalRef.current &&
        !filterModalRef.current.contains(event.target) &&
        !event.target.closest('[id^="radix-ui-popper-"]')
      ) {
        setIsFilterSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterSidebarOpen]);

  const clearFilters = () => {
    setFilterTransactionId("");
    setFilterUser("");
    setFilterStatus("all"); // Reset status filter to 'all'
    setDateRange({ from: null, to: null });
  };

  const statusOptions = ["all", ...Object.keys(statusConfig)];
  const handleStatusDropdownChange = (status) => {
    setFilterStatus(status);
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="p-4 border-b mt-10">
          <div className="grid grid-cols-7 gap-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border-b">
            <div className="grid grid-cols-7 gap-4">
              {[...Array(7)].map((_, j) => (
                <div key={j} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state for initial load
  if (transfers.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertTriangle size={48} className="text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700">
          No transfers found
        </h3>
        <p className="text-gray mt-1">
          Try changing your filter criteria or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Search and Filter Bar */}
      <div className="flex justify-end gap-4 items-center mt-10">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by ID, User, or Amount..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 border hover:shadow-darkcolor border-gray-300 rounded-lg transition-shadow duration-300 ease-in-out"
          />
          {searchTerm && (
            <button
              onClick={clearSearchTerm}
              className="absolute right-2 top-1/2 transform cursor-pointer -translate-y-1/2 p-1 hover:bg-green/10 transition-colors ease-in-out duration-300 rounded-full"
            >
              <X size={20} className="text-gray-500" />
            </button>
          )}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="size-5 text-gray-500" />
          </div>
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setIsFilterSidebarOpen(true)}
          className="inline-flex items-center cursor-pointer gap-2 px-8 hover:bg-primary-hover py-3 bg-primary text-secondary rounded-md transition-colors duration-200"
        >
          <FilterIcon className="size-5" />
          Filters
        </button>
      </div>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {isFilterSidebarOpen && (
          <motion.div
            ref={filterModalRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-96 scrollbar-hide bg-white shadow-sm z-50 border-l border-gray-200 overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-300 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium text-gray-900">
                  Filter Transfers
                </h3>
                <button
                  onClick={() => setIsFilterSidebarOpen(false)}
                  className="text-gray cursor-pointer"
                >
                  <X className="size-10 hover:bg-green/10 p-1.5 rounded-full" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Transaction ID Filter */}
              <div>
                <label className="block font-medium text-gray mb-1">
                  Transaction ID
                </label>
                <input
                  type="text"
                  id="transactionId"
                  className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
                  placeholder="Search by Transaction ID"
                  value={filterTransactionId}
                  onChange={(e) => setFilterTransactionId(e.target.value)}
                />
              </div>

              {/* User Filter */}
              <div>
                <label className="block font-medium text-gray mb-1">User</label>
                <input
                  type="text"
                  id="user"
                  className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
                  placeholder="Search by User Name"
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div>
                <CustomDropdown
                  label="Status"
                  value={filterStatus === "all" ? null : filterStatus}
                  onChange={handleStatusDropdownChange}
                  options={statusOptions.filter((opt) => opt !== "all")}
                />
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block font-medium text-gray mb-1">
                  Date Range
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
                  >
                    <span>
                      {dateRange.from
                        ? dateRange.to
                          ? `${format(
                              dateRange.from,
                              "MMM dd, yyyy"
                            )} - ${format(dateRange.to, "MMM dd, yyyy")}`
                          : `From ${format(dateRange.from, "MMM dd, yyyy")}`
                        : dateRange.to
                        ? `Until ${format(dateRange.to, "MMM dd, yyyy")}`
                        : "Select date range"}
                    </span>
                    <CalendarIcon className="size-5 text-gray-400" />
                  </button>
                  <AnimatePresence>
                    {showCalendar && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
                      >
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={(range) => {
                            setDateRange(range);
                            setShowCalendar(false);
                          }}
                        />
                        {(dateRange.from || dateRange.to) && (
                          <div className="mt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                setDateRange({ from: null, to: null });
                                setShowCalendar(false);
                              }}
                              className="text-sm text-error"
                            >
                              Clear dates
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="px-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="text-main w-full bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setIsFilterSidebarOpen(false)}
                className="inline-flex w-full bg-primary text-main justify-center px-6 py-3 cursor-pointer font-medium border border-transparent rounded-md hover:bg-primary-hover focus:outline-none"
              >
                Apply Filters
              </button>
            </div>

            {/* Applied Filters Display inside Sidebar */}
            <div className="px-4 py-4">
              <h4 className="font-semibold text-xl text-main">
                Applied Filters
              </h4>
              <div className="space-y-2.5 py-5">
                {filterTransactionId && (
                  <div className="bg-primary text-main gap-1 font-medium rounded-md px-4 py-2.5 flex text-nowrap text-sm items-center justify-between">
                    <span>Transaction ID: {filterTransactionId}</span>
                    <button
                      onClick={() => setFilterTransactionId("")}
                      className=""
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
                {filterUser && (
                  <div className="bg-primary text-main font-medium rounded-md px-4 py-2.5 flex text-sm items-center justify-between">
                    <span>User Search: {filterUser}</span>
                    <button onClick={() => setFilterUser("")} className="ml-2">
                      <X size={20} />
                    </button>
                  </div>
                )}
                {filterStatus && filterStatus !== "all" && (
                  <div className="bg-primary text-main font-medium rounded-md px-4 py-2.5 flex items-center justify-between">
                    <span>Status: {filterStatus}</span>
                    <button
                      onClick={() => setFilterStatus("all")}
                      className="ml-2"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
                {(dateRange.from || dateRange.to) && (
                  <div className="bg-primary text-main font-medium rounded-md px-4 py-2.5 flex text-sm items-center justify-between">
                    <span>
                      Date:{" "}
                      {dateRange.from ? format(dateRange.from, "MMM dd") : ""}
                      {dateRange.from && dateRange.to ? " - " : ""}
                      {dateRange.to ? format(dateRange.to, "MMM dd") : ""}
                    </span>
                    <button
                      onClick={() => setDateRange({ from: null, to: null })}
                      className="ml-2"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Transfer List */}
      <div className="mt-5 bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 p-5 border-b border-gray-300 font-medium tracking-wider text-gray-500">
          {/* transaction ID */}
          <div>ID</div>
          <div>USER</div>
          <div>RECIPIENT</div>
          <div>AMOUNT</div>
          <div className="uppercase">Currency</div>
          <div>STATUS</div>
          <div>DATE</div>
          <div className="text-center">ACTIONS</div>
        </div>

        {/* Data rows */}
        {filteredTransfers.length > 0 ? (
          filteredTransfers.map((transfer, index) => (
            <div
              key={transfer._id}
              className={`grid grid-cols-1 md:grid-cols-8 ${
                index < filteredTransfers.length - 1
                  ? "border-b border-gray-300"
                  : ""
              } gap-4 p-5 transition-colors duration-200 ${
                index % 2 !== 0 ? "bg-gray-100" : ""
              }`}
            >
              <div
                className="font-medium text-gray truncate"
                title={transfer._id}
              >
                {transfer._id.substring(0, 10)}...
              </div>

              <div className="text-gray font-medium capitalize truncate">
                {transfer.user?.fullName || "N/A"}
              </div>

              <div className="text-gray truncate">
                {transfer.recipient?.accountHolderName.substring(0, 16) ||
                  "N/A"}
                ...
              </div>

              <div className="font-medium gap-1 flex text-gray capitalize">
                {transfer.sendAmount}
              </div>

              <div className="font-medium gap-1 flex text-gray capitalize">
                {transfer.sendCurrency?.code}
              </div>

              <div>
                <div
                  className={`inline-flex items-center gap-1.5 w-32 px-3 font-medium py-1.5 rounded-md ${
                    statusConfig[transfer.status]?.class ||
                    "bg-gray-100 text-gray font-bold"
                  }`}
                >
                  {statusConfig[transfer.status]?.icon || <Clock size={20} />}
                  <span className="capitalize">{transfer.status}</span>
                </div>
              </div>

              <div className="text-gray font-medium truncate">
                {formatDate(transfer.createdAt)}
              </div>

              <div className="text-end">
                <Link
                  href={`/admin/transfer/${transfer._id}`}
                  className="inline-flex items-center group px-6 py-1.5 rounded-md space-x-1 text-secondary transition-colors duration-300 font-medium"
                >
                  <span>View Details</span>
                  <ChevronRight className="size-5 group-hover:translate-x-2 transition-transform ease-in-out duration-300" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center col-span-full">
            <p className="text-gray text-lg font-medium capitalize">
              No transfers found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferList;
