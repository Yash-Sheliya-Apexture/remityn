// import React from "react";
// import { GoArrowLeft } from "react-icons/go";
// import { FiSearch } from "react-icons/fi";

// export default function AddRecipientPage() {
//   // Currency Data (embedded JSON) with image paths
//   const currencies = [
//     {
//       "code": "INR",
//       "name": "Indian rupee",
//       "flag": "/assets/icon/inr.svg" // Path as string
//     },
//     {
//       "code": "AED",
//       "name": "United Arab Emirates dirham",
//       "flag": "/assets/icon/aed.svg" // Path as string
//     },
//     {
//       "code": "AUD",
//       "name": "Australian dollar",
//       "flag": "/assets/icon/aud.svg" // Path as string
//     },

//      {
//       "code": "USD",
//       "name": "United States dollar",
//       "flag": "/assets/icon/usa.svg" // Path as string
//     },
//     {
//       "code": "EUR",
//       "name": "Euro",
//       "flag": "/assets/icon/eur.svg" // Path as string
//     },
//     {
//       "code": "GBP",
//       "name": "British pound",
//       "flag": "/assets/icon/gbp.svg" // Path as string
//     },

//   ];

//   // Recent currencies (select from the currencies array)
//   const recentCurrencies = currencies.filter(currency => ["INR"].includes(currency.code));

//   // All currencies (excluding recent ones for demonstration, you can adjust as needed)
//   const allCurrencies = currencies.filter(currency => !recentCurrencies.includes(currency));

