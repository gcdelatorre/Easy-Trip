User Schema (OAuth-ready)
{
    "_id": "ObjectId",
    "email": "string, unique, required",
    "passwordHash": "string, optional if OAuth",  // null if using OAuth only
    "oauthProvider": "string, optional",         // e.g., "google"
    "oauthId": "string, optional",               // Provider-specific user ID
    "createdAt": "Date",
    "plans": ["ObjectId of TravelPlan"]          // References user's plans
}


TravelPlan Schema
{
    "_id": "ObjectId",
    "userId": "ObjectId, required",  // Reference to User
    "destination": "string, required",
    "destinationCoords": { "lat": "number", "lng": "number" },
    "destinationDescription": "string", // short description / highlight of destination
    "tripLength": "number, required",
    "interests": ["string"],  // e.g., ["Food", "Culture"]
    "planDays": [
        {
            "day": "number",
            "activities": [
                {
                    "name": "string",
                    "coords": { "lat": "number", "lng": "number" }, // optional
                    "shortDescription": "string" // brief detail about the activity
                }
            ]
        }
    ],
    "createdAt": "Date",
    "rawAIOutput": "string" // Optional: store original Gemini response
}