import React from "react";
import SendInternationally from "../components/SendInternationally";
import Paymentsborder from "../components/Paymentsborder";
import RightChoiceSection from "../components/RightChoiceSection";
import GetStartedSection from "../components/GetStartedSection";

const SendMoneyPage = () => {
  return (
    <main>
      <SendInternationally />
      <Paymentsborder />
      <RightChoiceSection />
      <GetStartedSection />  
    </main>
  );
};

export default SendMoneyPage;
