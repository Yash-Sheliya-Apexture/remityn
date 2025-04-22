// components/Footer.tsx

// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../public/assets/icons/logo.svg";

// import { LuFacebook, LuInstagram } from "react-icons/lu";
// import { FaXTwitter } from "react-icons/fa6";

// const Footer: React.FC = () => {
//   const currencyPairs = [
//     "USD to INR",
//     "AED to INR",
//     "AUD to INR",
//     "CAD to INR",
//     "EUR to INR",
//   ];
//   return (
//     <footer className="py-12">
//       <div className="container mx-auto px-4 ">
//         <div className="inline-flex items-center w-full mb-12">
//           <Image src={logo} alt="logo" />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-green text-2xl font-semibold pb-4">Company</h3>
//             <ul className="space-y-3 text-gray font-light">
//               <li>
//                 <Link href="">About Us</Link>
//               </li>
//               <li>
//                 <Link href="">Careers</Link>
//               </li>
//               <li>
//                 <Link href="">Customer Reviews</Link>
//               </li>
//               <li>
//                 <Link href="">Pricing</Link>
//               </li>
//               <li>
//                 <Link href="">Help</Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-green text-2xl font-semibold pb-4">Products</h3>
//             <ul className="space-y-3 text-gray font-light">
//               <li>
//                 <Link href="">Send money to India</Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-green text-2xl font-semibold pb-4">
//               Resources
//             </h3>
//             <ul className="space-y-3 text-gray font-light">
//               <li>
//                 <Link href="">News and Blogs</Link>
//               </li>
//               <li>
//                 <Link href="">Privacy Policy</Link>
//               </li>
//               <li>
//                 <Link href="">Terms of Use</Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-green text-2xl font-semibold pb-4">
//               Follow Us
//             </h3>
//             <ul className="flex items-center gap-4">
//               <li className="p-2 bg-green/10 rounded-full">
//                 <Link href="" className="text-gray font-light">
//                   <LuFacebook size={20} className="text-main" />
//                 </Link>
//               </li>
//               <li className="p-2 bg-green/10 rounded-full">
//                 <Link href="" className="text-gray font-light">
//                   <FaXTwitter size={20} className="text-main" />
//                 </Link>
//               </li>
//               <li className="p-2 bg-green/10 rounded-full">
//                 <Link href="" className="text-gray font-light">
//                   <LuInstagram size={20} className="text-main" />
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <hr className="my-6" />
//         <div>
//           <h3 className="text-green text-lg font-semibold pb-4">
//             Currency Converters
//           </h3>

//           <div className="flex flex-wrap ">
//             {currencyPairs.map((pair, index) => (
//               <div className="text-gray font-light" key={pair}>
//                 <Link href="#">{pair}</Link>
//                 {index !== currencyPairs.length - 1 && (
//                   <span className="mx-4">|</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <hr className="my-6" />

//         <div className="space-y-4 text-center">
//           <p className="text-green font-medium">
//             © Wise Payments Limited {new Date().getFullYear()}
//           </p>
//           <p className="text-gray font-light">Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// "use client"
// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import logo from "../../../../public/assets/icons/logo.svg";
// import { LuFacebook, LuInstagram, LuChevronDown } from "react-icons/lu";
// import { FaXTwitter } from "react-icons/fa6";

// const Footer: React.FC = () => {
//   const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

//   const toggleSection = (section: string) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const sections = [
//     {
//       title: "Company",
//       key: "company",
//       links: ["About Us", "Careers", "Customer Reviews", "Pricing", "Help"],
//     },
//     {
//       title: "Products",
//       key: "products",
//       links: ["Send money to India"],
//     },
//     {
//       title: "Resources",
//       key: "resources",
//       links: ["News and Blogs", "Privacy Policy", "Terms of Use"],
//     },
//     {
//       title: "Follow Us",
//       key: "followUs",
//       links: [
//         { icon: <LuFacebook size={20} />, href: "#" },
//         { icon: <FaXTwitter size={20} />, href: "#" },
//         { icon: <LuInstagram size={20} />, href: "#" },
//       ],
//     },
//   ];

