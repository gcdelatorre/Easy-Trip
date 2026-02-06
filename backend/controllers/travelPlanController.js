import * as travelPlanService from '../services/travelPlanService.js';

export const generatePlan = async (req, res) => {
    try {
        const { userId, destination, tripLength, interests } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required for saving the plan" });
        }

        // hardcoded for now
        if (typeof userId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(userId.trim())) {
            return res.status(400).json({ message: "Invalid userId format. Must be a 24-character hex string." });
        }

        const plan = await travelPlanService.generatePlanService(userId, destination, tripLength, interests);
        res.status(200).json(plan);
    } catch (err) {
        console.error("Error generating plan:", err.message);
        res.status(500).json({ message: "Failed to generate plan", error: err.message });
    }
};

export const getAllPlans = async (req, res) => {
    try {
        const plans = await travelPlanService.getAllPlansService();
        res.status(200).json(plans);
    } catch (err) {
        console.error("Error fetching plans:", err.message);
        res.status(500).json({ message: "Failed to fetch plans" });
    }
};

export const getPlanById = async (req, res) => {
    try {
        const plan = await travelPlanService.getPlanByIdService(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        res.status(200).json(plan);
    } catch (err) {
        console.error("Error fetching plan:", err.message);
        res.status(500).json({ message: "Failed to fetch plan" });
    }
};

export const deletePlan = async (req, res) => {
    try {
        const plan = await travelPlanService.deletePlanService(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        res.status(200).json({ message: "Plan deleted successfully", plan });
    } catch (err) {
        console.error("Error deleting plan:", err.message);
        res.status(500).json({ message: "Failed to delete plan" });
    }
};
