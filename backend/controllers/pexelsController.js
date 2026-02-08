import { searchPhoto } from "../services/pexelsService.js";
import { updateDestinationInfo } from "../services/destinationInfoService.js";
import TravelPlan from "../models/TravelPlan.js";

export const getBackgroundPhoto = async (req, res) => {
    try {
        const query = req.query.query
        const userId = req.user._id

        if (!query) {
            return res.status(404).json({ message: "Query is required" });
        }

        // validation if its in their plan
        const hasCountryInPlan = await TravelPlan.findOne({
            userId: userId,
            destination: { $regex: new RegExp(`^${query}$`, 'i') }
        });

        if (!hasCountryInPlan) {
            return res.status(403).json({ message: "Must have the country in your plan to update its image" });
        }

        const pexelsResult = await searchPhoto(query, `${query} scenery landmark tourist spot`);

        // validation if its valid country
        if (pexelsResult?.notFound) {
            return res.status(404).json({ message: "Invalid country: Not found in our database" });
        }

        // validation if its already has a photo
        if (pexelsResult?.alreadyExists) {
            return res.status(200).json({
                message: "Destination already has a photo. Skipping update.",
                destination: pexelsResult.destination
            });
        }

        if (!pexelsResult || !pexelsResult.imageUrl) {
            return res.status(404).json({ message: "No suitable photo found on Pexels" });
        }

        // update the destination info
        const { imageUrl, photographer } = pexelsResult;
        const updatedDestination = await updateDestinationInfo(query, { imageUrl, photographer });

        res.status(200).json({
            message: "Destination image successfully updated",
            destination: updatedDestination,
            imageUrl,
            photographer
        });

    } catch (err) {
        console.error("Error fetching photo:", err.message);
        res.status(500).json({ message: err.message });
    }
}