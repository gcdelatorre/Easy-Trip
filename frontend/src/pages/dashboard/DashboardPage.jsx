import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { TripCard } from "./components/TripCard";
import { useState, useEffect } from "react";
import { fetchTravelPlans } from "../../services/travelPlanService";
import { useRefresh } from "../../contexts/RefreshContext";

export default function DashboardPage() {
    const { refresh } = useRefresh();
    const [travelPlans, setTravelPlans] = useState([]);

    useEffect(() => {
        const fetchTravelPlansData = async () => {
            try {
                const response = await fetchTravelPlans();
                setTravelPlans(response.plans || []);
            } catch (err) {
                console.error("Error fetching travel plans:", err);
            }
        };
        fetchTravelPlansData();
    }, [refresh]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl text-foreground md:text-4xl">
                        My Trips
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Your planned adventures, all in one place.
                    </p>
                </div>
            </div>

            {travelPlans.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {travelPlans.map((travelPlan) => (
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
}
