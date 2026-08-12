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
exports.ProjectLinkController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const project_service_1 = require("../project/project.service");
const project_link_service_1 = require("./project-link.service");
const add_project_link_dto_1 = require("./project-link-dto/add-project-link.dto");
const update_project_link_dto_1 = require("./project-link-dto/update-project-link.dto");
let ProjectLinkController = class ProjectLinkController {
    projectLinkService;
    projectService;
    constructor(projectLinkService, projectService) {
        this.projectLinkService = projectLinkService;
        this.projectService = projectService;
    }
    async getProjectLinks(projectId) {
        const projectLinks = await this.projectLinkService.getProjectLinks(projectId);
        return {
            projectLinks,
        };
    }
    async addProjectLink(req, addProjectLinkDto) {
        const viewer = req.user;
        const isOwner = await this.projectService.isOwner(addProjectLinkDto.projectId, viewer.userId);
        if (!isOwner) {
            throw new common_1.InternalServerErrorException("Updater is not owner");
        }
        const projectLink = await this.projectLinkService.createProjectLink(addProjectLinkDto.projectId, addProjectLinkDto.name, addProjectLinkDto.url);
        if (!projectLink) {
            throw new common_1.InternalServerErrorException("Couldn't add project link");
        }
        return {
            projectLink,
        };
    }
    async updateProjectLink(req, updateProjectLinkDto) {
        const viewer = req.user;
        const projectLink = await this.projectLinkService.getProjectLinkById(updateProjectLinkDto.id);
        const isOwner = await this.projectService.isOwner(projectLink.projectId, viewer.userId);
        if (!isOwner) {
            throw new common_1.InternalServerErrorException("Updater is not owner");
        }
        const updatedProjectLink = await this.projectLinkService.updateProjectLink(updateProjectLinkDto.id, updateProjectLinkDto.name, updateProjectLinkDto.url);
        if (!updatedProjectLink) {
            throw new common_1.InternalServerErrorException("Couldn't update project link");
        }
        return {
            projectLink: updatedProjectLink,
        };
    }
    async deleteProjectLink(req, data) {
        const viewer = req.user;
        const projectLink = await this.projectLinkService.getProjectLinkById(data.id);
        const isOwner = await this.projectService.isOwner(projectLink.projectId, viewer.userId);
        if (!isOwner) {
            throw new common_1.InternalServerErrorException("deleter is not owner");
        }
        const deletedProjectLink = await this.projectLinkService.deleteProjectLink(data.id);
        if (!deletedProjectLink) {
            throw new common_1.InternalServerErrorException("Couldn't delete project link");
        }
        return {
            projectLink: deletedProjectLink,
        };
    }
};
exports.ProjectLinkController = ProjectLinkController;
__decorate([
    (0, common_1.Get)(":projectId"),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectLinkController.prototype, "getProjectLinks", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_project_link_dto_1.AddProjectLinkDto]),
    __metadata("design:returntype", Promise)
], ProjectLinkController.prototype, "addProjectLink", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_project_link_dto_1.UpdateProjectLinkDto]),
    __metadata("design:returntype", Promise)
], ProjectLinkController.prototype, "updateProjectLink", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectLinkController.prototype, "deleteProjectLink", null);
exports.ProjectLinkController = ProjectLinkController = __decorate([
    (0, common_1.Controller)('api/project-link'),
    __metadata("design:paramtypes", [project_link_service_1.ProjectLinkService,
        project_service_1.ProjectService])
], ProjectLinkController);
//# sourceMappingURL=project-link.controller.js.map