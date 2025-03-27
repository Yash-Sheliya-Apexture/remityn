// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
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
// import Link from "next/link";

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
//   VscSignOut,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   { label: "Transactions", icon: "GrTransaction", route: "/dashboard/transactions" },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   { label: "Beneficiaries", icon: "FiUserPlus", route: "/dashboard/beneficiaries" },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/settings" },
//   { label: "Logout", icon: "VscSignOut", route: "/" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname(); // Get current route
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);

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

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-40 lg:hidden"
//         />
//       )}

//       {(isMobileView === null || isMobileView === false) || (sidebarOpen && isMobileView === true) ? (
//         <motion.div
//           ref={sidebarRef}
//           className={`bg-white w-72 fixed h-screen inset-y-0 left-0 lg:relative z-50 ${
//             isMobileView ? "" : "translate-x-0"
//           } ${sidebarOpen && isMobileView ? "translate-x-0" : isMobileView ? "-translate-x-full" : "translate-x-0"}`}
//           initial={isMobileView ? { x: "-100%" } : {}}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
//           exit={isMobileView ? { x: "-100%" } : {}}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
//         >
//           <div className="border-b">
//             <div className="flex flex-col items-center justify-center h-28">
//               <Image src="/assets/icon/logo.svg" alt="logo" width={100} height={100}/>
//             </div>
//           </div>

//           <nav className="space-y-2 p-4">
//             {navLinksData.map((item: NavLink) => {
//               const IconComponent = icons[item.icon];
//               const isActive = pathname === item.route;

//               return (
//                 <Link
//                   key={item.route}
//                   href={item.route}
//                   onClick={(e) => {
//                     if (item.route === "/") {
//                       e.preventDefault();
//                       router.push("/");
//                     }

//                     if (sidebarOpen && isMobileView) {
//                       toggleSidebar();
//                     }
//                   }}
//                   className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 ${
//                     isActive
//                       ? "bg-primary/30 text-secondary"
//                       : "text-gray hover:text-secondary"
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
//     label: "Beneficiaries",
//     icon: "FiUserPlus",
//     route: "/dashboard/beneficiaries",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/settings" },
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
//           className="fixed inset-0 bg-black/45 z-40 lg:hidden"
//         />
//       )}

//       {isMobileView === null ||
//       isMobileView === false ||
//       (sidebarOpen && isMobileView === true) ? (
//         <motion.div
//           ref={sidebarRef}
//           className={`bg-white w-72 fixed h-screen inset-y-0 left-0 lg:relative z-50 ${
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
//           <div className="border-b">
//             <div className="flex flex-col items-center justify-center lg:h-28 h-20">
//               <Image
//                 src="/assets/icon/logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//               />
//             </div>
//           </div>

//           <nav className="pt-8">
//             {navLinksData.map((item: NavLink) => {
//               const IconComponent = icons[item.icon];
//               const isActive = pathname === item.route;

//               return (
//                 <Link
//                   key={item.route}
//                   href={item.route}
//                   onClick={(e) => {
//                     if (sidebarOpen && isMobileView) {
//                       toggleSidebar();
//                     }
//                   }}
//                   className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                     isActive
//                       ? "bg-primary/30 text-secondary"
//                       : "text-gray hover:text-secondary"
//                   }`}
//                 >
//                   {IconComponent && <IconComponent className="w-6 h-6" />}
//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           <button
//             onClick={handleLogout} // Call handleLogout function on click
//             className="w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer" // Added absolute positioning and p-4 for padding
//           >
//             <VscSignOut className="w-6 h-6 space-x-3" />
//             <span>Logout</span>
//           </button>
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
import { VscSignOut } from "react-icons/vsc"; // No longer needed
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth"; // Import useAuth hook

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
  { label: "Settings", icon: "FiSettings", route: "/dashboard/settings" },
];

const bottomNavLinksData: NavLink[] = [
  { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
  {
    label: "Transactions",
    icon: "GrTransaction",
    route: "/dashboard/transactions",
  },
  {
    label: "beneficiaries",
    icon: "FiUserPlus",
    route: "/dashboard/beneficiaries",
  },
  { label: "settings", icon: "FiSettings", route: "/dashboard/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
  const { logout } = useAuth(); // Get logout function from useAuth

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
    // Removed event parameter - button onClick doesn't need it directly
    logout(); // Call the logout function from AuthContext
    router.push("/auth/login"); // Redirect to login page after logout
    if (sidebarOpen && isMobileView) {
      toggleSidebar(); // Close sidebar on mobile after logout
    }
  };

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
          className={`bg-white w-72 fixed h-screen inset-y-0 left-0 lg:relative ${
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
          <div>
            <div className="flex flex-col items-center justify-center lg:h-28 h-20">
              <Link href="/dashboard">
                <Image
                  src="/assets/icon/logo.svg"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          </div>

          <nav className="pt-8">
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

          <button
            onClick={handleLogout} // Call handleLogout function on click
            className="w-full flex items-center space-x-3 py-3 group px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer" // Added absolute positioning and p-4 for padding
          >
            <VscSignOut className="w-6 h-6 group-hover:text-secondary" />
            <span className="text-gray font-medium group-hover:text-secondary">
              Logout
            </span>
          </button>
        </motion.div>
      ) : null}

      {/* Small screen bottom sidebar */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full border-t border-lightgray bg-white flex justify-center items-center space-x-6 py-4 z-10">
        {bottomNavLinksData.map((item: NavLink) => {
          const IconComponent = icons[item.icon];
          const isActive = pathname === item.route;

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`flex flex-col items-center justify-center ${
                isActive ? "text-primary" : "text-gray-500 hover:text-secondary"
              }`}
            >
              {IconComponent && <IconComponent className="size-5 mb-2" />}
              <span className="text-xs capitalize">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
