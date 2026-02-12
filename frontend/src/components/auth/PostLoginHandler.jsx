import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { createTravelPlan } from '../../services/travelPlanService';

export function PostLoginHandler() {
    const { user, loading } = useAuth();
    const { success, error, info } = useToast();
    const navigate = useNavigate();
    const isProcessing = useRef(false);

    useEffect(() => {
        const handlePendingPlan = async () => {
            // Wait for user to be loaded and authenticated
            if (loading || !user || isProcessing.current) return;

            const pendingPlanRaw = sessionStorage.getItem('pendingPlan');
            if (!pendingPlanRaw) return;

            try {
                isProcessing.current = true;
                const pendingPlan = JSON.parse(pendingPlanRaw);
                info("Finalizing your travel plan...");

                await createTravelPlan(pendingPlan);

                // Clear the stash
                sessionStorage.removeItem('pendingPlan');

                success("Travel plan created successfully!");
                navigate("/dashboard");
            } catch (err) {
                console.error("Failed to finalize pending plan:", err);
                error("Something went wrong while saving your plan.");
                isProcessing.current = false;
                // We keep the pending plan in session storage so they can try again or we can handle it
            }
        };

        handlePendingPlan();
    }, [user, loading, navigate, success, error, info]);

    return null; // This component doesn't render anything
}
