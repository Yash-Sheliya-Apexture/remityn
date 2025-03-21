import React from "react";
import Link from "next/link";
import Image from "next/image";
// import globel from "../../../../public/assets/images/globel.webp";

const MissionSection: React.FC = () => {
  return (
    <section className="mission-section lg:pt-30 pt-12 pb-12 relative">
      <div className="container mx-auto px-4">
        <div className="inline-flex justify-center items-center w-full">
          <Image
            src="/assets/images/globel.webp"
            alt="globel"
            width={500}
            height={500}
            className="absolute lg:w-[500px] w-[300px] mt-10"
            priority
          />
        </div>
        <div className="p-10 bg-green rounded-4xl text-lightgreen">
          <div className="text-center max-w-5xl mx-auto space-y-6 lg:mt-50 mt-30">
            <h1 className="text-3xl md:text-6xl xl:text-8xl font-black font-mont uppercase tracking-tight">
              Meet money without borders
            </h1>
            <p className="text-white font-medium lg:text-xl text-lg">
              We’re building the best way to move and manage the world’s money.
              Min fees. Max ease. Full speed.
            </p>
          </div>
          <div className="text-center mt-8">
            <button className="bg-lightgreen rounded-full px-6 py-3 transition-colors duration-150 ease-in-out">
              <Link href="/" className="text-green font-medium">
                Learn about our mission
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

