"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const folder_service_1 = require("../folder/folder.service");
let UsersService = class UsersService {
    usersRepo;
    folderService;
    constructor(usersRepo, folderService) {
        this.usersRepo = usersRepo;
        this.folderService = folderService;
    }
    async createUser(email, password, firstname, lastname, middlename) {
        const user = await this.usersRepo.create(email, password, firstname, lastname, middlename);
        if (!user) {
            throw new common_1.InternalServerErrorException("Couldn't create user");
        }
        const accountRootFolder = await this.folderService.createFolder(user.id, user.username);
        const accountFreeFolder = await this.folderService.createFolder(user.id, "free", accountRootFolder.id);
        if (!accountRootFolder || !accountFreeFolder) {
            throw new common_1.InternalServerErrorException("Couldn't create folders");
        }
        return user;
    }
    async getUsers() {
        return this.usersRepo.findAll();
    }
    async getUserByEmail(email) {
        return this.usersRepo.findByEmail(email);
    }
    async getUserByUsername(username) {
        return this.usersRepo.findByUsername(username);
    }
    async getUserById(id) {
        return this.usersRepo.findById(id);
    }
    async updateSessionVersion(id) {
        return this.usersRepo.updateSessionVersion(id);
    }
    async validateSessionVersion(id, sessionVersion) {
        return this.usersRepo.validateSessionVersion(id, sessionVersion);
    }
    async resetPassword(id, password) {
        return this.usersRepo.resetPassword(id, password);
    }
    async updateCreatorPrompt(userId, creatorPrompt) {
        return this.usersRepo.updateCreatorPrompt(userId, creatorPrompt);
    }
    async getPayoutAccount(userId) {
        return this.usersRepo.findPayoutAccountByUserId(userId);
    }
    async updatePayoutAccount(userId, data) {
        const cleanedData = Object.fromEntries(Object.entries(data).map(([key, value]) => [
            key,
            typeof value === 'string' ? value.trim() : value,
        ]));
        const isReadyForReview = !!cleanedData.accountHolderName
            && !!cleanedData.country
            && !!cleanedData.currency
            && (cleanedData.payoutMethod === 'PAYPAL'
                ? !!cleanedData.paypalEmail
                : !!cleanedData.bankName && !!cleanedData.routingNumber && !!cleanedData.accountNumber);
        return this.usersRepo.upsertPayoutAccount(userId, {
            ...cleanedData,
            status: isReadyForReview ? 'READY_FOR_REVIEW' : 'DRAFT',
        });
    }
    async updateProfileById(id, firstname, lastname, middlename, avatarId, backgroundId, headline, bio) {
        return this.usersRepo.updateById(id, firstname, lastname, middlename, avatarId, backgroundId, headline, bio);
    }
    async updateProfileByUsername(currentUsername, firstname, lastname, middlename, avatarId, backgroundId, headline, bio) {
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, folder_service_1.FolderService])
], UsersService);
//# sourceMappingURL=users.service.js.map