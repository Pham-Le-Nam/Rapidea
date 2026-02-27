import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectContributorRepository } from '../../modules/project-contributor/project-contributor.repository';

@Injectable()
export class PrismaProjectContributorRepository implements ProjectContributorRepository {
    constructor(private prisma: PrismaService) {}

}