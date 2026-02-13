import { Spinner } from "./customized-spinner";

export function FullPageSpinner({ isOpen = false, message = "Loading..." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-background p-12 shadow-2xl max-w-sm">

        {/* Spinner */}
        <Spinner size="xl" variant="default" />

        {/* Message with animated dots */}
        <div className="text-center">
          <p className="text-base font-semibold text-foreground">{message}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Crafting your perfect trip
            <span className="inline-block animate-pulse">.</span>
            <span className="inline-block animate-pulse animation-delay-100">
              .
            </span>
            <span className="inline-block animate-pulse animation-delay-200">
              .
            </span>
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-full animate-gradient bg-gradient-to-r from-accent via-accent/50 to-accent" />
        </div>
      </div>
    </div>
  );
}
