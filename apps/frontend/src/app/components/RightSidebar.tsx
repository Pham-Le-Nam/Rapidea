import { getAiChatConversationsApi, getChatConversationsApi, hasInstructorAiAccessApi } from "@/features/chat/api";
import type { AiAssistantMode } from "@/features/chat/model/types";
import { mergeAiConversationHistory } from "@/features/chat/model/ai-conversations";
import { useAuth } from "@/providers";
import type { AiChatConversationSummary, ChatConversationSummary, ChatUser } from "@/features/chat";
import { getChatAvatarUrl, getChatUserName, getRelationshipLabels, hasChatRelationship } from "@/features/chat";
import { MessageCircleIcon, PanelRightCloseIcon, PlusIcon, SparklesIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
    Sidebar,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
    SidebarContent,
} from "@/shared/components/ui/sidebar";

type RightSidebarProps = {
    onSelectChat?: (user: ChatUser) => void;
    onSelectAiChat?: (conversationId?: string, mode?: AiAssistantMode) => void;
    refreshKey?: number;
};

type ConversationSectionProps = {
    title: string;
    conversations: ChatConversationSummary[];
    emptyLabel: string;
    onSelectChat?: (user: ChatUser) => void;
};

function ConversationSection({ title, conversations, emptyLabel, onSelectChat }: ConversationSectionProps) {
    return (
        <SidebarMenuItem>
            <div className="px-2 py-2 text-sm font-bold">{title}</div>
            {conversations.length === 0 ? (
                <div className="px-2 pb-3 text-xs text-gray-500">{emptyLabel}</div>
            ) : conversations.map((conversation) => (
                <ConversationButton
                    key={conversation.id}
                    conversation={conversation}
                    onSelectChat={onSelectChat}
                />
            ))}
        </SidebarMenuItem>
    );
}

