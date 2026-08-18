import { Module } from '@nestjs/common';
import { UsersService } from '../../../application/users/users.service';
import { ProjectController } from '../../../adapters/http/controllers/project/project.controller';
import { ProjectService } from '../../../application/project/project.service';
import { PrismaProjectRepository } from '../../../adapters/repository/prisma/prisma-project.repository';
import { UsersModule } from './users.module';

@Module({
    imports: [
        UsersModule,
    ],
    controllers: [
        ProjectController,
    ],
    providers: [
        ProjectService,
        {
            provide: "PROJECT_REPOSITORY",
            useClass: PrismaProjectRepository,
        },
    ],
    exports: [
        ProjectService,
    ]
})
export class ProjectModule {}
