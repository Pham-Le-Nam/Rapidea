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
exports.EducationService = void 0;
const common_1 = require("@nestjs/common");
let EducationService = class EducationService {
    educationRepo;
    constructor(educationRepo) {
        this.educationRepo = educationRepo;
    }
    async createEducation(userId, name, major, degree, startedAt, endedAt, location, achievement, logoId) {
        const education = await this.educationRepo.create(userId, name, major, degree, startedAt, endedAt, location, achievement, logoId);
        if (!education) {
            throw new common_1.InternalServerErrorException("Couldn't create education");
        }
        return this.educationRepo.getByUserId(userId);
    }
    async deleteEducationById(id, userId) {
        const education = await this.educationRepo.deleteById(id, userId);
        if (!education) {
            throw new common_1.InternalServerErrorException("Couldn't create education");
        }
        return this.educationRepo.getByUserId(userId);
    }
    async updateEducationById(userId, id, name, major, degree, startedAt, endedAt, location, achievement, logoId) {
        const education = await this.educationRepo.updateById(userId, id, name, major, degree, startedAt, endedAt, location, achievement, logoId);
        if (!education) {
            throw new common_1.InternalServerErrorException("Couldn't create education");
        }
        return this.educationRepo.getByUserId(userId);
    }
    async getEducationByUserId(userId) {
        return this.educationRepo.getByUserId(userId);
    }
};
exports.EducationService = EducationService;
exports.EducationService = EducationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EDUCATION_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], EducationService);
//# sourceMappingURL=education.service.js.map