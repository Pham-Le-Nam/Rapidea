import { uploadPhotoApi } from "@/features/profile/api";

export type ProfileItemImageChange = File | null | undefined;

export async function resolveProfileItemLogoId(
    currentLogoId: number | null | undefined,
    change: ProfileItemImageChange,
) {
    if (change instanceof File) {
        const photo = await uploadPhotoApi(change);
        return photo.id as number;
    }

    if (change === null) return null;

    return currentLogoId ?? undefined;
}
