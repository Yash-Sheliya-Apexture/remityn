// frontend/src/app/admin/components/transfers/TransferTable.tsx
"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownUp } from "lucide-react";
import Link from "next/link";
import TransferTableHeader from "./TransferTableHeader"; // Correct import statement

interface TransferTableProps {
  filteredTransfers: any[]; // Replace 'any' with a more specific type if possible
  loadingTransfers: boolean;
  getStatusColor: (status: string) => string;
  toggleSort: (field: string) => void;
  sortField: string | null;
  sortDirection: "asc" | "desc";
}

const TransferTable: React.FC<TransferTableProps> = ({
  filteredTransfers,
  loadingTransfers,
  getStatusColor,
  toggleSort,
  sortField,
  sortDirection,
}) => {
  // Function to format date - ADDED FUNCTION HERE
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (loadingTransfers) {
    return (
      <div className="rounded-xl border overflow-hidden">
        <table className="min-w-full">
          <TransferTableHeader
            toggleSort={toggleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
          <tbody>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Skeleton className="h-7 w-28" />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <Skeleton className="h-8 w-24" />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <Skeleton className="h-8 w-24" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
        <table className="min-w-full overflow-hidden">
          <TransferTableHeader
            toggleSort={toggleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
          <tbody className="divide-y overflow-hidden">
            {filteredTransfers.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No transfers found matching your filters.
                </td>
              </tr>
            ) : (
              filteredTransfers.map((transfer, index) => (
                <motion.tr
                  key={transfer._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {transfer._id.substring(0, 10)}...
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium capitalize text-neutral-900 dark:text-white">
                        {transfer.user?.fullName || "N/A"}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-300">
                        {transfer.user?.email || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-medium capitalize text-neutral-900 dark:text-white">
                      {transfer.recipient?.accountHolderName || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
                    {transfer.sendAmount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
                    {transfer.sendCurrency?.code || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(
                        transfer.status
                      )}`}
                    >
                      {transfer.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap font-medium">
                    {formatDate(transfer.createdAt)}{" "}
                    {/* CALL FORMATDATE HERE */}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap font-medium text-end">
                    <Link
                      href={`/admin/transfer/${transfer._id}`}
                      className="inline-flex items-center group px-6 py-2 rounded-3xl space-x-1 text-secondary transition-colors duration-300 font-medium bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-primary focus:outline-none"
                    >
                      <span>View Details</span>
                    </Link>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferTable;
