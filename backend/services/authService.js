import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (idToken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload();
    } catch (error) {
        throw { status: 401, message: 'Invalid Google token' };
    }
};

export const registerUser = async (payload) => {
    const { email, password, name } = payload;

    const user = await User.findOne({ email });
    if (user) {
        throw { status: 400, message: 'User already exists' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        email,
        passwordHash: hashedPassword,
        name
    });

    return newUser;
}

export const loginUser = async (payload) => {
    const { email, password } = payload;

    const user = await User.findOne({ email });
    if (!user) {
        throw { status: 401, message: 'Invalid email or password' };
    }

    // Check if user is registered via OAuth (no password)
    if (!user.passwordHash) {
        throw { status: 400, message: 'This account uses Google Login. Please sign in with Google.' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw { status: 401, message: 'Invalid email or password' };
    }

    return user;
}

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
    } else {
        let updated = false;
        if (!user.oauthId) {
            user.oauthId = sub;
            user.oauthProvider = 'google';
            updated = true;
        }
        if (!user.picture && picture) {
            user.picture = picture;
            updated = true;
        }
        if (updated) await user.save();
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

