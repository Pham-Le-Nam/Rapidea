import { useState } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import { registerApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Description } from "@/components/ui/description";

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { isLoggedIn, login } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault(); // prevent page refresh
        setErrorMessage("");

        try {
            const response = await registerApi(email, password, confirmPassword, firstname, lastname, middlename);

            // assuming backend returns { access_token: string }
            login(response.access_token);

            // redirect after login
            navigate("/");

        } catch (error: any) {
            if (error.response?.status === 401) {
                setErrorMessage(error.response.data?.message || "Invalid registration details");
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className="flex-col md:flex-row flex items-center justify-center px-3 gap-[max(1rem,2vw)]">
            <Description />

            <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200 rounded-md shadow-md w-full max-w-sm flex flex-col items-center md:self-start">
                <h3 className="text-lg font-bold mb-4">
                    Register to start your lessons
                </h3>
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

                <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="h-10 mt-1 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="h-10 mt-1 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter your first name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="h-10 mt-1 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter your last name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700">
                        Middle Name
                    </label>
                    <input
                        type="text"
                        className="h-10 mt-1 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter your middle name"
                        value={middlename}
                        onChange={(e) => setMiddlename(e.target.value)}
                    />
                </div>

                {errorMessage && (
                <div className="w-full flex justify-start mb-2">
                    <span className="text-red-500 text-sm">{errorMessage}</span>
                </div>
                )}

                <Button type="submit" className="mt-3 h-11 w-full bg-main hover:bg-main-hover">
                    Register
                </Button>

                <h3 className="mt-4 text-sm text-black">
                    Already have an account?{" "}
                    <a href="/login" className="text-main hover:underline">
                        Login
                    </a>
                </h3>
            </form>
        </div>
    );
}

export default Register;