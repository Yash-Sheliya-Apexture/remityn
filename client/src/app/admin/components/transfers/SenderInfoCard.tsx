"use client";
import React from "react";
import { User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SenderInfoCardProps {
  user: any; // Consider defining a User type/interface
}

const FallbackAvatar: React.FC<{ name: string }> = ({ name }) => (
  <span className="font-bold text-xl">
    {name ? name.charAt(0).toUpperCase() : "U"}
  </span>
);

const SenderInfoCard: React.FC<SenderInfoCardProps> = ({ user }) => {
  if (!user) return <p>Sender information not available.</p>; // Handle null user case

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <div className="mb-8">
      <h4 className="inline-flex items-center bg-sky-50 text-sky-600 dark:bg-sky-600/15 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-sky-600/50">
        <User className="size-4 mr-1.5 flex-shrink-0" />
        Sender Information
      </h4>

      <div className="flex items-start sm:items-center rounded-xl border p-4 flex-col sm:flex-row">
        {/* Avatar */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-sky-100 text-sky-600 flex-shrink-0 mb-3 sm:mb-0 overflow-hidden">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Sender"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")} // Hide img on error
            />
          ) : (
             // Render fallback directly if image fails or isn't present
             <FallbackAvatar name={user.fullName} />
          )}
           {/* Conditional fallback display using CSS/JS might be complex, simpler to always have fallback structure */}
           {!user.profileImage && <FallbackAvatar name={user.fullName} />}
        </div>

        {/* Details */}
        <div className="ml-0 sm:ml-4 flex-grow w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-0">
            <h5 className="font-semibold text-neutral-900 dark:text-white text-lg break-words mr-2">
              {user.fullName || "N/A"}
            </h5>
            <Badge
              variant="outline"
              className="bg-sky-50 text-sky-600 border-sky-600/50 hover:bg-sky-100 dark:bg-sky-600/15 text-xs mt-1 sm:mt-0 flex-shrink-0"
            >
              Sender
            </Badge>
          </div>
          <p className="text-gray-500 dark:text-gray-300 text-sm break-words">
            {user.email || "Email not available"}
          </p>

          {/* Extra Info */}
          <div className="mt-3 pt-3 border-t">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0">
                  <User className="w-4 h-4 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-300">User ID</p>
                  <p
                    className="text-sm font-medium text-neutral-900 dark:text-white"
                    title={user._id}
                  >
                    {user._id ? `${user._id}` : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Member Since</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {memberSince}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderInfoCard;