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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const optional_jwt_guard_1 = require("../auth/optional-jwt.guard");
const jwt_guard_1 = require("../auth/jwt.guard");
const update_profile_dto_1 = require("./users-dto/update-profile.dto");
const update_payout_account_dto_1 = require("./users-dto/update-payout-account.dto");
const update_creator_prompt_dto_1 = require("./users-dto/update-creator-prompt.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getMe(req) {
        const profile = await this.usersService.getUserById(req.user.userId);
        if (!profile) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            profile,
        };
    }
    async updateCreatorPrompt(req, dto) {
        return {
            creatorPrompt: await this.usersService.updateCreatorPrompt(req.user.userId, dto.creatorPrompt),
        };
    }
    async getPayoutAccount(req) {
        const payoutAccount = await this.usersService.getPayoutAccount(req.user.userId);
        return {
            payoutAccount,
        };
    }
    async updatePayoutAccount(req, updatePayoutAccountDto) {
        const payoutAccount = await this.usersService.updatePayoutAccount(req.user.userId, updatePayoutAccountDto);
        return {
            payoutAccount,
        };
    }
    async getProfile(username, req) {
        const viewer = req.user;
        const profile = await this.usersService.getUserByUsername(username);
        if (!profile) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            profile,
            viewerId: viewer?.userId,
            profileId: profile.id,
        };
    }
    async getProfileById(id, req) {
        const viewer = req.user;
        const profile = await this.usersService.getUserById(id);
        if (!profile) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            profile,
            viewerId: viewer?.userId,
            profileId: profile.id,
        };
    }
    async editProfile(username, req, updateProfileDto) {
        const viewer = req.user;
        const profile = await this.usersService.getUserByUsername(username);
        if (viewer.userId != profile.id) {
            throw new common_1.UnauthorizedException("Not allowed to edit other user's profile.");
        }
        const updatedProfile = await this.usersService.updateProfileByUsername(username, updateProfileDto.firstname, updateProfileDto.lastname, updateProfileDto.middlename, updateProfileDto.avatarId, updateProfileDto.backgroundId, updateProfileDto.headline, updateProfileDto.bio);
        return updatedProfile;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('me/creator-prompt'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_creator_prompt_dto_1.UpdateCreatorPromptDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateCreatorPrompt", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me/payout-account'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPayoutAccount", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('me/payout-account'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_payout_account_dto_1.UpdatePayoutAccountDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePayoutAccount", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfileById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map