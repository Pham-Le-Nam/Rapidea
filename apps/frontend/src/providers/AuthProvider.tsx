import { useState, type ReactNode } from "react";
import { authTokenStorage } from "@/shared/storage/authToken";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!authTokenStorage.get()
    );

    const login = (token: string) => {
        authTokenStorage.set(token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        authTokenStorage.clear();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