//   return (
//     <section className="Add-Recipient-Page py-12 bg-[#181A1B] h-screen">
//       <div className="container mx-auto px-4">
//         {/* Back and Title */}
//         <div className="relative mb-8">
//           <div className="w-full flex justify-center items-center">
//             <h3 className="text-2xl text-white font-semibold ">
//               Select their currency
//             </h3>
//           </div>
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full absolute left-0 top-1/2 -translate-y-1/2 bg-[#242728]">
//             <GoArrowLeft size={20} className="text-[#A3E769]" />
//             <button className="text-[#A3E769] font-bold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-[#A3E769]">
//               Back
//             </button>
//           </div>
//         </div>

//         {/* Search Currency */}
//         <div className="mb-8">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search currency"
//               className="w-full bg-[#242728] py-3 px-12 rounded-lg text-white focus:outline-none"
//             />
//             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//               <FiSearch size={20} />
//             </div>
//           </div>
//         </div>

//         {/* Recent currencies */}
//         <div className="mb-8">
//           <h4 className="text-gray-400 text-sm mb-4">Recent currencies</h4>
//           <ul className="bg-[#242728] rounded-lg overflow-hidden">
//             {recentCurrencies.map((currency) => (
//               <li key={currency.code} className="p-4 border-b border-[#303334] last:border-b-0">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <img src={currency.flag} alt={`${currency.code} Flag`} className="w-8 h-8 rounded-full" />
//                     <div>
//                       <p className="text-white font-semibold">{currency.code}</p>
//                       <p className="text-gray-400 text-sm">{currency.name}</p>
//                     </div>
//                   </div>
//                   <div className="text-gray-400">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M8.25 4.5a.75.75 0 01.75.75v14.25a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zM15.75 4.5a.75.75 0 01.75.75v14.25a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75z"
//                         clipRule="evenodd"
//                       />
//                       <path
//                         fillRule="evenodd"
//                         d="M3.59 7.79a.75.75 0 011.06 0l6.75 6.75a.75.75 0 01-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06zm16.92 0a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* All currencies */}
//         <div>
//           <h4 className="text-gray-400 text-sm mb-4">All currencies</h4>
//           <ul className="bg-[#242728] rounded-lg overflow-hidden">
//             {allCurrencies.map((currency) => (
//               <li key={currency.code} className="p-4 border-b border-[#303334] last:border-b-0">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <img src={currency.flag} alt={`${currency.code} Flag`} className="w-8 h-8 rounded-full" />
//                     <div>
//                       <p className="text-white font-semibold">{currency.code}</p>
//                       <p className="text-gray-400 text-sm">{currency.name}</p>
//                     </div>
//                   </div>
//                   <div className="text-gray-400">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M8.25 4.5a.75.75 0 01.75.75v14.25a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zM15.75 4.5a.75.75 0 01.75.75v14.25a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75z"
//                         clipRule="evenodd"
//                       />
//                       <path
//                         fillRule="evenodd"
//                         d="M3.59 7.79a.75.75 0 011.06 0l6.75 6.75a.75.75 0 01-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06zm16.92 0a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }



// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward } from 'react-icons/io';
// import { IoClose } from 'react-icons/io5';
// import Link from 'next/link';

// const AddRecipientPage = () => {
//     const router = useRouter();
//     const { token } = useAuth();
//     const [step, setStep] = useState(1);
//     const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
//     const [email, setEmail] = useState('');
//     const [accountHolderName, setAccountHolderName] = useState('');
//     const [ifscCode, setIfscCode] = useState('');
//     const [accountNumber, setAccountNumber] = useState('');
//     const [formError, setFormError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [accountHolderNameError, setAccountHolderNameError] = useState('');
//     const [ifscCodeError, setIfscCodeError] = useState('');
//     const [accountNumberError, setAccountNumberError] = useState('');

//     const handleCurrencySelect = (currencyCode: string) => {
//         setSelectedCurrencyCode(currencyCode);
//         setStep(2);
//     };

//     const handleBackToCurrencySelect = () => {
//         setStep(1);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setFormError('');
//         setAccountHolderNameError('');
//         setIfscCodeError('');
//         setAccountNumberError('');

//         let isValid = true;
//         if (!accountHolderName) {
//             setAccountHolderNameError('Account holder name is required');
//             isValid = false;
//         }
//         if (!ifscCode) {
//             setIfscCodeError('IFSC code is required');
//             isValid = false;
//         }
//         if (!accountNumber) {
//             setAccountNumberError('Account number is required');
//             isValid = false;
//         }

//         if (!isValid) {
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const recipientData = {
//                 currencyCode: selectedCurrencyCode,
//                 email,
//                 accountHolderName,
//                 ifscCode,
//                 accountNumber,
//             };
//             const newRecipient = await recipientService.addRecipient(recipientData, token);
//             router.push(`/dashboard/recipients/${newRecipient._id}`);
//         } catch (error: any) {
//             setFormError(error.message || 'Failed to add recipient. Please try again.');
//             console.error("Error adding recipient:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseFormError = () => {
//         setFormError("");
//     };

//     return (
//         <div className="AddRecipientPage">
//             <DashboardHeader title="Recipients" />
//             <div className="flex flex-col lg:flex-row justify-center px-4 mt-8">
//                 {step === 1 && (
//                     <div key="currency-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 lg:mr-4">
//                         <Link href="/dashboard/recipients" className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back
//                         </Link>
//                         <h2 className="text-2xl font-semibold text-main text-center mb-6">Select their currency</h2>
//                         <div className="mb-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search currency"
//                                 className="block w-full pl-10 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
//                                 disabled
//                                 readOnly // Added readOnly prop here
//                             />
//                         </div>
//                         <div className="space-y-3">
//                             <div
//                                 className="hover:bg-lightgray p-3 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out"
//                                 onClick={() => handleCurrencySelect('INR')}
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/inr.svg" width={30} height={30} alt="INR Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">INR</h4>
//                                             <p className="text-sm text-gray-600">Indian rupee</p>
//                                         </div>
//                                     </div>
//                                     <IoArrowForward className="text-gray-500" />
//                                 </div>
//                             </div>
//                             <div className="p-3 rounded-xl bg-gray-100 cursor-not-allowed opacity-50">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/usd.svg" width={30} height={30} alt="USD Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">USD</h4>
//                                             <p className="text-sm text-gray-600">US dollar (Coming soon)</p>
//                                         </div>
//                                     </div>
//                                     <span className="text-gray-500">Coming soon</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div key="account-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8">
//                         <button onClick={handleBackToCurrencySelect} className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back to Currency
//                         </button>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//                             Enter their account details
//                         </h2>

//                         {formError && (
//                             <div
//                                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6" // Added mb-6 for spacing
//                                 role="alert"
//                             >
//                                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                                     <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray block max-w-60">{formError}</span>
//                                 </div>

//                                 <button
//                                     className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                                     onClick={handleCloseFormError}
//                                 >
//                                     <IoClose
//                                         className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                         role="button"
//                                     />
//                                 </button>
//                             </div>
//                         )}

//                         <form className="mt-2 space-y-6" onSubmit={handleSubmit}> {/* Reduced mt-10 to mt-2, Increased space-y-5 to space-y-6 */}
//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray text-sm block capitalize font-medium mb-1" // Added mb-1 for spacing
//                                 >
//                                     Their email (optional)
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={email}
//                                     placeholder="example@example.ex" // Added placeholder
//                                     onChange={(e) => setEmail(e.target.value)} // Added onChange handler
//                                 />
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountHolderName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1" // Added mb-1 for spacing
//                                 >
//                                     Recipient's bank details <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountHolderName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountHolderNameError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountHolderName}
//                                     placeholder="Full name of the account holder" // Added placeholder
//                                     onChange={(e) => setAccountHolderName(e.target.value)} // Added onChange handler
//                                 />
//                                 {accountHolderNameError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5"> {/* Reduced text-base to text-sm */}
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" /> {/* Reduced size-5 to size-4 */}
//                                         </span>
//                                         {accountHolderNameError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="ifscCode"
//                                     className="text-gray text-sm block capitalize font-medium mb-1" // Added mb-1 for spacing
//                                 >
//                                     IFSC code <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="ifscCode"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${ifscCodeError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={ifscCode}
//                                     placeholder="YESB0236041" // Added placeholder
//                                     onChange={(e) => setIfscCode(e.target.value)} // Added onChange handler
//                                 />
//                                 {ifscCodeError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5"> {/* Reduced text-base to text-sm */}
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" /> {/* Reduced size-5 to size-4 */}
//                                         </span>
//                                         {ifscCodeError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountNumber"
//                                     className="text-gray text-sm block capitalize font-medium mb-1" // Added mb-1 for spacing
//                                 >
//                                     Account number <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountNumber"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountNumberError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountNumber}
//                                     placeholder="678911234567891" // Added placeholder
//                                     onChange={(e) => setAccountNumber(e.target.value)} // Added onChange handler
//                                 />
//                                 {accountNumberError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5"> {/* Reduced text-base to text-sm */}
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" /> {/* Reduced size-5 to size-4 */}
//                                         </span>
//                                         {accountNumberError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="flex justify-between items-center mb-4 mt-8"> {/* Added mt-8 for spacing */}
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                         ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
//                                     `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex justify-center items-center">
//                                             <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Confirming...
//                                         </div>
//                                     ) : (
//                                         'Confirm'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AddRecipientPage;

// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5'; // Renamed IoClose to IoCloseIcon to avoid conflict with component name
// import Link from 'next/link';

// const AddRecipientPage = () => {
//     const router = useRouter();
//     const { token } = useAuth();

//     const [step, setStep] = useState(1);
//     const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
//     const [email, setEmail] = useState('');
//     const [accountHolderName, setAccountHolderName] = useState('');
//     const [ifscCode, setIfscCode] = useState('');
//     const [accountNumber, setAccountNumber] = useState('');
//     const [bankName, setBankName] = useState(''); // New state for Bank name
//     const [address, setAddress] = useState('');   // New state for Address
//     const [formError, setFormError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [accountHolderNameError, setAccountHolderNameError] = useState('');
//     const [ifscCodeError, setIfscCodeError] = useState('');
//     const [accountNumberError, setAccountNumberError] = useState('');

//     const handleCurrencySelect = (currencyCode: string) => {
//         setSelectedCurrencyCode(currencyCode);
//         setStep(2);
//     };

//     const handleBackToCurrencySelect = () => {
//         setStep(1);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setFormError('');
//         setAccountHolderNameError('');
//         setIfscCodeError('');
//         setAccountNumberError('');

//         let isValid = true;
//         if (!accountHolderName) {
//             setAccountHolderNameError('Account holder name is required');
//             isValid = false;
//         }
//         if (!ifscCode) {
//             setIfscCodeError('IFSC code is required');
//             isValid = false;
//         }
//         if (!accountNumber) {
//             setAccountNumberError('Account number is required');
//             isValid = false;
//         }

//         if (!isValid) {
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const recipientData = {
//                 currencyCode: selectedCurrencyCode,
//                 email,
//                 accountHolderName,
//                 ifscCode,
//                 accountNumber,
//                 bankName,    // Include Bank name
//                 address,     // Include Address
//             };
//             const newRecipient = await recipientService.addRecipient(recipientData, token);
//             router.push(`/dashboard/recipients/${newRecipient._id}`);
//         } catch (error: any) {
//             setFormError(error.message || 'Failed to add recipient. Please try again.');
//             console.error("Error adding recipient:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseFormError = () => {
//         setFormError("");
//     };

//     return (
//         <div className="AddRecipientPage">
//             <DashboardHeader title="Recipients" />
//             <div className="flex flex-col lg:flex-row justify-center px-4 mt-8">
//                 {step === 1 && (
//                     <div key="currency-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 lg:mr-4">
//                         <Link href="/dashboard/recipients" className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back
//                         </Link>
//                         <h2 className="text-2xl font-semibold text-main text-center mb-6">Select their currency</h2>
//                         <div className="mb-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search currency"
//                                 className="block w-full pl-10 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
//                                 disabled
//                                 readOnly
//                             />
//                         </div>
//                         <div className="space-y-3">
//                             <div
//                                 className="hover:bg-lightgray p-3 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out"
//                                 onClick={() => handleCurrencySelect('INR')}
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/inr.svg" width={30} height={30} alt="INR Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">INR</h4>
//                                             <p className="text-sm text-gray-600">Indian rupee</p>
//                                         </div>
//                                     </div>
//                                     <IoArrowForward className="text-gray-500" />
//                                 </div>
//                             </div>
//                             <div className="p-3 rounded-xl bg-gray-100 cursor-not-allowed opacity-50">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/usd.svg" width={30} height={30} alt="USD Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">USD</h4>
//                                             <p className="text-sm text-gray-600">US dollar (Coming soon)</p>
//                                         </div>
//                                     </div>
//                                     <span className="text-gray-500">Coming soon</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div key="account-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8">
//                         <button onClick={handleBackToCurrencySelect} className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back to Currency
//                         </button>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//                             Enter their account details
//                         </h2>

//                         {formError && (
//                             <div
//                                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6"
//                                 role="alert"
//                             >
//                                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                                     <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray block max-w-60">{formError}</span>
//                                 </div>

//                                 <button
//                                     className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                                     onClick={handleCloseFormError}
//                                 >
//                                     <IoCloseIcon
//                                         className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                         role="button"
//                                     />
//                                 </button>
//                             </div>
//                         )}

//                         <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Their email (optional)
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={email}
//                                     placeholder="example@example.ex"
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountHolderName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Recipient's bank details <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountHolderName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountHolderNameError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountHolderName}
//                                     placeholder="Full name of the account holder"
//                                     onChange={(e) => setAccountHolderName(e.target.value)}
//                                 />
//                                 {accountHolderNameError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountHolderNameError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="ifscCode"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     IFSC code <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="ifscCode"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${ifscCodeError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={ifscCode}
//                                     placeholder="YESB0236041"
//                                     onChange={(e) => setIfscCode(e.target.value)}
//                                 />
//                                 {ifscCodeError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {ifscCodeError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountNumber"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Account number <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountNumber"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountNumberError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountNumber}
//                                     placeholder="678911234567891"
//                                     onChange={(e) => setAccountNumber(e.target.value)}
//                                 />
//                                 {accountNumberError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountNumberError}
//                                     </p>
//                                 )}
//                             </div>

//                             {/* New Bank Name Field */}
//                             <div>
//                                 <label
//                                     htmlFor="bankName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Bank name (optional)
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="bankName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={bankName}
//                                     placeholder="Bank of Baroda"
//                                     onChange={(e) => setBankName(e.target.value)}
//                                 />
//                             </div>

//                             {/* New Address Field */}
//                             <div>
//                                 <label
//                                     htmlFor="address"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Address (optional)
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="address"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={address}
//                                     placeholder="216A High Street North, London, E6 2JA, GB"
//                                     onChange={(e) => setAddress(e.target.value)}
//                                 />
//                             </div>


//                             <div className="flex justify-between items-center mb-4 mt-8">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                         ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
//                                     `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex justify-center items-center">
//                                             <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Confirming...
//                                         </div>
//                                     ) : (
//                                         'Confirm'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AddRecipientPage;


// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5';
// import Link from 'next/link';

// const AddRecipientPage = () => {
//     const router = useRouter();
//     const { token } = useAuth();

//     const [step, setStep] = useState(1);
//     const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
//     const [email, setEmail] = useState('');
//     const [accountHolderName, setAccountHolderName] = useState('');
//     const [ifscCode, setIfscCode] = useState('');
//     const [accountNumber, setAccountNumber] = useState('');
//     const [bankName, setBankName] = useState('');
//     const [address, setAddress] = useState('');
//     const [accountType, setAccountType] = useState('');
//     const [formError, setFormError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [accountHolderNameError, setAccountHolderNameError] = useState('');
//     const [ifscCodeError, setIfscCodeError] = useState('');
//     const [accountNumberError, setAccountNumberError] = useState('');
//     const [bankNameError, setBankNameError] = useState('');
//     const [addressError, setAddressError] = useState('');
//     const [accountTypeError, setAccountTypeError] = useState('');

//     const handleCurrencySelect = (currencyCode: string) => {
//         setSelectedCurrencyCode(currencyCode);
//         setStep(2);
//     };

//     const handleBackToCurrencySelect = () => {
//         setStep(1);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setFormError('');
//         setAccountHolderNameError('');
//         setIfscCodeError('');
//         setAccountNumberError('');
//         setBankNameError('');
//         setAddressError('');
//         setAccountTypeError('');

//         let isValid = true;
//         if (!accountHolderName) {
//             setAccountHolderNameError('Account holder name is required');
//             isValid = false;
//         }
//         if (!ifscCode) {
//             setIfscCodeError('IFSC code is required');
//             isValid = false;
//         }
//         if (!accountNumber) {
//             setAccountNumberError('Account number is required');
//             isValid = false;
//         }
//         if (!bankName) {
//             setBankNameError('Bank name is required');
//             isValid = false;
//         }
//         if (!address) {
//             setAddressError('Address is required');
//             isValid = false;
//         }
//         if (!accountType) {
//             setAccountTypeError('Account type is required');
//             isValid = false;
//         }

//         if (!isValid) {
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const recipientData = {
//                 currencyCode: selectedCurrencyCode,
//                 email,
//                 accountHolderName,
//                 ifscCode,
//                 accountNumber,
//                 bankName,
//                 address,
//                 accountType,
//             };
//             const newRecipient = await recipientService.addRecipient(recipientData, token);
//             router.push(`/dashboard/recipients/${newRecipient._id}`);
//         } catch (error: any) {
//             if (error.response && error.response.status === 400 && error.response.data.errors) {
//                 const backendErrors = error.response.data.errors;
//                 setAccountHolderNameError(backendErrors.accountHolderName || '');
//                 setIfscCodeError(backendErrors.ifscCode || '');
//                 setAccountNumberError(backendErrors.accountNumber || '');
//                 setBankNameError(backendErrors.bankName || '');
//                 setAddressError(backendErrors.address || '');
//                 setAccountTypeError(backendErrors.accountType || '');
//                 setFormError('');
//             } else {
//                 setFormError(error.message || 'Failed to add recipient. Please try again.');
//                 console.error("Error adding recipient:", error);
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseFormError = () => {
//         setFormError("");
//     };

//     return (
//         <div className="AddRecipientPage">
//             <DashboardHeader title="Recipients" />
//             <div className="flex flex-col lg:flex-row justify-center px-4 mt-8">
//                 {step === 1 && (
//                     <div key="currency-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 lg:mr-4">
//                         <Link href="/dashboard/recipients" className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back
//                         </Link>
//                         <h2 className="text-2xl font-semibold text-main text-center mb-6">Select their currency</h2>
//                         <div className="mb-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search currency"
//                                 className="block w-full pl-10 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
//                                 disabled
//                                 readOnly
//                             />
//                         </div>
//                         <div className="space-y-3">
//                             <div
//                                 className="hover:bg-lightgray p-3 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out"
//                                 onClick={() => handleCurrencySelect('INR')}
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/inr.svg" width={30} height={30} alt="INR Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">INR</h4>
//                                             <p className="text-sm text-gray-600">Indian rupee</p>
//                                         </div>
//                                     </div>
//                                     <IoArrowForward className="text-gray-500" />
//                                 </div>
//                             </div>
//                             <div className="p-3 rounded-xl bg-gray-100 cursor-not-allowed opacity-50">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/usd.svg" width={30} height={30} alt="USD Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">USD</h4>
//                                             <p className="text-sm text-gray-600">US dollar (Coming soon)</p>
//                                         </div>
//                                     </div>
//                                     <span className="text-gray-500">Coming soon</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div key="account-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8">
//                         <button onClick={handleBackToCurrencySelect} className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back to Currency
//                         </button>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//                             Enter their account details
//                         </h2>

//                         {formError && (
//                             <div
//                                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6"
//                                 role="alert"
//                             >
//                                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                                     <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray block max-w-60">{formError}</span>
//                                 </div>

//                                 <button
//                                     className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                                     onClick={handleCloseFormError}
//                                 >
//                                     <IoCloseIcon
//                                         className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                         role="button"
//                                     />
//                                 </button>
//                             </div>
//                         )}

//                         <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Their email (optional)
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={email}
//                                     placeholder="example@example.ex"
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountHolderName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Recipient's bank details <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountHolderName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountHolderNameError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountHolderName}
//                                     placeholder="Full name of the account holder"
//                                     onChange={(e) => setAccountHolderName(e.target.value)}
//                                 />
//                                 {accountHolderNameError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountHolderNameError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="ifscCode"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     IFSC code <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="ifscCode"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${ifscCodeError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={ifscCode}
//                                     placeholder="YESB0236041"
//                                     onChange={(e) => setIfscCode(e.target.value)}
//                                 />
//                                 {ifscCodeError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {ifscCodeError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountNumber"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Account number <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountNumber"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountNumberError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountNumber}
//                                     placeholder="678911234567891"
//                                     onChange={(e) => setAccountNumber(e.target.value)}
//                                 />
//                                 {accountNumberError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountNumberError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountType"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Account type <span className="text-error">*</span>
//                                 </label>
//                                 <select
//                                     id="accountType"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountTypeError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountType}
//                                     onChange={(e) => setAccountType(e.target.value)}
//                                 >
//                                     <option value="" disabled>Select account type</option>
//                                     <option value="Savings">Savings</option>
//                                     <option value="Current">Current</option>
//                                     <option value="Salary">Salary</option>
//                                 </select>
//                                 {accountTypeError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountTypeError}
//                                     </p>
//                                 )}
//                             </div>

                            
//                             <div>
//                                 <label
//                                     htmlFor="bankName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Bank name <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="bankName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${bankNameError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={bankName}
//                                     placeholder="Bank of Baroda"
//                                     onChange={(e) => setBankName(e.target.value)}
//                                 />
//                                 {bankNameError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {bankNameError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="address"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="address"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${addressError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={address}
//                                     placeholder="216A High Street North, London, E6 2JA, GB"
//                                     onChange={(e) => setAddress(e.target.value)}
//                                 />
//                                 {addressError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {addressError}
//                                     </p>
//                                 )}
//                             </div>

                            


//                             <div className="flex justify-between items-center mb-4 mt-8">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                         ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
//                                     `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex justify-center items-center">
//                                             <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Confirming...
//                                         </div>
//                                     ) : (
//                                         'Confirm'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AddRecipientPage;


'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '../../../components/layout/DashboardHeader';
import { useAuth } from '../../../hooks/useAuth';
import recipientService from '../../../services/recipient';
import currencyService from '../../../services/currency'; // Import currency service
import { IoMdCloseCircle } from 'react-icons/io';
import Image from 'next/image';
import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state

const AddRecipientPage = () => {
    const router = useRouter();
    const { token } = useAuth();

    const [step, setStep] = useState(1);
    const [currencies, setCurrencies] = useState<any[]>([]); // State to hold currencies
    const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
    const [email, setEmail] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [address, setAddress] = useState('');
    const [accountType, setAccountType] = useState('');
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [accountHolderNameError, setAccountHolderNameError] = useState('');
    const [ifscCodeError, setIfscCodeError] = useState('');
    const [accountNumberError, setAccountNumberError] = useState('');
    const [bankNameError, setBankNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [accountTypeError, setAccountTypeError] = useState('');
    const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true); // Loading state for currencies

    useEffect(() => {
        const fetchCurrencies = async () => {
            setIsLoadingCurrencies(true);
            try {
                const fetchedCurrencies = await currencyService.getAllCurrencies();
                setCurrencies(fetchedCurrencies);
            } catch (error) {
                console.error("Error fetching currencies:", error);
                setFormError("Failed to load currencies.");
            } finally {
                setIsLoadingCurrencies(false);
            }
        };

        fetchCurrencies();
    }, []);

    const handleCurrencySelect = (currencyCode: string) => {
        setSelectedCurrencyCode(currencyCode);
        setStep(2);
    };

    const handleBackToCurrencySelect = () => {
        setStep(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        setAccountHolderNameError('');
        setIfscCodeError('');
        setAccountNumberError('');
        setBankNameError('');
        setAddressError('');
        setAccountTypeError('');

        let isValid = true;
        if (!accountHolderName) {
            setAccountHolderNameError('Account holder name is required');
            isValid = false;
        }
        if (!ifscCode) {
            setIfscCodeError('IFSC code is required');
            isValid = false;
        }
        if (!accountNumber) {
            setAccountNumberError('Account number is required');
            isValid = false;
        }
        if (!bankName) {
            setBankNameError('Bank name is required');
            isValid = false;
        }
        if (!address) {
            setAddressError('Address is required');
            isValid = false;
        }
        if (!accountType) {
            setAccountTypeError('Account type is required');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        setIsSubmitting(true);
        try {
            const recipientData = {
                currencyCode: selectedCurrencyCode,
                email,
                accountHolderName,
                ifscCode,
                accountNumber,
                bankName,
                address,
                accountType,
            };
            const newRecipient = await recipientService.addRecipient(recipientData, token);
            router.push(`/dashboard/recipients/${newRecipient._id}`);
        } catch (error: any) {
            if (error.response && error.response.status === 400 && error.response.data.errors) {
                const backendErrors = error.response.data.errors;
                setAccountHolderNameError(backendErrors.accountHolderName || '');
                setIfscCodeError(backendErrors.ifscCode || '');
                setAccountNumberError(backendErrors.accountNumber || '');
                setBankNameError(backendErrors.bankName || '');
                setAddressError(backendErrors.address || '');
                setAccountTypeError(backendErrors.accountType || '');
                setFormError('');
            } else {
                setFormError(error.message || 'Failed to add recipient. Please try again.');
                console.error("Error adding recipient:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseFormError = () => {
        setFormError("");
    };

    return (
        <div className="AddRecipientPage">
            <DashboardHeader title="Recipients" />
            <div className="flex flex-col lg:flex-row justify-center px-4 mt-8">
                {step === 1 && (
                    <div key="currency-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 lg:mr-4">
                        <Link href="/dashboard/recipients" className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
                            ← Back
                        </Link>
                        <h2 className="text-2xl font-semibold text-main text-center mb-6">Select their currency</h2>
                        
                        <div className="space-y-3">
                            {isLoadingCurrencies ? (
                                <>
                                    <Skeleton className="h-16 rounded-xl" />
                                    <Skeleton className="h-16 rounded-xl" />
                                    <Skeleton className="h-16 rounded-xl" />
                                </>
                            ) : (
                                currencies.map((currency) => (
                                    <div
                                        key={currency.code}
                                        className={`hover:bg-lightgray p-3 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out ${currency.code !== 'INR' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                        onClick={() => currency.code === 'INR' ? handleCurrencySelect(currency.code) : {}}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {currency.flagImage && (
                                                    <Image src={currency.flagImage} width={30} height={30} alt={`${currency.currencyName} Flag`} />
                                                )}
                                                <div>
                                                    <h4 className="font-semibold text-main">{currency.code}</h4>
                                                    <p className="text-sm text-gray-600">{currency.currencyName} {currency.code !== 'INR' ? '(Coming soon)' : ''}</p>
                                                </div>
                                            </div>
                                            {currency.code === 'INR' ? <IoArrowForward className="text-gray-500" /> : <span className="text-gray-500">Coming soon</span>}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div key="account-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8">
                        <button onClick={handleBackToCurrencySelect} className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
                            ← Back to Currency
                        </button>
                        <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
                            Enter their account details
                        </h2>

                        {formError && (
                            <div
                                className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6"
                                role="alert"
                            >
                                <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
                                    <IoMdCloseCircle className="p-0.5 text-white size-8" />
                                </div>

                                <div>
                                    <span className="text-gray block max-w-60">{formError}</span>
                                </div>

                                <button
                                    className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
                                    onClick={handleCloseFormError}
                                >
                                    <IoCloseIcon
                                        className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
                                        role="button"
                                    />
                                </button>
                            </div>
                        )}

                        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-gray text-sm block capitalize font-medium mb-1"
                                >
                                    Their email (optional)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
                                    value={email}
                                    placeholder="example@example.ex"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="accountHolderName"
                                    className="text-gray text-sm block capitalize font-medium mb-1"
                                >
                                    Recipient's bank details <span className="text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="accountHolderName"
                                    className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountHolderNameError
                                        ? "border-error border-2 !shadow-none"
                                        : "border-[#c9cbce] hover:shadow-color"
                                        }`}
                                    value={accountHolderName}
                                    placeholder="Full name of the account holder"
                                    onChange={(e) => setAccountHolderName(e.target.value)}
                                />
                                {accountHolderNameError && (
                                    <p className="flex text-error text-sm items-center mt-0.5">
                                        <span className="mr-1">
                                            <IoMdCloseCircle className="size-4" />
                                        </span>
                                        {accountHolderNameError}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="ifscCode"
                                    className="text-gray text-sm block capitalize font-medium mb-1"
                                >
                                    IFSC code <span className="text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="ifscCode"
                                    className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${ifscCodeError
                                        ? "border-error border-2 !shadow-none"
                                        : "border-[#c9cbce] hover:shadow-color"
                                        }`}
                                    value={ifscCode}
                                    placeholder="YESB0236041"
                                    onChange={(e) => setIfscCode(e.target.value)}
                                />
                                {ifscCodeError && (
                                    <p className="flex text-error text-sm items-center mt-0.5">
                                        <span className="mr-1">
                                            <IoMdCloseCircle className="size-4" />
                                        </span>
                                        {ifscCodeError}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="accountNumber"
                                    className="text-gray text-sm block capitalize font-medium mb-1"
                                >
                                    Account number <span className="text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="accountNumber"
                                    className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountNumberError
                                        ? "border-error border-2 !shadow-none"
                                        : "border-[#c9cbce] hover:shadow-color"
                                        }`}
                                    value={accountNumber}
                                    placeholder="678911234567891"
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                />
                                {accountNumberError && (
                                    <p className="flex text-error text-sm items-center mt-0.5">
                                        <span className="mr-1">
                                            <IoMdCloseCircle className="size-4" />
                                        </span>
                                        {accountNumberError}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="accountType"
                                    className="text-gray text-sm block capitalize font-medium mb-1"
                                >
                                    Account type <span className="text-error">*</span>
                                </label>
                                <select
                                    id="accountType"
                                    className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountTypeError
                                        ? "border-error border-2 !shadow-none"
                                        : "border-[#c9cbce] hover:shadow-color"
                                        }`}
                                    value={accountType}
                                    onChange={(e) => setAccountType(e.target.value)}
                                >
                                    <option value="" disabled>Select account type</option>
                                    <option value="Savings">Savings</option>
                                    <option value="Current">Current</option>
                                    <option value="Salary">Salary</option>
                                </select>
                                {accountTypeError && (
                                    <p className="flex text-error text-sm items-center mt-0.5">
                                        <span className="mr-1">
                                            <IoMdCloseCircle className="size-4" />
                                        </span>
                                        {accountTypeError}
                                    </p>
                                )}
                            </div>


                            <div>
                                <label
                                    htmlFor="bankName"
                                    className="text-gray text-sm block capitalize font-medium mb-1"
                                >
                                    Bank name <span className="text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="bankName"
                                    className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${bankNameError
                                        ? "border-error border-2 !shadow-none"
                                        : "border-[#c9cbce] hover:shadow-color"
                                        }`}
                                    value={bankName}
                                    placeholder="Bank of Baroda"
                                    onChange={(e) => setBankName(e.target.value)}
                                />
                                {bankNameError && (
                                    <p className="flex text-error text-sm items-center mt-0.5">
                                        <span className="mr-1">
                                            <IoMdCloseCircle className="size-4" />
                                        </span>
                                        {bankNameError}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="address"
                                    className="text-gray text-sm block capitalize font-medium mb-1"
                                >
                                    Address <span className="text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${addressError
                                        ? "border-error border-2 !shadow-none"
                                        : "border-[#c9cbce] hover:shadow-color"
                                        }`}
                                    value={address}
                                    placeholder="216A High Street North, London, E6 2JA, GB"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                {addressError && (
                                    <p className="flex text-error text-sm items-center mt-0.5">
                                        <span className="mr-1">
                                            <IoMdCloseCircle className="size-4" />
                                        </span>
                                        {addressError}
                                    </p>
                                )}
                            </div>


                            <div className="flex justify-between items-center mb-4 mt-8">
                                <button
                                    type="submit"
                                    className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
                                        ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
                                    `}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex justify-center items-center">
                                            <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Confirming...
                                        </div>
                                    ) : (
                                        'Confirm'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddRecipientPage;