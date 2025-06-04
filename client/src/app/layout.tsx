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

// // app/layout.tsx
// import './globals.css'
// import { AuthProvider } from './contexts/AuthContext'; // Assuming this exists
// import { ReactNode } from 'react';

// interface RootLayoutProps {
//     children: ReactNode;
// }

// // This script runs immediately, before React hydration
// // It reads the preference and applies 'light' or 'dark' class to <html>
// const ThemeInitializerScript = `
// (function() {
//   // Minimal function to avoid errors during SSR or environments without localStorage
//   function getInitialPreference() {
//     if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
//       return 'system'; // Default if localStorage is not available
//     }
//     try {
//       const stored = localStorage.getItem('theme');
//       if (stored === 'light' || stored === 'dark') {
//         return stored;
//       }
//       // If value is invalid or null/undefined, default to 'system'
//       return 'system';
//     } catch (e) {
//       console.error('Error reading theme from localStorage', e);
//       return 'system'; // Fallback in case of error
//     }
//   }

//   const preference = getInitialPreference();
//   let themeToApply = preference;

//   if (preference === 'system') {
//     // Determine theme based on system preference
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
//     themeToApply = prefersDark.matches ? 'dark' : 'light';
//   }

//   // Apply the determined theme class ('light' or 'dark')
//   const root = document.documentElement;
//   // Ensure clean slate by removing potentially existing classes
//   root.classList.remove('light', 'dark');
//   // Add the correct class
//   root.classList.add(themeToApply);

//   // Optional: Store the preference and applied theme as data attributes for easier debugging
//   // root.dataset.themePreference = preference;
//   // root.dataset.appliedTheme = themeToApply;
// })();
// `;

// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//       <html lang="en" suppressHydrationWarning>
//           <head>
//               <script dangerouslySetInnerHTML={{ __html: ThemeInitializerScript }} />
//           </head>
//           <body className="bg-white dark:bg-background text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
//               {/* AuthProvider wraps everything */}
//               <AuthProvider>
//                   {children} {/* This is where nested layouts like (website)/layout.tsx render */}
//               </AuthProvider>
//               <div id="portal-root"></div>
//           </body>
//       </html>
//   );
// }

// // app/layout.tsx
// import './globals.css' // Ensure your global styles are imported
// import { AuthProvider } from './contexts/AuthContext'; // Adjust path if necessary
// import { ReactNode } from 'react';
// // import TawkToScript from './components/TawkToScript'; // Adjust path to your TawkToScript component if necessary

// // Define the props for the RootLayout component
// interface RootLayoutProps {
//     children: ReactNode; // Represents the nested pages and layouts
// }

// // Inline script for immediate theme application (avoids FOUC - Flash of Unstyled Content)
// // This script runs before React hydration.
// const ThemeInitializerScript = `
// (function() {
//   function getInitialPreference() {
//     if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
//       return 'system'; // Default if localStorage is unavailable (SSR, etc.)
//     }
//     try {
//       const stored = localStorage.getItem('theme');
//       if (stored === 'light' || stored === 'dark') {
//         return stored; // Return valid stored preference
//       }
//       return 'system'; // Default to system if stored value is invalid or missing
//     } catch (e) {
//       console.error('Error reading theme from localStorage:', e);
//       return 'system'; // Fallback in case of storage access errors
//     }
//   }

//   const preference = getInitialPreference();
//   let themeToApply = preference; // Initially set to stored/default preference

//   // If preference is 'system', determine theme based on OS/browser setting
//   if (preference === 'system') {
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
//     themeToApply = prefersDark.matches ? 'dark' : 'light';
//   }

//   // Apply the determined theme ('light' or 'dark') to the root HTML element
//   const root = document.documentElement;
//   root.classList.remove('light', 'dark'); // Clean slate
//   root.classList.add(themeToApply); // Add the correct theme class
// })();
// `;
// // const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// // const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

