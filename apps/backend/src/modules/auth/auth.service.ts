import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(email: string, password: string) {
        let user = await this.validateUser(email, password);

        user = await this.usersService.updateSessionVersion(user.id);

        const payload = { sub: user.id, email: user.email, sessionVersion: user.sessionVersion };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(email: string, password: string, confirmPassword: string, firstname: string, lastname: string, middlename?: string) {
        if (await this.usersService.getUserByEmail(email)) {
            throw new UnauthorizedException('Email already in use');
        }

        if (password !== confirmPassword) {
            throw new UnauthorizedException('Passwords do not match');
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await this.usersService.createUser(email, hashed, firstname, lastname, middlename);

        const payload = { sub: user.id, email: user.email, sessionVersion: user.sessionVersion };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email);
        if (!user) throw new UnauthorizedException();

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException();

        return user;
    }
}
