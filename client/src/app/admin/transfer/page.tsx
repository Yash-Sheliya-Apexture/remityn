// // frontend/src/app/admin/transfers/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import TransferList from "../components/TransferList";
// import adminTransferService from "../../services/admin/transfer";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { ChevronDown, Filter, RefreshCw, AlertCircle } from "lucide-react";

// const AdminTransfersPage = () => {
//   const [transfers, setTransfers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter();
//   const [statusFilter, setStatusFilter] = useState<string>("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Status options with colors
//   const statusOptions = [
//     { value: "", label: "All Statuses", color: "bg-gray-500" },
//     { value: "pending", label: "Pending", color: "bg-yellow-500" },
//     { value: "processing", label: "Processing", color: "bg-blue-500" },
//     { value: "completed", label: "Completed", color: "bg-green-500" },
//     { value: "failed", label: "Failed", color: "bg-red-500" },
//     { value: "canceled", label: "Canceled", color: "bg-gray-500" },
//   ];

//   useEffect(() => {
//     if (loadingAuth) return;
//     if (!isAdmin) {
//       router.push("/dashboard");
//       return;
//     }

//     fetchTransfers();
//   }, [token, isAdmin, loadingAuth, router, statusFilter]);

//   const fetchTransfers = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const filters = statusFilter ? { status: statusFilter } : {};
//       const data = await adminTransferService.getAdminTransfers(token, filters);
//       setTransfers(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load transfers.");
//       console.error("Error fetching admin transfers:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStatusFilterChange = (value: string) => {
//     setStatusFilter(value);
//     setDropdownOpen(false);
//   };

//   const refreshData = () => {
//     fetchTransfers();
//   };

//   // Get current status label and color
//   const currentStatus =
//     statusOptions.find((option) => option.value === statusFilter) ||
//     statusOptions[0];

//   if (loadingAuth) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//         <div className="animate-pulse">
//           <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
//           <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>
//           <div className="h-12 bg-gray-200 rounded mb-6"></div>
//           <div className="space-y-3">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="h-20 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
//           <div className="flex items-center justify-center text-red-500 mb-4">
//             <AlertCircle size={48} />
//           </div>
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
//             Access Denied
//           </h2>
//           <p className="text-main text-center max-w-3xl">
//             You don't have permission to access this area. Please contact your
//             administrator if you believe this is a mistake.
//           </p>
//           <button
//             onClick={() => router.push("/dashboard")}
//             className="w-full mt-6 bg-primary text-white py-3 px-4 rounded-md font-medium transition-colors duration-300"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-8xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white rounded-xl shadow-md border p-6 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-main">
//                 Transfer Management
//               </h1>
//               <p className="text-gray text-lg mt-4 max-w-4xl">
//                 This page allows administrators to view, manage, and process
//                 transfer requests. Key features include filtering transfers by
//                 status (pending, approved, rejected), reviewing transaction
//                 details, and manually approving or canceling transfers.
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0">
//               {/* Refresh-Data */}
//               <button
//                 onClick={refreshData}
//                 className="flex items-center cursor-pointer gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md shadow-sm transition-all duration-200"
//               >
//                 <RefreshCw className="size-5"/>
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2 text-main">
//               <Filter size={18} />
//               <span className="font-medium">Filters</span>
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex cursor-pointer items-center justify-between w-48 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm transition-colors duration-300"
//               >
//                 <div className="flex items-center space-x-2">
//                   <span
//                     className={`size-3 rounded-full ${currentStatus.color}`}
//                   ></span>
//                   <span>{currentStatus.label}</span>
//                 </div>
//                 <ChevronDown
//                   size={20}
//                   className={`transition-transform duration-200 text-gray ${
//                     dropdownOpen ? "transform rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
//                   {statusOptions.map((option) => (
//                     <div
//                       key={option.value}
//                       onClick={() => handleStatusFilterChange(option.value)}
//                       className={`flex items-center space-x-2 px-4 py-3 hover:bg-sky-100 cursor-pointer transition-colors duration-200 ${
//                         statusFilter === option.value ? "bg-gray-100" : ""
//                       }`}
//                     >
//                       <span
//                         className={`w-3 h-3 rounded-full ${option.color}`}
//                       ></span>
//                       <span>{option.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
//               <div className="flex items-center">
//                 <AlertCircle size={20} className="text-red-500 mr-2" />
//                 <p className="text-red-700">{error}</p>
//               </div>
//             </div>
//           )}

