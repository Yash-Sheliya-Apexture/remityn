// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


// interface Currency {
//   code: string;
//   name: string;
//   flag: string; //  URL or path to the flag image
// }

// interface CountryDropdownProps {
//   selectedCurrency: Currency;
//   onCurrencyChange: (currency: Currency) => void;
//   currencies: Currency[]; //pass all currencies data
//   label?:string,
//   className?:string
// }


// const CountryDropdown: React.FC<CountryDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
//   currencies,
//   label,
//   className
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCurrencySelect = (currency: Currency) => {
//     onCurrencyChange(currency);
//     setIsOpen(false);
//   };

//   return (
//     <div className={`relative ${className}`}>
//       {/* Label (if provided) */}
//       {label && (
//           <label className="block font-medium text-main mb-1">
//             {label}
//           </label>
//         )
//       }
//       <button
//         type="button"
//         className="w-full h-16 p-3 border border-gray-300 rounded-lg shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main"
//         onClick={toggleDropdown}
//       >
//          <div className="flex items-center gap-2 w-28">
//             <div className="flex items-center gap-2">
//               <Image
//                 src={selectedCurrency.flag}
//                 alt={`${selectedCurrency.code}-Flag`}
//                 width={24}
//                 height={24}
//               />
//               <p>{selectedCurrency.code}</p>
//             </div>
//             {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//           </div>
//       </button>

//       {/* Dropdown List */}
//       {isOpen && (
//         <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-50 border border-gray-300 overflow-y-auto max-h-72">
          
//           {/* Search Input (Optional, but recommended) */}
//           <div className="p-2 sticky top-0 bg-white z-10">
//             <input
//               type="text"
//               placeholder="Type a currency / country"
//               className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
//                // Add onChange event handling for filtering if needed
//             />
//           </div>
          
//           {/* Popular Currencies */}
//           {currencies.length > 0 && (
//             <>
//             <div className="p-2">
//                   <p className="text-sm font-medium text-gray-500 uppercase">Popular currencies</p>
//                 </div>
//                 {currencies.slice(0,3).map((currency) => (  //  Show first 3 as popular.  Adjust as needed.
//               <button
//                 key={currency.code}
//                 type="button"
//                 className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
//                 onClick={() => handleCurrencySelect(currency)}
//               >
//                 <Image
//                   src={currency.flag}
//                   alt={`${currency.code} Flag`}
//                   width={24}
//                   height={24}
//                   className="mr-2"
//                 />
//                 <span className="font-medium mr-2">{currency.code}</span>
//                 <span className="text-gray-600">{currency.name}</span>
//                  {/* Checkmark for Selected */}
//                 {currency.code === selectedCurrency.code && (
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-auto text-green">
//                     <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
//                     </svg>

//                 )}
//               </button>
//             ))}

//             <div className="p-2">
//               <p className="text-sm font-medium text-gray-500 uppercase">All currencies</p>
//             </div>
//             {/* List of all the currencies */}
//             {currencies.slice(3).map((currency) => (  // Show rest currencies
//               <button
//                 key={currency.code}
//                 type="button"
//                 className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
//                 onClick={() => handleCurrencySelect(currency)}
//               >
//                 <Image
//                   src={currency.flag}
//                   alt={`${currency.code} Flag`}
//                   width={24}
//                   height={24}
//                   className="mr-2"
//                 />
//                 <span className="font-medium mr-2">{currency.code}</span>
//                 <span className="text-gray-600">{currency.name}</span>
//                  {/* Checkmark for Selected */}
//                 {currency.code === selectedCurrency.code && (
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-auto text-green">
//                     <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
//                   </svg>

//                 )}
//               </button>
//             ))}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountryDropdown;





// components/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";

// // Import the SVG files directly
// import aed from '../../../public/assets/icons/aed.svg'
// import gbp from '../../../public/assets/icons/gbp.svg'
// import inr from '../../../public/assets/icons/inr.svg'
// import usd from '../../../public/assets/icons/usd.svg'
// import aud from '../../../public/assets/icons/aud.svg'
// import bgn from '../../../public/assets/icons/bgn.svg'
// import brl from '../../../public/assets/icons/brl.svg'

// // Define interface for Country data
// interface Country {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we're importing the SVG directly
//   popular?: boolean;
// }

// // Static data for countries (replace with API call or data file for real app)
// const countriesData: Country[] = [
//   { code: "GBP", name: "British pound", flag: gbp, popular: true },
//   { code: "INR", name: "Indian rupee", flag: inr, popular: true },
//   { code: "USD", name: "United States dollar", flag: usd, popular: true },
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "AUD", name: "Australian dollar", flag: aud },
//   { code: "BGN", name: "Bulgarian lev", flag: bgn },
//   { code: "BRL", name: "Brazilian real", flag: brl },

