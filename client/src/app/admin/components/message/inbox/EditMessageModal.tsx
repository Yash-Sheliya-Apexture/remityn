// frontend/src/app/admin/components/inbox/EditMessageModal.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, RefreshCw } from 'lucide-react';
import type { AdminInboxMessage } from '../../../../services/admin/inbox'; // Adjust path

interface EditMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: AdminInboxMessage | null;
  onSave: (id: string, subject: string, body: string) => Promise<void>;
  isLoading: boolean;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({
  isOpen,
  onClose,
  message,
  onSave,
  isLoading,
}) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (message) {
      setSubject(message.subject);
      setBody(message.body || ''); // Ensure body is handled if undefined
    } else {
      setSubject('');
      setBody('');
    }
  }, [message]);

  if (!isOpen || !message) return null;

  const handleSave = () => {
    if (subject.trim() && body.trim()) {
      onSave(message._id, subject.trim(), body.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-primarybox w-full max-w-lg rounded-lg shadow-xl p-6 transform transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-mainheading dark:text-white">Edit Message</h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="edit-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="edit-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isLoading}
              maxLength={200}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-secondarybox dark:text-white sm:text-sm disabled:opacity-70"
              placeholder="Enter subject"
            />
          </div>
          <div>
            <label htmlFor="edit-body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Body
            </label>
            <textarea
              id="edit-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={isLoading}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-secondarybox dark:text-white sm:text-sm disabled:opacity-70"
              placeholder="Enter message body..."
            />
          </div>
           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Message ID: {message._id?.slice(-6)} | To: {message.userId?.fullName ?? message.userId?.email ?? "N/A"}
          </p>
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
            onClick={handleSave}
            disabled={isLoading || !subject.trim() || !body.trim()}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primaryhover rounded-md border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMessageModal;