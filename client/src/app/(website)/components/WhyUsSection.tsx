// components/WhyUsSection.tsx
import { Activity, Globe, Shield, User, UsersRound } from "lucide-react";

import React from "react";
interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const serviceItems: ServiceItemProps[] = [
  {
    icon: <Shield className="w-full h-full" />,
    title: "Rock-solid technology",
    description:
      "Super smart Wisers have built our industry-leading security systems from scratch over the last 5 years.",
  },
  {
    icon: <UsersRound className="w-full h-full" />,
    title: "People who care, 24/7",
    description:
      "With over 100 anti-fraud specialists, and real human help available every minute, we’re on hand when you’ve got questions.",
  },
  {
    icon: <Globe className="w-full h-full" />, // Updated icon
    title: "Your money, not ours",
    description:
      "Your money is safeguarded, and held completely separate from ours, so it’s available to you all the time.",
  },
  {
    icon: <Activity className="w-full h-full" />, // Updated icon
    title: "Transparent Rates, Always",
    description:
      "We believe in complete honesty no hidden fees, no surprises.You’ll always see the real exchange rate upfront.",
  },
];

const WhyUsSection: React.FC = () => {
  return (
    <section className="bg-background text-white md:py-16 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:w-1/2 w-full space-y-5">
            <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-mainheadingWhite">
              Smarter Transfers, <br />{" "}
              <span className="text-primary">Safer Money.</span>
            </h3>

            <p className="text-subheadingWhite md:text-lg text-base lg:max-w-xl max-w-full">
              From cutting-edge security to 24/7 real-human support, we protect
              your funds, simplify global transfers, and deliver the fastest
              currency exchange experience so you stay in control.
            </p>
          </div>

          {/* Right Column - Grid */}
          <div className="lg:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {serviceItems.map((item, index) => (
              <div key={index} className="space-y-5">
                <div className=" text-primary size-10 sm:size-14">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-2xl font-semibold text-mainheadingWhite">
                  {item.title}
                </h3>
                <p className="text-subheadingWhite text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
