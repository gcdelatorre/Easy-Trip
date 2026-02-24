import { GoogleGenerativeAI } from '@google/generative-ai';
import TravelPlan from '../models/TravelPlan.js';
import DestinationInfo from '../models/DestinationInfo.js';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Helper to normalize destination strings and fetch image
 */
const getDestinationImage = async (destinationName) => {
  // Normalize: "Paris, France" -> "France" because in the frontend the selection format would be city, country
  const country = destinationName.includes(',') ? destinationName.split(',').pop().trim() : destinationName.trim();
  const info = await DestinationInfo.findOne({ country: { $regex: new RegExp(`^${country}$`, 'i') } }).select('imageUrl').lean();
  return info?.imageUrl || null;
};

export const generatePlanService = async (userId, destination, tripLength, interests, groupSize, startDate, endDate) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are an expert travel planner. 
Create a complete travel itinerary for a user based on the following inputs:

- Destination: ${destination}
- Trip length: ${tripLength} days
- Interests: ${interests.join(', ')}
- Group size: ${groupSize}
- Start date: ${startDate}
- End date: ${endDate}

Requirements:

1. Provide a **destinationDescription**: 2-3 sentences summarizing the highlights, culture, and attractions of the destination.
2. Provide a **highlights**: An array of 4-5 specific spots, landmarks, or famous places mentioned in the itinerary with their coordinates.
3. Generate a **day-by-day itinerary** for the entire trip length.
4. Each day should include 3-5 activities relevant to the interests.
4. For each activity, provide:
   - "name": short activity name
   - "shortDescription": 1-2 sentences describing it
   - Optional "coords": { "lat": number, "lng": number } if known (accurate as possible)
5. Return the entire response in strict JSON format with the following structure:

{
  "destination": "City, Country",
  "destinationCoords": { "lat": number, "lng": number },
  "destinationDescription": "...",
  "highlights": [
    { "name": "Landmark 1", "coords": { "lat": number, "lng": number } },
    ...
  ],
  "tripLength": ...,
  "interests": [...],
  "groupSize": ...,
  "startDate": "...",
  "endDate": "...",
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

export const getAllPlansService = async (userId) => {
  const plans = await TravelPlan.find({ userId })
    .select('destination destinationDescription startDate endDate groupSize createdAt')
    .sort({ createdAt: -1 })
    .lean();

  // Enrich each plan with its corresponding destination image
  const enrichedPlans = await Promise.all(plans.map(async (plan) => {
    const imageUrl = await getDestinationImage(plan.destination);
    return { ...plan, imageUrl };
  }));

  return enrichedPlans;
};

export const getPlanByIdService = async (userId, id) => {
  const plan = await TravelPlan.findOne({ _id: id, userId }).lean();
  if (!plan) return null;

  const country = plan.destination.includes(',') ? plan.destination.split(',').pop().trim() : plan.destination.trim();
  const destinationInfo = await DestinationInfo.findOne({ country: { $regex: new RegExp(`^${country}$`, 'i') } }).lean();

  return { ...plan, imageUrl: destinationInfo?.imageUrl || null, destinationInfo };
};

export const deletePlanService = async (userId, id) => {
  return await TravelPlan.findOneAndDelete({ _id: id, userId });
};

export const createPlanService = async (userId, plan, rawAIOutput) => {
  const newPlan = new TravelPlan({
    userId,
    ...plan,
    rawAIOutput
  });
  return await newPlan.save();
};
