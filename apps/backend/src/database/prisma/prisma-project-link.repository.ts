import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectLinkRepository } from '../../modules/project-link/project-link.repository';

@Injectable()
export class PrismaProjectLinkRepository implements ProjectLinkRepository {
    constructor(private prisma: PrismaService) {}

    async create(projectId: string, name: string, url: string): Promise<any> {
        const project = await this.prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });

        if (!project) {
            throw new InternalServerErrorException("Project not found");
        }

        return this.prisma.projectLink.create({
            data: {
                projectId,
                name,
                url,
            },
        });
    }

    async update(id: string, name?: string, url?: string): Promise<any> {
        return this.prisma.projectLink.update({
            where: {
                id,
            },
            data: {
                name,
                url,
            },
        });
    }

    async delete(id: string): Promise<any> {
        return this.prisma.projectLink.delete({
            where: {
                id,
            },
        });
    }

    async findById(id: string): Promise<any> {
        return this.prisma.projectLink.findMany({
            where: {
                id,
            },
        });
    }

    async findLinks(projectId: string): Promise<any> {
        return this.prisma.projectLink.findMany({
            where: {
                projectId,
            },
        });
    }

}