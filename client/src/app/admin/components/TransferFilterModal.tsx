"use client"; // Make sure this is at the VERY top
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TransferFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  initialFilters: any;
}

const modalVariants = {
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
};

const backdropVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const TransferFilterModal: React.FC<TransferFilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialFilters.search || "");
  const [statusFilter, setStatusFilter] = useState<string>(initialFilters.status || "");
  const [fullNameFilter, setFullNameFilter] = useState<string>(initialFilters.fullName || "");
  const [startDate, setStartDate] = useState<string>(initialFilters.startDate || "");
  const [endDate, setEndDate] = useState<string>(initialFilters.endDate || "");

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
    { value: "canceled", label: "Canceled" },
  ];

  useEffect(() => {
    setSearchQuery(initialFilters.search || "");
    setStatusFilter(initialFilters.status || "");
    setFullNameFilter(initialFilters.fullName || "");
    setStartDate(initialFilters.startDate || "");
    setEndDate(initialFilters.endDate || "");
  }, [initialFilters]);

  const handleApply = () => {
    const filters = {
      search: searchQuery,
      status: statusFilter,
      fullName: fullNameFilter,
      startDate,
      endDate,
    };
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setSearchQuery("");
    setStatusFilter("");
    setFullNameFilter("");
    setStartDate("");
    setEndDate("");
    onApplyFilters({});
    onClose();
  };

  return (
    <AnimatePresence  // Correctly placed AnimatePresence
      initial={false} // Add initial={false} for smoother initial load in some cases
      exitBeforeEnter={true} // Add exitBeforeEnter for smoother transitions
      onExitComplete={() => null} // Optional: callback when exit animation completes
    >
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-50 p-6 overflow-y-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={modalVariants}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-main">Filter Transfers</h2>
              <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search (ID / User Full Name)
              </label>
              <input
                type="text"
                id="search"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring-primary-300"
                placeholder="Search by ID or User Full Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring-primary-300"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                User Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring-primary-300"
                placeholder="Filter by User Full Name"
                value={fullNameFilter}
                onChange={(e) => setFullNameFilter(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <div className="flex space-x-2">
                <div>
                  <label htmlFor="startDate" className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring-primary-300 text-sm"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring-primary-300 text-sm"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md font-medium"
                onClick={handleApply}
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TransferFilterModal;