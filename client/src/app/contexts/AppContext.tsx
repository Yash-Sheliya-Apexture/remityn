"use client"; // Add this if components using the context are client components

import React, { useState, createContext, useContext, ReactNode } from "react";

// Define the shape of the context data
export interface AppContextProps {
  selectedSendCurrency: string;
  setSelectedSendCurrency: (currency: string) => void;
}

// Create the context with an initial undefined value
// The undefined initial value helps ensure the provider is used
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Create a custom hook to consume the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    // Provide a more helpful error message
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

// Define the props for the provider component
interface AppProviderProps {
  children: ReactNode;
  initialSelectedSendCurrency?: string; // Optional initial currency
}

// Create the provider component
// It's good practice to have a dedicated Provider component
export function AppProvider({
  children,
  initialSelectedSendCurrency = "USD", // Default USD
}: AppProviderProps) {
  const [selectedSendCurrency, setSelectedSendCurrency] = useState<string>(
    initialSelectedSendCurrency
  );

  // Memoize the context value to prevent unnecessary re-renders
  // Although in this simple case it might not be strictly necessary,
  // it's good practice as the context grows.
  const contextValue = React.useMemo(() => ({
    selectedSendCurrency,
    setSelectedSendCurrency,
  }), [selectedSendCurrency]);


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}