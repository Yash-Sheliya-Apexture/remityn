import Image from "next/image";
import Link from "next/link";
import React from "react";

const GetStartedSection: React.FC = () => {
  return (
    <div className="px-4 bg-white dark:bg-background lg:py-10 py-5">
      <section className="bg-lightgray dark:bg-white/5 rounded-2xl container mx-auto lg:py-10 py-5 relative">
        <div className="grid grid-cols-1">
          <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
            <div className="space-y-2 text-white lg:mb-0 lg:ml-8 ml-6 text-left">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
                Ready to <br />
                <span className="text-primary">get started? </span>
              </h1>

              <p className="md:text-lg text-mainheading dark:text-white text-sm max-w-lg ">
                Open your free Wise account in just minutes—fast, secure, and
                ready when you are.
              </p>

              <Link
                className="inline-block bg-primary hover:bg-primaryhover text-mainheading font-medium lg:py-3 py-2.5 px-6 lg:text-lg text-sm rounded-full transition-colors duration-300"
                href="/auth/register"
              >
                Open an Account
              </Link>
            </div>

            <Image
              src="/assets/images/get-start.png"
              width={500}
              height={500}
              className="absolute xl:size-[450px] -bottom-5 right-0 lg:block hidden"
              alt="Picture of the author"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStartedSection;
