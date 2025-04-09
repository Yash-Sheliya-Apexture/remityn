// // components/admin/payments/PaymentFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, X } from 'lucide-react';
// import CustomDropdown from './CustomDropdown';

// interface PaymentFiltersProps {
//     showFilterModal: boolean;
//     setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
//     searchTerm: string;
//     setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
//     dateRange: { from: Date | null; to: Date | null };
//     setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>;
//     statusFilter: string;
//     setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyFilter: string;
//     setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
//     paymentIdFilter: string;
//     setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[];
//     statusOptions: string[];
//     clearFilters: () => void;
// }

// const PaymentFilters: React.FC<PaymentFiltersProps> = ({
//     showFilterModal,
//     setShowFilterModal,
//     searchTerm,
//     setSearchTerm,
//     dateRange,
//     setDateRange,
//     statusFilter,
//     setStatusFilter,
//     currencyFilter,
//     setCurrencyFilter,
//     paymentIdFilter,
//     setPaymentIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions,
//     clearFilters,
// }) => {
//     const filterModalRef = useRef(null);
//     const [showCalendar, setShowCalendar] = useState(false);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setShowFilterModal(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showFilterModal, setShowFilterModal]);

//     return (
//         <AnimatePresence>
//             {showFilterModal && (
//                 <motion.div
//                     ref={filterModalRef}
//                     initial={{ opacity: 0, x: '100%' }}
//                     animate={{ opacity: 1, x: '0%' }}
//                     exit={{ opacity: 0, x: '100%' }}
//                     transition={{ duration: 0.3 }}
//                     className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                 >
//                     <div className="p-6 border-b border-gray-200">
//                         <div className="flex justify-between items-center">
//                             <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                             <button
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="text-gray-400 hover:text-gray-500"
//                             >
//                                 <X size={20} />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="p-6 space-y-6">
//                         {/* Payment ID Filter */}
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-1">
//                                 Payment ID
//                             </label>
//                             <input
//                                 type="text"
//                                 value={paymentIdFilter}
//                                 onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                 placeholder="Filter by Payment ID"
//                                 className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                             />
//                         </div>
//                         {/* Amount Filter */}
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-1">
//                                 Amount
//                             </label>
//                             <input
//                                 type="number"
//                                 value={amountFilter}
//                                 onChange={(e) => setAmountFilter(e.target.value)}
//                                 placeholder="Filter by Amount"
//                                 className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                             />
//                         </div>

//                         {/* Currency Filter - Custom Dropdown */}
//                         <CustomDropdown
//                             label="Currency"
//                             value={currencyFilter === 'all' ? null : currencyFilter}
//                             onChange={setCurrencyFilter}
//                             options={currencyOptions}
//                         />

//                         {/* Status Filter - Custom Dropdown */}
//                         <CustomDropdown
//                             label="Status"
//                             value={statusFilter === 'all' ? null : statusFilter}
//                             onChange={setStatusFilter}
//                             options={statusOptions}
//                         />

//                         {/* Date Range Filter */}
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-1">
//                                 Date Range
//                             </label>
//                             <div className="relative">
//                                 <button className='w-full'>
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowCalendar(!showCalendar)}
//                                         className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                                     >
//                                         <span>
//                                             {dateRange.from ? (
//                                                 dateRange.to ? (
//                                                     `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                 )
//                                             ) : dateRange.to ? (
//                                                 `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                             ) : (
//                                                 'Select date range'
//                                             )}
//                                         </span>
//                                         <CalendarIcon className="size-5 text-gray-400" />
//                                     </button>
//                                 </button>

