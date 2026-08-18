export interface UsersRepository {
    create(email: string, password: string | null, firstname: string, lastname: string, middlename?: string): Promise<any>;
    findAll(): Promise<any[]>;
    findByEmail(email: string): Promise<any | null>;
    findByUsername(username: string): Promise<any | null>;
    findById(id: string): Promise<any | null>;
    updateById(id: string, firstname?: string, lastname? : string, middlename? : string, avatarId?: number, backgroundId?: number, headline?: string, bio?: string): Promise<any | null>;
    updateByUsername(currentUsername: string, firstname?: string, lastname? : string, middlename? : string, avatarId?: number, backgroundId?: number, headline?: string, bio?: string): Promise<any | null>;
    updateSessionVersion(id: string): Promise<any>;
    validateSessionVersion(id: string, sessionVersion: number): Promise<boolean>;
    resetPassword(id: string, password: string): Promise<any>;
    updateCreatorPrompt(userId: string, creatorPrompt: string): Promise<string | null>;
    findPayoutAccountByUserId(userId: string): Promise<any | null>;
    upsertPayoutAccount(userId: string, data: any): Promise<any>;
}
