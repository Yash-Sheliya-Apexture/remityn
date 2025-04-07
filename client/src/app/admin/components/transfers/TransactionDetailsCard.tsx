"use client";
import React from "react";
import { GrTransaction } from "react-icons/gr"; // Corrected import
import { formatCurrency } from "../../../utils/helpers"; // Adjust path

interface TransactionDetailsCardProps {
  transfer: any; // Consider defining a Transfer type/interface
  currenciesMap: { [key: string]: any };
}

const CurrencyDisplay: React.FC<{
  currency: any;
  currenciesMap: { [key: string]: any };
}> = ({ currency, currenciesMap }) => {
  if (!currency) return null;
  const currencyInfo = currency._id ? currenciesMap[currency._id] : null;

  return (
    <div className="flex items-center text-sm">
      <span className="text-gray-600 dark:text-gray-300 font-medium mr-1.5">{currency.code}</span>
      {currencyInfo?.flagImage && (
        <img
          src={currencyInfo.flagImage}
          alt={currency.code}
          className="w-8 h-8 rounded-full object-cover border"
          loading="lazy"
        />
      )}
    </div>
  );
};

const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
  transfer,
  currenciesMap,
}) => {
  if (!transfer) return null;

  const totalDebit = (transfer.sendAmount || 0) + (transfer.fees || 0);

  return (
    <div>
      <h4 className="inline-flex items-center bg-emerald-50 dark:bg-emerald-600/15 text-emerald-600 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-emerald-600/50">
        {/* Using GrTransaction from react-icons as specified */}
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
              1 {transfer.sendCurrency?.code} ≈
              {transfer.exchangeRate?.toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 6,
              })}
              {transfer.receiveCurrency?.code}
            </p>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Fee</p>
            <p className="text-neutral-900 dark:text-white font-medium text-sm">
              {formatCurrency(transfer.fees, transfer.sendCurrency?.code, 2)}
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
              {formatCurrency(totalDebit, transfer.sendCurrency?.code, 2)}
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