//                                 <AnimatePresence>
//                                     {showCalendar && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, y: 10 }}
//                                             className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                                         >
//                                             <Calendar
//                                                 mode="range"
//                                                 selected={dateRange}
//                                                 onSelect={(range) => {
//                                                     setDateRange(range);
//                                                     setShowCalendar(false);
//                                                 }}
//                                             />
//                                             {(dateRange.from || dateRange.to) && (
//                                                 <div className="mt-2 flex justify-end">
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => {
//                                                             setDateRange({ from: null, to: null });
//                                                             setShowCalendar(false);
//                                                         }}
//                                                         className="text-sm text-error"
//                                                     >
//                                                         Clear dates
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="px-6 flex justify-end gap-3">
//                         <button
//                             type="button"
//                             onClick={clearFilters}
//                             className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                             Clear All
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setShowFilterModal(false)}
//                             className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                             Apply Filters
//                         </button>
//                     </div>
//                     {/* Applied Filters Display inside Sidebar */}
//                     <div className="px-6 py-4">
//                         <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                         <div className="space-y-2">
//                             {searchTerm && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>User Search: {searchTerm}</span>
//                                     <button onClick={() => setSearchTerm('')} className="ml-2">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {paymentIdFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Payment ID: {paymentIdFilter}</span>
//                                     <button onClick={() => setPaymentIdFilter('')} className="ml-2">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {amountFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Amount: {amountFilter}</span>
//                                     <button onClick={() => setAmountFilter('')} className="ml-2">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {currencyFilter && currencyFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Currency: {currencyFilter}</span>
//                                     <button onClick={() => setCurrencyFilter('all')} className="ml-2">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {statusFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Status: {statusFilter}</span>
//                                     <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {(dateRange.from || dateRange.to) && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                         {dateRange.from && dateRange.to ? ' - ' : ''}
//                                         {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                     </span>
//                                     <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default PaymentFilters;

// // components/admin/payments/PaymentFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, X } from 'lucide-react';
// import CustomDropdown from './CustomDropdown';

// interface PaymentFiltersProps {
//     showFilterModal: boolean;
//     setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
//     searchTerm: string;
//     setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
//     dateRange: { from: Date | null; to: Date | null };
//     setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>;
//     statusFilter: string;
//     setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyFilter: string;
//     setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
//     paymentIdFilter: string;
//     setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[];
//     statusOptions: string[];
//     clearFilters: () => void;
// }

// const PaymentFilters: React.FC<PaymentFiltersProps> = ({
//     showFilterModal,
//     setShowFilterModal,
//     searchTerm,
//     setSearchTerm,
//     dateRange,
//     setDateRange,
//     statusFilter,
//     setStatusFilter,
//     currencyFilter,
//     setCurrencyFilter,
//     paymentIdFilter,
//     setPaymentIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions,
//     clearFilters,
// }) => {
//     const filterModalRef = useRef(null);
//     const [showCalendar, setShowCalendar] = useState(false);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setShowFilterModal(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showFilterModal, setShowFilterModal]);

//     return (
//         <AnimatePresence>
//             {showFilterModal && (
//                 <motion.div
//                     ref={filterModalRef}
//                     initial={{ opacity: 0, x: '100%' }}
//                     animate={{ opacity: 1, x: '0%' }}
//                     exit={{ opacity: 0, x: '100%' }}
//                     transition={{ duration: 0.3 }}
//                     className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                 >
//                     <div className="p-6 border-b border-gray-200">
//                         <div className="flex justify-between items-center">
//                             <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                             <button
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="text-gray-400 hover:text-gray-500"
//                             >
//                                 <X size={20} />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="p-6 space-y-6">
//                         {/* Payment ID Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="paymentIdFilter" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
//                                 Payment ID
//                             </label>
//                             <input
//                                 type="text"
//                                 id="paymentIdFilter"
//                                 value={paymentIdFilter}
//                                 onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                 placeholder="Filter by Payment ID"
//                                 className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                             />
//                         </div>
//                         {/* Amount Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="amountFilter" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
//                                 Amount
//                             </label>
//                             <input
//                                 type="number"
//                                 id="amountFilter"
//                                 value={amountFilter}
//                                 onChange={(e) => setAmountFilter(e.target.value)}
//                                 placeholder="Filter by Amount"
//                                 className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                             />
//                         </div>

//                         {/* Currency Filter - Custom Dropdown */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <CustomDropdown
//                                 label="Currency"
//                                 value={currencyFilter === 'all' ? null : currencyFilter}
//                                 onChange={setCurrencyFilter}
//                                 options={currencyOptions}
//                             />
//                         </div>

//                         {/* Status Filter - Custom Dropdown */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <CustomDropdown
//                                 label="Status"
//                                 value={statusFilter === 'all' ? null : statusFilter}
//                                 onChange={setStatusFilter}
//                                 options={statusOptions}
//                             />
//                         </div>

//                         {/* Date Range Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="dateRange" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
//                                 Date Range
//                             </label>
//                             <div className="relative">
//                                 <button className='w-full'>
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowCalendar(!showCalendar)}
//                                         className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                                     >
//                                         <span>
//                                             {dateRange.from ? (
//                                                 dateRange.to ? (
//                                                     `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                 )
//                                             ) : dateRange.to ? (
//                                                 `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                             ) : (
//                                                 'Select date range'
//                                             )}
//                                         </span>
//                                         <CalendarIcon className="size-5 text-gray-400" />
//                                     </button>
//                                 </button>

