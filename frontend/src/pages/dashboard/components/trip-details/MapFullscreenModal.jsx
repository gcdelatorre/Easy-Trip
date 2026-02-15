import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MapView } from "./MapView";

export function MapFullscreenModal({ isOpen, onClose, trip }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[95vw] lg:max-w-[1200px] h-[85vh] lg:h-[85vh] p-0 overflow-hidden flex flex-col gap-0 border border-border shadow-2xl rounded-3xl bg-background">
                {/* Header Layer */}
                <div className="p-4 md:p-6 border-b bg-muted/30 flex items-center justify-between">
                    <div>
                        <DialogTitle className="font-serif text-xl md:text-2xl text-foreground">
                            {trip.destination}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                            Detailed Satellite Itinerary
                        </DialogDescription>
                    </div>
                </div>

                {/* Map Container - Now a wide rectangle */}
                <div className="flex-1 w-full bg-secondary/10">
                    <MapView height="h-full" trip={trip} />
                </div>
            </DialogContent>
        </Dialog>
    );
}