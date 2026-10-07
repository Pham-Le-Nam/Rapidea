import type { AiChatConversationSummary } from "./types";

/** Merge the two authorized history streams into one newest-first section. */
export function mergeAiConversationHistory(
    learner: AiChatConversationSummary[],
    instructor: AiChatConversationSummary[],
    canUseInstructor: boolean,
): AiChatConversationSummary[] {
    const conversations = [
        ...learner.map(conversation => ({ ...conversation, mode: "LEARNER" as const })),
        ...(canUseInstructor ? instructor.map(conversation => ({ ...conversation, mode: "INSTRUCTOR" as const })) : []),
    ];
    return [...new Map(conversations.map(conversation => [conversation.id, conversation])).values()]
        .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
            || b.id.localeCompare(a.id));
}
