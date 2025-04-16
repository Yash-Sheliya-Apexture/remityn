// components/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../../public/assets/icons/logo.svg";
// import plane from "../../../../../public/assets/icons/plane.webp";
// import { IoIosArrowForward } from "react-icons/io";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";

// import MobileMenu from "./MobileMenu";

// const Header: React.FC = () => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint (Tailwind)
//     };

//     checkScreenSize(); // Check on initial load
//     window.addEventListener("resize", checkScreenSize); // Check on resize

//     return () => window.removeEventListener("resize", checkScreenSize); // Cleanup
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden"; // Prevent scrolling
//     } else {
//       document.body.style.overflow = "auto"; // Allow scrolling
//     }
//   }, [isMobileMenuOpen]);

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div className="">
//               <Link href="/" passHref>
//                 <Image src={logo} alt="Wise Logo" width={120} height={28} />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     passHref
//                     className="bg-lightgreen px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex justify-end items-center flex-1/2 w-full">
//                   {/* Feature Link */}

//                   <div className="relative">
//                     <button
//                       onClick={toggleFeaturesDropdown}
//                       className="px-2.5 py-1.5 rounded-full font-medium"
//                     >
//                       Features
//                     </button>

//                     {isFeaturesOpen && (
//                       <div className="absolute right-0 top-15 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50">
//                         {/* Your features dropdown content */}

//                         <div>
//                           <div className="p-8 flex flex-col justify-start bg-green/10">
//                             <Image
//                               src={plane}
//                               alt="Plane"
//                               width={56}
//                               height={56}
//                             />

//                             <div>
//                               <p className="font-light text-gray">
//                                 Learn how millions of customers move their money
//                                 globally
//                               </p>
//                             </div>
//                           </div>

//                           <div className="p-8 flex flex-col gap-4">
//                             {/* Link 1 */}
//                             <Link
//                               href="/sendmoney"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send money</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//                             </Link>

//                             {/* Link 2 */}
//                             <Link
//                               href="/sendlargeamount"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send large amounts</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <Link
//                     href="/pricing"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>
//                   <Link href="/en" passHref>
//                     <div className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </div>
//                   </Link>
//                 </div>
//               )}

//               <div className="text-nowrap items-center flex gap-2">
//                 {/* Login  */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/login"
//                     passHref
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Log in
//                   </Link>
//                 )}

//                 {/* Register Link and Hamburger (Conditional) */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/register"
//                       passHref
//                       className="bg-lightgreen px-4 py-2 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Register
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green  p-2"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/*  Close Button (Mobile, inside MobileMenu)  */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button onClick={closeMobileMenu} className="text-2xl p-2 bg-green/20 rounded-full">
//                     <FiX className="text-green "/>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering) */}
//       {isMobileMenuOpen && (
//         <MobileMenu
//           isOpen={isMobileMenuOpen}
//           onClose={closeMobileMenu}
//           toggleFeaturesDropdown={toggleFeaturesDropdown}
//           isFeaturesOpen={isFeaturesOpen}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../../public/assets/icons/logo.svg";
// import plane from "../../../../../public/assets/icons/plane.webp";
// import { IoIosArrowForward } from "react-icons/io";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";

// import MobileMenu from "./MobileMenu";

// const Header: React.FC = () => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // Key change:  Combined effect for screen size and closing mobile menu
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);

//       // Close mobile menu if transitioning to large screen
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize(); // Check on initial load
//     window.addEventListener("resize", checkScreenSize); // Check on resize

//     return () => window.removeEventListener("resize", checkScreenSize); // Cleanup
//   }, [isMobileMenuOpen]);  // Dependency array includes isMobileMenuOpen

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden"; // Prevent scrolling
//     } else {
//       document.body.style.overflow = "auto"; // Allow scrolling
//     }
//   }, [isMobileMenuOpen]);

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div className="">
//               <Link href="/" passHref>
//                 <Image src={logo} alt="Wise Logo" width={120} height={28} />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     passHref
//                     className="bg-lightgreen px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex justify-end items-center flex-1/2 w-full">
//                   {/* Feature Link */}

//                   <div className="relative">
//                     <button
//                       onClick={toggleFeaturesDropdown}
//                       className="px-2.5 py-1.5 rounded-full font-medium"
//                     >
//                       Features
//                     </button>