//                                 <AnimatePresence>
//                                     {showCalendar && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, y: 10 }}
//                                             className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                                         >
//                                             <Calendar
//                                                 mode="range"
//                                                 selected={dateRange}
//                                                 onSelect={(range) => {
//                                                     setDateRange(range);
//                                                     setShowCalendar(false);
//                                                 }}
//                                             />
//                                             {(dateRange.from || dateRange.to) && (
//                                                 <div className="mt-2 flex justify-end">
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => {
//                                                             setDateRange({ from: null, to: null });
//                                                             setShowCalendar(false);
//                                                         }}
//                                                         className="text-sm text-error"
//                                                     >
//                                                         Clear dates
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="px-6 flex justify-end gap-3 pb-6 border-b border-gray-200"> {/* Added padding bottom and border */}
//                         <button
//                             type="button"
//                             onClick={clearFilters}
//                             className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none hover:border-gray-400 transition-colors" // Improved hover effect
//                         >
//                             Clear All
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setShowFilterModal(false)}
//                             className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none" // Improved hover effect
//                         >
//                             Apply Filters
//                         </button>
//                     </div>
//                     {/* Applied Filters Display inside Sidebar */}
//                     <div className="px-6 py-4">
//                         <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                         <div className="space-y-2">
//                             {searchTerm && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>User Search: {searchTerm}</span>
//                                     <button onClick={() => setSearchTerm('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {paymentIdFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Payment ID: {paymentIdFilter}</span>
//                                     <button onClick={() => setPaymentIdFilter('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {amountFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Amount: {amountFilter}</span>
//                                     <button onClick={() => setAmountFilter('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {currencyFilter && currencyFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Currency: {currencyFilter}</span>
//                                     <button onClick={() => setCurrencyFilter('all')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {statusFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Status: {statusFilter}</span>
//                                     <button onClick={() => setStatusFilter('all')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {(dateRange.from || dateRange.to) && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                         {dateRange.from && dateRange.to ? ' - ' : ''}
//                                         {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                     </span>
//                                     <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {Object.keys(dateRange).length > 0 && !dateRange.from && !dateRange.to && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Date: No range selected</span>
//                                     <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2 hover:text-indigo-900 transition-colors">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default PaymentFilters;

"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar"; // Assuming shadcn Calendar
import { format } from "date-fns";
import { Calendar as CalendarIcon, X, Filter } from "lucide-react"; // Added Filter icon
import { Button } from "@/components/ui/button"; // Using shadcn Button

// Assuming CustomDropdown exists, adjust path if needed
import CustomDropdown from "./CustomDropdown";

// Define the specific status type expected by the parent state
type PaymentStatus =
  | "all"
  | "pending"
  | "in progress"
  | "completed"
  | "canceled";

interface PaymentFiltersProps {
  showFilterModal: boolean;
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  dateRange: { from: Date | null; to: Date | null };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ from: Date | null; to: Date | null }>
  >;
  statusFilter: PaymentStatus; // <-- Use the specific type here
  setStatusFilter: React.Dispatch<React.SetStateAction<PaymentStatus>>; // <-- Use the specific type here
  currencyFilter: string;
  setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
  paymentIdFilter: string;
  setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
  amountFilter: string;
  setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
  currencyOptions: string[];
  statusOptions: string[]; // Can remain string[] if 'all' is handled correctly
  clearFilters: () => void;
}

