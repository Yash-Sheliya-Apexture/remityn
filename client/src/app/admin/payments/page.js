// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { Skeleton } from '../../../components/ui/skeleton';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null); // State for success message
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null); // Clear any previous messages
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//                 // No toast notification here, just setting component error state
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     const handleStatusChange = async (paymentId, newStatus) => {
//         setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: true }));
//         setError(null);
//         setSuccessMessage(null); // Clear previous messages
//         try {
//             await axios.put(`/admin/payments/${paymentId}/status`, { status: newStatus }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setPayments(payments.map(payment =>
//                 payment._id === paymentId ? { ...payment, status: newStatus } : payment
//             ));
//             setSuccessMessage(`Payment status updated to ${newStatus}`); // Set success message state
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//             // No toast notification, just setting component error state
//         } finally {
//             setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: false }));
//         }
//     };

//     if (loadingPayments) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-2xl font-bold mb-6">Admin Payment Management</h1>
//                 <p>Loading payments...</p>
//                 <div>
//                     <Skeleton count={5} className="h-12 mb-4" />
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-2xl font-bold mb-6">Admin Payment Management</h1>
//                 <p className="text-red-500">Error loading payments: {error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-2xl font-bold mb-6">Admin Payment Management</h1>

//             {successMessage && ( // Display success message
//                 <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
//                     <span className="block sm:inline">{successMessage}</span>
//                 </div>
//             )}

//             {error && ( // Display error message
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//                     <span className="block sm:inline">{error}</span>
//                 </div>
//             )}


//             <div className="overflow-x-auto">
//                 <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Code</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {payments.map(payment => (
//                             <tr key={payment._id}>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment._id}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.user?.fullName || 'N/A'} ({payment.user?.email || 'N/A'})</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amountToAdd}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.payInCurrency?.code}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.referenceCode}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                     <select
//                                         value={payment.status}
//                                         onChange={(e) => handleStatusChange(payment._id, e.target.value)}
//                                         disabled={statusUpdateLoading[payment._id]}
//                                         className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
//                                     >
//                                         <option value="pending">Pending</option>
//                                         <option value="in progress">In Progress</option>
//                                         <option value="completed">Completed</option>
//                                         <option value="canceled">Canceled</option>
//                                     </select>
//                                     {statusUpdateLoading[payment._id] && <span className="ml-2 text-gray-500">Updating...</span>}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                     {/* Future action buttons can be added here - e.g., View Details, Edit */}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminPaymentsPage;

// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp } from 'lucide-react';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateRange, setDateRange] = useState({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [showCalendar, setShowCalendar] = useState(false);

//     // Dropdown state
//     const [openDropdown, setOpenDropdown] = useState(null);

//     // Sorting
//     const [sortField, setSortField] = useState(null);
//     const [sortDirection, setSortDirection] = useState('asc');

//     // Refs for detecting clicks outside dropdown/modal
//     const filterModalRef = useRef(null);
//     const dropdownRefs = useRef({});

//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null);
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//                 setFilteredPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results = [...payments];

//         // Apply search filter
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA, valueB;

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField];
//                     valueB = b[sortField];
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

//         setFilteredPayments(results);
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection]);

//     // Handle clicks outside dropdowns and modals
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             // Close filter modal if clicked outside
//             if (filterModalRef.current && !filterModalRef.current.contains(event.target)) {
//                 setShowFilterModal(false);
//             }

//             // Close dropdowns if clicked outside
//             if (openDropdown) {
//                 const currentRef = dropdownRefs.current[openDropdown];
//                 if (currentRef && !currentRef.contains(event.target)) {
//                     setOpenDropdown(null);
//                 }
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [openDropdown]);

//     const handleStatusChange = async (paymentId, newStatus) => {
//         setOpenDropdown(null);
//         setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: true }));
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await axios.put(`/admin/payments/${paymentId}/status`, { status: newStatus }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update both payments arrays
//             const updatedPayments = payments.map(payment =>
//                 payment._id === paymentId ? { ...payment, status: newStatus } : payment
//             );
//             setPayments(updatedPayments);

//             setSuccessMessage(`Payment status updated to ${newStatus}`);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: false }));
//         }
//     };

//     const toggleSort = (field) => {
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
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-700 bg-green-300 ';
//             case 'pending':
//                 return 'text-yellow-700 bg-yellow-300 ';
//             case 'in progress':
//                 return 'text-blue-700 bg-blue-300 ';
//             case 'canceled':
//                 return 'text-red-700 bg-red-300 ';
//             default:
//                 return 'text-gray-700 bg-gray-300 ';
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-7xl">
//             <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                     <h1 className="text-2xl font-bold text-main">Payment Management</h1>
//                     <div className="flex gap-3">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by ID or user..."
//                                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <button
//                             onClick={() => setShowFilterModal(true)}
//                             className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
//                         >
//                             <Filter size={18} />
//                             Filters
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

//                 {/* Applied Filters */}
//                 {(searchTerm || statusFilter !== 'all' || dateRange.from || dateRange.to) && (
//                     <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         className="flex items-center gap-2 flex-wrap"
//                     >
//                         <span className="text-sm text-gray-600">Active filters:</span>

//                         {searchTerm && (
//                             <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center">
//                                 Search: {searchTerm}
//                                 <button onClick={() => setSearchTerm('')} className="ml-2">
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         )}

//                         {statusFilter !== 'all' && (
//                             <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center">
//                                 Status: {statusFilter}
//                                 <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         )}

//                         {(dateRange.from || dateRange.to) && (
//                             <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center">
//                                 Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                 {dateRange.from && dateRange.to ? ' - ' : ''}
//                                 {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                 <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         )}

//                         <button
//                             onClick={clearFilters}
//                             className="text-sm text-red-600 hover:text-red-800 underline ml-2"
//                         >
//                             Clear all
//                         </button>
//                     </motion.div>
//                 )}

//                 {/* Payments Table */}
//                 <div
//                     className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
//                 >
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('_id')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             Payment ID
//                                             {sortField === '_id' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('user')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             User
//                                             {sortField === 'user' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('amount')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             Amount
//                                             {sortField === 'amount' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('status')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             Status
//                                             {sortField === 'status' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredPayments.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
//                                             No payments found matching your filters.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredPayments.map((payment, index) => (
//                                         <motion.tr
//                                             key={payment._id}
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: index * 0.05 }}
//                                             className="hover:bg-gray-50"
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className="flex flex-col">
//                                                     <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
//                                                     <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                 {payment.amountToAdd}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {payment.payInCurrency?.code || 'N/A'}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
//                                                     {payment.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                 <div className="relative" ref={el => dropdownRefs.current[payment._id] = el}>
//                                                     <motion.button
//                                                         whileHover={{ scale: 1.05 }}
//                                                         whileTap={{ scale: 0.95 }}
//                                                         onClick={() => setOpenDropdown(openDropdown === payment._id ? null : payment._id)}
//                                                         className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 flex items-center"
//                                                         disabled={statusUpdateLoading[payment._id]}
//                                                     >
//                                                         {statusUpdateLoading[payment._id] ? (
//                                                             <span>Updating...</span>
//                                                         ) : (
//                                                             <>
//                                                                 Update Status <ChevronDown size={16} className="ml-1" />
//                                                             </>
//                                                         )}
//                                                     </motion.button>

//                                                     <AnimatePresence>
//                                                         {openDropdown === payment._id && (
//                                                             <motion.div
//                                                                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                                 transition={{ duration: 0.15 }}
//                                                                 className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200 py-1 overflow-hidden"
//                                                             >
//                                                                 {['pending', 'in progress', 'completed', 'canceled'].map((status) => (
//                                                                     <motion.button
//                                                                         key={status}
//                                                                         whileHover={{ backgroundColor: '#F3F4F6' }}
//                                                                         onClick={() => handleStatusChange(payment._id, status)}
//                                                                         className="w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center justify-between"
//                                                                     >
//                                                                         {status}
//                                                                         {payment.status === status && (
//                                                                             <Check size={16} className="text-indigo-600" />
//                                                                         )}
//                                                                     </motion.button>
//                                                                 ))}
//                                                             </motion.div>
//                                                         )}
//                                                     </AnimatePresence>
//                                                 </div>
//                                             </td>
//                                         </motion.tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Filter Modal */}
//             <AnimatePresence>
//                 {showFilterModal && (
//                     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.9 }}
//                             transition={{ duration: 0.2 }}
//                             className="relative"
//                             ref={filterModalRef}
//                         >
//                             <div className="bg-white rounded-xl shadow-xl w-96 overflow-hidden">
//                                 <div className="p-6 border-b border-gray-200">
//                                     <div className="flex justify-between items-center">
//                                         <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                                         <button
//                                             onClick={() => setShowFilterModal(false)}
//                                             className="text-gray-400 hover:text-gray-500"
//                                         >
//                                             <X size={20} />
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="p-6 space-y-6">
//                                     {/* Status Filter */}
//                                     <div>
//                                         <label className="block font-medium text-gray-700 mb-1">
//                                             Status
//                                         </label>
//                                         <div className="relative">
//                                             <select
//                                                 value={statusFilter}
//                                                 onChange={(e) => setStatusFilter(e.target.value)}
//                                                 className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                                             >
//                                                 <option value="all">All Statuses</option>
//                                                 <option value="pending">Pending</option>
//                                                 <option value="in progress">In Progress</option>
//                                                 <option value="completed">Completed</option>
//                                                 <option value="canceled">Canceled</option>
//                                             </select>
//                                         </div>
//                                     </div>

//                                     {/* Date Range Filter */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Date Range
//                                         </label>
//                                         <div className="relative">
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setShowCalendar(!showCalendar)}
//                                                 className="flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                             >
//                                                 <span>
//                                                     {dateRange.from ? (
//                                                         dateRange.to ? (
//                                                             `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                         ) : (
//                                                             `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                         )
//                                                     ) : dateRange.to ? (
//                                                         `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                     ) : (
//                                                         'Select date range'
//                                                     )}
//                                                 </span>
//                                                 <CalendarIcon className="h-5 w-5 text-gray-400" />
//                                             </button>

//                                             <AnimatePresence>
//                                                 {showCalendar && (
//                                                     <motion.div
//                                                         initial={{ opacity: 0, y: 10 }}
//                                                         animate={{ opacity: 1, y: 0 }}
//                                                         exit={{ opacity: 0, y: 10 }}
//                                                         className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-200"
//                                                     >
//                                                         <Calendar
//                                                             mode="range"
//                                                             selected={dateRange}
//                                                             onSelect={(range) => {
//                                                                 setDateRange(range);
//                                                                 setShowCalendar(false);
//                                                             }}
//                                                         />
//                                                         {(dateRange.from || dateRange.to) && (
//                                                             <div className="mt-2 flex justify-end">
//                                                                 <button
//                                                                     type="button"
//                                                                     onClick={() => {
//                                                                         setDateRange({ from: null, to: null });
//                                                                         setShowCalendar(false);
//                                                                     }}
//                                                                     className="text-sm text-red-600 hover:text-red-800"
//                                                                 >
//                                                                     Clear dates
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                     </motion.div>
//                                                 )}
//                                             </AnimatePresence>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
//                                     <button
//                                         type="button"
//                                         onClick={clearFilters}
//                                         className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                     >
//                                         Clear All
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowFilterModal(false)}
//                                         className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                     >
//                                         Apply Filters
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default AdminPaymentsPage;

// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp } from 'lucide-react';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateRange, setDateRange] = useState({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [showCalendar, setShowCalendar] = useState(false);

//     // Dropdown state
//     const [openDropdown, setOpenDropdown] = useState(null);

//     // Sorting
//     const [sortField, setSortField] = useState(null);
//     const [sortDirection, setSortDirection] = useState('asc');

//     // Refs for detecting clicks outside dropdown/modal
//     const filterModalRef = useRef(null);
//     const dropdownRefs = useRef({});

//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null);
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//                 setFilteredPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results = [...payments];

//         // Apply search filter
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA, valueB;

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField];
//                     valueB = b[sortField];
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

//         setFilteredPayments(results);
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection]);

//     // Handle clicks outside dropdowns and modals
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             // Close filter modal if clicked outside
//             if (filterModalRef.current && !filterModalRef.current.contains(event.target)) {
//                 setShowFilterModal(false);
//             }

//             // Close dropdowns if clicked outside
//             if (openDropdown) {
//                 const currentRef = dropdownRefs.current[openDropdown];
//                 if (currentRef && !currentRef.contains(event.target)) {
//                     setOpenDropdown(null);
//                 }
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [openDropdown]);

//     const handleStatusChange = async (paymentId, newStatus) => {
//         setOpenDropdown(null);
//         setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: true }));
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await axios.put(`/admin/payments/${paymentId}/status`, { status: newStatus }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update both payments arrays
//             const updatedPayments = payments.map(payment =>
//                 payment._id === paymentId ? { ...payment, status: newStatus } : payment
//             );
//             setPayments(updatedPayments);

//             setSuccessMessage(`Payment status updated to ${newStatus}`);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: false }));
//         }
//     };

//     const toggleSort = (field) => {
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
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-700 bg-green-300 ';
//             case 'pending':
//                 return 'text-yellow-700 bg-yellow-300 ';
//             case 'in progress':
//                 return 'text-blue-700 bg-blue-300 ';
//             case 'canceled':
//                 return 'text-red-700 bg-red-300 ';
//             default:
//                 return 'text-gray-700 bg-gray-300 ';
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-7xl">
//             <div className="space-y-6">
//                 <div className="flex justify-between items-start">
//                     <h1 className="text-2xl font-bold text-main">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by ID or user..."
//                                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <div className="relative">
//                             <button
//                                 onClick={() => setShowFilterModal(true)}
//                                 className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
//                             >
//                                 <Filter size={18} />
//                                 Filters
//                             </button>
//                             {/* Filter Sidebar */}
//                             {(searchTerm || statusFilter !== 'all' || dateRange.from || dateRange.to) && (
//                                 <motion.div
//                                     initial={{ opacity: 0, x: 20, display: 'none' }}
//                                     animate={{ opacity: 1, x: 0, display: 'block' }}
//                                     exit={{ opacity: 0, x: 20, display: 'none' }}
//                                     transition={{ duration: 0.2 }}
//                                     className="absolute right-[-20px] top-[105%] mt-2 bg-white border border-gray-200 rounded-md shadow-md p-4 w-72 z-40"
//                                 >
//                                     <div className="flex justify-between items-center mb-3">
//                                         <h4 className="font-semibold text-gray-800">Applied Filters</h4>
//                                         <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-800 underline">
//                                             Clear all
//                                         </button>
//                                     </div>
//                                     <div className="space-y-2">
//                                         {searchTerm && (
//                                             <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                                 <span>User Search: {searchTerm}</span>
//                                                 <button onClick={() => setSearchTerm('')} className="ml-2">
//                                                     <X size={16} />
//                                                 </button>
//                                             </div>
//                                         )}
//                                         {statusFilter !== 'all' && (
//                                             <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                                 <span>Status: {statusFilter}</span>
//                                                 <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                                     <X size={16} />
//                                                 </button>
//                                             </div>
//                                         )}
//                                         {(dateRange.from || dateRange.to) && (
//                                             <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                                 <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                                     {dateRange.from && dateRange.to ? ' - ' : ''}
//                                                     {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                                 </span>
//                                                 <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                                     <X size={16} />
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </div>
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


//                 {/* Payments Table */}
//                 <div
//                     className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
//                 >
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('_id')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             Payment ID
//                                             {sortField === '_id' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('user')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             User
//                                             {sortField === 'user' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('amount')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             Amount
//                                             {sortField === 'amount' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('status')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             Status
//                                             {sortField === 'status' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredPayments.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
//                                             No payments found matching your filters.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredPayments.map((payment, index) => (
//                                         <motion.tr
//                                             key={payment._id}
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: index * 0.05 }}
//                                             className="hover:bg-gray-50"
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className="flex flex-col">
//                                                     <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
//                                                     <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                 {payment.amountToAdd}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {payment.payInCurrency?.code || 'N/A'}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
//                                                     {payment.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                 <div className="relative" ref={el => dropdownRefs.current[payment._id] = el}>
//                                                     <motion.button
//                                                         whileHover={{ scale: 1.05 }}
//                                                         whileTap={{ scale: 0.95 }}
//                                                         onClick={() => setOpenDropdown(openDropdown === payment._id ? null : payment._id)}
//                                                         className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex items-center"
//                                                         disabled={statusUpdateLoading[payment._id]}
//                                                     >
//                                                         {statusUpdateLoading[payment._id] ? (
//                                                             <span>Updating...</span>
//                                                         ) : (
//                                                             <>
//                                                                 Update Status <ChevronDown size={16} className="ml-1" />
//                                                             </>
//                                                         )}
//                                                     </motion.button>

//                                                     <AnimatePresence>
//                                                         {openDropdown === payment._id && (
//                                                             <motion.div
//                                                                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                                 transition={{ duration: 0.15 }}
//                                                                 className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200 py-1 overflow-hidden"
//                                                             >
//                                                                 {['pending', 'in progress', 'completed', 'canceled'].map((status) => (
//                                                                     <motion.button
//                                                                         key={status}
//                                                                         whileHover={{ backgroundColor: '#F3F4F6' }}
//                                                                         onClick={() => handleStatusChange(payment._id, status)}
//                                                                         className="w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center justify-between"
//                                                                     >
//                                                                         {status}
//                                                                         {payment.status === status && (
//                                                                             <Check size={16} className="text-indigo-600" />
//                                                                         )}
//                                                                     </motion.button>
//                                                                 ))}
//                                                             </motion.div>
//                                                         )}
//                                                     </AnimatePresence>
//                                                 </div>
//                                             </td>
//                                         </motion.tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Filter Modal */}
//             <AnimatePresence>
//                 {showFilterModal && (
//                     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.9 }}
//                             transition={{ duration: 0.2 }}
//                             className="relative"
//                             ref={filterModalRef}
//                         >
//                             <div className="bg-white rounded-xl shadow-xl w-96 overflow-hidden">
//                                 <div className="p-6 border-b border-gray-200">
//                                     <div className="flex justify-between items-center">
//                                         <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                                         <button
//                                             onClick={() => setShowFilterModal(false)}
//                                             className="text-gray-400 hover:text-gray-500"
//                                         >
//                                             <X size={20} />
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="p-6 space-y-6">
//                                     {/* Status Filter */}
//                                     <div>
//                                         <label className="block font-medium text-gray-700 mb-1">
//                                             Status
//                                         </label>
//                                         <div className="relative">
//                                             <select
//                                                 value={statusFilter}
//                                                 onChange={(e) => setStatusFilter(e.target.value)}
//                                                 className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                                             >
//                                                 <option value="all">All Statuses</option>
//                                                 <option value="pending">Pending</option>
//                                                 <option value="in progress">In Progress</option>
//                                                 <option value="completed">Completed</option>
//                                                 <option value="canceled">Canceled</option>
//                                             </select>
//                                         </div>
//                                     </div>

//                                     {/* Date Range Filter */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Date Range
//                                         </label>
//                                         <div className="relative">
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setShowCalendar(!showCalendar)}
//                                                 className="flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                             >
//                                                 <span>
//                                                     {dateRange.from ? (
//                                                         dateRange.to ? (
//                                                             `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                         ) : (
//                                                             `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                         )
//                                                     ) : dateRange.to ? (
//                                                         `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                     ) : (
//                                                         'Select date range'
//                                                     )}
//                                                 </span>
//                                                 <CalendarIcon className="h-5 w-5 text-gray-400" />
//                                             </button>

//                                             <AnimatePresence>
//                                                 {showCalendar && (
//                                                     <motion.div
//                                                         initial={{ opacity: 0, y: 10 }}
//                                                         animate={{ opacity: 1, y: 0 }}
//                                                         exit={{ opacity: 0, y: 10 }}
//                                                         className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-200"
//                                                     >
//                                                         <Calendar
//                                                             mode="range"
//                                                             selected={dateRange}
//                                                             onSelect={(range) => {
//                                                                 setDateRange(range);
//                                                                 setShowCalendar(false);
//                                                             }}
//                                                         />
//                                                         {(dateRange.from || dateRange.to) && (
//                                                             <div className="mt-2 flex justify-end">
//                                                                 <button
//                                                                     type="button"
//                                                                     onClick={() => {
//                                                                         setDateRange({ from: null, to: null });
//                                                                         setShowCalendar(false);
//                                                                     }}
//                                                                     className="text-sm text-red-600 hover:text-red-800"
//                                                                 >
//                                                                     Clear dates
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                     </motion.div>
//                                                 )}
//                                             </AnimatePresence>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
//                                     <button
//                                         type="button"
//                                         onClick={clearFilters}
//                                         className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                     >
//                                         Clear All
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowFilterModal(false)}
//                                         className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                     >
//                                         Apply Filters
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default AdminPaymentsPage;



// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp } from 'lucide-react';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateRange, setDateRange] = useState({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [showCalendar, setShowCalendar] = useState(false);

//     // Dropdown state
//     const [openDropdown, setOpenDropdown] = useState(null);

//     // Sorting
//     const [sortField, setSortField] = useState(null);
//     const [sortDirection, setSortDirection] = useState('asc');

//     // Refs for detecting clicks outside dropdown/modal
//     const filterModalRef = useRef(null);
//     const dropdownRefs = useRef({});

//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null);
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//                 setFilteredPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results = [...payments];

//         // Apply search filter
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA, valueB;

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField];
//                     valueB = b[sortField];
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

//         setFilteredPayments(results);
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection]);

//     // Handle clicks outside dropdowns and modals
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             // Close filter modal if clicked outside
//             if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setShowFilterModal(false);
//             }

//             // Close dropdowns if clicked outside
//             if (openDropdown) {
//                 const currentRef = dropdownRefs.current[openDropdown];
//                 if (currentRef && !currentRef.contains(event.target)) {
//                     setOpenDropdown(null);
//                 }
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [openDropdown, showFilterModal]);

//     const handleStatusChange = async (paymentId, newStatus) => {
//         setOpenDropdown(null);
//         setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: true }));
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await axios.put(`/admin/payments/${paymentId}/status`, { status: newStatus }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update both payments arrays
//             const updatedPayments = payments.map(payment =>
//                 payment._id === paymentId ? { ...payment, status: newStatus } : payment
//             );
//             setPayments(updatedPayments);

//             setSuccessMessage(`Payment status updated to ${newStatus}`);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: false }));
//         }
//     };

//     const toggleSort = (field) => {
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
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-700 bg-green-300 ';
//             case 'pending':
//                 return 'text-yellow-700 bg-yellow-300 ';
//             case 'in progress':
//                 return 'text-blue-700 bg-blue-300 ';
//             case 'canceled':
//                 return 'text-red-700 bg-red-300 ';
//             default:
//                 return 'text-gray-700 bg-gray-300 ';
//         }
//     };

//     if (loadingPayments) {
//         return (
//             <div className="container mx-auto px-4 py-8 max-w-7xl">
//                 <h1 className="text-2xl font-bold text-main mb-4">Payment Management</h1>
//                 <div className="space-y-4">
//                     <div><Skeleton className="h-10 w-64" /></div>
//                     <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Array(5).fill(0).map((_, i) => (
//                                     <tr key={i} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     }


//     return (
//         <div className="container mx-auto px-4 py-8 max-w-7xl relative"> {/* Make container relative for filter sidebar positioning */}
//             <div className="space-y-6">
//                 <div className="flex justify-between items-start">
//                     <h1 className="text-2xl font-bold text-main">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by ID or user..."
//                                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <div> {/* Removed relative here */}
//                             <button
//                                 onClick={() => setShowFilterModal(true)}
//                                 className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
//                             >
//                                 <Filter size={18} />
//                                 Filters
//                             </button>
//                         </div>
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


//                 {/* Payments Table */}
//                 <div
//                     className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
//                 >
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('_id')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             Payment ID
//                                             {sortField === '_id' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('user')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             User
//                                             {sortField === 'user' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('amount')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             Amount
//                                             {sortField === 'amount' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button
//                                             onClick={() => toggleSort('status')}
//                                             className="flex items-center gap-1 hover:text-primary uppercase"
//                                         >
//                                             Status
//                                             {sortField === 'status' && (
//                                                 <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                             )}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredPayments.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
//                                             No payments found matching your filters.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredPayments.map((payment, index) => (
//                                         <motion.tr
//                                             key={payment._id}
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: index * 0.05 }}
//                                             className="hover:bg-gray-50"
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className="flex flex-col">
//                                                     <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
//                                                     <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                 {payment.amountToAdd}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {payment.payInCurrency?.code || 'N/A'}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
//                                                     {payment.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                 <div className="relative" ref={el => dropdownRefs.current[payment._id] = el}>
//                                                     <motion.button>
//                                                         <motion.button
//                                                             whileHover={{ scale: 1.05 }}
//                                                             whileTap={{ scale: 0.95 }}
//                                                             onClick={() => setOpenDropdown(openDropdown === payment._id ? null : payment._id)}
//                                                             className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex items-center"
//                                                             disabled={statusUpdateLoading[payment._id]}
//                                                         >
//                                                             {statusUpdateLoading[payment._id] ? (
//                                                                 <span>Updating...</span>
//                                                             ) : (
//                                                                 <>
//                                                                     Update Status <ChevronDown size={16} className="ml-1" />
//                                                                 </>
//                                                             )}
//                                                         </motion.button>
//                                                     </motion.button>

//                                                     <AnimatePresence>
//                                                         {openDropdown === payment._id && (
//                                                             <motion.div
//                                                                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                                 transition={{ duration: 0.15 }}
//                                                                 className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200 py-1 overflow-hidden"
//                                                             >
//                                                                 {['pending', 'in progress', 'completed', 'canceled'].map((status) => (
//                                                                     <motion.button
//                                                                         key={status}
//                                                                         whileHover={{ backgroundColor: '#F3F4F6' }}
//                                                                         onClick={() => handleStatusChange(payment._id, status)}
//                                                                         className="w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center justify-between"
//                                                                     >
//                                                                         {status}
//                                                                         {payment.status === status && (
//                                                                             <Check size={16} className="text-indigo-600" />
//                                                                         )}
//                                                                     </motion.button>
//                                                                 ))}
//                                                             </motion.div>
//                                                         )}
//                                                     </AnimatePresence>
//                                                 </div>
//                                             </td>
//                                         </motion.tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Filter Sidebar */}
//             <AnimatePresence>
//                 {showFilterModal && (
//                     <motion.div
//                         ref={filterModalRef}
//                         initial={{ opacity: 0, x: '100%' }}
//                         animate={{ opacity: 1, x: '0%' }}
//                         exit={{ opacity: 0, x: '100%' }}
//                         transition={{ duration: 0.3 }}
//                         className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                     >
//                         <div className="p-6 border-b border-gray-200">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                                 <button
//                                     onClick={() => setShowFilterModal(false)}
//                                     className="text-gray-400 hover:text-gray-500"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="p-6 space-y-6">
//                             {/* Status Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray mb-1">
//                                     Status
//                                 </label>
//                                 <div className="relative">
//                                     <select
//                                         value={statusFilter}
//                                         onChange={(e) => setStatusFilter(e.target.value)}
//                                         className="inline-block w-full pl-3 pr-10 py-3.5 text-base border border-gray-300 focus:outline-none sm:text-sm rounded-md"
//                                     >
//                                         <option value="all">All Statuses</option>
//                                         <option value="pending">Pending</option>
//                                         <option value="in progress">In Progress</option>
//                                         <option value="completed">Completed</option>
//                                         <option value="canceled">Canceled</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Date Range Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray mb-1">
//                                     Date Range
//                                 </label>
//                                 <div className="relative">
//                                     <button>
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowCalendar(!showCalendar)}
//                                             className="flex items-center justify-between border border-gray-300 rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                         >
//                                             <span>
//                                                 {dateRange.from ? (
//                                                     dateRange.to ? (
//                                                         `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                     ) : (
//                                                         `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                     )
//                                                 ) : dateRange.to ? (
//                                                     `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     'Select date range'
//                                                 )}
//                                             </span>
//                                             <CalendarIcon className="h-5 w-5 text-gray-400" />
//                                         </button>
//                                     </button>

//                                     <AnimatePresence>
//                                         {showCalendar && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: 10 }}
//                                                 className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-200"
//                                             >
//                                                 <Calendar
//                                                     mode="range"
//                                                     selected={dateRange}
//                                                     onSelect={(range) => {
//                                                         setDateRange(range);
//                                                         setShowCalendar(false);
//                                                     }}
//                                                 />
//                                                 {(dateRange.from || dateRange.to) && (
//                                                     <div className="mt-2 flex justify-end">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => {
//                                                                 setDateRange({ from: null, to: null });
//                                                                 setShowCalendar(false);
//                                                             }}
//                                                             className="text-sm text-red-600 hover:text-red-800"
//                                                         >
//                                                             Clear dates
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
//                             <button
//                                 type="button"
//                                 onClick={clearFilters}
//                                 className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Clear All
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Apply Filters
//                             </button>
//                         </div>
//                         {/* Applied Filters Display inside Sidebar */}
//                         {(searchTerm || statusFilter !== 'all' || dateRange.from || dateRange.to) && (
//                             <div className="px-6 py-4">
//                                 <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                                 <div className="space-y-2">
//                                     {searchTerm && (
//                                         <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                             <span>User Search: {searchTerm}</span>
//                                             <button onClick={() => setSearchTerm('')} className="ml-2">
//                                                 <X size={16} />
//                                             </button>
//                                         </div>
//                                     )}
//                                     {statusFilter !== 'all' && (
//                                         <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                             <span>Status: {statusFilter}</span>
//                                             <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                                 <X size={16} />
//                                             </button>
//                                         </div>
//                                     )}
//                                     {(dateRange.from || dateRange.to) && (
//                                         <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                             <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                                 {dateRange.from && dateRange.to ? ' - ' : ''}
//                                                 {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                             </span>
//                                             <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                                 <X size={16} />
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default AdminPaymentsPage;



// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp } from 'lucide-react';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateRange, setDateRange] = useState({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [paymentIdFilter, setPaymentIdFilter] = useState('');
//     const [amountFilter, setAmountFilter] = useState('');
//     const [currencyFilter, setCurrencyFilter] = useState('');


//     // Dropdown state
//     const [openDropdown, setOpenDropdown] = useState(null);

//     // Sorting
//     const [sortField, setSortField] = useState(null);
//     const [sortDirection, setSortDirection] = useState('asc');

//     // Refs for detecting clicks outside dropdown/modal
//     const filterModalRef = useRef(null);
//     const dropdownRefs = useRef({});

//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null);
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//                 setFilteredPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results = [...payments];

//         // Apply search filter (user name and email)
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             results = results.filter(payment => parseFloat(payment.amountToAdd) === amount);
//         }

//         // Apply Currency filter
//         if (currencyFilter && currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }


//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA, valueB;

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField];
//                     valueB = b[sortField];
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

//         setFilteredPayments(results);
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);

//     // Handle clicks outside dropdowns and modals
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             // Close filter modal if clicked outside
//             if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setShowFilterModal(false);
//             }

//             // Close dropdowns if clicked outside
//             if (openDropdown) {
//                 const currentRef = dropdownRefs.current[openDropdown];
//                 if (currentRef && !currentRef.contains(event.target)) {
//                     setOpenDropdown(null);
//                 }
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [openDropdown, showFilterModal]);

//     const handleStatusChange = async (paymentId, newStatus) => {
//         setOpenDropdown(null);
//         setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: true }));
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await axios.put(`/admin/payments/${paymentId}/status`, { status: newStatus }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update both payments arrays
//             const updatedPayments = payments.map(payment =>
//                 payment._id === paymentId ? { ...payment, status: newStatus } : payment
//             );
//             setPayments(updatedPayments);

//             setSuccessMessage(`Payment status updated to ${newStatus}`);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: false }));
//         }
//     };

//     const toggleSort = (field) => {
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
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('');
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-700 bg-green-300 ';
//             case 'pending':
//                 return 'text-yellow-700 bg-yellow-300 ';
//             case 'in progress':
//                 return 'text-blue-700 bg-blue-300 ';
//             case 'canceled':
//                 return 'text-red-700 bg-red-300 ';
//             default:
//                 return 'text-gray-700 bg-gray-300 ';
//         }
//     };

//     if (loadingPayments) {
//         return (
//             <div className="container mx-auto px-4 py-8 max-w-7xl">
//                 <h1 className="text-2xl font-bold text-main mb-4">Payment Management</h1>
//                 <div className="space-y-4">
//                     <div><Skeleton className="h-10 w-64" /></div>
//                     <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Array(5).fill(0).map((_, i) => (
//                                     <tr key={i} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     }


//     return (
//         <div className="container mx-auto px-4 py-8 max-w-7xl relative"> {/* Make container relative for filter sidebar positioning */}
//             <div className="space-y-6">
//                 <div className="flex justify-between items-start">
//                     <h1 className="text-2xl font-bold text-main">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User Name or Email..."
//                                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <div> {/* Removed relative here */}
//                             <button
//                                 onClick={() => setShowFilterModal(true)}
//                                 className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
//                             >
//                                 <Filter size={18} />
//                                 Filters
//                             </button>
//                         </div>
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


//                 {/* Payments Table */}
//                 <div
//                     className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
//                 >
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('_id')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Payment ID
//                                                 {sortField === '_id' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('user')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 User
//                                                 {sortField === 'user' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('amount')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Amount
//                                                 {sortField === 'amount' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('status')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Status
//                                                 {sortField === 'status' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredPayments.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
//                                             No payments found matching your filters.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredPayments.map((payment, index) => (
//                                         <motion.tr
//                                             key={payment._id}
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: index * 0.05 }}
//                                             className="hover:bg-gray-50"
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className="flex flex-col">
//                                                     <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
//                                                     <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                 {payment.amountToAdd}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {payment.payInCurrency?.code || 'N/A'}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
//                                                     {payment.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                 <div className="relative" ref={el => dropdownRefs.current[payment._id] = el}>
//                                                     <motion.button>
//                                                         <motion.button
//                                                             whileHover={{ scale: 1.05 }}
//                                                             whileTap={{ scale: 0.95 }}
//                                                             onClick={() => setOpenDropdown(openDropdown === payment._id ? null : payment._id)}
//                                                             className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex items-center"
//                                                             disabled={statusUpdateLoading[payment._id]}
//                                                         >
//                                                             {statusUpdateLoading[payment._id] ? (
//                                                                 <span>Updating...</span>
//                                                             ) : (
//                                                                 <>
//                                                                     Update Status <ChevronDown size={16} className="ml-1" />
//                                                                 </>
//                                                             )}
//                                                         </motion.button>
//                                                     </motion.button>

//                                                     <AnimatePresence>
//                                                         {openDropdown === payment._id && (
//                                                             <motion.div
//                                                                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                                 transition={{ duration: 0.15 }}
//                                                                 className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200 py-1 overflow-hidden"
//                                                             >
//                                                                 {['pending', 'in progress', 'completed', 'canceled'].map((status) => (
//                                                                     <motion.button
//                                                                         key={status}
//                                                                         whileHover={{ backgroundColor: '#F3F4F6' }}
//                                                                         onClick={() => handleStatusChange(payment._id, status)}
//                                                                         className="w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center justify-between"
//                                                                     >
//                                                                         {status}
//                                                                         {payment.status === status && (
//                                                                             <Check size={16} className="text-indigo-600" />
//                                                                         )}
//                                                                     </motion.button>
//                                                                 ))}
//                                                             </motion.div>
//                                                         )}
//                                                     </AnimatePresence>
//                                                 </div>
//                                             </td>
//                                         </motion.tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Filter Sidebar */}
//             <AnimatePresence>
//                 {showFilterModal && (
//                     <motion.div
//                         ref={filterModalRef}
//                         initial={{ opacity: 0, x: '100%' }}
//                         animate={{ opacity: 1, x: '0%' }}
//                         exit={{ opacity: 0, x: '100%' }}
//                         transition={{ duration: 0.3 }}
//                         className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                     >
//                         <div className="p-6 border-b border-gray-200">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-xl font-medium text-main">Filter Payments</h3>
//                                 <button
//                                     onClick={() => setShowFilterModal(false)}
//                                     className=""
//                                 >
//                                     <X className='text-main size-10 hover:bg-green/10 p-1 cursor-pointer rounded-full' />
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="p-6 space-y-6">
//                             {/* Payment ID Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray mb-1.5">
//                                     Payment ID
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={paymentIdFilter}
//                                     onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                     placeholder="Filter by Payment ID"
//                                     className="mt-1 block w-full border-gray-300 rounded-md px-4 py-3 border focus:outline-none sm:text-sm"
//                                 />
//                             </div>
//                             {/* Amount Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Amount
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={amountFilter}
//                                     onChange={(e) => setAmountFilter(e.target.value)}
//                                     placeholder="Filter by Amount"
//                                     className="mt-1 block w-full border-gray-300 rounded-md px-4 py-3 border focus:outline-none sm:text-sm"
//                                 />
//                             </div>

//                             {/* Currency Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Currency
//                                 </label>
//                                 <div className="relative">
//                                     <select
//                                         value={currencyFilter}
//                                         onChange={(e) => setCurrencyFilter(e.target.value)}
//                                         className="block w-full pl-3 pr-10 text-base border-gray-300 px-4 py-3 border focus:outline-none sm:text-sm rounded-md"
//                                     >
//                                         <option value="all">All Currencies</option>
//                                         {/* Assuming payments have payInCurrency and it has a code property */}
//                                         {Array.from(new Set(payments.map(p => p.payInCurrency?.code).filter(Boolean))).map(currencyCode => (
//                                             <option key={currencyCode} value={currencyCode}>{currencyCode}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Status Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Status
//                                 </label>
//                                 <div className="relative">
//                                     <select
//                                         value={statusFilter}
//                                         onChange={(e) => setStatusFilter(e.target.value)}
//                                         className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                                     >
//                                         <option value="all">All Statuses</option>
//                                         <option value="pending">Pending</option>
//                                         <option value="in progress">In Progress</option>
//                                         <option value="completed">Completed</option>
//                                         <option value="canceled">Canceled</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Date Range Filter */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Date Range
//                                 </label>
//                                 <div className="relative">
//                                     <button>
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowCalendar(!showCalendar)}
//                                             className="flex items-center justify-between w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                         >
//                                             <span>
//                                                 {dateRange.from ? (
//                                                     dateRange.to ? (
//                                                         `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                     ) : (
//                                                         `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                     )
//                                                 ) : dateRange.to ? (
//                                                     `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     'Select date range'
//                                                 )}
//                                             </span>
//                                             <CalendarIcon className="h-5 w-5 text-gray-400" />
//                                         </button>
//                                     </button>

