// "use client";
// import React from "react";
// import { GrTransaction } from "react-icons/gr"; // Corrected import
// import { formatCurrency } from "../../../utils/helpers"; // Adjust path

// interface TransactionDetailsCardProps {
//   transfer: any; // Consider defining a Transfer type/interface
//   currenciesMap: { [key: string]: any };
// }

// const CurrencyDisplay: React.FC<{
//   currency: any;
//   currenciesMap: { [key: string]: any };
// }> = ({ currency, currenciesMap }) => {
//   if (!currency) return null;
//   const currencyInfo = currency._id ? currenciesMap[currency._id] : null;

//   return (
//     <div className="flex items-center text-sm">
//       <span className="text-gray-600 dark:text-gray-300 font-medium mr-1.5">{currency.code}</span>
//       {currencyInfo?.flagImage && (
//         <img
//           src={currencyInfo.flagImage}
//           alt={currency.code}
//           className="w-8 h-8 rounded-full object-cover border"
//           loading="lazy"
//         />
//       )}
//     </div>
//   );
// };

// const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
//   transfer,
//   currenciesMap,
// }) => {
//   if (!transfer) return null;

//   const totalDebit = (transfer.sendAmount || 0) + (transfer.fees || 0);

//   return (
//     <div>
//       <h4 className="inline-flex items-center bg-emerald-50 dark:bg-emerald-600/15 text-emerald-600 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-emerald-600/50">
//         {/* Using GrTransaction from react-icons as specified */}
//         <GrTransaction className="size-4 mr-1.5" />
//         Transaction Details
//       </h4>

//       <div className="rounded-xl border overflow-hidden">
//         {/* Exchange Information */}
//         <div className="p-5 ">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             {/* Sent Amount */}
//             <div className="bg-lightgray dark:bg-secondarybox rounded-lg p-4 border">
//               <p className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
//                 Sent Amount
//               </p>
//               <div className="flex items-baseline">
//                 <div className="text-2xl font-bold text-neutral-900 dark:text-white mr-2">
//                   {formatCurrency(transfer.sendAmount, undefined, 2)}
//                 </div>
//                 <CurrencyDisplay
//                     currency={transfer.sendCurrency}
//                     currenciesMap={currenciesMap}
//                 />
//               </div>
//             </div>

//             {/* Received Amount */}
//             <div className="bg-lightgray dark:bg-secondarybox rounded-lg p-4 border">
//               <p className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
//                 Recipient Gets (approx)
//               </p>
//               <div className="flex items-baseline">
//                 <div className="text-2xl font-bold text-neutral-900 dark:text-white mr-2">
//                   {formatCurrency(transfer.receiveAmount, undefined, 2)}
//                 </div>
//                  <CurrencyDisplay
//                     currency={transfer.receiveCurrency}
//                     currenciesMap={currenciesMap}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-t">
//           <div className="p-4">
//             <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Exchange Rate</p>
//             <p className="text-neutral-900 dark:text-white font-medium text-sm">
//               1 {transfer.sendCurrency?.code} ≈
//               {transfer.exchangeRate?.toLocaleString(undefined, {
//                 minimumFractionDigits: 4,
//                 maximumFractionDigits: 6,
//               })}
//               {transfer.receiveCurrency?.code}
//             </p>
//           </div>
//           <div className="p-4">
//             <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Fee</p>
//             <p className="text-neutral-900 dark:text-white font-medium text-sm">
//               {formatCurrency(transfer.fees, transfer.sendCurrency?.code, 2)}
//             </p>
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="p-4 border-t ">
//           <div className="flex items-center justify-between">
//             <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
//               Total Debit Amount
//             </p>
//             <p className="font-semibold text-lg text-neutral-900 dark:text-white">
//               {formatCurrency(totalDebit, transfer.sendCurrency?.code, 2)}
//             </p>
//           </div>
//           <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 text-right">
//             (Amount + Fee)
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionDetailsCard;


"use client";
import React from "react";
import Image from "next/image"; // Import next/image
import { GrTransaction } from "react-icons/gr";
import { formatCurrency } from "../../../utils/helpers"; // Adjust path if needed

// --- Type Definitions ---

// Represents the reference to a currency within the transfer object
interface CurrencyRef {
  _id: string; // Assuming currency IDs are strings
  code: string;
}

// Represents the full currency information stored in the map
interface CurrencyInfo {
  _id: string;
  code: string;
  name: string; // Add other relevant properties if available
  flagImage?: string | null; // Flag image URL might be optional
}

