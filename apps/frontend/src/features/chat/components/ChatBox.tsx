import {
    getAiChatMessagesApi,
    getAiChatTrustedSourcesApi,
    getChatConversationApi,
    removeAiChatTrustedSourceApi,
    searchApi,
    sendAiChatMessageApi,
    sendChatMessageApi,
} from "@/features/chat/api";
import { OPEN_AI_CHAT_EVENT, OPEN_CHAT_EVENT, type OpenAiChatEventDetail } from "../events";
import { useAuth } from "@/providers";
import { Button } from "@/shared/components/ui/button";
import {
    BotIcon,
    ExternalLinkIcon,
    FileTextIcon,
    MessageCircleIcon,
    SearchIcon,
    SendIcon,
    SparklesIcon,
    XIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import type {
    AiChatCitation,
    AiChatMessage,
    AiChatTrustedSource,
    AiChatTrustedSourceInput,
    ChatMessage,
    ChatRelationship,
    ChatUser,
} from "../model/types";
import { getAiTrustedSourceLabel, getChatAvatarUrl, getChatUserName, getRelationshipLabels } from "../model/types";
import { ChatPanelFrame } from "./ChatPanelFrame";

type ChatBoxProps = { onMessageSent?: () => void };
type ActivePanel = { type: "search" } | { type: "chat"; userId: string } | { type: "ai" } | null;
type AiSession = {
    key: string;
    conversationId?: string;
    pendingSources: AiChatTrustedSourceInput[];
};

type SearchResultUser = {
    id: string;
    title?: string;
    link?: string;
    subtitle?: string;
    avatarName?: string;
};

function apiErrorMessage(error: unknown, fallback: string) {
    if (!error || typeof error !== "object" || !("response" in error)) return fallback;
    const response = (error as { response?: unknown }).response;
    if (!response || typeof response !== "object" || !("data" in response)) return fallback;
    const data = (response as { data?: unknown }).data;
    if (!data || typeof data !== "object" || !("message" in data)) return fallback;
    const message = (data as { message?: unknown }).message;
    return typeof message === "string" ? message : fallback;
}
function mergePendingSources(current: AiChatTrustedSourceInput[], incoming: AiChatTrustedSourceInput[]) {
    const byKey = new Map(
        [...current, ...incoming].map((source) => [`${source.sourceType}:${source.sourceId}`, source]),
    );
    return [...byKey.values()];
}

export function ChatBox({ onMessageSent }: ChatBoxProps) {
    const { isLoggedIn } = useAuth();
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
    const [aiSession, setAiSession] = useState<AiSession | null>(null);
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

    const openAiChat = (detail: OpenAiChatEventDetail = {}) => {
        setAiSession((current) => {
            const conversationId = detail.reuseActiveConversation
                ? current?.conversationId
                : detail.conversationId;
            const isSameConversation = detail.reuseActiveConversation
                ? !!current
                : !!current && !!conversationId && current.conversationId === conversationId;
            return {
                key: isSameConversation && current ? current.key : crypto.randomUUID(),
                conversationId,
                pendingSources: mergePendingSources(
                    isSameConversation && current ? current.pendingSources : [],
                    detail.trustedSourcesToAdd ?? [],
                ),
            };
        });
        setActivePanel({ type: "ai" });
    };

    const closeChat = (userId: string) => {
        setChatUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
        setActivePanel((currentPanel) => (
            currentPanel?.type === "chat" && currentPanel.userId === userId ? null : currentPanel
        ));
    };

    useEffect(() => {
        const handleOpenChat = (event: Event) => {
            const detail = (event as CustomEvent<ChatUser>).detail;
            if (detail?.id) openChat(detail);
        };
        const handleOpenAiChat = (event: Event) => {
            openAiChat((event as CustomEvent<OpenAiChatEventDetail>).detail ?? {});
        };
        window.addEventListener(OPEN_CHAT_EVENT, handleOpenChat);
        window.addEventListener(OPEN_AI_CHAT_EVENT, handleOpenAiChat);
        return () => {
            window.removeEventListener(OPEN_CHAT_EVENT, handleOpenChat);
            window.removeEventListener(OPEN_AI_CHAT_EVENT, handleOpenAiChat);
        };
    }, []);

    if (!isLoggedIn) return null;

    const activeChatUser = activePanel?.type === "chat"
        ? chatUsers.find((user) => user.id === activePanel.userId)
        : undefined;
    const activeChatIndex = activePanel?.type === "chat"
        ? chatUsers.findIndex((user) => user.id === activePanel.userId)
        : -1;
    const activeBubbleOffset = activePanel?.type === "search"
        ? 24
        : activePanel?.type === "ai"
            ? 24 + ((chatUsers.length + 1) * 56)
            : activeChatIndex >= 0
                ? 24 + ((activeChatIndex + 1) * 56)
                : 24;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-end gap-3">
            {(activePanel?.type === "search" || activePanel?.type === "ai" || activeChatUser) && (
                <div className="relative">
                    {activePanel?.type === "search" && (
                        <SearchPanel openChat={openChat} onClose={() => setActivePanel(null)} />
                    )}
                    {activeChatUser && (
                        <ConversationPanel
                            selectedUser={activeChatUser}
                            onClose={() => setActivePanel(null)}
                            onRemove={() => closeChat(activeChatUser.id)}
                            onMessageSent={onMessageSent}
                        />
                    )}
                    {activePanel?.type === "ai" && aiSession && (
                        <AiConversationPanel
                            key={aiSession.key}
                            conversationId={aiSession.conversationId}
                            pendingSources={aiSession.pendingSources}
                            onConversationCreated={(conversationId) => {
                                setAiSession((current) => current ? { ...current, conversationId } : current);
                            }}
                            onPendingSourcesChange={(pendingSources) => {
                                setAiSession((current) => current ? { ...current, pendingSources } : current);
                            }}
                            onClose={() => setActivePanel(null)}
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
                    onClick={() => setActivePanel((current) => current?.type === "search" ? null : { type: "search" })}
                >
                    <SearchIcon className="size-5" />
                </button>

                {chatUsers.map((user) => (
                    <div key={user.id} className="relative">
                        <button
                            type="button"
                            className={`size-12 overflow-hidden rounded-full border bg-white shadow-md hover:ring-2 hover:ring-main ${activePanel?.type === "chat" && activePanel.userId === user.id ? "ring-2 ring-main" : ""}`}
                            title={getChatUserName(user)}
                            onClick={() => setActivePanel((current) => (
                                current?.type === "chat" && current.userId === user.id
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

                {aiSession && (
                    <div className="relative">
                        <button
                            type="button"
                            className={`flex size-12 items-center justify-center rounded-full bg-main text-white shadow-md hover:ring-2 hover:ring-main/40 ${activePanel?.type === "ai" ? "ring-2 ring-main ring-offset-2" : ""}`}
                            title="Rapideia AI"
                            onClick={() => setActivePanel((current) => current?.type === "ai" ? null : { type: "ai" })}
                        >
                            <SparklesIcon className="size-5" />
                        </button>
                        <button
                            type="button"
                            className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gray-800 text-white shadow"
                            title="Close AI chat"
                            onClick={() => {
                                setAiSession(null);
                                setActivePanel((current) => current?.type === "ai" ? null : current);
                            }}
                        >
                            <XIcon className="size-3" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function SearchPanel({ openChat, onClose }: { openChat: (user: ChatUser) => void; onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<ChatUser[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => { inputRef.current?.focus(); }, []);
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
                setUsers(((response.users ?? []) as SearchResultUser[]).map((user) => ({
                    id: user.id,
                    displayName: user.title,
                    username: user.link?.replace("/profile/", ""),
                    headline: user.subtitle,
                    avatarName: user.avatarName,
                })));
            } catch {
                if (isActive) setUsers([]);
            } finally {
                if (isActive) setIsSearching(false);
            }
        }, 250);
        return () => {
            isActive = false;
            window.clearTimeout(timeoutId);
        };
    }, [query]);

    return (
        <ChatPanelFrame
            header={<>
                <div className="flex items-center gap-2 font-semibold"><MessageCircleIcon className="size-5" />New message</div>
                <Button type="button" variant="ghost" size="icon" className="size-8" onClick={onClose}><XIcon className="size-4" /></Button>
            </>}
        >
            <div className="h-full p-3">
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
                <div className="mt-3 max-h-[22rem] overflow-y-auto">
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
                            onClick={() => { openChat(user); onClose(); }}
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
        </ChatPanelFrame>
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

    const loadConversation = useCallback(async (showLoading = true) => {
        if (!selectedUser?.id || !isLoggedIn) {
            setMessages([]);
            setRelationship({});
            return;
        }
        try {
            if (showLoading) setIsLoading(true);
            const response = await getChatConversationApi(selectedUser.id, 10);
            setMessages(response.messages ?? []);
            setRelationship(response.relationship ?? {});
            setHasMoreMessages(!!response.hasMore);
            setShouldStickToBottom(true);
        } catch {
            if (showLoading) toast.error("Couldn't load messages");
        } finally {
            if (showLoading) setIsLoading(false);
        }
    }, [isLoggedIn, selectedUser?.id]);

    const loadOlderMessages = async () => {
        if (!selectedUser?.id || isLoadingOlder || !hasMoreMessages || messages.length === 0) return;
        const container = messagesContainerRef.current;
        const previousScrollHeight = container?.scrollHeight ?? 0;
        try {
            setIsLoadingOlder(true);
            setShouldStickToBottom(false);
            const response = await getChatConversationApi(selectedUser.id, 10, messages[0].createdAt);
            const olderMessages = response.messages ?? [];
            setMessages((current) => {
                const existingIds = new Set(current.map((message) => message.id));
                return [...olderMessages.filter((message: ChatMessage) => !existingIds.has(message.id)), ...current];
            });
            setHasMoreMessages(!!response.hasMore);
            window.requestAnimationFrame(() => {
                if (container) container.scrollTop = container.scrollHeight - previousScrollHeight;
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
            setMessages((current) => [...current, response.message]);
            setMessageText("");
            onMessageSent?.();
        } catch (error: unknown) {
            toast.error(apiErrorMessage(error, "Couldn't send message"));
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => { loadConversation(true); }, [loadConversation]);
    useEffect(() => {
        if (!selectedUser?.id || !isLoggedIn) return;
        const intervalId = window.setInterval(() => loadConversation(false), 3000);
        return () => window.clearInterval(intervalId);
    }, [isLoggedIn, loadConversation, selectedUser?.id]);
    useEffect(() => {
        if (shouldStickToBottom) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length, shouldStickToBottom]);

    const relationshipLabels = getRelationshipLabels(relationship);
    return (
        <ChatPanelFrame
            header={<>
                <button type="button" className="flex min-w-0 items-center gap-2 text-left" onClick={onClose}>
                    <img src={getChatAvatarUrl(selectedUser)} className="size-8 rounded-full border object-cover" />
                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{getChatUserName(selectedUser)}</div>
                        {relationshipLabels.length > 0 && <div className="truncate text-xs text-gray-500">{relationshipLabels.join(" | ")}</div>}
                    </div>
                </button>
                <Button type="button" variant="ghost" size="icon" className="size-8" onClick={onRemove}><XIcon className="size-4" /></Button>
            </>}
            footer={
                <form className="flex gap-2 p-2" onSubmit={sendMessage}>
                    <textarea
                        value={messageText}
                        className="max-h-24 min-h-10 flex-1 resize-none rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-main"
                        placeholder="Write a message"
                        onChange={(event) => setMessageText(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault();
                                event.currentTarget.form?.requestSubmit();
                            }
                        }}
                    />
                    <Button type="submit" size="icon" disabled={isSending || !messageText.trim()}><SendIcon className="size-4" /></Button>
                </form>
            }
        >
            <div
                ref={messagesContainerRef}
                className="h-full space-y-2 overflow-y-auto px-3 py-3"
                onScroll={(event) => { if (event.currentTarget.scrollTop <= 48) loadOlderMessages(); }}
            >
                {isLoadingOlder && <div className="text-center text-xs text-gray-500">Loading older messages...</div>}
                {isLoading ? (
                    <div className="text-center text-sm text-gray-500">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="text-center text-sm text-gray-500">No messages yet.</div>
                ) : messages.map((message) => {
                    const isMine = message.senderId !== selectedUser.id;
                    return (
                        <div key={message.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[78%] rounded-xl px-3 py-2 text-sm ${isMine ? "bg-main text-white" : "bg-gray-100 text-gray-900"}`}>
                                <p className="whitespace-pre-wrap break-words">{message.text}</p>
                                <p className={`mt-1 text-[0.7rem] ${isMine ? "text-white/80" : "text-gray-500"}`}>{new Date(message.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
        </ChatPanelFrame>
    );
}

function AiConversationPanel({
    conversationId,
    pendingSources,
    onConversationCreated,
    onPendingSourcesChange,
    onClose,
    onMessageSent,
}: {
    conversationId?: string;
    pendingSources: AiChatTrustedSourceInput[];
    onConversationCreated: (conversationId: string) => void;
    onPendingSourcesChange: (sources: AiChatTrustedSourceInput[]) => void;
    onClose: () => void;
    onMessageSent?: () => void;
}) {
    const [messages, setMessages] = useState<AiChatMessage[]>([]);
    const [trustedSources, setTrustedSources] = useState<AiChatTrustedSource[]>([]);
    const [messageText, setMessageText] = useState("");
    const [pendingContent, setPendingContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOlder, setIsLoadingOlder] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [hasMoreMessages, setHasMoreMessages] = useState(false);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [failedRequestId, setFailedRequestId] = useState<string | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const shouldStickToBottomRef = useRef(true);

    useEffect(() => {
        if (!conversationId) {
            setMessages([]);
            setTrustedSources([]);
            return;
        }
        let isActive = true;
        const load = async () => {
            try {
                setIsLoading(true);
                const [messageResponse, sourceResponse] = await Promise.all([
                    getAiChatMessagesApi(conversationId, 20),
                    getAiChatTrustedSourcesApi(conversationId),
                ]);
                if (!isActive) return;
                setMessages(messageResponse.messages);
                setHasMoreMessages(messageResponse.hasMore);
                setNextCursor(messageResponse.nextCursor);
                setTrustedSources(sourceResponse.trustedSources);
            } catch {
                if (isActive) toast.error("Couldn't load the AI conversation");
            } finally {
                if (isActive) setIsLoading(false);
            }
        };
        load();
        return () => { isActive = false; };
    }, [conversationId]);

    useEffect(() => {
        if (shouldStickToBottomRef.current) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length, isSending]);

    const loadOlderMessages = async () => {
        if (!conversationId || !nextCursor || !hasMoreMessages || isLoadingOlder) return;
        const container = messagesContainerRef.current;
        const previousScrollHeight = container?.scrollHeight ?? 0;
        try {
            shouldStickToBottomRef.current = false;
            setIsLoadingOlder(true);
            const response = await getAiChatMessagesApi(conversationId, 20, nextCursor);
            setMessages((current) => {
                const ids = new Set(current.map((message) => message.id));
                return [...response.messages.filter((message) => !ids.has(message.id)), ...current];
            });
            setHasMoreMessages(response.hasMore);
            setNextCursor(response.nextCursor);
            window.requestAnimationFrame(() => {
                if (container) container.scrollTop = container.scrollHeight - previousScrollHeight;
                shouldStickToBottomRef.current = true;
            });
        } catch {
            shouldStickToBottomRef.current = true;
            toast.error("Couldn't load older AI messages");
        } finally {
            setIsLoadingOlder(false);
        }
    };

    const sendMessage = async (event: FormEvent) => {
        event.preventDefault();
        const content = messageText.trim();
        if (!content || isSending) return;
        const clientRequestId = failedRequestId ?? crypto.randomUUID();
        try {
            shouldStickToBottomRef.current = true;
            setIsSending(true);
            setFailedRequestId(null);
            setPendingContent(content);
            setMessageText("");
            const response = await sendAiChatMessageApi({
                clientRequestId,
                conversationId,
                content,
                trustedSourcesToAdd: pendingSources.length > 0 ? pendingSources : undefined,
            });
            setMessages((current) => {
                const byId = new Map(current.map((message) => [message.id, message]));
                byId.set(response.userMessage.id, response.userMessage);
                byId.set(response.assistantMessage.id, response.assistantMessage);
                return [...byId.values()].sort(
                    (left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime(),
                );
            });
            setTrustedSources(response.trustedSources);
            onPendingSourcesChange([]);
            setPendingContent(null);
            if (!conversationId) onConversationCreated(response.conversation.id);
            onMessageSent?.();
        } catch (error: unknown) {
            setFailedRequestId(clientRequestId);
            setMessageText(content);
            setPendingContent(null);
            toast.error(apiErrorMessage(error, "Rapideia AI couldn't answer. Try again."));
        } finally {
            setIsSending(false);
        }
    };

    const removeTrustedSource = async (source: AiChatTrustedSource) => {
        if (!conversationId) return;
        try {
            await removeAiChatTrustedSourceApi(conversationId, source.id);
            setTrustedSources((current) => current.filter((item) => item.id !== source.id));
        } catch (error: unknown) {
            toast.error(apiErrorMessage(error, "Couldn't remove the trusted source"));
        }
    };

    const allSourcesCount = trustedSources.length + pendingSources.length;
    return (
        <ChatPanelFrame
            header={<>
                <button type="button" className="flex min-w-0 items-center gap-2 text-left" onClick={onClose}>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-main text-white"><SparklesIcon className="size-4" /></span>
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">Rapideia AI</span>
                        <span className="block truncate text-xs text-gray-500">{conversationId ? "Your learning assistant" : "New conversation"}</span>
                    </span>
                </button>
                <Button type="button" variant="ghost" size="icon" className="size-8" onClick={onClose}><XIcon className="size-4" /></Button>
            </>}
            footer={
                <form className="p-2" onSubmit={sendMessage}>
                    <div className="flex gap-2">
                        <textarea
                            value={messageText}
                            className="max-h-28 min-h-10 flex-1 resize-none rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-main"
                            placeholder="Ask about courses, content, or your learning path"
                            maxLength={4000}
                            disabled={isSending}
                            onChange={(event) => { setMessageText(event.target.value); setFailedRequestId(null); }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && !event.shiftKey) {
                                    event.preventDefault();
                                    event.currentTarget.form?.requestSubmit();
                                }
                            }}
                        />
                        <Button type="submit" size="icon" disabled={isSending || !messageText.trim()}><SendIcon className="size-4" /></Button>
                    </div>
                    <div className="mt-1 px-1 text-[0.68rem] text-gray-400">
                        {isSending ? "Finding authorized evidence and preparing an answer..." : "Shift + Enter for a new line"}
                    </div>
                </form>
            }
        >
            <div className="flex h-full min-h-0 flex-col">
                {allSourcesCount > 0 && (
                    <div className="flex gap-1.5 overflow-x-auto border-b border-gray-100 px-3 py-2">
                        {trustedSources.map((source) => (
                            <span key={source.id} className="flex shrink-0 items-center gap-1 rounded-full bg-main/10 px-2 py-1 text-xs text-main">
                                <FileTextIcon className="size-3" />
                                <span className="max-w-32 truncate">{getAiTrustedSourceLabel(source)}</span>
                                <button type="button" title="Remove trusted source" onClick={() => removeTrustedSource(source)}><XIcon className="size-3" /></button>
                            </span>
                        ))}
                        {pendingSources.map((source) => (
                            <span key={`${source.sourceType}:${source.sourceId}`} className="flex shrink-0 items-center gap-1 rounded-full border border-dashed border-main/30 bg-main/5 px-2 py-1 text-xs text-main">
                                <FileTextIcon className="size-3" />
                                <span>{getAiTrustedSourceLabel(source)}</span>
                                <button
                                    type="button"
                                    title="Don't add this source"
                                    onClick={() => onPendingSourcesChange(pendingSources.filter((item) => item !== source))}
                                ><XIcon className="size-3" /></button>
                            </span>
                        ))}
                    </div>
                )}
                <div
                    ref={messagesContainerRef}
                    className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3"
                    onScroll={(event) => { if (event.currentTarget.scrollTop <= 48) loadOlderMessages(); }}
                >
                    {isLoadingOlder && <div className="text-center text-xs text-gray-500">Loading older messages...</div>}
                    {isLoading ? (
                        <div className="py-8 text-center text-sm text-gray-500">Loading conversation...</div>
                    ) : messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                            <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-main/10 text-main"><BotIcon className="size-6" /></span>
                            <p className="text-sm font-semibold text-gray-900">What would you like to learn?</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">Ask for a course, an explanation, a comparison, or help planning your next learning step.</p>
                        </div>
                    ) : messages.map((message) => <AiMessageBubble key={message.id} message={message} />)}
                    {pendingContent && (
                        <div className="flex justify-end">
                            <div className="max-w-[86%] rounded-xl bg-main px-3 py-2 text-sm text-white">
                                <p className="whitespace-pre-wrap break-words leading-5">{pendingContent}</p>
                            </div>
                        </div>
                    )}
                    {isSending && (
                        <div className="flex justify-start">
                            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-600">
                                <SparklesIcon className="size-4 animate-pulse text-main" />Rapideia AI is thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </ChatPanelFrame>
    );
}

function AiMessageBubble({ message }: { message: AiChatMessage }) {
    const isUser = message.role === "USER";
    const citations = Array.isArray(message.citations) ? message.citations : [];
    const resourceCitations = getUniqueResourceCitations(citations);
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[86%] rounded-xl px-3 py-2 text-sm ${isUser ? "bg-main text-white" : "bg-gray-100 text-gray-900"}`}>
                <p className="whitespace-pre-wrap break-words leading-5">
                    {isUser ? message.content : withoutCitationReferences(message.content)}
                </p>
                {!isUser && resourceCitations.length > 0 && (
                    <div className="mt-3 space-y-2 border-t border-gray-200 pt-2">
                        {resourceCitations.map((citation) => (
                            <CitationResourceLink key={`${citation.source!.type}:${citation.source!.id}`} citation={citation} />
                        ))}
                    </div>
                )}
                <p className={`mt-1 text-[0.68rem] ${isUser ? "text-white/75" : "text-gray-400"}`}>{new Date(message.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
}

function withoutCitationReferences(content: string) {
    return content
        .replace(/\s*\[(?:R\d+)(?:\s*,\s*R\d+)*\]/g, "")
        .replace(/[ \t]+\n/g, "\n")
        .trim();
}

function getUniqueResourceCitations(citations: AiChatCitation[]) {
    const byResource = new Map<string, AiChatCitation>();

    for (const citation of citations) {
        if (!citation.source || !getCitationUrl(citation)) continue;
        const key = `${citation.source.type}:${citation.source.id}`;
        if (!byResource.has(key)) byResource.set(key, citation);
    }

    return [...byResource.values()];
}

function getCitationUrl(citation: AiChatCitation) {
    if (!citation.source) return null;

    switch (citation.source.type) {
        case "COURSE":
            return `/course/${encodeURIComponent(citation.source.id)}`;
        case "POST":
        case "DISCUSSION":
            return `/post/${encodeURIComponent(citation.source.id)}`;
        default:
            return null;
    }
}

function CitationResourceLink({ citation }: { citation: AiChatCitation }) {
    const url = getCitationUrl(citation)!;
    const source = citation.source!;
    const resourceName = source.label || (source.type === "COURSE" ? "Course material" : "Learning material");
    const actionLabel = source.type === "COURSE" ? "Open course" : "Open material";
    const displayUrl = typeof window === "undefined" ? url : new URL(url, window.location.origin).href;

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-2.5">
            <p className="truncate text-xs font-semibold text-gray-900">{resourceName}</p>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 block truncate text-[0.68rem] text-main hover:underline"
                title={displayUrl}
            >
                {displayUrl}
            </a>
            <Button asChild size="xs" className="mt-2 bg-main hover:bg-main-hover">
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {actionLabel}
                    <ExternalLinkIcon className="size-3" />
                </a>
            </Button>
        </div>
    );
}
