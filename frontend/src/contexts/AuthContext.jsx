import { createContext, useState, useEffect, useContext, useMemo } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const loginWithGoogle = async (idToken) => {
        const data = await authService.loginWithGoogle(idToken);
        setUser(data.user);
        return data;
    };

    const register = async (payload) => {
        const data = await authService.register(payload);
        setUser(data.user);
        return data;
    };

    const loginWithEmail = async (payload) => {
        const data = await authService.loginWithEmail(payload);
        setUser(data.user);
        return data;
    }

    const logout = async () => {
        await authService.logout();
        setUser(null);
        window.location.href = "/";
    };

    const value = useMemo(() => ({
        user,
        loginWithGoogle,
        register,
        loginWithEmail,
        logout,
        loading,
    }), [user, loginWithGoogle, register, loginWithEmail, logout, loading]);

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
