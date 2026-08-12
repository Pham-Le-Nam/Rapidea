import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminGuard } from './admin.guard';
import { AdminService } from './admin.service';
import { PrismaAdminRepository } from '../../database/prisma/prisma-admin.repository';

@Module({
    controllers: [AdminController],
    providers: [AdminService, AdminGuard, { provide: 'ADMIN_REPOSITORY', useClass: PrismaAdminRepository }],
})
export class AdminModule {}
