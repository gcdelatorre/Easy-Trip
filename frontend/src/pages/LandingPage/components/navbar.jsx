import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/easytrip-logo-transparent.png"
            alt="Easytrip"
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </a>
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#destinations"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Destinations
          </a>
          <Link
            to="/signup"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Start Planning
          </Link>
          <Link
            to="/login"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <User size={16} />
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/login"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground"
          >
            <User size={16} />
          </Link>
          <button
            type="button"
            className="flex flex-col gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            <a
              href="#how-it-works"
              className="text-base text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-base text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </a>
            <a
              href="#destinations"
              className="text-base text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Destinations
            </a>
            <Link
              to="/signup"
              className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              onClick={() => setMobileOpen(false)}
            >
              Start Planning
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