// Represents the main transfer object
interface Transfer {
  sendAmount?: number | null;
  fees?: number | null;
  receiveAmount?: number | null;
  sendCurrency?: CurrencyRef | null;
  receiveCurrency?: CurrencyRef | null;
  exchangeRate?: number | null;
  // Add other potential transfer properties if needed
}

// Type for the currencies map
type CurrenciesMap = Record<string, CurrencyInfo>; // Use Record for dictionary type

// --- Prop Interfaces ---

interface TransactionDetailsCardProps {
  transfer: Transfer | null | undefined; // Use the defined Transfer type
  currenciesMap: CurrenciesMap; // Use the defined CurrenciesMap type
}

interface CurrencyDisplayProps {
  currency: CurrencyRef | null | undefined; // Use CurrencyRef type
  currenciesMap: CurrenciesMap; // Use CurrenciesMap type
}

// --- Components ---

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ currency, currenciesMap }) => {
  // Early return if currency or its ID is missing
  if (!currency?._id) return null;

  // Access currency info safely
  const currencyInfo = currenciesMap[currency._id];

  return (
    <div className="flex items-center text-sm">
      <span className="text-gray-600 dark:text-gray-300 font-medium mr-1.5">{currency.code}</span>
      {/* Check if currencyInfo and flagImage exist */}
      {currencyInfo?.flagImage && (
        <div className="relative w-8 h-8 rounded-full overflow-hidden border"> {/* Added relative positioning for Image */}
          <Image
            src={currencyInfo.flagImage}
            alt={`${currency.code} flag`} // More descriptive alt text
            fill // Use fill to cover the container
            className="object-cover" // Ensure image covers well
            // No loading="lazy" needed, next/image handles optimization
          />
        </div>
      )}
    </div>
  );
};

const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
  transfer,
  currenciesMap,
}) => {
  // Handle null or undefined transfer case early
  if (!transfer) return null;

  // Use default value 0 if amounts/fees are null/undefined
  const totalDebit = (transfer.sendAmount || 0) + (transfer.fees || 0);
  const sendCurrencyCode = transfer.sendCurrency?.code || ''; // Default to empty string if code is missing
  const receiveCurrencyCode = transfer.receiveCurrency?.code || ''; // Default to empty string

  return (
    <div>
      <h4 className="inline-flex items-center bg-emerald-50 dark:bg-emerald-600/15 text-emerald-600 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-emerald-600/50">
        <GrTransaction className="size-4 mr-1.5" />
        Transaction Details
      </h4>

      <div className="rounded-xl border overflow-hidden">
        {/* Exchange Information */}
        <div className="p-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Sent Amount */}
            <div className="bg-lightgray dark:bg-secondarybox rounded-lg p-4 border">
              <p className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
                Sent Amount
              </p>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white mr-2">
                  {/* Pass undefined for currency code if not needed by formatCurrency */}
                  {formatCurrency(transfer.sendAmount, undefined, 2)}
                </div>
                <CurrencyDisplay
                    currency={transfer.sendCurrency}
                    currenciesMap={currenciesMap}
                />
              </div>
            </div>

            {/* Received Amount */}
            <div className="bg-lightgray dark:bg-secondarybox rounded-lg p-4 border">
              <p className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
                Recipient Gets (approx)
              </p>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white mr-2">
                   {/* Pass undefined for currency code if not needed by formatCurrency */}
                  {formatCurrency(transfer.receiveAmount, undefined, 2)}
                </div>
                 <CurrencyDisplay
                    currency={transfer.receiveCurrency}
                    currenciesMap={currenciesMap}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-t">
          <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Exchange Rate</p>
            <p className="text-neutral-900 dark:text-white font-medium text-sm">
              {/* Check if codes exist before displaying */}
              {sendCurrencyCode && receiveCurrencyCode ? (
                <>
                  1 {sendCurrencyCode} ≈{' '}
                  {transfer.exchangeRate?.toLocaleString(undefined, {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 6,
                  }) || 'N/A'}{' '}
                  {receiveCurrencyCode}
                </>
              ) : (
                'N/A' // Handle case where currency codes might be missing
              )}
            </p>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Fee</p>
            <p className="text-neutral-900 dark:text-white font-medium text-sm">
              {/* Pass the actual send currency code to formatCurrency */}
              {formatCurrency(transfer.fees, sendCurrencyCode || undefined, 2)}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 border-t ">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Total Debit Amount
            </p>
            <p className="font-semibold text-lg text-neutral-900 dark:text-white">
              {/* Pass the actual send currency code to formatCurrency */}
              {formatCurrency(totalDebit, sendCurrencyCode || undefined, 2)}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 text-right">
            (Amount + Fee)
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsCard;