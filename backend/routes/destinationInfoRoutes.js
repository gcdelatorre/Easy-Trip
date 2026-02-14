import express from 'express';
import * as destinationInfoController from '../controllers/destinationInfoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(protect);

router.get('/:country', apiLimiter, destinationInfoController.getDestinationInfoByCountry);

export default router;