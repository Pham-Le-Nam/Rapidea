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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("../notification/notification.service");
let AdminService = class AdminService {
    adminRepo;
    notifications;
    constructor(adminRepo, notifications) {
        this.adminRepo = adminRepo;
        this.notifications = notifications;
    }
    async getModerationQueue() {
        return this.adminRepo.findModerationQueue();
    }
    async warn(adminId, userId, message, link) {
        return this.notifications.createNotification({
            userId,
            actorId: adminId,
            type: 'ADMIN_WARNING',
            title: 'Administrator warning',
            message: message.trim(),
            link,
        });
    }
    async ban(userId, reason) {
        const user = await this.adminRepo.banUser(userId, reason);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async deletePost(postId) {
        return this.adminRepo.deletePost(postId);
    }
    async deleteCourse(courseId) {
        return this.adminRepo.deleteCourse(courseId);
    }
    async deleteFile(fileId) {
        return this.adminRepo.deleteFile(fileId);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ADMIN_REPOSITORY')),
    __metadata("design:paramtypes", [Object, notification_service_1.NotificationService])
], AdminService);
//# sourceMappingURL=admin.service.js.map