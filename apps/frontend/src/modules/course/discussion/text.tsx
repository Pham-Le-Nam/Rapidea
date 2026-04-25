import type { KeyboardEvent } from "react";
import type { Discussion, Profile } from "./types";

export function createDiscussionContent(text: string) {
    return {
        text,
    };
}

export function getDiscussionText(discussion: any) {
    if (!discussion) return "";
    if (typeof discussion === "string") return discussion;
    if (typeof discussion.text === "string") return discussion.text;

    return "";
}

export function LinkedDiscussionText({ text }: { text: string }) {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
    const parts = text.split(urlRegex);

    return (
        <>
            {parts.map((part, index) => {
                if (!isUrlText(part)) return part;

                const href = part.startsWith("http") ? part : `https://${part}`;

                return (
                    <a
                        key={`${part}-${index}`}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {part}
                    </a>
                );
            })}
        </>
    )
}

export function handleDiscussionTextareaKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
    onSubmit: () => void,
) {
    if (event.key !== "Enter") return;

    if (event.ctrlKey || event.metaKey) {
        return;
    }

    event.preventDefault();
    onSubmit();
}

export function getProfileName(profile: Profile) {
    return [profile.firstname, profile.middlename, profile.lastname]
        .filter(Boolean)
        .join(" ")
        || profile.username
        || "User";
}

export function findRepliedUserId(repliedId: string, discussions: Discussion[]) {
    return discussions.find((discussion) => discussion.id === repliedId)?.userId ?? "";
}

export function formatDate(dateString: string) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;

    return date.toLocaleDateString();
}

function isUrlText(text: string) {
    return /^(https?:\/\/[^\s]+|www\.[^\s]+)$/i.test(text);
}
