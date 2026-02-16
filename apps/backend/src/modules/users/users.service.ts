import { Injectable, Inject } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private readonly usersRepo: UsersRepository,
    ) {}

    async createUser(email: string, password: string, firstname: string, lastname: string, middlename?: string) {
        return this.usersRepo.create( email, password, firstname, lastname, middlename );
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

    async updateSessionVersion(id: string) {
        return this.usersRepo.updateSessionVersion(id);
    }

    async validateSessionVersion(id: string, sessionVersion: number) {
        return this.usersRepo.validateSessionVersion(id, sessionVersion);
    }
}
