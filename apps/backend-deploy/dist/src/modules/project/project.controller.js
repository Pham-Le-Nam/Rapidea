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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const optional_jwt_guard_1 = require("../auth/optional-jwt.guard");
const jwt_guard_1 = require("../auth/jwt.guard");
const project_service_1 = require("./project.service");
const users_service_1 = require("../users/users.service");
const add_project_dto_1 = require("./project-dto/add-project.dto");
const update_project_dto_1 = require("./project-dto/update-project.dto");
let ProjectController = class ProjectController {
    projectService;
    userService;
    constructor(projectService, userService) {
        this.projectService = projectService;
        this.userService = userService;
    }
    async getProject(username, req) {
        const viewer = req.user;
        const owner = await this.userService.getUserByUsername(username);
        if (!owner) {
            throw new common_1.NotFoundException("User not found");
        }
        const projects = await this.projectService.getProjectByUserId(owner.id);
        if (!projects) {
            throw new common_1.NotFoundException("Project not found");
        }
        return {
            projects,
            isOwner: viewer?.userId === owner.id,
        };
    }
    async addProject(req, addProjectDto) {
        const user = req.user;
        const project = await this.projectService.createProject(user.userId, addProjectDto.name, addProjectDto.role, addProjectDto.startedAt, addProjectDto.endedAt, addProjectDto.details, addProjectDto.logoId);
        if (!project) {
            throw new common_1.InternalServerErrorException("Couldn't add project");
        }
        return project;
    }
    async updateProject(req, updateProjectDto) {
        const user = req.user;
        const project = await this.projectService.updateProjectById(updateProjectDto.id, user.userId, updateProjectDto.name, updateProjectDto.role, updateProjectDto.startedAt, updateProjectDto.endedAt, updateProjectDto.details, updateProjectDto.logoId);
        if (!project) {
            throw new common_1.InternalServerErrorException("Couldn't update project");
        }
        return project;
    }
    async deleteProject(req, id) {
        const user = req.user;
        const deletedProject = await this.projectService.deleteProjectById(id, user.userId);
        if (!deletedProject) {
            throw new common_1.InternalServerErrorException("Couldn't delete project");
        }
        return deletedProject;
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProject", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_project_dto_1.AddProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "addProject", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProject", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProject", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('api/project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        users_service_1.UsersService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map