import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { TripCard } from "./components/TripCard";
import { useState, useEffect } from "react";
import { useRefresh } from "../../contexts/RefreshContext";
import { useTravelPlan } from "@/contexts/TravelPlanContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { memo } from "react";

export default memo(function DashboardPage() {
    const { refresh } = useRefresh();
    const { plans, getAllTravelPlans } = useTravelPlan();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { warning } = useToast();
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            warning("Please login first");
            return;
        }
    }, [user])


    useEffect(() => {
        const fetchTravelPlansData = async () => {
            setPageLoading(true);
            try {
                await getAllTravelPlans();
            } catch (err) {
                console.error("Error fetching travel plans:", err);
            } finally {
                setPageLoading(false);
            }
        };
        fetchTravelPlansData();
    }, [refresh, getAllTravelPlans]);

    if (pageLoading) return <DashboardSkeleton />;

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl text-foreground md:text-4xl">
                        My Trips
                    </h1>
                    <p className="mt-1 text-sm text-accent">
                        Your planned adventures, all in one place.
                    </p>
                </div>
            </div>

            {plans.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((travelPlan) => (
                        <TripCard key={travelPlan._id} trip={travelPlan} />
                    ))}
                </div>
            ) : (
                <div className="mt-20 flex flex-col items-center justify-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                        <Plus size={32} className="text-muted-foreground" />
                    </div>
                    <h2 className="mt-6 text-xl font-semibold text-foreground">No trips found</h2>
                    <p className="mt-2 max-w-sm text-muted-foreground">
                        You haven't created any travel plans yet. Ready to start your next adventure?
                    </p>
                    <Link
                        to="/create"
                        className="mt-8 rounded-full bg-accent px-8 py-3 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90"
                    >
                        Create Your First Plan
                    </Link>
                </div>
            )}

            {/* Mobile FAB */}
            <Link
                to="/create"
                className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-opacity hover:opacity-90 md:hidden"
                aria-label="Create new trip"
            >
                <Plus size={24} />
            </Link>
        </div>
    );
});
