import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PhotoRepository } from '../../modules/photo/photo.repository';

@Injectable()
export class PrismaPhotoRepository implements PhotoRepository {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, extension: string, url?: string): Promise<any> {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new InternalServerErrorException("User not found");
        }

        const tempName = "tempName"

        const photo = await this.prisma.photo.create({
            data: {
                userId,
                url,
                name: tempName,
            },
            select: {
                id: true,
            },
        });

        // Name is Id (counting from 1) 
        const name = `${photo.id}.${extension}`;

        return this.prisma.photo.update({
            where: {
                id: photo.id,
            },
            data: {
                name,
            },
        });
    }

    async delete(id: number): Promise<any> {
        return this.prisma.photo.delete({
            where: {
                id,
            },
        });
    }

    async findById(id: number): Promise<any> {
        return this.prisma.photo.findUnique({
            where: {
                id,
            },
        });
    }

}