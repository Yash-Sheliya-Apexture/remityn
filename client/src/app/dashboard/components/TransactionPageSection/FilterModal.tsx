// // components/dashboard/transactions/FilterModal.tsx
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";
// import { IoIosCloseCircleOutline } from "react-icons/io";

// // Sub Components (assuming they are moved/available here or adjust path)
// import DateInput from "../TransactionPageSection/Filter/DateInput";
// import Recipients from "../TransactionPageSection/Filter/Recipients";
// import DirectionFilter from "../TransactionPageSection/Filter/DirectionFilter";
// import Status from "../TransactionPageSection/Filter/Status";
// import BalanceComponent, { CurrencyBalance } from "../TransactionPageSection/Filter/Balance";
// import { Account } from "@/types/account";

// // Helper function to format date object to dd-MM-yyyy string
// const formatDate = (date: Date): string =>
//     `${String(date.getDate()).padStart(2, "0")}-${String(
//       date.getMonth() + 1
//     ).padStart(2, "0")}-${date.getFullYear()}`;

// // Define filter type used internally by the modal and passed on apply
// export interface FilterSettings {
//     selectedRecipients: (string | number)[];
//     selectedDirection: string;
//     selectedStatus: string | null;
//     selectedBalance: string[];
//     fromDate?: string;
//     toDate?: string;
// }

// interface FilterModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onApply: (filters: FilterSettings) => void;
//     onClearAll: () => void;
//     initialFilters: FilterSettings; // To pre-fill the modal
//     userAccounts: Account[];
//     isMobile: boolean;
// }

// const FilterModal: React.FC<FilterModalProps> = ({
//     isOpen,
//     onClose,
//     onApply,
//     onClearAll,
//     initialFilters,
//     userAccounts,
//     isMobile,
// }) => {
//     const filterPopupRef = useRef<HTMLDivElement>(null);

//     // --- Internal Temporary Filter State ---
//     const [tempFromDate, setTempFromDate] = useState("");
//     const [tempToDate, setTempToDate] = useState("");
//     const [tempSelectedRecipients, setTempSelectedRecipients] = useState<(string | number)[]>([]);
//     const [tempSelectedDirection, setTempSelectedDirection] = useState<string>('all');
//     const [tempSelectedStatus, setTempSelectedStatus] = useState<string | null>(null);
//     const [tempSelectedBalance, setTempSelectedBalance] = useState<string[]>([]);
//     const [tempSelectedDateRange, setTempSelectedDateRange] = useState<string | null>(null); // 'month', 'quarter', 'year' or null
//     const [isLastMonthActive, setIsLastMonthActive] = useState(false);
//     const [isLastQuarterActive, setIsLastQuarterActive] = useState(false);
//     const [isLastYearActive, setIsLastYearActive] = useState(false);

//     // --- Effect to sync internal state with initial filters when modal opens ---
//     useEffect(() => {
//         if (isOpen) {
//             setTempFromDate(initialFilters.fromDate || "");
//             setTempToDate(initialFilters.toDate || "");
//             setTempSelectedRecipients([...initialFilters.selectedRecipients]);
//             setTempSelectedDirection(initialFilters.selectedDirection);
//             setTempSelectedStatus(initialFilters.selectedStatus);
//             setTempSelectedBalance([...initialFilters.selectedBalance]);
//             // Reset temporary date range buttons (simple reset, could be smarter)
//             setIsLastMonthActive(false); setIsLastQuarterActive(false); setIsLastYearActive(false);
//             setTempSelectedDateRange(null);
//         }
//         // Intentionally only run when isOpen changes to true or initialFilters change
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isOpen, initialFilters]);


//     // --- Outside Click ---
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (filterPopupRef.current && !filterPopupRef.current.contains(event.target as Node) && isOpen) {
//                 onClose();
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, [isOpen, onClose]);

//     // --- Body Scroll Lock ---
//      useEffect(() => {
//         document.body.style.overflow = isOpen ? 'hidden' : '';
//         return () => { document.body.style.overflow = ''; };
//     }, [isOpen]);

