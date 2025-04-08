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

// frontend/src/app/dashboard/balances/[balanceId]/send/reason/page.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import DashboardHeader from "../../../../components/layout/DashboardHeader";
import { IoChevronDownOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";

interface ReasonParams {
  balanceId: string;
}

// Define steps for the header (if using)
const steps = ["Recipient", "Amount", "Review", "Pay"]; // Adjust based on whether reason is always shown

const TransferReasonPage = () => {
  const router = useRouter();
  const params = useParams<ReasonParams>();
  const searchParams = useSearchParams();
  const { balanceId } = params;
  const recipientId = searchParams.get("recipientId");
  const [selectedReason, setSelectedReason] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  // Retrieve summary from localStorage
  const [summary, setSummary] = useState<any>(null); // Use 'any' or define SendSummary interface

  useEffect(() => {
    const storedSummary = localStorage.getItem("sendTransferSummary");
    if (storedSummary) {
      setSummary(JSON.parse(storedSummary));
    } else {
      // Handle missing summary - maybe redirect back
      setError("Transfer details missing. Please start again.");
      console.error("Transfer summary missing from localStorage");
      // Optional: router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
    }

    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      return;
    }

    // Add reason to summary object
    const updatedSummary = { ...summary, reason: selectedReason };
    localStorage.setItem("sendTransferSummary", JSON.stringify(updatedSummary)); // Update localStorage

    // Navigate to review page
    router.push(
      `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`
    );
  };

  return (
    <div className="TransferReason-Page">
      {/* Optional Header */}
      {/* <DashboardHeader title="Send Money" currentStep={2.5} totalSteps={steps.length} steps={steps} /> */}

      <div className="container mx-auto max-w-lg p-4 lg:p-8">
        <h1 className="text-xl lg:text-2xl font-bold capitalize text-main dark:text-white mb-4">
          What's the reason for your transfer?
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
            htmlFor="transfer-reason"
            className="block text-sm text-gray-500 dark:text-gray-300 mb-2"
          >
            Select an option that best describes the reason
          </label>
          <div className="relative">
            <button
              type="button"
              className={`flex justify-between items-center cursor-pointer w-full border dark:hover:shadow-whitecolor hover:shadow-darkcolor transition-shadow duration-300 ease-in-out rounded-md p-3 text-left ${
                error ? "" : ""
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
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
                className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white dark:bg-background border focus:outline-none"
                role="listbox"
                aria-activedescendant="listbox-item-3" // You might need to dynamically manage this for accessibility
              >
                <ul
                  className="py-1 rounded-md overflow-auto max-h-70 focus:outline-none"
                  tabIndex={-1}
                  role="listbox"
                >
                  {reasons.map((reason) => (
                    <li
                      key={reason}
                      className={`text-neutral-900 dark:text-white cursor-pointer select-none relative py-3 pl-3 pr-9 transition-colors ease-in-out duration-300  ${
                        selectedReason === reason
                          ? "font-semibold bg-primary dark:bg-background "
                          : "font-normal hover:bg-lightgray dark:hover:bg-background hover:text-subheading"
                      }`}
                      id="listbox-item-0"
                      role="option"
                      onClick={() => handleReasonSelect(reason)}
                    >
                      <div className="flex items-center">
                        <span className="font-medium ml-2 block truncate">
                          {reason}
                        </span>
                      </div>
                      {selectedReason === reason && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <GiCheckMark className="text-main dark:text-gray-300 size-5"/>
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
          className="w-full bg-primary  hover:bg-primaryhover text-mainheading cursor-pointer h-14 font-medium py-3 rounded-full disabled:opacity-50 hover:bg-primary-hover transition-colors duration-300 ease-in-out"
          disabled={!summary} // Disable if summary is missing
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TransferReasonPage;
