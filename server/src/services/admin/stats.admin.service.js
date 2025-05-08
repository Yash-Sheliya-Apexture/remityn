// // backend/src/services/admin/stats.admin.service.js
// import User from '../../models/User.js';
// import Payment from '../../models/Payment.js';
// import Transfer from '../../models/Transfer.js';
// import moment from 'moment';

// // Helper to get the start of the current week (Monday as the first day)
// const getStartOfWeek = () => {
//     return moment().startOf('isoWeek').toDate();
// };

// // Helper to get date ranges
// const getTodayRange = () => {
//     const startOfToday = moment().startOf('day').toDate();
//     const endOfToday = moment().endOf('day').toDate();
//     return { start: startOfToday, end: endOfToday };
// };

// const getYesterdayRange = () => {
//     const startOfYesterday = moment().subtract(1, 'days').startOf('day').toDate();
//     const endOfYesterday = moment().subtract(1, 'days').endOf('day').toDate();
//     return { start: startOfYesterday, end: endOfYesterday };
// };

// const getCurrentMonthRange = () => {
//     const startOfMonth = moment().startOf('month').toDate();
//     const endOfMonth = moment().endOf('month').toDate();
//     return { start: startOfMonth, end: endOfMonth };
// };

// const getPreviousMonthRange = () => {
//     const startOfPreviousMonth = moment().subtract(1, 'month').startOf('month').toDate();
//     const endOfPreviousMonth = moment().subtract(1, 'month').endOf('month').toDate();
//     return { start: startOfPreviousMonth, end: endOfPreviousMonth };
// };

// const getThirtyDayRange = () => {
//     const endOfToday = moment().endOf('day').toDate();
//     const startOfPeriod = moment().subtract(29, 'days').startOf('day').toDate(); // Last 30 days including today
//     return { start: startOfPeriod, end: endOfToday };
// };

// const getPreviousThirtyDayRange = () => {
//     const endOfPreviousPeriod = moment().subtract(30, 'days').endOf('day').toDate();
//     const startOfPreviousPeriod = moment().subtract(59, 'days').startOf('day').toDate(); // 30 days before the current 30-day period
//     return { start: startOfPreviousPeriod, end: endOfPreviousPeriod };
// };

// const getCorridorAnalysisPeriod = () => {
//     // Analyze corridors over the last 90 days
//     const endOfPeriod = moment().endOf('day').toDate();
//     const startOfPeriod = moment().subtract(89, 'days').startOf('day').toDate();
//     return { start: startOfPeriod, end: endOfPeriod };
// };



// const getDashboardOverviewStats = async () => {
//     try {
//         // --- User Stats ---
//         const totalUsers = await User.countDocuments();
//         const startOfWeek = getStartOfWeek();
//         const usersAtStartOfWeek = await User.countDocuments({ createdAt: { $lt: startOfWeek } });
//         const newUsersThisWeekCount = totalUsers - usersAtStartOfWeek;
//         let growthPercentageThisWeek = 0;
//         if (usersAtStartOfWeek > 0) {
//             growthPercentageThisWeek = (newUsersThisWeekCount / usersAtStartOfWeek) * 100;
//         } else if (newUsersThisWeekCount > 0) {
//             growthPercentageThisWeek = 100.0;
//         }

//         // --- "Add Money" (Payment) Stats ---
//         const todayDateRange = getTodayRange(); // Use consistent naming
//         const yesterdayDateRange = getYesterdayRange(); // Use consistent naming

//         const todaysAddMoneyCount = await Payment.countDocuments({
//             createdAt: { $gte: todayDateRange.start, $lte: todayDateRange.end },
//         });
//         const yesterdaysAddMoneyCount = await Payment.countDocuments({
//             createdAt: { $gte: yesterdayDateRange.start, $lte: yesterdayDateRange.end },
//         });
//         let addMoneyChangePercentage = 0;
//         if (yesterdaysAddMoneyCount > 0) {
//             addMoneyChangePercentage = ((todaysAddMoneyCount - yesterdaysAddMoneyCount) / yesterdaysAddMoneyCount) * 100;
//         } else if (todaysAddMoneyCount > 0) {
//             addMoneyChangePercentage = 100.0;
//         }

