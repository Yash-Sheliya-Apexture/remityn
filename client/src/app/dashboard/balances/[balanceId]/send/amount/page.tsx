// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import { IoIosArrowBack, IoIosInformationCircleOutline } from 'react-icons/io';
// import { FaLock } from 'react-icons/fa'; // Keep lock icon for rate
// // import { FaBolt } from 'react-icons/fa'; // Icons for rate lock and speed
// // import { RiInformationLine } from "react-icons/ri"; // Icon for conversion info
// // import { FiFileText } from "react-icons/fi"; // Icon for fees
// import { useAuth } from '../../../../../hooks/useAuth'; // Adjust path
// import axios from 'axios';
// import apiConfig from '../../../../../config/apiConfig'; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // For loading
// import { debounce } from 'lodash';
// import Link from 'next/link';
// import DashboardHeader from '@/app/dashboard/components/layout/DashboardHeader'; // Assuming header exists
// import exchangeRateService from '../../../../../services/exchangeRate'; // Import the service

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface SendAmountParams {
//     balanceId: string;
// }
// interface AccountDetails {
//     _id: string;
//     balance: number;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
// }
// interface RecipientDetails {
//     _id: string;
//     accountHolderName: string;
//     nickname?: string;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
//     accountNumber?: string;
// }
// interface SendSummary { // Structure expected from /transfers/calculate-summary (NO FEES/ARRIVAL)
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrencyCode: string;
//     receiveCurrencyCode: string;
//     exchangeRate: number;
//     availableBalance: number;
//     sourceAccountId?: string;
//     recipientId?: string;
//     userId?: string;
// }
// interface BaseRatesData { // Structure expected from exchangeRateService
//     base: string;
//     date: string;
//     rates: { [key: string]: string };
//     timestamp: number;
//     updatedAt: Date;
// }

// // --- Component Definition ---
// const steps = ['Recipient', 'Amount', 'Review', 'Pay']; // Steps for the header

// export default function SendAmountPage() {
//     // --- Hooks ---
//     const router = useRouter();
//     const params = useParams<SendAmountParams>();
//     const searchParams = useSearchParams();
//     const { balanceId } = params;
//     const recipientId = searchParams.get('recipientId');
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [sourceAccount, setSourceAccount] = useState<AccountDetails | null>(null);
//     const [recipient, setRecipient] = useState<RecipientDetails | null>(null);
//     const [baseRatesInfo, setBaseRatesInfo] = useState<BaseRatesData | null>(null);
//     const [initialRateDisplay, setInitialRateDisplay] = useState<string | null>(null); // e.g., "1 USD = 85.4850 INR"
//     const [sendAmount, setSendAmount] = useState<string>('');
//     const [receiveAmount, setReceiveAmount] = useState<string>('');
//     const [summary, setSummary] = useState<SendSummary | null>(null); // Result from backend calculation (no fees)
//     const [isLoading, setIsLoading] = useState(true); // Initial page data loading
//     const [isCalculating, setIsCalculating] = useState(false); // Backend calculation loading
//     const [isFetchingRates, setIsFetchingRates] = useState(true); // Initial base rates loading
//     const [error, setError] = useState<string | null>(null); // General/validation errors shown to user
//     const [apiError, setApiError] = useState<string | null>(null); // Specific error from calculation API
//     const [lastEdited, setLastEdited] = useState<'send' | 'receive' | null>(null); // Track which input was last edited
//     const [isSendFocused, setIsSendFocused] = useState(false); // Track focus for send input styling
//     const [isReceiveFocused, setIsReceiveFocused] = useState(false); // Track focus for receive input styling

//     // --- Effect: Fetch Initial Data (Account, Recipient, Base Rates) ---
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true); setIsFetchingRates(true); setApiError(null); setError(null);
//             if (!recipientId || !balanceId || !token) { setError("Missing required information."); setIsLoading(false); setIsFetchingRates(false); return; }
//             try {
//                 const [accountRes, recipientRes, ratesRes] = await Promise.all([
//                     axios.get<AccountDetails>(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } }),
//                     axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } }),
//                     exchangeRateService.getExchangeRatesForCurrencies()
//                 ]);
//                 setSourceAccount(accountRes.data); setRecipient(recipientRes.data);
//                 if (ratesRes && ratesRes.rates) { setBaseRatesInfo(ratesRes.rates); }
//                 else { console.warn("Base rates data missing"); setInitialRateDisplay("Rate unavailable"); }
//             } catch (err: any) {
//                 console.error("Error fetching initial page data:", err); const message = err.response?.data?.message || "Failed to load details."; setError(message); setApiError(message);
//             } finally { setIsLoading(false); setIsFetchingRates(false); }
//         };
//         fetchData();
//     }, [balanceId, recipientId, token]);

//     // --- Effect: Calculate and Set Initial Rate Display String ---
//     useEffect(() => {
//         if (sourceAccount && recipient && baseRatesInfo && baseRatesInfo.rates) {
//             const sendCode = sourceAccount.currency.code; const receiveCode = recipient.currency.code; const rates = baseRatesInfo.rates; const baseCode = baseRatesInfo.base || 'USD';
//             try {
//                 const rateBaseToSend = sendCode === baseCode ? 1 : (rates[sendCode] ? parseFloat(rates[sendCode]) : NaN);
//                 const rateBaseToReceive = receiveCode === baseCode ? 1 : (rates[receiveCode] ? parseFloat(rates[receiveCode]) : NaN);
//                 if (!isNaN(rateBaseToSend) && !isNaN(rateBaseToReceive) && rateBaseToSend !== 0) {
//                     const directRate = rateBaseToReceive / rateBaseToSend; setInitialRateDisplay(`1 ${sendCode} = ${directRate.toFixed(4)} ${receiveCode}`);
//                 } else { console.warn(`Could not find rates for ${sendCode}/${receiveCode}`); setInitialRateDisplay("Rate unavailable"); }
//             } catch (e) { console.error("Error calculating initial rate:", e); setInitialRateDisplay("Rate error"); }
//         } else if (!isFetchingRates && (!sourceAccount || !recipient || !baseRatesInfo)) { setInitialRateDisplay("Rate unavailable"); }
//     }, [sourceAccount, recipient, baseRatesInfo, isFetchingRates]);

//     // --- Debounced Calculation Function (Calls Backend Summary Endpoint - NO FEES) ---
//     const debouncedCalculate = useMemo(
//         () =>
//             debounce(async (amount: number, isSending: boolean) => {
//                 setSummary(null); setApiError(null); if (error && error !== "Insufficient balance.") setError(null);
//                 if (!sourceAccount || !recipient || !token || isNaN(amount) || amount <= 0) { setIsCalculating(false); if(isSending) setReceiveAmount(''); else setSendAmount(''); return; }
//                 setIsCalculating(true);
//                 try {
//                     const response = await axios.post<SendSummary>('/transfers/calculate-summary', { sourceAccountId: sourceAccount._id, recipientId: recipient._id, amount: amount, isSendingAmount: isSending, }, { headers: { Authorization: `Bearer ${token}` } });
//                     setSummary(response.data); // Summary now has no fees/arrival
//                     if (isSending) { setReceiveAmount(response.data.receiveAmount.toFixed(2)); } else { setSendAmount(response.data.sendAmount.toFixed(2)); }
//                     setError(null); setApiError(null);
//                 } catch (err: any) {
//                     console.error("Error calculating send summary (AxiosError check):", err); const message = err.response?.data?.message || "Calculation failed."; const code = err.response?.data?.code; setApiError(`Calculation error: ${message}`); setError(code === 'INSUFFICIENT_BALANCE' ? "Insufficient balance." : message); setSummary(null); if (isSending) setReceiveAmount(''); else setSendAmount('');
//                 } finally { setIsCalculating(false); }
//             }, 500),
//         [sourceAccount, recipient, token, error]
//     );

//     // --- Input Handlers (Keep as is) ---
//     const handleAmountChange = (value: string, type: 'send' | 'receive') => {
//         if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
//             let currentAmount = '';
//             if (type === 'send') { setSendAmount(value); setLastEdited('send'); currentAmount = value; }
//             else { setReceiveAmount(value); setLastEdited('receive'); currentAmount = value; }
//             const amountNum = parseFloat(currentAmount);
//             if (!isNaN(amountNum) && amountNum > 0) { debouncedCalculate(amountNum, type === 'send'); }
//             else { debouncedCalculate.cancel(); setSummary(null); setIsCalculating(false); setApiError(null); if (error && error !== "Insufficient balance.") setError(null); if (type === 'send') setReceiveAmount(''); else setSendAmount(''); }
//         }
//     };
//     const handleFocus = (type: 'send' | 'receive') => { if (type === 'send') setIsSendFocused(true); else setIsReceiveFocused(true); };
//     const handleBlur = (type: 'send' | 'receive') => { if (type === 'send') setIsSendFocused(false); else setIsReceiveFocused(false); };

//      // --- Continue Logic (Keep as is - validation doesn't depend on fees) ---
//     const handleContinue = () => {
//          const isSendValid = sendAmount && parseFloat(sendAmount) > 0;
//          const isReceiveValid = receiveAmount && parseFloat(receiveAmount) > 0;
//          if (!isSendValid && !isReceiveValid) { setError("Please enter an amount."); return; }
//          if (isCalculating) { setError("Calculating..."); return; }
//          if (apiError) { setError(apiError); return; }
//          if (error === "Insufficient balance.") { return; }
//          if (!summary) { setError("Calculation details missing."); return; }
//          if (sourceAccount && summary.sendAmount > sourceAccount.balance) { setError("Insufficient balance."); setApiError("Insufficient balance."); return; }

//         // Store summary (which now has no fees/arrival)
//         localStorage.setItem('sendTransferSummary', JSON.stringify(summary));
//         const needsReason = recipient?.currency.code === 'INR';
//         const nextPath = needsReason ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}` : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//         router.push(nextPath);
//     };

