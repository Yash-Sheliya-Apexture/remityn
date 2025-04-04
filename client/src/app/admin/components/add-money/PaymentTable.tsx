// // components/admin/payments/PaymentTable.tsx
// 'use client';
// import React from 'react';
// import { Skeleton } from '@/components/ui/skeleton';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Edit, Copy } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";
// import PaymentTableHeader from './PaymentTableHeader';
// import { useCopyToClipboard } from './useCopyToClipboard';

// interface PaymentTableProps {
//     filteredPayments: any[]; // Replace 'any' with a more specific type if possible
//     loadingPayments: boolean;
//     getStatusColor: (status: string) => string;
//     toggleSort: (field: string) => void;
//     sortField: string | null;
//     sortDirection: 'asc' | 'desc';
//     handleEditPayment: (payment: any) => void; // Replace 'any' with a more specific type if possible
// }

// const PaymentTable: React.FC<PaymentTableProps> = ({
//     filteredPayments,
//     loadingPayments,
//     getStatusColor,
//     toggleSort,
//     sortField,
//     sortDirection,
//     handleEditPayment,
// }) => {
//     const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
//     const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();

//     if (loadingPayments) {
//         return (
//             <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
//                 <table className="min-w-full">
//                     <PaymentTableHeader toggleSort={toggleSort} sortField={sortField} sortDirection={sortDirection} />
//                     <tbody>
//                         {Array(5).fill(0).map((_, i) => (
//                             <tr key={i} className="hover:bg-gray-50">
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                 <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }

//     return (
//         <div
//             className="rounded-xl border overflow-hidden"
//         >
//             <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                     <PaymentTableHeader toggleSort={toggleSort} sortField={sortField} sortDirection={sortDirection} />
//                     <tbody className="divide-y ">
//                         {filteredPayments.length === 0 ? (
//                             <tr>
//                                 <td colSpan="7" className="px-4 py-10 text-center text-gray-500">
//                                     No payments found matching your filters.
//                                 </td>
//                             </tr>
//                         ) : (
//                             filteredPayments.map((payment, index) => (
//                                 <motion.tr
//                                     key={payment._id}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.05 }}
//                                 >
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className="font-medium text-neutral-900 dark:text-white">{payment._id.substring(0, 10)}...</span>
//                                     </td>
//                                     <td className="px-4 py-3">
//                                         <div className="flex flex-col">
//                                             <span className="font-medium capitalize text-neutral-900 dark:text-white">{payment.user?.fullName || 'N/A'}</span>
//                                             <span className="text-sm text-gray-500 dark:text-gray-300">{payment.user?.email || 'N/A'}</span>
//                                         </div>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                                         {payment.amountToAdd}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
//                                         {payment.payInCurrency?.code || 'N/A'}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className="text-neutral-900 dark:text-white">{payment.referenceCode || 'N/A'}</span>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(payment.status)}`}>
//                                             {payment.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap font-medium">
//                                         <motion.button
//                                             onClick={() => handleEditPayment(payment)}
//                                             className="bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-4 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center"
//                                         >
//                                             <Edit size={18} className="mr-1" />
//                                             Edit
//                                         </motion.button>
//                                     </td>
//                                 </motion.tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentTable;



// components/admin/payments/PaymentTable.tsx
'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Copy } from 'lucide-react';
import { GiCheckMark } from "react-icons/gi";
import PaymentTableHeader from './PaymentTableHeader';
import { useCopyToClipboard } from './useCopyToClipboard';

interface PaymentTableProps {
    filteredPayments: any[]; // Replace 'any' with a more specific type if possible
    loadingPayments: boolean;
    getStatusColor: (status: string) => string;
    toggleSort: (field: string) => void;
    sortField: string | null;
    sortDirection: 'asc' | 'desc';
    handleEditPayment: (payment: any) => void; // Replace 'any' with a more specific type if possible
}

const PaymentTable: React.FC<PaymentTableProps> = ({
    filteredPayments,
    loadingPayments,
    getStatusColor,
    toggleSort,
    sortField,
    sortDirection,
    handleEditPayment,
}) => {
    const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
    const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();

    if (loadingPayments) {
        return (
            <div className="rounded-xl border overflow-hidden">
                <table className="min-w-full">
                    <PaymentTableHeader toggleSort={toggleSort} sortField={sortField} sortDirection={sortDirection} />
                    <tbody>
                        {Array(10).fill(0).map((_, i) => (
                            <tr key={i}>
                                <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
                                <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
                                <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
                                <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
                                <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
                                <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div
            className="rounded-xl border overflow-hidden"
        >
            <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden">
                    <PaymentTableHeader toggleSort={toggleSort} sortField={sortField} sortDirection={sortDirection} />
                    <tbody className="divide-y overflow-hidden">
                        {filteredPayments.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-4 py-10 text-center text-gray-500">
                                    No payments found matching your filters.
                                </td>
                            </tr>
                        ) : (
                            filteredPayments.map((payment, index) => (
                                <motion.tr
                                    key={payment._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className="font-medium text-neutral-900 dark:text-white">{payment._id.substring(0, 10)}...</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col">
                                            <span className="font-medium capitalize text-neutral-900 dark:text-white">{payment.user?.fullName || 'N/A'}</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-300">{payment.user?.email || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
                                        {payment.amountToAdd}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
                                        {payment.payInCurrency?.code || 'N/A'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className="text-neutral-900 dark:text-white">{payment.referenceCode || 'N/A'}</span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap font-medium">
                                        <motion.button
                                            onClick={() => handleEditPayment(payment)}
                                            className="bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-4 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center"
                                        >
                                            <Edit size={18} className="mr-1" />
                                            Edit
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentTable;