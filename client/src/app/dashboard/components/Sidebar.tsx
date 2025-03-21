// // components/Sidebar.tsx
// "use client";
// import React from "react";
// import {
//   FiX,
//   FiUser,
//   FiHome,
//   FiList,
//   FiSend,
//   FiArrowDown,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
//   FiLogOut,
// } from "react-icons/fi";
// import Image from "next/image";
// import logo from "../../../../public/assets/icons/logo.svg";
// import Link from "next/link"; // Import Link
// import { useRouter } from 'next/navigation'; // Import useRouter

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
//   activeSection: string;
//   setActiveSection: (section: string) => void;
//   setSendModalOpen: (open: boolean) => void;
//   setAddMoneyModalOpen: (open: boolean) => void;
// }

// // Define a type for the nav link data
// interface NavLink {
//   label: string;
//   icon: keyof typeof icons; // Use keyof typeof to ensure icon is a valid key in 'icons'
//   section: string;
//   route: string; // Add route property
//   modal?: 'send' | 'add';
// }

// // Group icons for easier access in mapping
// const icons = {
//   FiHome,
//   FiList,
//   FiSend,
//   FiArrowDown,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
//   FiLogOut,
// };

// // Inline JSON data for nav links with routes
// const navLinksData: NavLink[] = [
//   {
//     "label": "Dashboard",
//     "icon": "FiHome",
//     "section": "dashboard",
//     "route": "/dashboard" // Example route, adjust as needed
//   },
//   {
//     "label": "Transactions",
//     "icon": "FiList",
//     "section": "transactions",
//     "route": "/dashboard/transactions"
//   },
//   {
//     "label": "Send Money",
//     "icon": "FiSend",
//     "section": "send",
//     "route": "/dashboard/send", // Example route, adjust as needed
//     "modal": "send"
//   },
//   {
//     "label": "Add Money",
//     "icon": "FiArrowDown",
//     "section": "add",
//     "route": "/dashboard/add-money", // Example route, adjust as needed
//     "modal": "add"
//   },
//   {
//     "label": "Beneficiaries",
//     "icon": "FiUserPlus",
//     "section": "beneficiaries",
//     "route": "/dashboard/beneficiaries"
//   },
//   {
//     "label": "Settings",
//     "icon": "FiSettings",
//     "section": "settings",
//     "route": "/dashboard/settings"
//   },
//   {
//     "label": "Logout",
//     "icon": "FiLogOut",
//     "section": "logout",
//     "route": "/" // Root route for logout
//   }
// ];

// const Sidebar: React.FC<SidebarProps> = ({
//   sidebarOpen,
//   toggleSidebar,
//   activeSection,
//   setActiveSection,
//   setSendModalOpen,
//   setAddMoneyModalOpen,
// }) => {
//   const router = useRouter(); // Initialize useRouter

//   return (
//     <div
//       className={`bg-white w-72 lg:sticky absolute inset-y-0 left-0 transform ${
//         sidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-30`}
//     >
//       <div className="p-6">
//         <div className="flex items-center justify-center">
//           <div className="">
//             <Image src={logo} alt="logo" />
//           </div>
//           <button
//             onClick={toggleSidebar}
//             className="lg:hidden p-1 rounded-full hover:bg-green/10"
//           >
//             <FiX size={20} />
//           </button>
//         </div>
//       </div>

//       <nav className="space-y-2 p-4">
//         {navLinksData.map((item: NavLink) => {
//           const IconComponent = icons[item.icon]; // Dynamically get the icon component
//           return (
//             <Link // Use Link tag
//               key={item.section}
//               href={item.route} // Set href from navLinksData.route
//               onClick={(e) => { // Add onClick handler to manage state and modals
//                 setActiveSection(item.section);
//                 if (item.modal === 'send') {
//                   setSendModalOpen(true);
//                 } else if (item.modal === 'add') {
//                   setAddMoneyModalOpen(true);
//                 }
//                 // Optionally close sidebar on mobile after navigation
//                 if (!sidebarOpen) {
//                   toggleSidebar();
//                 }
//                 if (item.section === 'logout') {
//                   e.preventDefault(); // Prevent default Link behavior for logout
//                   // Perform logout logic here (e.g., clear tokens, redirect)
//                   // For now, just redirect to the root route using useRouter
//                   router.push('/');
//                 }
//               }}
//               className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 block ${ // Use 'block' for full width link
//                 activeSection === item.section
//                   ? "bg-green/10 text-green "
//                   : "text-gray hover:text-green"
//               }`}
//             >
//               {IconComponent && <IconComponent size={20} />}
//               <span>{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

