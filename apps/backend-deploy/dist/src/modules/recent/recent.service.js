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
exports.RecentService = void 0;
const common_1 = require("@nestjs/common");
let RecentService = class RecentService {
    recentRepo;
    constructor(recentRepo) {
        this.recentRepo = recentRepo;
    }
    async getSidebarActivity(userId, limit = 10) {
        const data = await this.recentRepo.getSidebarSources(userId, limit);
        return {
            ownedCourses: data.ownedCourses,
            ownedPosts: data.ownedPosts,
            viewedOrSubscribedCourses: this.mergeByLatestActivity([...data.viewedCourses, ...data.subscribedCourses], limit),
            viewedOrSubscribedPosts: this.mergeByLatestActivity([...data.viewedPosts, ...data.subscribedPosts], limit),
        };
    }
    mergeByLatestActivity(items, limit) {
        const byId = new Map();
        items.forEach(item => { const current = byId.get(item.id); if (!current || item.activityAt > current.activityAt)
            byId.set(item.id, item); });
        return Array.from(byId.values()).sort((a, b) => b.activityAt.getTime() - a.activityAt.getTime()).slice(0, limit);
    }
};
exports.RecentService = RecentService;
exports.RecentService = RecentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RECENT_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], RecentService);
//# sourceMappingURL=recent.service.js.map