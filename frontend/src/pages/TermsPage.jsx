import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 lg:py-20 space-y-6">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">
            Terms of Service
          </h1>

          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Easy Trip is a personal project and is provided &quot;as is&quot;
            without any guarantees. Generated itineraries and destination
            information are suggestions only — you are responsible for
            double‑checking details like opening hours, safety, visas, and local
            regulations.
          </p>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Use of the service
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By using Easy Trip, you agree not to misuse the app, attempt to
              break security, or disrupt its infrastructure. You also understand
              that itineraries are AI-generated and may contain inaccuracies or
              outdated information.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              No guarantees
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The developer is not liable for any decisions, costs, or issues
              arising from using the itineraries or destination information in
              this app. Always treat results as a starting point, not final
              advice.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

