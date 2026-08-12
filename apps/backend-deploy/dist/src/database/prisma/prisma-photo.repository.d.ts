import { PrismaService } from '../../prisma/prisma.service';
import { PhotoRepository } from '../../modules/photo/photo.repository';
export declare class PrismaPhotoRepository implements PhotoRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, extension: string, url?: string): Promise<any>;
    delete(id: number): Promise<any>;
    findById(id: number): Promise<any>;
}
