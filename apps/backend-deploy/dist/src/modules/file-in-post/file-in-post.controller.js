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
exports.FileInPostController = void 0;
const common_1 = require("@nestjs/common");
const file_in_post_service_1 = require("./file-in-post.service");
const jwt_guard_1 = require("../auth/jwt.guard");
const add_file_in_post_dto_1 = require("./file-in-post-dto/add-file-in-post.dto");
const delete_file_in_post_dto_1 = require("./file-in-post-dto/delete-file-in-post.dto");
const optional_jwt_guard_1 = require("../auth/optional-jwt.guard");
let FileInPostController = class FileInPostController {
    fileInPostService;
    constructor(fileInPostService) {
        this.fileInPostService = fileInPostService;
    }
    async addFileToPost(req, addFileInPostDto) {
        const user = req.user;
        const fileInPost = await this.fileInPostService.addFileToPost(addFileInPostDto.fileId, addFileInPostDto.postId, user.userId);
        if (!fileInPost) {
            throw new common_1.InternalServerErrorException("", "Couldn't add file to post");
        }
        return fileInPost;
    }
    async deleteFileFromPost(req, deleteFileInPostDto) {
        const user = req.user;
        const fileInPost = await this.fileInPostService.removeFileFromPost(deleteFileInPostDto.fileId, deleteFileInPostDto.postId, user.userId);
        if (!fileInPost) {
            throw new common_1.InternalServerErrorException("", "Couldn't delete file from post");
        }
        return fileInPost;
    }
    async getFilesOfPost(req, data) {
        const user = req.user;
        const files = await this.fileInPostService.getFilesByPostId(data.postId);
        return files;
    }
};
exports.FileInPostController = FileInPostController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_file_in_post_dto_1.AddFileInPostDto]),
    __metadata("design:returntype", Promise)
], FileInPostController.prototype, "addFileToPost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_file_in_post_dto_1.DeleteFileInPostDto]),
    __metadata("design:returntype", Promise)
], FileInPostController.prototype, "deleteFileFromPost", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('post/:postId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileInPostController.prototype, "getFilesOfPost", null);
exports.FileInPostController = FileInPostController = __decorate([
    (0, common_1.Controller)('api/file-in-post'),
    __metadata("design:paramtypes", [file_in_post_service_1.FileInPostService])
], FileInPostController);
//# sourceMappingURL=file-in-post.controller.js.map