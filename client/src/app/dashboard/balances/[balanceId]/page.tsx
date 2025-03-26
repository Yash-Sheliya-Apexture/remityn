'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'; // Correct import for Next.js 13+
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth } from '../../../hooks/useAuth';
import axios from 'axios';
import apiConfig from '../../../config/apiConfig';
import Link from 'next/link';

axios.defaults.baseURL = apiConfig.baseUrl;

interface BalanceDetailPageParams {
    balanceId: string;
}

interface BalanceDetail {
    _id: string;
    user: string;
    currency: {
        _id: string;
        code: string;
    };
    balance: number;
    accountNumber?: string; // Assuming account number is optional or might not be always present
    createdAt: string;
    __v: number;
}


const BalanceDetailPage = () => {
    const params = useParams<BalanceDetailPageParams>(); // Use useParams hook
    const router = useRouter();
    const { balanceId } = params;
    const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null); // Use interface for type safety
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchBalanceDetail = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/accounts/${balanceId}`, { // Assuming your backend endpoint is /api/accounts/:balanceId
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBalanceDetail(response.data);
                setIsLoading(false);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load balance details');
                setIsLoading(false);
                console.error("Error fetching balance detail:", err);
                if (err.response?.status === 404) {
                    router.push('/dashboard'); // Redirect to dashboard if balance not found
                }
            }
        };

        if (balanceId) {
            fetchBalanceDetail();
        } else {
            setIsLoading(false);
            setError("Balance ID is missing.");
        }
    }, [balanceId, token, router]);

    if (isLoading) {
        return <div>Loading balance details...</div>;
    }

    if (error || !balanceDetail) {
        return <div className="text-red-500">Error: {error || "Balance details not found."}</div>;
    }

    const currencyCode = balanceDetail.currency.code;
    const formattedBalance = parseFloat(balanceDetail.balance).toFixed(2); // Format balance to 2 decimal places


    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <button onClick={() => router.back()} className="mb-4 flex items-center gap-2">
                <IoIosArrowBack size={20} /> Back
            </button>

            {/* Balance Card */}
            <div className="bg-lightgray rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                    <Image
                        src={`/assets/icon/${currencyCode.toLowerCase()}.svg`}
                        alt={`${currencyCode} flag`}
                        width={50}
                        height={50}
                        onError={() => console.error(`Error loading image for ${currencyCode}`)}
                    />
                    <h2 className="text-2xl font-semibold">{currencyCode} balance</h2>
                </div>

                <div className="text-4xl font-bold mb-4">
                    {formattedBalance} {currencyCode}
                </div>

                {balanceDetail.accountNumber && ( // Conditionally render account number if available
                    <div className="flex items-center gap-2 mb-6">
                        <span className="bg-gray-300 p-1 rounded-md">🏦</span>
                        <span className="text-sm text-gray-700">{balanceDetail.accountNumber}</span>
                        <span className="ml-2 text-green-500 cursor-pointer hover:underline">Copy</span> {/* Implement copy functionality if needed */}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-around space-x-4 mt-8">
                    <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref> {/* Link to Add Money page */}
                        <button className="action-button bg-green-500 hover:bg-green-700 text-white">Add</button>
                    </Link>
                    <button className="action-button bg-yellow-500 hover:bg-yellow-700 text-white">Send</button>
                </div>
            </div>

            {/* Transactions Section (Placeholder) */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Transactions</h3>
                <p className="text-gray-600">No transactions to display yet. (Placeholder)</p>
                {/*  Transaction list component would go here */}
            </div>

            {/* Options Section (Placeholder) */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Options</h3>
                <p className="text-gray-600">Account options will be displayed here. (Placeholder)</p>
                {/* Account options components would go here */}
            </div>
        </div>
    );
};

export default BalanceDetailPage;