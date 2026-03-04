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

        if (!accountRootFolder || accountFreeFolder) {
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
}
