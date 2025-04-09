// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp, Edit, Copy } from 'lucide-react';
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


// // Copy to clipboard hook
// const useCopyToClipboard = () => {
//      const [isCopied, setIsCopied] = useState(false);

//     const copy = async (text) => {
//         if (!navigator?.clipboard) {
//             console.error('Clipboard API not available');
//             return false;
//         }
//         try {
//             await navigator.clipboard.writeText(text);
//             setIsCopied(true);
//             setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5 seconds
//             return true;
//         } catch (error) {
//             console.error('Failed to copy to clipboard', error);
//             setIsCopied(false);
//             return false;
//         }
//     };

//     return { copy, isCopied };
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

//     // Copy to clipboard hook
//     const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
//     const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();


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
//                  </div>
//              </div>
//          );
//      }


//      return (
//          <div className="container mx-auto px-4 py-8 max-w-7xl relative">
//              <div className="space-y-6">
//                  <div className="flex justify-between items-start">
//                      <h1 className="text-2xl font-bold text-main">Payment Management</h1>
//                      <div className="flex gap-3 items-start">
//                          {/* Payment Filter */}
//                          <div className="relative">
//                              <input
//                                  type="text"
//                                  value={searchTerm}
//                                  onChange={(e) => setSearchTerm(e.target.value)}
//                                  placeholder="Search by User Name or Email..."
//                                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
//                              />
//                              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                          </div>
//                          <div>
//                              <button
//                                  onClick={() => setShowFilterModal(true)}
//                                  className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
//                              >
//                                  <Filter size={18} />
//                                  Filters
//                              </button>
//                          </div>
//                      </div>
//                  </div>

//                  {/* Success Message */}
//                  <AnimatePresence>
//                      {successMessage && (
//                          <motion.div
//                              initial={{ opacity: 0, y: -10 }}
//                              animate={{ opacity: 1, y: 0 }}
//                              exit={{ opacity: 0, y: -10 }}
//                              className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow"
//                          >
//                              <div className="flex items-start">
//                                  <div className="flex-shrink-0">
//                                      <Check className="h-5 w-5 text-green-500" />
//                                  </div>
//                                  <div className="ml-3">
//                                      <p className="text-sm text-green-700">{successMessage}</p>
//                                  </div>
//                                  <button
//                                      onClick={() => setSuccessMessage(null)}
//                                      className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700"
//                                  >
//                                      <X size={18} />
//                                  </button>
//                              </div>
//                          </motion.div>
//                      )}
//                  </AnimatePresence>

//                  {/* Error Message */}
//                  <AnimatePresence>
//                      {error && (
//                          <motion.div
//                              initial={{ opacity: 0, y: -10 }}
//                              animate={{ opacity: 1, y: 0 }}
//                              exit={{ opacity: 0, y: -10 }}
//                              className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow"
//                          >
//                              <div className="flex items-start">
//                                  <div className="flex-shrink-0">
//                                      <X className="h-5 w-5 text-red-500" />
//                                  </div>
//                                  <div className="ml-3">
//                                      <p className="text-sm text-red-700">{error}</p>
//                                  </div>
//                                  <button
//                                      onClick={() => setError(null)}
//                                      className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
//                                  >
//                                      <X size={18} />
//                                  </button>
//                              </div>
//                          </motion.div>
//                      )}
//                  </AnimatePresence>


//                  {/* Payments Table */}
//                  <div
//                      className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
//                  >
//                      <div className="overflow-x-auto">
//                          <table className="min-w-full">
//                              <thead>
//                                  <tr className="bg-white border-b border-gray-300">
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">

//                                              <button
//                                                  onClick={() => toggleSort('_id')}
//                                                  className="flex items-center gap-1 hover:text-primary uppercase"
//                                              >
//                                                  Payment ID
//                                                  {sortField === '_id' && (
//                                                      <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                  )}
//                                              </button>
//                                      </th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">

//                                              <button
//                                                  onClick={() => toggleSort('user')}
//                                                  className="flex items-center gap-1 hover:text-primary uppercase"
//                                              >
//                                                  User
//                                                  {sortField === 'user' && (
//                                                      <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                  )}
//                                              </button>
//                                      </th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">

//                                              <button
//                                                  onClick={() => toggleSort('amount')}
//                                                  className="flex items-center gap-1 hover:text-primary uppercase"
//                                              >
//                                                  Amount
//                                                  {sortField === 'amount' && (
//                                                      <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                  )}
//                                              </button>
//                                      </th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">

//                                              <button
//                                                  onClick={() => toggleSort('status')}
//                                                  className="flex items-center gap-1 hover:text-primary uppercase"
//                                              >
//                                                  Status
//                                                  {sortField === 'status' && (
//                                                      <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                  )}
//                                              </button>
//                                      </th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                  </tr>
//                              </thead>
//                              <tbody className="divide-y divide-gray-200">
//                                  {filteredPayments.length === 0 ? (
//                                      <tr>
//                                          <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
//                                              No payments found matching your filters.
//                                          </td>
//                                      </tr>
//                                  ) : (
//                                      filteredPayments.map((payment, index) => (
//                                          <motion.tr
//                                              key={payment._id}
//                                              initial={{ opacity: 0, y: 20 }}
//                                              animate={{ opacity: 1, y: 0 }}
//                                              transition={{ delay: index * 0.05 }}
//                                          >
//                                              <td className="px-6 py-4 whitespace-nowrap">
//                                                  <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
//                                              </td>
//                                              <td className="px-6 py-4">
//                                                  <div className="flex flex-col">
//                                                      <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
//                                                      <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
//                                                  </div>
//                                              </td>
//                                              <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                  {payment.amountToAdd}
//                                              </td>
//                                              <td className="px-6 py-4 whitespace-nowrap">
//                                                  {payment.payInCurrency?.code || 'N/A'}
//                                              </td>
//                                              <td className="px-6 py-4 whitespace-nowrap">
//                                                  <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
//                                              </td>
//                                              <td className="px-6 py-4 whitespace-nowrap">
//                                                  <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
//                                                      {payment.status}
//                                                  </span>
//                                              </td>
//                                              <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                  <motion.button
//                                                      onClick={() => handleEditPayment(payment)}
//                                                      className="bg-white border border-error cursor-pointer rounded-md px-6 py-2 font-medium text-error focus:outline-none flex items-center"
//                                                  >
//                                                      <Edit size={18} className="mr-1" />
//                                                      Edit
//                                                  </motion.button>
//                                              </td>
//                                          </motion.tr>
//                                      ))
//                                  )}
//                              </tbody>
//                          </table>
//                      </div>
//                  </div>
//              </div>

