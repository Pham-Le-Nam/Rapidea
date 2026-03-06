import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaProjectRepository } from 'src/database/prisma/prisma-project.repository';

@Module({
    imports: [
        UsersService,
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
    ]
})
export class ProjectModule {}