//     // --- Derived State for UI Logic ---
//     const showInitialPrompt = !summary && !isCalculating && !sendAmount && !receiveAmount && !error && !apiError;
//     const showCalculationDetails = summary && !isCalculating && !apiError && !error;
//     const canContinue = !isCalculating && !!summary && !error && !apiError; // Button enabled state

//     // --- Render Logic ---
//     if (isLoading) { /* ... Skeleton ... */ return <div className="p-10">Loading...</div>; }
//     if (!sourceAccount || !recipient) { /* ... Error and Link back ... */ return <div className="p-10 text-red-500">Error loading details. <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`}>Go back</Link></div>; }

//     return (
//         <div className="SendAmount-Page pb-10">
//             <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//             <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                 {/* Back Link */}
//                 <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-gray-900">
//                     <IoIosArrowBack size={18}/> Back
//                 </Link>

//                 {/* Initial Rate Display */}
//                 <div className="text-right mb-4 h-8">
//                     {isFetchingRates ? (<Skeleton height={28} width={170} inline />) : (initialRateDisplay && ( <span className="text-xs sm:text-sm font-medium p-2 rounded-md bg-gray-100 border border-gray-200 cursor-pointer hover:bg-gray-200 inline-flex items-center gap-1"><FaLock size={10} className="text-gray-500"/> {initialRateDisplay} ›</span> ))}
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="space-y-4">
//                     {/* You Send Section */}
//                     <div data-testid="send-section">
//                          <label className={`block text-xs font-medium mb-1 ml-2 ${showCalculationDetails ? 'text-gray-700' : 'text-gray-500'}`}>
//                              {showCalculationDetails ? 'You send exactly' : 'You send'}
//                          </label>
//                         <div className="flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px]">
//                             <div className="flex items-center space-x-2 mr-3 pr-3 border-r flex-shrink-0">
//                                  <Image src={sourceAccount.currency.flagImage || `/assets/icon/${sourceAccount.currency.code.toLowerCase()}.svg`} alt={`${sourceAccount.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                 <span className="font-semibold text-base">{sourceAccount.currency.code}</span>
//                             </div>
//                              <input type="text" inputMode="decimal" value={sendAmount} onChange={(e) => handleAmountChange(e.target.value, 'send')} onFocus={() => handleFocus('send')} onBlur={() => handleBlur('send')}
//                                 className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out ${ isSendFocused ? 'text-4xl lg:text-5xl' : (sendAmount && parseFloat(sendAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } ${ lastEdited === 'receive' && summary ? 'text-gray-400' : 'text-black' }`}
//                                 placeholder="0" aria-label="Amount to send" data-testid="send-amount-input" />
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1 ml-2">Balance available: <span className="font-medium underline cursor-pointer hover:text-blue-700">{sourceAccount.balance.toFixed(2)} {sourceAccount.currency.code}</span></p>
//                         {/* Removed Conversion Info Line */}
//                     </div>

//                     {/* Recipient Gets Section */}
//                      <div data-testid="receive-section">
//                          <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">{recipient.nickname || recipient.accountHolderName} gets</label>
//                         <div className="flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px]">
//                             <div className="flex items-center space-x-2 mr-3 pr-3 border-r flex-shrink-0">
//                                 <Image src={recipient.currency.flagImage || `/assets/icon/${recipient.currency.code.toLowerCase()}.svg`} alt={`${recipient.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                 <span className="font-semibold text-base">{recipient.currency.code}</span>
//                              </div>
//                              <input type="text" inputMode="decimal" value={receiveAmount} onChange={(e) => handleAmountChange(e.target.value, 'receive')} onFocus={() => handleFocus('receive')} onBlur={() => handleBlur('receive')}
//                                 className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out ${ isReceiveFocused ? 'text-4xl lg:text-5xl' : (receiveAmount && parseFloat(receiveAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } ${ lastEdited === 'send' && summary ? 'text-gray-400' : 'text-black' }`}
//                                 placeholder="0" aria-label="Amount recipient gets" data-testid="receive-amount-input" />
//                         </div>
//                         {recipient.accountNumber && <p className="text-xs text-gray-500 mt-1 ml-2">Account ending in {recipient.accountNumber.slice(-4)}</p>}
//                     </div>

//                     {/* Paying With Section */}
//                     <div className="mt-6 mb-6">
//                          <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">Paying with</label>
//                          <div className="flex items-center p-3 border rounded-lg bg-gray-50 shadow-sm">
//                               <Image src={sourceAccount.currency.flagImage || `/assets/icon/${sourceAccount.currency.code.toLowerCase()}.svg`} alt={`${sourceAccount.currency.code} flag`} width={32} height={32} className="rounded-full mr-3" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                <div>
//                                    <p className="text-sm font-semibold text-gray-800">Wise {sourceAccount.currency.code} balance</p>
//                                    <p className="text-xs text-gray-600">{sourceAccount.balance.toFixed(2)} {sourceAccount.currency.code} available</p>
//                                </div>
//                          </div>
//                     </div>

//                     {/* --- REMOVED Details Section (Arrives/Fees) --- */}

//                     {/* Prompt */}
//                      {showInitialPrompt && (
//                          <div className="p-4 rounded-lg text-center text-sm bg-gray-100 text-gray-600 mt-6">
//                             <IoIosInformationCircleOutline className="inline mr-1 mb-0.5" /> Enter <span className="font-semibold">either amount</span> to continue
//                          </div>
//                     )}
//                     {/* REMOVED Speed Info */}

//                     {/* Error Display */}
//                      {error && (<p className="text-red-600 text-sm mt-4 text-center bg-red-50 p-2 rounded border border-red-200">{error}</p>)}

//                     {/* Continue Button */}
//                     <button onClick={handleContinue} disabled={!canContinue || isCalculating}
//                         className={`w-full font-semibold py-3 rounded-full mt-6 transition-all duration-300 ease-in-out ${ canContinue ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed' }`}
//                         data-testid="continue-button">
//                         {isCalculating ? 'Calculating...' : 'Continue'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }




// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import { IoIosArrowBack, IoIosInformationCircleOutline } from 'react-icons/io';
// import { FaLock, FaInfoCircle } from 'react-icons/fa';
// import { Loader2, AlertTriangle } from 'lucide-react';
// import { useAuth } from '../../../../../hooks/useAuth'; // Adjust path if needed
// import axios from 'axios';
// import apiConfig from '../../../../../config/apiConfig'; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton";
// import { debounce } from 'lodash';
// import Link from 'next/link';
// import DashboardHeader from '@/app/dashboard/components/layout/DashboardHeader'; // Adjust path if needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface SendAmountParams {
//     balanceId: string;
// }
// interface AccountDetails {
//     _id: string;
//     balance: number;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
// }
// interface RecipientDetails {
//     _id: string;
//     accountHolderName: string;
//     nickname?: string;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
//     accountNumber?: string;
// }
// interface SendSummary {
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrencyCode: string;
//     receiveCurrencyCode: string;
//     exchangeRate: number;
//     liveExchangeRate?: number | null;
//     rateAdjustmentApplied?: number;
//     availableBalance: number;
//     sourceAccountId?: string;
//     recipientId?: string;
//     userId?: string;
// }

// // --- Component Definition ---
// const steps = ['Recipient', 'Amount', 'Review', 'Pay'];

// export default function SendAmountPage() {
//     // --- Hooks ---
//     const router = useRouter();
//     const params = useParams<SendAmountParams>();
//     const searchParams = useSearchParams();
//     const { balanceId } = params;
//     const recipientId = searchParams.get('recipientId');
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [sourceAccount, setSourceAccount] = useState<AccountDetails | null>(null);
//     const [recipient, setRecipient] = useState<RecipientDetails | null>(null);
//     const [sendAmount, setSendAmount] = useState<string>('');
//     const [receiveAmount, setReceiveAmount] = useState<string>('');
//     const [summary, setSummary] = useState<SendSummary | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isCalculating, setIsCalculating] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [apiError, setApiError] = useState<string | null>(null);
//     const [lastEdited, setLastEdited] = useState<'send' | 'receive' | null>(null);
//     const [isSendFocused, setIsSendFocused] = useState(false);
//     const [isReceiveFocused, setIsReceiveFocused] = useState(false);
//     const [initialRatesFetched, setInitialRatesFetched] = useState(false);

//     // --- Effect: Fetch Initial Data and Rates ---
//     useEffect(() => {
//         const fetchInitialDataAndRates = async () => {
//             console.log("Fetching initial account, recipient data and rates...");
//             setIsLoading(true);
//             setInitialRatesFetched(false);
//             setApiError(null); setError(null); setSummary(null);

//             if (!recipientId || !balanceId || !token) {
//                 setError("Missing required information.");
//                 setIsLoading(false);
//                 return;
//             }

//             let fetchedAccount: AccountDetails | null = null;
//             let fetchedRecipient: RecipientDetails | null = null;

//             try {
//                 console.log("Fetching account and recipient details...");
//                 const [accountRes, recipientRes] = await Promise.all([
//                     axios.get<AccountDetails>(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } }),
//                     axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } })
//                 ]);
//                 fetchedAccount = accountRes.data;
//                 fetchedRecipient = recipientRes.data;
//                 setSourceAccount(fetchedAccount);
//                 setRecipient(fetchedRecipient);
//                 console.log("Account and recipient data loaded:", fetchedAccount, fetchedRecipient);

