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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFileInPostRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaFileInPostRepository = class PrismaFileInPostRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(fileId, postId, userId) {
        const file = await this.prisma.file.findUnique({
            where: {
                id: fileId,
            },
            select: {
                id: true,
            },
        });
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                id: true,
            },
        });
        if (!file) {
            throw new common_1.InternalServerErrorException("File not found");
        }
        if (!post) {
            throw new common_1.InternalServerErrorException("Post not found");
        }
        return this.prisma.fileInPost.create({
            data: {
                fileId,
                postId,
                userId,
            },
        });
    }
    async delete(fileId, postId, userId) {
        return this.prisma.fileInPost.delete({
            where: {
                fileId_postId: {
                    fileId,
                    postId,
                },
                userId,
            },
        });
    }
    async getPosts(fileId) {
        const posts = await this.prisma.fileInPost.findMany({
            where: {
                fileId,
            },
            select: {
                postId: true,
            },
        });
        if (!posts) {
            throw new common_1.InternalServerErrorException("Posts not found");
        }
        const ids = posts.map(post => post.postId);
        return this.prisma.post.findMany({
            where: {
                id: { in: ids },
            },
        });
    }
    async getFiles(postId) {
        const files = await this.prisma.fileInPost.findMany({
            where: {
                postId,
            },
            select: {
                fileId: true,
            },
        });
        if (!files) {
            throw new common_1.InternalServerErrorException("Files not found");
        }
        const ids = files.map(post => post.fileId);
        const fileList = await this.prisma.file.findMany({
            where: {
                id: { in: ids },
            },
            include: {
                transcript: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
        return fileList;
    }
};
exports.PrismaFileInPostRepository = PrismaFileInPostRepository;
exports.PrismaFileInPostRepository = PrismaFileInPostRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaFileInPostRepository);
//# sourceMappingURL=prisma-file-in-post.repository.js.map