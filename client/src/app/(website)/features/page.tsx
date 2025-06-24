import React from "react";
import FeatureHero from "../components/Feature/FeatureHero";
import CallToActionSection from "../components/home/CallToActionSection";
import HowItWorksSection from "../components/Feature/HowItWorksSection";
import WhyUsSection from "../components/WhyUsSection";

const page = () => {
  return (
    <div className="Features-Main">
      {/* <ChooseFeature /> */}
      <FeatureHero />
      {/* <SendMoneySteps /> */}
      {/* <WhyUsSection /> */}
      <HowItWorksSection />
      <CallToActionSection />
    </div>
  );
};

export default page;
