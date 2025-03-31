// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation"; // Correct import for Next.js 13+
// import { IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../hooks/useAuth";
// import axios from "axios";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//   };
//   balance: number;
//   accountNumber?: string; // Assuming account number is optional or might not be always present
//   createdAt: string;
//   __v: number;
// }

// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>(); // Use useParams hook
//   const router = useRouter();
//   const { balanceId } = params;
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(
//     null
//   ); // Use interface for type safety
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchBalanceDetail = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/accounts/${balanceId}`, {
//           // Assuming your backend endpoint is /api/accounts/:balanceId
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBalanceDetail(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load balance details"
//         );
//         setIsLoading(false);
//         console.error("Error fetching balance detail:", err);
//         if (err.response?.status === 404) {
//           router.push("/dashboard"); // Redirect to dashboard if balance not found
//         }
//       }
//     };

//     if (balanceId) {
//       fetchBalanceDetail();
//     } else {
//       setIsLoading(false);
//       setError("Balance ID is missing.");
//     }
//   }, [balanceId, token, router]);

//   if (isLoading) {
//     return <div>Loading balance details...</div>;
//   }

//   if (error || !balanceDetail) {
//     return (
//       <div className="text-red-500">
//         Error: {error || "Balance details not found."}
//       </div>
//     );
//   }

//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(balanceDetail.balance).toFixed(2); // Format balance to 2 decimal places

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-2"
//       >
//         <IoIosArrowBack size={20} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-lightgray rounded-2xl p-6 shadow-md">
//         <div className="flex items-center gap-4 mb-4">
//           <Image
//             src={`/assets/icon/${currencyCode.toLowerCase()}.svg`}
//             alt={`${currencyCode} flag`}
//             width={50}
//             height={50}
//             onError={() =>
//               console.error(`Error loading image for ${currencyCode}`)
//             }
//           />
//           <h2 className="text-2xl font-semibold">{currencyCode} balance</h2>
//         </div>

//         <div className="text-4xl font-bold mb-4">
//           {formattedBalance} {currencyCode}
//         </div>

//         {balanceDetail.accountNumber && ( // Conditionally render account number if available
//           <div className="flex items-center gap-2 mb-6">
//             <span className="bg-gray-300 p-1 rounded-md">🏦</span>
//             <span className="text-sm text-gray-700">
//               {balanceDetail.accountNumber}
//             </span>
//             <span className="ml-2 text-green-500 cursor-pointer hover:underline">
//               Copy
//             </span>{" "}
//             {/* Implement copy functionality if needed */}
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex justify-around space-x-4 mt-8">
//           <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//             {" "}
//             {/* Link to Add Money page */}
//             <button className="action-button bg-green-500 hover:bg-green-700 text-white">
//               Add
//             </button>
//           </Link>
//           <Link
//             href={`/dashboard/balances/${balanceId}/send/select-recipient`}
//             passHref
//           >
//             <button className="action-button bg-blue-500 hover:bg-blue-700 text-white">
//               {" "}
//               {/* Changed color */}
//               Send
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Transactions Section (Placeholder) */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Transactions</h3>
//         <p className="text-gray-600">
//           No transactions to display yet. (Placeholder)
//         </p>
//         {/*  Transaction list component would go here */}
//       </div>

//       {/* Options Section (Placeholder) */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Options</h3>
//         <p className="text-gray-600">
//           Account options will be displayed here. (Placeholder)
//         </p>
//         {/* Account options components would go here */}
//       </div>
//     </div>
//   );
// };

// export default BalanceDetailPage;







// frontend/app/dashboard/balances/[balanceId]/page.tsx
"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { format, parseISO } from "date-fns";

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";

// Hooks and Services
import { useAuth } from "../../../hooks/useAuth";
import paymentService from "../../../services/payment";
import transferService from "../../../services/transfer";
import apiConfig from "../../../config/apiConfig";

// Components and Types
import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path as needed
import { Transaction } from "@/types/transaction"; // Ensure this type includes sourceAccountId and correct currency object shapes


// Axios default URL
axios.defaults.baseURL = apiConfig.baseUrl;

// --- Interfaces ---
interface BalanceDetailPageParams {
  balanceId: string;
}

interface BalanceDetail {
  _id: string;
  user: string;
  currency: {
    _id: string;
    code: string;
    flagImage?: string;
    currencyName?: string;
  };
  balance: number;
  accountNumber?: string;
  createdAt: string;
  __v: number;
}

// --- Utility Function ---
function parseDateString(dateString: string | undefined): Date | null {
  if (!dateString) return null;
  // Try dd-MM-yyyy first (likely from filter component)
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  // Fallback to ISO parsing (likely from backend data)
  try {
    return parseISO(dateString);
  } catch {
    console.error("Failed to parse date string:", dateString);
    return null;
  }
}

// --- Component ---
const BalanceDetailPage = () => {
  const params = useParams<BalanceDetailPageParams>();
  const router = useRouter();
  const { balanceId } = params;
  const { token } = useAuth();

  // --- State ---
  const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(
    null
  );
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [balanceSpecificTransactions, setBalanceSpecificTransactions] =
    useState<Transaction[]>([]);
  const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true); // Loading for balance detail
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Separate loading for transactions
  const [error, setError] = useState<string | null>(null);

  // --- Data Fetching ---
  const fetchData = useCallback(async () => {
    if (!balanceId || !token) {
      setError("Missing balance ID or authentication token.");
      setIsLoading(false);
      setIsTransactionsLoading(false);
      return;
    }
    setIsLoading(true);
    setIsTransactionsLoading(true);
    setError(null);
    setBalanceDetail(null); // Reset on new fetch
    setAllTransactions([]); // Reset on new fetch

    try {
      // Fetch balance detail first
      const balanceResponse = await axios.get(`/accounts/${balanceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalanceDetail(balanceResponse.data);
      setIsLoading(false); // Balance detail loaded or failed

      // Fetch transactions only if balance detail was successful
      try {
        const [paymentsResponse, transfersResponse] = await Promise.all([
          paymentService.getUserPayments(token),
          transferService.getUserTransfers(token),
        ]);

        const mappedPayments: Transaction[] = paymentsResponse.map(
          (payment): Transaction => ({
            _id: payment._id,
            type: "Add Money",
            amountToAdd: payment.amountToAdd,
            amountToPay: payment.amountToPay,
            balanceCurrency: payment.balanceCurrency,
            payInCurrency: payment.payInCurrency,
            account: payment.account, // Include the account reference
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
            status: payment.status,
          })
        );

        const mappedTransfers: Transaction[] = transfersResponse.map(
          (transfer): Transaction => ({
            _id: transfer._id,
            type: "Send Money",
            name:
              typeof transfer.recipient === "object" &&
              transfer.recipient !== null
                ? transfer.recipient.accountHolderName
                : "Recipient Name Unavailable",
            sendAmount: transfer.sendAmount,
            receiveAmount: transfer.receiveAmount,
            sendCurrency: transfer.sendCurrency,
            receiveCurrency: transfer.receiveCurrency,
            createdAt: transfer.createdAt,
            updatedAt: transfer.updatedAt,
            status: transfer.status,
            recipient: transfer.recipient,
            sourceAccountId:
              typeof transfer.sourceAccount === "string"
                ? transfer.sourceAccount
                : transfer.sourceAccount?._id, // Extract ID if populated
          })
        );

        const combinedTransactions = [...mappedPayments, ...mappedTransfers];
        setAllTransactions(combinedTransactions);
      } catch (transErr: any) {
        console.error("Error fetching transaction data:", transErr);
        // Keep balance detail even if transactions fail, but show error
        setError(
          (prevError) =>
            prevError || `Failed to load transactions: ${transErr.message}`
        );
      } finally {
        setIsTransactionsLoading(false);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to load balance details";
      setError(message);
      console.error("Error fetching balance detail:", err);
      setIsLoading(false); // Stop main loading on error
      setIsTransactionsLoading(false); // Also stop transaction loading
      if (err.response?.status === 401) {
        router.push("/auth/login");
      }
      // Optional: Handle 404 redirect for balance not found
      // if (err.response?.status === 404) router.push("/dashboard");
    }
  }, [balanceId, token, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- Filter Transactions Specific to this Balance ---
  useEffect(() => {
    if (!balanceId || allTransactions.length === 0) {
      setBalanceSpecificTransactions([]);
      setDisplayTransactions([]);
      return;
    }

    // console.log(`%cBalanceDetailPage: Filtering for balanceId: [${balanceId}]`, 'color: blue; font-weight: bold;');

    const filtered = allTransactions.filter((transaction) => {
      if (transaction.type === "Add Money") {
        // Compare the account ID associated with the payment to the current balance/account ID
        const paymentAccountId = transaction.account?._id || transaction.account; // Handle populated object or string ID
        // console.log(`  Checking Payment Tx ${transaction._id}: accountId [${paymentAccountId}] vs page balanceId [${balanceId}]`);
        return paymentAccountId === balanceId;
      } else if (transaction.type === "Send Money") {
        // Compare the source account ID of the transfer to the current balance/account ID
        const transferSourceId = transaction.sourceAccountId;
        // console.log(`  Checking Transfer Tx ${transaction._id}: sourceAccountId [${transferSourceId}] vs page balanceId [${balanceId}]`);
        return transferSourceId === balanceId;
      }
      return false; // Ignore transactions of unknown types
    });

    // console.log(`%cBalanceDetailPage: Filtering Complete. Found ${filtered.length} specific transactions.`, 'color: green;');
    setBalanceSpecificTransactions(filtered);
    setDisplayTransactions(filtered); // Initialize display list with filtered results
  }, [allTransactions, balanceId]);


  // --- Callbacks for TransactionActions ---
  const handleSearchChange = useCallback((searchResults: Transaction[]) => {
    // Update the displayed list based on search results from TransactionActions
    setDisplayTransactions(searchResults);
  }, []);

  const handleFiltersApply = useCallback(
    (filters: {
      selectedRecipients: (string | number)[];
      selectedDirection?: string;
      selectedStatus?: string | null;
      selectedBalance?: string[];
      fromDate?: string;
      toDate?: string;
    }) => {
      // Apply filters *only* to the transactions already specific to this balance
      let tempFiltered = [...balanceSpecificTransactions];

      // Apply Direction Filter
      if (filters.selectedDirection && filters.selectedDirection !== "all") {
        tempFiltered = tempFiltered.filter(
          (transaction) =>
            (filters.selectedDirection === "add" &&
              transaction.type === "Add Money") ||
            (filters.selectedDirection === "send" &&
              transaction.type === "Send Money")
        );
      }

      // Apply Status Filter
      if (filters.selectedStatus) {
        tempFiltered = tempFiltered.filter((transaction) => {
          if (filters.selectedStatus === "Completed") return transaction.status === "completed";
          if (filters.selectedStatus === "Cancelled") return transaction.status === "canceled";
          if (filters.selectedStatus === "In Process") return transaction.status === "in progress" || transaction.status === "pending";
          if (filters.selectedStatus === "Failed") return transaction.status === "failed";
          return true;
        });
      }

      // Apply Date Filter
      const fromDateObj = parseDateString(filters.fromDate);
      const toDateObj = parseDateString(filters.toDate);
      if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of day
      if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of day

      if (fromDateObj || toDateObj) {
        tempFiltered = tempFiltered.filter((transaction) => {
          const transactionDateStr = transaction.updatedAt || transaction.createdAt;
          if (!transactionDateStr) return false; // Cannot filter without a date
          try {
            const transactionDateObj = parseISO(transactionDateStr);
            let include = true;
            if (fromDateObj && transactionDateObj < fromDateObj) include = false;
            if (toDateObj && transactionDateObj > toDateObj) include = false;
            return include;
          } catch (e) {
            console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
            return false; // Exclude if date parsing fails
          }
        });
      }

      // Update the list that gets rendered
      setDisplayTransactions(tempFiltered);
    },
    [balanceSpecificTransactions] // Re-run filter logic if the base list changes
  );


  // --- Memoized Transaction Grouping for Display ---
  const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
      // Calculations are based on the currently visible transactions (`displayTransactions`)
      const inProgress = displayTransactions.filter(
        (tx) => tx.status === "in progress" || tx.status === "pending"
      );

      const processed = displayTransactions.filter(
        (tx) =>
          tx.status === "completed" ||
          tx.status === "canceled" ||
          tx.status === "failed"
      );

      const sortedProcessed = [...processed].sort((a, b) => {
        const dateA = a.updatedAt || a.createdAt;
        const dateB = b.updatedAt || b.createdAt;
        if (!dateA || !dateB) return 0;
        // Sort descending (newest first)
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });

      // Group by formatted date string
      const grouped = sortedProcessed.reduce(
        (groups: { [date: string]: Transaction[] }, tx) => {
          const groupDate = tx.updatedAt || tx.createdAt;
          if (!groupDate) return groups; // Skip if no date
          try {
             const dateKey = format(parseISO(groupDate), "MMMM d, yyyy");
             if (!groups[dateKey]) groups[dateKey] = [];
             groups[dateKey].push(tx);
          } catch (e) {
             console.error("Error formatting date for grouping:", groupDate, e);
          }
          return groups;
        }, {}
      );

      return {
        inProgressTransactions: inProgress,
        groupedProcessedTransactions: grouped,
      };
    }, [displayTransactions]); // Re-calculate only when the displayed transactions change


  // --- Render Logic ---

  // Initial loading state (before balance detail is fetched)
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-500">
        Loading balance details...
      </div>
    );
  }

  // Error state if balance detail failed to load
  if (error && !balanceDetail) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <IoIosArrowBack size={20} /> Back
        </button>
        <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md text-center">
          Error: {error}
        </div>
      </div>
    );
  }

  // If loading finished but balanceDetail is somehow still null
  if (!balanceDetail) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-500">
        Balance details could not be loaded or found.
      </div>
    );
  }

  // --- Main Render (Balance Detail Loaded) ---
  const currencyCode = balanceDetail.currency.code;
  const formattedBalance = parseFloat(balanceDetail.balance).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
        <IoIosArrowBack size={20} /> Back
      </button>

      {/* Balance Card */}
      <div className="bg-lightgray rounded-2xl p-6 shadow-md mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={balanceDetail.currency.flagImage || `/assets/icon/${currencyCode.toLowerCase()}.svg`}
            alt={`${currencyCode} flag`}
            width={50}
            height={50}
            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} // Fallback image
          />
          <h2 className="text-2xl font-semibold">{currencyCode} balance</h2>
        </div>
        <div className="text-4xl font-bold mb-4">
          {formattedBalance} {currencyCode}
        </div>
        {/* Optional: Account Details (like number) could go here */}
        <div className="flex justify-center sm:justify-start space-x-4 mt-8">
          <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition duration-150 ease-in-out">
              <LuPlus size={20} /> Add
            </button>
          </Link>
          <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} passHref>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition duration-150 ease-in-out">
              <GoArrowUp size={20} /> Send
            </button>
          </Link>
          {/* Add other actions here (Convert, Details, etc.) */}
        </div>
      </div>

      {/* Transactions Section */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold">Transactions for {currencyCode}</h3>
          {/* Render TransactionActions only if there are base transactions to filter/search */}
          {balanceSpecificTransactions.length > 0 && (
             <TransactionActions
                transactions={balanceSpecificTransactions} // Pass the balance-specific list as the base
                onTransactionsChange={handleSearchChange} // Update display on search
                onFiltersApply={handleFiltersApply}       // Update display on filter
             />
          )}
        </div>

        {/* Transaction Loading/Empty/List States */}
        {isTransactionsLoading && (
          <div className="text-center py-6 text-gray-500">Loading transactions...</div>
        )}

        {!isTransactionsLoading && error && !balanceDetail && ( // Show transaction-specific error if balance detail also failed
             <div className="text-center py-6 text-red-500">Error loading transactions.</div>
        )}

        {!isTransactionsLoading && !error && displayTransactions.length === 0 && balanceSpecificTransactions.length > 0 && (
          <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg mt-6">
            No transactions match your current filter or search criteria.
          </div>
        )}

        {!isTransactionsLoading && !error && balanceSpecificTransactions.length === 0 && (
          <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg mt-6">
            No transactions found for this balance yet.
          </div>
        )}

        {/* Render Transaction List if data is available and not loading/errored */}
        {!isTransactionsLoading && !error && displayTransactions.length > 0 && (
          <div className="space-y-10">
            {/* In Progress Transactions */}
            {inProgressTransactions.length > 0 && (
              <div>
                <h2 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">
                  In progress
                </h2>
                <div className="space-y-2">
                  {inProgressTransactions.map((transaction) => {
                    // Determine display values
                    const isAddMoney = transaction.type === "Add Money";
                    const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
                    const description = isAddMoney ? "Waiting for your money" : "Sending your money";
                    const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
                    const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
                    const amountPrefix = isAddMoney ? "+ " : "- ";
                    const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

                    return (
                      <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
                        <div className="hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200">{icon}</div>
                            <div className="flex justify-between w-full items-center">
                              <div>
                                <h3 className="font-medium text-gray-800">{name}</h3>
                                <p className="text-sm text-gray-500">{description}</p>
                              </div>
                              <div className={`font-medium text-gray-800 whitespace-nowrap`}>
                                {amountPrefix}
                                {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                {" "} {displayCurrencyCode}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Processed Transactions (Grouped by Date) */}
            {Object.entries(groupedProcessedTransactions).length > 0 && (
              <div>
                <div className="space-y-10">
                  {Object.entries(groupedProcessedTransactions).map(
                    ([date, transactionsForDate]) => (
                      <div key={date}>
                        <h3 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">
                          {date}
                        </h3>
                        <div className="space-y-2">
                          {transactionsForDate.map((transaction) => {
                             // Determine display values
                             const isAddMoney = transaction.type === "Add Money";
                             const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
                             let description = isAddMoney ? "Added by you" : "Sent by you";
                             let amountClass = isAddMoney ? "text-green-600" : "text-gray-800";
                             const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
                             const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
                             const amountPrefix = isAddMoney ? "+ " : "- ";
                             const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

                             if (transaction.status === "canceled") {
                               description = "Cancelled";
                               amountClass = "text-red-500 line-through";
                             } else if (transaction.status === "failed") {
                               description = "Failed";
                               amountClass = "text-red-500";
                             }

                            return (
                              <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
                                <div className="hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
                                  <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200">{icon}</div>
                                    <div className="flex justify-between w-full items-center">
                                      <div>
                                        <h3 className="font-medium text-gray-800">{name}</h3>
                                        <p className="text-sm text-gray-500">{description}</p>
                                      </div>
                                      <div className={`font-medium ${amountClass} whitespace-nowrap`}>
                                        {amountPrefix}
                                        {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        {" "} {displayCurrencyCode}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceDetailPage;