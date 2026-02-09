import { createClient } from 'pexels';
import DestinationInfo from '../models/DestinationInfo.js';

const client = createClient(process.env.PEXELS_API_KEY);

export const searchPhoto = async (country, query) => {
    try {
        // Normalize: "Paris, France" -> "France"
        const normalizedCountry = country.includes(',') ? country.split(',').pop().trim() : country.trim();

        const countryInfo = await DestinationInfo.findOne({ country: { $regex: new RegExp(`^${normalizedCountry}$`, 'i') } });

        if (!countryInfo) {
            return { notFound: true };
        }

        if (countryInfo?.imageUrl) {
            return { alreadyExists: true, destination: countryInfo };
        }

        const result = await client.photos.search({ query, per_page: 5 });

        if (result && result.photos && result.photos.length > 0) {
            const randomIndex = Math.floor(Math.random() * result.photos.length);
            return {
                imageUrl: result.photos[randomIndex].src.original,
                photographer: result.photos[randomIndex].photographer
            };
        }
        return null;
    } catch (error) {
        console.error("Pexels Service Error:", error.message);
        return null;
    }
}