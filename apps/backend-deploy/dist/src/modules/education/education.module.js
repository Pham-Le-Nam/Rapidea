"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationModule = void 0;
const common_1 = require("@nestjs/common");
const education_service_1 = require("./education.service");
const users_module_1 = require("../users/users.module");
const education_controller_1 = require("./education.controller");
const prisma_education_repository_1 = require("../../database/prisma/prisma-education.repository");
let EducationModule = class EducationModule {
};
exports.EducationModule = EducationModule;
exports.EducationModule = EducationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule
        ],
        controllers: [
            education_controller_1.EducationController
        ],
        providers: [
            education_service_1.EducationService,
            {
                provide: "EDUCATION_REPOSITORY",
                useClass: prisma_education_repository_1.PrismaEducationRepository,
            }
        ]
    })
], EducationModule);
//# sourceMappingURL=education.module.js.map