import React, { useState } from "react";
import BlogCard from "./components/BlogCard";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

const MOCK_BLOGS = [];

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
                            Blogs will be posted soon.
                        </p>
                    </div>
                )}
            </main>

            <Footer />

        </div>
    );
}

