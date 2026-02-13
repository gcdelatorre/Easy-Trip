import { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";

const RefreshContext = createContext();

export const useRefresh = () => {
    const context = useContext(RefreshContext);
    if (!context) {
        throw new Error('useRefresh must be used within RefreshProvider');
    }
    return context;
};

export function RefreshProvider({ children }) {
    const [refresh, setRefresh] = useState(0);

    const startRefresh = useCallback(() => setRefresh((prev) => prev + 1), []);

    const value = useMemo(() => ({ refresh, startRefresh }), [refresh]);
    
    return <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>;
}