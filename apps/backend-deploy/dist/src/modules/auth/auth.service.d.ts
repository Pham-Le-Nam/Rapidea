import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { PasswordResetTokenService } from '../password-reset-token/password-reset-token.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailService;
    private passwordResetTokenService;
    private authRepo;
    private config;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService, passwordResetTokenService: PasswordResetTokenService, authRepo: AuthRepository, config: ConfigService);
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    register(email: string, password: string, confirmPassword: string, firstname: string, lastname: string, middlename?: string): Promise<{
        success_message: string;
    }>;
    verifyEmailToken(rawToken: string): Promise<{
        access_token: string;
    }>;
    getGoogleAuthorizationUrl(): string;
    finishGoogleOAuth(code: string, state: string): Promise<{
        access_token: string;
    }>;
    getFrontendCallbackUrl(accessToken: string): string;
    changePassword(email: string): Promise<{
        success_message: string;
    }>;
    checkResetToken(token: string): Promise<any>;
    resetPassword(password: string, confirmPassword: string, token: string): Promise<{
        access_token: string;
    }>;
    private finishOAuth;
    private createRegistrationToken;
    private createSession;
    private validateUser;
    private normalizeEmail;
    private hashToken;
    private required;
    private oauthCallback;
    private verifyOAuthState;
}
