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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const optional_jwt_guard_1 = require("../auth/optional-jwt.guard");
const jwt_guard_1 = require("../auth/jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
const update_file_dto_1 = require("./file-dto/update-file.dto");
let FileController = class FileController {
    fileService;
    constructor(fileService) {
        this.fileService = fileService;
    }
    async getFileUrl(req, id) {
        const user = req.user;
        const fileUrl = this.fileService.getFileUrl(id);
        return fileUrl;
    }
    async getFile(req, id) {
        const user = req.user;
        const file = await this.fileService.getFileById(id);
        return {
            file,
            isOwner: user ? file.userId === user.userId : false,
        };
    }
    async uploadFile(file, req, data) {
        const user = req.user;
        const createdFile = await this.fileService.createFile(file, user.userId, data.folderId);
        if (!createdFile) {
            throw new common_1.InternalServerErrorException("", "Couldn't upload file");
        }
        return createdFile;
    }
    async deleteFile(req, data) {
        const user = req.user;
        const file = await this.fileService.deleteFile(data.fileId, user.userId);
        if (!file) {
            throw new common_1.NotFoundException("", "File not Found");
        }
        return file;
    }
    async updateFile(req, updateFileDto) {
        const user = req.user;
        const file = await this.fileService.updateFile(updateFileDto.fileId, user.userId, updateFileDto.folderId, updateFileDto.name);
        if (!file) {
            throw new common_1.InternalServerErrorException("", "Couldn't update the file");
        }
        return file;
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('url/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFileUrl", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_file_dto_1.UpdateFileDto]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "updateFile", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('api/file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
//# sourceMappingURL=file.controller.js.map