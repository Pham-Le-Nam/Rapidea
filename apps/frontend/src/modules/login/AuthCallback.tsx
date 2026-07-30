import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallback() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        const token = new URLSearchParams(window.location.hash.slice(1)).get("token");
        if (!token) {
            setError("The sign-in response did not contain a valid session.");
            return;
        }
        login(token);
        window.history.replaceState({}, "", "/auth/callback");
        navigate("/", { replace: true });
    }, [login, navigate]);

    return <div className="auth-page"><div className="auth-form">{error || "Finishing sign in..."}</div></div>;
}
