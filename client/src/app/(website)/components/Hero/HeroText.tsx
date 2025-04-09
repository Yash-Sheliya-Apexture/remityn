import React from "react";
import Image from "next/image";
import Link from "next/link";
import AppStore from "../../../components/ui/AppStore";

import { PiCurrencyCircleDollar } from "react-icons/pi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { SlLock } from "react-icons/sl";
import { IoIosInformationCircleOutline } from "react-icons/io";

const HeroText = () => {
  return (
    <>
      <AppStore />

      <div>
        <h1 className="text-3xl md:text-6xl xl:text-8xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
          Send Money Globally For Less
        </h1>
      </div>

      <div className="">
        <p className="text-lg font-semibold text-gray-500 dark:text-gray-300 leading-relaxed tracking-wider text-wrap ">
          Join over 12.8 million people sending money everywhere —
          <button className="text-primary underline cursor-pointer">
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
      </div>
    </>
  );
};
export default HeroText;
