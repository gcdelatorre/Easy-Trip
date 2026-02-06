import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/plans/generate', async (req, res) => {
    try {
        const { destination, tripLength, interests } = req.body;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are an expert travel planner. 
Create a complete travel itinerary for a user based on the following inputs:

- Destination: ${destination}
- Trip length: ${tripLength} days
- Interests: ${interests.join(', ')}

Requirements:

1. Provide a **destinationDescription**: 2-3 sentences summarizing the highlights, culture, and attractions of the destination.
2. Generate a **day-by-day itinerary** for the entire trip length.
3. Each day should include 3-5 activities relevant to the interests.
4. For each activity, provide:
   - "name": short activity name
   - "shortDescription": 1-2 sentences describing it
   - Optional "coords": { "lat": number, "lng": number } if known
5. Return the entire response in strict JSON format with the following structure:

{
  "destination": "...",
  "destinationDescription": "...",
  "tripLength": ...,
  "interests": [...],
  "planDays": [
    {
      "day": 1,
      "activities": [
        {
          "name": "...",
          "shortDescription": "...",
          "coords": { "lat": ..., "lng": ... }
        }
      ]
    }
  ]
}

Notes:
- Use concise, friendly, and realistic descriptions.
- Ensure JSON is properly formatted for direct parsing.
- Avoid extra text outside the JSON.`;

        const result = await model.generateContent(prompt);
        let text = result.response.text();

        if (text.includes('```json')) {
            text = text.split('```json')[1].split('```')[0].trim();
        } else if (text.includes('```')) {
            text = text.split('```')[1].split('```')[0].trim();
        }

        res.json(JSON.parse(text));
    } catch (err) {
        console.error("Error generating plan", err.message);
        res.status(500).json({ message: "Failed to generate plan" });
    }
})


const startServer = async () => {
    try {
        await connectDB();
        console.log("DB Connected");
    } catch (err) {
        console.error("DB connection failed", err.message);
    } finally {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
};
startServer();