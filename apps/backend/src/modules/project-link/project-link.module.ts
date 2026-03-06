import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ProjectLinkController } from './project-link.controller';
import { ProjectLinkService } from './project-link.service';
import { PrismaProjectLinkRepository } from 'src/database/prisma/prisma-project-link.repository';
import { ProjectModule } from '../project/project.module';

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