//   const currencyPairs = [
//     "USD to INR",
//     "AED to INR",
//     "AUD to INR",
//     "CAD to INR",
//     "EUR to INR",
//   ];

//   return (
//     <footer className="py-12">
//       <div className="container mx-auto px-4">
//         <div className="inline-flex items-center w-full mb-12">
//           <Image src={logo} alt="logo" />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {sections.map(({ title, key, links }) => (
//             <div key={key}>
//               {/* Normal Heading for Large Screens */}
//               <h3 className="text-green text-2xl font-semibold pb-4 hidden sm:block">{title}</h3>

//               {/* Toggle Dropdown for Small Screens */}
//               <div
//                 className="flex justify-between items-center cursor-pointer pb-4 sm:hidden"
//                 onClick={() => toggleSection(key)}
//               >
//                 <h3 className="text-green text-2xl font-semibold">{title}</h3>
//                 <button>
//                   <LuChevronDown
//                     size={20}
//                     className={`text-green transition-transform duration-300 ${
//                       openSections[key] ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//               </div>

//               {/* Small Screen Dropdown */}
//               <ul
//                 className={`sm:hidden space-y-3 text-gray font-light overflow-hidden transition-all duration-300 ${
//                   openSections[key] ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 {key === "followUs"
//                   ? links.map(({ icon, href }, index) => (
//                       <li key={index} className="p-2 bg-green/10 rounded-full inline-block">
//                         <Link href={href}>{icon}</Link>
//                       </li>
//                     ))
//                   : links.map((link, index) => (
//                       <li key={index}>
//                         <Link href="#">{link}</Link>
//                       </li>
//                     ))}
//               </ul>

//               {/* Normal Display for Larger Screens */}
//               <ul className="hidden sm:block space-y-3 text-gray font-light">
//                 {key === "followUs"
//                   ? links.map(({ icon, href }, index) => (
//                       <li key={index} className="p-2 bg-green/10 rounded-full inline-block">
//                         <Link href={href}>{icon}</Link>
//                       </li>
//                     ))
//                   : links.map((link, index) => (
//                       <li key={index}>
//                         <Link href="#">{link}</Link>
//                       </li>
//                     ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <hr className="my-6" />
//         <div>
//           <h3 className="text-green text-lg font-semibold pb-4">
//             Currency Converters
//           </h3>

//           <div className="flex flex-wrap">
//             {currencyPairs.map((pair, index) => (
//               <div className="text-gray font-light" key={pair}>
//                 <Link href="#">{pair}</Link>
//                 {index !== currencyPairs.length - 1 && <span className="mx-4">|</span>}
//               </div>
//             ))}
//           </div>
//         </div>

//         <hr className="my-6" />
//         <div className="space-y-4 text-center">
//           <p className="text-green font-medium">
//             © Wise Payments Limited {new Date().getFullYear()}
//           </p>
//           <p className="text-gray font-light">
//             Wise is authorised by the Financial Conduct Authority under the Electronic Money
//             Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise
//             works with a local bank partner to offer the service in India with the approval of the
//             Reserve Bank of India.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../public/assets/icons/logo.svg";
// import { LuFacebook, LuInstagram } from "react-icons/lu";
// import { FaXTwitter } from "react-icons/fa6";
// import { useState, useEffect } from "react";
// import { HiX } from "react-icons/hi";
// import { TiArrowSortedDown } from "react-icons/ti";

// import { IconType } from "react-icons";
// import { motion, AnimatePresence } from "framer-motion";

// interface FooterLink {
//   href: string;
//   label: string;
// }

// interface SocialLink extends FooterLink {
//   icon: IconType;
// }

// interface FooterSection {
//   title: string;
//   links?: FooterLink[];
//   socialLinks?: SocialLink[];
// }

// interface FooterData {
//   sections: FooterSection[];
//   currencyConverters: string[];
//   copyright: string;
//   disclaimer: string;
// }

