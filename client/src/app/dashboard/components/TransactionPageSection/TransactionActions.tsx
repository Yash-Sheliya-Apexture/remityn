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


// // frontend/src/components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "@/types/transaction"; // Import Transaction interface from types file

// interface TransactionActionsProps {
//     transactions: Transaction[];
//     onTransactionsChange: (transactions: Transaction[]) => void;
//     onFiltersApply: (filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[], fromDate?: string, toDate?: string }) => void;
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


// // frontend/src/components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "@/types/transaction";
// import { Account } from "@/types/account"; // Import Account type

// interface TransactionActionsProps {
//     transactions: Transaction[];
//     userAccounts: Account[]; // <-- Add userAccounts prop
//     onTransactionsChange: (transactions: Transaction[]) => void;
//     onFiltersApply: (filters: { /* ... filter types */ }) => void;
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({
//     transactions,
//     userAccounts, // <-- Destructure userAccounts
//     onTransactionsChange,
//     onFiltersApply
// }) => {
//     return (
//         <div className="flex items-center gap-4 "> {/* Added flex-wrap */}
//             <Search
//                 transactions={transactions}
//                 onTransactionsChange={onTransactionsChange}
//             />
//             <div className="flex items-center gap-2">
//                  {/* Pass userAccounts down to Filter */}
//                 <Filter
//                     userAccounts={userAccounts} // <-- Pass accounts here
//                     onFiltersApply={onFiltersApply}
//                 />
//                 {/* <Download /> */}
//             </div>
//         </div>
//     );
// };

// export default TransactionActions;


// app/dashboard/components/TransactionPageSection/TransactionActions.tsx
import React from "react";
import Search from "./Search"; // Adjusted relative path
import Filter from "./Filter"; // Adjusted relative path
import { Transaction } from "@/types/transaction";
import { Account } from "@/types/account"; // Import Account type

// Define a placeholder type for filters until specific structure is known
type TransactionFilters = object; // Or define specific properties: { status?: string[], dateRange?: { from: Date; to: Date }; ... }

interface TransactionActionsProps {
    transactions: Transaction[];
    userAccounts: Account[]; // <-- Add userAccounts prop
    onTransactionsChange: (transactions: Transaction[]) => void;
    onFiltersApply: (filters: TransactionFilters) => void; // Use defined type
}

const TransactionActions: React.FC<TransactionActionsProps> = ({
    transactions,
    userAccounts, // <-- Destructure userAccounts
    onTransactionsChange,
    onFiltersApply
}) => {
    return (
        <div className="flex flex-wrap items-center gap-4 "> {/* Added flex-wrap */}
            <Search
                transactions={transactions}
                onTransactionsChange={onTransactionsChange}
            />
            <div className="flex items-center gap-2">
                 {/* Pass userAccounts down to Filter */}
                <Filter
                    userAccounts={userAccounts} // <-- Pass accounts here
                    onFiltersApply={onFiltersApply}
                />
                {/* <Download /> */}
            </div>
        </div>
    );
};

export default TransactionActions;