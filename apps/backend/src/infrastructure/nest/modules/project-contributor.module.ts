import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { ProjectContributorService } from '../../../application/project-contributor/project-contributor.service';
import { ProjectContributorController } from '../../../adapters/http/controllers/project-contributor/project-contributor.controller';
import { PrismaProjectContributorRepository } from '../../../adapters/repository/prisma/prisma-project-contributor.repository';
import { ProjectModule } from './project.module';

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
