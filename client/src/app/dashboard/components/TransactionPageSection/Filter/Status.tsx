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
      <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
        Status
      </h4>
      <div className="pt-4 flex items-center gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            className={`font-medium border rounded-full px-4 py-1 flex items-center gap-2 ${
              selectedStatus === status
                ? "bg-secondary text-primary border-secondary" // Highlight if selected
                : "border-secondary text-secondary bg-white"
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
                className="inline-flex items-center justify-center cursor-pointer" // Added cursor-pointer to indicate it's clickable
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