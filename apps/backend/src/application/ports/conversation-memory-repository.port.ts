import {
  ConversationMemoryState,
  SaveConversationSummaryInput,
} from '../ai-chat/conversation-memory.types';

export const CONVERSATION_MEMORY_REPOSITORY = 'CONVERSATION_MEMORY_REPOSITORY';

export interface ConversationMemoryRepository {
  load(
    userId: string,
    conversationId: string,
    beforeMessageId?: string,
  ): Promise<ConversationMemoryState>;
  saveSummary(input: SaveConversationSummaryInput): Promise<boolean>;
}