// ];


// interface CountryDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CountryDropdown: React.FC<CountryDropdownProps> = ({ selectedCurrency, onCurrencyChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const closeDropdown = () => setIsOpen(false);

//   const handleCountryChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     closeDropdown();
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredCountries = countriesData.filter(country =>
//     country.name.toLowerCase().includes(searchQuery.toLowerCase()) || country.code.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const popularCountries = filteredCountries.filter(country => country.popular);
//   const allCountries = filteredCountries.filter(country => !country.popular);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         closeDropdown();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);



//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {countriesData.find(c => c.code === selectedCurrency) && (
//              <Image
//                 src={countriesData.find(c => c.code === selectedCurrency)!.flag} // Removed the async function
//                 alt={`${selectedCurrency}-Flag`}
//                 width={24}
//                 height={24}
//               />
//           )}
//           <p>{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 mt-2 w-[300px] bg-white rounded-xl shadow-lg border overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green dark:focus:border-green"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/* Popular Currencies */}
//             {popularCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-500 mb-2 px-2">
//                   Popular currencies
//                 </h3>
//                 <ul>
//                   {popularCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                          <Image
//                             src={country.flag} // Removed the async function
//                             alt={`${country.code}-Flag`}
//                             width={20}
//                             height={20}
//                           />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">- {country.name}</span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <span className="text-green-500 font-bold">✔</span> // Checkmark
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* All Currencies */}
//             {allCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-500 mt-4 mb-2 px-2">
//                   All currencies
//                 </h3>
//                 <ul>
//                   {allCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                          <Image
//                            src={country.flag} // Removed the async function
//                             alt={`${country.code}-Flag`}
//                             width={20}
//                             height={20}
//                           />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">- {country.name}</span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <span className="text-green-500 font-bold">✔</span> // Checkmark
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//              {filteredCountries.length === 0 && searchQuery && (
//                 <div className="p-4 text-center text-gray-500">
//                     No currencies found for "{searchQuery}"
//                 </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountryDropdown;









// // components/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineCheck } from "react-icons/ai";


// // Import all the SVG files directly
// import aed from "../../../public/assets/icons/aed.svg";
// import aud from "../../../public/assets/icons/aud.svg";
// import bgn from "../../../public/assets/icons/bgn.svg";
// import brl from "../../../public/assets/icons/brl.svg";
// import cad from "../../../public/assets/icons/cad.svg";
// import chf from "../../../public/assets/icons/chf.svg";
// import cny from "../../../public/assets/icons/cny.svg";
// import czk from "../../../public/assets/icons/czk.svg";
// import dkk from "../../../public/assets/icons/dkk.svg";
// import eur from "../../../public/assets/icons/eur.svg";
// import gbp from "../../../public/assets/icons/gbp.svg";
// import hkd from "../../../public/assets/icons/hkd.svg";
// import huf from "../../../public/assets/icons/huf.svg";
// import ils from "../../../public/assets/icons/ils.svg";
// import inr from "../../../public/assets/icons/inr.svg";
// import jpy from "../../../public/assets/icons/jpy.svg";
// import mxn from "../../../public/assets/icons/mxn.svg";
// import myr from "../../../public/assets/icons/myr.svg";
// import nok from "../../../public/assets/icons/nok.svg";
// import nzd from "../../../public/assets/icons/nzd.svg";
// import php from "../../../public/assets/icons/php.svg";
// import pln from "../../../public/assets/icons/pln.svg";
// import ron from "../../../public/assets/icons/ron.svg";
// import sek from "../../../public/assets/icons/sek.svg";
// import sgd from "../../../public/assets/icons/sgd.svg";
// import try_ from "../../../public/assets/icons/try.svg"; // 'try' is a reserved keyword, so rename
// import uah from "../../../public/assets/icons/uah.svg";
// import usd from "../../../public/assets/icons/usd.svg";


// // Define interface for Country data
// interface Country {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we're importing the SVG directly
//   popular?: boolean;
// }