// const Footer: React.FC = () => {
//   const footerData: FooterData = {
//     sections: [
//       {
//         title: "Company",
//         links: [
//           { href: "", label: "About Us" },
//           { href: "", label: "Careers" },
//           { href: "", label: "Customer Reviews" },
//           { href: "", label: "Pricing" },
//           { href: "", label: "Help" },
//         ],
//       },
//       {
//         title: "Products",
//         links: [{ href: "", label: "Send money to India" }],
//       },
//       {
//         title: "Resources",
//         links: [
//           { href: "", label: "News and Blogs" },
//           { href: "", label: "Privacy Policy" },
//           { href: "", label: "Terms of Use" },
//         ],
//       },
//       {
//         title: "Follow Us",
//         socialLinks: [
//           { href: "", label: "Facebook", icon: LuFacebook },
//           { href: "", label: "Twitter", icon: FaXTwitter },
//           { href: "", label: "Instagram", icon: LuInstagram },
//         ],
//       },
//     ],
//     currencyConverters: [
//       "USD to INR",
//       "AED to INR",
//       "AUD to INR",
//       "CAD to INR",
//       "EUR to INR",
//     ],
//     copyright: `Wise Payments Limited ${new Date().getFullYear()}`,
//     disclaimer:
//       "Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.",
//   };

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const toggleDropdown = (title: string) => {
//     setOpenDropdown(openDropdown === title ? null : title);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const renderLinkList = (links: FooterLink[] | undefined) => (
//     <ul className="space-y-3 text-gray font-light">
//       {links?.map((link) => (
//         <li key={link.label}>
//           <div className="relative group w-fit">
//             <Link href={link.href} className="relative z-10">
//               {link.label}
//             </Link>
//             <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );

//   const renderSocialLinks = (socialLinks: SocialLink[] | undefined) => (
//     <ul className="flex items-center gap-4 mt-4">
//       {socialLinks?.map((link) => (
//         <li key={link.label} className="p-2 bg-green/10 rounded-full">
//           <Link
//             href={link.href}
//             className="text-gray font-light"
//             aria-label={link.label}
//           >
//             <link.icon size={18} className="text-main" />
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <footer className="py-12">
//       <div className="container mx-auto px-4 ">
//         <div className="inline-flex items-center w-full mb-12">
//           <Image src={logo} alt="logo" />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {footerData.sections.map((section) => (
//             <div key={section.title}>
//               {/* Heading and Toggle (Common to both views) */}
//               <div
//                 className={`${
//                   isMobile
//                     ? "flex justify-between items-center pb-4 cursor-pointer"
//                     : "pb-4"
//                 }`}
//                 onClick={
//                   isMobile ? () => toggleDropdown(section.title) : undefined
//                 }
//               >
//                 <h3 className="text-green md:text-2xl text-xl font-semibold">
//                   {section.title}
//                 </h3>
//                 {isMobile && (
//                   <button
//                     aria-expanded={openDropdown === section.title}
//                     aria-controls={`${section.title.toLowerCase()}-dropdown-menu`}
//                   >
//                     {openDropdown === section.title ? (
//                       <HiX size={24} className="text-green" />
//                     ) : (
//                       <TiArrowSortedDown size={24} className="text-green" />
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* Conditionally Rendered Content with Animation */}
//               <AnimatePresence>
//                 {(!isMobile || (isMobile && openDropdown === section.title)) &&
//                   section.links && ( // Corrected condition
//                     <motion.div
//                       key={`${section.title}-links`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       {renderLinkList(section.links)}
//                     </motion.div>
//                   )}

//                 {/* Conditionally render social links with animation */}
//                 {(!isMobile || (isMobile && openDropdown === section.title)) &&
//                   section.socialLinks && ( //correct condition
//                     <motion.div
//                       key={`${section.title}-social`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       {renderSocialLinks(section.socialLinks)}
//                     </motion.div>
//                   )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>

//         {/* ... (rest of the footer: currency converters, copyright, etc.) ... */}
//         <hr className="my-6" />
//         <div>
//           <h3 className="text-green text-lg font-semibold pb-4">
//             Currency Converters
//           </h3>

//           {/* currency converters */}
//           <div className="flex flex-wrap">
//             {footerData.currencyConverters.map((pair, index) => (
//               <div className="text-gray font-light" key={pair}>
//                 <div className="relative group w-fit inline-block">
//                   <button className="relative z-10">
//                     {pair}
//                   </button>
//                   <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green transform scale-x-0 origin-right transition-transform duration-300 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//                 </div>
//                 {index !== footerData.currencyConverters.length - 1 && (
//                   <span className="mx-4">|</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <hr className="my-6" />

