export interface UsersRepository {
    create(email: string, password: string, firstname: string, lastname: string, middlename?: string): Promise<any>;
    findAll(): Promise<any[]>;
    findByEmail(email: string): Promise<any | null>;
    findByUsername(username: string): Promise<any | null>;
    updateSessionVersion(id: string): Promise<any>;
    validateSessionVersion(id: string, sessionVersion: number): Promise<boolean>;
}