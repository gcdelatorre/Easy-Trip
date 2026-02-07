import express from 'express';
import * as travelPlanController from '../controllers/travelPlanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protection to all travel plan routes
router.use(protect);

router.post('/generate', travelPlanController.generatePlan);
router.get('/', travelPlanController.getAllPlans);
router.get('/:id', travelPlanController.getPlanById);
router.delete('/:id', travelPlanController.deletePlan);

export default router;