//     // --- Filter Criteria Handlers (Update temporary state) ---
//     const handleTempRecipientChange = (ids: (string | number)[]) => setTempSelectedRecipients(ids);
//     const handleTempDirectionChange = (dir: string) => setTempSelectedDirection(dir);
//     const handleTempStatusChange = (status: string | null) => setTempSelectedStatus(status);
//     const handleTempBalanceChange = (isSelected: boolean, code: string) => {
//         setTempSelectedBalance(current => isSelected ? [...current, code] : current.filter(c => c !== code));
//     };
//     const handleTempDateInputChange = (value: string, type: 'from' | 'to') => {
//         if (type === 'from') setTempFromDate(value); else setTempToDate(value);
//         setTempSelectedDateRange(null); // Clear presets if manual date changes
//         setIsLastMonthActive(false); setIsLastQuarterActive(false); setIsLastYearActive(false);
//     };

//     // --- Date Range Preset Handlers (Update temporary state) ---
//     const setTempDateRangeAndStates = (startDate: Date, endDate: Date, activeRange: "month" | "quarter" | "year" | null) => {
//         setTempFromDate(formatDate(startDate)); setTempToDate(formatDate(endDate));
//         setTempSelectedDateRange(activeRange);
//         setIsLastMonthActive(activeRange === "month"); setIsLastQuarterActive(activeRange === "quarter"); setIsLastYearActive(activeRange === "year");
//     };
//     const handleSetLastMonth = () => { const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth() - 1, 1); const end = new Date(now.getFullYear(), now.getMonth(), 0); setTempDateRangeAndStates(start, end, "month"); };
//     const handleSetLastQuarter = () => { const now = new Date(); const cq = Math.floor(now.getMonth() / 3); const sm = (cq - 1) * 3; const sy = sm < 0 ? now.getFullYear() - 1 : now.getFullYear(); const start = new Date(sy, sm < 0 ? 12 + sm : sm, 1); const ey = cq === 0 ? now.getFullYear() - 1 : now.getFullYear(); const end = new Date(ey, cq * 3, 0); setTempDateRangeAndStates(start, end, "quarter"); };
//     const handleSetLastYear = () => { const now = new Date(); const ly = now.getFullYear() - 1; const start = new Date(ly, 0, 1); const end = new Date(ly, 11, 31); setTempDateRangeAndStates(start, end, "year"); };
//     const handleClearDatePreset = (rangeType: "month" | "quarter" | "year") => {
//         if (rangeType === "month") setIsLastMonthActive(false);
//         else if (rangeType === "quarter") setIsLastQuarterActive(false);
//         else if (rangeType === "year") setIsLastYearActive(false);
//         setTempFromDate(""); setTempToDate(""); setTempSelectedDateRange(null);
//     };

//     // --- Apply and Clear ---
//     const handleApplyClick = () => {
//         const filtersToApply: FilterSettings = {
//             selectedRecipients: tempSelectedRecipients, selectedDirection: tempSelectedDirection,
//             selectedStatus: tempSelectedStatus, selectedBalance: tempSelectedBalance,
//             fromDate: tempFromDate || undefined, toDate: tempToDate || undefined,
//         };
//         onApply(filtersToApply); // Pass the selected filters back to the parent
//         // onClose(); // Parent will handle closing after applying
//     };

//     const handleClearClick = () => {
//         // Reset internal state
//         setTempFromDate(""); setTempToDate(""); setTempSelectedRecipients([]); setTempSelectedDirection("all");
//         setTempSelectedStatus(null); setTempSelectedBalance([]); setTempSelectedDateRange(null);
//         setIsLastMonthActive(false); setIsLastQuarterActive(false); setIsLastYearActive(false);
//         // Call parent's clear function
//         onClearAll();
//         // onClose(); // Parent might handle closing after clearing
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <>
//                     {/* Backdrop */}
//                     <motion.div
//                        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
//                        transition={{ duration: 0.2 }}
//                        className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
//                        onClick={onClose}
//                     />

