// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc"; // No longer needed
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../hooks/useAuth"; // Import useAuth hook

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   {
//     label: "beneficiaries",
//     icon: "FiUserPlus",
//     route: "/dashboard/beneficiaries",
//   },
//   { label: "settings", icon: "FiSettings", route: "/dashboard/settings" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname(); // Get current route
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { logout } = useAuth(); // Get logout function from useAuth

//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
//     checkMobileView();
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   const handleLogout = () => {
//     // Removed event parameter - button onClick doesn't need it directly
//     logout(); // Call the logout function from AuthContext
//     router.push("/auth/login"); // Redirect to login page after logout
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar(); // Close sidebar on mobile after logout
//     }
//   };

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-10 lg:hidden"
//         />
//       )}

//       {isMobileView === null ||
//       isMobileView === false ||
//       (sidebarOpen && isMobileView === true) ? (
//         <motion.div
//           ref={sidebarRef}
//           className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:z-0 z-20 ${
//             isMobileView ? "" : "translate-x-0"
//           } ${
//             sidebarOpen && isMobileView
//               ? "translate-x-0"
//               : isMobileView
//               ? "-translate-x-full"
//               : "translate-x-0"
//           }`}
//           initial={isMobileView ? { x: "-100%" } : {}}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
//           exit={isMobileView ? { x: "-100%" } : {}}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
//         >
//           <div className="flex flex-col items-center justify-center lg:h-28 h-20">
//             <Link href="/dashboard">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//               />
//             </Link>
//           </div>
//           <div className="h-[calc(100%-112px)] overflow-y-auto">
//             <nav>
//               {navLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     onClick={(e) => {
//                       if (sidebarOpen && isMobileView) {
//                         toggleSidebar();
//                       }
//                     }}
//                     className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                       isActive
//                         ? "bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                     }`}
//                   >
//                     {IconComponent && <IconComponent className="w-6 h-6" />}
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>

//             <button
//               onClick={handleLogout} // Call handleLogout function on click
//               className="w-full flex items-center space-x-3 py-3 group px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer" // Added absolute positioning and p-4 for padding
//             >
//               <VscSignOut className="w-6 h-6 group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary" />
//               <span className="text-gray font-medium group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       ) : null}

//       {/* Small screen bottom sidebar */}
//       <div className="sm:hidden fixed bottom-0 left-0 w-full border-t border-lightgray bg-white flex justify-center items-center space-x-6 py-4 z-20">
//         {bottomNavLinksData.map((item: NavLink) => {
//           const IconComponent = icons[item.icon];
//           const isActive = pathname === item.route;

//           return (
//             <Link
//               key={item.route}
//               href={item.route}
//               className={`flex flex-col items-center justify-center ${
//                 isActive
//                   ? "text-primary"
//                   : "text-gray-500 hover:text-neutral-800"
//               }`}
//             >
//               {IconComponent && <IconComponent className="size-5 mb-2" />}
//               <span className="text-xs capitalize">{item.label}</span>
//             </Link>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../hooks/useAuth";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
//     checkMobileView();
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // Find active menu item
//   const activeMenuItem = bottomNavLinksData.find(
//     (item) => pathname === item.route
//   );

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-10 lg:hidden"
//         />
//       )}

//       {isMobileView === null ||
//       isMobileView === false ||
//       (sidebarOpen && isMobileView === true) ? (
//         <motion.div
//           ref={sidebarRef}
//           className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:z-0 z-20 ${
//             isMobileView ? "" : "translate-x-0"
//           } ${
//             sidebarOpen && isMobileView
//               ? "translate-x-0"
//               : isMobileView
//               ? "-translate-x-full"
//               : "translate-x-0"
//           }`}
//           initial={isMobileView ? { x: "-100%" } : {}}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
//           exit={isMobileView ? { x: "-100%" } : {}}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
//         >
//           <div className="flex flex-col items-center justify-center lg:h-28 h-20">
//             <Link href="/dashboard">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//               />
//             </Link>
//           </div>
//           <div className="h-[calc(100%-112px)] overflow-y-auto">
//             <nav>
//               {navLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     onClick={(e) => {
//                       if (sidebarOpen && isMobileView) {
//                         toggleSidebar();
//                       }
//                     }}
//                     className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                       isActive
//                         ? "bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                     }`}
//                   >
//                     {IconComponent && <IconComponent className="w-6 h-6" />}
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 py-3 group px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer"
//             >
//               <VscSignOut className="w-6 h-6 group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary" />
//               <span className="text-gray font-medium group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       ) : null}

//       {/* Small screen bottom navigation bar - Fixed to show only active menu name */}
//       <div className="sm:hidden fixed bottom-0 left-0 w-full z-20 px-3 pb-3">
//         <div className="flex items-center justify-center border bg-background rounded-4xl p-2">
//           <div className="flex items-center justify-between w-full">
//             {bottomNavLinksData.map((item: NavLink) => {
//               const IconComponent = icons[item.icon];
//               const isActive = pathname === item.route;

//               return (
//                 <Link
//                   key={item.route}
//                   href={item.route}
//                   className="flex items-center justify-center"
//                 >
//                   <div
//                     className={`flex gap-2 items-center p-2.5 rounded-4xl ${
//                       isActive ? "bg-primary" : "text-neutral-900"
//                     }`}
//                   >
//                     <IconComponent
//                       className={`size-6 ${
//                         isActive ? "text-neutral-900" : "text-white"
//                       }`}
//                     />
//                     {isActive && (
//                       <span className="font-medium text-neutral-900">
//                         {item.label}
//                       </span>
//                     )}
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../hooks/useAuth";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const [prevPathname, setPrevPathname] = useState<string | null>(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
//     checkMobileView();
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   useEffect(() => {
//     if (pathname !== prevPathname) {
//       setPrevPathname(pathname);
//     }
//   }, [pathname, prevPathname]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // Find active menu item index for animation
//   const activeIndex = bottomNavLinksData.findIndex(
//     (item) => pathname === item.route
//   );

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-10 lg:hidden"
//         />
//       )}

//       {isMobileView === null ||
//       isMobileView === false ||
//       (sidebarOpen && isMobileView === true) ? (
//         <motion.div
//           ref={sidebarRef}
//           className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:z-0 z-20 ${
//             isMobileView ? "" : "translate-x-0"
//           } ${
//             sidebarOpen && isMobileView
//               ? "translate-x-0"
//               : isMobileView
//               ? "-translate-x-full"
//               : "translate-x-0"
//           }`}
//           initial={isMobileView ? { x: "-100%" } : {}}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
//           exit={isMobileView ? { x: "-100%" } : {}}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
//         >
//           <div className="flex flex-col items-center justify-center lg:h-28 h-20">
//             <Link href="/dashboard">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//               />
//             </Link>
//           </div>
//           <div className="h-[calc(100%-112px)] overflow-y-auto">
//             <nav>
//               {navLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     onClick={(e) => {
//                       if (sidebarOpen && isMobileView) {
//                         toggleSidebar();
//                       }
//                     }}
//                     className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                       isActive
//                         ? "bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                     }`}
//                   >
//                     {IconComponent && <IconComponent className="w-6 h-6" />}
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 py-3 group px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer"
//             >
//               <VscSignOut className="w-6 h-6 group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary" />
//               <span className="text-gray font-medium group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       ) : null}

//       {/* Enhanced small screen bottom navigation bar */}
//       <AnimatePresence>
//         <motion.div
//           className="sm:hidden fixed bottom-0 left-0 w-full z-20 px-3 pb-3"
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{
//             type: "spring",
//             stiffness: 300,
//             damping: 25,
//             delay: 0.1
//           }}
//         >
//           <motion.div
//             className="flex items-center justify-center border bg-background rounded-4xl p-2"
//             initial={{ scale: 0.95, opacity: 0.8 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex items-center justify-between w-full relative">
//               {/* Background indicator that slides between active items */}
//               <motion.div
//                 className="absolute bg-primary rounded-4xl h-11 z-0"
//                 initial={false}
//                 animate={{
//                   left: `${(activeIndex * 25)}%`,
//                   width: bottomNavLinksData[activeIndex]?.label ? '25%' : '0%'
//                 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 500,
//                   damping: 30
//                 }}
//               />

//               {bottomNavLinksData.map((item: NavLink, index) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     className="flex items-center justify-center relative z-10 w-1/4"
//                   >
//                     <motion.div
//                       className="flex items-center justify-center gap-2 p-2.5 w-full rounded-4xl"
//                       whileTap={{ scale: 0.92 }}
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ type: "spring", stiffness: 400, damping: 17 }}
//                     >
//                       <motion.div
//                         initial={{ rotate: 0 }}
//                         animate={isActive ? { rotate: [0, -10, 10, -5, 5, 0] } : { rotate: 0 }}
//                         transition={isActive ? {
//                           duration: 0.5,
//                           delay: 0.1,
//                           ease: "easeInOut",
//                           times: [0, 0.2, 0.4, 0.6, 0.8, 1]
//                         } : {}}
//                       >
//                         <IconComponent
//                           className={`size-6 transition-colors duration-300 ${
//                             isActive ? "text-neutral-900" : "text-white"
//                           }`}
//                         />
//                       </motion.div>
//                       <AnimatePresence>
//                         {isActive && (
//                           <motion.span
//                             className="font-medium text-neutral-900 whitespace-nowrap overflow-hidden"
//                             initial={{ opacity: 0, width: 0, x: -10 }}
//                             animate={{ opacity: 1, width: "auto", x: 0 }}
//                             exit={{ opacity: 0, width: 0, x: 10 }}
//                             transition={{ duration: 0.3, ease: "easeOut" }}
//                           >
//                             {item.label}
//                           </motion.span>
//                         )}
//                       </AnimatePresence>
//                     </motion.div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
//     checkMobileView();
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // Find active menu item
//   const activeMenuItem = bottomNavLinksData.find(
//     (item) => pathname === item.route
//   );

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-10 lg:hidden"
//         />
//       )}

//       {isMobileView === null ||
//       isMobileView === false ||
//       (sidebarOpen && isMobileView === true) ? (
//         <motion.div
//           ref={sidebarRef}
//           className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:z-0 z-20 px-4 ${
//             isMobileView ? "" : "translate-x-0"
//           } ${
//             sidebarOpen && isMobileView
//               ? "translate-x-0"
//               : isMobileView
//               ? "-translate-x-full"
//               : "translate-x-0"
//           }`}
//           initial={isMobileView ? { x: "-100%" } : {}}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
//           exit={isMobileView ? { x: "-100%" } : {}}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
//         >
//           <div className="flex flex-col items-center justify-center lg:h-28 h-20">
//             <Link href="/dashboard">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//               />
//             </Link>
//           </div>
//           <div className="h-[calc(100%-112px)] overflow-y-auto [&::-webkit-scrollbar-track]:rounded-t-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-t-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//             <nav>
//               {navLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     onClick={(e) => {
//                       if (sidebarOpen && isMobileView) {
//                         toggleSidebar();
//                       }
//                     }}
//                     className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                       isActive
//                         ? "bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                     }`}
//                   >
//                     {IconComponent && <IconComponent className="w-6 h-6" />}
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 py-3 group px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer"
//             >
//               <VscSignOut className="w-6 h-6 group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary" />
//               <span className="text-gray font-medium group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       ) : null}

//       {/* Small screen bottom navigation bar with animation - Design 1 */}
//       <div className="sm:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t">
//         <motion.div
//           className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none"
//           initial={{ y: 100 }}
//           animate={{ y: 0 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//         >
//           {bottomNavLinksData.map((item: NavLink) => {
//             const IconComponent = icons[item.icon];
//             const isActive = pathname === item.route;

//             return (
//               <Link
//                 key={item.route}
//                 href={item.route}
//                 className="flex relative flex-col items-center justify-center space-y-1 py-3"
//               >
//                 {isActive && (
//                     <motion.div
//                       className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary"
//                       layoutId="bottom-nav-indicator"
//                     />
//                   )}
//                 <motion.div
//                   className={` p-2 rounded-md ${
//                     isActive
//                       ? "text-primary"
//                       : "text-neutral-500 dark:text-gray-300"
//                   }`}
//                   whileTap={{ scale: 0.9 }}
//                   initial={{ scale: 1 }}
//                   animate={{ scale: 1 }}
//                   layout
//                 >
//                   <IconComponent className="size-6" />
                  
//                 </motion.div>
//                 <span
//                   className={`text-xs font-medium ${
//                     isActive
//                       ? "text-neutral-900 dark:text-primary"
//                       : "text-neutral-500 dark:text-gray-400"
//                   }`}
//                 >
//                   {item.label}
//                 </span>
//               </Link>
//             );
//           })}
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024); // Use 1024 to match lg breakpoint
//     checkMobileView();
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true // Only close on outside click if mobile view is true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // Determine if the full sidebar should be rendered
//   // Render if:
//   // 1. isMobileView is null (initial state)
//   // 2. isMobileView is false (desktop view)
//   // 3. isMobileView is true AND sidebarOpen is true (mobile view, sidebar is open)
//   const shouldRenderFullSidebar =
//     isMobileView === null || !isMobileView || (isMobileView && sidebarOpen);

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-20 lg:hidden"
//           aria-hidden="true" // Good for accessibility
//         />
//       )}

//       {/* --- Full Sidebar (Desktop / Mobile Open) --- */}
//       {shouldRenderFullSidebar && (
//         <motion.div
//           ref={sidebarRef}
//           className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:translate-x-0 z-30 px-4 flex flex-col ${
//             isMobileView ? "" : "translate-x-0" // No translate needed for desktop
//           }`}
//           // Animate only on mobile
//           initial={isMobileView ? { x: "-100%" } : { x: 0 }}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : { x: 0 }}
//           exit={isMobileView ? { x: "-100%" } : { x: 0 }}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}} // Only transition on mobile
//         >
//           {/* Logo Area */}
//           <div className="flex-shrink-0 flex items-center justify-center lg:h-28 h-20">
//             <Link href="/dashboard">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//                 priority // Good practice for LCP elements like logos
//               />
//             </Link>
//           </div>

//           {/* Scrollable Nav Area */}
//           <div className="px-2 h-[calc(100%-112px)] overflow-y-auto [&::-webkit-scrollbar-track]:rounded-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//             <nav>
//               {" "}
//               {/* Use space-y for consistent spacing */}
//               {navLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     onClick={(e) => {
//                       // Close mobile sidebar on navigation
//                       if (isMobileView && sidebarOpen) {
//                         toggleSidebar();
//                       }
//                     }}
//                     // Make the Link itself relative for positioning the animated background
//                     //  w-full flex items-center py-3 px-4 font-medium rounded-full transition duration-200 mb-2
//                     className={`relative w-full flex items-center gap-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                       isActive
//                         ? "lg:bg-transparent dark:lg:bg-transparent bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary" // Active text color
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary" // Inactive text color
//                     }`}
//                   >
//                     {/* Animated Background - only rendered when active */}
//                     {isActive &&
//                       !isMobileView && ( // Only show animation on desktop
//                         <motion.div
//                           layoutId="active-desktop-sidebar-indicator" // Unique ID for the layout animation
//                           className="absolute inset-0 rounded-full bg-primary/60 dark:bg-primarybox z-0" // Background styling
//                           initial={false} // Prevent initial animation on load if desired
//                           transition={{
//                             // Customize animation feel
//                             type: "spring",
//                             stiffness: 250,
//                             damping: 30,
//                           }}
//                         />
//                       )}

//                     {/* Ensure Icon and Text are above the background */}
//                     {IconComponent && (
//                       <IconComponent className="w-6 h-6 relative z-10" />
//                     )}
//                     <span className="relative z-10">{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>
//             {/* Logout Button Area (at the bottom) */}

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//             >
//               <VscSignOut className="w-6 h-6" />
//               <span className="font-medium">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       )}

//       {/* --- Small screen bottom navigation bar --- */}
//       {!shouldRenderFullSidebar &&
//         isMobileView && ( // Only show bottom nav when full sidebar isn't shown on mobile
//           <div className="sm:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t">
//             <motion.div
//               className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none"
//               initial={{ y: 100 }}
//               animate={{ y: 0 }}
//               transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             >
//               {bottomNavLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     className="flex relative flex-col items-center justify-center space-y-1 py-3"
//                   >
//                     {isActive && (
//                       <motion.div
//                         className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary"
//                         layoutId="bottom-nav-indicator"
//                       />
//                     )}
//                     <motion.div
//                       className={` p-2 rounded-md ${
//                         isActive
//                           ? "text-primary"
//                           : "text-neutral-500 dark:text-gray-300"
//                       }`}
//                       whileTap={{ scale: 0.9 }}
//                       initial={{ scale: 1 }}
//                       animate={{ scale: 1 }}
//                       layout
//                     >
//                       <IconComponent className="size-6" />
//                     </motion.div>
//                     <span
//                       className={`text-xs font-medium ${
//                         isActive
//                           ? "text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 dark:text-gray-400"
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </motion.div>
//           </div>
//         )}
//     </>
//   );
// };

// export default Sidebar;










// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard, // Added back if needed, otherwise remove
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// // Simplified bottom nav links, maybe just the core ones
// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Activity", // Maybe shorter label for mobile
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   // Initialize isMobileView to null for server-side rendering compatibility
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { logout } = useAuth();

//   // --- Effect to detect screen size ---
//   useEffect(() => {
//     const checkMobileView = () => {
//       // Ensure window is defined (for SSR safety, though 'use client' helps)
//       if (typeof window !== "undefined") {
//         setIsMobileView(window.innerWidth < 1024); // lg breakpoint
//       }
//     };
//     checkMobileView(); // Initial check
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

//   // --- Effect for closing sidebar on outside click (only on mobile) ---
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       // Only act if the sidebar is open, it's mobile view, and the click is outside the sidebar element
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true // Explicitly check for true
//       ) {
//         toggleSidebar();
//       }
//     };

//     // Add listener only when needed
//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       // Clean up listener if sidebar closes or view changes
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     // Cleanup function for when the component unmounts or dependencies change
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]); // Dependencies: effect reruns if these change

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     // Close sidebar if it's open on mobile after logout
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // --- Determine which navigation to render ---
//   // Render full sidebar if not mobile OR if mobile and sidebar is open
//   const renderFullSidebar = !isMobileView || (isMobileView && sidebarOpen);
//   // Render bottom nav ONLY if mobile AND full sidebar is closed
//   const renderBottomNav = isMobileView && !sidebarOpen;