// // Static data for countries
// const countriesData: Country[] = [
//   { code: "GBP", name: "British pound", flag: gbp, popular: true },
//   { code: "INR", name: "Indian rupee", flag: inr, popular: true },
//   { code: "USD", name: "United States dollar", flag: usd, popular: true },
//   { code: "EUR", name: "Euro", flag: eur, popular: true }, // Added EUR as popular
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "AUD", name: "Australian dollar", flag: aud },
//   { code: "BGN", name: "Bulgarian lev", flag: bgn },
//   { code: "BRL", name: "Brazilian real", flag: brl },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "CHF", name: "Swiss franc", flag: chf },
//   { code: "CNY", name: "Chinese yuan", flag: cny },
//   { code: "CZK", name: "Czech koruna", flag: czk },
//   { code: "DKK", name: "Danish krone", flag: dkk },
//   { code: "HKD", name: "Hong Kong dollar", flag: hkd },
//   { code: "HUF", name: "Hungarian forint", flag: huf },
//   { code: "ILS", name: "Israeli new shekel", flag: ils },
//   { code: "JPY", name: "Japanese yen", flag: jpy },
//   { code: "MXN", name: "Mexican peso", flag: mxn },
//   { code: "MYR", name: "Malaysian ringgit", flag: myr },
//   { code: "NOK", name: "Norwegian krone", flag: nok },
//   { code: "NZD", name: "New Zealand dollar", flag: nzd },
//   { code: "PHP", name: "Philippine peso", flag: php },
//   { code: "PLN", name: "Polish złoty", flag: pln },
//   { code: "RON", name: "Romanian leu", flag: ron },
//   { code: "SEK", name: "Swedish krona", flag: sek },
//   { code: "SGD", name: "Singapore dollar", flag: sgd },
//   { code: "TRY", name: "Turkish lira", flag: try_ },
//   { code: "UAH", name: "Ukrainian hryvnia", flag: uah },

// ];


// interface CountryDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CountryDropdown: React.FC<CountryDropdownProps> = ({ selectedCurrency, onCurrencyChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const closeDropdown = () => setIsOpen(false);

