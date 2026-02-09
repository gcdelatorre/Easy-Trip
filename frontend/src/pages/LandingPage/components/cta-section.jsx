import { Link } from "react-router-dom";

export function CtaSection() {
  return (
    <section id="cta" className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg"
            alt="Inspiring travel destination"
            className="h-[28rem] w-full object-cover lg:h-[32rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 lg:px-16">
              <div className="max-w-lg">
                <h2 className="font-serif text-4xl text-white lg:text-5xl text-balance">
                  Your next trip is one click away
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/80">
                  Stop spending hours researching. Let Easytrip build a complete
                  itinerary for you in minutes. Personalized, organized, and
                  completely free.
                </p>
                <Link
                  to="/signup"
                  className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Create Your Trip for Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
