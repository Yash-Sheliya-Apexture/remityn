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

// // frontend/src/components/DashboardSection/RecentActivity.tsx
// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link'; // For the "View all" button
// import { User, CreditCard, Send, FileText, AlertCircle } from 'lucide-react';
// import activityAdminService, { ActivityItem } from '../../../services/admin/activity.admin'; // Adjust path
// import moment from 'moment';

// const getActivityIcon = (type: ActivityItem['type']) => {
//     switch (type) {
//         case 'NEW_USER':
//             return <User className="h-5 w-5 text-blue-500" />;
//         case 'NEW_PAYMENT':
//             return <CreditCard className="h-5 w-5 text-green-500" />;
//         case 'NEW_TRANSFER':
//             return <Send className="h-5 w-5 text-purple-500" />;
//         case 'KYC_PENDING':
//             return <FileText className="h-5 w-5 text-yellow-500" />;
//         default:
//             return <User className="h-5 w-5 text-gray-400" />;
//     }
// };

// export default function RecentActivity() {
//     const [activities, setActivities] = useState<ActivityItem[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchActivities = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const response = await activityAdminService.getRecentActivities(4, 1);
//                 setActivities(response.data || []);
//             } catch (err: any) {
//                 setError(err.message || "Failed to load recent activities.");
//                 console.error("Error fetching recent activities:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchActivities();
//     }, []);

//     if (loading) {
//         return (
//             <div className="w-full bg-lightgray/60 dark:bg-primarybox sm:p-6 p-4 rounded-xl shadow-sm border animate-pulse">
//                 <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
//                 <div className="space-y-4">
//                     {[...Array(4)].map((_, i) => (
//                         <div key={i} className="flex items-start border-b pb-3 last:border-b-0 last:pb-0">
//                             <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
//                             <div className="ml-4 w-full">
//                                 <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                                 <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-6"></div> {/* Adjusted margin-top */}
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="w-full bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative" role="alert">
//                 <div className="flex items-center">
//                     <AlertCircle className="h-5 w-5 mr-2"/>
//                     <span className="block sm:inline">{error}</span>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//             <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
//                 Recent Activity
//             </h3>
//             <div className="space-y-4">
//                 {activities.length > 0 ? activities.map((activity) => (
//                     <div key={activity.itemId + activity.timestamp + Math.random()} className="flex items-start border-b pb-3 last:border-b-0 last:pb-0">
//                         <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700/50 flex-shrink-0 flex items-center justify-center">
//                             {getActivityIcon(activity.type)}
//                         </div>
//                         <div className="ml-4">
//                             <p className="font-medium text-neutral-900 dark:text-white text-sm leading-snug">
//                                 {activity.message}
//                             </p>
//                             <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
//                                 {moment(activity.timestamp).fromNow()}
//                             </p>
//                         </div>
//                     </div>
//                 )) : (
//                     <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity to display.</p>
//                 )}
//             </div>
//             {/* --- MODIFICATION START --- */}
//             <Link href="/admin/activity"
//                   className="mt-6 inline-block text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer"
//             >
//                 View all activity →
//             </Link>
//             {/* --- MODIFICATION END --- */}
//         </div>
//     );
// }

// "use client";

// import React, { useState, useEffect, useMemo } from 'react';
// import Link from 'next/link';
// import {
//   User, CreditCard, Send, FileText, AlertCircle,
//   Clock, ChevronRight, RefreshCw, Activity
// } from 'lucide-react';
// import activityAdminService, { ActivityItem } from '../../../services/admin/activity.admin';
// import moment from 'moment';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';

// type ActivityConfig = {
//   icon: React.ReactNode;
//   color: string;
//   bgColor: string;
//   borderColor: string;
//   textColor: string;
// };

