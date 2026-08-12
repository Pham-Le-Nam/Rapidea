"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentModule = void 0;
const common_1 = require("@nestjs/common");
const recent_controller_1 = require("./recent.controller");
const recent_service_1 = require("./recent.service");
const prisma_recent_repository_1 = require("../../database/prisma/prisma-recent.repository");
let RecentModule = class RecentModule {
};
exports.RecentModule = RecentModule;
exports.RecentModule = RecentModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            recent_controller_1.RecentController,
        ],
        providers: [
            recent_service_1.RecentService,
            { provide: 'RECENT_REPOSITORY', useClass: prisma_recent_repository_1.PrismaRecentRepository },
        ],
    })
], RecentModule);
//# sourceMappingURL=recent.module.js.map