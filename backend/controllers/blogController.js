import * as blogService from '../services/blogService.js';

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getBlogs();
        return res.status(200).json({ message: "Blogs fetched successfully", blogs });
    } catch (err) {
        console.error("Error fetching blogs:", err.message);
        return res.status(500).json({ message: "Failed to fetch blogs" });
    }
}

export const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const blog = await blogService.getBlog(slug);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json({ message: "Blog fetched successfully", blog });
    } catch (err) {
        console.error("Error fetching blog:", err.message);
        return res.status(500).json({ message: "Failed to fetch blog" });
    }
}