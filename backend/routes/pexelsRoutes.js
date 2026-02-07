import express from 'express';
import * as pexelsController from "../controllers/pexelsController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get("/", pexelsController.getBackgroundPhoto)

export default router;