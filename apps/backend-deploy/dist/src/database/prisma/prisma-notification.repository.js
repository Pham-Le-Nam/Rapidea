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
exports.PrismaNotificationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaNotificationRepository = class PrismaNotificationRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(input) { return this.prisma.notification.create({ data: input }); }
    createMany(inputs) { return this.prisma.notification.createMany({ data: inputs }); }
    findUserName(userId) { return this.prisma.users.findUnique({ where: { id: userId }, select: { firstname: true, middlename: true, lastname: true, username: true } }); }
    findAdminIds() { return this.prisma.users.findMany({ where: { role: 'ADMIN', isBanned: false }, select: { id: true } }); }
    async findFeed(userId, limit, offset) {
        const [notifications, unreadCount] = await Promise.all([
            this.prisma.notification.findMany({ where: { userId }, include: { actor: { select: { id: true, firstname: true, middlename: true, lastname: true, username: true, avatar: true } } }, orderBy: [{ createdAt: 'desc' }, { id: 'asc' }], take: Math.min(Math.max(limit, 1), 50), skip: Math.max(offset, 0) }),
            this.prisma.notification.count({ where: { userId, readAt: null } }),
        ]);
        return { notifications, unreadCount };
    }
    markAsRead(userId, notificationId) { return this.prisma.notification.update({ where: { id: notificationId, userId }, data: { readAt: new Date() } }); }
    markAllAsRead(userId) { return this.prisma.notification.updateMany({ where: { userId, readAt: null }, data: { readAt: new Date() } }); }
    async findFollowersAndSubscribers(userId) {
        const [followers, subscribers] = await Promise.all([
            this.prisma.follow.findMany({ where: { followingId: userId }, select: { followerId: true } }),
            this.prisma.subscribe.findMany({ where: { course: { userId } }, distinct: ['userId'], select: { userId: true } }),
        ]);
        return { followers, subscribers };
    }
};
exports.PrismaNotificationRepository = PrismaNotificationRepository;
exports.PrismaNotificationRepository = PrismaNotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaNotificationRepository);
//# sourceMappingURL=prisma-notification.repository.js.map