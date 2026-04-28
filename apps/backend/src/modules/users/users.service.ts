import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { FolderService } from '../folder/folder.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private readonly usersRepo: UsersRepository,
        private folderService: FolderService,
    ) {}

    async createUser(email: string, password: string, firstname: string, lastname: string, middlename?: string) {
        const user = await this.usersRepo.create( email, password, firstname, lastname, middlename );

        if (!user) { 
            throw new InternalServerErrorException("Couldn't create user");
        }

        const accountRootFolder = await this.folderService.createFolder(user.id, user.username);
        const accountFreeFolder = await this.folderService.createFolder(user.id, "free", accountRootFolder.id);

        if (!accountRootFolder || !accountFreeFolder) {
            throw new InternalServerErrorException("Couldn't create folders");
        }

        return user;
    }

    async getUsers() {
        return this.usersRepo.findAll();
    }

    async getUserByEmail(email: string) {
        return this.usersRepo.findByEmail(email);
    }

    async getUserByUsername(username: string) {
        return this.usersRepo.findByUsername(username);
    }

    async getUserById(id: string) {
        return this.usersRepo.findById(id);
    }

    async updateSessionVersion(id: string) {
        return this.usersRepo.updateSessionVersion(id);
    }

    async validateSessionVersion(id: string, sessionVersion: number) {
        return this.usersRepo.validateSessionVersion(id, sessionVersion);
    }

    async resetPassword(id: string, password: string) {
        return this.usersRepo.resetPassword(id, password);
    }

    async getPayoutAccount(userId: string) {
        return this.usersRepo.findPayoutAccountByUserId(userId);
    }

    async updatePayoutAccount(userId: string, data: any) {
        const cleanedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key,
                typeof value === 'string' ? value.trim() : value,
            ]),
        );
        const isReadyForReview = !!cleanedData.accountHolderName
            && !!cleanedData.country
            && !!cleanedData.currency
            && (
                cleanedData.payoutMethod === 'PAYPAL'
                    ? !!cleanedData.paypalEmail
                    : !!cleanedData.bankName && !!cleanedData.routingNumber && !!cleanedData.accountNumber
            );

        return this.usersRepo.upsertPayoutAccount(userId, {
            ...cleanedData,
            status: isReadyForReview ? 'READY_FOR_REVIEW' : 'DRAFT',
        });
    }

    async updateProfileById(id: string, firstname?: string, lastname? : string, middlename? : string, avatarId?: number, backgroundId?: number, headline?: string, bio?: string) {
        return this.usersRepo.updateById(id, firstname, lastname, middlename, avatarId, backgroundId, headline, bio);
    }

    async updateProfileByUsername(currentUsername: string, firstname?: string, lastname? : string, middlename? : string, avatarId?: number, backgroundId?: number, headline?: string, bio?: string) {
        const currentUser = await this.usersRepo.findByUsername(currentUsername);
        const updatedUser = await this.usersRepo.updateByUsername(currentUsername, firstname, lastname, middlename, avatarId, backgroundId, headline, bio);

        if (currentUser && updatedUser?.username && updatedUser.username !== currentUsername) {
            const rootFolder = await this.folderService.findFolderByLocation(currentUsername);

            if (rootFolder) {
                await this.folderService.renameFolder(rootFolder.id, currentUser.id, updatedUser.username);
            }
        }

        return updatedUser;
    }
}
