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
import { FaChartLine, FaHeadset } from "react-icons/fa6";
import { MdSend } from "react-icons/md";
import { FiGlobe } from "react-icons/fi";

const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-[#F2F4F7] lg:py-10 py-5 dark:bg-background">
      <section
        className="flex flex-col lg:gap-10 gap-8 container mx-auto px-4"
        id="features"
      >
        {/* Heading Section */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
            Security, Speed,
            <span className="text-primary"> Savings & Support </span>
          </h1>
        </div>

        {/* Features Grid */}
        <div className="grid gap-y-6 lg:grid-cols-2 md:grid-rows-6 md:gap-x-8 md:gap-y-8">

          
          {/* Feature Card 1: Security (Large) */}
          <div className="row-span-4 flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-white/5">
            <Image
              src="/assets/images/colorful-illustration-colorful-padlock-with-colorful-leaves-flowers_1122354-15513.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
              className="w-full object-cover md:h-96 h-60"
            />

            <div className="flex flex-col gap-3 p-4">
              <h3 className="text-lg font-medium text-mainheading dark:text-white md:text-2xl">
                <span className="text-primary font-bold">Secure</span> Every
                Step of the Way
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-normal dark:text-gray-300">
                We prioritize your security. Our advanced encryption and
                rigorous verification process protect your funds and personal
                information. Your peace of mind is our top priority.
              </p>
            </div>
          </div>

          {/* Feature Card 2: Speed (Small) */}
          <div className="row-span-2 flex flex-col gap-6 overflow-hidden rounded-3xl bg-white dark:bg-white/5 p-6">
            <MdSend className="size-10 text-mainheading dark:text-primary" />
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-medium text-mainheading dark:text-white md:text-2xl">
                <span>
                  Our transfers are{" "}
                  <span className="text-primary font-bold">Speedy</span>
                </span>
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-normal dark:text-gray-300">
                Receive your money swiftly. Enjoy fast processing times and
                real-time tracking to know when your funds arrive.
              </p>
            </div>
          </div>

          {/* Feature Card 3: Support (Large) */}
          <div className="row-span-4 flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-white/5">
            <Image
              src="/assets/images/friendly-customer.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
              className="w-full object-cover sm:h-60 lg:h-96"
            />

            <div className="flex flex-col gap-3 p-4">
              <h3 className="text-xl font-medium text-mainheading dark:text-white md:text-2xl">
                <span>
                  Need{" "}
                  <span className="text-primary font-bold">Support &nbsp;</span>
                  ? We’re here!
                </span>
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-normal dark:text-gray-300">
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
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-normal dark:text-gray-300">
                Get the best value for your hard-earned money, so that more
                makes it back to your loved ones.
              </p>
            </div>
          </div>

          {/* Feature Card 5: Support (Large) */}
          <div className="row-span-4 flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-white/5">
            <Image
              src="/assets/images/dynamicRate.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className="w-full object-cover sm:h-60 lg:h-96"
            />

            <div className="flex flex-col gap-3 p-4">
              <h3 className="text-xl font-medium text-mainheading dark:text-white md:text-2xl">
                <span>
                  Stay ahead with live &nbsp;
                  <span className="text-primary font-bold capitalize">
                    exchange rates. &nbsp;
                  </span>
                </span>
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-normal dark:text-gray-300">
                Stay updated with real-time currency exchange rates. Track
                fluctuations and compare global currencies instantly to make
                informed financial decisions.
              </p>
            </div>
          </div>

          {/* Feature Card 6: Reach (Small) */}
          <div className="row-span-2 flex flex-col gap-6 overflow-hidden rounded-3xl bg-white dark:bg-white/5 p-6 ">
            <FiGlobe className="size-10 text-mainheading  dark:text-primary" />
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-medium text-mainheading dark:text-white md:text-2xl">
                <span>
                  <span className="text-primary font-bold">
                    Worldwide Reach
                  </span>{" "}
                  , Local Touch
                </span>
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-normal dark:text-gray-300">
                Our platform combines international reach with personalized
                service, making currency exchange feel just right—no matter
                where you are.
              </p>
            </div>
          </div>

          {/* Feature Card 7: Money (Large) */}
          <div className="row-span-4 flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-white/5">
            <Image
              src="/assets/images/withoutborder.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className="w-full object-cover sm:h-60 lg:h-96"
            />

            <div className="flex flex-col gap-3 p-4">
              <h3 className="text-xl font-medium text-mainheading dark:text-white md:text-2xl">
                <span>
                  Exchange &nbsp;
                  <span className="text-primary font-bold capitalize">
                    Money &nbsp;
                  </span>
                  Without Borders
                </span>
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-normal dark:text-gray-300">
                Seamless global money transfers made simple. Instantly exchange
                currency across countries with transparent rates, no hidden
                fees, and total peace of mind.
              </p>
            </div>
          </div>

          {/* Feature Card 8: Reach (Small) */}
          <div className="row-span-2 flex flex-col gap-6 overflow-hidden rounded-3xl bg-white dark:bg-white/5 p-6 ">
            <FaHeadset className="size-10 text-mainheading  dark:text-primary" />
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-medium text-mainheading dark:text-white md:text-2xl">
                <span>
                  <span className="text-primary font-bold">
                    {" "} 
                    24/7 Customer{" "}
                  </span>{" "}
                  Support
                </span>
              </h3>
              <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-normal dark:text-gray-300">
                We're here for you—day or night. Our dedicated support team is
                available 24/7 to assist with any questions, concerns, or
                issues, ensuring a smooth and stress-free currency exchange
                experience anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;