import { Download, MapPin, Calendar } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TripPDF } from './TripPDF';
import { useState } from 'react';
import { MapFullscreenModal } from './MapFullscreenModal';
import { Button } from '@/components/ui/button';
import { MapView } from './MapView';

export function TripSidebar({ trip }) {
    // trip.planDays is an array of days
    const totalActivities = trip.planDays?.reduce((sum, day) => sum + (day.activities?.length || 0), 0) || 0;

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="sticky top-24 space-y-6">
            {/* Map Container - Simplified for width */}
            <div className="rounded-xl border border-border bg-secondary/30 h-80 overflow-hidden relative group">
                <MapView height="h-full" trip={trip} />

                {/* Floating Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-[1000] pointer-events-none">
                    <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/80 shadow-2xl pointer-events-auto scale-90 group-hover:scale-100 transition-transform"
                        onClick={() => setIsOpen(true)}
                    >
                        <MapPin size={18} className="mr-2" />
                        Explore Full Map
                    </Button>
                </div>
            </div>

            <MapFullscreenModal isOpen={isOpen} onClose={() => setIsOpen(false)} trip={trip} />

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

                <PDFDownloadLink
                    document={<TripPDF trip={trip} />}
                    fileName={`${trip.destination.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_itinerary.pdf`}
                    className="w-full mt-6"
                >
                    {({ loading }) => (
                        <button
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50 disabled:opacity-50"
                        >
                            <Download size={16} />
                            {loading ? 'Preparing PDF...' : 'Download PDF'}
                        </button>
                    )}
                </PDFDownloadLink>
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
