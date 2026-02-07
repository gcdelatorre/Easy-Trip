import { getDestinationInfo } from "../services/destinationInfoService.js";

export const getDestinationInfoByCountry = async (req, res) => {
    try {
        const destinationInfo = await getDestinationInfo(req.params.country);
        return res.status(200).json(destinationInfo);
    } catch (err) {
        console.error("Error fetching destination info:", err.message);
        res.status(500).json({ message: "Failed to fetch destination info" });
    }
};