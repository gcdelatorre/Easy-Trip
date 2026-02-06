import { GoogleGenerativeAI } from '@google/generative-ai';
import TravelPlan from '../models/TravelPlan.js';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generatePlanService = async (userId, destination, tripLength, interests) => {
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

    const planData = JSON.parse(text);
    const newPlan = await createPlanService(userId, planData, text);
    return newPlan;
};

export const getAllPlansService = async () => {
    return await TravelPlan.find();
};

export const getPlanByIdService = async (id) => {
    return await TravelPlan.findById(id);
};

export const deletePlanService = async (id) => {
    return await TravelPlan.findByIdAndDelete(id);
};

export const createPlanService = async (userId, plan, rawAIOutput) => {
    const newPlan = new TravelPlan({
        userId,
        ...plan,
        rawAIOutput
    });
    return await newPlan.save();
};