//         // --- "Send Money" (Transfer Initiation) Stats ---
//         const todaysSendMoneyCount = await Transfer.countDocuments({
//             createdAt: { $gte: todayDateRange.start, $lte: todayDateRange.end },
//             // status: { $ne: 'canceled' } // Optional: filter out immediately canceled
//         });
//         const yesterdaysSendMoneyCount = await Transfer.countDocuments({
//             createdAt: { $gte: yesterdayDateRange.start, $lte: yesterdayDateRange.end },
//             // status: { $ne: 'canceled' } // Optional: filter out immediately canceled
//         });
//         let sendMoneyChangePercentage = 0;
//         if (yesterdaysSendMoneyCount > 0) {
//             sendMoneyChangePercentage = ((todaysSendMoneyCount - yesterdaysSendMoneyCount) / yesterdaysSendMoneyCount) * 100;
//         } else if (todaysSendMoneyCount > 0) {
//             sendMoneyChangePercentage = 100.0;
//         }

//         // --- "Completed Transfers" Stats ---
//         const currentMonthDateRange = getCurrentMonthRange(); // Use consistent naming
//         const previousMonthDateRange = getPreviousMonthRange(); // Use consistent naming

//         const completedTransfersThisMonth = await Transfer.countDocuments({
//             status: 'completed',
//             updatedAt: { $gte: currentMonthDateRange.start, $lte: currentMonthDateRange.end }
//         });
//         const completedTransfersLastMonth = await Transfer.countDocuments({
//             status: 'completed',
//             updatedAt: { $gte: previousMonthDateRange.start, $lte: previousMonthDateRange.end }
//         });
//         let completedTransfersChangeCount = completedTransfersThisMonth - completedTransfersLastMonth;

//         // --- Transfer Volume Stats (Last 30 Days) ---
//         const currentVolumePeriod = getThirtyDayRange();
//         const previousVolumePeriod = getPreviousThirtyDayRange();

//         const currentPeriodVolumeResult = await Transfer.aggregate([
//             {
//                 $match: {
//                     status: 'completed',
//                     updatedAt: { $gte: currentVolumePeriod.start, $lte: currentVolumePeriod.end }
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     totalVolume: { $sum: "$sendAmount" }
//                 }
//             }
//         ]);
//         const totalVolumeLast30Days = currentPeriodVolumeResult.length > 0 ? currentPeriodVolumeResult[0].totalVolume : 0;

//         const previousPeriodVolumeResult = await Transfer.aggregate([
//             {
//                 $match: {
//                     status: 'completed',
//                     updatedAt: { $gte: previousVolumePeriod.start, $lte: previousVolumePeriod.end }
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     totalVolume: { $sum: "$sendAmount" }
//                 }
//             }
//         ]);
//         const totalVolumePrevious30Days = previousPeriodVolumeResult.length > 0 ? previousPeriodVolumeResult[0].totalVolume : 0;
//         let volumeGrowthPercentage = 0;
//         if (totalVolumePrevious30Days > 0) {
//             volumeGrowthPercentage = ((totalVolumeLast30Days - totalVolumePrevious30Days) / totalVolumePrevious30Days) * 100;
//         } else if (totalVolumeLast30Days > 0) {
//             volumeGrowthPercentage = 100.0;
//         }

