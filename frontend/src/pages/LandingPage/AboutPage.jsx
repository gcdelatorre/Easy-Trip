import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            About Easy Trip
          </h1>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
            Easy Trip is a personal project by{" "}
            <span className="font-semibold">Gian Carlo De la Torre</span> that
            aims to make travel planning calmer, faster, and more intuitive.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4">
            Instead of spending hours juggling tabs, blogs, and maps, Easy Trip
            helps you go from{" "}
            <span className="font-medium">&quot;Where should I go?&quot;</span>{" "}
            to a clear,{" "}
            <span className="font-medium">day-by-day itinerary</span> in a few
            minutes using AI-generated plans and a clean, focused interface.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            This project is still evolving, but the goal stays simple: give you
            a calm place to plan your next adventure, save your trips, and come
            back to them whenever you&apos;re ready to go.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

