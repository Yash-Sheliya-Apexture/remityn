// import "./globals.css";
// import Header from "./(public)/components/Header/Header";
// import Footer from "./(public)/components/Footer";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html>
//       <head>
//         <title>Your App Title</title>
//       </head>
//       <body>
//         {/* <Header /> */}
//         <Header />
//         <main>{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

// app/components/layout.tsx

// "use client";
// import React, { useState, createContext, useContext, ReactNode } from "react";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer";
// import "../globals.css";

// interface LayoutProps {
//   children: ReactNode;
//   initialSelectedSendCurrency?: string; // Optional initial currency
// }

// interface AppContextProps {
//   selectedSendCurrency: string;
//   setSelectedSendCurrency: (currency: string) => void;
// }

// const AppContext = createContext<AppContextProps | undefined>(undefined);

// export function useAppContext() {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// }

// export default function Layout({
//   children,
//   initialSelectedSendCurrency = "USD",
// }: LayoutProps) {
//   //default usd
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState<string>(
//     initialSelectedSendCurrency
//   );

//   return (
//     <AppContext.Provider
//       value={{ selectedSendCurrency, setSelectedSendCurrency }}
//     >
//       <html>
//         <head>
//           <title>Wise: The international accouts money transfer </title>
//         </head>
//         <body>
//           {/* <Header /> */}
//           <Header />
//           <main>{children}</main>
//           <Footer />
//         </body>
//       </html>
//     </AppContext.Provider>
//   );
// }

// app/components/layout.tsx

// "use client";
// import React, { useState, createContext, useContext, ReactNode } from "react";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer";
// import "../globals.css";

// interface LayoutProps {
//   children: ReactNode;
//   initialSelectedSendCurrency?: string; // Optional initial currency
// }

// interface AppContextProps {
//   selectedSendCurrency: string;
//   setSelectedSendCurrency: (currency: string) => void;
// }

// const AppContext = createContext<AppContextProps | undefined>(undefined);

// export function useAppContext() {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// }

// export default function Layout({
//   children,
//   initialSelectedSendCurrency = "USD",
// }: LayoutProps) {
//   //default usd
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState<string>(
//     initialSelectedSendCurrency
//   );

//   return (
//     <AppContext.Provider
//       value={{ selectedSendCurrency, setSelectedSendCurrency }}
//     >
//       <html lang="en">
//         <head>
//           <title>Wise: The international accounts money transfer</title>
//           <link rel="icon" href="/favicon.webp" />
//           <meta
//             name="description"
//             content="Wise is the international accounts money transfer."
//           />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//         </head>
//         <body>
//           <Header />
//           <main>{children}</main>
//           <Footer />
//         </body>
//       </html>
//     </AppContext.Provider>
//   );
// }

// app/components/layout.tsx

// "use client";
// import React, { useState, createContext, useContext, ReactNode } from "react";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer";
// import "../globals.css";

// interface LayoutProps {
//   children: ReactNode;
//   initialSelectedSendCurrency?: string; // Optional initial currency
// }

// interface AppContextProps {
//   selectedSendCurrency: string;
//   setSelectedSendCurrency: (currency: string) => void;
// }

// const AppContext = createContext<AppContextProps | undefined>(undefined);

// export function useAppContext() {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// }

// export default function Layout({
//   children,
//   initialSelectedSendCurrency = "USD",
// }: LayoutProps) {
//   //default usd
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState<string>(
//     initialSelectedSendCurrency
//   );

//   return (
//     <AppContext.Provider
//       value={{ selectedSendCurrency, setSelectedSendCurrency }}
//     >
//       <head>
//         <title>Wise: The international accounts money transfer</title>
//         {/* Add the favicon link here */}
//         <link rel="icon" href="/favicon.ico" />{" "}
//         {/*  path  you stored your favicon file  */}
//         {/* You might also want to include other meta tags for SEO */}
//         <meta
//           name="description"
//           content="Wise is the international accounts money transfer."
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </head>

//       <Header />
//       <main>{children}</main>
//       <Footer />
//     </AppContext.Provider>
//   );
// }

// app/components/layout.tsx

"use client";
import React, { useState, createContext, useContext, ReactNode } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import "../globals.css";

interface LayoutProps {
  children: ReactNode;
  initialSelectedSendCurrency?: string; // Optional initial currency
}

interface AppContextProps {
  selectedSendCurrency: string;
  setSelectedSendCurrency: (currency: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

import Head from "next/head"; // Import the Head component

export default function Layout({
  children,
  initialSelectedSendCurrency = "USD",
}: LayoutProps) {
  //default usd
  const [selectedSendCurrency, setSelectedSendCurrency] = useState<string>(
    initialSelectedSendCurrency
  );

  return (
    <AppContext.Provider
      value={{ selectedSendCurrency, setSelectedSendCurrency }}
    >
      <Head>
        <title>Wise: The international accounts money transfer</title>
        {/* Add the favicon link here */}
        <link rel="icon" href="/favicon.ico" />
        {/* You might also want to include other meta tags for SEO */}
        <meta
          name="description"
          content="Wise is the international accounts money transfer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </AppContext.Provider>
  );
}
