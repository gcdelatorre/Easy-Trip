import express from 'express';
import * as pexelsController from "../controllers/pexelsController.js";
import { protect } from '../middleware/authMiddleware.js';
import { pexelLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(protect);

router.get("/", pexelLimiter, pexelsController.getBackgroundPhoto)

export default router;