//         // --- Popular Corridors Stats (e.g., Last 90 Days) ---
//         const corridorPeriod = getCorridorAnalysisPeriod();
//         const popularCorridorsPipeline = [
//             {
//                 $match: {
//                     status: 'completed',
//                     updatedAt: { $gte: corridorPeriod.start, $lte: corridorPeriod.end }
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'currencies',
//                     localField: 'sendCurrency',
//                     foreignField: '_id',
//                     as: 'sendCurrencyDoc'
//                 }
//             },
//             { $unwind: '$sendCurrencyDoc' },
//             {
//                 $lookup: {
//                     from: 'currencies',
//                     localField: 'receiveCurrency',
//                     foreignField: '_id',
//                     as: 'receiveCurrencyDoc'
//                 }
//             },
//             { $unwind: '$receiveCurrencyDoc' },
//             {
//                 $group: {
//                     _id: {
//                         send: '$sendCurrencyDoc.code',
//                         receive: '$receiveCurrencyDoc.code'
//                     },
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     sendCurrencyCode: '$_id.send',
//                     receiveCurrencyCode: '$_id.receive',
//                     count: '$count'
//                 }
//             },
//             { $sort: { count: -1 } },
//             { $limit: 4 }
//         ];
//         const topCorridorsRaw = await Transfer.aggregate(popularCorridorsPipeline);

//         const totalCompletedTransfersInCorridorPeriod = await Transfer.countDocuments({
//             status: 'completed',
//             updatedAt: { $gte: corridorPeriod.start, $lte: corridorPeriod.end }
//         });

//         const popularCorridors = topCorridorsRaw.map(corridor => ({
//             ...corridor,
//             percentage: totalCompletedTransfersInCorridorPeriod > 0
//                 ? parseFloat(((corridor.count / totalCompletedTransfersInCorridorPeriod) * 100).toFixed(1))
//                 : 0
//         }));


//         // --- NEW: KYC Status Counts ---
//         const kycPendingCount = await User.countDocuments({ 'kyc.status': 'pending' });
//         const kycVerifiedCount = await User.countDocuments({ 'kyc.status': 'verified' });
//         const kycSkippedCount = await User.countDocuments({ 'kyc.status': 'skipped' }); // Assuming 'skipped' is a status you track



//         return {
//             totalUsers,
//             growthPercentageThisWeek: parseFloat(growthPercentageThisWeek.toFixed(1)),
//             todaysAddMoneyCount,
//             addMoneyChangePercentage: parseFloat(addMoneyChangePercentage.toFixed(1)),
//             todaysSendMoneyCount,
//             sendMoneyChangePercentage: parseFloat(sendMoneyChangePercentage.toFixed(1)),
//             completedTransfersThisMonth,
//             completedTransfersChangeCount,
//             totalVolumeLast30Days: parseFloat(totalVolumeLast30Days.toFixed(2)),
//             volumeGrowthPercentage: parseFloat(volumeGrowthPercentage.toFixed(1)),
//             popularCorridors,
//             kycPendingCount,
//             kycVerifiedCount,
//             kycSkippedCount,
//         };
//     } catch (error) {
//         console.error("Error in getDashboardOverviewStats service:", error);
//         // It's better to throw a more generic error or let the controller handle AppError if used.
//         // For this service, a generic error is fine.
//         throw new Error("Failed to fetch dashboard overview statistics.");
//     }
// };

// // --- NEW: Function to get aggregated chart data ---
// const getVolumeChartData = async (type, range) => {
//     console.log(`Service: getVolumeChartData - Type: ${type}, Range: ${range}`);
//     let model;
//     let amountField;
//     let dateField = 'createdAt'; // Default to createdAt
//     let matchStage = {}; // Initial match stage

//     if (type === 'payments') {
//         model = Payment;
//         amountField = '$amountToAdd'; // Or '$amountToPay' if preferred
//         // Optionally add status filter for payments if needed
//          // matchStage = { status: { $in: ['completed', 'in progress'] } };
//     } else if (type === 'transfers') {
//         model = Transfer;
//         amountField = '$sendAmount';
//         // Filter for completed transfers for volume calculation
//         matchStage = { status: 'completed' };
//          // Use updatedAt for transfers as completion time is more relevant for volume
//          dateField = 'updatedAt';
//     } else {
//         throw new Error('Invalid chart type specified.');
//     }

