import express from 'express';
import paymentAdminController from '../../controllers/admin/payment.admin.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();

// Admin update payment status
router.put('/:paymentId/status', authMiddleware.protect, authMiddleware.admin, paymentAdminController.updatePaymentStatusAdmin);

export default router;