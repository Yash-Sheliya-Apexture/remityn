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
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div>
            <label className="block font-medium text-gray mb-1">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between capitalize cursor-pointer w-full border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-main focus:outline-none"
                >
                    <span>{value || `All ${label}s`}</span>
                    <ChevronDown className="size-6 text-gray-400" />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            ref={dropdownRef}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute mt-2 w-full capitalize bg-white rounded-md shadow-lg z-10 border border-gray-300 overflow-hidden"
                        >
                            {options.map((option) => (
                                <motion.li
                                    key={option}
                                    onClick={() => { onChange(option); setIsOpen(false); }}
                                    className="px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium cursor-pointer flex justify-between items-center"
                                >
                                    {option === 'all' ? `All ${label}s` : option}
                                    {value === option && <GiCheckMark className="text-gray" size={20} />}
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