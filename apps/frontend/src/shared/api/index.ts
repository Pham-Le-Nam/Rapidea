import { env } from "@/config/env";
import { authTokenStorage } from "@/shared/storage/authToken";
import { apiClient as API } from "./client";

function optionalDate(date?: string) {
    const normalizedDate = date?.trim();
    return normalizedDate || undefined;
}

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

export async function verifyEmailAuthApi(token: string) {
    const response = await API.get("api/auth/email/verify", { params: { token } });
    return response.data;
}

export function getOAuthUrl(provider: "google") {
    const base = env.apiUrl.replace(/\/?$/, "/");
    return `${base}api/auth/oauth/${provider}`;
}

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
    const token = authTokenStorage.get();
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
    const token = authTokenStorage.get();
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
    const token = authTokenStorage.get();

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

export async function getPayoutAccountApi() {
    const token = authTokenStorage.get();

    const response = await API.get(
        `api/users/me/payout-account`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function updatePayoutAccountApi(data: {
    accountHolderName?: string;
    country?: string;
    currency?: string;
    payoutMethod?: string;
    bankName?: string;
    routingNumber?: string;
    accountNumber?: string;
    paypalEmail?: string;
    taxResidency?: string;
    businessType?: string;
}) {
    const token = authTokenStorage.get();

    const response = await API.post(
        `api/users/me/payout-account`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
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
        avatarId?: number | null;
        backgroundId?: number | null;
        headline?: string;
        bio?: string;
    },
) {
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();
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

export async function getPhotoApi(id: number) {
    const response = await API.get(`api/photo/${id}`);

    return response.data;
}

export async function uploadCourseThumbnailApi(courseId: string, photo: File) {
    const token = authTokenStorage.get();
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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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

export async function getChatConversationsApi(onlyRelated: boolean = true) {
    const token = authTokenStorage.get();

    const response = await API.get(
        `api/chat/conversations`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                onlyRelated,
            },
        },
    );

    return response.data;
}

export async function getNotificationsApi(options: {
    offset?: number;
    limit?: number;
} = {}) {
    const token = authTokenStorage.get();

    const response = await API.get(
        `api/notifications`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                offset: options.offset,
                limit: options.limit,
            },
        },
    );

    return response.data;
}

export async function markNotificationReadApi(notificationId: string) {
    const token = authTokenStorage.get();

    const response = await API.post(
        `api/notifications/read`,
        { notificationId },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function markAllNotificationsReadApi() {
    const token = authTokenStorage.get();

    const response = await API.post(
        `api/notifications/read-all`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function generatePostFieldApi(data: {
    target: "title" | "details";
    title?: string;
    details?: string;
    tags?: string[];
    fileIds?: string[];
}) {
    const token = authTokenStorage.get();
    const response = await API.post("api/post/generate", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export async function updateCreatorPromptApi(creatorPrompt: string) {
    const token = authTokenStorage.get();
    const response = await API.post("api/users/me/creator-prompt", { creatorPrompt }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export async function getAdminModerationQueueApi() {
    const token = authTokenStorage.get();
    return (await API.get("api/admin/moderation", { headers: { Authorization: `Bearer ${token}` } })).data;
}

export async function sendAdminWarningApi(userId: string, message: string, link?: string) {
    const token = authTokenStorage.get();
    return (await API.post("api/admin/warning", { userId, message, link }, { headers: { Authorization: `Bearer ${token}` } })).data;
}

export async function banUserAdminApi(userId: string, reason: string) {
    const token = authTokenStorage.get();
    return (await API.post(`api/admin/users/${userId}/ban`, { reason }, { headers: { Authorization: `Bearer ${token}` } })).data;
}

export async function deleteAdminEntityApi(type: "posts" | "courses" | "files", id: string) {
    const token = authTokenStorage.get();
    return (await API.delete(`api/admin/${type}/${id}`, { headers: { Authorization: `Bearer ${token}` } })).data;
}

export async function getChatConversationApi(otherUserId: string, limit: number = 10, before?: string) {
    const token = authTokenStorage.get();

    const response = await API.get(
        `api/chat/conversation/${otherUserId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                limit,
                before,
            },
        },
    );

    return response.data;
}

export async function sendChatMessageApi(otherUserId: string, text: string) {
    const token = authTokenStorage.get();

    const response = await API.post(
        `api/chat/conversation/${otherUserId}/messages`,
        {
            text,
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

export async function updateEducationApi(educationId: string, schoolName?: string, location?: string, major?: string, degree?: string, startedAt?: string, endedAt?: string, description?: string, logoId?: number | null) {
    const token = authTokenStorage.get();

    const response = await API.post(
        "api/education/update", 
        {
            id: educationId,
            name: schoolName,
            location: location,
            major: major,
            degree: degree,
            startedAt: optionalDate(startedAt),
            endedAt: optionalDate(endedAt),
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
    const token = authTokenStorage.get();

    const response = await API.post(
        "api/education/add", 
        {
            name: schoolName,
            location: location,
            major: major,
            degree: degree,
            startedAt: optionalDate(startedAt),
            endedAt: optionalDate(endedAt),
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

export async function updateExperienceApi(experienceId: string, organizationName?: string, location?: string, position?: string, role?: string, startedAt?: string, endedAt?: string, description?: string, logoId?: number | null) {
    const token = authTokenStorage.get();
    console.log(experienceId);

    const response = await API.post(
        "api/experience/update", 
        {
            id: experienceId,
            name: organizationName,
            location: location,
            role: role,
            position: position,
            startedAt: optionalDate(startedAt),
            endedAt: optionalDate(endedAt),
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
    const token = authTokenStorage.get();

    const response = await API.post(
        "api/experience/add", 
        {
            name: organizationName,
            location: location,
            position: position,
            role: role,
            startedAt: optionalDate(startedAt),
            endedAt: optionalDate(endedAt),
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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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

export async function updateProjectApi (id: string, name?: string, role?: string, startedAt?: string, endedAt?: string, details?: string, logoId?: number | null) {
    const token = authTokenStorage.get();

    const response = await API.post(
        "api/project/update", 
        {
            id,
            name,
            role,
            startedAt: optionalDate(startedAt),
            endedAt: optionalDate(endedAt),
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
    const token = authTokenStorage.get();

    const response = await API.post(
        "api/project/add", 
        {
            name,
            role,
            startedAt: optionalDate(startedAt),
            endedAt: optionalDate(endedAt),
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
    const token = authTokenStorage.get();

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

export async function getCoursesApi (username: string, options: { offset?: number; limit?: number } = {}) {
    const token = authTokenStorage.get();
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get (
        `api/course/${username}`,
        {
            ...config,
            params: {
                offset: options.offset,
                limit: options.limit,
            },
        },
    );

    return response.data;
}

export async function getTagsApi() {
    const response = await API.get(`api/tags`);

    return response.data;
}

export async function suggestTagsApi(text: string, limit: number = 5) {
    const response = await API.post(`api/tags/suggest`, {
        text,
        limit,
    });

    return response.data;
}

export async function addCourseApi(title: string, description?: string, price?: number, currency?: string, tags: string[] = []) {
    const token = authTokenStorage.get();

    const response = await API.post(
        `api/course/add`,
        {
            title,
            description,
            price,
            currency,
            tags,
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
    const token = authTokenStorage.get();

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

export async function udpateCourseApi(id: string, title: string, description?: string, price?: number, currency?: string, thumbnailId?: number, tags: string[] = []) {
    const token = authTokenStorage.get();

    const response = await API.post(
        `api/course/update/${id}`,
        {
            title,
            description,
            price,
            currency,
            thumbnailId,
            tags,
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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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

export async function createCourseCheckoutApi(courseId: string) {
    const token = authTokenStorage.get();
    const response = await API.post(`api/subscribe/checkout`, { courseId }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export async function confirmCourseCheckoutApi(sessionId: string) {
    const token = authTokenStorage.get();
    const response = await API.post(`api/subscribe/checkout/confirm`, { sessionId }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export async function getCourseReviewsApi(courseId: string) {
    const response = await API.get(
        `api/subscribe/course/${courseId}/reviews`,
    );

    return response.data;
}

export async function reviewCourseApi(courseId: string, review: string, rating: number) {
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();
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
    const token = authTokenStorage.get();
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
    const token = authTokenStorage.get();
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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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

export async function getFolderPostUsagesApi(folderId: string) {
    const token = authTokenStorage.get();

    const response = await API.get(
        `api/folder/${folderId}/post-usages`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response.data;
}

export async function uploadFileApi(folderId: string, file: File) {
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();
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

export async function getOfficePreviewUrlApi(fileId: string) {
    const token = authTokenStorage.get();
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/file/office-preview-url/${fileId}`,
        config,
    );

    return response.data;
}

export async function updateFileApi (fileId: string, name: string) {
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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

export async function getPostsUsingFileApi(fileId: string) {
    const token = authTokenStorage.get();

    const response = await API.get(
        `api/file-in-post/file/${fileId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response.data;
}

export async function addPostApi (title: string, content: any, courseId?: string, isPreview?: boolean, tags: string[] = []) {
    const token = authTokenStorage.get();

    const response = await API.post(
        `api/post/add`,
        {
            title,
            content,
            courseId,
            isPreview,
            tags,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },
    );

    return response.data;
}

export async function updatePostApi (title: string, content: any, postId?: string, isPreview?: boolean, courseId?: string | null, tags: string[] = []) {
    const token = authTokenStorage.get();

    const response = await API.post(
        `api/post/update`,
        {
            postId,
            title,
            content,
            isPreview,
            courseId,
            tags,
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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();
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

export async function getHomepageFeedApi(options: {
    offset?: number;
    limit?: number;
} = {}) {
    const token = authTokenStorage.get();
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/post/homepage-feed`,
        {
            ...config,
            params: {
                offset: options.offset,
                limit: options.limit,
            },
        },
    );

    return response.data;
}

export async function getPostsByUsernameApi(username: string, options: {
    offset?: number;
    limit?: number;
    courseId?: string;
    nonCourseOnly?: boolean;
    previewMode?: "all" | "preview" | "nonPreview";
    orderBy?: "rating" | "createdAt";
    order?: "asc" | "desc";
} = {}) {
    const token = authTokenStorage.get();
    const config = token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        : undefined;

    const response = await API.get(
        `api/post/user/${username}`,
        {
            ...config,
            params: {
                offset: options.offset,
                limit: options.limit,
                courseId: options.courseId,
                nonCourseOnly: options.nonCourseOnly,
                previewMode: options.previewMode,
                orderBy: options.orderBy,
                order: options.order,
            },
        },
    );

    return response.data;
}

export async function addFileToPostApi (fileId: string, postId: string) {
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();
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
        offset?: number;
        limit?: number;
    } = {},
) {
    const token = authTokenStorage.get();
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
                offset: options.offset,
                limit: options.limit,
            },
        },
    );

    return response.data;
}

export async function getRatePostApi (postId: string) {
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

    const response = await API.get(
        `api/discussion/post/${postId}`,
        {
            params: {
                startIndex,
                amount,
            },
            ...(token
                ? {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                : {}),
        },
    );

    return response.data;
}

export async function getChildrenDiscussionsApi (discussionId: string, startIndex: number = 0, amount: number = 20) {
    const token = authTokenStorage.get();

    const response = await API.get(
        `api/discussion/children/${discussionId}`,
        {
            params: {
                startIndex,
                amount,
            },
            ...(token
                ? {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                : {}),
        },
    );

    return response.data;
}

export async function getDiscussionByIdApi (discussionId: string) {
    const token = authTokenStorage.get();
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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
    const token = authTokenStorage.get();

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
