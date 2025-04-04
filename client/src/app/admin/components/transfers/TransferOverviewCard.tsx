"use client";
import React from "react";
import { Calendar, DollarSign } from "lucide-react";
import { GetStatusBadge, getTimeAgo, formatCurrency } from "../../../utils/helpers"; // Adjust path

interface TransferOverviewCardProps {
  transfer: any; // Consider creating a Transfer type/interface
}

const TransferOverviewCard: React.FC<TransferOverviewCardProps> = ({
  transfer,
}) => {
  if (!transfer) return null; // Or a loading state

  return (
    <div className="bg-lightgray dark:bg-primarybox rounded-xl border dark:border-primarybox p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Status and ID */}
        <div className="flex items-center">
          <div className="mr-4 flex-shrink-0">
            <GetStatusBadge status={transfer.status} />
          </div>
          <div className="min-w-0"> {/* Ensure ID doesn't overflow */}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Transfer ID</p>
            <p className="text-neutral-900 dark:text-white text-sm break-all">
              {transfer._id}
            </p>
          </div>
        </div>

        {/* Right Side: Dates and Amount */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
            <Calendar className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">Created</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {getTimeAgo(transfer.createdAt)}
              </p>
            </div>
          </div>

          <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
            <DollarSign className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">Amount Sent</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {formatCurrency(transfer.sendAmount, transfer.sendCurrency?.code)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferOverviewCard;