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









// components/admin/payments/CustomDropdown.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GiCheckMark } from "react-icons/gi";

interface CustomDropdownProps {
    label: string;
    value: string | null;
    onChange: (value: string) => void;
    options: string[];
}

// Custom Dropdown Component
const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the outer div

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

    return (
        <div ref={dropdownRef}> {/* Attach ref to the outer div */}
            <label className="block font-medium text-neutral-900 dark:text-white mb-1">{label}</label>
            <div className="relative">
                {/* Button for open dropdown */}
                <button
                    type="button"
                    onClick={toggleDropdown} // Use the toggleDropdown function
                    className="flex items-center justify-between cursor-pointer autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
                >
                    <span>{value || `All ${label}s`}</span>
                    <ChevronDown className="size-6 text-neutral-600 dark:text-white/80" />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute z-0 mt-2 w-full rounded-xl shadow-lg bg-white dark:bg-background border overflow-hidden p-2"
                        >
                            {options.map((option) => (
                                <motion.li
                                    key={option}
                                    onClick={() => { onChange(option); setIsOpen(false); }}
                                    className="px-4 py-2 cursor-pointer rounded-full transition-colors font-medium duration-300 ease-in-out flex justify-between items-center hover:bg-lightgray dark:hover:bg-primarybox text-gray-500 dark:text-gray-300"
                                >
                                    {option === 'all' ? `All ${label}s` : option}
                                    {value === option && <GiCheckMark className="text-gray-500 dark:text-gray-300" size={20} />}
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CustomDropdown;