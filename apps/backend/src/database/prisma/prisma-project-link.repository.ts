import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectLinkRepository } from '../../modules/project-link/project-link.repository';

@Injectable()
export class PrismaProjectLinkRepository implements ProjectLinkRepository {
    constructor(private prisma: PrismaService) {}

}