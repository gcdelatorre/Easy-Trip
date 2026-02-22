import { Ticket01Icon, ArrowRight01Icon } from "hugeicons-react";
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
            className="group relative flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent/40 hover:shadow-medium active:scale-[0.98]"
        >
            <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/5 text-accent shadow-inner transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Ticket01Icon size={24} variant="stroke" />
                </div>
                <div className="rounded-full bg-secondary p-2 text-muted-foreground transition-all group-hover:bg-accent/10 group-hover:text-accent">
                    <ArrowRight01Icon size={18} />
                </div>
            </div>

            <div className="space-y-1.5">
                <h3 className="font-serif text-xl text-foreground">Experiences</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    Book guided tours and curated local experiences in {currentTrip?.destination || "your destination"}
                </p>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                Explore Viator
                <div className="h-0.5 w-6 bg-accent/20 transition-all group-hover:w-10 group-hover:bg-accent" />
            </div>

            {/* Subtle background pattern/gradient */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-accent/5 blur-3xl transition-opacity group-hover:opacity-100" />
        </a>
    );
}
