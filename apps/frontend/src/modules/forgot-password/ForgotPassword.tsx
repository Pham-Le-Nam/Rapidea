import { useState, useEffect  } from "react";
import { Navigate } from "react-router-dom";
import { getResetPasswordLinkApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Description } from "@/components/ui/description";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [instructionMessage, setInstructionMessage] = useState("The password reset link will be sent to your email");

    // To disable the button for 30 seconds after clicking
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

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

            setInstructionMessage("The password reset link is being sent to your email...");

            const response = await getResetPasswordLinkApi(email);

            setInstructionMessage(response.success_message);

            console.log(instructionMessage);
        } catch (error: any) {
            setErrorMessage(error.response.data?.message);
            setIsDisabled(false);
            setCountdown(0);
        }
    }

    return (
        <div className="auth-page">
            <Description />

            <form onSubmit={handleSubmit} className="auth-form">
                <h3 className="auth-headline">
                    Forgot your password?
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

                <div className="w-full flex justify-end mb-2">
                    {instructionMessage}
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
export default ForgotPassword;