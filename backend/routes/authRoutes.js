import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/google', authController.googleLogin);
router.post('/logout', authController.logout);
router.post('/register', authController.register)
router.post('/login', authController.login)

export default router;
