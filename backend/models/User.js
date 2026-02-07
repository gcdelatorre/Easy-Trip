import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: null
    },
    passwordHash: {
        type: String,
        required: function () {
            return !this.oauthProvider; // Required if not using OAuth
        }
    },
    oauthProvider: {
        type: String,
        default: null
    },
    oauthId: {
        type: String,
        default: null
    },
    plans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TravelPlan'
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
