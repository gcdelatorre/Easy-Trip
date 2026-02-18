import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 lg:py-20 space-y-6">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">
            Privacy Policy
          </h1>

          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Easy Trip respects your privacy. Trip details and account
            information are used only to generate and display your itineraries.
            We don&apos;t sell your data, and we only store what&apos;s needed
            to keep your saved trips and authentication working.
          </p>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              What we store
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may store basic account information (such as your email), your
              saved trips, and preferences related to your itineraries. This
              data exists solely to let you return to your plans later and
              improve your planning experience.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              How we use your data
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data is used to generate, display, and manage your travel
              plans. We may also use anonymized or aggregated usage data to
              understand how the product is used and to improve features over
              time.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Your choices
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You can stop using Easy Trip at any time. In the future, the app
              will include a simple way to request deletion of your account and
              stored trips. Until then, you can contact the developer directly
              to request manual deletion.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

