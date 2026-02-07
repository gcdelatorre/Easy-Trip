import { searchPhoto } from "../services/pexelsService.js";

export const getBackgroundPhoto = async (req, res) => {
    try {
        const query = req.query.query

        
        if (!query) {
            return res.status(404).json({ message: "Query is required" });
        }
        
        const finalQuery = `${query} scenery landmark tourist spot`
        
        const imageUrl = await searchPhoto(finalQuery)
        if (!imageUrl) {
            return res.status(404).json({ message: "Photo not found" });
        }

        res.status(200).json({ message: "Image successfully fetched", imageUrl });

    } catch (err) {
        console.error("Error fetching photo:", err.message);
        res.status(500).json({ message: "Failed to get photo" });
    }
}