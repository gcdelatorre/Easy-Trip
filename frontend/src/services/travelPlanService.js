import api from "./api";

const createTravelPlan = async (travelPlanData) => {
    try {
        const response = await api.post("/travel-plans/generate", travelPlanData);
        return response.data;
    } catch (err) {
        console.error("Error creating travel plan:", err);
        throw err;
    }
}

const fetchTravelPlans = async () => {
    try {
        const response = await api.get("/travel-plans");
        return response.data;
    } catch (err) {
        console.error("Error fetching travel plans:", err);
        throw err;
    }
}

const fetchTravelPlanById = async (id) => {
    try {
        const response = await api.get(`/travel-plans/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching travel plans:", err);
        throw err;
    }
}

const deleteTravelPlan = async (id) => {
    try {
        const response = await api.delete(`/travel-plans/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error deleting travel plans:", err);
        throw err;
    }
}

const travelPlanService = {
    createTravelPlan,
    fetchTravelPlans,
    fetchTravelPlanById,
    deleteTravelPlan
};

export default travelPlanService;