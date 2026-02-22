import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTravelPlan } from '@/contexts/TravelPlanContext';

const TravelDetailsContext = createContext();

export const useTravelDetails = () => {
    const context = useContext(TravelDetailsContext);
    if (!context) {
        throw new Error('useTravelDetails must be used within TravelDetailsProvider');
    }
    return context;
};

export function TravelDetailsProvider({ children }) {
    const { currentTrip } = useTravelPlan();
    const [googleFlightLink, setGoogleFlightLink] = useState(null);
    const [airbnbLink, setAirbnbLink] = useState(null);
    const [viatorLink, setViatorLink] = useState(null);

    const getFlightLink = useCallback(() => {
        if (!currentTrip?.destination) return;

        const destination = currentTrip.destination;
        const query = encodeURIComponent(`Flights to ${destination}`);
        const link = `https://www.google.com/travel/flights?q=${query}`;
        setGoogleFlightLink(link);
    }, [currentTrip]);

    const getAirbnbLink = useCallback(() => {
        if (!currentTrip?.destination || !currentTrip?.startDate || !currentTrip?.endDate) return;

        const destination = currentTrip.destination;
        const checkInDate = currentTrip.startDate.split('T')[0];
        const checkOutDate = currentTrip.endDate.split('T')[0];

        const query = encodeURIComponent(destination.replace(", ", "--"));
        const link = `https://www.airbnb.com/s/${query}/homes?checkin=${checkInDate}&checkout=${checkOutDate}`;
        setAirbnbLink(link);
    }, [currentTrip]);

    const getViatorLink = useCallback(() => {
        if (!currentTrip?.destination) return;

        const destination = currentTrip.destination;
        const query = encodeURIComponent(destination);
        let link = `https://www.viator.com/searchResults/all?text=${query}`;

        if (currentTrip.startDate && currentTrip.endDate) {
            const start = currentTrip.startDate.split('T')[0];
            const end = currentTrip.endDate.split('T')[0];
            link += `&startDate=${start}&endDate=${end}`;
        }

        setViatorLink(link);
    }, [currentTrip]);

    // Automatically generate all links when the trip changes
    useEffect(() => {
        if (currentTrip) {
            getFlightLink();
            getAirbnbLink();
            getViatorLink();
        } else {
            setGoogleFlightLink(null);
            setAirbnbLink(null);
            setViatorLink(null);
        }
    }, [currentTrip, getFlightLink, getAirbnbLink, getViatorLink]);

    const value = React.useMemo(() => ({
        googleFlightLink,
        setGoogleFlightLink,
        airbnbLink,
        setAirbnbLink,
        viatorLink,
        setViatorLink,
        getFlightLink,
        getAirbnbLink,
        getViatorLink
    }), [googleFlightLink, setGoogleFlightLink, airbnbLink, setAirbnbLink, viatorLink, setViatorLink, getFlightLink, getAirbnbLink, getViatorLink]);

    return (
        <TravelDetailsContext.Provider value={value}>
            {children}
        </TravelDetailsContext.Provider>
    );
}