// // // Construct the Tawk.to script source URL ONLY if both IDs are available.
// // const tawkToSrc = tawkToPropertyId && tawkToWidgetId
// //     ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`
// //     : null; // Will be null if either ID is missing, preventing script rendering.

// // --- Root Layout Component Definition ---
// export default function RootLayout({ children }: RootLayoutProps) {
//     return (
//         // The lang attribute is important for accessibility and SEO.
//         // suppressHydrationWarning is necessary due to the ThemeInitializerScript
//         // modifying the DOM (adding class to <html>) before React hydrates.
//         <html lang="en" suppressHydrationWarning>

//             {/* The <head> section: Contains metadata, links, scripts critical for initial render */}
//             <head>
//                 {/* Immediately invoked theme script */}
//                 <script dangerouslySetInnerHTML={{ __html: ThemeInitializerScript }} />

//                 {/* Essential Meta Tags */}
//                 <meta charSet="utf-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />

//                 {/* Title Tag - Replace with your application's title */}
//                 {/* Consider using Next.js Metadata API for more complex/dynamic titles/meta */}
//                 <title>Wise Clone - Money Transfer</title>

//                 {/* Description Meta Tag - Replace with your application's description */}
//                 <meta name="description" content="Send and receive money internationally with low fees and real exchange rates." />

//                 {/* Add links to favicons, webmanifest, fonts, etc. here */}
//                 <link rel="globe.svg" href="/globe.svg" />

//             </head>

//             {/* The <body> section: Contains the visible content of the page */}
//             <body
//                 className="bg-white dark:bg-background text-neutral-900 dark:text-white transition-all duration-75 ease-linear"
//                 suppressHydrationWarning={true} // <-- ADD THIS PROP
//             >
//                 {/* Authentication Context Provider: Wraps the application to provide auth state */}
//                 <AuthProvider>
//                     {/* children represents the actual page content being rendered */}
//                     {children}
//                 </AuthProvider>

//                 {/* Optional: A div often used as a target for React Portals (modals, tooltips, etc.) */}
//                 <div id="portal-root"></div>

//                 {/* Tawk.to Live Chat Script */}
//                 {/* Conditionally render the TawkToScript Client Component only if the src URL is valid */}
//                 {/* {tawkToSrc && (
//                     <TawkToScript src={tawkToSrc} />
//                 )} */}

//             </body>
//         </html>
//     );
// }

// // app/layout.tsx
// import './globals.css' // Ensure your global styles are imported
// import { AuthProvider } from './contexts/AuthContext'; // Adjust path if necessary
// import { ReactNode } from 'react';
// import TawkToManager from './components/TawkToManager'; // Adjust path to your TawkToScript component if necessary

// // Define the props for the RootLayout component
// interface RootLayoutProps {
//     children: ReactNode; // Represents the nested pages and layouts
// }

// // Inline script for immediate theme application (avoids FOUC - Flash of Unstyled Content)
// // This script runs before React hydration.
// const ThemeInitializerScript = `
// (function() {
//   function getInitialPreference() {
//     if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
//       return 'system'; // Default if localStorage is unavailable (SSR, etc.)
//     }
//     try {
//       const stored = localStorage.getItem('theme');
//       if (stored === 'light' || stored === 'dark') {
//         return stored; // Return valid stored preference
//       }
//       return 'system'; // Default to system if stored value is invalid or missing
//     } catch (e) {
//       console.error('Error reading theme from localStorage:', e);
//       return 'system'; // Fallback in case of storage access errors
//     }
//   }

//   const preference = getInitialPreference();
//   let themeToApply = preference; // Initially set to stored/default preference

//   // If preference is 'system', determine theme based on OS/browser setting
//   if (preference === 'system') {
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
//     themeToApply = prefersDark.matches ? 'dark' : 'light';
//   }

//   // Apply the determined theme ('light' or 'dark') to the root HTML element
//   const root = document.documentElement;
//   root.classList.remove('light', 'dark'); // Clean slate
//   root.classList.add(themeToApply); // Add the correct theme class
// })();
// `;
// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

