export {
    getChatConversationApi,
    getChatConversationsApi,
    searchApi,
    sendChatMessageApi,
} from "@/shared/api";

import { apiClient } from "@/shared/api/client";
import type {
    AiAssistantMode,
    InstructorProposal,
    AiChatConversationPage,
    AiChatMessagePage,
    AiChatTrustedSource,
    AiChatTrustedSourceInput,
    SendAiChatMessageResponse,
} from "../model/types";

function aiPath(mode: AiAssistantMode) { return mode === "INSTRUCTOR" ? "api/instructor-ai" : "api/ai-chat"; }
export async function hasInstructorAiAccessApi(): Promise<boolean> {
    try { return (await apiClient.get("api/instructor-ai/capabilities")).data.enabled === true; }
    catch { return false; }
}
export async function getInstructorSourcesApi(query = ""): Promise<AiChatTrustedSourceInput[]> {
    return (await apiClient.get("api/instructor-ai/sources", { params: { query } })).data;
}
export async function applyInstructorProposalApi(messageId: string, proposal: InstructorProposal): Promise<{ resultId: string; appliedAt: string; replay: boolean }> {
    const { kind, title, body, items } = proposal;
    return (await apiClient.post(`api/instructor-ai/proposals/${messageId}/apply`, { confirmed: true, proposal: { kind, title, body, items } })).data;
}

export async function getAiChatConversationsApi(
    limit = 20,
    before?: string,
    mode: AiAssistantMode = "LEARNER",
): Promise<AiChatConversationPage> {
    const response = await apiClient.get(`${aiPath(mode)}/conversations`, {
        params: { limit, before },
    });

    return response.data;
}

export async function getAiChatMessagesApi(
    conversationId: string,
    limit = 20,
    before?: string,
    mode: AiAssistantMode = "LEARNER",
): Promise<AiChatMessagePage> {
    const response = await apiClient.get(
        `${aiPath(mode)}/conversations/${conversationId}/messages`,
        { params: { limit, before } },
    );

    return response.data;
}

export async function sendAiChatMessageApi(input: {
    clientRequestId: string;
    conversationId?: string;
    content: string;
    trustedSourcesToAdd?: AiChatTrustedSourceInput[];
}, mode: AiAssistantMode = "LEARNER"): Promise<SendAiChatMessageResponse> {
    const response = await apiClient.post(`${aiPath(mode)}/messages`, {
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
    mode: AiAssistantMode = "LEARNER",
): Promise<{ trustedSources: AiChatTrustedSource[] }> {
    const response = await apiClient.get(
        `${aiPath(mode)}/conversations/${conversationId}/trusted-sources`,
    );

    return response.data;
}

export async function removeAiChatTrustedSourceApi(
    conversationId: string,
    trustedSourceId: string,
    mode: AiAssistantMode = "LEARNER",
) {
    const response = await apiClient.delete(
        `${aiPath(mode)}/conversations/${conversationId}/trusted-sources/${trustedSourceId}`,
    );

    return response.data;
}
