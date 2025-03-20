import express from 'express';
import authController from '../controllers/auth.controller.js';
import authValidators from '../validators/auth.validators.js';

const router = express.Router();

// POST /api/auth/register - Register a new user (public route)
router.post('/register', authValidators.validateRegister, authController.register); // Apply validation middleware before controller

// POST /api/auth/login - Login user and get JWT token (public route)
router.post('/login', authValidators.validateLogin, authController.login); // Apply validation middleware

export default router;