// // components/admin/payments/CustomDropdown.tsx
// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";

// interface CustomDropdownProps {
//     label: string;
//     value: string | null;
//     onChange: (value: string) => void;
//     options: string[];
// }

// // Custom Dropdown Component
// const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, onChange, options }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     return (
//         <div>
//             <label className="block font-medium text-neutral-900 dark:text-white mb-1">{label}</label>
//             <div className="relative">
//                 {/* Button for open dropdown */}
//                 <button
//                     type="button"
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="flex items-center justify-between cursor-pointer autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 >
//                     <span>{value || `All ${label}s`}</span>
//                     <ChevronDown className="size-6 text-neutral-600 dark:text-white/80" />
//                 </button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.ul
//                             ref={dropdownRef}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             className="absolute z-0 mt-2 w-full rounded-xl shadow-lg bg-white dark:bg-background dark:border dark:border-white overflow-hidden p-2"
//                         >
//                             {options.map((option) => (
//                                 <motion.li
//                                     key={option}
//                                     onClick={() => { onChange(option); setIsOpen(false); }}
//                                     className="px-4 py-2 cursor-pointer rounded-full transition-colors font-medium duration-300 ease-in-out flex justify-between items-center hover:bg-lightgray dark:hover:bg-primarybox text-gray-500 dark:text-gray-300"
//                                 >
//                                     {option === 'all' ? `All ${label}s` : option}
//                                     {value === option && <GiCheckMark className="text-gray-500 dark:text-gray-300" size={20} />}
//                                 </motion.li>
//                             ))}
//                         </motion.ul>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// export default CustomDropdown;









// // components/admin/payments/CustomDropdown.tsx
// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";

// interface CustomDropdownProps {
//     label: string;
//     value: string | null;
//     onChange: (value: string) => void;
//     options: string[];
// }

// // Custom Dropdown Component
// const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, onChange, options }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the outer div

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div ref={dropdownRef}> {/* Attach ref to the outer div */}
//             <label className="block font-medium text-neutral-900 dark:text-white mb-1">{label}</label>
//             <div className="relative">
//                 {/* Button for open dropdown */}
//                 <button
//                     type="button"
//                     onClick={toggleDropdown} // Use the toggleDropdown function
//                     className="flex items-center justify-between cursor-pointer autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 >
//                     <span>{value || `All ${label}s`}</span>
//                     <ChevronDown className="size-6 text-neutral-600 dark:text-white/80" />
//                 </button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.ul
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             className="absolute z-0 mt-2 w-full rounded-xl shadow-lg bg-white dark:bg-background border overflow-hidden p-2"
//                         >
//                             {options.map((option) => (
//                                 <motion.li
//                                     key={option}
//                                     onClick={() => { onChange(option); setIsOpen(false); }}
//                                     className="px-4 py-2 cursor-pointer rounded-full transition-colors font-medium duration-300 ease-in-out flex justify-between items-center hover:bg-lightgray dark:hover:bg-primarybox text-gray-500 dark:text-gray-300"
//                                 >
//                                     {option === 'all' ? `All ${label}s` : option}
//                                     {value === option && <GiCheckMark className="text-gray-500 dark:text-gray-300" size={20} />}
//                                 </motion.li>
//                             ))}
//                         </motion.ul>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// export default CustomDropdown;







// frontend/src/app/admin/components/add-money/CustomDropdown.tsx
// OR wherever your CustomDropdown component is located
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GiCheckMark } from "react-icons/gi";

interface CustomDropdownProps {
    label: React.ReactNode;
    value: string | null;
    onChange: (value: string | null) => void; // Allow onChange to receive null
    options: string[];
    placeholder?: string; // <-- Add optional placeholder prop
}

// Custom Dropdown Component
const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder = `Select ${typeof label === 'string' ? label : 'Option'}` // <-- Default placeholder
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Function to get the display text for an option
    const getOptionDisplay = (option: string | null) => {
        if (option === null) return placeholder; // Use placeholder if value is null
        // You might want custom logic here, e.g., capitalizing
        return option;
    };

    return (
        <div ref={dropdownRef} className="relative"> {/* Attach ref here */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-white text-left" // Added text-left
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {/* Use the display function for the button text */}
                <span className={value ? '' : 'text-gray-500 dark:text-gray-400'}> {/* Style placeholder differently */}
                    {getOptionDisplay(value)}
                </span>
                <ChevronDown
                    className={`size-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }} // Adjusted animation
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }} // Adjusted animation
                        transition={{ duration: 0.15 }}
                        className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 overflow-hidden max-h-60 overflow-y-auto" // Added max-h and overflow
                        role="listbox"
                    >
                        {/* Optional: Add an "All" or "Clear" option if desired */}
                         {/* <motion.li
                            onClick={() => { onChange(null); setIsOpen(false); }} // Pass null for "All"
                            className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 ${!value ? 'bg-gray-100 dark:bg-gray-700' : 'text-gray-900 dark:text-gray-200'}`}
                            role="option"
                            aria-selected={value === null}
                        >
                            {placeholder}
                            {value === null && <GiCheckMark className="text-gray-500 dark:text-gray-300" size={16} />}
                        </motion.li> */}

                        {options.map((option) => (
                            <motion.li
                                key={option}
                                onClick={() => { onChange(option); setIsOpen(false); }}
                                className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 ${value === option ? 'bg-gray-100 dark:bg-gray-700 font-medium' : 'text-gray-900 dark:text-gray-200'}`}
                                role="option"
                                aria-selected={value === option}
                            >
                                {getOptionDisplay(option)} {/* Use display function here too */}
                                {value === option && <GiCheckMark className="text-gray-500 dark:text-gray-300" size={16} />}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomDropdown;