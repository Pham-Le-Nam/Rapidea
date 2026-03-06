import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { UsersModule } from '../users/users.module';
import { EducationController } from './education.controller';
import { PrismaEducationRepository } from 'src/database/prisma/prisma-education.repository';

@Module({
    imports: [
        UsersModule
    ],
    controllers: [
        EducationController
    ],
    providers: [
        EducationService,
        {
            provide: "EDUCATION_REPOSITORY",
            useClass: PrismaEducationRepository,
        }
    ]
})
export class EducationModule {}