// // Construct the Tawk.to script source URL ONLY if both IDs are available.
// const tawkToSrc = tawkToPropertyId && tawkToWidgetId
//     ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`
//     : null; // Will be null if either ID is missing, preventing script rendering.

// // --- Root Layout Component Definition ---
// export default function RootLayout({ children }: RootLayoutProps) {
//     return (
//         // The lang attribute is important for accessibility and SEO.
//         // suppressHydrationWarning is necessary due to the ThemeInitializerScript
//         // modifying the DOM (adding class to <html>) before React hydrates.
//         <html lang="en" suppressHydrationWarning>

//             {/* The <head> section: Contains metadata, links, scripts critical for initial render */}
//             <head>
//                 {/* Immediately invoked theme script */}
//                 <script dangerouslySetInnerHTML={{ __html: ThemeInitializerScript }} />

//                 {/* Essential Meta Tags */}
//                 <meta charSet="utf-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1 " />

//                 {/* Title Tag - Replace with your application's title */}
//                 {/* Consider using Next.js Metadata API for more complex/dynamic titles/meta */}
//                 <title>Wise Clone - Money Transfer</title>

//                 {/* Description Meta Tag - Replace with your application's description */}
//                 <meta name="description" content="Send and receive money internationally with low fees and real exchange rates." />

//                 {/* Add links to favicons, webmanifest, fonts, etc. here */}
//                 <link rel="globe.svg" href="/globe.svg" />

//             </head>

//             {/* The <body> section: Contains the visible content of the page */}
//             <body
//                 className="bg-white dark:bg-background text-neutral-900 dark:text-white transition-all duration-75 ease-linear"
//                 suppressHydrationWarning={true} // <-- ADD THIS PROP
//             >
//                 {/* Authentication Context Provider: Wraps the application to provide auth state */}
//                 <AuthProvider>
//                     {/* children represents the actual page content being rendered */}
//                     {children}
//                 </AuthProvider>

//                 {/* Optional: A div often used as a target for React Portals (modals, tooltips, etc.) */}
//                 <div id="portal-root"></div>

//                 {/* Tawk.to Live Chat Script */}
//                 {/* Conditionally render the TawkToScript Client Component only if the src URL is valid */}
//                 {tawkToSrc && (
//                     <TawkToManager/>
//                 )}

//             </body>
//         </html>
//     );
// }

// // app/layout.tsx
// import './globals.css'
// import { AuthProvider } from './contexts/AuthContext';
// import { ReactNode } from 'react';
// import TawkToManager from './components/TawkToManager'; // Ensure path is correct
// import BrevoManager from './components/BrevoManager'; // <-- Import BrevoManager

// // const ThemeInitializerScript = `
// // (function() {
// //   function getInitialPreference() {
// //     // ... (your existing getInitialPreference logic) ...
// //      if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
// //           return 'system'; // Default if localStorage is unavailable (SSR, etc.)
// //      }
// //      try {
// //         const stored = localStorage.getItem('theme');
// //         if (stored === 'light' || stored === 'dark') {
// //             return stored;
// //         }
// //          return 'system';
// //      } catch (e) {
// //          console.error('Error reading theme from localStorage:', e);
// //          return 'system';
// //      }
// //   }

// //   const preference = getInitialPreference();
// //   let themeToApply = preference;

// //   if (preference === 'system') {
// //     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
// //     themeToApply = prefersDark.matches ? 'dark' : 'light';
// //   }

// //   const root = document.documentElement;
// //   root.classList.remove('light', 'dark');
// //   root.classList.add(themeToApply);
// // })();
// // `;
// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

// const tawkToSrc = tawkToPropertyId && tawkToWidgetId
//     ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`
//     : null;

// interface RootLayoutProps {
//     children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//     return (
//         <html lang="en" suppressHydrationWarning>
//             <head>
//                 {/* <script dangerouslySetInnerHTML={{ __html: ThemeInitializerScript }} /> */}

//                 <meta charSet="utf-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1 " />

//                 <title>Remityn Clone - Money Transfer</title>
//                 <meta name="description" content="Send and receive money internationally with low fees and real exchange rates." />

//                 <link rel="icon" href="./Remityn.ico" sizes="any" />

//             </head>

//             <body className="bg-background text-neutral-900 dark:text-white transition-all duration-75 ease-linear" suppressHydrationWarning={true}>
//                 <AuthProvider>
//                     {children}
//                 </AuthProvider>

//                 <div id="portal-root"></div>

//                 {tawkToSrc && (
//                     <>
//                     <TawkToManager/>
//                     </>
//                 )}

//                 {/* <BrevoManager /> */}
//             </body>
//         </html>
//     );
// }

// // app/layout.tsx
// import './globals.css'
// import { AuthProvider } from './contexts/AuthContext';
// import { ReactNode } from 'react';
// import TawkToManager from './components/TawkToManager'; // Ensure path is correct

// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

// const tawkToSrc = tawkToPropertyId && tawkToWidgetId
//     ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`
//     : null;

// interface RootLayoutProps {
//     children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//     return (
//         <html lang="en" suppressHydrationWarning>
//             <head>
//                 <meta charSet="utf-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1 " />

//                 <title>Remityn Clone - Money Transfer</title>
//                 <meta name="description" content="Send and receive money internationally with low fees and real exchange rates." />

//                 <link rel="icon" href="./Remityn.ico" sizes="any" />

//             </head>

//             <body className="bg-background text-neutral-900 dark:text-white transition-all duration-75 ease-linear" suppressHydrationWarning={true}>
//                 <AuthProvider>
//                     {children}
//                 </AuthProvider>

//                 <div id="portal-root"></div>

//                 {tawkToSrc && (
//                     <>
//                     <TawkToManager/>
//                     </>
//                 )}
//             </body>
//         </html>
//     );
// }

// // app/layout.tsx
// import './globals.css'
// import { AuthProvider } from './contexts/AuthContext';
// import { ReactNode } from 'react';
// import TawkToManager from './components/TawkToManager'; // Ensure path is correct
// import { Metadata, Viewport } from 'next'; // Import Metadata and Viewport
// import { satoshi, montserrat, outfit, inter } from './fonts'; // ADJUST PATH IF NEEDED

// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

// const tawkToSrc = tawkToPropertyId && tawkToWidgetId
//     ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`
//     : null;

// const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Fallback for local

// // Default metadata for the entire application
// export const metadata: Metadata = {
//     metadataBase: new URL(siteUrl), // Crucial for resolving relative OpenGraph image paths
//     title: {
//         default: 'Remityn - Money Transfer', // Default title
//         template: '%s | Remityn ', // Template for page-specific titles
//     },
//     description: 'Send and receive money internationally with low fees and real exchange rates. Secure, fast, and reliable.',
//     applicationName: 'Remityn',
//     keywords: ['money transfer', 'international payments', 'remittance', 'low fees', 'exchange rates'],
//     authors: [{ name: 'Your Company Name', url: siteUrl }],
//     creator: 'Your Company Name',
//     publisher: 'Your Company Name',
//     robots: { // Default robots policy (can be overridden per page)
//         index: true,
//         follow: true,
//         googleBot: {
//             index: true,
//             follow: true,
//             'max-video-preview': -1,
//             'max-image-preview': 'large',
//             'max-snippet': -1,
//         },
//     },
//     icons: {
//         icon: '/assets/images/Remityn.ico', // Path relative to public folder
//         // apple: '/apple-touch-icon.png', // Example for Apple touch icon
//     },
//     openGraph: {
//         title: 'Remityn Clone - Money Transfer',
//         description: 'Send and receive money internationally with low fees and real exchange rates.',
//         url: siteUrl,
//         siteName: 'Remityn Clone',
//         images: [
//             {
//                 url: '/og-image.png', // Place in public folder: public/og-image.png (e.g., 1200x630px)
//                 width: 1200,
//                 height: 630,
//                 alt: 'Remityn Clone Money Transfer Service',
//             },
//         ],
//         locale: 'en_US',
//         type: 'website',
//     },
//     twitter: {
//         card: 'summary_large_image',
//         title: 'Remityn Clone - Money Transfer',
//         description: 'Send and receive money internationally with low fees and real exchange rates.',
//         // siteId: 'YourTwitterSiteID', // Optional: Your Twitter @username numeric ID
//         creator: '@YourTwitterHandle', // Optional: Your Twitter @username
//         // creatorId: 'YourTwitterCreatorID', // Optional
//         images: ['/twitter-image.png'], // Place in public folder: public/twitter-image.png (e.g., 1200x600px)
//     },
//     // manifest: '/site.webmanifest', // If you have a web app manifest
// };

