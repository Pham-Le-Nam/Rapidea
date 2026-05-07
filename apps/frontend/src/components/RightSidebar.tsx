import { getChatConversationsApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import type { ChatConversationSummary, ChatUser } from "@/modules/chat/types";
import { getChatAvatarUrl, getChatUserName, getRelationshipLabels, hasChatRelationship } from "@/modules/chat/types";
import { MessageCircleIcon, PanelRightCloseIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
    Sidebar,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
    SidebarContent,
} from "@/components/ui/sidebar";

type RightSidebarProps = {
    onSelectChat?: (user: ChatUser) => void;
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

export function RightSidebar({ onSelectChat, refreshKey = 0 }: RightSidebarProps) {
    const { isLoggedIn } = useAuth();
    const [conversations, setConversations] = useState<ChatConversationSummary[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const loadConversations = async (showLoading = false) => {
        if (!isLoggedIn) {
            setConversations([]);
            return;
        }

        try {
            if (showLoading) {
                setIsLoading(true);
            }
            const response = await getChatConversationsApi(false);
            setConversations(response.conversations ?? []);
        } catch (error) {
            console.error("Couldn't load recent messages", error);
            setConversations([]);
        } finally {
            if (showLoading) {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        loadConversations(true);
    }, [isLoggedIn, refreshKey]);

    useEffect(() => {
        if (!isLoggedIn) return;

        const intervalId = window.setInterval(() => loadConversations(false), 5000);

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
