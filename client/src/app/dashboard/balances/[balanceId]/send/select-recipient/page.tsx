// frontend/src/app/dashboard/balances/[balanceId]/send/select-recipient/page.tsx
"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import RecipientList from "@/app/dashboard/components/RecipientList"; // Re-use component
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../../../hooks/useAuth"; // Adjust path
import recipientService from "../../../../../services/recipient"; // Adjust path
import { MdCancel } from "react-icons/md";
import Link from "next/link";

interface SelectRecipientParams {
  balanceId: string;
}

export default function SelectRecipientPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const params = useParams<SelectRecipientParams>();
  const { balanceId } = params;
  const { token } = useAuth();
  const [recipients, setRecipients] = useState<any[]>([]); // Use 'any' for now, define interface later
  const [loadingRecipients, setLoadingRecipients] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipients = async () => {
      setLoadingRecipients(true);
      setError(null);
      try {
        const data = await recipientService.getUserRecipients(token);
        setRecipients(data);
      } catch (err: any) {
        setError(err.message || "Failed to load recipients.");
        console.error("Error fetching recipients:", err);
      } finally {
        setLoadingRecipients(false);
      }
    };

    if (token) {
      fetchRecipients();
    } else {
      router.push("/auth/login"); // Redirect if not authenticated
    }
  }, [token, router]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  const filteredRecipients = recipients.filter((recipient) => {
    const recipientName = recipient.accountHolderName || recipient.nickname;
    return recipientName?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleRecipientSelect = (recipientId: string) => {
    // Navigate to the next step (Amount Page)
    router.push(
      `/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`
    );
  };

  const handleAddRecipientClick = () => {
    // Navigate to add recipient page, ideally passing a return URL
    const returnUrl = `/dashboard/balances/${balanceId}/send/select-recipient`;
    router.push(
      `/dashboard/recipients/addrecipient?returnTo=${encodeURIComponent(
        returnUrl
      )}`
    );
  };

  if (loadingRecipients) {
    return <div className="container mx-auto py-10">Loading recipients...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-red-500">Error: {error}</div>
    );
  }

  return (
    <section className="SelectRecipient-Page py-10">
      {/* <DashboardHeader title="Send Money" /> Optional Header */}
      <div className="container mx-auto px-4">

        <h1 className="text-2xl lg:text-3xl font-semibold text-mainheading  dark:text-white mb-6">
          Who are you sending money to?
        </h1>

        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <FiSearch className="size-5 text-neutral-900 dark:text-white" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="w-full rounded-full h-12.5 py-3 pl-12 pr-3 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
            placeholder="Search existing recipients"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              onClick={clearSearchTerm}
              className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
            >
              <MdCancel size={24} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Add Recipient Button/Link */}
        <div
          onClick={handleAddRecipientClick}
          className="flex items-center p-4 -mx-4 rounded-2xl hover:bg-lightgray dark:hover:bg-primarybox transition-colors duration-200 ease-in-out cursor-pointer mb-4"
        >
          <div className="size-12 rounded-full bg-green-600/20 p-2 flex items-center justify-center">
            <FaCirclePlus className="text-green-600" size={24} />
          </div>
          <div className="ml-4 flex-grow">
            <h5 className="font-medium text-mainheading dark:text-white">Add a recipient</h5>
          </div>
          <IoIosArrowForward className="h-5 w-5 text-neutral-900 dark:text-white" />
        </div>

        {/* Recipient List */}
        {filteredRecipients.length > 0 ? (
          <div>
            <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
              All
            </h3>
            <div className="space-y-1">
              {filteredRecipients.map((recipient) => (
                // Wrap RecipientList or create a clickable div
                <div
                  key={recipient._id}
                  onClick={() => handleRecipientSelect(recipient._id)}
                >
                  <RecipientList
                    recipient={recipient}
                    isSelected={false} // Not used here
                    showCheckbox={false} // Don't show checkbox
                    // No onCheckboxChange needed
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          searchTerm && (
            <p className="text-center text-gray-500 dark:text-gray-300 text-lg mt-10">
              No recipients found matching '{searchTerm}'.
            </p>
          )
          // Optionally show a different message if list is empty initially
        )}
      </div>
    </section>
  );
}
