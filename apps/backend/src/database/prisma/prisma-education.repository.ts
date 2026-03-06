import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EducationRepository } from '../../modules/education/education.repository';

@Injectable()
export class PrismaEducationRepository implements EducationRepository {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, name: string, major?: string, degree?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any> {
        const highestOrder = await this.prisma.education.findFirst({
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

        return this.prisma.education.create({
            data: {
                userId,
                name,
                major,
                degree,
                startedAt,
                endedAt,
                location,
                achievement,
                logoId,
                order
            }
        });
    }

    async updateById(userId: string, id: string, name?: string, major?: string, degree?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any> {
        return this.prisma.education.update({
            where: {
                id,
                userId,
            },
            data: {
                name,
                major,
                degree,
                startedAt,
                endedAt,
                location,
                achievement,
                logoId
            }
        });
    }

    async deleteById(id: string, userId: string): Promise<any> {
        return this.prisma.education.delete({
            where: {
                id,
                userId,
            },
        });
    }

    async swapOrderById(firstId: string, secondId: string): Promise<any> {
        const firstEducation = await this.prisma.education.findUnique({
            where: {
                id: firstId,
            },
            select: {
                order: true,
            },
        });

        const secondEducation = await this.prisma.education.findUnique({
            where: {
                id: secondId,
            },
            select: {
                order: true,
            },
        });

        if (!firstEducation ||  !secondEducation) {
            throw new InternalServerErrorException("Education not found");
        }

        const firstUpdated = await this.prisma.education.update({
            where: {
                id: firstId,
            },
            data: {
                order: secondEducation.order,
            },
        });

        const secondUpdated = await this.prisma.education.update({
            where: {
                id: secondId,
            },
            data: {
                order: firstEducation.order,
            },
        });

        return [
            firstUpdated,
            secondUpdated,
        ];
    }

    async getByUserId(userId: string): Promise<any> {
        return this.prisma.education.findMany({
            where: {
                userId,
            },
        });
    }
}