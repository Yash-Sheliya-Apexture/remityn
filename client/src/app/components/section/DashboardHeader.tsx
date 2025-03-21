import React from "react";
import Image from "next/image";

const DashboardHeader: React.FC = () => {
  // Hardcoded data (replace with your actual image path or URL)
  const name = "rudra Sutariya";
  const isOnline = true;

  return (
    <div className="p-4 border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        <div className="flex items-center justify-between p-2 py-6">
          <div>
            <Image
              src="/assets/images/wise-logo.svg"
              width={100}
              height={100}
              alt="Picture of the author"
            />
          </div>

          {/* Profile Picture */}
          <div className="relative flex items-center">
            <img
              src="/assets/images/app-store-logo.png"
              alt="User Avatar"
              className="rounded-full w-12 h-12 object-cover"
            />
            {isOnline && (
              <div className="absolute top-0 left-8 size-4 bg-red-500 rounded-full border-2 border-white"></div>
            )}

            {/* User Name */}
            <div className="ml-2 font-medium text-gray">{name}</div>

            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-700 mr-4"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
