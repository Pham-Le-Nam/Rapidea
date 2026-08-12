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
exports.CourseController = void 0;
const jwt_guard_1 = require("../auth/jwt.guard");
const optional_jwt_guard_1 = require("../auth/optional-jwt.guard");
const users_service_1 = require("../users/users.service");
const add_course_dto_1 = require("./course-dto/add-course.dto");
const update_course_dto_1 = require("./course-dto/update-course.dto");
const course_service_1 = require("./course.service");
const common_1 = require("@nestjs/common");
let CourseController = class CourseController {
    courseService;
    userService;
    constructor(courseService, userService) {
        this.courseService = courseService;
        this.userService = userService;
    }
    async getCourses(username, req, offset, limit) {
        const viewer = req.user;
        const owner = await this.userService.getUserByUsername(username);
        if (!owner) {
            throw new common_1.NotFoundException("User not found");
        }
        const pagination = this.getPagination(offset, limit);
        const course = await this.courseService.getCourseByUserId(owner.id, {
            offset: pagination.offset,
            limit: pagination.limit + 1,
        });
        if (!course) {
            throw new common_1.NotFoundException("Courses not found");
        }
        return {
            course: course.slice(0, pagination.limit),
            hasMore: course.length > pagination.limit,
            isOwner: viewer?.userId === owner.id,
        };
    }
    async getCourse(id, req) {
        const viewer = req.user;
        const course = await this.courseService.getCourseById(id);
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (viewer?.userId && viewer.userId !== course.userId) {
            await this.courseService.recordCourseView(id, viewer.userId);
        }
        return {
            course,
            isOwner: viewer?.userId === course.userId,
        };
    }
    async addCourse(req, addCourseDto) {
        const user = req.user;
        const course = await this.courseService.createCourse(user.userId, addCourseDto.title, addCourseDto.description, addCourseDto.price, addCourseDto.currency, addCourseDto.tags);
        if (!course) {
            throw new common_1.InternalServerErrorException("Couldn't add course");
        }
        return course;
    }
    async deleteCourse(req, data) {
        const user = req.user;
        const course = await this.courseService.deleteCourse(data.id, user.userId);
        if (!course) {
            throw new common_1.InternalServerErrorException("Couldn't delete this course");
        }
        return course;
    }
    async updateCourse(courseId, req, updateCourseDto) {
        const user = req.user;
        const userId = user.userId;
        const course = await this.courseService.updateCourse(courseId, userId, updateCourseDto.title, updateCourseDto.description, updateCourseDto.price, updateCourseDto.currency, updateCourseDto.thumbnailId, updateCourseDto.tags);
        return course;
    }
    getPagination(offset, limit) {
        const parsedOffset = Number(offset);
        const parsedLimit = Number(limit);
        return {
            offset: Number.isInteger(parsedOffset) && parsedOffset > 0 ? parsedOffset : 0,
            limit: Number.isInteger(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 50) : 5,
        };
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('offset')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourses", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_course_dto_1.AddCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('api/course'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        users_service_1.UsersService])
], CourseController);
//# sourceMappingURL=course.controller.js.map