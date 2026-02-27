import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FileInPostRepository } from '../../modules/file-in-post/file-in-post.repository';

@Injectable()
export class PrismaFileInPostRepository implements FileInPostRepository {
    constructor(private prisma: PrismaService) {}

}