// // Viewport settings
// export const viewport: Viewport = {
//     width: 'device-width',
//     initialScale: 1,
//     // maximumScale: 1, // You might want to allow zooming
//     // userScalable: false, // Consider setting to true for accessibility
//     themeColor: [ // For PWA theming
//       { media: '(prefers-color-scheme: light)', color: '#22282a' },
//     ],
// }

// interface RootLayoutProps {
//     children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//     return (
//         <html
//             lang="en"
//             // Apply all font variables to the html tag for global availability
//             className={`${satoshi.variable} ${montserrat.variable} ${outfit.variable} ${inter.variable}`}
//             suppressHydrationWarning // Let's keep this for now, address potential underlying issues later
//         >
//             {/* <head> is now managed by Next.js Metadata API, keep only essential, non-metadata tags here if any */}
//             <body
//                 // Apply a default font (Satoshi) to the body using its generated className.
//                 // You can also use Tailwind utility classes like `font-satoshi` throughout your app.
//                 className={`bg-background text-mainheadingWhite transition-all duration-75 ease-linear ${satoshi.className}`}
//                 suppressHydrationWarning={true}
//             >
//                 <AuthProvider>
//                     {children}
//                 </AuthProvider>
//                 <div id="portal-root"></div>
//                 {tawkToSrc && <TawkToManager />}
//             </body>
//         </html>
//     );
// }

// // app/layout.tsx
// import './globals.css';
// import { AuthProvider } from './contexts/AuthContext'; // Assuming path app/contexts/AuthContext.tsx
// import { ReactNode } from 'react';
// import TawkToManager from './components/TawkToManager'; // Assuming path app/components/TawkToManager.tsx
// import { Metadata, Viewport } from 'next';
// import { satoshi, montserrat, outfit, inter } from './fonts'; // Assuming path app/fonts.ts

// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
// const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// export const metadata: Metadata = {
//     metadataBase: new URL(siteUrl),
//     title: {
//         default: 'Remityn - Money Transfer',
//         template: '%s | Remityn',
//     },
//     description: 'Send and receive money internationally with low fees and real exchange rates. Secure, fast, and reliable.',
//     applicationName: 'Remityn',
//     keywords: ['money transfer', 'international payments', 'remittance', 'low fees', 'exchange rates'],
//     authors: [{ name: 'Your Company Name', url: siteUrl }], // Replace with actual company name
//     creator: 'Your Company Name', // Replace
//     publisher: 'Your Company Name', // Replace
//     robots: {
//         index: true,
//         follow: true,
//         googleBot: {
//             index: true,
//             follow: true,
//             'max-video-preview': -1,
//             'max-image-preview': 'large',
//             'max-snippet': -1,
//         },
//     },
//     icons: {
//         icon: '/assets/images/Remityn.ico', // Ensure this path is correct in your public folder
//         // apple: '/apple-touch-icon.png',
//     },
//     openGraph: {
//         title: 'Remityn - Money Transfer', // Consider making this consistent or more specific
//         description: 'Send and receive money internationally with low fees and real exchange rates.',
//         url: siteUrl,
//         siteName: 'Remityn', // Consistent site name
//         images: [
//             {
//                 url: '/og-image.png', // Ensure public/og-image.png exists (1200x630px)
//                 width: 1200,
//                 height: 630,
//                 alt: 'Remityn Money Transfer Service',
//             },
//         ],
//         locale: 'en_US',
//         type: 'website',
//     },
//     twitter: {
//         card: 'summary_large_image',
//         title: 'Remityn - Money Transfer',
//         description: 'Send and receive money internationally with low fees and real exchange rates.',
//         creator: '@YourTwitterHandle', // Replace with actual Twitter handle
//         images: ['/twitter-image.png'], // Ensure public/twitter-image.png exists (e.g., 1200x600px)
//     },
//     // manifest: '/site.webmanifest', // If you have one
// };

