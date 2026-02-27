import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FolderInCourseRepository } from '../../modules/folder-in-course/folder-in-course.repository';

@Injectable()
export class PrismaFolderInCourseRepository implements FolderInCourseRepository {
    constructor(private prisma: PrismaService) {}

}