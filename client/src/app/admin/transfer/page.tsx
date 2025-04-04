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




// frontend/src/app/admin/transfers/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import apiConfig from '../../config/apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// Import components
import TransferTable from '../components/transfers/TransferTable';
import TransferFilters from '../components/transfers/TransferFilters';
import Pagination from '../components/Pagination'; // Import Pagination component

axios.defaults.baseURL = apiConfig.baseUrl;

interface Transfer {
    _id: string;
    user: {
        fullName?: string;
        email?: string;
    };
    sendAmount: string;
    sendCurrency?: {
        code?: string;
    };
    status: string;
    createdAt: string;
    recipient?: {
        accountHolderName?: string;
    }
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

    useEffect(() => {
        fetchTransfers();
    }, [token]);

    const fetchTransfers = async () => {
        setLoadingTransfers(true);
        setIsRefreshing(true); // Start refresh animation
        setError(null);
        setSuccessMessage(null);
        try {
            const response = await axios.get('/admin/transfers', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTransfers(response.data);
            setFilteredTransfers(response.data);
        } catch (err: any) { // Type err as any or Error
            setError(err.response?.data?.message || 'Failed to load transfers');
            console.error("Error fetching transfers:", err);
        } finally {
            setLoadingTransfers(false);
            setIsRefreshing(false); // Stop refresh animation
        }
    };

    // Apply filters when any filter changes
    useEffect(() => {
        let results: Transfer[] = [...transfers];

        // Apply search filter (user name and email, transfer ID)
        if (searchTerm) {
            results = results.filter(transfer =>
                transfer._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transfer.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transfer.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transfer.recipient?.accountHolderName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply Transfer ID filter
        if (transferIdFilter) {
            results = results.filter(transfer =>
                transfer._id.toLowerCase().includes(transferIdFilter.toLowerCase())
            );
        }

        // Apply Amount filter
        if (amountFilter) {
            const amount = parseFloat(amountFilter);
            results = results.filter(transfer => parseFloat(transfer.sendAmount) === amount);
        }

        // Apply Currency filter
        if (currencyFilter !== 'all') {
            results = results.filter(transfer => transfer.sendCurrency?.code === currencyFilter);
        }

        // Apply Recipient filter
        if (recipientFilter) {
            results = results.filter(transfer =>
                transfer.recipient?.accountHolderName?.toLowerCase().includes(recipientFilter.toLowerCase())
            );
        }


        // Apply status filter
        if (statusFilter !== 'all') {
            results = results.filter(transfer => transfer.status === statusFilter);
        }

        // Apply date range filter
        if (dateRange.from) {
            const fromDate = new Date(dateRange.from);
            fromDate.setHours(0, 0, 0, 0);

            results = results.filter(transfer => {
                const transferDate = new Date(transfer.createdAt);
                return transferDate >= fromDate;
            });
        }

        if (dateRange.to) {
            const toDate = new Date(dateRange.to);
            toDate.setHours(23, 59, 59, 999);

            results = results.filter(transfer => {
                const transferDate = new Date(transfer.createdAt);
                return transferDate <= toDate;
            });
        }

        // Apply sorting
        if (sortField) {
            results.sort((a, b) => {
                let valueA: any, valueB: any; // Type as any to handle different types

                // Handle nested properties and special cases
                if (sortField === 'user') {
                    valueA = a.user?.fullName || '';
                    valueB = b.user?.fullName || '';
                } else if (sortField === 'amount') {
                    valueA = parseFloat(a.sendAmount);
                    valueB = parseFloat(b.sendAmount);
                } else if (sortField === 'recipient') {
                    valueA = a.recipient?.accountHolderName || '';
                    valueB = b.recipient?.accountHolderName || '';
                }
                else {
                    valueA = a[sortField as keyof Transfer]; // Type assertion to Transfer key
                    valueB = b[sortField as keyof Transfer]; // Type assertion to Transfer key
                }

                if (typeof valueA === 'string') {
                    valueA = valueA.toLowerCase();
                    valueB = valueB.toLowerCase();
                }

                if (sortDirection === 'asc') {
                    return valueA > valueB ? 1 : -1;
                } else {
                    return valueA < valueB ? 1 : -1;
                }
            });
        }

        setFilteredTransfers(results);
        setCurrentPage(1); // Reset page to 1 when filters change
    }, [transfers, searchTerm, statusFilter, dateRange, sortField, sortDirection, transferIdFilter, amountFilter, currencyFilter, recipientFilter]);


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
    };

    const getStatusColor = (status: string) => {
        switch (status) {
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

    const currencyOptions = ['all', ...Array.from(new Set(transfers.map(p => p.sendCurrency?.code).filter(Boolean)))];
    const statusOptions: ('all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled')[] = ['all', 'pending', 'processing', 'completed', 'failed', 'canceled'];


    const refreshData = () => {
        fetchTransfers();
    };

    // Pagination logic
    const indexOfLastTransfer = currentPage * transfersPerPage;
    const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
    const currentTransfers = filteredTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer);

    const totalPages = Math.ceil(filteredTransfers.length / transfersPerPage);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const goToPreviousPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    const goToNextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);


    return (
        <div className="container mx-auto px-4 py-8 relative">
            <div className="space-y-6">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold text-mainheading dark:text-white">Transfer Management</h1>
                    <div className="flex gap-3 items-start">
                        {/* Transfer Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by User, Recipient or Email..."
                                className="w-xl rounded-full py-2 pl-12 pr-3 h-12.5 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
                            />
                            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        </div>
                        <button
                            onClick={() => setShowFilterModal(true)}
                            className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 h-12.5 rounded-3xl hover:bg-primaryhover transition-colors"
                        >
                            <Filter size={18} />
                            Filters
                        </button>
                        {/* Refresh Data Button */}
                        <button
                            onClick={refreshData}
                            disabled={isRefreshing}
                            className="flex items-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12.5 rounded-3xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    <X className="h-5 w-5 text-red-500" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                                <button
                                    onClick={() => setError(null)}
                                    className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-center mb-4">
                    {/* Show per page dropdown */}
                    <div>
                        <label htmlFor="transfersPerPage" className="mr-2 text-sm font-medium text-gray-600 dark:text-white">Show</label>
                        <select
                            id="transfersPerPage"
                            value={transfersPerPage}
                            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                            className="mt-1 block w-full pl-3 pr-10 py-2 focus:outline-none border sm:text-sm rounded-md  bg-lightgray dark:bg-[#2E2E2E] dark:text-white"
                        >
                            {pageSizeOptions.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-white">
                        Page {currentPage} of {totalPages}
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
                {/* Pagination Controls */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                    goToPreviousPage={goToPreviousPage}
                    goToNextPage={goToNextPage}
                />
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