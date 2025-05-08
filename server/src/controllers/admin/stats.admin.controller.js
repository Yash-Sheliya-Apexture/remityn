// backend/src/controllers/admin/stats.admin.controller.js
import statsAdminService from '../../services/admin/stats.admin.service.js';
import AppError from '../../utils/AppError.js'; // If you use it for specific error handling

const getDashboardOverview = async (req, res, next) => {
  try {
    const stats = await statsAdminService.getDashboardOverviewStats();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    // Pass error to the global error handler
    next(error);
  }
};

// --- NEW: Controller for chart data ---
const getVolumeChartData = async (req, res, next) => {
  try {
      const { type, range } = req.query; // Get type (payments/transfers) and range (month/year) from query params

      if (!type || !range || !['payments', 'transfers'].includes(type) || !['month', 'year'].includes(range)) {
           return res.status(400).json({ success: false, message: 'Invalid or missing chart type or range parameters.' });
      }

      const chartData = await statsAdminService.getVolumeChartData(type, range);
      res.status(200).json({ success: true, data: chartData });

  } catch (error) {
       console.error("Controller: getVolumeChartData - Error:", error);
       // Don't expose internal errors directly in production
       res.status(500).json({ success: false, message: 'Failed to retrieve chart data.' });
       // Or use next(error) if your global handler is configured well
       // next(error);
  }
};
// --- END NEW ---

export default {
  getDashboardOverview,
  getVolumeChartData, // <-- Export the new function
};