// // src/app/components/ThemeToggle.tsx
// 'use client';

// import { useCallback, useEffect, useState } from 'react';

// type ThemePreference = 'light' | 'dark' | 'system';

// interface ThemeToggleLogicProps {
//   onThemeChange?: (theme: ThemePreference) => void; // Optional callback
// }

// const ThemeToggleLogic: React.FC<ThemeToggleLogicProps> = ({ onThemeChange }) => {
//   const applyTheme = useCallback((selectedTheme: ThemePreference) => {
//     const root = window.document.documentElement;
//     root.classList.remove('light', 'dark');

//     if (selectedTheme === 'system') {
//       const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       root.classList.add(systemPrefersDark ? 'dark' : 'light');
//     } else {
//       root.classList.add(selectedTheme);
//     }
//     localStorage.setItem('theme', selectedTheme);
//     if (onThemeChange) {
//       onThemeChange(selectedTheme); // Call the callback if provided
//     }
//   }, [onThemeChange]);

//   return null; // No UI in this logic-only component
// };

// export default ThemeToggleLogic;

// src/app/components/ThemeToggle.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IoMoonOutline, IoSunnyOutline, IoContrastOutline } from 'react-icons/io5';
import { HiChevronDown } from 'react-icons/hi'; // Icon for dropdown arrow

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  location: 'dashboard' | 'admin' | 'header';
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ location, className }) => {
  const [theme, setTheme] = useState<ThemePreference>('system');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For header dropdown
  const dropdownRef = useRef(null); // Ref for header dropdown

  const applyTheme = useCallback((selectedTheme: ThemePreference) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (selectedTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(systemPrefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(selectedTheme);
    }
    localStorage.setItem('theme', selectedTheme);
  }, []);

  useEffect(() => {
    const storedTheme = (localStorage.getItem('theme') as ThemePreference) || 'system';
    setTheme(storedTheme);
    applyTheme(storedTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (localStorage.getItem('theme') === 'system') {
        applyTheme('system');
        setTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);

    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [applyTheme]);

  const handleThemeChange = (newTheme: ThemePreference) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown on outside click (for header dropdown)
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (location === 'header' && isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location, isDropdownOpen, dropdownRef]);


  // UI Rendering based on location
  if (location === 'admin') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <button
          onClick={() => handleThemeChange('light')}
          className={`p-2 rounded-full hover:bg-lightgray dark:hover:bg-primarybox ${theme === 'light' ? 'bg-lightgray dark:bg-primarybox' : ''}`}
          aria-label="Light Theme"
        >
          <IoSunnyOutline className="size-5 text-neutral-900 dark:text-white" />
        </button>
        <button
          onClick={() => handleThemeChange('dark')}
          className={`p-2 rounded-full hover:bg-lightgray dark:hover:bg-primarybox ${theme === 'dark' ? 'bg-lightgray dark:bg-primarybox' : ''}`}
          aria-label="Dark Theme"
        >
          <IoMoonOutline className="size-5 text-neutral-900 dark:text-white" />
        </button>
        <button
          onClick={() => handleThemeChange('system')}
          className={`p-2 rounded-full hover:bg-lightgray dark:hover:bg-primarybox ${theme === 'system' ? 'bg-lightgray dark:bg-primarybox' : ''}`}
          aria-label="System Theme"
        >
          <IoContrastOutline className="size-5 text-neutral-900 dark:text-white" />
        </button>
      </div>
    );
  } else if (location === 'header') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-primarybox"
          aria-label="Toggle Theme Dropdown"
        >
          {theme === 'light' && <IoSunnyOutline className="size-5 text-neutral-900 dark:text-white" />}
          {theme === 'dark' && <IoMoonOutline className="size-5 text-neutral-900 dark:text-white" />}
          {theme === 'system' && <IoContrastOutline className="size-5 text-neutral-900 dark:text-white" />}
          <HiChevronDown className="size-4 ml-1 text-neutral-900 dark:text-white" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-secondarybox ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="theme-menu-button" tabIndex={-1}>
            <div className="py-1" role="none">
              <button
                onClick={() => handleThemeChange('system')}
                className={`block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-lightgray dark:hover:bg-primarybox w-full text-left ${theme === 'system' ? 'bg-lightgray dark:bg-primarybox' : ''}`} role="menuitem" tabIndex={-1}>
                System
              </button>
              <button
                onClick={() => handleThemeChange('light')}
                className={`block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-lightgray dark:hover:bg-primarybox w-full text-left ${theme === 'light' ? 'bg-lightgray dark:bg-primarybox' : ''}`} role="menuitem" tabIndex={-1}>
                Light
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-lightgray dark:hover:bg-primarybox w-full text-left ${theme === 'dark' ? 'bg-lightgray dark:bg-primarybox' : ''}`} role="menuitem" tabIndex={-1}>
                Dark
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return null; // No UI for 'dashboard' location (handled by settings page)
  }
};

export default ThemeToggle;