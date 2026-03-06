import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { UsersModule } from '../users/users.module';
import { ExperienceController } from './experience.controller';
import { PrismaExperienceRepository } from 'src/database/prisma/prisma-experience.repository';

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
