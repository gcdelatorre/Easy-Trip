import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

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