//                 if (fetchedAccount && fetchedRecipient) {
//                     console.log("Fetching initial rates using default amount (1)...");
//                     setIsCalculating(true);
//                     try {
//                         const initialRateResponse = await axios.post<SendSummary>(
//                             '/transfers/calculate-summary',
//                             {
//                                 sourceAccountId: fetchedAccount._id,
//                                 recipientId: fetchedRecipient._id,
//                                 amount: 1,
//                                 isSendingAmount: true,
//                             },
//                             { headers: { Authorization: `Bearer ${token}` } }
//                         );
//                         console.log("Initial rate calculation successful:", initialRateResponse.data);
//                         setSummary(initialRateResponse.data);
//                         setInitialRatesFetched(true);
//                         setApiError(null);
//                     } catch (rateErr: any) {
//                         console.error("Error fetching initial rates:", rateErr);
//                         const message = rateErr.response?.data?.message || "Failed to load initial exchange rates.";
//                         setApiError(message);
//                         setSummary(null);
//                     } finally {
//                          setIsCalculating(false);
//                     }
//                 }
//             } catch (err: any) {
//                 console.error("Error fetching initial account/recipient data:", err);
//                 const message = err.response?.data?.message || "Failed to load required details.";
//                 setError(message);
//                 setApiError(message);
//                 setSummary(null);
//             } finally {
//                 setIsLoading(false);
//                 console.log("Initial data and rate fetch process finished.");
//             }
//         };
//         fetchInitialDataAndRates();
//     }, [balanceId, recipientId, token]);

//     // --- Debounced Calculation Function ---
//     const debouncedCalculate = useMemo(
//         () =>
//             debounce(async (amount: number, isSending: boolean) => {
//                 console.log(`Debounced calculate triggered (user input): amount=${amount}, isSending=${isSending}`);
//                 setIsCalculating(true);
//                 setApiError(null);
//                 if (error && error !== "Insufficient balance.") setError(null);

//                 if (!sourceAccount || !recipient || !token || isNaN(amount) || amount <= 0) {
//                     console.log("Calculation skipped: Missing data or invalid amount.");
//                     setIsCalculating(false);
//                     if (isNaN(amount) || amount <= 0) {
//                          setSendAmount('');
//                          setReceiveAmount('');
//                          setSummary(prevSummary => {
//                              if (prevSummary && initialRatesFetched) {
//                                  return { ...prevSummary, sendAmount: 0, receiveAmount: 0 };
//                              }
//                              return null;
//                          });
//                          if (error && error !== "Insufficient balance.") setError(null);
//                          setApiError(null);
//                     }
//                     return;
//                 }

//                 console.log("Calling backend /transfers/calculate-summary for user input...");
//                 try {
//                     const response = await axios.post<SendSummary>(
//                         '/transfers/calculate-summary',
//                         {
//                             sourceAccountId: sourceAccount._id,
//                             recipientId: recipient._id,
//                             amount: amount,
//                             isSendingAmount: isSending,
//                         },
//                         { headers: { Authorization: `Bearer ${token}` } }
//                     );
//                     console.log("Backend calculation successful (user input):", response.data);
//                     setSummary(response.data);
//                     if (isSending) {
//                         setReceiveAmount(response.data.receiveAmount.toFixed(2));
//                     } else {
//                         setSendAmount(response.data.sendAmount.toFixed(2));
//                     }
//                     setError(null);
//                     setApiError(null);
//                 } catch (err: any) {
//                     console.error("Error calling /transfers/calculate-summary (user input):", err);
//                     const message = err.response?.data?.message || "Calculation failed.";
//                     const code = err.response?.data?.code;
//                     setApiError(message);
//                     setError(code === 'INSUFFICIENT_BALANCE' ? "Insufficient balance." : message);
//                     setSummary(prevSummary => {
//                          if (prevSummary) {
//                             return { ...prevSummary, sendAmount: 0, receiveAmount: 0 };
//                          }
//                         return null;
//                     });
//                     if (isSending) setReceiveAmount(''); else setSendAmount('');
//                 } finally {
//                     setIsCalculating(false);
//                     console.log("Calculation process finished (user input).");
//                 }
//             }, 500),
//         [sourceAccount, recipient, token, error, initialRatesFetched]
//     );

//     // --- Input Handlers ---
//     const handleAmountChange = (value: string, type: 'send' | 'receive') => {
//         if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
//             let currentAmount = '';
//             if (type === 'send') {
//                 setSendAmount(value); setLastEdited('send'); currentAmount = value;
//             } else {
//                 setReceiveAmount(value); setLastEdited('receive'); currentAmount = value;
//             }
//             const amountNum = parseFloat(currentAmount);

//             if (!isNaN(amountNum) && amountNum > 0) {
//                 debouncedCalculate(amountNum, type === 'send');
//             } else {
//                 debouncedCalculate.cancel();
//                 setIsCalculating(false);
//                 if (type === 'send') setReceiveAmount(''); else setSendAmount('');
//                 setSummary(prevSummary => {
//                     if (prevSummary && initialRatesFetched) {
//                         return { ...prevSummary, sendAmount: 0, receiveAmount: 0 };
//                     }
//                     return null;
//                 });
//                  if (error && error !== "Insufficient balance.") setError(null);
//                  setApiError(null);
//             }
//         }
//     };
//     const handleFocus = (type: 'send' | 'receive') => { if (type === 'send') setIsSendFocused(true); else setIsReceiveFocused(true); };
//     const handleBlur = (type: 'send' | 'receive') => { if (type === 'send') setIsSendFocused(false); else setIsReceiveFocused(false); };

//      // --- Continue Logic ---
//     const handleContinue = () => {
//          console.log("Continue button clicked.");
//          const isSendValid = sendAmount && parseFloat(sendAmount) > 0;
//          const isReceiveValid = receiveAmount && parseFloat(receiveAmount) > 0;

//          if (!isSendValid && !isReceiveValid) { setError("Please enter an amount."); return; }
//          if (isCalculating && (isSendValid || isReceiveValid)) { return; }

//          const isBlockingApiError = apiError && apiError !== "Insufficient balance." && apiError !== "Failed to load initial exchange rates.";
//          if (isBlockingApiError) {
//              setError(apiError);
//              return;
//          }
//          if (error === "Insufficient balance.") { return; }

//          if (!summary || !(summary.sendAmount > 0)) {
//             setError("Could not calculate transfer details. Please re-enter the amount.");
//             if(summary) {
//                 setSummary(prev => prev ? {...prev, sendAmount: 0, receiveAmount: 0} : null);
//                 setSendAmount('');
//                 setReceiveAmount('');
//             }
//             return;
//          }
//          if (summary.sendAmount > summary.availableBalance) {
//             setError("Insufficient balance.");
//             setApiError("Insufficient balance.");
//             return;
//          }

//         console.log("Validation passed, saving summary and navigating...");
//         localStorage.setItem('sendTransferSummary', JSON.stringify(summary));

//         const needsReason = recipient?.currency.code === 'INR';
//         const nextPath = needsReason
//            ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//            : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//         router.push(nextPath);
//     };

//     // --- Derived State for UI Logic ---
//     const showInitialPrompt = initialRatesFetched && !summary?.sendAmount && !summary?.receiveAmount && !isCalculating && !error && !apiError;
//     const showRates = summary && !(apiError && apiError !== "Failed to load initial exchange rates.");
//     const canContinue = summary && summary.sendAmount > 0 && !isCalculating && !error && !(apiError && apiError !== "Insufficient balance." && apiError !== "Failed to load initial exchange rates.");

//     // --- Format Rates for Display ---
//     const formatRate = (rate: number | null | undefined, precision = 6): string => {
//         if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//         return rate.toFixed(precision);
//     };
//     const formatComparisonRate = (rate: number | null | undefined, precision = 4): string => {
//          if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//          return rate.toFixed(precision);
//     };

//     // --- Prepare display strings ---
//     const adjustedRateDisplay = summary ? `1 ${summary.sendCurrencyCode} = ${formatRate(summary.exchangeRate)} ${summary.receiveCurrencyCode}` : null;
//     const liveRateDisplay = summary?.liveExchangeRate ? `1 ${summary.sendCurrencyCode} ≈ ${formatComparisonRate(summary.liveExchangeRate)} ${summary.receiveCurrencyCode}` : null;

//     // --- Render Logic ---

//     // Initial Loading State
//     if (isLoading) {
//         console.log("Rendering: Initial Loading Skeleton (Account, Recipient, Rates)");
//         return (
//             <div className="p-10 bg-gray-50 min-h-screen animate-pulse">
//                  <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                     <Skeleton className="h-6 w-20 mb-4" />
//                     <div className="text-right mb-4 min-h-[50px] space-y-1 flex flex-col items-end">
//                         <Skeleton className="h-5 w-40 mb-1.5 bg-gray-200" />
//                         <Skeleton className="h-5 w-48 bg-gray-200" />
//                     </div>
//                     <Skeleton className="h-20 w-full rounded-lg mb-4 bg-gray-200" />
//                     <Skeleton className="h-4 w-1/2 mb-6 bg-gray-200" />
//                     <Skeleton className="h-20 w-full rounded-lg mb-4 bg-gray-200" />
//                     <Skeleton className="h-4 w-1/2 mb-6 bg-gray-200" />
//                     <Skeleton className="h-16 w-full rounded-lg mb-6 bg-gray-200" />
//                     <Skeleton className="h-12 w-full rounded-full bg-gray-300" />
//                  </div>
//             </div>
//          );
//      }

//     // Error State if Account/Recipient Fetch Failed Critically
//     if (!sourceAccount || !recipient) {
//          console.log("Rendering: Error Loading Account/Recipient Details");
//          return (
//             <div className="bg-gray-50 min-h-screen">
//                  <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//                  <div className="p-10 text-center">
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-10" role="alert">
//                         <strong className="font-bold mr-1">Error!</strong>
//                         <span className="block sm:inline">{error || "Error loading account or recipient details."}</span>
//                     </div>
//                     <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
//                        <IoIosArrowBack size={18} className="mr-1"/> Go back
//                     </Link>
//                  </div>
//             </div>
//         );
//     }

