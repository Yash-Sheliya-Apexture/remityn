// src/components/OurFeatures.tsx
import React from "react";
// Import FeatureCard component, features data, and Feature interface from FeatureCard.tsx
import FeatureCard, { features, Feature } from "../FeatureCard"; // Adjust path if necessary

const FeaturesList: React.FC = () => {
  return (
    <section className="FeatureList lg:py-16 py-10">
      <div className="container mx-auto px-4">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
            Fast, Flexible & {" "}<span className="text-primary">Transparent</span>
          </h3>
          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
            Experience effortless money transfers with quick sign-up, instant INR deposits via bank transfer, live exchange rates, and real-time tracking all in one seamless flow.
          </p>
        </div>
        <div className="w-full box-border lg:mt-16 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[3px] bg-[#394247] rounded-3xl border-3 border-[#394247]">
            {/* Use the imported features array */}
            {features.map((feature: Feature) => ( // Explicitly typing feature here is optional but good practice
              <div key={feature.id} className={feature.colSpanLarge}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconBgColor={feature.iconBgColor}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;