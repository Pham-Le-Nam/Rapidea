import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY || 'ThisIsASecretKey',
        });
    }

    async validate(payload: { sub: string; email: string; sessionVersion: number }) {
        const isValid = await this.usersService.validateSessionVersion(payload.sub, payload.sessionVersion);
        if (!isValid) {
            throw new UnauthorizedException('Session Expired');
        }
        return { userId: payload.sub, email: payload.email };
    }
}