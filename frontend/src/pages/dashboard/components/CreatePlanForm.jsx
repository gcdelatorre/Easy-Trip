import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    MapPin,
    Calendar as CalendarIcon,
    Users,
    Heart,
    Sparkles,
    Minus,
    Plus,
} from "lucide-react";
import { interests } from "../../../constants/interests";
import { createTravelPlan } from "../../../services/travelPlanService";
import { generateImageUrl } from "../../../services/pexelsService";
import { useToast } from "../../../contexts/ToastContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useLoading } from "../../../contexts/LoadingContext";
import { useRefresh } from "../../../contexts/RefreshContext";
import { destinations } from "../../../constants/destinations";

export function CreatePlanForm() {
    const { success, error, info } = useToast();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const { loading, startLoading, stopLoading } = useLoading();
    const { startRefresh } = useRefresh();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        destination: "",
        tripLength: 3,
        groupSize: "",
        interests: [],
        startDate: "",
        endDate: "",
    });

    const navigate = useNavigate();

    // Debounce searchQuery
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300); // 300ms delay

        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Optimized filtering with limiting results to top 20
    const filteredDestinations = useMemo(() => {
        if (!debouncedQuery) return [];

        const query = debouncedQuery.toLowerCase();
        return destinations
            .filter((d) => d.toLowerCase().includes(query))
            .slice(0, 20);
    }, [debouncedQuery]);

    const toggleInterest = (interest) => {
        setFormData({
            ...formData, interests: formData.interests.includes(interest)
                ? formData.interests.filter((i) => i !== interest)
                : formData.interests.length < 5
                    ? [...formData.interests, interest]
                    : formData.interests
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        startLoading("Creating your travel plan...");

        if (!user) {
            sessionStorage.setItem('pendingPlan', JSON.stringify(formData));
            info("To finalize your travel plan, please log in.");
            stopLoading();
            navigate("/login");
            return;
        }
        try {
            const country = formData.destination.includes(',') ? formData.destination.split(',').pop().trim() : formData.destination.trim();
            await createTravelPlan(formData);
            await generateImageUrl(country);
            startRefresh(); // Ping the dashboard to get the new data
            navigate("/dashboard");
            success("Travel plan created successfully!", 5000);
        } catch (err) {
            error("Error creating travel plan. Please try again.");
        } finally {
            stopLoading(); // also lets create a spinner while creating/generation of the travel plan. or waiting for the response of the API

        }
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
                                value={formData.destination || searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setFormData({ ...formData, destination: e.target.value });
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
                                                        setFormData({ ...formData, destination: d });
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
                                        setFormData({ ...formData, tripLength: Math.max(1, formData.tripLength - 1) })
                                    }
                                    disabled={formData.tripLength <= 1}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <Minus size={16} />
                                </button>
                                <div className="flex-1 text-center">
                                    <span className="text-lg font-semibold text-foreground">
                                        {formData.tripLength}
                                    </span>
                                    <span className="ml-1 text-sm text-muted-foreground">
                                        {formData.tripLength === 1 ? "day" : "days"}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({ ...formData, tripLength: Math.min(14, formData.tripLength + 1) })
                                    }
                                    disabled={formData.tripLength >= 14}
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
                                value={formData.groupSize}
                                onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                                className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                            >
                                <option value="" disabled>
                                    How many people?
                                </option>
                                <option value="1 Traveler">Solo</option>
                                <option value="2 Travelers">2 people</option>
                                <option value="3-4 Travelers">3 to 4 people</option>
                                <option value="5-8 Travelers">5 to 8 people</option>
                                <option value="9+ Travelers">9 or more</option>
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
                                value={formData.startDate}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                End Date
                            </label>
                            <input
                                type="date"
                                value={formData.endDate}
                                min={formData.startDate || new Date().toISOString().split("T")[0]}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
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
                                const active = formData.interests.includes(interest);
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
                            type="submit"
                            className={loading || formData.destination === "" ? "flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90 shadow-sm opacity-50 cursor-not-allowed" : "flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90 shadow-sm"}
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            <Sparkles size={18} />
                            {loading ? "Generating..." : "Generate My Itinerary"}
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
