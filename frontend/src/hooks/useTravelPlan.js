import { useContext } from "react";
import { TravelPlanContext } from "../contexts/TravelPlanContext";

export const useTravelPlan = () => {
    const context = useContext(TravelPlanContext);
    if (!context) {
        throw new Error('useTravelPlan must be used within TravelPlanProvider');
    }
    return context;
};