//                     {isFeaturesOpen && (
//                       <div className="absolute right-0 top-15 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50">
//                         {/* Your features dropdown content */}

//                         <div>
//                           <div className="p-8 flex flex-col justify-start bg-green/10">
//                             <Image
//                               src={plane}
//                               alt="Plane"
//                               width={56}
//                               height={56}
//                             />

//                             <div>
//                               <p className="font-light text-gray">
//                                 Learn how millions of customers move their money
//                                 globally
//                               </p>
//                             </div>
//                           </div>

//                           <div className="p-8 flex flex-col gap-4">
//                             {/* Link 1 */}
//                             <Link
//                               href="/sendmoney"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send money</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//                             </Link>

//                             {/* Link 2 */}
//                             <Link
//                               href="/sendlargeamount"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send large amounts</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <Link
//                     href="/pricing"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>
//                   <Link href="/en" passHref>
//                     <div className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </div>
//                   </Link>
//                 </div>
//               )}

//               <div className="text-nowrap items-center flex gap-2">
//                 {/* Login  */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/login"
//                     passHref
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Log in
//                   </Link>
//                 )}

//                 {/* Register Link and Hamburger (Conditional) */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/register"
//                       passHref
//                       className="bg-lightgreen px-4 py-2 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Register
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green  p-2"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/*  Close Button (Mobile, inside MobileMenu)  */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button onClick={closeMobileMenu} className="text-2xl p-2 bg-green/20 rounded-full">
//                     <FiX className="text-green "/>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering) */}
//       {isMobileMenuOpen && (
//         <MobileMenu
//           isOpen={isMobileMenuOpen}
//           onClose={closeMobileMenu}
//           toggleFeaturesDropdown={toggleFeaturesDropdown}
//           isFeaturesOpen={isFeaturesOpen}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../../public/assets/icons/logo.svg";
// import plane from "../../../../../public/assets/icons/plane.webp";
// import { IoIosArrowForward } from "react-icons/io";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion

// import MobileMenu from "./MobileMenu";

// const Header: React.FC = () => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isMobileMenuOpen]);

//   // Framer Motion Variants
//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: { x: "-100%", opacity: 0, transition: { type: "tween", duration: 0.3 } },
//   };

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div className="">
//               <Link href="/" passHref>
//                 <Image src={logo} alt="Wise Logo" width={120} height={28} />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     passHref
//                     className="bg-lightgreen px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex justify-end items-center flex-1/2 w-full">
//                   {/* Feature Link */}

//                   <div className="relative">
//                     <button
//                       onClick={toggleFeaturesDropdown}
//                       className="px-2.5 py-1.5 rounded-full font-medium"
//                     >
//                       Features
//                     </button>

//                     {isFeaturesOpen && (
//                       <div className="absolute right-0 top-15 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50">
//                         {/* Your features dropdown content */}

//                         <div>
//                           <div className="p-8 flex flex-col justify-start bg-green/10">
//                             <Image
//                               src={plane}
//                               alt="Plane"
//                               width={56}
//                               height={56}
//                             />

//                             <div>
//                               <p className="font-light text-gray">
//                                 Learn how millions of customers move their money
//                                 globally
//                               </p>
//                             </div>
//                           </div>

//                           <div className="p-8 flex flex-col gap-4">
//                             {/* Link 1 */}
//                             <Link
//                               href="/sendmoney"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send money</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//                             </Link>

//                             {/* Link 2 */}
//                             <Link
//                               href="/sendlargeamount"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send large amounts</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <Link
//                     href="/pricing"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>
//                   <Link href="/en" passHref>
//                     <div className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </div>
//                   </Link>
//                 </div>
//               )}

//               <div className="text-nowrap items-center flex gap-2">
//                 {/* Login  */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/login"
//                     passHref
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Log in
//                   </Link>
//                 )}

