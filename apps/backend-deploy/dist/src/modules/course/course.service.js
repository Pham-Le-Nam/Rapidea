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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const folder_service_1 = require("../folder/folder.service");
const users_service_1 = require("../users/users.service");
const tags_service_1 = require("../tags/tags.service");
const notification_service_1 = require("../notification/notification.service");
let CourseService = class CourseService {
    courseRepo;
    folderService;
    usersService;
    tagsService;
    notificationService;
    constructor(courseRepo, folderService, usersService, tagsService, notificationService) {
        this.courseRepo = courseRepo;
        this.folderService = folderService;
        this.usersService = usersService;
        this.tagsService = tagsService;
        this.notificationService = notificationService;
    }
    async createCourse(userId, title, description, price, currency, tags = []) {
        const user = await this.usersService.getUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.requirePayoutAccountForPaidCourse(userId, price);
        const parentFolder = await this.folderService.findFolderByLocation(user.username);
        if (!parentFolder) {
            throw new common_1.InternalServerErrorException('Folder not found');
        }
        const folder = await this.folderService.createFolder(userId, title, parentFolder.id);
        if (!folder) {
            throw new common_1.InternalServerErrorException("Couldn't create the folder");
        }
        const course = await this.courseRepo.create(userId, title, folder.id, description, price, currency);
        await this.tagsService.setCourseTags(course.id, tags);
        await this.notificationService.notifyFollowersAndSubscribersOfNewCourse(userId, course.id, course.title);
        return this.courseRepo.findById(course.id);
    }
    async updateCourse(id, userId, title, description, price, currency, thumbnailId, tags) {
        if (price !== undefined) {
            await this.requirePayoutAccountForPaidCourse(userId, price);
        }
        if (title) {
            const course = await this.courseRepo.findById(id);
            const courseFolder = await this.folderService.renameFolder(course.folderId, userId, title);
            if (!courseFolder) {
                throw new common_1.InternalServerErrorException("", "Couldn't rename the folder");
            }
        }
        const course = await this.courseRepo.updateById(id, userId, title, description, price, currency, thumbnailId);
        if (tags) {
            await this.tagsService.setCourseTags(id, tags);
        }
        return this.courseRepo.findById(course.id);
    }
    async updateCourseLastUpdated(courseId, lastUpdated = new Date()) {
        return this.courseRepo.updateLastUpdatedById(courseId, lastUpdated);
    }
    async recordCourseView(courseId, userId) {
        return this.courseRepo.recordView(courseId, userId);
    }
    async deleteCourse(courseId, userId) {
        const course = await this.courseRepo.deleteCourseById(courseId);
        if (!course) {
            throw new common_1.InternalServerErrorException("Couldn't delete the course");
        }
        const folder = await this.folderService.deleteFolder(course.folderId, userId);
        if (!folder) {
            throw new common_1.InternalServerErrorException("Couldn't delete the folder");
        }
        return course;
    }
    async getCourseByUserId(userId, options) {
        return this.courseRepo.findByUserId(userId, "id", "asc", options?.limit, options?.offset);
    }
    async getCourseById(id) {
        return this.courseRepo.findById(id);
    }
    async requirePayoutAccountForPaidCourse(userId, price) {
        if (!price || price <= 0)
            return;
        const payout = await this.usersService.getPayoutAccount(userId);
        if (!payout || payout.status !== 'READY_FOR_REVIEW') {
            throw new common_1.BadRequestException({
                code: 'PAYOUT_ACCOUNT_REQUIRED',
                message: 'Complete your payout account before creating or pricing a paid course.',
            });
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('COURSE_REPOSITORY')),
    __metadata("design:paramtypes", [Object, folder_service_1.FolderService,
        users_service_1.UsersService,
        tags_service_1.TagsService,
        notification_service_1.NotificationService])
], CourseService);
//# sourceMappingURL=course.service.js.map