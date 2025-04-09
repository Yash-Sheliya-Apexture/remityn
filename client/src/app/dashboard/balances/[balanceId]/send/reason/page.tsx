// // frontend/src/app/dashboard/balances/[balanceId]/send/reason/page.tsx
// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { IoIosArrowBack } from 'react-icons/io';
// import Link from 'next/link';
// import DashboardHeader from '../../../../components/layout/DashboardHeader';

// interface ReasonParams {
//     balanceId: string;
// }

// // Define steps for the header (if using)
// const steps = ['Recipient', 'Amount', 'Review', 'Pay']; // Adjust based on whether reason is always shown

// const TransferReasonPage = () => {
//     const router = useRouter();
//     const params = useParams<ReasonParams>();
//     const searchParams = useSearchParams();
//     const { balanceId } = params;
//     const recipientId = searchParams.get('recipientId');
//     const [selectedReason, setSelectedReason] = useState('');
//     const [error, setError] = useState('');

//     // Retrieve summary from localStorage
//     const [summary, setSummary] = useState<any>(null); // Use 'any' or define SendSummary interface

//     useEffect(() => {
//          const storedSummary = localStorage.getItem('sendTransferSummary');
//          if (storedSummary) {
//              setSummary(JSON.parse(storedSummary));
//          } else {
//              // Handle missing summary - maybe redirect back
//              setError("Transfer details missing. Please start again.");
//              console.error("Transfer summary missing from localStorage");
//              // Optional: router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//          }
//     }, []);

//     const reasons = [
//         "Sending money home to family",
//         "Paying for goods or services",
//         "Property payment",
//         "Paying salary",
//         "General expenses",
//     ];

//     const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedReason(event.target.value);
//         setError(''); // Clear error on selection
//     };

//     const handleSubmit = () => {
//         if (!selectedReason) {
//             setError('Please select a reason for your transfer.');
//             return;
//         }
//         if (!summary) {
//              setError("Transfer details missing. Please start again.");
//              return;
//          }

//         // Add reason to summary object
//          const updatedSummary = { ...summary, reason: selectedReason };
//          localStorage.setItem('sendTransferSummary', JSON.stringify(updatedSummary)); // Update localStorage

//         // Navigate to review page
//         router.push(`/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`);
//     };

//     return (
//         <div className='TransferReason-Page'>
//              {/* Optional Header */}
//              {/* <DashboardHeader title="Send Money" currentStep={2.5} totalSteps={steps.length} steps={steps} /> */}

//              <div className="container mx-auto max-w-lg p-4 lg:p-8">

//                  <h1 className="text-xl lg:text-2xl font-bold capitalize text-main dark:text-white mb-4">What's the reason for your transfer?</h1>
//                  {/* Add note about India transfers if needed */}
//                  {summary?.receiveCurrencyCode === 'INR' && (
//                      <p className="text-gray-500 dark:text-gray-300 mb-6">Please note that transfers to charities or NGOs in India may have restrictions.</p>
//                  )}

//                 <div className="mb-6">
//                      <label htmlFor="transfer-reason" className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
//                          Select an option that best describes the reason
//                      </label>
//                      <select
//                          id="transfer-reason"
//                          value={selectedReason}
//                          onChange={handleReasonChange}
//                          className={`block w-full border dark:hover:shadow-whitecolor hover:shadow-darkcolor transition-shadow duration-300 ease-in-out rounded-md p-3 ${error ? '' : ''}`}
//                      >
//                          <option value="" disabled>Select an option</option>
//                          {reasons.map((reason) => (
//                              <option key={reason} value={reason}>{reason}</option>
//                          ))}
//                      </select>
//                      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
//                 </div>

//                  <button
//                      onClick={handleSubmit}
//                      className="w-full bg-primary text-secondary font-semibold py-3 rounded-full disabled:opacity-50 hover:bg-primary-hover transition-colors"
//                      disabled={!summary} // Disable if summary is missing
//                  >
//                      Continue
//                  </button>
//              </div>
//         </div>
//     );
// };

// export default TransferReasonPage;

