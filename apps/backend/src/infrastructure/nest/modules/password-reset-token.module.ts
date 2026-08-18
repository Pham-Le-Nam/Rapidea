import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { UsersModule } from './users.module';
import { PasswordResetTokenService } from '../../../application/password-reset-token/password-reset-token.service';
import { PrismaPasswordResetTokenRepository } from '../../../adapters/repository/prisma/prisma-password-reset-token.repository';

@Module({
    imports: [
        PrismaModule,
        UsersModule,
    ],
    providers: [
        PasswordResetTokenService,
        {
            provide: 'PASSWORD_RESET_TOKEN_REPOSITORY',
            useClass: PrismaPasswordResetTokenRepository,
        }
    ],
    exports: [PasswordResetTokenService],
})
export class PasswordResetTokenModule {}
