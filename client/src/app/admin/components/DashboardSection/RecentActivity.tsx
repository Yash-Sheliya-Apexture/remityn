import React from 'react';

export default function RecentActivity() {
  return (
    <div className="lg:w-2/3 w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-start border-b pb-3 last:border-b-0 last:pb-0">
            {/* Using a placeholder background color instead of primary to avoid specific color dependency */}
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                {/* Replace with actual icon or initials if available */}
                {item}
              </span>
            </div>
            <div className="ml-4">
              <p className="font-medium text-neutral-900 dark:text-white">
                New user registered:{" "}
                {item === 1
                  ? "Sarah Johnson"
                  : item === 2
                  ? "Michael Lee"
                  : item === 3
                  ? "David Chen"
                  : "Emma Wilson"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                {item} hour{item !== 1 ? "s" : ""} ago
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
        View all activity →
      </button>
    </div>
  );
}