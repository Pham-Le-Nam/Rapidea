import { useState, useEffect  } from "react";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import { verifyResetPasswordLink, resetPassword } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Description } from "@/components/ui/description";
import toast from "react-hot-toast";

function ResetPassword() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") ?? "";
    const [user, setUser] = useState<any>(null);
    const [isValidToken, setIsValidToken] = useState(true);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // To disable the button for 30 seconds after clicking
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const { isLoggedIn, login } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await verifyResetPasswordLink(token);
                setUser(response);
            } catch (error: any) {
                setIsValidToken(false);
                setErrorMessage(error.response?.data?.message || "Invalid or expired link");
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, [token]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else {
            setIsDisabled(false);
        }

        return () => clearTimeout(timer);
    }, [countdown]);

    

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault(); // prevent page refresh
        setErrorMessage("");

        try {
            // Disable button for 30 seconds
            setIsDisabled(true);
            setCountdown(30);

            const response = await resetPassword(password, confirmPassword, token);
            login(response.access_token);
            toast.success("Your password has been reset successfully, you will be redirect to the homepage");
            // redirect after login
            navigate("/");
        } catch (error: any) {
            setErrorMessage(error.response.data?.message);
            setIsValidToken(false);
        }
    }

    if (loading) {
        return <div className="flex justify-center items-center">
            Verifying link...
        </div>;
    }

    if (!isValidToken) {
        return <div className="flex justify-center items-center">
            {errorMessage}
        </div>;
    }

    return (
        <div className="auth-page">
            <Description />

        <form onSubmit={handleSubmit} className="auth-form">
            <h3 className="auth-headline">
                Reset Password for {user.email}
            </h3>

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
                    placeholder="Enter your confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            {errorMessage && (
            <div className="auth-error-container">
                <span className="auth-error">{errorMessage}</span>
            </div>
            )}

            <Button type="submit" className="mt-3 h-11 w-full bg-main hover:bg-main-hover text-md" disabled={isDisabled}>
                {isDisabled
                        ? `Resend in ${countdown}s`
                        : "Send Reset Link"}
            </Button>
        </form>
        </div>
    );
}
export default ResetPassword;