// // frontend/src/components/layout/AdminHeader.tsx
// "use client";

// import React from "react";

// const AdminHeader = () => {
//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto p-4 flex justify-end">

//       </div>
//     </header>
//   );
// };

// export default AdminHeader;

// frontend/src/components/layout/AdminHeaderWithProfile.tsx
// "use client";

// import Image from "next/image";
// import React from "react";
// import { GoChevronDown } from "react-icons/go";

// interface UserProfileProps {
//   userName: string;
//   profileImageUrl: string;
// }

// const UserProfile: React.FC<UserProfileProps> = ({
//   userName,
//   profileImageUrl,
// }) => {
//   return (
//     <div className="flex items-center justify-start bg-white rounded-md p-2 cursor-pointer">
//       {/* Profile Picture */}
//       <div className="mr-2">
//         <Image
//           src={profileImageUrl}
//           alt={`${userName}'s Profile`}
//           width={100}
//           height={100}
//           className="size-10 rounded-full object-cover"
//           onError={(e) => {
//             e.currentTarget.onerror = null;
//             e.currentTarget.src = "https://picsum.photos/200"; // Default placeholder
//           }}
//         />
//       </div>

//       {/* User Name and Dropdown Icon */}
//       <div className="flex items-center space-x-1">
//         <span className="text-base font-medium text-gray">{userName}</span>
//         <GoChevronDown className="size-6 text-gray" />
//       </div>
//     </div>
//   );
// };

// const AdminHeader = () => {
//   return (
//     <header className="bg-white">
//       <div className="container mx-auto p-2 flex justify-end items-center">
//         {/* User Profile Component */}
//         <UserProfile
//           userName="Rudra Sutariya" // Replace with dynamic admin user name if available
//           profileImageUrl="/assets/images/Char.jpg" // Replace with actual admin profile image URL or path
//         />
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;

// frontend/src/components/layout/AdminHeaderWithProfile.tsx
// "use client";

// import Image from "next/image";
// import React, { useState, useRef, useEffect } from "react";
// import { GoChevronDown } from "react-icons/go";
// import { IoPersonOutline } from "react-icons/io5";
// import { FaRegEnvelope, FaCog, FaTag } from "react-icons/fa";
// import { BiChat, BiListCheck, BiInfoCircle, BiLogOut } from "react-icons/bi";

// interface UserProfileProps {
//   userName: string;
//   profileImageUrl: string;
// }

// const UserProfile: React.FC<UserProfileProps> = ({
//   userName,
//   profileImageUrl,
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         closeDropdown();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

//   const menuItems = [
//     {
//       text: "Profile",
//       icon: <IoPersonOutline className="size-5" />,
//       action: () => console.log("Profile Clicked"),
//     },
//     {
//       text: "Email",
//       icon: <FaRegEnvelope className="size-5" />,
//       action: () => console.log("Email Clicked"),
//     },
//     {
//       text: "Settings",
//       icon: <FaCog className="size-5" />,
//       action: () => console.log("Settings Clicked"),
//     },
//     {
//       text: "Logout",
//       icon: <BiLogOut className="size-5" />,
//       action: () => console.log("Logout Clicked"),
//     },
//   ];

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center justify-start bg-white rounded-md p-2 cursor-pointer hover:bg-gray-50"
//         onClick={toggleDropdown}
//       >
//         {/* Profile Picture */}
//         <div className="mr-2">
//           <Image
//             src={profileImageUrl}
//             alt={`${userName}'s Profile`}
//             width={100}
//             height={100}
//             className="size-10 rounded-full object-cover"
//             onError={(e) => {
//               e.currentTarget.onerror = null;
//               e.currentTarget.src = "https://picsum.photos/200"; // Default placeholder
//             }}
//           />
//         </div>

//         {/* User Name and Dropdown Icon */}
//         <div className="flex items-center space-x-1">
//           <span className="text-base font-medium text-gray-700">
//             {userName}
//           </span>
//           <GoChevronDown
//             className={`size-5 text-gray-500 ${
//               isDropdownOpen ? "rotate-180" : ""
//             } transition-transform duration-200`}
//           />
//         </div>
//       </div>

//       {/* Dropdown */}
//       {isDropdownOpen && (
//         <div
//           className="absolute right-0 mt-2.5 w-48 rounded-md shadow-xl z-10 origin-top-right transition-all duration-200 ease-in-out transform scale-100 opacity-100"
//           style={{ transformOrigin: "top right" }}
//         >
//           <div className="rounded-md border border-gray-300 bg-white">
//             <ul
//               className="py-2 space-y-2"
//               role="menu"
//               aria-orientation="vertical"
//               aria-labelledby="options-menu"
//             >
//               {menuItems.map((item, index) => (
//                 <li
//                   key={index}
//                   className="p-3 text-sm text-gray font-medium hover:bg-gray-100 hover:text-main flex items-center gap-2 cursor-pointer"
//                   role="menuitem"
//                   onClick={item.action}
//                 >
//                   {item.icon}
//                   <span>{item.text}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const AdminHeader = () => {
//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto p-2 flex justify-end items-center">
//         {/* User Profile Component */}
//         <UserProfile
//           userName="Rudra Sutariya"
//           profileImageUrl="/assets/images/Char.jpg"
//         />
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;

// frontend/src/components/layout/AdminHeader.tsx
// "use client";

// import React from "react";
// import UserProfile from "@/app/components/UserProfile"; // Import combined UserProfile component
// import { UserProfileProps } from "@/app/components/UserProfile";

// const AdminHeader = () => {
//   const adminUserProfileProps: UserProfileProps = {
//     userName: "Rudra Sutariya",
//     profileImageUrl: "/assets/images/Char.jpg",
//   };

//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto p-4 flex justify-end">
//         {/* User Profile Component */}
//         <UserProfile {...adminUserProfileProps} />
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;

// frontend/src/components/layout/AdminHeader.tsx
// "use client";

// import React from "react";
// import UserProfile from "@/app/components/UserProfile"; // Import combined UserProfile component
// import { UserProfileProps } from "@/app/components/UserProfile";
// import { FaBars } from "react-icons/fa"; // Import menu icon

// interface AdminHeaderProps {
//   toggleSidebar: () => void;
// }

// const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
//   const adminUserProfileProps: UserProfileProps = {
//     userName: "Rudra Sutariya",
//     profileImageUrl: "/assets/images/Char.jpg",
//   };

//   return (
//     <header className="bg-white shadow-md z-50">
//       <div className="container mx-auto p-4 flex justify-between items-center">
//         {/* Mobile Menu Button - Visible on small screens */}
//         <button
//           onClick={toggleSidebar}
//           className="lg:hidden text-gray-600 focus:outline-none focus:text-gray-800"
//         >
//           <FaBars className="h-6 w-6" />
//         </button>
//         {/* Spacer to push UserProfile to the right on larger screens */}
//         <div className="hidden lg:block"></div> {/* Hidden on small screens */}
//         {/* User Profile Component */}
//         <UserProfile {...adminUserProfileProps} />
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;

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
    <header className="bg-white shadow-sm border-b border-gray-200">
      {" "}
      {/* Subtle shadow and border */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {" "}
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