//     let startDate;
//     let groupByFormat;
//     let dateProjectFormat;

//     const now = moment();

//     if (range === 'month') {
//         // Last 30 days (including today)
//         startDate = now.clone().subtract(29, 'days').startOf('day').toDate();
//         groupByFormat = '%Y-%m-%d'; // Group by Day
//         dateProjectFormat = '%Y-%m-%d';
//     } else if (range === 'year') {
//         // Last 12 months (including current month)
//         startDate = now.clone().subtract(11, 'months').startOf('month').toDate();
//         groupByFormat = '%Y-%m'; // Group by Month
//         dateProjectFormat = '%Y-%m-01'; // Represent month as first day for consistency
//     } else {
//         throw new Error('Invalid chart range specified.');
//     }

//     console.log(`Service: getVolumeChartData - Aggregating from date: ${startDate}`);

//     // Add date range to the match stage
//     matchStage[dateField] = { $gte: startDate };

//     const pipeline = [
//         { $match: matchStage },
//         {
//             $group: {
//                 _id: {
//                     // Group by Year-Month or Year-Month-Day based on range
//                     $dateToString: { format: groupByFormat, date: `$${dateField}` }
//                 },
//                 totalVolume: { $sum: amountField }
//             }
//         },
//         {
//             $project: {
//                 _id: 0,
//                 // Format date consistently for the chart's X-axis
//                 date: {
//                      $dateToString: { format: dateProjectFormat, date: { $toDate: "$_id" } }
//                 },
//                 // Ensure volume is a number, default to 0 if sum is null (no data for period)
//                 volume: { $ifNull: ["$totalVolume", 0] }
//             }
//         },
//         { $sort: { date: 1 } } // Sort by date ascending
//     ];

//     try {
//         const results = await model.aggregate(pipeline);
//         console.log(`Service: getVolumeChartData - Aggregation results count: ${results.length}`);

//          // --- Fill missing dates/months with 0 volume ---
//          const filledData = [];
//          let currentDate = moment(startDate);
//          const endDate = moment().endOf(range === 'month' ? 'day' : 'month'); // End of today or this month

//          const resultsMap = new Map(results.map(item => [moment(item.date).format(range === 'month' ? 'YYYY-MM-DD' : 'YYYY-MM'), item.volume]));

//          while (currentDate <= endDate) {
//             const formattedDateKey = currentDate.format(range === 'month' ? 'YYYY-MM-DD' : 'YYYY-MM');
//             const formattedDateOutput = currentDate.format('YYYY-MM-DD'); // Always use YYYY-MM-DD for recharts dataKey

//             filledData.push({
//                 date: formattedDateOutput,
//                 volume: resultsMap.get(formattedDateKey) || 0
//             });

//             if (range === 'month') {
//                 currentDate.add(1, 'day');
//             } else {
//                 currentDate.add(1, 'month');
//             }
//          }
//          // Return only the most recent entries if needed, e.g., last 30 days or 12 months rigorously
//           const finalData = filledData.slice(-(range === 'month' ? 30 : 12));


//          console.log(`Service: getVolumeChartData - Returning ${finalData.length} data points.`);
//         return finalData;

//     } catch (error) {
//         console.error(`Service: getVolumeChartData - Error aggregating data:`, error);
//         throw new Error(`Failed to aggregate chart data for ${type}.`);
//     }
// };


// export default {
//     getDashboardOverviewStats,
//     getVolumeChartData, // <-- Export the new function
// };

// backend/src/services/admin/stats.admin.service.js
import User from '../../models/User.js';
import Payment from '../../models/Payment.js';
import Transfer from '../../models/Transfer.js';
import moment from 'moment';

// Helper to get the start of the current week (Monday as the first day)
const getStartOfWeek = () => {
    return moment().startOf('isoWeek').toDate();
};