//              {/* Edit Payment Modal */}
//              <AnimatePresence>
//                  {isEditModalOpen && selectedPaymentForEdit && (
//                      <motion.div
//                          ref={editModalRef}
//                          initial={{ opacity: 0 }}
//                          animate={{ opacity: 1 }}
//                          exit={{ opacity: 0 }}
//                          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50"
//                      >
//                          <motion.div
//                              initial={{ y: 50, opacity: 0 }}
//                              animate={{ y: 0, opacity: 1 }}
//                              exit={{ y: 50, opacity: 0 }}
//                              className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md"
//                          >
//                              <div className="mb-6">
//                                  <h2 className="text-xl font-semibold text-main">Edit Payment Status</h2>
//                              </div>

//                              <div className="space-y-4">
//                                  <div className='bg-green/10 p-3 rounded-md flex items-center justify-between'>
//                                      <div>
//                                          <label htmlFor="paymentId" className="block font-semibold text-main mb-1">Payment ID : </label>
//                                          <span className="font-medium text-gray-700">{selectedPaymentForEdit._id}</span>
//                                      </div>
//                                      <button
//                                          onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
//                                          className="p-2 rounded hover:bg-gray-100 focus:outline-none"
//                                          aria-label="Copy Payment ID"
//                                      >
//                                          <Copy className="size-4 text-gray-500" />
//                                      </button>
//                                  </div>
//                                  {isPaymentIdCopied && <p className="text-sm text-green-500 mt-1">Payment ID copied!</p>}

//                                  <div className='bg-green/10 p-3 rounded-md flex items-center justify-between'>
//                                      <div>
//                                          <label htmlFor="referenceCode" className="block font-semibold text-main mb-1">Reference Code</label>
//                                          <span className="font-medium text-gray-700">{selectedPaymentForEdit.referenceCode || 'N/A'}</span>
//                                      </div>
//                                      <button
//                                          onClick={() => copyReferenceCode(selectedPaymentForEdit.referenceCode || '')}
//                                          className="p-2 rounded hover:bg-gray-100 focus:outline-none"
//                                          aria-label="Copy Reference Code"
//                                      >
//                                          <Copy className="size-4 text-gray-500" />
//                                      </button>
//                                  </div>
//                                  {isReferenceCodeCopied && <p className="text-sm text-green-500 mt-1">Reference Code copied!</p>}

//                                  <div className='bg-green/10 p-3 rounded-md'>
//                                      <label htmlFor="amountToAdd" className="block font-semibold text-main mb-1">Amount</label>
//                                      <span className="font-medium text-gray-700">{selectedPaymentForEdit.amountToAdd}</span>
//                                  </div>
//                                  <div className='bg-green/10 p-3 rounded-md flex items-center'>
//                                      <label htmlFor="currency" className="block font-semibold text-main mb-1 mr-2">Currency</label>
//                                      <span className="font-medium text-gray-700">{selectedPaymentForEdit.payInCurrency?.code || 'N/A'}</span>
//                                  </div>
//                                  <div>
//                                      <CustomDropdown
//                                          label="Status"
//                                          value={editFormData.status || null}
//                                          onChange={handleStatusDropdownChange}
//                                          options={statusOptions.filter(opt => opt !== 'all')}
//                                      />
//                                  </div>
//                              </div>

//                              <div className="mt-6 flex justify-end space-x-2">
//                                  <button
//                                      onClick={() => setIsEditModalOpen(false)}
//                                      className="px-4 w-full py-3 cursor-pointer bg-gray-300 text-gray-700 rounded-md focus:outline-none"
//                                  >
//                                      Cancel
//                                  </button>
//                                  <button
//                                      onClick={handleSaveEdit}
//                                      disabled={editLoading}
//                                      className={`px-4 py-3 w-full cursor-pointer bg-primary text-secondary rounded-md hover:bg-primary-hover focus:outline-none ${editLoading ? 'opacity-50 cursor-wait' : ''}`}
//                                  >
//                                      {editLoading ? 'Saving...' : 'Save'}
//                                  </button>
//                              </div>
//                          </motion.div>
//                      </motion.div>
//                  )}
//              </AnimatePresence>


//              {/* Filter Sidebar */}
//              <AnimatePresence>
//                  {showFilterModal && (
//                      <motion.div
//                          ref={filterModalRef}
//                          initial={{ opacity: 0, x: '100%' }}
//                          animate={{ opacity: 1, x: '0%' }}
//                          exit={{ opacity: 0, x: '100%' }}
//                          transition={{ duration: 0.3 }}
//                          className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                      >
//                          <div className="p-6 border-b border-gray-200">
//                              <div className="flex justify-between items-center">
//                                  <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                                  <button
//                                      onClick={() => setShowFilterModal(false)}
//                                      className="text-gray-400 hover:text-gray-500"
//                                  >
//                                      <X size={20} />
//                                  </button>
//                              </div>
//                          </div>

//                          <div className="p-6 space-y-6">
//                              {/* Payment ID Filter */}
//                              <div>
//                                  <label className="block font-medium text-gray-700 mb-1">
//                                      Payment ID
//                                  </label>
//                                  <input
//                                      type="text"
//                                      value={paymentIdFilter}
//                                      onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                      placeholder="Filter by Payment ID"
//                                      className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                                  />
//                              </div>
//                              {/* Amount Filter */}
//                              <div>
//                                  <label className="block font-medium text-gray-700 mb-1">
//                                      Amount
//                                  </label>
//                                  <input
//                                      type="number"
//                                      value={amountFilter}
//                                      onChange={(e) => setAmountFilter(e.target.value)}
//                                      placeholder="Filter by Amount"
//                                      className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                                  />
//                              </div>

//                              {/* Currency Filter - Custom Dropdown */}
//                              <CustomDropdown
//                                  label="Currency"
//                                  value={currencyFilter === 'all' ? null : currencyFilter}
//                                  onChange={setCurrencyFilter}
//                                  options={currencyOptions}
//                              />

//                              {/* Status Filter - Custom Dropdown */}
//                              <CustomDropdown
//                                  label="Status"
//                                  value={statusFilter === 'all' ? null : statusFilter}
//                                  onChange={setStatusFilter}
//                                  options={statusOptions}
//                              />


