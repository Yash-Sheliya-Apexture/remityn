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
//                 <span className="inline-block sm:inmainsssa1 font-mediume}</span>
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
//                     <input type="number" id="wiseFeePercentage" name="wiseFeePercentage" value={currency.wiseFeePercentage !== undefined ? currency.wiseFeePercentage : 0} onChange={handleChange} step="0.0001" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency details updated successfully!");

//       // // Optional: Auto-redirect after success
//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//       setSuccessMessage(null);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
//         <div className="w-full max-w-4xl animate-pulse">
//           <div className="space-y-4">
//             {[...Array(10)].map((_, i) => (
//               <div key={i} className="h-10 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-red-50 p-6">
//         <div className="text-red-600 text-xl font-semibold">Error: {error}</div>
//       </div>
//     );

//   if (!currency)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
//         <div className="text-gray-600 text-xl font-semibold">
//           Currency not found.
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       {/* Success Message Overlay */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ y: -50, opacity: 0 }} // Start slightly above and faded out
//             animate={{ y: 0, opacity: 1 }} // Slide down to position and fade in
//             exit={{ y: -50, opacity: 0 }} // Slide back up and fade out
//             transition={{
//               type: "spring", // Use spring for a bouncy effect
//               stiffness: 100, // Stiffness of the spring (higher = stiffer)
//               damping: 10, // Damping of the spring (higher = less bouncy)
//             }}
//             className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50"
//           >
//             <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               <span className="text-lg">{successMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Back Arrow option create */}

//       <div className="w-full max-w-4xl bg-white shadow-md rounded-xl overflow-hidden">
//         <div className="bg-gradient-to-tr from-[#78d3ff] to-[#326f7d] p-6">
//           <h1 className="text-2xl text-end font-medium text-white">
//             Edit Currency: {currency.code}
//           </h1>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 space-y-6">
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Currency Code (Read-only) */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Currency Code
//               </label>
//               <input
//                 type="text"
//                 value={currency.code}
//                 readOnly
//                 className="w-full px-4 py-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg focus:outline-none"
//               />
//             </div>

//             {/* Currency Name */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Currency Name
//               </label>
//               <input
//                 type="text"
//                 name="currencyName"
//                 value={currency.currencyName || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//             </div>

//             {/* Flag Image Path Input */}
//             <div className="relative">
//               <label
//                 htmlFor="flagImage"
//                 className="inline-block text-main mb-1 font-medium"
//               >
//                 Flag Image Path
//               </label>
//               <input
//                 type="text"
//                 id="flagImage"
//                 name="flagImage"
//                 value={currency.flagImage || ""}
//                 onChange={handleChange}
//                 placeholder="/assets/icon/flags/curreny-code.png"
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//               {currency.flagImage && (
//                 <div className="mt-2 flex gap-1 items-center absolute top-7 right-2">
//                   {/* <h1 className="text-main text-sm">Preview</h1> */}
//                   <img
//                     src={currency.flagImage}
//                     alt="Current Flag"
//                     className="size-8"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* IBAN */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 IBAN
//               </label>
//               <input
//                 type="text"
//                 name="iban"
//                 value={currency.iban || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//             </div>

//             {/* BIC/SWIFT */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 BIC/SWIFT
//               </label>
//               <input
//                 type="text"
//                 name="bicSwift"
//                 value={currency.bicSwift || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//             </div>

//             {/* Wise Fee Percentage */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Wise Fee Percentage
//               </label>
//               <input
//                 type="number"
//                 name="wiseFeePercentage"
//                 value={currency.wiseFeePercentage || 0}
//                 onChange={handleChange}
//                 step="0.0001"
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//             </div>

//             {/* Bank Transfer Fee */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Bank Transfer Fee
//               </label>
//               <input
//                 type="number"
//                 name="bankTransferFee"
//                 value={currency.bankTransferFee || 0}
//                 onChange={handleChange}
//                 step="0.01"
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//             </div>
//           </div>