// Helper to get date ranges
const getTodayRange = () => {
    const startOfToday = moment().startOf('day').toDate();
    const endOfToday = moment().endOf('day').toDate();
    return { start: startOfToday, end: endOfToday };
};

const getYesterdayRange = () => {
    const startOfYesterday = moment().subtract(1, 'days').startOf('day').toDate();
    const endOfYesterday = moment().subtract(1, 'days').endOf('day').toDate();
    return { start: startOfYesterday, end: endOfYesterday };
};

const getCurrentMonthRange = () => {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();
    return { start: startOfMonth, end: endOfMonth };
};

const getPreviousMonthRange = () => {
    const startOfPreviousMonth = moment().subtract(1, 'month').startOf('month').toDate();
    const endOfPreviousMonth = moment().subtract(1, 'month').endOf('month').toDate();
    return { start: startOfPreviousMonth, end: endOfPreviousMonth };
};


const getCorridorAnalysisPeriod = () => {
    // Analyze corridors over the last 90 days
    const endOfPeriod = moment().endOf('day').toDate();
    const startOfPeriod = moment().subtract(89, 'days').startOf('day').toDate();
    return { start: startOfPeriod, end: endOfPeriod };
};



const getDashboardOverviewStats = async () => {
    try {
        // --- User Stats ---
        const totalUsers = await User.countDocuments();
        const startOfWeek = getStartOfWeek();
        const usersAtStartOfWeek = await User.countDocuments({ createdAt: { $lt: startOfWeek } });
        const newUsersThisWeekCount = totalUsers - usersAtStartOfWeek;
        let growthPercentageThisWeek = 0;
        if (usersAtStartOfWeek > 0) {
            growthPercentageThisWeek = (newUsersThisWeekCount / usersAtStartOfWeek) * 100;
        } else if (newUsersThisWeekCount > 0) {
            growthPercentageThisWeek = 100.0;
        }

        // --- "Add Money" (Payment) Stats ---
        const todayDateRange = getTodayRange(); // Use consistent naming
        const yesterdayDateRange = getYesterdayRange(); // Use consistent naming

        const todaysAddMoneyCount = await Payment.countDocuments({
            createdAt: { $gte: todayDateRange.start, $lte: todayDateRange.end },
        });
        const yesterdaysAddMoneyCount = await Payment.countDocuments({
            createdAt: { $gte: yesterdayDateRange.start, $lte: yesterdayDateRange.end },
        });
        let addMoneyChangePercentage = 0;
        if (yesterdaysAddMoneyCount > 0) {
            addMoneyChangePercentage = ((todaysAddMoneyCount - yesterdaysAddMoneyCount) / yesterdaysAddMoneyCount) * 100;
        } else if (todaysAddMoneyCount > 0) {
            addMoneyChangePercentage = 100.0;
        }

        // --- "Send Money" (Transfer Initiation) Stats ---
        const todaysSendMoneyCount = await Transfer.countDocuments({
            createdAt: { $gte: todayDateRange.start, $lte: todayDateRange.end },
            // status: { $ne: 'canceled' } // Optional: filter out immediately canceled
        });
        const yesterdaysSendMoneyCount = await Transfer.countDocuments({
            createdAt: { $gte: yesterdayDateRange.start, $lte: yesterdayDateRange.end },
            // status: { $ne: 'canceled' } // Optional: filter out immediately canceled
        });
        let sendMoneyChangePercentage = 0;
        if (yesterdaysSendMoneyCount > 0) {
            sendMoneyChangePercentage = ((todaysSendMoneyCount - yesterdaysSendMoneyCount) / yesterdaysSendMoneyCount) * 100;
        } else if (todaysSendMoneyCount > 0) {
            sendMoneyChangePercentage = 100.0;
        }

        // --- "Completed Transfers" Stats ---
        const currentMonthDateRange = getCurrentMonthRange(); // Use consistent naming
        const previousMonthDateRange = getPreviousMonthRange(); // Use consistent naming

        const completedTransfersThisMonth = await Transfer.countDocuments({
            status: 'completed',
            updatedAt: { $gte: currentMonthDateRange.start, $lte: currentMonthDateRange.end }
        });
        const completedTransfersLastMonth = await Transfer.countDocuments({
            status: 'completed',
            updatedAt: { $gte: previousMonthDateRange.start, $lte: previousMonthDateRange.end }
        });
        let completedTransfersChangeCount = completedTransfersThisMonth - completedTransfersLastMonth;

        // --- Popular Corridors Stats (e.g., Last 90 Days) ---
        const corridorPeriod = getCorridorAnalysisPeriod();
        const popularCorridorsPipeline = [
            {
                $match: {
                    status: 'completed',
                    updatedAt: { $gte: corridorPeriod.start, $lte: corridorPeriod.end }
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'sendCurrency',
                    foreignField: '_id',
                    as: 'sendCurrencyDoc'
                }
            },
            { $unwind: '$sendCurrencyDoc' },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'receiveCurrency',
                    foreignField: '_id',
                    as: 'receiveCurrencyDoc'
                }
            },
            { $unwind: '$receiveCurrencyDoc' },
            {
                $group: {
                    _id: {
                        send: '$sendCurrencyDoc.code',
                        receive: '$receiveCurrencyDoc.code'
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    sendCurrencyCode: '$_id.send',
                    receiveCurrencyCode: '$_id.receive',
                    count: '$count'
                }
            },
            { $sort: { count: -1 } },
            { $limit: 4 }
        ];
        const topCorridorsRaw = await Transfer.aggregate(popularCorridorsPipeline);

        const totalCompletedTransfersInCorridorPeriod = await Transfer.countDocuments({
            status: 'completed',
            updatedAt: { $gte: corridorPeriod.start, $lte: corridorPeriod.end }
        });

        const popularCorridors = topCorridorsRaw.map(corridor => ({
            ...corridor,
            percentage: totalCompletedTransfersInCorridorPeriod > 0
                ? parseFloat(((corridor.count / totalCompletedTransfersInCorridorPeriod) * 100).toFixed(1))
                : 0
        }));


        // --- UPDATED: KYC Status Counts (fetch all 5) ---
        const kycNotStartedCount = await User.countDocuments({ 'kyc.status': 'not_started' });
        const kycPendingCount = await User.countDocuments({ 'kyc.status': 'pending' });
        const kycVerifiedCount = await User.countDocuments({ 'kyc.status': 'verified' });
        const kycRejectedCount = await User.countDocuments({ 'kyc.status': 'rejected' });
        const kycSkippedCount = await User.countDocuments({ 'kyc.status': 'skipped' });
        // --- END UPDATED ---


        return {
            totalUsers,
            growthPercentageThisWeek: parseFloat(growthPercentageThisWeek.toFixed(1)),
            todaysAddMoneyCount,
            addMoneyChangePercentage: parseFloat(addMoneyChangePercentage.toFixed(1)),
            todaysSendMoneyCount,
            sendMoneyChangePercentage: parseFloat(sendMoneyChangePercentage.toFixed(1)),
            completedTransfersThisMonth,
            completedTransfersChangeCount,
            popularCorridors,
            // Updated KYC counts
            kycNotStartedCount, // Added
            kycPendingCount,
            kycVerifiedCount,
            kycRejectedCount, // Added
            kycSkippedCount,
        };
    } catch (error) {
        console.error("Error in getDashboardOverviewStats service:", error);
        // It's better to throw a more generic error or let the controller handle AppError if used.
        // For this service, a generic error is fine.
        throw new Error("Failed to fetch dashboard overview statistics.");
    }
};