//                              {/* Date Range Filter */}
//                              <div>
//                                  <label className="block font-medium text-gray-700 mb-1">
//                                      Date Range
//                                  </label>
//                                  <div className="relative">
//                                      <button className='w-full'>
//                                          <button
//                                              type="button"
//                                              onClick={() => setShowCalendar(!showCalendar)}
//                                              className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                                          >
//                                              <span>
//                                                  {dateRange.from ? (
//                                                      dateRange.to ? (
//                                                          `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                      ) : (
//                                                          `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                      )
//                                                  ) : dateRange.to ? (
//                                                      `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                  ) : (
//                                                      'Select date range'
//                                                  )}
//                                              </span>
//                                              <CalendarIcon className="size-5 text-gray-400" />
//                                          </button>
//                                      </button>

//                                      <AnimatePresence>
//                                          {showCalendar && (
//                                              <motion.div
//                                                  initial={{ opacity: 0, y: 10 }}
//                                                  animate={{ opacity: 1, y: 0 }}
//                                                  exit={{ opacity: 0, y: 10 }}
//                                                  className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                                              >
//                                                  <Calendar
//                                                      mode="range"
//                                                      selected={dateRange}
//                                                      onSelect={(range) => {
//                                                          setDateRange(range);
//                                                          setShowCalendar(false);
//                                                      }}
//                                                  />
//                                                  {(dateRange.from || dateRange.to) && (
//                                                      <div className="mt-2 flex justify-end">
//                                                          <button
//                                                              type="button"
//                                                              onClick={() => {
//                                                                  setDateRange({ from: null, to: null });
//                                                                  setShowCalendar(false);
//                                                              }}
//                                                              className="text-sm text-error"
//                                                          >
//                                                              Clear dates
//                                                          </button>
//                                                      </div>
//                                                  )}
//                                              </motion.div>
//                                          )}
//                                      </AnimatePresence>
//                                  </div>
//                              </div>
//                          </div>

//                          <div className="px-6 flex justify-end gap-3">
//                              <button
//                                  type="button"
//                                  onClick={clearFilters}
//                                  className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                              >
//                                  Clear All
//                              </button>
//                              <button
//                                  type="button"
//                                  onClick={() => setShowFilterModal(false)}
//                                  className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                              >
//                                  Apply Filters
//                              </button>
//                          </div>
//                          {/* Applied Filters Display inside Sidebar */}
//                          <div className="px-6 py-4">
//                              <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                              <div className="space-y-2">
//                                  {searchTerm && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>User Search: {searchTerm}</span>
//                                          <button onClick={() => setSearchTerm('')} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                                  {paymentIdFilter && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>Payment ID: {paymentIdFilter}</span>
//                                          <button onClick={() => setPaymentIdFilter('')} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                                  {amountFilter && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>Amount: {amountFilter}</span>
//                                          <button onClick={() => setAmountFilter('')} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                                  {currencyFilter && currencyFilter !== 'all' && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>Currency: {currencyFilter}</span>
//                                          <button onClick={() => setCurrencyFilter('all')} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                                  {statusFilter !== 'all' && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>Status: {statusFilter}</span>
//                                          <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                                  {(dateRange.from || dateRange.to) && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                              {dateRange.from && dateRange.to ? ' - ' : ''}
//                                              {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                          </span>
//                                          <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                              </div>
//                          </div>
//                      </motion.div>
//                  )}
//              </AnimatePresence>
//          </div >
//      );
//  };

//  export default AdminPaymentsPage;



// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable';
// import PaymentFilters from '../components/add-money/PaymentFilters';
// import PaymentEditModal from '../components/add-money/PaymentEditModal';


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
//                 return 'text-green-600 bg-green-600/20 ';
//             case 'pending':
//                 return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'in progress':
//                 return 'text-blue-600 bg-blue-600/20 ';
//             case 'canceled':
//                 return 'text-red-600 bg-red-600/20 ';
//             default:
//                 return 'text-gray-600 bg-gray-600/20 ';
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


//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 <div className="flex justify-between">
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User Name or Email..."
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
//                 <PaymentTable
//                     filteredPayments={filteredPayments}
//                     loadingPayments={loadingPayments}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                     handleEditPayment={handleEditPayment}
//                 />
//             </div>

//             {/* Edit Payment Modal */}
//             <PaymentEditModal
//                 isEditModalOpen={isEditModalOpen}
//                 setIsEditModalOpen={setIsEditModalOpen}
//                 selectedPaymentForEdit={selectedPaymentForEdit}
//                 editFormData={editFormData}
//                 setEditFormData={setEditFormData}
//                 editLoading={editLoading}
//                 handleSaveEdit={handleSaveEdit}
//                 statusOptions={statusOptions}
//             />


//             {/* Filter Sidebar */}
//             <PaymentFilters
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
//                 paymentIdFilter={paymentIdFilter}
//                 setPaymentIdFilter={setPaymentIdFilter}
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter}
//                 currencyOptions={currencyOptions}
//                 statusOptions={statusOptions}
//                 clearFilters={clearFilters}
//             />
//         </div >
//     );
// };

// export default AdminPaymentsPage;


