import { ChatService } from './chat.service';
import { SendMessageDto } from './chat-dto/send-message.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getRecentConversations(req: any, onlyRelated?: string): Promise<{
        conversations: {
            id: any;
            otherUser: any;
            relationship: any;
            lastMessage: any;
            lastMessageAt: any;
            unreadCount: number;
        }[];
    }>;
    getConversation(req: any, otherUserId: string, limit?: string, before?: string): Promise<{
        conversationId: any;
        otherUser: any;
        relationship: any;
        messages: any[];
        hasMore: boolean;
    }>;
    sendMessage(req: any, otherUserId: string, sendMessageDto: SendMessageDto): Promise<any>;
}
