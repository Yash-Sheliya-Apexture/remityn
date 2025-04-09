// frontend/src/app/admin/components/transfers/TransferTableHeader.tsx
'use client';
import React from 'react';
import { ArrowDownUp } from 'lucide-react';

interface TransferTableHeaderProps {
    toggleSort: (field: string) => void;
    sortField: string | null;
    sortDirection: 'asc' | 'desc';
}

const TransferTableHeader: React.FC<TransferTableHeaderProps> = ({ toggleSort, sortField, sortDirection }) => {
    return (
        <thead className='bg-lightgray dark:bg-primarybox '>
            <tr className="border-b">
                <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider">
                    <button
                        onClick={() => toggleSort('_id')}
                        className="flex items-center gap-1 hover:text-primary uppercase"
                    >
                        Transfer ID
                        {sortField === '_id' && (
                            <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
                        )}
                    </button>
                </th>
                <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white  tracking-wider">
                    <button
                        onClick={() => toggleSort('user')}
                        className="flex items-center gap-1 hover:text-primary uppercase"
                    >
                        User
                        {sortField === 'user' && (
                            <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
                        )}
                    </button>
                </th>
                <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white  tracking-wider">
                    <button
                        onClick={() => toggleSort('recipient')}
                        className="flex items-center gap-1 hover:text-primary uppercase"
                    >
                        Recipient
                        {sortField === 'recipient' && (
                            <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
                        )}
                    </button>
                </th>
                <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider">
                    <button
                        onClick={() => toggleSort('amount')}
                        className="flex items-center gap-1 hover:text-primary uppercase"
                    >
                        Amount
                        {sortField === 'amount' && (
                            <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
                        )}
                    </button>
                </th>
                <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white uppercase tracking-wider">Currency</th>
                <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white  tracking-wider">
                    <button
                        onClick={() => toggleSort('status')}
                        className="flex items-center gap-1 hover:text-primary uppercase"
                    >
                        Status
                        {sortField === 'status' && (
                            <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
                        )}
                    </button>
                </th>
                <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 font-medium text-neutral-900 dark:text-white uppercase tracking-wider text-end">Actions</th>
            </tr>
        </thead>
    );
};

export default TransferTableHeader;
