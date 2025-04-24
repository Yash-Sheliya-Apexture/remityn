import Image from "next/image";
import React from "react";

interface EasymoneyProps {}

const Easymoney: React.FC<EasymoneyProps> = () => {
  return (
    <section className="bg-white dark:bg-background lg:py-10 py-5 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="lg:space-y-4 space-y-2 text-center md:text-left w-full md:w-1/2 lg:order-2 order-1">
            <p className="font-semibold uppercase tracking-wider text-xs md:text-base text-gray-700 dark:text-gray-300">
              Our mission 
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-mainheading dark:text-white">
              Trusted & Transparent Currency &nbsp;
              <span className="text-primary">Exchange Services Worldwide </span>
            </h1>

            <p className="text-gray-700 dark:text-gray-300 md:text-lg text-base">
              We provide fast, secure, and transparent currency exchange
              services to individuals and businesses across the globe—offering
              competitive rates and reliable support you can count on.
            </p>
          </div>

          <div className="w-full md:w-1/2 md:mt-8 mt-0 lg:order-1 order-2">
            <div className="relative rounded-2xl overflow-hidden border group transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-tl from-black/60 via-transparent to-lime-400/30 z-10"></div>
              {/* Image with aspect ratio */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/assets/images/mobile.webp"
                  alt="about misson image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Easymoney;
