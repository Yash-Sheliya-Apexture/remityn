// // frontend/src/app/admin/components/TransferList.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { Transfer as TransferType } from "../../../types/transfer"; // Assuming you have types defined

// interface TransferListProps {
//   transfers: TransferType[]; // Array of Transfer type
// }

// const TransferList: React.FC<TransferListProps> = ({ transfers }) => {
//   return (
//     <div className="overflow-x-auto shadow-md sm:rounded-lg">
//       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               ID
//             </th>
//             <th scope="col" className="px-6 py-3">
//               User
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Recipient
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Amount
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Status
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Created At
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {transfers.map((transfer) => (
//             <tr
//               key={transfer._id}
//               className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//             >
//               <th
//                 scope="row"
//                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//               >
//                 {transfer._id}
//               </th>
//               <td className="px-6 py-4">{transfer.user?.fullName || "N/A"}</td>
//               <td className="px-6 py-4">
//                 {transfer.recipient?.accountHolderName || "N/A"}
//               </td>
//               <td className="px-6 py-4">
//                 {transfer.sendAmount} {transfer.sendCurrency?.code}
//               </td>
//               <td className="px-6 py-4">{transfer.status}</td>
//               <td className="px-6 py-4">
//                 {new Date(transfer.createdAt).toLocaleString()}
//               </td>
//               <td className="px-6 py-4">
//                 <Link
//                   href={`/admin/transfer/${transfer._id}`}
//                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                 >
//                   View Details
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {transfers.length === 0 && (
//         <div className="p-4 text-center">No transfers to display.</div>
//       )}
//       {/* TODO: Add Pagination Controls Below the table */}
//     </div>
//   );
// };

// export default TransferList;

// frontend/src/app/admin/components/TransferList.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Transfer as TransferType } from "../../../types/transfer";
import {
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MinusCircle,
  Loader2,
} from "lucide-react";

interface TransferListProps {
  transfers: TransferType[];
  isLoading?: boolean;
}

const TransferList: React.FC<TransferListProps> = ({
  transfers,
  isLoading = false,
}) => {
  // Status badge styling and icons
  const statusConfig = {
    pending: {
      icon: <Clock size={18} />,
      class: "bg-yellow-300 text-yellow-700",
    },
    processing: {
      icon: <Loader2 size={18} className="animate-spin" />,
      class: "bg-blue-300 text-blue-700 ",
    },
    completed: {
      icon: <CheckCircle size={18} />,
      class: "bg-green-300 text-green-700",
    },
    failed: {
      icon: <XCircle size={18} />,
      class: "bg-red-300 text-red-700",
    },
    canceled: {
      icon: <MinusCircle size={18} />,
      class: "bg-gray-300 text-gray-700",
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="p-4 border-b border-gray-100">
          <div className="grid grid-cols-7 gap-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border-b border-gray-100">
            <div className="grid grid-cols-7 gap-4">
              {[...Array(7)].map((_, j) => (
                <div key={j} className="h-5 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (transfers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertTriangle size={48} className="text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700">
          No transfers found
        </h3>
        <p className="text-gray mt-1">
          Try changing your filter criteria or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      {/* Header row */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 border-b border-gray-300 font-semibold text-main">
        <div>ID</div>
        <div>USER</div>
        <div>RECIPIENT</div>
        <div>AMOUNT</div>
        <div>STATUS</div>
        <div>DATE</div>
        <div className="text-right">ACTIONS</div>
      </div>

      {/* Data rows */}
      {transfers.map((transfer) => (
        <div
          key={transfer._id}
          className="grid grid-cols-1 md:grid-cols-7 border-b border-gray-300 gap-4 p-4 transition-colors duration-200"
        >
          <div
            className="font-medium text-gray truncate"
            title={transfer._id}
          >
            {transfer._id.substring(0, 10)}...
          </div>

          <div className="text-gray font-medium capitalize truncate">
            {transfer.user?.fullName || "N/A"}
          </div>

          <div className="text-gray truncate">
            {transfer.recipient?.accountHolderName.substring(0, 16) || "N/A"}...
          </div>

          <div className="font-medium gap-1 flex text-gray capitalize">
            {transfer.sendAmount}
            <span>{transfer.sendCurrency?.code}</span>
          </div>

          <div>
            <div
              className={`inline-flex items-center gap-1.5 px-3 font-medium py-1.5 rounded-md ${
                statusConfig[transfer.status]?.class ||
                "bg-gray-100 text-gray font-bold"
              }`}
            >
              {statusConfig[transfer.status]?.icon || <Clock size={20} />}
              <span className="capitalize">{transfer.status}</span>
            </div>
          </div>

          <div className="text-gray font-medium truncate">
            {formatDate(transfer.createdAt)}
          </div>

          <div className="text-right">
            <Link
              href={`/admin/transfer/${transfer._id}`}
              className="inline-flex items-center group border border-primary px-4 py-1.5 hover:bg-primary hover:text-main rounded-md space-x-1 text-primary transition-colors duration-300 font-medium"
            >
              <span>View Details</span>
              <ChevronRight className="size-5 group-hover:translate-x-3 transition-transform ease-in-out duration-300"/>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransferList;
