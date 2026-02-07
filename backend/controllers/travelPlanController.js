import * as travelPlanService from '../services/travelPlanService.js';

export const generatePlan = async (req, res) => {
    try {
        const { destination, tripLength, interests } = req.body;
        const userId = req.user._id;

        const plan = await travelPlanService.generatePlanService(userId, destination, tripLength, interests);
        res.status(200).json(plan);
    } catch (err) {
        console.error("Error generating plan:", err.message);
        res.status(500).json({ message: "Failed to generate plan", error: err.message });
    }
};

export const getAllPlans = async (req, res) => {
    try {
        // Option: Filter plans by user
        // const plans = await travelPlanService.getAllPlansService(req.user._id);
        const userId = req.user._id;

        const plans = await travelPlanService.getAllPlansService(userId);
        res.status(200).json(plans);
    } catch (err) {
        console.error("Error fetching plans:", err.message);
        res.status(500).json({ message: "Failed to fetch plans" });
    }
};

export const getPlanById = async (req, res) => {
    try {
        const userId = req.user._id;
        const plan = await travelPlanService.getPlanByIdService(userId, req.params.id);
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
        const userId = req.user._id;
        const plan = await travelPlanService.deletePlanService(userId, req.params.id);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        res.status(200).json({ message: "Plan deleted successfully", plan });
    } catch (err) {
        console.error("Error deleting plan:", err.message);
        res.status(500).json({ message: "Failed to delete plan" });
    }
};
