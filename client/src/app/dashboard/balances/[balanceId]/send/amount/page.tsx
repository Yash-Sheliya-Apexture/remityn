// frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { IoIosArrowBack, IoIosInformationCircleOutline } from 'react-icons/io';
import { FaLock } from 'react-icons/fa'; // Keep lock icon for rate
// import { FaBolt } from 'react-icons/fa'; // Icons for rate lock and speed
// import { RiInformationLine } from "react-icons/ri"; // Icon for conversion info
// import { FiFileText } from "react-icons/fi"; // Icon for fees
import { useAuth } from '../../../../../hooks/useAuth'; // Adjust path
import axios from 'axios';
import apiConfig from '../../../../../config/apiConfig'; // Adjust path
import { Skeleton } from "@/components/ui/skeleton"; // For loading
import { debounce } from 'lodash';
import Link from 'next/link';
import DashboardHeader from '@/app/dashboard/components/layout/DashboardHeader'; // Assuming header exists
import exchangeRateService from '../../../../../services/exchangeRate'; // Import the service

axios.defaults.baseURL = apiConfig.baseUrl;

// --- Interfaces ---
interface SendAmountParams {
    balanceId: string;
}
interface AccountDetails {
    _id: string;
    balance: number;
    currency: {
        _id: string;
        code: string;
        flagImage?: string;
    };
}
interface RecipientDetails {
    _id: string;
    accountHolderName: string;
    nickname?: string;
    currency: {
        _id: string;
        code: string;
        flagImage?: string;
    };
    accountNumber?: string;
}
interface SendSummary { // Structure expected from /transfers/calculate-summary (NO FEES/ARRIVAL)
    sendAmount: number;
    receiveAmount: number;
    sendCurrencyCode: string;
    receiveCurrencyCode: string;
    exchangeRate: number;
    availableBalance: number;
    sourceAccountId?: string;
    recipientId?: string;
    userId?: string;
}
interface BaseRatesData { // Structure expected from exchangeRateService
    base: string;
    date: string;
    rates: { [key: string]: string };
    timestamp: number;
    updatedAt: Date;
}

// --- Component Definition ---
const steps = ['Recipient', 'Amount', 'Review', 'Pay']; // Steps for the header

