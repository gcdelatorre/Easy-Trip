import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function useBlogs(searchQuery = '') {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
                const res = await fetch(`${API_BASE}/api/blogs${params}`, {
                    signal: controller.signal,
                });

                if (!res.ok) throw new Error('Failed to fetch blogs');

                const data = await res.json();
                setBlogs(data.blogs ?? []);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();

        return () => controller.abort();
    }, [searchQuery]);

    return { blogs, loading, error };
}
