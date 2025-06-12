// src/components/FeatureCard.tsx
import { AudioWaveform, Clock, Send, Shuffle, Wallet } from "lucide-react";
import React from "react";
// Import appropriate icons from react-icons, as they are used in the features array
import {
  FaUserPlus, // For Account Setup
  FaWallet, // For Fund Your Account
  FaPaperPlane, // For Direct Transfers
  FaExchangeAlt, // For Exchange Rates
  FaHeadset, // For Customer Support
} from "react-icons/fa";

// Interface for a single feature item
export interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  colSpanLarge: string; // To define column span on large screens (lg:)
  iconBgColor: string;
}

// The features data array
export const features: Feature[] = [
  {
    id: 1,
    icon: Clock,
    title: "Quick Sign-Up",
    description: "Start in two minutes.",
    colSpanLarge: "lg:col-span-3", // Spans 3 of 6 columns on large screens
    iconBgColor: "#e3ffd1", // Light green
  },
  {
    id: 2,
    icon: Wallet,
    title: "Pay Any Way",
    description: "ACH, or wire transfer.",
    colSpanLarge: "lg:col-span-3", // Spans 3 of 6 columns on large screens
    iconBgColor: "#9bf7ff", // Light blue
  },
  {
    id: 3,
    icon: Send,
    title: "Fast INR Credit",
    description: "Funds land within hours.",
    colSpanLarge: "lg:col-span-2", // Spans 2 of 6 columns on large screens
    iconBgColor: "#e2c9fb", // Light pink
  },
  {
    id: 4,
    icon: Shuffle,
    title: "Best Rate · Zero Fee",
    description: "World-leading rate, absolutely free.",
    colSpanLarge: "lg:col-span-2", // Spans 2 of 6 columns on large screens
    iconBgColor: "#fbcdcd", // Light orange
  },
  {
    id: 7,
    icon: AudioWaveform,
    title: "Live Tracking",
    description: "Watch every step till it arrives.",
    colSpanLarge: "lg:col-span-2", // Spans 3 of 6 columns on large screens
    iconBgColor: "#FFA07A", // Light yellow
  },
];

// Props interface for the FeatureCard component
export interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBgColor: string;
}

// The FeatureCard component
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  iconBgColor,
}) => {
  return (
    <div className="bg-background relative w-full h-full rounded-3xl p-4 md:p-6 flex flex-col gap-12 overflow-hidden">
      <div className="absolute -right-1 -top-1">
        <img
          alt=""
          loading="lazy"
          width="150"
          height="150"
          decoding="async"
          data-nimg="1"
          className="z-1"
          src="/assets/images/RightShep.svg"
        />
      </div>
      <div
        className="lg:w-16 w-14 lg:h-16 h-14 xl:rounded-2xl rounded-xl flex items-center justify-center"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon className="text-mainheading xl:size-7 size-6" />
      </div>
      <div className="flex flex-col flex-grow xl:justify-end">
        <h3 className=" text-mainheadingWhite group-hover:text-primary text-2xl font-semibold line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-subheadingWhite/60 lg:text-lg text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
