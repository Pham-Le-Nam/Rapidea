import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmailAuthApi } from "@/features/auth/api";
import { useAuth } from "@/providers";

export default function EmailVerify() {
    const [params] = useSearchParams();
    const { login } = useAuth();
    const navigate = useNavigate();
    const started = useRef(false);
    const [message, setMessage] = useState("Verifying your email address...");

    useEffect(() => {
        if (started.current) return;
        started.current = true;
        const token = params.get("token");
        if (!token) {
            setMessage("This verification link is missing its token.");
            return;
        }
        verifyEmailAuthApi(token)
            .then((response) => {
                login(response.access_token);
                navigate("/", { replace: true });
            })
            .catch((error) => setMessage(error.response?.data?.message || "This email link is invalid or expired."));
    }, [login, navigate, params]);

    return <div className="auth-page"><div className="auth-form">{message}</div></div>;
}
