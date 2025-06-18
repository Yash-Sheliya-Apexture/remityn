import React from "react";
import FeatureHero from "../components/Feature/FeatureHero";
import CallToActionSection from "../components/home/CallToActionSection";
import SendMoneySteps from "../components/Feature/SendMoneySteps";
import HowItWorksSection from "../components/Feature/HowItWorksSection";

const page = () => {
  return (
    <div className="Features-Main">
      <FeatureHero />
      {/* <SendMoneySteps /> */}
      <HowItWorksSection />
      <CallToActionSection />
    </div>
  );
};

export default page;
