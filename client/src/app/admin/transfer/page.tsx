// frontend/src/app/admin/transfers/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import TransferList from '../components/TransferList';
import adminTransferService from '../../services/admin/transfer';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

const AdminTransfersPage = () => {
    const [transfers, setTransfers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token, isAdmin, loadingAuth } = useAuth();
    const router = useRouter(); // Initialize useRouter
    const [statusFilter, setStatusFilter] = useState<string>('');

    useEffect(() => {
        // Redirect and don't fetch if auth is still loading or not admin
        if (loadingAuth) {
            return; // Wait for auth state to be determined
        }
        if (!isAdmin) {
            router.push('/dashboard'); // Redirect non-admins to dashboard
            return; // Stop further execution in this effect
        }

        fetchTransfers(); // Fetch transfers now that we are authorized

    }, [token, isAdmin, loadingAuth, router, statusFilter]); // Added loadingAuth and router as dependencies

    const fetchTransfers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const filters = statusFilter ? { status: statusFilter } : {};
            const data = await adminTransferService.getAdminTransfers(token, filters);
            setTransfers(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load transfers.');
            console.error("Error fetching admin transfers:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    // Loading State (during auth loading or transfers loading)
    if (loadingAuth || isLoading) {
        return (
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Admin Transfers</h2>
                <div><Skeleton count={5} height={100} className="mb-2" /></div>
            </div>
        );
    }

    // Error State
    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    // Unauthorized State
    if (!isAdmin) {
        return <div className="p-4">You are not authorized to view this page.</div>;
    }

    // Main Content - Transfers List
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Admin Transfers</h2>

            {/* Status Filter Dropdown */}
            <div className="mb-4">
                <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status:</label>
                <select
                    id="statusFilter"
                    className="mt-1 block w-auto py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Transfer List - Conditionally render based on isLoading */}
            {isLoading ? (
                <div><Skeleton count={5} height={100} className="mb-2" /></div>
            ) : (
                <TransferList transfers={transfers} />
            )}
        </div>
    );
};

export default AdminTransfersPage;