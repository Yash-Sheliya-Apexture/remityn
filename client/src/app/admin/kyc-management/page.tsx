// // frontend/src/app/admin/kyc-management/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import kycAdminService from '../../services/admin/kyc.admin'; // Adjust path if needed
// import type { PendingKycUser } from '../../services/admin/kyc.admin'; // Import the type

// // Icons
// import { LuFileCheck, LuChevronRight } from 'react-icons/lu';
// import { FiAlertCircle } from "react-icons/fi";
// // --- Helper Functions (Keep as is) ---
// const formatDate = (dateInput?: string | Date): string => {
//     if (!dateInput) return 'N/A';
//     try {
//         const date = new Date(dateInput);
//          if (isNaN(date.getTime())) return 'Invalid Date';
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
//         });
//     } catch (e) {
//         return 'Invalid Date';
//     }
// };

// // --- Custom Button Styling (Example for link styling) ---
// const viewDetailsLinkStyle = "inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors";

// const KycManagementPage: React.FC = () => {
//     // --- State Management (Keep as is) ---
//     const [pendingUsers, setPendingUsers] = useState<PendingKycUser[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     // --- Data Fetching (Keep as is) ---
//     useEffect(() => {
//         const fetchPendingUsers = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const users = await kycAdminService.getPendingKycUsersAdmin();
//                 setPendingUsers(users);
//             } catch (err: any) {
//                 console.error("Failed to fetch pending KYC users:", err);
//                 setError(err.message || 'An unknown error occurred while fetching pending applications.');
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchPendingUsers();
//     }, []);

//     // --- Custom Render Functions ---

//     // --- Custom Loading Skeleton ---
//     const renderLoading = () => (
//         <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 animate-pulse">
//                     <thead className="bg-gray-50 dark:bg-gray-700/50">
//                         <tr>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submitted At</th>
//                             <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                         {[...Array(5)].map((_, index) => ( // Render 5 skeleton rows
//                             <tr key={index}>
//                                 <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div></td>
//                                 <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div></td>
//                                 <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div></td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-right"><div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 ml-auto"></div></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//              <div className="px-6 py-3 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">
//                  Loading pending applications...
//              </div>
//         </div>
//     );

//     // --- Custom Error Message Display ---
//     const renderError = () => (
//         <div className="border-l-4 border-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md shadow-sm" role="alert">
//             <div className="flex items-center">
//                 <FiAlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
//                 <div>
//                     <p className="text-sm font-medium text-red-800 dark:text-red-300">Error Loading Data</p>
//                     <p className="mt-1 text-sm text-red-700 dark:text-red-400">{error}</p>
//                     {/* Optional: Add a retry button */}
//                     {/* <button onClick={fetchPendingUsers} className="mt-2 text-sm font-medium text-red-700 dark:text-red-400 hover:underline">Retry</button> */}
//                 </div>
//             </div>
//         </div>
//     );

//     // --- Render Main Content (Table or No Data Message) ---
//     const renderContent = () => {
//         if (pendingUsers.length === 0) {
//             return (
//                 <div className="text-center py-16 px-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
//                     <LuFileCheck className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Pending Applications</h3>
//                     <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">There are currently no KYC applications awaiting review.</p>
//                 </div>
//             );
//         }

//         return (
//             // Replaces Table Component Wrapper
//             <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
//                 {/* Responsive Table Wrapper */}
//                 <div className="overflow-x-auto">
//                     {/* Standard HTML Table */}
//                     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                         {/* Replaces TableHeader */}
//                         <thead className="bg-gray-50 dark:bg-gray-700/50">
//                             <tr>
//                                 {/* Replaces TableHead */}
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                                     Name
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                                     Email
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                                     Submitted At
//                                 </th>
//                                 <th scope="col" className="relative px-6 py-3">
//                                     <span className="sr-only">Actions</span> {/* Accessibility */}
//                                 </th>
//                             </tr>
//                         </thead>
//                         {/* Replaces TableBody */}
//                         <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                             {pendingUsers.map((user) => (
//                                 // Replaces TableRow
//                                 <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors">
//                                     {/* Replaces TableCell */}
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName || 'N/A'}</div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm text-gray-600 dark:text-gray-300">{formatDate(user.kyc?.submittedAt)}</div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                         {/* Link styled as a button, replaces Button */}
//                                         <Link href={`/admin/kyc-management/${user._id}`} className={viewDetailsLinkStyle}>
//                                             View Details
//                                             <LuChevronRight className="ml-1 h-3 w-3" />
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                  {/* Replaces TableCaption (optional footer) */}
//                  <div className="px-6 py-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
//                     List of users with pending KYC verification. Found {pendingUsers.length} application(s).
//                 </div>
//             </div>
//         );
//     };

//     // --- Main Component Return ---
//     return (
//         // Use Tailwind for overall page layout and padding
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto"> {/* Use a wider container for tables */}
//                  {/* Page Header */}
//                  <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KYC Management</h1>
//                     <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Review and manage user KYC applications.</p>
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="mt-6">
//                      {isLoading ? renderLoading() : error ? renderError() : renderContent()}
//                  </div>
//             </div>
//         </div>
//     );
// };

// export default KycManagementPage;


// frontend/src/app/admin/kyc-management/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import kycAdminService from '../../services/admin/kyc.admin'; // Adjust path
import type { PendingKycUser } from '../../services/admin/kyc.admin'; // Type import

// Icons
import { FileClock, ChevronRight, Users, Inbox, Loader2, AlertCircle } from 'lucide-react'; // Lucide icons
import { cn } from '@/lib/utils'; // Utility for class names

