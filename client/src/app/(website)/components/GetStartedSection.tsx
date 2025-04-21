import Link from "next/link";
import React from "react";

const GetStartedSection: React.FC = () => {
  return (
    <div className="px-4 bg-[#f2f4f7] dark:bg-background lg:my-10 my-5">
      <section className="bg-white dark:bg-white/5 rounded-2xl container mx-auto lg:py-10 py-5 relative">
        <div className="grid grid-cols-1">
          <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
            <div className="section-text text-white mb-8 lg:mb-0 lg:ml-8 ml-6 text-left">
              <h1 className="text-3xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
                Ready to <br />
                <span className="text-primary">get started?.</span>
              </h1>

              <p className="xl:text-lg text-base max-w-md mt-2">
                Open your free Wise account in just minutes—fast, secure, and
                ready when you are.
              </p>
              <Link
                className="inline-block bg-primary hover:bg-primaryhover text-mainheading font-medium lg:py-3 py-2 px-8 rounded-full transition-colors duration-300 mt-5"
                href="/auth/register"
              >
                Open an Account
              </Link>
            </div>

            <img
              alt="get start"
              src="/assets/images/get-start.png"
              width={500}
              height={500}
              decoding="async"
              data-nimg="1"
              loading="lazy"
              className="absolute xl:size-[450px] -bottom-5 right-0 lg:block hidden" // Added Tailwind classes for responsive image
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStartedSection;
