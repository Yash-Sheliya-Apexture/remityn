import React from "react";

const UkFlag: React.FC<{ className?: string }> = ({
  className = "w-12 h-12",
}) => (
  <svg
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="36" cy="36" r="36" fill="#012169" />
    <path d="M72 36L50.916 22.056V49.944L72 36Z" fill="white" />
    <path d="M0 36L21.084 22.056V49.944L0 36Z" fill="white" />
    <path d="M36 0L22.056 21.084H49.944L36 0Z" fill="white" />
    <path d="M36 72L22.056 50.916H49.944L36 72Z" fill="white" />
    <path
      d="M50.16 16.56L36 28.08L21.84 16.56L16.56 21.84L28.08 36L16.56 50.16L21.84 55.44L36 43.92L50.16 55.44L55.44 50.16L43.92 36L55.44 21.84L50.16 16.56Z"
      fill="white"
    />
    <path
      d="M52.92 10.8L38.88 27.36L44.64 30.24L64.08 13.68L52.92 10.8ZM19.08 10.8L7.92 13.68L27.36 30.24L33.12 27.36L19.08 10.8ZM10.8 52.92L13.68 64.08L30.24 44.64L27.36 38.88L10.8 52.92ZM61.2 52.92L58.32 64.08L41.76 44.64L38.88 38.88L61.2 52.92Z"
      fill="#C8102E"
    />
    <path
      d="M32.4 0V28.8H0V43.2H32.4V72H39.6V43.2H72V28.8H39.6V0H32.4Z"
      fill="white"
    />
    <path
      d="M36 0V30.6H0V41.4H36V72H41.4V41.4H72V30.6H41.4V0H36Z"
      stroke="#C8102E"
      strokeWidth="4.32"
    />
  </svg>
);
export default UkFlag;
