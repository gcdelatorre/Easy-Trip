import { Link } from "react-router-dom";
import { CalendarDays, Users, MapPin } from "lucide-react";
import { memo } from "react";

export const TripCard = memo(function TripCard({ trip }) {
    return (
        <Link to={`/dashboard/trip/${trip._id}`} className="group block">
            <div className="relative overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-md">
                <img
                    src={trip.imageUrl || "https://images.pexels.com/photos/33342092/pexels-photo-33342092.jpeg"}
                    alt={trip.destination}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-white/90" />
                        <h3 className="mt-1 font-serif text-2xl text-white">
                            {trip.destination}
                        </h3>
                    </div>

                    <p className="mt-1.5 text-sm leading-relaxed text-white/80 line-clamp-2">
                        {trip.destinationDescription}
                    </p>

                    <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-white/70">
                            <CalendarDays size={13} />
                            <span className="text-xs">
                                {trip.startDate ? new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Flexible'}
                                {trip.endDate ? ` - ${new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/70">
                            <Users size={13} />
                            <span className="text-xs">{trip.groupSize}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
})
