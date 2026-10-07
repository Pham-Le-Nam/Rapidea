import { createHash } from 'crypto';
import { Prisma } from '../../../generated/prisma/client';
import { InstructorContentAuthorizationService } from './instructor-content-authorization.service';

export const postSelect = {
  id: true,
  courseId: true,
  title: true,
  content: true,
  summary: true,
  lastUpdated: true,
  aiStatus: true,
  files: {
    select: {
      file: {
        select: {
          id: true,
          userId: true,
          name: true,
          summary: true,
          aiStatus: true,
        },
      },
    },
  },
  skills: { select: { outcome: true, skill: { select: { name: true } } } },
} as const;
export const courseSelect = {
  id: true,
  title: true,
  description: true,
  lastUpdated: true,
  aiStatus: true,
  aiProfile: { select: { summary: true, difficulty: true } },
  skills: {
    orderBy: { skillId: 'asc' as const },
    select: {
      skillId: true,
      outcome: true,
      instructorConfirmed: true,
      skill: { select: { name: true } },
    },
  },
  learningOutcomes: {
    orderBy: { sequence: 'asc' as const },
    select: { text: true, sequence: true },
  },
  prerequisiteSkills: {
    orderBy: { skillId: 'asc' as const },
    select: { reason: true, skill: { select: { name: true } } },
  },
  teachingPlan: { select: { structure: true } },
  _count: { select: { posts: true, files: true } },
} as const;

export function loadInstructorPost(
  authorization: InstructorContentAuthorizationService,
  db: Prisma.TransactionClient,
  userId: string,
  id: string,
) {
  return db.post.findFirst({
    where: { id, ...authorization.postWhere(userId) },
    select: postSelect,
  });
}
export async function instructorContentSnapshot(
  authorization: InstructorContentAuthorizationService,
  db: Prisma.TransactionClient,
  userId: string,
  courseId: string | null,
  postId: string | null,
  fileIds: readonly string[] = [],
) {
  const course = courseId
    ? await db.course.findFirst({
        where: { id: courseId, userId },
        select: courseSelect,
      })
    : null;
  const post = postId
    ? await loadInstructorPost(authorization, db, userId, postId)
    : null;
  const revisions = courseId
    ? await db.post.findMany({
        where: { courseId, course: { is: { userId } } },
        orderBy: { id: 'asc' },
        select: {
          id: true,
          lastUpdated: true,
          summary: true,
          aiStatus: true,
        },
      })
    : [];
  const fileScopes: Prisma.FileWhereInput[] = [];
  if (fileIds.length) fileScopes.push({ id: { in: [...fileIds] } });
  if (courseId)
    fileScopes.push(
      { inCourses: { some: { courseId } } },
      { inPosts: { some: { post: { is: { courseId } } } } },
    );
  const files = fileScopes.length
    ? await db.file.findMany({
        where: { userId, OR: fileScopes },
        orderBy: { id: 'asc' },
        select: {
          id: true,
          name: true,
          summary: true,
          aiStatus: true,
          size: true,
        },
      })
    : [];
  return createHash('sha256')
    .update(JSON.stringify({ course, post, revisions, files }))
    .digest('hex');
}
