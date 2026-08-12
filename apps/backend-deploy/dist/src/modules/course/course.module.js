"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const prisma_course_repository_1 = require("../../database/prisma/prisma-course.repository");
const course_controller_1 = require("./course.controller");
const users_module_1 = require("../users/users.module");
const folder_module_1 = require("../folder/folder.module");
const tags_module_1 = require("../tags/tags.module");
let CourseModule = class CourseModule {
};
exports.CourseModule = CourseModule;
exports.CourseModule = CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            folder_module_1.FolderModule,
            tags_module_1.TagsModule,
        ],
        controllers: [
            course_controller_1.CourseController,
        ],
        providers: [
            course_service_1.CourseService,
            {
                provide: "COURSE_REPOSITORY",
                useClass: prisma_course_repository_1.PrismaCourseRepository,
            }
        ],
        exports: [
            course_service_1.CourseService,
        ],
    })
], CourseModule);
//# sourceMappingURL=course.module.js.map