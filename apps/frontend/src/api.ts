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

export async function getExperienceApi(username: string) {
    const response = await API.get(`api/experience/${username}`);

    return response.data;
}

export async function getEducationApi(username: string) {
    const response = await API.get(`api/education/${username}`);

    return response.data;
}

export async function getProjectApi(username: string) {
    const response = await API.get(`api/project/${username}`);

    return response.data;
}

export async function getProjectLinkApi(projectId: string) {
    const response = await API.get(`api/project-link/${projectId}`)

    return response.data;
}

export async function updateEducationApi(educationId: string, schoolName?: string, location?: string, major?: string, degree?: string, startedAt?: string, endedAt?: string, description?: string, logoId?: number) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/education/update", 
        {
            id: educationId,
            name: schoolName,
            location: location,
            major: major,
            degree: degree,
            startedAt: startedAt,
            endedAt: endedAt,
            achievement: description,
            logoId: logoId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function addEducationApi(schoolName: string, location?: string, major?: string, degree?: string, startedAt?: string, endedAt?: string, description?: string, logoId?: number) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/education/add", 
        {
            name: schoolName,
            location: location,
            major: major,
            degree: degree,
            startedAt: startedAt,
            endedAt: endedAt,
            achievement: description,
            logoId: logoId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function updateExperienceApi(experienceId: string, organizationName?: string, location?: string, position?: string, role?: string, startedAt?: string, endedAt?: string, description?: string, logoId?: number) {
    const token = localStorage.getItem("token");
    console.log(experienceId);

    const response = await API.post(
        "api/experience/update", 
        {
            id: experienceId,
            name: organizationName,
            location: location,
            role: role,
            position: position,
            startedAt: startedAt,
            endedAt: endedAt,
            achievement: description,
            logoId: logoId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function addExperienceApi(organizationName: string, location?: string, position?: string, role?: string, startedAt?: string, endedAt?: string, description?: string, logoId?: number) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/experience/add", 
        {
            name: organizationName,
            location: location,
            position: position,
            role: role,
            startedAt: startedAt,
            endedAt: endedAt,
            achievement: description,
            logoId: logoId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function deleteEducationApi (id: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/education/delete", 
        {
            id
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function deleteExperienceApi (id: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/experience/delete", 
        {
            id
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function deleteProjectLinkApi (id: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/project-link/delete", 
        {
            id
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function addProjectLinkApi (projectId: string, name: string, url: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/project-link/add", 
        {
            projectId,
            name,
            url
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function updateProjectLinkApi (id: string, name: string, url: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/project-link/update", 
        {
            id,
            name,
            url
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function updateProjectApi (id: string, name?: string, role?: string, startedAt?: string, endedAt?: string, details?: string, logoId?: number) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/project/update", 
        {
            id,
            name,
            role,
            startedAt,
            endedAt,
            details,
            logoId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function addProjectApi (name: string, role?: string, startedAt?: string, endedAt?: string, details?: string, logoId?: number) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/project/add", 
        {
            name,
            role,
            startedAt,
            endedAt,
            details,
            logoId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function deleteProjectApi (id: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        "api/project/delete", 
        {
            id
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function getCoursesApi (username: string) {
    const token = localStorage.getItem("token");

    const response = await API.get (
        `api/course/${username}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function addCourseApi(title: string, description?: string, price?: number, currency?: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/course/add`,
        {
            title,
            description,
            price,
            currency,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function deleteCourseApi(id: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/course/delete`,
        {
            id,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function getCourseApi (id: string) {
    const token = localStorage.getItem("token");

    const response = await API.get(
        `api/course/id/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function getFolderApi (folderId: string) {
    const token = localStorage.getItem("token");

    const response = await API.get(
        `api/folder/${folderId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function createFolderApi (folderName: string, parentId: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/folder/add`,
        {
            folderName,
            parentId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function renameFolderApi (folderId: string, name: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/folder/rename`,
        {
            folderId,
            name,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function uploadFileApi(folderId: string, file: File) {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file); // MUST match "file"
    formData.append("folderId", folderId); // goes into @Body()

    const response = await API.post(
        `api/file/add`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response.data;
}

export async function getFileApi(fileId: string) {
    const token = localStorage.getItem("token");

    const response = await API.get(
        `api/file/${fileId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}