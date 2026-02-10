import { Navbar } from "../../components/layout/Navbar";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/how-it-works";
import { Features } from "./components/features";
import { Destinations } from "./components/destinations";
import { CtaSection } from "./components/cta-section";
import { Footer } from "../../components/layout/Footer";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <HowItWorks />
            <Features />
            <Destinations />
            <CtaSection />
            <Footer />
        </div>
    );
}
