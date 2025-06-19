import React from "react";

const DenmarkFlag: React.FC<{ className?: string }> = ({
  className = "w-12 h-12",
}) => (
  <svg
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="36" cy="36" r="36" fill="#C8102E" />
    <rect x="0" y="30.6" width="72" height="10.8" fill="white" />
    <rect x="25.2" y="0" width="10.8" height="72" fill="white" />
  </svg>
);
export default DenmarkFlag;
