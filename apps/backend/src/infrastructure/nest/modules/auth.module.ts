import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../../../application/auth/auth.service';
import { AuthController } from '../../../adapters/http/controllers/auth/auth.controller';
import { JwtStrategy } from '../../auth/jwt.strategy';
import { UsersModule } from './users.module';
import { PasswordResetTokenModule } from './password-reset-token.module';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../../mail/mail.service';
import { MAIL_SERVICE } from '../../../application/ports/mail.service';
import { PrismaAuthRepository } from '../../../adapters/repository/prisma/prisma-auth.repository';
import { AuthenticationProviderService } from '../../auth/authentication-provider.service';
import { AUTHENTICATION_PROVIDER_SERVICE } from '../../../application/ports/authentication-provider.service';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const secret = configService.get<string>('JWT_SECRET_KEY');
                if (!secret) {
                throw new Error('JWT_SECRET_KEY is not defined');
                }

                const expiresInRaw = configService.get<string>('JWT_EXPIRES_IN');
                const expiresIn = expiresInRaw ? Number(expiresInRaw) : 86400;

                return {
                    secret,
                    signOptions: { expiresIn },
                };
            },
        }),
        PasswordResetTokenModule,
    ],
    providers: [
        AuthService, 
        JwtStrategy, 
        { provide: MAIL_SERVICE, useClass: MailService },
        {
            provide: AUTHENTICATION_PROVIDER_SERVICE,
            useClass: AuthenticationProviderService,
        },
        { provide: 'AUTH_REPOSITORY', useClass: PrismaAuthRepository },
    ],
    controllers: [
        AuthController,
    ],
})
export class AuthModule {}
