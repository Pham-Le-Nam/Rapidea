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
            setErrorMessage(error.response.data?.message || "Invalid registration details");
        }
    }

    return (
        <div className="auth-page">
            <Description />

            <form onSubmit={handleSubmit} className="auth-form">
                <h3 className="auth-headline">
                    Register to start your lessons
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

                <div className="auth-input-container">
                    <label className="auth-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-input-container">
                    <label className="auth-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Enter your first name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-input-container">
                    <label className="auth-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Enter your last name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-input-container">
                    <label className="auth-label">
                        Middle Name
                    </label>
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Enter your middle name"
                        value={middlename}
                        onChange={(e) => setMiddlename(e.target.value)}
                    />
                </div>

                {errorMessage && (
                <div className="auth-error-container">
                    <span className="auth-error">{errorMessage}</span>
                </div>
                )}

                <Button type="submit" className="mt-3 h-11 w-full bg-main hover:bg-main-hover">
                    Register
                </Button>

                <h3 className="mt-4">
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