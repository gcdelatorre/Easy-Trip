import express from 'express';
import * as destinationInfoController from '../controllers/destinationInfoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/:country', destinationInfoController.getDestinationInfoByCountry);

export default router;