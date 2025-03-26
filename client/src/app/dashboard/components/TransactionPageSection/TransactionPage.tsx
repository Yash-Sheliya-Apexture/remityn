// PageSection/TransactionsPage.tsx
"use client"
import React, { useState, useCallback } from "react";
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
import { Transaction, defaultTransactions } from "../../../data/transactions";
import TransactionActions from "./TransactionActions";

const TransactionsPage: React.FC = () => {
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions);
  const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
  const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
  const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
  const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
  const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
  const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);

  const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
    setFilteredTransactions(newTransactions);
  }, []);

  const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[], fromDate?: string, toDate?: string }) => {
    setAppliedRecipientFilters(filters.selectedRecipients);
    setAppliedDirectionFilter(filters.selectedDirection || 'all');
    setAppliedStatusFilter(filters.selectedStatus || null);
    setAppliedBalanceFilter(filters.selectedBalance || []);
    setAppliedFromDateFilter(filters.fromDate);
    setAppliedToDateFilter(filters.toDate);
  }, []);

  const filteredByRecipientAndSearch = appliedRecipientFilters.length > 0
    ? filteredTransactions.filter(transaction =>
      transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
    )
    : filteredTransactions;


  const transactionsToFilter = filteredByRecipientAndSearch;

  const filteredByDirection = transactionsToFilter.filter(transaction => {
    if (appliedDirectionFilter === 'all') {
      return true;
    } else if (appliedDirectionFilter === 'add') {
      return transaction.type === 'Add Money';
    } else if (appliedDirectionFilter === 'send') {
      return transaction.type === 'Send Money';
    }
    return true;
  });

  const filteredByStatus = filteredByDirection.filter(transaction => {
    if (appliedStatusFilter === null || appliedStatusFilter === undefined) {
      return true; // No status filter applied, include all
    } else if (appliedStatusFilter === 'Completed') {
      return transaction.status === 'completed';
    } else if (appliedStatusFilter === 'Cancelled') {
      return transaction.status === 'cancelled';
    } else if (appliedStatusFilter === 'In Process') {
      return transaction.status === 'inProcess';
    }
    return true;
  });

  const filteredByDate = filteredByStatus.filter(transaction => {
    if (!appliedFromDateFilter && !appliedToDateFilter) {
      return true; // No date filter applied
    }

    let transactionDate = transaction.processedDate || transaction.date;
    if (!transactionDate) return false;

    const transactionDateObj = new Date(transactionDate);
    transactionDateObj.setHours(0, 0, 0, 0); // Set time to 00:00:00

    let fromDateObj: Date | null = appliedFromDateFilter ? parseDateString(appliedFromDateFilter) : null;
    if (fromDateObj) {
      fromDateObj.setHours(0, 0, 0, 0); // Set time to 00:00:00
    }
    let toDateObj: Date | null = appliedToDateFilter ? parseDateString(appliedToDateFilter) : null;
    if (toDateObj) {
      toDateObj.setHours(23, 59, 59, 999); // Set time to 23:59:59 to include the whole To Date
    }


    if (fromDateObj && toDateObj) {
      return transactionDateObj >= fromDateObj && transactionDateObj <= toDateObj;
    } else if (fromDateObj) {
      return transactionDateObj >= fromDateObj;
    } else if (toDateObj) {
      return transactionDateObj <= toDateObj;
    }
    return true;
  });

  function parseDateString(dateString: string | undefined): Date | null {
    if (!dateString) return null;
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date;
    }
    return null;
  }


  const filteredByBalance = filteredByDate.filter(transaction => {
    if (appliedBalanceFilter.length === 0) { // Check if the array is empty
      return true; // No balance filter applied, include all
    } else {
      return appliedBalanceFilter.includes(transaction.currency); // Check if transaction currency is in the selected array
    }
  });


  const inProcessTransactions = filteredByBalance.filter(
    (transaction) => transaction.status === "inProcess"
  );

  const completedTransactions = filteredByBalance.filter(
    (transaction) => transaction.status === "completed"
  );

  const cancelledTransactions = filteredByBalance.filter(
    (transaction) => transaction.status === "cancelled"
  );

  const processedTransactions = [...completedTransactions, ...cancelledTransactions];

  const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
    let dateA = a.processedDate || a.date; // Use processedDate if available, otherwise date for sorting
    let dateB = b.processedDate || b.date;
    if (!dateA || !dateB) return 0;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });


  const groupedProcessedTransactions: { [date: string]: Transaction[] } =
    sortedProcessedTransactions.reduce(
      (groups: { [date: string]: Transaction[] }, transaction) => {
        const groupDate = transaction.processedDate || transaction.date; // Use processedDate if available, otherwise date for grouping
        if (!groupDate) {
          return groups;
        }
        const date = new Date(groupDate).toLocaleDateString('en-US', {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
      },
      {}
    );


  return (
    <section className="Transaction-Page py-10">
      <div className="">
        <div className="container mx-auto">
          <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-4 mb-8">
            <h1 className="text-3xl font-semibold text-main">Transactions</h1>

            <TransactionActions
              transactions={defaultTransactions}
              onTransactionsChange={handleTransactionsChange}
              onFiltersApply={handleFiltersApply}
            />
          </div>

          <div className="space-y-10">
            {inProcessTransactions.length > 0 && (
              <div>
                <h2 className="font-medium text-gray mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">In progress</h2>
                <div className="space-y-2">
                  {inProcessTransactions.map((transaction) => {
                    let description = transaction.description;
                    if (transaction.type === "Add Money") {
                      description = "Waiting for your money";
                    } else if (transaction.type === "Send Money") {
                      description = "Sending your money";
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
                              <p className="text-sm text-gray-500">
                                {description}
                              </p>
                            </div>
                            <div className={`font-medium text-main`}>
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
            )}

            {Object.entries(groupedProcessedTransactions).length > 0 && (
              <div>
                <div className="space-y-10">
                  {Object.entries(groupedProcessedTransactions).map(
                    ([date, transactionsForDate]) => (
                      <div key={date}>
                        <h3 className="font-medium text-gray mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">{date}</h3>
                        <div className="space-y-2">
                          {transactionsForDate.map((transaction) => {
                            let description = transaction.description;
                            let amountClass = "text-main";
                            if (transaction.type === "Add Money") {
                              description = "Added by you";
                              amountClass = "text-green-600";
                            } else if (transaction.type === "Send Money") {
                              description = "Sent by you";
                              amountClass = "text-main";
                            }
                            if (transaction.status === "cancelled") {
                              description = "Cancelled";
                              amountClass = "text-red-500 line-through"; // Indicate cancelled status visually
                            }

                            return (
                              <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
                                <div className="flex items-center gap-4">
                                  <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
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
                                      <p className="text-sm text-gray-500">
                                        {description}
                                      </p>
                                    </div>
                                    <div
                                      className={`font-medium ${amountClass}`}
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
                    )
                  )}
                </div>
              </div>
            )}

            {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
              <div className="text-center text-gray-500 py-8">
                You don't have any transactions.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionsPage;