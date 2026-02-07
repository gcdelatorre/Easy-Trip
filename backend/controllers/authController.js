import * as authService from '../services/authService.js';

export const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ message: 'idToken is required' });
        }

        const payload = await authService.verifyGoogleToken(idToken);
        const user = await authService.findOrCreateUser(payload);
        const token = authService.generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name || payload.name,
                picture: user.picture || payload.picture
            },
            token
        });
    } catch (error) {
        console.error('Auth Error:', error.message);
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout Error:', error.message);
        res.status(500).json({ message: 'Logout failed', error: error.message });
    }
};
