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

export async function getProfileByIdApi(id: string) {
    const token = localStorage.getItem("token");
    let response: any | undefined = undefined;

    if (token) {
        response = await API.get(
            `api/users/id/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        );
    }
    else {
        response = await API.get(`api/users/id/${id}`);
    }

    return response.data;
}

export async function getMeApi() {
    const token = localStorage.getItem("token");

    const response = await API.get(
        `api/users/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function searchApi(query: string) {
    const response = await API.get(
        `api/search`,
        {
            params: {
                q: query,
            },
        },
    );

    return response.data;
}

export async function getSocialLinkApi(username: string) {
    const response = await API.get(`api/social-link/${username}`);

    return response.data;
}

export async function updateProfileApi(
    currentUsername: string,
    data: {
        firstname?: string;
        lastname?: string;
        middlename?: string;
        avatarId?: number;
        backgroundId?: number;
        headline?: string;
        bio?: string;
    },
) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/users/${currentUsername}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function uploadPhotoApi(photo: File) {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", photo);

    const response = await API.post(
        `api/photo/upload`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response.data;
}

export async function uploadCourseThumbnailApi(courseId: string, photo: File) {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", photo);

    const response = await API.post(
        `api/photo/course/${courseId}/thumbnail`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response.data;
}

export async function addSocialLinkApi(platform: string, url: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/social-link/add`,
        {
            platform,
            url,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function updateSocialLinkApi(id: string, url: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/social-link/update`,
        {
            id,
            url,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function deleteSocialLinkApi(id: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/social-link/delete`,
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

export async function getFollowApi(followingId: string) {
    const token = localStorage.getItem("token");

    const response = await API.get(
        `api/follow/${followingId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function followUserApi(followingId: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/follow/add`,
        {
            followingId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function unfollowUserApi(followingId: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/follow/delete`,
        {
            followingId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

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
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get (
        `api/course/${username}`,
        config,
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

export async function udpateCourseApi(id: string, title: string, description?: string, price?: number, currency?: string, thumbnailId?: number) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/course/update/${id}`,
        {
            title,
            description,
            price,
            currency,
            thumbnailId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function getSubscriptionApi(courseId: string) {
    const token = localStorage.getItem("token");

    const response = await API.get(
        `api/subscribe/${courseId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function subscribeCourseApi(courseId: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/subscribe/add`,
        {
            courseId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function getCourseReviewsApi(courseId: string) {
    const response = await API.get(
        `api/subscribe/course/${courseId}/reviews`,
    );

    return response.data;
}

export async function reviewCourseApi(courseId: string, review: string, rating: number) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/subscribe/review`,
        {
            courseId,
            review,
            rating,
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
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/course/id/${id}`,
        config,
    );

    return response.data;
}

export async function getFolderApi (folderId: string) {
    const token = localStorage.getItem("token");
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/folder/${folderId}`,
        config,
    );

    return response.data;
}

export async function getUserFoldersApi(username: string) {
    const token = localStorage.getItem("token");
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/folder/user/${username}`,
        config,
    );
    console.log(response.data);
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

export async function deleteFolderApi (folderId: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/folder/delete`,
        {
            folderId,
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
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/file/url/${fileId}`,
        config,
    );

    return response.data;
}

export async function updateFileApi (fileId: string, name: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/file/update`,
        {
            fileId,
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

export async function deleteFileApi (fileId: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/file/delete`,
        {
            fileId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function addPostApi (title: string, content: any, courseId?: string, isPreview?: boolean) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/post/add`,
        {
            title,
            content,
            courseId,
            isPreview,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function updatePostApi (title: string, content: any, postId?: string, isPreview?: boolean) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/post/update`,
        {
            postId,
            title,
            content,
            isPreview,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function deletePostApi (postId: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/post/delete`,
        {
            postId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function getPostApi (postId: string) {
    const token = localStorage.getItem("token");
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/post/${postId}`,
        config,
    );

    return response.data;
}

export async function getPostsByUsernameApi(username: string) {
    const token = localStorage.getItem("token");
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/post/user/${username}`,
        config,
    );

    return response.data;
}

export async function addFileToPostApi (fileId: string, postId: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/file-in-post/add`,
        {
            fileId,
            postId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function removeFileToPostApi (fileId: string, postId: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/file-in-post/delete`,
        {
            fileId,
            postId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function getFilesOfPostApi (postId: string) {
    const token = localStorage.getItem("token");
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/file-in-post/post/${postId}`,
        config,
    );

    return response.data;
}

export async function getPostsOfCourseApi (
    courseId: string,
    options: {
        previewOnly?: boolean;
        orderBy?: "rating" | "createdAt";
        order?: "asc" | "desc";
    } = {},
) {
    const token = localStorage.getItem("token");
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/post/course/${courseId}`,
        {
            ...config,
            params: {
                previewOnly: options.previewOnly,
                orderBy: options.orderBy,
                order: options.order,
            },
        },
    );

    return response.data;
}

export async function getRatePostApi (postId: string) {
    const token = localStorage.getItem("token");

    try {
        const response = await API.get(
            `api/rate-post/${postId}`, 
            {
                headers: { 
                    Authorization: `Bearer ${token}`
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("getRatePostApi error:", error);
        throw error;
    }
}

export async function addRatePostApi (postId: string, rating: number) {
    const token = localStorage.getItem("token");

    try {
        const response = await API.post(
            `api/rate-post/add`,
            {
                postId,
                rating,
            },
            {
                headers: { 
                    Authorization: `Bearer ${token}`
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("getRatePostApi error:", error);
        throw error;
    }
}

export async function updateRatePostApi (postId: string, rating?: number) {
    const token = localStorage.getItem("token");

    try {
        const response = await API.post(
            `api/rate-post/update`,
            {
                postId,
                rating,
            },
            {
                headers: { 
                    Authorization: `Bearer ${token}`
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("getRatePostApi error:", error);
        throw error;
    }
}

export async function getDiscussionsByPostApi (postId: string, startIndex: number = 0, amount: number = 5) {
    const response = await API.get(
        `api/discussion/post/${postId}`,
        {
            params: {
                startIndex,
                amount,
            },
        },
    );

    return response.data;
}

export async function getChildrenDiscussionsApi (discussionId: string, startIndex: number = 0, amount: number = 20) {
    const response = await API.get(
        `api/discussion/children/${discussionId}`,
        {
            params: {
                startIndex,
                amount,
            },
        },
    );

    return response.data;
}

export async function getDiscussionByIdApi (discussionId: string) {
    const token = localStorage.getItem("token");
    let response: any | undefined = undefined;

    if (token) {
        response = await API.get(
            `api/discussion/${discussionId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        );
    }
    else {
        response = await API.get(`api/discussion/${discussionId}`);
    }

    return response.data;
}

export async function addDiscussionApi (postId: string, discussion: any, repliedId?: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/discussion/add`,
        {
            postId,
            discussion,
            repliedId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function updateDiscussionApi (id: string, discussion: any) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/discussion/update`,
        {
            id,
            discussion,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function deleteDiscussionApi (id: string) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/discussion/delete`,
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

export async function getRateDiscussionApi (discussionId: string) {
    const token = localStorage.getItem("token");

    const response = await API.get(
        `api/rate-discussion/${discussionId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function addRateDiscussionApi (discussionId: string, rating: number) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/rate-discussion/add`,
        {
            discussionId,
            rating,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function updateRateDiscussionApi (discussionId: string, rating: number) {
    const token = localStorage.getItem("token");

    const response = await API.post(
        `api/rate-discussion/update`,
        {
            discussionId,
            rating,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function getRecentSidebarApi() {
    const token = localStorage.getItem("token");

    const response = await API.get(
        `api/recent/sidebar`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}