//         <div className="space-y-4 text-center">
//           <p className="text-green font-medium">{footerData.copyright}</p>
//           <p className="text-gray font-light">{footerData.disclaimer}</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// // app/components/Footer.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { LuFacebook, LuInstagram } from "react-icons/lu";
// import { FaXTwitter } from "react-icons/fa6";
// import { useState, useEffect } from "react";
// import { HiX } from "react-icons/hi";
// import { TiArrowSortedDown } from "react-icons/ti";

// import { IconType } from "react-icons";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAppContext } from "../layout"; // Import
// import { useRouter } from "next/navigation"; // Import useRouter

// interface FooterLink {
//   href: string;
//   label: string;
// }

// interface SocialLink extends FooterLink {
//   icon: IconType;
// }

// interface FooterSection {
//   title: string;
//   links?: FooterLink[];
//   socialLinks?: SocialLink[];
// }

// interface FooterData {
//   sections: FooterSection[];
//   currencyConverters: string[];
//   copyright: string;
//   disclaimer: string;
// }

// const Footer: React.FC = () => {
//   const footerData: FooterData = {
//     // ... (footerData remains the same) ...
//     sections: [
//       {
//         title: "Company",
//         links: [
//           { href: "", label: "About Us" },
//           { href: "", label: "Careers" },
//           { href: "", label: "Customer Reviews" },
//           { href: "", label: "Pricing" },
//           { href: "", label: "Help" },
//         ],
//       },
//       {
//         title: "Products",
//         links: [{ href: "", label: "Send money to India" }],
//       },
//       {
//         title: "Resources",
//         links: [
//           { href: "", label: "News and Blogs" },
//           { href: "", label: "Privacy Policy" },
//           { href: "", label: "Terms of Use" },
//         ],
//       },
//       {
//         title: "Follow Us",
//         socialLinks: [
//           { href: "", label: "Facebook", icon: LuFacebook },
//           { href: "", label: "Twitter", icon: FaXTwitter },
//           { href: "", label: "Instagram", icon: LuInstagram },
//         ],
//       },
//     ],
//     currencyConverters: [
//       "USD to INR",
//       "AED to INR",
//       "AUD to INR",
//       "CAD to INR",
//       "EUR to INR",
//     ],
//     copyright: `Wise Payments Limited ${new Date().getFullYear()}`,
//     disclaimer:
//       "Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.",
//   };

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const { setSelectedSendCurrency } = useAppContext();
//   const router = useRouter(); // Initialize useRouter

//   const toggleDropdown = (title: string) => {
//     setOpenDropdown(openDropdown === title ? null : title);
//   };

//   useEffect(() => {
//     // ... (useEffect for window resize remains the same) ...
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const renderLinkList = (links: FooterLink[] | undefined) => (
//     // ... (renderLinkList remains the same) ...
//     <ul className="space-y-3 text-gray font-light">
//       {links?.map((link) => (
//         <li key={link.label}>
//           <div className="relative group w-fit">
//             <Link href={link.href} className="relative z-10">
//               {link.label}
//             </Link>
//             <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );

//   const renderSocialLinks = (socialLinks: SocialLink[] | undefined) => (
//     // ... (renderSocialLinks remains the same) ...
//     <ul className="flex items-center gap-4 mt-4">
//       {socialLinks?.map((link) => (
//         <li key={link.label} className="p-2 bg-green/10 rounded-full">
//           <Link
//             href={link.href}
//             className="text-gray font-light"
//             aria-label={link.label}
//           >
//             <link.icon size={18} className="text-main" />
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );

//   const handleCurrencyConverterClick = (converter: string) => {
//     const currencyCode = converter.split(" ")[0];
//     setSelectedSendCurrency(currencyCode);
//     router.push("/"); // Redirect to the homepage (where HeroSection is)
//   };

