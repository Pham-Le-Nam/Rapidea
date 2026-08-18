export interface ChatRepository {
    findRecentConversations(userId: string): Promise<any[]>;
    countUnread(conversationId: string, userId: string): Promise<number>;
    findUser(userId: string, summaryOnly?: boolean): Promise<any | null>;
    findConversation(userAId: string, userBId: string, limit: number, before?: Date): Promise<any | null>;
    markConversationRead(conversationId: string, senderId: string): Promise<any>;
    sendMessage(userAId: string, userBId: string, senderId: string, text: string): Promise<any>;
    findRelationship(userId: string, otherUserId: string): Promise<any>;
}