//     // Main Render
//     console.log("Rendering: Main Send Amount Page Content", { summary, isCalculating, error, apiError, canContinue });
//     // Ensure the return statement is followed directly by the opening parenthesis for the JSX block
//     return (
//         <div className="SendAmount-Page pb-20 bg-gray-50 min-h-screen">
//             <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//             <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                 {/* Back Link */}
//                 <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-gray-900 transition-colors">
//                     <IoIosArrowBack size={18}/> Back
//                 </Link>

//                 {/* Rate Display Section */}
//                 <div className="text-right mb-4 min-h-[50px] space-y-1 flex flex-col items-end">
//                     {showRates && (
//                         <>
//                             {adjustedRateDisplay && (
//                                 <div className="text-xs sm:text-sm font-medium p-1.5 px-2.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 inline-flex items-center gap-1.5 cursor-default" title={`Rate includes adjustment of ${summary?.rateAdjustmentApplied?.toFixed(2) ?? 0}%. This is the rate applied to your transfer.`}>
//                                     <FaLock size={10} /> Rate Used: {adjustedRateDisplay}
//                                 </div>
//                             )}
//                             {liveRateDisplay && (
//                                 <div className="text-xs font-normal p-1.5 px-2.5 rounded-md bg-gray-100 border border-gray-200 text-gray-600 inline-flex items-center gap-1.5 cursor-help" title="Current market rate for comparison only.">
//                                     <FaInfoCircle size={10} /> Market Rate: {liveRateDisplay}
//                                 </div>
//                             )}
//                         </>
//                     )}
//                     {apiError && apiError === "Failed to load initial exchange rates." && !summary && (
//                         <div className="text-xs p-1.5 px-2.5 rounded-md bg-red-50 border border-red-200 text-red-700 inline-flex items-center gap-1.5">
//                             <AlertTriangle size={12} /> Error loading rates.
//                         </div>
//                     )}
//                     {!showRates && !(apiError && apiError === "Failed to load initial exchange rates." && !summary) && (
//                         <div className="h-[50px]"></div>
//                     )}
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="space-y-4">
//                     {/* You Send Section */}
//                      <div data-testid="send-section">
//                           <label className={`block text-xs font-medium mb-1 ml-2 ${summary && !isCalculating ? 'text-gray-700' : 'text-gray-500'}`}>
//                               {(summary?.sendAmount > 0 && !isCalculating) ? 'You send exactly' : 'You send'}
//                           </label>
//                          <div className={`flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px] transition-shadow ${isSendFocused ? 'ring-2 ring-primary shadow-md' : 'border-gray-300'}`}>
//                             <div className="flex items-center space-x-2 mr-3 pr-3 border-r border-gray-200 flex-shrink-0">
//                                   <Image src={sourceAccount.currency.flagImage || '/assets/icon/generic.svg'} alt={`${sourceAccount.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                  <span className="font-semibold text-base text-gray-800">{sourceAccount.currency.code}</span>
//                              </div>
//                               <input type="text" inputMode="decimal" value={sendAmount} onChange={(e) => handleAmountChange(e.target.value, 'send')} onFocus={() => handleFocus('send')} onBlur={() => handleBlur('send')}
//                                  className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out ${ isSendFocused ? 'text-4xl lg:text-5xl text-primary' : (sendAmount && parseFloat(sendAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } ${ lastEdited === 'receive' && summary?.receiveAmount > 0 ? 'text-gray-500 font-medium' : 'text-black' }`}
//                                  placeholder="0" aria-label="Amount to send" data-testid="send-amount-input" />
//                          </div>
//                          <p className="text-xs text-gray-500 mt-1 ml-2">Available balance: <span className="font-medium">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code}</span></p>
//                      </div>

//                     {/* Recipient Gets Section */}
//                       <div data-testid="receive-section">
//                           <label className={`block text-xs font-medium mb-1 ml-2 ${summary && !isCalculating ? 'text-gray-700' : 'text-gray-500'}`}>
//                               {recipient.nickname || recipient.accountHolderName} {(summary?.receiveAmount > 0 && !isCalculating) ? 'gets exactly' : 'gets approx.'}
//                           </label>
//                          <div className={`flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px] transition-shadow ${isReceiveFocused ? 'ring-2 ring-primary shadow-md' : 'border-gray-300'}`}>
//                              <div className="flex items-center space-x-2 mr-3 pr-3 border-r border-gray-200 flex-shrink-0">
//                                  <Image src={recipient.currency.flagImage || '/assets/icon/generic.svg'} alt={`${recipient.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                  <span className="font-semibold text-base text-gray-800">{recipient.currency.code}</span>
//                               </div>
//                               <input type="text" inputMode="decimal" value={receiveAmount} onChange={(e) => handleAmountChange(e.target.value, 'receive')} onFocus={() => handleFocus('receive')} onBlur={() => handleBlur('receive')}
//                                  className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out ${ isReceiveFocused ? 'text-4xl lg:text-5xl text-primary' : (receiveAmount && parseFloat(receiveAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } ${ lastEdited === 'send' && summary?.sendAmount > 0 ? 'text-gray-500 font-medium' : 'text-black' }`}
//                                  placeholder="0" aria-label="Amount recipient gets" data-testid="receive-amount-input" />
//                          </div>
//                          {recipient.accountNumber && <p className="text-xs text-gray-500 mt-1 ml-2">Account ending in {recipient.accountNumber.slice(-4)}</p>}
//                      </div>

//                     {/* Paying With Section */}
//                     <div className="mt-6 mb-6">
//                          <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">Paying with</label>
//                          <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
//                               <Image src={sourceAccount.currency.flagImage || '/assets/icon/generic.svg'} alt={`${sourceAccount.currency.code} flag`} width={32} height={32} className="rounded-full mr-3" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                <div>
//                                    <p className="text-sm font-semibold text-gray-800">Your {sourceAccount.currency.code} balance</p>
//                                    <p className="text-xs text-gray-600">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code} available</p>
//                                </div>
//                          </div>
//                     </div>

//                     {/* Initial Prompt */}
//                      {showInitialPrompt && (
//                          <div className="p-3 rounded-lg text-center text-sm bg-blue-50 text-blue-700 border border-blue-200 mt-6 flex items-center justify-center gap-2">
//                             <IoIosInformationCircleOutline className="inline mb-0.5 flex-shrink-0" size={18}/> Enter <span className="font-semibold">either amount</span> to calculate your transfer.
//                          </div>
//                     )}

//                     {/* Error Display */}
//                      {error && (
//                          <p className={`text-sm mt-4 text-center p-2.5 rounded-md border ${ error === "Insufficient balance." ? "text-orange-800 bg-orange-50 border-orange-300" : "text-red-800 bg-red-50 border-red-300" } flex items-center justify-center gap-2`} data-testid="error-message">
//                              <AlertTriangle size={16} className={`${ error === "Insufficient balance." ? "text-orange-500" : "text-red-500" }`}/>
//                              {error}
//                          </p>
//                      )}
//                      {apiError && apiError !== "Insufficient balance." && apiError !== "Failed to load initial exchange rates." && !error && (
//                         <p className="text-red-800 text-sm mt-4 text-center bg-red-50 p-2.5 rounded-md border border-red-300 flex items-center justify-center gap-2" data-testid="api-error-message">
//                             <AlertTriangle size={16} className="text-red-500"/>
//                             {apiError}
//                         </p>
//                     )}

//                     {/* Continue Button */}
//                     <button
//                         onClick={handleContinue}
//                         disabled={!canContinue}
//                         className={`w-full font-semibold py-3 rounded-full mt-6 transition-all duration-300 ease-in-out text-lg ${ canContinue ? 'bg-primary text-secondary hover:bg-primary-hover shadow-md hover:shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}
//                         data-testid="continue-button"
//                     >
//                         {isCalculating && (sendAmount || receiveAmount) ? (
//                              <div className="flex items-center justify-center">
//                                  <Loader2 size={20} className="animate-spin mr-2" /> Calculating...
//                              </div>
//                         ) : 'Continue'}
//                     </button>
//                 </div> {/* Close main content area div */}
//             </div> {/* Close container div */}
//         </div> // Close main page div
//     ); // Close return parentheses
// } // Close component function


// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'; // Added useRef
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoIosArrowBack, IoIosInformationCircleOutline } from 'react-icons/io';
// import { FaLock, FaInfoCircle } from 'react-icons/fa';
// import { Loader2, AlertTriangle } from 'lucide-react';
// import { useAuth } from '../../../../../hooks/useAuth'; // Adjust path
// import axios from 'axios';
// import apiConfig from '../../../../../config/apiConfig'; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";
// import { debounce } from 'lodash';
// import DashboardHeader from '@/app/dashboard/components/layout/DashboardHeader'; // Adjust path

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces (keep as is) ---
// interface SendAmountParams {
//     balanceId: string;
// }
// interface AccountDetails {
//     _id: string;
//     balance: number;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
// }
// interface RecipientDetails {
//     _id: string;
//     accountHolderName: string;
//     nickname?: string;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
//     accountNumber?: string;
// }
// interface SendSummary {
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrencyCode: string;
//     receiveCurrencyCode: string;
//     exchangeRate: number;
//     liveExchangeRate?: number | null;
//     rateAdjustmentApplied?: number;
//     availableBalance: number;
//     sourceAccountId?: string;
//     recipientId?: string;
//     userId?: string;
// }

// // --- Component Definition ---
// const steps = ['Recipient', 'Amount', 'Review', 'Pay'];

