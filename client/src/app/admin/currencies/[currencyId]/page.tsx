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

"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import apiConfig from "../../../config/apiConfig";
import Link from "next/link"; // Import Link from next/link
import { FaArrowLeftLong } from "react-icons/fa6";

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.put(`/admin/currencies/${currencyId}`, currency, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsSubmitting(false);
      setSuccessMessage("Currency details updated successfully!");

      // // Optional: Auto-redirect after success
      setTimeout(() => {
        router.push("/admin/currencies");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update currency");
      setIsSubmitting(false);
      setSuccessMessage(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
        <div className="w-full max-w-4xl animate-pulse">
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50 p-6">
        <div className="text-red-600 text-xl font-semibold">Error: {error}</div>
      </div>
    );

  if (!currency)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
        <div className="text-gray-600 text-xl font-semibold">
          Currency not found.
        </div>
      </div>
    );

  return (
    <>
      {/* Back Arrow option create */}
      <div className="container mx-auto my-4">
        <Link
          href="/admin/currencies"
          className="text-secondary text-lg font-medium py-2 px-4 inline-flex  gap-2 items-center"
        >
          <FaArrowLeftLong />
          <span>Go Back</span>
        </Link>
      </div>
      
      <div className="min-h-screen flex  items-center justify-center p-4">
        {/* Success Message Overlay */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-lg">{successMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>



        <div className="w-full max-w-4xl bg-white shadow-md rounded-xl overflow-hidden">
          <div className="bg-gradient-to-tr from-[#78d3ff] to-[#326f7d] p-6">
            <h1 className="text-2xl text-center font-medium text-secondary" >
              Edit Currency: {currency.code}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Currency Code (Read-only) */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Currency Code
                </label>
                <input
                  type="text"
                  value={currency.code}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>

              {/* Currency Name */}
              <div>
                <label className="inline-block text-gray font-medium mb-2">
                  Currency Name
                </label>
                <input
                  type="text"
                  name="currencyName"
                  value={currency.currencyName || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
                />
              </div>

              {/* Flag Image Path Input */}
              <div className="relative">
                <label
                  htmlFor="flagImage"
                  className="inline-block text-gray mb-2 font-medium"
                >
                  Flag Image Path (e.g., /assets/flags/usd.png)
                </label>
                <input
                  type="text"
                  id="flagImage"
                  name="flagImage"
                  value={currency.flagImage || ""}
                  onChange={handleChange}
                  placeholder="/assets/icon/flags/curreny-code.png"
                  className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
                />
                {currency.flagImage && (
                  <div className="mt-2 flex gap-1 items-center absolute top-8 right-2">
                    {/* <h1 className="text-main text-sm">Preview</h1> */}
                    <img
                      src={currency.flagImage}
                      alt="Current Flag"
                      className="size-8"
                    />
                  </div>
                )}
              </div>

              {/* IBAN */}
              <div>
                <label className="inline-block text-gray font-medium mb-2">
                  IBAN
                </label>
                <input
                  type="text"
                  name="iban"
                  value={currency.iban || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
                />
              </div>

              {/* BIC/SWIFT */}
              <div>
                <label className="inline-block text-gray font-medium mb-2">
                  BIC/SWIFT
                </label>
                <input
                  type="text"
                  name="bicSwift"
                  value={currency.bicSwift || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
                />
              </div>

              {/* Wise Fee Percentage */}
              <div>
                <label className="inline-block text-gray font-medium mb-2">
                  Wise Fee Percentage
                </label>
                <input
                  type="number"
                  name="wiseFeePercentage"
                  value={currency.wiseFeePercentage || 0}
                  onChange={handleChange}
                  step="0.0001"
                  className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
                />
              </div>

              {/* Bank Transfer Fee */}
              <div>
                <label className="inline-block text-gray font-medium mb-2">
                  Bank Transfer Fee
                </label>
                <input
                  type="number"
                  name="bankTransferFee"
                  value={currency.bankTransferFee || 0}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Bank Address */}
            <div>
              <label className="inline-block text-gray font-medium mb-2">
                Bank Address
              </label>
              <textarea
                name="bankAddress"
                value={currency.bankAddress || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none min-h-[120px]"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r text-lg from-[#78d3ff] to-[#326f7d] text-main font-medium py-4 rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Update Currency"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminEditCurrencyPage;
