import api from "./api";

const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};

const loginWithGoogle = async (idToken) => {
    const response = await api.post("/auth/google", { idToken });
    if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
};

const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("user");
};

const authService = {
    getCurrentUser,
    loginWithGoogle,
    logout,
};

export default authService;
