// src/app/dashboard/components/send/PayingWithDisplay.tsx
import React from 'react';
import Image from 'next/image';
import { AccountDetails } from '@/app/hooks/useSendAmountLogic'; // Adjust path

interface PayingWithDisplayProps {
    sourceAccount: AccountDetails;
}

const PayingWithDisplay: React.FC<PayingWithDisplayProps> = ({ sourceAccount }) => {
    return (
        <div className="mt-6 mb-6">
             <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">Paying with</label>
             <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                  <Image src={sourceAccount.currency.flagImage || '/assets/icon/generic.svg'} alt={`${sourceAccount.currency.code} flag`} width={32} height={32} className="rounded-full mr-3" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
                   <div>
                       <p className="text-sm font-semibold text-gray-800">Your {sourceAccount.currency.code} balance</p>
                       <p className="text-xs text-gray-600">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code} available</p>
                   </div>
             </div>
        </div>
    );
};

export default PayingWithDisplay;