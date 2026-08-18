import { getChatConversationApi, searchApi, sendChatMessageApi } from "@/features/chat/api";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/providers";
import { MessageCircleIcon, SearchIcon, SendIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import type { ChatMessage, ChatRelationship, ChatUser } from "../model/types";
import { getChatAvatarUrl, getChatUserName, getRelationshipLabels } from "../model/types";

type ChatBoxProps = {
    onMessageSent?: () => void;
};

type ActivePanel = { type: "search" } | { type: "chat"; userId: string } | null;

export function ChatBox({ onMessageSent }: ChatBoxProps) {
    const { isLoggedIn } = useAuth();
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
    const [activePanel, setActivePanel] = useState<ActivePanel>(null);

    const openChat = (user: ChatUser) => {
        if (!user?.id) return;

        setChatUsers((currentUsers) => {
            const existingUser = currentUsers.find((currentUser) => currentUser.id === user.id);
            const nextUsers = existingUser
                ? [existingUser, ...currentUsers.filter((currentUser) => currentUser.id !== user.id)]
                : [user, ...currentUsers];

            return nextUsers.slice(0, 3);
        });
        setActivePanel({ type: "chat", userId: user.id });
    };

    const closeChat = (userId: string) => {
        setChatUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
        setActivePanel((currentPanel) => (
            currentPanel?.type === "chat" && currentPanel.userId === userId ? null : currentPanel
        ));
    };

    useEffect(() => {
        const handleOpenChat = (event: Event) => {
            const chatEvent = event as CustomEvent<ChatUser>;

            if (chatEvent.detail?.id) {
                openChat(chatEvent.detail);
            }
        };

        window.addEventListener("rapidea:open-chat", handleOpenChat);

        return () => window.removeEventListener("rapidea:open-chat", handleOpenChat);
    }, []);

    if (!isLoggedIn) {
        return null;
    }

    const activeChatUser = activePanel?.type === "chat"
        ? chatUsers.find((user) => user.id === activePanel.userId)
        : undefined;
    const activeChatIndex = activePanel?.type === "chat"
        ? chatUsers.findIndex((user) => user.id === activePanel.userId)
        : -1;
    const activeBubbleOffset = activePanel?.type === "search"
        ? 24
        : activeChatIndex >= 0
            ? 24 + ((activeChatIndex + 1) * 56)
            : 24;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-end gap-3">
            {(activePanel?.type === "search" || activeChatUser) && (
                <div className="relative">
                    {activePanel?.type === "search" && (
                        <SearchPanel
                            openChat={openChat}
                            onClose={() => setActivePanel(null)}
                        />
                    )}

                    {activeChatUser && (
                        <ConversationPanel
                            selectedUser={activeChatUser}
                            onClose={() => setActivePanel(null)}
                            onRemove={() => closeChat(activeChatUser.id)}
                            onMessageSent={onMessageSent}
                        />
                    )}

                    <div
                        className="absolute -right-2 size-4 rotate-45 border-r border-t bg-white"
                        style={{ bottom: `${activeBubbleOffset - 8}px` }}
                    />
                </div>
            )}

            <div className="flex flex-col-reverse items-end gap-2">
                <button
                    type="button"
                    className={`flex size-12 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50 ${activePanel?.type === "search" ? "ring-2 ring-main" : ""}`}
                    title="Search people"
                    onClick={() => setActivePanel((currentPanel) => currentPanel?.type === "search" ? null : { type: "search" })}
                >
                    <SearchIcon className="size-5" />
                </button>

                {chatUsers.map((user) => (
                    <div key={user.id} className="relative">
                        <button
                            type="button"
                            className={`size-12 overflow-hidden rounded-full border bg-white shadow-md hover:ring-2 hover:ring-main ${activePanel?.type === "chat" && activePanel.userId === user.id ? "ring-2 ring-main" : ""}`}
                            title={getChatUserName(user)}
                            onClick={() => setActivePanel((currentPanel) => (
                                currentPanel?.type === "chat" && currentPanel.userId === user.id
                                    ? null
                                    : { type: "chat", userId: user.id }
                            ))}
                        >
                            <img src={getChatAvatarUrl(user)} className="size-full object-cover" />
                        </button>
                        <button
                            type="button"
                            className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gray-800 text-white shadow"
                            title="Close chat"
                            onClick={() => closeChat(user.id)}
                        >
                            <XIcon className="size-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SearchPanel({
    openChat,
    onClose,
}: {
    openChat: (user: ChatUser) => void;
    onClose: () => void;
}) {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<ChatUser[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            setUsers([]);
            return;
        }

        let isActive = true;
        const timeoutId = window.setTimeout(async () => {
            try {
                setIsSearching(true);
                const response = await searchApi(trimmedQuery);

                if (!isActive) return;

                setUsers((response.users ?? []).map((user: any) => ({
                    id: user.id,
                    displayName: user.title,
                    username: user.link?.replace("/profile/", ""),
                    headline: user.subtitle,
                    avatarName: user.avatarName,
                })));
            } catch {
                if (isActive) {
                    setUsers([]);
                }
            } finally {
                if (isActive) {
                    setIsSearching(false);
                }
            }
        }, 250);

        return () => {
            isActive = false;
            window.clearTimeout(timeoutId);
        };
    }, [query]);

    return (
        <div className="w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-md border bg-white shadow-lg">
            <div className="flex h-12 items-center justify-between border-b px-3">
                <div className="flex items-center gap-2 font-semibold">
                    <MessageCircleIcon className="size-5" />
                    New message
                </div>
                <Button type="button" variant="ghost" size="icon" className="size-8" onClick={onClose}>
                    <XIcon className="size-4" />
                </Button>
            </div>

            <div className="p-3">
                <div className="relative">
                    <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                    <input
                        ref={inputRef}
                        value={query}
                        className="h-10 w-full rounded-md border bg-white pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-main"
                        placeholder="Search users"
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>

                <div className="mt-3 max-h-72 overflow-y-auto">
                    {!query.trim() ? (
                        <div className="py-8 text-center text-sm text-gray-500">Search for a user to message.</div>
                    ) : isSearching ? (
                        <div className="py-8 text-center text-sm text-gray-500">Searching...</div>
                    ) : users.length === 0 ? (
                        <div className="py-8 text-center text-sm text-gray-500">No users found.</div>
                    ) : users.map((user) => (
                        <button
                            key={user.id}
                            type="button"
                            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-gray-100"
                            onClick={() => {
                                openChat(user);
                                onClose();
                            }}
                        >
                            <img src={getChatAvatarUrl(user)} className="size-10 rounded-full border object-cover" />
                            <div className="min-w-0">
                                <div className="truncate text-sm font-semibold">{getChatUserName(user)}</div>
                                <div className="truncate text-xs text-gray-500">{user.headline || user.username}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ConversationPanel({
    selectedUser,
    onClose,
    onRemove,
    onMessageSent,
}: {
    selectedUser: ChatUser;
    onClose: () => void;
    onRemove: () => void;
    onMessageSent?: () => void;
}) {
    const { isLoggedIn } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [relationship, setRelationship] = useState<ChatRelationship>({});
    const [messageText, setMessageText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOlder, setIsLoadingOlder] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [hasMoreMessages, setHasMoreMessages] = useState(false);
    const [shouldStickToBottom, setShouldStickToBottom] = useState(true);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const loadConversation = async (showLoading = true) => {
        if (!selectedUser?.id || !isLoggedIn) {
            setMessages([]);
            setRelationship({});
            return;
        }

        try {
            if (showLoading) {
                setIsLoading(true);
            }
            const response = await getChatConversationApi(selectedUser.id, 10);
            setMessages(response.messages ?? []);
            setRelationship(response.relationship ?? {});
            setHasMoreMessages(!!response.hasMore);
            setShouldStickToBottom(true);
        } catch {
            if (showLoading) {
                toast.error("Couldn't load messages");
            }
        } finally {
            if (showLoading) {
                setIsLoading(false);
            }
        }
    };

    const loadOlderMessages = async () => {
        if (!selectedUser?.id || isLoadingOlder || !hasMoreMessages || messages.length === 0) return;

        const container = messagesContainerRef.current;
        const previousScrollHeight = container?.scrollHeight ?? 0;
        const oldestMessage = messages[0];

        try {
            setIsLoadingOlder(true);
            setShouldStickToBottom(false);
            const response = await getChatConversationApi(selectedUser.id, 10, oldestMessage.createdAt);
            const olderMessages = response.messages ?? [];

            setMessages((currentMessages) => {
                const existingIds = new Set(currentMessages.map((message) => message.id));
                return [
                    ...olderMessages.filter((message: ChatMessage) => !existingIds.has(message.id)),
                    ...currentMessages,
                ];
            });
            setHasMoreMessages(!!response.hasMore);

            window.requestAnimationFrame(() => {
                if (!container) return;

                container.scrollTop = container.scrollHeight - previousScrollHeight;
            });
        } catch {
            toast.error("Couldn't load older messages");
        } finally {
            setIsLoadingOlder(false);
        }
    };

    const sendMessage = async (event: FormEvent) => {
        event.preventDefault();

        if (!selectedUser?.id || !messageText.trim() || isSending) return;

        try {
            setIsSending(true);
            const response = await sendChatMessageApi(selectedUser.id, messageText);
            setMessages((currentMessages) => [...currentMessages, response.message]);
            setMessageText("");
            onMessageSent?.();
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Couldn't send message");
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        loadConversation(true);
    }, [selectedUser?.id, isLoggedIn]);

    useEffect(() => {
        if (!selectedUser?.id || !isLoggedIn) return;

        const intervalId = window.setInterval(() => loadConversation(false), 3000);

        return () => window.clearInterval(intervalId);
    }, [selectedUser?.id, isLoggedIn]);

    useEffect(() => {
        if (shouldStickToBottom) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length, shouldStickToBottom]);

    const relationshipLabels = getRelationshipLabels(relationship);

    return (
        <div className="w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-md border bg-white shadow-lg">
            <div className="flex h-12 items-center justify-between border-b px-3">
                <button type="button" className="flex min-w-0 items-center gap-2 text-left" onClick={onClose}>
                    <img src={getChatAvatarUrl(selectedUser)} className="size-8 rounded-full border object-cover" />
                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{getChatUserName(selectedUser)}</div>
                        {relationshipLabels.length > 0 && (
                            <div className="truncate text-xs text-gray-500">{relationshipLabels.join(" | ")}</div>
                        )}
                    </div>
                </button>

                <div className="flex items-center gap-1">
                    <Button type="button" variant="ghost" size="icon" className="size-8" onClick={onRemove}>
                        <XIcon className="size-4" />
                    </Button>
                </div>
            </div>

            <div className="flex h-96 flex-col">
                <div
                    ref={messagesContainerRef}
                    className="flex-1 space-y-2 overflow-y-auto px-3 py-3"
                    onScroll={(event) => {
                        if (event.currentTarget.scrollTop <= 48) {
                            loadOlderMessages();
                        }
                    }}
                >
                    {isLoadingOlder && (
                        <div className="text-center text-xs text-gray-500">Loading older messages...</div>
                    )}
                    {isLoading ? (
                        <div className="text-center text-sm text-gray-500">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="text-center text-sm text-gray-500">No messages yet.</div>
                    ) : messages.map((message) => {
                        const isMine = message.senderId !== selectedUser.id;

                        return (
                            <div key={message.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[78%] rounded-md px-3 py-2 text-sm ${isMine ? "bg-main text-white" : "bg-gray-100 text-gray-900"}`}>
                                    <p className="whitespace-pre-wrap break-words">{message.text}</p>
                                    <p className={`mt-1 text-[0.7rem] ${isMine ? "text-white/80" : "text-gray-500"}`}>
                                        {new Date(message.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                <form className="flex gap-2 border-t p-2" onSubmit={sendMessage}>
                    <textarea
                        value={messageText}
                        className="max-h-24 min-h-10 flex-1 resize-none rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-main"
                        placeholder="Write a message"
                        onChange={(event) => setMessageText(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault();
                                sendMessage(event);
                            }
                        }}
                    />
                    <Button type="submit" size="icon" disabled={isSending || !messageText.trim()}>
                        <SendIcon className="size-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
