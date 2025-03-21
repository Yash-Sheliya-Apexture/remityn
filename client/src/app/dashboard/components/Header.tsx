// components/Header.tsx
"use client";
import React from "react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa6";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  // Hardcoded data (replace with your actual image path or URL)
  const name = "rudra sutariya";
  const isOnline = true;

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex gap-4 items-center">
            {/* Menu button for conditionaly render sidebar below large screen */}
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <FiMenu size={24} />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="relative flex items-center hover:bg-green/8 p-1 rounded-full cursor-pointer gap-2 lg:mx-6 mx-0">
            {/* user letter */}
            <span className="size-11 bg-green/10 rounded-full flex items-center justify-center font-medium text-green uppercase">
              rs
            </span>
            {isOnline && (
              <div className="absolute top-1 left-9 size-4 bg-[#a8200d] rounded-full border-2 border-white"></div>
            )}

            {/* User Name */}
            <div className=" font-medium text-gray capitalize hidden md:block">
              {name}
            </div>

            <FaAngleRight className="size-5 text-gray me-2 hidden md:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
