"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetTokenModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const users_module_1 = require("../users/users.module");
const password_reset_token_service_1 = require("./password-reset-token.service");
const prisma_password_reset_token_repository_1 = require("../../database/prisma/prisma-password-reset-token.repository");
let PasswordResetTokenModule = class PasswordResetTokenModule {
};
exports.PasswordResetTokenModule = PasswordResetTokenModule;
exports.PasswordResetTokenModule = PasswordResetTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
        ],
        providers: [
            password_reset_token_service_1.PasswordResetTokenService,
            {
                provide: 'PASSWORD_RESET_TOKEN_REPOSITORY',
                useClass: prisma_password_reset_token_repository_1.PrismaPasswordResetTokenRepository,
            }
        ],
        exports: [password_reset_token_service_1.PasswordResetTokenService],
    })
], PasswordResetTokenModule);
//# sourceMappingURL=password-reset-token.module.js.map