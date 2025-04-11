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

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu"; // Ensure MobileMenu has proper TypeScript definitions
import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Ensure FeatureDropdown has proper TypeScript definitions
import ThemeToggle from "../../../contexts/ThemeToggle"; // Import ThemeToggle
import { IoClose } from "react-icons/io5";

// Define a type for the feature links
interface FeatureLink {
  href: string;
  text: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      if (large && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const mobileMenuVariants = {
    open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  const featureLinks: FeatureLink[] = [
    { href: "/dashboard", text: "Send Money" },
    { href: "/sendlargeamount", text: "Send Large Amounts" },
    // Add more features here as needed
  ];

  const topContent = (
    <>
      <Image
        src="/assets/images/plane.webp"
        alt="Plane"
        width={100}
        height={100}
        className="size-16"
      />
      <div>
        <p className="font-light text-gray-500 dark:text-gray-300 mt-5">
          Learn how millions of customers move their money globally
        </p>
      </div>
    </>
  );

  return (
    <header className="header">
      <div className="shadow border">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-6 h-20" aria-label="Global">
            {/* Logo */}
            <div>
              <Link href="/">
                <Image
                  src="/assets/images/wise-logo.svg"
                  alt="Wise Logo"
                  width={120}
                  height={28}
                />
              </Link>
            </div>

            <div className="flex justify-end items-center w-full">
              {isLargeScreen && (
                <>
                  <div className="flex justify-end items-center gap-2.5 flex-1/2 w-full">
                    <Link
                      href="/"
                      className="px-2.5 py-1.5 rounded-full font-medium hover:bg-lightgray dark:hover:bg-primarybox"
                    >
                      Home
                    </Link>

                    <Link
                      href="/"
                      className="px-2.5 py-1.5 rounded-full font-medium hover:bg-lightgray dark:hover:bg-primarybox"
                    >
                      About
                    </Link>

                    <FeatureDropdown
                      buttonText="Features"
                      links={featureLinks}
                      topContent={topContent}
                      onLinkClick={closeMobileMenu}
                    />

                    <Link
                      href="/help"
                      className="px-2.5 py-1.5 rounded-full font-medium hover:bg-lightgray dark:hover:bg-primarybox"
                    >
                      Help
                    </Link>
                  </div>

                  <div className="flex items-center mr-2">
                    <ThemeToggle location="header" />
                  </div>
                </>
              )}

              <div className="flex items-center gap-2">
                {/* Login and Hamburger for Mobile */}
                {!isMobileMenuOpen && (
                  <>
                    <Link
                      href="/auth/login"
                      className="bg-primary px-8 py-1.5 lg:block hidden text-nowrap font-medium text-lg rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading"
                    >
                      Log in
                    </Link>

                    {!isLargeScreen && (
                      <button
                        onClick={toggleMobileMenu}
                        className="text-primary p-2 cursor-pointer"
                        aria-label="Open Mobile Menu"
                      >
                        <GiHamburgerMenu size={26} />
                      </button>
                    )}
                  </>
                )}

                {/* Close Button (Mobile) */}
                {isMobileMenuOpen && !isLargeScreen && (
                  <button
                    onClick={closeMobileMenu}
                    aria-label="Close Mobile Menu"
                    className="text-neutral-900 cursor-pointer"
                  >
                    <IoClose className="size-10 hover:bg-gray-300 text-mainheading dark:text-white hover:dark:bg-primarybox p-1.5 rounded-full transition-colors duration-300 ease-in-out" />
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={closeMobileMenu}
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
