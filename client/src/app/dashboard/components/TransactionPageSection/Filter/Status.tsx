// components/Filter/Status.tsx
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";


interface StatusProps {
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
}

export default function Status({ selectedStatus, onStatusChange }: StatusProps) {
  const statuses = ["Completed", "Cancelled"]; // Example statuses

  const handleStatusButtonClick = (status: string) => {
    if (selectedStatus === status) {
      onStatusChange(null); // Deselect if already selected
    } else {
      onStatusChange(status);
    }
  };

  const handleClearStatus = () => {
    onStatusChange(null); // Directly clear status
  };

  return (
    <div>
      <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b">
        Status
      </h4>
      <div className="flex items-center gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            className={`font-medium border rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer ${
              selectedStatus === status
                ? "bg-neutral-900 text-primary dark:bg-green-600/20" // Highlight if selected
                : "text-mainheading dark:bg-background dark:text-white bg-white"
            }`}
            onClick={() => handleStatusButtonClick(status)}
          >
            {status}
            {selectedStatus === status && (
              <span // Changed from <button> to <span>
                onClick={(e) => {
                  e.stopPropagation(); // Prevent button click from re-selecting
                  handleClearStatus();
                }}
                className="inline-flex items-center justify-center" // Added cursor-pointer to indicate it's clickable
                aria-label={`Clear status ${status}`}
              >
                <IoIosCloseCircleOutline size={24} />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}