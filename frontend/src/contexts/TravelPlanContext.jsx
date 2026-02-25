import { createContext, useState, useMemo, useCallback } from "react";
import travelPlanService from "../services/travelPlanService";

const TravelPlanContext = createContext();
export { TravelPlanContext };

// Hook re-exported for backward compatibility — defined in @/hooks/useTravelPlan
export { useTravelPlan } from "../hooks/useTravelPlan";

export function TravelPlanProvider({ children }) {
    const [plans, setPlans] = useState([]);
    const [currentTrip, setCurrentTrip] = useState(null);
    const [currentHighlight, setCurrentHighlight] = useState(null);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [lastFetched, setLastFetched] = useState(null);

    const getAllTravelPlans = useCallback(async (forceRefresh = false) => {
        try {
            // Explicitly check if lastFetched exists and compare numbers 
            const isDataFresh = !!lastFetched && (Date.now() - Number(lastFetched) < 300000);
            if (!forceRefresh && isDataFresh) {
                return;
            }
            const data = await travelPlanService.fetchTravelPlans();
            setPlans(data.plans || []);
            setLastFetched(Date.now());
            return data;
        } catch (error) {
            console.error("Error fetching travel plans:", error);
            throw error;
        }
    }, [lastFetched]);

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
        setCurrentHighlight,
        setSelectedItinerary,
        selectedItinerary
    }), [plans, currentTrip, getAllTravelPlans, getCurrentPlan, createTravelPlan, currentHighlight, setCurrentHighlight, setSelectedItinerary, selectedItinerary]);

    return <TravelPlanContext.Provider value={value}>{children}</TravelPlanContext.Provider>;
}
