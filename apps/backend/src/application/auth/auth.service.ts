import {
    BadRequestException,
    Inject, Injectable,
    InternalServerErrorException,
    RequestTimeoutException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../../domain/auth/repositories/auth.repository';
import { UsersService } from '../users/users.service';
import { MAIL_SERVICE, MailService } from '../ports/mail.service';
import { PasswordResetTokenService } from '../password-reset-token/password-reset-token.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
    AUTHENTICATION_PROVIDER_SERVICE,
    AuthenticationProviderService,
} from '../ports/authentication-provider.service';

type PendingRegistration = {
    password: string;
    firstname: string;
    lastname: string;
    middlename?: string;
};

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        @Inject(AUTHENTICATION_PROVIDER_SERVICE)
        private authenticationProvider: AuthenticationProviderService,
        @Inject(MAIL_SERVICE) private mailService: MailService,
        private passwordResetTokenService: PasswordResetTokenService,
        @Inject('AUTH_REPOSITORY') private authRepo: AuthRepository,
    ) {}

    async login(email: string, password: string) {
        if (!email || !password) throw new UnauthorizedException('Email and password are required');
        const user = await this.validateUser(this.normalizeEmail(email), password);
        return this.createSession(user.id);
    }

    async register(email: string, password: string, confirmPassword: string, firstname: string, lastname: string, middlename?: string) {
        email = this.normalizeEmail(email);
        if (await this.usersService.getUserByEmail(email)) throw new UnauthorizedException('Email already in use');
        if (password !== confirmPassword) throw new UnauthorizedException('Passwords do not match');

        const pendingUser: PendingRegistration = {
            password: await bcrypt.hash(password, 10),
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            middlename: middlename?.trim() || undefined,
        };
        const token = await this.createRegistrationToken(email, pendingUser);
        await this.mailService.sendRegistrationVerification(email, token);
        return { success_message: 'Check your inbox to verify your email and finish creating your account.' };
    }

    async verifyEmailToken(rawToken: string) {
        const tokenHash = this.hashToken(rawToken);
        const record = await this.authRepo.findEmailToken(tokenHash);
        if (!record || record.purpose !== 'REGISTER' || record.usedAt || record.expiresAt <= new Date()) {
            throw new RequestTimeoutException('This verification link is invalid, expired, or has already been used.');
        }

        let user = await this.usersService.getUserByEmail(record.email);
        if (!user) {
            const pending = record.pendingUser as PendingRegistration | null;
            if (!pending?.password || !pending.firstname || !pending.lastname) {
                throw new BadRequestException('Registration details are missing.');
            }
            user = await this.usersService.createUser(
                record.email,
                pending.password,
                pending.firstname,
                pending.lastname,
                pending.middlename,
            );
        }

        const consumed = await this.authRepo.consumeEmailToken(record.id);
        if (!consumed) throw new UnauthorizedException('This email link has already been used.');
        return this.createSession(user.id);
    }

    getGoogleAuthorizationUrl() {
        return this.authenticationProvider.getGoogleAuthorizationUrl();
    }

    async finishGoogleOAuth(code: string, state: string) {
        const profile = await this.authenticationProvider.getGoogleProfile(code, state);
        return this.finishOAuth(
            'google',
            profile.providerUserId,
            profile.email,
            profile.firstname,
            profile.lastname,
        );
    }

    getFrontendCallbackUrl(accessToken: string) {
        return this.authenticationProvider.getFrontendCallbackUrl(accessToken);
    }

    async changePassword(email: string) {
        const user = await this.usersService.getUserByEmail(this.normalizeEmail(email));
        if (!user || !user.password) throw new UnauthorizedException('Invalid email, please try again');
        const rawToken = crypto.randomBytes(32).toString('hex');
        await this.passwordResetTokenService.createPasswordResetToken(user.id, await bcrypt.hash(rawToken, 10));
        await this.mailService.sendPasswordReset(user.email, rawToken);
        return { success_message: 'The password reset link has been sent to your email' };
    }

    async checkResetToken(token: string) {
        const resetToken = await this.passwordResetTokenService.getPasswordResetToken(token);
        if (!resetToken) throw new RequestTimeoutException('This reset password link is invalid. It may have been used already or expired.');
        return this.usersService.getUserById(resetToken.userId);
    }

    async resetPassword(password: string, confirmPassword: string, token: string) {
        const resetToken = await this.passwordResetTokenService.getPasswordResetToken(token);
        if (!resetToken) throw new RequestTimeoutException('This reset password link is invalid. It may have been used already or expired.');
        if (password !== confirmPassword) throw new UnauthorizedException('Passwords do not match');
        const user = await this.usersService.resetPassword(resetToken.userId, await bcrypt.hash(password, 10));
        if (!user) throw new InternalServerErrorException('Internal Error');
        await this.passwordResetTokenService.usePasswordResetToken(resetToken.id);
        return this.createSession(user.id);
    }

    private async finishOAuth(provider: string, providerUserId: string, email: string, firstname?: string, lastname?: string) {
        email = this.normalizeEmail(email);
        let account = await this.authRepo.findOAuthAccount(provider, providerUserId);
        let user = account?.user ?? await this.usersService.getUserByEmail(email);
        if (!user) user = await this.usersService.createUser(email, null, firstname || 'New', lastname || 'User');
        if (!account) {
            account = await this.authRepo.createOAuthAccount(provider, providerUserId, user.id);
        }
        return this.createSession(account.userId);
    }

    private async createRegistrationToken(email: string, pendingUser: PendingRegistration) {
        const rawToken = crypto.randomBytes(32).toString('base64url');
        await this.authRepo.replaceRegistrationToken(email, this.hashToken(rawToken), pendingUser, new Date(Date.now() + 15 * 60 * 1000));
        return rawToken;
    }

    private async createSession(userId: string) {
        const user = await this.usersService.updateSessionVersion(userId);
        return {
            access_token: this.authenticationProvider.createSessionToken({
                sub: user.id,
                email: user.email,
                sessionVersion: user.sessionVersion,
            }),
        };
    }

    private async validateUser(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email);
        if (!user?.password || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return user;
    }

    private normalizeEmail(email: string) { 
        return email.trim().toLowerCase(); 
    }

    private hashToken(token: string) { 
        return crypto.createHash('sha256').update(token).digest('hex'); 
    }

}
