// components/FilterButton.tsx (or adjust path)
import React from "react";
import { LuSettings2 } from "react-icons/lu";

interface FilterButtonProps {
  onClick: () => void; // Callback when the button is clicked
  // Add aria-expanded if needed for accessibility based on parent state
  // ariaExpanded: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  // ... (keep existing implementation)
  return (
    <button
      className="inline-flex items-center justify-center gap-3 bg-primary text-neutral-900 hover:bg-primaryhover h-12.5 md:w-36 w-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer"
      onClick={onClick}
      // aria-expanded={ariaExpanded} // Optional: manage aria-expanded in parent
      aria-controls="filter-popup" // Keep this if the ID remains the same in TransactionsPage
      aria-label="Open Filters" // Added for accessibility
    >
      <LuSettings2 size={20} />
      <span className="md:block hidden">Filters</span>
    </button>
  );
};

export default FilterButton;