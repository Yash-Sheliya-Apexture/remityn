// // src/app/dashboard/components/send/RateDisplay.tsx
// import React from 'react';
// import { FaLock, FaInfoCircle } from 'react-icons/fa';
// import { AlertTriangle } from 'lucide-react';
// import { SendSummary } from '@/app/hooks/useSendAmountLogic'; // Adjust path

// interface RateDisplayProps {
//     rateContext: SendSummary | null;
//     apiError: string | null; // Specifically for rate loading errors
// }

// // Keep formatting functions outside or in utils if used elsewhere
// const formatRate = (rate: number | null | undefined, precision = 6): string => {
//     if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//     return rate.toFixed(precision);
// };
// const formatComparisonRate = (rate: number | null | undefined, precision = 4): string => {
//     if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//     return rate.toFixed(precision);
// };

// const RateDisplay: React.FC<RateDisplayProps> = ({ rateContext, apiError }) => {
//     const showRates = !!rateContext && !(apiError && apiError === "Failed to load initial exchange rates.");

//     const adjustedRateDisplay = rateContext ? `1 ${rateContext.sendCurrencyCode} = ${formatRate(rateContext.exchangeRate)} ${rateContext.receiveCurrencyCode}` : null;
//     const liveRateDisplay = rateContext?.liveExchangeRate ? `1 ${rateContext.sendCurrencyCode} ≈ ${formatComparisonRate(rateContext.liveExchangeRate)} ${rateContext.receiveCurrencyCode}` : null;
//     const rateAdjustmentDisplay = rateContext?.rateAdjustmentApplied?.toFixed(2) ?? '0';

//     return (
//         <div className="text-right mb-4 min-h-[50px] space-y-1 flex flex-col items-end">
//             {showRates && rateContext && (
//                 <>
//                     {adjustedRateDisplay && (
//                         <div className="text-xs sm:text-sm font-medium p-1.5 px-2.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 inline-flex items-center gap-1.5 cursor-default" title={`Rate includes adjustment of ${rateAdjustmentDisplay}%. This is the rate applied to your transfer.`}>
//                             <FaLock size={10} /> Our Rate: {adjustedRateDisplay}
//                         </div>
//                     )}
//                     {liveRateDisplay && (
//                         <div className="text-xs font-normal p-1.5 px-2.5 rounded-md bg-gray-100 border border-gray-200 text-gray-600 inline-flex items-center gap-1.5 cursor-help" title="Current market rate for comparison only.">
//                             <FaInfoCircle size={10} /> Market Rate: {liveRateDisplay}
//                         </div>
//                     )}
//                 </>
//             )}
//             {apiError && apiError === "Failed to load initial exchange rates." && !rateContext && (
//                 <div className="text-xs p-1.5 px-2.5 rounded-md bg-red-50 border border-red-200 text-red-700 inline-flex items-center gap-1.5">
//                     <AlertTriangle size={12} /> Error loading rates.
//                 </div>
//             )}
//             {!showRates && !(apiError === "Failed to load initial exchange rates.") && (
//                 <div className="h-[50px]"></div> // Placeholder for consistent spacing
//             )}
//         </div>
//     );
// };

// export default RateDisplay;


// src/app/dashboard/components/send/RateDisplay.tsx
import React from 'react';
import { FaLock, FaInfoCircle } from 'react-icons/fa';
import { AlertTriangle } from 'lucide-react';
import { SendSummary } from '@/app/hooks/useSendAmountLogic'; // Adjust path

interface RateDisplayProps {
    rateContext: SendSummary | null;
    apiError: string | null; // Specifically for rate loading errors
}

// Keep formatting functions outside or in utils if used elsewhere
const formatRate = (rate: number | null | undefined, precision = 2): string => {
    if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
    return rate.toFixed(precision);
};
const formatComparisonRate = (rate: number | null | undefined, precision = 2): string => {
    if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
    return rate.toFixed(precision);
};

const RateDisplay: React.FC<RateDisplayProps> = ({ rateContext, apiError }) => {
    const showRates = !!rateContext && !(apiError && apiError === "Failed to load initial exchange rates.");

    const adjustedRateDisplay = rateContext ? `1 ${rateContext.sendCurrencyCode} = ${formatRate(rateContext.exchangeRate)} ${rateContext.receiveCurrencyCode}` : null;
    const liveRateDisplay = rateContext?.liveExchangeRate ? `1 ${rateContext.sendCurrencyCode} ≈ ${formatComparisonRate(rateContext.liveExchangeRate)} ${rateContext.receiveCurrencyCode}` : null;
    const rateAdjustmentDisplay = rateContext?.rateAdjustmentApplied?.toFixed(2) ?? '0';

    return (
        <div className="text-right mb-4 min-h-[50px] space-y-2 flex flex-col items-end">
            {showRates && rateContext && (
                <>
                    {adjustedRateDisplay && (
                        <div className="font-semibold p-2 px-5 rounded-md bg-primary text-mainheading inline-flex items-center gap-1.5 cursor-default" title={`Rate includes our rates  of ${rateAdjustmentDisplay}%. This is the rate applied to your transfer.`}>
                            <FaLock size={16} /> Our Rate: {adjustedRateDisplay}
                        </div>
                    )}
                    {liveRateDisplay && (
                        <div className="font-medium text-sm p-1.5 px-4 rounded-md bg-lightgray text-gray-500 dark:text-mainheading inline-flex items-center gap-1.5 cursor-help" title="Current market rate for comparison only.">
                            <FaInfoCircle size={16} /> Market Rate: {liveRateDisplay}
                        </div>
                    )}
                </>
            )}

            {apiError && apiError === "Failed to load initial exchange rates." && !rateContext && (
                <div className="text-xs p-1.5 px-2.5 rounded-md bg-red-50 border border-red-200 text-red-700 inline-flex items-center gap-1.5">
                    <AlertTriangle size={12} /> Error loading rates.
                </div>
            )}
            
            {!showRates && !(apiError === "Failed to load initial exchange rates.") && (
                <div className="h-[50px]"></div> // Placeholder for consistent spacing
            )}
        </div>
    );
};

export default RateDisplay;