//   // Avoid rendering anything until isMobileView is determined
//   if (isMobileView === null) {
//     return null; // Or a loading indicator/skeleton
//   }

//   return (
//     <>
//       {/* --- Backdrop for mobile sidebar --- */}
//       {/* AnimatePresence allows the exit animation */}
//       <AnimatePresence>
//         {sidebarOpen && isMobileView && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={toggleSidebar}
//             className="fixed inset-0 bg-black/45 z-20 lg:hidden"
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       {/* --- Full Sidebar (Desktop / Mobile Open) --- */}
//       {/* Use AnimatePresence for smooth transitions between sidebar states */}
//       <AnimatePresence>
//         {renderFullSidebar && (
//           <motion.div
//             key="full-sidebar" // Key is important for AnimatePresence
//             ref={sidebarRef}
//             className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:translate-x-0 z-30 px-4 flex flex-col`}
//             // Animate only on mobile
//             initial={isMobileView ? { x: "-100%" } : { x: 0 }}
//             animate={{ x: 0 }} // Always animate to x: 0 when present
//             exit={isMobileView ? { x: "-100%" } : { x: 0 }} // Animate out only on mobile
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//           >
//             {/* Logo Area */}
//             <div className="flex-shrink-0 flex items-center justify-center lg:h-28 h-20">
//               <Link href="/dashboard" className="inline-block">
//                 <Image
//                   src="/assets/images/wise-logo.svg" // Ensure path is correct
//                   alt="logo"
//                   width={100}
//                   height={100} // Adjust height as needed
//                   priority
//                 />
//               </Link>
//             </div>