//           {/* Transfers List Content */}
//           <div>
//             <TransferList transfers={transfers} isLoading={isLoading} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminTransfersPage;




// // frontend/src/app/admin/transfers/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import TransferList from "../components/TransferList";
// import adminTransferService from "../../services/admin/transfer";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { ChevronDown, Filter, RefreshCw, AlertCircle } from "lucide-react";

// const AdminTransfersPage = () => {
//   const [transfers, setTransfers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter();
//   const [statusFilter, setStatusFilter] = useState<string>("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false); // State for refresh animation

//   // Status options with colors
//   const statusOptions = [
//     { value: "", label: "All Statuses", color: "bg-gray-500" },
//     { value: "pending", label: "Pending", color: "bg-yellow-500" },
//     { value: "processing", label: "Processing", color: "bg-blue-500" },
//     { value: "completed", label: "Completed", color: "bg-green-500" },
//     { value: "failed", label: "Failed", color: "bg-red-500" },
//     { value: "canceled", label: "Canceled", color: "bg-gray-500" },
//   ];

//   useEffect(() => {
//     if (loadingAuth) return;
//     if (!isAdmin) {
//       router.push("/dashboard");
//       return;
//     }

//     fetchTransfers();
//   }, [token, isAdmin, loadingAuth, router, statusFilter]);

//   const fetchTransfers = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const filters = statusFilter ? { status: statusFilter } : {};
//       const data = await adminTransferService.getAdminTransfers(token, filters);
//       setTransfers(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load transfers.");
//       console.error("Error fetching admin transfers:", err);
//     } finally {
//       setIsLoading(false);
//       setIsRefreshing(false); // Stop refresh animation after data is fetched
//     }
//   };

//   const handleStatusFilterChange = (value: string) => {
//     setStatusFilter(value);
//     setDropdownOpen(false);
//   };

//   const refreshData = () => {
//     setIsRefreshing(true); // Start refresh animation
//     fetchTransfers();
//   };

//   // Get current status label and color
//   const currentStatus =
//     statusOptions.find((option) => option.value === statusFilter) ||
//     statusOptions[0];

//   if (loadingAuth) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//         <div className="animate-pulse">
//           <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
//           <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>
//           <div className="h-12 bg-gray-200 rounded mb-6"></div>
//           <div className="space-y-3">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="h-20 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
//           <div className="flex items-center justify-center text-red-500 mb-4">
//             <AlertCircle size={48} />
//           </div>
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
//             Access Denied
//           </h2>
//           <p className="text-main text-center max-w-3xl">
//             You don't have permission to access this area. Please contact your
//             administrator if you believe this is a mistake.
//           </p>
//           <button
//             onClick={() => router.push("/dashboard")}
//             className="w-full mt-6 bg-primary text-white py-3 px-4 rounded-md font-medium transition-colors duration-300"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-8xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white rounded-xl shadow-sm border p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-2xl font-medium text-main">
//                 Transfer Management
//               </h1>
//             </div>
//             <div className="mt-4 md:mt-0">
//               {/* Refresh-Data */}
//               <button
//                 onClick={refreshData}
//                 disabled={isRefreshing} // Disable button during refresh
//                 className="flex items-center cursor-pointer gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <RefreshCw
//                   className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//                 />
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
//             <div className="flex items-center">
//               <AlertCircle size={20} className="text-red-500 mr-2" />
//               <p className="text-red-700">{error}</p>
//             </div>
//           </div>
//         )}
//         {/* Transfers List Content */}
//       </div>
//       <TransferList transfers={transfers} isLoading={isLoading} />
//     </div>
//   );
// };

// export default AdminTransfersPage;




