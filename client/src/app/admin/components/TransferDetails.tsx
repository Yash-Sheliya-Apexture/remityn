// frontend/src/app/admin/components/TransferDetails.tsx
"use client";
import React, { useState } from 'react';
import adminTransferService from '../../services/admin/transfer';
import { Transfer as TransferType } from '@/types/transfer'; // Assuming types are defined

interface TransferDetailsProps {
    transfer: TransferType;
    token: string;
    onStatusUpdated: () => void; // Callback to refresh list after status update
}

const TransferDetails: React.FC<TransferDetailsProps> = ({ transfer, token, onStatusUpdated }) => {
    const [status, setStatus] = useState<string>(transfer.status);
    const [failureReasonInput, setFailureReasonInput] = useState<string>('');
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdatingStatus(true);
        setUpdateError(null);
        try {
            await adminTransferService.updateAdminTransferStatus(transfer._id, newStatus, failureReasonInput, token);
            setStatus(newStatus); // Update local status state
            onStatusUpdated(); // Refresh the transfer list (parent component)
        } catch (error: any) {
            setUpdateError(error.message || 'Failed to update status.');
            console.error("Error updating transfer status:", error);
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold">Transfer Details</h3>
                <p>Transfer ID: {transfer._id}</p>
                <p>User: {transfer.user?.fullName} ({transfer.user?.email})</p>
                <p>Recipient: {transfer.recipient?.accountHolderName} (Account: ****{transfer.recipient?.accountNumber?.slice(-4)})</p>
                <p>Amount: {transfer.sendAmount} {transfer.sendCurrency?.code} (Receives: {transfer.receiveAmount} {transfer.receiveCurrency?.code})</p>
                <p>Exchange Rate: 1 {transfer.sendCurrency?.code} = {transfer.exchangeRate} {transfer.receiveCurrency?.code}</p>
                <p>Created At: {new Date(transfer.createdAt).toLocaleString()}</p>
                {transfer.reason && <p>Reason: {transfer.reason}</p>}
                {transfer.reference && <p>Reference: {transfer.reference}</p>}
                {transfer.failureReason && <p className="text-red-500">Failure Reason: {transfer.failureReason}</p>}
                <p>Status: {status}</p>
            </div>

            <div className="flex space-x-4">
                {status === 'pending' && (
                    <>
                        <button
                            onClick={() => handleStatusChange('processing')}
                            disabled={isUpdatingStatus}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        >
                            Approve to Process
                        </button>
                        <button
                            onClick={() => handleStatusChange('canceled')}
                            disabled={isUpdatingStatus}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleStatusChange('failed')}
                            disabled={isUpdatingStatus}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        >
                            Fail
                        </button>
                    </>
                )}
                {/* Add more status action buttons as needed based on workflow */}
            </div>

            {status === 'failed' && !transfer.failureReason && (
                <div className="space-y-2">
                    <label htmlFor="failureReason" className="block text-sm font-medium text-gray-700">Failure Reason:</label>
                    <textarea
                        id="failureReason"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={failureReasonInput}
                        onChange={(e) => setFailureReasonInput(e.target.value)}
                        placeholder="Enter reason for failure"
                    />
                    <button
                        onClick={() => handleStatusChange('failed')} // Re-call fail status to save reason
                        disabled={isUpdatingStatus}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    >
                        Update with Reason & Mark Failed
                    </button>
                </div>
            )}

            {updateError && <p className="text-red-500">{updateError}</p>}
            {isUpdatingStatus && <p>Updating status...</p>}
        </div>
    );
};

export default TransferDetails;