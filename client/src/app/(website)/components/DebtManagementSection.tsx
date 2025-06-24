// src/components/DebtManagementSection.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DebtManagementSection: React.FC = () => {
  const paidAmount = 3290;
  const remainingAmount = 1840;

  return (
    <section className="bg-background py-10 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Image and Overlays */}
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
              <Image
                src="/assets/images/istockphoto-1416048929-612x612.jpg"
                alt="Woman smiling while planning finances"
                layout="fill"
                objectFit="cover"
                className="transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div>
            <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
              Breaking Borders,{" "}
              <span className="text-primary">Building Global Trust</span>
            </h3>

            <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
              At Remityn, simplify global currency exchange by breaking down
              financial borders and building trust through transparent, reliable
              and fair-rate services.
            </p>

            <div className="flex justify-center md:justify-start mt-7">
              <Link href="/auth/login" className="inline-block">
                <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium py-3 px-8 h-12.5 lg:text-lg text-base rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                  Join Remityn Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DebtManagementSection;
