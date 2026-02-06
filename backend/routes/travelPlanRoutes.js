import express from 'express';
import * as travelPlanController from '../controllers/travelPlanController.js';

const router = express.Router();

router.post('/generate', travelPlanController.generatePlan);
router.get('/', travelPlanController.getAllPlans);
router.get('/:id', travelPlanController.getPlanById);
router.delete('/:id', travelPlanController.deletePlan);

export default router;
