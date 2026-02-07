import mongoose from "mongoose";

const DestinationInfoSchema = new mongoose.Schema(
    {
        // Identification
        country: {
            type: String,
            required: true,
            index: true,
            unique: true
        },

        // Descriptions
        destinationDescription: {
            type: String,
            required: true
        },

        // Geography & basics
        capital: {
            type: String
        },
        timezone: {
            type: String
        },

        // Language (MVP: single primary language only)
        primaryLanguage: {
            type: String,
            required: true
        },

        languages: {
            type: Object,
            required: true
        },

        // Currency info
        currency: {
            code: { type: String },       // e.g. "JPY"
            name: { type: String },       // e.g. "Japanese Yen"
            symbol: { type: String }      // e.g. "¥"
        },

        // Weather (summary, not live forecast)
        weatherSummary: {
            type: String
        },

        // Transportation (high-level only)
        transportationModes: {
            type: [String],               // ["Train", "Bus", "Taxi"]
            default: []
        },

        lastUpdated: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const DestinationInfo = mongoose.model('DestinationInfo', DestinationInfoSchema);
export default DestinationInfo;
