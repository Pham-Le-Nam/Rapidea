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
            if (error.response?.status === 401) {
                setErrorMessage(error.response.data?.message || "Invalid email or password");
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className="flex-col md:flex-row flex items-center justify-center px-3 gap-[max(1rem,2vw)]">
            <Description />

        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 border border-gray-200 rounded-md shadow-md w-full max-w-sm flex flex-col items-center"
        >
            <h3 className="text-lg font-bold mb-4">Login to start your lessons</h3>

            <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    className="h-10 mt-1 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    className="h-10 mt-1 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="w-full flex justify-end mb-2">
                <a href="/forgot-password" className="text-sm text-main hover:underline">
                    Forgot password?
                </a>
            </div>

            {errorMessage && (
            <div className="w-full flex justify-start mb-2">
                <span className="text-red-500 text-sm">{errorMessage}</span>
            </div>
            )}

            <Button
                type="submit"
                className="mt-3 h-11 w-full bg-main hover:bg-main-hover"
            >
                Login
            </Button>

            <h3 className="mt-4 text-sm text-black">
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