function ConversationButton({
    conversation,
    onSelectChat,
}: {
    conversation: ChatConversationSummary;
    onSelectChat?: (user: ChatUser) => void;
}) {
    const labels = getRelationshipLabels(conversation.relationship);
    const lastMessage = conversation.lastMessage?.text ?? "No messages yet";
    const unreadCount = conversation.unreadCount ?? 0;

    return (
        <button
            type="button"
            className="flex w-full gap-2 rounded-md px-2 py-2 text-left hover:bg-gray-100"
            onClick={() => onSelectChat?.(conversation.otherUser)}
        >
            <img
                src={getChatAvatarUrl(conversation.otherUser)}
                className="size-10 shrink-0 rounded-full border object-cover"
            />
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">
                        {getChatUserName(conversation.otherUser)}
                    </span>
                    {unreadCount > 0 && (
                        <span className="flex min-w-5 shrink-0 items-center justify-center rounded-full bg-main px-1.5 py-0.5 text-xs font-semibold text-white">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </div>

                {labels.length > 0 && (
                    <div className="truncate text-xs text-gray-500">
                        {labels.join(" | ")}
                    </div>
                )}

                <div className="mt-1 flex items-center gap-1 text-xs text-gray-600">
                    <MessageCircleIcon className="size-3 shrink-0" />
                    <span className={`truncate ${unreadCount > 0 ? "font-semibold text-gray-900" : ""}`}>
                        {lastMessage}
                    </span>
                </div>
            </div>
        </button>
    );
}

function AiConversationSection({
    conversations,
    hasMore,
    isLoadingMore,
    onNewConversation,
    onSelectConversation,
    onLoadMore,
}: {
    conversations: AiChatConversationSummary[];
    hasMore: boolean;
    isLoadingMore: boolean;
    onNewConversation?: () => void;
    onSelectConversation?: (conversationId: string, mode?: AiAssistantMode) => void;
    onLoadMore: () => void;
}) {
    return (
        <SidebarMenuItem className="mb-2 border-b border-gray-200 pb-3">
            <div className="flex items-center justify-between px-2 py-2">
                <div className="flex items-center gap-2 text-sm font-bold">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-main/10 text-main">
                        <SparklesIcon className="size-4" />
                    </span>
                    Rapideia AI
                </div>
                <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-full border border-main/20 text-main transition hover:bg-main/10"
                    title="New AI conversation"
                    aria-label="New AI conversation"
                    onClick={onNewConversation}
                >
                    <PlusIcon className="size-4" />
                </button>
            </div>

            {conversations.length === 0 ? (
                <button
                    type="button"
                    className="mx-2 flex w-[calc(100%-1rem)] items-center gap-2 rounded-lg bg-main/5 px-3 py-3 text-left text-sm text-gray-700 hover:bg-main/10"
                    onClick={onNewConversation}
                >
                    <SparklesIcon className="size-4 shrink-0 text-main" />
                    Start a conversation with Rapideia AI
                </button>
            ) : conversations.map((conversation) => (
                <button
                    key={conversation.id}
                    type="button"
                    className="flex w-full gap-2 rounded-md px-2 py-2 text-left hover:bg-gray-100"
                    onClick={() => onSelectConversation?.(conversation.id, conversation.mode ?? "LEARNER")}
                >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-main text-white">
                        <SparklesIcon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">
                            {conversation.title || "AI conversation"}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-gray-500">
                            {conversation.lastMessage?.content || "No messages yet"}
                        </span>
                        <span className="mt-1 block text-[0.7rem] text-gray-400">
                            {conversation.mode === "INSTRUCTOR" ? "Instructor" : "Learner"} · {new Date(conversation.lastMessageAt).toLocaleDateString()}
                        </span>
                    </span>
                </button>
            ))}

            {hasMore && (
                <button
                    type="button"
                    className="mt-1 w-full rounded-md px-2 py-2 text-xs font-medium text-main hover:bg-main/5 disabled:opacity-50"
                    disabled={isLoadingMore}
                    onClick={onLoadMore}
                >
                    {isLoadingMore ? "Loading..." : "Load older AI conversations"}
                </button>
            )}
        </SidebarMenuItem>
    );
}

export function RightSidebar({ onSelectChat, onSelectAiChat, refreshKey = 0 }: RightSidebarProps) {
    const { isLoggedIn } = useAuth();
    const [conversations, setConversations] = useState<ChatConversationSummary[]>([]);
    const [aiConversations, setAiConversations] = useState<AiChatConversationSummary[]>([]);
    const [instructorConversations, setInstructorConversations] = useState<AiChatConversationSummary[]>([]);
    const [instructorEnabled, setInstructorEnabled] = useState(false);
    const [instructorCursor, setInstructorCursor] = useState<string | null>(null);
    const [instructorHasMore, setInstructorHasMore] = useState(false);
    const [aiNextCursor, setAiNextCursor] = useState<string | null>(null);
    const [hasMoreAiConversations, setHasMoreAiConversations] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMoreAi, setIsLoadingMoreAi] = useState(false);
    const combinedAiConversations = useMemo(
        () => mergeAiConversationHistory(aiConversations, instructorConversations, instructorEnabled),
        [aiConversations, instructorConversations, instructorEnabled],
    );

    const sortedConversations = useMemo(() => {
        return [...conversations].sort((a, b) => {
            const unreadDifference = (b.unreadCount ?? 0) - (a.unreadCount ?? 0);

            if (unreadDifference !== 0) {
                return unreadDifference;
            }

            return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
        });
    }, [conversations]);
    const relatedConversations = sortedConversations.filter((conversation) => hasChatRelationship(conversation.relationship));
    const generalConversations = sortedConversations.filter((conversation) => !hasChatRelationship(conversation.relationship));

    const loadConversations = useCallback(async (showLoading = false) => {
        if (!isLoggedIn) {
            setConversations([]);
            setAiConversations([]);
            setInstructorEnabled(false);
            setInstructorConversations([]);
            return;
        }

        try {
            if (showLoading) {
                setIsLoading(true);
            }
            const enabled = await hasInstructorAiAccessApi();
            setInstructorEnabled(enabled);
            const [chatResponse, aiResponse, instructorResponse] = await Promise.all([
                getChatConversationsApi(false),
                getAiChatConversationsApi(),
                enabled ? getAiChatConversationsApi(20, undefined, "INSTRUCTOR") : null,
            ]);
            setConversations(chatResponse.conversations ?? []);
            setAiConversations(aiResponse.conversations ?? []);
            setHasMoreAiConversations(aiResponse.hasMore);
            setAiNextCursor(aiResponse.nextCursor);
            setInstructorConversations(instructorResponse?.conversations ?? []);
            setInstructorHasMore(instructorResponse?.hasMore ?? false);
            setInstructorCursor(instructorResponse?.nextCursor ?? null);
        } catch (error) {
            console.error("Couldn't load recent messages", error);
            setConversations([]);
        } finally {
            if (showLoading) {
                setIsLoading(false);
            }
        }
    }, [isLoggedIn]);

    const loadMoreAiConversations = async () => {
        if (isLoadingMoreAi) return;
        const learnerCursor = hasMoreAiConversations ? aiNextCursor : null;
        const teacherCursor = instructorEnabled && instructorHasMore ? instructorCursor : null;
        if (!learnerCursor && !teacherCursor) return;

        try {
            setIsLoadingMoreAi(true);
            const [learnerPage, instructorPage] = await Promise.allSettled([
                learnerCursor ? getAiChatConversationsApi(20, learnerCursor) : Promise.resolve(null),
                teacherCursor ? getAiChatConversationsApi(20, teacherCursor, "INSTRUCTOR") : Promise.resolve(null),
            ]);
            if (learnerPage.status === "fulfilled" && learnerPage.value) {
                const page = learnerPage.value;
                setAiConversations(current => [...new Map([...current, ...page.conversations].map(c => [c.id, c])).values()]);
                setHasMoreAiConversations(page.hasMore);
                setAiNextCursor(page.nextCursor);
            }
            if (instructorPage.status === "fulfilled" && instructorPage.value) {
                const page = instructorPage.value;
                setInstructorConversations(current => [...new Map([...current, ...page.conversations].map(c => [c.id, c])).values()]);
                setInstructorHasMore(page.hasMore);
                setInstructorCursor(page.nextCursor);
            }
            if (learnerPage.status === "rejected" || instructorPage.status === "rejected") console.error("Couldn't load some older AI conversations");
        } catch (error) {
            console.error("Couldn't load older AI conversations", error);
        } finally {
            setIsLoadingMoreAi(false);
        }
    };

    useEffect(() => {
        loadConversations(true);
    }, [loadConversations, refreshKey]);

    useEffect(() => {
        if (!isLoggedIn) return;

        const intervalId = window.setInterval(async () => {
            try {
                const response = await getChatConversationsApi(false);
                setConversations(response.conversations ?? []);
            } catch (error) {
                console.error("Couldn't refresh recent messages", error);
            }
        }, 5000);

        return () => window.clearInterval(intervalId);
    }, [isLoggedIn]);

    return (
        <Sidebar side="right">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2 text-xl">
                        <SidebarTrigger>
                            <PanelRightCloseIcon />
                        </SidebarTrigger>
                        Messages
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className="px-2">
                    {!isLoggedIn ? (
                        <SidebarMenuItem className="px-2 py-3 text-sm text-gray-500">
                            Log in to view messages.
                        </SidebarMenuItem>
                    ) : isLoading ? (
                        <SidebarMenuItem className="px-2 py-3 text-sm text-gray-500">
                            Loading messages...
                        </SidebarMenuItem>
                    ) : (
                        <>
                            <AiConversationSection
                                conversations={combinedAiConversations}
                                hasMore={hasMoreAiConversations || (instructorEnabled && instructorHasMore)}
                                isLoadingMore={isLoadingMoreAi}
                                onNewConversation={() => onSelectAiChat?.()}
                                onSelectConversation={onSelectAiChat}
                                onLoadMore={loadMoreAiConversations}
                            />
                            <ConversationSection
                                title="Followers & Subscribers"
                                conversations={relatedConversations}
                                emptyLabel="No recent related messages."
                                onSelectChat={onSelectChat}
                            />
                            <ConversationSection
                                title="General People"
                                conversations={generalConversations}
                                emptyLabel="No general messages."
                                onSelectChat={onSelectChat}
                            />
                        </>
                    )}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
