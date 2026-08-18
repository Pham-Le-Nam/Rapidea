function required(name: string, value: string | undefined) {
    const normalized = String(value || "").trim();

    if (!normalized) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return normalized;
}

export const env = Object.freeze({
    apiUrl: required("VITE_API_URL", import.meta.env.VITE_API_URL),
    photoStorageFolder: required("VITE_PHOTO_STORAGE_FOLDER", import.meta.env.VITE_PHOTO_STORAGE_FOLDER),
    defaultAvatar: required("VITE_DEFAULT_AVATAR_URL", import.meta.env.VITE_DEFAULT_AVATAR_URL),
    defaultBackground: required("VITE_DEFAULT_BACKGROUND_URL", import.meta.env.VITE_DEFAULT_BACKGROUND_URL),
    defaultExperienceLogo: required("VITE_DEFAULT_EXPERIENCE_LOGO_URL", import.meta.env.VITE_DEFAULT_EXPERIENCE_LOGO_URL),
    defaultEducationLogo: required("VITE_DEFAULT_EDUCATION_LOGO_URL", import.meta.env.VITE_DEFAULT_EDUCATION_LOGO_URL),
    defaultProjectLogo: required("VITE_DEFAULT_PROJECT_LOGO_URL", import.meta.env.VITE_DEFAULT_PROJECT_LOGO_URL),
    defaultCourseThumbnail: required("VITE_DEFAULT_COURSE_THUMBNAIL_URL", import.meta.env.VITE_DEFAULT_COURSE_THUMBNAIL_URL),
});
