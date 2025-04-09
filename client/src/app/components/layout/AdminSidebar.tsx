// // frontend/src/components/layout/AdminSidebar.tsx
// import Link from "next/link";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
// } from "react-icons/fa"; // Example icons

// const AdminSidebar = () => {
//   return (
//     <aside className="bg-main text-white w-64 min-h-screen py-6 px-3">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-center text-white">
//           Wise Admin
//         </h2>
//       </div>
//       <nav>
//         <ul>
//           <li className="mb-3">
//             <Link
//               href="/admin"
//               className="flex items-center p-3 rounded transition-colors duration-200"
//             >
//               <FaTachometerAlt className="mr-3 text-lg" />
//               <span className="text-base">Dashboard</span>
//             </Link>
//           </li>
//           <li className="mb-3">
//             <Link
//               href="/admin/currencies"
//               className="flex items-center p-3 rounded  transition-colors duration-200"
//             >
//               <FaCoins className="mr-3 text-lg" />
//               <span className="text-base">Currencies</span>
//             </Link>
//           </li>
//           <li className="mb-3">
//             <Link
//               href="/admin/users"
//               className="flex items-center p-3 rounded  transition-colors duration-200"
//             >
//               <FaUsers className="mr-3 text-lg" />
//               <span className="text-base">Users</span>
//             </Link>
//           </li>
//           <li className="mb-3">
//             <Link
//               href="/admin/transactions"
//               className="flex items-center p-3 rounded  transition-colors duration-200"
//             >
//               <FaMoneyBillWave className="mr-3 text-lg" />
//               <span className="text-base">Transactions</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default AdminSidebar;

// frontend/src/components/layout/AdminSidebar.tsx
// import Link from "next/link";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
// } from "react-icons/fa"; // Example icons
// import { useState } from "react";
// import Image from "next/image";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { FaArrowLeft } from "react-icons/fa6";

// const AdminSidebar = () => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

//   const toggleCurrenciesDropdown = () => {
//     setIsCurrenciesOpen(!isCurrenciesOpen);
//   };

//   const toggleTransactionsDropdown = () => {
//     setIsTransactionsOpen(!isTransactionsOpen);
//   };

//   const { user, logout } = useAuth();
//   const router = useRouter();

//   const handleLogout = async () => {
//     await logout();
//     router.push("/auth/login");
//   };

//   return (
//     <>
//       <aside className="bg-main text-white w-64 py-6 px-3">
//         <div className="flex flex-col h-full justify-between">
//           <div>
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-center text-white">
//                 Wise Admin
//               </h2>
//             </div>
//             <nav>
//               <ul>
//                 <li className="mb-3">
//                   <Link
//                     href="/admin"
//                     className="flex items-center hover:bg-gray-300/50 justify-between p-3 rounded transition-colors duration-200"
//                   >
//                     <div className="flex items-center">
//                       <FaTachometerAlt className="mr-3 text-lg" />
//                       <span className="text-base">Dashboard</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Currencies with Dropdown */}
//                 <li className="mb-3">
//                   <Link
//                     href="/admin/currencies"
//                     onClick={toggleCurrenciesDropdown}
//                     className="flex items-center justify-between hover:bg-gray-100/50 p-3 rounded transition-colors duration-200 cursor-pointer"
//                   >
//                     <div className="flex items-center">
//                       <FaCoins className="mr-3 text-lg" />
//                       <span className="text-base">Currencies</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isCurrenciesOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </Link>

//                   {isCurrenciesOpen && (
//                     <ul className="pl-6 space-y-2 mt-2">
//                       <li>
//                         <Link
//                           href="/admin/currencies/add"
//                           className="block p-3 rounded hover:bg-gray-100/50 transition-colors duration-200"
//                         >
//                           Add Currency
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/currencies/list"
//                           className="block p-3 rounded hover:bg-gray-100/50 transition-colors duration-200"
//                         >
//                           Currency List
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>

//                 <li className="mb-3">
//                   <Link
//                     href="/admin/users"
//                     className="flex items-center hover:bg-gray-100/50 justify-between p-3 rounded  transition-colors duration-200"
//                   >
//                     <div className="flex items-center">
//                       <FaUsers className="mr-3 text-lg" />
//                       <span className="text-base">Users</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Transactions with Dropdown */}
//                 <li className="mb-3">
//                   <div
//                     onClick={toggleTransactionsDropdown}
//                     className="flex items-center justify-between hover:bg-gray-100/50 p-3 rounded transition-colors duration-200 cursor-pointer"
//                   >
//                     <div className="flex items-center">
//                       <FaMoneyBillWave className="mr-3 text-lg" />
//                       <span className="text-base">Transactions</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isTransactionsOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </div>

//                   {isTransactionsOpen && (
//                     <ul className="pl-6 mt-2 space-y-2">
//                       <li>
//                         <Link
//                           href="/admin/transactions/list"
//                           className="block p-3 rounded hover:bg-gray-100/50 transition-colors duration-200"
//                         >
//                           Transaction List
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/transactions/export"
//                           className="block p-3 rounded hover:bg-gray-100/50 transition-colors duration-200"
//                         >
//                           Export Transactions
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </ul>
//             </nav>
//           </div>

//           <div>
//             {user && (
//               <>
//                 <span className="text-gray-700">{user.username}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-primary cursor-pointer flex justify-center group gap-2 items-center text-secondary font-medium py-2 w-full focus:outline-none focus:shadow-outline"
//                 >
//                   <FaArrowLeft className="size-5 group-hover:-translate-x-5 transition-transform duration-300 ease-in-out" />
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AdminSidebar;

// // frontend/src/components/layout/AdminSidebar.tsx
// "use client"; // Make sure this is a client component

// import Link from "next/link";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
// } from "react-icons/fa"; // Example icons
// import { useState, useMemo } from "react"; // Import useMemo
// import Image from "next/image";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter, usePathname } from "next/navigation"; // Import usePathname
// import { FaArrowLeft } from "react-icons/fa6";

