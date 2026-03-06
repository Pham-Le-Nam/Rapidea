import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        // If there is an error or invalid token → throw
        if (err || info) {
            throw err || new UnauthorizedException(info?.message || 'Invalid token');
        }

        // If no token → user will be undefined, allow request
        return user ?? null;
    }
}
