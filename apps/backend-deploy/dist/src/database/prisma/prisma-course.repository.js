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
exports.PrismaCourseRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaCourseRepository = class PrismaCourseRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, title, folderId, description, price, currency) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.InternalServerErrorException("User not found");
        }
        const course = await this.prisma.course.create({
            data: {
                userId,
                title,
                folderId,
                description,
                price,
                currency,
            },
            include: {
                thumbnail: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
        if (!course) {
            throw new common_1.InternalServerErrorException("Couldn't create the course");
        }
        await this.prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                coursesCount: { increment: 1 },
            },
        });
        return course;
    }
    async updateById(id, userId, title, description, price, currency, thumbnailId) {
        return this.prisma.course.update({
            where: {
                id,
                userId,
            },
            data: {
                title,
                description,
                price,
                currency,
                thumbnailId,
            },
            include: {
                thumbnail: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }
    async updateLastUpdatedById(id, lastUpdated = new Date()) {
        return this.prisma.course.update({
            where: { id },
            data: { lastUpdated },
        });
    }
    async recordView(id, userId) {
        return this.prisma.recentCourseView.upsert({
            where: {
                courseId_userId: {
                    courseId: id,
                    userId,
                },
            },
            update: {
                viewedAt: new Date(),
            },
            create: {
                courseId: id,
                userId,
            },
        });
    }
    async findById(id) {
        return this.prisma.course.findUnique({
            where: { id },
            include: {
                thumbnail: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }
    async findByUserId(userId, orderByField = 'createdAt', order = 'desc', amount, offset) {
        const allowedFields = [
            'createdAt',
            'price',
            'rating',
            'postCount',
            'postsCount',
            'ratingCount',
            'subscribersCount',
            'lastUpdated',
        ];
        if (!allowedFields.includes(orderByField)) {
            orderByField = 'createdAt';
        }
        return this.prisma.course.findMany({
            where: { userId },
            include: {
                thumbnail: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: {
                [orderByField]: order,
            },
            skip: offset,
            take: amount
        });
    }
    async deleteCourseById(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        posts: true,
                    },
                },
            },
        });
        if (!course) {
            throw new common_1.InternalServerErrorException("Course not found");
        }
        const [deletedCourse] = await this.prisma.$transaction([
            this.prisma.course.delete({
                where: { id },
            }),
            this.prisma.users.update({
                where: {
                    id: course.userId,
                },
                data: {
                    coursesCount: { decrement: 1 },
                    postsCount: { decrement: course._count.posts },
                },
            }),
        ]);
        return deletedCourse;
    }
};
exports.PrismaCourseRepository = PrismaCourseRepository;
exports.PrismaCourseRepository = PrismaCourseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCourseRepository);
//# sourceMappingURL=prisma-course.repository.js.map