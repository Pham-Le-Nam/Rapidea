const apiUrl = String(import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const photoStorageFolder = String(import.meta.env.VITE_PHOTO_STORAGE_FOLDER || "")
    .replace(/^\/+|\/+$/g, "");

function isAbsoluteUrl(value: string) {
    return /^(?:https?:|blob:|data:)/i.test(value);
}

function constructUrl(...parts: string[]) {
    return parts
        .filter(Boolean)
        .map((part, index) => index === 0 ? part.replace(/\/+$/, "") : part.replace(/^\/+|\/+$/g, ""))
        .join("/");
}

export function buildMediaUrl(value?: string | null) {
    const mediaValue = String(value || "").trim();

    if (!mediaValue) return "";
    if (isAbsoluteUrl(mediaValue)) return mediaValue;

    const normalizedValue = mediaValue.replace(/^\/+/, "");
    const path = photoStorageFolder && normalizedValue.startsWith(`${photoStorageFolder}/`)
        ? normalizedValue
        : constructUrl(photoStorageFolder, normalizedValue);

    return constructUrl(apiUrl, path);
}

export const DEFAULT_AVATAR_URL = buildMediaUrl(import.meta.env.VITE_DEFAULT_AVATAR_URL);
export const DEFAULT_BACKGROUND_URL = buildMediaUrl(import.meta.env.VITE_DEFAULT_BACKGROUND_URL);
export const DEFAULT_EXPERIENCE_LOGO_URL = buildMediaUrl(import.meta.env.VITE_DEFAULT_EXPERIENCE_LOGO_URL);
export const DEFAULT_EDUCATION_LOGO_URL = buildMediaUrl(import.meta.env.VITE_DEFAULT_EDUCATION_LOGO_URL);
export const DEFAULT_PROJECT_LOGO_URL = buildMediaUrl(import.meta.env.VITE_DEFAULT_PROJECT_LOGO_URL);
export const DEFAULT_COURSE_THUMBNAIL_URL = buildMediaUrl(import.meta.env.VITE_DEFAULT_COURSE_THUMBNAIL_URL);
