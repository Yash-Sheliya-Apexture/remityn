import React from "react";
import CountryCard from "./CountryCard";
import TasksPage from "./Tasks";
import TransactionsSection from "./TransactionsSection";

const MainDashBoard = () => {
  return (
    <>
      <CountryCard />
      <TasksPage />
      <TransactionsSection />
    </>
  )
}
export default MainDashBoard;