// export default function SendAmountPage() {
//     // --- Hooks ---
//     const router = useRouter();
//     const params = useParams<SendAmountParams>();
//     const searchParams = useSearchParams();
//     const { balanceId } = params;
//     const recipientId = searchParams.get('recipientId');
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [sourceAccount, setSourceAccount] = useState<AccountDetails | null>(null);
//     const [recipient, setRecipient] = useState<RecipientDetails | null>(null);
//     const [sendAmount, setSendAmount] = useState<string>('');
//     const [receiveAmount, setReceiveAmount] = useState<string>('');
//     const [summary, setSummary] = useState<SendSummary | null>(null); // Stores the *latest successfully calculated* summary
//     const [initialRateSummary, setInitialRateSummary] = useState<SendSummary | null>(null); // Stores the initial rate context
//     const [isLoading, setIsLoading] = useState(true); // For initial page load
//     const [isCalculating, setIsCalculating] = useState(false); // For API debounce calculation
//     const [error, setError] = useState<string | null>(null); // User-facing validation/state errors (e.g., insufficient balance)
//     const [apiError, setApiError] = useState<string | null>(null); // Errors from API calls (e.g., network, calculation failed)
//     const [lastEdited, setLastEdited] = useState<'send' | 'receive' | null>(null);
//     const [isSendFocused, setIsSendFocused] = useState(false);
//     const [isReceiveFocused, setIsReceiveFocused] = useState(false);

//     // --- Refs ---
//     // Use refs to access latest state within debounced function without needing them as dependencies
//     const sourceAccountRef = useRef(sourceAccount);
//     const recipientRef = useRef(recipient);
//     const tokenRef = useRef(token);
//     const initialRateSummaryRef = useRef(initialRateSummary);
//     const errorRef = useRef(error);

//     useEffect(() => { sourceAccountRef.current = sourceAccount; }, [sourceAccount]);
//     useEffect(() => { recipientRef.current = recipient; }, [recipient]);
//     useEffect(() => { tokenRef.current = token; }, [token]);
//     useEffect(() => { initialRateSummaryRef.current = initialRateSummary; }, [initialRateSummary]);
//     useEffect(() => { errorRef.current = error; }, [error]);


//     // --- Effect: Fetch Initial Data and Rates ---
//     useEffect(() => {
//         const fetchInitialDataAndRates = async () => {
//             console.log("Fetching initial account, recipient data and rates...");
//             setIsLoading(true);
//             setInitialRateSummary(null); // Reset initial rates
//             setApiError(null); setError(null); setSummary(null); // Reset all states

//             if (!recipientId || !balanceId || !token) {
//                 setError("Missing required information to load page."); // More specific error
//                 setIsLoading(false);
//                 return;
//             }

//             let fetchedAccount: AccountDetails | null = null;
//             let fetchedRecipient: RecipientDetails | null = null;

//             try {
//                 console.log("Fetching account and recipient details...");
//                 // Fetch in parallel
//                 const [accountRes, recipientRes] = await Promise.all([
//                     axios.get<AccountDetails>(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } }),
//                     axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } })
//                 ]);
//                 fetchedAccount = accountRes.data;
//                 fetchedRecipient = recipientRes.data;
//                 setSourceAccount(fetchedAccount);
//                 setRecipient(fetchedRecipient);
//                 console.log("Account and recipient data loaded.");

//                 if (fetchedAccount && fetchedRecipient) {
//                     console.log("Fetching initial rates using default amount (1)...");
//                     // Use a temporary calculating state distinct from user-triggered calculation
//                     setIsCalculating(true); // Indicate rate fetch is happening
//                     try {
//                         const initialRateResponse = await axios.post<SendSummary>(
//                             '/transfers/calculate-summary',
//                             {
//                                 sourceAccountId: fetchedAccount._id,
//                                 recipientId: fetchedRecipient._id,
//                                 amount: 1, // Use a base amount for rate display
//                                 isSendingAmount: true,
//                             },
//                             { headers: { Authorization: `Bearer ${token}` } }
//                         );
//                         console.log("Initial rate calculation successful:", initialRateResponse.data);
//                         // Store this separately, it provides context but isn't the active transfer summary yet
//                         setInitialRateSummary(initialRateResponse.data);
//                         setApiError(null); // Clear any previous API errors
//                     } catch (rateErr: any) {
//                         console.error("Error fetching initial rates:", rateErr);
//                         const message = rateErr.response?.data?.message || "Failed to load initial exchange rates.";
//                         setApiError(message); // Set API error specifically for rate loading issue
//                         setInitialRateSummary(null);
//                     } finally {
//                         setIsCalculating(false); // Initial rate fetch finished
//                     }
//                 }
//             } catch (err: any) {
//                 console.error("Error fetching initial account/recipient data:", err);
//                 const message = err.response?.data?.message || "Failed to load required account or recipient details.";
//                 setError(message); // Set user-facing error for critical load failure
//                 setApiError(message); // Also set API error
//                 setSourceAccount(null); // Ensure state is cleared on critical failure
//                 setRecipient(null);
//             } finally {
//                 setIsLoading(false); // Initial data load process finished
//                 console.log("Initial data and rate fetch process finished.");
//             }
//         };

//         fetchInitialDataAndRates();
//         // Dependency array: only re-run if these IDs or the token change
//     }, [balanceId, recipientId, token]);

//     // --- Debounced Calculation Function ---
//     const debouncedCalculate = useMemo(
//         () =>
//             debounce(async (amount: number, isSending: boolean) => {
//                 // Access latest state via refs inside the debounced function
//                 const currentSourceAccount = sourceAccountRef.current;
//                 const currentRecipient = recipientRef.current;
//                 const currentToken = tokenRef.current;
//                 const currentInitialRates = initialRateSummaryRef.current;
//                 const currentError = errorRef.current; // Use ref to check current error state

//                 console.log(`Debounced calculate triggered: amount=${amount}, isSending=${isSending}`);
//                 setIsCalculating(true);
//                 setApiError(null); // Clear previous API calculation errors
//                 // Only clear non-balance related user errors when starting a new calculation
//                 if (currentError && currentError !== "Insufficient balance.") {
//                      setError(null);
//                 }


//                 if (!currentSourceAccount || !currentRecipient || !currentToken || isNaN(amount) || amount <= 0) {
//                     console.log("Calculation skipped: Missing data or invalid amount.");
//                     setIsCalculating(false);
//                     // Clear amounts and summary if input becomes invalid/zero
//                     setSendAmount('');
//                     setReceiveAmount('');
//                     // Reset summary, but potentially keep rate context from initial load if available
//                     setSummary(currentInitialRates ? { ...currentInitialRates, sendAmount: 0, receiveAmount: 0 } : null);
//                      // Don't clear insufficient balance error here, let new calc potentially override
//                     if (currentError && currentError !== "Insufficient balance.") setError(null);
//                     setApiError(null);
//                     return;
//                 }

//                 console.log("Calling backend /transfers/calculate-summary...");
//                 try {
//                     const response = await axios.post<SendSummary>(
//                         '/transfers/calculate-summary',
//                         {
//                             sourceAccountId: currentSourceAccount._id,
//                             recipientId: currentRecipient._id,
//                             amount: amount,
//                             isSendingAmount: isSending,
//                         },
//                         { headers: { Authorization: `Bearer ${currentToken}` } }
//                     );
//                     console.log("Backend calculation successful:", response.data);
//                     setSummary(response.data); // Update the main summary state
//                     // Update the *other* input field based on calculation result
//                     if (isSending) {
//                         setReceiveAmount(response.data.receiveAmount.toFixed(2));
//                     } else {
//                         setSendAmount(response.data.sendAmount.toFixed(2));
//                     }
//                     // Clear errors on successful calculation
//                     setError(null);
//                     setApiError(null);

//                     // Post-calculation balance check
//                     if (response.data.sendAmount > currentSourceAccount.balance) {
//                         setError("Insufficient balance.");
//                         // Keep the calculated summary but flag the error
//                     }

//                 } catch (err: any) {
//                     console.error("Error calling /transfers/calculate-summary:", err);
//                     const message = err.response?.data?.message || "Calculation failed.";
//                     const code = err.response?.data?.code;
//                     setApiError(message); // Set API error
//                     // Set user-facing error based on code or message
//                     setError(code === 'INSUFFICIENT_BALANCE' ? "Insufficient balance." : message);
//                      // Reset amounts and summary on calculation failure
//                     // Keep the input that the user was typing? Maybe not, API failed.
//                     setSendAmount(isSending ? amount.toFixed(2) : ''); // Keep typed amount if sending, clear if receiving resulted in error
//                     setReceiveAmount(isSending ? '' : amount.toFixed(2)); // Keep typed amount if receiving, clear if sending resulted in error
//                     setSummary(currentInitialRates ? { ...currentInitialRates, sendAmount: 0, receiveAmount: 0 } : null); // Reset summary but keep rate context
//                 } finally {
//                     setIsCalculating(false);
//                     console.log("Calculation process finished.");
//                 }
//             }, 500), // 500ms debounce delay
//         [] // No dependencies: the function reads latest state via refs
//     );

//     // --- Input Handlers ---
//     // Use useCallback to memoize handlers, preventing recreation on re-renders unless dependencies change.
//     const handleAmountChange = useCallback((value: string, type: 'send' | 'receive') => {
//         // Allow empty input, numbers, and max 2 decimal places
//         if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
//             setLastEdited(type); // Track which field was last edited

//             if (type === 'send') {
//                 setSendAmount(value);
//                 // If send amount is cleared, clear receive amount too
//                 if (value === '') setReceiveAmount('');
//             } else {
//                 setReceiveAmount(value);
//                 // If receive amount is cleared, clear send amount too
//                  if (value === '') setSendAmount('');
//             }

//             const amountNum = parseFloat(value);

