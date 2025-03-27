// backend/src/routes/ifsc.routes.js
import express from 'express';
import ifscController from '../controllers/ifsc.controller.js';

const router = express.Router();

router.get('/:ifscCode', ifscController.getBankDetailsByIFSC);

export default router;