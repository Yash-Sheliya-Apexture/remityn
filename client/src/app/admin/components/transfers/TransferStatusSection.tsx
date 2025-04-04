"use client";
import React from "react";
import TransferStatusDropdown from "./TransferStatusDropdown"; // Adjust path
import { GetStatusBadge, getTimeAgo, formatFullDateTime } from "../../../utils/helpers"; // Adjust path
import {
  CheckCircle,
  RefreshCw,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface TransferStatusSectionProps {
  transfer: any; // Consider creating a Transfer type/interface
  token: string | null;
  onStatusUpdated: () => void;
}

const TransferStatusSection: React.FC<TransferStatusSectionProps> = ({
  transfer,
  token,
  onStatusUpdated,
}) => {
  if (!transfer) return null;

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <RefreshCw className="size-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0 animate-spin" />
        );
      case "completed":
        return (
          <CheckCircle className="size-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
        );
      case "failed":
        return (
          <XCircle className="size-4 text-rose-600 mr-2 mt-0.5 flex-shrink-0" />
        );
      case "canceled":
        return (
          <AlertCircle className="size-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
        );
      default:
        return null; // Don't show icon for 'pending' in the timeline update step
    }
  };

  return (
    <div className="bg-white dark:bg-primarybox rounded-xl border overflow-hidden">
      <div className="bg-lightgray dark:bg-secondarybox px-6 py-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Transfer Status</h3>
      </div>

      <div className="p-6">
        {/* Current Status */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">Current Status</h4>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-300">
              Updated {getTimeAgo(transfer.updatedAt)}
            </span>
          </div>
          <div className="flex items-center">
            <GetStatusBadge status={transfer.status} />
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-4">Timeline</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="size-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">Transfer Created</p>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  {formatFullDateTime(transfer.createdAt)}
                </p>
              </div>
            </li>
            {transfer.status !== "pending" && (
              <li className="flex items-start">
                {getTimelineIcon(transfer.status)}
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white capitalize">
                    {transfer.status}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    {formatFullDateTime(transfer.updatedAt)}
                  </p>
                </div>
              </li>
            )}
          </ul>
        </div>

        {/* Failure Reason */}
        {transfer.status === "failed" && transfer.failureReason && (
          <div className="mb-6 bg-rose-50 border rounded-lg p-4">
            <h4 className="flex items-center text-rose-600 font-medium mb-2 text-sm">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              Failure Reason
            </h4>
            <p className="text-rose-600 text-sm">{transfer.failureReason}</p>
          </div>
        )}

        {/* Cancellation Reason */}
        {transfer.status === "canceled" && (
           <div className="mb-6 bg-lightgray dark:bg-secondarybox border rounded-lg p-4">
             <h4 className="flex items-center text-neutral-900 dark:text-white font-medium mb-2 text-sm">
               <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
               Cancellation Reason
             </h4>
             <p className="text-gray-500 dark:text-gray-300 text-sm">
               {transfer.cancellationReason || "No reason provided."}
             </p>
           </div>
         )}

        {/* Admin Actions */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-3">Update Status</h4>
          <TransferStatusDropdown
            transferId={transfer._id}
            currentStatus={transfer.status}
            token={token}
            onStatusUpdated={onStatusUpdated}
          />
        </div>
      </div>
    </div>
  );
};

export default TransferStatusSection;