//                 {/* Register Link and Hamburger (Conditional) */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/register"
//                       passHref
//                       className="bg-lightgreen px-4 py-2 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Register
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green  p-2"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/*  Close Button (Mobile, inside MobileMenu)  */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button onClick={closeMobileMenu} className="text-2xl p-2 bg-green/20 rounded-full">
//                     <FiX className="text-green "/>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               toggleFeaturesDropdown={toggleFeaturesDropdown}
//               isFeaturesOpen={isFeaturesOpen}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// Header.tsx
// components/Header/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../../public/assets/icons/logo.svg"; // Correct path
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu";
// import FeatureDropdown from "../../../components/FeatureDropdown"; // Correct import path

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isMobileMenuOpen]);

//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div className="">
//               <Link href="/" passHref>
//                 <Image src={logo} alt="Wise Logo" width={120} height={28} />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     passHref
//                     className="bg-lightgreen px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex justify-end items-center gap-2 flex-1/2 w-full">
//                   {/* Feature Link (using the FeatureDropdown component) */}
//                   <FeatureDropdown
//                     buttonText="Features"
//                     onLinkClick={closeMobileMenu}
//                     // Optionally customize styling:
//                     // buttonClassName="my-custom-button-class"
//                     // dropdownClassName="my-custom-dropdown-class"
//                   />

//                   <Link
//                     href="/pricing"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>
//                   <Link href="/en" passHref>
//                     <div className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </div>
//                   </Link>
//                 </div>
//               )}

//               <div className="text-nowrap items-center flex gap-2">
//                 {/* Login  */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/login"
//                     passHref
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Log in
//                   </Link>
//                 )}

//                 {/* Register Link and Hamburger (Conditional) */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/register"
//                       passHref
//                       className="bg-lightgreen px-4 py-2 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Register
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green  p-2"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/*  Close Button (Mobile) */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button
//                     onClick={closeMobileMenu}
//                     className="text-2xl p-2 bg-green/20 rounded-full"
//                   >
//                     <FiX className="text-green " />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// // components/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Correct import path
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Correct import path

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]);

//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   const featureLinks = [
//     { href: "/sendmoney", text: "Send Money" },
//     { href: "/sendlargeamount", text: "Send Large Amounts" },
//     // Add more features here
//   ];

//   const topContent = (
//     <>
//       <Image
//         src="/assets/images/plane.webp"
//         alt="Plane"
//         width={56}
//         height={56}
//       />
//       <div>
//         <p className="font-light text-gray">
//           Learn how millions of customers move their money globally
//         </p>
//       </div>
//     </>
//   );

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div className="">
//               <Link href="/" passHref>
//                 <Image
//                   src="/assets/images/wise-logo.svg"
//                   alt="Wise Logo"
//                   width={120}
//                   height={28}
//                 />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     passHref
//                     className="bg-[#d3f2c0] px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex justify-end items-center gap-2 flex-1/2 w-full">
//                   {/* Feature Link (using the FeatureDropdown component) */}
//                   <FeatureDropdown
//                     buttonText="Features"
//                     links={featureLinks}
//                     topContent={topContent} //  <--- Pass topContent
//                     onLinkClick={closeMobileMenu}
//                   />

//                   <Link
//                     href="/pricing"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>

//                   {/* Lagunage and country selector */}
//                   <Link href="/en" passHref>
//                     <button className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </button>
//                   </Link>
//                 </div>
//               )}

//               <div className="text-nowrap items-center flex gap-2">
//                 {/* Login  */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/auth/register"
//                     passHref
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Register
//                   </Link>
//                 )}

//                 {/* Register Link and Hamburger (Conditional) */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/auth/login"
//                       passHref
//                       className="bg-lightgreen px-5 py-1.5 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Log in
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green  p-2"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/*  Close Button (Mobile) */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button
//                     onClick={closeMobileMenu}
//                     className="text-2xl p-2 bg-green/20 rounded-full"
//                   >
//                     <FiX className="text-green " />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               topContent={topContent} //  <--- Pass topContent
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// // components/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Ensure MobileMenu has proper TypeScript definitions
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Ensure FeatureDropdown has proper TypeScript definitions

// // Define a type for the feature links
// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]);

//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   const featureLinks: FeatureLink[] = [
//     { href: "/sendmoney", text: "Send Money" },
//     { href: "/sendlargeamount", text: "Send Large Amounts" },
//     // Add more features here as needed
//   ];

