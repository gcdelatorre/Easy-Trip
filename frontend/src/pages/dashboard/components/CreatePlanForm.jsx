import { useState } from "react";
import {
    MapPin,
    Calendar as CalendarIcon,
    Users,
    Heart,
    Sparkles,
    Minus,
    Plus,
} from "lucide-react";

const destinations = [
    "Tokyo, Japan",
    "Paris, France",
    "Bali, Indonesia",
    "Santorini, Greece",
    "New York, USA",
    "Barcelona, Spain",
    "Kyoto, Japan",
    "Lisbon, Portugal",
    "Marrakech, Morocco",
    "Patagonia, Argentina",
    "Reykjavik, Iceland",
    "Cape Town, South Africa",
];

const interests = [
    "Food & Dining",
    "History & Culture",
    "Nature & Hiking",
    "Beaches & Water",
    "Nightlife",
    "Shopping",
    "Photography",
    "Architecture",
    "Adventure Sports",
    "Art & Museums",
    "Wellness & Spa",
    "Local Markets",
];

export function CreatePlanForm() {
    const [destination, setDestination] = useState("");
    const [tripLength, setTripLength] = useState(3);
    const [groupSize, setGroupSize] = useState("");
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const filteredDestinations = destinations.filter((d) =>
        d.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleInterest = (interest) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : prev.length < 5
                    ? [...prev, interest]
                    : prev
        );
    };

    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="mb-10 text-center">
                <h1 className="font-serif text-3xl text-foreground md:text-4xl">
                    Create your trip
                </h1>
                <p className="mt-3 text-base text-muted-foreground">
                    Tell us what you have in mind and we will build your perfect itinerary.
                </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-6">
                    {/* Destination */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            <MapPin size={16} className="text-accent" />
                            Destination
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search a city or country"
                                value={destination || searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setDestination("");
                                    setSearchOpen(true);
                                }}
                                onFocus={() => setSearchOpen(true)}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                            />
                            {searchOpen && searchQuery && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setSearchOpen(false)}
                                    />
                                    <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
                                        {filteredDestinations.length > 0 ? (
                                            filteredDestinations.map((d) => (
                                                <button
                                                    key={d}
                                                    type="button"
                                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-secondary"
                                                    onClick={() => {
                                                        setDestination(d);
                                                        setSearchQuery("");
                                                        setSearchOpen(false);
                                                    }}
                                                >
                                                    <MapPin size={14} className="text-muted-foreground" />
                                                    {d}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-3 text-sm text-muted-foreground">
                                                No results found
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Trip Length + Group Size row */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                <CalendarIcon size={16} className="text-accent" />
                                Trip Length
                            </label>
                            <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setTripLength((prev) => Math.max(1, prev - 1))
                                    }
                                    disabled={tripLength <= 1}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <Minus size={16} />
                                </button>
                                <div className="flex-1 text-center">
                                    <span className="text-lg font-semibold text-foreground">
                                        {tripLength}
                                    </span>
                                    <span className="ml-1 text-sm text-muted-foreground">
                                        {tripLength === 1 ? "day" : "days"}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setTripLength((prev) => Math.min(14, prev + 1))
                                    }
                                    disabled={tripLength >= 14}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                <Users size={16} className="text-accent" />
                                Group Size
                            </label>
                            <select
                                value={groupSize}
                                onChange={(e) => setGroupSize(e.target.value)}
                                className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                            >
                                <option value="" disabled>
                                    How many people?
                                </option>
                                <option value="1">Solo traveler</option>
                                <option value="2">2 people</option>
                                <option value="3-4">3 to 4 people</option>
                                <option value="5-8">5 to 8 people</option>
                                <option value="9+">9 or more</option>
                            </select>
                        </div>
                    </div>

                    {/* Travel Dates */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={dateFrom}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                End Date
                            </label>
                            <input
                                type="date"
                                value={dateTo}
                                min={dateFrom || new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                            />
                        </div>
                    </div>

                    {/* Interests */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            <Heart size={16} className="text-accent" />
                            Interests (pick up to 5)
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {interests.map((interest) => {
                                const active = selectedInterests.includes(interest);
                                return (
                                    <button
                                        key={interest}
                                        type="button"
                                        onClick={() => toggleInterest(interest)}
                                        className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${active
                                                ? "border-accent bg-accent text-accent-foreground"
                                                : "border-border bg-background text-muted-foreground hover:border-accent/40 hover:text-foreground"
                                            }`}
                                    >
                                        {interest}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-2">
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90 shadow-sm"
                        >
                            <Sparkles size={18} />
                            Generate My Itinerary
                        </button>
                        <p className="mt-3 text-center text-xs text-muted-foreground">
                            Free forever. Your itinerary will be ready in seconds.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