// /**
//  * Premium Recent Activity Component
//  *
//  * Displays the most recent system activity with enhanced UI/UX
//  * and sophisticated animations for a premium dashboard experience.
//  */
// export default function RecentActivity() {
//   const [activities, setActivities] = useState<ActivityItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState<boolean>(false);

//   // Activity type configuration with consistent theming
//   const activityConfig = useMemo<Record<string, ActivityConfig>>(() => ({
//     'NEW_USER': {
//       icon: <User className="h-4 w-4" />,
//       color: 'text-blue-500 dark:text-blue-400',
//       bgColor: 'bg-blue-50 dark:bg-blue-900/20',
//       borderColor: 'border-blue-100 dark:border-blue-800/30',
//       textColor: 'text-blue-700 dark:text-blue-300'
//     },
//     'NEW_PAYMENT': {
//       icon: <CreditCard className="h-4 w-4" />,
//       color: 'text-emerald-500 dark:text-emerald-400',
//       bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
//       borderColor: 'border-emerald-100 dark:border-emerald-800/30',
//       textColor: 'text-emerald-700 dark:text-emerald-300'
//     },
//     'NEW_TRANSFER': {
//       icon: <Send className="h-4 w-4" />,
//       color: 'text-violet-500 dark:text-violet-400',
//       bgColor: 'bg-violet-50 dark:bg-violet-900/20',
//       borderColor: 'border-violet-100 dark:border-violet-800/30',
//       textColor: 'text-violet-700 dark:text-violet-300'
//     },
//     'KYC_PENDING': {
//       icon: <FileText className="h-4 w-4" />,
//       color: 'text-amber-500 dark:text-amber-400',
//       bgColor: 'bg-amber-50 dark:bg-amber-900/20',
//       borderColor: 'border-amber-100 dark:border-amber-800/30',
//       textColor: 'text-amber-700 dark:text-amber-300'
//     },
//     'DEFAULT': {
//       icon: <Clock className="h-4 w-4" />,
//       color: 'text-gray-500 dark:text-gray-400',
//       bgColor: 'bg-gray-50 dark:bg-gray-800/30',
//       borderColor: 'border-gray-100 dark:border-gray-700/30',
//       textColor: 'text-gray-600 dark:text-gray-300'
//     }
//   }), []);

//   // Activity card animation variants
//   const cardVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.05,
//         duration: 0.2,
//         ease: "easeOut"
//       }
//     }),
//     exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } }
//   };

//   const fetchActivities = async (showRefreshing = false) => {
//     try {
//       if (showRefreshing) setRefreshing(true);
//       else setLoading(true);

//       setError(null);
//       const response = await activityAdminService.getRecentActivities(4, 1);
//       setActivities(response.data || []);
//     } catch (err: any) {
//       setError(err.message || "Failed to load recent activities.");
//       console.error("Error fetching recent activities:", err);
//     } finally {
//       setLoading(false);
//       if (showRefreshing) {
//         setTimeout(() => setRefreshing(false), 300); // Give visual feedback
//       }
//     }
//   };

//   useEffect(() => {
//     fetchActivities();

//     // Optional: Set up auto-refresh interval
//     const refreshInterval = setInterval(() => {
//       fetchActivities(true);
//     }, 60000); // Refresh every minute

//     return () => clearInterval(refreshInterval);
//   }, []);

//   // Get activity configuration based on type
//   const getActivityConfig = (type: ActivityItem['type']): ActivityConfig => {
//     return activityConfig[type] || activityConfig['DEFAULT'];
//   };

//   // Format human-readable time with smarter logic
//   const formatTime = (timestamp: string): string => {
//     const timeAgo = moment(timestamp).fromNow();
//     const today = moment().startOf('day');
//     const activityDate = moment(timestamp);

//     if (activityDate.isSame(today, 'day')) {
//       return `Today, ${activityDate.format('h:mm A')}`;
//     } else if (activityDate.isSame(today.clone().subtract(1, 'day'), 'day')) {
//       return `Yesterday, ${activityDate.format('h:mm A')}`;
//     } else {
//       return timeAgo;
//     }
//   };

