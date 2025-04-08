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



"use client"; // Keep this if Header/Footer or children require client-side interactivity

// Remove unused imports if any: createContext, useContext, useState
import React, { ReactNode } from "react";
import Header from "./components/Header/Header"; // Adjust path if needed
import Footer from "./components/Footer";       // Adjust path if needed
import "../globals.css";
import { AppProvider } from "../contexts/AppContext"; // Import the Provider


// Rename Layout to RootLayout for clarity (optional but common practice)
export default function RootLayout({
  children,
}: { // Use Next.js standard type for children prop in Root Layout
  children: React.ReactNode;
}) {


  return (

    <AppProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </AppProvider>
  );
}