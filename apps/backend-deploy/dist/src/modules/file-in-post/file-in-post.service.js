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
exports.FileInPostService = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("../file/file.service");
const post_service_1 = require("../post/post.service");
const tags_service_1 = require("../tags/tags.service");
let FileInPostService = class FileInPostService {
    fileInPostRepo;
    fileService;
    postService;
    tagsService;
    constructor(fileInPostRepo, fileService, postService, tagsService) {
        this.fileInPostRepo = fileInPostRepo;
        this.fileService = fileService;
        this.postService = postService;
        this.tagsService = tagsService;
    }
    async addFileToPost(fileId, postId, userId) {
        const file = await this.fileService.getFileById(fileId);
        if (!file) {
            throw new Error("File not found");
        }
        const post = await this.postService.getPostById(postId);
        if (!post) {
            throw new Error("Post not found");
        }
        if (post.userId !== userId) {
            throw new Error("Unauthorized: You are not the owner of this post");
        }
        if (file.userId !== userId) {
            throw new Error("Unauthorized: You are not the owner of this file");
        }
        const fileInPost = await this.fileInPostRepo.create(fileId, postId, userId);
        await this.tagsService.addFileTagsToPost(postId, fileId);
        return fileInPost;
    }
    async removeFileFromPost(fileId, postId, userId) {
        const fileInPost = await this.fileInPostRepo.delete(fileId, postId, userId);
        if (!fileInPost) {
            throw new common_1.InternalServerErrorException("", "Couldn't remove file from post");
        }
        return fileInPost;
    }
    async getPostsByFileId(fileId) {
        return this.fileInPostRepo.getPosts(fileId);
    }
    async getFilesByPostId(postId) {
        return this.fileInPostRepo.getFiles(postId);
    }
};
exports.FileInPostService = FileInPostService;
exports.FileInPostService = FileInPostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FILE_IN_POST_REPOSITORY')),
    __metadata("design:paramtypes", [Object, file_service_1.FileService,
        post_service_1.PostService,
        tags_service_1.TagsService])
], FileInPostService);
//# sourceMappingURL=file-in-post.service.js.map