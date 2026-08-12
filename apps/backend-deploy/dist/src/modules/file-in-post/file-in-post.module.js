"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInPostModule = void 0;
const common_1 = require("@nestjs/common");
const file_in_post_service_1 = require("./file-in-post.service");
const file_in_post_controller_1 = require("./file-in-post.controller");
const prisma_file_in_post_repository_1 = require("../../database/prisma/prisma-file-in-post.repository");
const post_module_1 = require("../post/post.module");
const file_module_1 = require("../file/file.module");
const tags_module_1 = require("../tags/tags.module");
let FileInPostModule = class FileInPostModule {
};
exports.FileInPostModule = FileInPostModule;
exports.FileInPostModule = FileInPostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            post_module_1.PostModule,
            file_module_1.FileModule,
            tags_module_1.TagsModule,
        ],
        providers: [
            file_in_post_service_1.FileInPostService,
            {
                provide: 'FILE_IN_POST_REPOSITORY',
                useClass: prisma_file_in_post_repository_1.PrismaFileInPostRepository,
            }
        ],
        controllers: [
            file_in_post_controller_1.FileInPostController,
        ],
        exports: [
            file_in_post_service_1.FileInPostService,
        ],
    })
], FileInPostModule);
//# sourceMappingURL=file-in-post.module.js.map