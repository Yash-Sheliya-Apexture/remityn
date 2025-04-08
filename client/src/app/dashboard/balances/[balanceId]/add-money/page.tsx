// app/dashboard/balances/[balanceId]/add-money/page.tsx
"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { AiFillBank } from "react-icons/ai";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios"; // Keep axios import for type checking
import apiConfig from "../../../../config/apiConfig";
import { Skeleton } from "@/components/ui/skeleton";

axios.defaults.baseURL = apiConfig.baseUrl;

interface AddMoneyPageParams {
    balanceId: string;
}


interface PaymentSummary {
    _id?: string; // _id is optional in summary, will be present after initiateAddMoney
    amountToPay: number;
    wiseFee: number;
    bankTransferFee: number;
    exchangeRate: number;
    balanceCurrencyCode: string; // Add these to summary type
    payInCurrencyCode: string;
    amountToAdd: number;
    userId: string;
    // ... other properties
}

const AddMoneyPage = () => {
    const [amountToAdd, setAmountToAdd] = useState<number | "">("");
    const [balanceCurrency, setBalanceCurrency] = useState<{
        code: string;
    } | null>(null);
    const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDetailsLoading, setIsDetailsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();
    const router = useRouter();
    const params = useParams<AddMoneyPageParams>();
    const { balanceId } = params;

    // Dynamically set payInCurrencyCode from balanceCurrency.code or default to "USD" if balanceCurrency is not yet loaded
    const payInCurrencyCode = balanceCurrency?.code || "USD";

    const calculatePaymentSummaryDebounced = useCallback(
        (amount: number) => {
            const balCurrencyCode = balanceCurrency?.code;

            if (balCurrencyCode && payInCurrencyCode && !isNaN(amount) && amount > 0) {
                setIsDetailsLoading(true);
                setError(null);
                axios.post<PaymentSummary>( // Call calculate-summary endpoint for calculation only
                    "/payments/add-money/calculate-summary", // ADD /api prefix here
                    {
                        balanceCurrencyCode: balCurrencyCode,
                        payInCurrencyCode: payInCurrencyCode,
                        amountToAdd: amount,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                    .then(response => {
                        setPaymentSummary(response.data);
                        setIsDetailsLoading(false);
                    })
                    .catch(err => {
                        let errorMessage = "Failed to calculate payment summary";
                        if (axios.isAxiosError(err)) {
                            errorMessage = err.response?.data?.message || errorMessage;
                        }
                        setError(errorMessage);
                        console.error("Error calculating payment summary:", err);
                        setPaymentSummary(null);
                        setIsDetailsLoading(false);
                    });
            } else {
                setPaymentSummary(null);
                setIsDetailsLoading(false);
            }
        },
        [token, balanceCurrency?.code, payInCurrencyCode] // Include payInCurrencyCode in dependency array
    );


    useEffect(() => {
        const fetchBalanceCurrency = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get<{ currency: { code: string } }>(`/accounts/${balanceId}`, { // ADD /api prefix here
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBalanceCurrency({ code: response.data.currency.code });
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            } catch (err: unknown) { // Changed 'any' to 'unknown'
                let errorMessage = "Failed to load balance currency";
                 if (axios.isAxiosError(err)) { // Type check for AxiosError
                     errorMessage = err.response?.data?.message || errorMessage;
                 } else if (err instanceof Error) {
                     errorMessage = err.message;
                 }
                setError(errorMessage);
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
                console.error("Error fetching balance currency:", err);
            }
        };

        fetchBalanceCurrency();
    }, [balanceId, token]);


    useEffect(() => {
        if (typeof amountToAdd === 'number' && !isNaN(amountToAdd) && amountToAdd > 0 && balanceCurrency?.code) {
            calculatePaymentSummaryDebounced(amountToAdd);
        } else {
            setPaymentSummary(null);
        }
    }, [amountToAdd, calculatePaymentSummaryDebounced, balanceCurrency?.code]);


    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = value === "" ? "" : parseFloat(value);
        if (!isNaN(numberValue) || value === "") {
            setAmountToAdd(numberValue);
        }
    };


    const handleContinue = async () => {
        if (!balanceCurrency || amountToAdd === "" || isNaN(Number(amountToAdd))) {
            alert("Please enter a valid amount.");
            return;
        }

        setIsLoading(true); // Start loading before API call
        setError(null);

        try {
            const paymentDataToSave = paymentSummary; // Use the calculated summary data to save
            if (!paymentDataToSave) {
                setError("Payment summary is missing. Please enter a valid amount.");
                setIsLoading(false);
                return;
            }

            const initiateResponse = await axios.post<PaymentSummary>( // Call initiate endpoint to save payment
                "/payments/add-money/initiate", // ADD /api prefix here
                paymentDataToSave, // Send the summary data to initiate endpoint for saving
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const savedPayment = initiateResponse.data; // Payment data now saved in backend
            if (savedPayment?._id) {
                setPaymentSummary(savedPayment); // Store full payment summary with _id (though might not be needed again after redirect)
                router.push(
                    `/dashboard/balances/${balanceId}/payment-details?paymentId=${savedPayment._id}`
                );
            } else {
                setError("Failed to initiate payment. Please try again.");
            }


        } catch (err: unknown) { // Changed 'any' to 'unknown'
            let errorMessage = "Failed to initiate payment";
            if (axios.isAxiosError(err)) { // Type check for AxiosError
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            console.error("Error initiating payment:", err);
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) {
        return (
            <div className="max-w-xl mx-auto p-4 lg:p-8">
                <Skeleton className="h-8 w-48 mb-8 mx-auto" />
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                {/* Adjusted skeleton count */}
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-5 w-full mb-2" />)}
                <Skeleton className="h-12 w-full mt-4" />
            </div>
        );
    }

    if (error || !balanceCurrency) {
        return (
            <div className="max-w-xl mx-auto p-4 lg:p-8 text-red-500">
                Error: {error || "Could not load page details."}
            </div>
        );
    }

    const calculatedAmountToPay = paymentSummary
        ? parseFloat(paymentSummary.amountToPay).toFixed(2)
        : isDetailsLoading ? '...' : "0.00";
    const calculatedWiseFee =
        paymentSummary?.wiseFee !== undefined
            ? parseFloat(paymentSummary.wiseFee).toFixed(2)
            : isDetailsLoading ? '...' : "0.00";
    const calculatedBankTransferFee =
        paymentSummary?.bankTransferFee !== undefined
            ? parseFloat(paymentSummary.bankTransferFee).toFixed(2)
            : isDetailsLoading ? '...' : "0.00";
    const totalFees = paymentSummary
        ? (parseFloat(calculatedWiseFee) + parseFloat(calculatedBankTransferFee)).toFixed(2)
        : isDetailsLoading ? '...' : "0.00";


    return (
        <div className="max-w-xl mx-auto p-4 lg:p-8">
            <h2 className="sm:text-3xl text-2xl text-center font-semibold text-mainheading mb-6 dark:text-white">
                Add Money
            </h2>

            <div>
                <label
                    htmlFor="amount"
                    className="block text-base font-medium text-neutral-900 dark:text-white"
                >
                    Amount to add to Wise
                </label>
                {/* Amount Input Fileld */}
                <div className="relative mt-1 rounded-md">
                    <input
                        name="amount"
                        id="amount"
                        className="block w-full text-xl rounded-xl ps-2 font-bold h-18 py-3 pl-5 pr-28 border border-gray-300 dark:border-lightgray/26 transition-shadow ease-in-out duration-300 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-400 dark:placeholder:text-neutral-700"
                        placeholder="0.00"
                        value={amountToAdd}
                        onChange={handleAmountChange}
                        required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                        <div className="px-2 flex items-center md:gap-4 gap-2">
                            <span className="inline-block rounded-full overflow-hidden">
                                <Image
                                    src={`/assets/icon/${balanceCurrency?.code?.toLowerCase()}.svg`}
                                    alt={`${balanceCurrency?.code} Flag`}
                                    height={25}
                                    width={25}
                                    className="md:size-7 size-6"
                                />
                            </span>
                            <span className="mr-2 text-neutral-700 dark:text-white font-bold md:text-xl text-lg">
                                {balanceCurrency?.code}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-base font-medium text-neutral-900 dark:text-white">
                        Paying with
                    </label>
                    <div className="border border-gray-300 dark:border-lightgray/26 rounded-xl ps-5 py-4 flex items-center gap-4 mt-1">
                        <div className="p-2 bg-green-500/20 rounded-full inline-block">
                            <AiFillBank className="size-7 text-green-500" />
                        </div>
                        <span className="text-neutral-900 dark:text-white  font-semibold capitalize md:text-lg text-base">
                            Bank transfer
                        </span>
                    </div>
                </div>

                {/* currency calculation */}
                <div className="mt-4 border border-gray-300 dark:border-lightgray/26 rounded-xl p-4">
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-neutral-700 dark:text-gray-300 ">Currency to pay in</dt>
                        <dd className="ml-6 text-secondary dark:text-gray-300 font-bold">
                            {payInCurrencyCode}
                        </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-neutral-700 dark:text-gray-300 ">Bank transfer fee</dt>
                        <dd className="ml-6 text-neutral-700 dark:text-gray-300  font-medium">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedBankTransferFee} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-neutral-700 dark:text-gray-300 ">Our fee</dt>
                        <dd className="ml-6 text-neutral-700 dark:text-gray-300 font-medium">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedWiseFee} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-gray">
                        <dt className="text-neutral-700 dark:text-gray-300 font-medium">Total included fees</dt>
                        <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${totalFees} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                    <div className="py-3.5 flex justify-between text-sm text-gray border-t dark:border-lightgray/26">
                         {/* Fixed unescaped entity */}
                        <dt className="text-neutral-900 font-bold capitalize">
                            Total you'll pay
                        </dt>
                        <dd className="ml-6 text-neutral-900 dark:text-white font-bold">
                            {isDetailsLoading ? <Skeleton className="h-4 w-16" /> : `${calculatedAmountToPay} ${payInCurrencyCode}`}
                        </dd>
                    </div>
                </div>

                {/* Continue button for confirm enter value */}
                <div className="mt-4">
                    <button
                        onClick={handleContinue}
                        className="w-full bg-primary text-neutral-900 hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer"
                        disabled={
                            isLoading || amountToAdd === "" || isNaN(Number(amountToAdd)) || isDetailsLoading
                        }
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMoneyPage;