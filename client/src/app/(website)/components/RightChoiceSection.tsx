import React from "react";
import Image from "next/image";
import Link from "next/link";

const RightChoiceSection: React.FC = () => {
  return (
    <section className="lg:py-10 py-5 bg-white dark:bg-background px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 w-full lg:order-1 order-2 flex justify-center">
            <Image
              alt="image"
              src="/assets/images/right-choice-Illus.webp"
              width={600}
              height={600}
              className="lg:h-full lg:w-2/3 w-full size-76" // Equivalent to max-un class to remove max-width
            />
          </div>

          <div className="lg:w-1/2 w-full lg:order-2 order-1">
            <div className="top-section md:text-left text-center space-y-2.5">
              <p className="lg:text-base text-sm text-gray-700 dark:text-gray-300 font-medium">
                {/* Example sub-title styling */}
                Learn why Wise is the right choice for you
              </p>

              {/* title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
                Send money from
                <span className="text-primary"> the comfort of home.</span>
              </h1>

              <p className="text-gray-700 lg:text-lg text-sm dark:text-gray-300">
                Send money from the comfort of your home with ease and
                confidence. Our fast and secure online transfer service allows
                you to send funds to your loved ones anytime, anywhere—no need
                to visit a physical location. Whether it's for family support,
                emergency needs, or personal transactions, we make the process
                simple, transparent, and reliable.
              </p>
          
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightChoiceSection;
