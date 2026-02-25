import { useState, useEffect } from 'react';
import api from '../services/api';

export function useBlogs(searchQuery = '') {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
                const res = await api.get(`/blogs${params}`);
                setBlogs(res.data.blogs ?? []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [searchQuery]);

    return { blogs, loading, error };
}
