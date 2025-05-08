// // frontend/src/components/DashboardSection/VolumeChart.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import statsAdminService, { ChartDataPoint, ChartType, ChartRange } from '../../../services/admin/stats.admin'; // Adjust path
// import moment from 'moment'; // <-- ADD THIS IMPORT

// // Define props for the reusable chart
// interface VolumeChartProps {
//     title: string;
//     description: string;
//     chartType: ChartType; // 'payments' or 'transfers'
//     initialRange?: ChartRange; // Default range
//     yAxisLabel?: string; // e.g., "Volume" or "Amount"
//     dataKey?: string; // e.g., 'volume' (key in ChartDataPoint)
//     fillColorVar?: string; // e.g., "hsl(var(--chart-1))" or define custom CSS var
// }

// // Default chart config (can be overridden or extended if needed)
// const defaultChartConfig = {
//   volume: {
//     label: "Volume",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

// export function VolumeChart({
//     title,
//     description,
//     chartType,
//     initialRange = 'month',
//     yAxisLabel = "Volume", // Default Y-axis label
//     dataKey = "volume",    // Default data key
//     fillColorVar = "hsl(var(--chart-1))", // Default fill color
// }: VolumeChartProps) {
//   const [timeRange, setTimeRange] = useState<ChartRange>(initialRange);
//   const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Data fetching logic
//   const fetchData = useCallback(async (range: ChartRange) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await statsAdminService.getAdminChartData(chartType, range);
//       setChartData(data);
//     } catch (err: any) {
//       setError(err.message || `Failed to load ${chartType} data.`);
//       setChartData([]);
//       console.error(`Error fetching ${chartType} chart data (${range}):`, err);
//     } finally {
//       setLoading(false);
//     }
//   }, [chartType]);

//   // Fetch data on mount and when timeRange changes
//   useEffect(() => {
//     fetchData(timeRange);
//   }, [timeRange, fetchData]);


//   // Memoize processed data for the chart and total calculation
//   const processedData = useMemo(() => chartData, [chartData]);
//   const totalVolume = useMemo(
//     () => processedData.reduce((acc, curr) => acc + (curr[dataKey as keyof ChartDataPoint] as number || 0), 0), // Use dataKey dynamically
//     [processedData, dataKey]
//   );

//    // Dynamic chart config based on props
//    const dynamicChartConfig = useMemo(() => ({
//         [dataKey]: { label: yAxisLabel, color: fillColorVar },
//     // Merge with default if necessary, or keep simple if only one data key is used per chart
//     }), [dataKey, yAxisLabel, fillColorVar]);


//   // Format currency (simple version)
//   const formatAsCurrency = (value: number) => {
//      if (isNaN(value)) return 'N/A'; // Handle NaN
//      if (value >= 1000 && value % 1 === 0) {
//          return value.toLocaleString();
//      }
//      return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
//    };

