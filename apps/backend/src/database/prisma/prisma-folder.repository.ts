import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FolderRepository } from '../../modules/folder/folder.repository';

@Injectable()
export class PrismaFolderRepository implements FolderRepository {
    constructor(private prisma: PrismaService) {}

}