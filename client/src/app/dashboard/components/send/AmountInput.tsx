// // src/app/dashboard/components/send/AmountInput.tsx
// import React from 'react';
// import Image from 'next/image';

// interface AmountInputProps {
//     label: string;
//     currencyCode: string;
//     flagImage?: string;
//     value: string;
//     onValueChange: (value: string) => void;
//     onFocus: () => void;
//     onBlur: () => void;
//     isFocused: boolean;
//     isDimmed?: boolean; // True if the *other* input was last edited
//     hasError?: boolean; // e.g., for insufficient balance indication
//     placeholder?: string;
//     inputId: string; // For label association
//     'data-testid'?: string;
//     labelPrefix?: string; // Optional prefix like "Recipient gets"
//     labelSuffix: string; // e.g., "exactly", "approx."
// }

// const AmountInput: React.FC<AmountInputProps> = ({
//     label,
//     currencyCode,
//     flagImage,
//     value,
//     onValueChange,
//     onFocus,
//     onBlur,
//     isFocused,
//     isDimmed = false,
//     hasError = false,
//     placeholder = "0.00",
//     inputId,
//     'data-testid': dataTestId,
//     labelPrefix = "",
//     labelSuffix
// }) => {
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         // Allow empty input, numbers, and max 2 decimal places
//         const newValue = e.target.value;
//         if (newValue === '' || /^\d*\.?\d{0,2}$/.test(newValue)) {
//             onValueChange(newValue);
//         }
//     };

//     const hasValue = value && parseFloat(value) > 0;

//     return (
//         <div data-testid={dataTestId?.replace('-input', '-section')}>
//             <label htmlFor={inputId} className={`block font-medium mb-1 ml-2 ${ hasValue ? 'text-gray-700' : 'text-neutral-900 '}`}>
//                 {labelPrefix} {label} {labelSuffix}
//             </label>
//             <div className="flex items-center p-3 rounded-lg bg-white relative min-h-[72px] transition-shadow">
//                 <div className="flex items-center bg-lightborder px-2 py-1.5 rounded-full space-x-2 mr-3 pr-3 flex-shrink-0">
//                     <Image src={flagImage || '/assets/icon/generic.svg'} alt={`${currencyCode} flag`} width={24} height={24} className="rounded-full size-8" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                     <span className="font-semibold text-base text-gray-800">{currencyCode}</span>
//                 </div>
//                 <input
//                     id={inputId}
//                     type="text"
//                     inputMode="decimal"
//                     value={value}
//                     onChange={handleInputChange}
//                     onFocus={onFocus}
//                     onBlur={onBlur}
//                     className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-300 ease-in-out
//                         ${isFocused ? 'text-4xl lg:text-6xl text-mainheading' : hasValue ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400'}
//                         ${isDimmed && hasValue ? 'text-gray-500 font-medium' : 'text-black'}`} // Dim if the other field was last edited and this one has a value
//                     placeholder={placeholder}
//                     aria-label={label}
//                     data-testid={dataTestId}
//                 />
//             </div>
//         </div>
//     );
// };

// export default AmountInput;

// src/app/dashboard/components/send/AmountInput.tsx
// import React from "react";
// import Image from "next/image";

// interface AmountInputProps {
//   label: string;
//   currencyCode: string;
//   flagImage?: string;
//   value: string;
//   onValueChange: (value: string) => void;
//   onFocus: () => void;
//   onBlur: () => void;
//   isFocused: boolean;
//   isDimmed?: boolean; // True if the *other* input was last edited
//   hasError?: boolean; // e.g., for insufficient balance indication
//   placeholder?: string;
//   inputId: string; // For label association
//   "data-testid"?: string;
//   labelPrefix?: string; // Optional prefix like "Recipient gets"
//   labelSuffix: string; // e.g., "exactly", "approx."
// }

// const AmountInput: React.FC<AmountInputProps> = ({
//   label,
//   currencyCode,
//   flagImage,
//   value,
//   onValueChange,
//   onFocus,
//   onBlur,
//   isFocused,
//   isDimmed = false,
//   hasError = false,
//   placeholder = "0.00",
//   inputId,
//   "data-testid": dataTestId,
//   labelPrefix = "",
//   labelSuffix,
// }) => {
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Allow empty input, numbers, and max 2 decimal places
//     const newValue = e.target.value;
//     if (newValue === "" || /^\d*\.?\d{0,2}$/.test(newValue)) {
//       onValueChange(newValue);
//     }
//   };

//   const hasValue = value && parseFloat(value) > 0;

