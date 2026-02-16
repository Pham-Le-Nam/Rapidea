import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        // If token invalid → ignore
        // If no token → ignore
        // Just return user or null
        return user ?? null;
    }
}