//   const handleCountryChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     closeDropdown();
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredCountries = countriesData.filter(country =>
//     country.name.toLowerCase().includes(searchQuery.toLowerCase()) || country.code.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const popularCountries = filteredCountries.filter(country => country.popular);
//   const allCountries = filteredCountries.filter(country => !country.popular);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         closeDropdown();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);



//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 w-24 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {countriesData.find(c => c.code === selectedCurrency) && (
//              <Image
//                 src={countriesData.find(c => c.code === selectedCurrency)!.flag}
//                 alt={`${selectedCurrency}-Flag`}
//                 width={24}
//                 height={24}
//               />
//           )}
//           <p className="text-main font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green dark:focus:border-green"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/* Popular Currencies */}
//             {popularCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-medium text-gray p-2">
//                   Popular currencies
//                 </h3>
//                 <ul>
//                   {popularCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                          <Image
//                             src={country.flag}
//                             alt={`${country.code}-Flag`}
//                             width={20}
//                             height={20}
//                           />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">{country.name}</span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <AiOutlineCheck className="text-main"/>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* All Currencies */}
//             {allCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-500 mt-4 mb-2 px-2">
//                   All currencies
//                 </h3>
//                 <ul>
//                   {allCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                          <Image
//                            src={country.flag}
//                             alt={`${country.code}-Flag`}
//                             width={20}
//                             height={20}
//                           />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">{country.name}</span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <span className="text-green-500 font-bold">✔</span> // Checkmark
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//              {filteredCountries.length === 0 && searchQuery && (
//                 <div className="p-4 text-center text-gray-500">
//                     No currencies found for "{searchQuery}"
//                 </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountryDropdown;





// components/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineCheck } from "react-icons/ai";

// // Import all the SVG files directly (same as before)
// import aed from "../../../public/assets/icons/aed.svg";
// import aud from "../../../public/assets/icons/aud.svg";
// import bgn from "../../../public/assets/icons/bgn.svg";
// import brl from "../../../public/assets/icons/brl.svg";
// import cad from "../../../public/assets/icons/cad.svg";
// import chf from "../../../public/assets/icons/chf.svg";
// import cny from "../../../public/assets/icons/cny.svg";
// import czk from "../../../public/assets/icons/czk.svg";
// import dkk from "../../../public/assets/icons/dkk.svg";
// import eur from "../../../public/assets/icons/eur.svg";
// import gbp from "../../../public/assets/icons/gbp.svg";
// import hkd from "../../../public/assets/icons/hkd.svg";
// import huf from "../../../public/assets/icons/huf.svg";
// import ils from "../../../public/assets/icons/ils.svg";
// import inr from "../../../public/assets/icons/inr.svg";
// import jpy from "../../../public/assets/icons/jpy.svg";
// import mxn from "../../../public/assets/icons/mxn.svg";
// import myr from "../../../public/assets/icons/myr.svg";
// import nok from "../../../public/assets/icons/nok.svg";
// import nzd from "../../../public/assets/icons/nzd.svg";
// import php from "../../../public/assets/icons/php.svg";
// import pln from "../../../public/assets/icons/pln.svg";
// import ron from "../../../public/assets/icons/ron.svg";
// import sek from "../../../public/assets/icons/sek.svg";
// import sgd from "../../../public/assets/icons/sgd.svg";
// import try_ from "../../../public/assets/icons/try.svg"; // 'try' is a reserved keyword
// import uah from "../../../public/assets/icons/uah.svg";
// import usd from "../../../public/assets/icons/usd.svg";

// interface Country {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we are directly importing SVG
//   popular?: boolean;
// }

// const countriesData: Country[] = [
//   { code: "GBP", name: "British pound", flag: gbp, popular: true },
//   { code: "INR", name: "Indian rupee", flag: inr, popular: true },
//   { code: "USD", name: "United States dollar", flag: usd, popular: true },
//   { code: "EUR", name: "Euro", flag: eur},
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "AUD", name: "Australian dollar", flag: aud },
//   { code: "BGN", name: "Bulgarian lev", flag: bgn },
//   { code: "BRL", name: "Brazilian real", flag: brl },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "CHF", name: "Swiss franc", flag: chf },
//   { code: "CNY", name: "Chinese yuan", flag: cny },
//   { code: "CZK", name: "Czech koruna", flag: czk },
//   { code: "DKK", name: "Danish krone", flag: dkk },
//   { code: "HKD", name: "Hong Kong dollar", flag: hkd },
//   { code: "HUF", name: "Hungarian forint", flag: huf },
//   { code: "ILS", name: "Israeli new shekel", flag: ils },
//   { code: "JPY", name: "Japanese yen", flag: jpy },
//   { code: "MXN", name: "Mexican peso", flag: mxn },
//   { code: "MYR", name: "Malaysian ringgit", flag: myr },
//   { code: "NOK", name: "Norwegian krone", flag: nok },
//   { code: "NZD", name: "New Zealand dollar", flag: nzd },
//   { code: "PHP", name: "Philippine peso", flag: php },
//   { code: "PLN", name: "Polish złoty", flag: pln },
//   { code: "RON", name: "Romanian leu", flag: ron },
//   { code: "SEK", name: "Swedish krona", flag: sek },
//   { code: "SGD", name: "Singapore dollar", flag: sgd },
//   { code: "TRY", name: "Turkish lira", flag: try_ },
//   { code: "UAH", name: "Ukrainian hryvnia", flag: uah },
// ];

// interface CountryDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CountryDropdown: React.FC<CountryDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//     // Simplified closeDropdown; no need for a separate function
//   const handleCountryChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false); // Close directly
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   // Use .filter() and .some() for a cleaner search
//     const filteredCountries = countriesData.filter(country =>
//       country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       country.code.toLowerCase().includes(searchQuery.toLowerCase())
//     );


//   const popularCountries = filteredCountries.filter((country) => country.popular);
//   const allCountries = filteredCountries.filter((country) => !country.popular);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false); // Close directly
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);


//     // Added a useMemo to prevent unnecessary filtering if the selectedCurrency and countriesData haven't changed.
//   const selectedCountry = React.useMemo(() => {
//     return countriesData.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, countriesData]);