//                     {/* Filter Popup Content */}
//                     <motion.div
//                       id="filter-popup"
//                       ref={filterPopupRef}
//                       className={`fixed ${ isMobile ? "bottom-0 left-0 right-0 h-[100vh]" : "top-0 right-0 sm:w-[600px] h-full" } bg-white dark:bg-background z-80 flex flex-col`}
//                       initial={ isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 } }
//                       animate={ isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 } }
//                       exit={ isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 } }
//                       transition={{ type: "tween", duration: 0.3 }}
//                       aria-modal="true" role="dialog" aria-labelledby="filter-popup-title"
//                     >
//                       {/* Header */}
//                        <div className="sm:p-6 p-4 flex items-center justify-between flex-shrink-0 border-b border-gray-200 dark:border-primarybox relative">
//                          <h3 id="filter-popup-title" className="font-semibold text-mainheading dark:text-white text-lg"> Filters </h3>
//                          <button
//                            onClick={onClose}
//                            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-colors duration-75 ease-linear cursor-pointer"
//                            aria-label="Close Filters"
//                            type="button"
//                          >
//                            <IoClose className="text-neutral-900 dark:text-white size-7" />
//                          </button>
//                        </div>

//                        {/* Scrollable Content Area */}
//                        <div className="sm:p-6 p-4 flex-grow overflow-y-auto scrollbar-hide space-y-6">
//                           {/* Date Section */}
//                           <div>
//                               <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1"> Date </h4>
//                               <div className="flex items-center flex-wrap gap-2 mb-4">
//                                   {/* Date Preset Buttons */}
//                                   <button type="button" className={`font-medium border flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-colors ${ isLastMonthActive ? "bg-neutral-900 text-primary dark:bg-green-600/20 border-neutral-900 dark:border-green-600/20" : "text-mainheading dark:text-white bg-white dark:bg-background border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-white/10" }`} onClick={handleSetLastMonth}>
//                                     Last month {isLastMonthActive && <IoIosCloseCircleOutline size={20} className="text-primary dark:text-green-400" onClick={(e) => { e.stopPropagation(); handleClearDatePreset("month"); }} />}
//                                   </button>
//                                   <button type="button" className={`font-medium border flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-colors ${ isLastQuarterActive ? "bg-neutral-900 text-primary dark:bg-green-600/20 border-neutral-900 dark:border-green-600/20" : "text-mainheading dark:text-white bg-white dark:bg-background border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-white/10" }`} onClick={handleSetLastQuarter}>
//                                     Last quarter {isLastQuarterActive && <IoIosCloseCircleOutline size={20} className="text-primary dark:text-green-400" onClick={(e) => { e.stopPropagation(); handleClearDatePreset("quarter"); }} />}
//                                   </button>
//                                   <button type="button" className={`font-medium border flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-colors ${ isLastYearActive ? "bg-neutral-900 text-primary dark:bg-green-600/20 border-neutral-900 dark:border-green-600/20" : "text-mainheading dark:text-white bg-white dark:bg-background border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-white/10" }`} onClick={handleSetLastYear}>
//                                     Last year {isLastYearActive && <IoIosCloseCircleOutline size={20} className="text-primary dark:text-green-400" onClick={(e) => { e.stopPropagation(); handleClearDatePreset("year"); }} />}
//                                   </button>
//                               </div>
//                               <div className="space-y-3">
//                                   <DateInput placeholder="From date (dd-MM-yyyy)" value={tempFromDate} onChange={(date) => handleTempDateInputChange(date, 'from')} />
//                                   <DateInput placeholder="To date (dd-MM-yyyy)" value={tempToDate} onChange={(date) => handleTempDateInputChange(date, 'to')} />
//                               </div>
//                           </div>

//                           {/* Recipients Section */}
//                           <div> <Recipients onRecipientSelectionChange={handleTempRecipientChange} selectedRecipientIds={tempSelectedRecipients} /> </div>
//                           {/* Status Section */}
//                           <div> <Status selectedStatus={tempSelectedStatus} onStatusChange={handleTempStatusChange} /> </div>
//                           {/* Direction Section */}
//                           <div> <DirectionFilter selectedDirection={tempSelectedDirection} onDirectionChange={handleTempDirectionChange} /> </div>

