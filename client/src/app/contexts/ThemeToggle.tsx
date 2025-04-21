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

// // src/app/components/ThemeToggle.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { IoMoonOutline, IoSunnyOutline, IoContrastOutline } from 'react-icons/io5';
// import { HiChevronDown } from 'react-icons/hi'; // Icon for dropdown arrow

// type ThemePreference = 'light' | 'dark' | 'system';

// interface ThemeToggleProps {
//   location: 'dashboard' | 'admin' | 'header';
//   className?: string;
// }

// const ThemeToggle: React.FC<ThemeToggleProps> = ({ location, className }) => {
//   const [theme, setTheme] = useState<ThemePreference>('system');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For header dropdown
//   const dropdownRef = useRef(null); // Ref for header dropdown

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
//   }, []);

//   useEffect(() => {
//     const storedTheme = (localStorage.getItem('theme') as ThemePreference) || 'system';
//     setTheme(storedTheme);
//     applyTheme(storedTheme);

//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handleSystemChange = () => {
//       if (localStorage.getItem('theme') === 'system') {
//         applyTheme('system');
//         setTheme('system');
//       }
//     };
//     mediaQuery.addEventListener('change', handleSystemChange);

//     return () => mediaQuery.removeEventListener('change', handleSystemChange);
//   }, [applyTheme]);

//   const handleThemeChange = (newTheme: ThemePreference) => {
//     setTheme(newTheme);
//     applyTheme(newTheme);
//     setIsDropdownOpen(false); // Close dropdown after selection
//   };

//   // Close dropdown on outside click (for header dropdown)
//   useEffect(() => {
//     const handleClickOutside = (event: any) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (location === 'header' && isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [location, isDropdownOpen, dropdownRef]);

//   // UI Rendering based on location
//   if (location === 'admin') {
//     return (
//       <div className={`flex space-x-2 ${className}`}>
//         <button
//           onClick={() => handleThemeChange('light')}
//           className={`p-2 rounded-full hover:bg-lightgray dark:hover:bg-primarybox ${theme === 'light' ? 'bg-lightgray dark:bg-primarybox' : ''}`}
//           aria-label="Light Theme"
//         >
//           <IoSunnyOutline className="size-5 text-neutral-900 dark:text-white" />
//         </button>
//         <button
//           onClick={() => handleThemeChange('dark')}
//           className={`p-2 rounded-full hover:bg-lightgray dark:hover:bg-primarybox ${theme === 'dark' ? 'bg-lightgray dark:bg-primarybox' : ''}`}
//           aria-label="Dark Theme"
//         >
//           <IoMoonOutline className="size-5 text-neutral-900 dark:text-white" />
//         </button>
//         <button
//           onClick={() => handleThemeChange('system')}
//           className={`p-2 rounded-full hover:bg-lightgray dark:hover:bg-primarybox ${theme === 'system' ? 'bg-lightgray dark:bg-primarybox' : ''}`}
//           aria-label="System Theme"
//         >
//           <IoContrastOutline className="size-5 text-neutral-900 dark:text-white" />
//         </button>
//       </div>
//     );
//   } else if (location === 'header') {
//     return (
//       <div className="relative" ref={dropdownRef}>
//         <button
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-primarybox"
//           aria-label="Toggle Theme Dropdown"
//         >
//           {theme === 'light' && <IoSunnyOutline className="size-5 text-neutral-900 dark:text-white" />}
//           {theme === 'dark' && <IoMoonOutline className="size-5 text-neutral-900 dark:text-white" />}
//           {theme === 'system' && <IoContrastOutline className="size-5 text-neutral-900 dark:text-white" />}
//           <HiChevronDown className="size-4 ml-1 text-neutral-900 dark:text-white" />
//         </button>