//             if (!isNaN(amountNum) && amountNum > 0) {
//                  // Clear immediate validation errors (like "enter amount") before debouncing
//                  setError(prev => (prev === "Please enter an amount." ? null : prev));
//                 debouncedCalculate(amountNum, type === 'send');
//             } else {
//                 // Cancel any pending calculation if input becomes invalid or zero
//                 debouncedCalculate.cancel();
//                 setIsCalculating(false); // Ensure calculating state is off

//                 // Clear the *other* field if the current one is cleared/invalidated
//                 if (type === 'send') setReceiveAmount('');
//                 else setSendAmount('');

//                 // Reset summary data, keeping initial rate context if available
//                 setSummary(prev => initialRateSummaryRef.current ? { ...initialRateSummaryRef.current, sendAmount: 0, receiveAmount: 0 } : null);

//                 // Don't clear "Insufficient balance" error just because input is cleared
//                 setError(prev => (prev && prev !== "Insufficient balance." ? null : prev));
//                 setApiError(null); // Clear API errors if input is cleared
//             }
//         }
//     }, [debouncedCalculate]); // Recreate if debouncedCalculate instance changes (shouldn't with empty deps)

//     const handleFocus = useCallback((type: 'send' | 'receive') => {
//         if (type === 'send') setIsSendFocused(true);
//         else setIsReceiveFocused(true);
//     }, []); // No dependencies needed

//     const handleBlur = useCallback((type: 'send' | 'receive') => {
//         if (type === 'send') setIsSendFocused(false);
//         else setIsReceiveFocused(false);
//     }, []); // No dependencies needed

//     // --- Continue Logic ---
//     const handleContinue = useCallback(() => {
//         console.log("Continue button clicked.");

//         // Re-check conditions here for robustness
//         const currentSendAmount = parseFloat(sendAmount);
//         const currentReceiveAmount = parseFloat(receiveAmount);
//         const isValidAmountEntered = (currentSendAmount > 0 || currentReceiveAmount > 0);

//         if (!isValidAmountEntered) {
//             setError("Please enter an amount.");
//             return;
//         }

//         // Don't proceed if actively calculating, even if amounts look valid momentarily
//         if (isCalculating) {
//              console.log("Continue blocked: Calculation in progress.");
//              return;
//         }

//         // Don't proceed if there's a blocking API error (not related to rates or balance)
//         const isBlockingApiError = apiError && apiError !== "Failed to load initial exchange rates." && apiError !== "Insufficient balance.";
//         if (isBlockingApiError) {
//             setError(apiError); // Ensure user sees the blocking API error
//             console.log("Continue blocked: Blocking API error exists.");
//             return;
//         }

//         // Don't proceed on insufficient balance error
//         if (error === "Insufficient balance.") {
//             console.log("Continue blocked: Insufficient balance error exists.");
//             return;
//         }

//         // Ensure we have a valid, calculated summary with positive amounts
//         if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
//             setError("Could not calculate transfer details. Please re-enter the amount or wait for calculation.");
//             console.log("Continue blocked: Invalid or missing summary.", summary);
//             // Optionally clear amounts if summary is bad
//              // setSendAmount('');
//              // setReceiveAmount('');
//             return;
//         }

//         // Final balance check using the *latest* source account balance and calculated send amount
//         if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
//             setError("Insufficient balance.");
//             console.log("Continue blocked: Insufficient balance detected on final check.");
//             return;
//         }

//         console.log("Validation passed, saving summary and navigating...");
//         localStorage.setItem('sendTransferSummary', JSON.stringify(summary));

//         const needsReason = recipient?.currency.code === 'INR'; // Check recipient from state
//         const nextPath = needsReason
//             ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//             : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//         router.push(nextPath);

//     }, [sendAmount, receiveAmount, isCalculating, apiError, error, summary, sourceAccount, recipient, balanceId, recipientId, router]); // Dependencies for handleContinue

//     // --- Derived State for UI Logic (Keep simple, useMemo likely overkill) ---
//     // Show rate info if we have *either* initial rates *or* a calculated summary, and no critical rate fetch error
//     const rateContext = summary ?? initialRateSummary;
//     const showRates = !!rateContext && !(apiError && apiError === "Failed to load initial exchange rates." && !rateContext);
//     // Show prompt only if initial rates are fetched, no amounts entered, not calculating, and no errors
//     const showInitialPrompt = !!initialRateSummary && !sendAmount && !receiveAmount && !isCalculating && !error && !apiError;
//     // Enable continue if we have a valid summary, positive amounts, not calculating, and no blocking errors
//     const canContinue = !!summary && summary.sendAmount > 0 && summary.receiveAmount > 0 && !isCalculating && error !== "Insufficient balance." && !apiError; // Simplified: only balance error blocks directly here, others checked in handler


//     // --- Format Rates for Display (Memoize if formatting becomes complex) ---
//     const formatRate = useCallback((rate: number | null | undefined, precision = 6): string => {
//         if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//         return rate.toFixed(precision);
//     }, []);
//     const formatComparisonRate = useCallback((rate: number | null | undefined, precision = 4): string => {
//          if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//          return rate.toFixed(precision);
//     }, []);

//     // --- Prepare display strings ---
//     const adjustedRateDisplay = rateContext ? `1 ${rateContext.sendCurrencyCode} = ${formatRate(rateContext.exchangeRate)} ${rateContext.receiveCurrencyCode}` : null;
//     const liveRateDisplay = rateContext?.liveExchangeRate ? `1 ${rateContext.sendCurrencyCode} ≈ ${formatComparisonRate(rateContext.liveExchangeRate)} ${rateContext.receiveCurrencyCode}` : null;
//     const rateAdjustmentDisplay = rateContext?.rateAdjustmentApplied?.toFixed(2) ?? '0';

//     // --- Render Logic ---

//     // Initial Loading State (Skeleton)
//     if (isLoading) {
//         console.log("Rendering: Initial Loading Skeleton");
//         // Skeleton structure remains the same - this is good practice
//         return (
//              <div className="p-10 bg-gray-50 min-h-screen animate-pulse">
//                   <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                      <Skeleton className="h-6 w-20 mb-4" />
//                      <div className="text-right mb-4 min-h-[50px] space-y-1 flex flex-col items-end">
//                          <Skeleton className="h-5 w-40 mb-1.5 bg-gray-200" />
//                          <Skeleton className="h-5 w-48 bg-gray-200" />
//                      </div>
//                      <Skeleton className="h-20 w-full rounded-lg mb-4 bg-gray-200" />
//                      <Skeleton className="h-4 w-1/2 mb-6 bg-gray-200" />
//                      <Skeleton className="h-20 w-full rounded-lg mb-4 bg-gray-200" />
//                      <Skeleton className="h-4 w-1/2 mb-6 bg-gray-200" />
//                      <Skeleton className="h-16 w-full rounded-lg mb-6 bg-gray-200" />
//                      <Skeleton className="h-12 w-full rounded-full bg-gray-300" />
//                   </div>
//              </div>
//           );
//     }

//     // Critical Error State (Account/Recipient Fetch Failed)
//     if (!sourceAccount || !recipient) {
//          console.log("Rendering: Critical Error Loading Account/Recipient");
//          // Error display structure remains the same
//          return (
//             <div className="bg-gray-50 min-h-screen">
//                  <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//                  <div className="p-10 text-center">
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-10" role="alert">
//                         <strong className="font-bold mr-1">Error!</strong>
//                         <span className="block sm:inline">{error || "Error loading essential page details."}</span>
//                     </div>
//                     {/* Ensure balanceId exists for the back link, or provide a fallback */}
//                     <Link href={balanceId ? `/dashboard/balances/${balanceId}/send/select-recipient` : '/dashboard'} className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
//                        <IoIosArrowBack size={18} className="mr-1"/> Go back
//                     </Link>
//                  </div>
//             </div>
//         );
//     }

//     // --- Main Render ---
//     console.log("Rendering: Main Send Amount Page Content", { summary, initialRateSummary, isCalculating, error, apiError, canContinue });
//     return (
//         <div className="SendAmount-Page pb-20 min-h-screen">
//             <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//             <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                 {/* Back Link */}
//                 <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-gray-900 transition-colors">
//                     <IoIosArrowBack size={18}/> Back
//                 </Link>

//                 {/* Rate Display Section */}
//                 <div className="text-right mb-4 min-h-[50px] space-y-1 flex flex-col items-end">
//                     {/* Show rates if context exists and no critical load error */}
//                     {showRates && rateContext && (
//                         <>
//                             {adjustedRateDisplay && (
//                                 <div className="text-xs sm:text-sm font-medium p-1.5 px-2.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 inline-flex items-center gap-1.5 cursor-default" title={`Rate includes adjustment of ${rateAdjustmentDisplay}%. This is the rate applied to your transfer.`}>
//                                     <FaLock size={10} /> Our Rate: {adjustedRateDisplay}
//                                 </div>
//                             )}
//                             {liveRateDisplay && (
//                                 <div className="text-xs font-normal p-1.5 px-2.5 rounded-md bg-gray-100 border border-gray-200 text-gray-600 inline-flex items-center gap-1.5 cursor-help" title="Current market rate for comparison only.">
//                                     <FaInfoCircle size={10} /> Market Rate: {liveRateDisplay}
//                                 </div>
//                             )}
//                         </>
//                     )}
//                     {/* Specific message for initial rate load failure */}
//                     {apiError && apiError === "Failed to load initial exchange rates." && !rateContext && (
//                         <div className="text-xs p-1.5 px-2.5 rounded-md bg-red-50 border border-red-200 text-red-700 inline-flex items-center gap-1.5">
//                             <AlertTriangle size={12} /> Error loading rates.
//                         </div>
//                     )}
//                      {/* Placeholder for spacing if no rates are shown */}
//                     {!showRates && !(apiError === "Failed to load initial exchange rates.") && (
//                          <div className="h-[50px]"></div>
//                      )}
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="space-y-4">
//                     {/* You Send Section */}
//                      <div data-testid="send-section">
//                           {/* Label indicates exactness only when calculation is done and successful */}
//                           <label className={`block text-xs font-medium mb-1 ml-2 ${summary?.sendAmount > 0 && !isCalculating ? 'text-gray-700' : 'text-gray-500'}`}>
//                               {summary?.sendAmount > 0 && !isCalculating ? 'You send exactly' : 'You send'}
//                           </label>
//                          <div className={`flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px] transition-shadow ${isSendFocused ? 'ring-2 ring-primary shadow-md' : 'border-gray-300'} ${error === 'Insufficient balance.' ? 'border-orange-300 ring-orange-300' : ''}`}> {/* Highlight on balance error */}
//                             <div className="flex items-center space-x-2 mr-3 pr-3 border-r border-gray-200 flex-shrink-0">
//                                   <Image src={sourceAccount.currency.flagImage || '/assets/icon/generic.svg'} alt={`${sourceAccount.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                  <span className="font-semibold text-base text-gray-800">{sourceAccount.currency.code}</span>
//                              </div>
//                               {/* Input styling adjusted for focus, value presence, and last edited state */}
//                               <input type="text" inputMode="decimal" value={sendAmount} onChange={(e) => handleAmountChange(e.target.value, 'send')} onFocus={() => handleFocus('send')} onBlur={() => handleBlur('send')}
//                                  className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out 
//                                     ${ isSendFocused ? 'text-4xl lg:text-5xl text-primary' : (sendAmount && parseFloat(sendAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } 
//                                     ${ lastEdited === 'receive' && receiveAmount && parseFloat(receiveAmount) > 0 ? 'text-gray-500 font-medium' : 'text-black' }`} // Dim if the other field was last edited
//                                  placeholder="0" aria-label="Amount to send" data-testid="send-amount-input" />
//                          </div>
//                          {/* Available Balance */}
//                          <p className="text-xs text-gray-500 mt-1 ml-2">Available balance: <span className="font-medium">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code}</span></p>
//                      </div>

//                     {/* Recipient Gets Section */}
//                       <div data-testid="receive-section">
//                            {/* Label indicates exactness only when calculation is done and successful */}
//                           <label className={`block text-xs font-medium mb-1 ml-2 ${summary?.receiveAmount > 0 && !isCalculating ? 'text-gray-700' : 'text-gray-500'}`}>
//                               {recipient.nickname || recipient.accountHolderName} {summary?.receiveAmount > 0 && !isCalculating ? 'gets exactly' : 'gets approx.'}
//                           </label>
//                          <div className={`flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px] transition-shadow ${isReceiveFocused ? 'ring-2 ring-primary shadow-md' : 'border-gray-300'}`}>
//                              <div className="flex items-center space-x-2 mr-3 pr-3 border-r border-gray-200 flex-shrink-0">
//                                  <Image src={recipient.currency.flagImage || '/assets/icon/generic.svg'} alt={`${recipient.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                  <span className="font-semibold text-base text-gray-800">{recipient.currency.code}</span>
//                               </div>
//                                {/* Input styling adjusted */}
//                               <input type="text" inputMode="decimal" value={receiveAmount} onChange={(e) => handleAmountChange(e.target.value, 'receive')} onFocus={() => handleFocus('receive')} onBlur={() => handleBlur('receive')}
//                                  className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out 
//                                      ${ isReceiveFocused ? 'text-4xl lg:text-5xl text-primary' : (receiveAmount && parseFloat(receiveAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } 
//                                      ${ lastEdited === 'send' && sendAmount && parseFloat(sendAmount) > 0 ? 'text-gray-500 font-medium' : 'text-black' }`} // Dim if the other field was last edited
//                                  placeholder="0" aria-label="Amount recipient gets" data-testid="receive-amount-input" />
//                          </div>
//                          {/* Recipient Account Info */}
//                          {recipient.accountNumber && <p className="text-xs text-gray-500 mt-1 ml-2">Account ending in {recipient.accountNumber.slice(-4)}</p>}
//                      </div>

//                     {/* Paying With Section */}
//                     <div className="mt-6 mb-6">
//                          <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">Paying with</label>
//                          <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
//                               <Image src={sourceAccount.currency.flagImage || '/assets/icon/generic.svg'} alt={`${sourceAccount.currency.code} flag`} width={32} height={32} className="rounded-full mr-3" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                <div>
//                                    <p className="text-sm font-semibold text-gray-800">Your {sourceAccount.currency.code} balance</p>
//                                    <p className="text-xs text-gray-600">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code} available</p>
//                                </div>
//                          </div>
//                     </div>

//                     {/* Initial Prompt */}
//                      {showInitialPrompt && (
//                          <div className="p-3 rounded-lg text-center text-sm bg-blue-50 text-blue-700 border border-blue-200 mt-6 flex items-center justify-center gap-2">
//                             <IoIosInformationCircleOutline className="inline mb-0.5 flex-shrink-0" size={18}/> Enter <span className="font-semibold">either amount</span> to calculate your transfer.
//                          </div>
//                     )}

//                     {/* Error Display Section */}
//                     {/* User-facing errors (validation, balance) */}
//                     {error && (
//                          <p className={`text-sm mt-4 text-center p-2.5 rounded-md border ${ error === "Insufficient balance." ? "text-orange-800 bg-orange-50 border-orange-300" : "text-red-800 bg-red-50 border-red-300" } flex items-center justify-center gap-2`} data-testid="error-message">
//                              <AlertTriangle size={16} className={`${ error === "Insufficient balance." ? "text-orange-500" : "text-red-500" }`}/>
//                              {error}
//                          </p>
//                      )}
//                     {/* API errors (calculation failure, non-balance issues), shown only if no user-facing error is present */}
//                      {apiError && !error && apiError !== "Failed to load initial exchange rates." && (
//                         <p className="text-red-800 text-sm mt-4 text-center bg-red-50 p-2.5 rounded-md border border-red-300 flex items-center justify-center gap-2" data-testid="api-error-message">
//                             <AlertTriangle size={16} className="text-red-500"/>
//                             {apiError}
//                         </p>
//                     )}

//                     {/* Continue Button */}
//                     <button
//                         onClick={handleContinue}
//                         // Disable logic refined: disable if calculating, or if continue condition isn't met (includes having a valid summary, positive amounts, no blocking errors)
//                         disabled={isCalculating || !canContinue}
//                         className={`w-full font-semibold py-3 rounded-full mt-6 transition-all duration-300 ease-in-out text-lg 
//                             ${ (canContinue && !isCalculating) ? 'bg-primary text-secondary hover:bg-primary-hover shadow-md hover:shadow-lg' 
//                             : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}
//                         data-testid="continue-button"
//                     >
//                         {/* Show loader only when actively calculating *after* user input */}
//                         {isCalculating && (sendAmount || receiveAmount) ? (
//                              <div className="flex items-center justify-center">
//                                  <Loader2 size={20} className="animate-spin mr-2" /> Calculating...
//                              </div>
//                         ) : 'Continue'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


// frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
"use client";
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { IoIosArrowBack, IoIosInformationCircleOutline } from 'react-icons/io';
import { Loader2, AlertTriangle } from 'lucide-react';

// Hooks & Logic
import { useSendAmountLogic, SendSummary } from '../../../../../hooks/useSendAmountLogic'; // Adjust path

// Components
import DashboardHeader from '@/app/dashboard/components/layout/DashboardHeader'; // Adjust path
import RateDisplay from '../../../../components/send/RateDisplay'; // Adjust path
import AmountInput from '../../../../components/send/AmountInput'; // Adjust path
import PayingWithDisplay from '../../../../components/send/PayingWithDisplay'; // Adjust path
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path

// --- Component Definition ---
const steps = ['Recipient', 'Amount', 'Review', 'Pay'];

interface SendAmountParams {
    balanceId: string;
}

