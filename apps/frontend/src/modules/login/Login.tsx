import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { loginApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Description } from "@/components/ui/description";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { isLoggedIn, login } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault(); // prevent page refresh
        setErrorMessage("");

        try {
            const response = await loginApi(email, password);

            // assuming backend returns { access_token: string }
            login(response.access_token);

            // redirect after login
            navigate("/");

        } catch (error: any) {
            setErrorMessage(error.response.data?.message);
        }
    }

    return (
        <div className="auth-page">
            <Description />

        <form onSubmit={handleSubmit} className="auth-form">
            <h3 className="auth-headline">
                Login to start your lessons
            </h3>

            <div className="auth-input-container">
                <label className="auth-label">
                    Email
                </label>
                <input
                    type="email"
                    className="auth-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="auth-input-container">
                <label className="auth-label">
                    Password
                </label>
                <input
                    type="password"
                    className="auth-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="w-full flex justify-end mb-2">
                <a href="/forgot-password" className="text-main hover:underline">
                    Forgot password?
                </a>
            </div>

            {errorMessage && (
            <div className="auth-error-container">
                <span className="auth-error">{errorMessage}</span>
            </div>
            )}

            <Button type="submit" className="mt-3 h-11 w-full bg-main hover:bg-main-hover text-md">
                Login
            </Button>

            <h3 className="mt-4">
                Don't have an account?{" "}
                <a href="/register" className="text-main hover:underline">
                    Register
                </a>
            </h3>
        </form>
        </div>
    );
}

export default Login;
