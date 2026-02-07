import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/google', authController.googleLogin);
router.post('/logout', authController.logout);

export default router;
