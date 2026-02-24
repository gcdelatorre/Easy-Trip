import { Link } from "react-router-dom";

export function Hero() {
    return (
        <section className="relative overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="max-w-xl">
                        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                            Free to use
                        </p>
                        <h1 className="font-serif text-5xl leading-tight text-foreground lg:text-7xl lg:leading-tight text-balance">
                            Plan your perfect trip in minutes
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl lg:leading-relaxed">
                            Generate complete, day-by-day travel itineraries tailored to your
                            preferences. No more hours of research. Just tell us where you
                            want to go.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                to="/create"
                                className="rounded-full bg-accent px-8 py-4 text-center text-base font-medium text-accent-foreground transition-opacity hover:opacity-90"
                            >
                                Generate My Plan
                            </Link>
                            <a
                                href="#how-it-works"
                                className="px-4 py-4 text-center text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                See how it works
                            </a>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src="https://images.pexels.com/photos/14695270/pexels-photo-14695270.jpeg"
                                        alt="Tropical beach with crystal clear water"
                                        className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105 lg:h-80"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src="https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?"
                                        alt="Historic Lisbon tram on cobblestone street"
                                        className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 lg:h-52"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 pt-8">
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src="https://images.pexels.com/photos/15985572/pexels-photo-15985572.jpeg"
                                        alt="Amalfi Coast colorful buildings on cliffs"
                                        className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 lg:h-52"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src="https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg"
                                        alt="Swiss Alps mountain landscape"
                                        className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105 lg:h-80"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
