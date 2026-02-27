import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FileInCourseRepository } from '../../modules/file-in-course/file-in-course.repository';

@Injectable()
export class PrismaFileInCourseRepository implements FileInCourseRepository {
    constructor(private prisma: PrismaService) {}

}