//   return (
//     // ... (rest of the Footer JSX remains the same, except for the onClick) ...
//     <footer className="py-12">
//       <div className="container mx-auto px-4 ">
//         <div className="inline-flex items-center w-full mb-12">
//           <Image src="/assets/images/wise-logo.svg" alt="logo" height={100} width={100} />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {footerData.sections.map((section) => (
//             <div key={section.title}>
//               {/* Heading and Toggle (Common to both views) */}
//               <div
//                 className={`${
//                   isMobile
//                     ? "flex justify-between items-center pb-4 cursor-pointer"
//                     : "pb-4"
//                 }`}
//                 onClick={
//                   isMobile ? () => toggleDropdown(section.title) : undefined
//                 }
//               >
//                 <h3 className="text-green md:text-2xl text-xl font-semibold">
//                   {section.title}
//                 </h3>
//                 {isMobile && (
//                   <button
//                     aria-expanded={openDropdown === section.title}
//                     aria-controls={`${section.title.toLowerCase()}-dropdown-menu`}
//                   >
//                     {openDropdown === section.title ? (
//                       <HiX size={24} className="text-green" />
//                     ) : (
//                       <TiArrowSortedDown size={24} className="text-green" />
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* Conditionally Rendered Content with Animation */}
//               <AnimatePresence>
//                 {(!isMobile || (isMobile && openDropdown === section.title)) &&
//                   section.links && ( // Corrected condition
//                     <motion.div
//                       key={`${section.title}-links`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       {renderLinkList(section.links)}
//                     </motion.div>
//                   )}

//                 {/* Conditionally render social links with animation */}
//                 {(!isMobile || (isMobile && openDropdown === section.title)) &&
//                   section.socialLinks && ( //correct condition
//                     <motion.div
//                       key={`${section.title}-social`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       {renderSocialLinks(section.socialLinks)}
//                     </motion.div>
//                   )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>

//         {/* ... (rest of the footer: currency converters, copyright, etc.) ... */}
//         <hr className="my-6" />
//         <div>
//           <h3 className="text-green text-lg font-semibold pb-4">
//             Currency Converters
//           </h3>

//           {/* currency converters */}
//           <div className="flex flex-wrap">
//             {footerData.currencyConverters.map((pair, index) => (
//               <div className="text-gray font-light" key={pair}>
//                 <div className="relative group w-fit inline-block">
//                   <button
//                     className="relative z-10"
//                     onClick={() => handleCurrencyConverterClick(pair)} // Add click handler
//                   >
//                     {pair}
//                   </button>
//                   <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//                 </div>
//                 {index !== footerData.currencyConverters.length - 1 && (
//                   <span className="mx-4">|</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <hr className="my-6" />

//         <div className="space-y-4 text-center">
//           <p className="text-green font-medium">{footerData.copyright}</p>
//           <p className="text-gray font-light">{footerData.disclaimer}</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



// app/components/Footer.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import { TiArrowSortedDown } from "react-icons/ti";
import { IconType } from "react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../../contexts/WebsiteAppContext";
import { useRouter } from "next/navigation";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { ReactNode } from "react";

interface FooterLink {
  href: string;
  label: string | ReactNode;
}

interface SocialLink extends FooterLink {
  icon: IconType;
}

interface FooterSection {
  title: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
}

interface FooterData {
  sections: FooterSection[];
  currencyConverters: string[];
  copyright: string;
  disclaimer: string;
}