//   // Handler to manually refresh activities
//   const handleRefresh = (e: React.MouseEvent) => {
//     e.preventDefault();
//     fetchActivities(true);
//   };

//   if (loading) {
//     return (
//       <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border backdrop-blur-sm">
//         <div className="flex items-center justify-between mb-6">
//           <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-32"></div>
//           <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-md w-16"></div>
//         </div>
//         <div className="space-y-3">
//           {[...Array(4)].map((_, i) => (
//             <div
//               key={i}
//               className="flex items-center gap-4 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700/50"
//               style={{
//                 opacity: 1 - (i * 0.15),
//                 animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`
//               }}
//             >
//               <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
//               <div className="flex-1">
//                 <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2.5"></div>
//                 <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mt-6"></div>
//         <style jsx>{`
//           @keyframes pulse {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0.5; }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 px-5 py-4 rounded-xl" role="alert">
//         <div className="flex items-center gap-3">
//           <div className="flex-shrink-0">
//             <AlertCircle className="h-5 w-5"/>
//           </div>
//           <div className="flex-1">
//             <h4 className="font-medium text-red-800 dark:text-red-300">Unable to load activities</h4>
//             <p className="text-sm mt-1">{error}</p>
//           </div>
//           <button
//             onClick={handleRefresh}
//             className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors"
//             aria-label="Retry loading activities"
//           >
//             <RefreshCw className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Calculate time categories for grouping
//   const hasRecentActivity = activities.some(a => moment(a.timestamp).isAfter(moment().subtract(4, 'hours')));

//   return (
//     <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border relative overflow-hidden">
//       {/* Header section */}
//       <div className="flex items-center justify-between mb-5 relative z-10">
//         <div className="flex items-center gap-2">
//           <Activity className="h-5 w-5 text-primary" />
//           <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
//             Recent Activity
//           </h3>
//         </div>

//         <div className="flex items-center gap-2">
//           {hasRecentActivity && (
//             <span className="flex items-center text-xs font-medium px-5 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full border border-green-100 dark:border-green-800/30">
//               <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
//               Recent
//             </span>
//           )}
//           <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleRefresh}
//                 disabled={refreshing}
//                 className="h-12 w-12 rounded-full hover:bg-lightborder dark:hover:bg-primarybox"
//               >
//                 <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
//                 <span className="sr-only">Refresh</span>
//               </Button>
//         </div>
//       </div>

//       {/* Activity list with animations */}
//       <AnimatePresence mode="wait">
//         <div className="space-y-3 relative z-10">
//           {activities.length > 0 ? (
//             activities.map((activity, index) => {
//               const config = getActivityConfig(activity.type);

//               return (
//                 <motion.div
//                   key={`${activity.itemId}-${activity.timestamp}`}
//                   custom={index}
//                   variants={cardVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   layout
//                   className={`p-3.5 rounded-lg border ${config.borderColor} ${config.bgColor} transition-all hover:shadow-md`}
//                 >
//                   <div className="flex items-center gap-3.5">
//                     <div className={`h-9 w-9 rounded-full bg-white dark:bg-gray-800 flex-shrink-0 flex items-center justify-center shadow-sm border ${config.borderColor}`}>
//                       <span className={config.color}>
//                         {config.icon}
//                       </span>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-neutral-800 dark:text-white text-sm">
//                         {activity.message}
//                       </p>
//                       <div className="flex items-center mt-1.5 text-xs font-medium">
//                         <span className={`${config.textColor}`}>
//                           {formatTime(activity.timestamp)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex flex-col items-center justify-center py-8 text-center"
//             >
//               <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
//                 <Clock className="h-6 w-6 text-gray-400 dark:text-gray-500" />
//               </div>
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No recent activity</p>
//               <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Check back later for updates</p>
//             </motion.div>
//           )}
//         </div>
//       </AnimatePresence>
//       {/* View all button */}
//       <Link
//         href="/admin/activity"
//         className="mt-6 flex items-center justify-center w-full py-2.5 text-primary hover:text-white text-sm font-medium bg-primary/5 hover:bg-primary dark:bg-primary/10 dark:hover:bg-primary rounded-lg transition-all duration-200 group relative z-10"
//       >
//         <span>View all activity</span>
//         <ChevronRight className="h-4 w-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
//       </Link>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  User,
  CreditCard,
  Send,
  FileText,
  AlertCircle,
  Clock,
  RefreshCw,
  Activity as ActivityIcon,
  MessageSquare,
  Activity,
} from "lucide-react";
import activityAdminService, {
  ActivityItem,
} from "../../../services/admin/activity.admin";
import moment from "moment";
// import { Button } from '@/components/ui/button'; // Removed Shadcn Button
import { Skeleton } from "@/components/ui/skeleton";
import { LuActivity } from "react-icons/lu";

