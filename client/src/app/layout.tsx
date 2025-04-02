// // frontend/src/app/layout.tsx
// import './globals.css'
// import { AuthProvider } from './contexts/AuthContext';
// import { ReactNode } from 'react'; // Import ReactNode

// interface RootLayoutProps {
//     children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//     return (
//         <html lang="en">
//             <body>
//                 <AuthProvider>
//                     {children}
//                 </AuthProvider>
//                 <div id="portal-root"></div> {/* Add portal root here */}
//             </body>
//         </html>
//     );
// }



// // frontend/src/app/layout.tsx
// import './globals.css'
// import { AuthProvider } from './contexts/AuthContext';
// import { ReactNode } from 'react'; // Import ReactNode

// interface RootLayoutProps {
//     children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//     return (
//         <html lang="en">
//             <body>
//                 <AuthProvider>
//                     {children}
//                 </AuthProvider>
//                 <div id="portal-root"></div> {/* Add portal root here */}
//             </body>
//         </html>
//     );
// }


// app/layout.tsx
import './globals.css'
import { AuthProvider } from './contexts/AuthContext'; // Assuming this exists
import { ReactNode } from 'react';

interface RootLayoutProps {
    children: ReactNode;
}

// This script runs immediately, before React hydration
// It reads the preference and applies 'light' or 'dark' class to <html>
const ThemeInitializerScript = `
(function() {
  // Minimal function to avoid errors during SSR or environments without localStorage
  function getInitialPreference() {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return 'system'; // Default if localStorage is not available
    }
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      // If value is invalid or null/undefined, default to 'system'
      return 'system';
    } catch (e) {
      console.error('Error reading theme from localStorage', e);
      return 'system'; // Fallback in case of error
    }
  }

  const preference = getInitialPreference();
  let themeToApply = preference;

  if (preference === 'system') {
    // Determine theme based on system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    themeToApply = prefersDark.matches ? 'dark' : 'light';
  }

  // Apply the determined theme class ('light' or 'dark')
  const root = document.documentElement;
  // Ensure clean slate by removing potentially existing classes
  root.classList.remove('light', 'dark');
  // Add the correct class
  root.classList.add(themeToApply);

  // Optional: Store the preference and applied theme as data attributes for easier debugging
  // root.dataset.themePreference = preference;
  // root.dataset.appliedTheme = themeToApply;
})();
`;

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        // Add suppressHydrationWarning because the script modifies the class before React hydrates
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Execute the theme setting script immediately in the head */}
                <script dangerouslySetInnerHTML={{ __html: ThemeInitializerScript }} />
                {/* Other head elements (meta tags, links, etc.) */}
            </head>
            {/* Apply base background colors and transitions */}
            <body className="bg-white dark:bg-background text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
                <AuthProvider>
                    {children}
                </AuthProvider>
                <div id="portal-root"></div>
            </body>
        </html>
    );
}