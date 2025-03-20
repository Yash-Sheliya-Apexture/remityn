import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// GET /api/dashboard/users - Get all users (protected route, accessible to logged-in users - adjust access control as needed)
router.get('/', userController.getAllUsers); // Protected at the server.js level - authMiddleware.protect is applied to /api/dashboard/users in server.js
// GET /api/dashboard/users/:userId - Get user by ID (protected route)
router.get('/:userId', userController.getUserById); // Protected at the server.js level

// Add more user routes here (e.g., update profile, etc.) - remember to protect them with authMiddleware.protect as needed

export default router;