export default function SendAmountPage() {
    // --- Hooks ---
    const router = useRouter();
    const params = useParams<SendAmountParams>();
    const searchParams = useSearchParams();
    const { balanceId } = params;
    const recipientId = searchParams.get('recipientId');
    const { token } = useAuth();

    // --- State Variables ---
    const [sourceAccount, setSourceAccount] = useState<AccountDetails | null>(null);
    const [recipient, setRecipient] = useState<RecipientDetails | null>(null);
    const [baseRatesInfo, setBaseRatesInfo] = useState<BaseRatesData | null>(null);
    const [initialRateDisplay, setInitialRateDisplay] = useState<string | null>(null); // e.g., "1 USD = 85.4850 INR"
    const [sendAmount, setSendAmount] = useState<string>('');
    const [receiveAmount, setReceiveAmount] = useState<string>('');
    const [summary, setSummary] = useState<SendSummary | null>(null); // Result from backend calculation (no fees)
    const [isLoading, setIsLoading] = useState(true); // Initial page data loading
    const [isCalculating, setIsCalculating] = useState(false); // Backend calculation loading
    const [isFetchingRates, setIsFetchingRates] = useState(true); // Initial base rates loading
    const [error, setError] = useState<string | null>(null); // General/validation errors shown to user
    const [apiError, setApiError] = useState<string | null>(null); // Specific error from calculation API
    const [lastEdited, setLastEdited] = useState<'send' | 'receive' | null>(null); // Track which input was last edited
    const [isSendFocused, setIsSendFocused] = useState(false); // Track focus for send input styling
    const [isReceiveFocused, setIsReceiveFocused] = useState(false); // Track focus for receive input styling

    // --- Effect: Fetch Initial Data (Account, Recipient, Base Rates) ---
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); setIsFetchingRates(true); setApiError(null); setError(null);
            if (!recipientId || !balanceId || !token) { setError("Missing required information."); setIsLoading(false); setIsFetchingRates(false); return; }
            try {
                const [accountRes, recipientRes, ratesRes] = await Promise.all([
                    axios.get<AccountDetails>(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } }),
                    exchangeRateService.getExchangeRatesForCurrencies()
                ]);
                setSourceAccount(accountRes.data); setRecipient(recipientRes.data);
                if (ratesRes && ratesRes.rates) { setBaseRatesInfo(ratesRes.rates); }
                else { console.warn("Base rates data missing"); setInitialRateDisplay("Rate unavailable"); }
            } catch (err: any) {
                console.error("Error fetching initial page data:", err); const message = err.response?.data?.message || "Failed to load details."; setError(message); setApiError(message);
            } finally { setIsLoading(false); setIsFetchingRates(false); }
        };
        fetchData();
    }, [balanceId, recipientId, token]);

    // --- Effect: Calculate and Set Initial Rate Display String ---
    useEffect(() => {
        if (sourceAccount && recipient && baseRatesInfo && baseRatesInfo.rates) {
            const sendCode = sourceAccount.currency.code; const receiveCode = recipient.currency.code; const rates = baseRatesInfo.rates; const baseCode = baseRatesInfo.base || 'USD';
            try {
                const rateBaseToSend = sendCode === baseCode ? 1 : (rates[sendCode] ? parseFloat(rates[sendCode]) : NaN);
                const rateBaseToReceive = receiveCode === baseCode ? 1 : (rates[receiveCode] ? parseFloat(rates[receiveCode]) : NaN);
                if (!isNaN(rateBaseToSend) && !isNaN(rateBaseToReceive) && rateBaseToSend !== 0) {
                    const directRate = rateBaseToReceive / rateBaseToSend; setInitialRateDisplay(`1 ${sendCode} = ${directRate.toFixed(4)} ${receiveCode}`);
                } else { console.warn(`Could not find rates for ${sendCode}/${receiveCode}`); setInitialRateDisplay("Rate unavailable"); }
            } catch (e) { console.error("Error calculating initial rate:", e); setInitialRateDisplay("Rate error"); }
        } else if (!isFetchingRates && (!sourceAccount || !recipient || !baseRatesInfo)) { setInitialRateDisplay("Rate unavailable"); }
    }, [sourceAccount, recipient, baseRatesInfo, isFetchingRates]);

    // --- Debounced Calculation Function (Calls Backend Summary Endpoint - NO FEES) ---
    const debouncedCalculate = useMemo(
        () =>
            debounce(async (amount: number, isSending: boolean) => {
                setSummary(null); setApiError(null); if (error && error !== "Insufficient balance.") setError(null);
                if (!sourceAccount || !recipient || !token || isNaN(amount) || amount <= 0) { setIsCalculating(false); if(isSending) setReceiveAmount(''); else setSendAmount(''); return; }
                setIsCalculating(true);
                try {
                    const response = await axios.post<SendSummary>('/transfers/calculate-summary', { sourceAccountId: sourceAccount._id, recipientId: recipient._id, amount: amount, isSendingAmount: isSending, }, { headers: { Authorization: `Bearer ${token}` } });
                    setSummary(response.data); // Summary now has no fees/arrival
                    if (isSending) { setReceiveAmount(response.data.receiveAmount.toFixed(2)); } else { setSendAmount(response.data.sendAmount.toFixed(2)); }
                    setError(null); setApiError(null);
                } catch (err: any) {
                    console.error("Error calculating send summary (AxiosError check):", err); const message = err.response?.data?.message || "Calculation failed."; const code = err.response?.data?.code; setApiError(`Calculation error: ${message}`); setError(code === 'INSUFFICIENT_BALANCE' ? "Insufficient balance." : message); setSummary(null); if (isSending) setReceiveAmount(''); else setSendAmount('');
                } finally { setIsCalculating(false); }
            }, 500),
        [sourceAccount, recipient, token, error]
    );

    // --- Input Handlers (Keep as is) ---
    const handleAmountChange = (value: string, type: 'send' | 'receive') => {
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            let currentAmount = '';
            if (type === 'send') { setSendAmount(value); setLastEdited('send'); currentAmount = value; }
            else { setReceiveAmount(value); setLastEdited('receive'); currentAmount = value; }
            const amountNum = parseFloat(currentAmount);
            if (!isNaN(amountNum) && amountNum > 0) { debouncedCalculate(amountNum, type === 'send'); }
            else { debouncedCalculate.cancel(); setSummary(null); setIsCalculating(false); setApiError(null); if (error && error !== "Insufficient balance.") setError(null); if (type === 'send') setReceiveAmount(''); else setSendAmount(''); }
        }
    };
    const handleFocus = (type: 'send' | 'receive') => { if (type === 'send') setIsSendFocused(true); else setIsReceiveFocused(true); };
    const handleBlur = (type: 'send' | 'receive') => { if (type === 'send') setIsSendFocused(false); else setIsReceiveFocused(false); };

     // --- Continue Logic (Keep as is - validation doesn't depend on fees) ---
    const handleContinue = () => {
         const isSendValid = sendAmount && parseFloat(sendAmount) > 0;
         const isReceiveValid = receiveAmount && parseFloat(receiveAmount) > 0;
         if (!isSendValid && !isReceiveValid) { setError("Please enter an amount."); return; }
         if (isCalculating) { setError("Calculating..."); return; }
         if (apiError) { setError(apiError); return; }
         if (error === "Insufficient balance.") { return; }
         if (!summary) { setError("Calculation details missing."); return; }
         if (sourceAccount && summary.sendAmount > sourceAccount.balance) { setError("Insufficient balance."); setApiError("Insufficient balance."); return; }

        // Store summary (which now has no fees/arrival)
        localStorage.setItem('sendTransferSummary', JSON.stringify(summary));
        const needsReason = recipient?.currency.code === 'INR';
        const nextPath = needsReason ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}` : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
        router.push(nextPath);
    };

    // --- Derived State for UI Logic ---
    const showInitialPrompt = !summary && !isCalculating && !sendAmount && !receiveAmount && !error && !apiError;
    const showCalculationDetails = summary && !isCalculating && !apiError && !error;
    const canContinue = !isCalculating && !!summary && !error && !apiError; // Button enabled state

    // --- Render Logic ---
    if (isLoading) { /* ... Skeleton ... */ return <div className="p-10">Loading...</div>; }
    if (!sourceAccount || !recipient) { /* ... Error and Link back ... */ return <div className="p-10 text-red-500">Error loading details. <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`}>Go back</Link></div>; }

    return (
        <div className="SendAmount-Page pb-10">
            <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
            <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
                {/* Back Link */}
                <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-gray-900">
                    <IoIosArrowBack size={18}/> Back
                </Link>

                {/* Initial Rate Display */}
                <div className="text-right mb-4 h-8">
                    {isFetchingRates ? (<Skeleton height={28} width={170} inline />) : (initialRateDisplay && ( <span className="text-xs sm:text-sm font-medium p-2 rounded-md bg-gray-100 border border-gray-200 cursor-pointer hover:bg-gray-200 inline-flex items-center gap-1"><FaLock size={10} className="text-gray-500"/> {initialRateDisplay} ›</span> ))}
                </div>

                {/* Main Content Area */}
                <div className="space-y-4">
                    {/* You Send Section */}
                    <div data-testid="send-section">
                         <label className={`block text-xs font-medium mb-1 ml-2 ${showCalculationDetails ? 'text-gray-700' : 'text-gray-500'}`}>
                             {showCalculationDetails ? 'You send exactly' : 'You send'}
                         </label>
                        <div className="flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px]">
                            <div className="flex items-center space-x-2 mr-3 pr-3 border-r flex-shrink-0">
                                 <Image src={sourceAccount.currency.flagImage || `/assets/icon/${sourceAccount.currency.code.toLowerCase()}.svg`} alt={`${sourceAccount.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
                                <span className="font-semibold text-base">{sourceAccount.currency.code}</span>
                            </div>
                             <input type="text" inputMode="decimal" value={sendAmount} onChange={(e) => handleAmountChange(e.target.value, 'send')} onFocus={() => handleFocus('send')} onBlur={() => handleBlur('send')}
                                className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out ${ isSendFocused ? 'text-4xl lg:text-5xl' : (sendAmount && parseFloat(sendAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } ${ lastEdited === 'receive' && summary ? 'text-gray-400' : 'text-black' }`}
                                placeholder="0" aria-label="Amount to send" data-testid="send-amount-input" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-2">Balance available: <span className="font-medium underline cursor-pointer hover:text-blue-700">{sourceAccount.balance.toFixed(2)} {sourceAccount.currency.code}</span></p>
                        {/* Removed Conversion Info Line */}
                    </div>

                    {/* Recipient Gets Section */}
                     <div data-testid="receive-section">
                         <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">{recipient.nickname || recipient.accountHolderName} gets</label>
                        <div className="flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px]">
                            <div className="flex items-center space-x-2 mr-3 pr-3 border-r flex-shrink-0">
                                <Image src={recipient.currency.flagImage || `/assets/icon/${recipient.currency.code.toLowerCase()}.svg`} alt={`${recipient.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
                                <span className="font-semibold text-base">{recipient.currency.code}</span>
                             </div>
                             <input type="text" inputMode="decimal" value={receiveAmount} onChange={(e) => handleAmountChange(e.target.value, 'receive')} onFocus={() => handleFocus('receive')} onBlur={() => handleBlur('receive')}
                                className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out ${ isReceiveFocused ? 'text-4xl lg:text-5xl' : (receiveAmount && parseFloat(receiveAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } ${ lastEdited === 'send' && summary ? 'text-gray-400' : 'text-black' }`}
                                placeholder="0" aria-label="Amount recipient gets" data-testid="receive-amount-input" />
                        </div>
                        {recipient.accountNumber && <p className="text-xs text-gray-500 mt-1 ml-2">Account ending in {recipient.accountNumber.slice(-4)}</p>}
                    </div>

                    {/* Paying With Section */}
                    <div className="mt-6 mb-6">
                         <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">Paying with</label>
                         <div className="flex items-center p-3 border rounded-lg bg-gray-50 shadow-sm">
                              <Image src={sourceAccount.currency.flagImage || `/assets/icon/${sourceAccount.currency.code.toLowerCase()}.svg`} alt={`${sourceAccount.currency.code} flag`} width={32} height={32} className="rounded-full mr-3" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
                               <div>
                                   <p className="text-sm font-semibold text-gray-800">Wise {sourceAccount.currency.code} balance</p>
                                   <p className="text-xs text-gray-600">{sourceAccount.balance.toFixed(2)} {sourceAccount.currency.code} available</p>
                               </div>
                         </div>
                    </div>

                    {/* --- REMOVED Details Section (Arrives/Fees) --- */}

                    {/* Prompt */}
                     {showInitialPrompt && (
                         <div className="p-4 rounded-lg text-center text-sm bg-gray-100 text-gray-600 mt-6">
                            <IoIosInformationCircleOutline className="inline mr-1 mb-0.5" /> Enter <span className="font-semibold">either amount</span> to continue
                         </div>
                    )}
                    {/* REMOVED Speed Info */}

                    {/* Error Display */}
                     {error && (<p className="text-red-600 text-sm mt-4 text-center bg-red-50 p-2 rounded border border-red-200">{error}</p>)}

                    {/* Continue Button */}
                    <button onClick={handleContinue} disabled={!canContinue || isCalculating}
                        className={`w-full font-semibold py-3 rounded-full mt-6 transition-all duration-300 ease-in-out ${ canContinue ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed' }`}
                        data-testid="continue-button">
                        {isCalculating ? 'Calculating...' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
}