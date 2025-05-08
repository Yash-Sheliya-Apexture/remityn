// // frontend/src/app/admin/activity/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from 'react';
// import { User, CreditCard, Send, FileText, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
// import activityAdminService, { ActivityItem, ActivityPagination } from '../../services/admin/activity.admin'; // Adjust path
// import moment from 'moment';

// const getActivityIcon = (type: ActivityItem['type'], size = "h-5 w-5") => {
//     switch (type) {
//         case 'NEW_USER': return <User className={`${size} text-blue-500`} />;
//         case 'NEW_PAYMENT': return <CreditCard className={`${size} text-green-500`} />;
//         case 'NEW_TRANSFER': return <Send className={`${size} text-purple-500`} />;
//         case 'KYC_PENDING': return <FileText className={`${size} text-yellow-500`} />;
//         default: return <User className={`${size} text-gray-400`} />;
//     }
// };

// const ITEMS_PER_PAGE = 15; // Or make this configurable

// export default function AllRecentActivityPage() {
//     const [activities, setActivities] = useState<ActivityItem[]>([]);
//     const [pagination, setPagination] = useState<ActivityPagination | null>(null);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     const fetchActivities = useCallback(async (page: number) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await activityAdminService.getRecentActivities(ITEMS_PER_PAGE, page);
//             setActivities(response.data || []);
//             setPagination(response.pagination || null);
//         } catch (err: any) {
//             setError(err.message || "Failed to load activities.");
//             setActivities([]);
//             setPagination(null);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchActivities(currentPage);
//     }, [currentPage, fetchActivities]);

//     const handleNextPage = () => {
//         if (pagination && currentPage < pagination.totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };


//     return (
//         <section className="Admin-AllActivity py-3">
//             <div className="container mx-auto px-4">
//                 {loading && (
//                     <div className="space-y-4 mt-6 animate-pulse">
//                          {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
//                             <div key={i} className="flex items-center bg-white dark:bg-white/5 p-4 rounded-lg shadow-sm">
//                                 <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"></div>
//                                 <div className="flex-grow">
//                                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                                     <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//                                 </div>
//                                 <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {error && !loading && (
//                      <div className="mt-6 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative" role="alert">
//                         <div className="flex items-center"><AlertCircle className="h-5 w-5 mr-2"/> <span className="block sm:inline">{error}</span></div>
//                     </div>
//                 )}

//                 {!loading && !error && activities.length === 0 && (
//                     <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No activities found.</p>
//                 )}

//                 {!loading && !error && activities.length > 0 && (
//                     <div className="mt-6 space-y-3">
//                         {activities.map(activity => (
//                             <div key={activity.itemId + activity.timestamp} className="flex items-center bg-white dark:bg-white/5 p-3 sm:p-4 rounded-lg shadow-sm border dark:border-gray-700/50">
//                                 <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 dark:bg-gray-700/50 flex-shrink-0 flex items-center justify-center mr-3 sm:mr-4">
//                                     {getActivityIcon(activity.type, "h-4 w-4 sm:h-5 sm:w-5")}
//                                 </div>
//                                 <div className="flex-grow">
//                                     <p className="text-sm text-neutral-800 dark:text-neutral-100 leading-snug">
//                                         {activity.message}
//                                     </p>
//                                 </div>
//                                 <p className="text-xs text-gray-500 dark:text-gray-400 ml-2 sm:ml-4 whitespace-nowrap flex-shrink-0">
//                                     {moment(activity.timestamp).format('MMM D, h:mm A')}
//                                     <span className="hidden sm:inline"> ({moment(activity.timestamp).fromNow()})</span>
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* Pagination Controls */}
//                 {pagination && pagination.totalPages > 1 && !loading && !error && (
//                     <div className="mt-8 flex justify-between items-center">
//                         <button
//                             onClick={handlePreviousPage}
//                             disabled={currentPage === 1}
//                             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
//                         >
//                             <ChevronLeft className="inline h-4 w-4 mr-1" /> Previous
//                         </button>
//                         <span className="text-sm text-gray-700 dark:text-gray-300">
//                             Page {pagination.page} of {pagination.totalPages}
//                         </span>
//                         <button
//                             onClick={handleNextPage}
//                             disabled={currentPage === pagination.totalPages}
//                             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
//                         >
//                             Next <ChevronRight className="inline h-4 w-4 ml-1" />
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

