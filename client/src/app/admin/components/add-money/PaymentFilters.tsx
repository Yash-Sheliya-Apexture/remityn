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


// components/admin/payments/PaymentFilters.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
// Assume CustomDropdown is correctly imported from its actual location
import CustomDropdown from './CustomDropdown'; // Or adjust path
import { PaymentStatus } from '../../../../types/payment'; // Import shared PaymentStatus type - Adjust path if needed

interface PaymentFiltersProps {
    showFilterModal: boolean;
    setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
    // Keep general filters as string/simple types
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    paymentIdFilter: string;
    setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
    amountFilter: string;
    setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
    currencyFilter: string; // Can remain string or 'all' | string
    setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
    currencyOptions: string[]; // string array is fine
    // Date range type
    dateRange: { from: Date | null; to: Date | null };
    setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>;
    // Use specific types for status filter
    statusFilter: PaymentStatus; // Use the specific union type
    setStatusFilter: React.Dispatch<React.SetStateAction<PaymentStatus>>; // Use the specific state setter type
    statusOptions: PaymentStatus[]; // Expect an array of the specific statuses
    clearFilters: () => void;
}

const PaymentFilters: React.FC<PaymentFiltersProps> = ({
    showFilterModal,
    setShowFilterModal,
    searchTerm, // Not used directly in this component's UI, but kept for props consistency
    setSearchTerm, // Not used directly in this component's UI
    dateRange,
    setDateRange,
    statusFilter,
    setStatusFilter, // Now correctly typed
    currencyFilter,
    setCurrencyFilter,
    paymentIdFilter,
    setPaymentIdFilter,
    amountFilter,
    setAmountFilter,
    currencyOptions,
    statusOptions, // Now correctly typed
    clearFilters,
}) => {
    const filterModalRef = useRef<HTMLDivElement>(null); // Use HTMLDivElement
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { // Type event as MouseEvent
            // Ensure event.target is a Node before calling contains
            if (
                showFilterModal &&
                filterModalRef.current &&
                event.target instanceof Node && // Type guard
                !filterModalRef.current.contains(event.target) &&
                 // Keep Radix check using closest which works on Element
                !(event.target instanceof Element && event.target.closest('[id^="radix-ui-popper-"]'))
            ) {
                setShowFilterModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilterModal, setShowFilterModal]);

    // --- JSX Logic Remains the Same ---
    // CustomDropdown for Status will receive the correctly typed props

    return (
        <AnimatePresence>
            {showFilterModal && (
                <motion.div
                    ref={filterModalRef}
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: '0%' }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.3 }}
                    // Added dark mode styles
                    className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-background shadow-xl z-50 border-l border-gray-200 dark:border-gray-700 overflow-y-auto"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter Payments</h3>
                            <button
                                onClick={() => setShowFilterModal(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                     {/* Filter Inputs Section */}
                    <div className="p-6 space-y-6">
                        {/* Payment ID Filter */}
                        <div> {/* Wrapped in div for consistent spacing */}
                            <label htmlFor="paymentIdFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Payment ID
                            </label>
                            <input
                                type="text"
                                id="paymentIdFilter"
                                value={paymentIdFilter}
                                onChange={(e) => setPaymentIdFilter(e.target.value)}
                                placeholder="Filter by Payment ID"
                                // Added dark mode styles
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>

                        {/* Amount Filter */}
                        <div> {/* Wrapped in div */}
                            <label htmlFor="amountFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amountFilter"
                                value={amountFilter}
                                onChange={(e) => setAmountFilter(e.target.value)}
                                placeholder="Filter by Amount"
                                // Added dark mode styles
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>

                        {/* Currency Filter - Custom Dropdown */}
                        <div> {/* Wrapped in div */}
                            <CustomDropdown
                                label="Currency"
                                // Pass null if 'all' is selected for CustomDropdown flexibility
                                value={currencyFilter === 'all' ? null : currencyFilter}
                                // Ensure CustomDropdown handles string | null value
                                onChange={(value) => setCurrencyFilter(value === null ? 'all' : value)}
                                options={currencyOptions} // Pass the string array
                            />
                        </div>

                        {/* Status Filter - Custom Dropdown */}
                        <div> {/* Wrapped in div */}
                            <CustomDropdown
                                label="Status"
                                // Pass null if 'all' is selected
                                value={statusFilter === 'all' ? null : statusFilter}
                                // Ensure CustomDropdown's onChange provides the selected PaymentStatus or null
                                onChange={(value) => setStatusFilter(value === null ? 'all' : value as PaymentStatus)}
                                options={statusOptions} // Pass the PaymentStatus array
                            />
                        </div>

                        {/* Date Range Filter */}
                        <div> {/* Wrapped in div */}
                            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Date Range
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    // Added dark mode styles
                                    className="flex items-center w-full justify-between border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
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
                                    <CalendarIcon className="size-5 text-gray-400 dark:text-gray-500" />
                                </button>

                                <AnimatePresence>
                                    {showCalendar && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            // Added dark mode styles
                                            className="absolute mt-2 bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg z-10 border border-gray-300 dark:border-gray-600"
                                        >
                                            <Calendar
                                                mode="range"
                                                selected={dateRange as { from: Date | undefined; to: Date | undefined }} // Cast for Calendar component if needed
                                                onSelect={(range) => {
                                                    // Ensure range has from/to, potentially null
                                                    const newRange = { from: range?.from ?? null, to: range?.to ?? null };
                                                    setDateRange(newRange);
                                                    // Optionally close calendar only if a full range is selected or a single date
                                                    // if (newRange.from && newRange.to) {
                                                      setShowCalendar(false);
                                                    // }
                                                }}
                                                // Add necessary props for dark mode styling if `ui/calendar` supports it
                                            />
                                            {(dateRange.from || dateRange.to) && (
                                                <div className="mt-2 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setDateRange({ from: null, to: null });
                                                            setShowCalendar(false);
                                                        }}
                                                        className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
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


                    {/* Footer Buttons */}
                     <div className="px-6 pb-6 pt-4 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={clearFilters}
                             // Added dark mode styles
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            Clear All
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowFilterModal(false)}
                            // Added dark mode styles
                            className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primaryhover focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary dark:focus:ring-offset-gray-800"
                        >
                            Apply Filters
                        </button>
                    </div>


                    {/* Applied Filters Display */}
                    {/* No type changes needed here, just ensure display logic is correct */}
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Applied Filters</h4>
                         <div className="flex flex-wrap gap-2">
                            {/* Search Term (Handled in parent, display if needed) */}
                            {/* {searchTerm && (...) } */}

                            {paymentIdFilter && (
                                <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full px-3 py-1 text-xs flex items-center">
                                    <span>ID: {paymentIdFilter}</span>
                                    <button onClick={() => setPaymentIdFilter('')} className="ml-1.5 text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                            {amountFilter && (
                                <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full px-3 py-1 text-xs flex items-center">
                                    <span>Amount: {amountFilter}</span>
                                    <button onClick={() => setAmountFilter('')} className="ml-1.5 text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                            {currencyFilter && currencyFilter !== 'all' && (
                                <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full px-3 py-1 text-xs flex items-center">
                                    <span>Currency: {currencyFilter}</span>
                                    <button onClick={() => setCurrencyFilter('all')} className="ml-1.5 text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                            {statusFilter !== 'all' && (
                                <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full px-3 py-1 text-xs flex items-center capitalize">
                                    <span>Status: {statusFilter}</span>
                                    <button onClick={() => setStatusFilter('all')} className="ml-1.5 text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                            {(dateRange.from || dateRange.to) && (
                                <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full px-3 py-1 text-xs flex items-center">
                                    <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
                                        {dateRange.from && dateRange.to ? ' - ' : ''}
                                        {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
                                        {!dateRange.from && dateRange.to ? 'Until ' : ''}
                                        {dateRange.from && !dateRange.to ? 'From ' : ''}
                                    </span>
                                    <button onClick={() => setDateRange({ from: null, to: null })} className="ml-1.5 text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                             {/* Show message if no filters are active */}
                             {!paymentIdFilter && !amountFilter && currencyFilter === 'all' && statusFilter === 'all' && !dateRange.from && !dateRange.to && (
                                 <p className="text-xs text-gray-500 dark:text-gray-400">No filters applied.</p>
                             )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PaymentFilters;