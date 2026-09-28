import type { AiChatTrustedSourceInput } from "./model/types";

export const OPEN_CHAT_EVENT = "rapidea:open-chat";
export const OPEN_AI_CHAT_EVENT = "rapidea:open-ai-chat";

export type OpenAiChatEventDetail = {
    conversationId?: string;
    trustedSourcesToAdd?: AiChatTrustedSourceInput[];
    reuseActiveConversation?: boolean;
};

export function openAiChat(detail: OpenAiChatEventDetail = {}) {
    window.dispatchEvent(new CustomEvent(OPEN_AI_CHAT_EVENT, { detail }));
}
