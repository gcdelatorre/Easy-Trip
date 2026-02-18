import api from "./api";

// NOTES
// we only set the token in localStorage if domain of frontend and backend are different
// if you have the same domain, secure cookie is enough, but we need to do this for the mobile users to work. especially for the iOS users it has a strict policy for cookies


// helper function for setting the user and token in localStorage login

const setAuthData = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
};

const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
        return null;
    } catch (error) {
        console.error("Error getting current user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token"); // clear both to avoid broken session state
        return null;
    }
};

const loginWithGoogle = async (idToken) => {
    const response = await api.post("/auth/google", { idToken });
    if (response.data.user) {
        setAuthData(response.data.user, response.data.token);
    }
    return response.data;
};

const register = async (payload) => {
    const response = await api.post("/auth/register", payload);
    if (response.data.user) {
        setAuthData(response.data.user, response.data.token);
    }
    return response.data;
};

const loginWithEmail = async (payload) => {
    const response = await api.post("/auth/login", payload);
    if (response.data.user) {
        setAuthData(response.data.user, response.data.token);
    }
    return response.data;
};

const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

const authService = {
    getCurrentUser,
    loginWithGoogle,
    register,
    loginWithEmail,
    logout,
};

export default authService;
