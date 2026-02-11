auth controller changes backend

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authService.findOrCreateUser(email, password, name);
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
            },
        });

    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(401).json({ message: 'Login failed', error: err.message });
    }
}


authService changes backend

export const findOrCreateUser = async (googlePayload) => {
    const { email, password, sub, picture, name } = googlePayload;

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            email,
            password,
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

LoginPage.jsx

import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [payload, setPayload] = useState[{
        name: payload.name,
        email: payload.email,
        password: payload.password
    }]
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        e.preventDefault();

        setLoading(true)

        try {

        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;
            await login(credential);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try again.");
        }
    };

    const handleError = () => {
        console.error("Google Login Error");
        alert("Google Login Error. Please try again.");
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="text-center">
                    <Link to="/" className="inline-block">
                        <img
                            src="/easytrip-logo-transparent.png"
                            alt="Easytrip"
                            className="mx-auto h-12 w-auto"
                        />
                    </Link>
                    <h2 className="mt-6 text-3xl font-serif text-foreground">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to access your travel plans
                    </p>
                </div>

                <div>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40" />
                    <input
                        onChange={handleChange}
                        type="text"
                        name="email"
                        id="email"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40" />
                    <input
                        onChange={handleChange}
                        type="password"
                        id="password"
                        name="password"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40" />
                        <button onClick={handleSubmit} disabled={loading}>Login</button>
                </div>

                <div className="mt-8 flex justify-center">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        useOneTap
                        theme="filled_blue"
                        shape="pill"
                        size="large"
                    />
                </div>

                <p className="mt-8 text-center text-xs text-muted-foreground">
                    By clicking "Sign in with Google", you agree to our{" "}
                    <Link to="#" className="underline hover:text-foreground">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="#" className="underline hover:text-foreground">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}