export default function SendAmountPage() {
    // --- Hooks ---
    const router = useRouter();
    const params = useParams<SendAmountParams>();
    const searchParams = useSearchParams();
    const { balanceId } = params;
    const recipientId = searchParams.get('recipientId');

    // --- Custom Hook for Data and Logic ---
    const {
        sourceAccount,
        recipient,
        summary, // Latest calculated summary
        initialRateSummary, // Rate context before input
        isLoading, // Initial data loading
        isCalculating, // Debounced calculation active
        error: logicError, // User-facing errors from hook (validation, balance)
        apiError, // API errors from hook
        calculateSummary, // Debounced calculation function
        cancelCalculation, // Function to cancel pending calculation
        setError: setLogicError // Function to set error in the hook
    } = useSendAmountLogic(balanceId, recipientId);

    // --- UI State ---
    const [sendAmount, setSendAmount] = useState<string>('');
    const [receiveAmount, setReceiveAmount] = useState<string>('');
    const [lastEdited, setLastEdited] = useState<'send' | 'receive' | null>(null);
    const [isSendFocused, setIsSendFocused] = useState(false);
    const [isReceiveFocused, setIsReceiveFocused] = useState(false);

    // --- Derived State for UI ---
    const rateContext = summary ?? initialRateSummary; // Use calculated summary if available, else initial context
    const showInitialPrompt = !!initialRateSummary && !sendAmount && !receiveAmount && !isCalculating && !logicError && !apiError;
    const isInsufficientBalanceError = logicError === "Insufficient balance.";

    // Effect to sync hook summary changes back to the *other* input field
    useEffect(() => {
        if (summary) {
            const newSend = summary.sendAmount.toFixed(2);
            const newReceive = summary.receiveAmount.toFixed(2);

            // Only update the field that wasn't last edited to avoid feedback loops
            // and allow the user's input to persist during calculation.
            if (lastEdited === 'send' && receiveAmount !== newReceive) {
                setReceiveAmount(newReceive);
            } else if (lastEdited === 'receive' && sendAmount !== newSend) {
                setSendAmount(newSend);
            }
        }
         // Only run when summary changes or lastEdited changes
    }, [summary, lastEdited]); // Removed sendAmount, receiveAmount deps


    // --- Input Handlers ---
    const handleAmountChange = useCallback(async (value: string, type: 'send' | 'receive') => {
        setLastEdited(type); // Track last edited field

        if (type === 'send') setSendAmount(value);
        else setReceiveAmount(value);

        const amountNum = parseFloat(value);

        if (!isNaN(amountNum) && amountNum > 0) {
             // Clear immediate "enter amount" error before debouncing
            setLogicError(prev => (prev === "Please enter an amount." ? null : prev));
            // Trigger calculation via the hook
            calculateSummary(amountNum, type === 'send');
        } else {
            // Cancel pending calculation, clear other field, clear summary/errors in hook
            cancelCalculation();
            if (type === 'send') setReceiveAmount('');
            else setSendAmount('');
            // Let hook handle clearing summary/errors on invalid input
            calculateSummary(0, true); // Trigger calc with 0 to clear state in hook
        }
    }, [calculateSummary, cancelCalculation, setLogicError]); // Added setLogicError dependency

    const handleFocus = useCallback((type: 'send' | 'receive') => {
        if (type === 'send') setIsSendFocused(true);
        else setIsReceiveFocused(true);
    }, []);

    const handleBlur = useCallback((type: 'send' | 'receive') => {
        if (type === 'send') setIsSendFocused(false);
        else setIsReceiveFocused(false);
    }, []);

    // --- Continue Logic ---
    const handleContinue = useCallback(() => {
        console.log("Continue clicked. Checking conditions...");
        const currentSendAmount = parseFloat(sendAmount);
        const currentReceiveAmount = parseFloat(receiveAmount);

        if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
            setLogicError("Please enter a valid amount and wait for calculation.");
            console.log("Continue blocked: Invalid or missing summary.", summary);
            return;
        }
        if (isCalculating) {
             console.log("Continue blocked: Calculation in progress.");
             // Optionally show a message, though button is disabled
             return;
        }
         if (isInsufficientBalanceError) {
            console.log("Continue blocked: Insufficient balance error.");
             return; // Already handled by button disabled state, but good for clarity
         }
         // Check for other blocking API errors (not just rate load fail)
         const isBlockingApiError = apiError && apiError !== "Failed to load initial exchange rates.";
         if (isBlockingApiError) {
             setLogicError(apiError); // Show API error prominently
             console.log("Continue blocked: Blocking API error.");
             return;
         }
        // Final balance check just in case
        if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
            setLogicError("Insufficient balance.");
            console.log("Continue blocked: Final balance check failed.");
            return;
        }

        console.log("Validation passed. Saving summary:", summary);
        localStorage.setItem('sendTransferSummary', JSON.stringify(summary));

        const needsReason = recipient?.currency.code === 'INR';
        const nextPath = needsReason
            ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
            : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
        router.push(nextPath);

    }, [sendAmount, receiveAmount, summary, isCalculating, logicError, apiError, sourceAccount, recipient, balanceId, recipientId, router, setLogicError, isInsufficientBalanceError]); // Added dependencies

     // Enable continue button logic (moved outside handler for clarity)
     const canContinue = useMemo(() => (
        !!summary &&
        summary.sendAmount > 0 &&
        summary.receiveAmount > 0 &&
        !isCalculating &&
        !isInsufficientBalanceError &&
        !(apiError && apiError !== "Failed to load initial exchange rates.") // Not blocked by other API errors
    ), [summary, isCalculating, isInsufficientBalanceError, apiError]);


    // --- Render Logic ---

    // Initial Loading Skeleton
     if (isLoading) {
         // Simplified skeleton, assuming structure is known
        return (
             <div className="p-10 bg-gray-50 min-h-screen animate-pulse">
                  <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
                     {/* Mimic structure: Back link, Rate Display Area, 2x Amount Inputs, Paying With, Button */}
                     <Skeleton className="h-6 w-20 mb-4" />
                     <Skeleton className="h-[50px] w-1/2 ml-auto mb-4 bg-gray-200" /> {/* Rate Area */}
                     <Skeleton className="h-24 w-full rounded-lg mb-4 bg-gray-200" /> {/* Amount Input 1 */}
                     <Skeleton className="h-24 w-full rounded-lg mb-4 bg-gray-200" /> {/* Amount Input 2 */}
                     <Skeleton className="h-16 w-full rounded-lg mb-6 bg-gray-200" /> {/* Paying With */}
                     <Skeleton className="h-12 w-full rounded-full bg-gray-300" /> {/* Button */}
                  </div>
             </div>
        );
     }

    // Critical Error State (Account/Recipient Fetch Failed - handled by hook's error state)
     if (!sourceAccount || !recipient) {
         return (
            <div className="bg-gray-50 min-h-screen">
                 <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
                 <div className="p-10 text-center">
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-10" role="alert">
                        <strong className="font-bold mr-1">Error!</strong>
                        <span className="block sm:inline">{logicError || apiError || "Error loading essential page details."}</span>
                    </div>
                    <Link href={balanceId ? `/dashboard/balances/${balanceId}/send/select-recipient` : '/dashboard'} className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover">
                       <IoIosArrowBack size={18} className="mr-1"/> Go back
                    </Link>
                 </div>
            </div>
        );
     }

    // --- Main Render ---
    return (
        <div className="SendAmount-Page pb-20 min-h-screen">
            <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
            <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
                {/* Back Link */}
                <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    <IoIosArrowBack size={18}/> Back
                </Link>

                {/* Rate Display */}
                <RateDisplay rateContext={rateContext} apiError={apiError}/>

                {/* Main Content Area */}
                <div className="space-y-4">
                    {/* You Send Section */}
                    <AmountInput
                        label="You send"
                        labelSuffix={summary?.sendAmount && !isCalculating ? 'exactly' : ''}
                        currencyCode={sourceAccount.currency.code}
                        flagImage={sourceAccount.currency.flagImage}
                        value={sendAmount}
                        onValueChange={(val) => handleAmountChange(val, 'send')}
                        onFocus={() => handleFocus('send')}
                        onBlur={() => handleBlur('send')}
                        isFocused={isSendFocused}
                        isDimmed={lastEdited === 'receive'}
                        hasError={isInsufficientBalanceError}
                        inputId="send-amount"
                        data-testid="send-amount-input"
                    />
                     {/* Available Balance (Remains under specific input) */}
                     <p className="text-xs text-gray-500 mt-1 ml-2">Available balance: <span className="font-medium">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code}</span></p>

                    {/* Recipient Gets Section */}
                    <AmountInput
                        label={`${recipient.nickname || recipient.accountHolderName}`}
                        labelPrefix="" // Custom prefix here
                        labelSuffix={summary?.receiveAmount && !isCalculating ? 'gets exactly' : 'gets approx.'}
                        currencyCode={recipient.currency.code}
                        flagImage={recipient.currency.flagImage}
                        value={receiveAmount}
                        onValueChange={(val) => handleAmountChange(val, 'receive')}
                        onFocus={() => handleFocus('receive')}
                        onBlur={() => handleBlur('receive')}
                        isFocused={isReceiveFocused}
                        isDimmed={lastEdited === 'send'}
                        inputId="receive-amount"
                        data-testid="receive-amount-input"
                    />
                    {/* Recipient Account Info (Remains under specific input) */}
                    {recipient.accountNumber && <p className="text-xs text-gray-500 mt-1 ml-2">Account ending in {recipient.accountNumber.slice(-4)}</p>}

                    {/* Paying With Section */}
                    <PayingWithDisplay sourceAccount={sourceAccount} />

                     {/* Initial Prompt */}
                     {showInitialPrompt && (
                         <div className="p-3 rounded-lg text-center text-sm bg-blue-50 text-blue-700 border border-blue-200 mt-6 flex items-center justify-center gap-2">
                            <IoIosInformationCircleOutline className="inline mb-0.5 flex-shrink-0" size={18}/> Enter <span className="font-semibold">either amount</span> to calculate your transfer.
                         </div>
                    )}

                    {/* Error Display Section */}
                    {logicError && (
                         <p className={`text-sm mt-4 text-center p-2.5 rounded-md border ${ isInsufficientBalanceError ? "text-orange-800 bg-orange-50 border-orange-300" : "text-red-800 bg-red-50 border-red-300" } flex items-center justify-center gap-2`} data-testid="error-message">
                             <AlertTriangle size={16} className={`${ isInsufficientBalanceError ? "text-orange-500" : "text-red-500" }`}/>
                             {logicError}
                         </p>
                     )}
                    {/* Show API errors only if no primary logic error */}
                     {apiError && !logicError && apiError !== "Failed to load initial exchange rates." && (
                        <p className="text-red-800 text-sm mt-4 text-center bg-red-50 p-2.5 rounded-md border border-red-300 flex items-center justify-center gap-2" data-testid="api-error-message">
                            <AlertTriangle size={16} className="text-red-500"/>
                            {apiError}
                        </p>
                    )}

                    {/* Continue Button */}
                    <button
                        onClick={handleContinue}
                        disabled={!canContinue || isCalculating} // Simplified disabled logic
                        className={`w-full font-semibold py-3 rounded-full mt-6 transition-all duration-300 ease-in-out text-lg
                            ${ (canContinue && !isCalculating) ? 'bg-primary text-secondary hover:bg-primary-hover shadow-md hover:shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}
                        data-testid="continue-button"
                    >
                         {/* Show loader only when calculating *due to user input* */}
                        {isCalculating && (sendAmount || receiveAmount) ? (
                             <div className="flex items-center justify-center">
                                 <Loader2 size={20} className="animate-spin mr-2" /> Calculating...
                             </div>
                        ) : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
}