// // frontend/src/app/admin/transfers/page.tsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import TransferTable from '../components/transfers/TransferTable';
// import TransferFilters from '../components/transfers/TransferFilters';
// import Pagination from '../components/Pagination'; // Import Pagination component

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Transfer {
//     _id: string;
//     user: {
//         fullName?: string;
//         email?: string;
//     };
//     sendAmount: string;
//     sendCurrency?: {
//         code?: string;
//     };
//     status: string;
//     createdAt: string;
//     recipient?: {
//         accountHolderName?: string;
//     }
//     // Add other properties as needed based on your Transfer object structure
// }


// const AdminTransfersPage: React.FC = () => {
//     const { token } = useAuth();
//     const [transfers, setTransfers] = useState<Transfer[]>([]);
//     const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
//     const [loadingTransfers, setLoadingTransfers] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // State for refresh animation

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled'>('all');
//     const [transferIdFilter, setTransferIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');
//     const [recipientFilter, setRecipientFilter] = useState<string>('');

//     // Sorting
//     const [sortField, setSortField] = useState<string | null>(null);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [transfersPerPage, setTransfersPerPage] = useState<number>(10); // Default to 10 per page
//     const pageSizeOptions: number[] = [10, 25, 50]; // Options for transfers per page

//     // Update transfers per page and reset to first page
//     const handlePageSizeChange = (size: number) => {
//         setTransfersPerPage(size);
//         setCurrentPage(1); // Reset to the first page when page size changes
//     };

//     useEffect(() => {
//         fetchTransfers();
//     }, [token]);

//     const fetchTransfers = async () => {
//         setLoadingTransfers(true);
//         setIsRefreshing(true); // Start refresh animation
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             const response = await axios.get('/admin/transfers', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTransfers(response.data);
//             setFilteredTransfers(response.data);
//         } catch (err: any) { // Type err as any or Error
//             setError(err.response?.data?.message || 'Failed to load transfers');
//             console.error("Error fetching transfers:", err);
//         } finally {
//             setLoadingTransfers(false);
//             setIsRefreshing(false); // Stop refresh animation
//         }
//     };

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results: Transfer[] = [...transfers];

//         // Apply search filter (user name and email, transfer ID)
//         if (searchTerm) {
//             results = results.filter(transfer =>
//                 transfer._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 transfer.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 transfer.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 transfer.recipient?.accountHolderName?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply Transfer ID filter
//         if (transferIdFilter) {
//             results = results.filter(transfer =>
//                 transfer._id.toLowerCase().includes(transferIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             results = results.filter(transfer => parseFloat(transfer.sendAmount) === amount);
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(transfer => transfer.sendCurrency?.code === currencyFilter);
//         }

//         // Apply Recipient filter
//         if (recipientFilter) {
//             results = results.filter(transfer =>
//                 transfer.recipient?.accountHolderName?.toLowerCase().includes(recipientFilter.toLowerCase())
//             );
//         }


//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(transfer => transfer.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(transfer => {
//                 const transferDate = new Date(transfer.createdAt);
//                 return transferDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(transfer => {
//                 const transferDate = new Date(transfer.createdAt);
//                 return transferDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA: any, valueB: any; // Type as any to handle different types

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.sendAmount);
//                     valueB = parseFloat(b.sendAmount);
//                 } else if (sortField === 'recipient') {
//                     valueA = a.recipient?.accountHolderName || '';
//                     valueB = b.recipient?.accountHolderName || '';
//                 }
//                 else {
//                     valueA = a[sortField as keyof Transfer]; // Type assertion to Transfer key
//                     valueB = b[sortField as keyof Transfer]; // Type assertion to Transfer key
//                 }

//                 if (typeof valueA === 'string') {
//                     valueA = valueA.toLowerCase();
//                     valueB = valueB.toLowerCase();
//                 }

//                 if (sortDirection === 'asc') {
//                     return valueA > valueB ? 1 : -1;
//                 } else {
//                     return valueA < valueB ? 1 : -1;
//                 }
//             });
//         }

//         setFilteredTransfers(results);
//         setCurrentPage(1); // Reset page to 1 when filters change
//     }, [transfers, searchTerm, statusFilter, dateRange, sortField, sortDirection, transferIdFilter, amountFilter, currencyFilter, recipientFilter]);


//     const toggleSort = (field: string) => {
//         if (sortField === field) {
//             setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortField(field);
//             setSortDirection('asc');
//         }
//     };

//     const clearFilters = () => {
//         setSearchTerm('');
//         setDateRange({ from: null, to: null });
//         setStatusFilter('all');
//         setTransferIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//         setRecipientFilter('');
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-600 bg-green-600/20 ';
//             case 'pending':
//                 return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'processing':
//                 return 'text-blue-600 bg-blue-600/20 ';
//             case 'failed':
//                 return 'text-rose-600 bg-rose-600/20 ';
//             case 'canceled':
//                 return 'text-red-600 bg-red-600/20 ';
//             default:
//                 return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     const currencyOptions = ['all', ...Array.from(new Set(transfers.map(p => p.sendCurrency?.code).filter(Boolean)))];
//     const statusOptions: ('all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled')[] = ['all', 'pending', 'processing', 'completed', 'failed', 'canceled'];


//     const refreshData = () => {
//         fetchTransfers();
//     };

//     // Pagination logic
//     const indexOfLastTransfer = currentPage * transfersPerPage;
//     const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
//     const currentTransfers = filteredTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer);

//     const totalPages = Math.ceil(filteredTransfers.length / transfersPerPage);
//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
//     const goToPreviousPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
//     const goToNextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);


//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 <div className="flex justify-between">
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Transfer Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Transfer Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User, Recipient or Email..."
//                                 className="w-xl rounded-full py-2 pl-12 pr-3 h-12.5 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <button
//                             onClick={() => setShowFilterModal(true)}
//                             className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 h-12.5 rounded-3xl hover:bg-primaryhover transition-colors"
//                         >
//                             <Filter size={18} />
//                             Filters
//                         </button>
//                         {/* Refresh Data Button */}
//                         <button
//                             onClick={refreshData}
//                             disabled={isRefreshing}
//                             className="flex items-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12.5 rounded-3xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             <RefreshCw
//                                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//                             />
//                             <span>Refresh</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Success Message */}
//                 <AnimatePresence>
//                     {successMessage && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow"
//                         >
//                             <div className="flex items-start">
//                                 <div className="flex-shrink-0">
//                                     <Check className="h-5 w-5 text-green-500" />
//                                 </div>
//                                 <div className="ml-3">
//                                     <p className="text-sm text-green-700">{successMessage}</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setSuccessMessage(null)}
//                                     className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Error Message */}
//                 <AnimatePresence>
//                     {error && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow"
//                         >
//                             <div className="flex items-start">
//                                 <div className="flex-shrink-0">
//                                     <X className="h-5 w-5 text-red-500" />
//                                 </div>
//                                 <div className="ml-3">
//                                     <p className="text-sm text-red-700">{error}</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setError(null)}
//                                     className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 <div className="flex justify-between items-center mb-4">
//                     {/* Show per page dropdown */}
//                     <div>
//                         <label htmlFor="transfersPerPage" className="mr-2 text-sm font-medium text-gray-600 dark:text-white">Show</label>
//                         <select
//                             id="transfersPerPage"
//                             value={transfersPerPage}
//                             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                             className="mt-1 block w-full pl-3 pr-10 py-2 focus:outline-none border sm:text-sm rounded-md  bg-lightgray dark:bg-[#2E2E2E] dark:text-white"
//                         >
//                             {pageSizeOptions.map(size => (
//                                 <option key={size} value={size}>{size}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-white">
//                         Page {currentPage} of {totalPages}
//                     </p>
//                 </div>

//                 {/* Transfers Table */}
//                 <TransferTable
//                     filteredTransfers={currentTransfers} // Use currentTransfers for pagination
//                     loadingTransfers={loadingTransfers}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                 />
//                 {/* Pagination Controls */}
//                 <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     paginate={paginate}
//                     goToPreviousPage={goToPreviousPage}
//                     goToNextPage={goToNextPage}
//                 />
//             </div>

//             {/* Filter Sidebar */}
//             <TransferFilters
//                 showFilterModal={showFilterModal}
//                 setShowFilterModal={setShowFilterModal}
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 dateRange={dateRange}
//                 setDateRange={setDateRange}
//                 statusFilter={statusFilter}
//                 setStatusFilter={setStatusFilter}
//                 currencyFilter={currencyFilter}
//                 setCurrencyFilter={setCurrencyFilter}
//                 transferIdFilter={transferIdFilter}
//                 setTransferIdFilter={setTransferIdFilter}
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter}
//                 currencyOptions={currencyOptions}
//                 statusOptions={statusOptions}
//                 clearFilters={clearFilters}
//                 recipientFilter={recipientFilter}
//                 setRecipientFilter={setRecipientFilter}
//             />
//         </div >
//     );
// };

