import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/auth/jwt.guard';
import { ChatService } from '../../../../application/chat/chat.service';
import { SendMessageDto } from '../../dto/chat/send-message.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('conversations')
    async getRecentConversations(
        @Request() req: any,
        @Query('onlyRelated') onlyRelated?: string,
    ) {
        return {
            conversations: await this.chatService.getRecentConversations(
                req.user.userId,
                onlyRelated !== 'false',
            ),
        };
    }

    @Get('conversation/:otherUserId')
    async getConversation(
        @Request() req: any,
        @Param('otherUserId') otherUserId: string,
        @Query('limit') limit?: string,
        @Query('before') before?: string,
    ) {
        const parsedLimit = Number(limit);
        const beforeDate = before ? new Date(before) : undefined;

        return this.chatService.getConversation(
            req.user.userId,
            otherUserId,
            Number.isInteger(parsedLimit) ? parsedLimit : 10,
            beforeDate && !Number.isNaN(beforeDate.getTime()) ? beforeDate : undefined,
        );
    }

    @Post('conversation/:otherUserId/messages')
    async sendMessage(
        @Request() req: any,
        @Param('otherUserId') otherUserId: string,
        @Body() sendMessageDto: SendMessageDto,
    ) {
        return this.chatService.sendMessage(
            req.user.userId,
            otherUserId,
            sendMessageDto.text ?? '',
        );
    }
}