//   const topContent = (
//     <>
//       <Image
//         src="/assets/images/plane.webp"
//         alt="Plane"
//         width={56}
//         height={56}
//       />
//       <div>
//         <p className="font-light text-gray">
//           Learn how millions of customers move their money globally
//         </p>
//       </div>
//     </>
//   );

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div>
//               <Link href="/">
//                 <Image
//                   src="/assets/images/wise-logo.svg"
//                   alt="Wise Logo"
//                   width={120}
//                   height={28}
//                 />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Desktop Links */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     className="bg-[#d3f2c0] px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     className="px-4 py-1 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     className="px-4 py-1 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {isLargeScreen && (
//                 <div className="flex justify-end items-center gap-2 flex-1/2 w-full">
//                   {/* Feature Dropdown */}
//                   <FeatureDropdown
//                     buttonText="Features"
//                     links={featureLinks}
//                     topContent={topContent}
//                     onLinkClick={closeMobileMenu}
//                   />

//                   <Link
//                     href="/pricing"
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>

//                   {/* Language and Country Selector */}
//                   <Link href="/en">
//                     <button className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </button>
//                   </Link>
//                 </div>
//               )}

//               <div className="flex items-center gap-2">
//                 {/* Register Link (Desktop) */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/auth/register"
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Register
//                   </Link>
//                 )}

//                 {/* Login and Hamburger for Mobile */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/auth/login"
//                       className="bg-primary px-5 py-1.5 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Log in
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green p-2"
//                         aria-label="Open Mobile Menu"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/* Close Button (Mobile) */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button
//                     onClick={closeMobileMenu}
//                     className="text-2xl p-2 bg-green/20 rounded-full"
//                     aria-label="Close Mobile Menu"
//                   >
//                     <FiX className="text-green" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               topContent={topContent}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Ensure MobileMenu has proper TypeScript definitions
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Ensure FeatureDropdown has proper TypeScript definitions
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Import ThemeToggle
// import { IoClose } from "react-icons/io5";

// // Define a type for the feature links
// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]);

//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   const featureLinks: FeatureLink[] = [
//     { href: "/dashboard", text: "Send Money" },
//     { href: "/sendlargeamount", text: "Send Large Amounts" },
//     // Add more features here as needed
//   ];

//   const topContent = (
//     <>
//       <Image
//         src="/assets/images/plane.webp"
//         alt="Plane"
//         width={100}
//         height={100}
//         className="size-16"
//       />
//       <div>
//         <p className="font-light text-gray-500 dark:text-gray-300 mt-5">
//           Learn how millions of customers move their money globally
//         </p>
//       </div>
//     </>
//   );

//   return (
//     <header className="header">
//       <div className="shadow border">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div>
//               <Link href="/">
//                 <Image
//                   src="/assets/images/wise-logo.svg"
//                   alt="Wise Logo"
//                   width={120}
//                   height={28}
//                 />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {isLargeScreen && (
//                 <>
//                   <div className="flex justify-end items-center gap-4 flex-1/2 w-full">
//                     <div className="relative group">
//                       <Link
//                         href="/"
//                         className="px-2.5 py-1.5 rounded-full font-medium"
//                       >
//                         Home
//                         <span
//                           className={`absolute left-0 -bottom-1 w-full h-[2px] dark:bg-primary bg-mainheading transform origin-right scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100 group-hover:origin-left`}
//                         ></span>
//                       </Link>
//                     </div>

//                     <div className="relative group">
//                       <Link
//                         href="/"
//                         className="px-2.5 py-1.5 rounded-full font-medium"
//                       >
//                         About
//                       </Link>
//                       <span
//                         className={`absolute left-0 -bottom-1 w-full h-[2px] dark:bg-primary bg-mainheading transform origin-right scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100 group-hover:origin-left`}
//                       ></span>
//                     </div>

//                     <FeatureDropdown
//                       buttonText="Features"
//                       links={featureLinks}
//                       topContent={topContent}
//                       onLinkClick={closeMobileMenu}
//                     />

//                     <div className="relative group">
//                       <Link
//                         href="/help"
//                         className="px-2.5 py-1.5 rounded-full font-medium"
//                       >
//                         Help
//                         <span
//                           className={`absolute left-0 -bottom-1 w-full h-[2px] dark:bg-primary bg-mainheading transform origin-right scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100 group-hover:origin-left`}
//                         ></span>
//                       </Link>
//                     </div>
//                   </div>

