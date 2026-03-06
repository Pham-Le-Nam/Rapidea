import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ProjectContributorService } from './project-contributor.service';
import { ProjectContributorController } from './project-contributor.controller';
import { PrismaProjectContributorRepository } from 'src/database/prisma/prisma-project-contributor.repository';
import { ProjectModule } from '../project/project.module';

@Module({
    imports: [
        UsersModule,
        ProjectModule,
    ],
    controllers: [
        ProjectContributorController,
    ],
    providers: [
        ProjectContributorService,
        {
            provide: "PROJECT_CONTRIBUTOR_REPOSITORY",
            useClass: PrismaProjectContributorRepository,
        }
    ],
})
export class ProjectContributorModule {}
