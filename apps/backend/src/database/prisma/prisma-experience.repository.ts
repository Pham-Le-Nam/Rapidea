import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ExperienceRepository } from '../../modules/experience/experience.repository';

@Injectable()
export class PrismaExperienceRepository implements ExperienceRepository {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, name: string, position?: string, role?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any> {
        const highestOrder = await this.prisma.experience.findFirst({
            where: {
                userId,
            },
            orderBy: {
                order: 'desc',
            },
            select: {
                order: true,
            },
        });

        // The created one always be the highest order
        let order = 1; 
        if (highestOrder) {
            order = highestOrder.order + 1;
        }

        return this.prisma.experience.create({
            data: {
                userId,
                name,
                position,
                role,
                startedAt,
                endedAt,
                location,
                achievement,
                logoId,
                order
            }
        });
    }

    async updateById(id: string, userId: string, name?: string, position?: string, role?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any> {
        return this.prisma.experience.update({
            where: {
                id,
                userId,
            },
            data: {
                name,
                position,
                role,
                startedAt,
                endedAt,
                location,
                achievement,
                logoId
            }
        });
    }

    async deleteById(id: string, userId: string): Promise<any> {
        return this.prisma.experience.delete({
            where: {
                id,
                userId,
            },
        });
    }

    async swapOrderById(firstId: string, secondId: string): Promise<any> {
        const firstExperience = await this.prisma.experience.findUnique({
            where: {
                id: firstId,
            },
            select: {
                order: true,
            },
        });

        const secondExperience = await this.prisma.experience.findUnique({
            where: {
                id: secondId,
            },
            select: {
                order: true,
            },
        });

        if (!firstExperience ||  !secondExperience) {
            throw new InternalServerErrorException("Experience not found");
        }

        const firstUpdated = await this.prisma.experience.update({
            where: {
                id: firstId,
            },
            data: {
                order: secondExperience.order,
            },
        });

        const secondUpdated = await this.prisma.experience.update({
            where: {
                id: secondId,
            },
            data: {
                order: firstExperience.order,
            },
        });

        return [
            firstUpdated,
            secondUpdated,
        ];
    }

    async getByUserId(userId: string): Promise<any> {
        return this.prisma.experience.findMany({
            where: {
                userId,
            },
        });
    }
}