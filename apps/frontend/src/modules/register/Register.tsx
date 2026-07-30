import { useState } from "react";
import { Navigate } from "react-router-dom";
import { getOAuthUrl, registerApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Description } from "@/components/ui/description";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault(); // prevent page refresh
        setErrorMessage("");
        setSuccessMessage("");
        setSubmitting(true);

        try {
            const response = await registerApi(email, password, confirmPassword, firstname, lastname, middlename);
            setSuccessMessage(response.success_message);
        } catch (error: any) {
            setErrorMessage(error.response.data?.message || "Invalid registration details");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="auth-page">
            <Description />

            <form onSubmit={handleSubmit} className="auth-form">
                <h3 className="auth-headline">
                    Register to start your lessons
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <Button type="button" variant="outline" onClick={() => window.location.assign(getOAuthUrl("google"))}>
                        Continue with Google
                    </Button>
                </div>
                <div className="text-center text-sm text-muted-foreground mb-4">or register with email and password</div>
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
                {successMessage && (
                    <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">{successMessage}</div>
                )}

                <Button disabled={submitting || !!successMessage} type="submit" className="mt-3 h-11 w-full bg-main hover:bg-main-hover">
                    {submitting ? "Sending verification email..." : "Register"}
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
