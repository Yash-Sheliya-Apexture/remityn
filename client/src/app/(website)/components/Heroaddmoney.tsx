"use client";

import React from "react"; // useState is no longer needed
// Link is removed as it wasn't used
import { useAuth } from "@/app/contexts/AuthContext";
import {
  // FaArrowRight is removed as it wasn't used
  FaShieldAlt,
  FaGlobeAmericas,
  FaClock,
} from "react-icons/fa";
import Image from "next/image";

const HeroAddMoney: React.FC = () => {
  const { user } = useAuth();

  const benefits = [
    { icon: <FaGlobeAmericas />, text: "170+ countries supported" },
    { icon: <FaShieldAlt />, text: "Bank-level security" },
    { icon: <FaClock />, text: "24/7 transfers money" },
  ];

  // Example of a simple navigation function you could add to the button's onClick:
  const handleButtonClick = () => {
    if (user) {
      // Example: Navigate to a generic add money page if logged in
      window.location.href = `/dashboard/add-money`;
    } else {
      // Example: Navigate to registration with 'add' intent if logged out
      window.location.href = `/auth/register?intent=add`;
    }
  };

  return (
    <section className="relative lg:py-10 py-5 bg-white dark:bg-background overflow-hidden px-4">
      <div className="max-w-8xl container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Left Content Area */}
          <div className="lg:w-1/2 text-white lg:space-y-5 space-y-3">
            <p className="lg:text-base md:text-sm text-xs inline-block px-4 py-1.5 dark:bg-primary rounded-full bg-gray/10 text-mainheading font-medium">
              Trusted by over 3M+ customers worldwide
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
              Add Money Globally
              <span className="text-primary"> With Just A Few Clicks </span>
            </h1>

            <p className="lg:text-lg text-sm text-gray-700 dark:text-gray-300">
              Easily fund your wallet from anywhere in the world using secure
              and instant payment methods. Whether you're transferring from a
              bank, using a card, or sending via UPI, our platform makes it
              simple, fast, and reliable — no borders, no hassle.
            </p>

            {/* Added onClick handler to the button */}
            <button
              onClick={handleButtonClick} // Added onClick
              className="bg-primary rounded-full hover:bg-primaryhover cursor-pointer duration-300 ease-in-out lg:text-base text-sm text-mainheading font-medium px-6 lg:py-3 py-2 lg:h-12.5"
            >
              {user ? "Add Money Now" : "Create a Account"}
            </button>

            <div className="flex lg:flex-row flex-col flex-wrap lg:gap-6 gap-4 lg:mt-0 mt-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center lg:text-base text-sm gap-2">
                  <span className="dark:text-primary text-gray">
                    {benefit.icon}
                  </span>
                  <span className="text-mainheading dark:text-white font-semibold text-sm sm:text-base">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form Area */}
          <div className="lg:w-5/12 mt-10 lg:mt-0 flex justify-center">
            <Image
              src="/assets/images/secure.svg"
              alt="Padlock symbolizing security"
              width={450}
              height={450}
              priority
              className="lg:h-full h-64"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAddMoney;
