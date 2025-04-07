// "use client";
// import React, { useRef, useState } from "react";
// import Image from "next/image";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// const CountryCard = () => {
//   const countryCardData = [
//     {
//       currencyCode: "USD",
//       value: "10",
//       icon: "/assets/icon/usd.svg",
//     },
//     {
//       currencyCode: "AED",
//       value: "399.92",
//       icon: "/assets/icon/aed.svg",
//     },
//     {
//       currencyCode: "AUD",
//       value: "24558",
//       icon: "/assets/icon/aud.svg",
//     },
//     {
//       currencyCode: "EUR",
//       value: "0.971",
//       icon: "/assets/icon/eur.svg",
//     },
//     {
//       currencyCode: "GBP",
//       value: "2110",
//       icon: "/assets/icon/gbp.svg",
//     },
//   ];

//   const containerRef = useRef<HTMLDivElement>(null); // Specify the type of ref
//   const [isHovering, setIsHovering] = useState(false);

//   const scrollLeft = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollLeft -= 300; // Adjust scroll amount as needed
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollLeft += 300; // Adjust scroll amount as needed
//     }
//   };

//   return (
//     <section className="Country-card pt-5">
//       <div className="container mx-auto relative z-10">
//         {" "}
//         {/* Added relative for button positioning */}
//         <div
//           onMouseEnter={() => setIsHovering(true)}
//           onMouseLeave={() => setIsHovering(false)}
//         >
//           {/* Left Srcolling button */}
//           {isHovering && (
//             <button
//               onClick={scrollLeft}
//               className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white shadow text-green p-2 rounded-full sm:block hidden cursor-pointer"
//             >
//               <IoIosArrowBack size={24} />
//             </button>
//           )}

//           {/* Country card */}
//           <div
//             ref={containerRef}
//             className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 py-4" // flex for row, overflow-x-scroll for horizontal scroll, space-x-4 for card spacing, scrollbar-hide to hide scrollbar
//           >
//             {countryCardData.map((card, index) => (
//               <div
//                 key={index}
//                 className="p-6 bg-lightgray rounded-2xl flex flex-col justify-between w-72 shrink-0 transition-colors duration-200 ease-linear"
//               >
//                 {" "}
//                 {/* w-72 for fixed width, shrink-0 to prevent shrinking */}
//                 <div className="flex items-center gap-4">
//                   <Image
//                     src={card.icon}
//                     alt={`${card.currencyCode} flag`}
//                     width={50}
//                     height={50}
//                   />
//                   <span className="text-secondary text-xl font-semibold">
//                     {card.currencyCode}
//                   </span>
//                 </div>
//                 <div className="pt-16">
//                   <span className="text-secondary text-2xl font-semibold">
//                     {parseFloat(card.value).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right Srcolling button */}
//           {isHovering && (
//             <button
//               onClick={scrollRight}
//               className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white shadow text-green p-2 rounded-full sm:block hidden cursor-pointer"
//             >
//               <IoIosArrowForward size={24} />
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CountryCard;



// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import CurrencySelectorModal from "./CurrencySelectorModal"; // Import the modal component
// import apiConfig from "../../../config/apiConfig"; // Correct import path using alias
// import Link from "next/link"; // Import Link

// axios.defaults.baseURL = apiConfig.baseUrl;

// const CountryCard = () => {
//   const [accounts, setAccounts] = useState([]);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isHovering, setIsHovering] = useState(false);
//   const { token } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
//   const router = useRouter();

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("/accounts", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAccounts(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(err.response?.data?.message || "Failed to fetch accounts");
//         setIsLoading(false);
//         console.error("Error fetching accounts:", err);
//         if (err.response?.status === 401) {
//           // Handle unauthorized, maybe redirect to login
//           router.push("/auth/login"); // Redirect to login if token is invalid
//         }
//       }
//     };

//     if (token) {
//       fetchAccounts();
//     } else {
//       setIsLoading(false); // If no token, not loading
//     }
//   }, [token, router]);

//   const scrollLeft = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollLeft -= 300;
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollLeft += 300;
//     }
//   };

//   const handleCurrencyAdded = (newAccount) => {
//     setAccounts((prevAccounts) => [...prevAccounts, newAccount]); // Update accounts state
//     setIsModalOpen(false); // Close the modal after currency is added
//   };

//   if (isLoading) {
//     return (
//       <section className="Country-card pt-5">
//         <div className="container mx-auto">Loading currency accounts...</div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="Country-card pt-5">
//         <div className="container mx-auto text-red-500">
//           Error loading accounts: {error}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Country-card pt-5">
//       <div className="container mx-auto relative z-10">
//         <div
//           onMouseEnter={() => setIsHovering(true)}
//           onMouseLeave={() => setIsHovering(false)}
//         >
//           {isHovering && (
//             <button
//               onClick={scrollLeft}
//               className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white shadow text-green p-2 rounded-full sm:block hidden cursor-pointer"
//             >
//               <IoIosArrowBack size={24} />
//             </button>
//           )}

//           <div
//             ref={containerRef}
//             className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 py-4"
//           >
//             {accounts.map((account, index) => (
//               <Link // Wrap the currency card with Link
//                 key={index}
//                 href={`/dashboard/balances/${account._id}`} // Use account._id as balanceId, adjust if needed
//                 passHref // Ensure href is passed down to the div
//               >
//                 <div
//                   className="p-6 bg-lightgray rounded-2xl flex flex-col justify-between w-72 shrink-0 transition-colors duration-200 ease-linear cursor-pointer hover:shadow-md" // Added cursor-pointer and hover effect
//                 >
//                   <div className="flex items-center gap-4">
//                     <Image
//                       src={`/assets/icon/${account.currency.code.toLowerCase()}.svg`}
//                       alt={`${account.currency.code} flag`}
//                       width={50}
//                       height={50}
//                       onError={() =>
//                         console.error(
//                           `Error loading image for ${account.currency.code}`
//                         )
//                       }
//                     />
//                     <span className="text-secondary text-xl font-semibold">
//                       {account.currency.code}
//                     </span>
//                   </div>
//                   <div className="pt-16">
//                     <span className="text-secondary text-2xl font-semibold">
//                       {parseFloat(account.balance).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//             {/* Add Currency Card */}
//             <div
//               onClick={() => setIsModalOpen(true)}
//               className="p-6 bg-lightgray rounded-2xl flex flex-col justify-center items-center w-72 shrink-0 cursor-pointer hover:bg-gray-300 transition-colors duration-200 ease-linear border-2 border-dashed border-gray-400"
//             >
//               <div className="rounded-full border-2 border-green p-2 flex items-center justify-center mb-2">
//                 <span className="text-green text-3xl">+</span>
//               </div>
//               <span className="text-center text-gray-600">
//                 Add another currency to your account.
//               </span>
//             </div>
//           </div>

//           {isHovering && (
//             <button
//               onClick={scrollRight}
//               className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white shadow text-green p-2 rounded-full sm:block hidden cursor-pointer"
//             >
//               <IoIosArrowForward size={24} />
//             </button>
//           )}
//         </div>
//       </div>
//       <CurrencySelectorModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCurrencyAdded={handleCurrencyAdded}
//       />
//     </section>
//   );
// };

// export default CountryCard;


// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import CurrencySelectorModal from "./CurrencySelectorModal";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";

// axios.defaults.baseURL = apiConfig.baseUrl;

// const CountryCard = () => {
//   const [accounts, setAccounts] = useState([]);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isHovering, setIsHovering] = useState(false);
//   const { token } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("/accounts", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAccounts(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(err.response?.data?.message || "Failed to fetch accounts");
//         setIsLoading(false);
//         console.error("Error fetching accounts:", err);
//         if (err.response?.status === 401) {
//           router.push("/auth/login");
//         }
//       }
//     };

//     if (token) {
//       fetchAccounts();
//     } else {
//       setIsLoading(false);
//     }
//   }, [token, router]);

//   const scrollLeft = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollLeft -= 300;
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollLeft += 300;
//     }
//   };

//   const handleCurrencyAdded = (newAccount) => {
//     setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
//     setIsModalOpen(false);
//   };

//   if (isLoading) {
//     return (
//       <section className="Country-card pt-5">
//         <div className="container mx-auto">Loading currency accounts...</div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="Country-card pt-5">
//         <div className="container mx-auto text-red-500">
//           Error loading accounts: {error}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Country-card pt-5">
//       <div className="container mx-auto relative z-10">
//         <div
//           onMouseEnter={() => setIsHovering(true)}
//           onMouseLeave={() => setIsHovering(false)}
//         >
//           {isHovering && (
//             <button
//               onClick={scrollLeft}
//               className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white shadow text-green p-2 rounded-full sm:block hidden cursor-pointer"
//             >
//               <IoIosArrowBack size={24} />
//             </button>
//           )}

//           <div
//             ref={containerRef}
//             className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 py-4"
//           >
//             {accounts.map((account, index) => (
//               <Link
//                 key={index}
//                 href={`/dashboard/balances/${account._id}`}
//                 passHref
//               >
//                 <div
//                   className="p-6 bg-lightgray rounded-2xl flex flex-col justify-between w-72 shrink-0 transition-colors duration-200 ease-linear cursor-pointer hover:shadow-md"
//                 >
//                   <div className="flex items-center gap-4">
//                     <Image
//                       src={
//                         account.currency?.code
//                           ? `/assets/icon/${account.currency.code.toLowerCase()}.svg`
//                           : "/assets/icon/default.svg" // Provide a default image path
//                       }
//                       alt={
//                         account.currency?.code
//                           ? `${account.currency.code} flag`
//                           : "Currency flag" // Provide default alt text
//                       }
//                       width={50}
//                       height={50}
//                       onError={() =>
//                         console.error(
//                           `Error loading image for ${account?.currency?.code || 'unknown currency'}` // Use optional chaining and fallback
//                         )
//                       }
//                     />
//                     <span className="text-secondary text-xl font-semibold">
//                       {account.currency?.code || "N/A"} {/* Display N/A if code is missing */}
//                     </span>
//                   </div>
//                   <div className="pt-16">
//                     <span className="text-secondary text-2xl font-semibold">
//                       {parseFloat(account.balance).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//             {/* Add Currency Card */}
//             <div
//               onClick={() => setIsModalOpen(true)}
//               className="p-6 bg-lightgray rounded-2xl flex flex-col justify-center items-center w-72 shrink-0 cursor-pointer hover:bg-gray-300 transition-colors duration-200 ease-linear border-2 border-dashed border-gray-400"
//             >
//               <div className="rounded-full border-2 border-green p-2 flex items-center justify-center mb-2">
//                 <span className="text-green text-3xl">+</span>
//               </div>
//               <span className="text-center text-gray-600">
//                 Add another currency to your account.
//               </span>
//             </div>
//           </div>

//           {isHovering && (
//             <button
//               onClick={scrollRight}
//               className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white shadow text-green p-2 rounded-full sm:block hidden cursor-pointer"
//             >
//               <IoIosArrowForward size={24} />
//             </button>
//           )}
//         </div>
//       </div>
//       <CurrencySelectorModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCurrencyAdded={handleCurrencyAdded}
//       />
//     </section>
//   );
// };

// export default CountryCard;


// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import CurrencySelectorModal from "./CurrencySelectorModal";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import { GoPlus } from "react-icons/go";


// axios.defaults.baseURL = apiConfig.baseUrl;

// const CountryCard = () => {
//   const [accounts, setAccounts] = useState([]);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isHovering, setIsHovering] = useState(false);
//   const { token } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();
//   const cardWidth = 272; // 264px card width + 8px gap (approximate)
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("/accounts", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAccounts(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(err.response?.data?.message || "Failed to fetch accounts");
//         setIsLoading(false);
//         console.error("Error fetching accounts:", err);
//         if (err.response?.status === 401) {
//           router.push("/auth/login");
//         }
//       }
//     };

//     if (token) {
//       fetchAccounts();
//     } else {
//       setIsLoading(false);
//     }
//   }, [token, router]);

//   useEffect(() => {
//     const checkScroll = () => {
//       if (containerRef.current) {
//         const scrollLeftPos = containerRef.current.scrollLeft;
//         const scrollWidth = containerRef.current.scrollWidth;
//         const clientWidth = containerRef.current.clientWidth;

//         setCanScrollLeft(scrollLeftPos > 0);
//         setCanScrollRight(scrollLeftPos + clientWidth < scrollWidth);
//       }
//     };

//     checkScroll(); // Initial check on component mount
//     if (containerRef.current) {
//       containerRef.current.addEventListener('scroll', checkScroll);
//     }

//     return () => {
//       if (containerRef.current) {
//         containerRef.current.removeEventListener('scroll', checkScroll);
//       }
//     };
//   }, [accounts]); // Re-check scroll on accounts change as well


//   const scrollLeft = () => {
//     if (containerRef.current) {
//       const scrollAmount = cardWidth * 1.5;
//       containerRef.current.scrollBy({
//         left: -scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       const scrollAmount = cardWidth * 1.5;
//       containerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   const handleCurrencyAdded = (newAccount) => {
//     setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
//     setIsModalOpen(false);
//   };

//   if (isLoading) {
//     return (
//       <section className="Country-card pt-4">
//         <div className="container mx-auto">Loading currency accounts...</div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="Country-card pt-4">
//         <div className="container mx-auto text-red-500">
//           Error loading accounts: {error}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Country-card pt-4">
//       <div className="container mx-auto relative z-10">
//         <div
//           onMouseEnter={() => setIsHovering(true)}
//           onMouseLeave={() => setIsHovering(false)}
//           className="relative"
//         >
//           {accounts.length > 0 && (
//             <>
//               {canScrollLeft && (
//                 <button
//                   onClick={scrollLeft}
//                   className={`absolute left-6 top-1/2 transform -translate-y-1/2 bg-primary shadow text-neutral-900 dark:text-background p-2 rounded-full sm:block hidden cursor-pointer z-20 transition-opacity duration-300 ${
//                     isHovering ? 'opacity-100' : 'opacity-0'
//                   }`}
//                   aria-label="Scroll left"
//                 >
//                   <IoIosArrowBack size={24} />
//                 </button>
//               )}

//               {canScrollRight && (
//                 <button
//                   onClick={scrollRight}
//                   className={`absolute right-6 top-1/2 transform -translate-y-1/2 bg-primary shadow text-neutral-900 dark:text-background p-2 rounded-full sm:block hidden cursor-pointer z-20 transition-opacity duration-300 ${
//                     isHovering ? 'opacity-100' : 'opacity-0'
//                   }`}
//                   aria-label="Scroll right"
//                 >
//                   <IoIosArrowForward size={24} />
//                 </button>
//               )}
//             </>
//           )}

//           <div
//             ref={containerRef}
//             className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-3 py-4 px-2"
//             style={{
//               scrollBehavior: 'smooth',
//               scrollSnapType: 'x mandatory',
//               WebkitOverflowScrolling: 'touch'
//             }}
//           >
//             {accounts.map((account, index) => (
//               <Link
//                 key={index}
//                 href={`/dashboard/balances/${account._id}`}
//                 passHref
//               >
//                 <div
//                   className="p-6 bg-lightgray dark:bg-primarybox hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-between w-64 shrink-0 transition-all duration-75 ease-linear cursor-pointer hover:bg-neutral-200/70"
//                   style={{ scrollSnapAlign: 'start' }}
//                 >
//                   <div className="flex items-center gap-4">
//                     <Image
//                       src={
//                         account.currency?.code
//                           ? `/assets/icon/${account.currency.code.toLowerCase()}.svg`
//                           : "/assets/icon/default.svg" // Provide a default image path
//                       }
//                       alt={
//                         account.currency?.code
//                           ? `${account.currency.code} flag`
//                           : "Currency flag" // Provide default alt text
//                       }
//                       width={50}
//                       height={50}
//                       onError={() =>
//                         console.error(
//                           `Error loading image for ${account?.currency?.code || 'unknown currency'}` // Use optional chaining and fallback
//                         )
//                       }
//                     />
//                     <span className="text-neutral-900 dark:text-white text-xl font-semibold">
//                       {account.currency?.code || "N/A"} {/* Display N/A if code is missing */}
//                     </span>
//                   </div>
//                   <div className="pt-16">
//                     <span className="text-neutral-900 dark:text-white text-2xl font-semibold">
//                       {parseFloat(account.balance).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//             {/* Add Currency Card */}
//             <div
//               onClick={() => setIsModalOpen(true)}
//               className="p-6 bg-lightgray dark:bg-primarybox/70 hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-center items-center w-64 shrink-0 cursor-pointer hover:bg-neutral-200/70 transition-all duration-75 ease-linear border-2 border-dashed border-neutral-900 dark:border-neutral-300"
//               style={{ scrollSnapAlign: 'start' }}
//             >
//               <div className="rounded-full border-2 border-neutral-900 dark:border-white p-2 flex items-center justify-center mb-2">
//                 <GoPlus size={30} className="text-neutral-900 dark:text-white"/>
//               </div>
//               <span className="text-center text-neutral-500 dark:text-white">
//                 Add another currency to your account.
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <CurrencySelectorModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCurrencyAdded={handleCurrencyAdded}
//       />
//     </section>
//   );
// };

// export default CountryCard;









"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import CurrencySelectorModal from "./CurrencySelectorModal";
import apiConfig from "../../../config/apiConfig";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust the path to your Skeleton component

axios.defaults.baseURL = apiConfig.baseUrl;

const CountryCard = () => {
  const [accounts, setAccounts] = useState([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const cardWidth = 272; // 264px card width + 8px gap (approximate)
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(response.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch accounts");
        setIsLoading(false);
        console.error("Error fetching accounts:", err);
        if (err.response?.status === 401) {
          router.push("/auth/login");
        }
      }
    };

    if (token) {
      fetchAccounts();
    } else {
      setIsLoading(false);
    }
  }, [token, router]);

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        const scrollLeftPos = containerRef.current.scrollLeft;
        const scrollWidth = containerRef.current.scrollWidth;
        const clientWidth = containerRef.current.clientWidth;

        setCanScrollLeft(scrollLeftPos > 0);
        setCanScrollRight(scrollLeftPos + clientWidth < scrollWidth);
      }
    };

    checkScroll(); // Initial check on component mount
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', checkScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', checkScroll);
      }
    };
  }, [accounts]); // Re-check scroll on accounts change as well


  const scrollLeft = () => {
    if (containerRef.current) {
      const scrollAmount = cardWidth * 1.5;
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const scrollAmount = cardWidth * 1.5;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCurrencyAdded = (newAccount) => {
    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <section className="Country-card pt-4">
        <div className="container mx-auto relative z-10">
          <div
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-3 py-4 px-2"
            style={{
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Skeleton Card - repeat for number of loading cards you want to show */}
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="w-64 shrink-0" style={{ scrollSnapAlign: 'start' }}>
                <div className="p-6 bg-lightgray dark:bg-primarybox rounded-2xl flex flex-col justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div className="pt-16">
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="Country-card pt-4">
        <div className="container mx-auto text-red-500">
          Error loading accounts: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="Country-card pt-4">
      <div className="container mx-auto relative z-10">
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative"
        >
          {accounts.length > 0 && (
            <>
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className={`absolute left-6 top-1/2 transform -translate-y-1/2 bg-primary shadow text-neutral-900 dark:text-background p-2 rounded-full sm:block hidden cursor-pointer z-20 transition-opacity duration-300 ${
                    isHovering ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-label="Scroll left"
                >
                  <IoIosArrowBack size={24} />
                </button>
              )}

              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className={`absolute right-6 top-1/2 transform -translate-y-1/2 bg-primary shadow text-neutral-900 dark:text-background p-2 rounded-full sm:block hidden cursor-pointer z-20 transition-opacity duration-300 ${
                    isHovering ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-label="Scroll right"
                >
                  <IoIosArrowForward size={24} />
                </button>
              )}
            </>
          )}

          <div
            ref={containerRef}
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-3 py-4 px-2"
            style={{
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {accounts.map((account, index) => (
              <Link
                key={index}
                href={`/dashboard/balances/${account._id}`}
                passHref
              >
                <div
                  className="p-6 bg-lightgray dark:bg-primarybox hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-between w-64 shrink-0 transition-all duration-75 ease-linear cursor-pointer hover:bg-neutral-200/70"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        account.currency?.code
                          ? `/assets/icon/${account.currency.code.toLowerCase()}.svg`
                          : "/assets/icon/default.svg" // Provide a default image path
                      }
                      alt={
                        account.currency?.code
                          ? `${account.currency.code} flag`
                          : "Currency flag" // Provide default alt text
                      }
                      width={50}
                      height={50}
                      onError={() =>
                        console.error(
                          `Error loading image for ${account?.currency?.code || 'unknown currency'}` // Use optional chaining and fallback
                        )
                      }
                    />
                    <span className="text-neutral-900 dark:text-white text-xl font-semibold">
                      {account.currency?.code || "N/A"} {/* Display N/A if code is missing */}
                    </span>
                  </div>
                  <div className="pt-16">
                    <span className="text-neutral-900 dark:text-white text-2xl font-semibold">
                      {parseFloat(account.balance).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            {/* Add Currency Card */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="p-6 bg-lightgray dark:bg-primarybox/70 hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-center items-center w-64 shrink-0 cursor-pointer hover:bg-neutral-200/70 transition-all duration-75 ease-linear border-2 border-dashed border-neutral-900 dark:border-neutral-300"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="rounded-full border-2 border-neutral-900 dark:border-white p-2 flex items-center justify-center mb-2">
                <GoPlus size={30} className="text-neutral-900 dark:text-white"/>
              </div>
              <span className="text-center text-neutral-500 dark:text-white">
                Add another currency to your account.
              </span>
            </div>
          </div>
        </div>
      </div>
      <CurrencySelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCurrencyAdded={handleCurrencyAdded}
      />
    </section>
  );
};

export default CountryCard;