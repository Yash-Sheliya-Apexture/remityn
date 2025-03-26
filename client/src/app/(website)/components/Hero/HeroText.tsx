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
        <h1 className="text-3xl md:text-6xl xl:text-8xl font-black font-mont text-main uppercase tracking-tight">
          Send Money Globally For Less
        </h1>
      </div>

      <div className="">
        <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
          Join over 12.8 million people sending money everywhere —
          <button className="text-green underline cursor-pointer">
            &nbsp;with fees as low as 0.1%.
          </button>
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center text-gray gap-2 text-lg">
            <PiCurrencyCircleDollar size={22} className="text-green" />
            <span className="font-medium text-main">Low fees</span>
            <span className="">- fees get cheaper the more you send</span>
          </div>
          <div className="flex items-center text-gray gap-2 text-lg">
            <AiOutlineThunderbolt size={22} className="text-green " />
            <span className="font-medium text-main">Lightning fast</span>
            <span className="">
              - money typically arrives in seconds{" "}
              <IoIosInformationCircleOutline
                size={18}
                className="inline-block ml-2"
              />
            </span>
          </div>
          <div className="flex items-center text-gray gap-2 text-lg">
            <SlLock size={22} className="text-green" />
            <span className="font-medium text-main">Perfectly predictable</span>
            <span className="">
              - lock in an exchange rate for up to 48 hours
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/signup"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
        >
          Open an account in minutes
        </Link>
      </div>
    </>
  );
};
export default HeroText;
