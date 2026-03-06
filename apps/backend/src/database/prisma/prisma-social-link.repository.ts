import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SocialLinkRepository } from '../../modules/social-link/social-link.repository';
import { SocialPlatform } from 'generated/prisma/enums';

@Injectable()
export class PrismaSocialLinkRepository implements SocialLinkRepository {
    constructor(private prisma: PrismaService) {}

    async create(platform: SocialPlatform, url: string, userId: string): Promise<any> {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new InternalServerErrorException("User not found");
        }

        return this.prisma.socialLink.create({
            data: {
                platform,
                url,
                userId,
            },
        });
    }

    async deleteById(id: string): Promise<any> {
        return this.prisma.socialLink.delete({
            where: {
                id,
            },
        });
    }

    async updateById(id: string, url?: string): Promise<any> {
        return this.prisma.socialLink.update({
            where: {
                id,
            },
            data: {
                url,
            },
        });
    }

    async findByUserId(userId: string): Promise<any> {
        return this.prisma.socialLink.findMany({
            where: {
                userId,
            },
        });
    }

    async findById(id: string): Promise<any> {
        return this.prisma.socialLink.findUnique({
            where: {
                id,
            },
        });
    }
}