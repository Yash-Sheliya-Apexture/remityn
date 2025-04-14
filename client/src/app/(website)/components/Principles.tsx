// import React from 'react'

// const Principles = () => {
//   return (
//     <div>Principles</div>
//   )
// }

// export default Principles

import React from "react";

// --- IMPORTANT ---
// Adjust these import paths based on where you store your assets
import Image from "next/image";
import {  FaChartLine } from "react-icons/fa6";
import { MdSend } from "react-icons/md";


const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-[#F2F4F7] dark:bg-background">
      <section
        className="flex flex-col gap-16 pb-10 container mx-auto px-4"
        id="features"
      >
        {/* Heading Section */}
        <div className="flex flex-col gap-5 mt-10">
          <h1 className="text-5xl md:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight" >
            Security, Speed,
            <span className="text-primary"> Savings & Support </span>
          </h1>
        </div>

        {/* Features Grid */}
        <div className="grid gap-y-6 px-3 md:grid-cols-2 md:grid-rows-6 md:gap-x-8 md:gap-y-8 md:px-0">
          {/* Feature Card 1: Security (Large) */}
          <div className="row-span-4 flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-white/5">
            <Image
              src="/assets/images/feature1.svg"
              width={500}
              height={500}
              alt="Picture of the author"
              className="w-full object-cover md:h-80 h-60"
            />

            <div className="flex flex-col gap-3 p-6">
              <h3 className="text-xl font-medium text-mainheading dark:text-white md:text-2xl">
                <span className="text-primary font-bold">Secure</span> Every
                Step of the Way
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-relaxed dark:text-gray-300">
                We prioritize your security. Our advanced encryption and
                rigorous verification process protect your funds and personal
                information. Your peace of mind is our top priority.
              </p>
            </div>
          </div>

          {/* Feature Card 2: Speed (Small) */}
          <div className="row-span-2 flex flex-col gap-6 overflow-hidden rounded-3xl bg-white dark:bg-white/5 p-6">
            <MdSend className="size-10 text-mainheading  dark:text-primary" />
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-medium text-mainheading dark:text-white md:text-2xl">
                <span>
                  Our transfers are{" "}
                  <span className="text-primary font-bold">Speedy</span>
                </span>
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-relaxed dark:text-gray-300">
                Receive your money swiftly. Enjoy fast processing times and
                real-time tracking to know when your funds arrive.
              </p>
            </div>
          </div>

          {/* Feature Card 3: Support (Large) */}
          <div className="row-span-4 flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-white/5">
            <Image
              src="/assets/images/feature2.svg"
              width={500}
              height={500}
              alt="Picture of the author"
              className="w-full object-cover sm:h-60 lg:h-80"
            />

            <div className="flex flex-col gap-3 p-6">
              <h3 className="text-xl font-medium text-mainheading dark:text-white md:text-2xl">
                <span>
                  Need{" "}
                  <span className="text-primary font-bold">Support &nbsp;</span>
                  ? We’re here!
                </span>
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-relaxed dark:text-gray-300">
                Our dedicated support team is available to answer all your
                questions and provide guidance throughout your transfer journey.
              </p>
            </div>
          </div>

          {/* Feature Card 4: Savings (Small) */}
          <div className="row-span-2 flex flex-col gap-6 overflow-hidden rounded-3xl bg-white dark:bg-white/5 p-6 ">
            <FaChartLine className="size-10 text-mainheading  dark:text-primary" />
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-medium text-mainheading dark:text-white md:text-2xl">
                <span>
                  <span className="text-primary font-bold">Save</span> with high
                  exchange rates
                </span>
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-relaxed dark:text-gray-300">
                Get the best value for your hard-earned money, so that more
                makes it back to your loved ones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
