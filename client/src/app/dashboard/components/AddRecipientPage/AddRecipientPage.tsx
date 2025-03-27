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
//     <section className="Add-Recipient-Page py-12 h-screen">
//       <div className="container mx-auto px-4">
//         {/* Back and Title */}
//         <div className="relative mb-8">
//           <div className="w-full flex justify-center items-center">
//             <h3 className="text-2xl text-main font-semibold ">
//               Select their currency
//             </h3>
//           </div>
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full absolute left-0 top-1/2 -translate-y-1/2">
//             <GoArrowLeft size={20} className="text-primary" />
//             <button className="text-primary font-bold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-primary">
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
//               className="block w-full pl-14 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
//             />
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch size={20} className="text-gray"/>
//             </div>
//           </div>
//         </div>

//         {/* Recent currencies */}
//         <div className="mb-8">
//           <h4 className="text-gray-400 text-sm mb-4 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">Recent currencies</h4>
//           <ul className=" rounded-lg overflow-hidden">
//             {recentCurrencies.map((currency) => (
//               <li key={currency.code} className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <img src={currency.flag} alt={`${currency.code} Flag`} className="w-8 h-8 rounded-full" />
//                     <div>
//                       <p className="text-main font-semibold">{currency.code}</p>
//                       <p className="text-gray  text-sm">{currency.name}</p>
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
//           <ul className=" rounded-lg overflow-hidden">
//             {allCurrencies.map((currency) => (
//               <li key={currency.code} className="p-4 ">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <img src={currency.flag} alt={`${currency.code} Flag`} className="w-8 h-8 rounded-full" />
//                     <div>
//                       <p className="text-main font-semibold">{currency.code}</p>
//                       <p className="text-gray text-sm">{currency.name}</p>
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

"use client"; // Mark this component as a client component
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image"; // Import Image from next/image

export default function AddRecipientPage() {
  // Currency Data (embedded JSON) with image paths
  const currencies = [
    {
      code: "INR",
      name: "Indian rupee",
      flag: "/assets/icon/inr.svg", // Path as string
    },
    {
      code: "AED",
      name: "United Arab Emirates dirham",
      flag: "/assets/icon/aed.svg", // Path as string
    },
    {
      code: "AUD",
      name: "Australian dollar",
      flag: "/assets/icon/aud.svg", // Path as string
    },

    {
      code: "USD",
      name: "United States dollar",
      flag: "/assets/icon/usd.svg", // Path as string
    },
    {
      code: "EUR",
      name: "Euro",
      flag: "/assets/icon/eur.svg", // Path as string
    },
    {
      code: "GBP",
      name: "British pound",
      flag: "/assets/icon/gbp.svg", // Path as string
    },
  ];

  // All currencies (excluding recent ones for demonstration, you can adjust as needed)
  const allCurrencies = currencies.filter((currency) =>
    currencies.includes(currency)
  );

  const handleINRClick = () => {
    // Handle INR selection logic here (e.g., navigation, state update)
    console.log("INR Clicked - Implement your logic here");
  };

  return (
    <section className="Add-Recipient-Page py-12 h-screen">
      <div className="container mx-auto">
        {/* Back and Title */}
        <div className="relative">
          <div className="w-full flex justify-center items-center">
            <h3 className="text-2xl text-main font-semibold ">
              Select their currency
            </h3>
          </div>
          <div className="sm:inline-flex items-center gap-2 px-4 py-2 rounded-full absolute left-0 top-1/2 -translate-y-1/2 hidden">
            <GoArrowLeft size={20} className="text-primary" />
            <button className="text-primary font-bold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-primary">
              Back
            </button>
          </div>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          {/* Search Currency */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search currency"
                className="block w-full pl-14 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FiSearch size={20} className="text-gray" />
              </div>
            </div>
          </div>

          {/* Recent currencies */}
          <div className="space-y-2">
            {allCurrencies.map((currency) => (
              <div
                key={currency.code}
                className={`p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out ${
                  currency.code !== "INR" ? "opacity-50 cursor-not-allowed" : "hover:bg-lightgray cursor-pointer"
                }`}
                onClick={currency.code === "INR" ? handleINRClick : undefined} // Call handleINRClick for INR
              >
                {/* Changed li to div */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={currency.flag}
                      alt={`${currency.code} Flag`}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-main font-semibold">
                        {currency.code}
                        {currency.code !== "INR" && (
                          <span className="ml-2 text-sm text-orange-500 font-normal">(Coming Soon)</span>
                        )}
                      </p>
                      <p className="text-gray text-sm">{currency.name}</p>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <IoIosArrowForward
                      size={20}
                      className="text-gray"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}