import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src="/easytrip-logo-transparent.png"
                alt="Easytrip"
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
              Travel planning made effortless. Generate personalized itineraries
              and spend less time planning, more time exploring.
            </p>
            <p className="mt-3 text-sm font-medium text-accent">
              Always free. No credit card needed.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#destinations"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Destinations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Easytrip. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