// export const viewport: Viewport = {
//     width: 'device-width',
//     initialScale: 1,
//     themeColor: [
//       { media: '(prefers-color-scheme: light)', color: '#22282a' }, // Adjust light theme color
//       // { media: '(prefers-color-scheme: dark)', color: '#YOUR_DARK_THEME_COLOR' }, // Optional dark theme
//     ],
// };

// interface RootLayoutProps {
//     children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//     const shouldLoadTawkTo = tawkToPropertyId && tawkToWidgetId;

//     return (
//         <html
//             lang="en"
//             className={`${satoshi.variable} ${montserrat.variable} ${outfit.variable} ${inter.variable}`}
//             suppressHydrationWarning // Keep if necessary, but investigate underlying causes if possible
//         >
//             <body
//                 className={`bg-background text-mainheadingWhite transition-all duration-75 ease-linear ${satoshi.className}`}
//                 suppressHydrationWarning={true} // Keep if necessary
//             >
//                 <AuthProvider>
//                     {/* AuthProvider will show a spinner or children */}
//                     {children}
//                 </AuthProvider>
//                 <div id="portal-root"></div>
//                 {shouldLoadTawkTo && <TawkToManager />}
//             </body>
//         </html>
//     );
// }

"use client"; // This layout now uses client-side state and effects for the preloader

import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext"; // Corrected path
import { ReactNode, useState, useEffect } from "react"; // Added useState
import TawkToManager from "./components/TawkToManager"; // Corrected path
import { satoshi, montserrat, outfit, inter } from "./fonts"; // Corrected path
import AppPreloader from "./components/ui/AppPreloader"; // Assuming path app/components/AppPreloader.tsx
import { AnimatePresence } from "framer-motion"; // For animating preloader out

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [showAppPreloader, setShowAppPreloader] = useState(true);

  const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
  const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
  const shouldLoadTawkTo = tawkToPropertyId && tawkToWidgetId;

  useEffect(() => {
    // This effect manages the body's overflow style based on preloader visibility
    const originalOverflow = document.body.style.overflow;

    if (showAppPreloader) {
      document.body.style.overflow = "hidden";
    } else {
      // Only restore if it was previously set to hidden by this effect or similar.
      // Check if current overflow is 'hidden' before changing it,
      // to avoid interfering if something else set it to a specific value.
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = originalOverflow || ""; // Restore original or set to default
      }
    }

    // Cleanup function: ensures original overflow is restored if RootLayout unmounts
    // while the preloader was active.
    return () => {
      if (document.body.style.overflow === "hidden") {
        // Check again before restoring
        document.body.style.overflow = originalOverflow || "";
      }
    };
  }, [showAppPreloader]); // Re-run this effect when showAppPreloader changes

  const handlePreloaderComplete = () => {
    setShowAppPreloader(false);
  };

  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${montserrat.variable} ${outfit.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`bg-background text-mainheadingWhite transition-all duration-75 ease-linear ${satoshi.className}`}
        suppressHydrationWarning={true}
      >
        <AnimatePresence>
                    {showAppPreloader && (
                        <AppPreloader onAnimationComplete={handlePreloaderComplete} />
                    )}
                </AnimatePresence>

        <AuthProvider>{children}</AuthProvider>

        <div id="portal-root"></div>
        {shouldLoadTawkTo && <TawkToManager />}
      </body>
    </html>
  );
}
