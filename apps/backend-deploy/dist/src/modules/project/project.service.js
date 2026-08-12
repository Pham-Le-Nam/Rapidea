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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
let ProjectService = class ProjectService {
    projectRepo;
    constructor(projectRepo) {
        this.projectRepo = projectRepo;
    }
    async createProject(userId, name, role, startedAt, endedAt, details, logoId) {
        const project = await this.projectRepo.create(userId, name, role, startedAt, endedAt, details, logoId);
        if (!project) {
            throw new common_1.InternalServerErrorException("Couldn't create project");
        }
        return project;
    }
    async deleteProjectById(id, userId) {
        const project = await this.projectRepo.deleteById(id, userId);
        if (!project) {
            throw new common_1.InternalServerErrorException("Couldn't create project");
        }
        return project;
    }
    async updateProjectById(id, userId, name, role, startedAt, endedAt, details, logoId) {
        const project = await this.projectRepo.updateById(id, userId, name, role, startedAt, endedAt, details, logoId);
        if (!project) {
            throw new common_1.InternalServerErrorException("Couldn't create project");
        }
        return project;
    }
    async getProjectByUserId(userId) {
        return this.projectRepo.getByUserId(userId);
    }
    async isOwner(id, userId) {
        return this.projectRepo.checkOwner(id, userId);
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PROJECT_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], ProjectService);
//# sourceMappingURL=project.service.js.map