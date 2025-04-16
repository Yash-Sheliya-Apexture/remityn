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
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust the path to your Skeleton component

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
//         <div className="container mx-auto relative z-10">
//           <div
//             className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-3 py-4 px-2"
//             style={{
//               scrollBehavior: 'smooth',
//               scrollSnapType: 'x mandatory',
//               WebkitOverflowScrolling: 'touch'
//             }}
//           >
//             {/* Skeleton Card - repeat for number of loading cards you want to show */}
//             {Array(4).fill(0).map((_, index) => (
//               <div key={index} className="w-64 shrink-0" style={{ scrollSnapAlign: 'start' }}>
//                 <div className="p-6 bg-lightgray dark:bg-primarybox rounded-2xl flex flex-col justify-between">
//                   <div className="flex items-center gap-4">
//                     <Skeleton className="h-12 w-12 rounded-full" />
//                     <Skeleton className="h-5 w-24" />
//                   </div>
//                   <div className="pt-16">
//                     <Skeleton className="h-6 w-32" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
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



// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../contexts/AuthContext";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import CurrencySelectorModal from "./CurrencySelectorModal";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import { GoPlus } from "react-icons/go";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust the path to your Skeleton component

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Define interfaces for better type safety
// interface Currency {
//   code: string;
//   // Add other relevant currency properties if available, e.g., name, symbol
// }

// interface Account {
//   _id: string;
//   balance: string; // Assuming balance comes as a string from API based on parseFloat usage
//   currency?: Currency | null; // Currency might be optional or null
//   // Add other relevant account properties if available, e.g., userId
// }

