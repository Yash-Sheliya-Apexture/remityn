import React from "react";
import FeatureHero from "../components/Feature/FeatureHero";
import CallToActionSection from "../components/home/CallToActionSection";
import SendMoneyStepSection from "../components/Feature/SendMoneyStepSection";
import TransferWaySection from "../components/Feature/TransferWaySection"; 

const page = () => {
  return (
    <div className="Features-Main">
      <FeatureHero />
      <SendMoneyStepSection />
      <TransferWaySection />
      <CallToActionSection />
    </div>
  );
};

export default page;
