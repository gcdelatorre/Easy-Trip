import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, MapPin } from "lucide-react";
import { useBlog } from "@/hooks/useBlog";

// Renders markdown-lite content: ### headings, **bold**, bullet lists
const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // ### Heading
        if (trimmed.startsWith('### ')) {
            return (
                <h3 key={i} className="text-2xl md:text-3xl font-serif text-foreground mt-10 mb-4">
                    {trimmed.slice(4)}
                </h3>
            );
        }

        // Bullet list item
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            return (
                <li key={i} className="ml-5 list-disc text-lg text-foreground/85 leading-relaxed">
                    {renderInline(trimmed.slice(2))}
                </li>
            );
        }

        // Numbered list item
        if (/^\d+\.\s/.test(trimmed)) {
            return (
                <li key={i} className="ml-5 list-decimal text-lg text-foreground/85 leading-relaxed">
                    {renderInline(trimmed.replace(/^\d+\.\s/, ''))}
                </li>
            );
        }

        // Normal paragraph
        return (
            <p key={i} className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                {renderInline(trimmed)}
            </p>
        );
    });
};

// Renders **bold** inline text
const renderInline = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
            ? <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>
            : part
    );
};

const BlogDetailSkeleton = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 animate-pulse">
        <div className="h-4 w-24 bg-secondary/60 rounded-full mb-10" />
        <div className="flex gap-3 mb-4">
            <div className="h-6 w-20 bg-secondary/50 rounded-full" />
            <div className="h-6 w-24 bg-secondary/50 rounded-full" />
        </div>
        <div className="h-12 w-3/4 bg-secondary/60 rounded-xl mb-4" />
        <div className="h-10 w-1/2 bg-secondary/50 rounded-xl mb-8" />
        <div className="h-px w-full bg-border mb-8" />
        <div className="aspect-[21/9] rounded-3xl bg-secondary/40 mb-12" />
        <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`h-5 bg-secondary/40 rounded-full ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
            ))}
        </div>
    </div>
);

const BlogDetail = () => {
    const { slug } = useParams();
    const { blog, loading, error } = useBlog(slug);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <BlogDetailSkeleton />
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
                <p className="text-muted-foreground text-lg font-serif italic">
                    {error ?? "This story could not be found."}
                </p>
                <Link
                    to="/explore"
                    className="inline-flex items-center text-accent text-sm font-semibold hover:underline"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Explore
                </Link>
            </div>
        );
    }

    const formattedDate = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : null;

    return (
        <div className="min-h-screen bg-background">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto px-4 py-8 md:py-16"
            >
                {/* Back link */}
                <Link
                    to="/explore"
                    className="inline-flex items-center text-muted-foreground hover:text-accent mb-8 transition-colors group text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Explore
                </Link>

                {/* Article Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider">
                            {blog.category}
                        </span>
                        <span className="text-muted-foreground text-sm flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {blog.country}
                        </span>
                        <span className="text-muted-foreground text-sm">•</span>
                        <span className="text-muted-foreground text-sm flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {blog.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-10 text-foreground">
                        {blog.title}
                    </h1>

                    {/* Author bar */}
                    <div className="flex items-center justify-between border-y border-border py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden shrink-0">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author)}&background=random`}
                                    alt={blog.author}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-foreground">{blog.author}</p>
                                {formattedDate && (
                                    <p className="text-muted-foreground text-xs flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {formattedDate}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })}
                                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                                title="Share"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Bookmark">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                {blog.imageUrl && (
                    <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-lg">
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Excerpt pull-quote */}
                {blog.excerpt && (
                    <blockquote className="border-l-4 border-accent pl-6 mb-10 italic text-xl text-muted-foreground font-serif">
                        {blog.excerpt}
                    </blockquote>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <div className="space-y-5">
                        {renderContent(blog.content)}
                    </div>
                </div>

                {/* Tags */}
                {blog.tags?.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-border">
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                            Explore more in {blog.country}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-border cursor-pointer transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back CTA */}
                <div className="mt-16 text-center">
                    <Link
                        to="/explore"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-semibold hover:bg-secondary transition-colors text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to all stories
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogDetail;
