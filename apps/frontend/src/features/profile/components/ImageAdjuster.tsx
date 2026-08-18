import { useEffect, useId, useRef, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

type ImageAdjusterProps = {
    title: string;
    description: string;
    aspectRatio: number;
    outputWidth: number;
    outputHeight: number;
    selectedName?: string;
    roundedPreview?: boolean;
    allowZoom?: boolean;
    onAdjustedFile: (file: File, sourceName: string) => void;
}

export function ImageAdjuster({
    title,
    description,
    aspectRatio,
    outputWidth,
    outputHeight,
    selectedName,
    roundedPreview = false,
    allowZoom = false,
    onAdjustedFile,
}: ImageAdjusterProps) {
    const previewRef = useRef<HTMLDivElement | null>(null);
    const dragStartRef = useRef<{ pointerX: number; pointerY: number; offsetX: number; offsetY: number } | null>(null);
    const [imageSrc, setImageSrc] = useState("");
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [sourceName, setSourceName] = useState("");
    const [sourceResolution, setSourceResolution] = useState("");
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const inputId = `profile-image-${useId().replace(/:/g, "")}`;

    useEffect(() => {
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [imageSrc]);

    const getPreviewMetrics = (nextZoom = zoom) => {
        if (!previewRef.current || !image) return null;

        const previewWidth = previewRef.current.clientWidth;
        const previewHeight = previewRef.current.clientHeight;
        const coverScale = Math.max(previewWidth / image.naturalWidth, previewHeight / image.naturalHeight) * nextZoom;
        const displayWidth = image.naturalWidth * coverScale;
        const displayHeight = image.naturalHeight * coverScale;

        return {
            previewWidth,
            previewHeight,
            coverScale,
            displayWidth,
            displayHeight,
            maxOffsetX: Math.max(0, (displayWidth - previewWidth) / 2),
            maxOffsetY: Math.max(0, (displayHeight - previewHeight) / 2),
        };
    }

    const clampOffset = (nextOffset: { x: number; y: number }, nextZoom = zoom) => {
        const metrics = getPreviewMetrics(nextZoom);

        if (!metrics) return nextOffset;

        return {
            x: Math.min(metrics.maxOffsetX, Math.max(-metrics.maxOffsetX, nextOffset.x)),
            y: Math.min(metrics.maxOffsetY, Math.max(-metrics.maxOffsetY, nextOffset.y)),
        };
    }

    const createAdjustedFile = async (
        nextOffset = offset,
        nextZoom = zoom,
        sourceImage = image,
        nextSourceName = sourceName,
    ) => {
        if (!sourceImage || !previewRef.current) return;

        const previewWidth = previewRef.current.clientWidth;
        const previewHeight = previewRef.current.clientHeight;
        const coverScale = Math.max(previewWidth / sourceImage.naturalWidth, previewHeight / sourceImage.naturalHeight) * nextZoom;
        const displayWidth = sourceImage.naturalWidth * coverScale;
        const displayHeight = sourceImage.naturalHeight * coverScale;

        const canvas = document.createElement("canvas");
        canvas.width = outputWidth;
        canvas.height = outputHeight;

        const context = canvas.getContext("2d");
        if (!context) return;

        const imageLeft = previewWidth / 2 + nextOffset.x - displayWidth / 2;
        const imageTop = previewHeight / 2 + nextOffset.y - displayHeight / 2;
        const sourceX = (0 - imageLeft) / coverScale;
        const sourceY = (0 - imageTop) / coverScale;
        const sourceWidth = previewWidth / coverScale;
        const sourceHeight = previewHeight / coverScale;

        context.drawImage(
            sourceImage,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            outputWidth,
            outputHeight,
        );

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
        if (!blob) return;

        const fileName = `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.jpg`;
        onAdjustedFile(new File([blob], fileName, { type: "image/jpeg" }), nextSourceName);
    }

    const loadImage = (file?: File) => {
        if (!file) return;

        const nextImageSrc = URL.createObjectURL(file);
        const nextImage = new Image();
        nextImage.onload = () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }

            setImageSrc(nextImageSrc);
            setImage(nextImage);
            setSourceName(file.name);
            setSourceResolution(`${nextImage.naturalWidth} x ${nextImage.naturalHeight}px`);
            setOffset({ x: 0, y: 0 });
            setZoom(1);
            requestAnimationFrame(() => createAdjustedFile({ x: 0, y: 0 }, 1, nextImage, file.name));
        };
        nextImage.src = nextImageSrc;
    }

    const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!image) return;

        event.currentTarget.setPointerCapture(event.pointerId);
        dragStartRef.current = {
            pointerX: event.clientX,
            pointerY: event.clientY,
            offsetX: offset.x,
            offsetY: offset.y,
        };
    }

    const dragImage = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!dragStartRef.current) return;

        const nextOffset = clampOffset({
            x: dragStartRef.current.offsetX + event.clientX - dragStartRef.current.pointerX,
            y: dragStartRef.current.offsetY + event.clientY - dragStartRef.current.pointerY,
        });

        setOffset(nextOffset);
    }

    const stopDrag = async () => {
        if (!dragStartRef.current) return;

        dragStartRef.current = null;
        await createAdjustedFile();
    }

    const updateZoom = async (value: number) => {
        const nextZoom = Number(value);
        const nextOffset = clampOffset(offset, nextZoom);
        setZoom(nextZoom);
        setOffset(nextOffset);
        await createAdjustedFile(nextOffset, nextZoom);
    }

    return (
        <div className="flex flex-col gap-3 rounded-md border p-3">
            <div>
                <Label htmlFor={inputId}>{title}</Label>
                <p className="text-xs text-gray-500">{description}</p>
            </div>

            <Input id={inputId} type="file" accept="image/*" onChange={(event) => loadImage(event.target.files?.[0])} />

            <div
                ref={previewRef}
                className={`relative w-full touch-none overflow-hidden border bg-gray-100 ${roundedPreview ? "rounded-full" : "rounded-md"}`}
                style={{ aspectRatio }}
                onPointerDown={startDrag}
                onPointerMove={dragImage}
                onPointerUp={stopDrag}
                onPointerCancel={stopDrag}
            >
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={`${title} crop preview`}
                        className="absolute left-1/2 top-1/2 max-w-none cursor-grab select-none object-cover"
                        style={{
                            width: "100%",
                            minHeight: "100%",
                            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})`,
                            transformOrigin: "center",
                        }}
                        draggable={false}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                        Select an image
                    </div>
                )}
            </div>

            <div className="grid gap-1 text-xs text-gray-600">
                <span>Source: {sourceResolution || "No image selected"}</span>
                <span>Saved crop: {outputWidth} x {outputHeight}px</span>
                {selectedName && <span>Ready: {selectedName}</span>}
            </div>

            {allowZoom && imageSrc && (
                <div className="flex items-center gap-3">
                    <Label htmlFor={`${inputId}-zoom`} className="text-xs">Zoom</Label>
                    <Input
                        id={`${inputId}-zoom`}
                        type="range"
                        min={1}
                        max={3}
                        step={0.05}
                        value={zoom}
                        onChange={(event) => updateZoom(Number(event.target.value))}
                    />
                    <span className="w-10 text-xs text-gray-600">{Math.round(zoom * 100)}%</span>
                </div>
            )}
        </div>
    )
}
