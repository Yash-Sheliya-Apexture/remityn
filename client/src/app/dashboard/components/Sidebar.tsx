"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiCreditCard,
  FiUserPlus,
  FiSettings,
} from "react-icons/fi";
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
  { label: "Transactions", icon: "GrTransaction", route: "/dashboard/transactions" },
  { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
  { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
  { label: "Beneficiaries", icon: "FiUserPlus", route: "/dashboard/beneficiaries" },
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

      {(isMobileView === null || isMobileView === false) || (sidebarOpen && isMobileView === true) ? (
        <motion.div
          ref={sidebarRef}
          className={`bg-white w-72 fixed h-screen inset-y-0 left-0 lg:relative z-50 ${
            isMobileView ? "" : "translate-x-0"
          } ${sidebarOpen && isMobileView ? "translate-x-0" : isMobileView ? "-translate-x-full" : "translate-x-0"}`}
          initial={isMobileView ? { x: "-100%" } : {}}
          animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
          exit={isMobileView ? { x: "-100%" } : {}}
          transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
        >
          <div className="">
            <div className="flex flex-col items-center justify-center h-28">
              <Image src="/assets/icon/logo.svg" alt="logo" width={100} height={100}/>
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