// // frontend/src/app/admin/payments/page.tsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable';
// import PaymentFilters from '../components/add-money/PaymentFilters';
// import PaymentEditModal from '../components/add-money/PaymentEditModal';
// import Pagination from '../components/Pagination'; // Import Pagination component

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Payment {
//     _id: string;
//     user: {
//         fullName?: string;
//         email?: string;
//     };
//     amountToAdd: string;
//     payInCurrency?: {
//         code?: string;
//     };
//     status: string;
//     createdAt: string;
//     // Add other properties as needed based on your Payment object structure
// }


// const AdminPaymentsPage: React.FC = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//     const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState<{ [paymentId: string]: boolean }>({});
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // State for refresh animation

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in progress' | 'completed' | 'canceled'>('all');
//     const [paymentIdFilter, setPaymentIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState<Payment | null>(null);
//     const [editFormData, setEditFormData] = useState<{ status: string }>({
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState<boolean>(false);

//     // Sorting
//     const [sortField, setSortField] = useState<string | null>(null);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10); // Default to 10 per page
//     const pageSizeOptions: number[] = [10, 25, 50]; // Options for payments per page

//     // Update payments per page and reset to first page
//     const handlePageSizeChange = (size: number) => {
//         setPaymentsPerPage(size);
//         setCurrentPage(1); // Reset to the first page when page size changes
//     };

//     useEffect(() => {
//         fetchPayments();
//     }, [token]);

//     const fetchPayments = async () => {
//         setLoadingPayments(true); // Corrected: setLoadingPayments instead of setIsLoading
//         setIsRefreshing(true); // Start refresh animation
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             const response = await axios.get('/admin/payments', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setPayments(response.data);
//             setFilteredPayments(response.data);
//         } catch (err: any) { // Type err as any or Error
//             setError(err.response?.data?.message || 'Failed to load payments');
//             console.error("Error fetching payments:", err);
//         } finally {
//             setLoadingPayments(false); // Corrected: setLoadingPayments instead of setIsLoading
//             setIsRefreshing(false); // Stop refresh animation
//         }
//     };

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results: Payment[] = [...payments];

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
//                 let valueA: any, valueB: any; // Type as any to handle different types

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField as keyof Payment]; // Type assertion to Payment key
//                     valueB = b[sortField as keyof Payment]; // Type assertion to Payment key
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
//         setCurrentPage(1); // Reset page to 1 when filters change
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);


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
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-600 bg-green-600/20 ';
//             case 'pending':
//                 return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'in progress':
//                 return 'text-blue-600 bg-blue-600/20 ';
//             case 'canceled':
//                 return 'text-red-600 bg-red-600/20 ';
//             default:
//                 return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     const currencyOptions = ['all', ...Array.from(new Set(payments.map(p => p.payInCurrency?.code).filter(Boolean)))];
//     const statusOptions: ('all' | 'pending' | 'in progress' | 'completed' | 'canceled')[] = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment: Payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || ''
//         });
//         setIsEditModalOpen(true);
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
//         } catch (err: any) { // Type err as any or Error
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     const refreshData = () => {
//         fetchPayments();
//     };

//     // Pagination logic
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

//     const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
//     const goToPreviousPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
//     const goToNextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);


//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 <div className="flex justify-between">
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User Name or Email..."
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
//                         <label htmlFor="paymentsPerPage" className="mr-2 text-sm font-medium text-gray-600 dark:text-white">Show</label>
//                         <select
//                             id="paymentsPerPage"
//                             value={paymentsPerPage}
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

//                 {/* Payments Table */}
//                 <PaymentTable
//                     filteredPayments={currentPayments} // Use currentPayments for pagination
//                     loadingPayments={loadingPayments}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                     handleEditPayment={handleEditPayment}
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

//             {/* Edit Payment Modal */}
//             <PaymentEditModal
//                 isEditModalOpen={isEditModalOpen}
//                 setIsEditModalOpen={setIsEditModalOpen}
//                 selectedPaymentForEdit={selectedPaymentForEdit}
//                 editFormData={editFormData}
//                 setEditFormData={setEditFormData}
//                 editLoading={editLoading}
//                 handleSaveEdit={handleSaveEdit}
//                 statusOptions={statusOptions}
//             />


//             {/* Filter Sidebar */}
//             <PaymentFilters
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
//                 paymentIdFilter={paymentIdFilter}
//                 setPaymentIdFilter={setPaymentIdFilter}
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter}
//                 currencyOptions={currencyOptions}
//                 statusOptions={statusOptions}
//                 clearFilters={clearFilters}
//             />
//         </div >
//     );
// };

// export default AdminPaymentsPage;




// // frontend/src/app/admin/payments/page.tsx
// 'use client';
// import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
// import { useAuth } from '../../contexts/AuthContext';
// import axios, { AxiosError } from 'axios'; // Import AxiosError for better error typing
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable';
// import PaymentFilters from '../components/add-money/PaymentFilters';
// import PaymentEditModal from '../components/add-money/PaymentEditModal';
// import Pagination from '../components/Pagination'; // Import Pagination component

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface User {
//     fullName?: string;
//     email?: string;
// }

// interface Currency {
//     code?: string;
// }
// interface Payment {
//     _id: string;
//     user: User;
//     amountToAdd: string;
//     payInCurrency?: Currency;
//     status: string;
//     createdAt: string;
//     // Add other properties as needed based on your Payment object structure
// }

// // Define a type for API error responses if known
// interface ApiErrorResponse {
//     message: string;
// }

// const AdminPaymentsPage: React.FC = () => {
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//     const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const { token } = useAuth();
//     // Removed unused state: statusUpdateLoading, setStatusUpdateLoading
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // State for refresh animation

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in progress' | 'completed' | 'canceled'>('all');
//     const [paymentIdFilter, setPaymentIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState<Payment | null>(null);
//     const [editFormData, setEditFormData] = useState<{ status: string }>({
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState<boolean>(false);

//     // Sorting
//     const [sortField, setSortField] = useState<string | null>(null);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10); // Default to 10 per page
//     const pageSizeOptions: number[] = [10, 25, 50]; // Options for payments per page

//     // Update payments per page and reset to first page
//     const handlePageSizeChange = (size: number) => {
//         setPaymentsPerPage(size);
//         setCurrentPage(1); // Reset to the first page when page size changes
//     };

//     // Memoize fetchPayments to satisfy exhaustive-deps and prevent potential issues
//     const fetchPayments = useCallback(async () => {
//         setLoadingPayments(true);
//         setIsRefreshing(true); // Start refresh animation
//         setError(null);
//         setSuccessMessage(null); // Clear previous success message on refresh
//         try {
//             const response = await axios.get<{ data: Payment[] }>('/admin/payments', { // Add type for response data if known
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             // Assuming the API returns an object with a 'data' property containing the array
//              if (Array.isArray(response.data)) { // Check if response.data is an array
//                 setPayments(response.data);
//                 setFilteredPayments(response.data); // Initialize filtered payments
//             } else {
//                  // Handle cases where the structure might be different, e.g., response.data.data
//                 console.warn("API response format unexpected:", response.data);
//                 // Attempt to find the array if nested, adjust as needed
//                 const paymentData = (response.data as any)?.data ?? []; // Example: Try accessing response.data.data
//                 if (Array.isArray(paymentData)) {
//                     setPayments(paymentData);
//                     setFilteredPayments(paymentData);
//                 } else {
//                     throw new Error("Invalid data structure received from API");
//                 }
//             }
//         } catch (err: unknown) { // Type err as unknown
//              let errorMessage = 'Failed to load payments';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>; // Type assertion
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//             console.error("Error fetching payments:", err);
//         } finally {
//             setLoadingPayments(false);
//             setIsRefreshing(false); // Stop refresh animation
//         }
//     }, [token]); // Add setters if needed, but usually stable refs from useState are fine

//     useEffect(() => {
//         if (token) { // Ensure token exists before fetching
//              fetchPayments();
//         }
//     }, [token, fetchPayments]); // Add fetchPayments to dependency array

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results: Payment[] = [...payments];

//         // Apply search filter (user name, email, and payment ID)
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase();
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.email?.toLowerCase().includes(lowerSearchTerm)
//             );
//         }

//         // Apply Payment ID filter (can be combined with general search or separate)
//         if (paymentIdFilter) {
//              results = results.filter(payment =>
//                  payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//              );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//              // Use try-catch for robust parsing
//              try {
//                 const amount = parseFloat(amountFilter);
//                 if (!isNaN(amount)) { // Check if parsing was successful
//                      results = results.filter(payment => {
//                          try {
//                             return parseFloat(payment.amountToAdd) === amount;
//                          } catch {
//                              return false; // Ignore payments with non-numeric amounts during filtering
//                          }
//                      });
//                 }
//              } catch {
//                  // Handle case where amountFilter is not a valid number (optional)
//              }
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
//             fromDate.setHours(0, 0, 0, 0); // Start of the day

//             results = results.filter(payment => {
//                 try {
//                     const paymentDate = new Date(payment.createdAt);
//                     return !isNaN(paymentDate.getTime()) && paymentDate >= fromDate; // Check for valid date
//                 } catch {
//                     return false; // Ignore invalid dates
//                 }
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999); // End of the day

