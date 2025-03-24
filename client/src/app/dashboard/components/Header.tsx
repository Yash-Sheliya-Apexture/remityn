// components/Header.tsx
"use client";
import React from "react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
}) => {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-28">
          <div className="flex gap-4 items-center">
            {/* Menu button for conditionaly render sidebar below large screen */}
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
