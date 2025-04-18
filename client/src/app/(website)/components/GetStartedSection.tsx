import React from "react";

const GetStartedSection: React.FC = () => {
  return (
    <div className=" px-4">
      <section className="relative overflow-hidden bg-[#1A4DBE] rounded-2xl container mx-auto">
        <div className="grid grid-cols-1">
          <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
            <div className="section-text text-white mb-8 lg:mb-0 lg:ml-8 ml-6 text-left">
              <h1 className="text-3xl md:text-5xl lg:ext-6xl font-black font-mont text-mainheading dark:text-white uppercase mt-5">
                Ready to <br />
                <span className="text-subheading"> get started?.</span>
              </h1>

              <p className="lg:text-lg text-sm mt-2">
                It only takes a few minutes to register your FREE Bankio
                account.
              </p>
              <a
                className="inline-block bg-primary hover:bg-primaryhover text-mainheading font-medium lg:py-3 py-2 px-8 rounded-md transition-colors duration-300 mt-5"
                href="/register"
              >
                Open an Account
              </a>
            </div>

            <img
              alt="get start"
              src="/assets/images/get-start.png"
              width={450}
              height={400}
              decoding="async"
              data-nimg="1"
              loading="lazy"
              className="w-96 h-auto lg:block hidden" // Added Tailwind classes for responsive image
              style={{ color: "transparent" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStartedSection;
