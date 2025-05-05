// backend/src/routes/admin/inbox.admin.routes.js
import express from 'express';
import inboxAdminController from '../../controllers/admin/inbox.admin.controller.js';

const router = express.Router();

// Note: authMiddleware.protect and authMiddleware.admin are applied in server.js

// GET /api/admin/inbox - Get all messages (with pagination/filtering)
router.get('/', inboxAdminController.getAllMessages); // Base is /api/admin/inbox

// PUT /api/admin/inbox/:messageId - Update a specific message by ID
router.put('/:messageId', inboxAdminController.updateMessageById); // Base is /api/admin/inbox

// DELETE /api/admin/inbox/:messageId - Delete a specific message by ID
router.delete('/:messageId', inboxAdminController.deleteMessageById); // Base is /api/admin/inbox

// NO POST route here (it's now in user.admin.routes.js)

export default router;