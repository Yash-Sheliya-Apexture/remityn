'use client';

import React from 'react';
import AccountCard from "@/app/components/AccountCard";
import MenuItem from "@/app/components/MenuItem";
import { FiUser } from "react-icons/fi";
import { RxQuestionMark } from "react-icons/rx";
import { RiShieldLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa6";
import { IoMdCopy } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5"; // <-- Import the new icon
import { useAuth } from '@/app/contexts/AuthContext'; // Import the useAuth hook

const AccountSettings: React.FC = () => {
  // Use the hook to get authentication status and user data
  const { user, loading } = useAuth(); // Now this will work

  // Display a loading state while authentication is being checked
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-10">
        <p>Loading account information...</p>
        {/* Optional: Add a spinner or skeleton loader here */}
      </div>
    );
  }

  // Determine the name to display. Use the user's fullName if available, otherwise provide a fallback.
  const displayName = user?.fullName || 'Account Holder'; // Use optional chaining and a fallback

  return (
    // Consider adjusting grid layout for better sticky behavior if needed:
    <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10"> {/* Example layout adjustment + padding */}
        <AccountCard username={displayName} />
      {/* Right Side: Scrollable Menu Items */}
      <div className="flex flex-col w-full">
        <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-4">Your account</h2>
        <div className="space-y-2 mb-6">
          <MenuItem
            icon={<FaRegBell className="size-6 text-neutral-900 dark:text-white" />}
            label="Inbox"
            href="your-account/inbox"
          />
          <MenuItem
            icon={<RxQuestionMark className="size-6 text-neutral-900 dark:text-white" />}
            label="Help"
            href="help"
          />
          <MenuItem
            icon={<IoMdCopy className="size-6 text-neutral-900 dark:text-white" />}
            label="Statements and reports"
            href="statements"
          />
        </div>

        <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-4">Settings</h2>
        <div className="space-y-2">
           {/* --- Start: Added Language and Appearance Item --- */}
           <MenuItem
            icon={<IoMoonOutline className="size-6 text-neutral-900 dark:text-white" />} // Use the moon icon
            label="Language and appearance"
            description="Customise language settings and which theme is used."
            href="your-account/language-and-appearance" // Link to the dedicated page
          />
          {/* --- End: Added Language and Appearance Item --- */}

          <MenuItem
            icon={<RiShieldLine className="size-6 text-neutral-900 dark:text-white" />}
            label="Security and privacy"
            description="Change your security and privacy settings."
            href="your-account/security-and-privacy"
          />
          <MenuItem
            icon={<FaRegBell className="size-6 text-neutral-900 dark:text-white" />}
            label="Notifications"
            description="Customise how you get updates."
            href="your-account/notification-preferences"
          />
          <MenuItem
            icon={<FiUser className="size-6 text-neutral-900 dark:text-white" />}
            label="Personal details"
            description="Update your personal information."
            href="your-account/personal-details"
          />
        </div>

        <div className="text-center space-y-1.5 mt-10 pb-10">
          <p className="text-subheading dark:text-white">
            We’ve made some changes to this area of the app.
          </p>
          <span className="text-primary font-medium underline underline-offset-1 cursor-pointer">
            Give us feedback
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;