import React from 'react';
import {
  Activity,
  Users,
  Globe,
  TrendingUp,
  Settings,
} from "lucide-react";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Users Card */}
      <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-medium text-neutral-900 dark:text-white">
              Total Users
            </p>
            <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
              150
            </h3>
            <p className="text-sm text-green-600 flex items-center mt-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% this week</span>
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-600/20 p-3 rounded-lg">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Today's Add Money Card */}
      <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-medium text-neutral-900 dark:text-white">
              Today's Add Money
            </p>
            <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
              32
            </h3>
            <p className="text-sm text-yellow-600 flex items-center mt-2">
              <Activity className="h-4 w-4 mr-1" />
              <span>-5% from yesterday</span>
            </p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-600/20 p-3 rounded-lg">
            <Activity className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Today's Send Money Card */}
      <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-medium text-neutral-900 dark:text-white">
              Today's Send Money
            </p>
            <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
              98%
            </h3>
            <p className="text-sm text-green-600 flex items-center mt-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>All systems operational</span>
            </p>
          </div>
          <div className="bg-green-100 dark:bg-green-600/20 p-3 rounded-lg">
            <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Completed Transfers Card */}
      <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-medium text-neutral-900 dark:text-white">
              Completed Transfers
            </p>
            <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
              45
            </h3>
            <p className="text-sm text-green-600 flex items-center mt-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+3 this month</span>
            </p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-600/20 p-3 rounded-lg">
            <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
}