import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (idToken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload();
    } catch (error) {
        throw new Error('Invalid Google token');
    }
};

export const findOrCreateUser = async (googlePayload) => {
    const { email, sub, picture, name } = googlePayload;

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            email,
            name,
            picture,
            oauthId: sub,
            oauthProvider: 'google',
        });
    } else if (!user.oauthId) {
        // Link existing email user to Google OAuth if they haven't used it before
        user.oauthId = sub;
        user.oauthProvider = 'google';
        await user.save();
    }

    return user;
};

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

