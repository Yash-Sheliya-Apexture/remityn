// import express from 'express';
// import adminUserController from '../../controllers/admin/user.admin.controller.js';
// import authMiddleware from '../../middleware/auth.middleware.js';

// const router = express.Router();

// // GET /api/admin/users - Get all users (Admin only, protected route)
// router.get('/', authMiddleware.protect, authMiddleware.admin, adminUserController.getAllUsersAdmin); // Requires authentication and admin role

// // Add more admin user routes here (e.g., create, update, delete user by admin)

// export default router;

// import express from 'express';
// import adminUserController from '../../controllers/admin/user.admin.controller.js';
// import authMiddleware from '../../middleware/auth.middleware.js';

// const router = express.Router();

// // GET /api/admin/users - Get all users (Admin only, protected route)
// router.get('/', authMiddleware.protect, authMiddleware.admin, adminUserController.getAllUsersAdmin); // Requires authentication and admin role

// // Add more admin user routes here (e.g., create, update, delete user by admin)

// export default router;



// backend/routes/admin/user.admin.routes.js
import express from 'express';
import adminUserController from '../../controllers/admin/user.admin.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js'; // Assuming middleware needed

const router = express.Router();

// --- Route for getting ALL users (You likely have this) ---
router.get(
    '/',
    authMiddleware.protect,
    authMiddleware.admin,
    adminUserController.getAllUsersAdmin
);

// --- !!! CHECK THIS ROUTE !!! ---
// Make sure you have a route like this to handle GET requests with an ID
router.get(
    '/:userId',         // <<< Does this route exist? Does it use :userId?
    authMiddleware.protect,
    authMiddleware.admin,
    adminUserController.getUserDetailsAdmin // <<< Is this controller function defined and imported?
);

// Add more admin user routes here (e.g., update, delete user by admin)

export default router;