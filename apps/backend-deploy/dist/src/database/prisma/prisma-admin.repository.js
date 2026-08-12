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
exports.PrismaAdminRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaAdminRepository = class PrismaAdminRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findModerationQueue() {
        return this.prisma.file.findMany({
            where: { moderationStatus: { in: ['SERIOUS_WARNING', 'WARNING'] } },
            include: { user: { select: { id: true, username: true, email: true } } },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
    }
    async banUser(userId, reason) {
        const user = await this.prisma.users.findUnique({ where: { id: userId } });
        if (!user)
            return null;
        return this.prisma.users.update({
            where: { id: userId },
            data: {
                isBanned: true,
                bannedAt: new Date(),
                banReason: reason.trim(),
                sessionVersion: { increment: 1 },
            },
            select: { id: true, username: true, isBanned: true, bannedAt: true, banReason: true },
        });
    }
    deletePost(postId) { return this.prisma.post.delete({ where: { id: postId } }); }
    deleteCourse(courseId) { return this.prisma.course.delete({ where: { id: courseId } }); }
    deleteFile(fileId) { return this.prisma.file.delete({ where: { id: fileId } }); }
};
exports.PrismaAdminRepository = PrismaAdminRepository;
exports.PrismaAdminRepository = PrismaAdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAdminRepository);
//# sourceMappingURL=prisma-admin.repository.js.map