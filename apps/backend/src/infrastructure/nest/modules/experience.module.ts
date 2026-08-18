import { Module } from '@nestjs/common';
import { ExperienceService } from '../../../application/experience/experience.service';
import { UsersModule } from './users.module';
import { ExperienceController } from '../../../adapters/http/controllers/experience/experience.controller';
import { PrismaExperienceRepository } from '../../../adapters/repository/prisma/prisma-experience.repository';

@Module({
    imports: [
        UsersModule,
    ],
    controllers: [
        ExperienceController,
    ],
    providers: [
        ExperienceService,
        {
            provide: "EXPERIENCE_REPOSITORY",
            useClass: PrismaExperienceRepository,
        }
    ]
})
export class ExperienceModule {}
