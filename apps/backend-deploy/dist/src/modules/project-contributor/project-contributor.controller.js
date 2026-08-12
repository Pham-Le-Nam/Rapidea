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
exports.ProjectContributorController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const project_service_1 = require("../project/project.service");
const project_contributor_service_1 = require("./project-contributor.service");
const add_project_contributor_dto_1 = require("./project-contributor-dto/add-project-contributor.dto");
const update_project_contributor_dto_1 = require("./project-contributor-dto/update-project-contributor.dto");
const delete_project_contributor_dto_1 = require("./project-contributor-dto/delete-project-contributor.dto");
let ProjectContributorController = class ProjectContributorController {
    projectService;
    projectContributorService;
    constructor(projectService, projectContributorService) {
        this.projectService = projectService;
        this.projectContributorService = projectContributorService;
    }
    async getProjectContributor(projectId) {
        const projectContributors = await this.projectContributorService.getProjectContributors(projectId);
        return {
            projectContributors,
        };
    }
    async addProjectContributor(req, addProjectContributorDto) {
        const viewer = req.user;
        const isOwner = await this.projectService.isOwner(addProjectContributorDto.projectId, viewer.userId);
        if (!isOwner) {
            throw new common_1.InternalServerErrorException("Updater is not owner");
        }
        const projectContributor = await this.projectContributorService.createProjectContributor(addProjectContributorDto.projectId, addProjectContributorDto.userId, addProjectContributorDto.role);
        if (!projectContributor) {
            throw new common_1.InternalServerErrorException("Couldn't add project contributor");
        }
        return {
            projectContributor,
        };
    }
    async updateProjectContributor(req, updateProjectContributorDto) {
        const viewer = req.user;
        const isOwner = await this.projectService.isOwner(updateProjectContributorDto.projectId, viewer.userId);
        if (!isOwner) {
            throw new common_1.InternalServerErrorException("Updater is not owner");
        }
        const projectContributor = await this.projectContributorService.updateProjectContributor(updateProjectContributorDto.projectId, updateProjectContributorDto.userId, updateProjectContributorDto.role);
        if (!projectContributor) {
            throw new common_1.InternalServerErrorException("Couldn't update project contributor");
        }
        return {
            projectContributor,
        };
    }
    async deleteProjectContributor(req, deleteProjectContributorDto) {
        const view = req.user;
        const isOwner = await this.projectService.isOwner(deleteProjectContributorDto.projectId, view.userId);
        if (!isOwner) {
            throw new common_1.InternalServerErrorException("Updater is not owner");
        }
        const projectContributor = await this.projectContributorService.updateProjectContributor(deleteProjectContributorDto.projectId, deleteProjectContributorDto.userId);
        if (!projectContributor) {
            throw new common_1.InternalServerErrorException("Couldn't delete project contributor");
        }
        return {
            projectContributor,
        };
    }
};
exports.ProjectContributorController = ProjectContributorController;
__decorate([
    (0, common_1.Get)(':projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectContributorController.prototype, "getProjectContributor", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_project_contributor_dto_1.AddProjectContributorDto]),
    __metadata("design:returntype", Promise)
], ProjectContributorController.prototype, "addProjectContributor", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_project_contributor_dto_1.UpdateProjectContributorDto]),
    __metadata("design:returntype", Promise)
], ProjectContributorController.prototype, "updateProjectContributor", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_project_contributor_dto_1.DeleteProjectContributorDto]),
    __metadata("design:returntype", Promise)
], ProjectContributorController.prototype, "deleteProjectContributor", null);
exports.ProjectContributorController = ProjectContributorController = __decorate([
    (0, common_1.Controller)('api/project-contributor'),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        project_contributor_service_1.ProjectContributorService])
], ProjectContributorController);
//# sourceMappingURL=project-contributor.controller.js.map