"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransferHeaderProps {
  transferId: string | undefined;
}

const TransferHeader: React.FC<TransferHeaderProps> = ({ transferId }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <div className="Heding">
        <div className="flex items-center text-sm mb-2 flex-wrap">
          <Link href="/admin" className="text-subheadingWhite hover:text-primary">
            Admin
          </Link>
          <ChevronRight className="size-4 mx-1 flex-shrink-0 text-mainheadingWhite" />
          <Link href="/admin/transfer" className="text-subheadingWhite hover:text-primary">
            Transfers
          </Link>
          <ChevronRight className="size-4 mx-1 flex-shrink-0 text-mainheadingWhite" />
          <span
            className="text-subheadingWhite truncate"
            title={transferId}
          >
            Details ({transferId ? `${transferId.substring(0, 8)}...` : "Loading..."})
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-mainheadingWhite">
          Transfer Details
        </h1>
      </div>

      <Button
        asChild
        variant="link"
        className="text-primary hover:text-primaryhover p-0 h-auto self-start sm:self-center"
      >
        <Link href="/admin/transfer">
          <ArrowLeft className="size-5 mr-1.5" />
          All Transfers
        </Link>
      </Button>
    </div>
  );
};

export default TransferHeader;

// //src/app/admin/components/transfers/TransferHeader.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { ChevronRight, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { BsSend } from "react-icons/bs";

// interface TransferHeaderProps {
//   transferId: string | undefined;
// }

// const TransferHeader: React.FC<TransferHeaderProps> = ({ transferId }) => {
//   return (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//       <div className="Management">
//         <div className="flex items-center gap-3">
//           <div className="size-12 shrink-0 bg-primary rounded-full flex items-center justify-center">
//             <BsSend className="size-6 text-mainheading" />
//           </div>

//           <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
//             Send Money Details
//           </h1>
//         </div>

//         <p className="mt-2 text-subheadingWhite lg:text-lg">
//           Track money transfers seamlessly with clear recipient
//           details, currency types, and real-time transaction statuses.
//         </p>
//       </div>

//       <Link
//         href="/admin/transfer"
//         className="flex items-center bg-primary text-mainheading hover:bg-primaryhover h-12.5 px-8 py-3 cursor-pointer font-medium rounded-full sm:w-auto w-full justify-center transition-all duration-75 ease-linear"
//       >
//         <ArrowLeft className="size-5 mr-1.5" />
//         All Transfers
//       </Link>
//     </div>
//   );
// };

// export default TransferHeader;

// //src/app/admin/components/transfers/TransferHeader.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react"; // ChevronRight not used, can remove
// import { BsSend } from "react-icons/bs";

// interface TransferHeaderProps {
//   transferId: string | undefined; // transferId is used in the main page but not here
// }

// const TransferHeader: React.FC<TransferHeaderProps> = ({ transferId }) => {
//   // transferId is passed but not used in this component's JSX.
//   // If it's meant for display (e.g., in a title), uncomment and use it.
//   return (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//       <div className="Management">
//         <div className="flex items-center gap-3">
//           <div className="
//           p-2.5 shrink-0 bg-primary rounded-full flex items-center justify-center">
//             <BsSend className="size-6 text-mainheading" size={26} />
//           </div>

//           <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
//             Send Money Details
//           </h1>
//         </div>

//         <p className="mt-2 text-subheadingWhite text-base lg:text-lg max-w-5xl">
//           Access in-depth information on every money transfer with the Send
//           Money Details feature. Get a clear view of each transaction, including
//           recipient information, selected currency, transfer amount, applied
//           exchange rate, and real-time status updates
//         </p>
//       </div>

//       <Link
//         href="/admin/transfers" // Corrected link from /admin/transfer to /admin/transfers
//         className="flex items-center text-mainheading gap-2 bg-primary hover:bg-primaryhover px-6 py-3 cursor-pointer font-medium rounded-full sm:w-auto w-full justify-center transition-all duration-75 ease-linear"
//       >
//         <ArrowLeft className="size-5" />
//         All Transfers
//       </Link>
//     </div>
//   );
// };

// export default TransferHeader;
