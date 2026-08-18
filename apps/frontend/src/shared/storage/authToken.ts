const AUTH_TOKEN_KEY = "token";

export const authTokenStorage = {
    get() {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    },
    set(token: string) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    },
    clear() {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    },
};
