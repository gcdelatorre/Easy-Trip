import { useState, useEffect } from 'react';
import api from '../services/api';

export function useBlog(slug) {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchBlog = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await api.get(`/blogs/${slug}`);
                setBlog(res.data.blog ?? null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    return { blog, loading, error };
}
