import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { UsersRepository } from '../../../domain/users/repositories/users.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService) {}

    private serializeUser(user: any) {
        if (!user) return user;

        const { password, avatar, background, ...safeUser } = user;

        return {
            ...safeUser,
            avatar,
            background,
            avatarUrl: avatar?.name ? `${process.env.PHOTO_STORAGE_PATH ?? ''}${avatar.name}` : undefined,
            backgroundUrl: background?.name ? `${process.env.PHOTO_STORAGE_PATH ?? ''}${background.name}` : undefined,
        };
    }

    async create(email: string, password: string | null, firstname: string, lastname: string, middlename?: string) {
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

    async findByEmail(email: string) {
        return this.prisma.users.findUnique({
            where: { email },
        });
    }

    async findByUsername(username: string) {
        const user = await this.prisma.users.findUnique({
            where: { username },
            include: {
                avatar: true,
                background: true,
            },
        });

        return this.serializeUser(user);
    }

    async findById(id: string){
        const user = await this.prisma.users.findUnique({
            where: { id },
            include: {
                avatar: true,
                background: true,
            },
        });

        return this.serializeUser(user);
    }

    async updateCreatorPrompt(userId: string, creatorPrompt: string) {
        const user = await this.prisma.users.update({
            where: { id: userId },
            data: { creatorPrompt: creatorPrompt.trim() || null },
            select: { creatorPrompt: true },
        });
        return user.creatorPrompt;
    }

    async updateById(id: string, firstname?: string, lastname?: string, middlename?: string, avatarId?: number, backgroundId?: number, headline?: string, bio?: string): Promise<any | null> {
        const currentUser = await this.prisma.users.findUnique({
            where: { id },
            select: {
                firstname: true,
                lastname: true,
                middlename: true,
            },
        });

        if (!currentUser) {
            throw new InternalServerErrorException("User not found");
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

    async updateByUsername(currentUsername: string, firstname?: string, lastname?: string, middlename?: string, avatarId?: number, backgroundId?: number, headline?: string, bio?: string): Promise<any | null> {
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
            throw new InternalServerErrorException("User not found");
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

    async updateSessionVersion(id: string) {
        return this.prisma.users.update({
            where: { id },
            data: { sessionVersion: { increment: 1 } },
        });
    }

    async validateSessionVersion(id: string, sessionVersion: number) {
        const user = await this.prisma.users.findUnique({
            where: { id: id },
            select: { sessionVersion: true },
        });

        return user?.sessionVersion === sessionVersion;
    }

    async resetPassword(id: string, password: string) {
        const user = await this.prisma.users.update({
            where: { id },
            data: { password }
        })

        return user;
    }

    async findPayoutAccountByUserId(userId: string): Promise<any | null> {
        return this.prisma.payoutAccount.findUnique({
            where: { userId },
        });
    }

    async upsertPayoutAccount(userId: string, data: any): Promise<any> {
        return this.prisma.payoutAccount.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                ...data,
            },
        });
    }

    private async generateUsername(firstname: string, middlename: string | undefined | null, lastname: string, excludedUserId?: string): Promise<string> {
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

        while (
            await this.prisma.users.findFirst({
                where: {
                    username,
                    ...(excludedUserId ? { id: { not: excludedUserId } } : {}),
                },
            })
        ) {
            username = `${base}.${counter}`;
            counter++;
        }

        return username;
    }
}
