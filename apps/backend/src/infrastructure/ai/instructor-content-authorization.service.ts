import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';
import { AiContentResourceType } from '../../application/ai-chat/ai-content-authorization.types';

@Injectable()
export class InstructorContentAuthorizationService {
  constructor(private readonly prisma: PrismaService) {}

  async assertInstructor(userId: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { role: true, isBanned: true },
    });
    // Admins do not get a cross-owner bypass in the teaching assistant.
    if (!user || user.isBanned || !['INSTRUCTOR', 'ADMIN'].includes(user.role))
      throw new ForbiddenException('Instructor access required');
  }
  courseWhere(userId: string): Prisma.CourseWhereInput {
    return { userId };
  }
  postWhere(userId: string): Prisma.PostWhereInput {
    return { OR: [{ userId }, { course: { is: { userId } } }] };
  }
  fileWhere(userId: string): Prisma.FileWhereInput {
    return { userId };
  }

  async canAccess(
    userId: string,
    type: AiContentResourceType | 'COURSE' | 'POST' | 'FILE',
    id: string,
  ): Promise<boolean> {
    switch (type) {
      case 'COURSE':
        return !!(await this.prisma.course.findFirst({
          where: { id, ...this.courseWhere(userId) },
          select: { id: true },
        }));
      case 'POST':
        return !!(await this.prisma.post.findFirst({
          where: { id, ...this.postWhere(userId) },
          select: { id: true },
        }));
      case 'FILE':
        return !!(await this.prisma.file.findFirst({
          where: { id, ...this.fileWhere(userId) },
          select: { id: true },
        }));
      case 'DISCUSSION':
        return !!(await this.prisma.discussion.findFirst({
          where: { id, post: { is: this.postWhere(userId) } },
          select: { id: true },
        }));
      case 'REVIEW':
        return !!(await this.prisma.subscribe.findFirst({
          where: { id, course: { is: { userId } } },
          select: { id: true },
        }));
      default:
        return false;
    }
  }
  async assertCanAccess(
    userId: string,
    type: 'COURSE' | 'POST' | 'FILE',
    id: string,
  ) {
    if (!(await this.canAccess(userId, type, id)))
      throw new NotFoundException('Owned instructor source not found');
  }

  // Apply ownership inside both vector and FTS candidate queries, then recheck
  // individual sources after fusion. Public/preview/subscription rules do not apply.
  chunkOwnershipSql(userId: string): Prisma.Sql {
    return Prisma.sql`AND (
      ("chunk"."sourceType" = 'FILE' AND EXISTS (SELECT 1 FROM "file" f WHERE f."id" = "chunk"."sourceId" AND f."userId" = ${userId})) OR
      ("chunk"."sourceType" = 'POST' AND EXISTS (SELECT 1 FROM "post" p LEFT JOIN "course" c ON c."id" = p."courseId" WHERE p."id" = "chunk"."sourceId" AND (p."userId" = ${userId} OR c."userId" = ${userId}))) OR
      ("chunk"."sourceType" = 'DISCUSSION' AND EXISTS (SELECT 1 FROM "discussion" d JOIN "post" p ON p."id" = d."postId" LEFT JOIN "course" c ON c."id" = p."courseId" WHERE d."id" = "chunk"."sourceId" AND (p."userId" = ${userId} OR c."userId" = ${userId}))) OR
      ("chunk"."sourceType" = 'REVIEW' AND EXISTS (SELECT 1 FROM "subscribe" s JOIN "course" c ON c."id" = s."courseId" WHERE s."id" = "chunk"."sourceId" AND c."userId" = ${userId}))
    )`;
  }
}
