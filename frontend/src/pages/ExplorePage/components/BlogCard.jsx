import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { memo } from "react"

const BlogCard = memo(function BlogCard({ country, title, excerpt, imageUrl, category, slug }) {
    return (
        <Link to={`/explore/${slug}`}>
            <motion.div
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 border border-border cursor-pointer h-full"
            >
                <div className="aspect-[4/5] overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                </div>

                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/30">
                        {category}
                    </span>
                </div>

                <div className="absolute bottom-0 p-6 text-white w-full">
                    <p className="text-xs uppercase tracking-widest mb-1 font-sans text-white/80">{country}</p>
                    <h3 className="text-xl font-serif leading-tight mb-2 group-hover:text-accent transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-white/70 line-clamp-2 font-sans opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {excerpt}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
});

export default BlogCard;
