import { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
};

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("Loading...");

    const startLoading = useCallback((msg = "Loading...") => {
        setMessage(msg);
        setLoading(true);
    }, []);

    const stopLoading = useCallback(() => {
        setLoading(false);
    }, []);

    const value = useMemo(() => ({
        loading,
        message,
        startLoading,
        stopLoading,
    }), [loading, message, startLoading, stopLoading]);

    return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}
