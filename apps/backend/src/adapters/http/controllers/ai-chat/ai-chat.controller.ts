import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AiChatConversationService } from '../../../../infrastructure/ai/ai-chat-conversation.service';
import { AiChatPaginationDto } from '../../dto/ai-chat/ai-chat-pagination.dto';
import { SendAiChatMessageDto } from '../../dto/ai-chat/send-ai-chat-message.dto';
import { JwtAuthGuard } from '../../guards/auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/ai-chat')
export class AiChatController {
    constructor(private readonly conversations: AiChatConversationService) {}

    @Post('messages')
    async sendMessage(
        @Request() request: any,
        @Body() input: SendAiChatMessageDto,
    ) {
        return this.conversations.sendMessage(request.user.userId, input);
    }

    @Get('conversations')
    async listConversations(
        @Request() request: any,
        @Query() pagination: AiChatPaginationDto,
    ) {
        return this.conversations.listConversations(
            request.user.userId,
            pagination.limit,
            pagination.before,
        );
    }

    @Get('conversations/:conversationId')
    async getConversation(
        @Request() request: any,
        @Param('conversationId') conversationId: string,
    ) {
        return this.conversations.getConversation(
            request.user.userId,
            conversationId,
        );
    }

    @Get('conversations/:conversationId/messages')
    async listMessages(
        @Request() request: any,
        @Param('conversationId') conversationId: string,
        @Query() pagination: AiChatPaginationDto,
    ) {
        return this.conversations.listMessages(
            request.user.userId,
            conversationId,
            pagination.limit,
            pagination.before,
        );
    }
}
