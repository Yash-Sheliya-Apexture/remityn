import React from "react";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaHandHoldingUsd } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";
import { MdSpeed } from "react-icons/md";

const HeroText = () => {
  return (
    <>
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl xl:text-7xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
          Transfer Money
          <span className="text-primary"> at 0% Fees </span>
        </h1>

        <p className="lg:text-lg sm:text-base text-sm text-gray-500  leading-relaxed dark:text-gray-300">
          Experience hassle-free currency conversion with Worldwide Currency
          Exchange. Enjoy competitive rates, fast service, and secure
          transactions—perfect for travel, investments, and global business.
        </p>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 max-w-lg">
          {/* Tags */}
          <div className="flex items-center gap-2.5 text-primary">
            <AiOutlineClockCircle className="sm:size-6 size-5" />
            <span className="dark:text-white text-mainheading font-medium text-sm sm:text-base">
              Real-Time Conversion
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-primary">
            <FaHandHoldingUsd className="sm:size-6 size-5" />
            <span className="dark:text-white text-mainheading font-medium text-sm sm:text-base">
              Competitive Rates
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-primary">
            <BsShieldLock className="sm:size-6 size-5" />
            <span className="dark:text-white text-mainheading font-medium text-sm sm:text-base">
              Secure Transactions
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-primary">
            <MdSpeed className="sm:size-6 size-5" />
            <span className="dark:text-white text-mainheading font-medium text-sm sm:text-base">
              Fast & Easy
            </span>
          </div>
        </div>

        <div className="md:pt-4 pt-0">
          <Link href="auth/register">
            <button className="bg-primary hover:bg-primaryhover cursor-pointer font-medium py-2 text-sm lg:text-base px-8 md:h-12.5 rounded-full transition-colors duration-300 ease-in-out text-mainheading flex items-center justify-center">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default HeroText;