//         {isDropdownOpen && (
//           <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-secondarybox ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="theme-menu-button" tabIndex={-1}>
//             <div className="py-1" role="none">
//               <button
//                 onClick={() => handleThemeChange('system')}
//                 className={`block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-lightgray dark:hover:bg-primarybox w-full text-left ${theme === 'system' ? 'bg-lightgray dark:bg-primarybox' : ''}`} role="menuitem" tabIndex={-1}>
//                 System
//               </button>
//               <button
//                 onClick={() => handleThemeChange('light')}
//                 className={`block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-lightgray dark:hover:bg-primarybox w-full text-left ${theme === 'light' ? 'bg-lightgray dark:bg-primarybox' : ''}`} role="menuitem" tabIndex={-1}>
//                 Light
//               </button>
//               <button
//                 onClick={() => handleThemeChange('dark')}
//                 className={`block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-lightgray dark:hover:bg-primarybox w-full text-left ${theme === 'dark' ? 'bg-lightgray dark:bg-primarybox' : ''}`} role="menuitem" tabIndex={-1}>
//                 Dark
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   } else {
//     return null; // No UI for 'dashboard' location (handled by settings page)
//   }
// };

// export default ThemeToggle;


// src/app/components/ThemeToggle.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  IoMoonOutline,
  IoSunnyOutline,
  IoContrastOutline,
} from "react-icons/io5";
import { GoChevronDown } from "react-icons/go";

type ThemePreference = "light" | "dark" | "system";