// --- NEW: Function to get aggregated chart data ---
const getVolumeChartData = async (type, range) => {
    console.log(`Service: getVolumeChartData - Type: ${type}, Range: ${range}`);
    let model;
    let amountField;
    let dateField = 'createdAt'; // Default to createdAt
    let matchStage = {}; // Initial match stage

    if (type === 'payments') {
        model = Payment;
        amountField = '$amountToAdd'; // Or '$amountToPay' if preferred
        // Optionally add status filter for payments if needed
        // matchStage = { status: { $in: ['completed', 'in progress'] } };
    } else if (type === 'transfers') {
        model = Transfer;
        amountField = '$sendAmount';
        // Filter for completed transfers for volume calculation
        matchStage = { status: 'completed' };
        // Use updatedAt for transfers as completion time is more relevant for volume
        dateField = 'updatedAt';
    } else {
        throw new Error('Invalid chart type specified.');
    }

    let startDate;
    let groupByFormat;
    let dateProjectFormat;

    const now = moment();

    if (range === 'month') {
        // Last 30 days (including today)
        startDate = now.clone().subtract(29, 'days').startOf('day').toDate();
        groupByFormat = '%Y-%m-%d'; // Group by Day
        dateProjectFormat = '%Y-%m-%d';
    } else if (range === 'year') {
        // Last 12 months (including current month)
        startDate = now.clone().subtract(11, 'months').startOf('month').toDate();
        groupByFormat = '%Y-%m'; // Group by Month
        dateProjectFormat = '%Y-%m-01'; // Represent month as first day for consistency
    } else {
        throw new Error('Invalid chart range specified.');
    }

    console.log(`Service: getVolumeChartData - Aggregating from date: ${startDate}`);

    // Add date range to the match stage
    matchStage[dateField] = { $gte: startDate };

    const pipeline = [
        { $match: matchStage },
        {
            $group: {
                _id: {
                    // Group by Year-Month or Year-Month-Day based on range
                    $dateToString: { format: groupByFormat, date: `$${dateField}` }
                },
                totalVolume: { $sum: amountField }
            }
        },
        {
            $project: {
                _id: 0,
                // Format date consistently for the chart's X-axis
                date: {
                    $dateToString: { format: dateProjectFormat, date: { $toDate: "$_id" } }
                },
                // Ensure volume is a number, default to 0 if sum is null (no data for period)
                volume: { $ifNull: ["$totalVolume", 0] }
            }
        },
        { $sort: { date: 1 } } // Sort by date ascending
    ];

    try {
        const results = await model.aggregate(pipeline);
        console.log(`Service: getVolumeChartData - Aggregation results count: ${results.length}`);

        // --- Fill missing dates/months with 0 volume ---
        const filledData = [];
        let currentDate = moment(startDate);
        const endDate = moment().endOf(range === 'month' ? 'day' : 'month'); // End of today or this month

        const resultsMap = new Map(results.map(item => [moment(item.date).format(range === 'month' ? 'YYYY-MM-DD' : 'YYYY-MM'), item.volume]));

        while (currentDate <= endDate) {
            const formattedDateKey = currentDate.format(range === 'month' ? 'YYYY-MM-DD' : 'YYYY-MM');
            const formattedDateOutput = currentDate.format('YYYY-MM-DD'); // Always use YYYY-MM-DD for recharts dataKey

            filledData.push({
                date: formattedDateOutput,
                volume: resultsMap.get(formattedDateKey) || 0
            });

            if (range === 'month') {
                currentDate.add(1, 'day');
            } else {
                currentDate.add(1, 'month');
            }
        }
        // Return only the most recent entries if needed, e.g., last 30 days or 12 months rigorously
        const finalData = filledData.slice(-(range === 'month' ? 30 : 12));


        console.log(`Service: getVolumeChartData - Returning ${finalData.length} data points.`);
        return finalData;

    } catch (error) {
        console.error(`Service: getVolumeChartData - Error aggregating data:`, error);
        throw new Error(`Failed to aggregate chart data for ${type}.`);
    }
};


export default {
    getDashboardOverviewStats,
    getVolumeChartData, // <-- Export the new function
};