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







// // components/admin/payments/PaymentFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, X } from 'lucide-react';
// import CustomDropdown from './CustomDropdown';
// import { IoClose } from 'react-icons/io5';

// interface PaymentFiltersProps {
//     showFilterModal: boolean;
//     setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
//     // Keep general filters as string/simple types
//     searchTerm: string;
//     setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
//     paymentIdFilter: string;
//     setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyFilter: string; // Can remain string or 'all' | string
//     setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[]; // string array is fine
//     // Date range type
//     dateRange: { from: Date | null; to: Date | null };
//     setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>;
//     // Use specific types for status filter
//     statusFilter: PaymentStatus; // Use the specific union type
//     setStatusFilter: React.Dispatch<React.SetStateAction<PaymentStatus>>; // Use the specific state setter type
//     statusOptions: PaymentStatus[]; // Expect an array of the specific statuses
//     clearFilters: () => void;
// }

// const PaymentFilters: React.FC<PaymentFiltersProps> = ({
//     showFilterModal,
//     setShowFilterModal,
//     searchTerm, // Not used directly in this component's UI, but kept for props consistency
//     setSearchTerm, // Not used directly in this component's UI
//     dateRange,
//     setDateRange,
//     statusFilter,
//     setStatusFilter, // Now correctly typed
//     currencyFilter,
//     setCurrencyFilter,
//     paymentIdFilter,
//     setPaymentIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions, // Now correctly typed
//     clearFilters,
// }) => {
//     const filterModalRef = useRef<HTMLDivElement>(null); // Use HTMLDivElement
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [isMobile, setIsMobile] = useState(false); // State to track mobile view

//     // --- Temporary filter states ---
//     const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);
//     const [tempDateRange, setTempDateRange] = useState(dateRange);
//     const [tempStatusFilter, setTempStatusFilter] = useState(statusFilter);
//     const [tempCurrencyFilter, setTempCurrencyFilter] = useState(currencyFilter);
//     const [tempPaymentIdFilter, setTempPaymentIdFilter] = useState(paymentIdFilter);
//     const [tempAmountFilter, setTempAmountFilter] = useState(amountFilter);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => { // Type event as MouseEvent
//             // Ensure event.target is a Node before calling contains
//             if (
//                 showFilterModal &&
//                 filterModalRef.current &&
//                 event.target instanceof Node && // Type guard
//                 !filterModalRef.current.contains(event.target) &&
//                  // Keep Radix check using closest which works on Element
//                 !(event.target instanceof Element && event.target.closest('[id^="radix-ui-popper-"]'))
//             ) {
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
//                                 <IoClose className="text-neutral-900 dark:text-white size-7" />
//                             </button>
//                         </div>

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
import CustomDropdown from './CustomDropdown';
import { IoClose } from "react-icons/io5"; // Import IoClose icon

interface PaymentFiltersProps {
    showFilterModal: boolean;
    setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    dateRange: { from: Date | null; to: Date | null };
    setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>;
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
    currencyFilter: string;
    setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
    paymentIdFilter: string;
    setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
    amountFilter: string;
    setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
    currencyOptions: string[];
    statusOptions: string[];
    clearFilters: () => void;
}

