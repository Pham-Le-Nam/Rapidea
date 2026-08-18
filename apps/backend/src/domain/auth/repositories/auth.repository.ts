export interface AuthRepository {
    findEmailToken(tokenHash: string): Promise<any | null>;
    consumeEmailToken(id: string): Promise<boolean>;
    findOAuthAccount(provider: string, providerUserId: string): Promise<any | null>;
    createOAuthAccount(provider: string, providerUserId: string, userId: string): Promise<any>;
    replaceRegistrationToken(email: string, tokenHash: string, pendingUser: any, expiresAt: Date): Promise<void>;
}
