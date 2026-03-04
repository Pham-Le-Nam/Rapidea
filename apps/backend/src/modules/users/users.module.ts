import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaUsersRepository } from '../../database/prisma/prisma-users.repository';
import { FolderModule } from '../folder/folder.module';

@Module({
    imports: [
        PrismaModule,
        FolderModule
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService,
        {
            provide: 'USERS_REPOSITORY',
            useClass: PrismaUsersRepository,
        },
    ],
    exports: [UsersService],
})
export class UsersModule {}