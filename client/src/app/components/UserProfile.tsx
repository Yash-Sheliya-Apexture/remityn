// frontend/src/components/UserProfileCombined.tsx
"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaCog } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

export interface UserProfileProps {
  userName: string;
  profileImageUrl: string;
}

interface UserProfileDropdownMenuProps {
  onClose: () => void;
}

const UserProfileDropdownMenu: React.FC<UserProfileDropdownMenuProps> = ({
  onClose,
}) => {
  const menuItems = [
    {
      text: "Profile",
      icon: <IoPersonOutline className="size-5" />,
      action: () => {
        console.log("Profile Clicked");
        onClose();
      },
    },
    {
      text: "Settings",
      icon: <FaCog className="size-5" />,
      action: () => {
        console.log("Settings Clicked");
        onClose();
      },
    },
    {
      text: "Logout",
      icon: <BiLogOut className="size-5" />,
      action: () => {
        console.log("Logout Clicked");
        onClose();
      },
    },
  ];

  return (
    <div
      className="absolute right-0 mt-3 w-52 rounded-md shadow-md z-10 origin-top-right transition-all duration-300 ease-in-out transform scale-100 opacity-100"
      style={{ transformOrigin: "top right" }}
    >
      <div className="rounded-md border border-gray-300 bg-white mt-1">
        <ul
          className="py-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="lg:p-4 p-2.5 gap-4 text-sm text-gray font-medium hover:bg-gray-100 hover:text-main flex items-center cursor-pointer"
              role="menuitem"
              onClick={item.action}
            >
              {item.icon}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  profileImageUrl,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-5 cursor-pointer">
        <div onClick={toggleDropdown}>
          <Image
            src={profileImageUrl}
            alt={`${userName}'s Profile`}
            width={100}
            height={100}
            className="lg:size-14 size-10 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://picsum.photos/200"; // Default placeholder
            }}
          />
        </div>
      </div>

      {/* Dropdown Menu Component */}
      {isDropdownOpen && <UserProfileDropdownMenu onClose={closeDropdown} />}
    </div>
  );
};

export default UserProfile;
