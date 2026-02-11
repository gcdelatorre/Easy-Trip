import api from "./api";

export const generateImageUrl = async (country) => {
    try {
        const response = await api.get(`/generate-pexels?query=${country}`);
        return response.data;
    } catch (err) {
        console.error("Error generating image URL:", err);
        throw err;
    }
}
