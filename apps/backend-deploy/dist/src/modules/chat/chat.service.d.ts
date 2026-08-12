import { ChatRepository } from './chat.repository';
export declare class ChatService {
    private readonly chatRepo;
    constructor(chatRepo: ChatRepository);
    getRecentConversations(userId: string, onlyRelated?: boolean): Promise<{
        id: any;
        otherUser: any;
        relationship: any;
        lastMessage: any;
        lastMessageAt: any;
        unreadCount: number;
    }[]>;
    getConversation(userId: string, otherUserId: string, limit?: number, before?: Date): Promise<{
        conversationId: any;
        otherUser: any;
        relationship: any;
        messages: any[];
        hasMore: boolean;
    }>;
    sendMessage(userId: string, otherUserId: string, text: string): Promise<any>;
    private getConversationPair;
    private getRelationship;
    private hasAnyRelationship;
}
