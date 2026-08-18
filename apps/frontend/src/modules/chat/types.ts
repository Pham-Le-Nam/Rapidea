import { buildMediaUrl, DEFAULT_AVATAR_URL } from "@/lib/media";

export type ChatRelationship = {
    viewerFollowsOther?: boolean;
    otherFollowsViewer?: boolean;
    viewerSubscribesToOther?: boolean;
    otherSubscribesToViewer?: boolean;
    isFollower?: boolean;
    isFollowing?: boolean;
    isSubscriber?: boolean;
    isSubscribed?: boolean;
};

export type ChatUser = {
    id: string;
    title?: string;
    displayName?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    username?: string;
    headline?: string;
    avatarName?: string;
    avatar?: {
        name?: string;
    };
};

export type ChatMessage = {
    id: string;
    conversationId: string;
    senderId: string;
    text: string;
    readAt?: string | null;
    createdAt: string;
};

export type ChatConversationSummary = {
    id: string;
    otherUser: ChatUser;
    relationship: ChatRelationship;
    lastMessage: ChatMessage | null;
    lastMessageAt: string;
    unreadCount?: number;
};

export function getChatUserName(user?: ChatUser) {
    return user?.displayName
        || user?.title
        || [user?.firstname, user?.middlename, user?.lastname].filter(Boolean).join(" ")
        || user?.username
        || "User";
}

export function getChatAvatarUrl(user?: ChatUser) {
    const avatarName = user?.avatar?.name ?? user?.avatarName;

    if (!avatarName) {
        return DEFAULT_AVATAR_URL;
    }

    return buildMediaUrl(avatarName);
}

export function getRelationshipLabels(relationship?: ChatRelationship) {
    const labels: string[] = [];

    if (relationship?.isFollower) labels.push("Follower");
    if (relationship?.isFollowing) labels.push("Following");
    if (relationship?.isSubscriber) labels.push("Subscriber");
    if (relationship?.isSubscribed) labels.push("Subscribed");

    return labels;
}

export function hasChatRelationship(relationship?: ChatRelationship) {
    return !!(
        relationship?.viewerFollowsOther
        || relationship?.otherFollowsViewer
        || relationship?.viewerSubscribesToOther
        || relationship?.otherSubscribesToViewer
    );
}
