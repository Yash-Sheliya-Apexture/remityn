// // src/app/kyc/currencies/page.tsx

// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import currencyService from "@/app/services/currency"; // Adjust path if necessary

// // Define a type for the currency object
// interface Currency {
//   code: string;
//   currencyName: string;
//   flagImage?: string; // Optional flag image
//   // Add other properties of your currency object if needed
// }

// const CurrenciesKYCPage = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]); // Use Currency[] type here
//   const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
//   const [formError, setFormError] = useState("");
//   const [selectedCurrencies, setSelectedCurrencies] = useState<Set<string>>(
//     new Set()
//   );
//   const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(true); // State for button disabled status

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoadingCurrencies(true);
//       try {
//         const fetchedCurrencies: Currency[] =
//           await currencyService.getAllCurrencies(); // Type fetchedCurrencies
//         // Filter currencies to include only USD, EUR, GBP, and AUD
//         const filteredCurrencies = fetchedCurrencies.filter(
//           (currency: Currency) =>
//             ["USD", "EUR", "GBP", "AUD"].includes(currency.code)
//         );
//         setCurrencies(filteredCurrencies);
//       } catch (error) {
//         console.error("Error fetching currencies:", error);
//         setFormError("Failed to load currencies.");
//       } finally {
//         setIsLoadingCurrencies(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   useEffect(() => {
//     // Update continue button disabled state based on selectedCurrencies
//     setIsContinueButtonDisabled(selectedCurrencies.size === 0);
//   }, [selectedCurrencies]);


//   const handleCurrencySelect = (currencyCode: string) => {
//     setSelectedCurrencies((prevSelected) => {
//       const newSelected = new Set(prevSelected);
//       if (newSelected.has(currencyCode)) {
//         newSelected.delete(currencyCode);
//       } else {
//         newSelected.add(currencyCode);
//       }
//       return newSelected;
//     });
//   };

//   return (
//     <section className="py-12 relative">
//       <div className="container mx-auto px-4">
//         {/* Title and Description */}
//         <div className=" max-w-xl mx-auto ">
//           <div className="space-y-3 text-center">
//             <h1 className="text-3xl font-semibold text-main">
//               Choose currencies to get paid in
//             </h1>
//             <p className="text-gray text-sm">
//               These are the currencies you can request money in. Choose the ones
//               you'd like to use now - you can always add more later.
//             </p>
//             <p className="text-gray text-sm">
//               You get one Wise account for all these currencies. It's managed
//               and protected by Wise in your region.
//             </p>
//           </div>

//           <div className="bg-white relative rounded-2xl mt-10 pb-28">
//             <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-3">
//               Currencies with account details
//             </h3>

//             <div className="space-y-3">
//               {isLoadingCurrencies ? (
//                 <>
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                 </>
//               ) : (
//                 <>
//                   <div className="space-y-2">
//                     {currencies.map((currency) => (
//                       <div
//                         key={currency.code}
//                         className={`hover:bg-lightgray p-4 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out`}
//                         onClick={() => handleCurrencySelect(currency.code)}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-4">
//                             {currency.flagImage && (
//                               <Image
//                                 src={currency.flagImage}
//                                 width={44}
//                                 height={44}
//                                 alt={`${currency.currencyName} Flag`}
//                               />
//                             )}
//                             <div>
//                               <h4 className="font-semibold text-main">
//                                 {currency.code}
//                               </h4>
//                               <p className="text-sm text-gray-600">
//                                 {currency.currencyName}
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="checkbox"
//                             className="form-checkbox h-5 w-5 text-main rounded border-gray-300 focus:ring-main focus:ring-opacity-50"
//                             checked={selectedCurrencies.has(currency.code)}
//                             readOnly
//                             tabIndex={-1}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border fixed w-full left-0 right-0 bottom-0 z-10">
//           <div className="flex flex-col items-center gap-4 p-6">
//             <Link href="/kyc/verification">
//               <button
//                 className={`inline-flex items-center justify-center w-96 px-6 py-3 border border-transparent font-medium rounded-full text-secondary ${
//                   isContinueButtonDisabled
//                     ? 'bg-lightgray cursor-not-allowed' // Disabled style
//                     : 'bg-primary hover:bg-primary/80 cursor-pointer' // Enabled style
//                 } transition-colors duration-150 ease-in-out`}
//                 disabled={isContinueButtonDisabled} // Disable attribute
//               >
//                 Continue
//               </button>
//             </Link>
//             {/* different currencies */}
//             <Link href={""} className="">
//               <span className="text-secondary font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-secondary after:mt-1 mb-3">
//                 Looking for a different currencies ?
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CurrenciesKYCPage;





















// // src/app/kyc/currencies/page.tsx

// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import currencyService from "@/app/services/currency"; // Adjust path if necessary

// // Define a type for the currency object
// interface Currency {
//   code: string;
//   currencyName: string;
//   flagImage?: string; // Optional flag image
//   // Add other properties of your currency object if needed
// }


