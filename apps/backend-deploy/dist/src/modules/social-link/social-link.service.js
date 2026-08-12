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
exports.SocialLinkService = void 0;
const common_1 = require("@nestjs/common");
let SocialLinkService = class SocialLinkService {
    socialLinkRepo;
    constructor(socialLinkRepo) {
        this.socialLinkRepo = socialLinkRepo;
    }
    async createSocialLink(platform, url, userId) {
        return this.socialLinkRepo.create(platform, url, userId);
    }
    async updateSocialLinkById(id, url) {
        return this.socialLinkRepo.updateById(id, url);
    }
    async deleteSocialLinkById(id) {
        return this.socialLinkRepo.deleteById(id);
    }
    async findSocialLinksByUserId(userId) {
        return this.socialLinkRepo.findByUserId(userId);
    }
    async findSocialLinkById(id) {
        return this.socialLinkRepo.findById(id);
    }
};
exports.SocialLinkService = SocialLinkService;
exports.SocialLinkService = SocialLinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SOCIAL_LINK_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], SocialLinkService);
//# sourceMappingURL=social-link.service.js.map