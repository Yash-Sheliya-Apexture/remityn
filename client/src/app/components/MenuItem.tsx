import React from "react";

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  hasChevron?: boolean;
  description?: string;
  badge?: number;
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  hasChevron = true,
  description,
  badge,
}) => {
  return (
    <div className="flex items-center p-4 hover:bg-green/10 rounded-xl cursor-pointer relative">
      <div className="bg-green/6 lg:p-4 p-3 rounded-full mr-4">{icon}</div>
      <div className="flex-grow">
        <div className="font-medium  lg:text-xl">{label}</div>
        {description && (
          <div className="text-sm text-gray-500">{description}</div>
        )}
      </div>

      {badge && (
        <div className="mr-2 absolute top-4 lg:left-14 left-12">
          <div className="bg-[#cb272f] flex items-center justify-center lg:p-2 p-1 rounded-full border-4 border-white"></div>
        </div>
      )}

      {hasChevron && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-gray-600"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

export default MenuItem;