// const AdminSidebar = () => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

//   const toggleCurrenciesDropdown = () => {
//     setIsCurrenciesOpen(!isCurrenciesOpen);
//   };

//   const toggleTransactionsDropdown = () => {
//     setIsTransactionsOpen(!isTransactionsOpen);
//   };

//   const { user, logout } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname(); // Get current path

//   const handleLogout = async () => {
//     await logout();
//     router.push("/auth/login");
//   };

//   // Helper function to check if a link is active
//   const isActive = (href: string) => {
//     return pathname === href;
//   };

//   // Memoize the link classes for better performance
//   const getLinkClasses = useMemo(
//     () => (href: string) => {
//       const baseClasses =
//         "flex items-center justify-between p-3 rounded transition-colors duration-200";
//       const hoverClasses = "hover:bg-gray-300/50"; // Define hover classes separately

//       return isActive(href)
//         ? `${baseClasses} bg-primary text-secondary` // Active state: no hover
//         : `${baseClasses} ${hoverClasses}`; // Inactive state: with hover
//     },
//     []
//   );

//   const getDropdownLinkClasses = useMemo(
//     () => (href: string) => {
//       const baseClasses = "block p-3 rounded transition-colors duration-200";
//       const hoverClasses = "hover:bg-gray-100/50"; // Define hover classes separately

//       return isActive(href)
//         ? `${baseClasses} bg-primary text-secondary` // Active state: no hover
//         : `${baseClasses} ${hoverClasses}`; // Inactive state: with hover
//     },
//     [pathname]
//   );

//   return (
//     <>
//       <aside className="bg-[#1A202C] text-white w-64 py-6 px-3">
//         <div className="flex flex-col h-full justify-between">
//           <div>
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-center text-white">
//                 Wise Admin
//               </h2>
//             </div>
//             <nav>
//               <ul>
//                 <li className="mb-3">
//                   <Link
//                     href="/admin"
//                     className={getLinkClasses("/admin")} // Use getLinkClasses
//                   >
//                     <div className="flex items-center">
//                       <FaTachometerAlt className="mr-3 text-lg" />
//                       <span className="text-base">Dashboard</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Currencies with Dropdown */}
//                 <li className="mb-3">
//                   <Link
//                     href="/admin/currencies"
//                     onClick={toggleCurrenciesDropdown}
//                     className={
//                       getLinkClasses("/admin/currencies") + " cursor-pointer"
//                     }
//                   >
//                     <div className="flex items-center">
//                       <FaCoins className="mr-3 text-lg" />
//                       <span className="text-base">Currencies</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isCurrenciesOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </Link>

//                   {isCurrenciesOpen && (
//                     <ul className="pl-6 space-y-2 mt-2">
//                       <li>
//                         <Link
//                           href="/admin/currencies/add"
//                           className={getDropdownLinkClasses(
//                             "/admin/currencies/add"
//                           )} // Use getDropdownLinkClasses
//                         >
//                           Add Currency
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/currencies/list"
//                           className={getDropdownLinkClasses(
//                             "/admin/currencies/list"
//                           )} // Use getDropdownLinkClasses
//                         >
//                           Currency List
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>

//                 <li className="mb-3">
//                   <Link
//                     href="/admin/users"
//                     className={getLinkClasses("/admin/users")} // Use getLinkClasses
//                   >
//                     <div className="flex items-center">
//                       <FaUsers className="mr-3 text-lg" />
//                       <span className="text-base">Users</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Transactions with Dropdown */}
//                 <li className="mb-3">
//                   <div
//                     onClick={toggleTransactionsDropdown}
//                     className={
//                       getLinkClasses("/admin/transactions") + " cursor-pointer"
//                     } // Apply cursor-pointer for div
//                   >
//                     <div className="flex items-center">
//                       <FaMoneyBillWave className="mr-3 text-lg" />
//                       <span className="text-base">Transactions</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isTransactionsOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </div>

//                   {isTransactionsOpen && (
//                     <ul className="pl-6 mt-2 space-y-2">
//                       <li>
//                         <Link
//                           href="/admin/transactions/list"
//                           className={getDropdownLinkClasses(
//                             "/admin/transactions/list"
//                           )} // Use getDropdownLinkClasses
//                         >
//                           Transaction List
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/transactions/export"
//                           className={getDropdownLinkClasses(
//                             "/admin/transactions/export"
//                           )} // Use getDropdownLinkClasses
//                         >
//                           Export Transactions
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </ul>
//             </nav>
//           </div>

//           <div>
//             {user && (
//               <>
//                 <span className="text-gray-700">{user.username}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-primary cursor-pointer flex justify-center group gap-2 items-center text-secondary font-medium py-3 w-full focus:outline-none focus:shadow-outline"
//                 >
//                   <FaArrowLeft className="size-5 group-hover:-translate-x-5 transition-transform duration-300 ease-in-out" />
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AdminSidebar;
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";

// const AdminSidebar: React.FC = () => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname(); // Correct way to get the current path

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   // Function to check if a link is active
//   const isActive = (path: string): boolean => pathname === path;

//   return (
//     <aside className="bg-main text-white w-64 py-6 px-3">
//       <div className="flex flex-col h-full justify-between">
//         <div>
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-center text-white">
//               Wise Admin
//             </h2>
//           </div>
//           <nav>
//             <ul>
//               <li className="mb-3">
//                 <Link
//                   href="/admin"
//                   className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                     isActive("/admin")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaTachometerAlt className="mr-3 text-lg" />
//                     <span className="text-base">Dashboard</span>
//                   </div>
//                 </Link>
//               </li>

