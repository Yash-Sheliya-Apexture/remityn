// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const AdminCurrenciesPage = () => {
//     const [currencies, setCurrencies] = useState([]);
//     const [newCurrencyCode, setNewCurrencyCode] = useState('');
//     const [editingCurrencyId, setEditingCurrencyId] = useState(null);
//     const [editingCurrencyCode, setEditingCurrencyCode] = useState('');
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { token } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         const fetchCurrencies = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get('/admin/currencies', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setCurrencies(response.data);
//                 setIsLoading(false);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load currencies');
//                 setIsLoading(false);
//                 console.error("Error fetching currencies:", err);
//                 if (err.response?.status === 403 || err.response?.status === 401) {
//                     router.push('/auth/login'); // Redirect if not admin or unauthorized
//                 }
//             }
//         };

//         if (token) {
//             fetchCurrencies();
//         }
//     }, [token, router]);

//     const handleCreateCurrency = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             await axios.post('/admin/currencies', { code: newCurrencyCode }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setNewCurrencyCode(''); // Clear input after successful creation
//             fetchCurrenciesList(); // Refresh currency list
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to create currency');
//             setIsLoading(false);
//             console.error("Error creating currency:", err);
//         }
//     };

//     const handleUpdateCurrency = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             await axios.put(`/admin/currencies/${editingCurrencyId}`, { code: editingCurrencyCode }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setEditingCurrencyId(null);
//             setEditingCurrencyCode('');
//             fetchCurrenciesList(); // Refresh currency list
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update currency');
//             setIsLoading(false);
//             console.error("Error updating currency:", err);
//         }
//     };

//     const handleDeleteCurrency = async (currencyId) => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             await axios.delete(`/admin/currencies/${currencyId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             fetchCurrenciesList(); // Refresh currency list
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to delete currency');
//             setIsLoading(false);
//             console.error("Error deleting currency:", err);
//         }
//     };

//     const fetchCurrenciesList = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get('/admin/currencies', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setCurrencies(response.data);
//             setIsLoading(false);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to load currencies');
//             setIsLoading(false);
//             console.error("Error fetching currencies:", err);
//         }
//     };


//     const startEditing = (currency) => {
//         setEditingCurrencyId(currency._id);
//         setEditingCurrencyCode(currency.code);
//     };

//     const cancelEditing = () => {
//         setEditingCurrencyId(null);
//         setEditingCurrencyCode('');
//     };

//     if (isLoading) {
//         return <div>Loading currencies...</div>;
//     }

//     if (error) {
//         return <div className="text-red-500">Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h1>Admin Currency Management</h1>

//             {/* Create Currency Form */}
//             <div>
//                 <h2>Add New Currency</h2>
//                 <input
//                     type="text"
//                     placeholder="Currency Code (e.g., USD)"
//                     value={newCurrencyCode}
//                     onChange={(e) => setNewCurrencyCode(e.target.value.toUpperCase())}
//                 />
//                 <button onClick={handleCreateCurrency} disabled={isLoading}>Add Currency</button>
//             </div>

//             {/* Currency List */}
//             <h2>Currency List</h2>
//             <ul>
//                 {currencies.map(currency => (
//                     <li key={currency._id}>
//                         {editingCurrencyId === currency._id ? (
//                             <>
//                                 <input
//                                     type="text"
//                                     value={editingCurrencyCode}
//                                     onChange={(e) => setEditingCurrencyCode(e.target.value.toUpperCase())}
//                                 />
//                                 <button onClick={handleUpdateCurrency} disabled={isLoading}>Save</button>
//                                 <button onClick={cancelEditing}>Cancel</button>
//                             </>
//                         ) : (
//                             <>
//                                 {currency.code}
//                                 <button onClick={() => startEditing(currency)}>Edit</button>
//                                 <button onClick={() => handleDeleteCurrency(currency._id)} disabled={isLoading}>Delete</button>
//                             </>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AdminCurrenciesPage;


'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component
import Link from 'next/link';
import apiConfig from '../../config/apiConfig';

axios.defaults.baseURL = apiConfig.baseUrl;

const AdminCurrenciesPage = () => {
    const [currencies, setCurrencies] = useState([]); // Initialize as empty array
    const [newCurrencyCode, setNewCurrencyCode] = useState('');
    const [editingCurrencyId, setEditingCurrencyId] = useState(null);
    const [editingCurrencyCode, setEditingCurrencyCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // For button loading states
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchCurrencies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get('/admin/currencies', { // Correct API path - /api/admin/currencies
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("API Response Data:", response.data); // Debug: Log API response
                setCurrencies(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error("An error occurred while fetching currencies:", err);
                // setError("An error occurred while loading currencies."); // Commented out setError
                setIsLoading(false);
                if (err.response?.status === 403 || err.response?.status === 401) {
                    router.push('/auth/login');
                }
            }
        };

        if (token) {
            fetchCurrencies();
        }
    }, [token, router]);

    const handleCreateCurrency = async () => {
        setIsSubmitting(true); // Start button loading
        setError(null);
        setSuccessMessage(null);
        try {
            await axios.post('/admin/currencies', { code: newCurrencyCode }, { // Correct API path - /api/admin/currencies
                headers: { Authorization: `Bearer ${token}` },
            });
            setNewCurrencyCode('');
            fetchCurrenciesList();
            setSuccessMessage('Currency created successfully!'); // Set success message
        } catch (err) {
            console.error("An error occurred while creating currency:", err);
            // setError("An error occurred while creating currency."); // Commented out setError
            setSuccessMessage(null);
        } finally {
            setIsSubmitting(false); // End button loading
        }
    };

    const handleUpdateCurrency = async () => {
        setIsSubmitting(true); // Start button loading
        setError(null);
        setSuccessMessage(null);
        try {
            await axios.put(`/admin/currencies/${editingCurrencyId}`, { code: editingCurrencyCode }, { // Correct API path - /api/admin/currencies
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingCurrencyId(null);
            setEditingCurrencyCode('');
            fetchCurrenciesList();
            setSuccessMessage('Currency updated successfully!'); // Set success message
        } catch (err) {
            console.error("An error occurred while updating currency:", err);
            // setError("An error occurred while updating currency."); // Commented out setError
            setSuccessMessage(null);
        } finally {
            setIsSubmitting(false); // End button loading
        }
    };

    const handleDeleteCurrency = async (currencyId) => {
        setIsSubmitting(true); // Start button loading
        setError(null);
        setSuccessMessage(null);
        try {
            await axios.delete(`/admin/currencies/${currencyId}`, { // Correct API path - /api/admin/currencies
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCurrenciesList();
            setSuccessMessage('Currency deleted successfully!'); // Set success message
        } catch (err) {
            console.error("An error occurred while deleting currency:", err);
            // setError("An error occurred while deleting currency."); // Commented out setError
            setSuccessMessage(null);
        } finally {
            setIsSubmitting(false); // End button loading
        }
    };

    const fetchCurrenciesList = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('/admin/currencies', { // Correct API path - /api/admin/currencies
                headers: { Authorization: `Bearer ${token}` },
            });
            setCurrencies(response.data);
            setIsLoading(false);
        } catch (err) {
            console.error("An error occurred while fetching currency list:", err);
            // setError("An error occurred while loading currencies list."); // Commented out setError
            setIsLoading(false);
        }
    };

    const startEditing = (currency) => {
        setEditingCurrencyId(currency._id);
        setEditingCurrencyCode(currency.code);
    };

    const cancelEditing = () => {
        setEditingCurrencyId(null);
        setEditingCurrencyCode('');
        setError(null); // Clear any previous errors when cancelling edit
    };

    if (isLoading) {
        return <div className="p-4"><Skeleton count={5} className="h-8 mb-2" /></div>; // Skeleton loading
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Currency Management</h1>

            {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {successMessage}</span>
            </div>}

            {/* Create Currency Form */}
            <div className="mb-6 p-4 border rounded shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Add New Currency</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Currency Code (e.g., USD)"
                        value={newCurrencyCode}
                        onChange={(e) => setNewCurrencyCode(e.target.value.toUpperCase())}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                        onClick={handleCreateCurrency}
                        disabled={isSubmitting}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {isSubmitting ? 'Adding...' : 'Add Currency'}
                    </button>
                </div>
            </div>

            {/* Currency List */}
            <div className="overflow-x-auto">
                <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Code
                            </th>
                            <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currencies && currencies.map(currency => ( // Add conditional rendering here
                            <tr key={currency._id}>
                                <td className="px-5 py-5 border-b whitespace-nowrap text-sm">
                                    {editingCurrencyId === currency._id ? (
                                        <input
                                            type="text"
                                            value={editingCurrencyCode}
                                            onChange={(e) => setEditingCurrencyCode(e.target.value.toUpperCase())}
                                            className="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    ) : (
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {currency.code}
                                        </p>
                                    )}
                                </td>
                                <td className="px-5 py-5 border-b whitespace-nowrap text-sm">
                                    {editingCurrencyId === currency._id ? (
                                        <>
                                            <button
                                                onClick={handleUpdateCurrency}
                                                disabled={isSubmitting}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mr-2"
                                            >
                                                {isSubmitting ? 'Saving...' : 'Save'}
                                            </button>
                                            <button
                                                onClick={cancelEditing}
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Link href={`/admin/currencies/${currency._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                Edit Details
                                            </Link>
                                            <button
                                                onClick={() => startEditing(currency)}
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Edit Code
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCurrency(currency._id)}
                                                disabled={isSubmitting}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCurrenciesPage;