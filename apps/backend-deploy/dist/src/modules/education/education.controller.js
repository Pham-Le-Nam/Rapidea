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
exports.EducationController = void 0;
const common_1 = require("@nestjs/common");
const optional_jwt_guard_1 = require("../auth/optional-jwt.guard");
const jwt_guard_1 = require("../auth/jwt.guard");
const education_service_1 = require("./education.service");
const users_service_1 = require("../users/users.service");
const add_education_dto_1 = require("./education-dto/add-education.dto");
const update_education_dto_1 = require("./education-dto/update-education.dto");
let EducationController = class EducationController {
    educationService;
    userService;
    constructor(educationService, userService) {
        this.educationService = educationService;
        this.userService = userService;
    }
    async getEducations(username, req) {
        const viewer = req.user;
        const owner = await this.userService.getUserByUsername(username);
        if (!owner) {
            throw new common_1.NotFoundException("User not found");
        }
        const education = await this.educationService.getEducationByUserId(owner.id);
        if (!education) {
            throw new common_1.NotFoundException("Education not found");
        }
        return {
            education,
            isOwner: viewer?.userId === owner.id,
        };
    }
    async addEducation(req, addEducationDto) {
        const user = req.user;
        const education = await this.educationService.createEducation(user.userId, addEducationDto.name, addEducationDto.major, addEducationDto.degree, addEducationDto.startedAt, addEducationDto.endedAt, addEducationDto.location, addEducationDto.achievement, addEducationDto.logoId);
        if (!education) {
            throw new common_1.InternalServerErrorException("Couldn't add education");
        }
        return this.educationService.getEducationByUserId(user.userId);
    }
    async updateEducation(req, updateEducationDto) {
        const user = req.user;
        const education = await this.educationService.updateEducationById(user.userId, updateEducationDto.id, updateEducationDto.name, updateEducationDto.major, updateEducationDto.degree, updateEducationDto.startedAt, updateEducationDto.endedAt, updateEducationDto.location, updateEducationDto.achievement, updateEducationDto.logoId);
        if (!education) {
            throw new common_1.InternalServerErrorException("Couldn't update education");
        }
        return this.educationService.getEducationByUserId(user.userId);
    }
    async deleteEducation(req, id) {
        const user = req.user;
        const userId = String(user.userId);
        const deletedEducation = await this.educationService.deleteEducationById(id, userId);
        if (!deletedEducation) {
            throw new common_1.InternalServerErrorException("Couldn't delete education");
        }
        return deletedEducation;
    }
};
exports.EducationController = EducationController;
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "getEducations", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_education_dto_1.AddEducationDto]),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "addEducation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_education_dto_1.UpdateEducationDto]),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "updateEducation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "deleteEducation", null);
exports.EducationController = EducationController = __decorate([
    (0, common_1.Controller)('api/education'),
    __metadata("design:paramtypes", [education_service_1.EducationService,
        users_service_1.UsersService])
], EducationController);
//# sourceMappingURL=education.controller.js.map