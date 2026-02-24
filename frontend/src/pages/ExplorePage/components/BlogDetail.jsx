import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";

const BlogDetail = () => {
    const { slug } = useParams();
    const article = MOCK_ARTICLES[slug] || MOCK_ARTICLES["kyoto-beauty"];

    return (
        <div className="min-h-screen bg-background">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto px-4 py-8 md:py-16"
            >
                {/* Article Header */}
                <div className="mb-12">
                    <Link to="/explore" className="inline-flex items-center text-muted-foreground hover:text-accent mb-6 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Explore
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider">
                            {article.category}
                        </span>
                        <span className="text-muted-foreground text-sm">•</span>
                        <span className="text-muted-foreground text-sm flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1" /> {article.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-8 text-foreground">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-border py-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${article.author}&background=random`} alt={article.author} />
                            </div>
                            <div>
                                <p className="font-medium text-sm text-foreground">{article.author}</p>
                                <p className="text-muted-foreground text-xs flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" /> {article.date}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-medium">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <div className="text-foreground/90 font-sans leading-relaxed space-y-6">
                        {article.content.split('\n').map((para, i) => (
                            para.trim() && <p key={i} className="text-lg md:text-xl font-sans lg:leading-relaxed">{para}</p>
                        ))}
                    </div>
                </div>

                {/* Related Tags */}
                <div className="mt-16 pt-8 border-t border-border">
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Explore more in {article.country}</h4>
                    <div className="flex flex-wrap gap-2">
                        {["Heritage", "Temples", "Gastronomy", "Zen Gardens"].map(tag => (
                            <span key={tag} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-border cursor-pointer transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogDetail;
