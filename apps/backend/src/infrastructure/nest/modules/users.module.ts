import { Module } from '@nestjs/common';
import { UsersService } from '../../../application/users/users.service';
import { UsersController } from '../../../adapters/http/controllers/users/users.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { PrismaUsersRepository } from '../../../adapters/repository/prisma/prisma-users.repository';
import { FolderModule } from './folder.module';

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