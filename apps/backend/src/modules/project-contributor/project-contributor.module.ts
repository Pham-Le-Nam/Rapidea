import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ProjectContributorService } from './project-contributor.service';
import { ProjectService } from '../project/project.service';
import { ProjectContributorController } from './project-contributor.controller';
import { PrismaProjectContributorRepository } from 'src/database/prisma/prisma-project-contributor.repository';

@Module({
    imports: [
        UsersModule,
    ],
    controllers: [
        ProjectContributorController,
    ],
    providers: [
        ProjectService,
        ProjectContributorService,
        {
            provide: "PROJECT_CONTRIBUTOR_REPOSITORY",
            useClass: PrismaProjectContributorRepository,
        }
    ],
})
export class ProjectContributorModule {}
