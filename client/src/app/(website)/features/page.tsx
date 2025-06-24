import React from "react";
import FeatureHero from "../components/Feature/FeatureHero";
import CallToActionSection from "../components/home/CallToActionSection";
import SendMoneySteps from "../components/Feature/SendMoneySteps";
import HowItWorksSection from "../components/Feature/HowItWorksSection";
import ChooseFeature from "../components/ChooseFeature";
import TransferWaySection from "../components/Feature/TransferWaySection";

const page = () => {
  return (
    <div className="Features-Main">
      {/* <ChooseFeature /> */}
      <FeatureHero />
      {/* <SendMoneySteps /> */}
      <HowItWorksSection />
      <TransferWaySection />
      <CallToActionSection />
    </div>
  );
};

export default page;
