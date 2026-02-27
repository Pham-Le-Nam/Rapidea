import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PhotoRepository } from '../../modules/photo/photo.repository';

@Injectable()
export class PrismaPhotoRepository implements PhotoRepository {
    constructor(private prisma: PrismaService) {}

}