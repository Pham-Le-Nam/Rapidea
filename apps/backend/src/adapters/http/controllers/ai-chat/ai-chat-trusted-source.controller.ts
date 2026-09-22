import { Controller, Delete, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AiChatTrustedSourceService } from '../../../../infrastructure/ai/ai-chat-trusted-source.service';
import { JwtAuthGuard } from '../../guards/auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/ai-chat/conversations/:conversationId/trusted-sources')
export class AiChatTrustedSourceController {
    constructor(
        private readonly trustedSources: AiChatTrustedSourceService,
    ) {}

    @Get()
    async list(
        @Request() request: any,
        @Param('conversationId') conversationId: string,
    ) {
        return {
            trustedSources: await this.trustedSources.list(
                request.user.userId,
                conversationId,
            ),
        };
    }

    @Delete(':trustedSourceId')
    async remove(
        @Request() request: any,
        @Param('conversationId') conversationId: string,
        @Param('trustedSourceId') trustedSourceId: string,
    ) {
        return this.trustedSources.remove(
            request.user.userId,
            conversationId,
            trustedSourceId,
        );
    }
}
