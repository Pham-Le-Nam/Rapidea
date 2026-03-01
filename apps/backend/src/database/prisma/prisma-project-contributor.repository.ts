import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectContributorRepository } from '../../modules/project-contributor/project-contributor.repository';

@Injectable()
export class PrismaProjectContributorRepository implements ProjectContributorRepository {
    constructor(private prisma: PrismaService) {}

    async create(projectId: string, userId: string, role: string): Promise<any> {
        const project = await this.prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });

        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!project) {
            throw new InternalServerErrorException("Project not found");
        }

        if (!user) {
            throw new InternalServerErrorException("User not found");
        }

        return this.prisma.projectContributor.create({
            data: {
                projectId,
                userId,
                role,
            },
        });
    }

    async updateRole(projectId: string, userId: string, role?: string): Promise<any> {
        return this.prisma.projectContributor.update({
            where: {
                projectId_userId: {
                    projectId,
                    userId,
                }
            },
            data: {
                role,
            },
        });
    }

    async delete(projectId: string, userId: string): Promise<any> {
        return this.prisma.projectContributor.delete({
            where: {
                projectId_userId: {
                    projectId,
                    userId,
                },
            },
        });
    }

    async findContributors(projectId: string): Promise<any> {
        const contributors = await this.prisma.projectContributor.findMany({
            where: {
                projectId,
            },
            select: {
                userId: true,
            },
        });

        const ids = contributors.map(contributor => contributor.userId)

        return this.prisma.users.findMany({
            where: {
                id: { in: ids },
            },
        });
    }

}