// frontend/src/app/admin/transfers/[transferId]/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import adminTransferService from '../../../services/admin/transfer';
import { useAuth } from '../../../hooks/useAuth';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";
import Link from 'next/link';

interface AdminTransferDetailPageParams {
    transferId: string;
}

const AdminTransferDetailPage = () => {
    const params = useParams<AdminTransferDetailPageParams>();
    const { transferId } = params;
    const [transfer, setTransfer] = useState<any>(null); // Type as 'any' initially, refine later based on your TransferType
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token, isAdmin, loadingAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            return;
        }
        if (!isAdmin) {
            router.push('/dashboard');
            return;
        }
        fetchTransferDetails();
    }, [transferId, token, isAdmin, router]);

    const fetchTransferDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await adminTransferService.getAdminTransferById(transferId, token);
            setTransfer(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load transfer details.');
            console.error("Error fetching transfer details:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusUpdated = () => {
        fetchTransferDetails();
    };

    if (loadingAuth || isLoading) {
        return (
            <div className="p-6 container mx-auto max-w-3xl">
                <h2 className="text-2xl font-semibold mb-6">Transfer Details</h2>
                <div className="space-y-4">
                    {Array(7).fill(0).map((_, i) => <Skeleton key={i} height={40} />)}
                </div>
            </div>
        );
    }

    if (error || !transfer) {
        return (
            <div className="p-6 container mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-semibold mb-4">Transfer Details</h2>
                <p className="text-red-500 mb-4">{error || "Transfer details not found."}</p>
                <div className="flex justify-center">
                    <button
                        onClick={fetchTransferDetails}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Retry Loading
                    </button>
                    <Link href="/admin/transfer" className="ml-4 text-blue-600 underline">Back to Transfers List</Link>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="p-6 container mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-semibold mb-6">Unauthorized</h2>
                <p className="text-gray-700 mb-8">
                    You are not authorized to view this page. Please ensure you have administrator privileges.
                </p>
                <Link href="/dashboard" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 container mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold mb-6">Transfer Details</h2>
            <Link href="/admin/transfer" className="inline-block mb-4 text-blue-600 underline">Back to Transfers List</Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side - Basic Transfer Info */}
                <div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer Information</h3>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-semibold">Transfer ID:</span> {transfer._id}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-semibold">Status:</span> {transfer.status}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-semibold">Created At:</span> {new Date(transfer.createdAt).toLocaleString()}</p>
                        </div>
                        {transfer.failureReason && (
                            <div className="mb-4">
                                <p className="text-red-500"><span className="font-semibold text-gray-700">Failure Reason:</span> {transfer.failureReason}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side - User, Recipient, Amount Details */}
                <div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Details</h3>

                        <div className="mb-6">
                            <h4 className="text-md font-semibold text-gray-700 mb-2">Sender</h4>
                            <div className="flex items-center space-x-4">
                                {/* Assuming user has a profile image, replace with actual path if available */}
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {transfer.user?.profileImage ? (
                                        <img src={transfer.user.profileImage} alt="Sender Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-semibold text-gray-600">{transfer.user?.fullName?.charAt(0).toUpperCase() || 'U'}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-gray-700 font-semibold">{transfer.user?.fullName || 'N/A'}</p>
                                    <p className="text-gray-500">{transfer.user?.email || 'Email N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-md font-semibold text-gray-700 mb-2">Recipient</h4>
                            <div className="flex items-center space-x-4">
                                {/* Assuming recipient has a profile image, replace with actual path if available */}
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {transfer.recipient?.profileImage ? (
                                        <img src={transfer.recipient.profileImage} alt="Recipient Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-semibold text-gray-600">{transfer.recipient?.accountHolderName?.charAt(0).toUpperCase() || 'R'}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-gray-700 font-semibold">{transfer.recipient?.accountHolderName || 'N/A'}</p>
                                    <p className="text-gray-500">{transfer.recipient?.bankName || 'Bank N/A'}</p>
                                    <p className="text-gray-500">Account: {transfer.recipient?.accountNumber || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-md font-semibold text-gray-700 mb-2">Amount</h4>
                            <p className="text-gray-700">
                                <span className="font-semibold">Sent:</span> {transfer.sendAmount} {transfer.sendCurrency?.code}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Received:</span> {transfer.receiveAmount} {transfer.receiveCurrency?.code}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Exchange Rate:</span> {transfer.exchangeRate}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Fees:</span> {transfer.fees} {transfer.sendCurrency?.code}
                            </p>
                        </div>

                        {/* Update Status Section - Conditionally render based on status? */}
                        <div className="mt-4">
                            <TransferStatusDropdown transferId={transfer._id} currentStatus={transfer.status} token={token} onStatusUpdated={handleStatusUpdated} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


interface TransferStatusDropdownProps {
    transferId: string;
    currentStatus: string;
    token: string;
    onStatusUpdated: () => void;
}

const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({ transferId, currentStatus, token, onStatusUpdated }) => {
    const [status, setStatus] = useState(currentStatus);
    const [failureReasonInput, setFailureReasonInput] = useState<string>('');
    const [isFailureReasonOpen, setIsFailureReasonOpen] = useState(false);

    useEffect(() => {
        setStatus(currentStatus);
    }, [currentStatus]);

    const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        if (newStatus === 'failed' || newStatus === 'canceled') {
            setIsFailureReasonOpen(true);
        } else {
            setIsFailureReasonOpen(false);
            setFailureReasonInput(''); // Clear failure reason if status is not failed/canceled
            await updateTransferStatus(newStatus, null); // No failure reason for other statuses
        }
    };

    const handleFailureReasonSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await updateTransferStatus(status, failureReasonInput);
        setIsFailureReasonOpen(false);
        setFailureReasonInput('');
    };


    const updateTransferStatus = async (newStatus: string, failureReason: string | null) => {
        try {
            await adminTransferService.updateAdminTransferStatus(transferId, newStatus, failureReason, token);
            onStatusUpdated(); // Refresh transfer details
        } catch (error: any) {
            console.error("Error updating transfer status:", error);
            alert(`Failed to update status: ${error.message}`);
            // Revert status in dropdown on failure
            setStatus(currentStatus);
        }
    };


    return (
        <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Update Status</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <select
                    id="status"
                    className="block w-full pr-10 py-2 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={status}
                    onChange={handleStatusChange}
                >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {isFailureReasonOpen && (
                <form onSubmit={handleFailureReasonSubmit} className="mt-2">
                    <label htmlFor="failureReason" className="block text-sm font-medium text-gray-700">Failure/Cancellation Reason</label>
                    <div className="mt-1">
                        <textarea
                            id="failureReason"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Provide a reason for failure or cancellation"
                            value={failureReasonInput}
                            onChange={(e) => setFailureReasonInput(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit Reason & Update Status
                    </button>
                </form>
            )}
        </div>
    );
};


export default AdminTransferDetailPage;