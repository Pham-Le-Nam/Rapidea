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
exports.ProjectLinkService = void 0;
const common_1 = require("@nestjs/common");
let ProjectLinkService = class ProjectLinkService {
    projectLinkRepo;
    constructor(projectLinkRepo) {
        this.projectLinkRepo = projectLinkRepo;
    }
    async createProjectLink(projectId, name, url) {
        return this.projectLinkRepo.create(projectId, name, url);
    }
    async updateProjectLink(id, name, url) {
        return this.projectLinkRepo.update(id, name, url);
    }
    async deleteProjectLink(id) {
        return this.projectLinkRepo.delete(id);
    }
    async getProjectLinks(projectId) {
        return this.projectLinkRepo.findLinks(projectId);
    }
    async getProjectLinkById(id) {
        return this.projectLinkRepo.findById(id);
    }
};
exports.ProjectLinkService = ProjectLinkService;
exports.ProjectLinkService = ProjectLinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PROJECT_LINK_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], ProjectLinkService);
//# sourceMappingURL=project-link.service.js.map