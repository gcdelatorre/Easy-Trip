import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { TripCard } from "./components/TripCard";

const trips = [
    {
        id: 1,
        city: "Tokyo",
        country: "Japan",
        description: "Temples, street food, and city lights across 7 unforgettable days.",
        dates: "Mar 12 - Mar 19, 2026",
        groupSize: "2 travelers",
        image: "https://images.pexels.com/photos/14695270/pexels-photo-14695270.jpeg",
        status: "Upcoming",
    },
    {
        id: 2,
        city: "Bali",
        country: "Indonesia",
        description: "Rice terraces, surf spots, and hidden waterfalls over 10 days.",
        dates: "Jan 5 - Jan 15, 2026",
        groupSize: "4 travelers",
        image: "https://images.pexels.com/photos/33342092/pexels-photo-33342092.jpeg",
        status: "Completed",
    },
    {
        id: 3,
        city: "Paris",
        country: "France",
        description: "Museums, patisseries, and evening walks along the Seine for 5 days.",
        dates: "Apr 1 - Apr 6, 2026",
        groupSize: "Solo",
        image: "https://images.pexels.com/photos/15985572/pexels-photo-15985572.jpeg",
        status: "Draft",
    },
];

export default function DashboardPage() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl text-foreground md:text-4xl">
                        My Trips
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Your planned adventures, all in one place.
                    </p>
                </div>
                <Link
                    to="/dashboard/create"
                    className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 md:flex"
                >
                    <Plus size={16} />
                    New Trip
                </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                ))}
            </div>

            {/* Mobile FAB */}
            <Link
                to="/dashboard/create"
                className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-opacity hover:opacity-90 md:hidden"
                aria-label="Create new trip"
            >
                <Plus size={24} />
            </Link>
        </div>
    );
}
