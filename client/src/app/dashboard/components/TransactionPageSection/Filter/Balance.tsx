// components/Filter/Balance.tsx
import React, { useState } from "react";
import Image from "next/image";

interface BalanceProps {
  currency: string; // e.g., "EUR", "USD"
  isSelected?: boolean; // Optional: Initial selected state
  onBalanceChange?: (isSelected: boolean) => void; // Optional: Callback for changes
}

const Balance: React.FC<BalanceProps> = ({ currency, isSelected = false, onBalanceChange }) => {
  const [checked, setChecked] = useState(isSelected);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (onBalanceChange) {
      onBalanceChange(event.target.checked);
    }
  };

  const getCurrencySymbol = (currencyCode: string) => {
    switch (currencyCode.toUpperCase()) {
      case "EUR":
        return "/assets/icon/eur.svg";
      case "USD":
        return "/assets/icon/usd.svg"; // You might need to add USD icon
      // Add more cases for other currencies if needed
      default:
        return "/assets/icon/default_currency.svg"; // Or a default icon
    }
  };

  const getCurrencyName = (currencyCode: string) => {
    switch (currencyCode.toUpperCase()) {
      case "EUR":
        return "Euro Balance";
      case "USD":
        return "US Dollar Balance";
      // Add more cases for other currencies if needed
      default:
        return `${currencyCode} Balance`;
    }
  };

  const currencyIcon = getCurrencySymbol(currency);
  const currencyName = getCurrencyName(currency);

  return (
    <div className="flex items-center justify-between hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
      <div className="flex items-center">
        <div className="relative">
          <Image src={currencyIcon} alt={`${currencyName} Icon`} width={48} height={48} />
        </div>
        <div className="ml-4">
          <h5 className="font-medium text-main capitalize">
            {currencyName}
          </h5>
        </div>
      </div>
      <div className="pt-1.5">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
          checked={checked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default Balance;