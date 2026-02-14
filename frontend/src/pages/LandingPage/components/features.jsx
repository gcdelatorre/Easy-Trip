import { Share2, FileDown, Map as MapIcon, History, Sparkles } from "lucide-react";

const features = [
    {
        title: "Day-by-day itineraries",
        description:
            "Every trip is broken down into a clear daily plan, morning to evening, so you always know what comes next.",
        image: "https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?",
        icon: Sparkles,
        className: "md:col-span-2 md:row-span-2",
        bgColor: "hover:bg-accent/[0.03]",
        imgClass: "scale-110 group-hover:scale-125"
    },
    {
        title: "Download PDF",
        description:
            "Take your plans offline with beautifully formatted PDFs ready for your next adventure.",
        image: "https://images.pexels.com/photos/66100/pexels-photo-66100.jpeg?",
        icon: FileDown,
        className: "md:col-span-1 md:row-span-1",
        bgColor: "hover:bg-blue-500/[0.03]",
        imgClass: "scale-150 group-hover:scale-[1.65]"
    },
    {
        title: "Interactive Map View",
        description:
            "Visualize your entire route on a interactive map interface.",
        image: "https://images.pexels.com/photos/210158/pexels-photo-210158.jpeg?",
        icon: MapIcon,
        className: "md:col-span-1 md:row-span-1",
        bgColor: "hover:bg-emerald-500/[0.03]",
        imgClass: "scale-125 group-hover:scale-[1.4]"
    },
    {
        title: "Save and revisit trips",
        description:
            "Your travel plans are always available. Come back to a trip you planned months ago, or pick up right where you left off.",
        image: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?",
        icon: History,
        className: "md:col-span-3 md:row-span-1",
        bgColor: "hover:bg-purple-500/[0.03]",
        imgClass: "scale-105 group-hover:scale-115"
    },
];

export function Features() {
    return (
        <section id="features" className="bg-background py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-20">
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
                        What you get
                    </div>
                    <h2 className="font-serif text-4xl text-foreground sm:text-6xl tracking-tight mb-6">
                        Everything you need, <span className="text-accent italic">nothing you don't.</span>
                    </h2>
                    <p className="text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto">
                        Easytrip focuses on what matters: giving you a clear actionable travel plan without the noise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[340px]">
                    {features.map((feature, idx) => (
                        <div
                            key={feature.title}
                            className={`group relative overflow-hidden rounded-[3rem] border border-border/40 bg-card transition-all duration-700 hover:border-accent/30 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] ${feature.className} ${feature.bgColor}`}
                        >
                            {/* Inner Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Content Wrapper */}
                            <div className={`absolute inset-0 p-10 flex flex-col justify-between z-20`}>
                                <div className="space-y-6">
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-[0_8px_16px_-4px_rgba(0,0,0,0.05)] border border-border/50 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-accent/10">
                                        <feature.icon className="h-7 w-7 text-accent" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-3xl font-bold text-foreground tracking-tight leading-none group-hover:text-accent transition-colors duration-500">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-medium max-w-[240px]">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Image Background / Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-2/5 overflow-hidden transition-all duration-1000 md:h-full md:w-3/5 md:translate-x-[70%] md:inset-x-auto md:top-0 group-hover:md:translate-x-[65%]">
                                {/* Sophisticated Mask / Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent md:bg-gradient-to-r md:from-card md:via-card/30 md:to-transparent z-10" />

                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className={`h-full w-full object-cover transition-all duration-1000 opacity-60 group-hover:opacity-100 group-hover:rotate-2 ${feature.imgClass}`}
                                />

                                {/* Overlay Bloom Effect */}
                                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
