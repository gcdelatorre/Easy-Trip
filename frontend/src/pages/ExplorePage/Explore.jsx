import React, { useState } from "react";
import BlogCard from "./components/BlogCard";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

const MOCK_BLOGS = [
    {
        id: 1,
        slug: "kyoto-beauty",
        country: "Japan",
        title: "The Silent Beauty of Kyoto",
        excerpt: "Discover the hidden temples and serene Zen gardens that make Kyoto the cultural heart of Japan. A journey through time and tradition.",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
        category: "Cultural"
    },
    {
        id: 2,
        slug: "amalfi-coast",
        country: "Italy",
        title: "Amalfi Coast: A Cliffside Dream",
        excerpt: "Experience the vibrant colors and breathtaking Mediterranean views of Italy's most famous coastline. Lemons, luxury, and crystal waters.",
        imageUrl: "https://images.unsplash.com/photo-1460627390041-532a28402358?q=80&w=2070&auto=format&fit=crop",
        category: "Luxury"
    },
    {
        id: 3,
        slug: "palawan-island",
        country: "Philippines",
        title: "Island Hopping in Palawan",
        excerpt: "Crystal clear lagoons, limestone cliffs, and white sandy beaches. Explore why Palawan is consistently voted the world's best island.",
        imageUrl: "https://images.unsplash.com/photo-1518509562904-87459e3634a7?q=80&w=1974&auto=format&fit=crop",
        category: "Adventure"
    },
    {
        id: 4,
        slug: "iceland-lights",
        country: "Iceland",
        title: "Chasing the Northern Lights",
        excerpt: "A guide to experiencing the magical Aurora Borealis amidst the volcanic landscapes and glacial lagoons of Iceland.",
        imageUrl: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2059&auto=format&fit=crop",
        category: "Nature"
    },
    {
        id: 5,
        slug: "marrakech-magic",
        country: "Morocco",
        title: "The Magic of Marrakech",
        excerpt: "Lose yourself in the vibrant souks, historic riads, and the enchanting gardens of the Red City. A sensory explosion.",
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2073&auto=format&fit=crop",
        category: "Exotic"
    },
    {
        id: 6,
        slug: "zermatt-alps",
        country: "Switzerland",
        title: "Alpine Bliss in Zermatt",
        excerpt: "Skiing under the shadow of the Matterhorn. Discover the ultimate winter wonderland and Swiss hospitality.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
        category: "Winter"
    }
];

export default function Explore() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("For You");
    const { user } = useAuth()

    const filteredBlogs = MOCK_BLOGS.filter(blog =>
        blog.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-7xl mx-auto px-4 py-10">
                {/* Simple Top Nav */}
                <div className="mb-12">
                    <Link
                        to={user ? "/dashboard" : "/"}
                        className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Go back
                    </Link>
                </div>

                {/* Hero Header */}
                <div className="mb-12">
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                        Find your escape
                    </p>
                    <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-[1.1] max-w-4xl">
                        Uncover the world's most <span className="italic text-accent">extraordinary</span> places.
                    </h2>
                </div>

                {/* Discovery Toolbar: Search & Tabs */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-16 py-6 border-y border-border">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Find a destination..."
                            className="w-full pl-12 pr-4 py-3 bg-secondary/30 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {["For You", "Trending", "Culture", "Nature", "Luxury"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredBlogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.025 }}
                        >
                            <BlogCard {...blog} />
                        </motion.div>
                    ))}
                </div>

                {filteredBlogs.length === 0 && (
                    <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
                        <p className="text-muted-foreground font-serif text-xl italic">
                            Missing something? We haven't explored that place yet.
                        </p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-4 text-accent text-sm font-medium hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </main>

            <Footer />

        </div>
    );
}

