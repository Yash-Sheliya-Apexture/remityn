// app/(main)/your-account/language-and-appearance/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { IoMoonOutline, IoSunnyOutline, IoLanguageOutline } from 'react-icons/io5';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import Link from 'next/link';

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
         <div className={`flex items-center p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl gap-4 ${onClick || href ? 'cursor-pointer' : ''} group`}>
          <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-full text-neutral-800 dark:text-neutral-200">
            {icon}
          </div>
          <div className="flex-grow">
            <div className="font-medium text-neutral-800 dark:text-neutral-100">{label}</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">{currentValue}</div>
          </div>
          {(onClick || href) && (
             <GoChevronRight className="size-5 text-neutral-400 dark:text-neutral-500 group-hover:translate-x-1 transition-transform ease-in-out duration-200" />
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
    <div className="max-w-2xl mx-auto p-4 md:p-6 min-h-screen">
      {/* Back Button and Title */}
       <div className="flex items-center mb-6 relative">
        <Link
          href="/dashboard/your-account" // Link back to the main account settings page
          className="absolute left-0 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Back to Account Settings"
        >
          <GoChevronLeft className="size-6 text-neutral-600 dark:text-neutral-300" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 text-center flex-grow">
          Language and appearance
        </h1>
         <div className="w-8 h-8"></div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-3">
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