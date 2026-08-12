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
exports.PrismaFileInCourseRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaFileInCourseRepository = class PrismaFileInCourseRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(fileId, courseId, userId) {
        const file = await this.prisma.file.findUnique({
            where: {
                id: fileId,
            },
            select: {
                id: true,
            },
        });
        const course = await this.prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                id: true,
            },
        });
        if (!file) {
            throw new common_1.InternalServerErrorException("File not found");
        }
        if (!course) {
            throw new common_1.InternalServerErrorException("Course not found");
        }
        const fileInCourse = await this.prisma.fileInCourse.create({
            data: {
                fileId,
                courseId,
                userId,
            },
        });
        return fileInCourse;
    }
    async delete(fileId, courseId, userId) {
        return this.prisma.fileInCourse.delete({
            where: {
                fileId_courseId: {
                    fileId,
                    courseId,
                },
                userId,
            },
        });
    }
    async getCourses(fileId) {
        const courses = await this.prisma.fileInCourse.findMany({
            where: {
                fileId,
            },
            select: {
                courseId: true,
            },
        });
        if (!courses) {
            throw new common_1.InternalServerErrorException("Courses not found");
        }
        const ids = courses.map(course => course.courseId);
        return this.prisma.course.findMany({
            where: {
                id: { in: ids },
            },
        });
    }
    async getFiles(courseId) {
        const files = await this.prisma.fileInCourse.findMany({
            where: {
                courseId,
            },
            select: {
                fileId: true,
            },
        });
        if (!files) {
            throw new common_1.InternalServerErrorException("Files not found");
        }
        const ids = files.map(course => course.fileId);
        return this.prisma.file.findMany({
            where: {
                id: { in: ids },
            },
        });
    }
};
exports.PrismaFileInCourseRepository = PrismaFileInCourseRepository;
exports.PrismaFileInCourseRepository = PrismaFileInCourseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaFileInCourseRepository);
//# sourceMappingURL=prisma-file-in-course.repository.js.map