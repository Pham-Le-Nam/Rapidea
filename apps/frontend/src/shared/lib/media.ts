import { env } from "@/config/env";

const apiUrl = env.apiUrl.replace(/\/+$/, "");
const photoStorageFolder = env.photoStorageFolder
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

    return buildApiUrl(path);
}

export function buildApiUrl(value?: string | null) {
    const urlValue = String(value || "").trim();

    if (!urlValue) return "";
    if (isAbsoluteUrl(urlValue)) return urlValue;

    return constructUrl(apiUrl, urlValue.replace(/^\/+/, ""));
}

export const DEFAULT_AVATAR_URL = buildMediaUrl(env.defaultAvatar);
export const DEFAULT_BACKGROUND_URL = buildMediaUrl(env.defaultBackground);
export const DEFAULT_EXPERIENCE_LOGO_URL = buildMediaUrl(env.defaultExperienceLogo);
export const DEFAULT_EDUCATION_LOGO_URL = buildMediaUrl(env.defaultEducationLogo);
export const DEFAULT_PROJECT_LOGO_URL = buildMediaUrl(env.defaultProjectLogo);
export const DEFAULT_COURSE_THUMBNAIL_URL = buildMediaUrl(env.defaultCourseThumbnail);
