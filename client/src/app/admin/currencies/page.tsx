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

// "use client";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image";
// import {
//   Loader2,
//   PlusCircle,
//   Search,
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   X,
//   AlertTriangle,
//   Check,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaRegSave } from "react-icons/fa";
// import { MdError } from "react-icons/md";
// import { IoClose, IoWarningOutline } from "react-icons/io5";

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
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     fetchCurrenciesList();
//   }, [token, router]);

//   useEffect(() => {
//     // Auto-dismiss success message after 3 seconds
//     if (successMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const fetchCurrenciesList = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (err: any) {
//       console.error("Error fetching currencies:", err);
//       if (err.response?.status === 403 || err.response?.status === 401) {
//         router.push("/auth/login");
//       } else {
//         setError(err.response?.data?.message || "Failed to load currencies");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       setError("Currency code and name are required");
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);
//     try {
//       await axios.post("/admin/currencies", newCurrencyData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCurrencyData({ code: "", currencyName: "", flagImage: "" });
//       await fetchCurrenciesList();
//       setSuccessMessage("Currency added successfully");
//       setIsCreateModalOpen(false);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to create currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyCode) {
//       setError("Currency code cannot be empty");
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);
//     try {
//       await axios.put(
//         `/admin/currencies/${editingCurrencyId}`,
//         { code: editingCurrencyCode },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditingCurrencyId(null);
//       setEditingCurrencyCode("");
//       await fetchCurrenciesList();
//       setSuccessMessage("Currency updated successfully");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;

//     setIsSubmitting(true);
//     setError(null);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       await fetchCurrenciesList();
//       setSuccessMessage("Currency deleted successfully");
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to delete currency");
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
//   };

//   const filteredCurrencies = currencies.filter(
//     (currency) =>
//       currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       currency.currencyName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-4">
//       {/* Header Section */}
//       <div className="py-6 mb-6 border-b border-gray-300">
//         <h1 className="text-3xl font-bold text-main mb-2">
//           Currency Management
//         </h1>
//         <p className="text-gray capitalize">
//           Manage currency options for your application
//         </p>
//       </div>

//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed top-6 right-6 z-50 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded shadow-lg flex items-center max-w-md"
//           >
//             <Check size={20} className="text-emerald-500 mr-3" />
//             <p className="text-emerald-800">{successMessage}</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-center">
//           <AlertTriangle size={20} className="text-red-500 mr-3" />
//           <p className="text-red-700">{error}</p>
//         </div>
//       )}

//       {/* Action Bar */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <button
//           onClick={() => setIsCreateModalOpen(true)}
//           className="flex items-center gap-2 bg-primary cursor-pointer font-medium hover:bg-primary-hover text-secondary py-3 px-4 rounded-lg transition duration-300"
//         >
//           <PlusCircle />
//           <span>Add Currency</span>
//         </button>

//         {/* Search Bar */}
//         <div className="relative w-full md:w-64">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search size={20} className="text-gray" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search currencies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-3 w-full rounded-lg border hover:shadow-color  transition-shadow ease-in-out duration-300 border-gray-300 font-medium text-main focus:outline-none"
//           />
//         </div>
//       </div>

