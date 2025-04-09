// "use client";
// import React from "react";
// import { Calendar, DollarSign } from "lucide-react";
// import { GetStatusBadge, getTimeAgo, formatCurrency } from "../../../utils/helpers"; // Adjust path

// interface TransferOverviewCardProps {
//   transfer: any; // Consider creating a Transfer type/interface
// }

// const TransferOverviewCard: React.FC<TransferOverviewCardProps> = ({
//   transfer,
// }) => {
//   if (!transfer) return null; // Or a loading state

//   return (
//     <div className="bg-lightgray dark:bg-primarybox rounded-xl border dark:border-primarybox p-6 mb-8">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         {/* Left Side: Status and ID */}
//         <div className="flex items-center">
//           <div className="mr-4 flex-shrink-0">
//             <GetStatusBadge status={transfer.status} />
//           </div>
//           <div className="min-w-0"> {/* Ensure ID doesn't overflow */}
//             <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Transfer ID</p>
//             <p className="text-neutral-900 dark:text-white text-sm break-all">
//               {transfer._id}
//             </p>
//           </div>
//         </div>

//         {/* Right Side: Dates and Amount */}
//         <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
//           <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
//             <Calendar className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-300">Created</p>
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 {getTimeAgo(transfer.createdAt)}
//               </p>
//             </div>
//           </div>

//           <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
//             <DollarSign className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-300">Amount Sent</p>
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 {formatCurrency(transfer.sendAmount, transfer.sendCurrency?.code)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferOverviewCard;





"use client";
import React from "react";
import { Calendar, DollarSign } from "lucide-react";
import { GetStatusBadge, getTimeAgo, formatCurrency } from "../../../utils/helpers"; // Adjust path if needed

// Define an interface for the currency reference within the transfer
interface CurrencyRef {
  code?: string | null; // Currency code, might be optional or null
  // Add other currency properties if needed by formatCurrency or elsewhere
}

// Define a specific interface for the transfer object's relevant properties
interface TransferOverview {
  _id?: string | null; // Transfer ID
  status?: string | null; // Transfer status (assuming string, adjust if different)
  createdAt?: string | Date | null; // Creation date/time
  sendAmount?: number | null; // Amount sent
  sendCurrency?: CurrencyRef | null; // Reference to the sending currency object
  // Add other properties if needed for future use or if accessed indirectly
}

interface TransferOverviewCardProps {
  // Use the defined interface and allow null/undefined
  transfer: TransferOverview | null | undefined;
}

const TransferOverviewCard: React.FC<TransferOverviewCardProps> = ({
  transfer,
}) => {
  // Handle null or undefined transfer case early
  if (!transfer) return null; // Or a loading state

  // Safely access the currency code, providing undefined if not available
  const sendCurrencyCode = transfer.sendCurrency?.code || undefined;

  return (
    <div className="bg-lightgray dark:bg-primarybox rounded-xl border dark:border-primarybox p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Status and ID */}
        <div className="flex items-center">
          <div className="mr-4 flex-shrink-0">
             {/* Assuming GetStatusBadge can handle null/undefined status gracefully */}
            <GetStatusBadge status={transfer.status} />
          </div>
          <div className="min-w-0"> {/* Ensure ID doesn't overflow */}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Transfer ID</p>
            <p className="text-neutral-900 dark:text-white text-sm break-all">
              {/* Provide fallback for ID */}
              {transfer._id || 'N/A'}
            </p>
          </div>
        </div>

        {/* Right Side: Dates and Amount */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
            <Calendar className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">Created</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {/* Assuming getTimeAgo handles null/undefined createdAt */}
                {getTimeAgo(transfer.createdAt)}
              </p>
            </div>
          </div>

          <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
            <DollarSign className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">Amount Sent</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                 {/* Pass the safely retrieved currency code */}
                {formatCurrency(transfer.sendAmount, sendCurrencyCode)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferOverviewCard;