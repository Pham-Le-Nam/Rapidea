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