// // frontend/src/app/dashboard/balances/[balanceId]/send/reason/page.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { IoIosArrowBack } from "react-icons/io";
// import Link from "next/link";
// import DashboardHeader from "../../../../components/layout/DashboardHeader";
// import { IoChevronDownOutline } from "react-icons/io5";
// import { GiCheckMark } from "react-icons/gi";

// interface ReasonParams {
//   balanceId: string;
// }

// // Define steps for the header (if using)
// const steps = ["Recipient", "Amount", "Review", "Pay"]; // Adjust based on whether reason is always shown

// const TransferReasonPage = () => {
//   const router = useRouter();
//   const params = useParams<ReasonParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");
//   const [selectedReason, setSelectedReason] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [error, setError] = useState("");
//   const dropdownRef = useRef(null);

//   // Retrieve summary from localStorage
//   const [summary, setSummary] = useState<any>(null); // Use 'any' or define SendSummary interface

//   useEffect(() => {
//     const storedSummary = localStorage.getItem("sendTransferSummary");
//     if (storedSummary) {
//       setSummary(JSON.parse(storedSummary));
//     } else {
//       // Handle missing summary - maybe redirect back
//       setError("Transfer details missing. Please start again.");
//       console.error("Transfer summary missing from localStorage");
//       // Optional: router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//     }

//     const handleClickOutside = (event: any) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const reasons = [
//     "Sending money home to family",
//     "Paying for goods or services",
//     "Property payment",
//     "Paying salary",
//     "General expenses",
//   ];

//   const handleReasonSelect = (reason: string) => {
//     setSelectedReason(reason);
//     setIsDropdownOpen(false);
//     setError(""); // Clear error on selection
//   };

//   const handleSubmit = () => {
//     if (!selectedReason) {
//       setError("Please select a reason for your transfer.");
//       return;
//     }
//     if (!summary) {
//       setError("Transfer details missing. Please start again.");
//       return;
//     }

//     // Add reason to summary object
//     const updatedSummary = { ...summary, reason: selectedReason };
//     localStorage.setItem("sendTransferSummary", JSON.stringify(updatedSummary)); // Update localStorage

//     // Navigate to review page
//     router.push(
//       `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`
//     );
//   };

//   return (
//     <div className="TransferReason-Page">
//       {/* Optional Header */}
//       {/* <DashboardHeader title="Send Money" currentStep={2.5} totalSteps={steps.length} steps={steps} /> */}

//       <div className="container mx-auto max-w-lg p-4 lg:p-8">
//         <h1 className="text-xl lg:text-2xl font-bold capitalize text-main dark:text-white mb-4">
//           What's the reason for your transfer?
//         </h1>
//         {/* Add note about India transfers if needed */}
//         {summary?.receiveCurrencyCode === "INR" && (
//           <p className="text-gray-500 dark:text-gray-300 mb-6">
//             Please note that transfers to charities or NGOs in India may have
//             restrictions.
//           </p>
//         )}

//         <div className="mb-6" ref={dropdownRef}>
//           <label
//             htmlFor="transfer-reason"
//             className="block text-sm text-gray-500 dark:text-gray-300 mb-2"
//           >
//             Select an option that best describes the reason
//           </label>
//           <div className="relative">
//             <button
//               type="button"
//               className={`flex justify-between items-center cursor-pointer w-full border dark:hover:shadow-whitecolor hover:shadow-darkcolor transition-shadow duration-300 ease-in-out rounded-md p-3 text-left ${
//                 error ? "" : ""
//               }`}
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               aria-expanded={isDropdownOpen}
//               aria-haspopup="listbox"
//             >
//               {selectedReason || (
//                 <span className="text-gray-500 dark:text-white">
//                   Select an option
//                 </span>
//               )}
//               <IoChevronDownOutline
//                 className={`size-6 text-gray-500 dark:text-gray-300 ${
//                   isDropdownOpen ? "rotate-180" : ""
//                 } transition-transform duration-300`}
//               />
//             </button>

