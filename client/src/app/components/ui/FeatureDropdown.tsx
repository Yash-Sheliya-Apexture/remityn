// // components/FeatureDropdown/FeatureDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosArrowForward } from "react-icons/io";
// import plane from "../../../public/assets/icons/plane.webp"; // Adjust path as needed
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   onLinkClick?: () => void; // Optional callback for link clicks
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   onLinkClick,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   // Dropdown Content (now defined *inside* the component)
//   const dropdownContent = (
//     <div>
//         {/* Part One */}
//       <div className="p-8 flex flex-col justify-start bg-green/10">
//         <Image src={plane} alt="Plane" width={56} height={56} />
//         <div>
//           <p className="font-light text-gray">
//             Learn how millions of customers move their money globally
//           </p>
//         </div>
//       </div>

//         {/* Part Two */}
//       <div className="p-8 flex flex-col gap-4">
//         {/* Link 1 */}
//         <Link
//           href="/sendmoney"
//           passHref
//           className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//           onClick={() => {
//             setIsOpen(false); // Close dropdown on link click
//             onLinkClick?.(); // Call optional callback
//           }}
//         >
//           <p>Send money</p>
//           <IoIosArrowForward
//             size={18}
//             className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//           />
//           <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//         </Link>

//         {/* Link 2 */}
//         <Link
//           href="/sendlargeamount"
//           passHref
//           className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//           onClick={() => {
//             setIsOpen(false); // Close dropdown on link click
//              onLinkClick?.();
//           }}
//         >
//           <p>Send large amounts</p>
//           <IoIosArrowForward
//             size={18}
//             className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//           />
//           <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={toggleDropdown}
//         className={`px-2.5 py-1.5 rounded-full font-medium ${
//           buttonClassName || ""
//         }`}
//       >
//         {buttonText}
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             variants={dropdownVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className={`absolute right-0 top-15 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50 ${
//               dropdownClassName || ""
//             }`}
//           >
//             {dropdownContent} {/* Use the defined content */}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;

// // components/FeatureDropdown/FeatureDropdown.tsx  (Slightly Modified)

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosArrowForward } from "react-icons/io";
// import plane from "../../../public/assets/icons/plane.webp"; // Adjust path as needed
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   onLinkClick?: () => void; // Optional callback for link clicks
//   isOpen?: boolean;        //  <---  Add isOpen prop
//   toggleDropdown?: () => void; //  <--- Add toggleDropdown prop
//   isMobile?: boolean;       //  <--- Add isMobile prop
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   onLinkClick,
//   isOpen = false, // Default to closed, controlled by parent if provided
//   toggleDropdown,  //  Use prop for toggling
//   isMobile = false, // Add a flag for mobile styling

// }) => {
//   const [internalIsOpen, setInternalIsOpen] = useState(false); // Internal state
//   const dropdownRef = useRef<HTMLDivElement>(null);
//     const myIsOpen = isMobile ? isOpen : internalIsOpen;
//     const myToggleDropdown = isMobile ? toggleDropdown : () => setInternalIsOpen(!internalIsOpen);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setInternalIsOpen(false);
//       }
//     };

//     if (myIsOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [myIsOpen]);

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   const mobileDropdownVariants = {  // Separate variants for mobile
//     open: {
//       opacity: 1,
//       height: "auto", // Important for mobile!
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       height: 0,    //  Collapse height
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//         transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   // Dropdown Content
//   const dropdownContent = (
//     <div>
//       {/* Part One */}
//       <div className="p-8 flex flex-col justify-start bg-green/10">
//         <Image src={plane} alt="Plane" width={56} height={56} />
//         <div>
//           <p className="font-light text-gray">
//             Learn how millions of customers move their money globally
//           </p>
//         </div>
//       </div>

//       {/* Part Two */}
//       <div className="p-8 flex flex-col gap-4">
//         {/* Link 1 */}
//         <Link
//           href="/sendmoney"
//           passHref
//           className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//           onClick={() => {
//             setInternalIsOpen(false);
//             onLinkClick?.();
//           }}
//         >
//           <p>Send money</p>
//           <IoIosArrowForward
//             size={18}
//             className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//           />
//           <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//         </Link>

//         {/* Link 2 */}
//         <Link
//           href="/sendlargeamount"
//           passHref
//           className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//           onClick={() => {
//             setInternalIsOpen(false);
//             onLinkClick?.();
//           }}
//         >
//           <p>Send large amounts</p>
//           <IoIosArrowForward
//             size={18}
//             className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//           />
//           <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={myToggleDropdown}  // Use the correct toggle
//         className={`rounded-full font-medium ${buttonClassName || ""}`}
//       >
//         {buttonText}
//       </button>

//       <AnimatePresence>
//         {myIsOpen && (
//             <motion.div
//                 variants={isMobile ? mobileDropdownVariants : dropdownVariants} // Choose variants
//                 initial="closed"
//                 animate="open"
//                 exit="closed"
//                 className={isMobile ? `mt-2 pl-4` : `absolute right-0 top-13 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50 ${dropdownClassName || ""}`}
//             >
//                 {dropdownContent}
//             </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;

// components/FeatureDropdown/FeatureDropdown.tsx

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosArrowForward } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   onLinkClick?: () => void; // Optional callback for link clicks
//   isOpen?: boolean;        //  <---  Add isOpen prop
//   toggleDropdown?: () => void; //  <--- Add toggleDropdown prop
//   isMobile?: boolean;       //  <--- Add isMobile prop
//   links: { href: string; text: string }[]; // <--- Add links prop
//   topContent?: React.ReactNode;   // <---  Add Top Content
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   onLinkClick,
//   isOpen = false, // Default to closed, controlled by parent if provided
//   toggleDropdown,  //  Use prop for toggling
//   isMobile = false, // Add a flag for mobile styling
//   links,
//   topContent