// export default AdminTransfersPage;



// frontend/src/app/admin/transfers/page.tsx
'use client';
import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { useAuth } from '../../hooks/useAuth';
import axios, { AxiosError } from 'axios'; // Import AxiosError for type checking
import apiConfig from '../../config/apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// Import components
import TransferTable from '../components/transfers/TransferTable';
import TransferFilters from '../components/transfers/TransferFilters';
import Pagination from '../components/Pagination'; // Import Pagination component

axios.defaults.baseURL = apiConfig.baseUrl;

interface TransferUser {
    fullName?: string;
    email?: string;
}

interface TransferCurrency {
    code?: string;
}

interface TransferRecipient {
    accountHolderName?: string;
}
interface Transfer {
    _id: string;
    user: TransferUser;
    sendAmount: string; // Keep as string if API returns string, parse for calcs/sorting
    sendCurrency?: TransferCurrency;
    status: string;
    createdAt: string; // ISO date string
    recipient?: TransferRecipient;
    // Add other properties as needed based on your Transfer object structure
}


const AdminTransfersPage: React.FC = () => {
    const { token } = useAuth();
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
    const [loadingTransfers, setLoadingTransfers] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // State for refresh animation

    // Filter state
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled'>('all');
    const [transferIdFilter, setTransferIdFilter] = useState<string>('');
    const [amountFilter, setAmountFilter] = useState<string>('');
    const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');
    const [recipientFilter, setRecipientFilter] = useState<string>('');

    // Sorting
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Pagination State
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [transfersPerPage, setTransfersPerPage] = useState<number>(10); // Default to 10 per page
    const pageSizeOptions: number[] = [10, 25, 50]; // Options for transfers per page

    // Update transfers per page and reset to first page
    const handlePageSizeChange = (size: number) => {
        setTransfersPerPage(size);
        setCurrentPage(1); // Reset to the first page when page size changes
    };

    // --- Start of Fixes ---

    // 1. Wrap fetchTransfers in useCallback
    const fetchTransfers = useCallback(async () => {
        setLoadingTransfers(true);
        setIsRefreshing(true); // Start refresh animation
        setError(null);
        // Clear success message on new fetch? Optional, depends on desired UX
        // setSuccessMessage(null);
        try {
            const response = await axios.get<{ data: Transfer[] }>('/admin/transfers', { // Add response type if known
                headers: { Authorization: `Bearer ${token}` },
            });
            // Adjust based on actual API response structure if needed
            const fetchedData = response.data.data || response.data;
            setTransfers(fetchedData);
            // Initially, filtered transfers are the same as all transfers
            // This will be updated by the filter useEffect below
            // setFilteredTransfers(fetchedData); // Let the filter effect handle this
        } catch (err: unknown) { // 2. Change 'any' to 'unknown'
            // 3. Type check the error before accessing properties
            let message = 'Failed to load transfers'; // Default message
            if (axios.isAxiosError(err)) {
                // Access Axios-specific properties safely
                message = err.response?.data?.message || err.message || 'An unexpected error occurred.';
            } else if (err instanceof Error) {
                // Standard JavaScript error
                message = err.message;
            } else if (typeof err === 'string') {
                message = err;
            }
            setError(message);
            console.error("Error fetching transfers:", err);
        } finally {
            setLoadingTransfers(false);
            setIsRefreshing(false); // Stop refresh animation
        }
    // Add stable setters to dependencies (optional but recommended by some linters)
    }, [token, setLoadingTransfers, setIsRefreshing, setError, setTransfers]);


    useEffect(() => {
        if (token) { // Ensure token exists before fetching
             fetchTransfers();
        }
    // 4. Add fetchTransfers to dependency array
    }, [token, fetchTransfers]);

    // --- End of Fixes for useEffect dependency ---

    // Apply filters and sorting when dependencies change
    useEffect(() => {
        let results: Transfer[] = [...transfers]; // Start with the original full list

        // Apply search filter (user name and email, transfer ID, recipient)
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            results = results.filter(transfer =>
                transfer._id.toLowerCase().includes(lowerSearchTerm) ||
                transfer.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
                transfer.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
                transfer.recipient?.accountHolderName?.toLowerCase().includes(lowerSearchTerm)
            );
        }

        // Apply Transfer ID filter
        if (transferIdFilter) {
            const lowerTransferIdFilter = transferIdFilter.toLowerCase();
            results = results.filter(transfer =>
                transfer._id.toLowerCase().includes(lowerTransferIdFilter)
            );
        }

        // Apply Amount filter
        if (amountFilter) {
            // Use parseFloat for comparison, handle potential NaN
            const amount = parseFloat(amountFilter);
            if (!isNaN(amount)) {
                results = results.filter(transfer => parseFloat(transfer.sendAmount) === amount);
            }
        }

        // Apply Currency filter
        if (currencyFilter !== 'all') {
            results = results.filter(transfer => transfer.sendCurrency?.code === currencyFilter);
        }

        // Apply Recipient filter
        if (recipientFilter) {
            const lowerRecipientFilter = recipientFilter.toLowerCase();
            results = results.filter(transfer =>
                transfer.recipient?.accountHolderName?.toLowerCase().includes(lowerRecipientFilter)
            );
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            results = results.filter(transfer => transfer.status === statusFilter);
        }

        // Apply date range filter
        if (dateRange.from) {
            const fromDate = new Date(dateRange.from);
            fromDate.setHours(0, 0, 0, 0); // Start of the day

            results = results.filter(transfer => {
                const transferDate = new Date(transfer.createdAt);
                return !isNaN(transferDate.getTime()) && transferDate >= fromDate; // Check for valid date
            });
        }

        if (dateRange.to) {
            const toDate = new Date(dateRange.to);
            toDate.setHours(23, 59, 59, 999); // End of the day

            results = results.filter(transfer => {
                const transferDate = new Date(transfer.createdAt);
                return !isNaN(transferDate.getTime()) && transferDate <= toDate; // Check for valid date
            });
        }

        // Apply sorting
        if (sortField) {
            results.sort((a, b) => {
                // --- Start of Fixes for sorting ---
                // 5. Define value types more specifically than 'any'
                let valueA: string | number | Date | undefined;
                let valueB: string | number | Date | undefined;

                // Extract values based on sortField
                switch (sortField) {
                    case 'user':
                        valueA = a.user?.fullName?.toLowerCase() ?? ''; // Use nullish coalescing for safety
                        valueB = b.user?.fullName?.toLowerCase() ?? '';
                        break;
                    case 'amount':
                        valueA = parseFloat(a.sendAmount); // Parse to number for comparison
                        valueB = parseFloat(b.sendAmount);
                        // Handle potential NaN values during comparison below
                        break;
                    case 'recipient':
                        valueA = a.recipient?.accountHolderName?.toLowerCase() ?? '';
                        valueB = b.recipient?.accountHolderName?.toLowerCase() ?? '';
                        break;
                    case 'createdAt':
                        valueA = new Date(a.createdAt); // Compare as Date objects
                        valueB = new Date(b.createdAt);
                        // Handle potential invalid dates during comparison below
                        break;
                    case 'status':
                         valueA = a.status.toLowerCase(); // Ensure case-insensitive sort for status
                         valueB = b.status.toLowerCase();
                         break;
                    case '_id': // Example if sorting by ID
                         valueA = a._id;
                         valueB = b._id;
                         break;
                    // Add other sortable fields if necessary
                    default:
                        // Attempt direct access, assuming string or comparable type
                        // This might need refinement based on actual Transfer properties
                        try {
                             const key = sortField as keyof Transfer;
                             // Ensure values are comparable (e.g., convert to string if mixed types)
                             valueA = (a[key] as any)?.toString().toLowerCase() ?? '';
                             valueB = (b[key] as any)?.toString().toLowerCase() ?? '';
                        } catch (e) {
                             console.error("Error accessing sort key:", sortField, e);
                             valueA = '';
                             valueB = '';
                        }
                        break;
                }
                // --- End of Fixes for sorting 'any' ---

                // Comparison Logic - Handle different types
                let comparison = 0;

                // Handle Date comparison
                if (valueA instanceof Date && valueB instanceof Date) {
                    const timeA = !isNaN(valueA.getTime()) ? valueA.getTime() : -Infinity;
                    const timeB = !isNaN(valueB.getTime()) ? valueB.getTime() : -Infinity;
                    comparison = timeA - timeB;
                }
                // Handle Number comparison (including NaN)
                else if (typeof valueA === 'number' && typeof valueB === 'number') {
                    const numA = isNaN(valueA) ? -Infinity : valueA; // Treat NaN as lowest value
                    const numB = isNaN(valueB) ? -Infinity : valueB;
                    comparison = numA - numB;
                }
                // Handle String comparison (case-insensitive)
                else {
                    // Convert potentially undefined/null values to empty strings for safe comparison
                    const strA = String(valueA ?? '').toLowerCase();
                    const strB = String(valueB ?? '').toLowerCase();
                    comparison = strA.localeCompare(strB); // Use localeCompare for better string sorting
                }

                // Apply direction
                return sortDirection === 'asc' ? comparison : -comparison;
            });
        }

        setFilteredTransfers(results);
        // Reset page to 1 only if filters/sorting change *after* the initial load
        // This prevents resetting unnecessarily when `transfers` initially populates
        if (transfers.length > 0) { // Basic check to see if it's not the initial empty state
            setCurrentPage(1);
        }
    }, [transfers, searchTerm, statusFilter, dateRange, sortField, sortDirection, transferIdFilter, amountFilter, currencyFilter, recipientFilter]); // Keep all relevant dependencies


    const toggleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setDateRange({ from: null, to: null });
        setStatusFilter('all');
        setTransferIdFilter('');
        setAmountFilter('');
        setCurrencyFilter('all');
        setRecipientFilter('');
        // Optionally reset sorting
        // setSortField(null);
        // setSortDirection('asc');
        setCurrentPage(1); // Reset page when clearing filters
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) { // Added toLowerCase for safety
            case 'completed':
                return 'text-green-600 bg-green-600/20 ';
            case 'pending':
                return 'text-yellow-600 bg-yellow-600/20 ';
            case 'processing':
                return 'text-blue-600 bg-blue-600/20 ';
            case 'failed':
                return 'text-rose-600 bg-rose-600/20 ';
            case 'canceled':
                return 'text-red-600 bg-red-600/20 ';
            default:
                return 'text-gray-600 bg-gray-600/20 ';
        }
    };

    // Memoize calculation of options to prevent re-computation on every render
    const currencyOptions = React.useMemo(() => {
        const codes = new Set(transfers.map(p => p.sendCurrency?.code).filter((code): code is string => Boolean(code)));
        return ['all', ...Array.from(codes)];
    }, [transfers]);

    const statusOptions: ('all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled')[] = ['all', 'pending', 'processing', 'completed', 'failed', 'canceled'];


    const refreshData = () => {
        // fetchTransfers is already memoized, just call it
        fetchTransfers();
    };

    // Pagination logic
    const indexOfLastTransfer = currentPage * transfersPerPage;
    const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
    // Ensure currentTransfers calculation happens *after* filtering/sorting
    const currentTransfers = filteredTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer);

    const totalPages = Math.ceil(filteredTransfers.length / transfersPerPage);
    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
             setCurrentPage(pageNumber);
        }
    };
    const goToPreviousPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    const goToNextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);


    return (
        <div className="container mx-auto px-4 py-8 relative">
            <div className="space-y-6">
                <div className="flex flex-wrap justify-between items-center gap-4"> {/* Added flex-wrap and items-center */}
                    <h1 className="text-2xl font-bold text-mainheading dark:text-white">Transfer Management</h1>
                    <div className="flex flex-wrap gap-3 items-center"> {/* Added flex-wrap and items-center */}
                        {/* Transfer Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by User, Recipient or Email..."
                                className="w-full sm:w-64 md:w-xl rounded-full py-2 pl-12 pr-3 h-12.5 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white" // Adjusted width classes
                            />
                            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        </div>
                        <button
                            onClick={() => setShowFilterModal(true)}
                            className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 h-12.5 rounded-3xl hover:bg-primaryhover transition-colors whitespace-nowrap" // Added whitespace-nowrap
                        >
                            <Filter size={18} />
                            Filters
                        </button>
                        {/* Refresh Data Button */}
                        <button
                            onClick={refreshData}
                            disabled={isRefreshing || loadingTransfers} // Disable while loading or refreshing
                            className="flex items-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12.5 rounded-3xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap" // Added whitespace-nowrap
                        >
                            <RefreshCw
                                className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
                            />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Success Message */}
                <AnimatePresence>
                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow"
                        >
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Check className="h-5 w-5 text-green-500" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-green-700">{successMessage}</p>
                                </div>
                                <button
                                    onClick={() => setSuccessMessage(null)}
                                    className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700"
                                    aria-label="Dismiss success message" // Added aria-label
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow"
                        >
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                     {/* Using X for error indication */}
                                    <X className="h-5 w-5 text-red-500" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                                <button
                                    onClick={() => setError(null)}
                                    className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
                                    aria-label="Dismiss error message" // Added aria-label
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-wrap justify-between items-center mb-4 gap-4"> {/* Added flex-wrap and gap */}
                    {/* Show per page dropdown */}
                    <div className="flex items-center gap-2"> {/* Group label and select */}
                        <label htmlFor="transfersPerPage" className="text-sm font-medium text-gray-600 dark:text-white whitespace-nowrap">Show per page:</label>
                        <select
                            id="transfersPerPage"
                            value={transfersPerPage}
                            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                            className="block w-auto pl-3 pr-10 py-2 border focus:outline-none sm:text-sm rounded-md bg-lightgray dark:bg-[#2E2E2E] dark:text-white dark:border-gray-600" // Removed w-full, adjusted padding/border
                        >
                            {pageSizeOptions.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-white">
                        {/* Display range of items shown */}
                        Showing {filteredTransfers.length > 0 ? indexOfFirstTransfer + 1 : 0}-{Math.min(indexOfLastTransfer, filteredTransfers.length)} of {filteredTransfers.length} results
                         {/* Display page info only if there are pages */}
                         {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
                    </p>
                </div>

                {/* Transfers Table */}
                <TransferTable
                    filteredTransfers={currentTransfers} // Use currentTransfers for pagination
                    loadingTransfers={loadingTransfers}
                    getStatusColor={getStatusColor}
                    toggleSort={toggleSort}
                    sortField={sortField}
                    sortDirection={sortDirection}
                />
                {/* Pagination Controls - Only show if more than one page */}
                 {totalPages > 1 && (
                     <Pagination
                         currentPage={currentPage}
                         totalPages={totalPages}
                         paginate={paginate}
                         goToPreviousPage={goToPreviousPage}
                         goToNextPage={goToNextPage}
                     />
                 )}
            </div>

            {/* Filter Sidebar */}
            <TransferFilters
                showFilterModal={showFilterModal}
                setShowFilterModal={setShowFilterModal}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                dateRange={dateRange}
                setDateRange={setDateRange}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                currencyFilter={currencyFilter}
                setCurrencyFilter={setCurrencyFilter}
                transferIdFilter={transferIdFilter}
                setTransferIdFilter={setTransferIdFilter}
                amountFilter={amountFilter}
                setAmountFilter={setAmountFilter}
                currencyOptions={currencyOptions}
                statusOptions={statusOptions}
                clearFilters={clearFilters}
                recipientFilter={recipientFilter}
                setRecipientFilter={setRecipientFilter}
            />
        </div >
    );
};

export default AdminTransfersPage;