const Footer: React.FC = () => {
  const footerData: FooterData = {
    sections: [
      {
        title: "Company",
        links: [
          { href: "/", label: "Home" },
          { href: "/about-us", label: "About" },
          { href: "/features", label: "Features" },
          { href: "/reviews", label: "Reviews" },
        ],
      },
      {
        title: "Help",
        links: [
          { href: "/privacy-policy", label: "Privacy Policy" },
          {
            href: "/terms-and-conditions",
            label: <>Terms and Conditions</>,
          },
          { href: "#faq", label: "FAQs" },
        ],
      },
    ],

    currencyConverters: [
      "USD to INR",
      "AED to INR",
      "AUD to INR",
      "CAD to INR",
      "EUR to INR",
    ],
    copyright: `Apexture Payments Limited @${new Date().getFullYear()}`,
    disclaimer:
      "Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.",
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { setSelectedSendCurrency } = useAppContext();
  const router = useRouter();

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderLinkList = (links: FooterLink[] | undefined) => (
    <ul className="space-y-3 text-mainheading font-medium dark:text-white">
      {links?.map((link) => (
        <li key={link.href}>
          <div className="relative group w-fit lg:text-base text-sm">
            <Link href={link.href} className="relative z-10">
              {link.label}
            </Link>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-mainheading dark:bg-primary transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
          </div>
        </li>
      ))}
    </ul>
  );

  const renderSocialLinks = (socialLinks: SocialLink[] | undefined) => (
    <ul className="flex flex-col w-fit gap-4">
      {socialLinks?.map((link) => (
        <li
          key={link.href}
          className="p-2.5 bg-black/10 dark:bg-secondary inline-block rounded-full group transition-colors ease-in-out duration-300"
        >
          <Link
            href={link.href}
            className="text-gray-500 dark:text-gray-300"
            aria-label={typeof link.label === "string" ? link.label : undefined}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  const handleCurrencyConverterClick = (converter: string) => {
    const currencyCode = converter.split(" ")[0];
    setSelectedSendCurrency(currencyCode);
    router.push("/");
  };

  return (
    <footer className="bg-white dark:bg-background px-4 pb-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start w-full lg:gap-6">
        <div className="flex flex-col">
          <Image
            src="/assets/images/wise-logo.svg"
            alt="logo"
            height={100}
            width={100}
            className="lg:size-28 size-20"
          />

          <p className="max-w-3xl text-mainheading dark:text-white lg:text-lg text-sm">
            We provide reliable and competitive currency exchange services with
            real-time rates, secure transactions, and excellent customer
            support. Whether you're traveling, investing, or sending money
            abroad, trust us to handle your currency needs with transparency and
            speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
          {footerData.sections.map((section) => (
            <div key={section.title}>
              <div
                className={`${
                  isMobile
                    ? "flex items-center justify-between gap-1 pb-4 cursor-pointer"
                    : "pb-4"
                }`}
                onClick={
                  isMobile ? () => toggleDropdown(section.title) : undefined
                }
              >
                <h3 className="text-lime-500 dark:text-primary lg:text-xl font-medium">
                  {section.title}
                </h3>

                {isMobile && (
                  <button
                    aria-expanded={openDropdown === section.title}
                    aria-controls={`${section.title.toLowerCase()}-dropdown-menu`}
                  >
                    {openDropdown === section.title ? (
                      <HiX className="dark:text-white text-mainheading size-4 mt-0.5" />
                    ) : (
                      <TiArrowSortedDown className="dark:text-white text-mainheading size-4 mt-0.5" />
                    )}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {(!isMobile || (isMobile && openDropdown === section.title)) &&
                  section.links && (
                    <motion.div
                      key={`${section.title}-links`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      {renderLinkList(section.links)}
                    </motion.div>
                  )}

                {(!isMobile || (isMobile && openDropdown === section.title)) &&
                  section.socialLinks && (
                    <motion.div
                      key={`${section.title}-social`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      {renderSocialLinks(section.socialLinks)}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-6 container mx-auto" />
      <div className="container mx-auto">
        <h3 className="text-lime-500 lg:text-lg text-base font-semibold pb-4">
          Currency Converters
        </h3>

        <div className="flex flex-wrap">
          {footerData.currencyConverters.map((pair, index) => (
            <div className="text-mainheading dark:text-white" key={pair}>
              <div className="relative group w-fit inline-block">
                <button
                  className="relative z-10 cursor-pointer text-sm lg:text-base"
                  onClick={() => handleCurrencyConverterClick(pair)}
                >
                  {pair}
                </button>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-mainheading dark:bg-primary transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
              </div>
              {index !== footerData.currencyConverters.length - 1 && (
                <span className="mx-4">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="container mx-auto my-5" />
      <div className="flex justify-between items-center container mx-auto">
        <p className="text-mainheading dark:text-primary lg:text-lg text-sm">
          {footerData.copyright}
        </p>
        <div className="flex gap-2">
          <a href="">
            <IoLogoWhatsapp className="lg:size-8 size-6 text-[#25D366]" />
          </a>
          <a href="">
            <FaTelegram className="lg:size-8 size-6 text-[#3390EC]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
