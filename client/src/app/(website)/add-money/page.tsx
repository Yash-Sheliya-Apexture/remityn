import React from "react";
import Heroaddmoney from "../components/Heroaddmoney";
import MoneyMethod from "../components/MoneyMethod";
import Security from "../components/Security";

const AddMoneyPage = () => {
  return (
    <main className="add-moneyPage">
      <Heroaddmoney />
      <MoneyMethod />
      <Security />
    </main>
  );
};

export default AddMoneyPage;
