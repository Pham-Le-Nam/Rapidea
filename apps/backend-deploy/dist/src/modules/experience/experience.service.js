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
exports.ExperienceService = void 0;
const common_1 = require("@nestjs/common");
let ExperienceService = class ExperienceService {
    experienceRepo;
    constructor(experienceRepo) {
        this.experienceRepo = experienceRepo;
    }
    async createExperience(userId, name, position, role, startedAt, endedAt, location, achievement, logoId) {
        const experience = await this.experienceRepo.create(userId, name, position, role, startedAt, endedAt, location, achievement, logoId);
        if (!experience) {
            throw new common_1.InternalServerErrorException("Couldn't create experience");
        }
        return this.experienceRepo.getByUserId(userId);
    }
    async deleteExperienceById(id, userId) {
        const experience = await this.experienceRepo.deleteById(id, userId);
        if (!experience) {
            throw new common_1.InternalServerErrorException("Couldn't create experience");
        }
        return this.experienceRepo.getByUserId(userId);
    }
    async updateExperienceById(userId, id, name, position, role, startedAt, endedAt, location, achievement, logoId) {
        const experience = await this.experienceRepo.updateById(userId, id, name, position, role, startedAt, endedAt, location, achievement, logoId);
        if (!experience) {
            throw new common_1.InternalServerErrorException("Couldn't create experience");
        }
        return this.experienceRepo.getByUserId(userId);
    }
    async getExperienceByUserId(userId) {
        return this.experienceRepo.getByUserId(userId);
    }
};
exports.ExperienceService = ExperienceService;
exports.ExperienceService = ExperienceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EXPERIENCE_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], ExperienceService);
//# sourceMappingURL=experience.service.js.map