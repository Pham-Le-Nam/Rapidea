import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export async function loginApi(email: string, password: string) {
    const response = await API.post("api/auth/login", {
        email,
        password,
    });

    return response.data;
};

export async function registerApi(email: string, password: string, confirmPassword: string, firstname: string, lastname: string, middlename?: string) {
    const response = await API.post("api/auth/register", {
        email,
        password,
        confirmPassword,
        firstname,
        lastname,
        middlename,
    });

    return response.data;
};

export async function getResetPasswordLinkApi(email: string) {
    const response = await API.post("api/auth/reset-password", {
        email,
    })

    return response.data;
};

export async function verifyResetPasswordLinkApi(token: string) {
    const response = await API.get("api/auth/reset-password", {
        params: { token },
    })

    return response.data;
}

export async function resetPasswordApi(password: string, confirmPassword: string, token: string) {
    const response = await API.put("api/auth/reset-password", {
        password,
        confirmPassword,
        token,
    })

    return response.data;
}

export async function getProfileApi(username: string) {
    const token = localStorage.getItem("token");
    let response: any | undefined = undefined;
    
    if (token) {
        response = await API.get(`api/users/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }
    else {
        response = await API.get(`api/users/${username}`);
    } 

    return response.data;
}

export async function getSocialLinkApi(username: string) {
    const response = await API.get(`api/social-link/${username}`);

    return response.data;
}

