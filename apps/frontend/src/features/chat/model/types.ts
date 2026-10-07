import { buildMediaUrl, DEFAULT_AVATAR_URL } from "@/shared/lib/media";

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

export type AiChatMessageRole = "USER" | "ASSISTANT" | "SYSTEM";
export type AiAssistantMode = "LEARNER" | "INSTRUCTOR";
export type InstructorProposal = {
    kind: "COURSE_STRUCTURE" | "LEARNING_OUTCOMES" | "COURSE_SKILLS" | "PREREQUISITES" | "POST_DRAFT" | "POST_REVISION";
    title: string;
    body: string;
    items: { title: string; details: string }[];
    courseId?: string | null;
    postId?: string | null;
    appliedAt?: string;
    resultId?: string;
    canonicalSkills?: { suggestedName: string; canonicalName: string | null; skillId: number | null }[];
};

export type AiChatCitation = {
    reference: string;
    source: {
        type: "COURSE" | "POST" | "FILE" | "DISCUSSION" | "REVIEW" | "LEARNER";
        id: string;
        label?: string | null;
        description?: string | null;
    } | null;
};

export type AiChatMessage = {
    id: string;
    responseToMessageId?: string | null;
    role: AiChatMessageRole;
    content: string;
    model?: string | null;
    tokenCount?: number | null;
    citations?: AiChatCitation[] | null;
    metadata?: unknown;
    createdAt: string;
};

export type AiChatConversationSummary = {
    mode?: AiAssistantMode;
    id: string;
    title: string | null;
    lastMessageAt: string;
    createdAt: string;
    updatedAt: string;
    lastMessage: AiChatMessage | null;
    messageCount: number;
    trustedSourceCount: number;
};

export type AiChatTrustedSourceType = "COURSE" | "POST" | "FILE";

export type AiChatTrustedSourceInput = {
    sourceType: AiChatTrustedSourceType;
    sourceId: string;
    /** Display-only name. The API adapter strips it from the backend payload. */
    label?: string;
};

export type AiChatTrustedSource = {
    id: string;
    conversationId: string;
    sourceType: AiChatTrustedSourceType;
    source: {
        id: string;
        title?: string | null;
        name?: string;
        description?: string | null;
        summary?: string | null;
        mimeType?: string;
        courseId?: string | null;
    };
    createdAt: string;
};

export type AiChatConversationPage = {
    conversations: AiChatConversationSummary[];
    hasMore: boolean;
    nextCursor: string | null;
};

export type AiChatMessagePage = {
    conversationId: string;
    messages: AiChatMessage[];
    hasMore: boolean;
    nextCursor: string | null;
};

export type SendAiChatMessageResponse = {
    conversation: Pick<AiChatConversationSummary, "id" | "title" | "lastMessageAt" | "createdAt" | "updatedAt">;
    conversationCreated: boolean;
    idempotentReplay: boolean;
    userMessage: AiChatMessage;
    assistantMessage: AiChatMessage;
    trustedSources: AiChatTrustedSource[];
    learnerQuery: unknown;
};

export function getAiTrustedSourceLabel(source: AiChatTrustedSource | AiChatTrustedSourceInput) {
    if (!("source" in source)) {
        return source.label || `${source.sourceType.toLowerCase()} source`;
    }

    return source.source.title || source.source.name || `${source.sourceType.toLowerCase()} source`;
}

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
