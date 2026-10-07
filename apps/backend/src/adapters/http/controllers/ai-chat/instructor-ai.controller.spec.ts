import { RequestMethod } from '@nestjs/common';
import {
  GUARDS_METADATA,
  METHOD_METADATA,
  PATH_METADATA,
} from '@nestjs/common/constants';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { InstructorAiController } from './instructor-ai.controller';
import { InstructorAiGuard } from '../../guards/auth/instructor-ai.guard';
import { JwtAuthGuard } from '../../guards/auth/jwt.guard';
import { ApplyInstructorProposalDto } from '../../dto/ai-chat/instructor-proposal.dto';
import { SendAiChatMessageDto } from '../../dto/ai-chat/send-ai-chat-message.dto';

describe('Instructor AI HTTP contract', () => {
  it('has a separate guarded namespace and no standalone conversation or source creation', () => {
    expect(Reflect.getMetadata(PATH_METADATA, InstructorAiController)).toBe(
      'api/instructor-ai',
    );
    expect(
      Reflect.getMetadata(GUARDS_METADATA, InstructorAiController),
    ).toEqual([JwtAuthGuard, InstructorAiGuard]);
    const routes = Object.getOwnPropertyNames(InstructorAiController.prototype)
      .filter((n) => n !== 'constructor')
      .map((n) => {
        const method = InstructorAiController.prototype[n];
        return {
          path: Reflect.getMetadata(PATH_METADATA, method),
          method: Reflect.getMetadata(METHOD_METADATA, method),
        };
      });
    expect(routes).toContainEqual({
      path: 'conversations/:conversationId',
      method: RequestMethod.GET,
    });
    expect(routes).toContainEqual({
      path: 'conversations/:conversationId/messages',
      method: RequestMethod.GET,
    });
    expect(routes).not.toContainEqual({
      path: 'conversations',
      method: RequestMethod.POST,
    });
    expect(routes).not.toContainEqual({
      path: 'sources',
      method: RequestMethod.POST,
    });
  });
  it('sets the mode server-side for messages and paginated history', async () => {
    const conversations = {
      sendMessage: jest.fn(),
      listConversations: jest.fn(),
      listMessages: jest.fn(),
    };
    const controller = new InstructorAiController(
      conversations as any,
      {} as any,
      {} as any,
    );
    await controller.send(
      { user: { userId: 'owner' } },
      { clientRequestId: 'request', content: 'Review my course' },
    );
    expect(conversations.sendMessage).toHaveBeenCalledWith(
      'owner',
      expect.any(Object),
      'INSTRUCTOR',
    );
    await controller.messages({ user: { userId: 'owner' } }, 'conversation', {
      limit: 12,
      before: 'cursor',
    });
    expect(conversations.listMessages).toHaveBeenCalledWith(
      'owner',
      'conversation',
      12,
      'cursor',
      'INSTRUCTOR',
    );
  });
  it('requires an explicit confirmation and a valid reviewed proposal', async () => {
    const proposal = {
      kind: 'POST_DRAFT',
      title: 'Limits',
      body: 'Explain limits.',
      items: [],
    };
    expect(
      await validate(
        plainToInstance(ApplyInstructorProposalDto, {
          confirmed: true,
          proposal,
        }),
      ),
    ).toEqual([]);
    expect(
      (
        await validate(
          plainToInstance(ApplyInstructorProposalDto, { proposal }),
        )
      ).length,
    ).toBeGreaterThan(0);
    expect(
      (
        await validate(
          plainToInstance(ApplyInstructorProposalDto, { confirmed: true }),
        )
      ).length,
    ).toBeGreaterThan(0);
  });
  it('rejects non-UUID request/conversation/source identifiers', async () => {
    const invalid = {
      clientRequestId: 'model-invented',
      conversationId: 'bad',
      content: 'Hello',
      trustedSourcesToAdd: [{ sourceType: 'COURSE', sourceId: 'bad' }],
    };
    const errors = await validate(
      plainToInstance(SendAiChatMessageDto, invalid),
    );
    expect(errors.map((e) => e.property)).toEqual(
      expect.arrayContaining([
        'clientRequestId',
        'conversationId',
        'trustedSourcesToAdd',
      ]),
    );
  });
});