//       {/* Main Content */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <Loader2 size={40} className="text-primary animate-spin" />
//         </div>
//       ) : filteredCurrencies.length === 0 ? (
//         <div className="bg-white p-8 text-center">
//           <div className="mb-6 flex justify-center">
//             <Image
//               src="/assets/images/exclamation-mark-medium@2x.webp"
//               width={100}
//               height={100}
//               alt="Searching Eroor"
//               className="size-48"
//             />
//           </div>
//           <h3 className="text-3xl capitalize font-semibold text-main mb-6">
//             No currencies found
//           </h3>
//           <div className="flex justify-center">
//             <p className="text-gray text-lg max-w-lg">
//               {searchTerm ? "Try adjusting your search or" : "Get started by"}{" "}
//               It seems we couldn't find any currencies at the moment. Please
//               check back later or try adjusting your search.
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredCurrencies.map((currency) => (
//             <div
//               key={currency._id}
//               className="rounded-xl overflow-hidden transition-all duration-200 bg-green/5"
//             >
//               <div className="px-4 py-8">
//                 <div className="flex justify-between items-start mb-6">
//                   <div className="flex items-center gap-3">
//                     {currency.flagImage ? (
//                       <img
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         className="size-14 object-cover"
//                       />
//                     ) : (
//                       <div className="size-14 border border-gray-300 rounded-full flex items-center justify-center text-xs text-main">
//                         No flag
//                       </div>
//                     )}
//                     <div>
//                       {editingCurrencyId === currency._id ? (
//                         <input
//                           type="text"
//                           value={editingCurrencyCode}
//                           onChange={(e) =>
//                             setEditingCurrencyCode(e.target.value.toUpperCase())
//                           }
//                           className="border-b border-primary bg-primary/10 p-1 font-bold text-main w-32 focus:outline-none"
//                           autoFocus
//                         />
//                       ) : (
//                         <h3 className="font-bold text-main">{currency.code}</h3>
//                       )}
//                       <p className="text-slate-500 mt-0.5">
//                         {currency.currencyName}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {editingCurrencyId === currency._id ? (
//                   <div className="flex gap-2 mt-4">
//                     <button
//                       onClick={handleUpdateCurrency}
//                       disabled={isSubmitting}
//                       className="flex-1 flex justify-center items-center cursor-pointer gap-1.5 bg-primary hover:bg-primary-hover text-secondary font-medium py-2.5 px-3 rounded-md transition duration-200 disabled:opacity-50"
//                     >
//                       {isSubmitting ? (
//                         <Loader2 size={20} className="animate-spin" />
//                       ) : (
//                         <FaRegSave size={20} />
//                       )}
//                       <span>Save</span>
//                     </button>
//                     <button
//                       onClick={cancelEditing}
//                       className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-error hover:bg-red-800 text-white py-2.5 px-3 rounded-md transition duration-200"
//                     >
//                       <MdError size={20} />
//                       <span>Cancel</span>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col sm:flex-row gap-2 mt-4">
//                     <Link
//                       href={`/admin/currencies/${currency._id}`}
//                       className="flex-1 flex justify-center items-center gap-1.5 bg-blue-100  text-blue-700 font-medium py-2 px-3 rounded-sm transition duration-300"
//                     >
//                       <Info size={20} />
//                       <span>Details</span>
//                     </Link>
//                     <button
//                       onClick={() => startEditing(currency)}
//                       className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-yellow-100 font-medium text-yellow-700 py-2 px-3 rounded-sm transition duration-300"
//                     >
//                       <Edit size={20} />
//                       <span>Edit</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         setCurrencyToDeleteId(currency._id);
//                         setIsDeleteConfirmationOpen(true);
//                       }}
//                       className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-red-100 font-medium text-error py-2 px-3 rounded-sm transition duration-300"
//                     >
//                       <Trash2 size={20} />
//                       <span>Delete</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Create Currency Modal */}
//       {isCreateModalOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
//           <div
//             className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="lg:p-6 p-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="lg:text-2xl font-medium text-main">
//                   Add New Currency
//                 </h2>
//                 <button
//                   onClick={() => setIsCreateModalOpen(false)}
//                   className="text-main hover:bg-green/10 lg:size-12 size-10 flex justify-center items-center transition rounded-full cursor-pointer"
//                 >
//                   <IoClose className="lg:size-10 size-6 p-0.5" />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="code"
//                     className="inline-block lg:text-base text-sm font-medium text-main mb-1"
//                   >
//                     Currency Code <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="code"
//                     name="code"
//                     placeholder="e.g. USD"
//                     value={newCurrencyData.code}
//                     onChange={(e) =>
//                       setNewCurrencyData({
//                         ...newCurrencyData,
//                         code: e.target.value.toUpperCase(),
//                       })
//                     }
//                     className="w-full rounded-lg border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none"
//                   />
//                   <p className="mt-2 lg:text-sm text-xs text-main">
//                     Enter the 3-letter currency code (e.g., USD, EUR, GBP)
//                   </p>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="currencyName"
//                     className="inline-block lg:text-base text-sm font-medium text-main mb-1"
//                   >
//                     Currency Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="currencyName"
//                     name="currencyName"
//                     placeholder="e.g. US Dollar"
//                     value={newCurrencyData.currencyName}
//                     onChange={(e) =>
//                       setNewCurrencyData({
//                         ...newCurrencyData,
//                         currencyName: e.target.value,
//                       })
//                     }
//                     className="w-full rounded-lg border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="flagImage"
//                     className="inline-block lg:text-base text-sm font-medium text-main mb-1"
//                   >
//                     Flag Image Path
//                   </label>
//                   <input
//                     type="text"
//                     id="flagImage"
//                     name="flagImage"
//                     placeholder="/assets/icon/flags/usd.png"
//                     value={newCurrencyData.flagImage}
//                     onChange={(e) =>
//                       setNewCurrencyData({
//                         ...newCurrencyData,
//                         flagImage: e.target.value,
//                       })
//                     }
//                     className="w-full rounded-lg border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none"
//                   />
//                   <p className="mt-2 lg:text-sm text-xs text-main">
//                     Path to the flag image (e.g., /assets/icon/flags/usd.png)
//                   </p>
//                 </div>

//                 <div className="flex md:flex-row flex-col gap-3 pt-4">
//                   <button
//                     onClick={handleCreateCurrency}
//                     disabled={
//                       isSubmitting ||
//                       !newCurrencyData.code ||
//                       !newCurrencyData.currencyName
//                     }
//                     className="flex-1 flex justify-center items-center lg:text-lg gap-2 bg-primary text-gray hover:bg-primary-hover font-medium py-2.5 focus:outline-none px-4 rounded-lg transition-colors ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <Loader2 size={20} className="animate-spin" />
//                     ) : (
//                       <PlusCircle size={20} />
//                     )}
//                     {isSubmitting ? "Adding..." : "Add Currency"}
//                   </button>
//                   <button
//                     onClick={() => setIsCreateModalOpen(false)}
//                     className="flex-1 bg-error flex justify-center items-center gap-2 gap cursor-pointer font-medium text-white py-2.5 px-4 rounded-lg transition duration-300"
//                   >
//                     <IoWarningOutline size={20} />
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {isDeleteConfirmationOpen && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
//           <div
//             className="bg-white rounded-2xl shadow-md max-w-md w-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-6 text-center">
//               <div className="flex justify-center mb-6">
//                 <div className="size-20 bg-red-100 rounded-full flex items-center justify-center">
//                   <AlertTriangle className="text-red-500 size-10" />
//                 </div>
//               </div>

//               <h2 className="text-2xl font-bold text-main mb-4">
//                 Delete Currency
//               </h2>
//               <p className="text-gray text-lg leading-relaxed mb-6">
//                 Are you sure you want to delete this currency? This action
//                 cannot be undone.
//               </p>

//               <div className="flex flex-col gap-3">
//                 <button
//                   onClick={handleDeleteCurrency}
//                   disabled={isSubmitting}
//                   className="flex-1 flex justify-center cursor-pointer items-center font-medium text-lg gap-2 bg-error  text-white py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
//                 >
//                   {isSubmitting ? (
//                     <Loader2 size={20} className="animate-spin" />
//                   ) : (
//                     <Trash2 size={20} />
//                   )}
//                   {isSubmitting ? "Deleting..." : "Delete Currency"}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setIsDeleteConfirmationOpen(false);
//                     setCurrencyToDeleteId(null);
//                   }}
//                   className="flex-1 bg-slate-300 cursor-pointer text-gray text-lg font-medium py-3 px-4 rounded-lg transition duration-200"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image";
// import {
//   Loader2,
//   PlusCircle,
//   Search,
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   X,
//   AlertTriangle,
//   Check,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaRegSave } from "react-icons/fa";
// import { MdError } from "react-icons/md";
// import { IoClose, IoWarningOutline } from "react-icons/io5";

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
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     fetchCurrenciesList();
//   }, [token, router]);

//   useEffect(() => {
//     // Auto-dismiss success message after 3 seconds
//     if (successMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const fetchCurrenciesList = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (err: any) {
//       console.error("Error fetching currencies:", err);
//       if (err.response?.status === 403 || err.response?.status === 401) {
//         router.push("/auth/login");
//       } else {
//         setError(err.response?.data?.message || "Failed to load currencies");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       setError("Currency code and name are required");
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);
//     try {
//       await axios.post("/admin/currencies", newCurrencyData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCurrencyData({ code: "", currencyName: "", flagImage: "" });
//       await fetchCurrenciesList();
//       setSuccessMessage("Currency added successfully");
//       setIsCreateModalOpen(false);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to create currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyCode) {
//       setError("Currency code cannot be empty");
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);
//     try {
//       await axios.put(
//         `/admin/currencies/${editingCurrencyId}`,
//         { code: editingCurrencyCode },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditingCurrencyId(null);
//       setEditingCurrencyCode("");
//       await fetchCurrenciesList();
//       setSuccessMessage("Currency updated successfully");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;

//     setIsSubmitting(true);
//     setError(null);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       await fetchCurrenciesList();
//       setSuccessMessage("Currency deleted successfully");
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to delete currency");
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
//   };

//   const filteredCurrencies = currencies.filter((currency) => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       currency.code.toLowerCase().includes(searchLower) ||
//       currency.currencyName.toLowerCase().includes(searchLower)
//     );
//   });

//   return (
//     <div className="min-h-screen p-4 bg-gray-50">
//       {/* Header Section */}
//       <div className="py-6 mb-6 border-b border-gray-200">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Currency Management
//         </h1>
//         <p className="text-gray-500 capitalize">
//           Manage currency options for your application
//         </p>
//       </div>

//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed top-6 right-6 z-50 bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-lg flex items-center max-w-md"
//           >
//             <Check size={20} className="text-green-500 mr-3" />
//             <p className="text-green-800">{successMessage}</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-center">
//           <AlertTriangle size={20} className="text-red-500 mr-3" />
//           <p className="text-red-700">{error}</p>
//         </div>
//       )}

//       {/* Action Bar */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <button
//           onClick={() => setIsCreateModalOpen(true)}
//           className="flex items-center gap-2 bg-blue-600 cursor-pointer font-medium hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <PlusCircle className="size-4" />
//           <span>Add Currency</span>
//         </button>

//         {/* Search Bar */}
//         <div className="relative w-full md:w-64">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search size={20} className="text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search currencies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300  transition-shadow ease-in-out duration-300 text-gray-900 font-medium shadow-sm focus:outline-none sm:text-sm"
//           />
//         </div>
//       </div>

//       {/* Main Content */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <Loader2 size={40} className="text-blue-600 animate-spin" />
//         </div>
//       ) : filteredCurrencies.length === 0 ? (
//         <div className="bg-white p-8 text-center rounded-lg shadow-sm">
//           <div className="mb-6 flex justify-center">
//             <Image
//               src="/assets/images/exclamation-mark-medium@2x.webp"
//               width={100}
//               height={100}
//               alt="Searching Error"
//               className="size-48"
//             />
//           </div>
//           <h3 className="text-3xl capitalize font-semibold text-gray-900 mb-6">
//             No currencies found
//           </h3>
//           <div className="flex justify-center">
//             <p className="text-gray-500 text-lg max-w-lg">
//               {searchTerm ? "Try adjusting your search or" : "Get started by"}{" "}
//               It seems we couldn't find any currencies at the moment. Please
//               check back later or try adjusting your search.
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredCurrencies.map((currency) => (
//             <div
//               key={currency._id}
//               className="rounded-xl overflow-hidden transition-all duration-200 bg-white shadow-md"
//             >
//               <div className="px-4 py-8">
//                 <div className="flex justify-between items-start mb-6">
//                   <div className="flex items-center gap-3">
//                     {currency.flagImage ? (
//                       <img
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         className="size-14 object-cover rounded-full"
//                       />
//                     ) : (
//                       <div className="size-14 border border-gray-300 rounded-full flex items-center justify-center text-xs text-gray-900">
//                         No flag
//                       </div>
//                     )}
//                     <div>
//                       {editingCurrencyId === currency._id ? (
//                         <input
//                           type="text"
//                           value={editingCurrencyCode}
//                           onChange={(e) =>
//                             setEditingCurrencyCode(e.target.value.toUpperCase())
//                           }
//                           className="border-b border-blue-600 bg-blue-50 p-1 font-bold text-gray-900 w-32 focus:outline-none"
//                           autoFocus
//                         />
//                       ) : (
//                         <h3 className="font-bold text-gray-900">
//                           {currency.code}
//                         </h3>
//                       )}
//                       <p className="text-slate-500 mt-0.5">
//                         {currency.currencyName}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {editingCurrencyId === currency._id ? (
//                   <div className="flex gap-2 mt-4">
//                     <button
//                       onClick={handleUpdateCurrency}
//                       disabled={isSubmitting}
//                       className="flex-1 flex justify-center items-center cursor-pointer gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-3 rounded-md transition duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       {isSubmitting ? (
//                         <Loader2 size={20} className="animate-spin" />
//                       ) : (
//                         <FaRegSave size={20} />
//                       )}
//                       <span>Save</span>
//                     </button>
//                     <button
//                       onClick={cancelEditing}
//                       className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white py-2.5 px-3 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       <MdError size={20} />
//                       <span>Cancel</span>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col sm:flex-row gap-2 mt-4">
//                     <Link
//                       href={`/admin/currencies/${currency._id}`}
//                       className="flex-1 flex justify-center items-center gap-1.5 bg-blue-100  text-blue-700 font-medium py-2 px-3 rounded-sm transition duration-300 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <Info size={20} />
//                       <span>Details</span>
//                     </Link>
//                     <button
//                       onClick={() => startEditing(currency)}
//                       className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-yellow-100 font-medium text-yellow-700 py-2 px-3 rounded-sm transition duration-300 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                     >
//                       <Edit size={20} />
//                       <span>Edit</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         setCurrencyToDeleteId(currency._id);
//                         setIsDeleteConfirmationOpen(true);
//                       }}
//                       className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-red-100 font-medium text-red-700 py-2 px-3 rounded-sm transition duration-300 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       <Trash2 size={20} />
//                       <span>Delete</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Create Currency Modal */}
//       {isCreateModalOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div
//             className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="lg:p-6 p-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="lg:text-2xl font-medium text-gray-900">
//                   Add New Currency
//                 </h2>
//                 <button
//                   onClick={() => setIsCreateModalOpen(false)}
//                   className="text-gray-900 hover:bg-gray-100 lg:size-12 size-10 flex justify-center items-center transition rounded-full cursor-pointer"
//                 >
//                   <IoClose className="lg:size-10 size-6 p-0.5" />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="code"
//                     className="inline-block lg:text-base text-sm font-medium text-gray-900 mb-1"
//                   >
//                     Currency Code <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="code"
//                     name="code"
//                     placeholder="e.g. USD"
//                     value={newCurrencyData.code}
//                     onChange={(e) =>
//                       setNewCurrencyData({
//                         ...newCurrencyData,
//                         code: e.target.value.toUpperCase(),
//                       })
//                     }
//                     className="w-full rounded-lg border border-gray-300 transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none sm:text-sm shadow-sm"
//                     required
//                   />
//                   <p className="mt-2 lg:text-sm text-xs text-gray-500">
//                     Enter the 3-letter currency code (e.g., USD, EUR, GBP)
//                   </p>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="currencyName"
//                     className="inline-block lg:text-base text-sm font-medium text-gray-900 mb-1"
//                   >
//                     Currency Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="currencyName"
//                     name="currencyName"
//                     placeholder="e.g. US Dollar"
//                     value={newCurrencyData.currencyName}
//                     onChange={(e) =>
//                       setNewCurrencyData({
//                         ...newCurrencyData,
//                         currencyName: e.target.value,
//                       })
//                     }
//                     className="w-full rounded-lg border border-gray-300 transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none sm:text-sm shadow-sm"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="flagImage"
//                     className="inline-block lg:text-base text-sm font-medium text-gray-900 mb-1"
//                   >
//                     Flag Image Path
//                   </label>
//                   <input
//                     type="text"
//                     id="flagImage"
//                     name="flagImage"
//                     placeholder="/assets/icon/flags/usd.png"
//                     value={newCurrencyData.flagImage}
//                     onChange={(e) =>
//                       setNewCurrencyData({
//                         ...newCurrencyData,
//                         flagImage: e.target.value,
//                       })
//                     }
//                     className="w-full rounded-lg border border-gray-300 transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none sm:text-sm shadow-sm"
//                   />
//                   <p className="mt-2 lg:text-sm text-xs text-gray-500">
//                     Path to the flag image (e.g., /assets/icon/flags/usd.png)
//                   </p>
//                 </div>

//                 <div className="flex md:flex-row flex-col gap-3 pt-4">
//                   <button
//                     onClick={handleCreateCurrency}
//                     disabled={
//                       isSubmitting ||
//                       !newCurrencyData.code ||
//                       !newCurrencyData.currencyName
//                     }
//                     className="flex-1 flex justify-center items-center lg:text-lg gap-2 bg-blue-600 text-white hover:bg-blue-700 font-medium py-2.5 focus:outline-none px-4 rounded-lg transition-colors ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500"
//                   >
//                     {isSubmitting ? (
//                       <Loader2 size={20} className="animate-spin" />
//                     ) : (
//                       <PlusCircle size={20} />
//                     )}
//                     {isSubmitting ? "Adding..." : "Add Currency"}
//                   </button>
//                   <button
//                     onClick={() => setIsCreateModalOpen(false)}
//                     className="flex-1 bg-red-600 hover:bg-red-700 flex justify-center items-center gap-2 gap cursor-pointer font-medium text-white py-2.5 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   >
//                     <IoWarningOutline size={20} />
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {isDeleteConfirmationOpen && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div
//             className="bg-white rounded-2xl shadow-md max-w-md w-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-6 text-center">
//               <div className="flex justify-center mb-6">
//                 <div className="size-20 bg-red-100 rounded-full flex items-center justify-center">
//                   <AlertTriangle className="text-red-500 size-10" />
//                 </div>
//               </div>

//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 Delete Currency
//               </h2>
//               <p className="text-gray-500 text-lg leading-relaxed mb-6">
//                 Are you sure you want to delete this currency? This action
//                 cannot be undone.
//               </p>

//               <div className="flex flex-col gap-3">
//                 <button
//                   onClick={handleDeleteCurrency}
//                   disabled={isSubmitting}
//                   className="flex-1 flex justify-center cursor-pointer items-center font-medium text-lg gap-2 bg-red-600  text-white py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 >
//                   {isSubmitting ? (
//                     <Loader2 size={20} className="animate-spin" />
//                   ) : (
//                     <Trash2 size={20} />
//                   )}
//                   {isSubmitting ? "Deleting..." : "Delete Currency"}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setIsDeleteConfirmationOpen(false);
//                     setCurrencyToDeleteId(null);
//                   }}
//                   className="flex-1 bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-900 text-lg font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

/* Deepseck Ai Componets */

// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image";
// import {
//   Loader2,
//   PlusCircle,
//   Search,
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   X,
//   AlertTriangle,
//   Check,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaRegSave } from "react-icons/fa";
// import { MdError } from "react-icons/md";
// import { IoClose, IoWarningOutline } from "react-icons/io5";

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
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   // Memoized filtered currencies
//   const filteredCurrencies = useMemo(() => {
//     if (!searchTerm) return currencies;

//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return currencies.filter((currency) => {
//       return (
//         currency.code.toLowerCase().includes(lowerSearchTerm) ||
//         currency.currencyName.toLowerCase().includes(lowerSearchTerm)
//       );
//     });
//   }, [currencies, searchTerm]);

//   useEffect(() => {
//     fetchCurrenciesList();
//   }, [token, router]);

//   useEffect(() => {
//     // Auto-dismiss success message after 3 seconds
//     if (successMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const fetchCurrenciesList = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (err: any) {
//       console.error("Error fetching currencies:", err);
//       if (err.response?.status === 403 || err.response?.status === 401) {
//         router.push("/auth/login");
//       } else {
//         setError(err.response?.data?.message || "Failed to load currencies");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       setError("Currency code and name are required");
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);
//     try {
//       await axios.post("/admin/currencies", newCurrencyData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCurrencyData({ code: "", currencyName: "", flagImage: "" });
//       await fetchCurrenciesList();
//       setSuccessMessage("Currency added successfully");
//       setIsCreateModalOpen(false);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to create currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyCode) {
//       setError("Currency code cannot be empty");
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);
//     try {
//       await axios.put(
//         `/admin/currencies/${editingCurrencyId}`,
//         { code: editingCurrencyCode },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditingCurrencyId(null);
//       setEditingCurrencyCode("");
//       await fetchCurrenciesList();
//       setSuccessMessage("Currency updated successfully");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;

//     setIsSubmitting(true);
//     setError(null);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       await fetchCurrenciesList();
//       setSuccessMessage("Currency deleted successfully");
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to delete currency");
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
//   };

//   return (
//     <div className="min-h-screen p-4 bg-gray-50">
//       {/* Header Section */}
//       <div className="py-6 mb-6 border-b border-gray-200">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Currency Management
//         </h1>
//         <p className="text-gray-500 capitalize">
//           Manage currency options for your application
//         </p>
//       </div>

//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed top-6 right-6 z-50 bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-lg flex items-center max-w-md"
//           >
//             <Check size={20} className="text-green-500 mr-3" />
//             <p className="text-green-800">{successMessage}</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-center">
//           <AlertTriangle size={20} className="text-red-500 mr-3" />
//           <p className="text-red-700">{error}</p>
//         </div>
//       )}

//       {/* Action Bar */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <button
//           onClick={() => setIsCreateModalOpen(true)}
//           className="flex items-center gap-2 bg-primary dark:bg-main dark:text-white cursor-pointer font-medium hover:bg-primary-hover text-secondary py-3 px-4 rounded-lg transition duration-300 focus:outline-none"
//         >
//           <PlusCircle className="size-4" />
//           <span>Add Currency</span>
//         </button>

//         {/* Search Bar - Fixed to properly filter */}
//         <div className="relative w-full md:w-64">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search size={20} className="text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search currencies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 hover:shadow-color transition-shadow ease-in-out duration-300 text-gray-900 font-medium focus:outline-none sm:text-sm"
//           />
//           {searchTerm && (
//             <button
//               onClick={() => setSearchTerm("")}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             >
//               <X size={18} className="text-gray-400 hover:text-gray-600" />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <Loader2 size={40} className="text-blue-600 animate-spin" />
//         </div>
//       ) : filteredCurrencies.length === 0 ? (
//         <div className="bg-white p-8 text-center rounded-lg shadow-sm">
//           <div className="mb-6 flex justify-center">
//             <Image
//               src="/assets/images/exclamation-mark-medium@2x.webp"
//               width={100}
//               height={100}
//               alt="No currencies found"
//               className="size-48"
//             />
//           </div>
//           <h3 className="text-3xl capitalize font-semibold text-main mb-6">
//             {searchTerm ? "No matching currencies" : "No currencies found"}
//           </h3>
//           <div className="flex justify-center">
//             <p className="text-gray-500 text-lg max-w-lg">
//               {searchTerm
//                 ? "No currencies match your search. Try a different term."
//                 : "It seems we couldn't find any currencies at the moment. Please check back later."}
//             </p>
//           </div>
//           {searchTerm && (
//             <button
//               onClick={() => setSearchTerm("")}
//               className="mt-6 bg-primary hover:bg-primary-hover text-lg text-secondary font-medium py-2.5 px-6 rounded-md cursor-pointer transition duration-200"
//             >
//               Clear search
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredCurrencies.map((currency) => (
//             <div
//               key={currency._id}
//               className="rounded-xl overflow-hidden transition-all duration-200 bg-white shadow-md hover:shadow-lg"
//             >
//               <div className="px-4 py-8">
//                 <div className="flex justify-between items-start mb-6">
//                   <div className="flex items-center gap-3">
//                     {currency.flagImage ? (
//                       <img
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         className="size-14 object-cover rounded-full"
//                       />
//                     ) : (
//                       <div className="size-14 border border-gray-300 rounded-full flex items-center justify-center text-xs text-gray-900">
//                         No flag
//                       </div>
//                     )}
//                     <div>
//                       {editingCurrencyId === currency._id ? (
//                         <input
//                           type="text"
//                           value={editingCurrencyCode}
//                           onChange={(e) =>
//                             setEditingCurrencyCode(e.target.value.toUpperCase())
//                           }
//                           className="border-b border-blue-600 bg-blue-50 p-1 font-bold text-gray-900 w-32 focus:outline-none"
//                           autoFocus
//                           maxLength={3}
//                         />
//                       ) : (
//                         <h3 className="font-bold text-gray-900">
//                           {currency.code}
//                         </h3>
//                       )}
//                       <p className="text-slate-500 mt-0.5">
//                         {currency.currencyName}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {editingCurrencyId === currency._id ? (
//                   <div className="flex gap-2 mt-4">
//                     <button
//                       onClick={handleUpdateCurrency}
//                       disabled={isSubmitting}
//                       className="flex-1 flex justify-center items-center cursor-pointer gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-3 rounded-md transition duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       {isSubmitting ? (
//                         <Loader2 size={20} className="animate-spin" />
//                       ) : (
//                         <FaRegSave size={20} />
//                       )}
//                       <span>Save</span>
//                     </button>
//                     <button
//                       onClick={cancelEditing}
//                       className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white py-2.5 px-3 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       <MdError size={20} />
//                       <span>Cancel</span>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col sm:flex-row gap-2 mt-4">
//                     <Link
//                       href={`/admin/currencies/${currency._id}`}
//                       className="flex-1 flex justify-center items-center gap-1.5 bg-blue-100 text-blue-700 font-medium py-2 px-3 rounded-sm transition duration-300 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <Info size={20} />
//                       <span>Details</span>
//                     </Link>
//                     <button
//                       onClick={() => startEditing(currency)}
//                       className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-yellow-100 font-medium text-yellow-700 py-2 px-3 rounded-sm transition duration-300 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                     >
//                       <Edit size={20} />
//                       <span>Edit</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         setCurrencyToDeleteId(currency._id);
//                         setIsDeleteConfirmationOpen(true);
//                       }}
//                       className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-red-100 font-medium text-red-700 py-2 px-3 rounded-sm transition duration-300 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       <Trash2 size={20} />
//                       <span>Delete</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Create Currency Modal */}
//       {isCreateModalOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div
//             className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="lg:p-6 p-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="lg:text-xl font-medium text-main">
//                   Add New Currency
//                 </h2>
//                 <button
//                   onClick={() => setIsCreateModalOpen(false)}
//                   className="text-main hover:bg-green/10 lg:size-12 size-10 flex justify-center items-center transition rounded-full cursor-pointer"
//                 >
//                   <IoClose className="lg:size-10 size-6 p-1" />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="code"
//                     className="inline-block lg:text-base text-sm font-medium text-main mb-1"
//                   >
//                     Currency Code <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="code"
//                     name="code"
//                     placeholder="e.g. USD"
//                     value={newCurrencyData.code}
//                     onChange={(e) =>
//                       setNewCurrencyData({
//                         ...newCurrencyData,
//                         code: e.target.value.toUpperCase(),
//                       })
//                     }
//                     className="w-full rounded-lg border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none sm:text-sm"
//                     required
//                     maxLength={3}
//                   />
//                   <p className="mt-2 lg:text-sm text-xs text-gray-500">
//                     Enter the 3-letter currency code (e.g., USD, EUR, GBP)
//                   </p>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="currencyName"
//                     className="inline-block lg:text-base text-sm font-medium text-gray-900 mb-1"
//                   >
//                     Currency Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="currencyName"
//                     name="currencyName"
//                     placeholder="e.g. US Dollar"
//                     value={newCurrencyData.currencyName}
//                     onChange={(e) =>
//                       setNewCurrencyData({
//                         ...newCurrencyData,
//                         currencyName: e.target.value,
//                       })
//                     }
//                     className="w-full rounded-lg border border-gray-300 transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none sm:text-sm hover:shadow-color"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="flagImage"
//                     className="inline-block lg:text-base text-sm font-medium text-gray-900 mb-1"
//                   >
//                     Flag Image Path
//                   </label>
//                   <input
//                     type="text"
//                     id="flagImage"
//                     name="flagImage"
//                     placeholder="/assets/icon/flags/usd.png"
//                     value={newCurrencyData.flagImage}
//                     onChange={(e) =>
//                       setNewCurrencyData({
//                         ...newCurrencyData,
//                         flagImage: e.target.value,
//                       })
//                     }
//                     className="w-full rounded-lg border border-gray-300 transition-shadow duration-300 ease-in-out px-4 py-3 focus:outline-none sm:text-sm hover:shadow-color"
//                   />
//                   <p className="mt-2 lg:text-sm text-xs text-gray-500">
//                     Path to the flag image (e.g., /assets/icon/flags/usd.png)
//                   </p>
//                 </div>

//                 <div className="flex md:flex-row flex-col gap-3 pt-4">
//                   <button
//                     onClick={handleCreateCurrency}
//                     disabled={
//                       isSubmitting ||
//                       !newCurrencyData.code ||
//                       !newCurrencyData.currencyName
//                     }
//                     className="flex-1 flex justify-center items-center lg:text-lg gap-2 bg-blue-600 text-white hover:bg-blue-700 font-medium py-2.5 focus:outline-none px-4 rounded-lg transition-colors ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500"
//                   >
//                     {isSubmitting ? (
//                       <Loader2 size={20} className="animate-spin" />
//                     ) : (
//                       <PlusCircle size={20} />
//                     )}
//                     {isSubmitting ? "Adding..." : "Add Currency"}
//                   </button>
//                   <button
//                     onClick={() => setIsCreateModalOpen(false)}
//                     className="flex-1 bg-red-600 hover:bg-red-700 flex justify-center items-center gap-2 gap cursor-pointer font-medium text-white py-2.5 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   >
//                     <IoWarningOutline size={20} />
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {isDeleteConfirmationOpen && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div
//             className="bg-white rounded-2xl shadow-md max-w-md w-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-6 text-center">
//               <div className="flex justify-center mb-6">
//                 <div className="size-20 bg-red-100 rounded-full flex items-center justify-center">
//                   <AlertTriangle className="text-red-500 size-10" />
//                 </div>
//               </div>

//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 Delete Currency
//               </h2>
//               <p className="text-gray-500 text-lg leading-relaxed mb-6">
//                 Are you sure you want to delete this currency? This action
//                 cannot be undone.
//               </p>

//               <div className="flex flex-col gap-3">
//                 <button
//                   onClick={handleDeleteCurrency}
//                   disabled={isSubmitting}
//                   className="flex-1 flex justify-center cursor-pointer items-center font-medium text-lg gap-2 bg-red-600 text-white py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 >
//                   {isSubmitting ? (
//                     <Loader2 size={20} className="animate-spin" />
//                   ) : (
//                     <Trash2 size={20} />
//                   )}
//                   {isSubmitting ? "Deleting..." : "Delete Currency"}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setIsDeleteConfirmationOpen(false);
//                     setCurrencyToDeleteId(null);
//                   }}
//                   className="flex-1 bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-900 text-lg font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image";
// import {
//   Loader2, PlusCircle, Info, Edit, Trash2, Save, X, AlertTriangle, Check,
//   Percent, // Changed icon
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaRegSave } from "react-icons/fa";
// import { MdCancel, MdError } from "react-icons/md";
// import { IoClose, IoWarningOutline } from "react-icons/io5";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number; // Updated field name
// }

// // Interface for the form data
// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   rateAdjustmentPercentage: string; // Use string for input
// }

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "", currencyName: "", flagImage: "", rateAdjustmentPercentage: "",
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(null);
//   // State for inline editing - needs to use the new field name
//   const [editingFields, setEditingFields] = useState<{ code: string; rateAdjustmentPercentage: string }>({ code: '', rateAdjustmentPercentage: '' });

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   // Memoized filtered currencies
//   const filteredCurrencies = useMemo(() => {
//     if (!searchTerm) return currencies;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return currencies.filter((currency) =>
//       currency.code.toLowerCase().includes(lowerSearchTerm) ||
//       currency.currencyName.toLowerCase().includes(lowerSearchTerm)
//     );
//   }, [currencies, searchTerm]);

//   useEffect(() => {
//     fetchCurrenciesList();
//   }, [token]); // Removed router dependency unless needed for redirect logic inside fetch

//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//    const fetchCurrenciesList = async () => {
//         if (!token) {
//             router.push('/auth/login'); // Redirect if no token early
//             return;
//         }
//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get<Currency[]>("/admin/currencies", { // Expect array of Currency
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setCurrencies(response.data);
//         } catch (err: any) {
//             console.error("Error fetching currencies:", err);
//             if (err.response?.status === 403 || err.response?.status === 401) {
//                 router.push("/auth/login");
//             } else {
//                 setError(err.response?.data?.message || "Failed to load currencies");
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setNewCurrencyData(prev => ({
//             ...prev,
//             // Convert code to uppercase immediately
//             [name]: name === 'code' ? value.toUpperCase() : value
//         }));
//     };

//       // handleCreateCurrency - updated validation and payload
//   const handleCreateCurrency = async () => {
//     setError(null);
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) { setError("Currency code and name are required."); return; }
//     if (newCurrencyData.code.length !== 3) { setError("Currency code must be 3 letters."); return; }

//     let adjustmentValue: number = 0; // Default to 0
//     if (newCurrencyData.rateAdjustmentPercentage.trim() !== '') {
//         adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
//         if (isNaN(adjustmentValue)) {
//             setError("Rate Adjustment must be a valid number (e.g., 0.5 or -0.1).");
//             return;
//         }
//     }

//     setIsSubmitting(true);
//     try {
//         const payload = {
//             code: newCurrencyData.code,
//             currencyName: newCurrencyData.currencyName,
//             flagImage: newCurrencyData.flagImage.trim() || null,
//             rateAdjustmentPercentage: adjustmentValue, // Send parsed number
//         };
//         await axios.post("/admin/currencies", payload, { headers: { Authorization: `Bearer ${token}` } });
//         setNewCurrencyData({ code: "", currencyName: "", flagImage: "", rateAdjustmentPercentage: "" });
//         setIsCreateModalOpen(false);
//         await fetchCurrenciesList();
//         setSuccessMessage("Currency added successfully!");
//     } catch (err: any) {
//         setError(err.response?.data?.message || "Failed to create currency");
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//      // --- Inline Editing Handlers ---
//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingFields({
//         code: currency.code,
//         rateAdjustmentPercentage: currency.rateAdjustmentPercentage?.toString() ?? '0' // Default to '0' string if null/undefined
//     });
//     setError(null);
//   };

//   const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditingFields(prev => ({ ...prev, [name]: name === 'code' ? value.toUpperCase() : value }));
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyId) return;
//     setError(null);

//     if (!editingFields.code || editingFields.code.length !== 3) { setError("Currency code must be 3 letters."); return; }

//     let adjustmentValue: number = 0;
//     if (editingFields.rateAdjustmentPercentage.trim() !== '') {
//         adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
//         if (isNaN(adjustmentValue)) { setError("Rate Adjustment must be a valid number."); return; }
//     }

//     setIsSubmitting(true);
//     try {
//         const payload = {
//             code: editingFields.code,
//             rateAdjustmentPercentage: adjustmentValue,
//         };
//         await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
//         setEditingCurrencyId(null);
//         setEditingFields({ code: '', rateAdjustmentPercentage: '' });
//         await fetchCurrenciesList();
//         setSuccessMessage("Currency updated successfully!");
//     } catch (err: any) {
//         setError(err.response?.data?.message || "Failed to update currency");
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingFields({ code: '', rateAdjustmentPercentage: '' });
//     setError(null);
//   };
//     // --- End Inline Editing Handlers ---

//     const handleDeleteCurrency = async () => {
//         if (!currencyToDeleteId) return;
//         setIsSubmitting(true); setError(null);
//         try {
//             await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             // Close confirmation, reset ID, fetch list, show success
//             setIsDeleteConfirmationOpen(false);
//             setCurrencyToDeleteId(null);
//             await fetchCurrenciesList();
//             setSuccessMessage("Currency deleted successfully!");
//         } catch (err: any) {
//             setError(err.response?.data?.message || "Failed to delete currency");
//             // Keep modal open on error to show message
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//   // --- RENDER ---
//   return (
//     <div className="min-h-screen p-4 bg-gray-50">
//       {/* Header Section */}
//       <div className="py-6 mb-6 border-b border-gray-200">
//         <h1 className="lg:text-3xl text-2xl font-bold text-gray mb-2">
//           Currency Management
//         </h1>
//         <p className="text-gray capitalize">
//           Manage currency options and custom rates for your application
//         </p>
//       </div>

//       {/* Success/Error Messages */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div /* ... Success message styling ... */ >
//              <Check size={20} className="text-green-500 mr-3" />
//              <p className="text-green-800">{successMessage}</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//        {error && !isCreateModalOpen && !isDeleteConfirmationOpen && ( // Only show general error if no modal is open
//             <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-center">
//                 <AlertTriangle size={20} className="text-red-500 mr-3 flex-shrink-0" />
//                 <p className="text-red-700">{error}</p>
//                  <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">
//                      <X size={18} />
//                  </button>
//             </div>
//         )}

//       {/* Action Bar */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <button
//           onClick={() => { setIsCreateModalOpen(true); setError(null); }} // Clear error on open
//           className="flex items-center gap-2 bg-primary dark:bg-main dark:text-white cursor-pointer font-medium hover:bg-primary-hover text-main py-3 px-4 rounded-lg transition duration-300 focus:outline-none"
//         >
//           <PlusCircle className="size-5" />
//           <span>Add Currency</span>
//         </button>

//         {/* Search Bar */}
//         <div className="relative w-full md:w-64">
//            {/* ... Search input ... */}
//            <input type="text" /* ... props ... */ />
//            {/* ... Clear button ... */}
//         </div>
//       </div>

//       {/* Currency List / Loading / Empty State */}
//       {isLoading ? (
//          <div className="flex justify-center items-center h-64">
//             <Loader2 size={40} className="text-blue-600 animate-spin" />
//          </div>
//       ) : filteredCurrencies.length === 0 ? (
//           <div className="bg-white p-8 text-center rounded-lg shadow-sm">
//               {/* ... Empty state content ... */}
//           </div>
//       ) : (
//         // --- Currency Grid ---
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredCurrencies.map((currency) => (
//             <div
//               key={currency._id}
//               className="rounded-xl overflow-hidden transition-all duration-300 bg-white shadow-md hover:shadow-lg border border-gray-200 flex flex-col"
//             >
//               <div className="p-5 flex-grow">
//                 {/* Top Section: Flag, Code, Name */}
//                  <div className="flex items-center gap-4 mb-4">
//                     {/* Flag Image */}
//                     {currency.flagImage ? (
//                       <img
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         className="size-14 object-contain rounded-full"
//                         onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; /* Hide on error */ }}
//                       />
//                     ) : (
//                       <div className="size-12 border border-gray-300 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-500">
//                         No flag
//                       </div>
//                     )}
//                     {/* Code and Name */}
//                      <div className="flex-1">
//                         {editingCurrencyId === currency._id ? (
//                              <input type="text" name="code" value={editingFields.code} onChange={handleEditingInputChange}
//                                 className="text-lg font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none bg-blue-50 px-1 py-0.5 w-20" autoFocus maxLength={3} />
//                         ) : (
//                            <h3 className="text-lg font-bold text-gray-900"> {currency.code} </h3>
//                         )}
//                         <p className="text-sm text-slate-500 mt-0.5"> {currency.currencyName} </p>
//                      </div>
//                  </div>

//                  {/* Rate Adjustment Section - UPDATED */}
//                  <div className="mt-4 mb-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                      <label className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
//                         Our Rates
//                      </label>

//                      {editingCurrencyId === currency._id ? (
//                          <input
//                             type="number"
//                             name="rateAdjustmentPercentage" // Correct name
//                             value={editingFields.rateAdjustmentPercentage}
//                             onChange={handleEditingInputChange}
//                             placeholder="e.g., 0.5 or -0.1"
//                             step="any"
//                             className="text-base font-semibold text-gray-800 border-b border-blue-500 focus:outline-none bg-transparent w-full py-0.5"
//                           />
//                      ) : (
//                          <p className={`text-lg font-medium ${currency.rateAdjustmentPercentage != null ? 'text-main font-medium' : 'text-gray-400 italic'}`}>
//                              {currency.rateAdjustmentPercentage != null ? `${currency.rateAdjustmentPercentage.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%` : 'Not Set'}
//                          </p>
//                      )}
//                      <p className="text-xs text-gray-500 mt-1">Our Rates vs market rate.</p>
//                  </div>
//               </div>

//                {/* Actions Footer */}
//                <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
//                    {editingCurrencyId === currency._id ? (
//                         // --- Save/Cancel Buttons ---
//                         <div className="flex gap-2">
//                            <button onClick={handleUpdateCurrency} disabled={isSubmitting} className="flex-1 flex justify-center items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-md transition duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />} Save
//                            </button>
//                            <button onClick={cancelEditing} className="flex-1 flex justify-center items-center gap-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
//                                <X size={16} /> Cancel
//                            </button>
//                         </div>
//                     ) : (
//                        // --- Details/Edit/Delete Buttons ---
//                        <div className="flex flex-col sm:flex-row gap-2">
//                            <Link href={`/admin/currencies/${currency._id}`} className="flex-1 flex justify-center items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-3 rounded-md transition duration-200 focus:outline-none">
//                                <Info size={20} /> Details
//                            </Link>
//                            <button onClick={() => startEditing(currency)} className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-3 rounded-md transition duration-200 focus:outline-none">
//                                <Edit size={20} /> Edit
//                            </button>
//                            <button onClick={() => { setCurrencyToDeleteId(currency._id); setIsDeleteConfirmationOpen(true); setError(null); }} className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 bg-white border border-gray-300 hover:bg-red-50 text-red-600 font-medium py-2 px-3 rounded-md transition duration-200 focus:outline-none">
//                                <Trash2 size={20} /> Delete
//                            </button>
//                        </div>
//                    )}
//                </div>

//             </div>
//           ))}
//         </div>
//       )}

//       {/* Add Currency Modal */}
//       {isCreateModalOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div
//             className="bg-white rounded-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto scrollbar-hide"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="lg:p-6 p-4">
//               {/* Modal Header */}
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="lg:text-xl font-medium text-main"> Add New Currency </h2>
//                  <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-500 hover:text-gray-800 cursor-pointer transition"> <IoClose size={24}/> </button>
//               </div>

//               {/* Modal Error */}
//                {error && isCreateModalOpen && (
//                     <div className="mb-4 bg-red-50 border border-red-200 p-3 rounded flex items-center">
//                         <AlertTriangle size={18} className="text-red-500 mr-2 flex-shrink-0" />
//                         <p className="text-red-700 text-sm">{error}</p>
//                     </div>
//                 )}

//               {/* Modal Form */}
//               <div className="space-y-5">
//                  {/* Code */}
//                 <div>
//                    <label htmlFor="create-code" className="block text-sm font-medium text-gray-700 mb-1"> Currency Code <span className="text-red-500">*</span> </label>
//                    <input type="text" id="create-code" name="code" value={newCurrencyData.code} onChange={handleCreateInputChange} maxLength={3}
//                      placeholder="e.g., USD" className="w-full rounded-lg border border-gray-300 px-4 py-3.5 hover:shadow-darkcolor focus:outline-none transition-shadow ease-in-out duration-300 sm:text-sm"/>
//                    <p className="mt-1 text-xs text-gray-500">3-letter uppercase code.</p>
//                 </div>
//                  {/* Name */}
//                 <div>
//                    <label htmlFor="create-currencyName" className="block text-sm font-medium text-gray-700 mb-1"> Currency Name <span className="text-red-500">*</span> </label>
//                    <input type="text" id="create-currencyName" name="currencyName" value={newCurrencyData.currencyName} onChange={handleCreateInputChange}
//                      placeholder="e.g., US Dollar" className="w-full rounded-lg border border-gray-300 px-4 py-3.5 hover:shadow-darkcolor focus:outline-none transition-shadow ease-in-out duration-300 sm:text-sm"/>
//                 </div>
//                 {/* Flag Image Path */}
//                  <div>
//                    <label htmlFor="create-flagImage" className="block text-sm font-medium text-gray-700 mb-1"> Flag Image Path </label>
//                    <input type="text" id="create-flagImage" name="flagImage" value={newCurrencyData.flagImage} onChange={handleCreateInputChange}
//                      placeholder="/assets/icon/flags/usd.png" className="w-full rounded-lg border border-gray-300 px-4 py-3.5 hover:shadow-darkcolor focus:outline-none transition-shadow ease-in-out duration-300 sm:text-sm"/>
//                    <p className="mt-1 text-xs text-gray-500">Relative path to the image.</p>
//                  </div>
//                  {/* Rate Adjustment Percentage - UPDATED */}
//                  <div>
//                     <label htmlFor="create-rateAdjustmentPercentage" className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
//                         <Percent size={14}/> Rate Adjustment
//                     </label>
//                     <input
//                        type="number"
//                        id="create-rateAdjustmentPercentage"
//                        name="rateAdjustmentPercentage" // Correct name
//                        value={newCurrencyData.rateAdjustmentPercentage}
//                        onChange={handleCreateInputChange}
//                        step="any"
//                        placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
//                        className="w-full rounded-lg border border-gray-300 px-4 py-3.5 hover:shadow-darkcolor focus:outline-none transition-shadow ease-in-out duration-300 sm:text-sm"
//                      />
//                     <p className="mt-1 text-xs text-gray-500">Enter percentage adjustment. Default is 0%.</p>
//                  </div>

//                  {/* Add other fields here if needed (bank details, fees) */}

//               </div>

//               {/* Modal Actions */}
//               <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                  <button onClick={handleCreateCurrency} disabled={isSubmitting || !newCurrencyData.code || !newCurrencyData.currencyName}
//                    className="flex-1 flex justify-center items-center gap-2 bg-primary text-main font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
//                      {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <PlusCircle size={20} />}
//                      {isSubmitting ? "Adding..." : "Add Currency"}
//                  </button>
//                  <button onClick={() => setIsCreateModalOpen(false)} className="flex-1 cursor-pointer flex justify-center items-center gap-2 bg-error text-white font-medium py-2.5 px-4 rounded-lg transition focus:outline-none">
//                      <MdCancel  size={20}/> Cancel
//                  </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {isDeleteConfirmationOpen && (
//          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
//                   {/* Icon and Title */}
//                  <div className="text-center">
//                      <div className="mx-auto flex items-center justify-center size-12 rounded-full bg-red-100 mb-4">
//                          <AlertTriangle className="size-6 text-red-600" />
//                      </div>
//                      <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Currency</h3>
//                       <div className="mt-2 px-7"> <p className="text-sm text-gray-500">Are you sure you want to delete this currency? This action cannot be undone.</p> </div>
//                  </div>
//                  {/* Error within modal */}
//                  {error && isDeleteConfirmationOpen && (
//                      <div className="mt-4 bg-red-50 border border-red-200 p-3 rounded flex items-center">
//                          <AlertTriangle size={18} className="text-red-500 mr-2 flex-shrink-0" />
//                          <p className="text-red-700 text-sm">{error}</p>
//                      </div>
//                  )}
//                   {/* Buttons */}
//                  <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
//                      <button onClick={handleDeleteCurrency} disabled={isSubmitting} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm disabled:opacity-50">
//                          {isSubmitting ? <Loader2 size={20} className="animate-spin"/> : "Delete"}
//                      </button>
//                      <button onClick={() => setIsDeleteConfirmationOpen(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
//                          Cancel
//                      </button>
//                  </div>
//              </div>
//          </div>
//       )}
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiConfig from "../../config/apiConfig";
import Image from "next/image";
import {
  Loader2,
  PlusCircle,
  Info,
  Edit,
  Trash2,
  Save,
  X,
  AlertTriangle,
  Check,
  Percent,
  Images, // Changed icon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegSave } from "react-icons/fa";
import { MdCancel, MdError } from "react-icons/md";
import { IoClose, IoSearch, IoWarningOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";

axios.defaults.baseURL = apiConfig.baseUrl;

interface Currency {
  _id: string;
  code: string;
  currencyName: string;
  flagImage?: string;
  rateAdjustmentPercentage?: number; // Updated field name
}

// Interface for the form data
interface NewCurrencyData {
  code: string;
  currencyName: string;
  flagImage: string;
  rateAdjustmentPercentage: string; // Use string for input
}

const AdminCurrenciesPage: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
    code: "",
    currencyName: "",
    flagImage: "",
    rateAdjustmentPercentage: "",
  });
  const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
    null
  );
  // State for inline editing - needs to use the new field name
  const [editingFields, setEditingFields] = useState<{
    code: string;
    rateAdjustmentPercentage: string;
  }>({ code: "", rateAdjustmentPercentage: "" });

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

  // Memoized filtered currencies
  const filteredCurrencies = useMemo(() => {
    if (!searchTerm) return currencies;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(lowerSearchTerm) ||
        currency.currencyName.toLowerCase().includes(lowerSearchTerm)
    );
  }, [currencies, searchTerm]);

  useEffect(() => {
    fetchCurrenciesList();
  }, [token]); // Removed router dependency unless needed for redirect logic inside fetch

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchCurrenciesList = async () => {
    if (!token) {
      router.push("/auth/login"); // Redirect if no token early
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Currency[]>("/admin/currencies", {
        // Expect array of Currency
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

  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCurrencyData((prev) => ({
      ...prev,
      // Convert code to uppercase immediately
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
  };

  // handleCreateCurrency - updated validation and payload
  const handleCreateCurrency = async () => {
    setError(null);
    if (!newCurrencyData.code || !newCurrencyData.currencyName) {
      setError("Currency code and name are required.");
      return;
    }
    if (newCurrencyData.code.length !== 3) {
      setError("Currency code must be 3 letters.");
      return;
    }

    let adjustmentValue: number = 0; // Default to 0
    if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
      adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
      if (isNaN(adjustmentValue)) {
        setError("Rate Adjustment must be a valid number (e.g., 0.5 or -0.1).");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const payload = {
        code: newCurrencyData.code,
        currencyName: newCurrencyData.currencyName,
        flagImage: newCurrencyData.flagImage.trim() || null,
        rateAdjustmentPercentage: adjustmentValue, // Send parsed number
      };
      await axios.post("/admin/currencies", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewCurrencyData({
        code: "",
        currencyName: "",
        flagImage: "",
        rateAdjustmentPercentage: "",
      });
      setIsCreateModalOpen(false);
      await fetchCurrenciesList();
      setSuccessMessage("Currency added successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create currency");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Inline Editing Handlers ---
  const startEditing = (currency: Currency) => {
    setEditingCurrencyId(currency._id);
    setEditingFields({
      code: currency.code,
      rateAdjustmentPercentage:
        currency.rateAdjustmentPercentage?.toString() ?? "0", // Default to '0' string if null/undefined
    });
    setError(null);
  };

  const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingFields((prev) => ({
      ...prev,
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
  };

  const handleUpdateCurrency = async () => {
    if (!editingCurrencyId) return;
    setError(null);

    if (!editingFields.code || editingFields.code.length !== 3) {
      setError("Currency code must be 3 letters.");
      return;
    }

    let adjustmentValue: number = 0;
    if (editingFields.rateAdjustmentPercentage.trim() !== "") {
      adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
      if (isNaN(adjustmentValue)) {
        setError("Rate Adjustment must be a valid number.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const payload = {
        code: editingFields.code,
        rateAdjustmentPercentage: adjustmentValue,
      };
      await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingCurrencyId(null);
      setEditingFields({ code: "", rateAdjustmentPercentage: "" });
      await fetchCurrenciesList();
      setSuccessMessage("Currency updated successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update currency");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEditing = () => {
    setEditingCurrencyId(null);
    setEditingFields({ code: "", rateAdjustmentPercentage: "" });
    setError(null);
  };
  // --- End Inline Editing Handlers ---

  const handleDeleteCurrency = async () => {
    if (!currencyToDeleteId) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Close confirmation, reset ID, fetch list, show success
      setIsDeleteConfirmationOpen(false);
      setCurrencyToDeleteId(null);
      await fetchCurrenciesList();
      setSuccessMessage("Currency deleted successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete currency");
      // Keep modal open on error to show message
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Header Section */}
      <div className="py-6 mb-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="lg:text-3xl text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Currency Management
        </h1>
        <p className="text-gray-700 dark:text-gray-300 capitalize">
          Manage currency options and custom rates for your application
        </p>
      </div>

      {/* Success Messages */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Check size={20} className="text-green-500 mr-3" />
            <p className="text-green-800 dark:text-green-400">
              {successMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Messages  */}
      {error &&
        !isCreateModalOpen &&
        !isDeleteConfirmationOpen && ( // Only show general error if no modal is open
          <motion.div
            className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <AlertTriangle
              size={20}
              className="text-red-500 mr-3 flex-shrink-0"
            />
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <button
          onClick={() => {
            setIsCreateModalOpen(true);
            setError(null);
          }} // Clear error on open
          className="flex items-center gap-2 bg-primary dark:bg-main dark:text-white cursor-pointer font-medium hover:bg-primary-hover text-main py-3 px-4 rounded-lg transition duration-300 focus:outline-none"
        >
          <PlusCircle className="size-5" />
          <span>Add Currency</span>
        </button>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search currencies..."
            className="w-full px-4 py-3 ps-8 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white hover:shadow-darkcolor transition-shadow ease-in-out duration-300 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch className="size-5 absolute top-3 left-2 text-gray" />
        </div>
      </div>

      {/* Currency List / Loading / Empty State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 size={60} className="text-blue-600 animate-spin" />
        </div>
      ) : filteredCurrencies.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 text-center rounded-lg shadow-sm border dark:border-gray-700">
          <IoWarningOutline className="text-error size-20 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 text-xl capitalize">
            No currencies found You Can Choose Anthor currencies.
          </p>
        </div>
      ) : (
        // --- Currency Grid ---
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCurrencies.map((currency) => (
            <div
              key={currency._id}
              className="rounded-xl overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              <div className="p-5 flex-grow">
                {/* Top Section: Flag, Code, Name */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Flag Image */}
                  {currency.flagImage ? (
                    <img
                      src={currency.flagImage}
                      alt={`${currency.currencyName} Flag`}
                      className="size-14 object-contain rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display =
                          "none"; /* Hide on error */
                      }}
                    />
                  ) : (
                    <div className="size-12 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                      No flag
                    </div>
                  )}
                  {/* Code and Name */}
                  <div className="flex-1">
                    {editingCurrencyId === currency._id ? (
                      <input
                        type="text"
                        name="code"
                        value={editingFields.code}
                        onChange={handleEditingInputChange}
                        className="text-lg font-bold text-main dark:text-white border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
                        autoFocus
                        maxLength={3}
                      />
                    ) : (
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {" "}
                        {currency.code}{" "}
                      </h3>
                    )}
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {" "}
                      {currency.currencyName}{" "}
                    </p>
                  </div>
                </div>

                {/* Rate Adjustment Section - UPDATED */}
                <div className="p-3 space-y-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <label className="font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                    Our Rates
                  </label>

                  {editingCurrencyId === currency._id ? (
                    <input
                      type="number"
                      name="rateAdjustmentPercentage" // Correct name
                      value={editingFields.rateAdjustmentPercentage}
                      onChange={handleEditingInputChange}
                      placeholder="e.g., 0.5 or +0.1"
                      step="any"
                      className="text-base font-semibold text-gray-800 dark:text-white border-b border-primary focus:outline-none bg-transparent w-full py-0.5"
                    />
                  ) : (
                    <p
                      className={`text-lg font-bold ${
                        currency.rateAdjustmentPercentage != null
                          ? "text-main font-medium dark:text-main-light"
                          : "text-gray-400 italic dark:text-gray-500"
                      }`}
                    >
                      {currency.rateAdjustmentPercentage != null
                        ? `${currency.rateAdjustmentPercentage.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }
                          )}%`
                        : "Not Set"}
                    </p>
                  )}
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Our Rates vs market rate.
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                {editingCurrencyId === currency._id ? (
                  // --- Save/Cancel Buttons ---
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateCurrency}
                      disabled={isSubmitting}
                      className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-blue-500 text-white font-medium px-4 py-3 rounded-md transition duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {isSubmitting ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Save size={20} />
                      )}{" "}
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex-1 flex justify-center cursor-pointer items-center gap-1.5 bg-error dark:bg-gray-700 dark:hover:bg-gray-600 text-white dark:text-gray-300 font-medium px-4 py-3 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                    >
                      <IoMdCloseCircle size={20} /> Cancel
                    </button>
                  </div>
                ) : (
                  // --- Details/Edit/Delete Buttons ---
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      href={`/admin/currencies/${currency._id}`}
                      className="flex-1 flex justify-center items-center gap-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium p-3 rounded-md transition duration-200 focus:outline-none"
                    >
                      <Info size={20} /> Details
                    </Link>
                    <button
                      onClick={() => startEditing(currency)}
                      className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium p-3 rounded-md transition duration-200 focus:outline-none"
                    >
                      <Edit size={20} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setCurrencyToDeleteId(currency._id);
                        setIsDeleteConfirmationOpen(true);
                        setError(null);
                      }}
                      className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400 font-medium p-3 rounded-md transition duration-200 focus:outline-none"
                    >
                      <Trash2 size={20} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Currency Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCreateModalOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto scrollbar-hide relative shadow-xl"
              initial={{ y: -30, opacity: 0, scale: 1 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 100, damping: 15 },
              }}
              exit={{ y: -30, opacity: 0, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-5 cursor-pointer right-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 ease-in-out"
                onClick={() => setIsCreateModalOpen(false)}
                aria-label="Close modal"
              >
                <IoClose className="size-10 text-main p-2" />
              </button>

              <div className="lg:p-6 p-4">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="lg:text-xl font-medium text-main dark:text-white">
                    {" "}
                    Add New Currency{" "}
                  </h2>
                </div>

                {/* Modal Error */}
                {error && isCreateModalOpen && (
                  <div className="mb-4 bg-red-50 border border-red-200 p-3 rounded flex items-center">
                    <AlertTriangle
                      size={18}
                      className="text-red-500 mr-2 flex-shrink-0"
                    />
                    <p className="text-red-700 dark:text-red-400 text-sm">
                      {error}
                    </p>
                  </div>
                )}

                {/* Modal Form */}
                <div className="space-y-5">
                  {/* Code */}
                  <div>
                    <label
                      htmlFor="create-code"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {" "}
                      Currency Code <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      id="create-code"
                      name="code"
                      value={newCurrencyData.code}
                      onChange={handleCreateInputChange}
                      maxLength={3}
                      placeholder="e.g., USD"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-3.5 hover:shadow-darkcolor focus:outline-none transition-shadow ease-in-out duration-300 sm:text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      3-letter uppercase code.
                    </p>
                  </div>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="create-currencyName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {" "}
                      Currency Name <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      id="create-currencyName"
                      name="currencyName"
                      value={newCurrencyData.currencyName}
                      onChange={handleCreateInputChange}
                      placeholder="e.g., US Dollar"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-3.5 hover:shadow-darkcolor focus:outline-none transition-shadow ease-in-out duration-300 sm:text-sm"
                    />
                  </div>
                  {/* Flag Image Path */}
                  <div>
                    <label
                      htmlFor="create-flagImage"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {" "}
                      Flag Image Path{" "}
                    </label>
                    <input
                      type="text"
                      id="create-flagImage"
                      name="flagImage"
                      value={newCurrencyData.flagImage}
                      onChange={handleCreateInputChange}
                      placeholder="/assets/icon/flags/usd.png"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-3.5 hover:shadow-darkcolor focus:outline-none transition-shadow ease-in-out duration-300 sm:text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Relative path to the image.
                    </p>
                  </div>
                  {/* Rate Adjustment Percentage - UPDATED */}
                  <div>
                    <label
                      htmlFor="create-rateAdjustmentPercentage"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"
                    >
                      <Percent size={14} className="dark:text-gray-300" /> Rate
                      Adjustment
                    </label>
                    <input
                      type="number"
                      id="create-rateAdjustmentPercentage"
                      name="rateAdjustmentPercentage" // Correct name
                      value={newCurrencyData.rateAdjustmentPercentage}
                      onChange={handleCreateInputChange}
                      step="any"
                      placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-3.5 hover:shadow-darkcolor focus:outline-none transition-shadow ease-in-out duration-300 sm:text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Enter percentage adjustment. Default is 0%.
                    </p>
                  </div>

                  {/* Add other fields here if needed (bank details, fees) */}
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleCreateCurrency}
                    disabled={
                      isSubmitting ||
                      !newCurrencyData.code ||
                      !newCurrencyData.currencyName
                    }
                    className="flex-1 flex justify-center cursor-pointer items-center gap-2 bg-primary text-main dark:bg-primaryDark dark:text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
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
                    className="flex-1 cursor-pointer flex justify-center items-center gap-2 bg-error text-white font-medium py-2.5 px-4 rounded-lg transition focus:outline-none"
                  >
                    <MdCancel size={20} /> Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteConfirmationOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDeleteConfirmationOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative"
              initial={{ y: -30, opacity: 0, scale: 0.95 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 100, damping: 15 },
              }}
              exit={{ y: -30, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* <button
                className="absolute top-3 right-3 p-2 text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 ease-in-out"
                onClick={() => setIsDeleteConfirmationOpen(false)}
                aria-label="Close modal"
              >
                <IoClose size={24} />
              </button> */}
              {/* Icon and Title */}
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center mb-4">
                  <Image
                    src="/assets/images/exclamation-mark-medium@2x.webp"
                    width={200}
                    height={200}
                    alt="Picture of the author"
                  />
                </div>
                <h3 className="text-2xl leading-6 font-medium text-main dark:text-white">
                  Delete Currency
                </h3>
                <div className="mt-4">
                  <p className="text-gray-500 text-lg leading-relaxed dark:text-gray-400">
                    Are you sure you want to delete this currency? This action
                    cannot be undone.
                  </p>{" "}
                </div>
              </div>
              {/* Error within modal */}
              {error && isDeleteConfirmationOpen && (
                <div className="bg-red-50 border border-red-200 p-3 rounded flex items-center">
                  <AlertTriangle
                    size={18}
                    className="text-red-500 mr-2 flex-shrink-0"
                  />
                  <p className="text-red-700 dark:text-red-400 text-sm">
                    {error}
                  </p>
                </div>
              )}
              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handleDeleteCurrency}
                  disabled={isSubmitting}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent px-4 py-3 cursor-pointer bg-red-600 font-medium text-white focus:outline-none sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </button>
                <button
                  onClick={() => setIsDeleteConfirmationOpen(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-3 cursor-pointer bg-white dark:bg-gray-700 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCurrenciesPage;
