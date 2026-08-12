import { PasswordResetTokenRepository } from './password-reset-token.repository';
export declare class PasswordResetTokenService {
    private readonly passwordResetTokenRepo;
    constructor(passwordResetTokenRepo: PasswordResetTokenRepository);
    createPasswordResetToken(userId: string, token: string): Promise<any>;
    getPasswordResetToken(rawToken: string): Promise<any>;
    usePasswordResetToken(tokenId: string): Promise<any>;
}
