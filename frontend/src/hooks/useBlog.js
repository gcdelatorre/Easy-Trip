import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function useBlog(slug) {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const controller = new AbortController();

        const fetchBlog = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`${API_BASE}/api/blogs/${slug}`, {
                    signal: controller.signal,
                });

                if (!res.ok) throw new Error('Blog not found');

                const data = await res.json();
                setBlog(data.blog ?? null);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();

        return () => controller.abort();
    }, [slug]);

    return { blog, loading, error };
}
