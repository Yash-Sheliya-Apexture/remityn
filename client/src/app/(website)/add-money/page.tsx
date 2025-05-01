import React from "react";
import AddMoneyGlobally from "../components/AddMoneyGlobally";
import GettingStartedSteps from "../components/GettingStartedSteps";
import EasyCurrencyExchange from "../components/EasyCurrencyExchange";

const AddMoneyPage = () => {
  return (
    <main className="add-moneyPage">
      <AddMoneyGlobally />
      <GettingStartedSteps />
      <EasyCurrencyExchange />  
    </main>
  );
};

export default AddMoneyPage;


