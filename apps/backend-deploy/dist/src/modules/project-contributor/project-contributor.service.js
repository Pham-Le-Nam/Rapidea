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
exports.ProjectContributorService = void 0;
const common_1 = require("@nestjs/common");
let ProjectContributorService = class ProjectContributorService {
    projectContributorRepo;
    constructor(projectContributorRepo) {
        this.projectContributorRepo = projectContributorRepo;
    }
    async createProjectContributor(projectId, userId, role) {
        return this.projectContributorRepo.create(projectId, userId, role);
    }
    async updateProjectContributor(projectId, userId, role) {
        return this.projectContributorRepo.updateRole(projectId, userId, role);
    }
    async deleteProjectContributor(projectId, userId) {
        return this.projectContributorRepo.deleteOne(projectId, userId);
    }
    async getProjectContributors(projectId) {
        return this.projectContributorRepo.findContributors(projectId);
    }
};
exports.ProjectContributorService = ProjectContributorService;
exports.ProjectContributorService = ProjectContributorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PROJECT_CONTRIBUTOR_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], ProjectContributorService);
//# sourceMappingURL=project-contributor.service.js.map