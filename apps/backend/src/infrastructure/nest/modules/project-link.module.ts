import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { ProjectLinkController } from '../../../adapters/http/controllers/project-link/project-link.controller';
import { ProjectLinkService } from '../../../application/project-link/project-link.service';
import { PrismaProjectLinkRepository } from '../../../adapters/repository/prisma/prisma-project-link.repository';
import { ProjectModule } from './project.module';

@Module({
    imports: [
        UsersModule,
        ProjectModule,
    ],
    controllers: [
        ProjectLinkController,
    ],
    providers: [
        ProjectLinkService,
        {
            provide: "PROJECT_LINK_REPOSITORY",
            useClass: PrismaProjectLinkRepository,
        }
    ]
})
export class ProjectLinkModule {}