//                   <div className="flex items-center mr-2">
//                     <ThemeToggle location="header" />
//                   </div>
//                 </>
//               )}

//               <div className="flex items-center gap-2">
//                 {/* Login and Hamburger for Mobile */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/auth/login"
//                       className="bg-primary px-6 py-1.5 lg:block hidden text-nowrap font-medium text-lg rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading"
//                     >
//                       Log in
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-primary p-2 cursor-pointer"
//                         aria-label="Open Mobile Menu"
//                       >
//                         <GiHamburgerMenu size={26} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/* Close Button (Mobile) */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button
//                     onClick={closeMobileMenu}
//                     aria-label="Close Mobile Menu"
//                     className="text-neutral-900 cursor-pointer"
//                   >
//                     <IoClose className="size-10 hover:bg-gray-300 text-mainheading dark:text-white hover:dark:bg-primarybox p-1.5 rounded-full transition-colors duration-300 ease-in-out" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               topContent={topContent}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { GiHamburgerMenu } from "react-icons/gi";
// // We use IoClose now, so FiX is not needed unless used elsewhere
// // import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Ensure MobileMenu has proper TypeScript definitions
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Ensure FeatureDropdown has proper TypeScript definitions
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Import ThemeToggle
// import { IoClose } from "react-icons/io5";

// // Define a type for the feature links
// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
//   const [isSticky, setIsSticky] = useState<boolean>(false); // State for sticky header

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // Effect for screen size and closing mobile menu on resize
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]); // Dependency remains the same

//   // Effect for handling body scroll lock when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     // Cleanup function
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]); // Dependency remains the same

//   // Effect for handling scroll position and setting sticky state
//   useEffect(() => {
//     const handleScroll = () => {
//       // Set sticky state based on scroll position
//       setIsSticky(window.scrollY > 300);
//     };

//     // Add scroll event listener
//     window.addEventListener("scroll", handleScroll);

//     // Cleanup function to remove event listener
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []); // Empty dependency array ensures this runs only on mount and unmount

//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   const featureLinks: FeatureLink[] = [
//     { href: "/dashboard", text: "Send Money" },
//     { href: "/sendlargeamount", text: "Send Large Amounts" },
//     // Add more features here as needed
//   ];

//   const topContent = (
//     <>
//       <Image
//         src="/assets/images/plane.webp"
//         alt="Plane"
//         width={100}
//         height={100}
//         className="size-16"
//       />
//       <div>
//         <p className="font-light text-gray-500 dark:text-gray-300 mt-5">
//           Learn how millions of customers move their money globally
//         </p>
//       </div>
//     </>
//   );

//   return (
//     // Apply sticky styles conditionally to the main header element
//     <header
//       className={`header w-full transition-all duration-300 ease-in-out ${
//         isSticky
//           ? "fixed top-0 left-0 right-0 z-50 bg-background dark:bg-darkbackground shadow-md" // Sticky styles: fixed position, top/left/right 0, z-index, background, shadow
//           : "relative bg-transparent" // Non-sticky styles: relative positioning (or static), transparent background
//       }`}
//     >
//       {/* Remove shadow/border when sticky if background/shadow is handled by the outer header */}
//       <div className="px-4 bg-[#f2f4f7] dark:bg-background ">
//         <nav className="flex items-center gap-6 md:h-20 h-18 container mx-auto" aria-label="Global">
//           {/* Logo */}
//           <div>
//             <Link href="/">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="Wise Logo"
//                 width={120}
//                 height={28}
//                 // Add dark mode logo variant if needed
//                 // className="dark:hidden"
//               />
//             </Link>
//           </div>

//           <div className="flex justify-end items-center w-full">
//             {isLargeScreen && (
//               <>
//                 <div className="flex justify-end items-center gap-2 flex-1/2 w-full">
//                   {/* Home Link */}
//                   <Link
//                     href="/"
//                     className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//                   >
//                     Home
//                   </Link>

//                   {/* About Link */}
//                   <Link
//                     href="/about-us" // Assuming you have an about page
//                     className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//                   >
//                     About
//                   </Link>

