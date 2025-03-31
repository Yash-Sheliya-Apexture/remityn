// frontend/components/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import apiConfig from '../../../config/apiConfig';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';

axios.defaults.baseURL = apiConfig.baseUrl;

interface CurrencyOption {
    code: string;
    currencyName?: string;
    flagImage?: string;
}

interface CurrencySelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCurrencyAdded: (newAccount: any) => void;
}


const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({ isOpen, onClose, onCurrencyAdded }) => {
    const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
    const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchCurrencies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get('/currencies');
                // Filter out INR when setting the initial list
                const availableCurrencies = response.data.filter((currency: CurrencyOption) => currency.code !== 'INR');
                setCurrencies(availableCurrencies);
                setIsLoading(false);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load currencies');
                setIsLoading(false);
                console.error("Error fetching currencies:", err);
            }
        };

        if (isOpen) { // Fetch only when the modal is opened
             fetchCurrencies();
             // Reset state when opening
             setSelectedCurrencyCode('');
             setSearchQuery('');
             setError(null);
        }

    }, [isOpen]); // Re-fetch when isOpen changes to true

    // Filter based on search query (INR is already removed from the base `currencies` state)
    const filteredCurrencies = currencies.filter(currency =>
        currency.code.toLowerCase().includes(searchQuery.toLowerCase())
        || (currency.currencyName && currency.currencyName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleCurrencySelect = (code: string) => {
        // Double-check here just in case, though it shouldn't be possible if filtered out
        if (code !== 'INR') {
            setSelectedCurrencyCode(code);
        }
    };

    const handleConfirm = async () => {
        if (!selectedCurrencyCode || selectedCurrencyCode === 'INR') { // Add extra check
            alert('Please select a valid currency.');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('/accounts', { currencyCode: selectedCurrencyCode }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onCurrencyAdded(response.data);
            // No need to call onClose here, Dialog's onOpenChange handles it
            // onClose();
            // Reset state after successful addition for next opening
            setIsLoading(false);

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add currency account');
            setIsLoading(false);
            console.error("Error adding currency account:", err);
        }
    };

     const clearSearchTerm = () => {
        setSearchQuery("");
    };

    // Use the Dialog's onOpenChange for closing logic
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            // Reset state when closing via any method (overlay click, escape key, cancel button)
             clearSearchTerm();
             setSelectedCurrencyCode(''); // Clear selection on close
             setError(null); // Clear error on close
             onClose(); // Call the original onClose handler
        }
        // If opening, the useEffect handles fetching and state reset
    }


    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}> {/* Use handleOpenChange */}
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Open a balance</DialogTitle>
                </DialogHeader>

                <div className="relative">
                     <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search currency..."
                        className="block w-full pl-14 pr-10 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearchTerm}
                            className="absolute inset-y-0 right-3 flex items-center text-gray hover:text-main focus:outline-none"
                        >
                            <MdCancel size={24} aria-hidden="true" />
                        </button>
                    )}
                </div>
                <DialogDescription>
                    Choose a currency to add to your account. (INR not available) {/* Optional: Add hint */}
                </DialogDescription>
                {isLoading && <p>Loading currencies...</p>}
                {error && !isLoading && <p className="text-red-500">Error: {error}</p>}
                <div className={`h-60 overflow-y-auto scrollbar-hide mb-4 space-y-1`}>
                    {!isLoading && filteredCurrencies.length > 0 ? (
                        filteredCurrencies.map((currency) => (
                            <div
                                key={currency.code}
                                className={`p-4 hover:bg-lightgray cursor-pointer rounded-xl flex items-center gap-4 ${selectedCurrencyCode === currency.code ? "bg-lightgray" : ""
                                    }`}
                                onClick={() => handleCurrencySelect(currency.code)}
                            >
                                {currency.flagImage && (
                                    <Image
                                        src={currency.flagImage.trim()}
                                        alt={`${currency.currencyName || currency.code} flag`}
                                        width={44}
                                        height={44}
                                        onError={() => console.error(`Error loading image for ${currency.code}: ${currency.flagImage}`)}
                                    />
                                )}
                                <div className='flex flex-col'>
                                    <span className='text-main font-medium text-lg'>{currency.code}</span>
                                    {currency.currencyName && (
                                        <span className='text-gray-500 text-sm'>{currency.currencyName}</span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                       !isLoading && <p className="text-gray-500 text-center py-4">No results found.</p>
                    )}
                </div>
                <DialogFooter>
                    {/* Cancel button now implicitly uses handleOpenChange */}
                    <button
                        className="bg-secondary hover:bg-secondary/95 text-primary font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                        onClick={() => handleOpenChange(false)} // Explicitly call close logic
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-primary hover:bg-primary/80 text-secondary font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styling
                        type="button"
                        onClick={handleConfirm}
                        disabled={
                            isLoading ||
                            !selectedCurrencyCode || // Still need a selection
                             selectedCurrencyCode === 'INR' // Belt-and-suspenders check
                            // No need to check filteredCurrencies.length === 0 if !selectedCurrencyCode handles it
                        }
                    >
                         {isLoading ? 'Adding...' : 'Confirm'} {/* Loading text */}
                    </button>
                </DialogFooter>
                 {/* Display error message related to adding account */}
                 {error && isLoading && <p className="text-red-500 mt-2 text-sm text-center">{error}</p>}
            </DialogContent>
        </Dialog>
    );
};

export default CurrencySelectorModal;