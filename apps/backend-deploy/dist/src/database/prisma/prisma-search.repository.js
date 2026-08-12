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
exports.PrismaSearchRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaSearchRepository = class PrismaSearchRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchUsers(query, take) {
        const users = await this.prisma.users.findMany({
            where: { OR: ['username', 'firstname', 'middlename', 'lastname', 'headline'].map((field) => ({ [field]: { contains: query, mode: 'insensitive' } })) },
            take, orderBy: { createdAt: 'desc' },
            select: { id: true, username: true, firstname: true, middlename: true, lastname: true, headline: true, avatar: true },
        });
        return users.map((user) => ({ id: user.id, title: [user.firstname, user.middlename, user.lastname].filter(Boolean).join(' ') || user.username, subtitle: user.headline || `@${user.username}`, link: `/profile/${user.username}`, avatarName: user.avatar?.name }));
    }
    async searchCourses(query, take) {
        const courses = await this.prisma.course.findMany({
            where: { OR: [{ title: { contains: query, mode: 'insensitive' } }, { description: { contains: query, mode: 'insensitive' } }] },
            take, orderBy: { lastUpdated: 'desc' },
            select: { id: true, title: true, description: true, thumbnail: true, user: { select: { firstname: true, middlename: true, lastname: true, username: true } } },
        });
        return courses.map((course) => ({ id: course.id, title: course.title, subtitle: [course.user.firstname, course.user.middlename, course.user.lastname].filter(Boolean).join(' ') || course.user.username, link: `/course/${course.id}`, thumbnailName: course.thumbnail?.name }));
    }
    async searchPosts(query, take) {
        const posts = await this.prisma.post.findMany({
            where: { title: { contains: query, mode: 'insensitive' } }, take, orderBy: { lastUpdated: 'desc' },
            select: { id: true, title: true, user: { select: { firstname: true, middlename: true, lastname: true, username: true } }, course: { select: { title: true } } },
        });
        return posts.map((post) => ({ id: post.id, title: post.title || 'Untitled post', subtitle: post.course?.title || [post.user.firstname, post.user.middlename, post.user.lastname].filter(Boolean).join(' ') || post.user.username, link: `/post/${post.id}` }));
    }
};
exports.PrismaSearchRepository = PrismaSearchRepository;
exports.PrismaSearchRepository = PrismaSearchRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaSearchRepository);
//# sourceMappingURL=prisma-search.repository.js.map