import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { loginWithGoogle, register, loginWithEmail } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { success, error, info, warning } = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;
            await loginWithGoogle(credential);
            navigate("/dashboard");
            success("Login successful");
        } catch (err) {
            error(`${err.response?.data?.message || "Login failed, please try again."}`);
        }
    };

    const handleGoogleError = () => {
        error("Google Login Error. Please try again.");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                await loginWithEmail({ email: formData.email, password: formData.password });
            } else {
                await register({ name: formData.name, email: formData.email, password: formData.password, confirmPassword: formData.confirmPassword });
            }
            navigate("/dashboard");
            success("Login successful");
        } catch (err) {
            error(`${err.response?.data?.message || "Login failed, please try again."}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block transition-transform hover:scale-105">
                        <img
                            src="/easytrip-logo-transparent.png"
                            alt="Easytrip"
                            className="mx-auto h-16 w-auto drop-shadow-sm"
                        />
                    </Link>
                    <h2 className="mt-6 text-3xl font-serif text-foreground">
                        {isLogin ? "Welcome back" : "Create an account"}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {isLogin
                            ? "Enter your details to access your travel plans"
                            : "Start your journey with EasyTrip today"}
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-card border border-border rounded-2xl shadow-soft p-8 backdrop-blur-sm bg-opacity-95">

                    {/* Tab Switcher */}
                    <div className="flex p-1 mb-8 bg-secondary/50 rounded-xl relative">
                        <div
                            className={`absolute inset-y-1 w-[calc(50%-4px)] bg-accent rounded-lg shadow-sm transition-all duration-300 ease-in-out ${isLogin ? 'left-1' : 'left-[calc(50%)]'}`}
                        />
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`relative flex-1 py-2 text-sm font-medium transition-colors z-10 ${isLogin ? 'text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`relative flex-1 py-2 text-sm font-medium transition-colors z-10 ${!isLogin ? 'text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Google Login */}
                    <div className="mb-8 flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            useOneTap
                            theme="filled_blue"
                            shape="pill"
                            size="large"
                            text={"continue_with"}
                        />
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground font-medium">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-input bg-transparent py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-input bg-transparent py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-medium text-muted-foreground ml-1">Password</label>
                                {isLogin && (
                                    <Link to="#" className="text-xs font-medium text-accent hover:underline">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-input bg-transparent py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground ml-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-input bg-transparent py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full inline-flex items-center justify-center rounded-xl bg-accent py-2.5 text-sm font-medium text-accent-foreground shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
                        >
                            {isLoading ? (
                                "Processing..."
                            ) : (
                                <>
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-xs text-muted-foreground">
                    By continuing, you agree to our{" "}
                    <Link to="#" className="underline hover:text-accent">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="#" className="underline hover:text-accent">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