//   return (
//     <Card className="flex flex-col h-full bg-primarybox">
//       <CardHeader className="flex-shrink-0">
//         <div className="flex flex-wrap justify-between items-start gap-2 pt-3 px-3"> {/* Added flex-wrap */}
//              <div className='mb-2 sm:mb-0'> {/* Added margin for spacing on small screens */}
//                  <CardTitle>{title}</CardTitle>
//                  <CardDescription>{description}</CardDescription>
//              </div>
//              <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as ChartRange)} className="flex-shrink-0">
//                  <TabsList className="grid w-full grid-cols-2 h-9">
//                      <TabsTrigger value="month" className="h-7 text-xs px-2">Last Month</TabsTrigger>
//                      <TabsTrigger value="year" className="h-7 text-xs px-2">Last Year</TabsTrigger>
//                  </TabsList>
//              </Tabs>
//          </div>
//       </CardHeader>
//       <CardContent className="flex-grow flex flex-col px-2 pb-4 sm:px-6 sm:pb-6">
//          {loading && (
//             <div className="flex-grow flex flex-col justify-center items-center space-y-4">
//                 <Skeleton className="h-[180px] w-full rounded-md" />
//                 <Skeleton className="h-6 w-1/2 rounded-md" />
//             </div>
//          )}
//          {error && !loading && (
//              <div className="flex-grow flex justify-center items-center text-center text-red-600 p-4">
//                  <p className='text-sm'>Error loading chart data: <br/> <span className='text-xs'>{error}</span></p>
//              </div>
//          )}
//          {!loading && !error && processedData.length === 0 && (
//              <div className="flex-grow flex justify-center items-center text-center text-gray-500 dark:text-gray-400">
//                  <p className='text-sm'>No data available for the selected period.</p>
//              </div>
//          )}
//          {!loading && !error && processedData.length > 0 && (
//             <>
//                 <div className="text-xl sm:text-2xl font-bold mb-2 text-center text-neutral-900 dark:text-white">
//                      {/* Assuming '$' prefix, adjust if needed */}
//                      ${totalVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
//                     <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
//                         Total ({timeRange === 'month' ? '30d' : '12m'})
//                     </span>
//                 </div>
//                 <ChartContainer
//                   config={dynamicChartConfig}
//                   className="aspect-auto h-[200px] w-full flex-grow"
//                 >
//                   <ResponsiveContainer width="100%" height="100%">
//                       <BarChart accessibilityLayer data={processedData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
//                         <CartesianGrid vertical={false} strokeDasharray="3 3" />
//                         <XAxis
//                           dataKey="date"
//                           tickLine={false}
//                           axisLine={false}
//                           tickMargin={8}
//                           minTickGap={timeRange === 'month' ? 5 : 20}
//                           tickFormatter={(value) => {
//                             // Use moment for reliable parsing and formatting
//                             const date = moment(value, "YYYY-MM-DD"); // Specify input format
//                             if (!date.isValid()) return '';
//                             return timeRange === 'month'
//                                 ? date.format("D MMM") // e.g., 15 May
//                                 : date.format("MMM"); // e.g., May
//                           }}
//                         />
//                         <ChartTooltip
//                            cursor={false}
//                            content={
//                             <ChartTooltipContent
//                               labelFormatter={(label) => moment(label, "YYYY-MM-DD").format(timeRange === 'month' ? 'MMM DD, YYYY' : 'MMM YYYY')} // Specify input format
//                               formatter={(value) => `$${formatAsCurrency(value as number)}`}
//                               indicator="dot"
//                             />
//                           }
//                         />
//                         <Bar
//                            dataKey={dataKey}
//                            fill={fillColorVar}
//                            radius={4}
//                          />
//                       </BarChart>
//                    </ResponsiveContainer>
//                 </ChartContainer>
//              </>
//          )}
//       </CardContent>
//     </Card>
//   );
// }


// frontend/src/components/DashboardSection/VolumeChart.tsx
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChartIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import statsAdminService, { ChartDataPoint, ChartType, ChartRange } from '../../../services/admin/stats.admin';
import moment from 'moment';

// Define props for the reusable chart
interface VolumeChartProps {
    title: string;
    description: string;
    chartType: ChartType;
    initialRange?: ChartRange;
    yAxisLabel?: string;
    dataKey?: string;
    fillColorVar?: string;
    showRefreshButton?: boolean;
    className?: string;
}

