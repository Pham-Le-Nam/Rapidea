import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AiAssistantMode } from '../../../../application/ai-chat/ai-assistant-mode';
import { InstructorAssistantService } from '../../../../application/instructor-ai/instructor-assistant.service';
import { AiChatConversationService } from '../../../../infrastructure/ai/ai-chat-conversation.service';
import { AiChatTrustedSourceService } from '../../../../infrastructure/ai/ai-chat-trusted-source.service';
import { AiChatPaginationDto } from '../../dto/ai-chat/ai-chat-pagination.dto';
import { SendAiChatMessageDto } from '../../dto/ai-chat/send-ai-chat-message.dto';
import { ApplyInstructorProposalDto } from '../../dto/ai-chat/instructor-proposal.dto';
import { JwtAuthGuard } from '../../guards/auth/jwt.guard';
import { InstructorAiGuard } from '../../guards/auth/instructor-ai.guard';

@UseGuards(JwtAuthGuard, InstructorAiGuard)
@Controller('api/instructor-ai')
export class InstructorAiController {
  constructor(
    private readonly conversations: AiChatConversationService,
    private readonly sources: AiChatTrustedSourceService,
    private readonly assistant: InstructorAssistantService,
  ) {}
  @Get('capabilities') capabilities() {
    return { enabled: true, mode: AiAssistantMode.INSTRUCTOR };
  }
  @Post('messages') send(
    @Request() req: any,
    @Body() dto: SendAiChatMessageDto,
  ) {
    return this.conversations.sendMessage(
      req.user.userId,
      dto,
      AiAssistantMode.INSTRUCTOR,
    );
  }
  @Get('conversations') list(
    @Request() req: any,
    @Query() page: AiChatPaginationDto,
  ) {
    return this.conversations.listConversations(
      req.user.userId,
      page.limit,
      page.before,
      AiAssistantMode.INSTRUCTOR,
    );
  }
  @Get('conversations/:conversationId') get(
    @Request() req: any,
    @Param('conversationId', ParseUUIDPipe) id: string,
  ) {
    return this.conversations.getConversation(
      req.user.userId,
      id,
      AiAssistantMode.INSTRUCTOR,
    );
  }
  @Get('conversations/:conversationId/messages') messages(
    @Request() req: any,
    @Param('conversationId', ParseUUIDPipe) id: string,
    @Query() page: AiChatPaginationDto,
  ) {
    return this.conversations.listMessages(
      req.user.userId,
      id,
      page.limit,
      page.before,
      AiAssistantMode.INSTRUCTOR,
    );
  }
  @Get('sources') sourcePicker(
    @Request() req: any,
    @Query('query') query?: string,
  ) {
    return this.assistant.listSources(
      req.user.userId,
      typeof query === 'string' ? query : '',
    );
  }
  @Get('conversations/:conversationId/trusted-sources') trusted(
    @Request() req: any,
    @Param('conversationId', ParseUUIDPipe) id: string,
  ) {
    return this.sources
      .list(req.user.userId, id, AiAssistantMode.INSTRUCTOR)
      .then((trustedSources) => ({ trustedSources }));
  }
  @Delete('conversations/:conversationId/trusted-sources/:sourceId') remove(
    @Request() req: any,
    @Param('conversationId', ParseUUIDPipe) id: string,
    @Param('sourceId', ParseUUIDPipe) sourceId: string,
  ) {
    return this.sources.remove(
      req.user.userId,
      id,
      sourceId,
      AiAssistantMode.INSTRUCTOR,
    );
  }
  @Post('proposals/:messageId/apply') apply(
    @Request() req: any,
    @Param('messageId', ParseUUIDPipe) id: string,
    @Body() dto: ApplyInstructorProposalDto,
  ) {
    return this.assistant.applyProposal(req.user.userId, id, dto.proposal);
  }
}
