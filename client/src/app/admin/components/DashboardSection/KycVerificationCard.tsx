// frontend/src/components/DashboardSection/KycVerificationCard.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Shield } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

interface KycVerificationCardProps {
    loading: boolean;
    error: string | null;
    notStartedCount?: number;
    pendingCount?: number;
    verifiedCount?: number;
    rejectedCount?: number;
    skippedCount?: number;
}

export default function KycVerificationCard({
    loading,
    error,
    notStartedCount,
    pendingCount,
    verifiedCount,
    rejectedCount,
    skippedCount
}: KycVerificationCardProps) {

    // Skeleton Loader
    if (loading) {
        return (
            <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl border animate-pulse">
                <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-6 w-3/5 rounded" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <div className="space-y-3 mb-4">
                    <Skeleton className="h-4 w-full rounded" /> {/* Not Started */}
                    <Skeleton className="h-4 w-3/4 rounded" /> {/* Pending */}
                    <Skeleton className="h-4 w-2/3 rounded" /> {/* Verified */}
                    <Skeleton className="h-4 w-3/5 rounded" /> {/* Rejected */}
                    <Skeleton className="h-4 w-1/2 rounded" /> {/* Skipped */}
                </div>
                <Skeleton className="h-5 w-1/3 mt-6 rounded" />
            </div>
        );
    }

    // Error display
    if (error) {
        return (
             <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative h-full flex flex-col justify-center" role="alert">
                 <p className='text-sm font-medium'>Error loading KYC Stats:</p>
                 <p className='text-xs mt-1'>{error}</p>
             </div>
         );
     }

    // Helper function for conditional dot rendering
    const renderDot = (count: number | undefined | null, colorClass: string, animate: boolean = false) => {
        // Explicitly check if count is greater than 0 after handling null/undefined
        if ((count ?? 0) > 0) {
            return <div className={`ml-2 h-2 w-2 rounded-full ${colorClass} ${animate ? 'animate-pulse' : ''}`}></div>;
        }
        return null; // Render nothing if count is 0 or less (or null/undefined)
    };


    // Actual Card Content
    return (
        <div className="w-full bg-white dark:bg-primarybox sm:p-6 p-4 rounded-xl border h-full flex flex-col justify-between">
            <div> {/* Content Wrapper */}
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
                        KYC Verifications
                    </h4>
                    <Shield className="h-5 w-5 text-blue-500" />
                </div>

                <div className="space-y-3">
                    {/* Not Started */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">Not Started</p>
                        <div className="flex items-center">
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">{notStartedCount ?? '0'}</p> {/* Show 0 instead of N/A */}
                            {/* Use helper function */}
                            {renderDot(notStartedCount, 'bg-blue-400')}
                        </div>
                    </div>
                    {/* Pending */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">Pending</p>
                        <div className="flex items-center">
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">{pendingCount ?? '0'}</p>
                            {/* Use helper function, enable animation */}
                            {renderDot(pendingCount, 'bg-yellow-500', true)}
                        </div>
                    </div>
                    {/* Verified */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">Verified</p>
                        <div className="flex items-center">
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">{verifiedCount ?? '0'}</p>
                            {renderDot(verifiedCount, 'bg-green-500')}
                        </div>
                    </div>
                    {/* Rejected */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">Rejected</p>
                        <div className="flex items-center">
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">{rejectedCount ?? '0'}</p>
                            {renderDot(rejectedCount, 'bg-red-500')}
                        </div>
                    </div>
                    {/* Skipped */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">Skipped</p>
                        <div className="flex items-center">
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">{skippedCount ?? '0'}</p>
                            {renderDot(skippedCount, 'bg-gray-400')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Link */}
            <div>
                <Link href="/admin/kyc-management" className="mt-6 inline-block text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
                    Manage KYC Verifications →
                </Link>
            </div>
        </div>
    );
}