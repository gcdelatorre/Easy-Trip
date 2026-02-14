import express from 'express';
import * as authController from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(authLimiter);

router.post('/google', authController.googleLogin);
router.post('/logout', authController.logout);
router.post('/register', authController.register)
router.post('/login', authController.login)

export default router;
