import { useContext } from "react";
import { TravelDetailsContext } from "../contexts/TravelDetailsContext";

export const useTravelDetails = () => {
    const context = useContext(TravelDetailsContext);
    if (!context) {
        throw new Error('useTravelDetails must be used within TravelDetailsProvider');
    }
    return context;
};
