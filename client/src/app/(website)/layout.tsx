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
      <Header />
      <main>{children}</main>
      <Footer />
    </AppContext.Provider>
  );
}
