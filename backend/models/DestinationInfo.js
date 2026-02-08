import mongoose from "mongoose";

const DestinationInfoSchema = new mongoose.Schema(
    {
        country: {
            type: String,
            required: true,
            index: true,
            unique: true
        },

        destinationDescription: {
            type: String,
            required: true
        },

        capital: {
            type: String
        },
        timezone: {
            type: String
        },

        primaryLanguage: {
            type: String,
            required: true
        },

        languages: {
            type: Object,
            required: true
        },

        currency: {
            code: { type: String },       // e.g. "JPY"
            name: { type: String },       // e.g. "Japanese Yen"
            symbol: { type: String }      // e.g. "¥"
        },

        weatherSummary: {
            type: String
        },

        transportationModes: {
            type: [String],               // ["Train", "Bus", "Taxi"]
            default: []
        },

        imageUrl: {
            type: String,
            required: true
        },

        photographer: {
            type: String,
            required: true
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