// frontend/src/app/admin/activity/page.tsx
'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Adjust path if needed
import axios, { AxiosError } from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path if needed
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    CreditCard,
    Send,
    FileText,
    AlertCircle,
    Filter,
    RefreshCw,
    ArrowDownUp,
    X
} from 'lucide-react';
import moment from 'moment';

// Import Components
import GenericFilters, { FiltersState } from '../components/GenericFilters'; // Adjust path
import Pagination from '../components/Pagination'; // Adjust path
import { Skeleton } from '@/components/ui/skeleton'; // Assuming you have shadcn Skeleton

// Import Types
import activityAdminService, { ActivityItem, RecentActivityApiResponse, RecentActivitySuccessResponse } from '../../services/admin/activity.admin'; // Adjust path

// Define possible sort fields for activities
type ActivitySortField = 'timestamp' | 'type' | 'message';

// Define a type for API error responses if known
interface ApiErrorResponse {
    message: string;
}

// --- Helper function to parse date string (dd-MM-yyyy) to Date object ---
// (Keep the parseDateString function as defined in the previous step)
function parseDateString(dateString: string): Date | null {
     if (!dateString) return null;
     const parts = dateString.split('-');
     if (parts.length === 3) {
         if (!/^\d+$/.test(parts[0]) || !/^\d+$/.test(parts[1]) || !/^\d+$/.test(parts[2])) {
             console.warn("Invalid date parts:", parts);
             return null;
         }
         const day = parseInt(parts[0], 10);
         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
         const year = parseInt(parts[2], 10);
         if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 3000) {
             console.warn("Date components out of range:", { day, month, year });
             return null;
         }
         const date = new Date(Date.UTC(year, month, day));
         if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) {
             return date;
         } else {
             console.warn("Date validation failed after construction:", dateString);
             return null;
         }
     }
     console.warn("Could not parse date string (expected dd-MM-yyyy):", dateString);
     return null;
}

// Helper to get an icon based on activity type
const getActivityIcon = (type: ActivityItem['type'], size = "h-5 w-5") => {
    switch (type) {
        case 'NEW_USER': return <User className={`${size} text-blue-500`} />;
        case 'NEW_PAYMENT': return <CreditCard className={`${size} text-green-500`} />;
        case 'NEW_TRANSFER': return <Send className={`${size} text-purple-500`} />;
        case 'KYC_PENDING': return <FileText className={`${size} text-yellow-500`} />;
        default: return <User className={`${size} text-gray-400`} />; // Default icon
    }
};

// const ITEMS_PER_PAGE = 15; // Default items per page - Now managed by state

