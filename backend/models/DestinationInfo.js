import mongoose from "mongoose";

const DestinationInfoSchema = new mongoose.Schema(
  {
    // Identification
    country: {
      type: String,
      required: true,
      index: true
    },
    city: {
      type: String,
      default: null
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
      type: String
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

    // Optional metadata
    source: {
      type: String                  // "manual", "restcountries", "openweather"
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
