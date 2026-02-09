const features = [
  {
    title: "Day-by-day itineraries",
    description:
      "Every trip is broken down into a clear daily plan, morning to evening, so you always know what comes next.",
    image: "https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    alt: "Person planning travel with notebook and map",
  },
  {
    title: "Download as PDF",
    description:
      "Take your itinerary offline. Download a beautifully formatted PDF to carry with you, share with friends, or print for the road.",
    image: "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    alt: "Traveler with phone and documents",
  },
  {
    title: "Interactive map view",
    description:
      "See all your destinations and activities plotted on a map. Understand distances, plan your route, and discover nearby spots.",
    image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    alt: "Map with travel destinations marked",
  },
  {
    title: "Save and revisit trips",
    description:
      "Your travel plans are always available. Come back to a trip you planned months ago, or pick up right where you left off.",
    image: "https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    alt: "Photo album of travel memories",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-card py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            What you get
          </p>
          <h2 className="font-serif text-4xl text-foreground lg:text-5xl text-balance">
            Everything you need, nothing you don't
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Easytrip focuses on what matters: giving you a clear, actionable
            travel plan without the noise.
          </p>
        </div>

        <div className="mt-16 lg:mt-20">
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group overflow-hidden rounded-3xl bg-background"
              >
                <div className="overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-64"
                  />
                </div>
                <div className="p-8">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
