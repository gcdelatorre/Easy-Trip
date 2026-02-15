import { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";
import travelPlanService from "../services/travelPlanService";

const TravelPlanContext = createContext();

export const useTravelPlan = () => {
    const context = useContext(TravelPlanContext);
    if (!context) {
        throw new Error('useTravelPlan must be used within TravelPlanProvider');
    }
    return context;
};

export function TravelPlanProvider({ children }) {
    const [plans, setPlans] = useState([]);
    const [currentTrip, setCurrentTrip] = useState(null);
    const [currentHighlight, setCurrentHighlight] = useState(null);

    const getAllTravelPlans = useCallback(async () => {
        const data = await travelPlanService.fetchTravelPlans();
        setPlans(data.plans || []);
        return data;
    }, []);

    const getCurrentPlan = useCallback(async (id) => {
        const data = await travelPlanService.fetchTravelPlanById(id);
        setCurrentTrip(data.plan || null);
        return data;
    }, []);

    const createTravelPlan = useCallback(async (travelPlanData) => {
        const data = await travelPlanService.createTravelPlan(travelPlanData);
        return data;
    }, []);

    const value = useMemo(() => ({
        plans,
        setPlans,
        currentTrip,
        setCurrentTrip,
        getAllTravelPlans,
        getCurrentPlan,
        createTravelPlan,
        currentHighlight,
        setCurrentHighlight
    }), [plans, currentTrip, getAllTravelPlans, getCurrentPlan, createTravelPlan, currentHighlight, setCurrentHighlight]);

    return <TravelPlanContext.Provider value={value}>{children}</TravelPlanContext.Provider>;
}
