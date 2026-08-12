import { UsersRepository } from './users.repository';
import { FolderService } from '../folder/folder.service';
export declare class UsersService {
    private readonly usersRepo;
    private folderService;
    constructor(usersRepo: UsersRepository, folderService: FolderService);
    createUser(email: string, password: string | null, firstname: string, lastname: string, middlename?: string): Promise<any>;
    getUsers(): Promise<any[]>;
    getUserByEmail(email: string): Promise<any>;
    getUserByUsername(username: string): Promise<any>;
    getUserById(id: string): Promise<any>;
    updateSessionVersion(id: string): Promise<any>;
    validateSessionVersion(id: string, sessionVersion: number): Promise<boolean>;
    resetPassword(id: string, password: string): Promise<any>;
    updateCreatorPrompt(userId: string, creatorPrompt: string): Promise<string | null>;
    getPayoutAccount(userId: string): Promise<any>;
    updatePayoutAccount(userId: string, data: any): Promise<any>;
    updateProfileById(id: string, firstname?: string, lastname?: string, middlename?: string, avatarId?: number, backgroundId?: number, headline?: string, bio?: string): Promise<any>;
    updateProfileByUsername(currentUsername: string, firstname?: string, lastname?: string, middlename?: string, avatarId?: number, backgroundId?: number, headline?: string, bio?: string): Promise<any>;
}