//             results = results.filter(payment => {
//                  try {
//                      const paymentDate = new Date(payment.createdAt);
//                      return !isNaN(paymentDate.getTime()) && paymentDate <= toDate; // Check for valid date
//                  } catch {
//                      return false; // Ignore invalid dates
//                  }
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 // Use unknown for initial values, then check types
//                 let valueA: unknown;
//                 let valueB: unknown;

//                 // Handle nested properties and special cases
//                 switch (sortField) {
//                     case 'user':
//                         valueA = a.user?.fullName?.toLowerCase() || '';
//                         valueB = b.user?.fullName?.toLowerCase() || '';
//                         break;
//                     case 'email': // Assuming you might want to sort by email too
//                         valueA = a.user?.email?.toLowerCase() || '';
//                         valueB = b.user?.email?.toLowerCase() || '';
//                         break;
//                     case 'amount':
//                         // Parse safely
//                         valueA = parseFloat(a.amountToAdd) || 0;
//                         valueB = parseFloat(b.amountToAdd) || 0;
//                         break;
//                     case 'currency':
//                          valueA = a.payInCurrency?.code?.toLowerCase() || '';
//                          valueB = b.payInCurrency?.code?.toLowerCase() || '';
//                          break;
//                      case 'createdAt':
//                           // Compare dates directly
//                          valueA = new Date(a.createdAt);
//                          valueB = new Date(b.createdAt);
//                           // Handle invalid dates if necessary
//                           if (isNaN((valueA as Date).getTime())) valueA = new Date(0); // Treat invalid date as earliest
//                           if (isNaN((valueB as Date).getTime())) valueB = new Date(0);
//                          break;
//                     case '_id':
//                     case 'status':
//                         // Direct access for string properties
//                         valueA = (a[sortField as keyof Payment] as string)?.toLowerCase() ?? '';
//                         valueB = (b[sortField as keyof Payment] as string)?.toLowerCase() ?? '';
//                         break;
//                     default:
//                         // Fallback for potentially other simple properties
//                         valueA = a[sortField as keyof Payment];
//                         valueB = b[sortField as keyof Payment];
//                 }


//                  // Comparison logic
//                 const comparison = () => {
//                     if (valueA === valueB) return 0;
//                     if (valueA === null || valueA === undefined) return -1; // Handle null/undefined
//                     if (valueB === null || valueB === undefined) return 1;

//                     // Check types for appropriate comparison
//                     if (typeof valueA === 'number' && typeof valueB === 'number') {
//                         return valueA > valueB ? 1 : -1;
//                     }
//                     if (valueA instanceof Date && valueB instanceof Date) {
//                         return valueA.getTime() > valueB.getTime() ? 1 : -1;
//                     }
//                     // Default to string comparison
//                     return String(valueA).localeCompare(String(valueB));
//                 };


//                 return sortDirection === 'asc' ? comparison() : comparison() * -1;
//             });
//         }

//         setFilteredPayments(results);
//         if (payments.length > 0) { // Only reset page if filters actually changed the list potentially
//             setCurrentPage(1); // Reset page to 1 when filters change
//         }
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);


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
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//         // Optionally reset sorting
//         // setSortField(null);
//         // setSortDirection('asc');
//     };

//     const getStatusColor = (status: string): string => { // Add return type
//         switch (status?.toLowerCase()) { // Handle potential null/undefined and case variations
//             case 'completed':
//                 return 'text-green-600 bg-green-600/20 ';
//             case 'pending':
//                 return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'in progress':
//                 return 'text-blue-600 bg-blue-600/20 ';
//             case 'canceled':
//             case 'cancelled': // Handle variations
//                 return 'text-red-600 bg-red-600/20 ';
//             default:
//                 return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     // Use useMemo to calculate currency options only when payments change
//     const currencyOptions = React.useMemo(() => {
//         const codes = payments
//             .map(p => p.payInCurrency?.code)
//             .filter((code): code is string => Boolean(code)); // Type guard to ensure only strings
//         return ['all', ...Array.from(new Set(codes))];
//     }, [payments]);

//     const statusOptions: ('all' | 'pending' | 'in progress' | 'completed' | 'canceled')[] = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment: Payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || ''
//         });
//         setIsEditModalOpen(true);
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

//              // Update local state immediately for better UX
//              // Create a new array with the updated payment
//              const updatedPayments = payments.map(p =>
//                  p._id === selectedPaymentForEdit._id
//                      ? { ...p, status: editFormData.status }
//                      : p
//              );
//              setPayments(updatedPayments); // Update the base list

//             // No need to call setFilteredPayments here, the useEffect hook watching `payments` will handle it.