//               {/* Currencies with Dropdown */}
//               <li className="mb-3">
//                 <button
//                   onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                   className="flex items-center justify-between w-full hover:bg-gray-100/50 p-3 rounded transition-colors duration-200 cursor-pointer"
//                 >
//                   <div className="flex items-center">
//                     <FaCoins className="mr-3 text-lg" />
//                     <span className="text-base">Currencies</span>
//                   </div>
//                   <FaChevronDown
//                     className={`text-lg transition-transform duration-300 ${
//                       isCurrenciesOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {isCurrenciesOpen && (
//                   <ul className="pl-6 space-y-2 mt-2">
//                     <li>
//                       <Link
//                         href="/admin/currencies/add"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/currencies/add")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Add Currency
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/list"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/currencies/list")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Currency List
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li className="mb-3">
//                 <Link
//                   href="/admin/users"
//                   className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                     isActive("/admin/users")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaUsers className="mr-3 text-lg" />
//                     <span className="text-base">Users</span>
//                   </div>
//                 </Link>
//               </li>

//               {/* Transactions with Dropdown */}
//               <li className="mb-3">
//                 <button
//                   onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                   className="flex items-center justify-between w-full hover:bg-gray-100/50 p-3 rounded transition-colors duration-200 cursor-pointer"
//                 >
//                   <div className="flex items-center">
//                     <FaMoneyBillWave className="mr-3 text-lg" />
//                     <span className="text-base">Transactions</span>
//                   </div>
//                   <FaChevronDown
//                     className={`text-lg transition-transform duration-300 ${
//                       isTransactionsOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {isTransactionsOpen && (
//                   <ul className="pl-6 mt-2 space-y-2">
//                     <li>
//                       <Link
//                         href="/admin/transactions/list"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/transactions/list")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Transaction List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/export"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/transactions/export")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Export Transactions
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         <div>
//           {user && (
//             <>
//               <span className="text-gray-300">{user.username}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-primary cursor-pointer flex justify-center group gap-2 items-center text-secondary font-medium py-2 w-full focus:outline-none focus:shadow-outline"
//               >
//                 <FaArrowLeft className="size-5 group-hover:-translate-x-5 transition-transform duration-300 ease-in-out" />
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { FaArrowLeftLong } from "react-icons/fa6";

// const AdminSidebar: React.FC = () => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname(); // Correct way to get the current path

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   // Function to check if a link is active
//   const isActive = (path: string): boolean => pathname === path;

//   return (
//     <aside className="bg-main text-white w-64 py-6 px-3">
//       <div className="flex flex-col h-full justify-between">
//         <div>
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-center text-white">
//               Wise Admin
//             </h2>
//           </div>
//           <nav>
//             <ul>
//               <li className="mb-3">
//                 <Link
//                   href="/admin"
//                   className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                     isActive("/admin")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaTachometerAlt className="mr-3 text-lg" />
//                     <span className="text-base">Dashboard</span>
//                   </div>
//                 </Link>
//               </li>

//               {/* Currencies with Dropdown */}
//               <li className="mb-3">
//                 <Link
//                   href="/admin/currencies"
//                   onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                   className={`flex items-center justify-between w-full p-3 rounded transition-colors duration-200 cursor-pointer ${
//                     isActive("/admin/currencies")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaCoins className="mr-3 text-lg" />
//                     <span className="text-base">Currencies</span>
//                   </div>
//                   <FaChevronDown
//                     className={`text-lg transition-transform duration-300 ${
//                       isCurrenciesOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </Link>

//                 {isCurrenciesOpen && (
//                   <ul className="pl-6 space-y-2 mt-2">
//                     <li>
//                       <Link
//                         href="/admin/currencies/add"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/currencies/add")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Add Currency
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/list"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/currencies/list")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Currency List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/delete" // Add your delete currency page link
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/currencies/delete") // Update isActive check if needed
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Delete Currency
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li className="mb-3">
//                 <Link
//                   href="/admin/users"
//                   className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                     isActive("/admin/users")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaUsers className="mr-3 text-lg" />
//                     <span className="text-base">Users</span>
//                   </div>
//                 </Link>
//               </li>

//               {/* Transactions with Dropdown */}
//               <li className="mb-3">
//                 <Link
//                   href="/admin/transactions"
//                   onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                   className={`flex items-center justify-between w-full p-3 rounded transition-colors duration-200 cursor-pointer ${
//                     isActive("/admin/transactions")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaMoneyBillWave className="mr-3 text-lg" />
//                     <span className="text-base">Transactions</span>
//                   </div>
//                   <FaChevronDown
//                     className={`text-lg transition-transform duration-300 ${
//                       isTransactionsOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </Link>

//                 {isTransactionsOpen && (
//                   <ul className="pl-6 mt-2 space-y-2">
//                     <li>
//                       <Link
//                         href="/admin/transactions/list"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/transactions/list")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Transaction List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/view" // Add your view transaction page link
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/transactions/view") // Update isActive check if needed
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         View Transaction
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/refund" // Add your refund transaction page link
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/transactions/refund") // Update isActive check if needed
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Refund Transaction
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         <div>
//           {user && (
//             <>
//               <span className="text-gray-300">{user.username}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-primary cursor-pointer flex justify-center group gap-2 items-center text-secondary font-medium py-2 w-full focus:outline-none focus:shadow-outline"
//               >
//                 <FaArrowLeftLong className="size-5 group-hover:-translate-x-5 transition-transform duration-300 ease-in-out" />
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { FaArrowLeftLong, FaXmark } from "react-icons/fa6";

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname(); // Correct way to get the current path

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   // Function to check if a link is active
//   const isActive = (path: string): boolean => pathname === path;

//   return (
//     <>
//       {/* Mobile Sidebar - Slide in from left */}
//       <aside
//         className={`fixed lg:relative top-0 left-0 z-50 h-full bg-main text-white w-64 py-6 px-3 transition-transform duration-300 ease-in-out transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0" // Slide in/out animation
//         } lg:translate-x-0`} // Always visible on larger screens
//       >
//         <div className="flex flex-col h-full justify-between">
//           <div>
//             <div className="mb-8 flex items-center justify-between">
//               <h2 className="text-2xl font-bold text-center text-white">
//                 Wise Admin
//               </h2>
//               {/* Close button for mobile sidebar */}
//               <button
//                 onClick={toggleSidebar}
//                 className="lg:hidden text-white focus:outline-none"
//               >
//                 <FaXmark className="h-6 w-6" />
//               </button>
//             </div>
//             <nav>
//               <ul>
//                 <li className="mb-3">
//                   <Link
//                     href="/admin"
//                     className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                       isActive("/admin")
//                         ? "bg-primary text-secondary"
//                         : "hover:bg-gray-100/50"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <FaTachometerAlt className="mr-3 text-lg" />
//                       <span className="text-base">Dashboard</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Currencies with Dropdown */}
//                 <li className="mb-3">
//                   <Link
//                     href="/admin/currencies"
//                     onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                     className={`flex items-center justify-between w-full p-3 rounded transition-colors duration-200 cursor-pointer ${
//                       isActive("/admin/currencies")
//                         ? "bg-primary text-secondary"
//                         : "hover:bg-gray-100/50"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <FaCoins className="mr-3 text-lg" />
//                       <span className="text-base">Currencies</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isCurrenciesOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </Link>

//                   {isCurrenciesOpen && (
//                     <ul className="pl-6 space-y-2 mt-2">
//                       <li>
//                         <Link
//                           href="/admin/currencies/add"
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/currencies/add")
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           Add Currency
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/currencies/list"
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/currencies/list")
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           Currency List
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/currencies/delete" // Add your delete currency page link
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/currencies/delete") // Update isActive check if needed
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           Delete Currency
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>

//                 <li className="mb-3">
//                   <Link
//                     href="/admin/users"
//                     className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                       isActive("/admin/users")
//                         ? "bg-primary text-secondary"
//                         : "hover:bg-gray-100/50"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <FaUsers className="mr-3 text-lg" />
//                       <span className="text-base">Users</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Transactions with Dropdown */}
//                 <li className="mb-3">
//                   <Link
//                     href="/admin/transactions"
//                     onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                     className={`flex items-center justify-between w-full p-3 rounded transition-colors duration-200 cursor-pointer ${
//                       isActive("/admin/transactions")
//                         ? "bg-primary text-secondary"
//                         : "hover:bg-gray-100/50"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <FaMoneyBillWave className="mr-3 text-lg" />
//                       <span className="text-base">Transactions</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isTransactionsOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </Link>

//                   {isTransactionsOpen && (
//                     <ul className="pl-6 mt-2 space-y-2">
//                       <li>
//                         <Link
//                           href="/admin/transactions/list"
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/transactions/list")
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           Transaction List
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/transactions/view" // Add your view transaction page link
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/transactions/view") // Update isActive check if needed
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           View Transaction
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/transactions/refund" // Add your refund transaction page link
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/transactions/refund") // Update isActive check if needed
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           Refund Transaction
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </ul>
//             </nav>
//           </div>

//           <div>
//             {user && (
//               <>
//                 <span className="text-gray-300">{user.username}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-primary cursor-pointer flex justify-center group gap-2 items-center text-secondary font-medium py-2 w-full focus:outline-none focus:shadow-outline"
//                 >
//                   <FaArrowLeftLong className="size-5 group-hover:-translate-x-5 transition-transform duration-300 ease-in-out" />
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AdminSidebar;

// AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
// } from "react-icons/fa";
// import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { FaArrowLeftLong, FaXmark } from "react-icons/fa6";
// import Image from "next/image";

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname();

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   const isActive = (path: string): boolean => pathname === path;

//   return (
//     <aside
//       className={`fixed lg:relative top-0 left-0 z-50 h-full bg-white border-r border-gray-300 w-64 transition-transform duration-300 ease-in-out transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//       } lg:translate-x-0`} // Removed bg-gray-800, added white background and border
//     >
//       <div className="h-full flex flex-col justify-between">
//         <div className="py-4">
//           <div className="flex justify-center items-center py-5 border-b border-gray-300">
//             <Image
//               src="/assets/images/wise-logo.svg"
//               height={100}
//               width={100}
//               alt="Wice Admin Logo"
//             />
//           </div>
//           <button
//             onClick={toggleSidebar}
//             className="lg:hidden bg-gray p-2 cursor-pointer absolute top-0 right-0 text-gray-500 hover:text-gray-600 focus:outline-none"
//           >
//             <FaXmark className="size-5 text-white" /> {/* Smaller close icon */}
//           </button>
//           <nav>
//             {/* Reduced spacing between nav items */}
//             <ul className="space-y-4 mt-5">
//               <li>
//                 <Link
//                   href="/admin"
//                   className={`group flex gap-4 items-center p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                     isActive("/admin")
//                       ? "bg-gray-100 text-main font-semibold" // More subtle active state
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <FaTachometerAlt className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />{" "}
//                   Dashboard
//                 </Link>
//               </li>

//               {/* Currencies with Dropdown */}
//               <li>
//                 <Link
//                   href="/admin/currencies"
//                   onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                   className={`group flex items-center justify-between w-full p-4 font-medium  hover:bg-gray-100 hover:text-main transition-colors ${
//                     isActive("/admin/currencies") ||
//                     pathname.startsWith("/admin/currencies/")
//                       ? "bg-gray-100 text-main font-semibold" // Active state for dropdown parent
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <FaCoins className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                     Currencies
//                   </div>
//                   <FaChevronDown
//                     className={`size-4 text-gray-500 group-hover:text-gray-600 transition-transform duration-300 ${
//                       isCurrenciesOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </Link>

