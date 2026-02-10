import { MapPin, Sparkles, Download } from "lucide-react";

const steps = [
    {
        icon: MapPin,
        title: "Tell us your destination",
        description:
            "Share where you want to go, your travel dates, and what kind of experience you're after. Beach relaxation, city exploration, nature walks. You decide.",
    },
    {
        icon: Sparkles,
        title: "We generate your itinerary",
        description:
            "Easytrip creates a detailed, day-by-day plan with activities, places to visit, and estimated timing, all personalized to your preferences.",
    },
    {
        icon: Download,
        title: "Review, save, and go",
        description:
            "Browse your itinerary, download it as a PDF, or view your destinations on an interactive map. Save it to revisit anytime.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
                        How it works
                    </p>
                    <h2 className="font-serif text-4xl text-foreground lg:text-5xl">
                        <span className="text-balance">
                            Three simple steps to your perfect trip
                        </span>
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                        No complicated forms or endless scrolling. Just a calm,
                        straightforward way to plan your next adventure.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-3 lg:mt-20 lg:gap-12">
                    {steps.map((step, i) => (
                        <div key={step.title} className="group">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <step.icon size={22} />
                            </div>
                            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                {"Step " + (i + 1)}
                            </span>
                            <h3 className="mb-3 text-xl font-semibold text-foreground">
                                {step.title}
                            </h3>
                            <p className="text-base leading-relaxed text-muted-foreground">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