// // components/Sidebar.tsx
// "use client";
// import React, { useEffect, useRef } from "react"; // Import useEffect and useRef
// import {
//   FiX, // Removed FiX import
//   FiUser,
//   FiHome,
//   FiList,
//   FiSend,
//   FiArrowDown,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
//   FiLogOut,
// } from "react-icons/fi";
// import Image from "next/image";
// import logo from "../../../../public/assets/icons/logo.svg";
// import Link from "next/link"; // Import Link
// import { useRouter } from "next/navigation"; // Import useRouter

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
//   activeSection: string;
//   setActiveSection: (section: string) => void;
//   setSendModalOpen: (open: boolean) => void;
//   setAddMoneyModalOpen: (open: boolean) => void;
// }

// // Define a type for the nav link data
// interface NavLink {
//   label: string;
//   icon: keyof typeof icons; // Use keyof typeof to ensure icon is a valid key in 'icons'
//   section: string;
//   route: string; // Add route property
//   modal?: "send" | "add";
// }

// // Group icons for easier access in mapping
// const icons = {
//   FiHome,
//   FiList,
//   FiSend,
//   FiArrowDown,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
//   FiLogOut,
// };

// // Inline JSON data for nav links with routes
// const navLinksData: NavLink[] = [
//   {
//     label: "Dashboard",
//     icon: "FiHome",
//     section: "dashboard",
//     route: "/dashboard", // Example route, adjust as needed
//   },
//   {
//     label: "Transactions",
//     icon: "FiList",
//     section: "transactions",
//     route: "/dashboard/transactions",
//   },
//   {
//     label: "Send Money",
//     icon: "FiSend",
//     section: "send",
//     route: "/dashboard/send", // Example route, adjust as needed
//     modal: "send",
//   },
//   {
//     label: "Add Money",
//     icon: "FiArrowDown",
//     section: "add",
//     route: "/dashboard/add-money", // Example route, adjust as needed
//     modal: "add",
//   },
//   {
//     label: "Beneficiaries",
//     icon: "FiUserPlus",
//     section: "beneficiaries",
//     route: "/dashboard/beneficiaries",
//   },
//   {
//     label: "Settings",
//     icon: "FiSettings",
//     section: "settings",
//     route: "/dashboard/settings",
//   },
//   {
//     label: "Logout",
//     icon: "FiLogOut",
//     section: "logout",
//     route: "/", // Root route for logout
//   },
// ];

// const Sidebar: React.FC<SidebarProps> = ({
//   sidebarOpen,
//   toggleSidebar,
//   activeSection,
//   setActiveSection,
//   setSendModalOpen,
//   setAddMoneyModalOpen,
// }) => {
//   const router = useRouter(); // Initialize useRouter
//   const sidebarRef = useRef<HTMLDivElement>(null); // Create a ref for the sidebar

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, toggleSidebar]); // Effect dependencies: sidebarOpen and toggleSidebar

//   return (
//     <div
//       ref={sidebarRef} // Attach the ref to the sidebar div
//       className={`bg-white w-72 fixed h-screen inset-y-0 left-0 transform ${
//         sidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-50`}
//     >
//       <div className="border-b">
//         <div className="flex flex-col items-center justify-center h-28">
//           <Image src={logo} alt="logo" />
//           {/* Removed the close button here */}
//         </div>
//       </div>

//       <nav className="space-y-2 p-4">
//         {navLinksData.map((item: NavLink) => {
//           const IconComponent = icons[item.icon]; // Dynamically get the icon component
//           return (
//             <Link // Use Link tag
//               key={item.section}
//               href={item.route} // Set href from navLinksData.route
//               onClick={(e) => {
//                 // Add onClick handler to manage state and modals
//                 setActiveSection(item.section);
//                 if (item.modal === "send") {
//                   setSendModalOpen(true);
//                 } else if (item.modal === "add") {
//                   setAddMoneyModalOpen(true);
//                 }
//                 // Optionally close sidebar on mobile after navigation - keep this for link clicks inside sidebar
//                 if (sidebarOpen && !(window.innerWidth >= 1024)) {
//                   // check if sidebar is open AND screen is not large
//                   toggleSidebar();
//                 }
//                 if (item.section === "logout") {
//                   e.preventDefault(); // Prevent default Link behavior for logout
//                   // Perform logout logic here (e.g., clear tokens, redirect)
//                   // For now, just redirect to the root route using useRouter
//                   router.push("/");
//                 }
//               }}
//               className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 block ${
//                 // Use 'block' for full width link
//                 activeSection === item.section
//                   ? "bg-primary/30 text-secondary"
//                   : "text-gray hover:text-secondary"
//               }`}
//             >
//               {IconComponent && <IconComponent size={20} />}
//               <span>{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

