"use client"; // Required for Framer Motion

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

const SecuritySection = () => {
  const { user } = useAuth();

  const buttonText = user
    ? "Launch Your Dashboard"
    : "Start Your Money Journey";
  const buttonLink = user ? "/dashboard" : "/auth/register";

  return (
    // Apply whileInView to the main section to trigger animations
    <section
      className="Security-section sm:py-16 py-10 overflow-hidden" // Hide horizontal overflow during animation
      id="security"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Text Block */}
          <div
            className="w-full lg:w-1/2"
            // Inherits initial/whileInView timing from parent section
          >
            <div className="space-y-4 text-center md:text-left">
              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
                  Smart Dashboard for{" "}
                  <span className="text-primary">
                    Effortless Currency Management
                  </span>
                </h3>

                <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
                  Gain full visibility and control over your international
                  transactions with a sleek, real-time dashboard. Track
                  balances, exchange rates, and transaction history—all in one
                  intuitive interface designed for secure, seamless money
                  movement across borders.
                </p>
              </div>

              <div className="flex justify-center md:justify-start mt-8">
                <Link href={buttonLink} className="inline-block">
                  <button className="bg-primary hover:bg-primaryhover lg:text-lg text-base font-medium text-mainheading cursor-pointer py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    {buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="w-full lg:w-1/2">
            <div className="relative lg:w-[52vw] w-full h-auto flex justify-center pb-4 overflow-hidden">
              <Image
                src="/assets/images/Macbook_Air.svg"
                width={7050}
                height={4000}
                alt="Padlock symbolizing security"
                className="object-contain rounded-3xl overflow-visible w-full h-auto sm:-mr-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SecuritySection;
