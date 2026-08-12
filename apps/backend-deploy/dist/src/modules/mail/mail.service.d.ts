import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private mailerService;
    private config;
    constructor(mailerService: MailerService, config: ConfigService);
    sendPasswordReset(email: string, token: string): Promise<void>;
    sendRegistrationVerification(email: string, token: string): Promise<void>;
}