//           {/* Bank Address */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Bank Address
//             </label>
//             <textarea
//               name="bankAddress"
//               value={currency.bankAddress || ""}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none min-h-[120px]"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-[#78d3ff] to-[#326f7d] text-main font-medium text-lg py-4 rounded-lg transition duration-300 hover:opacity-90 disabled:opacity-50"
//             >
//               {isSubmitting ? "Updating..." : "Update Currency"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link"; // Import Link from next/link
// import { FaArrowLeftLong } from "react-icons/fa6";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency details updated successfully!");

//       // // Optional: Auto-redirect after success
//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//       setSuccessMessage(null);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
//         <div className="w-full max-w-4xl animate-pulse">
//           <div className="space-y-4">
//             {[...Array(10)].map((_, i) => (
//               <div key={i} className="h-10 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-red-50 p-6">
//         <div className="text-red-600 text-xl font-semibold">Error: {error}</div>
//       </div>
//     );

//   if (!currency)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
//         <div className="text-gray-600 text-xl font-semibold">
//           Currency not found.
//         </div>
//       </div>
//     );

//   return (
//     <>
//       {/* Back Arrow option create */}
//       <div className="container mx-auto my-4">
//         <Link
//           href="/admin/currencies"
//           className="text-secondary text-lg font-medium py-2 px-4 inline-flex  gap-2 items-center"
//         >
//           <FaArrowLeftLong />
//           <span>Go Back</span>
//         </Link>
//       </div>

//       <div className="min-h-screen flex  items-center justify-center p-4">
//         {/* Success Message Overlay */}
//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: -50, opacity: 0 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 100,
//                 damping: 10,
//               }}
//               className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50"
//             >
//               <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//                 <span className="text-lg">{successMessage}</span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="w-full max-w-4xl bg-white shadow-md rounded-xl overflow-hidden">
//           <div className="bg-gradient-to-tr from-[#78d3ff] to-[#326f7d] p-6">
//             <h1 className="text-2xl text-center font-medium text-secondary" >
//               Edit Currency: {currency.code}
//             </h1>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Currency Code (Read-only) */}
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Currency Code
//                 </label>
//                 <input
//                   type="text"
//                   value={currency.code}
//                   readOnly
//                   className="w-full px-4 py-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg focus:outline-none"
//                 />
//               </div>

//               {/* Currency Name */}
//               <div>
//                 <label className="inline-block text-gray font-medium mb-2">
//                   Currency Name
//                 </label>
//                 <input
//                   type="text"
//                   name="currencyName"
//                   value={currency.currencyName || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//               </div>

//               {/* Flag Image Path Input */}
//               <div className="relative">
//                 <label
//                   htmlFor="flagImage"
//                   className="inline-block text-gray mb-2 font-medium"
//                 >
//                   Flag Image Path (e.g., /assets/flags/usd.png)
//                 </label>
//                 <input
//                   type="text"
//                   id="flagImage"
//                   name="flagImage"
//                   value={currency.flagImage || ""}
//                   onChange={handleChange}
//                   placeholder="/assets/icon/flags/curreny-code.png"
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//                 {currency.flagImage && (
//                   <div className="mt-2 flex gap-1 items-center absolute top-8 right-2">
//                     {/* <h1 className="text-main text-sm">Preview</h1> */}
//                     <img
//                       src={currency.flagImage}
//                       alt="Current Flag"
//                       className="size-8"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* IBAN */}
//               <div>
//                 <label className="inline-block text-gray font-medium mb-2">
//                   IBAN
//                 </label>
//                 <input
//                   type="text"
//                   name="iban"
//                   value={currency.iban || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//               </div>

//               {/* BIC/SWIFT */}
//               <div>
//                 <label className="inline-block text-gray font-medium mb-2">
//                   BIC/SWIFT
//                 </label>
//                 <input
//                   type="text"
//                   name="bicSwift"
//                   value={currency.bicSwift || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//               </div>

//               {/* Wise Fee Percentage */}
//               <div>
//                 <label className="inline-block text-gray font-medium mb-2">
//                   Wise Fee Percentage
//                 </label>
//                 <input
//                   type="number"
//                   name="wiseFeePercentage"
//                   value={currency.wiseFeePercentage || 0}
//                   onChange={handleChange}
//                   step="0.0001"
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//               </div>

