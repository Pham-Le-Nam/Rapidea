import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import {
  InstructorProposal,
  InstructorProposalKind,
  StoredInstructorProposal,
  parseInstructorProposal,
} from '../../application/instructor-ai/instructor-proposal';
import { PrismaService } from '../database/prisma/prisma.service';
import { InstructorContentAuthorizationService } from './instructor-content-authorization.service';
import { SkillResolverService } from '../content-processing/skill-resolver.service';
import { grantSubscriptionSkills } from '../content-processing/subscription-skills';
import {
  loadInstructorPost,
  instructorContentSnapshot,
} from './instructor-content-snapshot';

/** Approved, transactional writes are separate from read-only evidence retrieval. */
@Injectable()
export class PrismaInstructorProposalRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authorization: InstructorContentAuthorizationService,
    private readonly skillResolver: SkillResolverService,
  ) {}
  async applyProposal(
    userId: string,
    messageId: string,
    edited: InstructorProposal,
  ) {
    await this.authorization.assertInstructor(userId);
    return this.prisma.$transaction(
      async (tx) => {
        // Serialize concurrent acceptance retries; all mutations and the acceptance
        // receipt commit together. IDs/kind/snapshot come from stored backend state.
        await tx.$queryRaw(
          Prisma.sql`SELECT m."id" FROM "ai_chat_message" m JOIN "ai_chat_conversation" c ON c."id" = m."conversationId" WHERE m."id" = ${messageId} AND c."userId" = ${userId} AND c."mode" = 'INSTRUCTOR' FOR UPDATE OF m`,
        );
        const message = await tx.aiChatMessage.findFirst({
          where: {
            id: messageId,
            role: 'ASSISTANT',
            conversation: { is: { userId, mode: 'INSTRUCTOR' } },
          },
          select: { metadata: true, conversationId: true },
        });
        if (!message)
          throw new NotFoundException('Instructor proposal not found');
        const metadata = message.metadata as Record<
          string,
          Prisma.JsonValue
        > | null;
        const stored = metadata?.proposal as unknown as
          | StoredInstructorProposal
          | undefined;
        if (!stored || !parseInstructorProposal(stored))
          throw new BadRequestException(
            'This message has no actionable proposal',
          );
        if (stored.appliedAt && stored.resultId)
          return {
            resultId: stored.resultId,
            appliedAt: stored.appliedAt,
            replay: true,
          };
        if (edited.kind !== stored.kind)
          throw new BadRequestException('Proposal kind cannot be changed');
        if (stored.courseId) {
          await tx.$queryRaw(
            Prisma.sql`SELECT "id" FROM "course" WHERE "id" = ${stored.courseId} AND "userId" = ${userId} FOR UPDATE`,
          );
          if (
            !(await tx.course.findFirst({
              where: { id: stored.courseId, userId },
              select: { id: true },
            }))
          )
            throw new NotFoundException('Owned course not found');
        }
        if (stored.postId) {
          await tx.$queryRaw(
            Prisma.sql`SELECT "id" FROM "post" WHERE "id" = ${stored.postId} FOR UPDATE`,
          );
          if (!(await this.loadPost(tx, userId, stored.postId)))
            throw new NotFoundException('Owned post not found');
        }
        const sourceFileIds = stored.sourceFileIds ?? [];
        const ownedFiles = sourceFileIds.length
          ? await tx.file.findMany({
              where: { id: { in: sourceFileIds }, userId },
              select: { id: true },
            })
          : [];
        if (ownedFiles.length !== sourceFileIds.length)
          throw new NotFoundException('An attached file is no longer owned');
        if (
          (await this.snapshotHash(
            tx,
            userId,
            stored.courseId,
            stored.sourcePostId ?? stored.postId,
            sourceFileIds,
          )) !== stored.sourceHash
        )
          throw new ConflictException(
            'The source changed. Generate a fresh proposal before applying it.',
          );
        const now = new Date();
        let resultId = stored.courseId;
        if (edited.kind === InstructorProposalKind.POST_DRAFT) {
          const post = await tx.post.create({
            data: {
              userId,
              courseId: stored.courseId,
              title: edited.title,
              content: this.postDocument(edited.body),
              isPreview: false,
              ...(sourceFileIds.length
                ? {
                    files: {
                      create: sourceFileIds.map((fileId) => ({
                        fileId,
                        userId,
                      })),
                    },
                  }
                : {}),
            },
          });
          resultId = post.id;
          await tx.users.update({
            where: { id: userId },
            data: { postsCount: { increment: 1 } },
          });
          if (stored.courseId)
            await tx.course.update({
              where: { id: stored.courseId },
              data: { postsCount: { increment: 1 } },
            });
        } else if (edited.kind === InstructorProposalKind.POST_REVISION) {
          if (!stored.postId)
            throw new BadRequestException('Attach a post to revise it');
          await tx.post.update({
            where: { id: stored.postId },
            data: {
              title: edited.title,
              content: this.postDocument(edited.body),
              lastUpdated: now,
              summary: null,
              aiStatus: 'PENDING',
              aiError: null,
              aiProcessedAt: null,
            },
          });
          await tx.contentChunk.deleteMany({
            where: { sourceType: 'POST', sourceId: stored.postId },
          });
          resultId = stored.postId;
        } else {
          if (!stored.courseId)
            throw new BadRequestException(
              'Attach an owned course before saving this proposal',
            );
          if (edited.kind === InstructorProposalKind.COURSE_STRUCTURE)
            await tx.courseTeachingPlan.upsert({
              where: { courseId: stored.courseId },
              create: { courseId: stored.courseId, structure: edited.items },
              update: { structure: edited.items },
            });
          if (edited.kind === InstructorProposalKind.LEARNING_OUTCOMES) {
            await tx.courseLearningOutcome.deleteMany({
              where: { courseId: stored.courseId },
            });
            await tx.courseLearningOutcome.createMany({
              data: edited.items.map((i, sequence) => ({
                courseId: stored.courseId!,
                text: i.title,
                sequence,
              })),
            });
          }
          if (
            [
              InstructorProposalKind.COURSE_SKILLS,
              InstructorProposalKind.PREREQUISITES,
            ].includes(edited.kind)
          ) {
            const resolved: { skillId: number; details: string }[] = [];
            for (const item of edited.items) {
              const skill = await this.skillResolver.resolve(tx, {
                name: item.title,
                description: item.details,
              });
              if (!resolved.some((r) => r.skillId === skill.id))
                resolved.push({ skillId: skill.id, details: item.details });
            }
            if (edited.kind === InstructorProposalKind.COURSE_SKILLS) {
              await tx.courseSkill.deleteMany({
                where: { courseId: stored.courseId },
              });
              await tx.courseSkill.createMany({
                data: resolved.map((r) => ({
                  courseId: stored.courseId!,
                  skillId: r.skillId,
                  outcome: r.details || 'Instructor-confirmed taught skill',
                  instructorConfirmed: true,
                })),
              });
              await grantSubscriptionSkills(tx, stored.courseId);
            } else {
              await tx.coursePrerequisiteSkill.deleteMany({
                where: { courseId: stored.courseId },
              });
              await tx.coursePrerequisiteSkill.createMany({
                data: resolved.map((r) => ({
                  courseId: stored.courseId!,
                  skillId: r.skillId,
                  reason: r.details,
                })),
              });
            }
          }
        }
        if (stored.courseId)
          await tx.course.update({
            where: { id: stored.courseId },
            data: {
              lastUpdated: now,
              aiStatus: 'PENDING',
              aiError: null,
              aiProcessedAt: null,
            },
          });
        if (!resultId)
          throw new BadRequestException('No target for this proposal');
        const receipt = {
          ...edited,
          courseId: stored.courseId,
          postId: stored.postId,
          sourcePostId: stored.sourcePostId,
          sourceHash: stored.sourceHash,
          sourceFileIds,
          appliedAt: now.toISOString(),
          resultId,
        };
        await tx.aiChatMessage.update({
          where: { id: messageId },
          data: {
            metadata: {
              ...metadata,
              proposal: receipt,
            } as Prisma.InputJsonObject,
          },
        });
        const actionLabel = edited.kind.toLowerCase().replace(/_/g, ' ');
        const approval = await tx.aiChatMessage.create({
          data: {
            conversationId: message.conversationId,
            role: 'USER',
            content: `I approved the reviewed ${actionLabel} proposal: ${edited.title}.`,
            metadata: {
              action: 'PROPOSAL_APPROVED',
              proposalMessageId: messageId,
            },
            createdAt: now,
          },
        });
        const acknowledgment = await tx.aiChatMessage.create({
          data: {
            conversationId: message.conversationId,
            role: 'ASSISTANT',
            responseToMessageId: approval.id,
            content: `The reviewed ${actionLabel} has been saved.`,
            metadata: {
              action: 'PROPOSAL_APPLIED',
              proposalMessageId: messageId,
            },
            createdAt: new Date(now.getTime() + 1),
          },
        });
        await tx.aiChatConversation.update({
          where: { id: message.conversationId },
          data: { lastMessageAt: acknowledgment.createdAt },
        });
        return { resultId, appliedAt: now.toISOString(), replay: false };
      },
      { timeout: 120000 },
    );
  }

  private loadPost(db: Prisma.TransactionClient, userId: string, id: string) {
    return loadInstructorPost(this.authorization, db, userId, id);
  }
  private snapshotHash(
    db: Prisma.TransactionClient,
    userId: string,
    courseId: string | null,
    postId: string | null,
    fileIds: readonly string[] = [],
  ) {
    return instructorContentSnapshot(
      this.authorization,
      db,
      userId,
      courseId,
      postId,
      fileIds,
    );
  }
  private postDocument(body: string): Prisma.InputJsonObject {
    return {
      type: 'doc',
      content: body.split(/\n\n+/).map((text) => ({
        type: 'paragraph',
        content: [{ type: 'text', text }],
      })),
    };
  }
}