interface ThemeToggleProps {
  location: "dashboard" | "admin" | "header";
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ location, className }) => {
  const [theme, setTheme] = useState<ThemePreference>("system");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For header dropdown
  // Specify the element type for the ref for better type safety
  const dropdownRef = useRef<HTMLDivElement>(null);

  const applyTheme = useCallback((selectedTheme: ThemePreference) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (selectedTheme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(systemPrefersDark ? "dark" : "light");
    } else {
      root.classList.add(selectedTheme);
    }
    localStorage.setItem("theme", selectedTheme);
  }, []);

  useEffect(() => {
    const storedTheme =
      (localStorage.getItem("theme") as ThemePreference) || "system";
    setTheme(storedTheme);
    applyTheme(storedTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      // Ensure theme check uses the current state or localStorage value consistently
      const currentThemePreference =
        (localStorage.getItem("theme") as ThemePreference) || "system";
      if (currentThemePreference === "system") {
        applyTheme("system");
        setTheme("system"); // Update state if system preference changes while 'system' is selected
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);

    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [applyTheme]); // applyTheme is stable due to useCallback

  const handleThemeChange = (newTheme: ThemePreference) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown on outside click (for header dropdown)
  useEffect(() => {
    // Use MouseEvent type instead of any for the event parameter
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is a Node and if the dropdown ref exists and doesn't contain the target
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (location === "header" && isDropdownOpen) {
      // Add the event listener with the correctly typed handler
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove the event listener (ensure the handler reference is the same)
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove the listener when the component unmounts or dependencies change
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // Add dropdownRef to dependencies as its current value is used
  }, [location, isDropdownOpen, dropdownRef]);

  // UI Rendering based on location
  if (location === "admin") {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <button
          onClick={() => handleThemeChange("light")}
          className={`p-2 rounded-full hover:bg-lightgray dark:hover:bg-primarybox ${
            theme === "light" ? "bg-lightgray dark:bg-primarybox" : ""
          }`}
          aria-label="Light Theme"
        >
          <IoSunnyOutline className="size-5 text-neutral-900 dark:text-white" />
        </button>
        <button
          onClick={() => handleThemeChange("dark")}
          className={`p-2 rounded-full hover:bg-lightgray dark:hover:bg-primarybox ${
            theme === "dark" ? "bg-lightgray  dark:bg-primarybox" : ""
          }`}
          aria-label="Dark Theme"
        >
          <IoMoonOutline className="size-5 text-neutral-900 dark:text-white" />
        </button>
        <button
          onClick={() => handleThemeChange("system")}
          className={`p-2 rounded-full hover:bg-lightgray dark:hover:bg-primarybox ${
            theme === "system" ? "bg-lightgray dark:bg-primarybox" : ""
          }`}
          aria-label="System Theme"
        >
          <IoContrastOutline className="size-5 text-neutral-900 dark:text-white" />
        </button>
      </div>
    );
  } else if (location === "header") {
    return (
      // Pass the ref to the container div
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center px-2 py-1.5 cursor-pointer group rounded-full hover:bg-gray/10 dark:hover:bg-primarybox group transition-colors ease-in-out duration-300"
          aria-label="Toggle Theme Dropdown"
          aria-expanded={isDropdownOpen} // Add aria-expanded for accessibility
          aria-controls="theme-menu" // Add aria-controls for accessibility
        >
          {theme === "light" && (
            <IoSunnyOutline className="size-5  dark:text-white dark:group-hover:text-primary" />
          )}
          {theme === "dark" && (
            <IoMoonOutline className="size-5  dark:text-white dark:group-hover:text-primary" />
          )}
          {theme === "system" && (
            <IoContrastOutline className="size-5  dark:text-white dark:group-hover:text-primary" />
          )}
          <GoChevronDown className="size-5 ml-1 mt-0.5 dark:text-white" />
        </button>

        {isDropdownOpen && (
          <div
            id="theme-menu" // Add id corresponding to aria-controls
            className="absolute right-0 top-12 z-40 w-36 border rounded-md shadow-lg bg-white dark:bg-background focus:outline-none" // Added z-index
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="theme-menu-button"
            tabIndex={-1}
          >
            <div className="py-2" role="none">
              <button
                onClick={() => handleThemeChange("system")}
                className={`px-4 flex items-center gap-2 py-2 text-sm text-neutral-900 cursor-pointer dark:text-white hover:bg-lightgray dark:hover:bg-white/5 w-full text-left ${
                  theme === "system" ? "bg-white dark:bg-background" : ""
                }`}
                role="menuitem"
                tabIndex={-1}
              >
                <IoContrastOutline className="size-4" />
                System
              </button>
              <button
                onClick={() => handleThemeChange("light")}
                className={`px-4 flex items-center gap-2 py-2 text-sm text-neutral-900 cursor-pointer dark:text-white hover:bg-lightgray dark:hover:bg-white/5 w-full text-left ${
                  theme === "system" ? "bg-white dark:bg-background" : ""
                }`}
                role="menuitem"
                tabIndex={-1}
              >
                <IoSunnyOutline className="size-4" />
                Light
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`px-4 flex items-center gap-2 py-2 text-sm text-neutral-900 cursor-pointer dark:text-white hover:bg-lightgray dark:hover:bg-white/5 w-full text-left ${
                  theme === "system" ? "bg-white dark:bg-background" : ""
                }`}
                role="menuitem"
                tabIndex={-1}
              >
                <IoMoonOutline className="size-4" />
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



// // src/app/components/ThemeToggle.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   IoMoonOutline,
//   IoSunnyOutline,
//   IoContrastOutline,
// } from "react-icons/io5";

// // Define the possible theme preferences
// type ThemePreference = "light" | "dark" | "system";

// // Define the props for the component, simplifying as location is no longer needed for different UIs
// interface ThemeToggleProps {
//   className?: string; // Optional className prop for custom styling
// }

// const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
//   // State to hold the current theme preference. Initialize from localStorage or default to 'system'.
//   const [theme, setTheme] = useState<ThemePreference>(() => {
//     // Check if window is defined (avoid SSR issues)
//     if (typeof window !== "undefined") {
//       const storedTheme = localStorage.getItem("theme");
//       if (
//         storedTheme === "light" ||
//         storedTheme === "dark" ||
//         storedTheme === "system"
//       ) {
//         return storedTheme;
//       }
//     }
//     return "system"; // Default theme
//   });

//   // Function to apply the chosen theme to the document root (<html> element)
//   const applyTheme = useCallback((selectedTheme: ThemePreference) => {
//     // Guard against running on the server
//     if (typeof window === "undefined") return;

//     const root = window.document.documentElement;
//     root.classList.remove("light", "dark"); // Clear previous theme classes

//     if (selectedTheme === "system") {
//       // If 'system' is chosen, detect the OS preference
//       const systemPrefersDark = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//       ).matches;
//       root.classList.add(systemPrefersDark ? "dark" : "light");
//       console.log(
//         `System theme applied: ${systemPrefersDark ? "dark" : "light"}`
//       );
//     } else {
//       // Apply 'light' or 'dark' directly
//       root.classList.add(selectedTheme);
//       console.log(`Explicit theme applied: ${selectedTheme}`);
//     }
//     // Store the user's *preference* (light, dark, or system) in localStorage
//     localStorage.setItem("theme", selectedTheme);
//   }, []);

//   // Effect 1: Apply the theme when the 'theme' state changes
//   useEffect(() => {
//     applyTheme(theme);
//   }, [theme, applyTheme]); // Re-run whenever theme state or applyTheme function changes

//   // Effect 2: Listen for OS theme changes and re-apply if 'system' is selected
//   useEffect(() => {
//     // Guard against running on the server
//     if (typeof window === "undefined") return undefined;

//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

//     const handleSystemChange = () => {
//       // Only re-apply if the *stored preference* is 'system'
//       const currentStoredPreference =
//         (localStorage.getItem("theme") as ThemePreference) || "system";
//       if (currentStoredPreference === "system") {
//         console.log("System color scheme changed, re-applying 'system' theme.");
//         applyTheme("system"); // Re-evaluate and apply based on new system setting
//       }
//     };

//     // Add listener
//     mediaQuery.addEventListener("change", handleSystemChange);

//     // Cleanup listener on component unmount
//     return () => mediaQuery.removeEventListener("change", handleSystemChange);
//   }, [applyTheme]); // Dependency: only the stable applyTheme function

//   // Function to cycle to the next theme
//   const cycleTheme = () => {
//     let nextTheme: ThemePreference;
//     switch (theme) {
//       case "system":
//         nextTheme = "light";
//         break;
//       case "light":
//         nextTheme = "dark";
//         break;
//       case "dark":
//         nextTheme = "system";
//         break;
//       default:
//         nextTheme = "system"; // Fallback just in case
//     }
//     setTheme(nextTheme); // Update state, which triggers the first useEffect
//   };

//   // Helper to determine the next theme for the aria-label
//   const getNextThemeLabel = (current: ThemePreference): string => {
//     switch (current) {
//       case "system":
//         return "Light";
//       case "light":
//         return "Dark";
//       case "dark":
//         return "System";
//       default:
//         return "System";
//     }
//   };

//   return (
//     <button
//       onClick={cycleTheme}
//       className={`flex items-center p-2.5 cursor-pointer rounded-full hover:bg-gray/10 dark:hover:bg-white/10 transition-colors ease-in-out duration-300 ${
//         className || "dark:bg-white/5 bg-[#E9ECED]"
//       }`}
//       // Dynamic aria-label for accessibility
//       aria-label={`Change to ${getNextThemeLabel(
//         theme
//       )} theme (Current: ${theme})`}
//       title={`Change to ${getNextThemeLabel(theme)} theme`} // Tooltip for hover
//     >
//       {/* Render the icon corresponding to the CURRENT theme */}
//       {theme === "light" && (
//         <IoSunnyOutline className="size-5 text-neutral-900 dark:text-white " />
//       )}
//       {theme === "dark" && (
//         <IoMoonOutline className="size-5 text-neutral-900 dark:text-white dark:hover:text-primary" />
//       )}
//       {theme === "system" && (
//         <IoContrastOutline className="size-5 text-neutral-900 dark:text-white" />
//       )}
//     </button>
//   );
// };

// export default ThemeToggle;