//             {isDropdownOpen && (
//               <div
//                 className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white dark:bg-background border focus:outline-none"
//                 role="listbox"
//                 aria-activedescendant="listbox-item-3" // You might need to dynamically manage this for accessibility
//               >
//                 <ul
//                   className="py-1 rounded-md overflow-auto max-h-70 focus:outline-none"
//                   tabIndex={-1}
//                   role="listbox"
//                 >
//                   {reasons.map((reason) => (
//                     <li
//                       key={reason}
//                       className={`text-neutral-900 dark:text-white cursor-pointer select-none relative py-3 pl-3 pr-9 transition-colors ease-in-out duration-300  ${
//                         selectedReason === reason
//                           ? "font-semibold bg-primary dark:bg-background "
//                           : "font-normal hover:bg-lightgray dark:hover:bg-background hover:text-subheading"
//                       }`}
//                       id="listbox-item-0"
//                       role="option"
//                       onClick={() => handleReasonSelect(reason)}
//                     >
//                       <div className="flex items-center">
//                         <span className="font-medium ml-2 block truncate">
//                           {reason}
//                         </span>
//                       </div>
//                       {selectedReason === reason && (
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4">
//                         <GiCheckMark className="text-main dark:text-gray-300 size-5"/>
//                         </span>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-primary  hover:bg-primaryhover text-mainheading cursor-pointer h-14 font-medium py-3 rounded-full disabled:opacity-50 hover:bg-primary-hover transition-colors duration-300 ease-in-out"
//           disabled={!summary} // Disable if summary is missing
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TransferReasonPage;



// frontend/src/app/dashboard/balances/[balanceId]/send/reason/page.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { IoChevronDownOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";

interface ReasonParams {
  balanceId: string;
}

// Define an interface for the summary data stored in localStorage
// Adjust fields based on your actual summary object structure
interface SendSummary {
  recipientId: string;
  recipientName?: string; // Example field
  sendAmount: number;
  receiveAmount: number;
  sendCurrencyCode: string;
  receiveCurrencyCode: string;
  rate?: number; // Example field
  fee?: number; // Example field
  reason?: string; // Reason will be added here
  // Add other relevant fields from your summary object
}


// Define steps for the header (if using)
// const steps = ["Recipient", "Amount", "Review", "Pay"]; // Removed unused variable

