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

"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
import { RiHomeLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { BsSend } from "react-icons/bs";
import { GoArrowUp } from "react-icons/go";
import { VscSignOut } from "react-icons/vsc";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";

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
    label: "Transactions",
    icon: "GrTransaction",
    route: "/dashboard/transactions",
  },
  { label: "Send", icon: "BsSend", route: "/dashboard/send" },
  { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarOpen &&
        isMobileView === true
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
  }, [sidebarOpen, isMobileView, toggleSidebar]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
    if (sidebarOpen && isMobileView) {
      toggleSidebar();
    }
  };

  // Find active menu item
  const activeMenuItem = bottomNavLinksData.find(
    (item) => pathname === item.route
  );

  return (
    <>
      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && isMobileView && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/45 z-10 lg:hidden"
        />
      )}

      {isMobileView === null ||
      isMobileView === false ||
      (sidebarOpen && isMobileView === true) ? (
        <motion.div
          ref={sidebarRef}
          className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:z-0 z-20 ${
            isMobileView ? "" : "translate-x-0"
          } ${
            sidebarOpen && isMobileView
              ? "translate-x-0"
              : isMobileView
              ? "-translate-x-full"
              : "translate-x-0"
          }`}
          initial={isMobileView ? { x: "-100%" } : {}}
          animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
          exit={isMobileView ? { x: "-100%" } : {}}
          transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
        >
          <div className="flex flex-col items-center justify-center lg:h-28 h-20">
            <Link href="/dashboard">
              <Image
                src="/assets/images/wise-logo.svg"
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="h-[calc(100%-112px)] overflow-y-auto">
            <nav>
              {navLinksData.map((item: NavLink) => {
                const IconComponent = icons[item.icon];
                const isActive = pathname === item.route;

                return (
                  <Link
                    key={item.route}
                    href={item.route}
                    onClick={(e) => {
                      if (sidebarOpen && isMobileView) {
                        toggleSidebar();
                      }
                    }}
                    className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
                      isActive
                        ? "bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
                        : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 py-3 group px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer"
            >
              <VscSignOut className="w-6 h-6 group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary" />
              <span className="text-gray font-medium group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary">
                Logout
              </span>
            </button>
          </div>
        </motion.div>
      ) : null}

      {/* Small screen bottom navigation bar with animation - Design 1 */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t">
        <motion.div
          className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {bottomNavLinksData.map((item: NavLink) => {
            const IconComponent = icons[item.icon];
            const isActive = pathname === item.route;

            return (
              <Link
                key={item.route}
                href={item.route}
                className="flex relative flex-col items-center justify-center space-y-1 py-3"
              >
                {isActive && (
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary"
                      layoutId="bottom-nav-indicator"
                    />
                  )}
                <motion.div
                  className={` p-2 rounded-md ${
                    isActive
                      ? "text-primary"
                      : "text-neutral-500 dark:text-gray-300"
                  }`}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 }}
                  layout
                >
                  <IconComponent className="size-6" />
                  
                </motion.div>
                <span
                  className={`text-xs font-medium ${
                    isActive
                      ? "text-neutral-900 dark:text-primary"
                      : "text-neutral-500 dark:text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;
