import { useNavigate } from "react-router-dom";
import { Home, Map as MapIcon, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            {/* Visual Element */}
            <div className="relative mb-8">
                <div className="absolute -inset-4 rounded-full bg-accent/20 blur-2xl animate-pulse" />
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-border bg-card shadow-xl">
                    <MapIcon size={48} className="text-accent" />
                </div>
            </div>

            {/* Text Content */}
            <h1 className="mb-2 font-serif text-6xl font-bold text-foreground md:text-8xl">404</h1>
            <p className="mb-10 max-w-md text-lg text-muted-foreground">
                Oops! It looks like you've wandered off the map. This destination doesn't exist yet, but your next adventure is just a click away.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary shadow-sm"
                >
                    <ArrowLeft size={18} />
                    Go Back
                </button>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 shadow-lg"
                >
                    <Home size={18} />
                    Return Dashboard
                </button>
            </div>

            {/* Subtle brand mark */}
            <div className="mt-20 flex items-center gap-2 opacity-50">
                <img src="/easytrip-icon.png" alt="Easy Trip" className="h-6 w-auto" />
                <span className="text-sm font-medium tracking-tight">Easy Trip</span>
            </div>
        </div>
    );
}
