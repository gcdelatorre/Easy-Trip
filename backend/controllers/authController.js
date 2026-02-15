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
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
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
        });
    } catch (error) {
        console.error('Auth Error:', error.message); // to debug easier
        const status = error.status || 401;
        res.status(status).json({ message: error.message || 'Authentication failed' });
    }
};

export const register = async (req, res) => {
    try {
        const { email, password, confirmPassword, name } = req.body;

        if (!email || !password || !name || !confirmPassword) {
            return res.status(400).json({ message: 'Email, password, and name are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await authService.registerUser({ email, password, name });
        const token = authService.generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            message: 'Registration successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
        });
    } catch (err) {
        console.error('Registration Error:', err.message);
        const status = err.status || 500;
        res.status(status).json({ message: err.message || 'Registration failed' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email, and password are required' });
        }

        const user = await authService.loginUser({ email, password });
        const token = authService.generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
        });

    } catch (err) {
        console.error('Login Error:', err.message);
        const status = err.status || 500;
        res.status(status).json({ message: err.message || 'Login failed' });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            expires: new Date(0)
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout Error:', error.message);
        res.status(500).json({ message: 'Logout failed', error: error.message });
    }
};
