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
//       <Header />
//       <main>{children}</main>
//       <Footer />
//     </AppContext.Provider>
//   );
// }



// app/(website)/layout.tsx
"use client"; // Still needs to be a client component to use the Provider

import React, { ReactNode } from "react";
import Header from "./components/Header/Header"; // Make sure path is correct
import Footer from "./components/Footer"; // Make sure path is correct
import { WebsiteAppProvider } from "../contexts/WebsiteAppContext"; // Adjust path as needed
import "../globals.css"; // Keep this for styles scoped here or globally

interface LayoutProps {
  children: ReactNode;
  // Remove initialSelectedSendCurrency prop here, it's handled by the provider now
}

// This default export is the ONLY export Next.js expects (besides metadata etc.)
export default function WebsiteLayout({ children }: LayoutProps) {
  return (
    // Wrap the content with the specific provider for this section
    <WebsiteAppProvider>
      {/* Header/Footer likely consume the context via useAppContext internally */}
      <Header />
      <main>{children}</main>
      <Footer />
    </WebsiteAppProvider>
  );
}

// DO NOT export useAppContext or define context here anymore!