//                   {/* Features Dropdown */}
//                   <FeatureDropdown
//                     buttonText="Features"
//                     links={featureLinks}
//                     topContent={topContent}
//                     onLinkClick={closeMobileMenu} // Close mobile menu if a link is clicked (though this dropdown is for large screens)
//                   />

//                   {/* Help Link */}
//                   <Link
//                     href="/reviews"
//                     className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//                   >
//                     Reviews
//                   </Link>

//                   {/* Help Link */}
//                   <Link
//                     href="/faqs"
//                     className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//                   >
//                     Help
//                   </Link>
//                 </div>

//                 {/* Theme Toggle */}
//                 <div className="flex items-center mx-2">
//                   <ThemeToggle location="header" />
//                 </div>
//               </>
//             )}

//             <div className="flex items-center gap-2">
//               <Link
//                 href="/auth/register"
//                 className="px-4 py-1.5 hidden lg:block  dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-gray/5 dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-mainheading"
//               >
//                 Register
//               </Link>

//               {/* Login Button (Visible on Large Screens) */}
//               <Link
//                 href="/auth/login"
//                 className="bg-primary px-4 py-1.5 hidden lg:block text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading"
//               >
//                 Log in
//               </Link>

//               {/* Hamburger/Close Button (Mobile/Tablet) */}
//               {!isLargeScreen && (
//                 <>
//                   {!isMobileMenuOpen ? (
//                     <button
//                       onClick={toggleMobileMenu}
//                       className="text-primary p-2 cursor-pointer"
//                       aria-label="Open Mobile Menu"
//                     >
//                       <GiHamburgerMenu size={26} />
//                     </button>
//                   ) : (
//                     <button
//                       onClick={closeMobileMenu}
//                       aria-label="Close Mobile Menu"
//                       className="text-neutral-900 cursor-pointer" // Keep consistent styling or adjust as needed
//                     >
//                       <IoClose className="size-10 hover:bg-gray-300 text-mainheading dark:text-white hover:dark:bg-primarybox p-1.5 rounded-full transition-colors duration-300 ease-in-out" />
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen &&
//           !isLargeScreen && ( // Ensure menu only shows when open AND not on large screen
//             <motion.div
//               key="mobile-menu" // Add key for AnimatePresence to track the element
//               className="fixed inset-0 z-40 lg:hidden" // Use fixed positioning and ensure it's behind the sticky header's z-index if needed
//               variants={mobileMenuVariants}
//               initial="closed"
//               animate="open"
//               exit="closed"
//             >
//               <MobileMenu
//                 isOpen={isMobileMenuOpen}
//                 onClose={closeMobileMenu}
//                 featureLinks={featureLinks}
//                 topContent={topContent}
//               />
//             </motion.div>
//           )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5"; // Correct import for the close icon
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu"; // Adjust path if needed
import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Adjust path if needed
import ThemeToggle from "../../../contexts/ThemeToggle"; // Adjust path if needed

