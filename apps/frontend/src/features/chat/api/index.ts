export {
    getChatConversationApi,
    getChatConversationsApi,
    searchApi,
    sendChatMessageApi,
} from "@/shared/api";

import { apiClient } from "@/shared/api/client";
import type {
    AiChatConversationPage,
    AiChatMessagePage,
    AiChatTrustedSource,
    AiChatTrustedSourceInput,
    SendAiChatMessageResponse,
} from "../model/types";

export async function getAiChatConversationsApi(
    limit = 20,
    before?: string,
): Promise<AiChatConversationPage> {
    const response = await apiClient.get("api/ai-chat/conversations", {
        params: { limit, before },
    });

    return response.data;
}

export async function getAiChatMessagesApi(
    conversationId: string,
    limit = 20,
    before?: string,
): Promise<AiChatMessagePage> {
    const response = await apiClient.get(
        `api/ai-chat/conversations/${conversationId}/messages`,
        { params: { limit, before } },
    );

    return response.data;
}

export async function sendAiChatMessageApi(input: {
    clientRequestId: string;
    conversationId?: string;
    content: string;
    trustedSourcesToAdd?: AiChatTrustedSourceInput[];
}): Promise<SendAiChatMessageResponse> {
    const response = await apiClient.post("api/ai-chat/messages", {
        ...input,
        trustedSourcesToAdd: input.trustedSourcesToAdd?.map(({ sourceType, sourceId }) => ({
            sourceType,
            sourceId,
        })),
    });

    return response.data;
}

export async function getAiChatTrustedSourcesApi(
    conversationId: string,
): Promise<{ trustedSources: AiChatTrustedSource[] }> {
    const response = await apiClient.get(
        `api/ai-chat/conversations/${conversationId}/trusted-sources`,
    );

    return response.data;
}

export async function removeAiChatTrustedSourceApi(
    conversationId: string,
    trustedSourceId: string,
) {
    const response = await apiClient.delete(
        `api/ai-chat/conversations/${conversationId}/trusted-sources/${trustedSourceId}`,
    );

    return response.data;
}