//                                     <AnimatePresence>
//                                         {showCalendar && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: 10 }}
//                                                 className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-200"
//                                             >
//                                                 <Calendar
//                                                     mode="range"
//                                                     selected={dateRange}
//                                                     onSelect={(range) => {
//                                                         setDateRange(range);
//                                                         setShowCalendar(false);
//                                                     }}
//                                                 />
//                                                 {(dateRange.from || dateRange.to) && (
//                                                     <div className="mt-2 flex justify-end">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => {
//                                                                 setDateRange({ from: null, to: null });
//                                                                 setShowCalendar(false);
//                                                             }}
//                                                             className="text-sm text-red-600 hover:text-red-800"
//                                                         >
//                                                             Clear dates
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
//                             <button
//                                 type="button"
//                                 onClick={clearFilters}
//                                 className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Clear All
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Apply Filters
//                             </button>
//                         </div>

//                         {/* Applied Filters Display inside Sidebar */}
//                         <div className="px-6 py-4">
//                             <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                             <div className="space-y-2">
//                                 {searchTerm && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>User Search: {searchTerm}</span>
//                                         <button onClick={() => setSearchTerm('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {paymentIdFilter && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Payment ID: {paymentIdFilter}</span>
//                                         <button onClick={() => setPaymentIdFilter('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {amountFilter && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Amount: {amountFilter}</span>
//                                         <button onClick={() => setAmountFilter('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {currencyFilter && currencyFilter !== 'all' && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Currency: {currencyFilter}</span>
//                                         <button onClick={() => setCurrencyFilter('all')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {statusFilter !== 'all' && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Status: {statusFilter}</span>
//                                         <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {(dateRange.from || dateRange.to) && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                             {dateRange.from && dateRange.to ? ' - ' : ''}
//                                             {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                         </span>
//                                         <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div >
//     );
// };

// export default AdminPaymentsPage;


// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp } from 'lucide-react';

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Custom Dropdown Component
// const CustomDropdown = ({ label, value, onChange, options }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     return (
//         <div>
//             <label className="block font-medium text-gray-700 mb-1">{label}</label>
//             <div className="relative">
//                 <button
//                     type="button"
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm px-4 py-3 bg-white font-medium text-main focus:outline-none"
//                 >
//                     <span>{value || `All ${label}s`}</span> {/* Default text if no value selected */}
//                     <ChevronDown className="size-5 text-gray-400" />
//                 </button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.ul
//                             ref={dropdownRef}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200 overflow-hidden"
//                         >
//                             {options.map((option) => (
//                                 <motion.li
//                                     key={option}
//                                     onClick={() => { onChange(option); setIsOpen(false); }}
//                                     className="px-4 py-3 text-sm text-gray-700 font-medium cursor-pointer flex justify-between items-center"
//                                 >
//                                     {option === 'all' ? `All ${label}s` : option} {/* Display "All Statuses" or "All Currencies" */}
//                                     {value === option && <Check className="text-indigo-600" size={16} />}
//                                 </motion.li>
//                             ))}
//                         </motion.ul>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateRange, setDateRange] = useState({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [paymentIdFilter, setPaymentIdFilter] = useState('');
//     const [amountFilter, setAmountFilter] = useState('');
//     const [currencyFilter, setCurrencyFilter] = useState('all'); // Default to 'all' for currency filter


//     // Dropdown state
//     const [openDropdown, setOpenDropdown] = useState(null);

//     // Sorting
//     const [sortField, setSortField] = useState(null);
//     const [sortDirection, setSortDirection] = useState('asc');

//     // Refs for detecting clicks outside dropdown/modal
//     const filterModalRef = useRef(null);
//     const dropdownRefs = useRef({});

//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null);
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//                 setFilteredPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results = [...payments];

//         // Apply search filter (user name and email)
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             results = results.filter(payment => parseFloat(payment.amountToAdd) === amount);
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }


//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA, valueB;

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField];
//                     valueB = b[sortField];
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

//         setFilteredPayments(results);
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);

//     // Handle clicks outside dropdowns and modals
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             // Close filter modal if clicked outside
//             if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setShowFilterModal(false);
//             }

//             // Close dropdowns if clicked outside
//             if (openDropdown) {
//                 const currentRef = dropdownRefs.current[openDropdown];
//                 if (currentRef && !currentRef.contains(event.target)) {
//                     setOpenDropdown(null);
//                 }
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [openDropdown, showFilterModal]);

//     const handleStatusChange = async (paymentId, newStatus) => {
//         setOpenDropdown(null);
//         setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: true }));
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await axios.put(`/admin/payments/${paymentId}/status`, { status: newStatus }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update both payments arrays
//             const updatedPayments = payments.map(payment =>
//                 payment._id === paymentId ? { ...payment, status: newStatus } : payment
//             );
//             setPayments(updatedPayments);

//             setSuccessMessage(`Payment status updated to ${newStatus}`);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: false }));
//         }
//     };

//     const toggleSort = (field) => {
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
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-700 bg-green-300 ';
//             case 'pending':
//                 return 'text-yellow-700 bg-yellow-300 ';
//             case 'in progress':
//                 return 'text-blue-700 bg-blue-300 ';
//             case 'canceled':
//                 return 'text-red-700 bg-red-300 ';
//             default:
//                 return 'text-gray-700 bg-gray-300 ';
//         }
//     };

//     const currencyOptions = ['all', ...Array.from(new Set(payments.map(p => p.payInCurrency?.code).filter(Boolean)))];
//     const statusOptions = ['all', 'pending', 'in progress', 'completed', 'canceled'];


//     if (loadingPayments) {
//         return (
//             <div className="container mx-auto px-4 py-8 max-w-7xl">
//                 <h1 className="text-2xl font-bold text-main mb-4">Payment Management</h1>
//                 <div className="space-y-4">
//                     <div><Skeleton className="h-10 w-64" /></div>
//                     <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Array(5).fill(0).map((_, i) => (
//                                     <tr key={i} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     }


//     return (
//         <div className="container mx-auto px-4 py-8 max-w-7xl relative"> {/* Make container relative for filter sidebar positioning */}
//             <div className="space-y-6">
//                 <div className="flex justify-between items-start">
//                     <h1 className="text-2xl font-bold text-main">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User Name or Email..."
//                                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <div> {/* Removed relative here */}
//                             <button
//                                 onClick={() => setShowFilterModal(true)}
//                                 className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
//                             >
//                                 <Filter size={18} />
//                                 Filters
//                             </button>
//                         </div>
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


//                 {/* Payments Table */}
//                 <div
//                     className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
//                 >
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('_id')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Payment ID
//                                                 {sortField === '_id' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('user')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 User
//                                                 {sortField === 'user' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('amount')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Amount
//                                                 {sortField === 'amount' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('status')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Status
//                                                 {sortField === 'status' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredPayments.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
//                                             No payments found matching your filters.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredPayments.map((payment, index) => (
//                                         <motion.tr
//                                             key={payment._id}
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: index * 0.05 }}
//                                             className="hover:bg-gray-50"
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className="flex flex-col">
//                                                     <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
//                                                     <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                 {payment.amountToAdd}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {payment.payInCurrency?.code || 'N/A'}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
//                                                     {payment.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                 <div className="relative" ref={el => dropdownRefs.current[payment._id] = el}>
//                                                     <motion.button>
//                                                         <motion.button
//                                                             whileHover={{ scale: 1.05 }}
//                                                             whileTap={{ scale: 0.95 }}
//                                                             onClick={() => setOpenDropdown(openDropdown === payment._id ? null : payment._id)}
//                                                             className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex items-center"
//                                                             disabled={statusUpdateLoading[payment._id]}
//                                                         >
//                                                             {statusUpdateLoading[payment._id] ? (
//                                                                 <span>Updating...</span>
//                                                             ) : (
//                                                                 <>
//                                                                     Update Status <ChevronDown size={16} className="ml-1" />
//                                                                 </>
//                                                             )}
//                                                         </motion.button>
//                                                     </motion.button>

//                                                     <AnimatePresence>
//                                                         {openDropdown === payment._id && (
//                                                             <motion.div
//                                                                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                                 transition={{ duration: 0.15 }}
//                                                                 className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200 py-1 overflow-hidden"
//                                                             >
//                                                                 {['pending', 'in progress', 'completed', 'canceled'].map((status) => (
//                                                                     <motion.button
//                                                                         key={status}
//                                                                         whileHover={{ backgroundColor: '#F3F4F6' }}
//                                                                         onClick={() => handleStatusChange(payment._id, status)}
//                                                                         className="w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center justify-between"
//                                                                     >
//                                                                         {status}
//                                                                         {payment.status === status && (
//                                                                             <Check size={16} className="text-indigo-600" />
//                                                                         )}
//                                                                     </motion.button>
//                                                                 ))}
//                                                             </motion.div>
//                                                         )}
//                                                     </AnimatePresence>
//                                                 </div>
//                                             </td>
//                                         </motion.tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Filter Sidebar */}
//             <AnimatePresence>
//                 {showFilterModal && (
//                     <motion.div
//                         ref={filterModalRef}
//                         initial={{ opacity: 0, x: '100%' }}
//                         animate={{ opacity: 1, x: '0%' }}
//                         exit={{ opacity: 0, x: '100%' }}
//                         transition={{ duration: 0.3 }}
//                         className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                     >
//                         <div className="p-6 border-b border-gray-200">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                                 <button
//                                     onClick={() => setShowFilterModal(false)}
//                                     className="text-gray-400 hover:text-gray-500"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="p-6 space-y-6">
//                             {/* Payment ID Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Payment ID
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={paymentIdFilter}
//                                     onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                     placeholder="Filter by Payment ID"
//                                     className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                                 />
//                             </div>
//                             {/* Amount Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Amount
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={amountFilter}
//                                     onChange={(e) => setAmountFilter(e.target.value)}
//                                     placeholder="Filter by Amount"
//                                     className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                                 />
//                             </div>

//                             {/* Currency Filter - Custom Dropdown */}
//                             <CustomDropdown
//                                 label="Currency"
//                                 value={currencyFilter === 'all' ? null : currencyFilter} // Pass null if 'all' is selected for default text
//                                 onChange={setCurrencyFilter}
//                                 options={currencyOptions}
//                             />

//                             {/* Status Filter - Custom Dropdown */}
//                             <CustomDropdown
//                                 label="Status"
//                                 value={statusFilter === 'all' ? null : statusFilter} // Pass null if 'all' is selected for default text
//                                 onChange={setStatusFilter}
//                                 options={statusOptions}
//                             />


//                             {/* Date Range Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Date Range
//                                 </label>
//                                 <div className="relative">
//                                     <button className='w-full'>
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowCalendar(!showCalendar)}
//                                             className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                                         >
//                                             <span>
//                                                 {dateRange.from ? (
//                                                     dateRange.to ? (
//                                                         `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                     ) : (
//                                                         `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                     )
//                                                 ) : dateRange.to ? (
//                                                     `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     'Select date range'
//                                                 )}
//                                             </span>
//                                             <CalendarIcon className="size-5 text-gray-400" />
//                                         </button>
//                                     </button>

//                                     <AnimatePresence>
//                                         {showCalendar && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: 10 }}
//                                                 className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                                             >
//                                                 <Calendar
//                                                     mode="range"
//                                                     selected={dateRange}
//                                                     onSelect={(range) => {
//                                                         setDateRange(range);
//                                                         setShowCalendar(false);
//                                                     }}
//                                                 />
//                                                 {(dateRange.from || dateRange.to) && (
//                                                     <div className="mt-2 flex justify-end">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => {
//                                                                 setDateRange({ from: null, to: null });
//                                                                 setShowCalendar(false);
//                                                             }}
//                                                             className="text-sm text-error"
//                                                         >
//                                                             Clear dates
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="px-6 flex justify-end gap-3">
//                             <button
//                                 type="button"
//                                 onClick={clearFilters}
//                                 className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none"
//                             >
//                                 Clear All
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none"
//                             >
//                                 Apply Filters
//                             </button>
//                         </div>
//                         {/* Applied Filters Display inside Sidebar */}
//                         <div className="px-6 py-4">
//                             <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                             <div className="space-y-2">
//                                 {searchTerm && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>User Search: {searchTerm}</span>
//                                         <button onClick={() => setSearchTerm('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {paymentIdFilter && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Payment ID: {paymentIdFilter}</span>
//                                         <button onClick={() => setPaymentIdFilter('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {amountFilter && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Amount: {amountFilter}</span>
//                                         <button onClick={() => setAmountFilter('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {currencyFilter && currencyFilter !== 'all' && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Currency: {currencyFilter}</span>
//                                         <button onClick={() => setCurrencyFilter('all')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {statusFilter !== 'all' && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Status: {statusFilter}</span>
//                                         <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {(dateRange.from || dateRange.to) && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                             {dateRange.from && dateRange.to ? ' - ' : ''}
//                                             {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                         </span>
//                                         <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div >
//     );
// };

// export default AdminPaymentsPage;


// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp, Edit } from 'lucide-react';

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Custom Dropdown Component
// const CustomDropdown = ({ label, value, onChange, options }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     return (
//         <div>
//             <label className="block font-medium text-gray-700 mb-1">{label}</label>
//             <div className="relative">
//                 <button
//                     type="button"
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm px-4 py-3 bg-white font-medium text-main focus:outline-none"
//                 >
//                     <span>{value || `All ${label}s`}</span>
//                     <ChevronDown className="size-5 text-gray-400" />
//                 </button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.ul
//                             ref={dropdownRef}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200 overflow-hidden"
//                         >
//                             {options.map((option) => (
//                                 <motion.li
//                                     key={option}
//                                     onClick={() => { onChange(option); setIsOpen(false); }}
//                                     className="px-4 py-3 text-sm text-gray-700 font-medium cursor-pointer flex justify-between items-center"
//                                 >
//                                     {option === 'all' ? `All ${label}s` : option}
//                                     {value === option && <Check className="text-indigo-600" size={16} />}
//                                 </motion.li>
//                             ))}
//                         </motion.ul>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateRange, setDateRange] = useState({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [paymentIdFilter, setPaymentIdFilter] = useState('');
//     const [amountFilter, setAmountFilter] = useState('');
//     const [currencyFilter, setCurrencyFilter] = useState('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState(null);
//     const [editFormData, setEditFormData] = useState({
//         referenceCode: '',
//         amountToAdd: '',
//         payInCurrencyCode: '',
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState(false);

//     // Sorting
//     const [sortField, setSortField] = useState(null);
//     const [sortDirection, setSortDirection] = useState('asc');

//     // Refs for detecting clicks outside dropdown/modal
//     const filterModalRef = useRef(null);
//     const editModalRef = useRef(null);


//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null);
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//                 setFilteredPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results = [...payments];

//         // Apply search filter (user name and email)
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             results = results.filter(payment => parseFloat(payment.amountToAdd) === amount);
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }


//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA, valueB;

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField];
//                     valueB = b[sortField];
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

//         setFilteredPayments(results);
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);

//     // Handle clicks outside dropdowns and modals
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             // Close filter modal if clicked outside
//             if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setShowFilterModal(false);
//             }
//             // Close edit modal if clicked outside
//             if (isEditModalOpen && editModalRef.current && !editModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setIsEditModalOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showFilterModal, isEditModalOpen]);


//     const toggleSort = (field) => {
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
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-700 bg-green-300 ';
//             case 'pending':
//                 return 'text-yellow-700 bg-yellow-300 ';
//             case 'in progress':
//                 return 'text-blue-700 bg-blue-300 ';
//             case 'canceled':
//                 return 'text-red-700 bg-red-300 ';
//             default:
//                 return 'text-gray-700 bg-gray-300 ';
//         }
//     };

//     const currencyOptions = ['all', ...Array.from(new Set(payments.map(p => p.payInCurrency?.code).filter(Boolean)))];
//     const statusOptions = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             referenceCode: payment.referenceCode || '',
//             amountToAdd: String(payment.amountToAdd || ''),
//             payInCurrencyCode: payment.payInCurrency?.code || '',
//             status: payment.status || ''
//         });
//         setIsEditModalOpen(true);
//     };

//     const handleInputChange = (e) => {
//         setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
//     };

//     const handleCurrencyChange = (currencyCode) => {
//         setEditFormData({ ...editFormData, payInCurrencyCode: currencyCode });
//     };
//     const handleStatusDropdownChange = (status) => {
//         setEditFormData({ ...editFormData, status: status });
//     };


//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         try {
//             const payload = {
//                 referenceCode: editFormData.referenceCode,
//                 amountToAdd: parseFloat(editFormData.amountToAdd),
//                 payInCurrency: editFormData.payInCurrencyCode ? { code: editFormData.payInCurrencyCode } : undefined,
//                 status: editFormData.status
//             };

//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update payments state
//             const updatedPayments = payments.map(payment =>
//                 payment._id === selectedPaymentForEdit._id ? {
//                     ...payment,
//                     referenceCode: editFormData.referenceCode,
//                     amountToAdd: parseFloat(editFormData.amountToAdd),
//                     payInCurrency: editFormData.payInCurrencyCode ? { code: editFormData.payInCurrencyCode } : payment.payInCurrency,
//                     status: editFormData.status
//                 } : payment
//             );
//             setPayments(updatedPayments);
//             setFilteredPayments(updatedPayments); // Keep filtered payments in sync

//             setSuccessMessage('Payment updated successfully!');
//             setIsEditModalOpen(false);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment');
//             console.error("Error updating payment:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };


//     if (loadingPayments) {
//         return (
//             <div className="container mx-auto px-4 py-8 max-w-7xl">
//                 <h1 className="text-2xl font-bold text-main mb-4">Payment Management</h1>
//                 <div className="space-y-4">
//                     <div><Skeleton className="h-10 w-64" /></div>
//                     <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Array(5).fill(0).map((_, i) => (
//                                     <tr key={i} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     }


//     return (
//         <div className="container mx-auto px-4 py-8 max-w-7xl relative">
//             <div className="space-y-6">
//                 <div className="flex justify-between items-start">
//                     <h1 className="text-2xl font-bold text-main">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User Name or Email..."
//                                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <div>
//                             <button
//                                 onClick={() => setShowFilterModal(true)}
//                                 className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
//                             >
//                                 <Filter size={18} />
//                                 Filters
//                             </button>
//                         </div>
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


//                 {/* Payments Table */}
//                 <div
//                     className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
//                 >
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('_id')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Payment ID
//                                                 {sortField === '_id' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('user')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 User
//                                                 {sortField === 'user' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('amount')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Amount
//                                                 {sortField === 'amount' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('status')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Status
//                                                 {sortField === 'status' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredPayments.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
//                                             No payments found matching your filters.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredPayments.map((payment, index) => (
//                                         <motion.tr
//                                             key={payment._id}
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: index * 0.05 }}
//                                             className="hover:bg-gray-50"
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className="flex flex-col">
//                                                     <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
//                                                     <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                 {payment.amountToAdd}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {payment.payInCurrency?.code || 'N/A'}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
//                                                     {payment.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                 <motion.button
//                                                     whileHover={{ scale: 1.05 }}
//                                                     whileTap={{ scale: 0.95 }}
//                                                     onClick={() => handleEditPayment(payment)}
//                                                     className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex items-center"
//                                                 >
//                                                     <Edit size={16} className="mr-1" />
//                                                     Edit
//                                                 </motion.button>
//                                             </td>
//                                         </motion.tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Edit Payment Modal */}
//             <AnimatePresence>
//                 {isEditModalOpen && selectedPaymentForEdit && (
//                     <motion.div
//                         ref={editModalRef}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50"
//                     >
//                         <motion.div
//                             initial={{ y: 100, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             exit={{ y: 50, opacity: 0 }}
//                             className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md"
//                         >
//                             <div className="mb-6">
//                                 <h2 className="text-lg font-semibold text-gray-800">Edit Payment Details</h2>
//                             </div>

//                             <div className="space-y-4">
//                                 <div>
//                                     <label htmlFor="paymentId" className="block font-medium text-gray-700 mb-1">Payment ID</label>
//                                     <input
//                                         type="text"
//                                         id="paymentId"
//                                         name="paymentId"
//                                         value={selectedPaymentForEdit._id}
//                                         className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
//                                         disabled
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="referenceCode" className="block font-medium text-gray-700 mb-1">Reference Code</label>
//                                     <input
//                                         type="text"
//                                         id="referenceCode"
//                                         name="referenceCode"
//                                         value={editFormData.referenceCode}
//                                         onChange={handleInputChange}
//                                         className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="amountToAdd" className="block font-medium text-gray-700 mb-1">Amount</label>
//                                     <input
//                                         type="number"
//                                         id="amountToAdd"
//                                         name="amountToAdd"
//                                         value={editFormData.amountToAdd}
//                                         onChange={handleInputChange}
//                                         className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
//                                     />
//                                 </div>
//                                 <div>
//                                     <CustomDropdown
//                                         label="Currency"
//                                         value={editFormData.payInCurrencyCode || null}
//                                         onChange={handleCurrencyChange}
//                                         options={currencyOptions.filter(opt => opt !== 'all')} // Exclude 'all' option
//                                     />
//                                 </div>
//                                 <div>
//                                     <CustomDropdown
//                                         label="Status"
//                                         value={editFormData.status || null}
//                                         onChange={handleStatusDropdownChange}
//                                         options={statusOptions.filter(opt => opt !== 'all')} // Exclude 'all' option
//                                     />
//                                 </div>
//                             </div>

//                             <div className="mt-6 flex justify-end space-x-2">
//                                 <button
//                                     onClick={() => setIsEditModalOpen(false)}
//                                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleSaveEdit}
//                                     disabled={editLoading}
//                                     className={`px-4 py-2 bg-primary text-secondary rounded-md hover:bg-primary-hover focus:outline-none ${editLoading ? 'opacity-50 cursor-wait' : ''}`}
//                                 >
//                                     {editLoading ? 'Saving...' : 'Save'}
//                                 </button>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>


//             {/* Filter Sidebar */}
//             <AnimatePresence>
//                 {showFilterModal && (
//                     <motion.div
//                         ref={filterModalRef}
//                         initial={{ opacity: 0, x: '100%' }}
//                         animate={{ opacity: 1, x: '0%' }}
//                         exit={{ opacity: 0, x: '100%' }}
//                         transition={{ duration: 0.3 }}
//                         className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                     >
//                         <div className="p-6 border-b border-gray-200">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                                 <button
//                                     onClick={() => setShowFilterModal(false)}
//                                     className="text-gray-400 hover:text-gray-500"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="p-6 space-y-6">
//                             {/* Payment ID Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Payment ID
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={paymentIdFilter}
//                                     onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                     placeholder="Filter by Payment ID"
//                                     className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                                 />
//                             </div>
//                             {/* Amount Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Amount
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={amountFilter}
//                                     onChange={(e) => setAmountFilter(e.target.value)}
//                                     placeholder="Filter by Amount"
//                                     className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                                 />
//                             </div>

//                             {/* Currency Filter - Custom Dropdown */}
//                             <CustomDropdown
//                                 label="Currency"
//                                 value={currencyFilter === 'all' ? null : currencyFilter}
//                                 onChange={setCurrencyFilter}
//                                 options={currencyOptions}
//                             />

//                             {/* Status Filter - Custom Dropdown */}
//                             <CustomDropdown
//                                 label="Status"
//                                 value={statusFilter === 'all' ? null : statusFilter}
//                                 onChange={setStatusFilter}
//                                 options={statusOptions}
//                             />


//                             {/* Date Range Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Date Range
//                                 </label>
//                                 <div className="relative">
//                                     <button className='w-full'>
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowCalendar(!showCalendar)}
//                                             className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                                         >
//                                             <span>
//                                                 {dateRange.from ? (
//                                                     dateRange.to ? (
//                                                         `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                     ) : (
//                                                         `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                     )
//                                                 ) : dateRange.to ? (
//                                                     `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     'Select date range'
//                                                 )}
//                                             </span>
//                                             <CalendarIcon className="size-5 text-gray-400" />
//                                         </button>
//                                     </button>

//                                     <AnimatePresence>
//                                         {showCalendar && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: 10 }}
//                                                 className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                                             >
//                                                 <Calendar
//                                                     mode="range"
//                                                     selected={dateRange}
//                                                     onSelect={(range) => {
//                                                         setDateRange(range);
//                                                         setShowCalendar(false);
//                                                     }}
//                                                 />
//                                                 {(dateRange.from || dateRange.to) && (
//                                                     <div className="mt-2 flex justify-end">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => {
//                                                                 setDateRange({ from: null, to: null });
//                                                                 setShowCalendar(false);
//                                                             }}
//                                                             className="text-sm text-error"
//                                                         >
//                                                             Clear dates
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="px-6 flex justify-end gap-3">
//                             <button
//                                 type="button"
//                                 onClick={clearFilters}
//                                 className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Clear All
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Apply Filters
//                             </button>
//                         </div>
//                         {/* Applied Filters Display inside Sidebar */}
//                         <div className="px-6 py-4">
//                             <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                             <div className="space-y-2">
//                                 {searchTerm && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>User Search: {searchTerm}</span>
//                                         <button onClick={() => setSearchTerm('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {paymentIdFilter && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Payment ID: {paymentIdFilter}</span>
//                                         <button onClick={() => setPaymentIdFilter('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {amountFilter && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Amount: {amountFilter}</span>
//                                         <button onClick={() => setAmountFilter('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {currencyFilter && currencyFilter !== 'all' && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Currency: {currencyFilter}</span>
//                                         <button onClick={() => setCurrencyFilter('all')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {statusFilter !== 'all' && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Status: {statusFilter}</span>
//                                         <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {(dateRange.from || dateRange.to) && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                             {dateRange.from && dateRange.to ? ' - ' : ''}
//                                             {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                         </span>
//                                         <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div >
//     );
// };

