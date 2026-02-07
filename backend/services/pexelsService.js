import { createClient } from 'pexels';

const client = createClient(process.env.PEXELS_API_KEY);

export const searchPhoto = async (query) => {
    const randomInt = Math.floor(Math.random() * 4) + 1;

    const photos = await client.photos.search({ query, per_page: 5 })
    return { imageUrl: photos.photos[randomInt].src.original, photographer: photos.photos[randomInt].photographer };
}