//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//             setSelectedPaymentForEdit(null); // Clear selected payment
//         } catch (err: unknown) { // Type err as unknown
//              let errorMessage = 'Failed to update payment status';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>;
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     const refreshData = () => {
//         fetchPayments(); // Call the memoized function
//     };

//     // Pagination logic
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     // currentPayments derived from filteredPayments ensures filtering is applied before pagination
//     const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

//     const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     const paginate = (pageNumber: number) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//              setCurrentPage(pageNumber);
//         }
//     };
//     const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1)); // Ensure not going below 1
//     const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1)); // Ensure not exceeding totalPages


//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 <div className="flex flex-wrap justify-between items-center gap-4"> {/* Added flex-wrap and items-center */}
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Payment Management</h1>
//                     <div className="flex flex-wrap gap-3 items-center"> {/* Added flex-wrap and items-center */}
//                         {/* Search Input */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search Payments..." // Simplified placeholder
//                                 className="w-full sm:w-64 rounded-full py-2 pl-10 pr-3 h-12 border transition-shadow ease-in-out duration-300 border-neutral-900/30 dark:border-white/30 hover:shadow-md dark:hover:shadow-white/20 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary placeholder:text-neutral-500 dark:placeholder:text-neutral-400 bg-white dark:bg-primarybox" // Adjusted styling for consistency
//                             />
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /> {/* Centered icon */}
//                         </div>
//                         <button
//                             onClick={() => setShowFilterModal(true)}
//                             className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-base px-6 py-2 h-12 rounded-full hover:bg-primaryhover transition-colors" // Adjusted padding/height
//                         >
//                             <Filter size={18} />
//                             Filters
//                         </button>
//                         {/* Refresh Data Button */}
//                         <button
//                             onClick={refreshData}
//                             disabled={isRefreshing || loadingPayments} // Disable while loading or refreshing
//                             className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" // Adjusted padding/height
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
//                             exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
//                             className="bg-green-50 border border-green-300 dark:bg-green-900/30 dark:border-green-700 p-4 rounded-md shadow-sm" // Subtle styling
//                         >
//                             <div className="flex items-start">
//                                 <div className="flex-shrink-0 pt-0.5"> {/* Adjusted alignment */}
//                                     <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
//                                 </div>
//                                 <div className="ml-3 flex-1"> {/* Added flex-1 */}
//                                     <p className="text-sm font-medium text-green-800 dark:text-green-300">{successMessage}</p>
//                                 </div>
//                                 <button
//                                     aria-label="Dismiss success message" // Added aria-label
//                                     onClick={() => setSuccessMessage(null)}
//                                     className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-primarybox" // Improved focus and hover
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
//                              initial={{ opacity: 0, y: -10 }}
//                              animate={{ opacity: 1, y: 0 }}
//                              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
//                              className="bg-red-50 border border-red-300 dark:bg-red-900/30 dark:border-red-700 p-4 rounded-md shadow-sm" // Subtle styling
//                         >
//                             <div className="flex items-start">
//                                  <div className="flex-shrink-0 pt-0.5"> {/* Adjusted alignment */}
//                                     {/* Using X for error indication */}
//                                      <X className="h-5 w-5 text-red-500 dark:text-red-400" />
//                                 </div>
//                                 <div className="ml-3 flex-1"> {/* Added flex-1 */}
//                                     <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
//                                 </div>
//                                 <button
//                                      aria-label="Dismiss error message" // Added aria-label
//                                      onClick={() => setError(null)}
//                                      className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-primarybox" // Improved focus and hover
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                  {/* Pagination and Page Size Controls */}
//                 <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//                     {/* Show per page dropdown */}
//                     <div className="flex items-center gap-2">
//                         <label htmlFor="paymentsPerPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Show entries:</label>
//                         <select
//                             id="paymentsPerPage"
//                             value={paymentsPerPage}
//                             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                             className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-primarybox dark:text-white" // Consistent styling
//                         >
//                             {pageSizeOptions.map(size => (
//                                 <option key={size} value={size}>{size}</option>
//                             ))}
//                         </select>
//                     </div>
//                      {/* Pagination Info */}
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Showing {filteredPayments.length > 0 ? indexOfFirstPayment + 1 : 0} - {Math.min(indexOfLastPayment, filteredPayments.length)} of {filteredPayments.length} results
//                         {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
//                     </p>
//                 </div>


//                 {/* Payments Table */}
//                 <PaymentTable
//                     filteredPayments={currentPayments} // Pass paginated data
//                     loadingPayments={loadingPayments}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                     handleEditPayment={handleEditPayment}
//                 />

//                  {/* Render Pagination only if there are pages */}
//                 {totalPages > 1 && (
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         paginate={paginate}
//                         goToPreviousPage={goToPreviousPage}
//                         goToNextPage={goToNextPage}
//                     />
//                 )}
//                  {/* Show message if no payments match filters */}
//                  {!loadingPayments && filteredPayments.length === 0 && (
//                      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                          No payments found matching your criteria.
//                      </div>
//                  )}
//             </div>

//             {/* Edit Payment Modal */}
//             <PaymentEditModal
//                 isEditModalOpen={isEditModalOpen}
//                 setIsEditModalOpen={setIsEditModalOpen}
//                 selectedPaymentForEdit={selectedPaymentForEdit}
//                 editFormData={editFormData}
//                 setEditFormData={setEditFormData}
//                 editLoading={editLoading}
//                 handleSaveEdit={handleSaveEdit}
//                 statusOptions={statusOptions.filter(s => s !== 'all')} // Exclude 'all' from edit options
//             />


//             {/* Filter Sidebar */}
//             <PaymentFilters
//                 showFilterModal={showFilterModal}
//                 setShowFilterModal={setShowFilterModal}
//                 searchTerm={searchTerm}
//                 dateRange={dateRange}
//                 setDateRange={setDateRange}
//                 statusFilter={statusFilter}
//                 setStatusFilter={setStatusFilter}
//                 currencyFilter={currencyFilter}
//                 setCurrencyFilter={setCurrencyFilter}
//                 paymentIdFilter={paymentIdFilter}
//                 setPaymentIdFilter={setPaymentIdFilter}
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter}
//                 currencyOptions={currencyOptions}
//                 statusOptions={statusOptions}
//                 clearFilters={clearFilters}
//             />
//         </div >
//     );
// };

// export default AdminPaymentsPage;




'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios, { AxiosError } from 'axios';
import apiConfig from '../../config/apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// Import shared types <-- *** CHANGED ***
import { Payment, ApiErrorResponse } from '@/types/payment'; // Adjust path if needed

// Import components
import PaymentTable from '../components/add-money/PaymentTable';
import PaymentFilters from '../components/add-money/PaymentFilters';
import PaymentEditModal from '../components/add-money/PaymentEditModal'; // Path corrected based on usage
import Pagination from '../components/Pagination';

axios.defaults.baseURL = apiConfig.baseUrl;

// *** REMOVED Local Interfaces (User, Currency, Payment, ApiErrorResponse) ***

