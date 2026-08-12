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
exports.ExperienceController = void 0;
const common_1 = require("@nestjs/common");
const optional_jwt_guard_1 = require("../auth/optional-jwt.guard");
const jwt_guard_1 = require("../auth/jwt.guard");
const experience_service_1 = require("./experience.service");
const users_service_1 = require("../users/users.service");
const add_experience_dto_1 = require("./experience-dto/add-experience.dto");
const update_experience_dto_1 = require("./experience-dto/update-experience.dto");
let ExperienceController = class ExperienceController {
    experienceService;
    userService;
    constructor(experienceService, userService) {
        this.experienceService = experienceService;
        this.userService = userService;
    }
    async getExperience(username, req) {
        const viewer = req.user;
        const owner = await this.userService.getUserByUsername(username);
        if (!owner) {
            throw new common_1.NotFoundException("User not found");
        }
        const experience = await this.experienceService.getExperienceByUserId(owner.id);
        if (!experience) {
            throw new common_1.NotFoundException("Experience not found");
        }
        return {
            experience,
            isOwner: viewer?.userId === owner.id,
        };
    }
    async addExperience(req, addExperienceDto) {
        const user = req.user;
        const experience = await this.experienceService.createExperience(user.userId, addExperienceDto.name, addExperienceDto.position, addExperienceDto.role, addExperienceDto.startedAt, addExperienceDto.endedAt, addExperienceDto.location, addExperienceDto.achievement, addExperienceDto.logoId);
        if (!experience) {
            throw new common_1.InternalServerErrorException("Couldn't add experience");
        }
        return this.experienceService.getExperienceByUserId(user.userId);
    }
    async updateExperience(req, updateExperienceDto) {
        const user = req.user;
        const experience = await this.experienceService.updateExperienceById(user.userId, updateExperienceDto.id, updateExperienceDto.name, updateExperienceDto.position, updateExperienceDto.role, updateExperienceDto.startedAt, updateExperienceDto.endedAt, updateExperienceDto.location, updateExperienceDto.achievement, updateExperienceDto.logoId);
        if (!experience) {
            throw new common_1.InternalServerErrorException("Couldn't update experience");
        }
        return this.experienceService.getExperienceByUserId(user.userId);
    }
    async deleteExperience(req, id) {
        const user = req.user;
        const deletedExperience = await this.experienceService.deleteExperienceById(id, user.userId);
        if (!deletedExperience) {
            throw new common_1.InternalServerErrorException("Couldn't delete experience");
        }
        return deletedExperience;
    }
};
exports.ExperienceController = ExperienceController;
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "getExperience", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_experience_dto_1.AddExperienceDto]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "addExperience", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_experience_dto_1.UpdateExperienceDto]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "updateExperience", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "deleteExperience", null);
exports.ExperienceController = ExperienceController = __decorate([
    (0, common_1.Controller)('api/experience'),
    __metadata("design:paramtypes", [experience_service_1.ExperienceService,
        users_service_1.UsersService])
], ExperienceController);
//# sourceMappingURL=experience.controller.js.map