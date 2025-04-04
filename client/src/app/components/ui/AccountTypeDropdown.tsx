// components/ui/AccountTypeDropdown.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence from framer-motion

interface AccountTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const dropdownVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "linear",
      },
      display: "block",
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: "linear",
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

const AccountTypeDropdown: React.FC<AccountTypeDropdownProps> = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const accountTypes = ['Savings', 'Current', 'Salary'];

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleAccountTypeSelect = (type: string) => {
    onChange(type);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white ${
          error
            ? "border-error border-2 !shadow-none"
            : "border-[#c9cbce] hover:shadow-color"
        }`}
        onClick={toggleOpen}
      >
        <span>{value || <span className="text-neutral-900 dark:text-white">Select account type</span>}</span>
        {isOpen ? <IoChevronUp className="text-neutral-900 dark:text-white" /> : <IoChevronDown className="text-neutral-900 dark:text-white" />}
      </button>
      <AnimatePresence initial={false} > {/* AnimatePresence to handle mount/unmount animations */}
        {isOpen && ( // Conditionally render dropdown only when isOpen is true
          <motion.div
            className="absolute z-0 mt-0.5 w-full rounded-xl shadow-lg bg-white border border-[#c9cbce]"
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="p-2 space-y-2" role="listbox">
              {accountTypes.map((type) => (
                <li
                  key={type}
                  className={`block px-4 py-2 text-main cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                    value === type ? 'font-semibold bg-primary/30 text-secondary' : 'hover:bg-lightgray '
                  }`}
                  onClick={() => handleAccountTypeSelect(type)}
                >
                  {type}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <p className="flex text-error text-sm items-center mt-0.5">
          <span className="mr-1">
            <IoMdCloseCircle className="size-4" />
          </span>
          {error}
        </p>
      )}
    </div>
  );
};

export default AccountTypeDropdown;