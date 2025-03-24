// components/TransactionsSection.tsx
import React from "react";
import Link from "next/link";
import { Transaction, defaultTransactions } from "../../../data/transactions"; // Import from data file
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";

const TransactionsSection: React.FC = () => {
  // Sort all transactions by date in descending order
  const sortedTransactions = [...defaultTransactions].sort((a, b) => {
    const dateA = a.processedDate ? new Date(a.processedDate) : new Date(a.date || "");
    const dateB = b.processedDate ? new Date(b.processedDate) : new Date(b.date || "");
    return dateB.getTime() - dateA.getTime();
  });

  // Get the latest 3 transactions
  const latestTransactions = sortedTransactions.slice(0, 3);

  return (
    <section className="Transactions py-12">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-main">Transactions</h1>
          <Link
            href="dashboard/transactions"
            className="text-secondary font-medium underline cursor-pointer"
          >
            See all
          </Link>
        </div>

        {/* Latest 3 Transaction History */}
        <div className="space-y-8">
          {latestTransactions.map((transaction) => {
            let description = transaction.description;
            if (transaction.type === "Add Money") {
              description = transaction.status === "processed" ? "Added by you" : "Waiting for your money";
            } else if (transaction.type === "Send Money") {
              description = transaction.status === "processed" ? "Sent by you" : "Sending your money";
            }
            return (
              <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
                    {transaction.type === "Add Money" ? (
                      <LuPlus size={24} className="text-main" />
                    ) : (
                      <GoArrowUp size={24} className="text-main" />
                    )}
                  </div>
                  <div className="flex justify-between w-full">
                    <div>
                      <h3 className="font-medium text-main">
                        {transaction.type === "Add Money"
                          ? `To your ${transaction.currency} balance`
                          : transaction.name}
                      </h3>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                    <div
                      className={`font-medium ${transaction.type === "Add Money" && transaction.status === "processed" ? "text-green-600" : "text-main"}`}
                    >
                      {transaction.type === "Add Money" ? "+ " : "- "}
                      {transaction.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {transaction.currency}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default TransactionsSection;