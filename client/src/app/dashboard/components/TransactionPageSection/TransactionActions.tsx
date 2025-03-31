// // components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "../../../data/transactions";

// interface TransactionActionsProps {
//   transactions: Transaction[]; // Receive transactions as prop
//   onTransactionsChange: (transactions: Transaction[]) => void; // Callback for transaction changes
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange }) => {
//   return (
//     <div className="flex items-center gap-4">
//       <Search
//         transactions={transactions} // Pass transactions to Search
//         onTransactionsChange={onTransactionsChange} // Pass callback to Search
//       />
//       <div className="flex items-center gap-2">
//         <Filter />
//         <Download />
//       </div>
//     </div>
//   );
// };

// export default TransactionActions;












// // components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "../../../data/transactions";

// interface TransactionActionsProps {
//   transactions: Transaction[];
//   onTransactionsChange: (transactions: Transaction[]) => void;
//   onFiltersApply: (filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null }) => void; // Update filters type
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange, onFiltersApply }) => {
//   return (
//     <div className="flex items-center gap-4">
//       <Search
//         transactions={transactions}
//         onTransactionsChange={onTransactionsChange}
//       />
//       <div className="flex items-center gap-2">
//         <Filter onFiltersApply={onFiltersApply} />
//         <Download />
//       </div>
//     </div>
//   );
// };

// export default TransactionActions;










// // Latest Code Without Date Picker
// // components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "@/app/data/transactions";

// interface TransactionActionsProps {
//     transactions: Transaction[];
//     onTransactionsChange: (transactions: Transaction[]) => void;
//     onFiltersApply: (filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[] }) => void; // Updated selectedBalance type to string[]
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange, onFiltersApply }) => {
//     return (
//         <div className="flex items-center gap-4">
//             <Search
//                 transactions={transactions}
//                 onTransactionsChange={onTransactionsChange}
//             />
//             <div className="flex items-center gap-2">
//                 <Filter onFiltersApply={onFiltersApply} />
//                 <Download />
//             </div>
//         </div>
//     );
// };

// export default TransactionActions;





// // components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "@/app/data/transactions";

// interface TransactionActionsProps {
//   transactions: Transaction[];
//   onTransactionsChange: (transactions: Transaction[]) => void;
//   onFiltersApply: (filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[], fromDate?: string, toDate?: string }) => void;
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange, onFiltersApply }) => {
//   return (
//     <div className="flex items-center gap-4">
//       <Search
//         transactions={transactions}
//         onTransactionsChange={onTransactionsChange}
//       />
//       <div className="flex items-center gap-2">
//         <Filter onFiltersApply={onFiltersApply} />
//         <Download />
//       </div>
//     </div>
//   );
// };

// export default TransactionActions;


// frontend/src/components/TransactionActions.tsx
import React from "react";
import Search from "./Search";
import Filter from "./Filter";
import Download from "./Download";
import { Transaction } from "@/types/transaction"; // Import Transaction interface from types file

interface TransactionActionsProps {
    transactions: Transaction[];
    onTransactionsChange: (transactions: Transaction[]) => void;
    onFiltersApply: (filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[], fromDate?: string, toDate?: string }) => void;
}

const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange, onFiltersApply }) => {
    return (
        <div className="flex items-center gap-4">
            <Search
                transactions={transactions}
                onTransactionsChange={onTransactionsChange}
            />
            <div className="flex items-center gap-2">
                <Filter onFiltersApply={onFiltersApply} />
                <Download />
            </div>
        </div>
    );
};

export default TransactionActions;