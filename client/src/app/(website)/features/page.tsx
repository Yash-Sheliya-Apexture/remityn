import React from "react";
import FeatureHero from "../components/Feature/FeatureHero";
import CallToActionSection from "../components/home/CallToActionSection";
import SendMoneySteps from "../components/Feature/SendMoneySteps";
import ChooseFeature from "../components/ChooseFeature";

const page = () => {
  return (
    <div className="Features-Main">
      {/* <ChooseFeature /> */}
      <FeatureHero />
      <SendMoneySteps />
      <CallToActionSection />
    </div>
  );
};

export default page;
