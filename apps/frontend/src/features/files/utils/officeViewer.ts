import { OFFICE_PREVIEW_EXTENSIONS } from "@/features/files/constants/officeViewer";

type OfficeFile = {
    name?: string | null;
};

export function fileExtension(file: OfficeFile) {
    const fileName = String(file?.name ?? "");
    const extensionStart = fileName.lastIndexOf(".");

    return extensionStart >= 0
        ? fileName.slice(extensionStart + 1).toLowerCase()
        : "";
}

export function canUseOfficeViewer(file: OfficeFile) {
    return OFFICE_PREVIEW_EXTENSIONS.has(fileExtension(file));
}

export function isOfficeViewerEmbeddableUrl(url: string) {
    try {
        const fileUrl = new URL(url);

        return fileUrl.protocol === "https:" &&
            fileUrl.hostname !== "localhost" &&
            fileUrl.hostname !== "127.0.0.1";
    } catch {
        return false;
    }
}

export function buildOfficeViewerUrl(fileUrl: string) {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
}
