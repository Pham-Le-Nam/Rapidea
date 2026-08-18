export const MAIL_SERVICE = 'MAIL_SERVICE';

export interface MailService {
    sendPasswordReset(email: string, token: string): Promise<void>;
    sendRegistrationVerification(email: string, token: string): Promise<void>;
}