// export default AdminPaymentsPage;


// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp, Edit } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";


// axios.defaults.baseURL = apiConfig.baseUrl;

// // Custom Dropdown Component
// const CustomDropdown = ({ label, value, onChange, options }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     return (
//         <div>
//             <label className="block font-medium text-gray mb-1">{label}</label>
//             <div className="relative">
//                 <button
//                     type="button"
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="flex items-center justify-between capitalize cursor-pointer w-full border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-main focus:outline-none"
//                 >
//                     <span>{value || `All ${label}s`}</span>
//                     <ChevronDown className="size-6 text-gray-400" />
//                 </button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.ul
//                             ref={dropdownRef}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             className="absolute mt-2 w-full capitalize bg-white rounded-md shadow-lg z-10 border border-gray-300 overflow-hidden"
//                         >
//                             {options.map((option) => (
//                                 <motion.li
//                                     key={option}
//                                     onClick={() => { onChange(option); setIsOpen(false); }}
//                                     className="px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium cursor-pointer flex justify-between items-center"
//                                 >
//                                     {option === 'all' ? `All ${label}s` : option}
//                                     {value === option && <GiCheckMark className="text-gray" size={20} />}
//                                 </motion.li>
//                             ))}
//                         </motion.ul>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateRange, setDateRange] = useState({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [paymentIdFilter, setPaymentIdFilter] = useState('');
//     const [amountFilter, setAmountFilter] = useState('');
//     const [currencyFilter, setCurrencyFilter] = useState('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState(null);
//     const [editFormData, setEditFormData] = useState({
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState(false);

//     // Sorting
//     const [sortField, setSortField] = useState(null);
//     const [sortDirection, setSortDirection] = useState('asc');

//     // Refs for detecting clicks outside dropdown/modal
//     const filterModalRef = useRef(null);
//     const editModalRef = useRef(null);


//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null);
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//                 setFilteredPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results = [...payments];

//         // Apply search filter (user name and email)
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             results = results.filter(payment => parseFloat(payment.amountToAdd) === amount);
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }


//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA, valueB;

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField];
//                     valueB = b[sortField];
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

//         setFilteredPayments(results);
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);

//     // Handle clicks outside dropdowns and modals
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             // Close filter modal if clicked outside
//             if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setShowFilterModal(false);
//             }
//             // Close edit modal if clicked outside
//             if (isEditModalOpen && editModalRef.current && !editModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setIsEditModalOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showFilterModal, isEditModalOpen]);


//     const toggleSort = (field) => {
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
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-700 bg-green-300 ';
//             case 'pending':
//                 return 'text-yellow-700 bg-yellow-300 ';
//             case 'in progress':
//                 return 'text-blue-700 bg-blue-300 ';
//             case 'canceled':
//                 return 'text-red-700 bg-red-300 ';
//             default:
//                 return 'text-gray-700 bg-gray-300 ';
//         }
//     };

//     const currencyOptions = ['all', ...Array.from(new Set(payments.map(p => p.payInCurrency?.code).filter(Boolean)))];
//     const statusOptions = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || ''
//         });
//         setIsEditModalOpen(true);
//     };


//     const handleStatusDropdownChange = (status) => {
//         setEditFormData({ ...editFormData, status: status });
//     };


//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         try {
//             // Payload to update ONLY the status
//             const payload = {
//                 status: editFormData.status
//             };

//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update payments state - ONLY update the status
//             const updatedPayments = payments.map(payment =>
//                 payment._id === selectedPaymentForEdit._id ? {
//                     ...payment,
//                     status: editFormData.status
//                 } : payment
//             );
//             setPayments(updatedPayments);
//             setFilteredPayments(updatedPayments); // Keep filtered payments in sync

//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };


//     if (loadingPayments) {
//         return (
//             <div className="container mx-auto px-4 py-8 max-w-6xl">
//                 <h1 className="text-2xl font-bold text-main mb-4">Payment Management</h1>
//                 <div className="space-y-4">
//                     <div><Skeleton className="h-10 w-64" /></div>
//                     <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Array(5).fill(0).map((_, i) => (
//                                     <tr key={i} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     }


//     return (
//         <div className="container mx-auto px-4 py-8 max-w-7xl relative">
//             <div className="space-y-6">
//                 <div className="flex justify-between items-start">
//                     <h1 className="text-2xl font-bold text-main">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User Name or Email..."
//                                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <div>
//                             <button
//                                 onClick={() => setShowFilterModal(true)}
//                                 className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
//                             >
//                                 <Filter size={18} />
//                                 Filters
//                             </button>
//                         </div>
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


//                 {/* Payments Table */}
//                 <div
//                     className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
//                 >
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('_id')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Payment ID
//                                                 {sortField === '_id' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('user')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 User
//                                                 {sortField === 'user' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('amount')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Amount
//                                                 {sortField === 'amount' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('status')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Status
//                                                 {sortField === 'status' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredPayments.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
//                                             No payments found matching your filters.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredPayments.map((payment, index) => (
//                                         <motion.tr
//                                             key={payment._id}
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: index * 0.05 }}
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className="flex flex-col">
//                                                     <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
//                                                     <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                 {payment.amountToAdd}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {payment.payInCurrency?.code || 'N/A'}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
//                                                     {payment.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                 <motion.button
//                                                     onClick={() => handleEditPayment(payment)}
//                                                     className="bg-white border border-error cursor-pointer rounded-md px-6 py-2 font-medium text-error focus:outline-none flex items-center"
//                                                 >
//                                                     <Edit size={18} className="mr-1" />
//                                                     Edit
//                                                 </motion.button>
//                                             </td>
//                                         </motion.tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Edit Payment Modal */}
//             <AnimatePresence>
//                 {isEditModalOpen && selectedPaymentForEdit && (
//                     <motion.div
//                         ref={editModalRef}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50"
//                     >
//                         <motion.div
//                             initial={{ y: 50, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             exit={{ y: 50, opacity: 0 }}
//                             className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md"
//                         >
//                             <div className="mb-6">
//                                 <h2 className="text-xl font-semibold text-main">Edit Payment Status</h2>
//                             </div>

//                             <div className="space-y-4">
//                                 <div>
//                                     <CustomDropdown
//                                         label="Status"
//                                         value={editFormData.status || null}
//                                         onChange={handleStatusDropdownChange}
//                                         options={statusOptions.filter(opt => opt !== 'all')}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="paymentId" className="block font-medium text-gray-700 mb-1">Payment ID</label>
//                                     <input
//                                         type="text"
//                                         id="paymentId"
//                                         name="paymentId"
//                                         value={selectedPaymentForEdit._id.substring(0, 10) + '...'}
//                                         className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                         disabled
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="referenceCode" className="block font-medium text-gray-700 mb-1">Reference Code</label>
//                                     <input
//                                         type="text"
//                                         id="referenceCode"
//                                         name="referenceCode"
//                                         value={selectedPaymentForEdit.referenceCode || 'N/A'}
//                                         className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                         disabled
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="amountToAdd" className="block font-medium text-gray-700 mb-1">Amount</label>
//                                     <input
//                                         type="number"
//                                         id="amountToAdd"
//                                         name="amountToAdd"
//                                         value={selectedPaymentForEdit.amountToAdd}
//                                         className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                         disabled
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="currency" className="block font-medium text-gray-700 mb-1">Currency</label>
//                                     <input
//                                         type="text"
//                                         id="currency"
//                                         name="currency"
//                                         value={selectedPaymentForEdit.payInCurrency?.code || 'N/A'}
//                                         className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                         disabled
//                                     />
//                                 </div>
//                             </div>

//                             <div className="mt-6 flex justify-end space-x-2">
//                                 <button
//                                     onClick={() => setIsEditModalOpen(false)}
//                                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleSaveEdit}
//                                     disabled={editLoading}
//                                     className={`px-4 py-2 bg-primary text-secondary rounded-md hover:bg-primary-hover focus:outline-none ${editLoading ? 'opacity-50 cursor-wait' : ''}`}
//                                 >
//                                     {editLoading ? 'Saving...' : 'Save'}
//                                 </button>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>


//             {/* Filter Sidebar */}
//             <AnimatePresence>
//                 {showFilterModal && (
//                     <motion.div
//                         ref={filterModalRef}
//                         initial={{ opacity: 0, x: '100%' }}
//                         animate={{ opacity: 1, x: '0%' }}
//                         exit={{ opacity: 0, x: '100%' }}
//                         transition={{ duration: 0.3 }}
//                         className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                     >
//                         <div className="p-6 border-b border-gray-200">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                                 <button
//                                     onClick={() => setShowFilterModal(false)}
//                                     className="text-gray-400 hover:text-gray-500"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="p-6 space-y-6">
//                             {/* Payment ID Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Payment ID
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={paymentIdFilter}
//                                     onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                     placeholder="Filter by Payment ID"
//                                     className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                                 />
//                             </div>
//                             {/* Amount Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Amount
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={amountFilter}
//                                     onChange={(e) => setAmountFilter(e.target.value)}
//                                     placeholder="Filter by Amount"
//                                     className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                                 />
//                             </div>

//                             {/* Currency Filter - Custom Dropdown */}
//                             <CustomDropdown
//                                 label="Currency"
//                                 value={currencyFilter === 'all' ? null : currencyFilter}
//                                 onChange={setCurrencyFilter}
//                                 options={currencyOptions}
//                             />

//                             {/* Status Filter - Custom Dropdown */}
//                             <CustomDropdown
//                                 label="Status"
//                                 value={statusFilter === 'all' ? null : statusFilter}
//                                 onChange={setStatusFilter}
//                                 options={statusOptions}
//                             />


//                             {/* Date Range Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Date Range
//                                 </label>
//                                 <div className="relative">
//                                     <button className='w-full'>
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowCalendar(!showCalendar)}
//                                             className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                                         >
//                                             <span>
//                                                 {dateRange.from ? (
//                                                     dateRange.to ? (
//                                                         `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                     ) : (
//                                                         `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                     )
//                                                 ) : dateRange.to ? (
//                                                     `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     'Select date range'
//                                                 )}
//                                             </span>
//                                             <CalendarIcon className="size-5 text-gray-400" />
//                                         </button>
//                                     </button>

//                                     <AnimatePresence>
//                                         {showCalendar && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: 10 }}
//                                                 className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                                             >
//                                                 <Calendar
//                                                     mode="range"
//                                                     selected={dateRange}
//                                                     onSelect={(range) => {
//                                                         setDateRange(range);
//                                                         setShowCalendar(false);
//                                                     }}
//                                                 />
//                                                 {(dateRange.from || dateRange.to) && (
//                                                     <div className="mt-2 flex justify-end">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => {
//                                                                 setDateRange({ from: null, to: null });
//                                                                 setShowCalendar(false);
//                                                             }}
//                                                             className="text-sm text-error"
//                                                         >
//                                                             Clear dates
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="px-6 flex justify-end gap-3">
//                             <button
//                                 type="button"
//                                 onClick={clearFilters}
//                                 className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Clear All
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Apply Filters
//                             </button>
//                         </div>
//                         {/* Applied Filters Display inside Sidebar */}
//                         <div className="px-6 py-4">
//                             <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                             <div className="space-y-2">
//                                 {searchTerm && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>User Search: {searchTerm}</span>
//                                         <button onClick={() => setSearchTerm('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {paymentIdFilter && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Payment ID: {paymentIdFilter}</span>
//                                         <button onClick={() => setPaymentIdFilter('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {amountFilter && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Amount: {amountFilter}</span>
//                                         <button onClick={() => setAmountFilter('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {currencyFilter && currencyFilter !== 'all' && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Currency: {currencyFilter}</span>
//                                         <button onClick={() => setCurrencyFilter('all')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {statusFilter !== 'all' && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Status: {statusFilter}</span>
//                                         <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {(dateRange.from || dateRange.to) && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                             {dateRange.from && dateRange.to ? ' - ' : ''}
//                                             {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                         </span>
//                                         <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div >
//     );
// };

// export default AdminPaymentsPage;

// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp, Edit } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Custom Dropdown Component
// const CustomDropdown = ({ label, value, onChange, options }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     return (
//         <div>
//             <label className="block font-medium text-gray mb-1">{label}</label>
//             <div className="relative">
//                 <button
//                     type="button"
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="flex items-center justify-between capitalize cursor-pointer w-full border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-main focus:outline-none"
//                 >
//                     <span>{value || `All ${label}s`}</span>
//                     <ChevronDown className="size-6 text-gray-400" />
//                 </button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.ul
//                             ref={dropdownRef}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             className="absolute mt-2 w-full capitalize bg-white rounded-md shadow-lg z-10 border border-gray-300 overflow-hidden"
//                         >
//                             {options.map((option) => (
//                                 <motion.li
//                                     key={option}
//                                     onClick={() => { onChange(option); setIsOpen(false); }}
//                                     className="px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium cursor-pointer flex justify-between items-center"
//                                 >
//                                     {option === 'all' ? `All ${label}s` : option}
//                                     {value === option && <GiCheckMark className="text-gray" size={20} />}
//                                 </motion.li>
//                             ))}
//                         </motion.ul>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateRange, setDateRange] = useState({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [paymentIdFilter, setPaymentIdFilter] = useState('');
//     const [amountFilter, setAmountFilter] = useState('');
//     const [currencyFilter, setCurrencyFilter] = useState('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState(null);
//     const [editFormData, setEditFormData] = useState({
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState(false);

