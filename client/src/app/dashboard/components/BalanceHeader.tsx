// frontend/src/app/dashboard/components/BalanceHeader.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { LuPlus } from 'react-icons/lu';
import { GoArrowUp } from 'react-icons/go';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust path
import { Button } from '@/components/ui/button'; // Adjust path
import { BalanceDetail } from '@/app/hooks/useBalanceDetailData'; // Adjust path

interface BalanceHeaderProps {
    balanceDetail: BalanceDetail | null;
    isLoading: boolean;
    onBackClick: () => void;
    onSendClick: () => void;
    canSendMoney: boolean;
    marketRateAgainstINR: number | null;
    ourRateAgainstINR: number | null;
}

const BalanceHeader: React.FC<BalanceHeaderProps> = ({
    balanceDetail,
    isLoading,
    onBackClick,
    onSendClick,
    canSendMoney,
    marketRateAgainstINR,
    ourRateAgainstINR
}) => {
    // Initial Loading Skeleton
    if (isLoading && !balanceDetail) {
        return (
            <>
                <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700 animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-10 w-48 mb-6" /> {/* Balance Amount */}
                    <div className="flex justify-start space-x-3">
                        <Skeleton className="h-10 w-24 rounded-md" /> {/* Add Button */}
                        <Skeleton className="h-10 w-24 rounded-md" /> {/* Send Button */}
                    </div>
                </div>
            </>
        );
    }

    // Render actual content when data is available (even if other things are loading)
    if (!balanceDetail) {
        // This case should ideally be handled by the parent's error state,
        // but added as a fallback.
        return null; // Or a more specific "Balance not found" message here
    }

    const currencyCode = balanceDetail.currency.code;
    const formattedBalance = parseFloat(balanceDetail.balance.toString()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <>
            {/* Back Button */}
            <button onClick={onBackClick} className="mb-4 flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
                <IoIosArrowBack size={18} /> Back
            </button>

            {/* Balance Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                    {balanceDetail.currency.flagImage ? (
                        <Image src={balanceDetail.currency.flagImage} alt={`${currencyCode} flag`} width={40} height={40} className="rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">{currencyCode.slice(0, 2)}</div>
                    )}
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{balanceDetail.currency.currencyName || `${currencyCode} Balance`}</h2>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {formattedBalance} <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">{currencyCode}</span>
                </div>
                {/* Display Market Rate and Our Rate against INR */}
                {marketRateAgainstINR && ourRateAgainstINR && currencyCode && (
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p>Market Rate (approx): 1 {currencyCode} = {marketRateAgainstINR.toFixed(2)} INR</p>
                        <p>Our Rate (for sends): 1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR</p>
                    </div>
                )}


                <div className="flex justify-start space-x-3">
                    <Link href={`/dashboard/balances/${balanceDetail._id}/add-money`} passHref>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <LuPlus size={18} className="mr-2" /> Add
                        </Button>
                    </Link>
                    <Button
                        onClick={onSendClick}
                        className={`bg-blue-600 text-white ${!canSendMoney ? 'opacity-50 bg-blue-400 hover:bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        title={!canSendMoney ? "Add funds to send money" : "Send money"}
                        disabled={!canSendMoney} // Explicitly disable for accessibility
                    >
                        <GoArrowUp size={18} className="mr-2" /> Send
                    </Button>
                </div>
            </div>
        </>
    );
};

export default BalanceHeader;