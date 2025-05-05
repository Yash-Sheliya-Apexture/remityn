// backend/src/routes/admin/inbox.admin.routes.js
import express from 'express';
import inboxAdminController from '../../controllers/admin/inbox.admin.controller.js';
// Middleware is applied in server.js for this route, but can be added here too for clarity
// import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();

// Note: authMiddleware.protect and authMiddleware.admin are likely applied
// in server.js where this router is mounted at /api/admin/inbox

// GET /api/admin/inbox - Get all messages (with pagination/filtering)
router.get('/', inboxAdminController.getAllMessages);

// PUT /api/admin/inbox/:messageId - Update a specific message by ID
router.put('/:messageId', inboxAdminController.updateMessageById); // <-- ADD THIS LINE

// DELETE /api/admin/inbox/:messageId - Delete a specific message by ID
router.delete('/:messageId', inboxAdminController.deleteMessageById);

// Important Note: The route for sending a message to a SPECIFIC user (POST /api/admin/users/:userId/inbox)
// should remain in its own dedicated route file (e.g., `user.admin.routes.js` or similar)
// OR be handled carefully if merged here, perhaps as POST /:userId - but separating is cleaner.
// The current structure where POST / is in user.admin.routes and these GET/PUT/DELETE are here is fine.

export default router;