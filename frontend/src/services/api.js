import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "/api",
    withCredentials: true,
});

// this is for the frontend to attach the bearer token to the request header
// this is only needed if domain of frontend and backend are different
// if you have the same domain, secure cookie is enough, but we need to do this for the mobile users to work. especially for the iOS users it has a strict policy for cookies
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;