import React from "react";
import FeatherHero from "../components/Feature/FeatherHero";
import CallToActionSection from "../components/home/CallToActionSection";
import SendMoneySteps from "../components/Feature/SendMoneySteps";
import FeaturesList from "../components/FeaturesList";

const page = () => {
  return (
    <div className="Features-Main">
      <FeatherHero />
      <SendMoneySteps />
      <CallToActionSection />
    </div>
  );
};

export default page;
