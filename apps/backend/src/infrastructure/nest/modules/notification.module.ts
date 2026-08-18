import { Global, Module } from '@nestjs/common';
import { NotificationController } from '../../../adapters/http/controllers/notification/notification.controller';
import { NotificationService } from '../../../application/notification/notification.service';
import { PrismaNotificationRepository } from '../../../adapters/repository/prisma/prisma-notification.repository';

@Global()
@Module({
    controllers: [NotificationController],
    providers: [NotificationService, { provide: 'NOTIFICATION_REPOSITORY', useClass: PrismaNotificationRepository }],
    exports: [NotificationService],
})
export class NotificationModule {}
