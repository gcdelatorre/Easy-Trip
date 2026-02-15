import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext';
import { useToast } from '../../contexts/ToastContext';
import { TripTabs } from './components/trip-details/TripTabs';
import { ItineraryDay } from './components/trip-details/ItineraryDay';
import { TripSidebar } from './components/trip-details/TripSidebar';
import { useTravelPlan } from '@/contexts/TravelPlanContext';

export default function TripDetailsPage() {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const { startLoading, stopLoading } = useLoading();
    const { error } = useToast();
    const { currentTrip: trip, getCurrentPlan } = useTravelPlan();

    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchTrip = async () => {
            startLoading("Loading trip details...");
            try {
                await getCurrentPlan(tripId);
            } catch (err) {
                console.error("Failed to fetch trip:", err);
                error("Could not find this travel plan.");
                navigate("/dashboard");
            } finally {
                stopLoading();
            }
        };

        if (tripId) {
            fetchTrip();
        }
    }, [tripId, navigate, startLoading, stopLoading, error, getCurrentPlan]);

    if (!trip) return null;

    return (
        <div className="pb-12">
            {/* Hero Section */}
            <div className="relative -mx-6 -mt-6 mb-12 overflow-hidden rounded-b-[2rem] shadow-lg">
                <img
                    src={trip.imageUrl || trip.image || "/images/trip-tokyo.jpg"}
                    alt={trip.destination}
                    className="h-[400px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12">
                    <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md mb-4 shadow-sm border border-white/10">
                        <Users size={16} />
                        {trip.groupSize}
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-medium">
                        {trip.tripLength || trip.planDays?.length} Days in {trip.destination}
                    </h1>
                    <p className="mt-3 text-white/80 text-lg flex items-center gap-2 font-medium">
                        {trip.startDate ? new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible Start'}
                        {trip.endDate ? ` – ${new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
                    </p>
                </div>
            </div>

            {/* Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-2">
                {/* Left Side - Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Tabs */}
                    <TripTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="font-serif text-2xl text-foreground mb-4">Overview</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg italic">
                                    {trip.destinationDescription}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-serif text-xl text-foreground mb-6">Highlights</h3>
                                <div className="flex flex-wrap gap-3">
                                    {trip.highlights?.length > 0 ? (
                                        trip.highlights.map((highlight, idx) => (
                                            <div
                                                key={idx}
                                                className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground shadow-sm"
                                            >
                                                {highlight.name}
                                            </div>
                                        ))
                                    ) : (
                                        // Fallback: Pluck activity names from first few days
                                        trip.planDays?.slice(0, 2).flatMap(day => day.activities?.slice(0, 2).map(act => act.name)).map((name, idx) => (
                                            <div
                                                key={idx}
                                                className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground shadow-sm"
                                            >
                                                {name}
                                            </div>
                                        ))
                                    )}
                                    {(!trip.highlights || trip.highlights.length === 0) && (!trip.planDays || trip.planDays.length === 0) && trip.interests?.map((interest) => (
                                        <div
                                            key={interest}
                                            className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground shadow-sm"
                                        >
                                            {interest}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Itinerary Tab */}
                    {activeTab === 'itinerary' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="font-serif text-2xl text-foreground">Day-by-Day Itinerary</h2>
                            <div className="grid gap-8">
                                {trip.planDays?.map((dayPlan) => (
                                    <ItineraryDay key={dayPlan.day} day={dayPlan} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* General Info Tab */}
                    {activeTab === 'info' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="font-serif text-2xl text-foreground mb-6">General Information</h2>
                                {trip.destinationInfo ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                        <div className="space-y-1 border-b border-border pb-4 col-span-1 md:col-span-2">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Country Description</h3>
                                            <p className="text-foreground text-lg">{trip.destinationInfo.destinationDescription}</p>
                                        </div>
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Country</h3>
                                            <p className="text-foreground text-lg">{trip.destinationInfo.country}</p>
                                        </div>
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Capital</h3>
                                            <p className="text-foreground text-lg">{trip.destinationInfo.capital}</p>
                                        </div>
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Timezone</h3>
                                            <p className="text-foreground text-lg">{trip.destinationInfo.timezone}</p>
                                        </div>
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Primary Language</h3>
                                            <p className="text-foreground text-lg">{trip.destinationInfo.primaryLanguage}</p>
                                        </div>
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Currency</h3>
                                            <p className="text-foreground text-lg">{trip.destinationInfo.currency?.name} ({trip.destinationInfo.currency?.symbol})</p>
                                        </div>
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Weather</h3>
                                            <p className="text-foreground text-lg">{trip.destinationInfo.weatherSummary}</p>
                                        </div>
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Transportation</h3>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {trip.destinationInfo.transportationModes?.map(mode => (
                                                    <span key={mode} className="text-xs bg-secondary px-2 py-1 rounded-md">{mode}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Destination</h3>
                                            <p className="text-foreground text-lg">{trip.destination}</p>
                                        </div>
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Duration</h3>
                                            <p className="text-foreground text-lg">{trip.tripLength} Days</p>
                                        </div>
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Start Date</h3>
                                            <p className="text-foreground text-lg">{trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1 border-b border-border pb-4">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">End Date</h3>
                                            <p className="text-foreground text-lg">{trip.endDate ? new Date(trip.endDate).toLocaleDateString() : 'N/A'}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side - Sticky Sidebar */}
                <div className="lg:col-span-1">
                    <TripSidebar trip={trip} />
                </div>
            </div>
        </div>
    );
}
