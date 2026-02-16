import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigService } from '@nestjs/config';

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
                const expiresIn = expiresInRaw ? Number(expiresInRaw) : '1d';

                return {
                    secret,
                    signOptions: { expiresIn },
                };
            },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
