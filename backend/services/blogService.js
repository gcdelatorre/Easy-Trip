import Blog from "../models/Blog.js";

export const getBlogs = async () => {
    return await Blog.find({}).lean();
}

export const getBlog = async (slug) => {
    return await Blog.findOne({ slug }).lean();
}

