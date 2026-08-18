import { Module } from '@nestjs/common';
import { EducationService } from '../../../application/education/education.service';
import { UsersModule } from './users.module';
import { EducationController } from '../../../adapters/http/controllers/education/education.controller';
import { PrismaEducationRepository } from '../../../adapters/repository/prisma/prisma-education.repository';

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
