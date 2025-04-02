// src/app/dashboard/components/send/AmountInput.tsx
import React from 'react';
import Image from 'next/image';

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
    'data-testid'?: string;
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
    placeholder = "0",
    inputId,
    'data-testid': dataTestId,
    labelPrefix = "",
    labelSuffix
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow empty input, numbers, and max 2 decimal places
        const newValue = e.target.value;
        if (newValue === '' || /^\d*\.?\d{0,2}$/.test(newValue)) {
            onValueChange(newValue);
        }
    };

    const hasValue = value && parseFloat(value) > 0;

    return (
        <div data-testid={dataTestId?.replace('-input', '-section')}>
            <label htmlFor={inputId} className={`block text-xs font-medium mb-1 ml-2 ${ hasValue ? 'text-gray-700' : 'text-gray-500'}`}>
                {labelPrefix} {label} {labelSuffix}
            </label>
            <div className={`flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px] transition-shadow ${isFocused ? 'ring-2 ring-primary shadow-md' : 'border-gray-300'} ${hasError ? 'border-orange-300 ring-1 ring-orange-300' : ''}`}>
                <div className="flex items-center space-x-2 mr-3 pr-3 border-r border-gray-200 flex-shrink-0">
                    <Image src={flagImage || '/assets/icon/generic.svg'} alt={`${currencyCode} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
                    <span className="font-semibold text-base text-gray-800">{currencyCode}</span>
                </div>
                <input
                    id={inputId}
                    type="text"
                    inputMode="decimal"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out
                        ${isFocused ? 'text-4xl lg:text-5xl text-primary' : hasValue ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400'}
                        ${isDimmed && hasValue ? 'text-gray-500 font-medium' : 'text-black'}`} // Dim if the other field was last edited and this one has a value
                    placeholder={placeholder}
                    aria-label={label}
                    data-testid={dataTestId}
                />
            </div>
        </div>
    );
};

export default AmountInput;