//   return (
//     <div data-testid={dataTestId?.replace("-input", "-section")}>
//       <label
//         htmlFor={inputId}
//         className={`block font-medium mb-1 ml-2 ${
//           hasValue ? "text-gray-700" : "text-neutral-900 "
//         }`}
//       >
//         {labelPrefix} {label} {labelSuffix}
//       </label>
//       <div
//         className={`flex items-center p-2 bg-white relative min-h-[72px] transition-shadow ${
//           isFocused ? "border-b" : ""
//         }`}
//       >
//         {" "}
//         {/* Added conditional border class here */}
//         <div className="flex items-center bg-lightborder px-2 py-1.5 rounded-full space-x-2 mr-3 pr-3 flex-shrink-0">
//           <Image
//             src={flagImage || "/assets/icon/generic.svg"}
//             alt={`${currencyCode} flag`}
//             width={24}
//             height={24}
//             className="rounded-full size-8"
//             onError={(e) => {
//               e.currentTarget.src = "/assets/icon/generic.svg";
//             }}
//           />
//           <span className="font-semibold text-base text-gray-800">
//             {currencyCode}
//           </span>
//         </div>
//         <input
//           id={inputId}
//           type="text"
//           inputMode="decimal"
//           value={value}
//           onChange={handleInputChange}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           className={`flex-grow font-black border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-300 ease-in-out
//                         ${
//                           isFocused
//                             ? "text-4xl lg:text-7xl text-mainheading"
//                             : hasValue
//                             ? "text-3xl lg:text-4xl"
//                             : "text-3xl lg:text-5xl text-gray-400"
//                         }
//                         ${
//                           isDimmed && hasValue
//                             ? "text-gray-500 font-medium"
//                             : "text-black"
//                         }`}
//           placeholder={placeholder}
//           aria-label={label}
//           data-testid={dataTestId}
//         />
//       </div>
//     </div>
//   );
// };

// export default AmountInput;

// src/app/dashboard/components/send/AmountInput.tsx
import React from "react";
import Image from "next/image";

interface AmountInputProps {
  label: string;
  currencyCode: string;
  flagImage?: string;
  value: string;
  onValueChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  isDimmed?: boolean; // True if the *other* input was last edited
  hasError?: boolean; // e.g., for insufficient balance indication
  placeholder?: string;
  inputId: string; // For label association
  "data-testid"?: string;
  labelPrefix?: string; // Optional prefix like "Recipient gets"
  labelSuffix: string; // e.g., "exactly", "approx."
}

const AmountInput: React.FC<AmountInputProps> = ({
  label,
  currencyCode,
  flagImage,
  value,
  onValueChange,
  onFocus,
  onBlur,
  isFocused,
  isDimmed = false,
  hasError = false,
  placeholder = "0.00",
  inputId,
  "data-testid": dataTestId,
  labelPrefix = "",
  labelSuffix,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow empty input, numbers, and max 2 decimal places
    const newValue = e.target.value;
    if (newValue === "" || /^\d*\.?\d{0,2}$/.test(newValue)) {
      onValueChange(newValue);
    }
  };

  const hasValue = value && parseFloat(value) > 0;

  return (
    <div data-testid={dataTestId?.replace("-input", "-section")}>
      <label
        htmlFor={inputId}
        className={`block font-medium mb-1 ml-2 dark:text-white ${
          hasValue ? "text-gray-700" : "text-neutral-900  "
        }`}
      >
        {labelPrefix} {label} {labelSuffix}
      </label>

      <div
        className={`flex items-center p-2 bg-white dark:bg-background relative min-h-[72px] transition-shadow ${
          isFocused ? "border-b" : ""
        }`}
      >
        {" "}
        {/* Added conditional border class here */}
        <div className="flex items-center bg-lightborder dark:bg-background border px-2 py-1.5 rounded-full gap-2.5 pr-5 flex-shrink-0">
          <Image
            src={flagImage || "/assets/icon/generic.svg"}
            alt={`${currencyCode} flag`}
            width={24}
            height={24}
            className="rounded-full size-8"
            onError={(e) => {
              e.currentTarget.src = "/assets/icon/generic.svg";
            }}
          />
          <span className="font-bold text-base text-mainheading dark:text-white">
            {currencyCode}
          </span>
        </div>
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`flex-grow font-black border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-300 ease-in-out
                        ${
                          isFocused
                            ? "text-4xl lg:text-7xl text-mainheading dark:text-white"
                            : hasValue
                            ? "text-3xl lg:text-4xl dark:text-white"
                            : "text-3xl lg:text-5xl text-gray-400"
                        }
                        ${
                          isDimmed && hasValue
                            ? "text-gray-500 font-medium"
                            : "text-black"
                        }`}
          placeholder={placeholder}
          aria-label={label}
          data-testid={dataTestId}
        />
      </div>
    </div>
  );
};

export default AmountInput;