//                           {/* Balance Section */}
//                           {userAccounts && userAccounts.length > 0 && (
//                                 <div>
//                                    <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1"> Balance </h4>
//                                    <div className="space-y-2">
//                                        {userAccounts.map((account) => {
//                                            const cbProps: CurrencyBalance = {
//                                                currencyCode: account.currency.code,
//                                                currencyName: account.currency.currencyName || `${account.currency.code} Balance`,
//                                                currencySymbolPath: account.currency.flagImage?.trim() || `/assets/icon/${account.currency.code.toLowerCase()}.svg`, // Default path convention
//                                            };
//                                            return (
//                                                <BalanceComponent
//                                                   key={account.currency.code} currencyBalance={cbProps}
//                                                   onBalanceChange={handleTempBalanceChange}
//                                                   isSelected={tempSelectedBalance.includes(account.currency.code)}
//                                                /> );
//                                        })}
//                                    </div>
//                                 </div>
//                           )}
//                        </div> {/* End Scrollable Content */}

//                        {/* Footer */}
//                        <div className="sm:p-6 p-4 border-t border-gray-200 dark:border-primarybox bg-white dark:bg-background flex-shrink-0">
//                            <div className="flex items-center gap-3">
//                               <button type="button" className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-colors duration-150 ease-linear" onClick={handleClearClick} > Clear all </button>
//                               <button type="button" className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-colors duration-150 ease-linear" onClick={handleApplyClick} > Apply </button>
//                            </div>
//                        </div> {/* End Footer */}

//                     </motion.div> {/* End Filter Popup Content */}
//                 </>
//             )}
//         </AnimatePresence>
//     );
// };

// export default FilterModal;


// frontend/src/app/dashboard/components/TransactionPageSection/FilterModal.tsx
import React, { useState, useEffect, useRef, useMemo } from "react"; // Added useMemo here for clarity
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

// Sub Components (adjust paths as needed)
import DateInput from "./Filter/DateInput";
import Recipients from "./Filter/Recipients";
import DirectionFilter from "./Filter/DirectionFilter";
import Status from "./Filter/Status";
import BalanceComponent, { CurrencyBalance } from "./Filter/Balance";
import { Account } from "@/types/account"; // Adjust path if needed

