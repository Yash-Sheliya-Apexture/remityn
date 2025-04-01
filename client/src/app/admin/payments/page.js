'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import apiConfig from '../../config/apiConfig';
import { Skeleton } from '../../../components/ui/skeleton';

axios.defaults.baseURL = apiConfig.baseUrl;

const AdminPaymentsPage = () => {
    const { token } = useAuth();
    const [payments, setPayments] = useState([]);
    const [loadingPayments, setLoadingPayments] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // State for success message
    const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

    useEffect(() => {
        const fetchPayments = async () => {
            setLoadingPayments(true);
            setError(null);
            setSuccessMessage(null); // Clear any previous messages
            try {
                const response = await axios.get('/admin/payments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPayments(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load payments');
                console.error("Error fetching payments:", err);
                // No toast notification here, just setting component error state
            } finally {
                setLoadingPayments(false);
            }
        };

        fetchPayments();
    }, [token]);

    const handleStatusChange = async (paymentId, newStatus) => {
        setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: true }));
        setError(null);
        setSuccessMessage(null); // Clear previous messages
        try {
            await axios.put(`/admin/payments/${paymentId}/status`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(payments.map(payment =>
                payment._id === paymentId ? { ...payment, status: newStatus } : payment
            ));
            setSuccessMessage(`Payment status updated to ${newStatus}`); // Set success message state
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update payment status');
            console.error("Error updating payment status:", err);
            // No toast notification, just setting component error state
        } finally {
            setStatusUpdateLoading(prevState => ({ ...prevState, [paymentId]: false }));
        }
    };

    if (loadingPayments) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Admin Payment Management</h1>
                <p>Loading payments...</p>
                <div>
                    <Skeleton count={5} className="h-12 mb-4" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Admin Payment Management</h1>
                <p className="text-red-500">Error loading payments: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Admin Payment Management</h1>

            {successMessage && ( // Display success message
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}

            {error && ( // Display error message
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}


            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {payments.map(payment => (
                            <tr key={payment._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.user?.fullName || 'N/A'} ({payment.user?.email || 'N/A'})</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amountToAdd}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.payInCurrency?.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <select
                                        value={payment.status}
                                        onChange={(e) => handleStatusChange(payment._id, e.target.value)}
                                        disabled={statusUpdateLoading[payment._id]}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                    {statusUpdateLoading[payment._id] && <span className="ml-2 text-gray-500">Updating...</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {/* Future action buttons can be added here - e.g., View Details, Edit */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPaymentsPage;