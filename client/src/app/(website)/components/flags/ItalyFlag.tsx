import React from "react";

const ItalyFlag: React.FC<{ className?: string }> = ({
  className = "w-12 h-12",
}) => (
  <svg
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="36" cy="36" r="36" fill="#fff" />
    <path
      d="M36 72C16.1177 72 0 55.8823 0 36C0 16.1177 16.1177 0 36 0V72Z"
      fill="#009246"
    />
    <path
      d="M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0V72Z"
      fill="#CE2B37"
    />
    <rect x="24" y="0" width="24" height="72" fill="#F1F2F1" />
  </svg>
);
export default ItalyFlag;
