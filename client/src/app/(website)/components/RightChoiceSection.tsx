import React from "react";
import Image from "next/image";
import Link from "next/link";

const RightChoiceSection: React.FC = () => {
  return (
    <section className="py-10 bg-white dark:bg-background px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center ">
          <div className="lg:w-1/2 w-full order-2 lg:order-1 flex justify-center">
            <Image
              alt="image"
              src="/assets/images/right-choice-Illus.webp"
              width={600} // Or adjust based on your design
              height={600} // Or adjust based on your design
              className="lg:w-3/5 w-3/4" // Equivalent to max-un class to remove max-width
              style={{ color: "transparent" }}
              priority
            />
          </div>

          <div className="lg:w-1/2 w-full order-1 lg:order-2">
            <div className="top-section md:text-left text-center">
              <p className="lg:text-base text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">
                {/* Example sub-title styling */}
                Learn why Wise is the right choice for you
              </p>

              {/* title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
                Send money from
                <span className="text-primary"> the comfort of home.</span>
              </h1>

              <p className="text-gray-700 lg:text-lg text-sm dark:text-gray-300 mt-5">
                Send money from the comfort of your home with ease and
                confidence. Our fast and secure online transfer service allows
                you to send funds to your loved ones anytime, anywhere—no need
                to visit a physical location. Whether it's for family support,
                emergency needs, or personal transactions, we make the process
                simple, transparent, and reliable.
              </p>

              <Link href="dashboard" className="inline-block my-4">
                <button className="bg-primary px-10 lg:py-3 py-2 lg:h-12.5 lg:text-base text-sm cursor-pointer hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading font-medium rounded-full">
                  Send Money
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightChoiceSection;
