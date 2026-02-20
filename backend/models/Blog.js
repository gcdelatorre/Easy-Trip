import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        country: {
            type: String,
            required: true,
            index: true
        },
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        excerpt: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ["Cultural", "Luxury", "Adventure", "Nature", "Exotic", "Winter", "Food", "Historical"],
            default: "Cultural"
        },
        imageUrl: {
            type: String,
            required: true
        },
        author: {
            type: String,
            default: "Easy Trip Editorial"
        },
        featured: {
            type: Boolean,
            default: false
        },
        readTime: {
            type: String,
            default: "5 min read"
        },
        tags: [String]
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
