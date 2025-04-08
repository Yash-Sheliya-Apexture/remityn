// import express from 'express';
// import adminUserController from '../../controllers/admin/user.admin.controller.js';
// import authMiddleware from '../../middleware/auth.middleware.js';

// const router = express.Router();

// // GET /api/admin/users - Get all users (Admin only, protected route)
// router.get('/', authMiddleware.protect, authMiddleware.admin, adminUserController.getAllUsersAdmin); // Requires authentication and admin role

// // Add more admin user routes here (e.g., create, update, delete user by admin)

// export default router;

import express from 'express';
import adminUserController from '../../controllers/admin/user.admin.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();

// GET /api/admin/users - Get all users (Admin only, protected route)
router.get('/', authMiddleware.protect, authMiddleware.admin, adminUserController.getAllUsersAdmin); // Requires authentication and admin role

// Add more admin user routes here (e.g., create, update, delete user by admin)

export default router;
