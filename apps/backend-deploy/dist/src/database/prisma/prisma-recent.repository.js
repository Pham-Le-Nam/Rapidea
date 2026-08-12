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
exports.PrismaRecentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaRecentRepository = class PrismaRecentRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSidebarSources(userId, limit) {
        const [courses, ownedPostRows, courseViews, subscriptions, postViews, subscribedPostRows] = await Promise.all([
            this.prisma.course.findMany({ where: { userId }, orderBy: { lastUpdated: 'desc' }, take: limit, select: { id: true, title: true, lastUpdated: true } }),
            this.prisma.post.findMany({ where: { userId }, orderBy: { lastUpdated: 'desc' }, take: limit, select: { id: true, title: true, lastUpdated: true } }),
            this.prisma.recentCourseView.findMany({ where: { userId, course: { userId: { not: userId } } }, orderBy: { viewedAt: 'desc' }, take: limit, select: { viewedAt: true, course: { select: { id: true, title: true } } } }),
            this.prisma.subscribe.findMany({ where: { userId, course: { userId: { not: userId } } }, orderBy: { createdAt: 'desc' }, take: limit, select: { createdAt: true, course: { select: { id: true, title: true } } } }),
            this.prisma.recentPostView.findMany({ where: { userId, post: { userId: { not: userId } } }, orderBy: { viewedAt: 'desc' }, take: limit, select: { viewedAt: true, post: { select: { id: true, title: true } } } }),
            this.prisma.post.findMany({ where: { userId: { not: userId }, course: { subscribers: { some: { userId } } } }, orderBy: { lastUpdated: 'desc' }, take: limit, select: { id: true, title: true, lastUpdated: true } }),
        ]);
        return {
            ownedCourses: courses.map(x => ({ id: x.id, title: x.title, link: `/course/${x.id}`, activityAt: x.lastUpdated })),
            ownedPosts: ownedPostRows.map(x => ({ id: x.id, title: x.title || 'Untitled post', link: `/post/${x.id}`, activityAt: x.lastUpdated })),
            viewedCourses: courseViews.map(x => ({ id: x.course.id, title: x.course.title, link: `/course/${x.course.id}`, activityAt: x.viewedAt })),
            subscribedCourses: subscriptions.map(x => ({ id: x.course.id, title: x.course.title, link: `/course/${x.course.id}`, activityAt: x.createdAt })),
            viewedPosts: postViews.map(x => ({ id: x.post.id, title: x.post.title || 'Untitled post', link: `/post/${x.post.id}`, activityAt: x.viewedAt })),
            subscribedPosts: subscribedPostRows.map(x => ({ id: x.id, title: x.title || 'Untitled post', link: `/post/${x.id}`, activityAt: x.lastUpdated })),
        };
    }
};
exports.PrismaRecentRepository = PrismaRecentRepository;
exports.PrismaRecentRepository = PrismaRecentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaRecentRepository);
//# sourceMappingURL=prisma-recent.repository.js.map