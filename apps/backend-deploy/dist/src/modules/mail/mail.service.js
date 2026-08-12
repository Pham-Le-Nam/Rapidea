"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
let MailService = class MailService {
    mailerService;
    config;
    constructor(mailerService, config) {
        this.mailerService = mailerService;
        this.config = config;
    }
    async sendPasswordReset(email, token) {
        const resetLink = `${this.config.get('FRONTEND_URL')}/reset-password?token=${encodeURIComponent(token)}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset Your Password',
            html: `
                <h2>Password Reset</h2>
                <p>Click below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link expires in 15 minutes.</p>
            `,
        });
    }
    async sendRegistrationVerification(email, token) {
        const frontendUrl = this.config.get('FRONTEND_URL') ?? 'http://localhost:5173';
        const link = `${frontendUrl}/auth/email/verify?token=${encodeURIComponent(token)}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Confirm your Rapidea account',
            html: `
                <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#172033">
                    <h2>Confirm your email address</h2>
                    <p>Click the button below to verify that you own this email address and create your account.</p>
                    <p style="margin:28px 0">
                        <a href="${link}" style="background:#2563eb;color:#fff;padding:12px 22px;border-radius:7px;text-decoration:none;font-weight:600">Verify email and create account</a>
                    </p>
                    <p>This link expires in 15 minutes.</p>
                    <hr style="border:0;border-top:1px solid #e5e7eb;margin:24px 0">
                    <p style="color:#9a3412"><strong>Warning:</strong> If you did not request this email, someone may have entered your address by mistake. Do not click the button. You can safely ignore and delete this message.</p>
                </div>
            `,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map