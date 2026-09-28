import { RequestMethod } from '@nestjs/common';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { ChatController } from '../chat/chat.controller';
import { AiChatTrustedSourceController } from './ai-chat-trusted-source.controller';
import { AiChatController } from './ai-chat.controller';

type ControllerType = { prototype: Record<string, unknown> };

function routes(controller: ControllerType) {
  return Object.getOwnPropertyNames(controller.prototype).flatMap((name) => {
    if (name === 'constructor') return [];
    const handler = controller.prototype[name];
    if (typeof handler !== 'function') return [];
    const method = Reflect.getMetadata(METHOD_METADATA, handler) as
      | RequestMethod
      | undefined;
    const path = Reflect.getMetadata(PATH_METADATA, handler) as
      | string
      | undefined;
    return method === undefined ? [] : [{ name, method, path }];
  });
}

describe('AI chat HTTP surface', () => {
  it('keeps AI chat routes separate from user-to-user chat routes', () => {
    expect(Reflect.getMetadata(PATH_METADATA, AiChatController)).toBe(
      'api/ai-chat',
    );
    expect(Reflect.getMetadata(PATH_METADATA, ChatController)).toBe('api/chat');
  });

  it('exposes the unified message endpoint and conversation history reads without empty conversation creation', () => {
    const apiRoutes = routes(AiChatController as unknown as ControllerType);

    expect(apiRoutes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          method: RequestMethod.POST,
          path: 'messages',
        }),
        expect.objectContaining({
          method: RequestMethod.GET,
          path: 'conversations',
        }),
        expect.objectContaining({
          method: RequestMethod.GET,
          path: 'conversations/:conversationId',
        }),
        expect.objectContaining({
          method: RequestMethod.GET,
          path: 'conversations/:conversationId/messages',
        }),
      ]),
    );
    expect(apiRoutes).not.toContainEqual(
      expect.objectContaining({
        method: RequestMethod.POST,
        path: 'conversations',
      }),
    );
  });

  it('keeps trusted-source list and deletion without standalone creation', () => {
    const sourceRoutes = routes(
      AiChatTrustedSourceController as unknown as ControllerType,
    );

    expect(sourceRoutes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ method: RequestMethod.GET }),
        expect.objectContaining({
          method: RequestMethod.DELETE,
          path: ':trustedSourceId',
        }),
      ]),
    );
    expect(
      sourceRoutes.some((route) => route.method === RequestMethod.POST),
    ).toBe(false);
  });
});
