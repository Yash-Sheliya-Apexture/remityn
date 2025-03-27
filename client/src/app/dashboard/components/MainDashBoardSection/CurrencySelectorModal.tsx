// // frontend/src/app/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../../hooks/useAuth';
// // Remove import of your basic Modal:
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogDescription,
//     DialogFooter,
// } from "@/components/ui/dialog" // Import Shadcn Dialog components
// import apiConfig from '../../../config/apiConfig'; // Correct import path using alias

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface CurrencyOption {
//     code: string;
// }

// interface CurrencySelectorModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onCurrencyAdded: (newAccount: any) => void; // Adjust type as needed
// }

// const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({ isOpen, onClose, onCurrencyAdded }) => {
//     const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
//     const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();

//     useEffect(() => {
//         const fetchCurrencies = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get('/currencies'); // Backend endpoint to get all currencies
//                 setCurrencies(response.data);
//                 setIsLoading(false);
//             } catch (err: any) {
//                 setError(err.response?.data?.message || 'Failed to load currencies');
//                 setIsLoading(false);
//                 console.error("Error fetching currencies:", err);
//             }
//         };

//         fetchCurrencies();
//     }, [],);

//     const filteredCurrencies = currencies.filter(currency =>
//         currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleCurrencySelect = (code: string) => {
//         setSelectedCurrencyCode(code);
//     };

//     const handleConfirm = async () => {
//         if (!selectedCurrencyCode) {
//             alert('Please select a currency.');
//             return;
//         }

//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await axios.post('/accounts', { currencyCode: selectedCurrencyCode }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             onCurrencyAdded(response.data); // Pass the new account back to CountryCard
//             setIsLoading(false);
//             onClose(); // Close the modal after successful addition
//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Failed to add currency account');
//             setIsLoading(false);
//             console.error("Error adding currency account:", err);
//         }
//     };

//     // No need for isOpen check here, Dialog component handles it

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="sm:max-w-[425px]"> {/* Adjust max-width as needed */}
//                 <DialogHeader>
//                     <DialogTitle>Open a balance</DialogTitle>
//                     <DialogDescription>
//                         Choose a currency to add to your account.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         placeholder="Search currency..."
//                         className="border p-2 w-full rounded-md"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                 </div>
//                 {isLoading && <p>Loading currencies...</p>}
//                 {error && <p className="text-red-500">Error: {error}</p>}
//                 <div className="max-h-60 overflow-y-auto mb-4">
//                     {filteredCurrencies.length > 0 ? ( // Conditional rendering here
//                         filteredCurrencies.map(currency => (
//                             <div
//                                 key={currency.code}
//                                 className={`p-2 hover:bg-gray-100 cursor-pointer rounded-md ${selectedCurrencyCode === currency.code ? 'bg-green-100' : ''}`}
//                                 onClick={() => handleCurrencySelect(currency.code)}
//                             >
//                                 {currency.code}
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500 text-center">No results found.</p> // Display "No results found"
//                     )}
//                 </div>
//                 <DialogFooter>
//                     <button
//                         className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                         onClick={onClose}
//                         disabled={isLoading}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
//                         type="button"
//                         onClick={handleConfirm}
//                         disabled={isLoading || !selectedCurrencyCode || filteredCurrencies.length === 0} // Disable confirm button if no results
//                     >
//                         Confirm
//                     </button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default CurrencySelectorModal;













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
    currencyName?: string; // Currency Name is now expected from the backend
    flagImage?: string;    // Flag Image path is now expected from the backend
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
                const response = await axios.get('/currencies'); // Backend endpoint to get all currencies
                setCurrencies(response.data); // Assuming backend now returns currencyName and flagImage
                setIsLoading(false);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load currencies');
                setIsLoading(false);
                console.error("Error fetching currencies:", err);
            }
        };

        fetchCurrencies();
    }, []);

    const filteredCurrencies = currencies.filter(currency =>
        currency.code.toLowerCase().includes(searchQuery.toLowerCase())
        || (currency.currencyName && currency.currencyName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleCurrencySelect = (code: string) => {
        setSelectedCurrencyCode(code);
    };

    const handleConfirm = async () => {
        if (!selectedCurrencyCode) {
            alert('Please select a currency.');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('/accounts', { currencyCode: selectedCurrencyCode }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onCurrencyAdded(response.data);
            setIsLoading(false);
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add currency account');
            setIsLoading(false);
            console.error("Error adding currency account:", err);
        }
    };

    const clearSearchTerm = () => {
        setSearchQuery("");
    };

    const handleCancel = () => {
        clearSearchTerm();
        onClose();
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
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
                    Choose a currency to add to your account.
                </DialogDescription>
                {isLoading && <p>Loading currencies...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                <div className={`h-60 overflow-y-auto scrollbar-hide mb-4 space-y-1`}>
                    {filteredCurrencies.length > 0 ? (
                        filteredCurrencies.map((currency) => (
                            <div
                                key={currency.code}
                                className={`p-4 hover:bg-lightgray cursor-pointer rounded-xl flex items-center gap-4 ${selectedCurrencyCode === currency.code ? "bg-lightgray" : ""
                                    }`}
                                onClick={() => handleCurrencySelect(currency.code)}
                            >
                                {currency.flagImage && (
                                    <Image
                                        src={currency.flagImage}
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
                        <p className="text-gray-500 text-center">No results found.</p>
                    )}
                </div>
                <DialogFooter>
                    <button
                        className="bg-secondary hover:bg-secondary/95 text-primary font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-primary hover:bg-primary/80 text-secondary font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleConfirm}
                        disabled={
                            isLoading ||
                            !selectedCurrencyCode ||
                            filteredCurrencies.length === 0
                        }
                    >
                        Confirm
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CurrencySelectorModal;