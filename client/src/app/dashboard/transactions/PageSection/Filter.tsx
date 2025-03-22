// components/Filter.tsx
import React from "react";
import { LuSettings2 } from "react-icons/lu";

const Filter: React.FC = () => {
  return (
    <button className="bg-primary text-secondary font-medium py-1 px-4 rounded-full flex items-center">
      <LuSettings2 size={20} className="sm:mr-2 " />
      <span className="sm:block hidden">Filters</span>
    </button>
  );
};

export default Filter;