//                 {isCurrenciesOpen && (
//                   <ul className="pl-6 mt-1 space-y-1">
//                     {" "}
//                     {/* Reduced spacing in dropdown */}
//                     <li>
//                       <Link
//                         href="/admin/currencies/add"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/currencies/add")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Add Currency
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/list"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/currencies/list")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Currency List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/delete"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/currencies/delete")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Delete Currency
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <Link
//                   href="/admin/users"
//                   className={`group flex items-center gap-4 p-4 font-medium  hover:bg-gray-100 hover:text-main transition-colors ${
//                     isActive("/admin/users")
//                       ? "bg-gray-100 text-main font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <FaUsers className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                   Users
//                 </Link>
//               </li>

//               {/* Transactions with Dropdown */}
//               <li>
//                 <button
//                   onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                   className={`group flex items-center justify-between w-full p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                     isActive("/admin/transactions") ||
//                     pathname.startsWith("/admin/transactions/")
//                       ? "bg-gray-100 text-main font-semibold" // Active state for dropdown parent
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <FaMoneyBillWave className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                     Transactions
//                   </div>
//                   <FaChevronDown
//                     className={`ml-2 h-4 w-4 text-gray-500 group-hover:text-gray-600 transition-transform duration-300 ${
//                       isTransactionsOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {isTransactionsOpen && (
//                   <ul className="pl-6 mt-1 space-y-1">
//                     {" "}
//                     {/* Reduced spacing in dropdown */}
//                     <li>
//                       <Link
//                         href="/admin/transactions/list"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/transactions/list")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Transaction List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/view"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/transactions/view")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         View Transaction
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/refund"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/transactions/refund")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Refund Transaction
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         {/* Logout Section at Bottom */}
//         <div className="border-t border-gray-200">
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="group flex items-center justify-center w-full p-4 font-medium bg-gray-50 hover:bg-gray-100 hover:text-main transition-colors text-gray-600" // Neutral logout button
//             >
//               <FaArrowLeftLong className="mr-2 h-4 w-4 group-hover:text-main transition-colors" />
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// // AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
// } from "react-icons/fa";
// import { useState, useEffect } from "react"; // Import useEffect
// import { useAuth } from "../../hooks/useAuth";
// import { FaArrowLeftLong, FaXmark } from "react-icons/fa6";
// import Image from "next/image";

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname();
//   const [activePath, setActivePath] = useState<string | null>(null); // State to track active path

//   useEffect(() => {
//     setActivePath(pathname); // Update activePath on pathname change
//   }, [pathname]);

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   const isActive = (path: string): boolean => {
//     return activePath === path;
//   };

//   const isDropdownActive = (basePath: string): boolean => {
//     return activePath?.startsWith(basePath) || false;
//   };

//   return (
//     <aside
//       className={`fixed lg:relative top-0 left-0 z-50 h-full bg-white border-r border-gray-300 w-64 transition-transform duration-300 ease-in-out transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//       } lg:translate-x-0`}
//     >
//       <div className="h-full flex flex-col justify-between">
//         <div className="py-4">
//           <div className="flex justify-center items-center py-5 border-b border-gray-300">
//             <Image
//               src="/assets/images/wise-logo.svg"
//               height={100}
//               width={100}
//               alt="Wice Admin Logo"
//             />
//           </div>
//           <nav>
//             <ul className="space-y-2 mt-5">
//               <li>
//                 <Link
//                   href="/admin"
//                   className={`group flex gap-4 items-center p-4 lg:text-lg text-sm font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                     isActive("/admin")
//                       ? "bg-gray-100 text-main font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <FaTachometerAlt className="size-5 text-gray-700 group-hover:text-gray-700 transition-colors" />
//                   Dashboard
//                 </Link>
//               </li>

//               {/* Currencies with Dropdown */}
//               <li>
//                 <Link
//                   href="/admin/currencies"
//                   onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                   className={`group flex items-center justify-between w-full p-4 lg:text-lg text-sm font-medium  hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                     isDropdownActive("/admin/currencies")
//                       ? "bg-gray-100 text-main font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <FaCoins className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                     Currencies
//                   </div>
//                   <FaChevronDown
//                     className={`size-4 text-gray-500 group-hover:text-gray-600 transition-transform duration-300 ${
//                       isCurrenciesOpen ? "rotate-3" : "-rotate-90"
//                     }`}
//                   />
//                 </Link>

//                 {isCurrenciesOpen && (
//                   <ul className="pl-6 mt-2 space-y-1">
//                     <li>
//                       <button
//                         className={`block w-full text-left cursor-pointer p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/currencies/add")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         New Currency
//                       </button>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/list"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/currencies/list")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Currency List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/delete"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/currencies/delete")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Delete Currency
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <Link
//                   href="/admin/users"
//                   className={`group flex items-center gap-4 p-4 lg:text-lg text-sm font-medium  hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                     isActive("/admin/users")
//                       ? "bg-gray-100 text-main font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <FaUsers className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                   Users
//                 </Link>
//               </li>

//               {/* Transactions with Dropdown */}
//               <li>
//                 <Link
//                   href="/admin/transactions"
//                   onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                   className={`group flex items-center justify-between w-full p-4 lg:text-lg text-sm cursor-pointer font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                     isDropdownActive("/admin/transactions")
//                       ? "bg-gray-100 text-main font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <FaMoneyBillWave className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                     Transactions
//                   </div>
//                   <FaChevronDown
//                     className={`ml-2 h-4 w-4 text-gray-500 group-hover:text-gray-600 transition-transform duration-300 ${
//                       isTransactionsOpen ? "rotate-3" : "-rotate-90"
//                     }`}
//                   />
//                 </Link>

//                 {isTransactionsOpen && (
//                   <ul className="pl-6 mt-1 space-y-1">
//                     <li>
//                       <Link
//                         href="/admin/transactions/list"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/transactions/list")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Transaction List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/view"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/transactions/view")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         View Transaction
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/refund"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/transactions/refund")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Refund Transaction
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         {/* Logout Section at Bottom */}
//         <div className="border-t border-gray-300">
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="group flex gap-2.5 items-center lg:text-lg text-sm font-semibold cursor-pointer justify-center w-full p-4  hover:text-main transition-colors text-gray-600"
//             >
//               <FaArrowLeftLong className="size-4 group-hover:-translate-x-5 group-hover:text-main transition-all duration-300 ease-in-out" />
//               LogOut
//             </button>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// // AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
// } from "react-icons/fa";
// import { useState, useEffect } from "react"; // Import useEffect
// import { useAuth } from "../../hooks/useAuth";
// import { FaArrowLeftLong, FaXmark } from "react-icons/fa6";
// import Image from "next/image";

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname();
//   const [activePath, setActivePath] = useState<string | null>(null); // State to track active path

//   useEffect(() => {
//     setActivePath(pathname); // Update activePath on pathname change
//   }, [pathname]);

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   const isActive = (path: string): boolean => {
//     return activePath === path;
//   };

//   const isDropdownActive = (basePath: string): boolean => {
//     return activePath?.startsWith(basePath) || false;
//   };

//   const navLinkClasses = (isActive: boolean) => {
//     return `group flex gap-3 items-center px-4 py-3 text-sm lg:text-base font-medium rounded-md transition-colors duration-200
//             hover:bg-indigo-50 hover:text-indigo-700
//             ${
//               isActive
//                 ? "bg-indigo-100 text-indigo-900 font-semibold"
//                 : "text-gray-600"
//             }`;
//   };

//   const dropdownLinkClasses = (isActive: boolean) => {
//     return `block px-4 py-3 text-sm lg:text-base font-medium rounded-md transition-colors duration-200
//             hover:bg-indigo-50 hover:text-indigo-700
//             ${
//               isActive
//                 ? "bg-indigo-100 text-indigo-900 font-semibold"
//                 : "text-gray-600"
//             }`;
//   };

//   return (
//     <aside
//       className={`fixed lg:relative top-0 left-0 z-50 h-full bg-gray-50 border-r border-gray-200 w-64 transition-transform duration-300 ease-in-out transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//       } lg:translate-x-0`}
//     >
//       <div className="h-full flex flex-col justify-between">
//         <div className="py-4">
//           <div className="flex justify-center items-center py-6">
//             <Link href="/admin" className="flex items-center space-x-2">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 height={30}
//                 width={30}
//                 alt="Wice Admin Logo"
//               />
//               <span className="font-bold text-xl text-gray-800">
//                 Wice Admin
//               </span>
//             </Link>
//           </div>

//           <nav className="mt-6">
//             <ul className="space-y-1">
//               <li>
//                 <Link
//                   href="/admin"
//                   className={navLinkClasses(isActive("/admin"))}
//                 >
//                   <FaTachometerAlt className="size-4 text-gray-500 group-hover:text-indigo-700 transition-colors" />
//                   Dashboard
//                 </Link>
//               </li>

//               {/* Currencies Dropdown */}
//               <li>
//                 <button
//                   onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                   className={`${navLinkClasses(
//                     isDropdownActive("/admin/currencies")
//                   )} w-full flex justify-between items-center`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <FaCoins className="size-4 text-gray-500 group-hover:text-indigo-700 transition-colors" />
//                     Currencies
//                   </div>
//                   <FaChevronDown
//                     className={`size-4 text-gray-500 group-hover:text-indigo-700 transition-transform duration-300 ${
//                       isCurrenciesOpen ? "rotate-180" : "rotate-0"
//                     }`}
//                   />
//                 </button>

//                 {isCurrenciesOpen && (
//                   <ul className="ml-2 mt-1 space-y-1">
//                     <li>
//                       <Link
//                         href="/admin/currencies/add"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/currencies/add")
//                         )}
//                       >
//                         New Currency
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/list"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/currencies/list")
//                         )}
//                       >
//                         Currency List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/delete"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/currencies/delete")
//                         )}
//                       >
//                         Delete Currency
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <Link
//                   href="/admin/users"
//                   className={navLinkClasses(isActive("/admin/users"))}
//                 >
//                   <FaUsers className="size-4 text-gray-500 group-hover:text-indigo-700 transition-colors" />
//                   Users
//                 </Link>
//               </li>

//               {/* Transactions Dropdown */}
//               <li>
//                 <button
//                   onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                   className={`${navLinkClasses(
//                     isDropdownActive("/admin/transactions")
//                   )} w-full flex justify-between items-center`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <FaMoneyBillWave className="size-4 text-gray-500 group-hover:text-indigo-700 transition-colors" />
//                     Transactions
//                   </div>
//                   <FaChevronDown
//                     className={`size-4 text-gray-500 group-hover:text-indigo-700 transition-transform duration-300 ${
//                       isTransactionsOpen ? "rotate-180" : "rotate-0"
//                     }`}
//                   />
//                 </button>

//                 {isTransactionsOpen && (
//                   <ul className="ml-2 mt-1 space-y-1">
//                     <li>
//                       <Link
//                         href="/admin/transactions/list"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/transactions/list")
//                         )}
//                       >
//                         Transaction List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/view"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/transactions/view")
//                         )}
//                       >
//                         View Transaction
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/refund"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/transactions/refund")
//                         )}
//                       >
//                         Refund Transaction
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         {/* Logout Section at Bottom */}
//         <div className="border-t border-gray-200 py-2">
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="group flex justify-start items-center gap-3 px-4 py-3 text-sm lg:text-base font-medium rounded-md transition-colors duration-200 text-gray-600 hover:bg-gray-100 hover:text-indigo-700 w-full"
//             >
//               <FaArrowLeftLong className="size-4 text-gray-500 group-hover:text-indigo-700 transition-colors" />
//               LogOut
//             </button>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "../../hooks/useAuth";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   FaChartPie,
//   FaCoins,
//   FaUsers,
//   FaMoneyBillWave,
//   FaChevronRight,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import ThemeToggle from "../../contexts/ThemeToggle"; // Import ThemeToggle

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [dashboardDropdownOpen, setDashboardDropdownOpen] =
//     useState<boolean>(false); // State for Dashboard dropdown
//   const { user, logout } = useAuth();
//   const pathname = usePathname();

//   useEffect(() => {
//     // Update dropdown state based on current path
//     if (pathname?.startsWith("/admin/currencies")) {
//       setActiveDropdown("currencies");
//     } else if (pathname?.startsWith("/admin/transactions")) {
//       setActiveDropdown("transactions");
//     } else if (pathname?.startsWith("/admin/dashboard")) {
//       setDashboardDropdownOpen(true); // Open dashboard dropdown if on a dashboard subpage
//     }
//   }, [pathname]);

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   const toggleDropdown = (dropdown: string) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//     if (dropdown === "dashboard") {
//       setDashboardDropdownOpen(!dashboardDropdownOpen);
//     }
//   };

//   const isActive = (path: string): boolean => {
//     return pathname === path;
//   };

//   const isDropdownActive = (basePath: string): boolean => {
//     return pathname?.startsWith(basePath) || false;
//   };

//   const isDashboardActive = (): boolean => {
//     return isActive("/admin"); // Modified to check for exact match of /admin
//   };

//   const isDashboardDropdownActive = (): boolean => {
//     return pathname?.startsWith("/admin/dashboard") || false; // Keep this for dropdown active state
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:relative top-0 left-0 z-40 h-full border-r transition-all duration-300 ease-in-out${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         }lg:translate-x-0 w-64 flex flex-col`}
//       >
//         {/* Mobile Close Button */}
//         <button
//           className="absolute top-4 right-4 lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
//           onClick={toggleSidebar}
//         >
//           <FaTimes className="size-5" />
//         </button>

//         {/* Logo Section */}
//         <div className="p-3 border-b">
//           <div className="h-14 flex justify-center items-center">
//             <Image
//               src="/assets/images/wise-logo.svg"
//               height={100}
//               width={100}
//               alt="Wise Admin Logo"
//               className="transition-opacity"
//             />
//           </div>
//         </div>

//         {/* User Profile Summary */}
//         {user && (
//           <div className="flex items-center gap-3 p-3 border-b">
//             <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center relative">
//               <span className="text-neutral-900 font-semibold uppercase">
//                 {user.email?.charAt(0) || "A"}
//               </span>
//             </div>
//             <div className="overflow-hidden space-y-1 w-[calc(100%-60px)]">
//               <p className="font-semibold text-neutral-900 dark:text-white truncate">
//                 {user.name || "Admin User"}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
//                 {user.email || "admin@example.com"}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Navigation */}
//         <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
//           <div className="px-4 mb-4">
//             <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white px-4">
//               Main
//             </span>
//           </div>

//           <ul className="space-y-2.5 px-3">
//             {/* Dashboard */}
//             <li>
//               <Link
//                 href="/admin"
//                 onClick={() => toggleDropdown("dashboard")}
//                 className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
//     ${
//       isDashboardActive() || isDashboardDropdownActive()
//         ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//     }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <FaChartPie className="size-5" />
//                   <span className="font-medium">Dashboard</span>
//                 </div>
//                 <FaChevronRight
//                   className={`size-3.5 transition-transform duration-200 ${
//                     dashboardDropdownOpen ? "rotate-90" : ""
//                   }`}
//                 />
//               </Link>

//               {dashboardDropdownOpen && (
//                 <ul className="mt-2 ml-6 space-y-1 border-l-2 pl-4">
//                   {/* Demo 1 */}
//                   <li>
//                     <Link
//                       href="/admin/dashboard/demo1"
//                       className={`block px-4 py-2.5 rounded-md transition-all duration-200
//                       ${
//                         isActive("/admin/dashboard/demo1")
//                           ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                     >
//                       Demo 1
//                     </Link>
//                   </li>
//                   {/* Demo 2 */}
//                   <li>
//                     <Link
//                       href="/admin/dashboard/demo2"
//                       className={`block px-4 py-2.5 rounded-md transition-all duration-200
//                       ${
//                         isActive("/admin/dashboard/demo2")
//                           ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                     >
//                       Demo 2
//                     </Link>
//                   </li>
//                   {/* Demo 3 */}
//                   <li>
//                     <Link
//                       href="/admin/dashboard/demo3"
//                       className={`block px-4 py-2.5 rounded-md transition-all duration-200
//                       ${
//                         isActive("/admin/dashboard/demo3")
//                           ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                     >
//                       Demo 3
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             {/* Currencies */}
//             <li>
//               <Link
//                 href="/admin/currencies"
//                 className={`flex items-center gap-3 px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/currencies")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <FaCoins className="size-5" />
//                 <span className="font-medium">Currencies</span>
//               </Link>
//             </li>

//             {/* Users */}
//             <li>
//               <Link
//                 href="/admin/users"
//                 className={`flex items-center gap-3 px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/users")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <FaUsers className="size-5" />
//                 <span className="font-medium">Users</span>
//               </Link>
//             </li>

//             {/* Add-Money */}
//             <li>
//               <Link
//                 href="/admin/add-money"
//                 className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/add-money")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <IoMdAddCircleOutline className="size-5" />
//                   <span className="font-medium">Add-Money</span>
//                 </div>
//               </Link>
//             </li>

//             {/* Send-Money */}
//             <li>
//               <Link
//                 href="/admin/transfer"
//                 className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/transfer")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <FaMoneyBillWave className="size-5" />
//                   <span className="font-medium">Send-Money</span>
//                 </div>
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Footer Actions */}
//         <div className="p-4 border-t space-y-2">
//           {/* Theme Toggle for Admin Sidebar */}
//           <div className="mb-2 flex justify-center">
//             <ThemeToggle location="admin" className="inline-block" />
//           </div>
//           {/* Logout Button */}
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-3 w-full px-4 py-3 rounded-4xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
//             >
//               <FaSignOutAlt className="size-5" />
//               <span className="font-medium">Logout</span>
//             </button>
//           )}
//         </div>
//       </aside>

