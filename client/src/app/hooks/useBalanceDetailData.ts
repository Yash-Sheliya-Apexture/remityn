// src/app/hooks/useBalanceDetailData.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth'; // Adjust path
import paymentService from '../services/payment'; // Adjust path
import transferService from '../services/transfer'; // Adjust path
import apiConfig from '../config/apiConfig'; // Adjust path
import { Transaction } from '@/types/transaction'; // Adjust path

// Interface for the detailed balance data fetched directly
export interface BalanceDetail {
    _id: string;
    user: string;
    currency: {
        _id: string;
        code: string;
        flagImage?: string;
        currencyName?: string;
    };
    balance: number;
    accountNumber?: string;
    createdAt: string;
    __v?: number;
}

// Configure Axios Base URL (if not globally set)
axios.defaults.baseURL = apiConfig.baseUrl;

export const useBalanceDetailData = (balanceId: string | undefined) => {
    const { token } = useAuth();

    const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // All user transactions for potential cross-balance filtering later? Keep for now.
    const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]); // Filtered for this balance
    const [isLoading, setIsLoading] = useState(true); // Loading balance detail
    const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Loading transactions
    const [error, setError] = useState<string | null>(null); // General error

    const fetchData = useCallback(async () => {
        if (!balanceId || !token) {
            setError("Missing balance ID or authentication token.");
            setIsLoading(false);
            setIsTransactionsLoading(false);
            return;
        }

        // Reset states on new fetch
        setIsLoading(true);
        setIsTransactionsLoading(true);
        setError(null);
        setBalanceDetail(null);
        setAllTransactions([]); // Reset all if needed, or maybe just balanceSpecific
        setBalanceSpecificTransactions([]);

        try {
            // 1. Fetch Balance Details
            const balanceResponse = await axios.get(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
            const fetchedBalanceDetail = balanceResponse.data as BalanceDetail;
            setBalanceDetail(fetchedBalanceDetail);
            setIsLoading(false); // Balance details loaded

            const currentCurrencyCode = fetchedBalanceDetail?.currency?.code;
            if (!currentCurrencyCode) {
                throw new Error("Could not determine the currency code for this balance.");
            }

            // 2. Fetch Transactions in parallel
            const [paymentsResult, transfersResult] = await Promise.allSettled([
                paymentService.getUserPayments(token),
                transferService.getUserTransfers(token),
            ]);

            // Process Transactions Results
            let combinedTransactions: Transaction[] = [];
            if (paymentsResult.status === 'fulfilled') {
                const mappedPayments: Transaction[] = paymentsResult.value.map(payment => ({
                    ...payment,
                    type: "Add Money",
                    status: payment.status?.toLowerCase() ?? 'unknown',
                }));
                combinedTransactions = [...combinedTransactions, ...mappedPayments];
            } else {
                console.error("Payments fetch error:", paymentsResult.reason);
                if (!error) setError("Failed to load payment history."); // Set transaction-specific error
            }

            if (transfersResult.status === 'fulfilled') {
                const mappedTransfers: Transaction[] = transfersResult.value.map(transfer => ({
                    ...transfer,
                    type: "Send Money",
                    status: transfer.status?.toLowerCase() ?? 'unknown',
                    name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
                          ? transfer.recipient.accountHolderName ?? 'Recipient'
                          : 'Recipient',
                    sourceAccountId: typeof transfer.sourceAccount === 'string'
                                      ? transfer.sourceAccount
                                      : transfer.sourceAccount?._id,
                }));
                combinedTransactions = [...combinedTransactions, ...mappedTransfers];
            } else {
                console.error("Transfers fetch error:", transfersResult.reason);
                if (!error) setError("Failed to load transfer history."); // Set transaction-specific error
            }

            // Sort combined transactions by date (newest first)
            combinedTransactions.sort((a, b) => {
                const dateA = a.updatedAt || a.createdAt;
                const dateB = b.updatedAt || b.createdAt;
                if (!dateA && !dateB) return 0;
                if (!dateA) return 1;
                if (!dateB) return -1;
                try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
                catch { return 0; }
            });

            setAllTransactions(combinedTransactions); // Store all for potential other uses

            // Filter specific transactions *after* combining and sorting
            const filtered = combinedTransactions.filter((transaction) => {
                if (transaction.type === "Add Money") {
                    const paymentAccountId = typeof transaction.account === 'string' ? transaction.account : transaction.account?._id;
                    return paymentAccountId === balanceId;
                } else if (transaction.type === "Send Money") {
                    const sourceAccId = typeof transaction.sourceAccount === 'string'
                                       ? transaction.sourceAccount
                                       : transaction.sourceAccount?._id;
                    return sourceAccId === balanceId;
                }
                return false;
            });
            setBalanceSpecificTransactions(filtered);

            setIsTransactionsLoading(false); // Transactions loading finished

        } catch (err: any) {
            console.error("Overall fetch error in useBalanceDetailData:", err);
            setError(err.response?.data?.message || err.message || "An unexpected error occurred while loading page data.");
            setIsLoading(false);
            setIsTransactionsLoading(false);
        }
    }, [balanceId, token, error]); // Include error dependency cautiously

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [balanceId, token]); // Keep dependencies minimal for initial fetch trigger

    return {
        balanceDetail,
        // allTransactions, // Decide if the parent component needs *all* transactions
        balanceSpecificTransactions, // Provide the filtered list
        isLoading, // Loading state for balance detail
        isTransactionsLoading, // Loading state for transactions
        error, // Combined error state
        fetchData, // Allow refetching from parent if needed
    };
};