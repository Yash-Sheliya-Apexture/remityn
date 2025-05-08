// import React from 'react';

// export default function RecentActivity() {
//   return (
//     <div className="lg:w-2/3 w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//       <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
//         Recent Activity
//       </h3>
//       <div className="space-y-4">
//         {[1, 2, 3, 4].map((item) => (
//           <div key={item} className="flex items-start border-b pb-3 last:border-b-0 last:pb-0">
//             {/* Using a placeholder background color instead of primary to avoid specific color dependency */}
//             <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
//               <span className="text-neutral-700 dark:text-neutral-300 font-medium">
//                 {/* Replace with actual icon or initials if available */}
//                 {item}
//               </span>
//             </div>
//             <div className="ml-4">
//               <p className="font-medium text-neutral-900 dark:text-white">
//                 New user registered:{" "}
//                 {item === 1
//                   ? "Sarah Johnson"
//                   : item === 2
//                   ? "Michael Lee"
//                   : item === 3
//                   ? "David Chen"
//                   : "Emma Wilson"}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                 {item} hour{item !== 1 ? "s" : ""} ago
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//         View all activity →
//       </button>
//     </div>
//   );
// }


// frontend/src/components/DashboardSection/RecentActivity.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // For the "View all" button
import { User, CreditCard, Send, FileText, AlertCircle } from 'lucide-react';
import activityAdminService, { ActivityItem } from '../../../services/admin/activity.admin'; // Adjust path
import moment from 'moment';

const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
        case 'NEW_USER':
            return <User className="h-5 w-5 text-blue-500" />;
        case 'NEW_PAYMENT':
            return <CreditCard className="h-5 w-5 text-green-500" />;
        case 'NEW_TRANSFER':
            return <Send className="h-5 w-5 text-purple-500" />;
        case 'KYC_PENDING':
            return <FileText className="h-5 w-5 text-yellow-500" />;
        default:
            return <User className="h-5 w-5 text-gray-400" />;
    }
};

export default function RecentActivity() {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await activityAdminService.getRecentActivities(4, 1);
                setActivities(response.data || []);
            } catch (err: any) {
                setError(err.message || "Failed to load recent activities.");
                console.error("Error fetching recent activities:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    if (loading) {
        return (
            <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-start border-b pb-3 last:border-b-0 last:pb-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                            <div className="ml-4 w-full">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-6"></div> {/* Adjusted margin-top */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative" role="alert">
                <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2"/>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                Recent Activity
            </h3>
            <div className="space-y-4">
                {activities.length > 0 ? activities.map((activity) => (
                    <div key={activity.itemId + activity.timestamp + Math.random()} className="flex items-start border-b pb-3 last:border-b-0 last:pb-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700/50 flex-shrink-0 flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                        </div>
                        <div className="ml-4">
                            <p className="font-medium text-neutral-900 dark:text-white text-sm leading-snug">
                                {activity.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                                {moment(activity.timestamp).fromNow()}
                            </p>
                        </div>
                    </div>
                )) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity to display.</p>
                )}
            </div>
            {/* --- MODIFICATION START --- */}
            <Link href="/admin/activity" 
                  className="mt-6 inline-block text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer"
            >
                View all activity →
            </Link>
            {/* --- MODIFICATION END --- */}
        </div>
    );
}