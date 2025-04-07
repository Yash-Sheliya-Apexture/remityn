// frontend/components/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import apiConfig from "../../../config/apiConfig";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { FaExclamationCircle  } from "react-icons/fa";


axios.defaults.baseURL = apiConfig.baseUrl;

interface CurrencyOption {
  code: string;
  currencyName?: string;
  flagImage?: string;
}

interface CurrencySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCurrencyAdded: (newAccount: any) => void;
}

const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
  isOpen,
  onClose,
  onCurrencyAdded,
}) => {
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCurrencies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("/currencies");
        // Filter out INR when setting the initial list
        const availableCurrencies = response.data.filter(
          (currency: CurrencyOption) => currency.code !== "INR"
        );
        setCurrencies(availableCurrencies);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load currencies");
        setIsLoading(false);
        console.error("Error fetching currencies:", err);
      }
    };

    if (isOpen) {
      // Fetch only when the modal is opened
      fetchCurrencies();
      // Reset state when opening
      setSelectedCurrencyCode("");
      setSearchQuery("");
      setError(null);
    }
  }, [isOpen]); // Re-fetch when isOpen changes to true

  // Filter based on search query (INR is already removed from the base `currencies` state)
  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (currency.currencyName &&
        currency.currencyName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCurrencySelect = (code: string) => {
    // Double-check here just in case, though it shouldn't be possible if filtered out
    if (code !== "INR") {
      setSelectedCurrencyCode(code);
    }
  };

  const handleConfirm = async () => {
    if (!selectedCurrencyCode || selectedCurrencyCode === "INR") {
      // Add extra check
      alert("Please select a valid currency.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "/accounts",
        { currencyCode: selectedCurrencyCode },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onCurrencyAdded(response.data);
      // No need to call onClose here, Dialog's onOpenChange handles it
      // onClose();
      // Reset state after successful addition for next opening
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add currency account");
      setIsLoading(false);
      console.error("Error adding currency account:", err);
    }
  };

  const clearSearchTerm = () => {
    setSearchQuery("");
  };

  // Use the Dialog's onOpenChange for closing logic
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when closing via any method (overlay click, escape key, cancel button)
      clearSearchTerm();
      setSelectedCurrencyCode(""); // Clear selection on close
      setError(null); // Clear error on close
      onClose(); // Call the original onClose handler
    }
    // If opening, the useEffect handles fetching and state reset
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Use handleOpenChange */}
      <DialogContent >
        <div className="mt-4 h-[calc(100%-80px)] flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Open a balance</DialogTitle>
          </DialogHeader>

          <div className="relative">
            <div className="absolute sm:inset-y-0 top-4 left-0 flex items-center pl-4 pointer-events-none">
              <FiSearch
                className="h-5 w-5 text-neutral-900 dark:text-white"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              placeholder="Search currency..."
              className="w-full rounded-full py-3 pl-12 pr-3 h-12.5 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={clearSearchTerm}
                className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none"
              >
                <MdCancel size={24} aria-hidden="true" />
              </button>
            )}
          </div>

          <DialogDescription>
            Choose a currency to add to your account.
          </DialogDescription>

          {isLoading && <p>Loading currencies...</p>}
          {error && !isLoading && (
            <div className="p-4 rounded-lg bg-lightgray dark:bg-primarybox inline-flex items-center gap-2">
                <FaExclamationCircle  className="text-red-600"/>
                <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className={`sm:h-64 overflow-y-auto scrollbar-hide mb-4 space-y-2`}>
            {!isLoading && filteredCurrencies.length > 0
              ? filteredCurrencies.map((currency) => (
                  <div className={`block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer ${
                        selectedCurrencyCode === currency.code
                          ? "bg-lightgray dark:bg-primarybox"
                          : ""
                      }`} key={currency.code}>
                    <div
                      className={`flex items-center gap-4`}
                      onClick={() => handleCurrencySelect(currency.code)}
                    >
                      {currency.flagImage && (
                        <Image
                          src={currency.flagImage.trim()}
                          alt={`${currency.currencyName || currency.code} flag`}
                          width={44}
                          height={44}
                          onError={() =>
                            console.error(
                              `Error loading image for ${currency.code}: ${currency.flagImage}`
                            )
                          }
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
                          {currency.code}
                        </span>
                        {currency.currencyName && (
                          <span className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            {currency.currencyName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : !isLoading && (
                  <p className="text-gray-500 dark:text-gray-300 text-center py-4">
                    No results found.
                  </p>
                )}
          </div>
        </div>

        <DialogFooter>
          {/* Cancel button now implicitly uses handleOpenChange */}
          <button
            className="bg-neutral-900 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline sm:w-auto w-full transition-all duration-75 ease-linear cursor-pointer"
            onClick={() => handleOpenChange(false)} // Explicitly call close logic
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="bg-primary text-neutral-900 hover:bg-primaryhover font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full transition-all duration-75 ease-linear cursor-pointer" // Added disabled styling
            type="button"
            onClick={handleConfirm}
            disabled={
              isLoading ||
              !selectedCurrencyCode || // Still need a selection
              selectedCurrencyCode === "INR" // Belt-and-suspenders check
              // No need to check filteredCurrencies.length === 0 if !selectedCurrencyCode handles it
            }
          >
            {isLoading ? "Adding..." : "Confirm"} {/* Loading text */}
          </button>
        </DialogFooter>

        {/* Display error message related to adding account */}
        {error && isLoading && (
          <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CurrencySelectorModal;
