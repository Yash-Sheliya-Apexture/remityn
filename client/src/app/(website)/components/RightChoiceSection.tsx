import React from "react";
import Image from "next/image";

const RightChoiceSection: React.FC = () => {
  return (
    <section className="py-10 bg-[#f2f4f7] dark:bg-background px-4">
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
            <div className="top-section">
              <p className="sub-title text-base font-semibold dark:text-white text-mainheading text-primary-500 mb-2 text-left">
                {/* Example sub-title styling */}
                Learn why Wise is the right choice for you
              </p>

              {/* title */}
              <h1 className="text-4xl md:text-5xl lg:ext-6xl font-black font-mont text-mainheading dark:text-white uppercase">
                Send money from
                <span className="text-primary"> the comfort of home.</span>
              </h1>

              <p className="text-gray-500 dark:text-gray-300 mt-6">
                Gone are the days of long bank lines, complicated paperwork, and
                limited hours. With our easy-to-use online platform, you can
                send money across the world without ever leaving your home.
                Whether it’s supporting family, paying international tuition, or
                handling global business payments—everything is just a few
                clicks away.
              </p>

              <div className="button-group flex flex-row items-center gap-6 my-6">
                {/* gap-4 for space between buttons */}

                <a href="/">
                  <Image
                    alt="image"
                    src="/assets/images/google-play.png"
                    width={200}
                    height={200}
                    priority
                    style={{ color: "transparent" }}
                    className="lg:h-18 h-12"
                  />
                </a>
                
                <a href="/">
                  <Image
                    alt="image"
                    src="/assets/images/app-store.png"
                    width={200}
                    height={200}
                    priority
                    style={{ color: "transparent" }}
                    className="lg:h-18 h-12"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightChoiceSection;
