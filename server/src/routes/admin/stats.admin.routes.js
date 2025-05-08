// backend/src/routes/admin/stats.admin.routes.js
import express from 'express';
import statsAdminController from '../../controllers/admin/stats.admin.controller.js';
// The authMiddleware (protect, admin) will be applied in server.js for the base path

const router = express.Router();

// GET /api/admin/stats/overview
router.get(
  '/overview',
  statsAdminController.getDashboardOverview
);

// --- NEW: Route for chart data ---
router.get('/chart-data', statsAdminController.getVolumeChartData);
// --- END NEW ---

export default router;