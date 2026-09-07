import { Module } from '@nestjs/common';
import { UsersService } from '../../../application/users/users.service';
import { UsersController } from '../../../adapters/http/controllers/users/users.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { PrismaUsersRepository } from '../../../adapters/repository/prisma/prisma-users.repository';
import { FolderModule } from './folder.module';
import { StorageModule } from './storage.module';

@Module({
    imports: [
        PrismaModule,
        FolderModule,
        StorageModule,
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
