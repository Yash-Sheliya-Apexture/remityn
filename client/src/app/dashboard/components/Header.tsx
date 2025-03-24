// // components/Header.tsx
// "use client";
// import React from "react";
// import { FiMenu, FiBell, FiUser } from "react-icons/fi";
// import { FaAngleRight } from "react-icons/fa6";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   // Hardcoded data (replace with your actual image path or URL)
//   const name = "rudra sutariya";
//   const isOnline = true;

//   return (
//     <header className="bg-white border-b">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center lg:h-28 h-20">
//           <div className="flex gap-4 items-center">
//             {/* Menu button for conditionaly render sidebar below large screen */}
//             <button
//               onClick={toggleSidebar}
//               className="text-gray focus:outline-none lg:hidden"
//             >
//               <FiMenu size={24} />
//             </button>
//           </div>

//           {/* Profile Picture */}
//           <div className="relative flex items-center hover:bg-green/8 p-1 rounded-full cursor-pointer gap-2 lg:mx-6 mx-0">
//             {/* user letter */}
//             <span className="size-11 bg-green/10 rounded-full flex items-center justify-center font-medium text-green uppercase">
//               rs
//             </span>
//             {isOnline && (
//               <div className="absolute top-1 left-9 lg:size-4 size-3.5 bg-[#a8200d] rounded-full border-2 border-white"></div>
//             )}

//             {/* User Name */}
//             <div className=" font-medium text-gray capitalize hidden sm:block">
//               {name}
//             </div>

//             <FaAngleRight className="size-5 text-gray me-2 hidden md:block" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// components/Header.tsx
// "use client";
// import React from "react";
// import { FiMenu, FiBell, FiUser } from "react-icons/fi";
// import { FaAngleRight } from "react-icons/fa6";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   // Hardcoded data (replace with your actual image path or URL)
//   const name = "rudra sutariya";
//   const isOnline = true;

//   return (
//     <header className="bg-white border-b">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center lg:h-28 h-20">
//           <div className="flex gap-4 items-center">
//             {/* Menu button for conditionaly render sidebar below large screen */}
//             <button
//               onClick={toggleSidebar}
//               className="text-gray focus:outline-none hidden sm:block lg:hidden"
//             >
//               <FiMenu size={24} />
//             </button>
//           </div>

//           {/* Profile Picture */}
//           <div className="relative flex items-center hover:bg-green/8 p-1 rounded-full cursor-pointer gap-2 lg:mx-6 mx-0">
//             {/* user letter */}
//             <span className="size-11 bg-green/10 rounded-full flex items-center justify-center font-medium text-green uppercase">
//               rs
//             </span>
//             {isOnline && (
//               <div className="absolute top-1 left-9 lg:size-4 size-3.5 bg-[#a8200d] rounded-full border-2 border-white"></div>
//             )}

//             {/* User Name */}
//             <div className=" font-medium text-gray capitalize hidden sm:block">
//               {name}
//             </div>

//             <FaAngleRight className="size-5 text-gray me-2 hidden md:block" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// // components/Header.tsx
// "use client";
// import React from "react";
// import { FiMenu, FiBell, FiUser } from "react-icons/fi";
// import { FaAngleRight } from "react-icons/fa6";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   // Hardcoded data (replace with your actual image path or URL)
//   const name = "rudra sutariya";
//   const isOnline = true;

//   return (
//     <header className="bg-white border-b  border-lightgray">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center lg:h-28 h-20">
//           <div className="flex gap-4 items-center">
//             {/* Menu button for conditionaly render sidebar below large screen */}
//             <button
//               onClick={toggleSidebar}
//               className="text-gray focus:outline-none lg:hidden sm:block hidden"
//             >
//               <FiMenu size={24} />
//             </button>
//           </div>

//           {/* Profile Picture */}
//           <div className="relative flex items-center group border border-[#cbd8d9] hover:bg-primary/8 rounded-full cursor-pointer gap-1.5 lg:mx-12 mx-0">
//             {/* user letter */}
//             <span className="size-14 bg-primary/10 rounded-full flex items-center justify-center font-bold text-secondary uppercase">
//               rs
//             </span>

//             {/* User Name */}
//             <div className=" font-medium text-secondary capitalize hidden sm:block">
//               {name}
//             </div>

//             <FaAngleRight className="size-5 text-secondary me-3 hidden md:block group-hover:translate-x-2.5 transition-transform ease-in-out duration-300" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// components/Header.tsx
"use client";
import React, { useEffect, useState } from "react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa6";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showBackArrow, setShowBackArrow] = useState(false);
  const name = "rudra sutariya";
  const isOnline = true;

  useEffect(() => {
    // Determine if the back arrow should be shown
    setShowBackArrow(pathname !== "/dashboard"); // Show back arrow if not on base dashboard route
  }, [pathname]);

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center lg:h-28 h-20">
          <div className="flex justify-center gap-4">
            {/* Menu button for conditionaly render sidebar below large screen */}
            <button
              onClick={toggleSidebar}
              className="text-gray focus:outline-none lg:hidden sm:block hidden"
            >
              <FiMenu size={24} />
            </button>

            {/* Back arrow button */}
            {showBackArrow && (
              <button
                onClick={handleBack}
                className="focus:outline-none p-4 bg-primary/10 rounded-full text-secondary"
              >
                <HiArrowLeft className="size-5" />
              </button>
            )}
          </div>

          {/* Profile Picture */}
          <Link href="/dashboard/your-account">
            <div className="relative flex items-center group  border border-[#b8cddd] hover:bg-primary/8 rounded-full cursor-pointer gap-1.5">
              {/* user letter */}
              <span className="size-12 bg-primary/50 rounded-full flex items-center justify-center font-bold text-secondary capitalize">
                rs
              </span>

              {/* User Name */}
              <div className="text-secondary capitalize hidden sm:block">
                {name}
              </div>

              <FaAngleRight className="size-5 text-secondary me-3 hidden md:block group-hover:translate-x-2.5 transition-transform ease-in-out duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