const PaymentFilters: React.FC<PaymentFiltersProps> = ({
    showFilterModal,
    setShowFilterModal,
    searchTerm,
    setSearchTerm,
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
    currencyOptions,
    statusOptions,
    clearFilters,
}) => {
    const filterModalRef = useRef(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // State to track mobile view

    // --- Temporary filter states ---
    const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);
    const [tempDateRange, setTempDateRange] = useState(dateRange);
    const [tempStatusFilter, setTempStatusFilter] = useState(statusFilter);
    const [tempCurrencyFilter, setTempCurrencyFilter] = useState(currencyFilter);
    const [tempPaymentIdFilter, setTempPaymentIdFilter] = useState(paymentIdFilter);
    const [tempAmountFilter, setTempAmountFilter] = useState(amountFilter);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
                setShowFilterModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilterModal, setShowFilterModal]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Sync props to temp state when modal opens
    useEffect(() => {
        if (showFilterModal) {
            setTempSearchTerm(searchTerm);
            setTempDateRange(dateRange);
            setTempStatusFilter(statusFilter);
            setTempCurrencyFilter(currencyFilter);
            setTempPaymentIdFilter(paymentIdFilter);
            setTempAmountFilter(amountFilter);
        }
    }, [showFilterModal, searchTerm, dateRange, statusFilter, currencyFilter, paymentIdFilter, amountFilter]);


    const closePopup = () => setShowFilterModal(false);

    const applyFilters = () => {
        setSearchTerm(tempSearchTerm);
        setDateRange(tempDateRange);
        setStatusFilter(tempStatusFilter);
        setCurrencyFilter(tempCurrencyFilter);
        setPaymentIdFilter(tempPaymentIdFilter);
        setAmountFilter(tempAmountFilter);
        setShowFilterModal(false);
    };

    const handleClearAllFilters = () => {
        setTempSearchTerm('');
        setTempDateRange({ from: null, to: null });
        setTempStatusFilter('all');
        setTempCurrencyFilter('all');
        setTempPaymentIdFilter('');
        setTempAmountFilter('');
        clearFilters(); // Call parent clearFilters to reset external state
        setShowFilterModal(false); // Close modal after clearing
    };


    return (
        <AnimatePresence>
            {showFilterModal && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
                        onClick={closePopup}
                    />

                    <motion.div
                        ref={filterModalRef}
                        initial={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
                        animate={isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }}
                        exit={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className={`fixed ${
                            isMobile
                              ? "bottom-0 left-0 right-0 h-[100vh]"
                              : "top-0 right-0 sm:w-[600px] h-full border-l border-gray-200"
                          } bg-white dark:bg-background z-50 flex flex-col shadow-xl overflow-y-auto`} // Apply similar popup styles and scrollable
                    >
                        {/* Header */}
                        <div className="p-5 flex items-center justify-between flex-shrink-0 border-b relative">
                            <h3 className="font-semibold text-mainheading dark:text-white text-lg">
                                Filter Payments
                            </h3>
                            <button
                                onClick={() => setShowFilterModal(false)}
                                className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
                            >
                                <IoClose className="text-neutral-900 dark:text-white size-7" />
                            </button>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="p-6 space-y-6 flex-grow overflow-y-auto scrollbar-hide"> {/* Apply scrollable content styles */}
                            {/* Payment ID Filter */}
                            <div className="mb-4">
                                <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
                                    Payment ID
                                </h4>
                                <input
                                    type="text"
                                    id="paymentIdFilter"
                                    value={tempPaymentIdFilter}
                                    onChange={(e) => setTempPaymentIdFilter(e.target.value)}
                                    placeholder="Filter by Payment ID"
                                    className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
                                />
                            </div>
                            {/* Amount Filter */}
                            <div className="mb-4">
                                <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
                                    Amount
                                </h4>
                                <input
                                    type="number"
                                    id="amountFilter"
                                    value={tempAmountFilter}
                                    onChange={(e) => setTempAmountFilter(e.target.value)}
                                    placeholder="Filter by Amount"
                                    className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
                                />
                            </div>

                            {/* Currency Filter - Custom Dropdown */}
                            <div className="mb-4">
                                <CustomDropdown
                                    label={
                                        <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
                                            Currency
                                        </h4>
                                    }
                                    value={tempCurrencyFilter === 'all' ? null : tempCurrencyFilter}
                                    onChange={setTempCurrencyFilter}
                                    options={currencyOptions}
                                />
                            </div>

                            {/* Status Filter - Custom Dropdown */}
                            <div className="mb-4">
                                <CustomDropdown
                                    label={
                                        <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
                                            Status
                                        </h4>
                                    }
                                    value={tempStatusFilter === 'all' ? null : tempStatusFilter}
                                    onChange={setTempStatusFilter}
                                    options={statusOptions}
                                />
                            </div>


                            {/* Date Range Filter */}
                            <div className="mb-4">
                                <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1"> {/* Styled Date Label */}
                                    Date Range
                                </h4>
                                <div className="relative">
                                    <button className='w-full'>
                                        <button
                                            type="button"
                                            onClick={() => setShowCalendar(!showCalendar)}
                                            className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
                                        >
                                            <span>
                                                {tempDateRange.from ? (
                                                    tempDateRange.to ? (
                                                        `${format(tempDateRange.from, 'MMM dd, yyyy')} - ${format(tempDateRange.to, 'MMM dd, yyyy')}`
                                                    ) : (
                                                        `From ${format(tempDateRange.from, 'MMM dd, yyyy')}`
                                                    )
                                                ) : tempDateRange.to ? (
                                                    `Until ${format(tempDateRange.to, 'MMM dd, yyyy')}`
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
                                                    selected={tempDateRange}
                                                    onSelect={(range) => {
                                                        setTempDateRange(range);
                                                        setShowCalendar(false);
                                                    }}
                                                />
                                                {(tempDateRange.from || tempDateRange.to) && (
                                                    <div className="mt-2 flex justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setTempDateRange({ from: null, to: null });
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

                        {/* Footer */}
                        <div className="p-4 border-t bg-white dark:bg-background flex-shrink-0"> {/* Apply footer styles */}
                            <div className="flex items-center gap-3">
                                {/* Clear all Button */}
                                <button
                                    type="button"
                                    onClick={handleClearAllFilters}
                                    className="w-full bg-white border text-main font-medium cursor-pointer py-3 px-4 rounded-full hover:bg-gray-50"
                                >
                                    Clear all
                                </button>
                                {/* Apply Filters Button */}
                                <button
                                    type="button"
                                    onClick={applyFilters}
                                    className="w-full bg-primary text-main font-medium py-3 px-4 cursor-pointer rounded-full hover:bg-primary/90"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PaymentFilters;