// Define a type for the feature links
interface FeatureLink {
  href: string;
  text: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false); // State for sticky header

  // --- State Toggling Functions ---
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // --- Effects ---

  // Effect for screen size detection and closing menu on resize to large screen
  useEffect(() => {
    const checkScreenSize = () => {
      const large = window.innerWidth >= 1024; // lg breakpoint
      setIsLargeScreen(large);
      if (large && isMobileMenuOpen) {
        closeMobileMenu(); // Close mobile menu if screen becomes large
      }
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobileMenuOpen]); // Re-run if menu state changes

  // Effect for handling body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]); // Dependency on menu state

  // Effect for handling scroll position and setting sticky state
  useEffect(() => {
    const handleScroll = () => {
      // Set sticky state based on scroll position (e.g., > 100px)
      setIsSticky(window.scrollY > 100); // Adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Run only on mount and unmount

  // --- Animation Variants ---
  const mobileMenuVariants = {
    open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
    closed: {
      x: "-100%", // Slide out to the left
      opacity: 0.8, // Optional: fade out slightly
      transition: { type: "tween", duration: 0.3 },
    },
  };

  // --- Data for Dropdowns/Links ---
  const featureLinks: FeatureLink[] = [
    { href: "/dashboard", text: "Send Money" },
    { href: "/sendlargeamount", text: "Send Large Amounts" },
    { href: "/feature-3", text: "Another Feature" }, // Example
  ];

  const topContent = // Example top content for dropdown
    (
      <>
        <Image
          src="/assets/images/plane.webp" // Ensure this path is correct
          alt="Plane"
          width={64} // Adjusted size
          height={64}
          className="size-16 mx-auto mb-2" // Centered and margin bottom
        />
        <div>
          <p className="text-sm font-light text-gray-600 dark:text-gray-400 text-center px-4">
            Learn how millions of customers move their money globally.
          </p>
        </div>
      </>
    );

  // --- Component Return ---
  return (
    <header
      className={`w-full transition-all duration-300 ease-in-out z-50 ${
        isSticky
          ? "fixed top-0 left-0 right-0 bg-white dark:bg-background shadow-md" // Sticky styles
          : "relative bg-[#f2f4f7] dark:bg-background" // Non-sticky styles (adjust initial background if needed)
      }`}
    >
      <div className="px-4">
        {" "}
        {/* Removed specific background color here, handled by header */}
        <nav
          className="flex items-center justify-between gap-4 md:h-20 h-[72px] container mx-auto"
          aria-label="Global"
        >
          {" "}
          {/* Adjusted height to 72px for h-18 */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeMobileMenu}>
              {" "}
              {/* Close menu if logo clicked */}
              <Image
                // Consider using different logos for light/dark if needed
                src="/assets/images/wise-logo.svg" // Ensure path is correct
                alt="Wise Logo"
                width={100} // Slightly smaller logo maybe?
                height={24}
                priority // Prioritize loading the logo
              />
            </Link>
          </div>
          {/* Desktop Navigation & Actions */}
          <div className="hidden lg:flex flex-grow items-center justify-end gap-2">
            {/* Desktop Links */}
            <Link
              href="/"
              className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
            >
              About
            </Link>

            <FeatureDropdown
              buttonText="Features"
              links={featureLinks}
              topContent={topContent}
              buttonClassName="nav-link-desktop" // Use consistent styling
              // onLinkClick is not strictly needed here as it's desktop
            />

            <Link
              href="/reviews"
              className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
            >
              Reviews
            </Link>

            <Link
              href="/faqs"
              className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
            >
              Help
            </Link>

            {/* Theme Toggle */}
            <div className="mx-2">
              <ThemeToggle location="header" />
            </div>

            <Link
              href="/auth/register"
              className="px-4 py-1.5 hidden lg:block  dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-gray/5 dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-mainheading"
            >
              Register
            </Link>

            {/* Login Button (Visible on Large Screens) */}
            <Link
              href="/auth/login"
              className="bg-primary px-4 py-1.5 hidden lg:block text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading"
            >
              Log in
            </Link>
            
          </div>
          {/* Mobile Actions (Hamburger/Close & Theme Toggle) */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Theme Toggle for Mobile */}
            <ThemeToggle location="header" />

            {/* Hamburger/Close Button */}
            {!isMobileMenuOpen ? (
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-primary dark:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Open Menu"
                aria-expanded="false"
              >
                <GiHamburgerMenu size={24} />
              </button>
            ) : (
              <button
                onClick={closeMobileMenu} // *** CRITICAL: Ensure this calls closeMobileMenu ***
                className="p-1.5 text-mainheading dark:text-white hover:bg-gray-200 dark:hover:bg-primarybox rounded-full transition-colors"
                aria-label="Close Menu"
                aria-expanded="true"
              >
                {/* Using IoClose as requested */}
                <IoClose size={28} />
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen &&
          !isLargeScreen && ( // Only show if open AND on small screen
            <motion.div
              key="mobile-menu"
              className="fixed inset-0 z-40 lg:hidden" // Use fixed positioning
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              // Optional: Add a backdrop
              // onClick={closeMobileMenu} // Close if backdrop is clicked
            >
              {/* Backdrop - uncomment if desired */}
              {/* <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" /> */}

              {/* The actual menu component */}
              <MobileMenu
                isOpen={isMobileMenuOpen} // Pass isOpen state
                onClose={closeMobileMenu} // *** CRITICAL: Pass the closer function ***
                featureLinks={featureLinks}
                topContent={topContent}
              />
            </motion.div>
          )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
