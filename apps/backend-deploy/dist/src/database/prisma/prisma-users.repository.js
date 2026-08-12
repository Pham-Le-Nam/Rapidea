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
exports.PrismaUsersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaUsersRepository = class PrismaUsersRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    serializeUser(user) {
        if (!user)
            return user;
        const { password, avatar, background, ...safeUser } = user;
        return {
            ...safeUser,
            avatar,
            background,
            avatarUrl: avatar?.name ? `${process.env.PHOTO_STORAGE_PATH ?? ''}${avatar.name}` : undefined,
            backgroundUrl: background?.name ? `${process.env.PHOTO_STORAGE_PATH ?? ''}${background.name}` : undefined,
        };
    }
    async create(email, password, firstname, lastname, middlename) {
        const username = await this.generateUsername(firstname, middlename, lastname);
        return this.prisma.users.create({
            data: {
                email,
                password,
                firstname,
                lastname,
                middlename,
                username,
            },
        });
    }
    async findAll() {
        const users = await this.prisma.users.findMany({
            include: {
                avatar: true,
                background: true,
            },
        });
        return users.map((user) => this.serializeUser(user));
    }
    async findByEmail(email) {
        return this.prisma.users.findUnique({
            where: { email },
        });
    }
    async findByUsername(username) {
        const user = await this.prisma.users.findUnique({
            where: { username },
            include: {
                avatar: true,
                background: true,
            },
        });
        return this.serializeUser(user);
    }
    async findById(id) {
        const user = await this.prisma.users.findUnique({
            where: { id },
            include: {
                avatar: true,
                background: true,
            },
        });
        return this.serializeUser(user);
    }
    async updateCreatorPrompt(userId, creatorPrompt) {
        const user = await this.prisma.users.update({
            where: { id: userId },
            data: { creatorPrompt: creatorPrompt.trim() || null },
            select: { creatorPrompt: true },
        });
        return user.creatorPrompt;
    }
    async updateById(id, firstname, lastname, middlename, avatarId, backgroundId, headline, bio) {
        const currentUser = await this.prisma.users.findUnique({
            where: { id },
            select: {
                firstname: true,
                lastname: true,
                middlename: true,
            },
        });
        if (!currentUser) {
            throw new common_1.InternalServerErrorException("User not found");
        }
        const nextFirstname = firstname ?? currentUser.firstname;
        const nextLastname = lastname ?? currentUser.lastname;
        const nextMiddlename = middlename ?? currentUser.middlename ?? undefined;
        const shouldRegenerateUsername = firstname !== undefined || lastname !== undefined || middlename !== undefined;
        const username = shouldRegenerateUsername
            ? await this.generateUsername(nextFirstname, nextMiddlename, nextLastname, id)
            : undefined;
        const user = await this.prisma.users.update({
            where: { id },
            data: {
                username,
                firstname,
                lastname,
                middlename,
                avatarId,
                backgroundId,
                headline,
                bio,
            },
            include: {
                avatar: true,
                background: true,
            },
        });
        return this.serializeUser(user);
    }
    async updateByUsername(currentUsername, firstname, lastname, middlename, avatarId, backgroundId, headline, bio) {
        const currentUser = await this.prisma.users.findUnique({
            where: { username: currentUsername },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                middlename: true,
            },
        });
        if (!currentUser) {
            throw new common_1.InternalServerErrorException("User not found");
        }
        const nextFirstname = firstname ?? currentUser.firstname;
        const nextLastname = lastname ?? currentUser.lastname;
        const nextMiddlename = middlename ?? currentUser.middlename ?? undefined;
        const shouldRegenerateUsername = firstname !== undefined || lastname !== undefined || middlename !== undefined;
        const username = shouldRegenerateUsername
            ? await this.generateUsername(nextFirstname, nextMiddlename, nextLastname, currentUser.id)
            : undefined;
        const user = await this.prisma.users.update({
            where: { username: currentUsername },
            data: {
                username,
                firstname,
                lastname,
                middlename,
                avatarId,
                backgroundId,
                headline,
                bio,
            },
            include: {
                avatar: true,
                background: true,
            },
        });
        return this.serializeUser(user);
    }
    async updateSessionVersion(id) {
        return this.prisma.users.update({
            where: { id },
            data: { sessionVersion: { increment: 1 } },
        });
    }
    async validateSessionVersion(id, sessionVersion) {
        const user = await this.prisma.users.findUnique({
            where: { id: id },
            select: { sessionVersion: true },
        });
        return user?.sessionVersion === sessionVersion;
    }
    async resetPassword(id, password) {
        const user = await this.prisma.users.update({
            where: { id },
            data: { password }
        });
        return user;
    }
    async findPayoutAccountByUserId(userId) {
        return this.prisma.payoutAccount.findUnique({
            where: { userId },
        });
    }
    async upsertPayoutAccount(userId, data) {
        return this.prisma.payoutAccount.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                ...data,
            },
        });
    }
    async generateUsername(firstname, middlename, lastname, excludedUserId) {
        const base = [firstname, middlename, lastname]
            .filter((part) => !!part?.trim())
            .join('.')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '.')
            .replace(/^\.+|\.+$/g, '')
            .replace(/\.+/g, '.') || 'user';
        let username = base;
        let counter = 2;
        while (await this.prisma.users.findFirst({
            where: {
                username,
                ...(excludedUserId ? { id: { not: excludedUserId } } : {}),
            },
        })) {
            username = `${base}.${counter}`;
            counter++;
        }
        return username;
    }
};
exports.PrismaUsersRepository = PrismaUsersRepository;
exports.PrismaUsersRepository = PrismaUsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUsersRepository);
//# sourceMappingURL=prisma-users.repository.js.map