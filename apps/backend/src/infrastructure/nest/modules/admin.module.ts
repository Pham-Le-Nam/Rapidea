import { Module } from '@nestjs/common';
import { AdminController } from '../../../adapters/http/controllers/admin/admin.controller';
import { AdminGuard } from '../../../adapters/http/guards/admin/admin.guard';
import { AdminService } from '../../../application/admin/admin.service';
import { PrismaAdminRepository } from '../../../adapters/repository/prisma/prisma-admin.repository';

@Module({
    controllers: [AdminController],
    providers: [AdminService, AdminGuard, { provide: 'ADMIN_REPOSITORY', useClass: PrismaAdminRepository }],
})
export class AdminModule {}
