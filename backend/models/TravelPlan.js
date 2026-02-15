import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coords: {
        lat: Number,
        lng: Number
    },
    shortDescription: String
});

const planDaySchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    activities: [activitySchema]
});

const travelPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    destinationCoords: {
        lat: Number,
        lng: Number
    },
    destinationDescription: String,
    tripLength: {
        type: String,
        required: true
    },
    highlights: [{
        name: String,
        coords: {
            lat: Number,
            lng: Number
        }
    }],
    groupSize: {
        type: String,
        required: true
    },
    startDate: Date,
    endDate: Date,
    planDays: [planDaySchema],
    rawAIOutput: String
}, {
    timestamps: true
});

const TravelPlan = mongoose.model('TravelPlan', travelPlanSchema);
export default TravelPlan;