//       {/* Mobile Toggle Button - Outside the sidebar */}
//       <button
//         className="fixed bottom-6 left-6 z-30 lg:hidden bg-primary text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
//         onClick={toggleSidebar}
//       >
//         <FaBars className="size-5" />
//       </button>
//     </>
//   );
// };

// export default AdminSidebar;

// frontend/src/app/components/layout/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaChartPie,
  FaCoins,
  FaUsers,
  FaMoneyBillWave,
  FaChevronRight,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import ThemeToggle from "../../contexts/ThemeToggle"; // Import ThemeToggle

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] =
    useState<boolean>(false); // State for Dashboard dropdown
  const { user, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    // Update dropdown state based on current path
    if (pathname?.startsWith("/admin/currencies")) {
      setActiveDropdown("currencies");
    } else if (pathname?.startsWith("/admin/transactions")) {
      setActiveDropdown("transactions");
    } else if (pathname?.startsWith("/admin/dashboard")) {
      setDashboardDropdownOpen(true); // Open dashboard dropdown if on a dashboard subpage
    }
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth/login";
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    if (dropdown === "dashboard") {
      setDashboardDropdownOpen(!dashboardDropdownOpen);
    }
  };

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  const isDashboardActive = (): boolean => {
    return isActive("/admin"); // Modified to check for exact match of /admin
  };

  const isDashboardDropdownActive = (): boolean => {
    return pathname?.startsWith("/admin/dashboard") || false; // Keep this for dropdown active state
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 z-50 h-full border-r transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:translate-x-0 w-64 flex flex-col`} // Modified classes for left sidebar
      >
        {/* Mobile Close Button */}
        <button
          className="absolute top-4 right-4 lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" // Modified right-4
          onClick={toggleSidebar}
        >
          <FaTimes className="size-5" />
        </button>

        {/* Logo Section */}
        <div className="p-3 border-b">
          <div className="h-14 flex justify-center items-center">
            <Image
              src="/assets/images/wise-logo.svg"
              height={100}
              width={100}
              alt="Wise Admin Logo"
              className="transition-opacity"
            />
          </div>
        </div>

        {/* User Profile Summary */}
        {user && (
          <div className="flex items-center gap-3 p-3 border-b">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center relative">
              <span className="text-neutral-900 font-semibold uppercase">
                {user.email?.charAt(0) || "A"}
              </span>
            </div>
            <div className="overflow-hidden space-y-1 w-[calc(100%-60px)]">
              <p className="font-semibold text-neutral-900 dark:text-white truncate">
                {user.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
                {user.email || "admin@example.com"}
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
          <div className="px-4 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white px-4">
              Main
            </span>
          </div>

          <ul className="space-y-2.5 px-3">
            {/* Dashboard */}
            <li>
              <Link
                href="/admin"
                onClick={() => toggleDropdown("dashboard")}
                className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
    ${
      isDashboardActive() || isDashboardDropdownActive()
        ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
        : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
    }`}
              >
                <div className="flex items-center gap-3">
                  <FaChartPie className="size-5" />
                  <span className="font-medium">Dashboard</span>
                </div>
                <FaChevronRight
                  className={`size-3.5 transition-transform duration-200 ${
                    dashboardDropdownOpen ? "rotate-90" : ""
                  }`}
                />
              </Link>

              {dashboardDropdownOpen && (
                <ul className="mt-2 ml-6 space-y-1 border-l-2 pl-4">
                  {/* Demo 1 */}
                  <li>
                    <Link
                      href="/admin/dashboard/demo1"
                      className={`block px-4 py-2.5 rounded-md transition-all duration-200
                      ${
                        isActive("/admin/dashboard/demo1")
                          ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
                          : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                      }`}
                    >
                      Demo 1
                    </Link>
                  </li>
                  {/* Demo 2 */}
                  <li>
                    <Link
                      href="/admin/dashboard/demo2"
                      className={`block px-4 py-2.5 rounded-md transition-all duration-200
                      ${
                        isActive("/admin/dashboard/demo2")
                          ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
                          : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                      }`}
                    >
                      Demo 2
                    </Link>
                  </li>
                  {/* Demo 3 */}
                  <li>
                    <Link
                      href="/admin/dashboard/demo3"
                      className={`block px-4 py-2.5 rounded-md transition-all duration-200
                      ${
                        isActive("/admin/dashboard/demo3")
                          ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
                          : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                      }`}
                    >
                      Demo 3
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Currencies */}
            <li>
              <Link
                href="/admin/currencies"
                className={`flex items-center gap-3 px-4 py-3 rounded-4xl transition-all duration-200
                ${
                  isActive("/admin/currencies")
                    ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                }`}
              >
                <FaCoins className="size-5" />
                <span className="font-medium">Currencies</span>
              </Link>
            </li>

            {/* Users */}
            <li>
              <Link
                href="/admin/users"
                className={`flex items-center gap-3 px-4 py-3 rounded-4xl transition-all duration-200
                ${
                  isActive("/admin/users")
                    ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                }`}
              >
                <FaUsers className="size-5" />
                <span className="font-medium">Users</span>
              </Link>
            </li>

            {/* Add-Money */}
            <li>
              <Link
                href="/admin/add-money"
                className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
                ${
                  isActive("/admin/add-money")
                    ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IoMdAddCircleOutline className="size-5" />
                  <span className="font-medium">Add-Money</span>
                </div>
              </Link>
            </li>

            {/* Send-Money */}
            <li>
              <Link
                href="/admin/transfer"
                className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
                ${
                  isActive("/admin/transfer")
                    ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaMoneyBillWave className="size-5" />
                  <span className="font-medium">Send-Money</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t space-y-2">
          {/* Theme Toggle for Admin Sidebar */}
          <div className="mb-2 flex justify-center">
            <ThemeToggle location="admin" className="inline-block" />
          </div>
          {/* Logout Button */}
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-4xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
            >
              <FaSignOutAlt className="size-5" />
              <span className="font-medium">Logout</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
