// // RecipientsPage.tsx
// "use client";
// import React, { useState, ChangeEvent } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList";
// import { sampleRecipients } from "../../../data/transactions";
// import { CiBank } from "react-icons/ci";
// import { FaCirclePlus  } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from 'next/navigation'; // Import useRouter hook

// export default function RecipientsPag() {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const router = useRouter(); // Initialize useRouter hook for navigation

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredRecipients = sampleRecipients.filter((recipient) => {
//     const recipientName = recipient.accountHolderName;
//     if (recipientName) {
//       return recipientName.toLowerCase().includes(searchTerm.toLowerCase());
//     }
//     return false;
//   });

//   const handleAddRecipientClick = () => {
//     // Navigate to the add recipient page when the button is clicked
//     router.push('/dashboard/recipients/addrecipient'); // Assuming your add recipient page is located at /dashboard/recipients/add
//   };

//   return (
//     <section className="Beneficiaries-Page py-10">
//       <div className="container mx-auto">
//         <div className="mb-8">
//           {/* Recipients Title */}
//           <h1 className="text-3xl font-semibold text-main">Recipients</h1>
//         </div>

//         {/* Search and Add Recipient */}
//         <div className="flex items-center space-x-4 mb-6">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-14 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
//               placeholder="Search existing recipients"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </div>
//           {/* Add recipient button with onClick handler */}
//           <button
//             type="button"
//             className="inline-flex items-center px-10 py-3 border border-primary rounded-full font-medium text-primary focus:outline-none focus:ring-primary focus:border-primary cursor-pointer"
//             onClick={handleAddRecipientClick} // Call handleAddRecipientClick function on button click
//           >
//             Add recipient
//           </button>
//         </div>

//         {/* Conditional Rendering of Sections */}
//         {filteredRecipients.length > 0 ? (
//           <div>
//             {/* All Label */}
//             <div>
//               <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//                 All
//               </h3>

//               {/* Recipients List */}
//               <div className="pt-4 space-y-2">
//                 {filteredRecipients.map((recipient) => (
//                   <RecipientList
//                     key={recipient.id}
//                     recipient={recipient}
//                     isSelected={false}
//                     showCheckbox={false}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div>
//             {/* Can't find Label */}
//             <div>
//               <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//                 Can't find your recipient?
//               </h3>

//               <div className="mt-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//                       <CiBank size={24}/>

//                       <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                         <FaCirclePlus className="text-green-400 bg-white" />
//                       </div>
//                     </div>
//                     <div className="ml-4">
//                       <h5 className="font-medium text-main capitalize">
//                         Enter their bank detials
//                       </h5>

//                       <p className="text-sm text-gray-600">
//                         you'll need their acoount information
//                       </p>
//                     </div>
//                   </div>
//                   <div className="">
//                     <IoIosArrowForward className="h-5 w-5 text-gray-500" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


// // frontend/src/app/dashboard/recipients/page.tsx
// "use client";
// import React, { useState, ChangeEvent, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList";
// import { CiBank } from "react-icons/ci";
// import { FaCirclePlus } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';

// export default function RecipientsPage() {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const router = useRouter();
//   const { token } = useAuth();
//   const [recipients, setRecipients] = useState([]);
//   const [loadingRecipients, setLoadingRecipients] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoadingRecipients(true);
//       setError(null);
//       try {
//         const data = await recipientService.getUserRecipients(token);
//         setRecipients(data);
//       } catch (err: any) {
//         setError(err.message || 'Failed to load recipients.');
//         console.error("Error fetching recipients:", err);
//       } finally {
//         setLoadingRecipients(false);
//       }
//     };

//     if (token) {
//       fetchRecipients();
//     }
//   }, [token]);


//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredRecipients = recipients.filter((recipient) => {
//     const recipientName = recipient.accountHolderName;
//     if (recipientName) {
//       return recipientName.toLowerCase().includes(searchTerm.toLowerCase());
//     }
//     return false;
//   });

//   const handleAddRecipientClick = () => {
//     router.push('/dashboard/recipients/addrecipient');
//   };

//   if (loadingRecipients) {
//     return <section className="Beneficiaries-Page py-10"><div className="container mx-auto">Loading recipients...</div></section>;
//   }

//   if (error) {
//     return <section className="Beneficiaries-Page py-10"><div className="container mx-auto text-red-500">Error loading recipients: {error}</div></section>;
//   }


//   return (
//     <section className="Beneficiaries-Page py-10">
//       <div className="container mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-semibold text-main">Recipients</h1>
//           {/* Conditionally render in small screen  */}
//           {isSmallScreen && ( // Conditionally render based on isSmallScreen state
//             <button
//               className="bg-primary text-secondary font-medium px-4 py-1 rounded-full"
//               onClick={handleAddRecipientClick} // Add onClick handler for small screen button
//             >
//               Add
//             </button>
//           )}
//         </div>

//         <div className="flex items-center space-x-4 mb-6">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-14 pr-10 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main" // Increased pr-10 to accommodate cancel icon
//               placeholder="Search existing recipients"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             {searchTerm && ( // Conditionally render the cancel icon
//               <button
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-gray hover:text-main focus:outline-none" // Position cancel icon
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>
//           <button
//             type="button"
//             className="inline-flex items-center px-10 py-3 border border-primary rounded-full font-medium text-primary focus:outline-none focus:ring-primary focus:border-primary cursor-pointer"
//             onClick={handleAddRecipientClick}
//           >
//             Add recipient
//           </button>
//         </div>

//         {filteredRecipients.length > 0 ? (
//           <div>
//             <div>
//               <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//                 All
//               </h3>
//               <div className="pt-4 space-y-2">
//                 {filteredRecipients.map((recipient) => (
//                   <RecipientList
//                     key={recipient._id}
//                     recipient={recipient}
//                     isSelected={false}
//                     showCheckbox={false}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div>
//               <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//                 Can't find your recipient?
//               </h3>

//               <div className="mt-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer" onClick={handleAddRecipientClick}>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//                       <CiBank size={24}/>
//                       <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                         <FaCirclePlus className="text-green-400 bg-white" />
//                       </div>
//                     </div>
//                     <div className="ml-4">
//                       <h5 className="font-medium text-main capitalize">
//                         Enter their bank detials
//                       </h5>
//                       <p className="text-sm text-gray-600">
//                         you'll need their acoount information
//                       </p>
//                     </div>
//                   </div>
//                   <div className="">
//                     <IoIosArrowForward className="h-5 w-5 text-gray-500" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }












// // frontend/src/app/dashboard/recipients/page.tsx
// "use client";
// import React, { useState, ChangeEvent, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList";
// import { CiBank } from "react-icons/ci";
// import { FaCirclePlus } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import { MdCancel } from 'react-icons/md'; // Import MdCancel icon

// export default function RecipientsPage() {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const router = useRouter();
//   const { token } = useAuth();
//   const [recipients, setRecipients] = useState([]);
//   const [loadingRecipients, setLoadingRecipients] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false); // State to track screen size

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.innerWidth < 768); // Example breakpoint, adjust as needed
//     };

//     checkScreenSize(); // Check initial screen size
//     window.addEventListener('resize', checkScreenSize); // Add listener for resize

//     return () => {
//       window.removeEventListener('resize', checkScreenSize); // Cleanup listener on unmount
//     };
//   }, []);


//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoadingRecipients(true);
//       setError(null);
//       try {
//         const data = await recipientService.getUserRecipients(token);
//         setRecipients(data);
//       } catch (err: any) {
//         setError(err.message || 'Failed to load recipients.');
//         console.error("Error fetching recipients:", err);
//       } finally {
//         setLoadingRecipients(false);
//       }
//     };

//     if (token) {
//       fetchRecipients();
//     }
//   }, [token]);


//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   const filteredRecipients = recipients.filter((recipient) => {
//     const recipientName = recipient.accountHolderName;
//     if (recipientName) {
//       return recipientName.toLowerCase().includes(searchTerm.toLowerCase());
//     }
//     return false;
//   });

//   const handleAddRecipientClick = () => {
//     router.push('/dashboard/recipients/addrecipient');
//   };

//   if (loadingRecipients) {
//     return <section className="Beneficiaries-Page py-10"><div className="container mx-auto">Loading recipients...</div></section>;
//   }

//   if (error) {
//     return <section className="Beneficiaries-Page py-10"><div className="container mx-auto text-red-500">Error loading recipients: {error}</div></section>;
//   }


//   return (
//     <section className="Beneficiaries-Page py-10">
//       <div className="container mx-auto">
//         <div className="mb-8 flex items-center justify-between ">
//           <h1 className="text-3xl font-semibold text-main">Recipients</h1>
//           {/* Conditionally render in small screen  */}
//           {isSmallScreen && ( // Conditionally render based on isSmallScreen state
//             <button
//               className="bg-primary text-secondary font-medium px-4 py-1 rounded-full"
//               onClick={handleAddRecipientClick} // Add onClick handler for small screen button
//             >
//               Add
//             </button>
//           )}
//         </div>

//         <div className="flex items-center space-x-4 mb-6">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-14 pr-10 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main" // Increased pr-10 to accommodate cancel icon
//               placeholder="Search existing recipients"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             {searchTerm && ( // Conditionally render the cancel icon
//               <button
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-gray hover:text-main focus:outline-none" // Position cancel icon
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>
//           {!isSmallScreen && (
//             <button
//               type="button"
//               className="inline-flex items-center px-10 py-3 border border-primary rounded-full font-medium text-primary focus:outline-none focus:ring-primary focus:border-primary cursor-pointer"
//               onClick={handleAddRecipientClick}
//             >
//               Add recipient
//             </button>
//           )}
//         </div>

//         {filteredRecipients.length > 0 ? (
//           <div>
//             <div>
//               <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//                 All
//               </h3>
//               <div className="pt-4 space-y-2">
//                 {filteredRecipients.map((recipient) => (
//                   <RecipientList
//                     key={recipient._id}
//                     recipient={recipient}
//                     isSelected={false}
//                     showCheckbox={false}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div>
//               <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//                 Can't find your recipient?
//               </h3>

//               <div className="mt-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer" onClick={handleAddRecipientClick}>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//                       <CiBank size={24}/>
//                       <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                         <FaCirclePlus className="text-green-400 bg-white" />
//                       </div>
//                     </div>
//                     <div className="ml-4">
//                       <h5 className="font-medium text-main capitalize">
//                         Enter their bank detials
//                       </h5>
//                       <p className="text-sm text-gray-600">
//                         you'll need their acoount information
//                       </p>
//                     </div>
//                   </div>
//                   <div className="">
//                     <IoIosArrowForward className="h-5 w-5 text-gray-500" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


// frontend/src/app/dashboard/recipients/addrecipient/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams
import DashboardHeader from '../../../components/layout/DashboardHeader';
import { useAuth } from '../../../hooks/useAuth';
import recipientService from '../../../services/recipient';
import currencyService from '../../../services/currency';
import { IoMdCloseCircle } from 'react-icons/io';
import Image from 'next/image';
import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

// Define interfaces for better type safety (optional but recommended)
interface Currency {
    _id: string;
    code: string;
    currencyName?: string;
    flagImage?: string;
}

interface RecipientData {
    currencyCode: string;
    email?: string;
    accountHolderName: string;
    ifscCode: string;
    accountNumber: string;
    bankName: string;
    address: string;
    accountType: string;
}

interface NewRecipientResponse {
    _id: string;
    // Add other fields if needed
}


const AddRecipientPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // <-- Get search params
    const returnTo = searchParams.get('returnTo'); // <-- Read the returnTo parameter
    const { token } = useAuth();

    const [step, setStep] = useState(1);
    const [currencies, setCurrencies] = useState<Currency[]>([]); // Use Currency interface
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
    const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);

    useEffect(() => {
        const fetchCurrencies = async () => {
            setIsLoadingCurrencies(true);
            try {
                const fetchedCurrencies: Currency[] = await currencyService.getAllCurrencies();
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
        // Reset errors
        setFormError('');
        setAccountHolderNameError('');
        setIfscCodeError('');
        setAccountNumberError('');
        setBankNameError('');
        setAddressError('');
        setAccountTypeError('');

        // Basic frontend validation
        let isValid = true;
        if (!accountHolderName.trim()) {
            setAccountHolderNameError('Account holder name is required');
            isValid = false;
        }
        if (!ifscCode.trim()) {
            setIfscCodeError('IFSC code is required');
            isValid = false;
        }
        if (!accountNumber.trim()) {
            setAccountNumberError('Account number is required');
            isValid = false;
        }
        if (!bankName.trim()) {
            setBankNameError('Bank name is required');
            isValid = false;
        }
        if (!address.trim()) {
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
            const recipientData: RecipientData = {
                currencyCode: selectedCurrencyCode,
                email: email.trim() || undefined, // Send undefined if empty
                accountHolderName: accountHolderName.trim(),
                ifscCode: ifscCode.trim(),
                accountNumber: accountNumber.trim(),
                bankName: bankName.trim(),
                address: address.trim(),
                accountType,
            };
            const newRecipient: NewRecipientResponse = await recipientService.addRecipient(recipientData, token);

            // --- MODIFIED REDIRECTION ---
            if (returnTo) {
                 // Ensure returnTo is a valid relative path or handle potential security issues if needed
                 // For simplicity, we assume returnTo is trustworthy here
                router.push(returnTo); // Go back to the specified URL (e.g., send flow)
            } else {
                router.push(`/dashboard/recipients/${newRecipient._id}`); // Default redirect
            }
            // --- END OF MODIFICATION ---

        } catch (error: any) {
            // Handle backend validation errors
            if (error.response && error.response.status === 400 && error.response.data.errors) {
                const backendErrors = error.response.data.errors;
                setAccountHolderNameError(backendErrors.accountHolderName || '');
                setIfscCodeError(backendErrors.ifscCode || '');
                setAccountNumberError(backendErrors.accountNumber || '');
                setBankNameError(backendErrors.bankName || '');
                setAddressError(backendErrors.address || '');
                setAccountTypeError(backendErrors.accountType || '');
                setFormError(''); // Clear general form error if specific field errors exist
            } else {
                // Handle general errors
                setFormError(error.response?.data?.message || error.message || 'Failed to add recipient. Please try again.');
                console.error("Error adding recipient:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseFormError = () => {
        setFormError("");
    };

    // --- Render logic (unchanged from previous version) ---
    return (
        <div className="AddRecipientPage">
            {/* Using a simpler header here, adjust as needed */}
            <div className="bg-white shadow-sm p-4 mb-4">
                <h1 className="text-xl font-semibold text-main">Add Recipient</h1>
            </div>

            <div className="flex flex-col lg:flex-row justify-center px-4 mt-8">
                {step === 1 && (
                    <div key="currency-step" className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:mr-4">
                        {/* Back link depends on context, might remove or make dynamic */}
                        <Link href={returnTo || "/dashboard/recipients"} className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
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
                                        title={currency.code !== 'INR' ? 'Currently only INR recipients are supported' : `Select ${currency.currencyName}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {currency.flagImage ? (
                                                    <Image src={currency.flagImage} width={30} height={30} alt={`${currency.currencyName} Flag`} />
                                                ) : (
                                                     <div className="w-[30px] h-[30px] bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">{currency.code.slice(0, 2)}</div>
                                                )}
                                                <div>
                                                    <h4 className="font-semibold text-main">{currency.code}</h4>
                                                    <p className="text-sm text-gray-600">{currency.currencyName} {currency.code !== 'INR' ? '(Coming soon)' : ''}</p>
                                                </div>
                                            </div>
                                            {currency.code === 'INR' ? <IoArrowForward className="text-gray-500" /> : <span className="text-xs text-gray-500">Coming soon</span>}
                                        </div>
                                    </div>
                                ))
                            )}
                            {currencies.length === 0 && !isLoadingCurrencies && (
                                <p className='text-center text-gray-500'>No currencies available.</p>
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div key="account-step" className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <button onClick={handleBackToCurrencySelect} className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
                            ← Back to Currency
                        </button>
                        <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
                            Enter their {selectedCurrencyCode} account details
                        </h2>

                        {formError && (
                            <div
                                className="flex bg-red-100 lg:p-4 p-3 rounded-xl gap-3 items-center relative mb-6"
                                role="alert"
                            >
                                <IoMdCloseCircle className="text-red-600 size-5 flex-shrink-0" />
                                <span className="text-red-700 text-sm block flex-grow">{formError}</span>
                                <button
                                    className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 p-1"
                                    onClick={handleCloseFormError}
                                    aria-label="Close error message"
                                >
                                    <IoCloseIcon
                                        className="text-red-700 hover:text-red-900 size-5"
                                    />
                                </button>
                            </div>
                        )}

                        <form className="mt-2 space-y-4 md:space-y-6" onSubmit={handleSubmit} noValidate>
                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-gray-700 text-sm block capitalize font-medium mb-1"
                                >
                                    Their email (optional)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-gray-300 hover:shadow-sm focus:border-primary focus:ring focus:ring-primary/20`}
                                    value={email}
                                    placeholder="example@domain.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                             {/* Bank Details Section Label */}
                            <label
                                className="text-gray-700 text-sm block capitalize font-medium pt-2"
                            >
                                Recipient's bank details <span className="text-red-600">*</span>
                            </label>

                            {/* Account Holder Name */}
                            <div className='pt-0'>
                                <input
                                    type="text"
                                    id="accountHolderName"
                                    className={`block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountHolderNameError
                                        ? "border-red-500 border-2 ring-red-200 ring-1 !shadow-none"
                                        : "border-gray-300 hover:shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        }`}
                                    value={accountHolderName}
                                    placeholder="Full name of the account holder"
                                    onChange={(e) => { setAccountHolderName(e.target.value); setAccountHolderNameError(''); }}
                                    required
                                    aria-describedby="accountHolderName-error"
                                />
                                {accountHolderNameError && (
                                    <p id="accountHolderName-error" className="flex text-red-600 text-xs items-center mt-1">
                                        <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
                                        {accountHolderNameError}
                                    </p>
                                )}
                            </div>

                             {/* IFSC Code */}
                            <div>
                                <input
                                    type="text"
                                    id="ifscCode"
                                    className={`block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${ifscCodeError
                                        ? "border-red-500 border-2 ring-red-200 ring-1 !shadow-none"
                                        : "border-gray-300 hover:shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        }`}
                                    value={ifscCode}
                                    placeholder="IFSC code"
                                    onChange={(e) => { setIfscCode(e.target.value.toUpperCase()); setIfscCodeError(''); }}
                                    required
                                    aria-describedby="ifscCode-error"
                                />
                                {ifscCodeError && (
                                    <p id="ifscCode-error" className="flex text-red-600 text-xs items-center mt-1">
                                        <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
                                        {ifscCodeError}
                                    </p>
                                )}
                            </div>

                             {/* Account Number */}
                            <div>
                                <input
                                    type="text" // Use text, potentially add pattern for numbers later
                                    id="accountNumber"
                                    inputMode='numeric' // Hint for mobile
                                    className={`block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountNumberError
                                        ? "border-red-500 border-2 ring-red-200 ring-1 !shadow-none"
                                        : "border-gray-300 hover:shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        }`}
                                    value={accountNumber}
                                    placeholder="Account number"
                                    onChange={(e) => { setAccountNumber(e.target.value); setAccountNumberError(''); }}
                                    required
                                    aria-describedby="accountNumber-error"
                                />
                                {accountNumberError && (
                                    <p id="accountNumber-error" className="flex text-red-600 text-xs items-center mt-1">
                                        <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
                                        {accountNumberError}
                                    </p>
                                )}
                            </div>

                            {/* Account Type */}
                            <div>
                                <select
                                    id="accountType"
                                    className={`block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 bg-white ${accountTypeError
                                        ? "border-red-500 border-2 ring-red-200 ring-1 !shadow-none"
                                        : "border-gray-300 hover:shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        } ${!accountType ? 'text-gray-400' : 'text-black'}`} // Placeholder color
                                    value={accountType}
                                    onChange={(e) => { setAccountType(e.target.value); setAccountTypeError(''); }}
                                    required
                                    aria-describedby="accountType-error"
                                >
                                    <option value="" disabled>Select account type *</option>
                                    <option value="Savings">Savings</option>
                                    <option value="Current">Current</option>
                                    <option value="Salary">Salary</option>
                                </select>
                                {accountTypeError && (
                                    <p id="accountType-error" className="flex text-red-600 text-xs items-center mt-1">
                                        <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
                                        {accountTypeError}
                                    </p>
                                )}
                            </div>


                            {/* Bank Name */}
                            <div>
                                <input
                                    type="text"
                                    id="bankName"
                                    className={`block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${bankNameError
                                        ? "border-red-500 border-2 ring-red-200 ring-1 !shadow-none"
                                        : "border-gray-300 hover:shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        }`}
                                    value={bankName}
                                    placeholder="Bank name"
                                    onChange={(e) => { setBankName(e.target.value); setBankNameError(''); }}
                                    required
                                    aria-describedby="bankName-error"
                                />
                                {bankNameError && (
                                    <p id="bankName-error" className="flex text-red-600 text-xs items-center mt-1">
                                        <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
                                        {bankNameError}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <input
                                    type="text"
                                    id="address"
                                    className={`block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${addressError
                                        ? "border-red-500 border-2 ring-red-200 ring-1 !shadow-none"
                                        : "border-gray-300 hover:shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        }`}
                                    value={address}
                                    placeholder="Recipient's address (Street, City, Postcode, Country)"
                                    onChange={(e) => { setAddress(e.target.value); setAddressError(''); }}
                                    required
                                    aria-describedby="address-error"
                                />
                                {addressError && (
                                    <p id="address-error" className="flex text-red-600 text-xs items-center mt-1">
                                        <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
                                        {addressError}
                                    </p>
                                )}
                            </div>


                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className={`rounded-full text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 transition-colors flex justify-center items-center
                                        ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
                                    `}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="h-5 w-5 animate-spin mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Confirming...
                                        </>
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