// "use client";
// import React, { useEffect, useRef } from "react";
// import {
//   FiUser,
//   FiHome,
//   FiList,
//   FiSend,
//   FiArrowDown,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
//   FiLogOut,
// } from "react-icons/fi";
// import Image from "next/image";
// import logo from "../../../../public/assets/icons/logo.svg";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
//   activeSection: string;
//   setActiveSection: (section: string) => void;
//   setSendModalOpen: (open: boolean) => void;
//   setAddMoneyModalOpen: (open: boolean) => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   section: string;
//   route: string;
//   modal?: "send" | "add";
// }

// const icons = {
//   FiHome,
//   FiList,
//   FiSend,
//   FiArrowDown,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
//   FiLogOut,
// };

// const navLinksData: NavLink[] = [
//   {
//     label: "Dashboard",
//     icon: "FiHome",
//     section: "dashboard",
//     route: "/dashboard",
//   },
//   {
//     label: "Transactions",
//     icon: "FiList",
//     section: "transactions",
//     route: "/dashboard/transactions",
//   },
//   {
//     label: "Send Money",
//     icon: "FiSend",
//     section: "send",
//     route: "/dashboard/send",
//     modal: "send",
//   },
//   {
//     label: "Add Money",
//     icon: "FiArrowDown",
//     section: "add",
//     route: "/dashboard/add-money",
//     modal: "add",
//   },
//   {
//     label: "Beneficiaries",
//     icon: "FiUserPlus",
//     section: "beneficiaries",
//     route: "/dashboard/beneficiaries",
//   },
//   {
//     label: "Settings",
//     icon: "FiSettings",
//     section: "settings",
//     route: "/dashboard/settings",
//   },
//   {
//     label: "Logout",
//     icon: "FiLogOut",
//     section: "logout",
//     route: "/",
//   },
// ];

// const Sidebar: React.FC<SidebarProps> = ({
//   sidebarOpen,
//   toggleSidebar,
//   activeSection,
//   setActiveSection,
//   setSendModalOpen,
//   setAddMoneyModalOpen,
// }) => {
//   const router = useRouter();
//   const sidebarRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, toggleSidebar]);

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && !(window.innerWidth >= 1024) && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-40 lg:hidden pointer-events-none"
//         ></div>
//       )}

//       <div
//         ref={sidebarRef}
//         className={`bg-white w-72 fixed h-screen inset-y-0 left-0 transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-50`}
//       >
//         <div className="border-b">
//           <div className="flex flex-col items-center justify-center h-28">
//             <Image src={logo} alt="logo" />
//           </div>
//         </div>

//         <nav className="space-y-2 p-4">
//           {navLinksData.map((item: NavLink) => {
//             const IconComponent = icons[item.icon];
//             return (
//               <Link
//                 key={item.section}
//                 href={item.route}
//                 onClick={(e) => {
//                   setActiveSection(item.section);
//                   if (item.modal === "send") {
//                     setSendModalOpen(true);
//                   } else if (item.modal === "add") {
//                     setAddMoneyModalOpen(true);
//                   }
//                   if (sidebarOpen && !(window.innerWidth >= 1024)) {
//                     toggleSidebar();
//                   }
//                   if (item.section === "logout") {
//                     e.preventDefault();
//                     router.push("/");
//                   }
//                 }}
//                 className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 block ${
//                   activeSection === item.section
//                     ? "bg-primary/30 text-secondary"
//                     : "text-gray hover:text-secondary"
//                 }`}
//               >
//                 {IconComponent && <IconComponent size={20} />}
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import logo from "../../../../public/assets/icons/logo.svg";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion"; // Import motion

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
//   activeSection: string;
//   setActiveSection: (section: string) => void;
//   setSendModalOpen: (open: boolean) => void;
//   setAddMoneyModalOpen: (open: boolean) => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   section: string;
//   route: string;
//   modal?: "send" | "add";
//   mobileOnly?: boolean; // Keep mobileOnly if you still need mobile-specific links later
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
//   VscSignOut,
// };

// const navLinksData: NavLink[] = [
//   {
//     label: "Dashboard",
//     icon: "RiHomeLine",
//     section: "dashboard",
//     route: "/dashboard",
//   },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     section: "transactions",
//     route: "/dashboard/transactions",
//   },
//   {
//     label: "Send Money",
//     icon: "BsSend",
//     section: "send",
//     route: "/dashboard/send",
//     modal: "send",
//   },
//   {
//     label: "Add Money",
//     icon: "GoArrowUp",
//     section: "add",
//     route: "/dashboard/add-money",
//     modal: "add",
//   },
//   {
//     label: "Beneficiaries",
//     icon: "FiUserPlus",
//     section: "beneficiaries",
//     route: "/dashboard/beneficiaries",
//   },
//   {
//     label: "Settings",
//     icon: "FiSettings",
//     section: "settings",
//     route: "/dashboard/settings",
//   },
//   {
//     label: "Logout",
//     icon: "VscSignOut",
//     section: "logout",
//     route: "/",
//   },
// ];