const PaymentFilters: React.FC<PaymentFiltersProps> = ({
  showFilterModal,
  setShowFilterModal,
  searchTerm, // Receive search term to display/clear
  setSearchTerm, // Receive setter to clear search
  dateRange,
  setDateRange,
  statusFilter,
  setStatusFilter,
  currencyFilter,
  setCurrencyFilter,
  paymentIdFilter,
  setPaymentIdFilter,
  amountFilter,
  setAmountFilter,
  currencyOptions, // Expect 'all' included
  statusOptions, // Expect 'all' included
  clearFilters,
}) => {
  const filterModalRef = useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarButtonRef = useRef<HTMLButtonElement>(null); // Ref for calendar button

  // Close modal/calendar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close calendar if click is outside calendar and not on the calendar button
      if (
        (showCalendar && !target.isConnected) || // Handle detached elements during navigation
        !(
          target instanceof Element &&
          (target.closest(".rdp") || target.closest("[data-calendar-button]"))
        )
      ) {
        setShowCalendar(false);
      }

      // Close filter modal if click is outside modal and not on a popover/dropdown
      if (
        showFilterModal &&
        filterModalRef.current &&
        !filterModalRef.current.contains(target) &&
        !(
          target instanceof Element &&
          target.closest('[id^="radix-"],[data-radix-popper-content-wrapper]')
        )
      ) {
        // Don't close if clicking the calendar button itself while modal is open
        if (
          !(
            target instanceof Element &&
            target.closest("[data-calendar-button]")
          )
        ) {
          setShowFilterModal(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilterModal, setShowFilterModal, showCalendar]); // Dependencies

  // Helper to format date range display
  const formatDateRangeDisplay = () => {
    if (dateRange.from) {
      const fromStr = format(dateRange.from, "MMM dd, yyyy");
      if (dateRange.to) {
        const toStr = format(dateRange.to, "MMM dd, yyyy");
        return fromStr === toStr ? fromStr : `${fromStr} - ${toStr}`;
      }
      return `From ${fromStr}`;
    }
    return dateRange.to
      ? `Until ${format(dateRange.to, "MMM dd, yyyy")}`
      : "Select date range";
  };

  // Helper for rendering applied filters
  const renderAppliedFilter = (
    label: string,
    value: string | null | undefined,
    onClear: () => void
  ) => {
    if (!value || value === "all") return null;
    return (
      <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full px-3 py-1 text-xs sm:text-sm flex items-center justify-between gap-2 whitespace-nowrap">
        <span className="truncate">
          {label}: {value}
        </span>
        <button
          onClick={onClear}
          className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200 transition-colors flex-shrink-0 p-0.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-800/50"
        >
          <X size={14} />
        </button>
      </div>
    );
  };

  const handleClearDates = () => {
    setDateRange({ from: null, to: null });
    setShowCalendar(false);
  };

  // Handle range selection and close calendar
  const handleDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    setDateRange({ from: range?.from ?? null, to: range?.to ?? null });
    // Close calendar only when a complete range is selected or a single day
    if (range?.from && (range.to || !dateRange.from)) {
      // Close if 'from' is set and ('to' is also set OR 'from' was previously null)
      setShowCalendar(false);
    } else if (!range?.from && !range?.to) {
      // Close if cleared
      setShowCalendar(false);
    }
  };

  return (
    <AnimatePresence>
      {showFilterModal && (
        <>
          {/* Backdrop for modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40"
            onClick={() => setShowFilterModal(false)} // Close on backdrop click
          />
          <motion.div
            ref={filterModalRef}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 25,
              duration: 0.3,
            }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-background shadow-xl z-50 border-l border-gray-200 dark:border-neutral-800 flex flex-col" // Use background for dark mode consistency
          >
            {/* Header */}
            <div className="p-5 flex justify-between items-center border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Filter size={20} /> Filter Payments
              </h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded-full -m-1"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Filter Options */}
            <div className="p-5 space-y-5 overflow-y-auto flex-grow">
              {/* Payment ID Filter */}
              <div>
                <label
                  htmlFor="paymentIdFilter"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Payment ID
                </label>
                <input
                  type="text"
                  id="paymentIdFilter"
                  value={paymentIdFilter}
                  onChange={(e) => setPaymentIdFilter(e.target.value)}
                  placeholder="Enter Payment ID"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary sm:text-sm bg-white dark:bg-neutral-800 dark:text-white"
                />
              </div>

              {/* Amount Filter */}
              <div>
                <label
                  htmlFor="amountFilter"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amountFilter"
                  value={amountFilter}
                  onChange={(e) => setAmountFilter(e.target.value)}
                  placeholder="Enter exact amount"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary sm:text-sm bg-white dark:bg-neutral-800 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" // Hide number spinners
                />
              </div>

              {/* Currency Filter - Custom Dropdown */}
              <div>
                <CustomDropdown
                  label="Status"
                  value={statusFilter} // Pass the specific status value
                  onChange={(value) =>
                    setStatusFilter((value || "all") as PaymentStatus)
                  } // Cast to ensure type safety
                  options={statusOptions}
                />
              </div>

              {/* Status Filter - Custom Dropdown */}
              <div>
                <CustomDropdown
                  label="Status"
                  value={statusFilter}
                  onChange={(value) =>
                    setStatusFilter((value || "all") as PaymentStatus)
                  } // Keep cast from Error 1 fix
                  options={statusOptions}
                  // placeholder="Select Status" // <-- REMOVE THIS LINE
                />
              </div>

              {/* Date Range Filter */}
              <div className="relative">
                <label
                  htmlFor="dateRangeButton"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Date Range
                </label>
                <button
                  ref={calendarButtonRef}
                  type="button"
                  id="dateRangeButton"
                  data-calendar-button // Add data attribute
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="flex items-center w-full justify-between border border-gray-300 dark:border-neutral-700 rounded-md px-3 py-2 bg-white dark:bg-neutral-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary"
                >
                  <span
                    className={
                      dateRange.from || dateRange.to
                        ? ""
                        : "text-gray-400 dark:text-gray-500"
                    }
                  >
                    {formatDateRangeDisplay()}
                  </span>
                  <CalendarIcon className="size-4 text-gray-400 dark:text-gray-500 ml-2" />
                </button>

                <AnimatePresence>
                  {showCalendar && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 5 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute mt-1 bg-white dark:bg-neutral-900 p-3 rounded-md shadow-lg z-20 border border-gray-300 dark:border-neutral-700 right-0 sm:right-auto" // Adjust position as needed
                      // Prevent clicks inside calendar from closing it via modal's listener
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Calendar
                        mode="range"
                        selected={
                          dateRange as { from: Date; to: Date } | undefined
                        } // Cast for shadcn Calendar
                        onSelect={handleDateSelect}
                        numberOfMonths={1}
                        className="dark:[&>div]:bg-neutral-900 dark:text-white" // Basic dark mode for calendar
                        classNames={{
                          day_selected:
                            "bg-primary text-secondary hover:bg-primaryhover focus:bg-primary focus:text-secondary dark:bg-primary dark:text-secondary dark:hover:bg-primaryhover", // Style selected day
                          day_range_middle:
                            "aria-selected:bg-primary/20 aria-selected:text-primary dark:aria-selected:bg-primary/30 dark:aria-selected:text-white", // Style range middle
                          day_range_start: "aria-selected:rounded-l-full",
                          day_range_end: "aria-selected:rounded-r-full",
                          caption_label: "dark:text-white",
                          nav_button:
                            "dark:text-white dark:hover:bg-neutral-800",
                          head_cell: "dark:text-gray-400",
                          day: "dark:text-white dark:hover:bg-neutral-800",
                          day_outside: "dark:text-gray-600",
                          day_disabled: "dark:text-gray-600",
                        }}
                      />
                      {(dateRange.from || dateRange.to) && (
                        <div className="mt-2 flex justify-end border-t border-gray-200 dark:border-neutral-700 pt-2">
                          <Button
                            variant="link"
                            size="sm"
                            onClick={handleClearDates}
                            className="text-xs text-error dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 px-1"
                          >
                            Clear dates
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Applied Filters Display inside Sidebar */}
            <div className="px-5 py-3 border-b border-t border-gray-200 dark:border-neutral-800 flex-shrink-0">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Applied Filters
              </h4>
              <div className="flex flex-wrap gap-2">
                {renderAppliedFilter("Search", searchTerm, () =>
                  setSearchTerm("")
                )}
                {renderAppliedFilter("Payment ID", paymentIdFilter, () =>
                  setPaymentIdFilter("")
                )}
                {renderAppliedFilter("Amount", amountFilter, () =>
                  setAmountFilter("")
                )}
                {renderAppliedFilter(
                  "Currency",
                  currencyFilter === "all" ? null : currencyFilter,
                  () => setCurrencyFilter("all")
                )}
                {renderAppliedFilter(
                  "Status",
                  statusFilter === "all" ? null : statusFilter,
                  () => setStatusFilter("all")
                )}
                {renderAppliedFilter(
                  "Date",
                  formatDateRangeDisplay() !== "Select date range"
                    ? formatDateRangeDisplay()
                    : null,
                  handleClearDates
                )}

                {/* Show message if no filters applied */}
                {!searchTerm &&
                  !paymentIdFilter &&
                  !amountFilter &&
                  currencyFilter === "all" &&
                  statusFilter === "all" &&
                  !dateRange.from &&
                  !dateRange.to && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                      No filters applied.
                    </span>
                  )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-5 flex justify-between gap-3 flex-shrink-0">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full sm:w-auto dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-800"
              >
                Clear All
              </Button>
              <Button
                onClick={() => setShowFilterModal(false)}
                className="bg-primary text-secondary hover:bg-primaryhover w-full sm:w-auto"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentFilters;