const AdminPaymentsPage: React.FC = () => {
    // Use the imported Payment type
    const [payments, setPayments] = useState<Payment[]>([]);
    const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
    const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { token } = useAuth();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    // Filter state
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in progress' | 'completed' | 'canceled'>('all');
    const [paymentIdFilter, setPaymentIdFilter] = useState<string>('');
    const [amountFilter, setAmountFilter] = useState<string>('');
    const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    // Use the imported Payment type
    const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState<Payment | null>(null);
    const [editFormData, setEditFormData] = useState<{ status: string }>({
        status: ''
    });
    const [editLoading, setEditLoading] = useState<boolean>(false);

    // Sorting
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Pagination State
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
    const pageSizeOptions: number[] = [10, 25, 50];

    const handlePageSizeChange = (size: number) => {
        setPaymentsPerPage(size);
        setCurrentPage(1);
    };

    const fetchPayments = useCallback(async () => {
        setLoadingPayments(true);
        setIsRefreshing(true);
        setError(null);
        setSuccessMessage(null);
        try {
            // Assume API returns { data: Payment[] } or just Payment[]
            const response = await axios.get<{ data?: Payment[], message?: string } | Payment[]>('/admin/payments', {
                headers: { Authorization: `Bearer ${token}` },
            });

            let paymentData: Payment[] = [];
            if (Array.isArray(response.data)) {
                paymentData = response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                 // Handle nested structure like { data: [...] }
                paymentData = response.data.data;
            } else {
                console.warn("API response format unexpected:", response.data);
                 throw new Error("Invalid data structure received from API");
            }

             // Ensure all items match the Payment structure (optional, for safety)
            // paymentData = paymentData.filter(p => p && typeof p === 'object' && p._id);

            setPayments(paymentData);
            setFilteredPayments(paymentData); // Initialize filtered payments

        } catch (err: unknown) {
             let errorMessage = 'Failed to load payments';
             if (axios.isAxiosError(err)) {
                 const axiosError = err as AxiosError<ApiErrorResponse>;
                 errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
             } else if (err instanceof Error) {
                 errorMessage = err.message;
             }
             setError(errorMessage);
            console.error("Error fetching payments:", err);
        } finally {
            setLoadingPayments(false);
            setIsRefreshing(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
             fetchPayments();
        }
    }, [token, fetchPayments]);

    // Apply filters when any filter changes
    useEffect(() => {
        let results: Payment[] = [...payments];

        // Apply search filter (user name, email, and payment ID)
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            results = results.filter(payment =>
                payment._id.toLowerCase().includes(lowerSearchTerm) ||
                payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
                payment.user?.email?.toLowerCase().includes(lowerSearchTerm)
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
             try {
                const amount = parseFloat(amountFilter);
                if (!isNaN(amount)) {
                     results = results.filter(payment => {
                         try {
                             // Compare numbers, handle potential string amounts from API
                            return parseFloat(String(payment.amountToAdd)) === amount;
                         } catch {
                             return false;
                         }
                     });
                }
             } catch { /* Ignore invalid amountFilter */ }
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
                try {
                    const paymentDate = new Date(payment.createdAt);
                    return !isNaN(paymentDate.getTime()) && paymentDate >= fromDate;
                } catch { return false; }
            });
        }
        if (dateRange.to) {
            const toDate = new Date(dateRange.to);
            toDate.setHours(23, 59, 59, 999);
            results = results.filter(payment => {
                 try {
                     const paymentDate = new Date(payment.createdAt);
                     return !isNaN(paymentDate.getTime()) && paymentDate <= toDate;
                 } catch { return false; }
            });
        }

        // Apply sorting
        if (sortField) {
            results.sort((a, b) => {
                let valueA: unknown;
                let valueB: unknown;

                switch (sortField) {
                    case 'user':
                        valueA = a.user?.fullName?.toLowerCase() || '';
                        valueB = b.user?.fullName?.toLowerCase() || '';
                        break;
                    case 'email':
                        valueA = a.user?.email?.toLowerCase() || '';
                        valueB = b.user?.email?.toLowerCase() || '';
                        break;
                    case 'amount':
                        valueA = parseFloat(String(a.amountToAdd)) || 0;
                        valueB = parseFloat(String(b.amountToAdd)) || 0;
                        break;
                    case 'currency':
                         valueA = a.payInCurrency?.code?.toLowerCase() || '';
                         valueB = b.payInCurrency?.code?.toLowerCase() || '';
                         break;
                     case 'createdAt':
                         try { valueA = new Date(a.createdAt); } catch { valueA = new Date(0); }
                         try { valueB = new Date(b.createdAt); } catch { valueB = new Date(0); }
                         if (isNaN((valueA as Date).getTime())) valueA = new Date(0);
                         if (isNaN((valueB as Date).getTime())) valueB = new Date(0);
                         break;
                    case '_id':
                    case 'status':
                    case 'referenceCode': // Add other direct fields if needed
                        valueA = (a[sortField as keyof Payment] as string)?.toLowerCase() ?? '';
                        valueB = (b[sortField as keyof Payment] as string)?.toLowerCase() ?? '';
                        break;
                    default:
                        valueA = a[sortField as keyof Payment];
                        valueB = b[sortField as keyof Payment];
                }

                const comparison = () => {
                    if (valueA === valueB) return 0;
                    if (valueA === null || valueA === undefined) return -1;
                    if (valueB === null || valueB === undefined) return 1;
                    if (valueA instanceof Date && valueB instanceof Date) {
                        return valueA.getTime() > valueB.getTime() ? 1 : -1;
                    }
                     if (typeof valueA === 'number' && typeof valueB === 'number') {
                        return valueA > valueB ? 1 : -1;
                    }
                    return String(valueA).localeCompare(String(valueB));
                };

                return sortDirection === 'asc' ? comparison() : comparison() * -1;
            });
        }

        setFilteredPayments(results);
        // Avoid resetting page if only sorting changes
        if (
            searchTerm !== '' ||
            paymentIdFilter !== '' ||
            amountFilter !== '' ||
            currencyFilter !== 'all' ||
            statusFilter !== 'all' ||
            dateRange.from || dateRange.to
        ) {
             if(currentPage !== 1) setCurrentPage(1); // Reset only if filters applied and not on page 1
        }

    // Only depend on filter values, not `payments` directly to avoid loop on update
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payments, searchTerm, statusFilter, dateRange.from, dateRange.to, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);


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
        setPaymentIdFilter('');
        setAmountFilter('');
        setCurrencyFilter('all');
        // Don't reset sorting on clear filters
        // setSortField(null);
        // setSortDirection('asc');
        setCurrentPage(1); // Reset page on clear
    };

    const getStatusColor = (status: string): string => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'text-green-600 bg-green-600/20 ';
            case 'pending': return 'text-yellow-600 bg-yellow-600/20 ';
            case 'in progress': return 'text-blue-600 bg-blue-600/20 ';
            case 'canceled': case 'cancelled': return 'text-red-600 bg-red-600/20 ';
            default: return 'text-gray-600 bg-gray-600/20 ';
        }
    };

    const currencyOptions = React.useMemo(() => {
        const codes = payments
            .map(p => p.payInCurrency?.code)
            .filter((code): code is string => Boolean(code));
        return ['all', ...Array.from(new Set(codes)).sort()]; // Sort currencies
    }, [payments]);

    const statusOptions: ('all' | 'pending' | 'in progress' | 'completed' | 'canceled')[] = ['all', 'pending', 'in progress', 'completed', 'canceled'];

    // Use imported Payment type
    const handleEditPayment = (payment: Payment) => {
        setSelectedPaymentForEdit(payment);
        setEditFormData({ status: payment.status || '' });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async () => {
        if (!selectedPaymentForEdit) return;
        setEditLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const payload = { status: editFormData.status };
            await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

             // Update local state immediately
             const updatedPayments = payments.map(p =>
                 p._id === selectedPaymentForEdit._id
                     ? { ...p, status: editFormData.status }
                     : p
             );
             setPayments(updatedPayments); // Update base list, useEffect will refilter

            setSuccessMessage('Payment status updated successfully!');
            setIsEditModalOpen(false);
            setSelectedPaymentForEdit(null);
        } catch (err: unknown) {
             let errorMessage = 'Failed to update payment status';
             if (axios.isAxiosError(err)) {
                 const axiosError = err as AxiosError<ApiErrorResponse>;
                 errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
             } else if (err instanceof Error) {
                 errorMessage = err.message;
             }
             setError(errorMessage);
            console.error("Error updating payment status:", err);
        } finally {
            setEditLoading(false);
        }
    };

    const refreshData = () => {
        fetchPayments();
    };

    // Pagination logic
    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
    const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
             setCurrentPage(pageNumber);
        }
    };
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <div className="space-y-6">
                {/* Header & Actions */}
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <h1 className="text-2xl font-bold text-mainheading dark:text-white">Payment Management</h1>
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search ID, Name, Email..."
                                className="w-full sm:w-64 rounded-full py-2 pl-10 pr-3 h-12 border transition-shadow ease-in-out duration-300 border-neutral-900/30 dark:border-white/30 hover:shadow-md dark:hover:shadow-white/20 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary placeholder:text-neutral-500 dark:placeholder:text-neutral-400 bg-white dark:bg-primarybox"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        <button
                            onClick={() => setShowFilterModal(true)}
                            className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-base px-6 py-2 h-12 rounded-full hover:bg-primaryhover transition-colors"
                        >
                            <Filter size={18} />
                            Filters
                        </button>
                        <button
                            onClick={refreshData}
                            disabled={isRefreshing || loadingPayments}
                            className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw className={`size-5 ${isRefreshing ? "animate-spin" : ""}`} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <AnimatePresence>
                    {successMessage && (
                         <motion.div
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                            className="bg-green-50 border border-green-300 dark:bg-green-900/30 dark:border-green-700 p-4 rounded-md shadow-sm"
                        >
                            <div className="flex items-start">
                                <Check className="h-5 w-5 flex-shrink-0 pt-0.5 text-green-500 dark:text-green-400" />
                                <p className="ml-3 flex-1 text-sm font-medium text-green-800 dark:text-green-300">{successMessage}</p>
                                <button aria-label="Dismiss success message" onClick={() => setSuccessMessage(null)} className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-primarybox">
                                    <X size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                            className="bg-red-50 border border-red-300 dark:bg-red-900/30 dark:border-red-700 p-4 rounded-md shadow-sm"
                        >
                            <div className="flex items-start">
                                <X className="h-5 w-5 flex-shrink-0 pt-0.5 text-red-500 dark:text-red-400" />
                                <p className="ml-3 flex-1 text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
                                <button aria-label="Dismiss error message" onClick={() => setError(null)} className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-primarybox">
                                    <X size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                 {/* Pagination and Page Size Controls */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="paymentsPerPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Show entries:</label>
                        <select
                            id="paymentsPerPage"
                            value={paymentsPerPage}
                            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                            className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-primarybox dark:text-white"
                        >
                            {pageSizeOptions.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {filteredPayments.length > 0 ? indexOfFirstPayment + 1 : 0} - {Math.min(indexOfLastPayment, filteredPayments.length)} of {filteredPayments.length} results
                        {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
                    </p>
                </div>

                {/* Payments Table */}
                <PaymentTable
                    filteredPayments={currentPayments} // Pass paginated data
                    loadingPayments={loadingPayments}
                    getStatusColor={getStatusColor}
                    toggleSort={toggleSort} // Pass the flexible toggleSort
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleEditPayment={handleEditPayment} // Pass the correctly typed handler
                />

                 {/* Pagination Component */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        paginate={paginate}
                        goToPreviousPage={goToPreviousPage}
                        goToNextPage={goToNextPage}
                    />
                )}
                 {!loadingPayments && filteredPayments.length === 0 && payments.length > 0 && (
                     <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                         No payments found matching your criteria.
                     </div>
                 )}
                 {!loadingPayments && payments.length === 0 && (
                     <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                         No payments found.
                     </div>
                 )}
            </div>

            {/* Edit Payment Modal */}
            <PaymentEditModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                selectedPaymentForEdit={selectedPaymentForEdit} // Uses imported Payment type
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                editLoading={editLoading}
                handleSaveEdit={handleSaveEdit}
                // Pass only valid status options for editing
                statusOptions={statusOptions.filter(s => s !== 'all') as ('pending' | 'in progress' | 'completed' | 'canceled')[]}
            />

            {/* Filter Sidebar */}
            <PaymentFilters
                showFilterModal={showFilterModal}
                setShowFilterModal={setShowFilterModal}
                // Pass search term state (it's managed here, not directly in filters)
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} // Allow filters to clear/modify search maybe? Usually search is separate.
                dateRange={dateRange}
                setDateRange={setDateRange}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                currencyFilter={currencyFilter}
                setCurrencyFilter={setCurrencyFilter}
                paymentIdFilter={paymentIdFilter}
                setPaymentIdFilter={setPaymentIdFilter}
                amountFilter={amountFilter}
                setAmountFilter={setAmountFilter}
                currencyOptions={currencyOptions} // Pass derived options
                statusOptions={statusOptions} // Pass all status options including 'all'
                clearFilters={clearFilters}
            />
        </div >
    );
};

export default AdminPaymentsPage;