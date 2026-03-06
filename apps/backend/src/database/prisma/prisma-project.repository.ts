import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectRepository } from '../../modules/project/project.repository';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, name: string, role: string, startedAt?: Date, endedAt?: Date, details?: string, logoId?: number): Promise<any> {
        const highestOrder = await this.prisma.project.findFirst({
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

        return this.prisma.project.create({
            data: {
                userId,
                name,
                role,
                startedAt,
                endedAt,
                details,
                logoId,
                order
            }
        });
    }

    async updateById(id: string, userId: string, name?: string, role?: string, startedAt?: Date, endedAt?: Date, details?: string, logoId?: number): Promise<any> {
        return this.prisma.project.update({
            where: {
                id,
                userId,
            },
            data: {
                name,
                role,
                startedAt,
                endedAt,
                details,
                logoId,
            }
        });
    }

    async deleteById(id: string, userId: string): Promise<any> {
        return this.prisma.project.delete({
            where: {
                id,
                userId,
            },
        });
    }

    async swapOrderById(firstId: string, secondId: string): Promise<any> {
        const firstProject = await this.prisma.project.findUnique({
            where: {
                id: firstId,
            },
            select: {
                order: true,
            },
        });

        const secondProject = await this.prisma.project.findUnique({
            where: {
                id: secondId,
            },
            select: {
                order: true,
            },
        });

        if (!firstProject ||  !secondProject) {
            throw new InternalServerErrorException("project not found");
        }

        const firstUpdated = await this.prisma.project.update({
            where: {
                id: firstId,
            },
            data: {
                order: secondProject.order,
            },
        });

        const secondUpdated = await this.prisma.project.update({
            where: {
                id: secondId,
            },
            data: {
                order: firstProject.order,
            },
        });

        return [
            firstUpdated,
            secondUpdated,
        ];
    }

    async getByUserId(userId: string): Promise<any> {
        return this.prisma.project.findMany({
            where: {
                userId,
            },
        });
    }

    async checkOwner(id: string, userId: string): Promise<boolean> {
        const project = await this.prisma.project.findUnique({
            where: {
                id,
            },
            select: {
                userId: true,
            },
        });

        if (!project) {
            throw new NotFoundException("Project not found");
        }
        
        const isOwner = project.userId === userId;

        return isOwner;
    }
}