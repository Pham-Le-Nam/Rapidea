import { getPhotoApi } from "@/features/profile/api";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { ImageAdjuster } from "./ImageAdjuster";
import type { ProfileItemImageChange } from "../utils/profileItemImageUtils";
import { PROFILE_AVATAR_MAX_SIZE } from "../utils/profileImageConstants";
import { buildMediaUrl, DEFAULT_AVATAR_URL } from "@/shared/lib/media";

type ProfilePhoto = {
    photoUrl?: string;
    url?: string;
    name?: string;
}

function photoUrl(photo: ProfilePhoto, fallbackUrl: string) {
    const value = photo?.photoUrl || photo?.url || photo?.name;

    return buildMediaUrl(value) || fallbackUrl;
}

function useProfileItemImageUrl(logoId: number | null | undefined, fallbackUrl: string) {
    const [loadedPhoto, setLoadedPhoto] = useState<{ id: number; url: string } | null>(null);

    useEffect(() => {
        let active = true;

        if (!logoId) {
            return () => {
                active = false;
            };
        }

        getPhotoApi(logoId)
            .then((photo) => {
                if (active) setLoadedPhoto({ id: logoId, url: photoUrl(photo, fallbackUrl) });
            })
            .catch(() => undefined);

        return () => {
            active = false;
        };
    }, [fallbackUrl, logoId]);

    return logoId && loadedPhoto?.id === logoId ? loadedPhoto.url : fallbackUrl;
}

export function ProfileItemImage({
    logoId,
    alt,
    fallbackUrl = DEFAULT_AVATAR_URL,
}: {
    logoId?: number | null;
    alt: string;
    fallbackUrl?: string;
}) {
    const url = useProfileItemImageUrl(logoId, fallbackUrl);

    return <img src={url} alt={alt} className="size-12 shrink-0 rounded-full border object-cover" />;
}

type ProfileItemImageEditorProps = {
    title: string;
    currentLogoId?: number | null;
    value: ProfileItemImageChange;
    onChange: (value: ProfileItemImageChange) => void;
    fallbackUrl?: string;
}

export function ProfileItemImageEditor({
    title,
    currentLogoId,
    value,
    onChange,
    fallbackUrl = DEFAULT_AVATAR_URL,
}: ProfileItemImageEditorProps) {
    const currentUrl = useProfileItemImageUrl(value === null ? null : currentLogoId, fallbackUrl);
    const [selectedName, setSelectedName] = useState("");
    const [adjusterKey, setAdjusterKey] = useState(0);
    const hasImage = value instanceof File || (value !== null && Boolean(currentLogoId));

    const removeImage = () => {
        onChange(null);
        setSelectedName("");
        setAdjusterKey((key) => key + 1);
    };

    return (
        <div className="grid gap-3">
            <div className="flex items-center gap-3">
                <img src={currentUrl} alt={`Current ${title.toLowerCase()}`} className="size-16 rounded-full border object-cover" />
                <div className="grid gap-1">
                    <span className="text-sm font-medium">Current image</span>
                    <span className="text-xs text-gray-500">Changes are applied when you save this entry.</span>
                    <Button type="button" variant="outline" size="sm" disabled={!hasImage} onClick={removeImage}>
                        Remove image
                    </Button>
                </div>
            </div>

            <div className="mx-auto w-full" style={{ maxWidth: PROFILE_AVATAR_MAX_SIZE }}>
                <ImageAdjuster
                    key={adjusterKey}
                    title={`${title} image`}
                    description="Choose an image, then drag and zoom to create a round crop."
                    aspectRatio={1}
                    outputWidth={PROFILE_AVATAR_MAX_SIZE}
                    outputHeight={PROFILE_AVATAR_MAX_SIZE}
                    roundedPreview
                    allowZoom
                    selectedName={selectedName}
                    onAdjustedFile={(file, sourceName) => {
                        onChange(file);
                        setSelectedName(sourceName);
                    }}
                />
            </div>
        </div>
    );
}
