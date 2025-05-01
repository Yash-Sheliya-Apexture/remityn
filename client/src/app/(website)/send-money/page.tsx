import React from "react";
import CrossBorderMoneyTransfer from "../components/CrossBorderMoneyTransfer";
import FreedomToReceive from "../components/FreedomToReceive";
import ComfortSendMoney from "../components/ComfortSendMoney";
import GetStartedSection from "../components/GetStartedSection";

const SendMoneyPage = () => {
  return (
    <main className="Send-MoneyPages">
      <CrossBorderMoneyTransfer />
      <FreedomToReceive />
      <ComfortSendMoney />
      <GetStartedSection />
    </main>
  );
};

export default SendMoneyPage;
