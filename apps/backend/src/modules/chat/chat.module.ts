import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaChatRepository } from '../../database/prisma/prisma-chat.repository';

@Module({
    controllers: [ChatController],
    providers: [ChatService, { provide: 'CHAT_REPOSITORY', useClass: PrismaChatRepository }],
    exports: [ChatService],
})
export class ChatModule {}
