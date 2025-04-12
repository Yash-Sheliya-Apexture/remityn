import React from "react";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";
import { MdSpeed } from "react-icons/md";

const HeroText = () => {
  return (
    <>
      {/* <AppStore /> */}

      {/* <div>
        <h1 className="text-3xl md:text-6xl xl:text-8xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
          Send Money Globally For Less
        </h1>
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-500 dark:text-gray-300 leading-relaxed tracking-wider text-wrap ">
          Join over 12.8 million people sending money everywhere —
          <button className="text-secondary dark:text-primary underline underline-offset-4 cursor-pointer">
            &nbsp;with fees as low as 0.1%.
          </button>
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center text-gray-500 dark:text-gray-300 gap-2 text-lg">
            <PiCurrencyCircleDollar size={22} className="text-primary" />
            <span className="font-medium text-mainheading dark:text-white">Low fees</span>
            <span className="">- fees get cheaper the more you send</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-300 gap-2 text-lg">
            <AiOutlineThunderbolt size={22} className="text-primary " />
            <span className="font-medium text-mainheading dark:text-white">Lightning fast</span>
            <span className="">
              - money typically arrives in seconds{" "}
              <IoIosInformationCircleOutline
                size={18}
                className="inline-block ml-2"
              />
            </span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-300 gap-2 text-lg">
            <SlLock size={22} className="text-primary" />
            <span className="font-medium text-mainheading dark:text-white">Perfectly predictable</span>
            <span className="">
              - lock in an exchange rate for up to 48 hours
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/signup"
          className="inline-flex items-center justify-center px-6 py-3 h-14 border border-transparent font-medium rounded-full text-lg text-mainheading bg-primary hover:bg-primaryhover transition-colors duration-300 ease-in-out"
        >
          Open an account in minutes
        </Link>
      </div> */}

      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl xl:text-8xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
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
            <button className="bg-primary group hover:bg-primaryhover cursor-pointer font-medium md:py-3 py-2 px-4 md:h-14 rounded-full transition-colors duration-300 ease-in-out text-mainheading flex items-center justify-center">
              Get Started Now
              <FaChevronRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-5 transition-all duration-300 ease-in-out" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default HeroText;
