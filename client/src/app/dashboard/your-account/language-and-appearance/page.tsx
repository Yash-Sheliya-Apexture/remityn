// app/(main)/your-account/language-and-appearance/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { IoMoonOutline, IoSunnyOutline, IoLanguageOutline } from 'react-icons/io5';
import { GoChevronRight } from 'react-icons/go';
import Link from 'next/link';
import DashboardHeader from '@/app/components/layout/DashboardHeader';

// --- Helper Function to get user-friendly language name ---
const getLanguageName = (code: string): string => {
    // ... (keep this function as before)
      const langMap: { [key: string]: string } = {
        'en-US': 'English (US)',
        'es-ES': 'Español (España)',
        'fr-FR': 'Français (France)',
      };
      return langMap[code] || 'Unknown Language';
};

// --- Reusable Row Component for Settings ---
interface SettingsRowProps {
  icon: React.ReactNode;
  label: string;
  currentValue: string;
  onClick?: () => void; // Keep onClick for potential future non-navigation actions
  href?: string;       // Use href for navigation
}

const SettingsRow: React.FC<SettingsRowProps> = ({ icon, label, currentValue, onClick, href }) => {
   // ... (keep the SettingsRow component structure as before)
     const content = (
       <div
         className={`flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear ${
           onClick || href ? "cursor-pointer" : ""
         } group`}
       >
         <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
           {icon}
         </div>
         <div className="flex-grow">
           <div className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">
             {label}
           </div>
           <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
             {currentValue}
           </div>
         </div>
         {(onClick || href) && (
           <div className='ml-4'>
             <GoChevronRight
               size={24}
               className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300"
             />
           </div>
         )}
       </div>
     );

      if (href) {
        // ** IMPORTANT: Wrap the content in Link **
        return <Link href={href} className="block">{content}</Link>;
      } else if (onClick) {
        return <button onClick={onClick} className="w-full text-left">{content}</button>;
      } else {
          return content;
      }
};


// --- LanguageAndAppearancePage Component (Modified) ---
const LanguageAndAppearancePage: React.FC = () => {
  // State for theme ('light', 'dark', or 'system') - still needed for display here
  const [theme, setTheme] = useState<string>('light');
  const [language, setLanguage] = useState<string>('en-US');

   // Function to APPLY theme (still useful if theme can be 'system')
  const applyTheme = useCallback((selectedTheme: string) => {
    // ... (keep applyTheme function as before)
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (selectedTheme === 'system') {
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          root.classList.add(systemPrefersDark ? 'dark' : 'light');
        } else {
          root.classList.add(selectedTheme);
        }
  }, []);

  // Effect to load and apply theme/language on initial mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'system';
    setTheme(storedTheme);
    applyTheme(storedTheme); // Apply theme on load

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
     const handleSystemChange = () => {
        if (localStorage.getItem('theme') === 'system') {
             applyTheme('system');
             // Update the displayed value if needed (optional)
             setTheme('system');
        }
    };
    mediaQuery.addEventListener('change', handleSystemChange);


    const storedLanguage = localStorage.getItem('language') || 'en-US';
    setLanguage(storedLanguage);

    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [applyTheme]);


  // Function to handle language change (placeholder)
  const handleLanguageSettingClick = () => {
    alert('Language selection page not implemented.');
    // Example: Navigate to /your-account/language-and-appearance/language-settings
  };

  // Determine current display values
  let currentThemeValue = theme.charAt(0).toUpperCase() + theme.slice(1);
  if (theme === 'system') {
       const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
       currentThemeValue = `System (${systemPrefersDark ? 'Dark' : 'Light'})`
  }

  const currentLanguageValue = getLanguageName(language);
  // Determine icon based on *resolved* theme if system, or selected theme otherwise
  let currentThemeIcon = <IoSunnyOutline className="size-5" />;
  if (theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      currentThemeIcon = <IoMoonOutline className="size-5" />;
  }


  return (
    <div>
      <DashboardHeader title="Language and appearance" />

      {/* Settings Sections */}
      <div className="space-y-2">
        {/* --- MODIFIED: Use href for Navigation --- */}
        <SettingsRow
          icon={currentThemeIcon}
          label="Appearance"
          currentValue={currentThemeValue}
          href="language-and-appearance/appearance-settings" // <-- Navigate here
        />
        <SettingsRow
          icon={<IoLanguageOutline className="size-5" />}
          label="Language"
          currentValue={currentLanguageValue}
          onClick={handleLanguageSettingClick} // Keep onClick or change to href if language page exists
        />
      </div>
    </div>
  );
};

export default LanguageAndAppearancePage;