// const Sidebar: React.FC<SidebarProps> = ({
//   sidebarOpen,
//   toggleSidebar,
//   activeSection,
//   setActiveSection,
//   setSendModalOpen,
//   setAddMoneyModalOpen,
// }) => {
//   const router = useRouter();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkMobileView = () => {
//       setIsMobileView(window.innerWidth < 1024);
//     };

//     checkMobileView();

//     const handleResize = () => {
//       checkMobileView();
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
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
//   }, [sidebarOpen, toggleSidebar, isMobileView]);

//   const isMobileMenu = sidebarOpen && isMobileView === true;

//   const filteredNavLinks = navLinksData.filter(item => {
//     if (isMobileMenu) {
//       return true; // Show all links in mobile menu now
//     } else {
//       return !item.mobileOnly; // Keep mobileOnly filter for desktop if needed in future
//     }
//   });

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView === true && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-40 lg:hidden pointer-events-none"
//         ></div>
//       )}

//       {(isMobileView === null || isMobileView === false) || (sidebarOpen && isMobileView === true) ? (
//         <motion.div // Use motion.div
//           ref={sidebarRef}
//           className={`bg-white w-72 fixed h-screen inset-y-0 left-0 transform lg:relative z-50 ${
//             isMobileView === true ? '' : 'translate-x-0' // No transform on desktop
//           } ${
//             sidebarOpen && isMobileView === true ? "translate-x-0" : (isMobileView === false ? "translate-x-0" : "-translate-x-full")
//           }`}
//           // Apply framer-motion props only for mobile view
//           initial={isMobileView === true ? { x: "-100%" } : {}}
//           animate={isMobileView === true ? { x: sidebarOpen ? 0 : "-100%" } : {}}
//           exit={isMobileView === true ? { x: "-100%" } : {}}
//           transition={isMobileView === true ? { duration: 0.3, ease: "easeInOut" } : {}}
//         >
//           <div className="border-b">
//             <div className="flex flex-col items-center justify-center h-28">
//               <Image src={logo} alt="logo" />
//             </div>
//           </div>

//           <nav className="space-y-2 p-4">
//             {filteredNavLinks.map((item: NavLink) => {
//               const IconComponent = icons[item.icon];
//               return (
//                 <Link
//                   key={item.section}
//                   href={item.route}
//                   onClick={(e) => {
//                     setActiveSection(item.section);
//                     if (item.modal === "send") {
//                       setSendModalOpen(true);
//                     } else if (item.modal === "add") {
//                       setAddMoneyModalOpen(true);
//                     }
//                     if (sidebarOpen && isMobileView === true) {
//                       toggleSidebar();
//                     }
//                     if (item.section === "logout") {
//                       e.preventDefault();
//                       router.push("/");
//                     }
//                   }}
//                   className={`w-full flex items-center space-x-3 py-3 px-4 font-light rounded-full transition duration-200 ${
//                     activeSection === item.section
//                       ? "bg-primary/30 text-secondary font-medium"
//                       : "text-gray hover:text-secondary hover:font-medium"
//                   }`}
//                 >
//                   {IconComponent && <IconComponent className="w-6 h-6" />}
//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>
//         </motion.div>
//       ) : null}
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
  VscSignOut,
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
    label: "Beneficiaries",
    icon: "FiUserPlus",
    route: "/dashboard/beneficiaries",
  },
  { label: "Settings", icon: "FiSettings", route: "/dashboard/settings" },
  { label: "Logout", icon: "VscSignOut", route: "/" },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);

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

  return (
    <>
      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && isMobileView && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/45 z-40 lg:hidden"
        />
      )}

      {isMobileView === null ||
      isMobileView === false ||
      (sidebarOpen && isMobileView === true) ? (
        <motion.div
          ref={sidebarRef}
          className={`bg-white w-72 fixed h-screen inset-y-0 left-0 lg:relative z-50 ${
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
          <div className="border-b">
            <div className="flex flex-col items-center justify-center h-20">
              <Image
                src="/assets/icon/logo.svg"
                alt="logo"
                width={100}
                height={100}
              />
            </div>
          </div>

          <nav className="space-y-2 p-4">
            {navLinksData.map((item: NavLink) => {
              const IconComponent = icons[item.icon];
              const isActive = pathname === item.route;

              return (
                <Link
                  key={item.route}
                  href={item.route}
                  onClick={(e) => {
                    if (item.route === "/") {
                      e.preventDefault();
                      router.push("/");
                    }

                    if (sidebarOpen && isMobileView) {
                      toggleSidebar();
                    }
                  }}
                  className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 ${
                    isActive
                      ? "bg-primary/30 text-secondary"
                      : "text-gray hover:text-secondary"
                  }`}
                >
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </motion.div>
      ) : null}
    </>
  );
};

export default Sidebar;