export default function AllRecentActivityPage() {
    // --- Core States ---
    const [allActivities, setAllActivities] = useState<ActivityItem[]>([]); // Holds originally fetched data for the current page
    const [filteredActivities, setFilteredActivities] = useState<ActivityItem[]>([]); // Holds data after client-side filtering/sorting
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    // --- Filter States ---
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [itemIdFilter, setItemIdFilter] = useState<string>('');

    // --- Sorting State ---
    const [sortField, setSortField] = useState<ActivitySortField | null>('timestamp');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    // --- VVVV NEW STATE FOR PAGE SIZE VVVV ---
    const [activitiesPerPage, setActivitiesPerPage] = useState<number>(10); // Default page size
    const pageSizeOptions: number[] = [10, 25, 50, 100]; // Page size options
    // --- ^^^^ NEW STATE FOR PAGE SIZE ^^^^ ---

    // --- Fetching Data ---
    const fetchActivities = useCallback(async (page: number, limit: number) => { // <-- Accept limit
        if (!token) {
            setError("Authentication required.");
            setLoading(false);
            return;
        }
        setLoading(true);
        setIsRefreshing(true);
        setError(null);
        try {
            // Fetch data using the current page and limit (activitiesPerPage)
            const response = await activityAdminService.getRecentActivities(limit, page); // <-- Use limit
            setAllActivities(response.data || []);
            setFilteredActivities(response.data || []);
            setTotalPages(response.pagination?.totalPages ?? 1);
            // IMPORTANT: The backend 'totalItems' count is likely based on *its* limit before merging.
            // A more accurate total requires client-side counting after filtering if filters are applied.
            // We'll use the length of the filtered list for display purposes.
            setTotalItems(response.pagination?.totalItems ?? (response.data?.length || 0)); // Use backend total for now
            setCurrentPage(response.pagination?.page ?? 1);

        } catch (err: unknown) {
            let errorMessage = 'Failed to load activities';
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<ApiErrorResponse>;
                errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            setAllActivities([]);
            setFilteredActivities([]);
            console.error("Error fetching activities:", err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    // --- VVVV Include activitiesPerPage in dependency array VVVV ---
    }, [token, activitiesPerPage]);
    // --- ^^^^ Include activitiesPerPage in dependency array ^^^^ ---


    // Fetch data when page or page size changes
    useEffect(() => {
        fetchActivities(currentPage, activitiesPerPage);
    }, [currentPage, activitiesPerPage, fetchActivities]);

    // --- Client-Side Filtering Logic ---
    useEffect(() => {
        let results = [...allActivities];

        // Apply filters... (Filtering logic remains the same)
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            results = results.filter(activity =>
                activity.message?.toLowerCase().includes(lowerSearchTerm) ||
                activity.itemId?.toLowerCase().includes(lowerSearchTerm) ||
                activity.user?.name?.toLowerCase().includes(lowerSearchTerm)
            );
        }
        if (itemIdFilter) {
             results = results.filter(activity =>
                 activity.itemId?.toLowerCase().includes(itemIdFilter.toLowerCase())
             );
        }
        if (typeFilter !== 'all') {
            results = results.filter(activity => activity.type.toLowerCase() === typeFilter.toLowerCase());
        }
        const fromDateObj = parseDateString(fromDate);
        const toDateObj = parseDateString(toDate);
        if (fromDateObj) {
             fromDateObj.setUTCHours(0, 0, 0, 0);
             results = results.filter(activity => {
                 try {
                     const activityDate = new Date(activity.timestamp);
                     return !isNaN(activityDate.getTime()) && activityDate >= fromDateObj;
                 } catch { return false; }
             });
         }
         if (toDateObj) {
             toDateObj.setUTCHours(23, 59, 59, 999);
             results = results.filter(activity => {
                 try {
                     const activityDate = new Date(activity.timestamp);
                     return !isNaN(activityDate.getTime()) && activityDate <= toDateObj;
                 } catch { return false; }
             });
         }

        setFilteredActivities(results); // Update the list displayed on the current page

    }, [allActivities, searchTerm, typeFilter, itemIdFilter, fromDate, toDate]);


    // --- Client-Side Sorting Logic ---
    const sortedActivities = useMemo(() => {
        let sortableItems = [...filteredActivities]; // Sort the client-side filtered list
        if (sortField) {
            sortableItems.sort((a, b) => {
                let valueA: any;
                let valueB: any;

                switch (sortField) {
                    case 'timestamp':
                        valueA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
                        valueB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
                        break;
                    case 'type':
                    case 'message':
                        valueA = (a[sortField as keyof ActivityItem] as string | undefined | null)?.toLowerCase() ?? '';
                        valueB = (b[sortField as keyof ActivityItem] as string | undefined | null)?.toLowerCase() ?? '';
                        break;
                    default:
                        valueA = a[sortField as keyof ActivityItem];
                        valueB = b[sortField as keyof ActivityItem];
                }

                let comparison = 0;
                if (valueA < valueB) comparison = -1;
                else if (valueA > valueB) comparison = 1;

                return sortDirection === 'asc' ? comparison : comparison * -1;
            });
        }
        return sortableItems;
    }, [filteredActivities, sortField, sortDirection]);


    // --- Reset Page on Filter/Sort/PageSize Change ---
    useEffect(() => {
        // Reset to page 1 if not already there, whenever filters, sorting, or page size changes
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    // IMPORTANT: currentPage is NOT included here to avoid loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, typeFilter, itemIdFilter, fromDate, toDate, sortField, sortDirection, activitiesPerPage]);


    // --- Filter Application Callbacks ---
    const handleApplyFilters = useCallback((filters: FiltersState) => {
        setSearchTerm(filters.searchTerm);
        setFromDate(filters.fromDate);
        setToDate(filters.toDate);
        setTypeFilter(filters.statusFilter); // Map statusFilter to typeFilter
        setItemIdFilter(filters.idFilter); // Map idFilter to itemIdFilter
        setShowFilterModal(false);
        // Page reset handled by useEffect above
    }, []);

    const handleClearAllFilters = useCallback(() => {
        setSearchTerm('');
        setFromDate('');
        setToDate('');
        setTypeFilter('all');
        setItemIdFilter('');
        setShowFilterModal(false);
        // Page reset handled by useEffect above
    }, [setShowFilterModal]);

    // --- Toggle Sort ---
    const toggleSort = (field: ActivitySortField) => {
        const newDirection = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(newDirection);
        // Page reset handled by useEffect above
    };

    // --- Refresh ---
    const refreshData = useCallback(() => {
        fetchActivities(currentPage, activitiesPerPage); // Refetch current page with current size
    }, [fetchActivities, currentPage, activitiesPerPage]);

    // --- VVVV NEW HANDLER FOR PAGE SIZE CHANGE VVVV ---
    const handlePageSizeChange = (size: number) => {
        setActivitiesPerPage(size);
        // Resetting page to 1 is handled by the useEffect above
    };
    // --- ^^^^ NEW HANDLER FOR PAGE SIZE CHANGE ^^^^ ---

    // --- Pagination Handlers ---
    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const goToPreviousPage = () => paginate(currentPage - 1);
    const goToNextPage = () => paginate(currentPage + 1);

    // --- Memoized Options for Filters ---
    const activityTypeOptions = useMemo(() => {
        return ['all', 'NEW_USER', 'NEW_PAYMENT', 'NEW_TRANSFER', 'KYC_PENDING'];
    }, []);
    const currencyOptions = useMemo(() => ['all'], []);

    // --- Prepare current filter state for GenericFilters ---
    const currentFilterState: FiltersState = useMemo(() => ({
        searchTerm,
        fromDate,
        toDate,
        statusFilter: typeFilter,
        idFilter: itemIdFilter,
        currencyFilter: 'all',
        amountFilter: '',
    }), [searchTerm, fromDate, toDate, typeFilter, itemIdFilter]);

    // --- Calculate display range ---
    const startIndex = totalItems > 0 ? (currentPage - 1) * activitiesPerPage + 1 : 0;
    // **Important**: Since filtering is client-side on the *current* page's data,
    // `filteredActivities.length` is the count *after* filtering on this page.
    // `totalItems` from backend is before filtering/merging. Use filtered length for accuracy on display.
    const currentFilteredCount = filteredActivities.length;
    const totalFilteredCount = filteredActivities.length; // For client-side filtering, total is just current filtered length. For server-side, use backend total.
    const endIndex = Math.min(startIndex + activitiesPerPage - 1, startIndex + currentFilteredCount -1); // Correct end index calculation


    // --- JSX Structure ---
    return (
        <section className="Admin-AllActivity py-3">
            <div className="container mx-auto px-4">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <h1 className="text-2xl font-bold text-mainheading dark:text-white">
                            All Recent Activity
                        </h1>
                        <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
                             {/* Filter Button */}
                             <button onClick={() => setShowFilterModal(true)} className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-8 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear">
                                 <Filter size={18} />
                                 Filters
                             </button>
                             {/* Refresh Button */}
                             <button onClick={refreshData} disabled={isRefreshing || loading} className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" title="Refresh activity feed">
                                 <RefreshCw className={`size-5 ${isRefreshing ? "animate-spin" : ""}`} />
                                 <span>Refresh</span>
                             </button>
                         </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && !loading && (
                             <motion.div /* ... error message styles ... */>
                                {/* ... content ... */ <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>}
                             </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Page Size and Showing Text */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <label htmlFor="activitiesPerPage" className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">Show:</label>
                            <select
                                id="activitiesPerPage"
                                value={activitiesPerPage}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-primary dark:focus:ring-primary"
                            >
                                {pageSizeOptions.map(size => <option key={size} value={size} className="dark:bg-dropdowncolor cursor-pointer">{size}</option>)}
                            </select>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">entries</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {/* Updated display text */}
                            Showing {startIndex} - {endIndex} of {totalFilteredCount} results
                            {/* Showing {startIndex} - {Math.min(endIndex, totalItems)} of {totalItems} results */}
                            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
                        </p>
                    </div>


                    {/* Activity List Area */}
                    {loading && (
                        <div className="space-y-3 mt-1 animate-pulse">
                            {[...Array(activitiesPerPage)].map((_, i) => ( // Use state for skeleton count
                                <div key={i} className="flex items-center bg-white dark:bg-white/5 p-4 rounded-lg shadow-sm border dark:border-gray-700/50">
                                    <Skeleton className="h-10 w-10 rounded-full mr-4 flex-shrink-0" />
                                    <div className="flex-grow space-y-2">
                                        <Skeleton className="h-4 w-3/4 rounded" />
                                        {/* <Skeleton className="h-3 w-1/2 rounded" /> */}
                                    </div>
                                    <Skeleton className="h-3 w-24 rounded ml-4 flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && !error && sortedActivities.length === 0 && (
                        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                            <p>No activities found matching your criteria.</p>
                             {/* Removed the "Go to first page" button as filters apply client-side per page */}
                        </div>
                    )}

                    {!loading && !error && sortedActivities.length > 0 && (
                        <div className="mt-1 space-y-3">
                            {/* Sorting Controls Could Go Here (e.g., buttons) */}
                            {/* Or integrate sorting into a Table Header if using a table */}

                            {sortedActivities.map(activity => (
                                <div key={activity.itemId + activity.timestamp} className="flex items-start bg-white dark:bg-white/5 p-3 sm:p-4 rounded-lg shadow-sm border dark:border-gray-700/50 hover:shadow-md transition-shadow duration-150">
                                    <div className="mt-1 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 dark:bg-gray-700/50 flex-shrink-0 flex items-center justify-center mr-3 sm:mr-4">
                                        {getActivityIcon(activity.type, "h-4 w-4 sm:h-5 sm:w-5")}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-neutral-800 dark:text-neutral-100 leading-snug">
                                            {activity.message}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 ml-2 sm:ml-4 whitespace-nowrap flex-shrink-0 pt-1">
                                        {moment(activity.timestamp).format('MMM D, YYYY h:mm A')}
                                        <span className="hidden md:inline"> ({moment(activity.timestamp).fromNow()})</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && !loading && !error && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginate={paginate}
                            goToPreviousPage={goToPreviousPage}
                            goToNextPage={goToNextPage}
                        />
                    )}
                </div>

                {/* Generic Filters Component */}
                <GenericFilters
                    showFilterModal={showFilterModal}
                    setShowFilterModal={setShowFilterModal}
                    initialFilters={currentFilterState}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearAllFilters}
                    currencyOptions={currencyOptions} // Pass dummy options
                    statusOptions={activityTypeOptions} // Pass activity types
                    showRecipientFilter={false}
                    showAmountFilter={false}
                    showCurrencyFilter={false}
                    showIdFilter={true}
                    idFilterLabel="Item ID"
                    idFilterPlaceholder="Filter by User/Payment/Transfer ID"
                    showStatusFilter={true}
                    statusFilterLabel="Activity Type"
                    allStatusesLabel="All Types"
                />
            </div>
        </section>
    );
}