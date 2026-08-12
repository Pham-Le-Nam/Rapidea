import { Global, Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaNotificationRepository } from '../../database/prisma/prisma-notification.repository';

@Global()
@Module({
    controllers: [NotificationController],
    providers: [NotificationService, { provide: 'NOTIFICATION_REPOSITORY', useClass: PrismaNotificationRepository }],
    exports: [NotificationService],
})
export class NotificationModule {}
