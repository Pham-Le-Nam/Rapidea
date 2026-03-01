import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersRepository } from '../../modules/users/users.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService) {}

    async create(email: string, password: string, firstname: string, lastname: string, middlename?: string, avatarId?: number, backgroundId?: number) {
        if (!middlename) {
            middlename = '';
        }
        else {
            middlename += '.';
        }
        const username = await this.generateUsername(`${firstname} ${middlename} ${lastname}`);
        return this.prisma.users.create({ 
            data: { 
                email, 
                password, 
                firstname, 
                lastname, 
                middlename, 
                username,
                avatarId,
                backgroundId,
            },
        });
    }

    async findAll() {
        return this.prisma.users.findMany();
    }

    async findByEmail(email: string) {
        return this.prisma.users.findUnique({
            where: { email },
        });
    }

    async findByUsername(username: string) {
        return this.prisma.users.findUnique({
            where: { username },
        });
    }

    async findById(id: string){
        return this.prisma.users.findUnique({
            where: { id }
        })
    }

    async updateById(id: string, firstname?: string, lastname?: string, middlename?: string, avatarId?: number, backgroundId?: number): Promise<any | null> {
        return this.prisma.users.update({
            where: { id },
            data: {
                firstname,
                lastname,
                middlename,
                avatarId,
                backgroundId,
            },
        });
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

    private async generateUsername(name: string): Promise<string> {
        const base = name.toLowerCase().replace(/\s+/g, '');
        let username = base;
        let counter = 1;

        while (
            await this.prisma.users.findUnique({
                where: { username },
            })
        ) {
            username = `${base}${counter}`;
            counter++;
        }

        return username;
    }
}