// }) => {
//   const [internalIsOpen, setInternalIsOpen] = useState(false); // Internal state
//   const dropdownRef = useRef<HTMLDivElement>(null);
//     const myIsOpen = isMobile ? isOpen : internalIsOpen;
//     const myToggleDropdown = isMobile ? toggleDropdown : () => setInternalIsOpen(!internalIsOpen);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setInternalIsOpen(false);
//       }
//     };

//     if (myIsOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [myIsOpen]);

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   const mobileDropdownVariants = {  // Separate variants for mobile
//     open: {
//       opacity: 1,
//       height: "auto", // Important for mobile!
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       height: 0,    //  Collapse height
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//         transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   // Dropdown Content
//     const dropdownContent = (
//         <div>
//             {/* Top Content (Optional) */}
//             {topContent && (
//                 <div className="p-8 flex flex-col justify-start bg-green/10">
//                     {topContent}
//                 </div>
//             )}

//             {/* Links */}
//             <div className="p-8 flex flex-col gap-4">
//                 {links.map((link, index) => (
//                     <Link
//                         key={index}
//                         href={link.href}
//                         passHref
//                         className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                          onClick={() => {
//                             if (!isMobile) { //  <--- Close only on desktop
//                                 setInternalIsOpen(false);
//                             }
//                             onLinkClick?.();
//                         }}
//                     >
//                         <p>{link.text}</p>
//                         <IoIosArrowForward
//                             size={18}
//                             className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                         />
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-full"></span> {/* Full width on hover */}
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={myToggleDropdown}  // Use the correct toggle
//         className={`rounded-full font-medium ${buttonClassName || ""}`}
//       >
//         {buttonText}
//       </button>

//       <AnimatePresence>
//         {myIsOpen && (
//             <motion.div
//                 variants={isMobile ? mobileDropdownVariants : dropdownVariants} // Choose variants
//                 initial="closed"
//                 animate="open"
//                 exit="closed"
//                 className={isMobile ? `mt-2 pl-4` : `absolute right-0 top-13 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50 ${dropdownClassName || ""}`}
//             >
//                 {dropdownContent}
//             </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;

// // components/FeatureDropdown/FeatureDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { IoIosArrowForward } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   linkClassName?: string;       //  <--- Add linkClassName
//   topContentClassName?: string; // <--- Add topContentClassName
//   onLinkClick?: () => void;
//   isOpen?: boolean;
//   toggleDropdown?: () => void;
//   isMobile?: boolean;
//   links: { href: string; text: string }[];
//   topContent?: React.ReactNode;
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   linkClassName, //  <---  Use linkClassName
//   topContentClassName, // <---  Use topContentClassName
//   onLinkClick,
//   isOpen = false,
//   toggleDropdown,
//   isMobile = false,
//   links,
//   topContent,
// }) => {
//   const [internalIsOpen, setInternalIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const myIsOpen = isMobile ? isOpen : internalIsOpen;
//   const myToggleDropdown = isMobile ? toggleDropdown : () => setInternalIsOpen(!internalIsOpen);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setInternalIsOpen(false);
//       }
//     };

//     if (myIsOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [myIsOpen]);

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   const mobileDropdownVariants = {
//     open: {
//       opacity: 1,
//       height: "auto",
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       height: 0,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//     const dropdownContent = (
//         <div >
//             {/* Top Content (Optional) */}
//             {topContent && (
//                 <div className={`p-8 flex flex-col rounded-t-2xl justify-start bg-lightgray dark:bg-background mt-2 ${topContentClassName || ""}`}>
//                     {topContent}
//                 </div>
//             )}

//             {/* Links */}
//             <div className="p-8 flex flex-col gap-4 dark:bg-background bg-white border-t">
//                 {links.map((link, index) => (
//                   <div className="w-fit">
//                     <Link
//                         key={index}
//                         href={link.href}
//                         passHref
//                         className={`group relative inline-flex items-center gap-2 text-primary dark:text-white font-medium cursor-pointer ${linkClassName || ""}`} // Apply linkClassName here
//                         onClick={() => {
//                             if (!isMobile) {
//                                 setInternalIsOpen(false);
//                             }
//                             onLinkClick?.();
//                         }}
//                     >
//                         <p>{link.text}</p>
//                         <IoIosArrowForward
//                             size={18}
//                             className="opacity-100 translate-x-0 transition-all duration-300  group-hover:translate-x-3"
//                         />
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
//                     </Link>
//                   </div>
//                 ))}
//             </div>
//         </div>
//     );

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={myToggleDropdown}
//         className={`rounded-full font-medium  cursor-pointer px-2.5 py-1.5 hover:bg-lightgray dark:hover:bg-primarybox ${buttonClassName || ""}`}
//       >
//         {buttonText}
//       </button>

//       <AnimatePresence>
//         {myIsOpen && (
//           <motion.div
//             variants={isMobile ? mobileDropdownVariants : dropdownVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className={
//               isMobile
//                 ? `mt-2 pl-4`
//                 : `absolute right-0 top-16 w-md bg-white dark:bg-background rounded-xl overflow-hidden shadow-lg z-50 ${
//                     dropdownClassName || ""
//                   }`
//             }
//           >
//             {dropdownContent}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;

// components/FeatureDropdown/FeatureDropdown.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";



interface FeatureDropdownProps {
  buttonText: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  linkClassName?: string;
  topContentClassName?: string;
  onLinkClick?: () => void;
  isOpen?: boolean;
  toggleDropdown?: () => void;
  isMobile?: boolean;
  links: { href: string; text: string }[];
  topContent?: React.ReactNode;
}

const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
  buttonText,
  buttonClassName,
  dropdownClassName,
  linkClassName,
  topContentClassName,
  onLinkClick,
  isOpen = false,
  toggleDropdown,
  isMobile = false,
  links,
  topContent,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const myIsOpen = isMobile ? isOpen : internalIsOpen;
  const myToggleDropdown = isMobile
    ? toggleDropdown
    : () => setInternalIsOpen(!internalIsOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setInternalIsOpen(false);
      }
    };

    if (myIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myIsOpen]);

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      display: "block",
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        type: "tween",
        duration: 0.2,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const mobileDropdownVariants = {
    open: {
      opacity: 1,
      height: "auto",
      display: "block",
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: "tween",
        duration: 0.2,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const dropdownContent = (
    <div className="hidden lg:block">
      {/* Top Content (Optional) */}
      {topContent && (
        <div
          className={`p-4 flex flex-col rounded-t-2xl justify-start bg-white dark:bg-background ${
            topContentClassName || ""
          }`}
        >
          {topContent}
        </div>
      )}

      {/* Links */}
      <div className="px-4 py-6 flex flex-col gap-4 dark:bg-background bg-white border-t">
        {links.map((link, index) => (
          <div key={index} className="w-fit">
            <Link
              href={link.href}
              passHref
              className={`group relative inline-flex items-center gap-2 text-mainheading dark:text-white font-medium cursor-pointer ${
                linkClassName || ""
              }`}
              onClick={() => {
                if (!isMobile) {
                  setInternalIsOpen(false);
                }
                onLinkClick?.();
              }}
            >
              <p>{link.text}</p>
              <IoIosArrowForward
                size={18}
                className="opacity-100 translate-x-0 transition-all duration-300 group-hover:translate-x-3"
              />
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-mainheading dark:bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <Link
        href="/features"
        onClick={myToggleDropdown}
        className={`rounded-full font-medium cursor-pointer px-4 py-2 dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary text-mainheading dark:text-white ${
          buttonClassName || ""
        }`}
      >
        {buttonText}
      </Link>

      <AnimatePresence>
        {myIsOpen && (
          <motion.div
            variants={isMobile ? mobileDropdownVariants : dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={
              isMobile
                ? `mt-2 pl-4`
                : `absolute right-0 top-12 w-md bg-white border dark:bg-background rounded-xl overflow-hidden shadow-lg z-50 ${
                    dropdownClassName || ""
                  }`
            }
          >
            {dropdownContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeatureDropdown;
