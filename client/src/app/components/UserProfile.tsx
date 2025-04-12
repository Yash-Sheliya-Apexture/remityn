// // frontend/src/components/UserProfileCombined.tsx
// "use client";

// import Image from "next/image";
// import React, { useState, useRef, useEffect } from "react";
// import { IoPersonOutline } from "react-icons/io5";
// import { FaCog } from "react-icons/fa";
// import { BiLogOut } from "react-icons/bi";

// export interface UserProfileProps {
//   userName: string;
//   profileImageUrl: string;
// }

// interface UserProfileDropdownMenuProps {
//   onClose: () => void;
// }

// const UserProfileDropdownMenu: React.FC<UserProfileDropdownMenuProps> = ({
//   onClose,
// }) => {
//   const menuItems = [
//     {
//       text: "Profile",
//       icon: <IoPersonOutline className="size-5" />,
//       action: () => {
//         console.log("Profile Clicked");
//         onClose();
//       },
//     },
//     {
//       text: "Settings",
//       icon: <FaCog className="size-5" />,
//       action: () => {
//         console.log("Settings Clicked");
//         onClose();
//       },
//     },
//     {
//       text: "Logout",
//       icon: <BiLogOut className="size-5" />,
//       action: () => {
//         console.log("Logout Clicked");
//         onClose();
//       },
//     },
//   ];

//   return (
//     <div
//       className="absolute mt-3 right-0 w-52 z-10 border rounded-xl shadow-md origin-top-right bg-white dark:bg-background "
//       style={{ transformOrigin: "top right" }}
//     >
//       <div className="p-2 mt-1">
//         <ul
//           className="space-y-2"
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="options-menu"
//         >
//           {menuItems.map((item, index) => (
//             <li
//               key={index}
//               className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightgray dark:hover:bg-primarybox rounded-md transition-all duration-75 ease-linear cursor-pointer"
//               role="menuitem"
//               onClick={item.action}
//             >
//               {item.icon}
//               <span>{item.text}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

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

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div className="flex items-center space-x-5 cursor-pointer">
//         <div onClick={toggleDropdown}>
//           <Image
//             src={profileImageUrl}
//             alt={`${userName}'s Profile`}
//             width={100}
//             height={100}
//             className="lg:size-14 size-10 rounded-full object-cover"
//             onError={(e) => {
//               e.currentTarget.onerror = null;
//               e.currentTarget.src = "https://picsum.photos/200"; // Default placeholder
//             }}
//           />
//         </div>
//       </div>

//       {/* Dropdown Menu Component */}
//       {isDropdownOpen && <UserProfileDropdownMenu onClose={closeDropdown} />}
//     </div>
//   );
// };

// export default UserProfile;




// frontend/src/components/UserProfileCombined.tsx
"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaCog } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

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
    // Use motion.div for the dropdown container
    <motion.div
      className="absolute mt-3 right-0 w-52 z-10 border rounded-xl shadow-md origin-top-right bg-white dark:bg-background "
      style={{ transformOrigin: "top right" }} // Keep this style for the origin point
      initial={{ opacity: 0, scale: 0.95 }} // Start state: slightly scaled down and transparent
      animate={{ opacity: 1, scale: 1 }}     // End state: fully opaque and normal scale
      exit={{ opacity: 0, scale: 0.95 }}       // Exit state: back to initial state
      transition={{ duration: 0.15, ease: "easeOut" }} // Animation duration and easing
    >
      <div className="p-2 mt-1">
        <ul
          className="space-y-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightgray dark:hover:bg-primarybox rounded-md transition-all duration-75 ease-linear cursor-pointer"
              role="menuitem"
              onClick={item.action}
            >
              {item.icon}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
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

    // Only add listener if dropdown is open
    if (isDropdownOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]); // Re-run effect when isDropdownOpen changes

  return (
    <div className="relative" ref={dropdownRef}>
      {/* The clickable profile image */}
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

      {/* Wrap the conditional rendering with AnimatePresence */}
      <AnimatePresence>
        {isDropdownOpen && <UserProfileDropdownMenu onClose={closeDropdown} />}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;