// --- Helper Functions ---
const formatDate = (dateInput?: string | Date): string => {
    // ... (keep existing formatDate function)
     if (!dateInput) return 'N/A';
    try {
        const date = new Date(dateInput);
         if (isNaN(date.getTime())) return 'Invalid Date';
        // More detailed format
        return date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'//, timeZoneName: 'short'
        });
    } catch (e) {
        return 'Invalid Date';
    }
};

// --- KYC Management Page Component ---
const KycManagementPage: React.FC = () => {
    const [pendingUsers, setPendingUsers] = useState<PendingKycUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // --- Data Fetching ---
    const fetchPendingUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const users = await kycAdminService.getPendingKycUsersAdmin();
            setPendingUsers(users);
        } catch (err: any) {
            console.error("Failed to fetch pending KYC users:", err);
            setError(err.message || 'An unknown error occurred while fetching applications.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []); // Fetch on initial mount

    // --- Custom Render Functions ---

    // Loading Skeleton
    const renderLoading = () => (
        <div className="space-y-4 animate-pulse">
             {/* Skeleton for the heading */}
             <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
             {/* Skeleton for the table */}
            <div className="border border-border rounded-lg overflow-hidden">
                <div className="w-full">
                    {/* Skeleton Table Header */}
                     <div className="h-12 bg-muted/50 dark:bg-muted/20 border-b border-border"></div>
                     {/* Skeleton Table Rows */}
                     {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex justify-between items-center p-4 border-b border-border last:border-b-0">
                            <div className="space-y-1.5">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                            </div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Error Message Display
    const renderError = () => (
        <div className="border-l-4 border-destructive bg-destructive/10 p-4 rounded-md" role="alert">
            <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-destructive mr-3 flex-shrink-0" />
                <div>
                    <p className="text-sm font-medium text-destructive/90 dark:text-red-300">Error Loading Pending Applications</p>
                    <p className="mt-1 text-sm text-destructive/80 dark:text-red-400">{error}</p>
                     <button onClick={fetchPendingUsers} className="mt-2 text-sm font-medium text-destructive/90 hover:underline">Retry</button>
                </div>
            </div>
        </div>
    );

    // Render Main Content (Table or No Data Message)
    const renderContent = () => {
        if (pendingUsers.length === 0) {
            return (
                <div className="text-center py-16 px-6 border border-dashed border-border rounded-lg bg-muted/20 dark:bg-muted/10">
                    <Inbox className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground">All Clear!</h3>
                    <p className="mt-1 text-sm text-muted-foreground">There are currently no KYC applications awaiting review.</p>
                </div>
            );
        }

        // Render the list/table of pending users
        return (
             <div className="border border-border rounded-lg overflow-hidden shadow-sm bg-card dark:bg-card">
                 <ul role="list" className="divide-y divide-border">
                     {pendingUsers.map((user) => (
                         <li key={user._id} className="flex items-center justify-between gap-x-6 px-4 py-4 hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors sm:px-6">
                             <div className="min-w-0">
                                <div className="flex items-start gap-x-3">
                                    <p className="text-sm font-semibold leading-6 text-foreground">{user.fullName || 'N/A'}</p>
                                     {/* Optional: Status Badge */}
                                     {/* <span className="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-700">
                                        Pending
                                    </span> */}
                                </div>
                                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-muted-foreground">
                                    <p className="whitespace-nowrap truncate" title={user.email}>{user.email}</p>
                                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current"><circle cx={1} cy={1} r={1} /></svg>
                                    <p className="whitespace-nowrap">
                                         Submitted: <time dateTime={user.kyc?.submittedAt?.toString()}>{formatDate(user.kyc?.submittedAt)}</time>
                                     </p>
                                </div>
                             </div>
                             <div className="flex flex-none items-center gap-x-4">
                                <Link
                                     href={`/admin/kyc-management/${user._id}`}
                                     className="inline-flex items-center gap-1 rounded-md bg-background px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm ring-1 ring-inset ring-border hover:bg-muted/80 dark:bg-secondary dark:text-foreground dark:ring-border/50 dark:hover:bg-secondary/80"
                                >
                                     View<span className="sr-only">, {user.fullName}</span>
                                     <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                                 </Link>
                             </div>
                         </li>
                     ))}
                 </ul>
             </div>
        );
    };

    // --- Main Component Return ---
    return (
        // Use Tailwind for overall page layout and padding
        <div className="min-h-screen bg-background dark:bg-muted/20 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                 {/* Page Header */}
                 <div className="mb-8 border-b border-border pb-5">
                    <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">KYC Management</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Review and manage user Know Your Customer (KYC) applications.</p>
                </div>

                {/* Pending Users Section */}
                <section>
                     <div className="flex items-center gap-2 mb-4">
                         <FileClock className="h-5 w-5 text-primary" />
                         <h2 className="text-xl font-semibold text-foreground">Pending Applications ({isLoading ? '...' : pendingUsers.length})</h2>
                     </div>
                     {isLoading ? renderLoading() : error ? renderError() : renderContent()}
                 </section>

                 {/* Optional: Section for All Users (requires new endpoint/logic) */}
                 {/*
                 <section className="mt-12">
                    <div className="flex items-center gap-2 mb-4">
                         <Users className="h-5 w-5 text-muted-foreground" />
                         <h2 className="text-xl font-semibold text-foreground">All Users</h2>
                    </div>
                    <p className="text-muted-foreground text-sm"> (Functionality to list/search all users with filters will be added here)</p>
                    {/* Placeholder for future table/list of all users */}
                 {/* </section> */}

            </div>
        </div>
    );
};

export default KycManagementPage;