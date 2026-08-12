"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const mail_service_1 = require("../mail/mail.service");
const password_reset_token_service_1 = require("../password-reset-token/password-reset-token.service");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    mailService;
    passwordResetTokenService;
    authRepo;
    config;
    constructor(usersService, jwtService, mailService, passwordResetTokenService, authRepo, config) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.passwordResetTokenService = passwordResetTokenService;
        this.authRepo = authRepo;
        this.config = config;
    }
    async login(email, password) {
        if (!email || !password)
            throw new common_1.UnauthorizedException('Email and password are required');
        const user = await this.validateUser(this.normalizeEmail(email), password);
        return this.createSession(user.id);
    }
    async register(email, password, confirmPassword, firstname, lastname, middlename) {
        email = this.normalizeEmail(email);
        if (await this.usersService.getUserByEmail(email))
            throw new common_1.UnauthorizedException('Email already in use');
        if (password !== confirmPassword)
            throw new common_1.UnauthorizedException('Passwords do not match');
        const pendingUser = {
            password: await bcrypt.hash(password, 10),
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            middlename: middlename?.trim() || undefined,
        };
        const token = await this.createRegistrationToken(email, pendingUser);
        await this.mailService.sendRegistrationVerification(email, token);
        return { success_message: 'Check your inbox to verify your email and finish creating your account.' };
    }
    async verifyEmailToken(rawToken) {
        const tokenHash = this.hashToken(rawToken);
        const record = await this.authRepo.findEmailToken(tokenHash);
        if (!record || record.purpose !== 'REGISTER' || record.usedAt || record.expiresAt <= new Date()) {
            throw new common_1.RequestTimeoutException('This verification link is invalid, expired, or has already been used.');
        }
        let user = await this.usersService.getUserByEmail(record.email);
        if (!user) {
            const pending = record.pendingUser;
            if (!pending?.password || !pending.firstname || !pending.lastname) {
                throw new common_1.BadRequestException('Registration details are missing.');
            }
            user = await this.usersService.createUser(record.email, pending.password, pending.firstname, pending.lastname, pending.middlename);
        }
        const consumed = await this.authRepo.consumeEmailToken(record.id);
        if (!consumed)
            throw new common_1.UnauthorizedException('This email link has already been used.');
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
    async finishGoogleOAuth(code, state) {
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
        if (!response.ok)
            throw new common_1.UnauthorizedException('Google sign-in could not be completed.');
        const tokens = await response.json();
        const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
            headers: { authorization: `Bearer ${tokens.access_token}` },
        });
        const profile = await profileResponse.json();
        if (!profileResponse.ok || !profile.email_verified)
            throw new common_1.UnauthorizedException('Google did not provide a verified email.');
        return this.finishOAuth('google', profile.sub, profile.email, profile.given_name, profile.family_name);
    }
    getFrontendCallbackUrl(accessToken) {
        const frontend = this.config.get('FRONTEND_URL') ?? 'http://localhost:5173';
        return `${frontend}/auth/callback#token=${encodeURIComponent(accessToken)}`;
    }
    async changePassword(email) {
        const user = await this.usersService.getUserByEmail(this.normalizeEmail(email));
        if (!user || !user.password)
            throw new common_1.UnauthorizedException('Invalid email, please try again');
        const rawToken = crypto.randomBytes(32).toString('hex');
        await this.passwordResetTokenService.createPasswordResetToken(user.id, await bcrypt.hash(rawToken, 10));
        await this.mailService.sendPasswordReset(user.email, rawToken);
        return { success_message: 'The password reset link has been sent to your email' };
    }
    async checkResetToken(token) {
        const resetToken = await this.passwordResetTokenService.getPasswordResetToken(token);
        if (!resetToken)
            throw new common_1.RequestTimeoutException('This reset password link is invalid. It may have been used already or expired.');
        return this.usersService.getUserById(resetToken.userId);
    }
    async resetPassword(password, confirmPassword, token) {
        const resetToken = await this.passwordResetTokenService.getPasswordResetToken(token);
        if (!resetToken)
            throw new common_1.RequestTimeoutException('This reset password link is invalid. It may have been used already or expired.');
        if (password !== confirmPassword)
            throw new common_1.UnauthorizedException('Passwords do not match');
        const user = await this.usersService.resetPassword(resetToken.userId, await bcrypt.hash(password, 10));
        if (!user)
            throw new common_1.InternalServerErrorException('Internal Error');
        await this.passwordResetTokenService.usePasswordResetToken(resetToken.id);
        return this.createSession(user.id);
    }
    async finishOAuth(provider, providerUserId, email, firstname, lastname) {
        email = this.normalizeEmail(email);
        let account = await this.authRepo.findOAuthAccount(provider, providerUserId);
        let user = account?.user ?? await this.usersService.getUserByEmail(email);
        if (!user)
            user = await this.usersService.createUser(email, null, firstname || 'New', lastname || 'User');
        if (!account) {
            account = await this.authRepo.createOAuthAccount(provider, providerUserId, user.id);
        }
        return this.createSession(account.userId);
    }
    async createRegistrationToken(email, pendingUser) {
        const rawToken = crypto.randomBytes(32).toString('base64url');
        await this.authRepo.replaceRegistrationToken(email, this.hashToken(rawToken), pendingUser, new Date(Date.now() + 15 * 60 * 1000));
        return rawToken;
    }
    async createSession(userId) {
        const user = await this.usersService.updateSessionVersion(userId);
        return { access_token: this.jwtService.sign({ sub: user.id, email: user.email, sessionVersion: user.sessionVersion }) };
    }
    async validateUser(email, password) {
        const user = await this.usersService.getUserByEmail(email);
        if (!user?.password || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        return user;
    }
    normalizeEmail(email) { return email.trim().toLowerCase(); }
    hashToken(token) { return crypto.createHash('sha256').update(token).digest('hex'); }
    required(name) {
        const value = this.config.get(name);
        if (!value)
            throw new common_1.InternalServerErrorException(`${name} is not configured`);
        return value;
    }
    oauthCallback(provider) {
        const backend = this.config.get('BACKEND_URL') ?? `http://localhost:${this.config.get('API_PORT') ?? 1234}`;
        return `${backend}/api/auth/oauth/${provider}/callback`;
    }
    verifyOAuthState(state, provider) {
        try {
            const payload = this.jwtService.verify(state);
            if (payload.provider !== provider)
                throw new Error();
        }
        catch {
            throw new common_1.UnauthorizedException('OAuth state is invalid or expired.');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)('AUTH_REPOSITORY')),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        password_reset_token_service_1.PasswordResetTokenService, Object, config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map