export function VolumeChart({
    title,
    description,
    chartType,
    initialRange = 'month',
    yAxisLabel = "Volume",
    dataKey = "volume",
    fillColorVar = "#adfa1c",
    showRefreshButton = true,
    className = "",
}: VolumeChartProps) {
  // State management
  const [timeRange, setTimeRange] = useState<ChartRange>(initialRange);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic chart config based on props
  const chartConfig = useMemo<ChartConfig>(() => ({
    [dataKey]: { label: yAxisLabel, color: fillColorVar },
  }), [dataKey, yAxisLabel, fillColorVar]);

  // Data fetching logic
  const fetchData = useCallback(async (range: ChartRange) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await statsAdminService.getAdminChartData(chartType, range);
      setChartData(data);
    } catch (err: any) {
      setError(err.message || `Failed to load ${chartType} data.`);
      setChartData([]);
      console.error(`Error fetching ${chartType} chart data (${range}):`, err);
    } finally {
      setLoading(false);
    }
  }, [chartType]);

  // Fetch data on mount and when timeRange changes
  useEffect(() => {
    fetchData(timeRange);
  }, [timeRange, fetchData]);

  // Handle refresh button click
  const handleRefresh = () => {
    fetchData(timeRange);
  };

  // Calculate total volume
  const totalVolume = useMemo(
    () => chartData.reduce((acc, curr) => acc + (curr[dataKey as keyof ChartDataPoint] as number || 0), 0),
    [chartData, dataKey]
  );

  // Format currency with appropriate scale
  const formatCurrency = (value: number) => {
    if (isNaN(value)) return 'N/A';
    
    // Scale based on size
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format dates based on time range
  const formatDate = (dateString: string, format: 'tooltip' | 'axis') => {
    const date = moment(dateString, "YYYY-MM-DD");
    if (!date.isValid()) return '';
    
    if (format === 'tooltip') {
      return timeRange === 'month' 
        ? date.format('MMM DD, YYYY') 
        : date.format('MMM YYYY');
    }
    
    return timeRange === 'month'
      ? date.format("D MMM")
      : date.format("MMM");
  };

  return (
    <Card className={`flex flex-col h-full bg-[oklch(1_0_0/10.2%)] ${className}`}>
      <CardHeader className="flex-shrink-0 p-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-12 h-12 bg-lightgray dark:bg-primarybox rounded-full">
            <BarChartIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <CardDescription className="text-xs">{description}</CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showRefreshButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefresh} 
                disabled={loading} 
                className="h-8 w-8"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="sr-only">Refresh</span>
              </Button>
            )}
            
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as ChartRange)}>
              <TabsList className="grid w-full grid-cols-2 h-8">
                <TabsTrigger value="month" className="h-7 text-xs px-2">30 Days</TabsTrigger>
                <TabsTrigger value="year" className="h-7 text-xs px-2">12 Months</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col px-2 pb-4 pt-0 sm:px-4 sm:pb-6">
        {loading && (
          <div className="flex-grow flex flex-col justify-center items-center space-y-4">
            <Skeleton className="h-[180px] w-full rounded-md" />
            <Skeleton className="h-6 w-1/2 rounded-md" />
          </div>
        )}
        
        {error && !loading && (
          <div className="flex-grow flex justify-center items-center text-center p-4">
            <div className="text-red-500 dark:text-red-400">
              <p className="text-sm font-medium">Error loading chart data</p>
              <p className="text-xs mt-1">{error}</p>
              <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-3">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        )}
        
        {!loading && !error && chartData.length === 0 && (
          <div className="flex-grow flex justify-center items-center text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">No data available for the selected period.</p>
          </div>
        )}
        
        {!loading && !error && chartData.length > 0 && (
          <>
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="text-2xl sm:text-3xl font-bold text-[oklch(0.9_0.2334_128.99)]">
                {formatCurrency(totalVolume)}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">
                  Total {timeRange === 'month' ? '30 days' : '12 months'}
                </span>
                <Badge variant="outline" className="text-xs font-normal bg-[oklch(0.44_0_0)] text-white">
                  {chartType === 'payments' ? 'Payments' : 'Transfers'}
                </Badge>
              </div>
            </div>
            
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[200px] w-full flex-grow"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                  barGap={2}
                  barSize={timeRange === 'month' ? 12 : 24}
                >
                  <CartesianGrid 
                    vertical={false} 
                    strokeDasharray="3 3" 
                    strokeOpacity={0.7}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={timeRange === 'month' ? 5 : 20}
                    tickFormatter={(value) => formatDate(value, 'axis')}
                    fontSize={12}
                  />
                  <ChartTooltip
                    cursor={{ fill: 'oklch(0.9 0.2334 128.99 / 10%)', opacity: 0.3 }}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => formatDate(label, 'tooltip')}
                        formatter={(value) => formatCurrency(value as number)}
                        indicator="dot"
                      />
                    }
                  />
                  <Bar
                    dataKey={dataKey}
                    fill={fillColorVar}
                    radius={[4, 4, 0, 0]}
                    animationDuration={300}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </>
        )}
        

      </CardContent>
    </Card>
  );
}