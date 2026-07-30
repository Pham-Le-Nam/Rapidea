import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    RequestTimeoutException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { PasswordResetTokenService } from '../password-reset-token/password-reset-token.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

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
        private jwtService: JwtService,
        private mailService: MailService,
        private passwordResetTokenService: PasswordResetTokenService,
        private prisma: PrismaService,
        private config: ConfigService,
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
        const record = await this.prisma.emailAuthToken.findUnique({ where: { tokenHash } });
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

        const consumed = await this.prisma.emailAuthToken.updateMany({
            where: { id: record.id, usedAt: null, expiresAt: { gt: new Date() } },
            data: { usedAt: new Date() },
        });
        if (consumed.count !== 1) throw new UnauthorizedException('This email link has already been used.');
        return this.createSession(user.id);
    }

    getGoogleAuthorizationUrl() {
        const clientId = this.required('GOOGLE_CLIENT_ID');
        const callback = this.oauthCallback('google');
        const state = this.jwtService.sign({ provider: 'google', nonce: crypto.randomBytes(16).toString('hex') }, { expiresIn: '10m' });
        const query = new URLSearchParams({
            client_id: clientId,
            redirect_uri: callback,
            response_type: 'code',
            scope: 'openid email profile',
            state,
            prompt: 'select_account',
        });
        return `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
    }

    async finishGoogleOAuth(code: string, state: string) {
        this.verifyOAuthState(state, 'google');
        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: this.required('GOOGLE_CLIENT_ID'),
                client_secret: this.required('GOOGLE_CLIENT_SECRET'),
                redirect_uri: this.oauthCallback('google'),
                grant_type: 'authorization_code',
            }),
        });
        if (!response.ok) throw new UnauthorizedException('Google sign-in could not be completed.');
        const tokens = await response.json() as { access_token: string };
        const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
            headers: { authorization: `Bearer ${tokens.access_token}` },
        });
        const profile = await profileResponse.json() as { sub: string; email: string; email_verified: boolean; given_name?: string; family_name?: string };
        if (!profileResponse.ok || !profile.email_verified) throw new UnauthorizedException('Google did not provide a verified email.');
        return this.finishOAuth('google', profile.sub, profile.email, profile.given_name, profile.family_name);
    }

    getFrontendCallbackUrl(accessToken: string) {
        const frontend = this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:5173';
        return `${frontend}/auth/callback#token=${encodeURIComponent(accessToken)}`;
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
        let account = await this.prisma.oAuthAccount.findUnique({
            where: { provider_providerUserId: { provider, providerUserId } },
            include: { user: true },
        });
        let user = account?.user ?? await this.usersService.getUserByEmail(email);
        if (!user) user = await this.usersService.createUser(email, null, firstname || 'New', lastname || 'User');
        if (!account) {
            account = await this.prisma.oAuthAccount.create({
                data: { provider, providerUserId, userId: user.id },
                include: { user: true },
            });
        }
        return this.createSession(account.userId);
    }

    private async createRegistrationToken(email: string, pendingUser: PendingRegistration) {
        const rawToken = crypto.randomBytes(32).toString('base64url');
        await this.prisma.$transaction([
            this.prisma.emailAuthToken.updateMany({
                where: { email, purpose: 'REGISTER', usedAt: null },
                data: { usedAt: new Date() },
            }),
            this.prisma.emailAuthToken.create({
                data: {
                    tokenHash: this.hashToken(rawToken),
                    email,
                    purpose: 'REGISTER',
                    pendingUser: pendingUser as any,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                },
            }),
        ]);
        return rawToken;
    }

    private async createSession(userId: string) {
        const user = await this.usersService.updateSessionVersion(userId);
        return { access_token: this.jwtService.sign({ sub: user.id, email: user.email, sessionVersion: user.sessionVersion }) };
    }

    private async validateUser(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email);
        if (!user?.password || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return user;
    }

    private normalizeEmail(email: string) { return email.trim().toLowerCase(); }
    private hashToken(token: string) { return crypto.createHash('sha256').update(token).digest('hex'); }
    private required(name: string) {
        const value = this.config.get<string>(name);
        if (!value) throw new InternalServerErrorException(`${name} is not configured`);
        return value;
    }
    private oauthCallback(provider: string) {
        const backend = this.config.get<string>('BACKEND_URL') ?? `http://localhost:${this.config.get('API_PORT') ?? 1234}`;
        return `${backend}/api/auth/oauth/${provider}/callback`;
    }
    private verifyOAuthState(state: string, provider: string) {
        try {
            const payload = this.jwtService.verify(state) as { provider: string };
            if (payload.provider !== provider) throw new Error();
        } catch {
            throw new UnauthorizedException('OAuth state is invalid or expired.');
        }
    }
}
