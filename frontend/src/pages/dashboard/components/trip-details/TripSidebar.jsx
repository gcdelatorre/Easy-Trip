import { Download, MapPin, Calendar } from 'lucide-react';

export function TripSidebar({ trip }) {
    // trip.planDays is an array of days
    const totalActivities = trip.planDays?.reduce((sum, day) => sum + (day.activities?.length || 0), 0) || 0;

    return (
        <div className="sticky top-24 space-y-6">
            {/* Map Placeholder */}
            <div className="rounded-xl border border-border bg-secondary/30 p-6 h-80">
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 flex items-center justify-center border border-border/50">
                    <div className="text-center">
                        <MapPin size={32} className="mx-auto text-muted-foreground mb-2" />
                        <p className="text-xs text-muted-foreground">Map view coming soon</p>
                    </div>
                </div>
            </div>

            {/* Trip Stats Card */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Days</p>
                    <p className="font-serif text-2xl text-foreground mt-1">{trip.tripLength || trip.planDays?.length || 0}</p>
                </div>

                <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Activities</p>
                    <p className="font-serif text-2xl text-foreground mt-1">
                        {totalActivities}
                    </p>
                </div>

                <button className="w-full mt-6 flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50">
                    <Download size={16} />
                    Download PDF
                </button>
            </div>

            {/* Quick Info */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                    <Calendar size={16} className="mt-0.5 text-muted-foreground" />
                    <div>
                        <p className="font-medium text-foreground">
                            {trip.startDate ? new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible Start'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            to {trip.endDate ? new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible End'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