// const CurrenciesKYCPage = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]); // Use Currency[] type here
//   const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
//   const [formError, setFormError] = useState("");
//   const [selectedCurrencies, setSelectedCurrencies] = useState<Set<string>>(
//     new Set()
//   );
//   const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(true); // State for button disabled status


//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoadingCurrencies(true);
//       try {
//         const fetchedCurrencies: Currency[] =
//           await currencyService.getAllCurrencies(); // Type fetchedCurrencies
//         // Filter currencies to include only USD, EUR, GBP, and AUD
//         const filteredCurrencies = fetchedCurrencies.filter(
//           (currency: Currency) =>
//             ["USD", "EUR", "GBP", "AUD"].includes(currency.code)
//         );
//         setCurrencies(filteredCurrencies);
//       } catch (error) {
//         console.error("Error fetching currencies:", error);
//         setFormError("Failed to load currencies.");
//       } finally {
//         setIsLoadingCurrencies(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   useEffect(() => {
//     // Update continue button disabled state based on selectedCurrencies
//     setIsContinueButtonDisabled(selectedCurrencies.size === 0);
//   }, [selectedCurrencies]);


//   const handleCurrencySelect = (currencyCode: string) => {
//     setSelectedCurrencies((prevSelected) => {
//       const newSelected = new Set(prevSelected);
//       if (newSelected.has(currencyCode)) {
//         newSelected.delete(currencyCode);
//       } else {
//         newSelected.add(currencyCode);
//       }
//       return newSelected;
//     });
//   };


//   return (
//     <section className="py-12 relative">
//       <div className="container mx-auto px-4">
//         {/* Title and Description */}
//         <div className=" max-w-xl mx-auto ">
//           <div className="space-y-3 text-center">
//             <h1 className="text-3xl font-semibold text-main">
//               Choose currencies to get paid in
//             </h1>
//             <p className="text-gray text-sm">
//               These are the currencies you can request money in. Choose the ones
//               you'd like to use now - you can always add more later.
//             </p>
//             <p className="text-gray text-sm">
//               You get one Wise account for all these currencies. It's managed
//               and protected by Wise in your region.
//             </p>
//           </div>

//           <div className="bg-white relative rounded-2xl mt-10 pb-28">
//             <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-3">
//               Currencies with account details
//             </h3>

//             <div className="space-y-3">
//               {isLoadingCurrencies ? (
//                 <>
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                 </>
//               ) : (
//                 <>
//                   <div className="space-y-2">
//                     {currencies.map((currency) => (
//                       <div
//                         key={currency.code}
//                         className={`hover:bg-lightgray p-4 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out`}
//                         onClick={() => handleCurrencySelect(currency.code)}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-4">
//                             {currency.flagImage && (
//                               <Image
//                                 src={currency.flagImage}
//                                 width={44}
//                                 height={44}
//                                 alt={`${currency.currencyName} Flag`}
//                               />
//                             )}
//                             <div>
//                               <h4 className="font-semibold text-main">
//                                 {currency.code}
//                               </h4>
//                               <p className="text-sm text-gray-600">
//                                 {currency.currencyName}
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="checkbox"
//                             className="form-checkbox h-5 w-5 text-main rounded border-gray-300 focus:ring-main focus:ring-opacity-50"
//                             checked={selectedCurrencies.has(currency.code)}
//                             readOnly
//                             tabIndex={-1}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border fixed w-full left-0 right-0 bottom-0 z-10">
//           <div className="flex flex-col items-center gap-4 p-6">
//             <Link href="/kyc/verification">
//               <button
//                 className={`inline-flex items-center justify-center w-96 px-6 py-3 border border-transparent font-medium rounded-full text-secondary ${
//                   isContinueButtonDisabled
//                     ? 'bg-lightgray cursor-not-allowed' // Disabled style
//                     : 'bg-primary hover:bg-primary/80 cursor-pointer' // Enabled style
//                 } transition-colors duration-150 ease-in-out`}
//                 disabled={isContinueButtonDisabled} // Disable attribute
//               >
//                 Continue
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CurrenciesKYCPage;



// src/app/kyc/currencies/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import currencyService from "@/app/services/currency"; // Adjust path if necessary

// Define a type for the currency object
interface Currency {
  code: string;
  currencyName: string;
  flagImage?: string; // Optional flag image
  // Add other properties of your currency object if needed
}


