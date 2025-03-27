// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import { useAuth } from '../../../hooks/useAuth';
// import { Skeleton } from '@/components/ui/skeleton';
// import apiConfig from '../../../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//     _id: string;
//     code: string;
//     payeeName?: string;
//     iban?: string;
//     bicSwift?: string;
//     bankAddress?: string;
//     wiseFeePercentage?: number;
//     bankTransferFee?: number;
// }

// const AdminEditCurrencyPage = () => {
//     const params = useParams();
//     const router = useRouter();
//     const { currencyId } = params;
//     const [currency, setCurrency] = useState<Currency | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const { token } = useAuth();

//     useEffect(() => {
//         const fetchCurrency = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get(`/admin/currencies/${currencyId}`, { // ADD /api prefix here
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setCurrency(response.data);
//                 setIsLoading(false);
//             } catch (err: any) {
//                 setError(err.response?.data?.message || 'Failed to load currency details');
//                 setIsLoading(false);
//             }
//         };

//         if (currencyId) {
//             fetchCurrency();
//         }
//     }, [currencyId, token]);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         setIsSubmitting(true);
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await axios.put(`/admin/currencies/${currencyId}`, currency, { // ADD /api prefix here
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setIsSubmitting(false);
//             setSuccessMessage('Currency details updated successfully!');
//             // Optionally redirect after a delay to show success message
//             setTimeout(() => {
//                 router.push('/admin/currencies');
//             }, 1500);
//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Failed to update currency');
//             setIsSubmitting(false);
//             setSuccessMessage(null);
//         }
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
//         setCurrency({ ...currency, [e.target.name]: value });
//     };

//     if (isLoading) return <div className="p-4"><Skeleton count={10} className="h-5" /></div>;
//     if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
//     if (!currency) return <div className="p-4">Currency not found.</div>;

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-6">Edit Currency: {currency.code}</h1>
//             {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
//                 <strong className="font-bold">Success!</strong>
//                 <span className="block sm:inline"> {successMessage}</span>
//             </div>}
//             <form onSubmit={handleSubmit} className="max-w-lg">
//                 <div className="mb-4">
//                     <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">Currency Code</label>
//                     <input type="text" id="code" name="code" value={currency.code} onChange={handleChange} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="payeeName" className="block text-gray-700 text-sm font-bold mb-2">Payee Name</label>
//                     <input type="text" id="payeeName" name="payeeName" value={currency.payeeName || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="iban" className="block text-gray-700 text-sm font-bold mb-2">IBAN</label>
//                     <input type="text" id="iban" name="iban" value={currency.iban || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="bicSwift" className="block text-gray-700 text-sm font-bold mb-2">BIC/SWIFT</label>
//                     <input type="text" id="bicSwift" name="bicSwift" value={currency.bicSwift || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="bankAddress" className="block text-gray-700 text-sm font-bold mb-2">Bank Address</label>
//                     <textarea id="bankAddress" name="bankAddress" value={currency.bankAddress || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="wiseFeePercentage" className="block text-gray-700 text-sm font-bold mb-2">Wise Fee Percentage</label>
//                     <input type="number" id="wiseFeePercentage" name="wiseFeePercentage" value={currency.wiseFeePercentage !== undefined ? currency.wiseFeePercentage : 0.002} onChange={handleChange} step="0.0001" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-6">
//                     <label htmlFor="bankTransferFee" className="block text-gray-700 text-sm font-bold mb-2">Bank Transfer Fee</label>
//                     <input type="number" id="bankTransferFee" name="bankTransferFee" value={currency.bankTransferFee !== undefined ? currency.bankTransferFee : 0} onChange={handleChange} step="0.01" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>

//                 <button type="submit" disabled={isSubmitting || isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">
//                     {isSubmitting ? 'Updating...' : 'Update Currency'}
//                 </button>
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default AdminEditCurrencyPage;


'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import apiConfig from '../../../config/apiConfig';

axios.defaults.baseURL = apiConfig.baseUrl;

interface Currency {
    _id: string;
    code: string;
    payeeName?: string;
    iban?: string;
    bicSwift?: string;
    bankAddress?: string;
    wiseFeePercentage?: number;
    bankTransferFee?: number;
}

const AdminEditCurrencyPage = () => {
    const params = useParams();
    const router = useRouter();
    const { currencyId } = params;
    const [currency, setCurrency] = useState<Currency | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchCurrency = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/admin/currencies/${currencyId}`, { // ADD /api prefix here
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCurrency(response.data);
                setIsLoading(false);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load currency details');
                setIsLoading(false);
            }
        };

        if (currencyId) {
            fetchCurrency();
        }
    }, [currencyId, token]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        try {
            await axios.put(`/admin/currencies/${currencyId}`, currency, { // ADD /api prefix here
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsSubmitting(false);
            setSuccessMessage('Currency details updated successfully!');
            // Optionally redirect after a delay to show success message
            setTimeout(() => {
                router.push('/admin/currencies');
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update currency');
            setIsSubmitting(false);
            setSuccessMessage(null);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setCurrency({ ...currency, [e.target.name]: value });
    };

    if (isLoading) return <div className="p-4"><Skeleton count={10} className="h-5" /></div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
    if (!currency) return <div className="p-4">Currency not found.</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Edit Currency: {currency.code}</h1>
            {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {successMessage}</span>
            </div>}
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="mb-4">
                    <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">Currency Code</label>
                    <input type="text" id="code" name="code" value={currency.code} onChange={handleChange} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="payeeName" className="block text-gray-700 text-sm font-bold mb-2">Payee Name</label>
                    <input type="text" id="payeeName" name="payeeName" value={currency.payeeName || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="iban" className="block text-gray-700 text-sm font-bold mb-2">IBAN</label>
                    <input type="text" id="iban" name="iban" value={currency.iban || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="bicSwift" className="block text-gray-700 text-sm font-bold mb-2">BIC/SWIFT</label>
                    <input type="text" id="bicSwift" name="bicSwift" value={currency.bicSwift || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="bankAddress" className="block text-gray-700 text-sm font-bold mb-2">Bank Address</label>
                    <textarea id="bankAddress" name="bankAddress" value={currency.bankAddress || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="wiseFeePercentage" className="block text-gray-700 text-sm font-bold mb-2">Wise Fee Percentage</label>
                    <input type="number" id="wiseFeePercentage" name="wiseFeePercentage" value={currency.wiseFeePercentage !== undefined ? currency.wiseFeePercentage : 0} onChange={handleChange} step="0.0001" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label htmlFor="bankTransferFee" className="block text-gray-700 text-sm font-bold mb-2">Bank Transfer Fee</label>
                    <input type="number" id="bankTransferFee" name="bankTransferFee" value={currency.bankTransferFee !== undefined ? currency.bankTransferFee : 0} onChange={handleChange} step="0.01" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <button type="submit" disabled={isSubmitting || isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">
                    {isSubmitting ? 'Updating...' : 'Update Currency'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default AdminEditCurrencyPage;