//     // Sorting
//     const [sortField, setSortField] = useState(null);
//     const [sortDirection, setSortDirection] = useState('asc');

//     // Refs for detecting clicks outside dropdown/modal
//     const filterModalRef = useRef(null);
//     const editModalRef = useRef(null);


//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null);
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//                 setFilteredPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results = [...payments];

//         // Apply search filter (user name and email)
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             results = results.filter(payment => parseFloat(payment.amountToAdd) === amount);
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }


//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA, valueB;

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField];
//                     valueB = b[sortField];
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

//         setFilteredPayments(results);
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);

//     // Handle clicks outside dropdowns and modals
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             // Close filter modal if clicked outside
//             if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setShowFilterModal(false);
//             }
//             // Close edit modal if clicked outside
//             if (isEditModalOpen && editModalRef.current && !editModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setIsEditModalOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showFilterModal, isEditModalOpen]);


//     const toggleSort = (field) => {
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
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-700 bg-green-300 ';
//             case 'pending':
//                 return 'text-yellow-700 bg-yellow-300 ';
//             case 'in progress':
//                 return 'text-blue-700 bg-blue-300 ';
//             case 'canceled':
//                 return 'text-red-700 bg-red-300 ';
//             default:
//                 return 'text-gray-700 bg-gray-300 ';
//         }
//     };

//     const currencyOptions = ['all', ...Array.from(new Set(payments.map(p => p.payInCurrency?.code).filter(Boolean)))];
//     const statusOptions = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || ''
//         });
//         setIsEditModalOpen(true);
//     };


//     const handleStatusDropdownChange = (status) => {
//         setEditFormData({ ...editFormData, status: status });
//     };


//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         try {
//             // Payload to update ONLY the status
//             const payload = {
//                 status: editFormData.status
//             };

//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update payments state - ONLY update the status
//             const updatedPayments = payments.map(payment =>
//                 payment._id === selectedPaymentForEdit._id ? {
//                     ...payment,
//                     status: editFormData.status
//                 } : payment
//             );
//             setPayments(updatedPayments);
//             setFilteredPayments(updatedPayments); // Keep filtered payments in sync

//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };


//     if (loadingPayments) {
//         return (
//             <div className="container mx-auto px-4 py-8 max-w-6xl">
//                 <h1 className="text-2xl font-bold text-main mb-4">Payment Management</h1>
//                 <div className="space-y-4">
//                     <div><Skeleton className="h-10 w-64" /></div>
//                     <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Array(5).fill(0).map((_, i) => (
//                                     <tr key={i} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     }


//     return (
//         <div className="container mx-auto px-4 py-8 max-w-7xl relative">
//             <div className="space-y-6">
//                 <div className="flex justify-between items-start">
//                     <h1 className="text-2xl font-bold text-main">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User Name or Email..."
//                                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <div>
//                             <button
//                                 onClick={() => setShowFilterModal(true)}
//                                 className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
//                             >
//                                 <Filter size={18} />
//                                 Filters
//                             </button>
//                         </div>
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


//                 {/* Payments Table */}
//                 <div
//                     className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
//                 >
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('_id')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Payment ID
//                                                 {sortField === '_id' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('user')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 User
//                                                 {sortField === 'user' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('amount')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Amount
//                                                 {sortField === 'amount' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
//                                         <button>
//                                             <button
//                                                 onClick={() => toggleSort('status')}
//                                                 className="flex items-center gap-1 hover:text-primary uppercase"
//                                             >
//                                                 Status
//                                                 {sortField === 'status' && (
//                                                     <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                 )}
//                                             </button>
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredPayments.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
//                                             No payments found matching your filters.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredPayments.map((payment, index) => (
//                                         <motion.tr
//                                             key={payment._id}
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: index * 0.05 }}
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className="flex flex-col">
//                                                     <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
//                                                     <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                 {payment.amountToAdd}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {payment.payInCurrency?.code || 'N/A'}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
//                                                     {payment.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                 <motion.button
//                                                     onClick={() => handleEditPayment(payment)}
//                                                     className="bg-white border border-error cursor-pointer rounded-md px-6 py-2 font-medium text-error focus:outline-none flex items-center"
//                                                 >
//                                                     <Edit size={18} className="mr-1" />
//                                                     Edit
//                                                 </motion.button>
//                                             </td>
//                                         </motion.tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Edit Payment Modal */}
//             <AnimatePresence>
//                 {isEditModalOpen && selectedPaymentForEdit && (
//                     <motion.div
//                         ref={editModalRef}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50"
//                     >
//                         <motion.div
//                             initial={{ y: 50, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             exit={{ y: 50, opacity: 0 }}
//                             className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md"
//                         >
//                             <div className="mb-6">
//                                 <h2 className="text-xl font-semibold text-main">Edit Payment Status</h2>
//                             </div>

//                             <div className="space-y-4">
//                                 <div className='bg-green/10 p-3 rounded-md'>
//                                     <label htmlFor="paymentId" className="block font-semibold text-main mb-1">Payment ID : </label>
//                                     <span className="font-medium text-gray-700">{selectedPaymentForEdit._id}</span>
//                                 </div>
//                                 <div className='bg-green/10 p-3 rounded-md'>
//                                     <label htmlFor="referenceCode" className="block font-semibold text-main mb-1">Reference Code</label>
//                                     <span className="font-medium text-gray-700">{selectedPaymentForEdit.referenceCode || 'N/A'}</span>
//                                 </div>
//                                 <div className='bg-green/10 p-3 rounded-md'>
//                                     <label htmlFor="amountToAdd" className="block font-semibold text-main mb-1">Amount</label>
//                                     <span className="font-medium text-gray-700">{selectedPaymentForEdit.amountToAdd}</span>
//                                 </div>
//                                 <div className='bg-green/10 p-3 rounded-md'>
//                                     <label htmlFor="currency" className="block font-semibold text-main mb-1">Currency</label>
//                                     <span className="font-medium text-gray-700">{selectedPaymentForEdit.payInCurrency?.code || 'N/A'}</span>
//                                 </div>
//                                 <div>
//                                     <CustomDropdown
//                                         label="Status"
//                                         value={editFormData.status || null}
//                                         onChange={handleStatusDropdownChange}
//                                         options={statusOptions.filter(opt => opt !== 'all')}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="mt-6 flex justify-end space-x-2">
//                                 <button
//                                     onClick={() => setIsEditModalOpen(false)}
//                                     className="px-4 w-full py-3 cursor-pointer bg-gray-300 text-gray-700 rounded-md focus:outline-none"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleSaveEdit}
//                                     disabled={editLoading}
//                                     className={`px-4 py-3 w-full cursor-pointer bg-primary text-secondary rounded-md hover:bg-primary-hover focus:outline-none ${editLoading ? 'opacity-50 cursor-wait' : ''}`}
//                                 >
//                                     {editLoading ? 'Saving...' : 'Save'}
//                                 </button>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>


//             {/* Filter Sidebar */}
//             <AnimatePresence>
//                 {showFilterModal && (
//                     <motion.div
//                         ref={filterModalRef}
//                         initial={{ opacity: 0, x: '100%' }}
//                         animate={{ opacity: 1, x: '0%' }}
//                         exit={{ opacity: 0, x: '100%' }}
//                         transition={{ duration: 0.3 }}
//                         className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                     >
//                         <div className="p-6 border-b border-gray-200">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                                 <button
//                                     onClick={() => setShowFilterModal(false)}
//                                     className="text-gray-400 hover:text-gray-500"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="p-6 space-y-6">
//                             {/* Payment ID Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Payment ID
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={paymentIdFilter}
//                                     onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                     placeholder="Filter by Payment ID"
//                                     className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                                 />
//                             </div>
//                             {/* Amount Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Amount
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={amountFilter}
//                                     onChange={(e) => setAmountFilter(e.target.value)}
//                                     placeholder="Filter by Amount"
//                                     className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                                 />
//                             </div>

//                             {/* Currency Filter - Custom Dropdown */}
//                             <CustomDropdown
//                                 label="Currency"
//                                 value={currencyFilter === 'all' ? null : currencyFilter}
//                                 onChange={setCurrencyFilter}
//                                 options={currencyOptions}
//                             />

//                             {/* Status Filter - Custom Dropdown */}
//                             <CustomDropdown
//                                 label="Status"
//                                 value={statusFilter === 'all' ? null : statusFilter}
//                                 onChange={setStatusFilter}
//                                 options={statusOptions}
//                             />


//                             {/* Date Range Filter */}
//                             <div>
//                                 <label className="block font-medium text-gray-700 mb-1">
//                                     Date Range
//                                 </label>
//                                 <div className="relative">
//                                     <button className='w-full'>
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowCalendar(!showCalendar)}
//                                             className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                                         >
//                                             <span>
//                                                 {dateRange.from ? (
//                                                     dateRange.to ? (
//                                                         `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                     ) : (
//                                                         `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                     )
//                                                 ) : dateRange.to ? (
//                                                     `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     'Select date range'
//                                                 )}
//                                             </span>
//                                             <CalendarIcon className="size-5 text-gray-400" />
//                                         </button>
//                                     </button>

//                                     <AnimatePresence>
//                                         {showCalendar && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: 10 }}
//                                                 className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                                             >
//                                                 <Calendar
//                                                     mode="range"
//                                                     selected={dateRange}
//                                                     onSelect={(range) => {
//                                                         setDateRange(range);
//                                                         setShowCalendar(false);
//                                                     }}
//                                                 />
//                                                 {(dateRange.from || dateRange.to) && (
//                                                     <div className="mt-2 flex justify-end">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => {
//                                                                 setDateRange({ from: null, to: null });
//                                                                 setShowCalendar(false);
//                                                             }}
//                                                             className="text-sm text-error"
//                                                         >
//                                                             Clear dates
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="px-6 flex justify-end gap-3">
//                             <button
//                                 type="button"
//                                 onClick={clearFilters}
//                                 className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Clear All
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Apply Filters
//                             </button>
//                         </div>
//                         {/* Applied Filters Display inside Sidebar */}
//                         <div className="px-6 py-4">
//                             <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                             <div className="space-y-2">
//                                 {searchTerm && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>User Search: {searchTerm}</span>
//                                         <button onClick={() => setSearchTerm('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {paymentIdFilter && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Payment ID: {paymentIdFilter}</span>
//                                         <button onClick={() => setPaymentIdFilter('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {amountFilter && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Amount: {amountFilter}</span>
//                                         <button onClick={() => setAmountFilter('')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {currencyFilter && currencyFilter !== 'all' && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Currency: {currencyFilter}</span>
//                                         <button onClick={() => setCurrencyFilter('all')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {statusFilter !== 'all' && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Status: {statusFilter}</span>
//                                         <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                                 {(dateRange.from || dateRange.to) && (
//                                     <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                         <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                             {dateRange.from && dateRange.to ? ' - ' : ''}
//                                             {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                         </span>
//                                         <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                             <X size={16} />
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div >
//     );
// };

// export default AdminPaymentsPage;

'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import apiConfig from '../../config/apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp, Edit, Copy } from 'lucide-react';
import { GiCheckMark } from "react-icons/gi";


axios.defaults.baseURL = apiConfig.baseUrl;

// Custom Dropdown Component
const CustomDropdown = ({ label, value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div>
            <label className="block font-medium text-gray mb-1">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between capitalize cursor-pointer w-full border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-main focus:outline-none"
                >
                    <span>{value || `All ${label}s`}</span>
                    <ChevronDown className="size-6 text-gray-400" />
                </button>
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
                                    onClick={() => { onChange(option); setIsOpen(false); }}
                                    className="px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium cursor-pointer flex justify-between items-center"
                                >
                                    {option === 'all' ? `All ${label}s` : option}
                                    {value === option && <GiCheckMark className="text-gray" size={20} />}
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};


// Copy to clipboard hook
const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async (text) => {
        if (!navigator?.clipboard) {
            console.error('Clipboard API not available');
            return false;
        }
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5 seconds
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard', error);
            setIsCopied(false);
            return false;
        }
    };

    return { copy, isCopied };
};


