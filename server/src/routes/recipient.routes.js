// backend/src/routes/recipient.routes.js
import express from 'express';
import recipientController from '../controllers/recipient.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware.protect, recipientController.addRecipient); // Add new recipient
router.get('/', authMiddleware.protect, recipientController.getUserRecipients); // Get user's recipients
router.get('/:recipientId', authMiddleware.protect, recipientController.getRecipientById); // Get recipient by ID
router.put('/:recipientId', authMiddleware.protect, recipientController.updateRecipient); // Update recipient details (like nickname)
router.delete('/:recipientId', authMiddleware.protect, recipientController.deleteRecipient); // Delete recipient

export default router;