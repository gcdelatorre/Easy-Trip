const destinations = [
    {
        name: "Amalfi Coast",
        region: "Italy",
        image: "https://images.pexels.com/photos/13762063/pexels-photo-13762063.jpeg",
    },
    {
        name: "Swiss Alps",
        region: "Switzerland",
        image: "https://images.pexels.com/photos/19419461/pexels-photo-19419461.jpeg",
    },
    {
        name: "Lisbon",
        region: "Portugal",
        image: "https://images.pexels.com/photos/14678583/pexels-photo-14678583.jpeg",
    },
    {
        name: "Bali",
        region: "Indonesia",
        image: "https://images.pexels.com/photos/33342092/pexels-photo-33342092.jpeg",
    },
];

export function Destinations() {
    return (
        <section id="destinations" className="py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
                            Popular destinations
                        </p>
                        <h2 className="font-serif text-4xl text-foreground lg:text-5xl text-balance">
                            Travelers love these
                        </h2>
                    </div>
                    <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                        From coastal escapes to mountain retreats, Easytrip plans it all.
                        Pick a destination and we handle the details.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-6">
                    {destinations.map((dest) => (
                        <div
                            key={dest.name}
                            className="group relative cursor-pointer overflow-hidden rounded-2xl"
                        >
                            <img
                                src={dest.image}
                                alt={`Travel destination: ${dest.name}, ${dest.region}`}
                                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110 lg:h-96"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <p className="text-sm font-medium text-white/80">
                                    {dest.region}
                                </p>
                                <h3 className="text-xl font-semibold text-white">
                                    {dest.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
