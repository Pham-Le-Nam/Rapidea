import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ProjectLinkController } from './project-link.controller';
import { ProjectService } from '../project/project.service';
import { ProjectLinkService } from './project-link.service';
import { PrismaProjectLinkRepository } from 'src/database/prisma/prisma-project-link.repository';

@Module({
    imports: [
        UsersModule,
    ],
    controllers: [
        ProjectLinkController,
    ],
    providers: [
        ProjectService,
        ProjectLinkService,
        {
            provide: "PROJECT_LINK_REPOSITORY",
            useClass: PrismaProjectLinkRepository,
        }
    ]
})
export class ProjectLinkModule {}