//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 w-24 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {selectedCountry && ( // Use the memoized value
//             <Image
//               src={selectedCountry.flag}
//               alt={`${selectedCurrency}-Flag`}
//               width={24}
//               height={24}
//             />
//           )}
//           <p className="text-main font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/* Popular Currencies */}
//             {popularCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-medium text-gray p-2">
//                   Popular currencies
//                 </h3>
//                 <ul>
//                   {popularCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={country.flag}
//                           alt={`${country.code}-Flag`}
//                           width={20}
//                           height={20}
//                         />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">
//                           {country.name}
//                         </span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <AiOutlineCheck className="text-main" />
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* All Currencies */}
//             {allCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-500 mt-4 mb-2 px-2">
//                   All currencies
//                 </h3>
//                 <ul>
//                   {allCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={country.flag}
//                           alt={`${country.code}-Flag`}
//                           width={20}
//                           height={20}
//                         />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">
//                           {country.name}
//                         </span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <AiOutlineCheck className="text-main" />
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {filteredCountries.length === 0 && searchQuery && (
//               <div className="p-4 text-center text-gray-500">
//                 No currencies found for "{searchQuery}"
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountryDropdown;






// // components/CurrencyDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";  // Keep for the search bar version
// import { AiOutlineCheck } from "react-icons/ai";

// // Import only the required SVG files
// import aed from "../../../public/assets/icons/aed.svg";
// import aud from "../../../public/assets/icons/aud.svg";
// import cad from "../../../public/assets/icons/cad.svg";
// import eur from "../../../public/assets/icons/eur.svg";
// import inr from "../../../public/assets/icons/inr.svg";
// import usd from "../../../public/assets/icons/usd.svg";

// interface Currency {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we are directly importing SVG
// }

// const currenciesData: Currency[] = [
//   { code: "USD", name: "United States dollar", flag: usd },
//   { code: "INR", name: "Indian rupee", flag: inr },
//   { code: "EUR", name: "Euro", flag: eur }, //add EUR
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "AUD", name: "Australian dollar", flag: aud },
// ];

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(""); // Keep for search bar version
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredCurrencies = currenciesData.filter(currency =>
//       currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//     );


//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   const selectedCurrencyData = React.useMemo(() => {
//     return currenciesData.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, currenciesData]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 w-24 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {selectedCurrencyData && (
//             <Image
//               src={selectedCurrencyData.flag}
//               alt={`${selectedCurrency}-Flag`}
//               width={24}
//               height={24}
//             />
//           )}
//           <p className="text-main font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/*  Currencies */}
//             {filteredCurrencies.length > 0 && (
//               <ul>
//                 {filteredCurrencies.map((currency) => (
//                   <li
//                     key={currency.code}
//                     onClick={() => handleCurrencyChange(currency.code)}
//                     className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Image
//                         src={currency.flag}
//                         alt={`${currency.code}-Flag`}
//                         width={20}
//                         height={20}
//                       />
//                       <span>{currency.code}</span>
//                       <span className="text-gray-500 text-sm ml-1">
//                         {currency.name}
//                       </span>
//                     </div>
//                     {selectedCurrency === currency.code && (
//                       <AiOutlineCheck className="text-main" />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {filteredCurrencies.length === 0 && searchQuery && (
//               <div className="p-4 text-center text-gray-500">
//                 No currencies found for "{searchQuery}"
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyDropdown;



// Last Complete Code
// // components/CurrencyDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineCheck } from "react-icons/ai";

// // Import only the required SVG files
// import aed from "../../../public/assets/icons/aed.svg";
// import aud from "../../../public/assets/icons/aud.svg";
// import cad from "../../../public/assets/icons/cad.svg";
// import eur from "../../../public/assets/icons/eur.svg";
// import inr from "../../../public/assets/icons/inr.svg"; // Keep this, but we'll filter it out
// import usd from "../../../public/assets/icons/usd.svg";

// interface Currency {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we are directly importing SVG
// }

// const currenciesData: Currency[] = [
//   { code: "USD", name: "United States dollar", flag: usd },
//   { code: "INR", name: "Indian rupee", flag: inr },
//   { code: "EUR", name: "Euro", flag: eur },
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "AUD", name: "Australian dollar", flag: aud },
// ];

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   // Correctly filter out INR *before* applying search
//   const filteredCurrencies = currenciesData
//     .filter((currency) => currency.code !== "INR") // Exclude INR FIRST
//     .filter(
//       (currency) =>
//         currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//     );


//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   // UseMemo is fine here, and currenciesData is not strictly needed but harmless
//   const selectedCurrencyData = React.useMemo(() => {
//     return currenciesData.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, currenciesData]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 w-24 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {selectedCurrencyData && (
//             <Image
//               src={selectedCurrencyData.flag}
//               alt={`${selectedCurrency}-Flag`}
//               width={24}
//               height={24}
//             />
//           )}
//           <p className="text-main font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/*  Currencies */}
//             {filteredCurrencies.length > 0 && (
//               <ul>
//                 {filteredCurrencies.map((currency) => (
//                   <li
//                     key={currency.code}
//                     onClick={() => handleCurrencyChange(currency.code)}
//                     className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Image
//                         src={currency.flag}
//                         alt={`${currency.code}-Flag`}
//                         width={20}
//                         height={20}
//                       />
//                       <span>{currency.code}</span>
//                       <span className="text-gray-500 text-sm ml-1">
//                         {currency.name}
//                       </span>
//                     </div>
//                     {selectedCurrency === currency.code && (
//                       <AiOutlineCheck className="text-main" />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {filteredCurrencies.length === 0 && searchQuery && (
//               <div className="p-4 text-center text-gray-500">
//                 No currencies found for "{searchQuery}"
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyDropdown;














// New Latest Code
//app/components/CountryDropdown.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";

// Import only the required SVG files
import aed from "../../../../public/assets/icon/aed.svg";
import aud from "../../../../public/assets/icon/aud.svg";
import cad from "../../../../public/assets/icon/cad.svg";
import eur from "../../../../public/assets/icon/eur.svg";
import inr from "../../../../public/assets/icon/inr.svg"; // Keep this, but we'll filter it out
import usd from "../../../../public/assets/icon/usd.svg";
import { GiCheckMark } from "react-icons/gi";

interface Currency {
  code: string;
  name: string;
  flag: any; // Use 'any' because we are directly importing SVG
}

const currenciesData: Currency[] = [
  { code: "USD", name: "United States dollar", flag: usd },
  { code: "INR", name: "Indian rupee", flag: inr },
  { code: "EUR", name: "Euro", flag: eur },
  { code: "AED", name: "United Arab Emirates dirham", flag: aed },
  { code: "CAD", name: "Canadian dollar", flag: cad },
  { code: "AUD", name: "Australian dollar", flag: aud },
];

interface CurrencyDropdownProps {
  selectedCurrency: string;
  onCurrencyChange: (currencyCode: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCurrencyChange = (currencyCode: string) => {
    onCurrencyChange(currencyCode);
    setIsOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Correctly filter out INR *before* applying search
  const filteredCurrencies = currenciesData
    .filter((currency) => currency.code !== "INR") // Exclude INR FIRST
    .filter(
      (currency) =>
        currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchQuery.toLowerCase())
    );


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // UseMemo is fine here, and currenciesData is not strictly needed but harmless
  const selectedCurrencyData = React.useMemo(() => {
    return currenciesData.find((c) => c.code === selectedCurrency);
  }, [selectedCurrency, currenciesData]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 w-24 cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-2">
          {selectedCurrencyData && (
            <Image
              src={selectedCurrencyData.flag}
              alt={`${selectedCurrency}-Flag`}
              width={24}
              height={24}
            />
          )}
          <p className="text-mainheading dark:text-white font-semibold">{selectedCurrency}</p>
        </div>
        {isOpen ? <IoIosArrowUp size={18} className="text-mainheading dark:text-white" /> : <IoIosArrowDown size={18} className="text-mainheading dark:text-white" />}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-[400px] top-12 right-0 bg-white dark:bg-background rounded-lg  border overflow-hidden">
          {/* Search Input */}
          <div className="sticky top-0 bg-white dark:bg-background p-2 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Type a currency / country"
                className=" shadow-inner border text-mainheading dark:text-white text-sm rounded-lg focus:outline-none block w-full pl-10 px-4 py-3 hover:shadow-darkcolor dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
            {/*  Currencies */}
            {filteredCurrencies.length > 0 && (
              <ul className="space-y-2">
                {filteredCurrencies.map((currency) => (
                  <li
                    key={currency.code}
                    onClick={() => handleCurrencyChange(currency.code)}
                    className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 hover:dark:bg-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={currency.flag}
                        alt={`${currency.code}-Flag`}
                        width={100}
                        height={100}
                        className="size-8"
                      />
                      <span>{currency.code}</span>
                      <span className="text-gray-500 dark:text-gray-300 text-sm ml-1">
                        {currency.name}
                      </span>
                    </div>
                    {selectedCurrency === currency.code && (
                      <GiCheckMark  className="text-mainheading dark:text-white size-5" />
                    )}
                  </li>
                ))}
              </ul>
            )}

            {filteredCurrencies.length === 0 && searchQuery && (
              <div className="p-3 text-center text-gray-500 dark:text-gray-300">
                No currencies found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;