// const CountryCard = () => {
//   const [accounts, setAccounts] = useState<Account[]>([]); // Use the Account interface
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isHovering, setIsHovering] = useState(false);
//   const { token } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();
//   const cardWidth = 272; // 264px card width + 8px gap (approximate)
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true); // Default assuming content might overflow

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get<{ data: Account[] }>("/accounts", { // Assuming API wraps data in a 'data' property, adjust if not
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // Adjust based on your actual API response structure
//         // If the API returns the array directly: const response = await axios.get<Account[]>("/accounts", ...); setAccounts(response.data);
//         setAccounts(response.data.data || response.data); // Adapt based on actual API response
//         setIsLoading(false);
//       } catch (err: unknown) { // Use unknown for better type safety in catch blocks
//         let errorMessage = "Failed to fetch accounts";
//         if (axios.isAxiosError(err)) { // Type guard for Axios errors
//            errorMessage = err.response?.data?.message || err.message || errorMessage;
//            if (err.response?.status === 401) {
//              // Optional: Clear token or handle logout state here
//              router.push("/auth/login");
//            }
//         } else if (err instanceof Error) {
//            errorMessage = err.message;
//         }
//         setError(errorMessage);
//         setIsLoading(false);
//         console.error("Error fetching accounts:", err);
//       }
//     };

//     if (token) {
//       fetchAccounts();
//     } else {
//       setIsLoading(false);
//       // Optional: Redirect to login if no token and accounts are expected
//       // router.push("/auth/login");
//     }
//   }, [token, router]);

//   useEffect(() => {
//     // Capture the ref's current value inside the effect
//     const currentContainer = containerRef.current;

//     const checkScroll = () => {
//       if (currentContainer) { // Use the captured value
//         const scrollLeftPos = currentContainer.scrollLeft;
//         const scrollWidth = currentContainer.scrollWidth;
//         const clientWidth = currentContainer.clientWidth;

//         // Add a small tolerance to prevent floating point issues
//         const tolerance = 1;
//         setCanScrollLeft(scrollLeftPos > tolerance);
//         setCanScrollRight(scrollLeftPos + clientWidth < scrollWidth - tolerance);
//       }
//     };

//     checkScroll(); // Initial check

//     // Add event listener using the captured value
//     if (currentContainer) {
//       currentContainer.addEventListener('scroll', checkScroll, { passive: true }); // Use passive listener for scroll performance
//     }

//     // Window resize listener to recalculate scroll buttons visibility
//     window.addEventListener('resize', checkScroll);

//     // Cleanup function using the captured value
//     return () => {
//       if (currentContainer) {
//         currentContainer.removeEventListener('scroll', checkScroll);
//       }
//       window.removeEventListener('resize', checkScroll);
//     };
//   }, [accounts]); // Re-check scroll on accounts change (content width changes)


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

//   // Use the Account interface for the newAccount parameter
//   const handleCurrencyAdded = (newAccount: Account) => {
//     setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
//     setIsModalOpen(false);
//      // After adding, check scroll again as content width changed
//     setTimeout(() => {
//       if (containerRef.current) {
//         const scrollLeftPos = containerRef.current.scrollLeft;
//         const scrollWidth = containerRef.current.scrollWidth;
//         const clientWidth = containerRef.current.clientWidth;
//          const tolerance = 1;
//         setCanScrollLeft(scrollLeftPos > tolerance);
//         setCanScrollRight(scrollLeftPos + clientWidth < scrollWidth - tolerance);
//       }
//     }, 100); // Timeout to allow DOM update
//   };

//   if (isLoading) {
//     return (
//       <section className="Country-card pt-4">
//         <div className="container mx-auto relative z-10">
//           <div
//             className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-3 py-4 px-2"
//             style={{
//               scrollBehavior: 'smooth',
//               scrollSnapType: 'x mandatory',
//               WebkitOverflowScrolling: 'touch'
//             }}
//           >
//             {Array(4).fill(0).map((_, index) => (
//               <div key={index} className="w-64 shrink-0" style={{ scrollSnapAlign: 'start' }}>
//                 <div className="p-6 bg-lightgray dark:bg-primarybox rounded-2xl flex flex-col justify-between h-[176px]"> {/* Give skeleton fixed height */}
//                   <div className="flex items-center gap-4">
//                     <Skeleton className="h-12 w-12 rounded-full" />
//                     <Skeleton className="h-5 w-24" />
//                   </div>
//                   <div className="pt-16">
//                     <Skeleton className="h-6 w-32" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//              {/* Skeleton for Add Card */}
//              <div className="w-64 shrink-0" style={{ scrollSnapAlign: 'start' }}>
//                  <Skeleton className="p-6 h-[176px] bg-lightgray dark:bg-primarybox/70 rounded-2xl flex flex-col justify-center items-center border-2 border-dashed border-neutral-900 dark:border-neutral-300"/>
//              </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="Country-card pt-4">
//         <div className="container mx-auto text-red-500 px-4"> {/* Add padding for error message */}
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
//           {/* Conditionally render buttons only if scrolling is possible */}
//           {canScrollLeft && (
//             <button
//               onClick={scrollLeft}
//               className={`absolute left-0 md:left-6 top-1/2 transform -translate-y-1/2 bg-primary shadow text-neutral-900 dark:text-background p-2 rounded-full sm:block hidden cursor-pointer z-20 transition-opacity duration-300 ${
//                 isHovering ? 'opacity-100' : 'opacity-0'
//               }`}
//               aria-label="Scroll left"
//             >
//               <IoIosArrowBack size={24} />
//             </button>
//           )}

//           {canScrollRight && (
//             <button
//               onClick={scrollRight}
//               className={`absolute right-0 md:right-6 top-1/2 transform -translate-y-1/2 bg-primary shadow text-neutral-900 dark:text-background p-2 rounded-full sm:block hidden cursor-pointer z-20 transition-opacity duration-300 ${
//                 isHovering ? 'opacity-100' : 'opacity-0'
//               }`}
//               aria-label="Scroll right"
//             >
//               <IoIosArrowForward size={24} />
//             </button>
//           )}

//           <div
//             ref={containerRef}
//             className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-3 py-4 px-2" // Keep horizontal padding
//             style={{
//               scrollBehavior: 'smooth',
//               scrollSnapType: 'x mandatory',
//               WebkitOverflowScrolling: 'touch',
//             }}
//           >
//             {accounts.map((account) => ( // Use account._id for key, assuming it's unique
//               <Link
//                 key={account._id}
//                 href={`/dashboard/balances/${account._id}`}
//                 passHref
//                 legacyBehavior // Recommended for wrapping custom components like styled divs
//               >
//                 <a // Use an anchor tag when using legacyBehavior
//                   className="p-6 bg-lightgray dark:bg-primarybox hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-between w-64 shrink-0 transition-all duration-75 ease-linear cursor-pointer hover:bg-neutral-200/70"
//                   style={{ scrollSnapAlign: 'start' }}
//                 >
//                   <div className="flex items-center gap-4">
//                     <Image
//                       src={
//                         account.currency?.code
//                           ? `/assets/icon/${account.currency.code.toLowerCase()}.svg`
//                           : "/assets/icon/default.svg" // Default image path
//                       }
//                       alt={
//                         account.currency?.code
//                           ? `${account.currency.code} flag`
//                           : "Default currency flag" // Default alt text
//                       }
//                       width={50}
//                       height={50}
//                       onError={(e) => {
//                         // More robust error handling: attempt to load default on error
//                         console.error( `Error loading image for ${account?.currency?.code || 'unknown currency'}`);
//                         (e.target as HTMLImageElement).src = "/assets/icon/default.svg";
//                       }}
//                     />
//                     <span className="text-neutral-900 dark:text-white text-xl font-semibold">
//                       {account.currency?.code || "N/A"}
//                     </span>
//                   </div>
//                   <div className="pt-16">
//                     <span className="text-neutral-900 dark:text-white text-2xl font-semibold">
//                       {/* Add checks for balance validity before parsing */}
//                       {account.balance != null ? parseFloat(account.balance).toFixed(2) : '0.00'}
//                     </span>
//                   </div>
//                 </a>
//               </Link>
//             ))}
//             {/* Add Currency Card */}
//             <div
//               onClick={() => setIsModalOpen(true)}
//               className="p-6 bg-lightgray dark:bg-primarybox/70 hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-center items-center w-64 shrink-0 cursor-pointer hover:bg-neutral-200/70 transition-all duration-75 ease-linear border-2 border-dashed border-neutral-900 dark:border-neutral-300"
//               style={{ scrollSnapAlign: 'start' }}
//               role="button" // Add role for accessibility
//               tabIndex={0} // Make it focusable
//               onKeyPress={(e) => e.key === 'Enter' && setIsModalOpen(true)} // Allow activation with Enter key
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


// frontend/components/dashboard/components/MainDashBoardSection/CountryCard.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import CurrencySelectorModal from "./CurrencySelectorModal";
import apiConfig from "../../../config/apiConfig";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust the path to your Skeleton component

axios.defaults.baseURL = apiConfig.baseUrl;

// Define interfaces for better type safety
interface Currency {
  code: string;
  // Add other relevant currency properties if available, e.g., name, symbol
}

interface Account {
  _id: string;
  balance: string; // Assuming balance comes as a string from API based on parseFloat usage
  currency?: Currency | null; // Currency might be optional or null
  // Add other relevant account properties if available, e.g., userId
}

const CountryCard = () => {
  const [accounts, setAccounts] = useState<Account[]>([]); // Use the Account interface
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const cardWidth = 272; // 264px card width + 8px gap (approximate)
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true); // Default assuming content might overflow

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<{ data: Account[] }>("/accounts", { // Assuming API wraps data in a 'data' property, adjust if not
          headers: { Authorization: `Bearer ${token}` },
        });
        // Adjust based on your actual API response structure
        // If the API returns the array directly: const response = await axios.get<Account[]>("/accounts", ...); setAccounts(response.data);
        setAccounts(response.data.data || response.data); // Adapt based on actual API response
        setIsLoading(false);
      } catch (err: unknown) { // Use unknown for better type safety in catch blocks
        let errorMessage = "Failed to fetch accounts";
        if (axios.isAxiosError(err)) { // Type guard for Axios errors
           errorMessage = err.response?.data?.message || err.message || errorMessage;
           if (err.response?.status === 401) {
             // Optional: Clear token or handle logout state here
             router.push("/auth/login");
           }
        } else if (err instanceof Error) {
           errorMessage = err.message;
        }
        setError(errorMessage);
        setIsLoading(false);
        console.error("Error fetching accounts:", err);
      }
    };

    if (token) {
      fetchAccounts();
    } else {
      setIsLoading(false);
      // Optional: Redirect to login if no token and accounts are expected
      // router.push("/auth/login");
    }
  }, [token, router]);

  useEffect(() => {
    // Capture the ref's current value inside the effect
    const currentContainer = containerRef.current;

    const checkScroll = () => {
      if (currentContainer) { // Use the captured value
        const scrollLeftPos = currentContainer.scrollLeft;
        const scrollWidth = currentContainer.scrollWidth;
        const clientWidth = currentContainer.clientWidth;

        // Add a small tolerance to prevent floating point issues
        const tolerance = 1;
        setCanScrollLeft(scrollLeftPos > tolerance);
        setCanScrollRight(scrollLeftPos + clientWidth < scrollWidth - tolerance);
      }
    };

    checkScroll(); // Initial check

    // Add event listener using the captured value
    if (currentContainer) {
      currentContainer.addEventListener('scroll', checkScroll, { passive: true }); // Use passive listener for scroll performance
    }

    // Window resize listener to recalculate scroll buttons visibility
    window.addEventListener('resize', checkScroll);

    // Cleanup function using the captured value
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [accounts]); // Re-check scroll on accounts change (content width changes)


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

  // Use the Account interface for the newAccount parameter
  const handleCurrencyAdded = (newAccount: Account) => {
    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    setIsModalOpen(false);
     // After adding, check scroll again as content width changed
    setTimeout(() => {
      if (containerRef.current) {
        const scrollLeftPos = containerRef.current.scrollLeft;
        const scrollWidth = containerRef.current.scrollWidth;
        const clientWidth = containerRef.current.clientWidth;
         const tolerance = 1;
        setCanScrollLeft(scrollLeftPos > tolerance);
        setCanScrollRight(scrollLeftPos + clientWidth < scrollWidth - tolerance);
      }
    }, 100); // Timeout to allow DOM update
  };

  if (isLoading) {
    return (
      <section className="Country-card pt-4">
        <div className="container mx-auto">
          <div
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-3 py-4 px-2"
            style={{
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="w-64 shrink-0" style={{ scrollSnapAlign: 'start' }}>
                <div className="p-6 bg-lightgray dark:bg-primarybox rounded-2xl flex flex-col justify-between h-[176px]"> {/* Give skeleton fixed height */}
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
             {/* Skeleton for Add Card */}
             <div className="w-64 shrink-0" style={{ scrollSnapAlign: 'start' }}>
                 <Skeleton className="p-6 h-[176px] bg-lightgray dark:bg-primarybox/70 rounded-2xl flex flex-col justify-center items-center border-2 border-dashed border-neutral-900 dark:border-neutral-300"/>
             </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="Country-card pt-4">
        <div className="container mx-auto text-red-500 px-4"> {/* Add padding for error message */}
          Error loading accounts: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="Country-card pt-4">
      <div className="container mx-auto">
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative z-10"
        >
          {/* Conditionally render buttons only if scrolling is possible */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className={`absolute left-0 md:left-6 top-1/2 transform -translate-y-1/2 bg-primary shadow text-neutral-900 dark:text-background p-2 rounded-full sm:block hidden cursor-pointer z-20 transition-opacity duration-300 ${
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
              className={`absolute right-0 md:right-6 top-1/2 transform -translate-y-1/2 bg-primary shadow text-neutral-900 dark:text-background p-2 rounded-full sm:block hidden cursor-pointer z-20 transition-opacity duration-300 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Scroll right"
            >
              <IoIosArrowForward size={24} />
            </button>
          )}

          <div
            ref={containerRef}
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide gap-3 py-4 px-2" // Keep horizontal padding
            style={{
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {accounts.map((account) => ( // Use account._id for key, assuming it's unique
              <Link
                key={account._id}
                href={`/dashboard/balances/${account._id}`}
                passHref
                legacyBehavior // Recommended for wrapping custom components like styled divs
              >
                <div // Use an anchor tag when using legacyBehavior
                  className="p-6 bg-lightgray dark:bg-primarybox hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-between w-64 shrink-0 transition-all duration-75 ease-linear cursor-pointer hover:bg-neutral-200/70"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        account.currency?.code
                          ? `/assets/icon/${account.currency.code.toLowerCase()}.svg`
                          : "/assets/icon/default.svg" // Default image path
                      }
                      alt={
                        account.currency?.code
                          ? `${account.currency.code} flag`
                          : "Default currency flag" // Default alt text
                      }
                      width={50}
                      height={50}
                      onError={(e) => {
                        // More robust error handling: attempt to load default on error
                        console.error( `Error loading image for ${account?.currency?.code || 'unknown currency'}`);
                        (e.target as HTMLImageElement).src = "/assets/icon/default.svg";
                      }}
                    />
                    <span className="text-neutral-900 dark:text-white text-xl font-semibold">
                      {account.currency?.code || "N/A"}
                    </span>
                  </div>
                  <div className="pt-16">
                    <span className="text-neutral-900 dark:text-white text-2xl font-semibold">
                      {/* Add checks for balance validity before parsing */}
                      {account.balance != null ? parseFloat(account.balance).toFixed(2) : '0.00'}
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
              role="button" // Add role for accessibility
              tabIndex={0} // Make it focusable
              onKeyPress={(e) => e.key === 'Enter' && setIsModalOpen(true)} // Allow activation with Enter key
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

