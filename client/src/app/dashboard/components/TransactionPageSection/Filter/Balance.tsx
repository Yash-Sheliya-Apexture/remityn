// // components/Filter/Balance.tsx
// import React, { useState } from "react";
// import Image from "next/image";

// interface BalanceProps {
//   currency: string; // e.g., "EUR", "USD"
//   isSelected?: boolean; // Optional: Initial selected state
//   onBalanceChange?: (isSelected: boolean) => void; // Optional: Callback for changes
// }

// const Balance: React.FC<BalanceProps> = ({
//   currency,
//   isSelected = false,
//   onBalanceChange,
// }) => {
//   const [checked, setChecked] = useState(isSelected);

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked);
//     if (onBalanceChange) {
//       onBalanceChange(event.target.checked);
//     }
//   };

//   const getCurrencySymbol = (currencyCode: string) => {
//     switch (currencyCode.toUpperCase()) {
//       case "EUR":
//         return "/assets/icon/eur.svg";
//       case "USD":
//         return "/assets/icon/usd.svg"; // You might need to add USD icon
//       // Add more cases for other currencies if needed
//       default:
//         return "/assets/icon/default_currency.svg"; // Or a default icon
//     }
//   };

//   const getCurrencyName = (currencyCode: string) => {
//     switch (currencyCode.toUpperCase()) {
//       case "EUR":
//         return "Euro Balance";
//       case "USD":
//         return "US Dollar Balance";
//       // Add more cases for other currencies if needed
//       default:
//         return `${currencyCode} Balance`;
//     }
//   };

//   const currencyIcon = getCurrencySymbol(currency);
//   const currencyName = getCurrencyName(currency);

//   return (
//     <>
//       <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//         Balance
//       </h4>
//       <div className="pt-4">
//         <div className="flex items-center justify-between hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//           <div className="flex items-center">
//             <div className="relative">
//               <Image
//                 src={currencyIcon}
//                 alt={`${currencyName} Icon`}
//                 width={48}
//                 height={48}
//               />
//             </div>
//             <div className="ml-4">
//               <h5 className="font-medium text-main capitalize">
//                 {currencyName}
//               </h5>
//             </div>
//           </div>
//           <div className="pt-1.5">
//             <input
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//               checked={checked}
//               onChange={handleCheckboxChange}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Balance;














// components/Filter/Balance.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface CurrencyBalance {
    currencyCode: string;
    currencyName: string;
    currencySymbolPath: string; // Path to the currency symbol icon
}

export const currencyBalances: CurrencyBalance[] = [
    {
        currencyCode: "EUR",
        currencyName: "Euro Balance",
        currencySymbolPath: "/assets/icon/eur.svg",
    },
    {
        currencyCode: "USD",
        currencyName: "US Dollar Balance",
        currencySymbolPath: "/assets/icon/usd.svg",
    },
    // Add more currencies as needed
    {
        currencyCode: "GBP",
        currencyName: "British Pound Balance",
        currencySymbolPath: "/assets/icon/gbp.svg", // Example path, you might need to add this icon
    },
    {
        currencyCode: "CAD",
        currencyName: "Canadian Dollar Balance",
        currencySymbolPath: "/assets/icon/cad.svg", // Example path, you might need to add this icon
    },
];


interface BalanceProps {
    currencyBalance: CurrencyBalance; // Now accepts a CurrencyBalance object
    isSelected?: boolean; // Indicate if this currency is selected
    onBalanceChange?: (isSelected: boolean, currencyCode: string) => void; // Pass currencyCode to callback
}

const BalanceComponent: React.FC<BalanceProps> = ({
    currencyBalance, // Use currencyBalance prop
    isSelected = false,
    onBalanceChange,
}) => {
    const [checked, setChecked] = useState(isSelected);

    useEffect(() => {
        setChecked(isSelected); // Sync checked state with isSelected prop
    }, [isSelected]);


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (onBalanceChange) {
            onBalanceChange(event.target.checked, currencyBalance.currencyCode); // Pass currencyCode
        }
    };


    return (
        <div className="flex items-center justify-between hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out">
            <div className="flex items-center">
                <div className="relative">
                    <Image
                        src={currencyBalance.currencySymbolPath}
                        alt={`${currencyBalance.currencyName} Icon`}
                        width={48}
                        height={48}
                    />
                </div>
                <div className="ml-4">
                    <h5 className="font-medium text-main capitalize">
                        {currencyBalance.currencyName}
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

export default BalanceComponent; // Rename the component to avoid confusion with data name