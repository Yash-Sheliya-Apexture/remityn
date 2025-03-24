// "use client";

// import React, { useState, useEffect } from "react";
// import { Transaction } from "../../../data/transactions";
// import { FiSearch } from "react-icons/fi";

// interface SearchProps {
//   transactions: Transaction[]; // Receive transactions as prop
//   onTransactionsChange: (filteredTransactions: Transaction[]) => void; // Callback for filtered transactions
// }

// const Search: React.FC<SearchProps> = ({
//   transactions,
//   onTransactionsChange,
// }) => {
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   useEffect(() => {
//     const searchedTransactions = transactions
//       .map((transaction) => {
//         if (searchTerm) {
//           const searchTermLower = searchTerm.toLowerCase();
//           const nameMatches = transaction.name
//             ?.toLowerCase()
//             .includes(searchTermLower);
//           const descriptionMatches = transaction.description
//             ?.toLowerCase()
//             .includes(searchTermLower);

//           if (nameMatches || descriptionMatches) {
//             return transaction;
//           } else {
//             return null;
//           }
//         }
//         return transaction;
//       })
//       .filter((transaction) => transaction !== null) as Transaction[];

//     onTransactionsChange(searchedTransactions); // Send filtered transactions back to parent
//   }, [searchTerm, transactions, onTransactionsChange]); // useEffect dependency on searchTerm and transactions

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSearchTerm = event.target.value;
//     setSearchTerm(newSearchTerm);
//   };

//   return (
//     <div className="relative w-full">
//       <FiSearch
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//         size={18}
//       />

//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-3 focus:outline-none focus:ring-0"
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//     </div>
//   );
// };

// export default Search;











"use client";

import React, { useState, useEffect } from "react";
import { Transaction } from "../../../data/transactions";
import { FiSearch } from "react-icons/fi";

interface SearchProps {
  transactions: Transaction[]; // Receive transactions as prop
  onTransactionsChange: (filteredTransactions: Transaction[]) => void; // Callback for filtered transactions
}

const Search: React.FC<SearchProps> = ({
  transactions,
  onTransactionsChange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const searchedTransactions = transactions
      .filter((transaction) => { // Directly filter instead of map and filter null
        if (searchTerm) {
          const searchTermLower = searchTerm.toLowerCase();
          const nameMatches = transaction.name
            ?.toLowerCase()
            .includes(searchTermLower);
          const descriptionMatches = transaction.description
            ?.toLowerCase()
            .includes(searchTermLower);

          return nameMatches || descriptionMatches; // Return true if it matches, false otherwise
        }
        return true; // If no searchTerm, include all transactions
      });

    onTransactionsChange(searchedTransactions); // Send filtered transactions back to parent
  }, [searchTerm, transactions, onTransactionsChange]); // useEffect dependency on searchTerm and transactions

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="relative w-full">
      <FiSearch
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search"
        className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-3 focus:outline-none focus:ring-0"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;