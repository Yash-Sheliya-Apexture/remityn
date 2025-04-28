import React from 'react';
import {
  DollarSign,
  BarChart,
  ArrowUpRight,
  MapPin,
  RefreshCw,
  ArrowDownRight,
} from "lucide-react";

export default function TransferInsights() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
        Transfer Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Transfer Volume */}
        <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
              Transfer Volume
            </h4>
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <div className="h-40 bg-gray-50 dark:bg-white/5 rounded-lg flex items-center justify-center">
            {/* Placeholder for actual chart */}
            <BarChart className="h-24 w-24 text-gray-400" />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Total Volume
              </p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                $1,245,678
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Growth
              </p>
              <p className="text-lg font-semibold text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                15.2%
              </p>
            </div>
          </div>
        </div>

        {/* Popular Corridors */}
        <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
              Popular Corridors
            </h4>
            <MapPin className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    US
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    US → Mexico
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    USD to MXN
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                32%
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    UK
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    UK → India
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    GBP to INR
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                24%
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-purple-100 dark:bg-purple-800/30 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                    CA
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    Canada → Philippines
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    CAD to PHP
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                18%
              </p>
            </div>
          </div>
          <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
            View all corridors →
          </button>
        </div>

        {/* Currency Performance */}
        <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
              Currency Performance
            </h4>
            <RefreshCw className="h-5 w-5 text-purple-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    USD
                  </span>
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  US Dollar
                </p>
              </div>
              <p className="text-sm font-semibold text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                1.2%
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    EUR
                  </span>
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  Euro
                </p>
              </div>
              <p className="text-sm font-semibold text-red-500 flex items-center">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                0.5%
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                    GBP
                  </span>
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  British Pound
                </p>
              </div>
              <p className="text-sm font-semibold text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                0.8%
              </p>
            </div>
          </div>
          <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
            Currency management →
          </button>
        </div>
      </div>
    </div>
  );
}