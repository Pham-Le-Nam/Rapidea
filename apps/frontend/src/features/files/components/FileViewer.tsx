import { getFileApi, getOfficePreviewUrlApi } from "@/features/files/api";
import { useAuth } from "@/providers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { renderAsync } from "docx-preview";
import { buildApiUrl } from "@/shared/lib/media";

type FileViewerProps = {
    file: any;
    isLocked?: boolean;
};

function isPowerPoint(file: any) {
    return file?.mimeType === "application/vnd.ms-powerpoint" ||
        file?.mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        /\.pptx?$/i.test(file?.name ?? "");
}

export default function FileViewer({ file, isLocked = false }: FileViewerProps) {
    const [textContent, setTextContent] = useState<string | null>(null);
    const [url, setUrl] = useState("");
    const [officePreviewUrl, setOfficePreviewUrl] = useState("");
    const [type, setType] = useState("");
    const [zoom, setZoom] = useState(1);
    const height = "h-[400px] md:h-[800px]";
    const { logout } = useAuth();
    const navigate = useNavigate();

    const loadUrl = async () => {
        try {
            setOfficePreviewUrl("");

            const [response, officePreviewResponse] = await Promise.all([
                getFileApi(file?.id),
                isPowerPoint(file)
                    ? getOfficePreviewUrlApi(file?.id)
                    : Promise.resolve(""),
            ]);

            if (!response) {
                toast.error("URL not found");
                throw new Error("URL not found");
            }

            setUrl(buildApiUrl(response));
            setOfficePreviewUrl(buildApiUrl(officePreviewResponse));
            setType(file.mimeType);
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            // handle logout or redirect
            }
            throw error;
        }
    }

    useEffect(() => {
        if (!file?.id) return;
        loadUrl();
    }, [file?.id, file]);

    // Detect text-based files
    const isTextFile =
        type?.startsWith("text/") ||
        type === "application/json" ||
        type === "application/xml" ||
        type === "text/csv";

    const isDocFile =
        type === "application/msword" ||
        type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    const isPowerPointFile =
        isPowerPoint(file) ||
        type === "application/vnd.ms-powerpoint" ||
        type === "application/vnd.openxmlformats-officedocument.presentationml.presentation";

    const canEmbedWithOfficeViewer = (() => {
        try {
            const fileUrl = new URL(officePreviewUrl);
            return fileUrl.protocol === "https:" &&
                fileUrl.hostname !== "localhost" &&
                fileUrl.hostname !== "127.0.0.1";
        } catch {
            return false;
        }
    })();
    
    useEffect(() => {
        if (isTextFile) {
            fetch(url)
                .then((res) => res.text())
                .then((data) => setTextContent(data))
                .catch(() => setTextContent("Failed to load text file"));
            }
        if (isDocFile) {
            fetch(url)
                .then(res => res.arrayBuffer())
                .then(buffer => {
                const container = document.getElementById("docx-container")!;
                renderAsync(buffer, container).then(() => {
                    // 👇 Fix alignment AFTER render
                    const doc = container.querySelector("div");
                    if (doc) {
                        (doc as HTMLElement).style.margin = "0";
                        (doc as HTMLElement).style.width = "max-content";
                    }
                });
            });
        }
    }, [url, isTextFile]);

    // Image
    if (type?.startsWith("image/")) {
        return <img src={url} alt="file" className={`w-full rounded-lg mt-3 ${height}`} />;
    }

    // Video
    if (type?.startsWith("video/")) {
        return (
            <video controls={!isLocked} className={`w-full rounded-lg mt-3 ${height}`}>
                <source src={url} type={type} />
            </video>
        );
    }

    // PDF
    if (type === "application/pdf") {
        return (
            <iframe
                src={url}
                className={`w-full ${height} border rounded-lg mt-3`}
            />
        );
    }

    // PowerPoint presentations require a publicly reachable URL so Microsoft
    // Office for the web can retrieve and render the file inside the iframe.
    if (isPowerPointFile) {
        if (!canEmbedWithOfficeViewer) {
            return (
                <div className={`flex w-full ${height} flex-col items-center justify-center gap-3 rounded-lg border bg-gray-50 p-4 text-center`}>
                    <p className="text-sm text-gray-600">
                        PowerPoint preview requires a publicly reachable HTTPS file URL and is unavailable for local files.
                    </p>
                    <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                        Open or download presentation
                    </a>
                </div>
            );
        }

        const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(officePreviewUrl)}`;

        return (
            <div className="mt-3 w-full">
                <iframe
                    src={viewerUrl}
                    title={`PowerPoint preview: ${file?.name ?? "presentation"}`}
                    className={`w-full ${height} rounded-lg border`}
                />
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                    <span>Preview provided by Microsoft Office for the web.</span>
                    <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                        Open or download presentation
                    </a>
                </div>
            </div>
        );
    }

    // Word docs
    if (isDocFile) {
        return (
            <div className={`${height} w-full overflow-auto border rounded-lg`}>
                <div className="flex gap-2 mb-2">
                    <button
                        onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        -
                    </button>

                    <span>{Math.round(zoom * 100)}%</span>

                    <button
                        onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        +
                    </button>
                </div>
                <div
                    id="docx-container"
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "top left",
                        width: "fit-content",
                    }}
                />
            </div>
        );
    }

    // ✅ Text files
    if (isTextFile) {
        return (
            <pre className={`w-full ${height} overflow-auto bg-gray-100 p-4 rounded-lg text-sm whitespace-pre-wrap mt-3`}>
                {textContent || "Loading..."}
            </pre>
        );
    }

    // Fallback
    return (
        <a href={url} download className="text-blue-500 underline">
            Download file
        </a>
    );
}
