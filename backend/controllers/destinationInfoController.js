import { getDestinationInfo } from "../services/destinationInfoService.js";

export const getDestinationInfoByCountry = async (req, res) => {
    try {
        const countryName = req.params.country;

        if (!countryName) {
            return res.status(400).json({ message: "Country name is required" });
        }

        const destinationInfo = await getDestinationInfo(countryName);

        if (!destinationInfo) {
            return res.status(404).json({ message: "Destination not found" });
        }

        return res.status(200).json(destinationInfo);
    } catch (err) {
        console.error("Error fetching destination info:", err.message);
        res.status(500).json({ message: "Failed to fetch destination info" });
    }
};