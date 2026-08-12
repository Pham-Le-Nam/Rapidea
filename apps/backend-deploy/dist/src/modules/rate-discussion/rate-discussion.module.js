"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateDiscussionModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_rate_discussion_repository_1 = require("../../database/prisma/prisma-rate-discussion.repository");
const rate_discussion_controller_1 = require("./rate-discussion.controller");
const rate_discussion_service_1 = require("./rate-discussion.service");
let RateDiscussionModule = class RateDiscussionModule {
};
exports.RateDiscussionModule = RateDiscussionModule;
exports.RateDiscussionModule = RateDiscussionModule = __decorate([
    (0, common_1.Module)({
        providers: [
            rate_discussion_service_1.RateDiscussionService,
            {
                provide: "RATE_DISCUSSION_REPOSITORY",
                useClass: prisma_rate_discussion_repository_1.PrismaRateDiscussionRepository,
            },
        ],
        controllers: [
            rate_discussion_controller_1.RateDiscussionController,
        ],
    })
], RateDiscussionModule);
//# sourceMappingURL=rate-discussion.module.js.map