const AdminPaymentsPage = () => {
    const { token } = useAuth();
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loadingPayments, setLoadingPayments] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

    // Filter state
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState({ from: null, to: null });
    const [statusFilter, setStatusFilter] = useState('all');
    const [showCalendar, setShowCalendar] = useState(false);
    const [paymentIdFilter, setPaymentIdFilter] = useState('');
    const [amountFilter, setAmountFilter] = useState('');
    const [currencyFilter, setCurrencyFilter] = useState('all');

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState(null);
    const [editFormData, setEditFormData] = useState({
        status: ''
    });
    const [editLoading, setEditLoading] = useState(false);

    // Sorting
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    // Refs for detecting clicks outside dropdown/modal
    const filterModalRef = useRef(null);
    const editModalRef = useRef(null);

    // Copy to clipboard hook
    const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
    const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();


    useEffect(() => {
        const fetchPayments = async () => {
            setLoadingPayments(true);
            setError(null);
            setSuccessMessage(null);
            try {
                const response = await axios.get('/admin/payments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPayments(response.data);
                setFilteredPayments(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load payments');
                console.error("Error fetching payments:", err);
            } finally {
                setLoadingPayments(false);
            }
        };

        fetchPayments();
    }, [token]);

    // Apply filters when any filter changes
    useEffect(() => {
        let results = [...payments];

        // Apply search filter (user name and email)
        if (searchTerm) {
            results = results.filter(payment =>
                payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply Payment ID filter
        if (paymentIdFilter) {
            results = results.filter(payment =>
                payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
            );
        }

        // Apply Amount filter
        if (amountFilter) {
            const amount = parseFloat(amountFilter);
            results = results.filter(payment => parseFloat(payment.amountToAdd) === amount);
        }

        // Apply Currency filter
        if (currencyFilter !== 'all') {
            results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
        }


        // Apply status filter
        if (statusFilter !== 'all') {
            results = results.filter(payment => payment.status === statusFilter);
        }

        // Apply date range filter
        if (dateRange.from) {
            const fromDate = new Date(dateRange.from);
            fromDate.setHours(0, 0, 0, 0);

            results = results.filter(payment => {
                const paymentDate = new Date(payment.createdAt);
                return paymentDate >= fromDate;
            });
        }

        if (dateRange.to) {
            const toDate = new Date(dateRange.to);
            toDate.setHours(23, 59, 59, 999);

            results = results.filter(payment => {
                const paymentDate = new Date(payment.createdAt);
                return paymentDate <= toDate;
            });
        }

        // Apply sorting
        if (sortField) {
            results.sort((a, b) => {
                let valueA, valueB;

                // Handle nested properties and special cases
                if (sortField === 'user') {
                    valueA = a.user?.fullName || '';
                    valueB = b.user?.fullName || '';
                } else if (sortField === 'amount') {
                    valueA = parseFloat(a.amountToAdd);
                    valueB = parseFloat(b.amountToAdd);
                } else {
                    valueA = a[sortField];
                    valueB = b[sortField];
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

        setFilteredPayments(results);
    }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);

    // Handle clicks outside dropdowns and modals
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close filter modal if clicked outside
            if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
                setShowFilterModal(false);
            }
            // Close edit modal if clicked outside
            if (isEditModalOpen && editModalRef.current && !editModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
                setIsEditModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilterModal, isEditModalOpen]);


    const toggleSort = (field) => {
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
        setPaymentIdFilter('');
        setAmountFilter('');
        setCurrencyFilter('all');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'text-green-700 bg-green-300 ';
            case 'pending':
                return 'text-yellow-700 bg-yellow-300 ';
            case 'in progress':
                return 'text-blue-700 bg-blue-300 ';
            case 'canceled':
                return 'text-red-700 bg-red-300 ';
            default:
                return 'text-gray-700 bg-gray-300 ';
        }
    };

    const currencyOptions = ['all', ...Array.from(new Set(payments.map(p => p.payInCurrency?.code).filter(Boolean)))];
    const statusOptions = ['all', 'pending', 'in progress', 'completed', 'canceled'];

    const handleEditPayment = (payment) => {
        setSelectedPaymentForEdit(payment);
        setEditFormData({
            status: payment.status || ''
        });
        setIsEditModalOpen(true);
    };


    const handleStatusDropdownChange = (status) => {
        setEditFormData({ ...editFormData, status: status });
    };


    const handleSaveEdit = async () => {
        if (!selectedPaymentForEdit) return;
        setEditLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Payload to update ONLY the status
            const payload = {
                status: editFormData.status
            };

            await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update payments state - ONLY update the status
            const updatedPayments = payments.map(payment =>
                payment._id === selectedPaymentForEdit._id ? {
                    ...payment,
                    status: editFormData.status
                } : payment
            );
            setPayments(updatedPayments);
            setFilteredPayments(updatedPayments); // Keep filtered payments in sync

            setSuccessMessage('Payment status updated successfully!');
            setIsEditModalOpen(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update payment status');
            console.error("Error updating payment status:", err);
        } finally {
            setEditLoading(false);
        }
    };


    if (loadingPayments) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <h1 className="text-2xl font-bold text-main mb-4">Payment Management</h1>
                <div className="space-y-4">
                    <div><Skeleton className="h-10 w-64" /></div>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-white border-b border-gray-300">
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
                                        <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl relative">
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-bold text-main">Payment Management</h1>
                    <div className="flex gap-3 items-start">
                        {/* Payment Filter */}
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by User Name or Email..."
                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
                            />
                            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        </div>
                        <div>
                            <button
                                onClick={() => setShowFilterModal(true)}
                                className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
                            >
                                <Filter size={18} />
                                Filters
                            </button>
                        </div>
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


                {/* Payments Table */}
                <div
                    className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-white border-b border-gray-300">
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
                                        <button>
                                            <button
                                                onClick={() => toggleSort('_id')}
                                                className="flex items-center gap-1 hover:text-primary uppercase"
                                            >
                                                Payment ID
                                                {sortField === '_id' && (
                                                    <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
                                                )}
                                            </button>
                                        </button>
                                    </th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
                                        <button>
                                            <button
                                                onClick={() => toggleSort('user')}
                                                className="flex items-center gap-1 hover:text-primary uppercase"
                                            >
                                                User
                                                {sortField === 'user' && (
                                                    <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
                                                )}
                                            </button>
                                        </button>
                                    </th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">
                                        <button>
                                            <button
                                                onClick={() => toggleSort('amount')}
                                                className="flex items-center gap-1 hover:text-primary uppercase"
                                            >
                                                Amount
                                                {sortField === 'amount' && (
                                                    <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
                                                )}
                                            </button>
                                        </button>
                                    </th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">
                                        <button>
                                            <button
                                                onClick={() => toggleSort('status')}
                                                className="flex items-center gap-1 hover:text-primary uppercase"
                                            >
                                                Status
                                                {sortField === 'status' && (
                                                    <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
                                                )}
                                            </button>
                                        </button>
                                    </th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                                            No payments found matching your filters.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPayments.map((payment, index) => (
                                        <motion.tr
                                            key={payment._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
                                                    <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                {payment.amountToAdd}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {payment.payInCurrency?.code || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                <motion.button
                                                    onClick={() => handleEditPayment(payment)}
                                                    className="bg-white border border-error cursor-pointer rounded-md px-6 py-2 font-medium text-error focus:outline-none flex items-center"
                                                >
                                                    <Edit size={18} className="mr-1" />
                                                    Edit
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Payment Modal */}
            <AnimatePresence>
                {isEditModalOpen && selectedPaymentForEdit && (
                    <motion.div
                        ref={editModalRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md"
                        >
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-main">Edit Payment Status</h2>
                            </div>

                            <div className="space-y-4">
                                <div className='bg-green/10 p-3 rounded-md flex items-center justify-between'>
                                    <div>
                                        <label htmlFor="paymentId" className="block font-semibold text-main mb-1">Payment ID : </label>
                                        <span className="font-medium text-gray-700">{selectedPaymentForEdit._id}</span>
                                    </div>
                                    <button
                                        onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
                                        className="p-2 rounded hover:bg-gray-100 focus:outline-none"
                                        aria-label="Copy Payment ID"
                                    >
                                        <Copy className="size-4 text-gray-500" />
                                    </button>
                                </div>
                                {isPaymentIdCopied && <p className="text-sm text-green-500 mt-1">Payment ID copied!</p>}

                                <div className='bg-green/10 p-3 rounded-md flex items-center justify-between'>
                                    <div>
                                        <label htmlFor="referenceCode" className="block font-semibold text-main mb-1">Reference Code</label>
                                        <span className="font-medium text-gray-700">{selectedPaymentForEdit.referenceCode || 'N/A'}</span>
                                    </div>
                                    <button
                                        onClick={() => copyReferenceCode(selectedPaymentForEdit.referenceCode || '')}
                                        className="p-2 rounded hover:bg-gray-100 focus:outline-none"
                                        aria-label="Copy Reference Code"
                                    >
                                        <Copy className="size-4 text-gray-500" />
                                    </button>
                                </div>
                                {isReferenceCodeCopied && <p className="text-sm text-green-500 mt-1">Reference Code copied!</p>}

                                <div className='bg-green/10 p-3 rounded-md'>
                                    <label htmlFor="amountToAdd" className="block font-semibold text-main mb-1">Amount</label>
                                    <span className="font-medium text-gray-700">{selectedPaymentForEdit.amountToAdd}</span>
                                </div>
                                <div className='bg-green/10 p-3 rounded-md flex items-center'>
                                    <label htmlFor="currency" className="block font-semibold text-main mb-1 mr-2">Currency</label>
                                    <span className="font-medium text-gray-700">{selectedPaymentForEdit.payInCurrency?.code || 'N/A'}</span>
                                </div>
                                <div>
                                    <CustomDropdown
                                        label="Status"
                                        value={editFormData.status || null}
                                        onChange={handleStatusDropdownChange}
                                        options={statusOptions.filter(opt => opt !== 'all')}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 w-full py-3 cursor-pointer bg-gray-300 text-gray-700 rounded-md focus:outline-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    disabled={editLoading}
                                    className={`px-4 py-3 w-full cursor-pointer bg-primary text-secondary rounded-md hover:bg-primary-hover focus:outline-none ${editLoading ? 'opacity-50 cursor-wait' : ''}`}
                                >
                                    {editLoading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Filter Sidebar */}
            <AnimatePresence>
                {showFilterModal && (
                    <motion.div
                        ref={filterModalRef}
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: '0%' }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
                    >
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
                                <button
                                    onClick={() => setShowFilterModal(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Payment ID Filter */}
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Payment ID
                                </label>
                                <input
                                    type="text"
                                    value={paymentIdFilter}
                                    onChange={(e) => setPaymentIdFilter(e.target.value)}
                                    placeholder="Filter by Payment ID"
                                    className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
                                />
                            </div>
                            {/* Amount Filter */}
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    value={amountFilter}
                                    onChange={(e) => setAmountFilter(e.target.value)}
                                    placeholder="Filter by Amount"
                                    className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
                                />
                            </div>

                            {/* Currency Filter - Custom Dropdown */}
                            <CustomDropdown
                                label="Currency"
                                value={currencyFilter === 'all' ? null : currencyFilter}
                                onChange={setCurrencyFilter}
                                options={currencyOptions}
                            />

                            {/* Status Filter - Custom Dropdown */}
                            <CustomDropdown
                                label="Status"
                                value={statusFilter === 'all' ? null : statusFilter}
                                onChange={setStatusFilter}
                                options={statusOptions}
                            />


                            {/* Date Range Filter */}
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Date Range
                                </label>
                                <div className="relative">
                                    <button className='w-full'>
                                        <button
                                            type="button"
                                            onClick={() => setShowCalendar(!showCalendar)}
                                            className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
                                        >
                                            <span>
                                                {dateRange.from ? (
                                                    dateRange.to ? (
                                                        `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
                                                    ) : (
                                                        `From ${format(dateRange.from, 'MMM dd, yyyy')}`
                                                    )
                                                ) : dateRange.to ? (
                                                    `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
                                                ) : (
                                                    'Select date range'
                                                )}
                                            </span>
                                            <CalendarIcon className="size-5 text-gray-400" />
                                        </button>
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

                        <div className="px-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Clear All
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowFilterModal(false)}
                                className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Apply Filters
                            </button>
                        </div>
                        {/* Applied Filters Display inside Sidebar */}
                        <div className="px-6 py-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
                            <div className="space-y-2">
                                {searchTerm && (
                                    <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
                                        <span>User Search: {searchTerm}</span>
                                        <button onClick={() => setSearchTerm('')} className="ml-2">
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                {paymentIdFilter && (
                                    <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
                                        <span>Payment ID: {paymentIdFilter}</span>
                                        <button onClick={() => setPaymentIdFilter('')} className="ml-2">
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                {amountFilter && (
                                    <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
                                        <span>Amount: {amountFilter}</span>
                                        <button onClick={() => setAmountFilter('')} className="ml-2">
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                {currencyFilter && currencyFilter !== 'all' && (
                                    <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
                                        <span>Currency: {currencyFilter}</span>
                                        <button onClick={() => setCurrencyFilter('all')} className="ml-2">
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                {statusFilter !== 'all' && (
                                    <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
                                        <span>Status: {statusFilter}</span>
                                        <button onClick={() => setStatusFilter('all')} className="ml-2">
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                {(dateRange.from || dateRange.to) && (
                                    <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
                                        <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
                                            {dateRange.from && dateRange.to ? ' - ' : ''}
                                            {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
                                        </span>
                                        <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default AdminPaymentsPage;