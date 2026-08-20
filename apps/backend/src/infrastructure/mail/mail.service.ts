// mail.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService as MailPort } from '../../application/ports/mail.service';

@Injectable()
export class MailService implements MailPort {
    constructor(
        private mailerService: MailerService,
        private config: ConfigService,
    ) {}

    async sendPasswordReset(email: string, token: string) {
        const resetLink = `${this.config.get('FRONTEND_URL')}/reset-password?token=${encodeURIComponent(token)}`;

        await this.mailerService.sendMail({
            from: this.sender(),
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

    async sendRegistrationVerification(email: string, token: string) {
        const frontendUrl = this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:5173';
        const link = `${frontendUrl}/auth/email/verify#token=${encodeURIComponent(token)}`;

        await this.mailerService.sendMail({
            from: this.sender(),
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

    private sender() {
        const sender = this.config.get<string>('MAIL_FROM')
            ?? this.config.get<string>('MAIL_USER');

        if (!sender) {
            throw new InternalServerErrorException('Email delivery is not configured.');
        }

        return sender.includes('<') ? sender : `Rapidea <${sender}>`;
    }
}
