import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../application/users/users.service';

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
        const user = await this.usersService.getUserById(payload.sub);
        if (!user || user.isBanned) {
            throw new UnauthorizedException(user?.banReason ? `Account banned: ${user.banReason}` : 'Account unavailable');
        }
        return { userId: payload.sub, email: payload.email, role: user.role };
    }
}
