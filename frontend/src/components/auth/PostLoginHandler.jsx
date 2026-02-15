import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useRefresh } from '../../contexts/RefreshContext';
import { useLoading } from '../../contexts/LoadingContext';
import { useTravelPlan } from '@/contexts/TravelPlanContext';

export function PostLoginHandler() {
    const { user, loading } = useAuth();
    const { success, error, info } = useToast();
    const { startRefresh } = useRefresh();
    const navigate = useNavigate();
    const isProcessing = useRef(false);
    const { createTravelPlan } = useTravelPlan();
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const handlePendingPlan = async () => {
            // Wait for user to be loaded and authenticated
            if (loading || !user || isProcessing.current) return;

            const pendingPlanRaw = sessionStorage.getItem('pendingPlan');
            if (!pendingPlanRaw) return;

            try {
                isProcessing.current = true;
                const pendingPlan = JSON.parse(pendingPlanRaw);
                startLoading("Finalizing your itinerary...");
                await createTravelPlan(pendingPlan);


                // Signal dashboard to refresh
                startRefresh();

                // Clear the stash
                sessionStorage.removeItem('pendingPlan');

                success("Travel plan created successfully!");
                stopLoading();
                navigate("/dashboard");
            } catch (err) {
                error("Something went wrong while saving your plan.");
                stopLoading();
                isProcessing.current = false;
                // We keep the pending plan in session storage so they can try again or we can handle it
            }
        };

        handlePendingPlan();
    }, [user, loading, navigate, success, error, info, createTravelPlan, startRefresh, startLoading, stopLoading]);

    return null; // This component doesn't render anything
}