//               {/* Bank Transfer Fee */}
//               <div>
//                 <label className="inline-block text-gray font-medium mb-2">
//                   Bank Transfer Fee
//                 </label>
//                 <input
//                   type="number"
//                   name="bankTransferFee"
//                   value={currency.bankTransferFee || 0}
//                   onChange={handleChange}
//                   step="0.01"
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Bank Address */}
//             <div>
//               <label className="inline-block text-gray font-medium mb-2">
//                 Bank Address
//               </label>
//               <textarea
//                 name="bankAddress"
//                 value={currency.bankAddress || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none min-h-[120px]"
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-gradient-to-r text-lg from-[#78d3ff] to-[#326f7d] text-main font-medium py-4 rounded-lg disabled:opacity-50"
//               >
//                 {isSubmitting ? "Updating..." : "Update Currency"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import { FaArrowLeftLong } from "react-icons/fa6";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency details updated successfully!");

//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//       setSuccessMessage(null);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-slate-50 p-6">
//         <div className="w-full max-w-4xl">
//           <div className="space-y-4">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-10 bg-slate-200 rounded-md animate-pulse"
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-red-50 p-6">
//         <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500">
//           <h2 className="text-red-600 text-xl font-semibold mb-2">Error</h2>
//           <p className="text-slate-700">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!currency) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-slate-50 p-6">
//         <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-amber-500">
//           <h2 className="text-amber-600 text-xl font-semibold mb-2">
//             Not Found
//           </h2>
//           <p className="text-slate-700">Currency not found.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Success Message Toast */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -50, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 100, damping: 10 }}
//             className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
//           >
//             <div className="bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span>{successMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Back Navigation */}
//       <div className="container mx-auto pt-6 px-4">
//         <Link
//           href="/admin/currencies"
//           className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors font-medium"
//         >
//           <FaArrowLeftLong className="text-sm" />
//           <span>Back to Currencies</span>
//         </Link>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Currency Card */}
//           <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//             {/* Header */}
//             <div className="relative">
//               <div className="bg-gradient-to-r from-sky-400 to-cyan-600 h-16"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="bg-white px-8 py-3 rounded-full shadow-md">
//                   <h1 className="text-xl font-semibold text-slate-800">
//                     Edit Currency:{" "}
//                     <span className="text-cyan-600">{currency.code}</span>
//                   </h1>
//                 </div>
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="p-8">
//               <div className="grid md:grid-cols-2 gap-6">
//                 {/* Currency Code */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Currency Code
//                   </label>
//                   <input
//                     type="text"
//                     value={currency.code}
//                     readOnly
//                     className="w-full px-4 py-2.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg focus:outline-none"
//                   />
//                 </div>

//                 {/* Currency Name */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Currency Name
//                   </label>
//                   <input
//                     type="text"
//                     name="currencyName"
//                     value={currency.currencyName || ""}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
//                   />
//                 </div>

//                 {/* Flag Image */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Flag Image Path
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       id="flagImage"
//                       name="flagImage"
//                       value={currency.flagImage || ""}
//                       onChange={handleChange}
//                       placeholder="/assets/icon/flags/currency-code.png"
//                       className="w-full pl-4 pr-12 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                     />
//                     {currency.flagImage && (
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                         <img
//                           src={currency.flagImage}
//                           alt="Flag"
//                           className="h-6 w-auto rounded-sm"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* IBAN */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     IBAN
//                   </label>
//                   <input
//                     type="text"
//                     name="iban"
//                     value={currency.iban || ""}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 {/* BIC/SWIFT */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     BIC/SWIFT
//                   </label>
//                   <input
//                     type="text"
//                     name="bicSwift"
//                     value={currency.bicSwift || ""}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 {/* Wise Fee Percentage */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Wise Fee Percentage
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="wiseFeePercentage"
//                       value={currency.wiseFeePercentage || 0}
//                       onChange={handleChange}
//                       step="0.0001"
//                       className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                       <span className="text-slate-400">%</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bank Transfer Fee */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Bank Transfer Fee
//                   </label>
//                   <div className="relative">
//                     <input
//                       name="bankTransferFee"
//                       value={currency.bankTransferFee || 0}
//                       onChange={handleChange}
//                       step="0.01"
//                       className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Bank Address */}
//               <div className="mt-6 space-y-2">
//                 <label className="block text-sm font-medium text-slate-700">
//                   Bank Address
//                 </label>
//                 <textarea
//                   name="bankAddress"
//                   value={currency.bankAddress || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all min-h-32 resize-y"
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="mt-8">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center justify-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       <span>Updating...</span>
//                     </div>
//                   ) : (
//                     "Update Currency"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import {
//   FaArrowLeft,
//   FaGlobe,
//   FaMoneyBillWave,
//   FaUniversity,
//   FaCreditCard,
//   FaPercentage,
// } from "react-icons/fa";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("details");
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency updated successfully!");

//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
//   };

//   // Skeleton loading component
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="h-20 bg-gray-200 animate-pulse"></div>
//             <div className="p-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[...Array(6)].map((_, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
//                     <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//                 <div className="md:col-span-2 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
//                   <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <div className="h-12 bg-blue-100 rounded animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-red-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-red-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Not found state
//   if (!currency) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-yellow-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-yellow-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Currency Not Found
//             </h2>
//             <p className="text-gray-600 mb-6">
//               The requested currency could not be found in our system.
//             </p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -100 }}
//             className="fixed top-0 left-0 right-0 z-50 flex justify-center"
//           >
//             <div className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <span className="font-medium">{successMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {/* Navigation */}
//         <div className="mb-6 px-4 sm:px-0">
//           <Link
//             href="/admin/currencies"
//             className="group flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
//           >
//             <FaArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
//             Back to Currencies
//           </Link>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Currency Header */}
//           <div className="relative">
//             <div className="bg-gradient-to-r from-blue-500 via-pri to-purple-500 h-48 flex items-end">
//               <div className="absolute top-0 left-0 w-full h-full opacity-20">
//                 <div
//                   className="absolute inset-0"
//                   style={{
//                     backgroundImage:
//                       "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
//                   }}
//                 ></div>
//               </div>
//               <div className="flex items-center mx-auto container px-4 sm:px-6 lg:px-8 relative z-10 pb-8">
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="flex items-center"
//                 >
//                   {currency.flagImage && (
//                     <img
//                       src={currency.flagImage}
//                       alt={`${currency.code} flag`}
//                       className="h-12 w-auto mr-4 rounded shadow-md"
//                     />
//                   )}
//                   <div>
//                     <h1 className="text-3xl font-bold text-white">
//                       {currency.code}
//                     </h1>
//                     <p className="text-blue-100">
//                       {currency.currencyName || "Currency Details"}
//                     </p>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </div>

//           {/* Currency Card */}
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-8">
//             <div className="bg-white rounded-xl shadow-lg p-1">
//               {/* Tab Navigation */}
//               <div className="flex border-b border-gray-200">
//                 <button
//                   className={`flex-1 py-4 px-4 text-center font-medium text-sm rounded-tl-lg ${
//                     activeTab === "details"
//                       ? "text-indigo-600 border-b-2 border-pri"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                   onClick={() => setActiveTab("details")}
//                 >
//                   General Details
//                 </button>
//                 <button
//                   className={`flex-1 py-4 px-4 text-center font-medium text-sm ${
//                     activeTab === "banking"
//                       ? "text-indigo-600 border-b-2 border-pri"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                   onClick={() => setActiveTab("banking")}
//                 >
//                   Banking Details
//                 </button>
//                 <button
//                   className={`flex-1 py-4 px-4 text-center font-medium text-sm rounded-tr-lg ${
//                     activeTab === "fees"
//                       ? "text-indigo-600 border-b-2 border-indigo-500"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                   onClick={() => setActiveTab("fees")}
//                 >
//                   Fees
//                 </button>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit}>
//                 <div className="p-6">
//                   {/* General Details */}
//                   <div className={activeTab === "details" ? "block" : "hidden"}>
//                     <div className="space-y-6">
//                       {/* Code Field */}
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <div className="flex items-center mb-2">
//                           <FaGlobe className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="block text-sm font-medium text-gray-700">
//                             Currency Code
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           value={currency.code}
//                           readOnly
//                           className="w-full px-4 py-3 bg-gray-100 text-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent"
//                         />
//                         <p className="mt-1 text-xs text-gray-500">
//                           Currency code cannot be changed
//                         </p>
//                       </div>

//                       {/* Currency Name */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaMoneyBillWave className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="block text-sm font-medium text-gray-700">
//                             Currency Name
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="currencyName"
//                           value={currency.currencyName || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. Euro, US Dollar"
//                           className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300"
//                         />
//                       </div>

//                       {/* Flag Image */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="h-5 w-5 text-indigo-500 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                           </svg>
//                           <label className="block text-sm font-medium text-gray-700">
//                             Flag Image Path
//                           </label>
//                         </div>
//                         <div className="flex space-x-4">
//                           <div className="flex-grow">
//                             <input
//                               type="text"
//                               id="flagImage"
//                               name="flagImage"
//                               value={currency.flagImage || ""}
//                               onChange={handleChange}
//                               placeholder="/assets/flags/currency-code.png"
//                               className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300"
//                             />
//                           </div>
//                           {currency.flagImage && (
//                             <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg border border-gray-200">
//                               <img
//                                 src={currency.flagImage}
//                                 alt="Flag preview"
//                                 className="max-w-full max-h-full"
//                               />
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Banking Details */}
//                   <div className={activeTab === "banking" ? "block" : "hidden"}>
//                     <div className="space-y-6">
//                       {/* IBAN */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaCreditCard className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="block text-sm font-medium text-gray-700">
//                             IBAN
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="iban"
//                           value={currency.iban || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. DE89370400440532013000"
//                           className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300"
//                         />
//                       </div>

