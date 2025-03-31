import React from "react";
import CountryCard from "./CountryCard";
import TasksPage from "./Tasks";
import TransactionsSection from "./TransactionsSection";
import AccountVerification from "@/app/components/ui/AccountVerification";

const MainDashBoard = () => {
  return (
    <>
      <AccountVerification />
      <CountryCard />
      <TasksPage />
      <TransactionsSection />
    </>
  )
}
export default MainDashBoard;