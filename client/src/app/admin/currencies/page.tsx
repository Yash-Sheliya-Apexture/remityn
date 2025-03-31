// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component
// import Link from 'next/link';
// import apiConfig from '../../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const AdminCurrenciesPage = () => {
//     const [currencies, setCurrencies] = useState([]); // Initialize as empty array
//     const [newCurrencyCode, setNewCurrencyCode] = useState('');
//     const [editingCurrencyId, setEditingCurrencyId] = useState(null);
//     const [editingCurrencyCode, setEditingCurrencyCode] = useState('');
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false); // For button loading states
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const { token } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         const fetchCurrencies = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get('/admin/currencies', { // Correct API path - /api/admin/currencies
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 console.log("API Response Data:", response.data); // Debug: Log API response
//                 setCurrencies(response.data);
//                 setIsLoading(false);
//             } catch (err) {
//                 console.error("An error occurred while fetching currencies:", err);
//                 // setError("An error occurred while loading currencies."); // Commented out setError
//                 setIsLoading(false);
//                 if (err.response?.status === 403 || err.response?.status === 401) {
//                     router.push('/auth/login');
//                 }
//             }
//         };

//         if (token) {
//             fetchCurrencies();
//         }
//     }, [token, router]);

//     const handleCreateCurrency = async () => {
//         setIsSubmitting(true); // Start button loading
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await axios.post('/admin/currencies', { code: newCurrencyCode }, { // Correct API path - /api/admin/currencies
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setNewCurrencyCode('');
//             fetchCurrenciesList();
//             setSuccessMessage('Currency created successfully!'); // Set success message
//         } catch (err) {
//             console.error("An error occurred while creating currency:", err);
//             // setError("An error occurred while creating currency."); // Commented out setError
//             setSuccessMessage(null);
//         } finally {
//             setIsSubmitting(false); // End button loading
//         }
//     };

//     const handleUpdateCurrency = async () => {
//         setIsSubmitting(true); // Start button loading
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await axios.put(`/admin/currencies/${editingCurrencyId}`, { code: editingCurrencyCode }, { // Correct API path - /api/admin/currencies
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setEditingCurrencyId(null);
//             setEditingCurrencyCode('');
//             fetchCurrenciesList();
//             setSuccessMessage('Currency updated successfully!'); // Set success message
//         } catch (err) {
//             console.error("An error occurred while updating currency:", err);
//             // setError("An error occurred while updating currency."); // Commented out setError
//             setSuccessMessage(null);
//         } finally {
//             setIsSubmitting(false); // End button loading
//         }
//     };

//     const handleDeleteCurrency = async (currencyId) => {
//         setIsSubmitting(true); // Start button loading
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await axios.delete(`/admin/currencies/${currencyId}`, { // Correct API path - /api/admin/currencies
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             fetchCurrenciesList();
//             setSuccessMessage('Currency deleted successfully!'); // Set success message
//         } catch (err) {
//             console.error("An error occurred while deleting currency:", err);
//             // setError("An error occurred while deleting currency."); // Commented out setError
//             setSuccessMessage(null);
//         } finally {
//             setIsSubmitting(false); // End button loading
//         }
//     };

//     const fetchCurrenciesList = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get('/admin/currencies', { // Correct API path - /api/admin/currencies
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setCurrencies(response.data);
//             setIsLoading(false);
//         } catch (err) {
//             console.error("An error occurred while fetching currency list:", err);
//             // setError("An error occurred while loading currencies list."); // Commented out setError
//             setIsLoading(false);
//         }
//     };

//     const startEditing = (currency) => {
//         setEditingCurrencyId(currency._id);
//         setEditingCurrencyCode(currency.code);
//     };

//     const cancelEditing = () => {
//         setEditingCurrencyId(null);
//         setEditingCurrencyCode('');
//         setError(null); // Clear any previous errors when cancelling edit
//     };

//     if (isLoading) {
//         return <div className="p-4"><Skeleton count={5} className="h-8 mb-2" /></div>; // Skeleton loading
//     }

//     if (error) {
//         return <div className="text-red-500 p-4">{error}</div>;
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-6">Admin Currency Management</h1>

//             {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
//                 <strong className="font-bold">Success!</strong>
//                 <span className="block sm:inline"> {successMessage}</span>
//             </div>}

//             {/* Create Currency Form */}
//             <div className="mb-6 p-4 border rounded shadow-sm">
//                 <h2 className="text-lg font-semibold mb-3">Add New Currency</h2>
//                 <div className="flex gap-2">
//                     <input
//                         type="text"
//                         placeholder="Currency Code (e.g., USD)"
//                         value={newCurrencyCode}
//                         onChange={(e) => setNewCurrencyCode(e.target.value.toUpperCase())}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     />
//                     <button
//                         onClick={handleCreateCurrency}
//                         disabled={isSubmitting}
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
//                     >
//                         {isSubmitting ? 'Adding...' : 'Add Currency'}
//                     </button>
//                 </div>
//             </div>

//             {/* Currency List */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
//                     <thead>
//                         <tr>
//                             <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                 Code
//                             </th>
//                             <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                 Actions
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currencies && currencies.map(currency => ( // Add conditional rendering here
//                             <tr key={currency._id}>
//                                 <td className="px-5 py-5 border-b whitespace-nowrap text-sm">
//                                     {editingCurrencyId === currency._id ? (
//                                         <input
//                                             type="text"
//                                             value={editingCurrencyCode}
//                                             onChange={(e) => setEditingCurrencyCode(e.target.value.toUpperCase())}
//                                             className="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                         />
//                                     ) : (
//                                         <p className="text-gray-900 whitespace-no-wrap">
//                                             {currency.code}
//                                         </p>
//                                     )}
//                                 </td>
//                                 <td className="px-5 py-5 border-b whitespace-nowrap text-sm">
//                                     {editingCurrencyId === currency._id ? (
//                                         <>
//                                             <button
//                                                 onClick={handleUpdateCurrency}
//                                                 disabled={isSubmitting}
//                                                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mr-2"
//                                             >
//                                                 {isSubmitting ? 'Saving...' : 'Save'}
//                                             </button>
//                                             <button
//                                                 onClick={cancelEditing}
//                                                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <div className="flex gap-2">
//                                             <Link href={`/admin/currencies/${currency._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                                                 Edit Details
//                                             </Link>
//                                             <button
//                                                 onClick={() => startEditing(currency)}
//                                                 className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                             >
//                                                 Edit Code
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDeleteCurrency(currency._id)}
//                                                 disabled={isSubmitting}
//                                                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
//                                             >
//                                                 {isSubmitting ? 'Deleting...' : 'Delete'}
//                                             </button>
//                                         </div>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminCurrenciesPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import { Modal } from "@/components/ui/Modal";

// axios.defaults.baseURL = apiConfig.baseUrl;

// const AdminCurrenciesPage = () => {
//   const [currencies, setCurrencies] = useState([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [newCurrencyData, setNewCurrencyData] = useState({
//     code: "",
//     currencyName: "",
//     flagImage: "", // Add flagImage to state
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState(null);
//   const [editingCurrencyCode, setEditingCurrencyCode] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     fetchCurrenciesList();
//   }, [token, router]);

//   const fetchCurrenciesList = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//       setIsLoading(false);
//     } catch (err) {
//       console.error("An error occurred while fetching currencies:", err);
//       setIsLoading(false);
//       if (err.response?.status === 403 || err.response?.status === 401) {
//         router.push("/auth/login");
//       }
//     }
//   };

//   const handleCreateCurrency = async () => {
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.post("/admin/currencies", newCurrencyData, {
//         // Send newCurrencyData directly
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCurrencyData({ code: "", currencyName: "", flagImage: "" }); // Reset form, include flagImage
//       fetchCurrenciesList();
//       setSuccessMessage("Currency created successfully!");
//       setIsCreateModalOpen(false);
//     } catch (err: any) {
//       console.error("An error occurred while creating currency:", err);
//       setError(err.response?.data?.message || "Failed to create currency");
//       setSuccessMessage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdateCurrency = async () => {
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(
//         `/admin/currencies/${editingCurrencyId}`,
//         { code: editingCurrencyCode },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setEditingCurrencyId(null);
//       setEditingCurrencyCode("");
//       fetchCurrenciesList();
//       setSuccessMessage("Currency updated successfully!");
//     } catch (err) {
//       console.error("An error occurred while updating currency:", err);
//       setSuccessMessage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteCurrency = async (currencyId) => {
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.delete(`/admin/currencies/${currencyId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCurrenciesList();
//       setSuccessMessage("Currency deleted successfully!");
//     } catch (err) {
//       console.error("An error occurred while deleting currency:", err);
//       setSuccessMessage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const startEditing = (currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingCurrencyCode(currency.code);
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingCurrencyCode("");
//     setError(null);
//   };

//   const handleInputChange = (e) => {
//     setNewCurrencyData({ ...newCurrencyData, [e.target.name]: e.target.value });
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <Skeleton count={5} className="h-8 mb-2" />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 p-6">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         Admin Currency Management
//       </h1>

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
//           role="alert"
//         >
//           <strong className="font-bold">Success!</strong>
//           <span className="block sm:inline"> {successMessage}</span>
//         </div>
//       )}

//       {/* Create Currency Button - Opens Modal */}
//       <div className="mb-8">
//         <button
//           onClick={() => setIsCreateModalOpen(true)}
//           className="bg-primary hover:bg-primary-hover cursor-pointer font-medium text-secondary py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-300"
//         >
//           Add New Currency
//         </button>
//       </div>

//       {/* Currency List */}
//       <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
//         <table className="min-w-full leading-normal">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                 Code
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                 Currency Name
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                 Flag Image
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currencies &&
//               currencies.map((currency) => (
//                 <tr key={currency._id}>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="text"
//                         value={editingCurrencyCode}
//                         onChange={(e) =>
//                           setEditingCurrencyCode(e.target.value.toUpperCase())
//                         }
//                         className="shadow-sm border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                       />
//                     ) : (
//                       <p className="text-gray-900 whitespace-no-wrap">
//                         {currency.code}
//                       </p>
//                     )}
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <p className="text-gray-900 whitespace-no-wrap">
//                       {currency.currencyName}
//                     </p>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     {currency.flagImage && (
//                       <img
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         className="h-8 w-12 object-contain"
//                       />
//                     )}
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     {editingCurrencyId === currency._id ? (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={handleUpdateCurrency}
//                           disabled={isSubmitting}
//                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
//                         >
//                           {isSubmitting ? "Saving..." : "Save"}
//                         </button>
//                         <button
//                           onClick={cancelEditing}
//                           className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex gap-2">
//                         <Link
//                           href={`/admin/currencies/${currency._id}`}
//                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
//                         >
//                           Edit Details
//                         </Link>
//                         <button
//                           onClick={() => startEditing(currency)}
//                           className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
//                         >
//                           Edit Code
//                         </button>
//                         <button
//                           onClick={() => handleDeleteCurrency(currency._id)}
//                           disabled={isSubmitting}
//                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
//                         >
//                           {isSubmitting ? "Deleting..." : "Delete"}
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Create Currency Modal */}
//       <Modal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//       >
//         <div className="w-full rounded-lg bg-white text-left">
//           <h2 className="lg:text-2xl text-xl font-semibold mb-4">
//             Add New Currency
//           </h2>
//           <div className="mb-4">
//             <label
//               htmlFor="code"
//               className="inline-block lg:text-base text-sm text-main font-medium mb-1"
//             >
//               Currency Code
//             </label>
//             <input
//               type="text"
//               id="code"
//               name="code"
//               value={newCurrencyData.code}
//               onChange={handleInputChange}
//               className="appearance-none w-full border rounded-md p-3.5 text-main leading-tight hover:shadow-color transition-shadow duration-300 ease-in-out focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="currencyName"
//               className="inline-block lg:text-base text-sm text-main font-medium mb-1"
//             >
//               Currency Name
//             </label>
//             <input
//               type="text"
//               id="currencyName"
//               name="currencyName"
//               value={newCurrencyData.currencyName}
//               onChange={handleInputChange}
//               className="appearance-none border rounded-md w-full p-3.5 text-main leading-tight hover:shadow-color transition-shadow duration-300 ease-in-out focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="flagImage"
//               className="inline-block lg:text-base text-sm text-main font-medium mb-1"
//             >
//               Flag Image Path (e.g., /assets/flags/usd.png)
//             </label>
//             <input
//               type="text"
//               id="flagImage"
//               name="flagImage"
//               value={newCurrencyData.flagImage}
//               onChange={handleInputChange}
//               placeholder="/assets/flags/currency-code.png"
//               className="appearance-none border rounded-md w-full p-3.5 text-main leading-tight hover:shadow-color transition-shadow duration-300 ease-in-out focus:outline-none"
//             />
//           </div>

//           {error && <p className="text-red-500">{error}</p>}

//           <div className="flex flex-col gap-2.5 justify-end">
//             <button
//               onClick={handleCreateCurrency}
//               disabled={isSubmitting}
//               className="bg-primary hover:bg-primary-hover cursor-pointer rounded-full lg:text-lg text-base text-white font-medium  lg:p-3 p-2 focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
//             >
//               {isSubmitting ? "Adding..." : "Add Currency"}
//             </button>
//             <button
//               className="lg:p-3 p-2 border border-error hover:bg-error hover:text-white transition-colors text-base ease-in-out duration-300 text-error font-medium lg:text-lg cursor-pointer rounded-full"
//               onClick={() => setIsCreateModalOpen(false)}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import { Modal } from "@/components/ui/Modal";
// import { ChangeEvent } from "react";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string; // Optional flag image
//   // ... other properties if any
// }

// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
// }

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "",
//     currencyName: "",
//     flagImage: "", // Add flagImage to state
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
//     null
//   );
//   const [editingCurrencyCode, setEditingCurrencyCode] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     fetchCurrenciesList();
//   }, [token, router]);

//   const fetchCurrenciesList = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//       setIsLoading(false);
//     } catch (err: any) {
//       console.error("An error occurred while fetching currencies:", err);
//       setIsLoading(false);
//       if (err.response?.status === 403 || err.response?.status === 401) {
//         router.push("/auth/login");
//       }
//     }
//   };

//   const handleCreateCurrency = async () => {
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.post("/admin/currencies", newCurrencyData, {
//         // Send newCurrencyData directly
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCurrencyData({ code: "", currencyName: "", flagImage: "" }); // Reset form, include flagImage
//       fetchCurrenciesList();
//       setSuccessMessage("Currency created successfully!");
//       setIsCreateModalOpen(false);
//     } catch (err: any) {
//       console.error("An error occurred while creating currency:", err);
//       setError(err.response?.data?.message || "Failed to create currency");
//       setSuccessMessage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdateCurrency = async () => {
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(
//         `/admin/currencies/${editingCurrencyId}`,
//         { code: editingCurrencyCode },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setEditingCurrencyId(null);
//       setEditingCurrencyCode("");
//       fetchCurrenciesList();
//       setSuccessMessage("Currency updated successfully!");
//     } catch (err: any) {
//       console.error("An error occurred while updating currency:", err);
//       setSuccessMessage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteCurrency = async (currencyId: string) => {
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.delete(`/admin/currencies/${currencyId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCurrenciesList();
//       setSuccessMessage("Currency deleted successfully!");
//     } catch (err: any) {
//       console.error("An error occurred while deleting currency:", err);
//       setSuccessMessage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingCurrencyCode(currency.code);
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingCurrencyCode("");
//     setError(null);
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setNewCurrencyData({ ...newCurrencyData, [e.target.name]: e.target.value });
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <Skeleton count={5} className="h-8 mb-2" />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 p-6">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         Admin Currency Management
//       </h1>

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
//           role="alert"
//         >
//           <strong className="font-bold">Success!</strong>
//           <span className="block sm:inline"> {successMessage}</span>
//         </div>
//       )}

//       {/* Create Currency Button - Opens Modal */}
//       <div className="mb-8">
//         <button
//           onClick={() => setIsCreateModalOpen(true)}
//           className="bg-primary hover:bg-primary-hover cursor-pointer font-medium text-secondary py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-300"
//         >
//           Add New Currency
//         </button>
//       </div>

//       {/* Currency List */}
//       <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
//         <table className="min-w-full leading-normal">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                 Code
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                 Currency Name
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                 Flag Image
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currencies &&
//               currencies.map((currency) => (
//                 <tr key={currency._id}>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="text"
//                         value={editingCurrencyCode}
//                         onChange={(e) =>
//                           setEditingCurrencyCode(e.target.value.toUpperCase())
//                         }
//                         className="shadow-sm border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                       />
//                     ) : (
//                       <p className="text-gray-900 whitespace-no-wrap">
//                         {currency.code}
//                       </p>
//                     )}
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <p className="text-gray-900 whitespace-no-wrap">
//                       {currency.currencyName}
//                     </p>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     {currency.flagImage && (
//                       <img
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         className="h-8 w-12 object-contain"
//                       />
//                     )}
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     {editingCurrencyId === currency._id ? (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={handleUpdateCurrency}
//                           disabled={isSubmitting}
//                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
//                         >
//                           {isSubmitting ? "Saving..." : "Save"}
//                         </button>
//                         <button
//                           onClick={cancelEditing}
//                           className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex gap-2">
//                         <Link
//                           href={`/admin/currencies/${currency._id}`}
//                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
//                         >
//                           Edit Details
//                         </Link>
//                         <button
//                           onClick={() => startEditing(currency)}
//                           className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
//                         >
//                           Edit Code
//                         </button>
//                         <button
//                           onClick={() => handleDeleteCurrency(currency._id)}
//                           disabled={isSubmitting}
//                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
//                         >
//                           {isSubmitting ? "Deleting..." : "Delete"}
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Create Currency Modal */}
//       <Modal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//       >
//         <div className="w-full rounded-lg bg-white text-left">
//           <h2 className="lg:text-2xl text-xl font-semibold mb-4">
//             Add New Currency
//           </h2>
//           <div className="mb-4">
//             <label
//               htmlFor="code"
//               className="inline-block lg:text-base text-sm text-main font-medium mb-1"
//             >
//               Currency Code
//             </label>
//             <input
//               type="text"
//               id="code"
//               name="code"
//               value={newCurrencyData.code}
//               onChange={handleInputChange}
//               className="appearance-none w-full border rounded-md p-3.5 text-main leading-tight hover:shadow-color transition-shadow duration-300 ease-in-out focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="currencyName"
//               className="inline-block lg:text-base text-sm text-main font-medium mb-1"
//             >
//               Currency Name
//             </label>
//             <input
//               type="text"
//               id="currencyName"
//               name="currencyName"
//               value={newCurrencyData.currencyName}
//               onChange={handleInputChange}
//               className="appearance-none border rounded-md w-full p-3.5 text-main leading-tight hover:shadow-color transition-shadow duration-300 ease-in-out focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="flagImage"
//               className="inline-block lg:text-base text-sm text-main font-medium mb-1"
//             >
//               Flag Image Path (e.g., /assets/flags/usd.png)
//             </label>
//             <input
//               type="text"
//               id="flagImage"
//               name="flagImage"
//               value={newCurrencyData.flagImage}
//               onChange={handleInputChange}
//               placeholder="/assets/flags/currency-code.png"
//               className="appearance-none border rounded-md w-full p-3.5 text-main leading-tight hover:shadow-color transition-shadow duration-300 ease-in-out focus:outline-none"
//             />
//           </div>

//           {error && <p className="text-red-500">{error}</p>}

//           <div className="flex flex-col gap-2.5 justify-end">
//             <button
//               onClick={handleCreateCurrency}
//               disabled={isSubmitting}
//               className="bg-primary hover:bg-primary-hover cursor-pointer rounded-full lg:text-lg text-base text-white font-medium  lg:p-3 p-2 focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
//             >
//               {isSubmitting ? "Adding..." : "Add Currency"}
//             </button>
//             <button
//               className="lg:p-3 p-2 border border-error hover:bg-error hover:text-white transition-colors text-base ease-in-out duration-300 text-error font-medium lg:text-lg cursor-pointer rounded-full"
//               onClick={() => setIsCreateModalOpen(false)}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// New Design-1

// "use client";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import { Modal } from "@/components/ui/Modal";
// import { ChangeEvent } from "react";
// import { PencilIcon, SaveIcon, TrashIcon } from "lucide-react";
// import { GiCancel } from "react-icons/gi";
// import { IoIosAddCircle } from "react-icons/io";
// import { FaPlusSquare, FaSave } from "react-icons/fa";
// import { IoAddCircle } from "react-icons/io5";
// import { AiOutlineEdit, AiOutlineInfoCircle } from "react-icons/ai";
// import Image from "next/image";
// import { MdInfoOutline } from "react-icons/md";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string;
// }

// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
// }

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "",
//     currencyName: "",
//     flagImage: "",
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
//     null
//   );
//   const [editingCurrencyCode, setEditingCurrencyCode] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();
//   const router = useRouter();
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );

//   useEffect(() => {
//     fetchCurrenciesList();
//   }, [token, router]);

//   const fetchCurrenciesList = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//       setIsLoading(false);
//     } catch (err: any) {
//       console.error("An error occurred while fetching currencies:", err);
//       setIsLoading(false);
//       if (err.response?.status === 403 || err.response?.status === 401) {
//         router.push("/auth/login");
//       }
//     }
//   };

//   const handleCreateCurrency = async () => {
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.post("/admin/currencies", newCurrencyData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCurrencyData({ code: "", currencyName: "", flagImage: "" });
//       fetchCurrenciesList();
//       setSuccessMessage("Currency created successfully!");
//       setIsCreateModalOpen(false);
//     } catch (err: any) {
//       console.error("An error occurred while creating currency:", err);
//       setError(err.response?.data?.message || "Failed to create currency");
//       setSuccessMessage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdateCurrency = async () => {
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(
//         `/admin/currencies/${editingCurrencyId}`,
//         { code: editingCurrencyCode },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setEditingCurrencyId(null);
//       setEditingCurrencyCode("");
//       fetchCurrenciesList();
//       setSuccessMessage("Currency updated successfully!");
//     } catch (err: any) {
//       console.error("An error occurred while updating currency:", err);
//       setSuccessMessage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCurrenciesList();
//       setSuccessMessage("Currency deleted successfully!");
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//     } catch (err: any) {
//       console.error("An error occurred while deleting currency:", err);
//       setSuccessMessage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingCurrencyCode(currency.code);
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingCurrencyCode("");
//     setError(null);
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setNewCurrencyData({ ...newCurrencyData, [e.target.name]: e.target.value });
//   };

//   const openDeleteConfirmation = (currencyId: string) => {
//     setCurrencyToDeleteId(currencyId);
//     setIsDeleteConfirmationOpen(true);
//   };

//   const closeDeleteConfirmation = () => {
//     setIsDeleteConfirmationOpen(false);
//     setCurrencyToDeleteId(null);
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <Skeleton count={5} className="h-8 mb-2" />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 p-6">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-medium mb-6 text-main">
//         Admin Currency Management
//       </h1>

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
//           role="alert"
//         >
//           <strong className="font-bold">Success!</strong>
//           <span className="block sm:inline"> {successMessage}</span>
//         </div>
//       )}

//       {/* Create Currency Button */}
//       <div className="mb-8 flex">
//         <button
//           onClick={() => setIsCreateModalOpen(true)}
//           className="bg-primary flex items-center gap-1.5 hover:bg-primary-hover cursor-pointer text-secondary font-medium py-2.5 px-4 rounded-md focus:outline-none transition-colors duration-300"
//         >
//           <IoAddCircle className="size-7 text-secondary " />
//           Add New Currency
//         </button>
//       </div>

//       {/* Currency List - Redesigned Table */}

//       <div className="overflow-x-auto mt-10 bg-white shadow-md rounded-lg border border-gray-300 w-fit mx-auto">
//         <table className="border-collapse divide-y divide-gray-300 w-full">
//           <thead>
//             <tr className="bg-sky-300 text-secondary text-sm text-left">
//               <th scope="col" className="px-8 py-4 uppercase tracking-wider">
//                 Code
//               </th>
//               <th scope="col" className="px-8 py-4 uppercase tracking-wider">
//                 Currency Name
//               </th>
//               <th scope="col" className="px-8 py-4 uppercase tracking-wider">
//                 Flag Image
//               </th>
//               <th scope="col" className="px-8 py-4 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-300">
//             {currencies &&
//               currencies.map((currency) => (
//                 <tr
//                   key={currency._id}
//                   className="hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <td className="px-4 py-4 whitespace-nowrap font-medium text-main">
//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="text"
//                         value={editingCurrencyCode}
//                         onChange={(e) =>
//                           setEditingCurrencyCode(e.target.value.toUpperCase())
//                         }
//                         className="border hover:shadow-color transition-shadow duration-300 ease-in border-gray-300 inline-block font-medium rounded-md py-3 px-2 text-main leading-tight focus:outline-none"
//                       />
//                     ) : (
//                       <div className="text-main font-medium">
//                         {currency.code}
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-8 py-4 whitespace-nowrap text-main font-medium">
//                     {currency.currencyName}
//                   </td>
//                   <td className="px-8 py-4 whitespace-nowrap">
//                     {currency.flagImage && (
//                       <img
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         className="h-8 w-12 object-contain rounded"
//                       />
//                     )}
//                   </td>
//                   <td className="px-8 py-4 whitespace-nowrap text-sm">
//                     {editingCurrencyId === currency._id ? (
//                       <div className="flex gap-4">
//                         <button
//                           onClick={handleUpdateCurrency}
//                           disabled={isSubmitting}
//                           className="inline-flex gap-1.5 w-full justify-center items-center cursor-pointer px-5 py-2.5 border border-transparent font-medium rounded-md text-white bg-blue-500 focus:outline-none transition-colors duration-200"
//                         >
//                           <FaSave className="size-5" /> Save
//                         </button>
//                         <button
//                           onClick={cancelEditing}
//                           className="inline-flex gap-1.5 w-full justify-center items-center cursor-pointer px-5 py-2.5 border border-transparent text-white rounded-md font-medium bg-error focus:outline-none transition-colors duration-200"
//                         >
//                           <GiCancel className="size-5" /> Cancel
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex gap-4">
//                         <Link
//                           href={`/admin/currencies/${currency._id}`}
//                           className="inline-flex gap-1.5 items-center px-5 py-2.5 border border-sky-700 rounded-md text-sm font-medium text-sky-700 bg-white hover:bg-blue-50 focus:outline-none transition-colors duration-200"
//                         >
//                           <MdInfoOutline className="size-5" /> Details
//                         </Link>
//                         <button
//                           onClick={() => startEditing(currency)}
//                           className="inline-flex gap-1.5 items-center px-5 py-2.5 border cursor-pointer border-yellow-700 rounded-md text-sm font-medium text-yellow-700 bg-white hover:bg-yellow-50 focus:outline-none transition-colors duration-200"
//                         >
//                           <AiOutlineEdit className="size-5" /> Edit Code
//                         </button>
//                         <button
//                           onClick={() => openDeleteConfirmation(currency._id)}
//                           disabled={isSubmitting}
//                           className="inline-flex gap-1.5 items-center px-5 py-2.5 border cursor-pointer border-red-700 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none transition-colors duration-200"
//                         >
//                           <TrashIcon className="size-5" /> Delete
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Create Currency Modal */}
//       <Modal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//       >
//         <div className="w-full rounded-lg bg-white text-left">
//           <h2 className="lg:text-2xl text-xl font-semibold mb-4">
//             Add New Currency
//           </h2>
//           <div className="mb-4">
//             <label
//               htmlFor="code"
//               className="inline-block lg:text-base text-sm text-main font-medium mb-1"
//             >
//               Currency Code
//             </label>
//             <input
//               type="text"
//               id="code"
//               name="code"
//               value={newCurrencyData.code}
//               onChange={handleInputChange}
//               className="appearance-none w-full border rounded-md p-3.5 text-main leading-tight hover:shadow-color transition-shadow duration-300 ease-in-out focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="currencyName"
//               className="inline-block lg:text-base text-sm text-main font-medium mb-1"
//             >
//               Currency Name
//             </label>
//             <input
//               type="text"
//               id="currencyName"
//               name="currencyName"
//               value={newCurrencyData.currencyName}
//               onChange={handleInputChange}
//               className="appearance-none border rounded-md w-full p-3.5 text-main leading-tight hover:shadow-color transition-shadow duration-300 ease-in-out focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="flagImage"
//               className="inline-block lg:text-base text-sm text-main font-medium mb-1"
//             >
//               Flag Image Path (e.g., /assets/flags/usd.png)
//             </label>
//             <input
//               type="text"
//               id="flagImage"
//               name="flagImage"
//               value={newCurrencyData.flagImage}
//               onChange={handleInputChange}
//               placeholder="/assets/flags/currency-code.png"
//               className="appearance-none border rounded-md w-full p-3.5 text-main leading-tight hover:shadow-color transition-shadow duration-300 ease-in-out focus:outline-none"
//             />
//           </div>

//           {error && <p className="text-red-500">{error}</p>}

//           <div className="flex flex-col gap-2.5 justify-end mt-6">
//             <button
//               onClick={handleCreateCurrency}
//               disabled={isSubmitting}
//               className="bg-primary hover:bg-primary-hover cursor-pointer rounded-full lg:text-lg text-base text-white font-medium  lg:p-3 p-2 focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
//             >
//               {isSubmitting ? "Adding..." : "Add Currency"}
//             </button>
//             <button
//               className="lg:p-3 p-2 border border-error hover:bg-error hover:text-white transition-colors text-base ease-in-out duration-300 text-error font-medium lg:text-lg cursor-pointer rounded-full"
//               onClick={() => setIsCreateModalOpen(false)}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         isOpen={isDeleteConfirmationOpen}
//         onClose={closeDeleteConfirmation}
//       >
//         <div className="w-full rounded-lg bg-white text-left flex flex-col justify-center items-center space-y-3.5 ">
//           <Image
//             src="/assets/images/exclamation-mark-medium@2x.webp"
//             width={180}
//             height={180}
//             alt="error message"
//           />
//           <h2 className="lg:text-2xl text-xl font-medium text-center">
//             You are sure to delete this currency ?
//           </h2>
//           <div className="flex flex-col w-full justify-center gap-4 mt-6">
//             <button
//               onClick={handleDeleteCurrency}
//               disabled={isSubmitting}
//               className="px-4 py-3 w-full border cursor-pointer border-transparent text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none transition-colors duration-300"
//             >
//               Delete Currency
//             </button>
//             <button
//               onClick={closeDeleteConfirmation}
//               className="px-4 py-3 w-full border cursor-pointer border-gray-300 rounded-full text-sm font-medium text-main bg-white hover:bg-gray-50 focus:outline-none transition-colors duration-300"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiConfig from "../../config/apiConfig";
import Image from "next/image";
import {
  Loader2,
  PlusCircle,
  Search,
  Info,
  Edit,
  Trash2,
  Save,
  X,
  AlertTriangle,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegSave } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IoClose, IoWarningOutline } from "react-icons/io5";

axios.defaults.baseURL = apiConfig.baseUrl;

interface Currency {
  _id: string;
  code: string;
  currencyName: string;
  flagImage?: string;
}

interface NewCurrencyData {
  code: string;
  currencyName: string;
  flagImage: string;
}

const AdminCurrenciesPage: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
    code: "",
    currencyName: "",
    flagImage: "",
  });
  const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
    null
  );
  const [editingCurrencyCode, setEditingCurrencyCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchCurrenciesList();
  }, [token, router]);

  useEffect(() => {
    // Auto-dismiss success message after 3 seconds
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchCurrenciesList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/admin/currencies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrencies(response.data);
    } catch (err: any) {
      console.error("Error fetching currencies:", err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        router.push("/auth/login");
      } else {
        setError(err.response?.data?.message || "Failed to load currencies");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCurrency = async () => {
    if (!newCurrencyData.code || !newCurrencyData.currencyName) {
      setError("Currency code and name are required");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await axios.post("/admin/currencies", newCurrencyData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewCurrencyData({ code: "", currencyName: "", flagImage: "" });
      await fetchCurrenciesList();
      setSuccessMessage("Currency added successfully");
      setIsCreateModalOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create currency");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCurrency = async () => {
    if (!editingCurrencyCode) {
      setError("Currency code cannot be empty");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await axios.put(
        `/admin/currencies/${editingCurrencyId}`,
        { code: editingCurrencyCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingCurrencyId(null);
      setEditingCurrencyCode("");
      await fetchCurrenciesList();
      setSuccessMessage("Currency updated successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update currency");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCurrency = async () => {
    if (!currencyToDeleteId) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCurrenciesList();
      setSuccessMessage("Currency deleted successfully");
      setIsDeleteConfirmationOpen(false);
      setCurrencyToDeleteId(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete currency");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (currency: Currency) => {
    setEditingCurrencyId(currency._id);
    setEditingCurrencyCode(currency.code);
  };

  const cancelEditing = () => {
    setEditingCurrencyId(null);
    setEditingCurrencyCode("");
  };

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.currencyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      {/* Header Section */}
      <div className="py-6 mb-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-main mb-2">
          Currency Management
        </h1>
        <p className="text-gray capitalize">
          Manage currency options for your application
        </p>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded shadow-lg flex items-center max-w-md"
          >
            <Check size={20} className="text-emerald-500 mr-3" />
            <p className="text-emerald-800">{successMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-center">
          <AlertTriangle size={20} className="text-red-500 mr-3" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-primary cursor-pointer font-medium hover:bg-primary-hover text-secondary py-3 px-4 rounded-lg transition duration-300"
        >
          <PlusCircle />
          <span>Add Currency</span>
        </button>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray" />
          </div>
          <input
            type="text"
            placeholder="Search currencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg border hover:shadow-color  transition-shadow ease-in-out duration-300 border-gray-300 font-medium text-main focus:outline-none"
          />
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 size={40} className="text-indigo-600 animate-spin" />
        </div>
      ) : filteredCurrencies.length === 0 ? (
        <div className="bg-white p-8 text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/assets/images/exclamation-mark-medium@2x.webp"
              width={100}
              height={100}
              alt="Searching Eroor"
              className="size-48"
            />
          </div>
          <h3 className="text-3xl capitalize font-semibold text-main mb-6">
            No currencies found
          </h3>
          <div className="flex justify-center">
            <p className="text-gray text-lg max-w-lg">
              {searchTerm ? "Try adjusting your search or" : "Get started by"}{" "}
              It seems we couldn't find any currencies at the moment. Please
              check back later or try adjusting your search.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCurrencies.map((currency) => (
            <div
              key={currency._id}
              className="bg-white rounded-xl overflow-hidden transition-all duration-200 border border-gray-300 shadow-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    {currency.flagImage ? (
                      <img
                        src={currency.flagImage}
                        alt={`${currency.currencyName} Flag`}
                        className="size-14 object-cover"
                      />
                    ) : (
                      <div className="size-14 border border-gray-300 rounded-full flex items-center justify-center text-xs text-main">
                        No flag
                      </div>
                    )}
                    <div>
                      {editingCurrencyId === currency._id ? (
                        <input
                          type="text"
                          value={editingCurrencyCode}
                          onChange={(e) =>
                            setEditingCurrencyCode(e.target.value.toUpperCase())
                          }
                          className="border-b border-primary bg-primary/10 p-1 font-bold text-main w-32 focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <h3 className="font-bold text-main">{currency.code}</h3>
                      )}
                      <p className="text-slate-500 mt-0.5">
                        {currency.currencyName}
                      </p>
                    </div>
                  </div>
                </div>

                {editingCurrencyId === currency._id ? (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleUpdateCurrency}
                      disabled={isSubmitting}
                      className="flex-1 flex justify-center items-center cursor-pointer gap-1.5 bg-primary hover:bg-primary-hover text-secondary font-medium py-2.5 px-3 rounded-md transition duration-200 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <FaRegSave size={20} />
                      )}
                      <span>Save</span>
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-error hover:bg-red-800 text-white py-2.5 px-3 rounded-md transition duration-200"
                    >
                      <MdError size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Link
                      href={`/admin/currencies/${currency._id}`}
                      className="flex-1 flex justify-center items-center gap-1.5 bg-blue-100  text-blue-700 font-medium py-2 px-3 rounded-sm transition duration-300"
                    >
                      <Info size={20} />
                      <span>Details</span>
                    </Link>
                    <button
                      onClick={() => startEditing(currency)}
                      className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-yellow-100 font-medium text-yellow-700 py-2 px-3 rounded-sm transition duration-300"
                    >
                      <Edit size={20} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrencyToDeleteId(currency._id);
                        setIsDeleteConfirmationOpen(true);
                      }}
                      className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-red-100 font-medium text-error py-2 px-3 rounded-sm transition duration-300"
                    >
                      <Trash2 size={20} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Currency Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lg:p-6 p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="lg:text-2xl font-medium text-main">
                  Add New Currency
                </h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-main hover:bg-green/10 lg:size-12 size-10 flex justify-center items-center transition rounded-full cursor-pointer"
                >
                  <IoClose className="lg:size-10 size-6 p-0.5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="code"
                    className="inline-block lg:text-base text-sm font-medium text-main mb-1"
                  >
                    Currency Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="e.g. USD"
                    value={newCurrencyData.code}
                    onChange={(e) =>
                      setNewCurrencyData({
                        ...newCurrencyData,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none"
                  />
                  <p className="mt-2 lg:text-sm text-xs text-main">
                    Enter the 3-letter currency code (e.g., USD, EUR, GBP)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="currencyName"
                    className="inline-block lg:text-base text-sm font-medium text-main mb-1"
                  >
                    Currency Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="currencyName"
                    name="currencyName"
                    placeholder="e.g. US Dollar"
                    value={newCurrencyData.currencyName}
                    onChange={(e) =>
                      setNewCurrencyData({
                        ...newCurrencyData,
                        currencyName: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="flagImage"
                    className="inline-block lg:text-base text-sm font-medium text-main mb-1"
                  >
                    Flag Image Path
                  </label>
                  <input
                    type="text"
                    id="flagImage"
                    name="flagImage"
                    placeholder="/assets/icon/flags/usd.png"
                    value={newCurrencyData.flagImage}
                    onChange={(e) =>
                      setNewCurrencyData({
                        ...newCurrencyData,
                        flagImage: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none"
                  />
                  <p className="mt-2 lg:text-sm text-xs text-main">
                    Path to the flag image (e.g., /assets/icon/flags/usd.png)
                  </p>
                </div>

                <div className="flex md:flex-row flex-col gap-3 pt-4">
                  <button
                    onClick={handleCreateCurrency}
                    disabled={
                      isSubmitting ||
                      !newCurrencyData.code ||
                      !newCurrencyData.currencyName
                    }
                    className="flex-1 flex justify-center items-center lg:text-lg gap-2 bg-primary text-gray hover:bg-primary-hover font-medium py-2.5 focus:outline-none px-4 rounded-lg transition-colors ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <PlusCircle size={20} />
                    )}
                    {isSubmitting ? "Adding..." : "Add Currency"}
                  </button>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 bg-error flex justify-center items-center gap-2 gap cursor-pointer font-medium text-white py-2.5 px-4 rounded-lg transition duration-300"
                  >
                    <IoWarningOutline size={20} />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-2xl shadow-md max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="size-20 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-500 size-10" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-main mb-4">
                Delete Currency
              </h2>
              <p className="text-gray text-lg leading-relaxed mb-6">
                Are you sure you want to delete this currency? This action
                cannot be undone.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDeleteCurrency}
                  disabled={isSubmitting}
                  className="flex-1 flex justify-center cursor-pointer items-center font-medium text-lg gap-2 bg-error  text-white py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Trash2 size={20} />
                  )}
                  {isSubmitting ? "Deleting..." : "Delete Currency"}
                </button>
                <button
                  onClick={() => {
                    setIsDeleteConfirmationOpen(false);
                    setCurrencyToDeleteId(null);
                  }}
                  className="flex-1 bg-slate-300 cursor-pointer text-gray text-lg font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCurrenciesPage;
