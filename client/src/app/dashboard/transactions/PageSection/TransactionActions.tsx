// // components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "./TransactionPage"; // Import Transaction interface

// interface TransactionActionsProps {
//   transactions: Transaction[];
//   onSearch: (filteredTransactions: Transaction[]) => void;
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onSearch }) => {
//   return (
//     <div className="flex items-center gap-4">
//       <Search transactions={transactions} onSearch={onSearch} />
//       <div className="flex items-center gap-2">
//         <Filter />
//         <Download />
//       </div>
//     </div>
//   );
// };

// export default TransactionActions;





// components/TransactionActions.tsx
import React from "react";
import Search from "./Search";
import Filter from "./Filter";
import Download from "./Download";
import { Transaction } from "../../../../data/transactions";

interface TransactionActionsProps {
  transactions: Transaction[]; // Receive transactions as prop
  onTransactionsChange: (transactions: Transaction[]) => void; // Callback for transaction changes
}

const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange }) => {
  return (
    <div className="flex items-center gap-4">
      <Search
        transactions={transactions} // Pass transactions to Search
        onTransactionsChange={onTransactionsChange} // Pass callback to Search
      />
      <div className="flex items-center gap-2">
        <Filter />
        <Download />
      </div>
    </div>
  );
};

export default TransactionActions;