//                       {/* BIC/SWIFT */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="h-5 w-5 text-indigo-500 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                             />
//                           </svg>
//                           <label className="block text-sm font-medium text-gray-700">
//                             BIC/SWIFT
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="bicSwift"
//                           value={currency.bicSwift || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. DEUTDEFF"
//                           className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300"
//                         />
//                       </div>

//                       {/* Bank Address */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaUniversity className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="block text-sm font-medium text-gray-700">
//                             Bank Address
//                           </label>
//                         </div>
//                         <textarea
//                           name="bankAddress"
//                           value={currency.bankAddress || ""}
//                           onChange={handleChange}
//                           placeholder="Enter complete bank address"
//                           className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300 min-h-32"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fees */}
//                   <div className={activeTab === "fees" ? "block" : "hidden"}>
//                     <div className="space-y-6">
//                       {/* Wise Fee Percentage */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaPercentage className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="block text-sm font-medium text-gray-700">
//                             Wise Fee Percentage
//                           </label>
//                         </div>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             name="wiseFeePercentage"
//                             value={currency.wiseFeePercentage || 0}
//                             onChange={handleChange}
//                             step="0.0001"
//                             placeholder="0.0000"
//                             className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300 pr-12"
//                           />
//                           <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                             <span className="text-gray-500">%</span>
//                           </div>
//                         </div>
//                         <p className="mt-1 text-xs text-gray-500">
//                           The fee percentage charged by Wise for this currency
//                         </p>
//                       </div>

//                       {/* Bank Transfer Fee */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="h-5 w-5 text-indigo-500 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                           <label className="block text-sm font-medium text-gray-700">
//                             Bank Transfer Fee
//                           </label>
//                         </div>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             name="bankTransferFee"
//                             value={currency.bankTransferFee || 0}
//                             onChange={handleChange}
//                             step="0.01"
//                             placeholder="0.00"
//                             className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300 pr-16"
//                           />
//                           <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                             <span className="text-gray-500">
//                               {currency.code}
//                             </span>
//                           </div>
//                         </div>
//                         <p className="mt-1 text-xs text-gray-500">
//                           The fixed fee charged for bank transfers in this
//                           currency
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
//                   <Link
//                     href="/admin/currencies"
//                     className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   >
//                     Cancel
//                   </Link>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         <span>Updating...</span>
//                       </span>
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import {
//   FaArrowLeft,
//   FaGlobe,
//   FaMoneyBillWave,
//   FaUniversity,
//   FaCreditCard,
//   FaPercentage,
// } from "react-icons/fa";
// import { TbPointFilled } from "react-icons/tb";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency updated successfully!");

//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
//   };

//   // Skeleton loading component
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="h-20 bg-gray-200 animate-pulse"></div>
//             <div className="p-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[...Array(6)].map((_, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
//                     <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//                 <div className="md:col-span-2 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
//                   <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <div className="h-12 bg-blue-100 rounded animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-red-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-red-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-7"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Not found state
//   if (!currency) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-yellow-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-yellow-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Currency Not Found
//             </h2>
//             <p className="text-gray-600 mb-6">
//               The requested currency could not be found in our system.
//             </p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -100 }}
//             className="fixed top-0 left-0 right-0 z-50 flex justify-center"
//           >
//             <div className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <span className="font-medium">{successMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-4xl mx-auto py-6 sm:px-6">
//         {/* Navigation */}
//         <div className="mb-6 px-4 sm:px-0">
//           <Link
//             href="/admin/currencies"
//             className="group flex items-center  font-medium text-main transition-colors"
//           >
//             <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
//             Back to Currencies
//           </Link>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
//           {/* Currency Header */}
//           <div className="relative">
//             <div className="h-26 flex items-end bg-indigo-300/50">
//               <div className="flex items-center mx-auto container px-4 relative z-10 pb-6">
//                 <div className="flex items-center">
//                   {currency.flagImage && (
//                     <img
//                       src={currency.flagImage}
//                       alt={`${currency.code} flag`}
//                       className="h-14 w-auto mr-4"
//                     />
//                   )}
//                   <div className="text-main leading-relaxed">
//                     <h1 className="font-bold text-2xl">{currency.code}</h1>
//                     <p className="font-medium">
//                       {currency.currencyName || "Currency Details"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Currency Form */}
//           <div className="container mx-auto px-4">
//             {/* General Details Section */}
//             <h2 className="text-2xl flex items-center gap-2 font-medium text-main my-4">
//               <TbPointFilled className="size-5" />
//               General Details
//             </h2>
//             <div className="bg-white rounded-xl p-4">
//               <form onSubmit={handleSubmit}>
//                 <div className="space-y-8">
//                   <div className="">
//                     <div className="space-y-6">
//                       {/* Code Field */}
//                       <div className="General-Code">
//                         <div className="flex items-center gap-2 mb-2">
//                           <FaGlobe className="size-5 text-indigo-500" />
//                           <label className="inline-block font-medium text-main">
//                             Currency Code
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           value={currency.code}
//                           readOnly
//                           className="w-full p-4 bg-gray-100 text-main border border-gray-300 rounded-lg focus:outline-none"
//                         />
//                         <p className="mt-1 capitalize text-sm text-main font-medium">
//                           Currency code cannot be changed
//                         </p>
//                       </div>

//                       {/* Currency Name */}
//                       <div>
//                         <div className="flex items-center mb-2 gap-2">
//                           <FaMoneyBillWave className="h-5 w-5 text-indigo-500" />
//                           <label className="inline-block font-medium text-main">
//                             Currency Name
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="currencyName"
//                           value={currency.currencyName || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. Euro, US Dollar"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>

//                       {/* Flag Image */}
//                       <div>
//                         <div className="flex items-center gap-2 mb-2">
//                           <svg
//                             className="size-6 text-indigo-500"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                           </svg>
//                           <label className="inline-block font-medium text-main">
//                             Flag Image Path
//                           </label>
//                         </div>

//                         <div className="flex">
//                           <div className="flex-grow relative">
//                             <input
//                               type="text"
//                               id="flagImage"
//                               name="flagImage"
//                               value={currency.flagImage || ""}
//                               onChange={handleChange}
//                               placeholder="/assets/flags/currency-code.png"
//                               className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                             />
//                             {currency.flagImage && (
//                               <div className="absolute top-1 right-1 size-12">
//                                 <img
//                                   src={currency.flagImage}
//                                   alt="Flag preview"
//                                   className="max-w-full max-h-full p-0.5"
//                                 />
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h2 className="text-2xl flex items-center gap-2 -ml-4 font-medium text-main my-6">
//                       <TbPointFilled className="size-5" />
//                       Bank Details
//                     </h2>
//                     <div className="space-y-6">
//                       {/* IBAN */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaCreditCard className="size-5 text-indigo-500 mr-2" />
//                           <label className="inline-block font-medium text-main">
//                             IBAN
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="iban"
//                           value={currency.iban || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. DE89370400440532013000"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>

//                       {/* BIC/SWIFT */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="size-5 text-indigo-500 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                             />
//                           </svg>
//                           <label className="inline-block font-medium text-main">
//                             BIC/SWIFT
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="bicSwift"
//                           value={currency.bicSwift || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. DEUTDEFF"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>

//                       {/* Bank Address */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaUniversity className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="inline-block font-medium text-main">
//                             Bank Address
//                           </label>
//                         </div>
//                         <textarea
//                           name="bankAddress"
//                           value={currency.bankAddress || ""}
//                           onChange={handleChange}
//                           cols={10}
//                           rows={3}
//                           placeholder="Enter complete bank address"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-4 flex justify-end space-x-4">
//                   <Link
//                     href="/admin/currencies"
//                     className="inline-flex justify-center py-3 px-10 border border-gray-300 font-medium rounded-lg text-main bg-white focus:outline-none"
//                   >
//                     Cancel
//                   </Link>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="inline-flex justify-center cursor-pointer py-3 px-10 border border-transparent font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-700 transition-colors ease-in-out duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-2 size-4 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         <span>Updating...</span>
//                       </span>
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import apiConfig from "../../../config/apiConfig";
import Link from "next/link";
import {
  FaArrowLeft,
  FaGlobe,
  FaMoneyBillWave,
  FaUniversity,
  FaCreditCard,
  FaPercentage,
} from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";

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
  flagImage?: string;
  currencyName?: string;
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
  const [flagImageError, setFlagImageError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrency = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/admin/currencies/${currencyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrency(response.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to load currency details"
        );
        setIsLoading(false);
      }
    };

    if (currencyId) {
      fetchCurrency();
    }
  }, [currencyId, token]);

  const validateForm = () => {
    let isValid = true;
    setFlagImageError(null);

    if (!currency?.flagImage?.trim()) {
      setFlagImageError("Flag Image Path is required.");
      isValid = false;
    } else if (currency.flagImage.includes(" ")) {
      setFlagImageError("Flag Image Path should not contain spaces.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.put(`/admin/currencies/${currencyId}`, currency, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsSubmitting(false);
      setSuccessMessage("Currency updated successfully!");

      setTimeout(() => {
        router.push("/admin/currencies");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update currency");
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));

    if (e.target.name === "flagImage") {
      setFlagImageError(null); // Clear error when user types
    }
  };

  // Skeleton loading component
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-20 bg-gray-200 animate-pulse"></div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                ))}
                <div className="md:col-span-2 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="mt-8">
                <div className="h-12 bg-blue-100 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-red-500 h-2"></div>
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/admin/currencies"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-7"
            >
              Return to Currencies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (!currency) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-yellow-500 h-2"></div>
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-6">
              <svg
                className="w-8 h-8 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Currency Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The requested currency could not be found in our system.
            </p>
            <Link
              href="/admin/currencies"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Return to Currencies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center"
          >
            <div className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="font-medium">{successMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto py-6 sm:px-6">
        {/* Navigation */}
        <div className="mb-6 px-4 sm:px-0">
          <Link
            href="/admin/currencies"
            className="group flex items-center  font-medium text-main transition-colors"
          >
            <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Currencies
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
          {/* Currency Header */}
          <div className="relative">
            <div className="h-26 flex items-end bg-primary/40">
              <div className="flex items-center mx-auto container px-4 relative z-10 pb-6">
                <div className="flex items-center">
                  {currency.flagImage && (
                    <img
                      src={currency.flagImage}
                      alt={`${currency.code} flag`}
                      className="h-14 w-auto mr-4"
                    />
                  )}
                  <div className="text-main leading-relaxed">
                    <h1 className="font-bold text-2xl">{currency.code}</h1>
                    <p className="font-medium">
                      {currency.currencyName || "Currency Details"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Currency Form */}
          <div className="container mx-auto px-4">
            {/* General Details Section */}
            <h2 className="text-2xl flex items-center gap-2 font-medium text-main my-4">
              <TbPointFilled className="size-5" />
              General Details
            </h2>
            <div className="bg-white rounded-xl p-4">
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  <div className="">
                    <div className="space-y-6">
                      {/* Code Field */}
                      <div className="General-Code">
                        <div className="flex items-center gap-2 mb-2">
                          <FaGlobe className="size-5 text-primary dark:text-main" />
                          <label className="inline-block font-medium text-main">
                            Currency Code
                          </label>
                        </div>
                        <input
                          type="text"
                          value={currency.code}
                          readOnly
                          className="w-full p-4 bg-gray-100 text-main border border-gray-300 rounded-lg focus:outline-none"
                        />
                        <p className="mt-1 capitalize text-sm text-main font-medium">
                          Currency code cannot be changed
                        </p>
                      </div>

                      {/* Currency Name */}
                      <div>
                        <div className="flex items-center mb-2 gap-2">
                          <FaMoneyBillWave className="h-5 w-5 text-primary dark:text-main" />
                          <label className="inline-block font-medium text-main">
                            Currency Name
                          </label>
                        </div>
                        <input
                          type="text"
                          name="currencyName"
                          value={currency.currencyName || ""}
                          onChange={handleChange}
                          placeholder="e.g. Euro, US Dollar"
                          className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
                        />
                      </div>

                      {/* Flag Image */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            className="size-6 text-primary dark:text-main"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <label className="inline-block font-medium text-main">
                            Flag Image Path
                          </label>
                        </div>

                        <div className="flex flex-col">
                          <div className="flex-grow relative">
                            <input
                              type="text"
                              id="flagImage"
                              name="flagImage"
                              value={currency.flagImage || ""}
                              onChange={handleChange}
                              placeholder="/assets/flags/currency-code.png"
                              className={`w-full p-4 bg-white text-main font-medium border ${
                                flagImageError
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg focus:outline-none transition-all`}
                            />
                            {currency.flagImage && (
                              <div className="absolute top-1 right-1 size-12">
                                <img
                                  src={currency.flagImage}
                                  alt="Flag preview"
                                  className="max-w-full max-h-full p-0.5"
                                />
                              </div>
                            )}
                          </div>
                          {flagImageError && (
                            <p className="mt-1 text-sm text-red-500 font-medium">
                              {flagImageError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl flex items-center gap-2 -ml-4 font-medium text-main my-6">
                      <TbPointFilled className="size-5" />
                      Bank Details
                    </h2>
                    <div className="space-y-6">
                      {/* IBAN */}
                      <div>
                        <div className="flex items-center mb-2">
                          <FaCreditCard className="size-5 text-primary dark:text-main mr-2" />
                          <label className="inline-block font-medium text-main">
                            IBAN
                          </label>
                        </div>
                        <input
                          type="text"
                          name="iban"
                          value={currency.iban || ""}
                          onChange={handleChange}
                          placeholder="e.g. DE89370400440532013000"
                          className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
                        />
                      </div>

                      {/* BIC/SWIFT */}
                      <div>
                        <div className="flex items-center mb-2">
                          <svg
                            className="size-5 text-primary dark:text-main mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          <label className="inline-block font-medium text-main">
                            BIC/SWIFT
                          </label>
                        </div>
                        <input
                          type="text"
                          name="bicSwift"
                          value={currency.bicSwift || ""}
                          onChange={handleChange}
                          placeholder="e.g. DEUTDEFF"
                          className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
                        />
                      </div>

                      {/* Bank Address */}
                      <div>
                        <div className="flex items-center mb-2">
                          <FaUniversity className="h-5 w-5 text-primary  mr-2" />
                          <label className="inline-block font-medium text-main">
                            Bank Address
                          </label>
                        </div>
                        <textarea
                          name="bankAddress"
                          value={currency.bankAddress || ""}
                          onChange={handleChange}
                          cols={10}
                          rows={3}
                          placeholder="Enter complete bank address"
                          className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-end space-x-4">
                  <Link
                    href="/admin/currencies"
                    className="inline-flex justify-center py-3 px-10 border border-gray-300 font-medium rounded-lg text-main bg-white focus:outline-none"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center cursor-pointer py-3 px-10 border border-transparent font-medium rounded-lg text-secondary bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 size-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Updating...</span>
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditCurrencyPage;
