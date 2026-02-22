import { useEffect } from "react";
import { Plane, ExternalLink } from "lucide-react";
import { useTravelDetails } from "../../contexts/TravelDetailsContext";
import { useTravelPlan } from "../../contexts/TravelPlanContext";

export function FlightsCard() {
    const { googleFlightLink } = useTravelDetails();
    const { currentTrip } = useTravelPlan();

    if (!googleFlightLink) return null;

    return (
        <a
            href={googleFlightLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-accent/40 hover:shadow-medium"
        >
            <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Plane size={20} />
                </div>
                <ExternalLink size={16} className="text-muted-foreground transition-colors group-hover:text-accent" />
            </div>

            <div>
                <h3 className="font-serif text-lg text-foreground">Flights</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Find the best flights to {currentTrip?.destination || "your destination"}
                </p>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-accent">
                View on Google Flights
                <span className="h-px w-4 bg-accent/30 transition-all group-hover:w-8" />
            </div>
        </a>
    );
}