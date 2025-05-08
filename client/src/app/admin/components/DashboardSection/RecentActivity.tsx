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

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  User, CreditCard, Send, FileText, AlertCircle, 
  Clock, ChevronRight, RefreshCw, Activity 
} from 'lucide-react';
import activityAdminService, { ActivityItem } from '../../../services/admin/activity.admin';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

type ActivityConfig = {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
};

/**
 * Premium Recent Activity Component
 * 
 * Displays the most recent system activity with enhanced UI/UX
 * and sophisticated animations for a premium dashboard experience.
 */
export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Activity type configuration with consistent theming
  const activityConfig = useMemo<Record<string, ActivityConfig>>(() => ({
    'NEW_USER': {
      icon: <User className="h-4 w-4" />,
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-100 dark:border-blue-800/30',
      textColor: 'text-blue-700 dark:text-blue-300'
    },
    'NEW_PAYMENT': {
      icon: <CreditCard className="h-4 w-4" />,
      color: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-100 dark:border-emerald-800/30',
      textColor: 'text-emerald-700 dark:text-emerald-300'
    },
    'NEW_TRANSFER': {
      icon: <Send className="h-4 w-4" />,
      color: 'text-violet-500 dark:text-violet-400',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      borderColor: 'border-violet-100 dark:border-violet-800/30',
      textColor: 'text-violet-700 dark:text-violet-300'
    },
    'KYC_PENDING': {
      icon: <FileText className="h-4 w-4" />,
      color: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-100 dark:border-amber-800/30',
      textColor: 'text-amber-700 dark:text-amber-300'
    },
    'DEFAULT': {
      icon: <Clock className="h-4 w-4" />,
      color: 'text-gray-500 dark:text-gray-400',
      bgColor: 'bg-gray-50 dark:bg-gray-800/30',
      borderColor: 'border-gray-100 dark:border-gray-700/30',
      textColor: 'text-gray-600 dark:text-gray-300'
    }
  }), []);

  // Activity card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.2,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } }
  };

  const fetchActivities = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);
      else setLoading(true);
      
      setError(null);
      const response = await activityAdminService.getRecentActivities(4, 1);
      setActivities(response.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load recent activities.");
      console.error("Error fetching recent activities:", err);
    } finally {
      setLoading(false);
      if (showRefreshing) {
        setTimeout(() => setRefreshing(false), 300); // Give visual feedback
      }
    }
  };

  useEffect(() => {
    fetchActivities();
    
    // Optional: Set up auto-refresh interval
    const refreshInterval = setInterval(() => {
      fetchActivities(true);
    }, 60000); // Refresh every minute
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Get activity configuration based on type
  const getActivityConfig = (type: ActivityItem['type']): ActivityConfig => {
    return activityConfig[type] || activityConfig['DEFAULT'];
  };

  // Format human-readable time with smarter logic
  const formatTime = (timestamp: string): string => {
    const timeAgo = moment(timestamp).fromNow();
    const today = moment().startOf('day');
    const activityDate = moment(timestamp);
    
    if (activityDate.isSame(today, 'day')) {
      return `Today, ${activityDate.format('h:mm A')}`;
    } else if (activityDate.isSame(today.clone().subtract(1, 'day'), 'day')) {
      return `Yesterday, ${activityDate.format('h:mm A')}`;
    } else {
      return timeAgo;
    }
  };

  // Handler to manually refresh activities
  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    fetchActivities(true);
  };

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-32"></div>
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-md w-16"></div>
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 p-3.5 rounded-lg border border-gray-200 dark:border-gray-700/50"
              style={{ 
                opacity: 1 - (i * 0.15),
                animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`
              }}
            >
              <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2.5"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mt-6"></div>
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 px-5 py-4 rounded-xl" role="alert">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5"/>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-red-800 dark:text-red-300">Unable to load activities</h4>
            <p className="text-sm mt-1">{error}</p>
          </div>
          <button 
            onClick={handleRefresh}
            className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors" 
            aria-label="Retry loading activities"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // Calculate time categories for grouping
  const hasRecentActivity = activities.some(a => moment(a.timestamp).isAfter(moment().subtract(4, 'hours')));
  
  return (
    <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border relative overflow-hidden">
      {/* Header section */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Recent Activity
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {hasRecentActivity && (
            <span className="flex items-center text-xs font-medium px-5 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full border border-green-100 dark:border-green-800/30">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              Recent
            </span>
          )}
          <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefresh} 
                disabled={refreshing} 
                className="h-12 w-12 rounded-full hover:bg-lightborder dark:hover:bg-primarybox"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="sr-only">Refresh</span>
              </Button>
        </div>
      </div>
      
      {/* Activity list with animations */}
      <AnimatePresence mode="wait">
        <div className="space-y-3 relative z-10">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              const config = getActivityConfig(activity.type);
              
              return (
                <motion.div 
                  key={`${activity.itemId}-${activity.timestamp}`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className={`p-3.5 rounded-lg border ${config.borderColor} ${config.bgColor} transition-all hover:shadow-md`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`h-9 w-9 rounded-full bg-white dark:bg-gray-800 flex-shrink-0 flex items-center justify-center shadow-sm border ${config.borderColor}`}>
                      <span className={config.color}>
                        {config.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-800 dark:text-white text-sm">
                        {activity.message}
                      </p>
                      <div className="flex items-center mt-1.5 text-xs font-medium">
                        <span className={`${config.textColor}`}>
                          {formatTime(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No recent activity</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Check back later for updates</p>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
      {/* View all button */}
      <Link 
        href="/admin/activity" 
        className="mt-6 flex items-center justify-center w-full py-2.5 text-primary hover:text-white text-sm font-medium bg-primary/5 hover:bg-primary dark:bg-primary/10 dark:hover:bg-primary rounded-lg transition-all duration-200 group relative z-10"
      >
        <span>View all activity</span>
        <ChevronRight className="h-4 w-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}