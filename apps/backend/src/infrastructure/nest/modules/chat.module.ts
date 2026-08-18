import { Module } from '@nestjs/common';
import { ChatController } from '../../../adapters/http/controllers/chat/chat.controller';
import { ChatService } from '../../../application/chat/chat.service';
import { PrismaChatRepository } from '../../../adapters/repository/prisma/prisma-chat.repository';

@Module({
    controllers: [ChatController],
    providers: [ChatService, { provide: 'CHAT_REPOSITORY', useClass: PrismaChatRepository }],
    exports: [ChatService],
})
export class ChatModule {}