const CurrenciesKYCPage = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]); // Use Currency[] type here
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
  const [formError, setFormError] = useState(""); // Keep state for potential error display
  const [selectedCurrencies, setSelectedCurrencies] = useState<Set<string>>(
    new Set()
  );
  const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(true); // State for button disabled status


  useEffect(() => {
    const fetchCurrencies = async () => {
      setIsLoadingCurrencies(true);
      setFormError(""); // Reset error on new fetch attempt
      try {
        const fetchedCurrencies: Currency[] =
          await currencyService.getAllCurrencies(); // Type fetchedCurrencies
        // Filter currencies to include only USD, EUR, GBP, and AUD
        const filteredCurrencies = fetchedCurrencies.filter(
          (currency: Currency) =>
            ["USD", "EUR", "GBP", "AUD"].includes(currency.code)
        );
        setCurrencies(filteredCurrencies);
      } catch (error) {
        console.error("Error fetching currencies:", error);
        setFormError("Failed to load currencies. Please try again later."); // Set user-friendly error message
      } finally {
        setIsLoadingCurrencies(false);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    // Update continue button disabled state based on selectedCurrencies
    setIsContinueButtonDisabled(selectedCurrencies.size === 0);
  }, [selectedCurrencies]);


  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrencies((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(currencyCode)) {
        newSelected.delete(currencyCode);
      } else {
        newSelected.add(currencyCode);
      }
      return newSelected;
    });
  };


  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        {/* Title and Description */}
        <div className=" max-w-xl mx-auto ">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-semibold text-main">
              Choose currencies to get paid in
            </h1>
            <p className="text-gray text-sm">
              These are the currencies you can request money in. Choose the ones
              you&apos;d like to use now - you can always add more later. {/* Changed ' to ' */}
            </p>
            <p className="text-gray text-sm">
              You get one Wise account for all these currencies. It&apos;s managed {/* Changed ' to ' */}
              and protected by Wise in your region.
            </p>
          </div>

          {/* Display Form Error if exists */}
          {formError && (
            <div className="mt-4 text-center text-red-600 text-sm bg-red-100 p-3 rounded-md">
              {formError}
            </div>
          )}

          <div className="bg-white relative rounded-2xl mt-10 pb-28">
            <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-3">
              Currencies with account details
            </h3>

            <div className="space-y-3">
              {isLoadingCurrencies ? (
                <>
                  <Skeleton className="h-16 rounded-xl" />
                  <Skeleton className="h-16 rounded-xl" />
                  <Skeleton className="h-16 rounded-xl" />
                </>
              ) : (
                <>
                 {/* Only render currency list if no error occurred or currencies are loaded */}
                 {!formError && currencies.length > 0 ? (
                    <div className="space-y-2">
                      {currencies.map((currency) => (
                        <div
                          key={currency.code}
                          className={`hover:bg-lightgray p-4 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out ${
                            selectedCurrencies.has(currency.code) ? 'bg-lightgray' : '' // Optional: visual feedback for selection
                          }`}
                          onClick={() => handleCurrencySelect(currency.code)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {currency.flagImage && (
                                <Image
                                  src={currency.flagImage}
                                  width={44}
                                  height={44}
                                  alt={`${currency.currencyName} Flag`}
                                  className="rounded-full" // Add rounding if flags are circular
                                />
                              )}
                              <div>
                                <h4 className="font-semibold text-main">
                                  {currency.code}
                                </h4>
                                <p className="text-sm text-gray"> {/* Adjusted text color */}
                                  {currency.currencyName}
                                </p>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-main rounded border-gray-300 focus:ring-main focus:ring-offset-0 focus:ring-2" // Improved focus style
                              checked={selectedCurrencies.has(currency.code)}
                              readOnly // Keep readOnly as click is handled by div
                              tabIndex={-1} // Keep focus away from checkbox itself
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                 ) : !isLoadingCurrencies && !formError && currencies.length === 0 ? (
                     // Handle case where filter results in no currencies (unlikely with the hardcoded filter)
                    <p className="text-center text-gray p-4">No matching currencies found.</p>
                 ) : null /* Don't render list if loading or error */}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Footer with Continue Button */}
        {/* Only show footer if not loading and no critical error */}
        {!isLoadingCurrencies && (
          <div className="bg-white border-t border-gray-200 fixed w-full left-0 right-0 bottom-0 z-10"> {/* Added border-t */}
            <div className="container mx-auto px-4 max-w-xl"> {/* Constrain width */}
              <div className="flex flex-col items-center gap-4 p-4"> {/* Adjusted padding */}
                 {/* Link component wraps the button for navigation */}
                 <Link href="/kyc/verification" passHref legacyBehavior>
                    <a
                       className={`inline-flex items-center justify-center w-full max-w-xs px-6 py-3 border border-transparent font-medium rounded-full text-white text-base ${ // Use text-white for primary, adjust width
                       isContinueButtonDisabled
                          ? 'bg-gray-300 cursor-not-allowed' // More distinct disabled style
                          : 'bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary' // Standard enabled style
                       } transition-colors duration-150 ease-in-out`}
                       aria-disabled={isContinueButtonDisabled} // Add aria-disabled for accessibility
                       onClick={(e) => { if (isContinueButtonDisabled) e.preventDefault(); }} // Prevent click on disabled link
                       tabIndex={isContinueButtonDisabled ? -1 : 0} // Manage focus
                    >
                       Continue
                    </a>
                 </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CurrenciesKYCPage;