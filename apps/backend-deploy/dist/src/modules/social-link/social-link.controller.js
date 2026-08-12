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
exports.SocialLinkController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const social_link_service_1 = require("./social-link.service");
const users_service_1 = require("../users/users.service");
const add_social_link_dto_1 = require("./social-link-dto/add-social-link.dto");
const update_social_link_dto_1 = require("./social-link-dto/update-social-link.dto");
let SocialLinkController = class SocialLinkController {
    socialLinkService;
    usersService;
    constructor(socialLinkService, usersService) {
        this.socialLinkService = socialLinkService;
        this.usersService = usersService;
    }
    async getSocialLinks(username) {
        const user = await this.usersService.getUserByUsername(username);
        const socialLinks = await this.socialLinkService.findSocialLinksByUserId(user.id);
        return {
            socialLinks,
        };
    }
    async addSocialLink(req, addSocialLinkDto) {
        const viewer = req.user;
        const socialPlatform = addSocialLinkDto.platform;
        const socialLink = await this.socialLinkService.createSocialLink(socialPlatform, addSocialLinkDto.url, viewer.userId);
        return {
            socialLink,
        };
    }
    async updateSocialLink(req, updateSocialLinkDto) {
        const viewer = req.user;
        const socialLink = await this.socialLinkService.findSocialLinkById(updateSocialLinkDto.id);
        if (viewer.userId != socialLink.userId) {
            throw new common_1.InternalServerErrorException("Couldn't update other users' social link");
        }
        const updatedSocialLink = await this.socialLinkService.updateSocialLinkById(updateSocialLinkDto.id, updateSocialLinkDto.url);
        return {
            socialLink: updatedSocialLink,
        };
    }
    async deleteSocialLink(req, data) {
        const viewer = req.user;
        const socialLink = await this.socialLinkService.findSocialLinkById(data.id);
        if (viewer.userId != socialLink.userId) {
            throw new common_1.InternalServerErrorException("Couldn't delete other users' social link");
        }
        const deletedSocialLink = await this.socialLinkService.deleteSocialLinkById(data.id);
        return {
            socialLink: deletedSocialLink,
        };
    }
};
exports.SocialLinkController = SocialLinkController;
__decorate([
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialLinkController.prototype, "getSocialLinks", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_social_link_dto_1.AddSocialLinkDto]),
    __metadata("design:returntype", Promise)
], SocialLinkController.prototype, "addSocialLink", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_social_link_dto_1.UpdateSocialLinkDto]),
    __metadata("design:returntype", Promise)
], SocialLinkController.prototype, "updateSocialLink", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocialLinkController.prototype, "deleteSocialLink", null);
exports.SocialLinkController = SocialLinkController = __decorate([
    (0, common_1.Controller)('api/social-link'),
    __metadata("design:paramtypes", [social_link_service_1.SocialLinkService,
        users_service_1.UsersService])
], SocialLinkController);
//# sourceMappingURL=social-link.controller.js.map