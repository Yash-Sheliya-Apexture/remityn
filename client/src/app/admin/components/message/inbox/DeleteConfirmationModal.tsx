// frontend/src/app/admin/components/inbox/DeleteConfirmationModal.tsx
'use client';
import React from 'react';
import { X, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
import type { AdminInboxMessage } from '../../../../services/admin/inbox'; // Adjust path
import { format } from 'date-fns';

const formatDate = (dateInput?: string | Date | null): string => {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Invalid Date";
    return format(date, "MMM d, yyyy HH:mm");
  } catch (e) {
    return "Invalid Date";
  }
};

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: AdminInboxMessage | null;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  message,
  onConfirm,
  isLoading,
}) => {
  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-primarybox w-full max-w-md rounded-lg shadow-xl p-6 transform transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-mainheading dark:text-white flex items-center">
            <AlertTriangle size={24} className="mr-2 text-red-500" />
            Confirm Deletion
          </h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Are you sure you want to permanently delete this message? This action cannot be undone.
          </p>
          <div className="mt-3 p-3 bg-gray-50 dark:bg-secondarybox rounded-md border dark:border-gray-700">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Subject: <span className="font-normal">{message.subject}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              To: {message.userId?.fullName ?? message.userId?.email ?? "Unknown"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sent: {formatDate(message.sentAt)}
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Deleting...' : 'Delete Message'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;