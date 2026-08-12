"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatePostModule = void 0;
const common_1 = require("@nestjs/common");
const rate_post_service_1 = require("./rate-post.service");
const rate_post_controller_1 = require("./rate-post.controller");
const prisma_rate_post_repository_1 = require("../../database/prisma/prisma-rate-post.repository");
let RatePostModule = class RatePostModule {
};
exports.RatePostModule = RatePostModule;
exports.RatePostModule = RatePostModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            rate_post_service_1.RatePostService,
            {
                provide: "RATE_POST_REPOSITORY",
                useClass: prisma_rate_post_repository_1.PrismaRatePostRepository,
            }
        ],
        controllers: [
            rate_post_controller_1.RatePostController,
        ],
        exports: [],
    })
], RatePostModule);
//# sourceMappingURL=rate-post.module.js.map