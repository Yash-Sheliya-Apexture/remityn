import React from "react";
import Heroaddmoney from "../components/Heroaddmoney";
import AddMoneySteps from "../components/MoneyMethod";
import Security from "../components/Security";

const AddMoneyPage = () => {
  return (
    <main className="add-moneyPage">
      <Heroaddmoney />
      <AddMoneySteps />
      <Security />  
    </main>
  );
};

export default AddMoneyPage;