//             {/* Scrollable Nav Area */}
//             {/* Adjusted padding and height calculation */}
//             <div className="p-2 h-[calc(100%-112px)] overflow-y-auto [&::-webkit-scrollbar-track]:rounded-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//               <nav>
//                 {" "}
//                 {/* Nav takes available space */}
//                 {navLinksData.map((item: NavLink) => {
//                   const IconComponent = icons[item.icon];
//                   const isActive =
//                     pathname === item.route ||
//                     (item.route !== "/dashboard" &&
//                       pathname.startsWith(item.route)); // Better active check

//                   return (
//                     <Link
//                       key={item.route}
//                       href={item.route}
//                       onClick={() => {
//                         // Use arrow function for clarity
//                         // Close mobile sidebar on navigation
//                         if (isMobileView && sidebarOpen) {
//                           toggleSidebar();
//                         }
//                       }}
//                       className={`relative w-full flex items-center gap-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                         // Use rounded-lg, mb-1
//                         isActive
//                           ? "lg:bg-transparent dark:lg:bg-transparent bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary" // Active text color
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary" // Inactive colors and hover background
//                       }`}
//                     >
//                       {/* Animated Background - shown on active */}
//                       {isActive && (
//                         <motion.div
//                           layoutId="active-sidebar-indicator" // Unique ID for the layout animation
//                           className="absolute inset-0 rounded-full bg-primary/60 dark:bg-primarybox z-0" // Lighter background
//                           initial={false}
//                           transition={{
//                             type: "spring",
//                             stiffness: 250,
//                             damping: 30,
//                           }}
//                         />
//                       )}

//                       {/* Ensure Icon and Text are above the background */}
//                       {IconComponent && (
//                         <IconComponent className="w-6 h-6 relative z-10" />
//                       )}
//                       <span className="relative z-10">{item.label}</span>
//                     </Link>
//                   );
//                 })}
//               </nav>

//               <div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 >
//                   <VscSignOut className="w-6 h-6" />
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Use AnimatePresence for smooth appearance/disappearance */}
//       {/* --- Small screen bottom navigation bar --- */}
//       <AnimatePresence>
//         {renderBottomNav && (
//           <motion.div
//             key="bottom-nav" // Key is important for AnimatePresence
//             className="lg:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t" // Use z-40, less than sidebar
//             initial={{ y: "100%" }} // Start below screen
//             animate={{ y: 0 }} // Animate to y: 0
//             exit={{ y: "100%" }} // Animate out below screen
//             transition={{ type: "spring", stiffness: 300, damping: 30 }} // Spring animation
//           >
//             <div className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none">
//               {" "}
//               {/* Reduced padding */}
//               {bottomNavLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive =
//                   pathname === item.route ||
//                   (item.route !== "/dashboard" &&
//                     pathname.startsWith(item.route)); // Better active check

//                 return (
//                   <Link
//                     key={`bottom-${item.route}`} // Ensure unique key
//                     href={item.route}
//                     className="flex relative flex-col items-center justify-center space-y-1 py-3" // Use flex-1 to distribute space, py-2
//                   >
//                     {/* Active Indicator (Top Line) */}
//                     {isActive && (
//                       <motion.div
//                         className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary" // Thinner, shorter indicator
//                         layoutId="bottom-nav-indicator" // Shared layout ID for animation
//                         initial={false}
//                         transition={{
//                           type: "spring",
//                           stiffness: 400,
//                           damping: 35,
//                         }}
//                       />
//                     )}

//                     {/* Icon container for potential background/tap effects */}
//                     <motion.div
//                       className={`p-1 rounded-md ${
//                         // Smaller padding
//                         isActive
//                           ? "text-primary"
//                           : "text-neutral-500 dark:text-gray-300"
//                       }`}
//                       whileTap={{ scale: 0.9 }}
//                       initial={{ scale: 1 }}
//                       animate={{ scale: 1 }}
//                       layout
//                     >
//                       {IconComponent && <IconComponent className="size-5" />}{" "}
//                       {/* Smaller icon */}
//                     </motion.div>

//                     {/* Label */}
//                     <span
//                       className={`text-xs font-medium ${
//                         // Smaller text, closer margin
//                         isActive
//                           ? "text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 dark:text-gray-300"
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Sidebar;





"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
import { RiHomeLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { BsSend } from "react-icons/bs";
import { GoArrowUp } from "react-icons/go";
import { VscSignOut } from "react-icons/vsc";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface NavLink {
  label: string;
  icon: keyof typeof icons;
  route: string;
}

const icons = {
  RiHomeLine,
  GrTransaction,
  BsSend,
  GoArrowUp,
  FiCreditCard,
  FiUserPlus,
  FiSettings,
};

const navLinksData: NavLink[] = [
  { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
  {
    label: "Transactions",
    icon: "GrTransaction",
    route: "/dashboard/transactions",
  },
  { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
  { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
  {
    label: "Recipients",
    icon: "FiUserPlus",
    route: "/dashboard/recipients",
  },
  { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
];

const bottomNavLinksData: NavLink[] = [
  { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
  {
    label: "Activity",
    icon: "GrTransaction",
    route: "/dashboard/transactions",
  },
  { label: "Send", icon: "BsSend", route: "/dashboard/send" },
  { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
];

// Tailwind CSS breakpoints (default):
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
const LG_BREAKPOINT = 1024;
const SM_BREAKPOINT = 640; // Define the small breakpoint

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  // State for general mobile view (affects sidebar behavior like sliding)
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
  // State specifically for small screens (controls bottom nav visibility)
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);
  const { logout } = useAuth();

  // --- Effect to detect screen size (sets both states) ---
  useEffect(() => {
    const checkScreenSizes = () => {
      if (typeof window !== "undefined") {
        const currentWidth = window.innerWidth;
        setIsMobileView(currentWidth < LG_BREAKPOINT); // Mobile view below 1024px
        setIsSmallScreen(currentWidth < SM_BREAKPOINT); // Small screen below 640px
      }
    };
    checkScreenSizes(); // Initial check
    window.addEventListener("resize", checkScreenSizes);
    return () => window.removeEventListener("resize", checkScreenSizes);
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  // --- Effect for closing sidebar on outside click (uses isMobileView) ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only act if the sidebar is open, it's mobile view (<1024px), and the click is outside
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarOpen &&
        isMobileView === true // Use isMobileView for sidebar interaction behavior
      ) {
        toggleSidebar();
      }
    };

    if (sidebarOpen && isMobileView === true) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, isMobileView, toggleSidebar]); // Depends on sidebarOpen and isMobileView

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
    // Close sidebar if it's open on mobile after logout
    if (sidebarOpen && isMobileView) {
      toggleSidebar();
    }
  };

  // --- Determine which navigation to render ---
  // Render full sidebar if not mobile view (<1024px) OR if mobile view AND sidebar is open
  const renderFullSidebar = !isMobileView || (isMobileView && sidebarOpen);
  // Render bottom nav ONLY if on a small screen (<640px) AND full sidebar is closed
  const renderBottomNav = isSmallScreen && !sidebarOpen; // Use isSmallScreen here

  // Avoid rendering anything until screen sizes are determined
  if (isMobileView === null || isSmallScreen === null) {
    return null; // Or a loading indicator/skeleton
  }

  return (
    <>
      {/* --- Backdrop for mobile sidebar (controlled by isMobileView) --- */}
      <AnimatePresence>
        {sidebarOpen && isMobileView && ( // Backdrop appears below 1024px when sidebar is open
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 dark:bg-white/30 z-20 lg:hidden" // lg:hidden ensures it's only for mobile views
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* --- Full Sidebar (Desktop / Mobile Open) --- */}
      <AnimatePresence>
        {renderFullSidebar && (
          <motion.div
            key="full-sidebar"
            ref={sidebarRef}
            className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:translate-x-0 lg:z-0 z-30 px-4 flex flex-col`}
            // Animate only on mobile view (<1024px)
            initial={isMobileView ? { x: "-100%" } : { x: 0 }}
            animate={{ x: 0 }}
            exit={isMobileView ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Logo Area */}
            <div className="flex-shrink-0 flex items-center justify-center lg:h-28 h-20">
              <Link href="/dashboard" className="inline-block">
                <Image
                  src="/assets/images/wise-logo.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  priority
                />
              </Link>
            </div>

            {/* Scrollable Nav Area */}
            <div className="p-2 h-[calc(100%-112px)] overflow-y-auto [&::-webkit-scrollbar-track]:rounded-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
              <nav>
                {navLinksData.map((item: NavLink) => {
                  const IconComponent = icons[item.icon];
                  const isActive =
                    pathname === item.route ||
                    (item.route !== "/dashboard" &&
                      pathname.startsWith(item.route));

                  return (
                    <Link
                      key={item.route}
                      href={item.route}
                      onClick={() => {
                        // Close mobile sidebar on navigation if it's open (<1024px)
                        if (isMobileView && sidebarOpen) {
                          toggleSidebar();
                        }
                      }}
                      className={`relative w-full flex items-center gap-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
                        isActive
                          ? "lg:bg-transparent dark:lg:bg-transparent bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
                          : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-sidebar-indicator"
                          className="absolute inset-0 rounded-full bg-primary/60 dark:bg-primarybox "
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 30,
                          }}
                        />
                      )}
                      {IconComponent && (
                        <IconComponent className="w-6 h-6 relative z-10" />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                >
                  <VscSignOut className="w-6 h-6" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Small screen bottom navigation bar (Rendered only if isSmallScreen (<640px) and sidebar closed) --- */}
      <AnimatePresence>
        {renderBottomNav && ( // Condition updated to use isSmallScreen
          <motion.div
            key="bottom-nav"
            // lg:hidden still prevents it from *ever* showing >= 1024px via CSS,
            // but the JS `renderBottomNav` condition handles the <640px logic.
            className="sm:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none">
              {bottomNavLinksData.map((item: NavLink) => {
                const IconComponent = icons[item.icon];
                const isActive =
                  pathname === item.route ||
                  (item.route !== "/dashboard" &&
                    pathname.startsWith(item.route));

                return (
                  <Link
                    key={`bottom-${item.route}`}
                    href={item.route}
                    className="flex relative flex-col items-center justify-center space-y-1 py-3"
                  >
                    {isActive && (
                      <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary"
                        layoutId="bottom-nav-indicator"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                    <motion.div
                      className={`p-1 rounded-md ${
                        isActive
                          ? "text-primary"
                          : "text-neutral-500 dark:text-gray-300"
                      }`}
                      whileTap={{ scale: 0.9 }}
                      initial={{ scale: 1 }}
                      animate={{ scale: 1 }}
                      layout
                    >
                      {IconComponent && <IconComponent className="size-5" />}
                    </motion.div>
                    <span
                      className={`text-xs font-medium ${
                        isActive
                          ? "text-neutral-900 dark:text-primary"
                          : "text-neutral-500 dark:text-gray-300"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;