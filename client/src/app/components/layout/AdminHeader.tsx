// frontend/src/components/layout/AdminHeader.tsx
"use client";

import React from "react";
import UserProfile from "@/app/components/UserProfile";
import { UserProfileProps } from "@/app/components/UserProfile";
import { FaBars } from "react-icons/fa";

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  const adminUserProfileProps: UserProfileProps = {
    userName: "Rudra Sutariya",
    profileImageUrl: "/assets/images/Char.jpg",
  };

  return (
    <header className="border-b">
      {/* Subtle shadow and border */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 hover:text-gray-700 focus:outline-none"
        >
          <FaBars className="h-5 w-5" /> {/* Smaller menu icon */}
        </button>
        <div className="hidden lg:block">
          {/* You can add header content here if needed for larger screens */}
        </div>
        {/* User Profile Component */}
        <UserProfile {...adminUserProfileProps} />
      </div>
    </header>
  );
};

export default AdminHeader;
