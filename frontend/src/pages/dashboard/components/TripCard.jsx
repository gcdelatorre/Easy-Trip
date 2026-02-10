import { Link } from "react-router-dom";
import { CalendarDays, Users, MapPin } from "lucide-react";

export function TripCard({ trip }) {
    return (
        <Link to="#" className="group block">
            <div className="relative overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-md">
                <img
                    src={trip.image || "https://images.pexels.com/photos/33342092/pexels-photo-33342092.jpeg"}
                    alt={trip.city}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-white/90" />
                        <span className="text-xs font-medium uppercase tracking-wider text-white/90">
                            {trip.country}
                        </span>
                    </div>
                    <h3 className="mt-1 font-serif text-2xl text-white">
                        {trip.city}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                        {trip.description}
                    </p>

                    <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-white/70">
                            <CalendarDays size={13} />
                            <span className="text-xs">{trip.dates}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/70">
                            <Users size={13} />
                            <span className="text-xs">{trip.groupSize}</span>
                        </div>
                    </div>
                </div>

                <div className="absolute right-4 top-4">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${trip.status === "Upcoming"
                                ? "bg-accent text-accent-foreground"
                                : trip.status === "Completed"
                                    ? "bg-secondary text-secondary-foreground"
                                    : "bg-white/20 text-white backdrop-blur-md"
                            }`}
                    >
                        {trip.status}
                    </span>
                </div>
            </div>
        </Link>
    );
}