// Helper function to format date object to dd-MM-yyyy string
const formatDate = (date: Date): string =>
    `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;

// Define filter type used internally by the modal and passed on apply
export interface FilterSettings {
    selectedRecipients: (string | number)[];
    selectedDirection: string;
    selectedStatus: string | null;
    selectedBalance: string[]; // Balances (currency codes)
    fromDate?: string; // Format: dd-MM-yyyy
    toDate?: string; // Format: dd-MM-yyyy
}

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterSettings) => void;
    onClearAll: () => void;
    initialFilters: FilterSettings; // To pre-fill the modal
    userAccounts: Account[]; // Needed for Balance and potentially Recipients
    isMobile: boolean;
    hideBalanceFilter?: boolean; // <-- ADDED: To hide balance section on BalanceDetailPage
}

const FilterModal: React.FC<FilterModalProps> = ({
    isOpen,
    onClose,
    onApply,
    onClearAll,
    initialFilters,
    userAccounts,
    isMobile,
    hideBalanceFilter = false, // <-- Default to false
}) => {
    const filterPopupRef = useRef<HTMLDivElement>(null);

    // --- Internal Temporary Filter State ---
    const [tempFromDate, setTempFromDate] = useState("");
    const [tempToDate, setTempToDate] = useState("");
    const [tempSelectedRecipients, setTempSelectedRecipients] = useState<(string | number)[]>([]);
    const [tempSelectedDirection, setTempSelectedDirection] = useState<string>('all');
    const [tempSelectedStatus, setTempSelectedStatus] = useState<string | null>(null);
    const [tempSelectedBalance, setTempSelectedBalance] = useState<string[]>([]);
    const [tempSelectedDateRange, setTempSelectedDateRange] = useState<string | null>(null); // 'month', 'quarter', 'year' or null
    const [isLastMonthActive, setIsLastMonthActive] = useState(false);
    const [isLastQuarterActive, setIsLastQuarterActive] = useState(false);
    const [isLastYearActive, setIsLastYearActive] = useState(false);

    // --- Effect to sync internal state with initial filters when modal opens ---
    useEffect(() => {
        if (isOpen) {
            setTempFromDate(initialFilters.fromDate || "");
            setTempToDate(initialFilters.toDate || "");
            setTempSelectedRecipients([...initialFilters.selectedRecipients]);
            setTempSelectedDirection(initialFilters.selectedDirection);
            setTempSelectedStatus(initialFilters.selectedStatus);
             if (!hideBalanceFilter) {
                setTempSelectedBalance([...initialFilters.selectedBalance]);
             } else {
                 setTempSelectedBalance([]);
             }
            setIsLastMonthActive(false); setIsLastQuarterActive(false); setIsLastYearActive(false);
            setTempSelectedDateRange(null);
        }
    }, [isOpen, initialFilters, hideBalanceFilter]);


    // --- Outside Click ---
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterPopupRef.current && !filterPopupRef.current.contains(event.target as Node) && isOpen) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    // --- Body Scroll Lock ---
     useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // --- Filter Criteria Handlers (Update temporary state) ---
    const handleTempRecipientChange = (ids: (string | number)[]) => setTempSelectedRecipients(ids);
    const handleTempDirectionChange = (dir: string) => setTempSelectedDirection(dir);
    const handleTempStatusChange = (status: string | null) => setTempSelectedStatus(status);
    const handleTempBalanceChange = (isSelected: boolean, code: string) => {
        setTempSelectedBalance(current => isSelected ? [...current, code] : current.filter(c => c !== code));
    };
    const handleTempDateInputChange = (value: string, type: 'from' | 'to') => {
        if (type === 'from') setTempFromDate(value); else setTempToDate(value);
        setTempSelectedDateRange(null);
        setIsLastMonthActive(false); setIsLastQuarterActive(false); setIsLastYearActive(false);
    };

    // --- Date Range Preset Handlers (Update temporary state) ---
    const setTempDateRangeAndStates = (startDate: Date, endDate: Date, activeRange: "month" | "quarter" | "year" | null) => {
        setTempFromDate(formatDate(startDate)); setTempToDate(formatDate(endDate));
        setTempSelectedDateRange(activeRange);
        setIsLastMonthActive(activeRange === "month"); setIsLastQuarterActive(activeRange === "quarter"); setIsLastYearActive(activeRange === "year");
    };
    const handleSetLastMonth = () => { const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth() - 1, 1); const end = new Date(now.getFullYear(), now.getMonth(), 0); setTempDateRangeAndStates(start, end, "month"); };
    const handleSetLastQuarter = () => { const now = new Date(); const cq = Math.floor(now.getMonth() / 3); const sm = (cq - 1) * 3; const sy = sm < 0 ? now.getFullYear() - 1 : now.getFullYear(); const start = new Date(sy, sm < 0 ? 12 + sm : sm, 1); const ey = cq === 0 ? now.getFullYear() - 1 : now.getFullYear(); const end = new Date(ey, cq * 3, 0); setTempDateRangeAndStates(start, end, "quarter"); };
    const handleSetLastYear = () => { const now = new Date(); const ly = now.getFullYear() - 1; const start = new Date(ly, 0, 1); const end = new Date(ly, 11, 31); setTempDateRangeAndStates(start, end, "year"); };
    const handleClearDatePreset = (rangeType: "month" | "quarter" | "year") => {
        if (rangeType === "month") setIsLastMonthActive(false);
        else if (rangeType === "quarter") setIsLastQuarterActive(false);
        else if (rangeType === "year") setIsLastYearActive(false);
        setTempFromDate(""); setTempToDate(""); setTempSelectedDateRange(null);
    };

    // --- Apply and Clear ---
    const handleApplyClick = () => {
        const filtersToApply: FilterSettings = {
            selectedRecipients: tempSelectedRecipients,
            selectedDirection: tempSelectedDirection,
            selectedStatus: tempSelectedStatus,
            selectedBalance: hideBalanceFilter ? [] : tempSelectedBalance,
            fromDate: tempFromDate || undefined,
            toDate: tempToDate || undefined,
        };
        onApply(filtersToApply);
    };

    const handleClearClick = () => {
        setTempFromDate(""); setTempToDate(""); setTempSelectedRecipients([]); setTempSelectedDirection("all");
        setTempSelectedStatus(null);
        if (!hideBalanceFilter) {
            setTempSelectedBalance([]);
        }
        setTempSelectedDateRange(null);
        setIsLastMonthActive(false); setIsLastQuarterActive(false); setIsLastYearActive(false);
        onClearAll();
    };

    // Map accounts to CurrencyBalance props, memoize if accounts change frequently
    // **** START MODIFICATION ****
    const currencyBalances = useMemo(() => {
        if (hideBalanceFilter || !userAccounts) return []; // Don't compute if hidden or no accounts

        // Filter out accounts that don't have valid currency data BEFORE mapping
        return userAccounts
            .filter(account => account && account.currency && account.currency.code)
            .map((account): CurrencyBalance => ({
                // It's now safer to access properties after the filter
                currencyCode: account.currency.code,
                currencyName: account.currency.currencyName || `${account.currency.code} Balance`,
                currencySymbolPath: account.currency.flagImage?.trim() || `/assets/icon/${account.currency.code.toLowerCase()}.svg`, // Default path convention
            }));
    }, [userAccounts, hideBalanceFilter]);
    // **** END MODIFICATION ****


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                       initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
                       transition={{ duration: 0.2 }}
                       className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
                       onClick={onClose} // Close on backdrop click
                    />

                    {/* Filter Popup Content */}
                    <motion.div
                      id="filter-popup"
                      ref={filterPopupRef}
                      className={`fixed ${ isMobile ? "bottom-0 left-0 right-0 h-[100vh]" : "top-0 right-0 sm:w-[600px] h-full" } bg-white dark:bg-background z-80 flex flex-col shadow-lg`}
                      initial={ isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 } }
                      animate={ isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 } }
                      exit={ isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 } }
                      transition={{ type: "tween", duration: 0.3 }}
                      aria-modal="true" role="dialog" aria-labelledby="filter-popup-title"
                    >
                      {/* Header */}
                       <div className="sm:p-6 p-4 flex items-center justify-between flex-shrink-0 border-b border-gray-200 dark:border-primarybox relative">
                         <h3 id="filter-popup-title" className="font-semibold text-mainheading dark:text-white text-lg"> Filters </h3>
                         <button
                           onClick={onClose}
                           className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-colors duration-75 ease-linear cursor-pointer"
                           aria-label="Close Filters"
                           type="button"
                         >
                           <IoClose className="text-neutral-900 dark:text-white size-7" />
                         </button>
                       </div>

                       {/* Scrollable Content Area */}
                       <div className="sm:p-6 p-4 flex-grow overflow-y-auto scrollbar-hide space-y-6">
                          {/* Date Section */}
                          <div>
                              <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1"> Date </h4>
                              <div className="flex items-center flex-wrap gap-2 mb-4">
                                  {/* Date Preset Buttons */}
                                  <button type="button" className={`font-medium border text-sm sm:text-base flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-colors ${ isLastMonthActive ? "bg-neutral-900 text-primary dark:bg-green-600/20 border-neutral-900 dark:border-green-600/20" : "text-mainheading dark:text-white bg-white dark:bg-background border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-white/10" }`} onClick={handleSetLastMonth}>
                                    Last month {isLastMonthActive && <IoIosCloseCircleOutline size={20} className="text-primary dark:text-green-400 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleClearDatePreset("month"); }} />}
                                  </button>
                                  <button type="button" className={`font-medium border text-sm sm:text-base flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-colors ${ isLastQuarterActive ? "bg-neutral-900 text-primary dark:bg-green-600/20 border-neutral-900 dark:border-green-600/20" : "text-mainheading dark:text-white bg-white dark:bg-background border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-white/10" }`} onClick={handleSetLastQuarter}>
                                    Last quarter {isLastQuarterActive && <IoIosCloseCircleOutline size={20} className="text-primary dark:text-green-400 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleClearDatePreset("quarter"); }} />}
                                  </button>
                                  <button type="button" className={`font-medium border text-sm sm:text-base flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-colors ${ isLastYearActive ? "bg-neutral-900 text-primary dark:bg-green-600/20 border-neutral-900 dark:border-green-600/20" : "text-mainheading dark:text-white bg-white dark:bg-background border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-white/10" }`} onClick={handleSetLastYear}>
                                    Last year {isLastYearActive && <IoIosCloseCircleOutline size={20} className="text-primary dark:text-green-400 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleClearDatePreset("year"); }} />}
                                  </button>
                              </div>
                              <div className="space-y-3">
                                  <DateInput placeholder="From date (dd-MM-yyyy)" value={tempFromDate} onChange={(date) => handleTempDateInputChange(date, 'from')} />
                                  <DateInput placeholder="To date (dd-MM-yyyy)" value={tempToDate} onChange={(date) => handleTempDateInputChange(date, 'to')} />
                              </div>
                          </div>

                          {/* Recipients Section */}
                          <div> <Recipients onRecipientSelectionChange={handleTempRecipientChange} selectedRecipientIds={tempSelectedRecipients} /> </div>
                          {/* Status Section */}
                          <div> <Status selectedStatus={tempSelectedStatus} onStatusChange={handleTempStatusChange} /> </div>
                          {/* Direction Section */}
                          <div> <DirectionFilter selectedDirection={tempSelectedDirection} onDirectionChange={handleTempDirectionChange} /> </div>

                          {/* Balance Section - CONDITIONAL RENDER */}
                          {/* Render this section only if NOT hidden AND there are valid balances to show */}
                          {!hideBalanceFilter && currencyBalances.length > 0 && (
                                <div>
                                   <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1"> Balance </h4>
                                   <div className="space-y-2">
                                       {currencyBalances.map((cbProps) => (
                                           <BalanceComponent
                                              key={cbProps.currencyCode} // Key is now guaranteed valid
                                              currencyBalance={cbProps}
                                              onBalanceChange={handleTempBalanceChange}
                                              isSelected={tempSelectedBalance.includes(cbProps.currencyCode)}
                                           />
                                        ))}
                                   </div>
                                </div>
                          )}
                          {/* Optional: Show a message if balances *should* be shown but none were valid */}
                           {!hideBalanceFilter && currencyBalances.length === 0 && userAccounts && userAccounts.length > 0 && (
                               <div>
                                   <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1"> Balance </h4>
                                   <p className="text-sm text-gray-400 dark:text-gray-500">No balances with valid currency information found to filter by.</p>
                               </div>
                           )}
                       </div> {/* End Scrollable Content */}

                       {/* Footer */}
                       <div className="sm:p-6 p-4 border-t border-gray-200 dark:border-primarybox bg-white dark:bg-background flex-shrink-0">
                           <div className="flex items-center gap-3">
                              <button type="button" className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12 text-center w-full cursor-pointer transition-colors duration-150 ease-linear text-sm sm:text-base" onClick={handleClearClick} > Clear all </button>
                              <button type="button" className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12 text-center w-full cursor-pointer transition-colors duration-150 ease-linear text-sm sm:text-base" onClick={handleApplyClick} > Apply </button>
                           </div>
                       </div> {/* End Footer */}

                    </motion.div> {/* End Filter Popup Content */}
                </>
            )}
        </AnimatePresence>
    );
};

export default FilterModal;