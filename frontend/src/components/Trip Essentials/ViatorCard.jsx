import { useEffect } from "react";
import { Ticket, ExternalLink } from "lucide-react";
import { useTravelDetails } from "../../contexts/TravelDetailsContext";
import { useTravelPlan } from "../../contexts/TravelPlanContext";

export function ViatorCard() {
    const { viatorLink } = useTravelDetails();
    const { currentTrip } = useTravelPlan();

    if (!viatorLink) return null;

    return (
        <a
            href={viatorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-accent/40 hover:shadow-medium"
        >
            <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Ticket size={20} />
                </div>
                <ExternalLink size={16} className="text-muted-foreground transition-colors group-hover:text-accent" />
            </div>

            <div>
                <h3 className="font-serif text-lg text-foreground">Experiences</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Book guided tours and local experiences in {currentTrip?.destination || "your destination"}
                </p>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-accent">
                Explore on Viator
                <span className="h-px w-4 bg-accent/30 transition-all group-hover:w-8" />
            </div>
        </a>
    );
}