const TransferReasonPage = () => {
  const router = useRouter();
  const params = useParams<ReasonParams>();
  const searchParams = useSearchParams();
  const { balanceId } = params;
  const recipientId = searchParams.get("recipientId");
  const [selectedReason, setSelectedReason] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Specify ref type

  // Retrieve summary from localStorage
  const [summary, setSummary] = useState<SendSummary | null>(null); // Use defined interface

  useEffect(() => {
    const storedSummary = localStorage.getItem("sendTransferSummary");
    if (storedSummary) {
        try {
            const parsedSummary: SendSummary = JSON.parse(storedSummary);
            // Basic validation (optional but recommended)
            if (parsedSummary && typeof parsedSummary === 'object' && parsedSummary.recipientId) {
                 setSummary(parsedSummary);
            } else {
                 throw new Error("Invalid summary format");
            }
        } catch (e) {
            setError("Failed to load transfer details. Please start again.");
            console.error("Error parsing transfer summary from localStorage:", e);
            // Optional: Clear invalid storage item
            // localStorage.removeItem("sendTransferSummary");
            // Optional: router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
        }
    } else {
      // Handle missing summary - maybe redirect back
      setError("Transfer details missing. Please start again.");
      console.error("Transfer summary missing from localStorage");
      // Optional: router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
    }

    // Type the event parameter
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { // Use type assertion
        setIsDropdownOpen(false);
      }
    };

    // Add listener with correct type
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove listener with correct type
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Removed balanceId and recipientId from dependency array as they don't directly affect this effect


  const reasons = [
    "Sending money home to family",
    "Paying for goods or services",
    "Property payment",
    "Paying salary",
    "General expenses",
  ];

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    setIsDropdownOpen(false);
    setError(""); // Clear error on selection
  };

  const handleSubmit = () => {
    if (!selectedReason) {
      setError("Please select a reason for your transfer.");
      return;
    }
    if (!summary) {
      setError("Transfer details missing. Please start again.");
      // Maybe disable the button if summary is null to prevent this state
      return;
    }

    // Add reason to summary object
    const updatedSummary: SendSummary = { ...summary, reason: selectedReason };
    localStorage.setItem("sendTransferSummary", JSON.stringify(updatedSummary)); // Update localStorage

    // Navigate to review page
    // Ensure recipientId is still valid before navigating
    if (!recipientId) {
        setError("Recipient information is missing. Please go back.");
        console.error("Recipient ID missing from search params on reason page");
        return;
    }
    router.push(
      `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`
    );
  };

  return (
    <div className="TransferReason-Page">
      {/* Optional Header */}
      {/* <DashboardHeader title="Send Money" currentStep={2.5} totalSteps={steps.length} steps={steps} /> */}

      <div className="container mx-auto max-w-lg p-4 lg:p-8">
        {/* Escaped apostrophe */}
        <h1 className="text-xl lg:text-2xl font-bold capitalize text-main dark:text-white mb-4">
          What&apos;s the reason for your transfer?
        </h1>
        {/* Add note about India transfers if needed */}
        {summary?.receiveCurrencyCode === "INR" && (
          <p className="text-gray-500 dark:text-gray-300 mb-6">
            Please note that transfers to charities or NGOs in India may have
            restrictions.
          </p>
        )}

        <div className="mb-6" ref={dropdownRef}>
          <label
            htmlFor="transfer-reason-button" // Match the button id if needed, or just associate with the concept
            className="block text-sm text-gray-500 dark:text-gray-300 mb-2"
          >
            Select an option that best describes the reason
          </label>
          <div className="relative">
            <button
              id="transfer-reason-button" // Added id for label association
              type="button"
              className={`flex justify-between items-center cursor-pointer w-full border dark:border-gray-600 dark:bg-background dark:hover:shadow-whitecolor hover:shadow-darkcolor transition-shadow duration-300 ease-in-out rounded-md p-3 text-left ${
                error ? "border-red-500" : "border-gray-300 dark:border-gray-600" // Add error styling to border
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              aria-controls="reason-listbox" // Added aria-controls
            >
              {selectedReason || (
                <span className="text-gray-500 dark:text-white">
                  Select an option
                </span>
              )}
              <IoChevronDownOutline
                className={`size-6 text-gray-500 dark:text-gray-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                } transition-transform duration-300`}
              />
            </button>

            {isDropdownOpen && (
              <div
                id="reason-listbox" // Added id for aria-controls
                className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white dark:bg-background border border-gray-300 dark:border-gray-600 focus:outline-none"
                role="listbox"
                aria-labelledby="transfer-reason-button" // Labelled by the button
                // aria-activedescendant is managed automatically by focus usually, or manually if implementing keyboard nav
              >
                <ul
                  className="py-1 rounded-md overflow-auto max-h-70 focus:outline-none"
                  tabIndex={-1} // Keep focus management on the container or button
                  role="presentation" // Role listbox is on the parent div
                >
                  {reasons.map((reason) => (
                    <li
                      key={reason}
                      className={`text-neutral-900 dark:text-white cursor-pointer select-none relative py-3 pl-3 pr-9 transition-colors ease-in-out duration-300 ${
                        selectedReason === reason
                          ? "font-semibold bg-primary/20 dark:bg-primary/30" // Adjusted selected style
                          : "font-normal hover:bg-lightgray dark:hover:bg-gray-700 hover:text-subheading dark:hover:text-white" // Adjusted hover style
                      }`}
                      id={`listbox-option-${reason.replace(/\s+/g, '-')}`} // Generate unique ID
                      role="option"
                      // Added aria-selected attribute
                      aria-selected={selectedReason === reason}
                      onClick={() => handleReasonSelect(reason)}
                      // Optional: Add keyboard support (onKeyDown) if needed for full accessibility
                    >
                      <div className="flex items-center">
                        <span className="font-medium ml-2 block truncate">
                          {reason}
                        </span>
                      </div>
                      {selectedReason === reason && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <GiCheckMark className="text-main dark:text-primary size-5"/>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primaryhover text-white cursor-pointer h-14 font-medium py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 ease-in-out"
          // Disable button if no reason selected OR if summary is missing
          disabled={!summary || !selectedReason}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TransferReasonPage;