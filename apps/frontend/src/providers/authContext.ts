import { createContext, useContext } from "react";

export type AuthContextValue = {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