type ActivityConfig = {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
};

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // For initial load
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false); // Specifically for refresh button click
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const activityConfig = useMemo<Record<string, ActivityConfig>>(
    () => ({
      NEW_USER: {
        icon: <User size={20} />,
        color: "text-blue-400",
        bgColor: "bg-blue-900/40",
      },
      NEW_PAYMENT: {
        icon: <CreditCard size={20} />,
        color: "text-green-400",
        bgColor: "bg-green-900/40",
      },
      NEW_TRANSFER: {
        icon: <Send size={20} />,
        color: "text-purple-400",
        bgColor: "bg-purple-900/40",
      },
      KYC_PENDING: {
        icon: <FileText size={20} />,
        color: "text-yellow-400",
        bgColor: "bg-yellow-900/40",
      },
      SUPPORT_MESSAGE: {
        icon: <MessageSquare size={20} />,
        color: "text-indigo-400",
        bgColor: "bg-indigo-900/40",
      },
      KYC_VERIFIED: {
        icon: <FileText size={20} />,
        color: "text-teal-400",
        bgColor: "bg-teal-900/40",
      },
      KYC_REJECTED: {
        icon: <FileText size={20} />,
        color: "text-red-400",
        bgColor: "bg-red-900/40",
      },
      DEFAULT: {
        icon: <Activity size={20} />,
        color: "text-gray-400",
        bgColor: "bg-gray-700/40",
      },
    }),
    []
  );

  const fetchActivities = async (isRefreshClick = false) => {
    if (isRefreshClick) {
      setRefreshing(true); // Set refreshing true only for manual refresh clicks
    } else {
      setLoading(true); // Set loading true for initial load and interval refreshes
    }
    setError(null);
    try {
      const response = await activityAdminService.getRecentActivities(4, 1); // Fetch 4 items for recent activity
      setActivities(response.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load recent activities.");
      console.error("Error fetching recent activities:", err);
    } finally {
      if (isRefreshClick) {
        // Short delay for visual feedback on manual refresh
        setTimeout(() => setRefreshing(false), 300);
      }
      setLoading(false); // Always set loading to false after fetch attempt
    }
  };

  useEffect(() => {
    fetchActivities(); // Initial fetch
    const refreshInterval = setInterval(() => {
      fetchActivities(false); // Interval refresh should not trigger the 'refreshing' state for skeletons
    }, 60000); // Refresh every 60 seconds
    return () => clearInterval(refreshInterval);
  }, []);

  const getActivityConfig = (type: ActivityItem["type"]): ActivityConfig => {
    return activityConfig[type] || activityConfig["DEFAULT"];
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!refreshing) {
      // Prevent multiple rapid clicks
      fetchActivities(true); // Pass true to indicate it's a manual refresh click
    }
  };

  const activitiesToDisplayCount = 4;
  const showSkeletons = loading || refreshing; // Show skeletons if initial loading OR if manually refreshing

  // Skeleton for initial loading (covers header and full component)
  if (loading && refreshing && activities.length === 0) {
    // More specific condition for full component skeleton
    return (
      <div className="xl:w-3/4 w-full bg-primarybox sm:order-1 order-2 sm:p-6 p-4 rounded-xl">
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="h-6 rounded-md w-40 bg-background/50" />
          <Skeleton className="h-9 w-9 rounded-full bg-background/50" />
        </div>
        <div className="space-y-3 mt-1">
          {[...Array(activitiesToDisplayCount)].map((_, i) => (
            <div
              key={`skel-recent-activity-${i}`}
              className="flex items-start bg-primarybox p-4 rounded-lg "
            >
              <Skeleton className="h-10 w-10 rounded-full mr-4 flex-shrink-0 bg-background/50" />
              <div className="flex-grow space-y-2.5">
                <Skeleton className="h-4 w-4/5 rounded-full bg-background/50" />
                <Skeleton className="h-3 w-2/5 rounded-full bg-background/50" />
              </div>
              <Skeleton className="h-3 w-24 rounded-full ml-4 flex-shrink-0 self-start mt-1 bg-background/50" />
              {/* <Skeleton className="h-10 w-35 rounded-full ml-4 flex-shrink-0 self-start mt-1 bg-background/50" /> */}
            </div>
          ))}
        </div>
        <Skeleton className="h-10 rounded-lg w-full mt-6 bg-background/50" />
      </div>
    );
  }

  if (error && !refreshing) {
    // Don't show main error if we are just trying to refresh
    return (
      <div
        className="xl:w-3/4 flex relative justify-center items-center bg-red-900/25 border sm:order-1 order-2 border-red-500 p-4 rounded-xl"
        role="alert"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          
          <div className="sm:size-14 size-12 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
            <AlertCircle className="text-red-500 size-6 sm:size-8 flex-shrink-0" />
          </div>

          <div className="flex-1">
            <h4 className="font-medium sm:text-2xl text-xl text-red-600 capitalize">
              Unable to load activities
            </h4>

            <p className="text-sm mt-2 text-red-300/90">
            {error}</p>
          </div>
        </div>

         <button
            onClick={handleRefresh}
            className="size-10 absolute top-3 right-3 flex items-center justify-center cursor-pointer rounded-full bg-red-600/20 hover:bg-red-700/20 transition-all ease-linear duration-75"
            aria-label="Retry loading activities"
          >
            <RefreshCw className="h-4 w-4 text-red-500" />
          </button>

      </div>
    );
  }

  const hasRecentActivity = activities.some((a) =>
    moment(a.timestamp).isAfter(moment().subtract(4, "hours"))
  );

  return (
    <div className="xl:w-3/4 w-full bg-primarybox sm:order-1 order-2 sm:p-6 p-4 rounded-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-5 relative">
        <div className="flex gap-3 items-center">

          <div className="size-12 shrink-0 bg-primary rounded-full flex items-center justify-center">
            <LuActivity className="size-6 text-subheading" />
          </div>

          <h3 className="text-lg font-semibold text-mainheadingWhite">
            Recent Activity
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {!isMobile && (
            <Link
              href="/admin/activity"
              className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-mainheading font-semibold text-base px-8 py-3 h-11 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
            >
              <span>All Activity</span>
            </Link>
          )}

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || loading} // Disable if already refreshing or initial loading
            className="flex items-center justify-center cursor-pointer gap-2 bg-secondarybox hover:bg-secondaryboxhover size-10 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Refresh recent activity"
          >
            <RefreshCw
              className={`size-4 text-primary ${refreshing ? "animate-spin" : ""}`}
            />
          </button>

        </div>
      </div>

      <div className="space-y-5 relative">
        {showSkeletons ? ( // Show skeletons for the list if loading OR refreshing 508px
          [...Array(activitiesToDisplayCount)].map((_, i) => (
            <div
              key={`skel-list-item-${i}`}
              className="flex items-start bg-primarybox space-y-6 rounded-xl"
            >
              <Skeleton className="size-10 rounded-full mr-4 flex-shrink-0 bg-background/50" />
              <div className="flex sm:flex-row flex-col justify-between w-full">
                <div className="flex-grow space-y-1.5">
                  <Skeleton className="h-3 sm:w-4/5 w-full rounded-full bg-background/50" />
                  <Skeleton className="h-3 sm:w-4/5 w-full rounded-full bg-background/50 sm:hidden block" />
                  <Skeleton className="h-3 sm:w-2/5 w-1/2 rounded-full bg-background/50" />
                </div>

                {isMobile && (
                  <div className="flex flex-col items-start gap-1 mt-1">
                    <Skeleton className="h-3 w-50 rounded-full flex-shrink-0 mt-1 bg-background/50" />
                    <Skeleton className="h-3 w-60 rounded-full flex-shrink-0 mt-1 bg-background/50" />
                  </div>
                )}

                {!isMobile && (
                  <>
                    <div className="flex flex-col items-end gap-1">
                      <Skeleton className="h-3 w-36  rounded-full flex-shrink-0 mt-1 bg-background/50" />
                      <Skeleton className="h-3 w-26 rounded-full flex-shrink-0 mt-1 bg-background/50" />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        ) : activities.length > 0 ? (
          activities.map((activity, index) => {
            const config = getActivityConfig(activity.type);
            return (
              <div
                key={`${activity.itemId || "activity"}-${
                  activity.timestamp
                }-${index}`}
                className="flex items-start bg-primarybox space-y-5 rounded-xl transition-all duration-75 ease-linear cursor-default"
              >
                <div
                  className={`flex-shrink-0 size-10 sm:size-11 rounded-full ${config.bgColor} flex items-center justify-center mr-3.5 sm:mr-4`}
                >
                  <span className={config.color}>{config.icon}</span>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm text-mainheadingWhite capitalize break-words">
                    {activity.message}
                    {activity.itemId && (
                      <span className="block text-xs text-subheadingWhite sm:mt-1 mt-2">
                        ID: {activity.itemId}
                      </span>
                    )}
                  </p>
                  {isMobile && (
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-xs text-mainheadingWhite whitespace-nowrap">
                        {moment(activity.timestamp).format(
                          "MMM D, YYYY h:mm A"
                        )}
                      </p>
                      <p className="text-xs text-subheadingWhite whitespace-nowrap">
                        ({moment(activity.timestamp).fromNow()})
                      </p>
                    </div>
                  )}
                </div>

                {!isMobile && (
                  <div className="flex flex-col items-end gap-1 ml-2 sm:ml-4 flex-shrink-0 self-start pt-0.5">
                    <p className="text-xs text-mainheadingWhite whitespace-nowrap">
                      {moment(activity.timestamp).format("MMM D, YYYY h:mm A")}
                    </p>
                    <p className="text-xs text-subheadingWhite whitespace-nowrap">
                      ({moment(activity.timestamp).fromNow()})
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-10 space-y-3 text-center">
            <div className="sm:size-12 size-10 rounded-full bg-primary flex items-center justify-center">
              <Clock className="sm:size-6 size-5 text-mainheading" />
            </div>
            <p className="sm:text-2xl text-xl text-mainheadingWhite capitalize font-medium">
              No recent activity Found In this case
            </p>
            <p className="text-subheadingWhite text-base">
              Check back later for updates
            </p>
          </div>
        )}
      </div>

      {isMobile && (
        <Link
          href="/admin/activity"
          className="mt-5 flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-8 py-3 sm:h-12.5 h-12 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
        >
          <span>All Activity</span>
        </Link>
      )}
      
    </div>
  );
}
