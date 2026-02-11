import api from "./api";

export const createTravelPlan = async (travelPlanData) => {
    try {
        const response = await api.post("/travel-plans/generate", travelPlanData);
        return response.data;
    } catch (err) {
        console.error("Error creating travel plan:", err);
        throw err;
    }
}

export const fetchTravelPlans = async () => {
    try {
        const response = await api.get("/travel-plans");
        return response.data;
    } catch (err) {
        console.error("Error fetching travel plans:", err);
        throw err;
    }
}

export const fetchTravelPlanById = async (id) => {
    try {
        const response = await api.get(`/travel-plans/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching travel plans:", err);
        throw err;
    }
}

export const deleteTravelPlan = async (id) => {
    try {
        const response = await api.delete(`/travel-plans/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error deleting travel plans:", err);
        throw err;
    }
}