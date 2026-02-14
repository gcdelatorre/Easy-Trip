import React, { useState, useEffect } from "react";
import { Plane, Globe } from "lucide-react";

const TRAVEL_TIPS = [
  "Did you know? Easy Trip can plan for up to 10 days!",
  "Searching for the best hidden gems in your destination...",
  "Curating local experiences just for you...",
  "Finding the perfect balance between relax and adventure...",
  "Almost there! Your dream itinerary is coming to life...",
  "Fun fact: You can download your plan as a PDF for offline use!",
];

export function FullPageSpinner({ isOpen = false, message = "Loading..." }) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TRAVEL_TIPS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative group flex flex-col items-center gap-8 rounded-[3rem] bg-background/80 p-12 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] border border-white/20 backdrop-blur-2xl max-w-sm w-full mx-4 overflow-hidden">

        {/* Animated Border Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-accent/20 via-transparent to-accent/20 opacity-50 animate-pulse" />

        {/* Plane & Globe Animation */}
        <div className="relative h-32 w-32 flex items-center justify-center">
          {/* Pulsing Globe */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-accent/10 border border-accent/20 animate-ping opacity-20" />
            <div className="absolute h-20 w-20 rounded-full bg-accent/5 border border-accent/30 scale-125 animate-pulse opacity-20" />
            <Globe className="h-16 w-16 text-accent animate-pulse" />
          </div>

          {/* Circling Plane */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90">
              <Plane className="h-6 w-6 text-accent fill-accent" />
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div className="text-center space-y-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-serif font-medium text-foreground tracking-tight">
              {message}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-accent">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Preparing your journey
              </span>
            </div>
          </div>

          {/* Travel Tips Wrapper */}
          <div className="h-12 flex items-center justify-center px-4">
            <p className="text-sm text-muted-foreground italic leading-relaxed animate-in slide-in-from-bottom-2 fade-in duration-700" key={tipIndex}>
              "{TRAVEL_TIPS[tipIndex]}"
            </p>
          </div>
        </div>

        {/* Premium Progress Bar */}
        <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/30">
          <div className="absolute inset-y-0 h-full w-1/2 animate-[loading_2s_ease-in-out_infinite] rounded-full bg-accent" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}} />
    </div>
  );
}
