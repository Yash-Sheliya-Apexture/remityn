"use client";

import React from "react";

// --- Component Props Interface ---
// We can simplify the props since responsiveness is handled internally.
// Adding `className` allows for easy custom spacing (like margins).
interface ProgressCircleCardProps {
  progress: number;
  className?: string;
}

// --- The Responsive Progress Circle Card Component ---
const ProgressCircleCard: React.FC<ProgressCircleCardProps> = ({
  progress = 73, // Default progress to match the image
  className = "",
}) => {
  // --- SVG Calculation Logic (based on a 100x100 viewBox) ---
  // Using a fixed coordinate system makes scaling effortless.
  const viewBoxSize = 100;
  const strokeWidth = 10; // Stroke width relative to the 100x100 viewbox

  const center = viewBoxSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    // Card container with responsive width and padding
    <div
      className={`bg-primarybox p-2.5 sm:p-6 sm:rounded-3xl rounded-xl flex flex-col items-center justify-center space-y-3 sm:space-y-4 shadow-lg w-32 sm:w-48 h-auto ${className}`}
    >
      {/* Title with responsive font size */}
      <p className="font-semibold text-base sm:text-xl text-mainheadingWhite text-center">
        Paid Progress
      </p>

      {/* SVG Container: responsive width/height controls the visual size */}
      <div className="relative w-18 h-18 sm:w-[120px] sm:h-[120px]">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} // Fixed coordinate system
        >
          {/* Background Circle/Track */}
          <circle
            className="text-white/10" // A very light, transparent gray for the track
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={center}
            cy={center}
          />
          {/* Foreground Progress Circle */}
          <circle
            className="text-primary" // Use your theme's primary color
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={center}
            cy={center}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round" // Makes the end of the line rounded
            style={{
              transform: "rotate(-90deg)", // Starts the circle from the top
              transformOrigin: "50% 50%",
              transition: "stroke-dashoffset 0.5s ease-out", // Smooth animation
            }}
          />
        </svg>

        {/* Percentage Text: responsive font size */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg sm:text-3xl font-bold text-mainheadingWhite">
            {`${Math.round(progress)}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircleCard;